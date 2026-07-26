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

  // Remove a pack while it's the *active* genre — exercises the carousel's
  // removal fallback path (resetCarouselIndex + setGenre to the first genre),
  // which the import/roll steps above never touch. The active genre must fall
  // back to a valid built-in and the carousel must re-render a current card.
  await page.selectOption("#genre-select", "sample-neon-drift");
  await page.waitForTimeout(150);
  await page.evaluate(() => window.openSettings());
  await page.evaluate(() => window.switchSettingsTab("genre"));
  await page.click('[data-remove-pack="sample-neon-drift"]');
  await page.waitForTimeout(400);
  const stillListed = await page.$eval("#genre-select", (el) =>
    [...el.options].some((o) => o.value === "sample-neon-drift"),
  );
  results.push({ pass: !stillListed, detail: "removed pack is gone from #genre-select" });
  const activeGenre = await page.$eval("#genre-select", (el) => el.value);
  results.push({
    pass: activeGenre !== "sample-neon-drift" && activeGenre.length > 0,
    detail: `active genre fell back to a valid genre ("${activeGenre}") after removing the active pack`,
  });
  const hasCurrentCard = await page.locator(".genre-card-current").count();
  results.push({ pass: hasCurrentCard === 1, detail: "carousel re-rendered a current card after removal" });
  await page.evaluate(() => window.closeSettings());

  assertNoErrors(diag, results, "no console errors / failed requests across imports, rolls, and removal");

  await diag.context.close();
  return printReport("genre-pack-import", results);
}
