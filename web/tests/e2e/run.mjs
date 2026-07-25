#!/usr/bin/env node
// run.mjs — e2e suite runner.
//
// Default (`node run.mjs` / `npm test`): the fast tier — smoke, genre-
// switching, genre-pack import, narration/audio, settings modal. All DOM-only,
// no network calls beyond the local dev server, safe to run as often as you
// like (e.g. before/after every step of the pending carousel/genre-pack-
// registration refactor).
//
// `--full` (`npm run test:full`): additionally runs full-generation.mjs, which
// makes one real Anthropic/Gemini API call. Not part of the default run.

import { chromium, ensureServer } from "./helpers.mjs";
import * as smoke from "./smoke.mjs";
import * as genreSwitching from "./genre-switching.mjs";
import * as genrePackImport from "./genre-pack-import.mjs";
import * as narrationAudio from "./narration-audio.mjs";
import * as settingsModal from "./settings-modal.mjs";
import * as fullGeneration from "./full-generation.mjs";

const FAST_SUITES = [smoke, genreSwitching, genrePackImport, narrationAudio, settingsModal];
const runFull = process.argv.includes("--full");

async function main() {
  const { started } = await ensureServer();
  if (started) console.log("Started web/serve.sh for this test run (left running).");

  const browser = await chromium.launch();
  const suites = runFull ? [...FAST_SUITES, fullGeneration] : FAST_SUITES;

  let totalPass = 0;
  let totalCount = 0;
  for (const suite of suites) {
    try {
      const { pass, total } = await suite.run(browser);
      totalPass += pass;
      totalCount += total;
    } catch (err) {
      console.error(`\n=== ${suite.name ?? "suite"} CRASHED ===\n${err.stack ?? err}`);
      totalPass += 0;
      totalCount += 1; // count the crash itself as one failed assertion
    }
  }

  await browser.close();

  console.log(`\n${"=".repeat(40)}`);
  console.log(`TOTAL: ${totalPass}/${totalCount} passed`);
  if (!runFull) {
    console.log(`(fast tier only — run with --full to also include the paid full-generation test)`);
  }

  process.exit(totalPass === totalCount ? 0 : 1);
}

main().catch((err) => {
  console.error("Test runner crashed:", err);
  process.exit(1);
});
