# FateVend — RPG Character Generator

A personality-first RPG character generator for AI Dungeon scenarios. Rolls stats, seeds a full character skeleton from curated tables, then calls an AI API (Claude or Gemini) to generate terse behavioral prose — character entries, a scenario description, opening, and tags — ready to copy-paste into AI Dungeon.

Three genres: **Modern**, **Fantasy**, **Sci-Fi**.

## Quick start

```bash
cd web
bash serve.sh        # writes config.js from .env, starts Python HTTP server on :8080
```

Open `http://localhost:8080/` in a browser. Enter at least one text AI key (Anthropic or Gemini) in Settings and click **Turn the Gears**.

Alternatively, open `web/index.html` directly in a browser and enter keys manually.

### API keys

| Key | Provider | Used for | Starts with |
|-----|----------|----------|-------------|
| `ANTHROPIC_API_KEY` | [console.anthropic.com](https://console.anthropic.com) | Text generation (Claude) | `sk-ant-` |
| `GEMINI_API_KEY` | [aistudio.google.com](https://aistudio.google.com/app/apikey) | Text generation (Gemini) | `AIza` |
| `STABILITY_API_KEY` | [platform.stability.ai](https://platform.stability.ai) | Portrait generation (cloud) | `sk-` |
| `SD_URL` | Local AUTOMATIC1111 instance | Portrait generation (local, priority) | `http://` |

In-app: click **? Getting API Keys** (bottom of the Settings panel) for step-by-step instructions.

## Project structure

```
web/
  index.html                    ← Single-page UI (self-contained; generator logic inlined)
  styles.css
  serve.sh                      ← Dev server: writes config.js, serves on :8080

  generator/                    ← Core library (no UI or Node dependencies)
    index.js                    ← Public API: generateCharacter()
    roller.js                   ← Stat rolling (Box-Muller bell curve) + MBTI weighting
    selector.js                 ← Weighted table selection
    skeleton-builder.js         ← Assembles CharacterSkeleton from genre tables
    cast-builder.js             ← Builds supporting cast (family, friends, foils)
    api-client.js               ← Claude + Gemini API calls, output truncation
    stat-adjectives.js          ← Stat-to-label mapping
    ui-data.js                  ← Re-exports all genre tables for the web UI
    types.js                    ← JSDoc type definitions

    common/                     ← Shared attributes across genres
      genders.js
      orientations.js
      mbti.js
      build.js
      hair.js
      sentiments.js
      icons/

    genres/
      modern/                   ← Contemporary setting (ethnicities)
      fantasy/                  ← Medieval/magical setting (races)
      sci-fi/                   ← Futuristic setting (species)

      Each genre contains:
        character-attributes.js   (builds, hair, distinguishing features, quirks)
        races.js                  (ethnicity / race / species tables)
        professions.js
        life-events.js
        family-structures.js
        tensions.js
        secrets.js
        economic-tiers.js
        city-settings.js
        settings.js               (tag pools)
        names.js                  (name pools keyed by broad identity)
        prompt-template.js        (genre-specific Claude prompt)
        icons/

  audio/                        ← Bell SFX for slot machine animation
  tools/
    aidungeon-importer.user.js  ← Tampermonkey script (experimental)

cli/
  index.js                      ← Thin CLI wrapper around the generator library
```

## CLI usage

```bash
# Full generation (modern genre by default)
ANTHROPIC_API_KEY=sk-ant-... node cli/index.js

# Skeleton only — no API call
ANTHROPIC_API_KEY=sk-ant-... node cli/index.js --skeleton-only

# Machine-readable JSON output
ANTHROPIC_API_KEY=sk-ant-... node cli/index.js --json
```

## Generator API

```js
import { generateCharacter } from './generator/index.js';

// Full generation — Claude
const { skeleton, output } = await generateCharacter({
  genre: 'modern',   // 'modern' | 'fantasy' | 'sci-fi'
  apiKey: 'sk-ant-...',
});

// Full generation — Gemini
const { skeleton, output } = await generateCharacter({
  genre: 'sci-fi',
  geminiKey: 'AIza...',
});

// Skeleton only (no API call)
const { skeleton } = await generateCharacter({
  genre: 'fantasy',
  skipAI: true,
});
```

## Adding a new genre

1. Create `generator/genres/<name>/` with the same file structure as an existing genre
2. Export the new tables from `generator/ui-data.js`
3. Add the genre's table bundle to `getGenreTables()` in `index.html`
4. Add a genre button to the selector in the UI
