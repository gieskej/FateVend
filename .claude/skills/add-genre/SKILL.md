# /add-genre

Scaffold a new genre for the Gears of Fate generator. A genre is a self-contained folder under `web/generator/genres/<name>/` that provides all curated tables and a prompt template. The same tables power both the module API and the inline `index.html`.

## Usage

`/add-genre <name>`

Example: `/add-genre horror`

---

## Step 1 — Create the genre folder and stub all required files

Create `web/generator/genres/<name>/` with these files. Use an existing genre (e.g. `sci-fi`) as a reference for structure and export names.

| File | What to stub |
|------|-------------|
| `races.js` | `RACES` array — broad identity + flavor entries with `id`, `label`, `broad`, `flavor`, `iconPrompt` |
| `character-attributes.js` | `BUILDS`, `HAIR_STYLES`, `DISTINGUISHING_FEATURES`, `QUIRKS` arrays |
| `professions.js` | `PROFESSIONS` array — include `nsfw: true` on adult entries |
| `life-events.js` | `LIFE_EVENTS` array |
| `family-structures.js` | `FAMILY_STRUCTURES`, `PARENT_STATUSES`, `SIBLING_DYNAMICS` arrays — include an `android_origin`-style N/A entry if the genre has synthetic beings |
| `tensions.js` | `TENSIONS` array |
| `secrets.js` | `SECRETS` array |
| `economic-tiers.js` | `ECONOMIC_TIERS` array |
| `city-settings.js` | `CITY_SETTINGS` array |
| `settings.js` | `SETTING_TAGS` array |
| `names.js` | `NAMES` object keyed by broad species/race identity, each with `masc`, `fem`, `neutral`, `last` arrays |
| `prompt-template.js` | `SYSTEM_PROMPT` string, `buildPrompt(skeleton)` function, `parseResponse(raw)` function — copy from an existing genre and adapt the persona/tone |

Stub arrays should have at least 3–5 real entries so generation works immediately. Mark `// TODO: expand` on sparse arrays.

## Step 2 — Register the genre in ui-data.js

In `web/generator/ui-data.js`, add an import block for the new genre and include it in the exported `GENRE_TABLES` map (or equivalent export pattern — match what's already there).

## Step 3 — Register the genre in index.html (dual code path)

In `web/index.html`, find `getGenreTables()` (or the equivalent switch/map that returns table bundles by genre string). Add a case for the new genre that imports/references the same table data.

Then find the genre selector buttons (look for existing `onclick="setGenre('modern')"` etc.) and add a new `<button>` for the new genre.

## Step 4 — Add a prompt template

The `prompt-template.js` for the new genre must export:
- `SYSTEM_PROMPT` — persona and output format instructions (copy the JSON schema from an existing genre, only change the narrative voice/setting tone)
- `buildPrompt(skeleton)` — serialises the skeleton into the user message
- `parseResponse(raw)` — parses the AI JSON response (can be identical to other genres)

Register it in `api-client.js` under `PROMPT_TEMPLATES` and in the inline `callClaude`/`callGemini` switch in `index.html`.

## Step 5 — Verify

Run `/test-ui` and select the new genre before generating. Confirm:
- Skeleton rolls without errors
- Genre tables produce varied output across multiple rolls
- AI phase completes and returns valid JSON
- Character sheet shows the correct species/race label format
