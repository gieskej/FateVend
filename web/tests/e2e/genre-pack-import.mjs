// genre-pack-import.mjs (fast tier — no AI calls)
// Imports both bundled sample packs (the JSON-only Neon Drift reskin and the
// self-contained Pirate Cove zip) through the real Settings -> Genre UI, then
// rolls phase 1 for each. This is a direct regression test for the exact bug
// class hit this session: a stale pack whose sentiments/species no longer
// match the canonical vocabulary or icon roster shows up as a console error
// here (a broken icon fetch, or an undefined lookup) the same way it did by
// hand in the browser.

import path from "node:path";
import { fileURLToPath } from "node:url";
import { BASE_URL, newDiagnosticPage, assertNoErrors, printReport } from "./helpers.mjs";

const WEB_DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");
const PACKS = [
  { file: "genre-packs/sample-neon-drift.json", id: "sample-neon-drift", label: "Neon Drift" },
  { file: "genre-packs/example-pirate-cove.zip", id: "example-pirate-cove", label: "Pirate Cove" },
];

export async function run(browser) {
  const results = [];
  const diag = await newDiagnosticPage(browser);
  const { page } = diag;

  await page.goto(BASE_URL + "/", { waitUntil: "networkidle", timeout: 20000 });

  await page.evaluate(() => window.openSettings());
  await page.evaluate(() => window.switchSettingsTab("genre"));

  for (const pack of PACKS) {
    const filePath = path.join(WEB_DIR, pack.file);
    await page.setInputFiles("#genre-pack-file", filePath);

    try {
      await page.waitForFunction(
        () => {
          const el = document.getElementById("genre-pack-status");
          return el && /Installed|Import failed|Invalid pack|built-in genre id/.test(el.textContent);
        },
        { timeout: 10000 },
      );
    } catch {
      /* fall through — the assertion below reports the stuck status text */
    }
    const status = await page.$eval("#genre-pack-status", (el) => el.textContent);
    results.push({
      pass: /Installed/.test(status),
      detail: `${pack.label}: install status — "${status}"`,
    });

    const hasOption = await page.$eval(
      "#genre-select",
      (el, id) => [...el.options].some((o) => o.value === id),
      pack.id,
    );
    results.push({ pass: hasOption, detail: `${pack.label}: appears in #genre-select as "${pack.id}"` });
  }

  await page.evaluate(() => window.closeSettings());

  // Roll phase 1 for each installed pack — exercises setGenre/preloadGenreIcons/
  // packIconUrl against the pack's blob: URLs (JSON pack has none, so it falls
  // back to iconBase; the zip pack's icons resolve via PACK_ICON_URLS blobs).
  for (const pack of PACKS) {
    await page.selectOption("#genre-select", pack.id);
    await page.waitForTimeout(150);
    await page.click("#btn-generate");
    try {
      await page.waitForSelector("#btn-continue", { timeout: 15000, state: "visible" });
      results.push({ pass: true, detail: `${pack.label}: phase 1 completed` });
    } catch {
      results.push({ pass: false, detail: `${pack.label}: phase 1 did NOT complete` });
    }
  }

  assertNoErrors(diag, results, "no console errors / failed requests across both pack imports + rolls");

  await diag.context.close();
  return printReport("genre-pack-import", results);
}
