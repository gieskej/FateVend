# Contributing

[← Back to README](README.md)

Thank you for considering helping out with this project.  There are a few ways you can help:

1. Develop new Genres
    - No coding required
2. Fine tune existing Genres
    - Update artwork
    - Update background music
    - Tweak names, races, secrets
    - Add plot archetypes
    - Adjust the AI system prompts for better generation prose.
    - Adjust the generated AI prompts send to AI Dungeon for better game play.
3. Bug fixes and new features
    - Got a cool feature idea?

## Project structure

The code splits into two layers: a **pure-data generator library** under
`web/generator/` (no browser or Node APIs — shared verbatim by the web app and
the CLI) and a **browser front end** of ES modules at `web/` that drive the UI.

```
web/
  index.html                      ← Markup only — references styles.css + app.js (no inline JS/CSS)
  styles.css
  serve.sh                        ← Dev server + import server launcher; writes generator/config.js from .env
  serve.ps1                       ← Same thing for Windows (pure PowerShell — no Python/bash needed)

  ── Browser front end (ES modules; app.js is the controller) ──
  app.js                          ← UI controller: slot machine, render, generate flow, portrait, settings
  api.js                          ← Browser text-provider calls (Claude / Gemini / Ollama)
  state.js                        ← Shared mutable UI state object (current genre / output / skeleton)
  carousel.js                     ← Genre picker (carousel + navigation + setGenre)
  audio.js                        ← Background-music player + sound effects
  narration.js                    ← TTS narration (Browser / Kokoro / OpenAI)
  pack-assets.js                  ← Uploaded-pack icon/audio blob-URL resolution
  telemetry.js                    ← Anonymous usage ping (opt-out in Settings; skips automated browsers)

  generator/                      ← Core library (no UI or Node dependencies; shared with the CLI)
    index.js                      ← Public API: generateCharacter()
    engine.js                     ← The single engine: stat/MBTI rolls, selectors, skeleton + NPC cast
    stat-adjectives.js            ← Numeric stat → adjective labels (statLabels)
    registry.js                   ← GENRE_TABLES: single source of truth for genre data
    manifests.js                  ← GENRE_MANIFESTS + GENRE_VOICE: presentation, slots, prompt voice
    prompt-builder.js             ← Single shared buildPrompt(sk, voice) + parseResponse + output limits
    pack-loader.js                ← Loads/validates a genre pack into the runtime shapes
    api-client.js                 ← Claude + Gemini calls for the library/CLI path
    ui-data.js                    ← Static story cards, NPC traits, shared UI constants
    types.js                      ← JSDoc typedefs for the public shapes

    genres/                       ← Built-in genres (each a folder of pure-data modules)
      modern/  fantasy/  sci-fi/  paleolithic/
      manga-osaka-highschool1987/  historical-korea-joseon-dynasty/  nihongi/

      Each genre contains data modules consumed by registry.js:
        character-attributes.js   ← genders, orientations, identity, builds, hair, features, quirks
        professions.js, life-events.js, family-structures.js, tensions.js,
        secrets.js, settings.js, names.js, plot-archetypes.js, static-cards.js
        voice.js                  ← SYSTEM_PROMPT + outputRules(sk) — fed to the shared prompt-builder
        icons/                    ← Slot-machine + carousel art (+ generate_icons.py)

  genre-packs/                    ← Importable genre packs (data-only, no source edits)
    sample-neon-drift.json        ← JSON-only example pack (reuses Sci-Fi art via iconBase)
    build-neon-drift-pack.mjs     ← Re-exports the current Sci-Fi genre into the pack above
    example-pirate-cove.zip       ← Self-contained .zip example (bundled icons + audio)
    build-example-pack.py         ← Builds the .zip; worked authoring template

  tests/                          ← See "Tests" below
    data/                         ← Pure-Node checks: icon-file existence, bulk-roll consistency
    e2e/                          ← Playwright browser tests (fast tier + a paid full-generation tier)

  tools/
    aidungeon-importer.mjs        ← Playwright CLI importer
    aidungeon-server.mjs          ← Local HTTP server for one-click import from the UI

cli/
  index.js                        ← Thin CLI wrapper around the generator library

deploy/
  fatevend.service                ← Optional systemd unit for running serve.sh as a service
  install.sh                      ← Installs/updates the unit above (fills in user + repo path)

telemetry/                        ← Anonymous telemetry server (Cloudflare Worker + D1)
  worker.js                       ← POST /event, GET /stats, GET /series
  schema.sql                      ← One wide row per generation event
  dashboard.html/.js/.css         ← Daily/weekly/monthly stats viewer (opens from disk)

tools/
  regenerate-icons-gemini.py      ← Icon regeneration via Gemini
  aidungeon-kokoro-tts.user.js    ← Browser user script: Kokoro narration inside AI Dungeon

docs/
  CLI.md                          ← CLI reference
  screenshots-desktop/            ← README screenshots

Start-FateVend.cmd                ← Windows double-click launcher (runs web/serve.ps1)
```

Docs at the repo root: [INSTALL.md](INSTALL.md) (setup for non-developers),
[CREATING-A-GENRE.md](CREATING-A-GENRE.md) (genre-pack authoring),
[DESIGN.md](DESIGN.md) (CSS/type/color rules), [CHANGELOG.md](CHANGELOG.md).

The front-end modules use two deliberate call-time-only circular imports —
`narration.js` ↔ `app.js` and `carousel.js` ↔ `app.js` — which are safe in ES
modules because no cross-module reference is used at module-evaluation time.
(`audio.js` and `pack-assets.js` are leaves: `app.js` imports them, they never
import it back, so they're outside the cycle.)
HTML files hold markup only — JS lives in `.js`, CSS in `.css`.

## Conventions

**[CLAUDE.md](CLAUDE.md) holds the project's coding conventions and they apply
to everyone**, not just to AI assistants — that file is simply where they happen
to be written down. The ones that bite most often:

- **Every data-table file needs a complete header comment** documenting *every*
  property, including the obvious ones. This is the one place the "minimal
  comments" rule is explicitly reversed: these properties are consumed
  generically several layers away (`engine.js`, `prompt-builder.js`, the slot
  machine), so the header is the only place the shape is actually recorded. A
  data file with an incomplete header is an unfinished change. Document optional
  fields with their *actual* default behavior, not just the word "optional".
- **HTML holds markup only.** No inline `<script>` bodies, no `<style>` blocks —
  JS lives in `.js`, CSS in `.css`. (Small `<script src>` tags for CDN libraries
  or the generated `generator/config.js` are fine.)
- **Text size and color come from tokens.** No raw `font-size` or `color` in a
  rule — see [DESIGN.md](DESIGN.md) for the scale and the two-surface
  chrome/parchment system.
- **Append to [CHANGELOG.md](CHANGELOG.md)** for any design, gameplay or visual
  change: what changed, why, the impact, and how it was verified.
- **Formatting:** Prettier (defaults, no config file — that's deliberate) for
  JS/JSON via `npx --yes prettier@latest --write <files>`; `black` for Python via
  `python3 -m black --line-length 88 <files>`. Prettier does not handle Python.
  Some files predate the formatter — match the surrounding style for a small
  edit rather than reformatting the whole file.
- **Changing one genre's data file?** Check whether the other six need the same
  treatment. These tables are meant to stay structurally parallel.

CLAUDE.md also carries the image-prompt rules (visible subject, action,
environment, emotional cue, camera composition — no internal thoughts or
motivations), which matter whenever you write an `iconPrompt`.

### Using Claude Code

The repo ships three project skills, invoked as slash commands:

| Command | What it does |
|---|---|
| `/add-genre` | Walks either genre path — pack or built-in — including the icon-generator wrapper and its per-aesthetic tuning table |
| `/test-ui` | Runs the e2e suite against a running dev server |
| `/sync-api` | Audits the one hand-duplicated layer left: the HTTP provider calls in `web/api.js` vs `generator/api-client.js` vs the CLI's own Ollama copy |

None of this is required to contribute — the conventions above are what matter,
and they hold however you edit the code.

## Tests

```bash
npm install          # once, for Playwright (also used by the importer)
npx playwright install chromium

npm test              # data tier + e2e fast tier — free, ~3 min
npm run test:full     # also runs a real AI-generation test (makes a billed API call)
npm run test:data     # just the pure-Node data checks (~2s — run this one constantly)
npm run test:e2e      # just the Playwright browser tests
```

A green run is currently **data 8/8, e2e 64/64**.

Two layers, both under `web/tests/`:

- **`data/`** — pure Node, no browser. Three checks:
  - `icon-files` — every `iconPath` in every genre's tables resolves to a real
    file. Exhaustive, not sampled, so a rarely-rolled entry can't hide a
    broken icon.
  - `music-files` — the manifests' `music.tracks` and `web/audio/music/` agree
    **both ways**: no listed track missing from disk, and no `.mp3` on disk that
    no manifest lists. The second direction catches music that was added but
    never wired up, which is silent at runtime.
  - `bulk-roll` — 50 rolls per genre checking skeleton shape, profession-gated
    tension/secret rules, concrete NPC races, NPC MBTI/traits, `forRole`-tagged
    parent statuses landing on the right parent, and single-parent family
    structures actually producing one.
- **`e2e/`** — plain Playwright scripts (no `@playwright/test` runner): page
  smoke test, genre switching, genre-pack import/removal, narration/audio
  controls, settings modal, mobile-viewport layout (tap targets, no horizontal
  overflow, reachable settings tabs), and — only in `test:full` — the full
  two-phase generation flow against a live text provider. `npm test` starts
  `serve.sh` automatically if nothing is already listening on `:8080`.

## Generator API

```js
import { generateCharacter } from './generator/index.js';

// Full generation (Claude). Options: { genre, apiKey, skipAI, nsfw }
const { skeleton, output } = await generateCharacter({ genre: 'modern', apiKey: 'sk-ant-...' });

// Skeleton only (no AI call) — instant and free
const { skeleton } = await generateCharacter({ genre: 'fantasy', skipAI: true });
```

The library's `generateCharacter()` calls Claude. For Gemini or Ollama, use the
[CLI](docs/CLI.md)'s `--provider` flag or the web app's Settings — both share the
same engine; only the final text-provider call differs.

## Adding a new genre

**→ [CREATING-A-GENRE.md](CREATING-A-GENRE.md)** is the guide. It covers both
routes end to end: authoring a **genre pack** (data-only, imported at runtime,
no source edits — the recommended path, and no coding required), and
[converting one into a **built-in**](CREATING-A-GENRE.md#12-shipping-a-genre-in-the-repo-instead)
that ships in the repo.

Two things worth knowing before you choose:

- Author as a pack either way. It reloads without a restart and needs no source
  edits, so iteration is far faster; converting afterwards is mechanical.
- A built-in buys exactly two things — an `outputRules(sk)` **function**, which
  can branch on the rolled character where a pure-data pack cannot, and CLI
  availability, since the CLI reads the compiled-in registry.

Whichever route, the engine, carousel, slot machine, TTS and music are all
data-driven, so a new genre needs **no `index.html` edits**. The Claude Code
**`/add-genre`** skill walks either path step by step.
