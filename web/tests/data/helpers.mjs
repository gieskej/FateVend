// helpers.mjs (data tier)
// Tiny, dependency-free report printer shared by the data-integrity checks in
// this directory. Deliberately does NOT import anything from tests/e2e/ —
// these checks touch only the generator modules (registry.js/index.js), never
// a browser or the dev server, and should stay that way (near-instant, no
// Playwright/serve.sh required).

export function printReport(suiteName, results) {
  console.log(`\n=== ${suiteName} ===`);
  let pass = 0;
  results.forEach((r, i) => {
    const status = r.pass ? "PASS" : "FAIL";
    if (r.pass) pass++;
    console.log(`${i + 1}. [${status}] ${r.detail}`);
  });
  console.log(`${suiteName}: ${pass}/${results.length} passed`);
  return { pass, total: results.length };
}
