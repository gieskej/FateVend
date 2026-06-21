#!/usr/bin/env node
// web/tools/aidungeon-importer.mjs
// Imports a FateVend scenario package into AI Dungeon using Playwright.
//
// Usage:
//   node web/tools/aidungeon-importer.mjs --input <path-to-scenario-folder>
//   node web/tools/aidungeon-importer.mjs --input <path> --headed --slowmo 200
//
// Credentials: AIDUNGEON_EMAIL and AIDUNGEON_PASSWORD in .env at project root.

import { readFileSync, writeFileSync, existsSync, unlinkSync } from 'node:fs';
import { resolve, join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { tmpdir } from 'node:os';

// ── .env loader ───────────────────────────────────────────────────────────────
const __dir = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(__dir, '../..');
const envPath = join(projectRoot, '.env');
if (existsSync(envPath)) {
  for (const line of readFileSync(envPath, 'utf8').split('\n')) {
    const m = line.match(/^\s*([A-Z_][A-Z0-9_]*)\s*=\s*(.*?)\s*$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, '');
  }
}

// ── Arg parsing ───────────────────────────────────────────────────────────────
const args = process.argv.slice(2);
function flag(name) { return args.includes(name); }
function opt(name) {
  const i = args.indexOf(name);
  return i !== -1 && args[i + 1] ? args[i + 1] : null;
}

const inputFolder = opt('--input');
const headed      = flag('--headed');
const slowMo      = parseInt(opt('--slowmo') ?? '0', 10);

if (!inputFolder) {
  console.error('Usage: node aidungeon-importer.mjs --input <scenario-folder> [--headed] [--slowmo 200]');
  process.exit(1);
}

const scenarioPath = resolve(inputFolder, 'scenario.json');
const portraitPath = resolve(inputFolder, 'portrait.png');

if (!existsSync(scenarioPath)) {
  console.error(`scenario.json not found in: ${inputFolder}`);
  process.exit(1);
}

const { scenario, characters } = JSON.parse(readFileSync(scenarioPath, 'utf8'));

const email    = process.env.AIDUNGEON_EMAIL;
const password = process.env.AIDUNGEON_PASSWORD;
if (!email || !password) {
  console.error('Set AIDUNGEON_EMAIL and AIDUNGEON_PASSWORD in .env or environment.');
  process.exit(1);
}

// ── Story cards temp file ─────────────────────────────────────────────────────
// AI Dungeon rejects imports if any card's value exceeds 1000 bytes.
const MAX_CARD_BYTES = 1000;
const storyCards = Object.entries(characters ?? {}).map(([fullName, value]) => {
  const encoded = new TextEncoder().encode(value);
  let truncated = value;
  if (encoded.length > MAX_CARD_BYTES) {
    // Truncate to MAX_CARD_BYTES bytes, then back to valid UTF-8 string boundary.
    truncated = new TextDecoder().decode(encoded.slice(0, MAX_CARD_BYTES - 1)).trimEnd() + '…';
    console.warn(`  Truncated "${fullName}" from ${encoded.length} → ${MAX_CARD_BYTES} bytes`);
  }
  return {
    keys:                    `${fullName.split(' ')[0]}, ${fullName}`,
    value:                   truncated,
    type:                    'character',
    title:                   fullName,
    description:             '',
    useForCharacterCreation: false,
  };
});
console.log(`Story cards prepared: ${storyCards.length} cards.`);

const tempCardsPath = join(tmpdir(), `fatevend-story-cards-${Date.now()}.json`);
writeFileSync(tempCardsPath, JSON.stringify(storyCards, null, 2));

// ── Playwright ────────────────────────────────────────────────────────────────
let chromium;
try {
  ({ chromium } = await import('playwright'));
} catch {
  console.error('Playwright not installed. Run:\n  npm install --save-dev playwright\n  npx playwright install chromium');
  process.exit(1);
}

const browser = await chromium.launch({ headless: !headed, slowMo });
const page    = await browser.newPage();
page.setDefaultTimeout(20_000);

// Triple-click to select all, then fill — works for both input and textarea.
async function fill(locator, text) {
  await locator.click({ clickCount: 3 });
  await locator.fill(text);
}

// Click a tab by its visible label text.
async function clickTab(label) {
  const byRole = page.getByRole('tab', { name: new RegExp(label, 'i') });
  const byText = page.getByText(label, { exact: true });
  const tab = (await byRole.count()) > 0 ? byRole.first() : byText.first();
  await tab.click();
  await page.waitForTimeout(600);
}

// Read back a filled field and warn if it's empty or doesn't start with expected text.
async function validate(locator, fieldName, expected) {
  const actual = await locator.inputValue().catch(() => locator.textContent());
  const ok = actual && actual.trim().length > 0 && actual.trim().startsWith(expected.trim().slice(0, 20));
  if (!ok) {
    console.warn(`  WARNING: "${fieldName}" may not have been saved. Read back: "${String(actual).slice(0, 60)}"`);
  } else {
    console.log(`  ✓ ${fieldName}: "${String(actual).slice(0, 60)}…"`);
  }
  return ok;
}

try {
  // ── Auth ──────────────────────────────────────────────────────────────────
  console.log('Signing in…');
  await page.goto('https://play.aidungeon.com/signin', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(2000);

  const emailInput = page.locator('#email').or(page.getByPlaceholder(/^email$/i)).first();
  await emailInput.waitFor({ timeout: 15_000 });
  await emailInput.fill(email);

  const passwordInput = page.locator('#password').or(page.getByPlaceholder(/^password$/i)).first();
  await passwordInput.fill(password);

  await page.getByLabel('auth-page').getByRole('button', { name: 'Sign in', exact: true }).click();
  await page.waitForURL(url => !url.pathname.includes('/signin'), { timeout: 15_000 });
  console.log('Signed in.');

  // ── Navigate to Create Scenario ───────────────────────────────────────────
  // /scenario/create redirects to home — go via the Play menu instead.
  const playBtn = page.getByRole('button', { name: /play/i }).or(page.getByRole('link', { name: /play/i })).first();
  await playBtn.waitFor({ timeout: 10_000 });
  await playBtn.click();
  await page.waitForTimeout(600);

  const createScenario = page.getByText('Create a Scenario', { exact: true });
  await createScenario.waitFor({ timeout: 8_000 });
  await createScenario.click();
  await page.waitForTimeout(1500);

  // Template picker: click Empty
  await page.getByText('Empty', { exact: true }).waitFor({ timeout: 15_000 });
  await page.getByText('Empty', { exact: true }).click();

  // Wait for the Edit Scenario tab bar (confirms the form loaded).
  await page.locator('[aria-label*="tab" i]').first().waitFor({ timeout: 15_000 });
  await page.waitForTimeout(500);

  // ── Details tab — navigate explicitly before filling title ────────────────
  await clickTab('DETAILS');

  // Title is the first plain input that isn't the nav search box.
  const titleInput = page.locator('input:not([role="searchbox"])').first();
  await titleInput.waitFor({ timeout: 10_000 });
  await fill(titleInput, scenario.title);
  await validate(titleInput, 'Title', scenario.title);

  const descInput = page.getByPlaceholder(/provide a brief description/i);
  await fill(descInput, scenario.description);
  await validate(descInput, 'Description', scenario.description);
  console.log('Details filled.');

  // ── Plot tab ──────────────────────────────────────────────────────────────
  await clickTab('PLOT');

  async function addPlotComponent(componentName) {
    await page.getByText('ADD PLOT COMPONENT').click();
    const item = page.getByText(componentName, { exact: true });
    await item.waitFor({ timeout: 8_000 });
    await item.click();
    await page.waitForTimeout(500);
  }

  await addPlotComponent('Story Summary');
  await addPlotComponent('Plot Essentials');
  await addPlotComponent("Author's Note");

  const openingField = page.getByPlaceholder(/how does your story begin/i);
  await fill(openingField, `${scenario.description}\n\n${scenario.opening}`);
  await validate(openingField, 'Opening', scenario.description);

  const summaryField = page.getByPlaceholder(/a summary of the adventure/i);
  await fill(summaryField, scenario.opening);
  await validate(summaryField, 'Story Summary', scenario.opening);

  if (scenario.plotEssentials) {
    const peField = page.getByPlaceholder(/enter important information/i);
    await fill(peField, scenario.plotEssentials);
    await validate(peField, 'Plot Essentials', scenario.plotEssentials);
  }

  if (scenario.authorNote) {
    const anField = page.getByPlaceholder(/influence the ai.?s writing style/i);
    await fill(anField, scenario.authorNote);
    await validate(anField, "Author's Note", scenario.authorNote);
  }
  console.log('Plot filled.');

  // ── Story Cards tab ───────────────────────────────────────────────────────
  // The file-import flow uses a native file input whose change event has
  // isTrusted:false when dispatched programmatically, which AI Dungeon rejects.
  // Instead, create each card individually via the CREATE STORY CARD form.
  await clickTab('STORY CARDS');
  await page.waitForTimeout(800);

  for (let i = 0; i < storyCards.length; i++) {
    const card = storyCards[i];
    console.log(`  Creating card ${i + 1}/${storyCards.length}: ${card.title}`);

    await page.getByRole('button', { name: /create story card/i }).click();
    await page.waitForTimeout(800);

    // NAME field — "Enter a name..."
    const nameField = page.getByPlaceholder(/enter a name/i);
    await nameField.waitFor({ timeout: 8_000 });
    await fill(nameField, card.title);

    // ENTRY field — aria-label="Value", limit 1000 chars.
    const valueField = page.locator('[aria-label="Value"]');
    await fill(valueField, card.value);

    // TRIGGERS field — "Enter a comma separated list triggers..."
    const triggersField = page.getByPlaceholder(/comma separated.*trigger|enter.*trigger/i)
      .or(page.locator('[aria-label*="Trigger" i]'));
    if (await triggersField.count() > 0) {
      await triggersField.first().scrollIntoViewIfNeeded();
      await fill(triggersField.first(), card.keys);
    }

    // FINISH button inside the "New Story Card" dialog (rendered as a portal, so it is
    // last in DOM order when the dialog is open; the scenario FINISH is first).
    await page.getByRole('button', { name: /^finish$/i }).last().click();
    // Wait for the dialog to close before moving on to the next card.
    await page.locator('[role="dialog"]').waitFor({ state: 'detached', timeout: 5_000 }).catch(() => {});
    await page.waitForTimeout(300);
  }

  console.log(`Story cards created: ${storyCards.length}.`);

  // ── Portrait upload ───────────────────────────────────────────────────────
  if (scenario.nsfw) {
    console.log('Skipping portrait upload — scenario is marked NSFW.');
  } else if (existsSync(portraitPath)) {
    await clickTab('DETAILS');
    await page.waitForTimeout(800);
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(400);

    // The portrait container wraps img[alt="Content Image"].
    // Tab overlays intercept Playwright clicks so dispatch the event programmatically.
    await page.evaluate(() => {
      const img = document.querySelector('img[alt="Content Image"]');
      if (!img) return;
      let el = img.parentElement;
      while (el && el.tagName !== 'BUTTON' && el.getAttribute('role') !== 'button') {
        el = el.parentElement;
      }
      (el ?? img).dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));
    });
    await page.waitForTimeout(800);

    // "Images" modal — click "Upload" in the left sidebar.
    const uploadSidebar = page.getByText('Upload', { exact: true });
    await uploadSidebar.waitFor({ timeout: 8_000 });
    await uploadSidebar.click();
    await page.waitForTimeout(600);

    // Trigger the file chooser by programmatically clicking the hidden input.
    // This fires a real browser chooser event (unlike setInputFiles which bypasses React).
    const [portraitChooser] = await Promise.all([
      page.waitForEvent('filechooser'),
      page.evaluate(() => document.querySelector('input[type="file"]')?.click()),
    ]);
    await portraitChooser.setFiles(portraitPath);

    // Wait for the upload preview to appear (the loading spinner disappears and an img shows).
    // The preview img appears inside the upload area once the server has the file.
    try {
      await page.locator('img[src*="aidungeon"]').last().waitFor({ timeout: 15_000 });
    } catch {
      // Preview may not appear — wait a fixed 5s before confirming.
      console.warn('  Portrait preview did not appear within 15s — clicking SELECT anyway.');
      await page.waitForTimeout(5000);
    }

    // Confirm with SELECT button once the preview appears.
    await page.getByRole('button', { name: /^select$/i }).click();
    await page.waitForTimeout(800);
    console.log('Portrait uploaded.');
  } else {
    console.warn('portrait.png not found — skipping portrait upload.');
  }

  // ── Save ──────────────────────────────────────────────────────────────────
  // The scenario editor always has one FINISH; use .first() in case any dialog is still animating.
  await page.getByRole('button', { name: /^finish$/i }).first().click();
  await page.waitForTimeout(2000);
  console.log('\nDone! Scenario URL:', page.url());

} finally {
  try { unlinkSync(tempCardsPath); } catch { /* already gone */ }
  await browser.close();
}
