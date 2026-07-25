// smoke.mjs (fast tier — no AI calls)
// Confirms the page loads clean: correct HTTP status, no console errors or
// failed requests on initial load, the text-provider selector renders, and the
// error box starts hidden.

import { BASE_URL, newDiagnosticPage, assertNoErrors, printReport } from "./helpers.mjs";

export async function run(browser) {
  const results = [];
  const diag = await newDiagnosticPage(browser);
  const { page } = diag;

  const res = await page.goto(BASE_URL + "/", {
    waitUntil: "networkidle",
    timeout: 20000,
  });
  results.push({ pass: res.status() === 200, detail: `page load HTTP ${res.status()}` });

  const providerVisible = await page.isVisible("#toolbar-text-provider");
  results.push({ pass: providerVisible, detail: "#toolbar-text-provider visible" });

  const errorBoxVisible = await page
    .locator("#error-box.visible")
    .count()
    .then((n) => n === 0);
  results.push({ pass: errorBoxVisible, detail: "#error-box not showing an error on load" });

  assertNoErrors(diag, results);

  await diag.context.close();
  return printReport("smoke", results);
}
