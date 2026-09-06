// genre-switching.mjs (fast tier — no AI calls)
// Rolls phase 1 (local stat/skeleton generation, no API call) for every
// built-in genre, both via the toolbar <select> (setGenre/onToolbarGenreChange)
// and via the carousel's prev/next step (carouselStep -> goToCarouselIndex ->
// setGenre). This is the highest-value regression coverage for the carousel/
// genre-registration code that's about to be refactored: it exercises
// setGenre, preloadGenreIcons, and packIconUrl end to end for every genre, so
// a broken icon-resolution path (like the stale sample-pack bug found this
// session) shows up as a console error here.

import {
  BASE_URL,
  newDiagnosticPage,
  assertNoErrors,
  printReport,
} from "./helpers.mjs";

const GENRES = [
  "fantasy",
  "historical-korea-joseon-dynasty",
  "modern",
  "nihongi",
  "manga-osaka-highschool1987",
  "paleolithic",
  "sci-fi",
];

async function rollPhase1(page, results, label) {
  await page.click("#btn-generate");
  try {
    await page.waitForSelector("#btn-continue", {
      timeout: 15000,
      state: "visible",
    });
    results.push({ pass: true, detail: `${label}: phase 1 completed` });
  } catch {
    results.push({
      pass: false,
      detail: `${label}: phase 1 did NOT complete (#btn-continue never appeared)`,
    });
  }
}

export async function run(browser) {
  const results = [];
  const diag = await newDiagnosticPage(browser);
  const { page } = diag;

  await page.goto(BASE_URL + "/", { waitUntil: "networkidle", timeout: 20000 });

  // Select each genre via the toolbar dropdown (setGenre path) and roll phase 1.
  for (const id of GENRES) {
    await page.selectOption("#genre-select", id);
    await page.waitForTimeout(150); // let preloadGenreIcons/render settle
    await rollPhase1(page, results, `select-dropdown(${id})`);
  }

  // Walk the carousel forward through a full loop via carouselStep (the
  // window-bridged handler behind the prev/next arrows), confirming setGenre
  // stays in sync with the toolbar dropdown at each step.
  for (let i = 0; i < GENRES.length; i++) {
    await page.evaluate(() => window.carouselStep(1));
    await page.waitForTimeout(250); // carousel's own fade/re-render delay
    const selectValue = await page.$eval("#genre-select", (el) => el.value);
    results.push({
      pass: GENRES.includes(selectValue),
      detail: `carouselStep(1) #${i + 1}: toolbar select synced to "${selectValue}"`,
    });
  }

  // A skeleton is rolled from one genre's tables, so it must not survive a
  // switch: rolling as Fantasy and then choosing Sci-Fi used to leave the orc
  // on screen with a live "Generate Scenario" button, which sent that character
  // to the AI as a space-station story.
  await page.selectOption("#genre-select", "fantasy");
  await page.waitForTimeout(150);
  await rollPhase1(page, results, "clear-on-switch setup(fantasy)");

  await page.selectOption("#genre-select", "sci-fi");
  await page.waitForTimeout(600);
  const afterSwitch = await page.evaluate(() => ({
    continueBtn: !!document.getElementById("btn-continue"),
    cards: document.querySelectorAll("#output-area .card").length,
    emptyState: !!document.getElementById("empty-state"),
  }));
  results.push({
    pass:
      !afterSwitch.continueBtn &&
      afterSwitch.cards === 0 &&
      afterSwitch.emptyState,
    detail:
      `switching genre after a roll clears the reels and skeleton ` +
      `(continue button: ${afterSwitch.continueBtn}, cards: ${afterSwitch.cards}, ` +
      `empty state restored: ${afterSwitch.emptyState})`,
  });

  // The inverse: re-asserting the SAME genre must not throw away a fresh roll.
  // setGenre() is also called to sync the toolbar and carousel to each other.
  await rollPhase1(page, results, "clear-on-switch setup(sci-fi)");
  await page.selectOption("#genre-select", "sci-fi");
  await page.waitForTimeout(400);
  const sameGenre = await page.evaluate(
    () => !!document.getElementById("btn-continue"),
  );
  results.push({
    pass: sameGenre,
    detail: "re-selecting the current genre keeps the rolled character",
  });

  assertNoErrors(
    diag,
    results,
    "no console errors / failed requests across all genre switches",
  );

  await diag.context.close();
  return printReport("genre-switching", results);
}
