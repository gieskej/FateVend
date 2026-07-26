# e2e test suite

Plain Playwright scripts (no `@playwright/test` runner — `playwright` the
library is already a devDependency; adding a second test framework and its
config felt like unnecessary weight for one suite). Each file exports an async
`run(browser)` that returns `{ pass, total }`; `run.mjs` wires them together and
prints a grand total.

This is the browser-driven half of the suite. `npm test` also runs
`../data/` first — pure-Node checks (icon-file existence, bulk-roll
consistency) that need no browser and finish in under a second. See
`../data/README.md` for those.

## Running

```bash
npm test          # fast tier — free, DOM-only, safe to run anytime
npm run test:full # fast tier + the real-API generation test
```

`run.mjs` starts `web/serve.sh` automatically if nothing answers on `:8080` yet
(and leaves it running, same as launching it by hand — see `ensureServer()` in
`helpers.mjs`).

## Fast tier vs. slow tier

Everything except `full-generation.mjs` is free and touches only the local dev
server and the DOM — no reason not to run it after every step of a refactor.
`full-generation.mjs` makes one real Anthropic/Gemini call (phase 2 of the
generation flow), so it's opt-in via `--full`, not part of the default run.

## Files

| File | Covers |
|---|---|
| `helpers.mjs` | Server lifecycle, console/network-error capture, report printing |
| `smoke.mjs` | Page load, provider selector, error box, no console errors |
| `genre-switching.mjs` | Phase-1 roll for all 7 built-in genres (toolbar dropdown + carousel step) |
| `genre-pack-import.mjs` | Imports both bundled sample packs through the real Settings UI, rolls phase 1 for each, then removes one while it's the active genre (carousel removal-fallback path) |
| `narration-audio.mjs` | narrate/narrateAll/stopNarration + BGM player controls |
| `settings-modal.mjs` | Open/close, every tab |
| `full-generation.mjs` | **Slow/paid.** Full phase 1 + phase 2 (real API call) + Go to Top |

## Why these particular tests

Built in response to two real regressions found by hand this session:

1. A stale sample genre pack (frozen sentiment words / removed species) that
   only surfaced by manually selecting it and spinning the reels — now caught
   by `genre-pack-import.mjs` on every run.
2. The app.js decomposition (api.js/narration.js/audio.js/pack-assets.js
   extraction) needed hand-written Playwright smoke checks after every step to
   catch a dropped export or broken circular-import wiring — now a permanent,
   re-runnable part of `genre-switching.mjs` and `narration-audio.mjs`, ahead
   of the still-pending carousel/genre-pack-registration extraction.

## Known-benign noise filtered out

`preloadGenreIcons()` fires a batch of `new Image()` requests per genre, and
switching again before they land cancels the rest (`net::ERR_ABORTED`); the
same happens to in-flight `<audio>` fetches when the player buttons are
exercised back-to-back. `helpers.mjs`'s diagnostics filter these out
specifically for `/icons/` and `/audio/` paths — the server's own
`QuietThreadingHTTPServer` (see `serve.sh`) already treats this pattern as
expected, not a bug.

## Adding a new test file

Export `async function run(browser)` that opens its own page via
`newDiagnosticPage(browser)`, pushes `{ pass, detail }` objects into a
`results` array, calls `assertNoErrors(diag, results)` at the end, and returns
`printReport("name", results)`. Import it in `run.mjs` and add it to
`FAST_SUITES` (or pass it only under `--full` if it costs money/time).
