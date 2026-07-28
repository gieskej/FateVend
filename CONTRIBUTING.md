# Contributing

[← Back to README](README.md)

## Project structure

The code splits into two layers: a **pure-data generator library** under
`web/generator/` (no browser or Node APIs — shared verbatim by the web app and
the CLI) and a **browser front end** of ES modules at `web/` that drive the UI.

```
web/
  index.html                      ← Markup only — references styles.css + app.js (no inline JS/CSS)
  styles.css
  serve.sh                        ← Dev server + import server launcher; writes generator/config.js from .env

  ── Browser front end (ES modules; app.js is the controller) ──
  app.js                          ← UI controller: slot machine, render, generate flow, portrait, settings
  api.js                          ← Browser text-provider calls (Claude / Gemini / Ollama)
  state.js                        ← Shared mutable UI state object (current genre / output / skeleton)
  carousel.js                     ← Genre picker (carousel + navigation + setGenre)
  audio.js                        ← Background-music player + sound effects
  narration.js                    ← TTS narration (Browser / Kokoro / OpenAI)
  pack-assets.js                  ← Uploaded-pack icon/audio blob-URL resolution

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
```

The front-end modules use a few deliberate call-time-only circular imports
(e.g. `narration.js`/`audio.js`/`carousel.js` ↔ `app.js`), which are safe in ES
modules because no cross-module reference is used at module-evaluation time.
HTML files hold markup only — JS lives in `.js`, CSS in `.css`.

## Tests

```bash
npm install          # once, for Playwright (also used by the importer)
npx playwright install chromium

npm test              # data tier + e2e fast tier — free, ~30s, run it often
npm run test:full     # also runs a real AI-generation test (makes a billed API call)
npm run test:data     # just the pure-Node data checks (well under a second)
npm run test:e2e      # just the Playwright browser tests
```

Two layers, both under `web/tests/`:

- **`data/`** — pure Node, no browser: an exhaustive check that every `iconPath`
  in every genre's tables resolves to a real file, plus a 50-rolls-per-genre
  consistency pass (skeleton shape, profession-gated tension/secret rules,
  concrete NPC races, NPC MBTI/traits).
- **`e2e/`** — plain Playwright scripts (no `@playwright/test` runner): page
  smoke test, genre switching, genre-pack import/removal, narration/audio
  controls, settings modal, and — only in `test:full` — the full two-phase
  generation flow against a live text provider. `npm test` starts `serve.sh`
  automatically if nothing is already listening on `:8080`.

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

There are two ways, depending on whether the genre should ship in the repo:

**As a genre pack (no source edits, recommended).** Author a `manifest.json` /
`.zip` and import it at runtime — see [Genre packs](README.md#genre-packs) and
start from `web/genre-packs/build-example-pack.py`.

**As a built-in genre (ships in the repo, and usable from the CLI).** Add a
folder of pure-data modules under `generator/genres/<id>/` and wire it into the
registration sites:

1. Create `generator/genres/<id>/` mirroring an existing genre's data modules.
2. Import those tables and add a `GENRE_TABLES['<id>']` entry in `generator/registry.js`.
3. Add `GENRE_MANIFESTS['<id>']`, the id in `CAROUSEL_ORDER`, and `GENRE_VOICE['<id>']` in `generator/manifests.js`.
4. Register static story cards in `generator/ui-data.js` (`STATIC_CARDS_BY_GENRE`).
5. Add `generator/genres/<id>/voice.js` (`SYSTEM_PROMPT` + `outputRules(sk)`) and reference it from `GENRE_VOICE` in `manifests.js`; add an `icons/generate_icons.py` wrapper. The browser and CLI share one `buildPrompt` — there's no separate CLI prompt template.

The engine, carousel, slot machine, TTS, and music are all data-driven, so a new
genre needs **no `index.html` edits**. The Claude Code **`/add-genre`** skill
walks through both paths step by step.
