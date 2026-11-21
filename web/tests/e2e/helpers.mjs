// helpers.mjs
// Shared plumbing for the e2e suite: dev-server lifecycle, browser diagnostics
// (console errors + failed network requests), and the pass/fail report table.
// Deliberately built on the bare `playwright` library (already a devDependency)
// rather than the `@playwright/test` runner, to avoid adding a second test
// framework and its config to a project that has none — every test file here
// exports a plain async `run(browser)` that returns a results array, matching
// the ad hoc smoke-test shape already proven out by hand this session.

import { chromium } from "playwright";
import { spawn } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

// Windows has no reliable `bash` or `python3` on PATH (both are usually
// WindowsApps stubs for WSL and the Microsoft Store), so there the suite starts
// serve.ps1 — the repo's own Windows equivalent of serve.sh — instead.
const IS_WINDOWS = process.platform === "win32";

// Elsewhere: 127.0.0.1, not localhost: Node's fetch resolves "localhost" to ::1
// first on this platform, but serve.sh binds 0.0.0.0 (IPv4-only) — the IPv6
// attempt fails silently and pingServer() would never see the running server.
// On Windows: localhost, not 127.0.0.1: serve.ps1's HttpListener is registered
// for the "localhost" host name only and answers any other Host header with
// 400. http.sys listens on both ::1 and 127.0.0.1 for it, so the IPv6-first
// lookup that rules out "localhost" for serve.sh is not a problem here.
export const BASE_URL = IS_WINDOWS
  ? "http://localhost:8080"
  : "http://127.0.0.1:8080";
const WEB_DIR = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
  "..",
);

async function pingServer() {
  try {
    const res = await fetch(BASE_URL + "/", {
      signal: AbortSignal.timeout(1000),
    });
    return res.ok;
  } catch {
    return false;
  }
}

export const SERVER_SCRIPT = IS_WINDOWS ? "serve.ps1" : "serve.sh";

// On Windows, spawn()'s `detached: true` starts the child with no console at
// all (DETACHED_PROCESS), and powershell.exe silently exits 0 without running
// the script. Without `detached`, libuv puts the child in a kill-on-close job
// object, so the server would die with this runner. Handing the launch to
// Start-Process gives serve.ps1 its own hidden console outside that job — the
// same as starting it by hand.
function serverLaunch() {
  if (!IS_WINDOWS) {
    return { command: "bash", args: ["serve.sh"], detached: true };
  }

  const scriptPath = path.join(WEB_DIR, "serve.ps1").replaceAll("'", "''");
  const startServer =
    "Start-Process powershell.exe -WindowStyle Hidden -ArgumentList " +
    `'-NoProfile -ExecutionPolicy Bypass -File "${scriptPath}" -NoBrowser'`;
  return {
    command: "powershell.exe",
    args: ["-NoProfile", "-NonInteractive", "-Command", startServer],
    detached: false,
  };
}

// Starts web/serve.sh (serve.ps1 on Windows) if nothing is already answering
// on port 8080, and waits for it to come up. Never stops a server it didn't
// start — both scripts' own stale-instance sweep (see serve.sh's header
// comment) handles cleanup on next launch, and a server we DID start is left
// running detached, exactly like a developer launching it by hand would expect.
export async function ensureServer() {
  if (await pingServer()) return { started: false };

  const { command, args, detached } = serverLaunch();
  const child = spawn(command, args, {
    cwd: WEB_DIR,
    detached,
    stdio: "ignore",
    windowsHide: true,
  });
  // A missing interpreter surfaces as an async 'error' event; without a
  // listener it would crash the runner instead of reaching the timeout below.
  child.on("error", () => {});
  child.unref();

  const deadline = Date.now() + 20000;
  while (Date.now() < deadline) {
    if (await pingServer()) return { started: true };
    await new Promise((r) => setTimeout(r, 500));
  }
  throw new Error(
    `Timed out waiting for web/${SERVER_SCRIPT} to come up on :8080`,
  );
}

// A phone-sized context (iPhone 12/13/14 logical viewport). Passed to
// newDiagnosticPage by mobile.mjs; sits below the app's 600px carousel-peek
// breakpoint (see carousel.js's carouselShowPeeks).
export const MOBILE_CONTEXT = {
  viewport: { width: 390, height: 844 },
  deviceScaleFactor: 3,
  isMobile: true,
  hasTouch: true,
};

// Endpoints the app probes or loads defensively, whose absence says nothing
// about the code under test: the AI Dungeon import server, the dev-only
// config.js, and the three provider reachability probes behind the settings
// lamps. Those ask whatever URL is configured whether it answers, so the result
// depends on what happens to be running on the machine executing the suite —
// a red lamp is a correct outcome there, not a regression.
const OPTIONAL_PROBE_PATHS = [
  "/api/tags", // Ollama
  "/sdapi/v1/options", // Stable Diffusion
  "/v1/models", // Kokoro
];
function isOptionalProbe(url) {
  return (
    url.includes(":7432") ||
    url.includes("config.js") ||
    OPTIONAL_PROBE_PATHS.some((path) => url.endsWith(path))
  );
}

// Attaches console/pageerror/requestfailed listeners to a fresh page and
// returns { page, errors, failed } — call assertNoErrors(diag) at the end of a
// test to fold "did anything go wrong we didn't expect" into the report.
// `contextOptions` is forwarded to browser.newContext() so a suite can emulate
// a device (see MOBILE_CONTEXT); omit it for the default desktop context.
export async function newDiagnosticPage(browser, contextOptions = {}) {
  const context = await browser.newContext(contextOptions);
  const page = await context.newPage();
  const errors = [];
  const failed = [];
  page.on("console", (m) => {
    if (m.type() !== "error") return;
    // A refused fetch is reported twice by Chromium — once through
    // requestfailed, and once as a console error whose text carries no URL.
    // The optional-probe exemptions below therefore have to be applied by the
    // message's own location, or an absent Ollama would fail the suite on the
    // console side after passing on the request side.
    if (isOptionalProbe(m.location()?.url ?? "")) return;
    errors.push(m.text());
  });
  page.on("pageerror", (e) => errors.push("PAGEERROR: " + e.message));
  page.on("requestfailed", (r) => {
    const url = r.url();
    if (isOptionalProbe(url)) return;
    // preloadGenreIcons() fires a batch of `new Image()` preload requests per
    // genre, and the audio player/SFX calls fire overlapping <audio> fetches;
    // moving on quickly (switching genres again, calling playerNext() right
    // after playerPlay()) cancels whatever's still in flight. The server's own
    // QuietThreadingHTTPServer treats this exact pattern as expected (see
    // serve.sh), not a bug, so ERR_ABORTED icon/audio requests aren't a real
    // test failure either.
    const errText = r.failure()?.errorText ?? "";
    if (errText === "net::ERR_ABORTED" && /\/(icons|audio)\//.test(url)) return;
    failed.push(`${url} :: ${errText}`);
  });
  return { context, page, errors, failed };
}

export function assertNoErrors(
  diag,
  results,
  label = "no console errors / failed requests",
) {
  const ok = diag.errors.length === 0 && diag.failed.length === 0;
  results.push({
    pass: ok,
    detail: ok
      ? label
      : `${label} — errors: ${JSON.stringify(diag.errors)} failed: ${JSON.stringify(diag.failed)}`,
  });
}

export function printReport(suiteName, results) {
  console.log(`\n=== ${suiteName} ===`);
  let pass = 0;
  results.forEach((r, i) => {
    const status = r.pass ? "PASS" : "FAIL";
    if (r.pass) pass++;
    console.log(`${i + 1}. [${status}] ${r.detail}`);
  });
  console.log(`${suiteName}: ${pass}/${results.length} passed`);
  return { pass, total: results.length };
}

export { chromium };
