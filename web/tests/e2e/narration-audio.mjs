// narration-audio.mjs (fast tier — no AI calls, no real TTS network calls)
// Exercises the window-bridged narration.js and audio.js entry points directly
// (the "browser" TTS provider needs no network call; the player/SFX controls
// just touch local <audio> elements) to catch a regression in the app.js <->
// narration.js <-> audio.js wiring — e.g. a stale import, a shadowed variable,
// or a dropped export — the same class of bug the api.js/narration.js/audio.js
// extractions this session were smoke-tested against by hand.

import { BASE_URL, newDiagnosticPage, assertNoErrors, printReport } from "./helpers.mjs";

async function tryCall(page, results, label, fn) {
  const outcome = await page.evaluate(fn).then(
    () => "ok",
    (e) => "THREW: " + e.message,
  );
  results.push({ pass: outcome === "ok", detail: `${label} — ${outcome}` });
}

export async function run(browser) {
  const results = [];
  const diag = await newDiagnosticPage(browser);
  const { page } = diag;

  await page.goto(BASE_URL + "/", { waitUntil: "networkidle", timeout: 20000 });

  await tryCall(page, results, "setTtsProvider('browser')", () => window.setTtsProvider("browser"));
  await tryCall(page, results, "narrate('hello world', null)", () => window.narrate("hello world", null));
  await tryCall(page, results, "stopNarration()", () => window.stopNarration());
  await tryCall(page, results, "narrateAll() with no output yet", () => window.narrateAll());
  await tryCall(page, results, "setTtsProvider('off')", () => window.setTtsProvider("off"));

  await tryCall(page, results, "playerPlay()", () => window.playerPlay());
  await tryCall(page, results, "playerNext()", () => window.playerNext());
  await tryCall(page, results, "playerPrev()", () => window.playerPrev());
  await tryCall(page, results, "playerStop()", () => window.playerStop());

  assertNoErrors(diag, results, "no console errors / failed requests from narration/audio calls");

  await diag.context.close();
  return printReport("narration-audio", results);
}
