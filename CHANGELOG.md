# Changelog

## 2026-07-03

### fix: Consolidated the four duplicate squash.sh scripts into one
**What changed:** `web/generator/genres/{fantasy,modern,sci-fi}/icons/squash.sh` and `web/generator/common/icons/squash.sh` were near-identical copies (fantasy, modern, and common were byte-identical; sci-fi had one stray extra blank `echo`) that strip numeric disambiguator suffixes from icon filenames (e.g. `PROFESSIONS#slug#3.webp` -> `PROFESSIONS#slug.webp`). Consolidated into a single `web/generator/squash.sh` that takes an optional target directory argument (defaults to current directory), matching the pattern used by the recently-merged `resize.sh`. Deleted all four per-genre/common copies.
**Impact:** One shared script for squashing disambiguated icon filenames across all genres instead of four diverging copies. Run it as `web/generator/squash.sh path/to/genre/icons`.
**Test cases:** (1) Run against a directory containing a `NAME#slug#2.webp` file with no existing `NAME#slug.webp` — it's renamed to `NAME#slug.webp`. (2) Run against a directory containing a `NAME#slug#2.webp` file where `NAME#slug.webp` already exists — the numbered file overwrites it (matches prior `mv -f` behavior). (3) Files without a numeric `#N` suffix are left untouched.

### fix: Merged the two divergent icon resize scripts into one
**What changed:** `web/generator/genres/fantasy/icons/resize.sh` and `web/generator/genres/sci-fi/icons/resize.bash` had drifted into different (and partly buggy) behavior — fantasy's shrunk images to fit within 256x256 preserving aspect ratio and converted jpg/png to webp; sci-fi's forced every image to an exact 256x256 square (distorting non-square sources) and left formats untouched. Consolidated both into a single `web/generator/resize.sh` that takes an optional target directory argument, only touches `CATEGORY#slug` icon-named files, converts jpg/jpeg/png/gif sources to webp (quality 80) before resizing, and always shrinks-to-fit rather than forcing a square (no distortion). Deleted both of the old per-genre scripts.
**Impact:** One shared script for resizing icons across all genres instead of two diverging copies. Run it as `web/generator/resize.sh path/to/genre/icons`.
**Test cases:** (1) Run against a directory with oversized webp icons — they're shrunk to fit within 256x256 with aspect ratio preserved. (2) Run against a directory with jpg/png icons — they're converted to webp, resized, and the original file is removed. (3) Non-icon files (no `#` in the name) are left untouched.

### fix: Removed redundant secondary "Spin the Reels" button
**What changed:** Removed the second "Spin the Reels" button from the bottom-actions bar (shown below the generated scenario output), leaving only "↑ Go to Top" there. Also removed the now-dead `.btn-generate-secondary` CSS rule and updated the `test-ui` skill's stale assertion that checked for the removed button.
**Impact:** One less redundant control — the toolbar's "Spin The Reels" button (always visible, sticky) already covers re-rolling; the bottom copy no longer duplicates it. `.bottom-actions` is `justify-content: center`, so "Go to Top" re-centers on its own with no layout changes needed.
**Test cases:** (1) Generate a scenario through completion — verified via a headless-browser run that `.btn-generate-secondary` no longer exists in the DOM and `.btn-go-top` is visible and centered in `.bottom-actions`. (2) Toolbar "Spin The Reels" button still starts a fresh roll as before.

### feat: Gender labels changed from Man/Woman to Male/Female
**What changed:** Display labels for the `man`/`woman`/`trans_man`/`trans_woman` gender ids changed from "Man"/"Woman"/"Trans man"/"Trans woman" to "Male"/"Female"/"Trans male"/"Trans female" across `generator/common/genders.js` (source of truth), the slot machine catalog and `GENDER_LABELS` map in `index.html`, the parent-gender ternary in `index.html`, `generator/cast-builder.js`'s mirrored `GENDER_LABELS` map, and the JSDoc examples in `generator/types.js`. Internal `id` values (`man`, `woman`, `trans_man`, `trans_woman`) and icon filenames (`GENDER#man.webp`, etc.) were intentionally left unchanged since they're used as logic/lookup keys, not shown to the user.
**Impact:** Every place a gender is displayed to the player (slot machine label, character sheet, supporting-cast entries) now reads "Male"/"Female"/"Trans male"/"Trans female" instead of "Man"/"Woman"/"Trans man"/"Trans woman". No effect on icon loading, masc/fem pool selection logic, or saved/exported data keyed by `id`.
**Test cases:** (1) Roll a character — verified via a headless-browser run that the gender slot lands showing "Male" (or "Female") instead of "Man"/"Woman". (2) Supporting cast (parents, NPCs) display the updated labels. (3) Icon images still load correctly since `iconPath`/`dataSlug` values were untouched.

### fix: Delay before reel spin broke reel animation entirely
**What changed:** A prior change added `await sleep(500)` before `animateSlots()` assigned each slot's first image frame, to create a pause between the pull sound and the reels starting to spin. Each slot `<img>` renders with `src=""`, and yielding to the event loop during that 500ms let the browser fire the tag's `onerror` handler (which replaces `.slot-window` with a static ⚙ placeholder `<div>`, destroying the `<img>` element) before any real icon was ever set — so `document.getElementById('slot-img-*')` returned `null` for every slot afterward and no spin interval ever started. Reworked `animateSlots()` to assign each slot's first real frame synchronously (before any `await`), then play the pull sound and wait, then start the spin intervals via a stored `startSpin` map.
**Impact:** Reels spin again. Slots also now show a static icon during the pull-sound pause instead of the ⚙ placeholder, and visibly start cycling only after the delay — matching the intended "pause before spin" behavior.
**Test cases:** (1) Click Spin The Reels — verified via a headless-browser run that all reel `<img>` elements keep real icon `src` values (no placeholders) and cycle every ~90ms during the spin phase, landing correctly per slot. (2) No regression to the pull sound, reel-stop sounds, or bell timing from earlier changes today.

### feat: Split slot machine SFX into pull + per-reel stop sounds
**What changed:** Replaced the single `_slotMachineSfx` (`audio/slot_machine.mp3`) with two clips: `_slotMachinePullSfx` (`audio/slotmachine-pull.mp3`) played once in `animateSlots()` right before any reel starts spinning, and `_slotMachineReelStopSfx` (`audio/slotmachine-reelstop.mp3`) played on every reel landing inside the staggered landing loop (alongside the existing win bell on the final reel). Also added both new SFX to the audio-reset list in the roll-start handler (previously only `_bellSfx`, `_overtureSfx`, `_slotMachineSfx`).
**Impact:** Slot reel audio timing now matches the animation — one clear "pull" cue at the start, a distinct "stop" thunk as each reel lands — instead of one long clip whose timing drifted from the staggered reel animation. `audio/slot_machine.mp3` is no longer referenced in code (left on disk in case it's still wanted).
**Test cases:** (1) Click Spin The Reels — pull sound plays immediately before the first reel starts cycling. (2) Each reel plays a stop sound exactly when it lands, including the last one (which also plays the bell). (3) Starting a new roll while a previous one's audio is still playing resets/stops both new SFX cleanly (no overlap).

### fix: Narrate All read the protagonist entry twice
**What changed:** The protagonist's character-entry wrapper in the Character Entries card reused the `.npc-section` class (with `.npc-section-name` for its label), which `narrateAll()` also queries via `document.querySelectorAll('.npc-section')` to build the NPC reading sequence. Since the protagonist was *also* added to the sequence explicitly via the `field-protagonist` entry in `fieldDefs`, it got read twice — once by name, once by the generic NPC loop. Renamed the protagonist wrapper's class from `npc-section` to `protagonist-section` (it already carries an inline `margin-bottom` override, so no CSS rule was needed for the rename) so the NPC loop no longer matches it.
**Impact:** "Narrate All" and auto-play Narrate All now read the protagonist description exactly once.
**Test cases:** (1) Click "Narrate All" — protagonist entry is read once, followed by each NPC once. (2) Individual protagonist narrate button (`field-protagonist`) still works standalone. (3) NPC portrait/story-card layout and spacing unchanged (protagonist section still has `margin-bottom:1.5rem`).

### feat: Narrate All auto-scrolls to the section being read
**What changed:** `narrateAll()`'s reading sequence changed from an array of plain strings to `{ text, el }` objects, where `el` is the source element for that entry (`.output-field` wrapper for Title/Description/Opening/Plot/Author's Note, `.protagonist-section` for the protagonist entry, `.npc-section` for each NPC). Before narrating each item, the loop now calls `item.el?.scrollIntoView({ behavior: 'smooth', block: 'center' })`, matching the smooth-scroll convention already used elsewhere in the app (e.g. the skeleton-roll slot animation).
**Impact:** During "Narrate All" (manual or auto-play), the page now smoothly scrolls to keep the section currently being read centered in view, instead of leaving the user to scroll manually to follow along.
**Test cases:** (1) Click "Narrate All" — page scrolls to Title, then Description, Opening, Plot, Author's Note, Protagonist, and each NPC in turn as narration progresses. (2) Clicking "Stop" mid-sequence halts narration without further scrolling. (3) Manual single-field narrate buttons (`narrate()`) are unaffected — no scroll behavior change there.

### fix: Narrate All read the scenario title twice
**What changed:** In `narrateAll()`'s `fieldDefs`, the protagonist entry's spoken label was `currentOutput?.title ?? 'Protagonist'` — the scenario title — so it was read once as the standalone first sequence item, then read again as the label prefix immediately before the protagonist's character entry. Changed the label to `currentSkeleton?.name ?? 'Protagonist'`, i.e. the character's own name, matching the label already shown on-screen (`${sk.name} — Protagonist`).
**Impact:** The scenario title is now read exactly once, as the very first thing in the sequence; the protagonist entry is introduced by the character's name instead of a repeat of the title.
**Test cases:** (1) Click "Narrate All" — title is spoken once at the start, protagonist entry is introduced by the character's name, not the title. (2) Auto-play Narrate All exhibits the same corrected sequence.

## 2026-07-02

### feat: Auto-generate NPC portraits option
**What changed:** Added an "Auto-generate NPC portraits" checkbox to the Settings modal Options tab (`#auto-npc-portraits`, persisted to `localStorage` as `gof_auto_npc_portraits`). When enabled and an image backend (local SD or Stability AI) is configured, `runAIPhase()` now calls a new `autoGenerateAllNpcPortraits()` helper after scenario generation, which awaits `generateNpcPortrait()` for each NPC in sequence (NPC portrait generation guards against overlapping calls via `npcPortraitGenerating`, so they can't run concurrently).
**Impact:** Users no longer have to open each NPC's portrait menu and click "Generate Portrait" individually — cast portraits populate automatically alongside the protagonist portrait when the option is on. Off by default, so existing behavior (manual per-NPC generation) is unchanged unless opted in.
**Test cases:** (1) Option off — NPC thumbnails remain silhouettes after generation, same as before. (2) Option on, no image backend configured — no NPC portraits attempt (matches existing protagonist portrait gating). (3) Option on with SD/Stability configured — each NPC thumbnail fills in sequentially without overlapping "already generating" errors.

### feat: Auto-play Narrate All option
**What changed:** Added an "Auto-play Narrate All" checkbox to the Settings modal Options tab, alongside the other auto-behavior toggles (`#auto-narrate-all`, persisted to `localStorage` as `gof_auto_narrate_all`). When enabled and a TTS provider is selected (anything other than "Off"), `runAIPhase()` now calls `narrateAll()` right after the scenario renders, so playback starts automatically without the user clicking the "Narrate All" button.
**Impact:** Users who want hands-free playback no longer have to manually start narration after every generation. Off by default, so existing behavior (manual "Narrate All" click) is unchanged unless opted in.
**Test cases:** (1) Option off — narration does not start automatically after generation, "Narrate All" button still works manually. (2) Option on, TTS provider set to "Off" — no auto-play attempt. (3) Option on with a TTS provider configured — narration begins automatically once the scenario cards render, and the Stop button appears/behaves the same as a manual "Narrate All" click.

### fix: Auto-play Narrate All now waits for the overture music to fade out
**What changed:** `fadeOutAudio()` now returns a `Promise` that resolves once the fade completes (or immediately if the audio was already paused), instead of firing a `setInterval` with no completion signal. `generatePortrait()`'s `finally` block now `await`s it, and `runAIPhase()` captures whichever fade path ran (portrait generation or the direct no-backend fade) as `musicFadeDone`, chaining the auto-narrate trigger with `musicFadeDone.then(() => narrateAll())` instead of calling `narrateAll()` immediately.
**Impact:** Auto-play Narrate All no longer talks over the overture — narration now starts only after the background music has finished fading out, matching the manual "Narrate All" button's implicit expectation that the scene is quiet first.
**Test cases:** (1) Auto-narrate on, no image backend configured — music fades (~5s) then narration starts, not before. (2) Auto-narrate on with an image backend configured — narration waits for the protagonist portrait to finish generating and its music fade to complete. (3) Manual "Narrate All" / "Regenerate" portrait clicks still behave as before (fire-and-forget, no new blocking).

## 2026-06-29

### feat: New sticky toolbar + genre carousel UI
**What changed:** Replaced the old floating provider button groups, standalone genre select, and generate button with a sticky toolbar. Toolbar contains icon-labeled dropdowns for Text, Image, Narration, and Genre providers, plus Settings and Spin The Reels buttons. Genre selection now also shows a full-width carousel below the toolbar with the genre artwork, title, and description. Carousel supports prev/next navigation buttons and dot indicators. Toolbar and carousel are always visible; content scrolls beneath them.
**Impact:** All provider controls are always accessible without scrolling. Genre selection is more visual and discoverable on both mobile and desktop.

### feat: Fixed bottom status bar
**What changed:** Added a fixed `#statusbar` at the bottom of the viewport. Status messages, the disclaimer text, and (previously) token stats all live here. Removed the old `<footer>` element. Status bar is always visible regardless of scroll position.
**Impact:** Generation status and disclaimer are always readable without scrolling to the bottom.

### feat: Phase pipeline moved into status bar
**What changed:** Removed the `#phase-pipeline` HTML element from the content area. `setPhase()` now renders an inline step indicator directly into `#status-bar` using brass/gold color coding: done steps show ✓ in brass, the active step shows ⚙ in gold, pending steps are dimmed. `clearPhases()` calls `setStatus('')`.
**Impact:** Reduces visual clutter in the content area; generation progress is visible in the always-present status bar.

### feat: Version number in Settings modal
**What changed:** Moved the `v5197027` git hash from the status bar to the bottom-left of the Settings modal footer. Styled in faint brass monospace.
**Impact:** Status bar is less cluttered; version is still discoverable.

### feat: Toolbar labels replaced with SVG icons
**What changed:** Replaced the text labels ("Text", "Image", "Narration", "Genre") in the toolbar with inline SVG icons (pen, image frame, speaker, book). Added `title` attributes to each `.toolbar-field` for accessibility. Updated `.toolbar-label` CSS to flex-align the SVG.
**Impact:** Toolbar is significantly more compact on mobile, reducing wrapping from 3 rows to 2.

### feat: Titlebar gear icons replaced with half-clipped PNG
**What changed:** Overrode `.site-header::before` and `::after` in the inline `<style>` block to use `android-chrome-192x192.png` instead of the text `⚙` glyph. Icons are 160×160px, positioned at the header edges with `translateX(±50%)` so exactly half is visible. Added mobile padding (`90px`) on `.site-title` and `.site-subtitle` so text wraps inside the visible area on narrow screens.
**Impact:** More visually striking titlebar decoration consistent with the app icon.

### feat: Responsive genre carousel card layout
**What changed:** Genre carousel cards are mobile-first column layout (image on top, text below) at viewports under 600px. At 600px+ they switch to a row layout (210px image on the left, title and description on the right) matching the mockup.
**Impact:** Cards are readable on both mobile and desktop without horizontal scrolling.

### fix: Carousel next/prev buttons not working
**What changed:** Added `carouselStep`, `goToCarouselIndex`, and `onToolbarGenreChange` to the `Object.assign(window, {...})` export at the bottom of the module script. These functions were defined inside `<script type="module">` scope and were unreachable from inline `onclick` handlers.
**Impact:** Carousel navigation buttons now work correctly.

### fix: Genre card info panel appearing outside card border
**What changed:** The `onerror` attribute on the genre card `<img>` used `\\"` (backslash-quote) for inner HTML escaping. In a double-quoted HTML attribute, `"` closes the attribute regardless of the preceding backslash, causing the HTML parser to split `.genre-card-info` out of `.genre-card` as a sibling. Fixed by replacing `\\"` with `&quot;` in the template literal. Also fixed a companion bug where `@media (min-width: 100px)` with `width: 210px` on `.genre-card` was clamping the card to the image width on all screen sizes; corrected to `min-width: 600px` with no explicit width override.
**Impact:** Genre card title and description now display correctly inside the card border on desktop.

### feat: Convert _genre.png to WebP
**What changed:** Converted all 7 `_genre.png` genre artwork files to `_genre.webp` using ffmpeg at quality 90. Updated the carousel `renderCarouselCard()` src reference from `_genre.png` to `_genre.webp`.
**Impact:** Genre images reduced from ~1.2MB each to ~130KB each (~90% smaller), significantly improving carousel load time.

## 2026-06-28

### fix: Narrate All section playback order
**What changed:** Added `currentOutput?.title` as the first item spoken in `narrateAll()` before iterating `fieldDefs`. Sections now play in the correct order: title → description → opening → plot essentials → author's note → protagonist → NPCs.
**Impact:** The Narrate All button reads sections in the intended narrative sequence.

## 2026-06-27

### feat: Synthetic construct identity rules for sci-fi androids
**What changed:** Added `syntheticType` property to all four android race entries in `genres/sci-fi/races.js`:
- `android_synth` (Biomechanical) → `'biomechanical'` — full person; gender, orientation, and relationship generated normally
- `android_standard` (Plastic) → `'plastic'` — gender generated for appearances; orientation forced to Asexual; relationship forced to Single (no partner in cast); also renamed flavor text from "Mechanical Android" to "Plastic Android"
- `android_industrial` (Industrial) → `'industrial'` — no gender (N/A / it/its), no orientation (N/A), no relationship (N/A); no partner generated
- `android_combat` (Combat) → `'industrial'` — same rules as industrial (weapons platform, not a person)

In `skeleton-builder.js`, moved the `identity` pick to before gender/orientation/relationship, then branches on `syntheticType` to enforce the correct attribute set. `'single'` relationship status is passed to `buildCast` for plastic/industrial androids, which naturally blocks partner NPC generation via `PARTNER_HAS_NPC`.
**Impact:** Industrial and Combat Androids no longer get gender, sexual orientation, romantic relationships, or family. Plastic Androids get a gender presentation but are always asexual and unpartnered. Biomechanical Androids are fully human-equivalent in these attributes.

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
