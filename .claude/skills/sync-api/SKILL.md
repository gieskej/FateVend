# /sync-api

Audit the **HTTP text-provider call layer**, which is hand-duplicated across
three files and can silently drift.

Nothing here is about `index.html` any more. It holds markup only — no
JavaScript at all — so there is no "inline" code to sync. (This skill replaces
`/sync-inline`, whose premise was exactly that.) The engine, prompt builder,
response parsing and output truncation are all genuinely shared modules with a
single implementation; **only the transport layer is duplicated.**

## Why the duplication exists

The browser and the library/CLI reach providers differently — the browser needs
`anthropic-dangerous-direct-browser-access`, the CLI does not — so each has its
own fetch layer. Both build their prompt with the shared
`buildPrompt(skeleton, voice)` and parse with the shared `parseResponse` +
`enforceOutputLimits`, so **only the request itself should differ.** Anything
else that differs is drift.

## The three implementations

| # | File | Exports / defines | Providers |
|---|---|---|---|
| 1 | `web/api.js` | `callClaude`, `callGemini`, `callOllama` | Claude, Gemini, Ollama |
| 2 | `web/generator/api-client.js` | `callClaudeAPI`, `callGeminiAPI` | Claude, Gemini — **no Ollama** |
| 3 | `cli/index.js` (~line 126) | `callOllamaAPI`, defined locally | Ollama only |

The asymmetry is the thing to watch: because #2 has no Ollama, the CLI defines
its own in #3. So an Ollama change has to be made in **two** places (#1 and #3),
with no shared module to keep them honest.

## What to check

Read all three, then report each area as **IN SYNC**, **DIVERGED**, or
**MISSING**.

### 1. Claude model + endpoint
- `web/api.js` — `callClaude`: model string and URL are inline literals
- `web/generator/api-client.js` — `const MODEL` and `const ANTHROPIC_API_URL`
- Both must name the same model. Note the shapes differ by design: #2 hoists
  them to named constants, #1 writes them inline — that is style, not drift.
  Compare the **values**.

### 2. Gemini model + endpoint
- `web/api.js` — `callGemini`: URL built inline with the model in the path
- `web/generator/api-client.js` — `const GEMINI_API_URL`
- The model segment must match in both.

### 3. Ollama (the two-place one)
- `web/api.js` — `callOllama(skeleton, baseUrl, modelName, genre)`
- `cli/index.js` — `callOllamaAPI(skeleton, baseUrl, model, genreId)`
- Check request body shape, streaming flag, and endpoint path. There is no
  shared module here, so this pair drifts most easily.

### 4. Request/response handling
Across all three: request body shape, `max_tokens` / generation-config limits,
error handling and status-code checks, and that each one runs its result
through `parseResponse` + `enforceOutputLimits` rather than hand-rolling
truncation.

## Output format

One line per area:

```
[IN SYNC]  Claude model — claude-sonnet-4-5 in both
[DIVERGED] Gemini model — gemini-2.0-flash in web/api.js, gemini-2.5-flash in api-client.js
```

Then the exact values for any divergence, and a summary count.

## Known-good baseline

At the time this skill was written all three agreed: Claude
`claude-sonnet-4-5`, Gemini `gemini-2.5-flash`. Report a divergence from that
as a real finding, not as expected drift.

## Worth flagging if you see it

If a change would be easier once Ollama lives in `api-client.js` alongside the
other two — removing the #1/#3 duplication and the CLI's local copy — say so.
That's the structural fix this skill exists to make unnecessary.
