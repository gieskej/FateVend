# feat: AI Dungeon Import

Goal: Automatically import an AI-generated FateVend scenario package into AI Dungeon (https://play.aidungeon.com/) using Playwright browser automation.

## Implementation

**Script:** `web/tools/aidungeon-importer.mjs`

**Usage:**
```sh
node web/tools/aidungeon-importer.mjs --input <path-to-scenario-folder> [--headed] [--slowmo 200]
```

**Credentials:** `AIDUNGEON_EMAIL` and `AIDUNGEON_PASSWORD` in `.env` at project root.

**Dependencies:** `npm install --save-dev playwright && npx playwright install chromium`

---

## Input Package Structure

```
<folder>/
  scenario.json    ← genre, title, description, opening, tags, plotEssentials, authorNote, characters{}
  portrait.png     ← protagonist portrait image
```

---

## Automation Flow

### 1. Auth
- Navigate to `https://play.aidungeon.com/signin`
- Fill `#email` and `#password`; click Sign In (scoped to `[aria-label="auth-page"]` to avoid ambiguity)
- Wait for redirect away from `/signin`

### 2. Navigation to Create Scenario
- `/scenario/create` redirects to home — must navigate via the Play menu
- Click Play button → "Create a Scenario" → "Empty" template
- Wait for the Edit Scenario tab bar to confirm the form loaded

### 3. Details Tab
- Click DETAILS tab explicitly (form opens on PLOT tab after selecting Empty)
- Title: `input:not([role="searchbox"])` first input — avoids the nav search box
- Description: `getByPlaceholder(/provide a brief description/i)`

### 4. Plot Tab
- Add three plot components via "ADD PLOT COMPONENT": Story Summary, Plot Essentials, Author's Note
- Opening field: `getByPlaceholder(/how does your story begin/i)` ← `description + "\n\n" + opening`
- Story Summary: `getByPlaceholder(/a summary of the adventure/i)` ← `opening`
- Plot Essentials: `getByPlaceholder(/enter important information/i)` ← `plotEssentials` (skipped if blank)
- Author's Note: `getByPlaceholder(/influence the ai.?s writing style/i)` ← `authorNote` (skipped if blank)

### 5. Story Cards

> **Why not file import?**
> The "Import Story Cards" dialog creates a bare `<input type="file">` dynamically and attaches a native `addEventListener` to it. Its `change` event handler checks `event.isTrusted`. Playwright's `filechooser.setFiles()` and all `dispatchEvent()` approaches produce `isTrusted: false`, which the handler rejects silently. Manually uploading the same valid JSON works fine — the format is correct, only the automation path was blocked by the trust check. `showOpenFilePicker` is defined natively but is NOT used by AI Dungeon's import dialog.

**Current approach: create each card individually via CREATE STORY CARD form.**

Cards come from two sources, combined into one `storyCards` array:
1. `scenario.characters` — the protagonist + generated NPCs, always `type: 'character'`.
2. `web/generator/genres/<scenario.genre>/static-cards.js` (if it exists for that genre) — hand-written lore cards, one export per story-card type:

   | Export              | Story card `type` |
   |----------------------|--------------------|
   | `STATIC_CHARACTERS`  | `character`        |
   | `STATIC_CLASSES`     | `class`             |
   | `STATIC_RACES`       | `race`              |
   | `STATIC_LOCATIONS`   | `location`          |
   | `STATIC_FACTIONS`    | `faction`           |
   | `STATIC_CUSTOM`      | `custom`            |

   Each entry is `{ name, triggers, entry }` — mapped to `title`/`keys`/`value` respectively. `scenario.genre` (added to the exported package specifically so the importer can find the right file) determines which genre folder to load; missing genre or missing `static-cards.js` just skips this source with a warning (not an error — Joseon doesn't have one yet).

For each card in the combined array:

1. Click `getByRole('button', { name: /create story card/i })`
2. Wait 800ms for the "New Story Card" form to open
3. TYPE field: a plain `<button>` with **no ARIA role at all** (confirmed live 2026-07-14 — it used to be `role="combobox"` but the site's UI library changed; the dropdown it opens still uses `role="option"`/`role="listbox"` for its items, only the trigger button's own role was removed). Located via the fixed text "Type" (the visible "TYPE" is CSS `text-transform: uppercase` — the real DOM text is "Type") plus `xpath=following::button[1]`, since there's no attribute left to select it by. It is NOT wrapped in an element with `role="dialog"` either (confirmed live: zero `role="dialog"` elements exist on this page at all, so nothing in this flow may be scoped to it). Only the very first card of a run defaults to "Character" — the form remembers whatever type was last selected, so `setCardType()` reads the button's current text each time (it includes a literal icon-ligature suffix, e.g. `"Characterw_chevron_down"`, hence a `startsWith` check rather than an exact match) and only clicks through if it doesn't already match the target label. Selecting `custom` reveals an extra free-text sub-type field (`getByPlaceholder(/enter a custom type/i)`), filled with a generic `"Lore"` since our data has no per-item custom-type label.
4. NAME field: `getByPlaceholder(/enter a name/i)` ← `title`
5. ENTRY field: `[aria-label="Value"]` ← `value` (truncated to 1000 chars)
6. TRIGGERS field: `getByPlaceholder(/comma separated.*trigger/i)` ← `keys`
7. Click FINISH — the form's FINISH is last in DOM order (rendered as a portal after the scenario editor's FINISH)
8. Wait for the NAME field to detach before opening the next card (there's no `role="dialog"` to key off of — see point 3)

**Story card object structure** (for reference / future file-import retry):
```json
{
  "keys": "Mure, Mure Izumo",
  "value": "Character description text (≤ 1000 chars)",
  "type": "character",
  "title": "Mure Izumo",
  "description": "",
  "useForCharacterCreation": false
}
```

> Verified end-to-end against the live site (2026-07-13): a real Nihongi scenario, 57 cards (7 NPC + 50 static across all 6 types), completed and saved successfully. Two bugs were caught and fixed during that run — both listed above are the corrected versions:
> - The TYPE control has no `role="dialog"` wrapper at all; the original selector scoped to one and simply never matched anything, timing out on the very first non-character card.
> - The form remembers the last-selected type rather than always resetting to "Character", so an approach that unconditionally clicks a "Character"-labeled control fails on the second consecutive card of a non-character type (it did — same error, one card later).
>
> Re-verified end-to-end (2026-07-15) after the site changed again: the TYPE control's `role="combobox"` was gone entirely (still `role="option"` for the dropdown items), causing `setCardType()` to time out on the very first card. Also found and fixed a separate, unrelated bug in the same debugging pass: the browser's `importToAIDungeon()` never actually sent `scenario.genre` in its POST body (unlike `buildScenarioPayload()`, used by Copy/Download, which does) — so genre static cards silently never loaded for anyone using the real Import button, only for manually-built test packages. Re-ran the same real Nihongi scenario end-to-end after both fixes: all 58 cards (7 NPC + 51 static) created successfully. This class of failure (a selector silently breaking after a live site update) is exactly why the response-holding/error-reporting fix earlier the same day matters — without it, this kind of breakage is invisible from the app UI.

### 6. Portrait Upload
- Click DETAILS tab
- Click the portrait container via `page.evaluate()` + `dispatchEvent(MouseEvent)` — a tab overlay intercepts Playwright's native click on `img[alt="Content Image"]`
- In the Images modal, click "Upload" sidebar item
- Trigger the file chooser: `page.evaluate(() => document.querySelector('input[type="file"]')?.click())` — must use evaluate so the filechooser fires from a native browser click (React processes the result correctly)
- Wait for `img[src*="aidungeon"]` preview to appear (upload complete), then click SELECT

### 7. Save
- Click `getByRole('button', { name: /^finish$/i }).first()` — `.first()` guards against any lingering dialog portal

---

## Field Mapping

| AI Dungeon field      | Source in scenario.json                              |
|-----------------------|------------------------------------------------------|
| Title                 | `scenario.title`                                     |
| Description           | `scenario.description`                               |
| Opening: Story        | `scenario.description + "\n\n" + scenario.opening`   |
| Story Summary         | `scenario.opening`                                   |
| Plot Essentials       | `scenario.plotEssentials` (skip if blank)            |
| Author's Note         | `scenario.authorNote` (skip if blank)                |
| Story Cards TYPE      | `character` for NPCs; genre static cards use their STATIC_* export's mapped type (see table above) |
| Story Cards NAME      | character key (full name), or a static card's `name`  |
| Story Cards ENTRY     | character value (description, ≤ 1000 chars), or a static card's `entry` |
| Story Cards TRIGGERS  | `"FirstName, FullName"` for NPCs; a static card's `triggers` string as-is |
| Portrait              | `portrait.png`                                       |
| Genre static cards    | `web/generator/genres/<scenario.genre>/static-cards.js` (skipped if missing) |

---

## Key Selector Notes

| Element | Selector |
|---------|----------|
| Sign in email | `#email` or `getByPlaceholder(/^email$/i)` |
| Sign in button | `getByLabel('auth-page').getByRole('button', { name: 'Sign in', exact: true })` |
| Create Scenario nav item | `getByText('Create a Scenario', { exact: true })` — must be exact to avoid matching scenario list cards |
| Story card actions dropdown | `[aria-label="Story card actions"]` |
| Portrait container click | `page.evaluate()` dispatching `MouseEvent` to nearest `[role="button"]` ancestor of `img[alt="Content Image"]` |

---

## All About Plot Components

Plot Components guide the AI into generating coherent stories. Gameplay works without them, but they improve consistency.

### Story Summary
Short summary of the adventure's plot. Helps the AI track the overall direction. Included at the beginning of the context. Supports Memory System Auto Summarization.

### Plot Essentials
Key details the AI should always remember (formerly called Memory). Character notes, setting details, overarching story points. Included at the beginning of the context.

### Author's Note
Genre, writing style, tone, or short-term instructions. Sent toward the end of every player input — strongest influence on AI response style. Don't overload it.

### Story Cards
World-building details included in context only when trigger keywords appear in the story. Lower token overhead than always-on components. Each card has a NAME (display title), ENTRY (content, ≤ 1000 chars), and TRIGGERS (comma-separated keywords).

### Context Priority (strongest → weakest)
Author's Note > Plot Essentials ≈ Story Summary > Story Cards (conditional)
