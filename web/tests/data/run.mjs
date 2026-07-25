#!/usr/bin/env node
// run.mjs — data-integrity tier runner.
// Pure Node, no browser or dev server: icon-file existence sweep (exhaustive,
// every genre/table) + bulk-roll consistency check (50 rolls/genre). Both are
// near-instant (well under a second combined), so they're folded into the
// default `npm test` ahead of the browser-driven e2e tier in
// web/tests/e2e/run.mjs.

import * as iconFiles from "./icon-files.mjs";
import * as bulkRoll from "./bulk-roll.mjs";

async function main() {
  let totalPass = 0;
  let totalCount = 0;
  for (const suite of [iconFiles, bulkRoll]) {
    const { pass, total } = await suite.run();
    totalPass += pass;
    totalCount += total;
  }

  console.log(`\n${"=".repeat(40)}`);
  console.log(`DATA TIER TOTAL: ${totalPass}/${totalCount} passed`);
  process.exit(totalPass === totalCount ? 0 : 1);
}

main().catch((err) => {
  console.error("Data-tier runner crashed:", err);
  process.exit(1);
});
