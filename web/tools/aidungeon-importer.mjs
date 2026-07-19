#!/usr/bin/env node
// web/tools/aidungeon-importer.mjs
// Imports a FateVend scenario package into AI Dungeon using Playwright.
//
// Usage:
//   node web/tools/aidungeon-importer.mjs --input <path-to-scenario-folder>
//   node web/tools/aidungeon-importer.mjs --input <path> --headed --slowmo 200
//
// Credentials: AIDUNGEON_EMAIL and AIDUNGEON_PASSWORD in .env at project root.

import {
  readFileSync,
  writeFileSync,
  existsSync,
  unlinkSync,
  mkdirSync,
} from "node:fs";
import { resolve, join, dirname } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { tmpdir } from "node:os";

// ── .env loader ───────────────────────────────────────────────────────────────
const __dir = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(__dir, "../..");
const envPath = join(projectRoot, ".env");
if (existsSync(envPath)) {
  for (const line of readFileSync(envPath, "utf8").split("\n")) {
    const m = line.match(/^\s*([A-Z_][A-Z0-9_]*)\s*=\s*(.*?)\s*$/);
    if (m && !process.env[m[1]])
      process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
  }
}

// ── Arg parsing ───────────────────────────────────────────────────────────────
const args = process.argv.slice(2);
function flag(name) {
  return args.includes(name);
}
function opt(name) {
  const i = args.indexOf(name);
  return i !== -1 && args[i + 1] ? args[i + 1] : null;
}

const inputFolder = opt("--input");
const headed = flag("--headed");
const slowMo = parseInt(opt("--slowmo") ?? "0", 10);
const debugScreenshotDir = opt("--debug-screenshots");

if (!inputFolder) {
  console.error(
    "Usage: node aidungeon-importer.mjs --input <scenario-folder> [--headed] [--slowmo 200] [--debug-screenshots <dir>]",
  );
  process.exit(1);
}

const scenarioPath = resolve(inputFolder, "scenario.json");
const portraitPath = resolve(inputFolder, "portrait.png");

if (!existsSync(scenarioPath)) {
  console.error(`scenario.json not found in: ${inputFolder}`);
  process.exit(1);
}

const { scenario, characters } = JSON.parse(readFileSync(scenarioPath, "utf8"));

const email = process.env.AIDUNGEON_EMAIL;
const password = process.env.AIDUNGEON_PASSWORD;
if (!email || !password) {
  console.error(
    "Set AIDUNGEON_EMAIL and AIDUNGEON_PASSWORD in .env or environment.",
  );
  process.exit(1);
}

// ── Story cards temp file ─────────────────────────────────────────────────────
// AI Dungeon rejects imports if any card's value exceeds 1000 bytes.
const MAX_CARD_BYTES = 1000;

function toStoryCard({ keys, value, type, title }) {
  const encoded = new TextEncoder().encode(value);
  let truncated = value;
  if (encoded.length > MAX_CARD_BYTES) {
    // Truncate to MAX_CARD_BYTES bytes, then back to valid UTF-8 string boundary.
    truncated =
      new TextDecoder().decode(encoded.slice(0, MAX_CARD_BYTES - 1)).trimEnd() +
      "…";
    console.warn(
      `  Truncated "${title}" from ${encoded.length} → ${MAX_CARD_BYTES} bytes`,
    );
  }
  return {
    keys,
    value: truncated,
    type,
    title,
    description: "",
    useForCharacterCreation: false,
  };
}

// Each genre's static-cards.js export maps to an AI Dungeon story card "type".
const STATIC_CARD_TYPE_MAP = {
  STATIC_CHARACTERS: "character",
  STATIC_CLASSES: "class",
  STATIC_RACES: "race",
  STATIC_LOCATIONS: "location",
  STATIC_FACTIONS: "faction",
  STATIC_CUSTOM: "custom",
};

// Loads generator/genres/<genre>/static-cards.js (if it exists) and flattens
// its STATIC_* exports into { name, triggers, entry, type } entries.
async function loadStaticCards(genre) {
  if (!genre) {
    console.warn(
      "  No scenario.genre in scenario.json — skipping genre static cards.",
    );
    return [];
  }
  const staticCardsPath = join(
    projectRoot,
    "web",
    "generator",
    "genres",
    genre,
    "static-cards.js",
  );
  if (!existsSync(staticCardsPath)) {
    console.warn(
      `  No static-cards.js for genre "${genre}" — skipping genre static cards.`,
    );
    return [];
  }
  const mod = await import(pathToFileURL(staticCardsPath).href);
  const cards = [];
  for (const [exportName, type] of Object.entries(STATIC_CARD_TYPE_MAP)) {
    for (const item of mod[exportName] ?? []) {
      cards.push({ ...item, type });
    }
  }
  return cards;
}

const npcCards = Object.entries(characters ?? {}).map(([fullName, value]) =>
  toStoryCard({
    keys: `${fullName.split(" ")[0]}, ${fullName}`,
    value,
    type: "character",
    title: fullName,
  }),
);

const genreStaticCards = await loadStaticCards(scenario.genre);
const staticCards = genreStaticCards.map(({ name, triggers, entry, type }) =>
  toStoryCard({ keys: triggers, value: entry, type, title: name }),
);

const storyCards = [...npcCards, ...staticCards];
console.log(
  `Story cards prepared: ${npcCards.length} character cards + ${staticCards.length} genre static cards (${storyCards.length} total).`,
);

const tempCardsPath = join(tmpdir(), `fatevend-story-cards-${Date.now()}.json`);
writeFileSync(tempCardsPath, JSON.stringify(storyCards, null, 2));

// ── Playwright ────────────────────────────────────────────────────────────────
let chromium;
try {
  ({ chromium } = await import("playwright"));
} catch {
  console.error(
    "Playwright not installed. Run:\n  npm install --save-dev playwright\n  npx playwright install chromium",
  );
  process.exit(1);
}

const browser = await chromium.launch({ headless: !headed, slowMo });
const page = await browser.newPage();
page.setDefaultTimeout(20_000);

// Triple-click to select all, then fill — works for both input and textarea.
async function fill(locator, text) {
  await locator.click({ clickCount: 3 });
  await locator.fill(text);
}

// Opt-in debug screenshots (--debug-screenshots <dir>) — a no-op unless passed.
if (debugScreenshotDir) mkdirSync(debugScreenshotDir, { recursive: true });
let shotCount = 0;
async function snap(label) {
  if (!debugScreenshotDir) return;
  const name = `${String(++shotCount).padStart(3, "0")}-${label}.png`;
  await page
    .screenshot({ path: join(debugScreenshotDir, name), fullPage: true })
    .catch(() => {});
}

// Click a tab by its visible label text.
async function clickTab(label) {
  const byRole = page.getByRole("tab", { name: new RegExp(label, "i") });
  const byText = page.getByText(label, { exact: true });
  const tab = (await byRole.count()) > 0 ? byRole.first() : byText.first();
  await tab.click();
  await page.waitForTimeout(600);
}

// The New Story Card form's TYPE field lost its role="combobox" in a live-site
// update (verified 2026-07-14 — it's now a plain <button>, role: null, with no
// ARIA semantics at all; the dropdown's options are still role="option" though,
// role="listbox" for the list itself). It is NOT wrapped in an element with
// role="dialog" either (verified live — zero role="dialog" elements on the
// page), so that must not be used to scope this lookup. Instead, find the
// button by its fixed position immediately after the "Type" label (the visible
// "TYPE" is CSS text-transform:uppercase — the actual DOM text is "Type").
// Options: Character, Class, Race, Location, Faction, Custom. Only the FIRST
// card of a run defaults to "Character" — the form remembers the last type
// selected, so this reads the button's current text each time (which also
// includes a literal icon-ligature suffix like "Characterw_chevron_down",
// hence startsWith rather than an exact match) rather than assuming a default.
async function setCardType(type) {
  const label = type.charAt(0).toUpperCase() + type.slice(1); // 'class' -> 'Class'
  const typeButton = page
    .getByText("Type", { exact: true })
    .locator("xpath=following::button[1]");
  const current = (await typeButton.textContent())?.trim();
  if (current && current.startsWith(label)) return; // already showing the type we want
  await typeButton.click();
  await page.waitForTimeout(300);
  await page.getByRole("option", { name: label, exact: true }).click();
  await page.waitForTimeout(300);
}

// Read back a filled field and warn if it's empty or doesn't start with expected text.
async function validate(locator, fieldName, expected) {
  const actual = await locator.inputValue().catch(() => locator.textContent());
  const ok =
    actual &&
    actual.trim().length > 0 &&
    actual.trim().startsWith(expected.trim().slice(0, 20));
  if (!ok) {
    console.warn(
      `  WARNING: "${fieldName}" may not have been saved. Read back: "${String(actual).slice(0, 60)}"`,
    );
  } else {
    console.log(`  ✓ ${fieldName}: "${String(actual).slice(0, 60)}…"`);
  }
  return ok;
}

try {
  // ── Auth ──────────────────────────────────────────────────────────────────
  console.log("Signing in…");
  await page.goto("https://play.aidungeon.com/signin", {
    waitUntil: "domcontentloaded",
  });
  await page.waitForTimeout(2000);

  const emailInput = page
    .locator("#email")
    .or(page.getByPlaceholder(/^email$/i))
    .first();
  await emailInput.waitFor({ timeout: 15_000 });
  await emailInput.fill(email);

  const passwordInput = page
    .locator("#password")
    .or(page.getByPlaceholder(/^password$/i))
    .first();
  await passwordInput.fill(password);

  await page
    .getByLabel("auth-page")
    .getByRole("button", { name: "Sign in", exact: true })
    .click();
  await page.waitForURL((url) => !url.pathname.includes("/signin"), {
    timeout: 15_000,
  });
  console.log("Signed in.");

  // ── Navigate to Create Scenario ───────────────────────────────────────────
  // /scenario/create redirects to home — go via the Play menu instead.
  const playBtn = page
    .getByRole("button", { name: /play/i })
    .or(page.getByRole("link", { name: /play/i }))
    .first();
  await playBtn.waitFor({ timeout: 10_000 });
  await playBtn.click();
  await page.waitForTimeout(600);

  const createScenario = page.getByText("Create a Scenario", { exact: true });
  await createScenario.waitFor({ timeout: 8_000 });
  await createScenario.click();
  await page.waitForTimeout(1500);

  // Template picker: click Empty
  await page.getByText("Empty", { exact: true }).waitFor({ timeout: 15_000 });
  await page.getByText("Empty", { exact: true }).click();

  // Wait for the Edit Scenario tab bar (confirms the form loaded).
  await page
    .locator('[aria-label*="tab" i]')
    .first()
    .waitFor({ timeout: 15_000 });
  await page.waitForTimeout(500);

  // ── Details tab — navigate explicitly before filling title ────────────────
  await clickTab("DETAILS");

  // Title is the first plain input that isn't the nav search box.
  const titleInput = page.locator('input:not([role="searchbox"])').first();
  await titleInput.waitFor({ timeout: 10_000 });
  await fill(titleInput, scenario.title);
  await validate(titleInput, "Title", scenario.title);

  const descInput = page.getByPlaceholder(/provide a brief description/i);
  await fill(descInput, scenario.description);
  await validate(descInput, "Description", scenario.description);

  // ── Tags ──────────────────────────────────────────────────────────────────
  const tags = scenario.tags ?? [];
  if (tags.length > 0) {
    console.log(`Adding ${tags.length} tags…`);
    const tagInput = page.getByPlaceholder(/dragons, magic/i);
    if ((await tagInput.count()) > 0) {
      // The + button is aria-labelled "Add undefined" (their bug) and may render + via CSS.
      // Find it by aria-label; fall back to Enter key if the button never appears.
      const addBtn = page.locator('[role="button"][aria-label*="Add"]');
      for (const tag of tags) {
        await tagInput.fill(tag);
        // Wait for the button to leave its disabled state
        await page
          .waitForFunction(
            () =>
              document
                .querySelector('[role="button"][aria-label*="Add"]')
                ?.getAttribute("aria-disabled") !== "true",
            { timeout: 3_000 },
          )
          .catch(() => {});
        const btnVisible = (await addBtn.count()) > 0;
        if (btnVisible) {
          await addBtn.click();
        } else {
          await tagInput.press("Enter");
        }
        await page.waitForTimeout(300);
      }
      console.log("Tags added.");
    } else {
      console.warn("Tag input not found — skipping tags.");
    }
  }
  console.log("Details filled.");

  // ── Plot tab ──────────────────────────────────────────────────────────────
  await clickTab("PLOT");

  async function addPlotComponent(componentName) {
    await page.getByText("ADD PLOT COMPONENT").click();
    const item = page.getByText(componentName, { exact: true });
    await item.waitFor({ timeout: 8_000 });
    await item.click();
    await page.waitForTimeout(500);
  }

  await addPlotComponent("Story Summary");
  await addPlotComponent("Plot Essentials");
  await addPlotComponent("Author's Note");

  const openingField = page.getByPlaceholder(/how does your story begin/i);
  await fill(openingField, `${scenario.description}\n\n${scenario.opening}`);
  await validate(openingField, "Opening", scenario.description);

  const summaryField = page.getByPlaceholder(/a summary of the adventure/i);
  await fill(summaryField, scenario.opening);
  await validate(summaryField, "Story Summary", scenario.opening);

  if (scenario.plotEssentials) {
    const peField = page.getByPlaceholder(/enter important information/i);
    await fill(peField, scenario.plotEssentials);
    await validate(peField, "Plot Essentials", scenario.plotEssentials);
  }

  if (scenario.authorNote) {
    const anField = page.getByPlaceholder(/influence the ai.?s writing style/i);
    await fill(anField, scenario.authorNote);
    await validate(anField, "Author's Note", scenario.authorNote);
  }
  console.log("Plot filled.");

  // ── Story Cards tab ───────────────────────────────────────────────────────
  // The file-import flow uses a native file input whose change event has
  // isTrusted:false when dispatched programmatically, which AI Dungeon rejects.
  // Instead, create each card individually via the CREATE STORY CARD form.
  await clickTab("STORY CARDS");
  await page.waitForTimeout(800);

  for (let i = 0; i < storyCards.length; i++) {
    const card = storyCards[i];
    console.log(`  Creating card ${i + 1}/${storyCards.length}: ${card.title}`);

    try {
      await page.getByRole("button", { name: /create story card/i }).click();
      await page.waitForTimeout(800);
      await snap(`card${i}-00-form-opened`);

      // TYPE field — defaults to "Character"; only needs changing for the rest.
      await setCardType(card.type);
      await snap(`card${i}-01-type-set-${card.type}`);

      // "Custom" reveals an extra free-text sub-type field ("Enter a custom type...")
      // with no equivalent in our data — fill it with a generic label rather than
      // leave it blank.
      if (card.type === "custom") {
        const customTypeField = page.getByPlaceholder(/enter a custom type/i);
        if ((await customTypeField.count()) > 0)
          await fill(customTypeField, "Lore");
      }

      // NAME field — "Enter a name..."
      const nameField = page.getByPlaceholder(/enter a name/i);
      await nameField.waitFor({ timeout: 8_000 });
      await fill(nameField, card.title);
      await snap(`card${i}-02-name-filled`);

      // ENTRY field — aria-label="Value", limit 1000 chars.
      const valueField = page.locator('[aria-label="Value"]');
      await fill(valueField, card.value);
      await snap(`card${i}-03-value-filled`);

      // TRIGGERS field — "Enter a comma separated list triggers..."
      const triggersField = page
        .getByPlaceholder(/comma separated.*trigger|enter.*trigger/i)
        .or(page.locator('[aria-label*="Trigger" i]'));
      if ((await triggersField.count()) > 0) {
        await triggersField.first().scrollIntoViewIfNeeded();
        await fill(triggersField.first(), card.keys);
      }
      await snap(`card${i}-04-triggers-filled`);

      // FINISH button inside the "New Story Card" form (rendered as a portal, so it is
      // last in DOM order when the form is open; the scenario FINISH is first).
      await page
        .getByRole("button", { name: /^finish$/i })
        .last()
        .click();
      await snap(`card${i}-05-finish-clicked`);
      // Wait for the form to close before opening the next card — the NAME field only
      // exists while it's open (there's no role="dialog" wrapper to key off of here).
      await nameField
        .waitFor({ state: "detached", timeout: 5_000 })
        .catch(() => {});
      await page.waitForTimeout(300);
      await snap(`card${i}-06-form-closed`);
    } catch (err) {
      await snap(`card${i}-ERROR`);
      console.error(
        `  FAILED on card ${i + 1}/${storyCards.length} ("${card.title}", type=${card.type}): ${err.message}`,
      );
      throw err;
    }
  }

  console.log(`Story cards created: ${storyCards.length}.`);

  // ── Portrait upload ───────────────────────────────────────────────────────
  if (scenario.nsfw) {
    console.log("Skipping portrait upload — scenario is marked NSFW.");
  } else if (existsSync(portraitPath)) {
    await clickTab("DETAILS");
    await page.waitForTimeout(800);
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(400);
    await snap("portrait-00-details-tab");

    // Capture the Content Image's current src (its background/dimmed presence
    // persists in the DOM even while the Images modal is open on top of it) so
    // we can later detect the exact moment it actually changes to the new upload.
    const contentImageBefore = await page
      .locator('img[alt="Content Image"]')
      .first()
      .getAttribute("src")
      .catch(() => null);

    // The portrait container wraps img[alt="Content Image"].
    // Tab overlays intercept Playwright clicks so dispatch the event programmatically.
    await page.evaluate(() => {
      const img = document.querySelector('img[alt="Content Image"]');
      if (!img) return;
      let el = img.parentElement;
      while (
        el &&
        el.tagName !== "BUTTON" &&
        el.getAttribute("role") !== "button"
      ) {
        el = el.parentElement;
      }
      (el ?? img).dispatchEvent(
        new MouseEvent("click", { bubbles: true, cancelable: true }),
      );
    });
    await page.waitForTimeout(800);
    await snap("portrait-01-images-modal-opened");

    // "Images" modal — click "Upload" in the left sidebar.
    const uploadSidebar = page.getByText("Upload", { exact: true });
    await uploadSidebar.waitFor({ timeout: 8_000 });
    await uploadSidebar.click();
    await page.waitForTimeout(600);
    await snap("portrait-02-upload-panel-opened");

    // Trigger the file chooser by programmatically clicking the hidden input.
    // This fires a real browser chooser event (unlike setInputFiles which bypasses React).
    const [portraitChooser] = await Promise.all([
      page.waitForEvent("filechooser"),
      page.evaluate(() =>
        document.querySelector('input[type="file"]')?.click(),
      ),
    ]);
    await portraitChooser.setFiles(portraitPath);

    // Once the upload finishes, AI Dungeon applies it and closes the modal on its
    // own — there is no confirm/SELECT step for a freshly uploaded file (verified
    // live 2026-07-15: the Content Image banner updated and the modal closed with
    // zero clicks after setFiles()). This was the actual cause of the historic
    // "flaky" portrait uploads: the old code unconditionally clicked a "SELECT"
    // button that belongs to a different flow (choosing an existing image from
    // the gallery grid), landing on an unrelated stock/template image instead of
    // the real upload depending on timing. Just wait for the Content Image's own
    // src to actually change.
    try {
      await page.waitForFunction(
        (prevSrc) => {
          const img = document.querySelector('img[alt="Content Image"]');
          return (
            !!img?.getAttribute("src") && img.getAttribute("src") !== prevSrc
          );
        },
        contentImageBefore,
        { timeout: 20_000 },
      );
      await snap("portrait-03-content-image-updated");
      console.log("Portrait uploaded.");
    } catch {
      await snap("portrait-03-ERROR-no-change-detected");
      console.warn(
        "  Content Image did not change within 20s — portrait upload may have failed. Continuing anyway.",
      );
    }
  } else {
    console.warn("portrait.png not found — skipping portrait upload.");
  }

  // ── Save ──────────────────────────────────────────────────────────────────
  await snap("portrait-05-before-final-finish");
  // The scenario editor always has one FINISH; use .first() in case any dialog is still animating.
  await page
    .getByRole("button", { name: /^finish$/i })
    .first()
    .click();
  await page.waitForTimeout(2000);
  await snap("portrait-06-after-final-finish");
  console.log("\nDone! Scenario URL:", page.url());
} finally {
  try {
    unlinkSync(tempCardsPath);
  } catch {
    /* already gone */
  }
  await browser.close();
}
