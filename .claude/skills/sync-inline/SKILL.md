# /sync-inline

Audit the inline logic in `web/index.html` against the canonical module files in `web/generator/`. The two must stay in sync — `index.html` contains a self-contained duplicate of key generator logic so it can run without a module bundler.

## What to check

For each area below, read the module file and the corresponding section in `index.html`, then report: **IN SYNC**, **DIVERGED**, or **MISSING**.

### 1. smartTruncate + enforceOutputLimits
- Module: `web/generator/api-client.js` — `smartTruncate()` and `enforceOutputLimits()`
- Inline: `web/index.html` — `function smartTruncate(` and `function parseResponse(`
- The inline `parseResponse` applies truncation directly rather than via `enforceOutputLimits`, but the limits and logic must match.

### 2. callClaudeAPI / callGeminiAPI
- Module: `web/generator/api-client.js` — `export async function callClaudeAPI(` and `export async function callGeminiAPI(`
- Inline: `web/index.html` — `async function callClaude(` and `async function callGemini(`
- Check: model names, API URLs, request body shape, error handling, response parsing path.

### 3. Android family structure override
- Module: `web/generator/skeleton-builder.js` — the `famStructure` assignment block (look for `identity.broad === 'Android'`)
- Inline: `web/index.html` — the `famStruct` assignment inside `buildSkeleton` (same condition)
- Check: fallback object shape, `parentCount`, `siblingCount`, `toneTag`.

### 4. NSFW age guard
- Inline only (no module equivalent — it's UI-layer logic in `runGenerate`)
- Look for `const allowNSFW` in `web/index.html`
- Verify: age is computed **before** `profPool` is filtered; portrait modifier also checks `age >= 18`.

### 5. Gemini model / API URL
- Module: `web/generator/api-client.js` — `const GEMINI_API_URL`
- Inline: `web/index.html` — the URL string inside `callGemini`
- Both must reference the same model (currently `gemini-2.5-flash`).

### 6. Output field limits (LIMITS constant)
- Module: `web/generator/api-client.js` — `const LIMITS`
- Inline: `web/index.html` — the hardcoded `maxLen` values passed to `smartTruncate` inside `parseResponse`
- Values must match: `characterEntry:1000`, `title:70`, `description:5000`, `opening:4000`, `appearancePrompt:500`, `npcEntry:1000`, `tags:10`.

## Output format

For each area, print one line:
```
[IN SYNC]  smartTruncate / enforceOutputLimits
[DIVERGED] callGeminiAPI — model is gemini-2.0-flash in index.html, gemini-2.5-flash in api-client.js
[MISSING]  Android family override not found in index.html
```

Then list any divergences with the exact diff (module value vs. inline value). End with a summary count.
