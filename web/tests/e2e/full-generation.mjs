// full-generation.mjs (SLOW / PAID tier — makes a real text-provider API call)
// Runs the complete two-phase generation flow end to end: phase 1 (local stat/
// skeleton roll) then phase 2 (the real Anthropic/Gemini call configured via
// .env -> serve.sh's generated config.js). Only run explicitly via
// `npm run test:full` — every other test file in this suite is free and DOM-
// only; this one costs tokens, so it isn't part of the default fast run.
//
// Mirrors the coverage of the existing /test-ui skill (same assertions), now
// captured as a re-runnable file instead of a hand-written Playwright script.

import { BASE_URL, newDiagnosticPage, assertNoErrors, printReport } from "./helpers.mjs";

export async function run(browser) {
  const results = [];
  const diag = await newDiagnosticPage(browser);
  const { page } = diag;

  await page.goto(BASE_URL + "/", { waitUntil: "networkidle", timeout: 20000 });

  await page.click("#btn-generate");
  let phase1ok = true;
  try {
    await page.waitForSelector("#btn-continue", { timeout: 15000, state: "visible" });
  } catch {
    phase1ok = false;
  }
  results.push({ pass: phase1ok, detail: "phase 1 (stat roll) completed" });

  if (phase1ok) {
    await page.click("#btn-continue");
    let phase2ok = true;
    try {
      await page.waitForSelector(".copy-all-wrap", { timeout: 90000, state: "visible" });
    } catch {
      phase2ok = false;
    }
    results.push({ pass: phase2ok, detail: "phase 2 (AI generation) completed" });

    if (phase2ok) {
      const title = await page.$eval("#field-title", (el) => el.value?.trim() ?? "");
      results.push({ pass: title.length > 0, detail: `#field-title has content ("${title.slice(0, 40)}")` });

      const goTopVisible = await page.isVisible(".btn-go-top");
      results.push({ pass: goTopVisible, detail: ".btn-go-top visible after generation" });

      if (goTopVisible) {
        await page.click(".btn-go-top");
        // Smooth-scroll duration scales with distance (a long generated page
        // can take well over a second), so poll instead of a fixed sleep.
        let scrollY = await page.evaluate(() => window.scrollY);
        const deadline = Date.now() + 5000;
        while (scrollY >= 50 && Date.now() < deadline) {
          await page.waitForTimeout(150);
          scrollY = await page.evaluate(() => window.scrollY);
        }
        results.push({ pass: scrollY < 50, detail: `Go to Top scrolled window.scrollY to ${scrollY} (< 50)` });
      }
    } else {
      const errorText = await page.$eval("#error-box", (el) => el.textContent).catch(() => "");
      results.push({ pass: false, detail: `#error-box on phase-2 failure: "${errorText}"` });
    }
  }

  const errorBoxVisible = await page.locator("#error-box.visible").count();
  results.push({ pass: errorBoxVisible === 0, detail: "#error-box not showing an error at the end" });

  assertNoErrors(diag, results, "no console errors / failed requests across the full generation flow");

  await diag.context.close();
  return printReport("full-generation (SLOW/PAID)", results);
}
