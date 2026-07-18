# /sync-inline

Audit the logic that **still lives inline** in `web/index.html` against its
canonical module twin in `web/generator/`. `index.html` runs without a bundler,
so a few pieces are hand-duplicated and can drift.

**Scope note (post-refactor):** the generation **engine** is no longer inline
(`index.html` imports `generator/engine.js` + `generator/registry.js`), and
neither is **prompt building / response parsing / output truncation** —
`index.html` now imports `buildPrompt`/`parseResponse`/`enforceOutputLimits`
from `generator/prompt-builder.js` (the single shared builder), so there is
nothing to sync in those areas anymore. What remains duplicated is only the
**HTTP API-call layer** (the browser's own `callClaude`/`callGemini`/`callOllama`
fetch functions vs. `api-client.js`'s `callClaudeAPI`/`callGeminiAPI`) plus one
UI-layer NSFW guard. Those are the only areas below.

## What to check

For each area, read the module file and the corresponding section in
`index.html`, then report: **IN SYNC**, **DIVERGED**, or **MISSING**.

### 1. API-call functions (fetch layer)
- Module: `web/generator/api-client.js` — `export async function callClaudeAPI(` / `callGeminiAPI(`
- Inline: `web/index.html` — `async function callClaude(` / `callGemini(` / `callOllama(`
- Check: model names, API URLs, request body shape, error handling. Both build
  their prompt via the shared `buildPrompt(skeleton, voice)` and parse via the
  shared `parseResponse` + `enforceOutputLimits`, so only the transport differs.

### 2. Gemini model / API URL
- Module: `web/generator/api-client.js` — `const GEMINI_API_URL` (currently `gemini-2.5-flash`)
- Inline: `web/index.html` — the URL string inside `callGemini`
- Both must reference the same model.

### 3. NSFW portrait guard (inline only)
- No module equivalent — UI-layer logic.
- Inline: `web/index.html` — the `appearancePrompt` NSFW modifier (look for
  `include-nsfw` + `currentSkeleton.age >= 18`).
- Verify the portrait modifier is gated on `age >= 18`.

## Output format

For each area, print one line:
```
[IN SYNC]  smartTruncate / output limits
[DIVERGED] callGeminiAPI — model is gemini-2.0-flash in index.html, gemini-2.5-flash in api-client.js
```
Then list any divergences with the exact diff (module value vs. inline value),
and end with a summary count.

## Related (out of scope here)

The generation **engine** is fully unified: both the browser and the CLI/module
path now use `generator/engine.js` (the former parallel `skeleton-builder.js` /
`cast-builder.js` / `selector.js` / `roller.js` are deleted). Likewise the
**prompt builder** is shared (`generator/prompt-builder.js`). So the only inline
duplication `/sync-inline` still covers is the HTTP API-call layer above.
