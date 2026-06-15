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

## Step 5 — Create the icon-generation script

Create `web/generator/genres/<name>/icons/generate_icons.py`. This is a thin wrapper around the shared core; copy the template below and fill in `STYLE` and `PARAMS` to match the genre's visual aesthetic.

```python
"""
Generate <name> genre icons via SD WebUI Forge API.
Reads iconPrompt / iconPath pairs from all JS files in genres/<name>/.
Saves variants into a timestamp subfolder inside the icons directory.
Skips items whose output files already exist anywhere in the icons tree.

Examples:
# Usual usage - generate all icons
$ python ./generate_icons.py

# Replace icons matching the specified image's filesize (good for replacing default icons)
$ python ./generate_icons.py --missing ../../../common/icons/none.png
"""

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[3] / 'common' / 'icons'))
from generate_icons_core import run

GENRE_DIR = Path(__file__).resolve().parent.parent   # genres/<name>/
ICON_DIR  = Path(__file__).resolve().parent          # genres/<name>/icons/

STYLE = (
    # Genre-appropriate art direction — appended to every iconPrompt.
    # Keep it under ~150 chars. Include: medium, lighting, palette, mood.
    # Example (fantasy): "square icon, fantasy RPG art style, dramatic lighting, "
    #                     "detailed digital illustration, centered subject, clean composition, "
    #                     "painterly texture, rich warm palette, high fantasy atmosphere"
    "square icon, ..."
)

PARAMS = dict(
    negative_prompt     = "",
    steps               = 30,       # 20 for fast/simple styles, 30 for detailed
    width               = 256,
    height              = 256,
    cfg_scale           = 1,
    distilled_cfg_scale = 7,        # 6 for simpler styles, 7 for detailed
    sampler_name        = "Euler",
    scheduler           = "Simple",
    batch_size          = 3,
)

run(GENRE_DIR, ICON_DIR, STYLE, PARAMS, description=__doc__)
```

### Style guidance by genre type

| Genre type | steps | cfg | Style notes |
|---|---|---|---|
| Realistic / modern | 20 | 6 | natural lighting, muted palette, contemporary realism |
| Fantasy / high detail | 30 | 7 | painterly texture, dramatic lighting, rich palette |
| Sci-fi / cyberpunk | 30 | 7 | rim lighting, neon accent, dark atmosphere |
| Hand-drawn / manga | 30 | 7 | bold ink lines, screen tone, high contrast, spot color |
| Primitive / painterly | 25 | 6 | textured medium, earth tones, simplified shapes |
| Cartoon / stylised | 20 | 6 | clean lines, flat or cel-shaded, expressive |

The core lives at `web/generator/common/icons/generate_icons_core.py` — do not duplicate its logic. All genre wrappers use the same `run()` signature.

## Step 6 — Verify

Run `/test-ui` and select the new genre before generating. Confirm:
- Skeleton rolls without errors
- Genre tables produce varied output across multiple rolls
- AI phase completes and returns valid JSON
- Character sheet shows the correct species/race label format
