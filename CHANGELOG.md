# Changelog

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
