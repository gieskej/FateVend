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

import { createServer }           from 'node:http';
import { writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { join, resolve, dirname } from 'node:path';
import { fileURLToPath }          from 'node:url';
import { tmpdir }                 from 'node:os';
import { spawn }                  from 'node:child_process';

const PORT        = 7432;
const __dir       = dirname(fileURLToPath(import.meta.url));
const importerPath = resolve(__dir, 'aidungeon-importer.mjs');

if (!existsSync(importerPath)) {
  console.error(`Importer not found: ${importerPath}`);
  process.exit(1);
}

// ── HTTP server ────────────────────────────────────────────────────────────────
const server = createServer(async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin',  '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') { res.writeHead(204); res.end(); return; }

  const json = (status, obj) => {
    res.writeHead(status, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(obj));
  };

  // ── GET /ping ──────────────────────────────────────────────────────────────
  if (req.method === 'GET' && req.url === '/ping') {
    json(200, { ok: true, version: 1 });
    return;
  }

  // ── POST /import ───────────────────────────────────────────────────────────
  if (req.method === 'POST' && req.url === '/import') {
    let body = '';
    for await (const chunk of req) body += chunk;

    let data;
    try { data = JSON.parse(body); }
    catch { json(400, { error: 'Invalid JSON body' }); return; }

    const { scenario, characters, portraitBase64 } = data;
    if (!scenario || !characters) {
      json(400, { error: 'Missing scenario or characters' });
      return;
    }

    // Write temp input folder
    const tmpDir = join(tmpdir(), `fatevend-import-${Date.now()}`);
    mkdirSync(tmpDir, { recursive: true });
    writeFileSync(
      join(tmpDir, 'scenario.json'),
      JSON.stringify({ scenario, characters }, null, 2),
    );
    if (portraitBase64) {
      writeFileSync(join(tmpDir, 'portrait.png'), Buffer.from(portraitBase64, 'base64'));
    }

    console.log(`\n▶ Launching importer for: ${scenario.title}`);
    console.log(`  Temp folder: ${tmpDir}`);

    const child = spawn(process.execPath, [importerPath, '--input', tmpDir, '--headed'], {
      stdio: ['ignore', 'pipe', 'pipe'],
    });

    // Mirror the importer's output to this server's own terminal live, while
    // also buffering it (stderr especially) so a failure can be reported
    // back to the browser instead of only ever showing up here.
    let output = '';
    const capture = data => {
      process.stdout.write(data);
      output += data.toString();
      if (output.length > 8000) output = output.slice(-8000);
    };
    child.stdout.on('data', capture);
    child.stderr.on('data', capture);

    child.on('error', err => {
      console.error(`◼ Failed to launch importer: ${err.message}`);
      json(500, { ok: false, error: `Failed to launch importer: ${err.message}` });
    });

    child.on('exit', code => {
      console.log(`◼ Import finished (exit ${code}).`);
      if (code === 0) {
        json(200, { ok: true });
      } else {
        json(200, { ok: false, error: output.trim() || `Importer exited with code ${code}` });
      }
    });

    return;
  }

  res.writeHead(404); res.end();
});

server.listen(PORT, '127.0.0.1', () => {
  console.log('╔══════════════════════════════════════════════════╗');
  console.log('║  FateVend → AI Dungeon import server running     ║');
  console.log(`║  http://localhost:${PORT}                          ║`);
  console.log('╠══════════════════════════════════════════════════╣');
  console.log('║  Open the web app — an "Import to AI Dungeon"   ║');
  console.log('║  button will appear after generating a scenario. ║');
  console.log('║  Press Ctrl+C to stop.                           ║');
  console.log('╚══════════════════════════════════════════════════╝');
});

server.on('error', err => {
  if (err.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} is already in use — is another server instance running?`);
  } else {
    console.error('Server error:', err.message);
  }
  process.exit(1);
});
