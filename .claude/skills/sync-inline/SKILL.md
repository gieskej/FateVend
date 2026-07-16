# /sync-inline

Audit the logic that **still lives inline** in `web/index.html` against its
canonical module twin in `web/generator/`. `index.html` runs without a bundler,
so a few pieces are hand-duplicated and can drift.

**Scope note (post-refactor):** the generation **engine** is no longer inline —
`index.html` imports `rollStats`/`assignMBTI`/`buildSkeleton` from
`generator/engine.js` and its tables from `generator/registry.js`, so there is
nothing to sync there anymore. What remains duplicated is the **API-call +
response-truncation layer** (the browser has its own `callClaude`/`callGemini`/
`parseResponse`/`smartTruncate` separate from `api-client.js`'s
`callClaudeAPI`/`callGeminiAPI`) plus one UI-layer NSFW guard. Those are the
only areas below.

## What to check

For each area, read the module file and the corresponding section in
`index.html`, then report: **IN SYNC**, **DIVERGED**, or **MISSING**.

### 1. smartTruncate + output limits
- Module: `web/generator/api-client.js` — `smartTruncate()`, `enforceOutputLimits()`, `const LIMITS`
- Inline: `web/index.html` — `function smartTruncate(` and `function parseResponse(`
- The inline `parseResponse` applies truncation directly (rather than via
  `enforceOutputLimits`), but the per-field `maxLen` values must match `LIMITS`:
  `characterEntry:1000`, `title:70`, `description:5000`, `opening:4000`,
  `appearancePrompt:500`, `npcEntry:1000`, `tags:10`.

### 2. callClaudeAPI / callGeminiAPI
- Module: `web/generator/api-client.js` — `export async function callClaudeAPI(` / `callGeminiAPI(`
- Inline: `web/index.html` — `async function callClaude(` / `callGemini(`
- Check: model names, API URLs, request body shape, error handling, response parsing path.

### 3. Gemini model / API URL
- Module: `web/generator/api-client.js` — `const GEMINI_API_URL` (currently `gemini-2.5-flash`)
- Inline: `web/index.html` — the URL string inside `callGemini`
- Both must reference the same model.

### 4. NSFW portrait guard (inline only)
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

Two *engine* copies now coexist: the browser imports `generator/engine.js` while
the CLI/module path imports `generator/skeleton-builder.js` — both contain the
same engine logic (e.g. the `identity.broad === 'Android'` family override). That
is a module-vs-module duplication, not an inline one, so `/sync-inline` does not
cover it; keep it in mind as a separate consolidation.
