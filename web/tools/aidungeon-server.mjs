#!/usr/bin/env node
// web/tools/aidungeon-server.mjs
// Companion server for the FateVend web UI — listens on localhost:7432 and
// launches the Playwright importer when the browser POSTs a scenario.
//
// Usage (run once in a terminal, keep it open):
//   node web/tools/aidungeon-server.mjs
//
// The web app will show an "Import to AI Dungeon" button whenever this server
// is reachable. Clicking it sends the current scenario here, which writes a
// temp folder and spawns aidungeon-importer.mjs --headed. The HTTP response
// is held open until the importer process exits, then reports success or
// failure (with captured stderr) back to the browser.

import { createServer } from "node:http";
import { writeFileSync, mkdirSync, existsSync } from "node:fs";
import { join, resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { tmpdir } from "node:os";
import { spawn } from "node:child_process";

const PORT = 7432;
const __dir = dirname(fileURLToPath(import.meta.url));
const importerPath = resolve(__dir, "aidungeon-importer.mjs");

if (!existsSync(importerPath)) {
  console.error(`Importer not found: ${importerPath}`);
  process.exit(1);
}

// ── Origin allowlist ──────────────────────────────────────────────────────────
// This server holds the keys to the user's AI Dungeon account: /import spawns a
// browser that logs in with AIDUNGEON_EMAIL/PASSWORD from .env. Binding
// 127.0.0.1 does NOT make that safe, because the attacker isn't on the network —
// it's any web page the user has open. Browsers treat http://localhost as a
// potentially trustworthy origin, so even an https:// site can reach us, and a
// previous `Access-Control-Allow-Origin: *` meant *any* page could fingerprint
// the user via /ping and then drive their AI Dungeon account via /import.
//
// Trusted by default: the machine itself, plus private-network addresses.
// serve.sh binds 0.0.0.0 precisely so the app can be opened from another device
// on the same LAN (testing the mobile layout on a real phone, say), and that
// browser sends its own origin — http://192.168.1.50:8080 or http://host.local:8080,
// not localhost. Loopback-only would silently break that, hiding the Import
// button with no explanation.
//
// This is still a real boundary: a page on the public internet cannot present a
// private-network origin. Only a device already on your LAN could, and the
// Origin header is the browser's own claim about the page — not a DNS lookup —
// so rebinding tricks can't forge one either.
//
// Anything else needs an explicit opt-in:
//   AIDUNGEON_ALLOWED_ORIGINS="https://example.github.io" node aidungeon-server.mjs
const EXTRA_ORIGINS = (process.env.AIDUNGEON_ALLOWED_ORIGINS ?? "")
  .split(",")
  .map((o) => o.trim().replace(/\/$/, ""))
  .filter(Boolean);

// True for any address that can only belong to the user's own machine or their
// own network. Written as host parsing rather than one big regex because the
// interesting cases are numeric ranges with real boundaries — 172.16-31 is
// private while 172.15 and 172.32 are public internet, and a regex that gets
// that subtly wrong fails open.
function isPrivateHost(rawHost) {
  const host = rawHost.replace(/^\[|\]$/g, "").toLowerCase(); // unwrap [::1]
  if (host === "localhost" || host === "::1") return true;

  // A bare name with no dot ("desktop", "raspberrypi") can't be a public site —
  // public hostnames always have a TLD. Common on Windows and mDNS networks.
  if (!host.includes(".") && !host.includes(":")) return true;

  // Suffixes reserved for local networks; routers hand these out.
  if (/\.(local|lan|internal|home\.arpa)$/.test(host)) return true;

  // IPv6 unique-local (fc00::/7) and link-local (fe80::/10).
  if (/^f[cd][0-9a-f]{0,2}:/.test(host)) return true;
  if (/^fe[89ab][0-9a-f]?:/.test(host)) return true;

  const ipv4 = host.match(/^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/);
  if (ipv4) {
    const [a, b] = [Number(ipv4[1]), Number(ipv4[2])];
    if (ipv4.slice(1).some((o) => Number(o) > 255)) return false;
    if (a === 127 || a === 10) return true; // loopback, 10/8
    if (a === 192 && b === 168) return true; // 192.168/16
    if (a === 172 && b >= 16 && b <= 31) return true; // 172.16/12
    if (a === 169 && b === 254) return true; // link-local / APIPA
    if (a === 100 && b >= 64 && b <= 127) return true; // CGNAT, incl. Tailscale
  }
  return false;
}

function isAllowedOrigin(origin) {
  if (!origin) return true; // curl/scripts: a browser always sends Origin cross-origin
  if (EXTRA_ORIGINS.includes(origin)) return true;
  try {
    const url = new URL(origin);
    if (url.protocol !== "http:" && url.protocol !== "https:") return false;
    return isPrivateHost(url.hostname);
  } catch {
    return false; // unparseable Origin — treat as hostile
  }
}

// ── HTTP server ────────────────────────────────────────────────────────────────
const server = createServer(async (req, res) => {
  const origin = req.headers.origin;
  const allowed = isAllowedOrigin(origin);

  // Echo the specific origin rather than "*", and only when it's allowed, so a
  // disallowed page cannot read any response — including /ping, which would
  // otherwise let any site detect that FateVend is installed.
  if (allowed && origin) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Vary", "Origin");
  }
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.writeHead(allowed ? 204 : 403);
    res.end();
    return;
  }

  // Blocking the preflight is not enough on its own: a cross-origin POST with a
  // CORS-safelisted Content-Type (text/plain) skips preflight entirely, and the
  // attacker doesn't care that they can't read our reply — the import already
  // happened. So the state-changing routes re-check Origin on the real request.
  if (!allowed && req.method === "POST") {
    console.warn(`Refused ${req.url} from disallowed origin: ${origin}`);
    res.writeHead(403, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        error: `Origin ${origin} is not allowed to use the AI Dungeon importer. Set AIDUNGEON_ALLOWED_ORIGINS to permit it.`,
      }),
    );
    return;
  }

  const json = (status, obj) => {
    res.writeHead(status, { "Content-Type": "application/json" });
    res.end(JSON.stringify(obj));
  };

  // ── GET /ping ──────────────────────────────────────────────────────────────
  if (req.method === "GET" && req.url === "/ping") {
    json(200, { ok: true, version: 1 });
    return;
  }

  // ── POST /shutdown ─────────────────────────────────────────────────────────
  // Lets serve.sh retire a stale instance over HTTP instead of by PID — a PID
  // recorded by one shell (Cygwin, Git Bash, WSL, ...) often isn't valid in
  // another's process namespace, which made the old PID-file approach
  // unreliable. Loopback-only: a request from anywhere else is refused.
  if (req.method === "POST" && req.url === "/shutdown") {
    if (
      req.socket.remoteAddress !== "127.0.0.1" &&
      req.socket.remoteAddress !== "::1"
    ) {
      res.writeHead(403);
      res.end();
      return;
    }
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ ok: true }), () => process.exit(0));
    return;
  }

  // ── POST /import ───────────────────────────────────────────────────────────
  if (req.method === "POST" && req.url === "/import") {
    let body = "";
    for await (const chunk of req) body += chunk;

    let data;
    try {
      data = JSON.parse(body);
    } catch {
      json(400, { error: "Invalid JSON body" });
      return;
    }

    const { scenario, characters, portraitBase64 } = data;
    if (!scenario || !characters) {
      json(400, { error: "Missing scenario or characters" });
      return;
    }

    // Write temp input folder
    const tmpDir = join(tmpdir(), `fatevend-import-${Date.now()}`);
    mkdirSync(tmpDir, { recursive: true });
    writeFileSync(
      join(tmpDir, "scenario.json"),
      JSON.stringify({ scenario, characters }, null, 2),
    );
    if (portraitBase64) {
      writeFileSync(
        join(tmpDir, "portrait.png"),
        Buffer.from(portraitBase64, "base64"),
      );
    }

    console.log(`\n▶ Launching importer for: ${scenario.title}`);
    console.log(`  Temp folder: ${tmpDir}`);

    const child = spawn(
      process.execPath,
      [importerPath, "--input", tmpDir, "--headed"],
      {
        stdio: ["ignore", "pipe", "pipe"],
      },
    );

    // Mirror the importer's output to this server's own terminal live, while
    // also buffering it (stderr especially) so a failure can be reported
    // back to the browser instead of only ever showing up here.
    let output = "";
    const capture = (data) => {
      process.stdout.write(data);
      output += data.toString();
      if (output.length > 8000) output = output.slice(-8000);
    };
    child.stdout.on("data", capture);
    child.stderr.on("data", capture);

    child.on("error", (err) => {
      console.error(`◼ Failed to launch importer: ${err.message}`);
      json(500, {
        ok: false,
        error: `Failed to launch importer: ${err.message}`,
      });
    });

    child.on("exit", (code) => {
      console.log(`◼ Import finished (exit ${code}).`);
      if (code === 0) {
        json(200, { ok: true });
      } else {
        json(200, {
          ok: false,
          error: output.trim() || `Importer exited with code ${code}`,
        });
      }
    });

    return;
  }

  res.writeHead(404);
  res.end();
});

server.listen(PORT, "127.0.0.1", () => {
  console.log("╔══════════════════════════════════════════════════╗");
  console.log("║  FateVend → AI Dungeon import server running     ║");
  console.log(`║  http://localhost:${PORT}                          ║`);
  console.log("╠══════════════════════════════════════════════════╣");
  console.log('║  Open the web app — an "Import to AI Dungeon"   ║');
  console.log("║  button will appear after generating a scenario. ║");
  console.log("║  Press Ctrl+C to stop.                           ║");
  console.log("╚══════════════════════════════════════════════════╝");
  // Stated out loud because this server can act on the user's AI Dungeon
  // account: they should be able to see, without reading the source, exactly
  // which pages are permitted to drive it.
  console.log(
    "Accepting imports from: this machine and your local network (any port)",
  );
  if (EXTRA_ORIGINS.length) {
    console.log(
      `  plus AIDUNGEON_ALLOWED_ORIGINS: ${EXTRA_ORIGINS.join(", ")}`,
    );
  }
});

server.on("error", (err) => {
  if (err.code === "EADDRINUSE") {
    console.error(
      `Port ${PORT} is already in use — is another server instance running?`,
    );
  } else {
    console.error("Server error:", err.message);
  }
  process.exit(1);
});
