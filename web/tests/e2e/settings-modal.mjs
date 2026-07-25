// settings-modal.mjs (fast tier — no AI calls)
// Opens Settings, walks through every tab, and closes it again via the
// window-bridged handlers, confirming the modal's open/close class toggle and
// each tab panel's active-class swap still work.

import { BASE_URL, newDiagnosticPage, assertNoErrors, printReport } from "./helpers.mjs";

const TABS = ["text", "image", "narration", "options", "genre"];

export async function run(browser) {
  const results = [];
  const diag = await newDiagnosticPage(browser);
  const { page } = diag;

  await page.goto(BASE_URL + "/", { waitUntil: "networkidle", timeout: 20000 });

  await page.evaluate(() => window.openSettings());
  const opened = await page.locator(".settings-overlay.open").count();
  results.push({ pass: opened === 1, detail: "openSettings() adds .open class" });

  for (const tab of TABS) {
    await page.evaluate((t) => window.switchSettingsTab(t), tab);
    const active = await page.locator(`#tab-${tab}.active`).count();
    results.push({ pass: active === 1, detail: `switchSettingsTab("${tab}") activates #tab-${tab}` });
  }

  await page.evaluate(() => window.closeSettings());
  const closed = await page.locator(".settings-overlay.open").count();
  results.push({ pass: closed === 0, detail: "closeSettings() removes .open class" });

  assertNoErrors(diag, results, "no console errors / failed requests from settings modal");

  await diag.context.close();
  return printReport("settings-modal", results);
}
