# Changelog

## 2026-06-27

### feat: Human-readable Kokoro voice labels
**What changed:** Replaced the `{ value, label }` object array in `KOKORO_VOICES` with a plain string array of voice IDs. Added `kokoroVoiceLabel(id)` which parses the `prefix_name` format and returns e.g. `"Lewis (British Male)"` for `bm_lewis`. Applied to both the static fallback list and live-fetched voices from the Kokoro server. Unknown ID formats fall back to displaying the raw ID.
**Impact:** Voice names in the Settings dropdown are readable instead of showing raw identifiers like `bm_lewis`.

### feat: Narration Provider Selector in Main UI
**What changed:** Added a Narration button group to the provider selectors area (alongside Text Provider and Image Provider). Buttons: Off, Browser, Kokoro, OpenAI. Kokoro and OpenAI buttons are hidden until their URL/key is entered in Settings. Selecting a button calls `setTtsProvider()`, which now also syncs the button highlight state. Added `updateNarrationProviderSelector()` — called on settings input and on page load — to show/hide provider buttons and auto-fall-back to Browser if credentials are removed.
**Impact:** Players can switch narration on/off and change providers directly from the main UI without opening Settings.

### fix: Narration button 🔊 icon replaced with brass-light SVG
**What changed:** Replaced the `🔊` emoji on all narrate buttons (6 field buttons + Narrate All) with an inline SVG speaker icon using `fill="currentColor"`, inheriting the button's CSS color. Defined `SVG_NARRATE_ICON` constant; `setNarrateButtonState` idle branch now uses `innerHTML` instead of `textContent`.
**Impact:** Narration buttons match the brass color scheme instead of showing an OS-rendered emoji.

### fix: NPC gender and race omitted from fallback AI prompt
**What changed:** The inline `buildPrompt()` in `index.html` was formatting cast lines as `name (role, status): traits` — dropping `gender` and `race`. Updated to match the genre prompt files: `name (role, status, gender, race): traits`.
**Impact:** The AI now receives all canonical NPC attributes in the fallback prompt path, reducing contradictions between rolled attributes and generated descriptions.

### feat: Voice pick list queries TTS provider for installed voices
**What changed:** Added `populateKokoroVoices(voiceEl, genreDefault)` — async, fetches `GET /v1/audio/voices` from the configured Kokoro URL, falls back to the static list on any error. Added `populateBrowserVoices(voiceEl)` — populates from `speechSynthesis.getVoices()` with a "System default" first option, handles the async `voiceschanged` event. Both functions restore the saved voice override from localStorage after populating. `getEffectiveTtsConfig` now passes `voiceURI` into the browser config; `narrateBrowser` applies it to the utterance. OpenAI voice list remains static (API voices are fixed).
**Impact:** Kokoro voice list reflects what is actually installed on the server. Browser voice list shows all OS/browser voices and the selection is applied during playback.

### fix: Narration provider selection not persisted across sessions
**What changed:** `updateNarrationProviderSelector()` was calling `setTtsProvider(ttsProvider)` unconditionally, which wrote the default `'off'` value to localStorage before the saved provider was read from storage. Removed that redundant call (button highlighting is already handled inside `setTtsProvider`). Moved the init call to `updateNarrationProviderSelector()` to after `setTtsProvider(savedTtsProvider)` so credentials are visible and the saved provider is already active when visibility is evaluated.
**Impact:** Choosing Kokoro (or any provider) is now remembered across page loads.

## 2026-06-24 (continued)

### fix: Story Card Format — Structured Physical Description
**What changed:** Updated `characterEntry` and `npcEntries` output rules in all 7 genre prompt templates (fantasy, modern, sci-fi, paleolithic, joseon, manga, nihongi) and the fallback inline prompt in `index.html`. All story cards now open with a standardised sentence: "[Full name] is a [age]-year-old [orientation] [gender] [race] with [hair description], [eye color] eyes, [skin tone] skin[, accessories/marks if notable], wearing [outfit suited to occupation]." followed by personality, quirks, habits, occupation, and family/friend relationships. Cards explicitly must not repeat situation or plot already in description/opening/plotEssentials.
**Impact:** Story cards imported into AI Dungeon will be immediately scannable — the AI knows exactly who each character is physically before the prose begins, and won't duplicate plot context.

## 2026-06-24

### fix: importToAIDungeon Button Not Responding
**What changed:** `importToAIDungeon` and `checkImportServer` were defined inside a `<script type="module">` and therefore not in the global scope. Added both to the `Object.assign(window, {...})` export block.
**Impact:** The "↑ Import to AI Dungeon" button now fires correctly when clicked.

### fix: Narrate All Only Played First Section
**What changed:** Rewrote `narrateAll` to use its own internal playback pipeline instead of calling `narrate()`. The old code called `narrate()` in a loop, which called `stopNarration()` at the start of each call, resetting `ttsAllActive = false` and breaking the loop after the first field.
**Also added:**
- Section titles read aloud before each field ("Description. …", "Opening. …", protagonist title, each NPC name)
- Text chunked into sentence-boundary segments (~350 chars for cloud, ~500 for browser) so each TTS call is short and fast
- Cloud TTS prefetch pipeline: next chunk starts fetching while the current one plays, minimising gap between chunks
**Impact:** Full scenario narration now reads all fields in order including section labels. Cloud TTS latency between chunks is nearly zero.

### feat: AI Dungeon Importer — Tags Import
**What changed:** After filling the title and description, the importer now adds each tag from `scenario.tags` one at a time using the tag input (`placeholder="dragons, magic, etc."`) and the `+` button (`[role="button"][aria-label*="Add"]`). Waits for `aria-disabled` to clear before each click.
**Impact:** Tags are now fully imported alongside all other scenario fields.

### fix: AI Dungeon Importer — Skip Portrait if NSFW
**What changed:** Portrait upload is skipped when `scenario.nsfw` is `true`.
**Impact:** Prevents NSFW portraits from being uploaded to AI Dungeon's content servers.

### feat: Skeleton Builder — NSFW Flag
**What changed:** `buildSkeleton` now accepts `opts = { nsfw }`. Derives `allowNSFW = opts.nsfw && age >= 18`, filters professions flagged `p.nsfw`, and includes `nsfw: allowNSFW` in the returned skeleton. `generateCharacter` and `regenerateSkeleton` in `generator/index.js` both thread the option through.
**Impact:** NSFW professions are suppressed by default; opt-in is required and restricted to adult characters.

### fix: Unique NPC First Names
**What changed:** `buildCast` now tracks used first names in a Set seeded with the protagonist's first name. All NPC name picks (parents, partner, siblings, friends, foil) go through a `uniqueFirst()` helper that retries up to 15 times to avoid duplicates.
**Impact:** No two characters in a generated cast share a first name.

### fix: Spin the Reels Stops Audio
**What changed:** `runGenerate` now calls `stopNarration()` and pauses `_bellSfx`, `_overtureSfx`, and `_slotMachineSfx` before starting a new generation.
**Impact:** Any playing music, sound effect, or TTS narration is silenced immediately when a new spin begins.

### fix: Copy Full Text Missing plotEssentials and authorNote
**What changed:** `copyAll` payload now includes `plotEssentials` and `authorNote` in the `scenario` object, matching `downloadPackage`.
**Impact:** JSON clipboard export now contains the full scenario data.

### fix: Genre Selector Hard to Read
**What changed:** Replaced the dense inline style on `#genre-select` with a `.genre-select` CSS class: solid dark background (`#1a1208`), `--gold-light` text, `--brass` border, hover/focus states, and font size raised to `0.85rem`.

### fix: Minimum Font Size 0.8rem
**What changed:** All `font-size` values below `0.8rem` in `styles.css` and `index.html` bumped to `0.8rem`. Title bar (`clamp(1.8rem…)`) unchanged.
**Impact:** Consistent, readable text throughout the UI.

### fix: Button Label — "Spin the Reels"
**What changed:** Renamed "Turn the Gears" → "Spin the Reels" in the generate button and status message.

## 2026-06-20

### feat: "Import to AI Dungeon" Button in Web UI
**What changed:** Added `web/tools/aidungeon-server.mjs` — a companion HTTP server on `localhost:7432` — and an "Import to AI Dungeon" button in the web app that appears only when the server is reachable.
**Why:** Previously the user had to download a `.zip`, extract it, and run the importer manually. With the server running, one button click sends the current scenario directly to the Playwright importer.
**How to use:**
1. Run `node web/tools/aidungeon-server.mjs` in a terminal and keep it open.
2. Generate a scenario in the web app. The "Import to AI Dungeon" button appears below the Download button.
3. Click it — the Playwright browser opens and imports automatically.
**What is sent:** Same payload as the download package — `scenario.*` fields, `characters{}`, and portrait base64 if one was generated. The server writes a temp folder and spawns `aidungeon-importer.mjs --headed`.
**Technical:** Server at `http://localhost:7432`; `GET /ping` for availability check; `POST /import` with JSON body. CORS is open (`*`) since this is a local tool. The button is hidden by default and shown via `checkImportServer()` called after output renders.



### Fix: AI Dungeon Importer — Story Cards Now Created Individually
**What changed:** Replaced the "Import Story Cards" file-upload flow with individual card creation via the "CREATE STORY CARD" button.
**Why:** The file-import dialog uses a dynamically-created `<input type="file">` whose `change` event requires `isTrusted: true`. Playwright's programmatic `setFiles()` and all `dispatchEvent()` approaches produce `isTrusted: false`, which AI Dungeon's handler rejects silently. Manually uploading the same JSON file worked fine — confirming the format was correct, only the automation path was broken.
**How it works now:** For each character in `scenario.characters`, the script clicks CREATE STORY CARD, fills the NAME ("Enter a name…"), ENTRY (`aria-label="Value"`, 1000-char limit), and TRIGGERS fields, then clicks the modal FINISH.
**Key selectors:** NAME = `getByPlaceholder(/enter a name/i)`; ENTRY = `[aria-label="Value"]`; TRIGGERS = `getByPlaceholder(/comma separated.*trigger/i)`; save = last `role="button" name="Finish"` (dialog is last in DOM order); scenario save = `.first()` (rendered before the dialog portal).

## 2026-06-19

### Fix: Gemini Generation Fails with 6 NPCs (Token Limit)
**What changed:** `api-client.js` now uses separate token limits: `CLAUDE_MAX_TOKENS = 16384` and `GEMINI_MAX_TOKENS = 32768`, replacing the shared `MAX_TOKENS = 8192`.
**Why:** With 6 NPCs, Gemini's response exceeded 8192 tokens mid-JSON, producing an unparseable truncated response. Gemini 2.5 Flash supports up to 65K output tokens; the old cap was unnecessarily tight. Claude's limit is also raised to 16384 to match the inline `index.html` calls.
**Gameplay impact:** Generation with large casts (5–6 NPCs) should now complete without parse errors.

### Fix: Export Package Missing plotEssentials and authorNote
**What changed:** `downloadPackage` in `web/index.html` now includes `scenario.plotEssentials` and `scenario.authorNote` in the exported `scenario.json`.
**Why:** The AI generates these fields and they are displayed in the UI, but they were silently dropped from the zip package — making it impossible to import them into AI Dungeon automatically.
**Gameplay impact:** Existing zips won't have these fields; the importer treats them as optional and skips blank values.

### feat: AI Dungeon Importer (Playwright) — Verified Working
**What changed:** Added `web/tools/aidungeon-importer.mjs` — a Node.js CLI script that drives a browser via Playwright to import a FateVend scenario package into AI Dungeon's Create Scenario form.
**Why:** The previous TamperMonkey approach (`aidungeon-importer.user.js`) only filled the description field and could not trigger native file dialogs (needed for story cards JSON import and portrait upload) or drive multi-step tab navigation reliably.
**What it does:** Signs in, navigates Play → Create a Scenario → Empty template, fills Title and Description, switches to the Plot tab and adds Story Summary / Plot Essentials / Author's Note components, imports story cards JSON via the "Story card actions" → "Import Story Cards" flow, uploads the portrait PNG via the Images modal Upload sidebar, then clicks FINISH.
**Usage:** `node web/tools/aidungeon-importer.mjs --input <folder> [--headed] [--slowmo 200]`
**Dependencies:** `npm install --save-dev playwright && npx playwright install chromium`
**Key selectors:** `/scenario/create` redirects to home — must navigate via Play menu; portrait container uses `dispatchEvent` to bypass tab overlays; story cards import uses `[aria-label="Story card actions"]` dropdown; portrait file upload uses `input[type="file"]` directly.

## 2026-06-18

### Fix: Nihongi AI Output Missing Spaces Between Words
**What changed:** Removed a broken `.replace()` in `parseResponse()` in `genres/nihongi/prompt-template.js`.
**Why:** The regex `/[ -]/g` was interpreted as a character range from space (U+0020) to hyphen (U+002D), stripping every space from the Claude API response before JSON parsing. All words in the AI-generated scenario ran together with no whitespace.
**Gameplay impact:** Nihongi character descriptions, openings, NPC entries, and titles now display correctly.
**Root cause:** `[ -]` in a regex character class is a range, not "space or hyphen". The `\n`/`\t` guard in the callback was dead code — those chars fall outside the matched range.

### Project Renamed: Gears of Fate → FateVend
**What changed:** All display names, titles, and code references updated from "Gears of Fate" / "GearsOfFate" to "FateVend".
**Why:** Trademark avoidance.
**Files updated:** `web/index.html` (title, h1, settings modal header), `README.md`, `requirements.md`, `package-lock.json`, `web/tools/aidungeon-importer.user.js` (all 5 occurrences), `web/generator/common/icons/generate_icons_core.py`, `.claude/skills/add-genre/SKILL.md`, `.claude/skills/test-ui/SKILL.md`.
**Note:** `localStorage` keys retain the `gof_` prefix to preserve existing user settings (changing them would wipe saved API keys and preferences). The project directory on disk remains `GearsOfFate/`.
**Gameplay impact:** None.

## 2026-06-18

### Settings Modal — 4-Tab Restructure
**What changed:** Replaced the 2-column grid layout in the settings modal with four tabs: Text, Image, Narration, Options.
**Why:** The 2-column layout collapsed poorly on mobile screens; tabs give each section room and add a clean home for the new Narration settings.
**Gameplay impact:** None — purely structural. All existing settings are preserved in their respective tabs.
**Visual:** Tab bar with gold underline on active tab, matching the brass/parchment theme.

### TTS Narration System
**What changed:** Added a full text-to-speech narration system supporting three providers: Browser (built-in SpeechSynthesis), Kokoro (LAN OpenAI-compatible endpoint), and OpenAI TTS API.
**Why:** Allows the generated character sheets and scenario text to be read aloud for immersive tabletop play.
**Gameplay impact:** 🔊 narrate buttons appear on all prose fields (Description, Opening, Author Note, Plot, Protagonist, each NPC) when a provider is selected. A "Narrate All" button reads the full sheet sequentially. Clicking a speaking button stops it.
**Visual:** Narrate buttons show a loading spinner (◌), pause icon (⏸ on rust background while speaking), or speaker (🔊 at rest). A global Stop button appears during narration.
**Mechanical:** Per-genre voice and speed defaults in `GENRE_TTS_CONFIG`; preprocessors normalize text before synthesis (Nihongi: pronunciation substitutions; Manga: exclamation compression).

### Voice Picklist Auto-Population
**What changed:** Selecting a TTS provider in settings now immediately populates the Voice dropdown with provider-appropriate options and pre-selects the genre default.
**Why:** Previously the voice field was a free-text input — users had no way to know valid voice IDs.
**Gameplay impact:** None.

### Narrate Button Busy State + Toggle Stop
**What changed:** Narrate buttons now show a pulsing ◌ during network fetch (Kokoro/OpenAI), switch to ⏸ while audio plays, and clicking the active button stops playback.
**Why:** TTS generation takes time; without feedback users couldn't tell if the click registered, and there was no way to interrupt.
**Gameplay impact:** More usable narration flow, especially for long NPC descriptions.

### New Sentiments for Joseon and Nihongi Genres
**What changed:** Added 70 new sentiment entries to `sentiments.js`, all using common emoji face icons. Normalized all Joseon Dynasty and Nihongi profession sentiment arrays from full-sentence descriptions to short underscore-delimited IDs.
**Why:** The new historical genres used complex full-sentence sentiments that had no matching icons. Normalizing to short IDs matches the existing icon lookup system.
**Gameplay impact:** Sentiment icons now display correctly for Joseon and Nihongi characters. New sentiments include: `methodical`, `diplomatic`, `contemplative`, `calculating`, `worldly`, `adaptable`, `loyal`, `stoic`, `resigned`, `yearning`, and ~60 others.

### PNG → WEBP Icon Reference Update
**What changed:** All `iconPath` values in 64 JS data files updated from `.png` to `.webp`. Regex patterns in `index.html` updated to match `.webp`. The `iconPath()` URL builder updated to append `.webp`. The `generate_icons_core.py` generator now saves icons as WEBP (via PIL) instead of PNG, and scans for existing `.webp` files when skipping.
**Why:** Icon files were already converted to WEBP on disk; code references still said `.png`, causing 404s for all icon images.
**Gameplay impact:** All profession, sentiment, life event, tension, secret, city setting, economic tier, family, and race icons now load correctly.
**Test:** Generate a character in any genre — icons should appear on all picklists and the output sheet.

### Fantasy Icon — sex_worker Promoted
**What changed:** Renamed `PROFESSION#sex_worker#1.webp` → `PROFESSION#sex_worker.webp` in the fantasy icons directory.
**Why:** The icon was generated but left with its variant-number suffix, causing a 404 when the profession was selected.
**Gameplay impact:** Fantasy sex_worker profession now displays its icon correctly.

### Settings Modal — Font Size and Color Fixes
**What changed:** Increased font sizes for four settings UI elements and lightened the group heading color.
- `.settings-group-heading`: `0.56rem` → `0.65rem`; color `--brass-dark` → `--gold` (was too dark against parchment background)
- `.settings-field label`: `0.6rem` → `0.72rem`
- `.settings-option-row label`: `0.6rem` → `0.72rem`
- `.settings-hint`: `0.58rem` → `0.68rem`
**Why:** Labels were difficult to read at small sizes; group headings were nearly invisible against the brown background.
**Gameplay impact:** None — readability improvement only.
