# /add-genre

Add a new playable genre to FateVend. There are **two ways**, and you should
pick based on how the genre needs to ship:

- **Path A — Genre Pack** (recommended for most cases): a pure-data
  `manifest.json` (or `.zip` with `icons/`+`audio/`) imported at runtime via
  **Settings → Genre Packs**. **No source edits, no rebuild.** Safe to share.
- **Path B — Built-in genre**: a genre that ships *in the repo* and loads from
  disk on every page load. Requires source edits in a handful of well-defined
  registration sites. Also the only path exercised by the **CLI** (`cli/`).

If the user just wants to try/share a genre, do **Path A**. Do **Path B** only
when the genre should be a permanent built-in (appears with zero import step,
usable from the CLI).

**Read `CREATING-A-GENRE.md` (repo root) first — it is the authoritative
authoring guide for both paths.** It carries the complete field reference, a
minimal working pack, the icon/audio conventions, and the failure modes that
pass validation and then misbehave. `.claude/docs/features/genre-packs/DESIGN.md`
covers loader/registration internals — read that only when changing the loader
itself.

---

## Path A — Genre Pack (no source edits)

**Follow `CREATING-A-GENRE.md` §§1–11.** Don't restate the manifest schema here
or in chat — that guide is the single source of truth for it, and it is verified
against `pack-loader.js`.

The short version: a pack is one JSON document (`manifest.json`) carrying all of
a genre's data, optionally zipped with `icons/` and `audio/`.
`web/generator/pack-loader.js` normalizes it into the runtime shapes the app
uses, and `registerGenrePack()` — in **`web/app.js`** — merges it into every live
registry. Import via **Settings → Genre Packs**; `validatePack()` returns a
human-readable error list for a malformed pack.

Useful specifics when helping with Path A:

- The fastest start is a **reskin**: set `iconBase` to a built-in genre's icon
  folder and ship no art at all (`sample-neon-drift.json` does this with Sci-Fi).
- `example-pirate-cove.zip` + `build-example-pack.py` is the self-contained case
  — the Python script holds all genre data as plain data, shows the field shapes,
  and generates placeholder icons plus a WAV.
- Verify by rolling ~30 characters, not one. Authoring bugs are usually boredom
  bugs (thin name pools, repeated housing) that only appear in volume.

That's it — no files under `web/generator/` change.

---

## Path B — Built-in genre (source edits)

A built-in genre is a folder of pure-data `.js` modules under
`web/generator/genres/<id>/`, wired into **four** registration sites. The engine,
carousel, slot machine, portraits, TTS, and music are all data-driven, so there
are **no** markup or UI-controller edits per genre — see the note at the end.

Use an existing genre (e.g. `sci-fi`) as the structural reference throughout.

### Step 1 — Create the data files

Create `web/generator/genres/<id>/` with these modules (match an existing
genre's exports exactly):

| File | Exports |
|------|---------|
| `races.js` (or `character-attributes.js`) | identity array — `RACES` / `SPECIES` / `ETHNICITIES`: entries `{ id, broad, flavor, weight, iconPrompt, iconPath }` |
| `character-attributes.js` | `GENDERS`, `ORIENTATIONS`, the identity array, `BUILDS`, `HAIR`, `DISTINGUISHING_FEATURES`, `QUIRKS` |
| `professions.js` | `PROFESSIONS` (mark adult entries `nsfw: true`) |
| `life-events.js` | `LIFE_EVENTS` |
| `family-structures.js` | `FAMILY_STRUCTURES`, `PARENT_STATUSES`, `SIBLING_DYNAMICS` (include an N/A entry if the genre has synthetic/parentless beings) |
| `tensions.js` | `TENSIONS` |
| `secrets.js` | `SECRETS` |
| `settings.js` | `ECONOMIC_TIERS`, `CITY_SETTINGS`, `TAG_POOLS` (some genres split these into `economic-tiers.js` / `city-settings.js` — either is fine as long as `registry.js` imports match) |
| `names.js` | `NAME_POOLS` — keyed by identity `broad` group, each `{ masc, fem, neutral, last }` |
| `plot-archetypes.js` | `<GENRE>_PLOT_ARCHETYPES` (genre-specific only; the shared `COMMON_PLOT_ARCHETYPES` is prepended by the registry) |
| `static-cards.js` | `STATIC_CHARACTERS/CLASSES/RACES/LOCATIONS/FACTIONS/CUSTOM` (optional AI Dungeon story cards; may be empty) |
| `voice.js` | `SYSTEM_PROMPT` (the system prompt) and `outputRules(skeleton)` (the authored "OUTPUT RULES" body). Consumed by `GENRE_VOICE` via the single shared builder — see Step 3 / Step 5 |

Give every array at least 3–5 real entries so generation works immediately;
mark sparse arrays `// TODO: expand`.

### Step 2 — Register tables in `registry.js`

`web/generator/registry.js` is the single table registry consumed by **both the
browser and the CLI**. Add an import block for the new genre's data modules
(mirror the `sci-fi` block), then add a `GENRE_TABLES['<id>']: { … }` entry
mapping the shared table keys (`RACES_OR_ETHNICITIES`, `PROFESSIONS`,
`LIFE_EVENTS`, `FAMILY_STRUCTURES`, `PARENT_STATUSES`, `SIBLING_DYNAMICS`,
`TENSIONS`, `SECRETS`, `ECONOMIC_TIERS`, `CITY_SETTINGS`, `TAG_POOLS`,
`NAME_POOLS`, `PLOT_ARCHETYPES`, plus `GENDERS`/`ORIENTATIONS`/`BUILDS`/`HAIR`/
`DISTINGUISHING_FEATURES`/`QUIRKS`/`RELATIONSHIP_STATUSES`). `SUPPORTED_GENRES`
derives automatically.

### Step 3 — Register presentation + voice in `manifests.js`

In `web/generator/manifests.js` add three things:

1. `GENRE_MANIFESTS['<id>']` — `{ id, label, description, portraitStyle,
   tts:{preprocess,browser,kokoro,openai}, music:{prefix,tracks[]},
   slots:{identityCat,identityHeader, profCat,profHeader, econCat,econHeader,
   cityCat,cityHeader, familyCat,lifeEventCat,tensionCat, filterGendersToGenre,
   familyUsesIconSlug, economicTiers:[[tierId,iconSlug,label], …5]} }`. The
   `slots.*Cat` values are the icon-file CATEGORY prefixes.
2. The id in `CAROUSEL_ORDER` (controls carousel + dropdown position).
3. `GENRE_VOICE['<id>']` — `{ identityLabel, genreLabel, systemPrompt,
   outputRules }`. Import `SYSTEM_PROMPT`/`outputRules` from the genre's
   `voice.js` (Step 5) at the top of `manifests.js` and reference them here.
   This is the single prompt voice used by **both** the browser and the CLI via
   the shared builder (`generator/prompt-builder.js`). Follow the project's
   image-prompt rules in `CLAUDE.md` for the `appearancePrompt` rule inside
   `outputRules`.

`GENRE_CAROUSEL_DATA`, portrait styles, TTS config, music maps, and the slot
config all derive from these — no markup or controller edits.

### Step 4 — Register static cards in `ui-data.js`

In `web/generator/ui-data.js` add `import * as <Name>StaticCards from
'./genres/<id>/static-cards.js';` and a `'<id>': <Name>StaticCards` entry in
`STATIC_CARDS_BY_GENRE`. (Skip only if the genre truly has no static cards — but
prefer at least a few; a missing entry silently ships an empty `staticCards`.)

### Step 5 — Author the genre voice module

There is now **one** shared prompt builder (`generator/prompt-builder.js`) used
by both the browser and the CLI/module path. A genre supplies only its voice:

- Author `genres/<id>/voice.js` exporting `SYSTEM_PROMPT` (a string) and
  `outputRules(sk)` (returns the "OUTPUT RULES" body — the per-field
  instructions; copy an existing genre's `voice.js` and adjust the flavor).
  `plotEssentials` interpolates `${sk.plotArchetype}`/`${sk.tension}`.
- Wire it into `GENRE_VOICE` in `manifests.js` (Step 3).

The CHARACTER SKELETON scaffold, response parsing, and output-limit truncation
are all shared — you do **not** author a `buildPrompt`/`parseResponse` per genre,
and there is no `api-client.js` registration step. (Uploaded genre packs, which
ship JSON only, omit `outputRules` and fall back to a generic body built from
their `openingNote`/`appearanceNote`.)

### Step 6 — Icons

Create `web/generator/genres/<id>/icons/generate_icons.py` — a thin wrapper
around the shared core (`common/icons/generate_icons_core.py`, which regex-scrapes
`iconPrompt`/`iconPath` pairs from the genre's `.js` files). Copy an existing
wrapper and set `STYLE` + `PARAMS` for the genre's aesthetic:

```python
import sys
from pathlib import Path
sys.path.insert(0, str(Path(__file__).resolve().parents[3] / 'common' / 'icons'))
from generate_icons_core import run

GENRE_DIR = Path(__file__).resolve().parent.parent   # genres/<id>/
ICON_DIR  = Path(__file__).resolve().parent          # genres/<id>/icons/

STYLE = "square icon, ..."   # medium, lighting, palette, mood — under ~150 chars
PARAMS = dict(negative_prompt="", steps=30, width=256, height=256,
              cfg_scale=1, distilled_cfg_scale=7, sampler_name="Euler",
              scheduler="Simple", batch_size=3)

run(GENRE_DIR, ICON_DIR, STYLE, PARAMS, description=__doc__)
```

| Genre type | steps | distilled_cfg | Style notes |
|---|---|---|---|
| Realistic / modern | 20 | 6 | natural lighting, muted palette |
| Fantasy / high detail | 30 | 7 | painterly texture, dramatic lighting, rich palette |
| Sci-fi / cyberpunk | 30 | 7 | rim lighting, neon accent, dark atmosphere |
| Hand-drawn / manga | 30 | 7 | bold ink lines, screen tone, high contrast |
| Primitive / painterly | 25 | 6 | textured medium, earth tones, simplified shapes |

Do not duplicate the core's logic — all wrappers share the same `run()` signature.

### Step 7 — Verify (both code paths)

- **Browser:** run `/test-ui`, select the new genre in the carousel, and confirm
  the skeleton rolls without errors, output varies across rolls, slot icons
  render (or show gears only where icons aren't generated yet), the AI phase
  returns valid JSON, and the identity label matches (`slots.identityHeader` /
  `voice.identityLabel`).
- **CLI:** run `cli/run.sh --genre <id> --skeleton-only` (no API key needed) to
  confirm the tables load, then `cli/run.sh --genre <id>` to confirm the prompt
  template works. The CLI shares `registry.js`, so it's a second independent
  check that Step 2 is correct.
- Grep `web/app.js` for `genre === '<id>'` / `currentGenre === '<id>'` — there
  should be **none**. A built-in genre is entirely data-driven, so it needs no
  per-genre branches in the UI controller (and none in `index.html`, which holds
  no JavaScript at all).

---

## Note: no per-genre engine or UI work

Everything a genre touches is data-driven, so adding one requires **zero** engine,
controller or markup edits:

- The generation engine is one shared module (`generator/engine.js`) reading one
  registry (`generator/registry.js`).
- Prompt building, response parsing and output truncation are shared
  (`generator/prompt-builder.js`), used by the browser and the CLI alike. The
  only per-genre prompt work is the `voice.js` in Step 5.
- `index.html` holds markup only — no JavaScript — and `web/app.js` is generic
  over the manifests.

The `/sync-api` skill audits the one layer that *is* still hand-duplicated (the
HTTP calls in `web/api.js` vs `generator/api-client.js` vs the CLI's local
Ollama copy). Adding a genre never touches it.
