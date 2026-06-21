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
  scenario.json    ← title, description, opening, tags, plotEssentials, authorNote, characters{}
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

For each entry in `scenario.characters`:

1. Click `getByRole('button', { name: /create story card/i })`
2. Wait 800ms for the "New Story Card" modal to open
3. NAME field: `getByPlaceholder(/enter a name/i)` ← `character full name`
4. ENTRY field: `[aria-label="Value"]` ← character description (truncated to 1000 chars)
5. TRIGGERS field: `getByPlaceholder(/comma separated.*trigger/i)` ← `"FirstName, FullName"`
6. Click FINISH — the modal's FINISH is last in DOM order (rendered as a portal after the scenario editor's FINISH)
7. Wait for `[role="dialog"]` to detach before opening the next card

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
| Story Cards NAME      | character key (full name)                            |
| Story Cards ENTRY     | character value (description, ≤ 1000 chars)          |
| Story Cards TRIGGERS  | `"FirstName, FullName"`                              |
| Portrait              | `portrait.png`                                       |

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
