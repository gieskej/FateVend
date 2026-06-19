# /test-ui

Run a full end-to-end UI test of the FateVend generator at `http://localhost:8080/`. Tests the complete two-phase generation flow and verifies key UI features.

## Steps

### 1. Ensure the dev server is running

Check if port 8080 is already listening:
```bash
curl -s -o /dev/null -w "%{http_code}" http://localhost:8080/
```

If it returns anything other than `200`, start the server:
```bash
cd web && bash serve.sh &
sleep 2
```

### 2. Run the Playwright test

Use Node.js with Playwright (headless Chromium). The API keys are injected server-side via `config.js` — no manual key entry needed.

The test must cover **both phases**:
- **Phase 1** — click `#btn-generate`, wait for `#btn-continue` to appear (up to 15s)
- **Phase 2** — click `#btn-continue`, wait for `.copy-all-wrap` to appear (up to 90s — AI call)

### 3. Assertions to verify

| # | What | How |
|---|------|-----|
| 1 | Page loads | HTTP 200 on `/` |
| 2 | Phase 1 completes | `#btn-continue` visible after clicking `#btn-generate` |
| 3 | Phase 2 completes | `.copy-all-wrap` appears within 90s |
| 4 | Bottom buttons present | `.btn-go-top` and `.btn-generate-secondary` both visible |
| 5 | Go to Top works | click `.btn-go-top` → `window.scrollY < 50` |
| 6 | No error box visible | `#error-box` does not have class `visible` |
| 7 | Character sheet rendered | `.character-sheet` element exists and has non-empty text |
| 8 | Provider selector visible | `#provider-selector` is displayed (both keys are configured) |

### 4. Screenshots

Save to `C:\Users\jeg00\AppData\Local\Temp\`:
- `gof_test_phase1.png` — after skeleton cards appear
- `gof_test_phase2.png` — after AI output renders (scrolled to bottom)

### 5. Report

Print a table: step number, PASS/FAIL, detail. End with total pass/fail count and any error messages captured from `#error-box` or the console.

If generation fails due to an API error, report the exact error text and note which provider was active.
