// mobile.mjs (fast tier — no AI calls)
// Layout validation at a phone viewport (390x844, touch, see MOBILE_CONTEXT).
// The app is used on phones as much as desktop, but every other suite here runs
// at the default desktop size, so mobile-only regressions — a element that
// overflows the screen, a control that lands off the right edge, a breakpoint
// that stops firing — would otherwise go unnoticed until someone opened it on a
// real phone.
//
// The assertions deliberately check *reachability and containment* rather than
// exact pixel values, so they stay true across copy and styling changes: nothing
// may force the page to scroll sideways, and every control must be tappable
// within the screen.

import {
  BASE_URL,
  MOBILE_CONTEXT,
  newDiagnosticPage,
  assertNoErrors,
  printReport,
} from "./helpers.mjs";

// Horizontal page overflow is the classic mobile bug: one too-wide element and
// the whole document scrolls sideways. 1px of slack absorbs sub-pixel rounding.
async function checkNoPageOverflow(page, results, label) {
  const m = await page.evaluate(() => ({
    vw: window.innerWidth,
    docW: document.documentElement.scrollWidth,
  }));
  const ok = m.docW <= m.vw + 1;
  results.push({
    pass: ok,
    detail: ok
      ? `${label}: no horizontal page overflow (${m.docW}px content in ${m.vw}px viewport)`
      : `${label}: page scrolls sideways — ${m.docW}px content in ${m.vw}px viewport (+${m.docW - m.vw})`,
  });
}

export async function run(browser) {
  const results = [];
  const diag = await newDiagnosticPage(browser, MOBILE_CONTEXT);
  const { page } = diag;

  await page.goto(BASE_URL + "/", { waitUntil: "networkidle", timeout: 20000 });
  await page.waitForTimeout(400); // let the carousel art settle

  await checkNoPageOverflow(page, results, "landing");

  // Below the 600px breakpoint the carousel renders only the current card —
  // the prev/next peek cards would not fit and are deliberately dropped.
  const peeks = await page.locator(".genre-card-peek").count();
  results.push({
    pass: peeks === 0,
    detail:
      peeks === 0
        ? "carousel peek cards correctly hidden below the 600px breakpoint"
        : `carousel rendered ${peeks} peek card(s) on a 390px viewport (expected 0)`,
  });

  // Primary actions must be comfortably tappable. 40px is a pragmatic floor
  // (Apple/Google guidance is 44/48) for the two controls a phone user needs
  // before anything else exists on the page.
  for (const sel of ["#btn-generate", ".btn-settings-toolbar"]) {
    const box = await page.locator(sel).first().boundingBox();
    const ok = !!box && box.height >= 40;
    results.push({
      pass: ok,
      detail: ok
        ? `${sel} tap target is ${Math.round(box.height)}px tall (>= 40)`
        : `${sel} tap target too small: ${box ? Math.round(box.height) + "px" : "not visible"}`,
    });
  }

  // ── Settings modal ────────────────────────────────────────────────────
  await page.evaluate(() => window.openSettings());
  await page.waitForTimeout(300);

  await checkNoPageOverflow(page, results, "settings open");

  const modal = await page.evaluate(() => {
    const r = document.querySelector(".settings-modal").getBoundingClientRect();
    return { left: r.left, right: r.right, vw: window.innerWidth };
  });
  const modalFits = modal.left >= -1 && modal.right <= modal.vw + 1;
  results.push({
    pass: modalFits,
    detail: modalFits
      ? "settings modal fits within the viewport"
      : `settings modal extends past the screen (${Math.round(modal.left)}..${Math.round(modal.right)} in ${modal.vw}px)`,
  });

  // The tab strip must either fit its container or be horizontally scrollable —
  // otherwise the rightmost tabs are simply unreachable on a phone.
  const strip = await page.evaluate(() => {
    const el = document.querySelector(".settings-tabs");
    return {
      scrollW: el.scrollWidth,
      clientW: el.clientWidth,
      overflowX: getComputedStyle(el).overflowX,
    };
  });
  const stripOk =
    strip.scrollW <= strip.clientW + 1 ||
    ["auto", "scroll"].includes(strip.overflowX);
  results.push({
    pass: stripOk,
    detail: stripOk
      ? `settings tab strip is contained or scrollable (content ${strip.scrollW}px / box ${strip.clientW}px, overflow-x: ${strip.overflowX})`
      : `settings tab strip overflows and cannot scroll: ${strip.scrollW}px of tabs in a ${strip.clientW}px box with overflow-x: ${strip.overflowX}`,
  });

  // Every tab must be *reachable*. A scrollable strip legitimately parks the
  // last tabs out of view, so scroll it to the end and confirm the final tab
  // lands on screen — that proves the scroll actually solves the problem
  // rather than just hiding it. (Playwright's click() auto-scrolls, so a plain
  // click test would pass even for a tab no real thumb could reach; drive the
  // scroll explicitly and check geometry instead.)
  const lastTab = await page.evaluate(() => {
    const strip = document.querySelector(".settings-tabs");
    strip.scrollLeft = strip.scrollWidth; // clamps to max
    const tabs = [...strip.querySelectorAll(".settings-tab")];
    const last = tabs[tabs.length - 1];
    const r = last.getBoundingClientRect();
    return {
      label: last.textContent.trim(),
      left: r.left,
      right: r.right,
      vw: window.innerWidth,
      scrolled: strip.scrollLeft,
    };
  });
  const reachable = lastTab.left >= -1 && lastTab.right <= lastTab.vw + 1;
  results.push({
    pass: reachable,
    detail: reachable
      ? `last settings tab ("${lastTab.label}") is reachable — on screen after scrolling the strip ${Math.round(lastTab.scrolled)}px`
      : `last settings tab ("${lastTab.label}") still off screen after scrolling the strip to its end (${Math.round(lastTab.left)}..${Math.round(lastTab.right)} in ${lastTab.vw}px)`,
  });

  // Reset the strip so the tab-panel checks below start from a clean state.
  await page.evaluate(() => {
    const s = document.querySelector(".settings-tabs");
    s.scrollLeft = 0;
    s.dispatchEvent(new Event("scroll"));
  });
  await page.waitForTimeout(120);

  // Because the strip's scrollbar is hidden, the only cue that more tabs exist
  // is the wrapper's chevron. Verify it tracks scroll position rather than
  // being always-on (which would be as misleading as no cue at all).
  const affordance = await page.evaluate(async () => {
    const wrap = document.querySelector(".settings-tabs-wrap");
    const strip = document.querySelector(".settings-tabs");
    const read = () => ({
      right: wrap.classList.contains("can-scroll-right"),
      left: wrap.classList.contains("can-scroll-left"),
    });
    const atStart = read();
    strip.scrollLeft = strip.scrollWidth;
    strip.dispatchEvent(new Event("scroll"));
    await new Promise((r) => setTimeout(r, 60));
    const atEnd = read();
    strip.scrollLeft = 0;
    strip.dispatchEvent(new Event("scroll"));
    return { atStart, atEnd };
  });
  const affordanceOk =
    affordance.atStart.right &&
    !affordance.atStart.left &&
    affordance.atEnd.left &&
    !affordance.atEnd.right;
  results.push({
    pass: affordanceOk,
    detail: affordanceOk
      ? 'scroll chevron tracks position — "›" at the start, "‹" once scrolled to the end'
      : `scroll chevron state wrong — at start ${JSON.stringify(affordance.atStart)}, at end ${JSON.stringify(affordance.atEnd)}`,
  });

  // Each panel's own content must not overflow the screen either.
  for (const tab of ["text", "image", "narration", "options", "genre"]) {
    await page.evaluate((t) => window.switchSettingsTab(t), tab);
    await page.waitForTimeout(120);
    await checkNoPageOverflow(page, results, `settings "${tab}" tab`);
  }

  await page.evaluate(() => window.closeSettings());
  await page.waitForTimeout(200);

  // ── Generated output ──────────────────────────────────────────────────
  // The slot machine and character sheet are the widest things the app draws;
  // phase 1 is free (no API call), so roll one and re-check containment.
  await page.click("#btn-generate");
  await page.waitForSelector("#btn-continue", {
    timeout: 15000,
    state: "visible",
  });
  await page.waitForTimeout(400);
  await checkNoPageOverflow(page, results, "after phase-1 roll");

  const sheet = await page.evaluate(() => {
    const el = document.querySelector(".slot-machine");
    if (!el) return null;
    const r = el.getBoundingClientRect();
    return { left: r.left, right: r.right, vw: window.innerWidth };
  });
  const sheetOk = sheet && sheet.left >= -1 && sheet.right <= sheet.vw + 1;
  results.push({
    pass: !!sheetOk,
    detail: sheetOk
      ? "slot machine fits within the viewport"
      : sheet
        ? `slot machine extends past the screen (${Math.round(sheet.left)}..${Math.round(sheet.right)} in ${sheet.vw}px)`
        : "slot machine element not found after roll",
  });

  assertNoErrors(
    diag,
    results,
    "no console errors / failed requests on mobile",
  );

  await diag.context.close();
  return printReport("mobile", results);
}
