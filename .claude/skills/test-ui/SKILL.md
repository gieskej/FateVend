# /test-ui

Run the FateVend e2e test suite against `http://localhost:8080/`.

The suite itself lives in `web/tests/e2e/` (plain Playwright scripts, no test-runner
dependency beyond the `playwright` devDependency already in `package.json`) — this
skill just invokes it, so there's one source of truth for selectors/assertions
instead of a second copy drifting out of sync in this file.

## Steps

### 1. Run the fast tier (default)

```bash
npm test
```

This first runs `web/tests/data/` — pure-Node checks with no browser or
server involved (an exhaustive icon-file-existence sweep across every genre's
data tables, plus a 50-roll-per-genre consistency check) — then starts
`web/serve.sh` automatically if nothing is already listening on `:8080` (and
leaves it running — same behavior as launching it by hand), then runs every
free, DOM-only Playwright test file:

- `smoke.mjs` — page load, provider selector, error box, no console errors
- `genre-switching.mjs` — phase-1 roll for all 7 built-in genres via the
  toolbar dropdown, plus a full carousel-step loop
- `genre-pack-import.mjs` — imports both bundled sample packs (Neon Drift,
  Pirate Cove) through the real Settings → Genre UI and rolls phase 1 for each
- `narration-audio.mjs` — exercises narrate/narrateAll/stopNarration and the
  BGM player controls
- `settings-modal.mjs` — opens Settings, walks every tab, closes it

Each file prints its own PASS/FAIL table; the runner prints a grand total and
exits non-zero on any failure.

### 2. Run the full tier (costs tokens)

```bash
npm run test:full
```

Everything in the fast tier, plus `full-generation.mjs` — the complete two-phase
flow (phase 1 roll → phase 2 real Anthropic/Gemini API call → verify output
renders → Go to Top works). Only run this when you specifically need to verify
the AI-generation path; it's not part of the default fast run because it makes
a real, billed API call every time.

### 3. Report

Relay the runner's printed output verbatim — it already includes a per-suite
PASS/FAIL table and a grand total. If something fails, note which suite/step
and the captured error/console text from that step's `detail` field.
