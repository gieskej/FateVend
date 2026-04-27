# Gears of Fate — RPG Character Generator

A personality-first RPG character generator for AI Dungeon scenarios.

## Quick start

Open `index.html` in a browser. Enter your Anthropic API key and click **Turn the Gears**.

## Project structure

```
index.html                        ← Single-file web UI (self-contained)
requirements.md                   ← Full project requirements

generator/                        ← Core library (no UI dependencies)
  index.js                        ← Public API: generateCharacter()
  roller.js                       ← Stat rolling + MBTI weighting
  selector.js                     ← Weighted table selection
  skeleton-builder.js             ← Assembles CharacterSkeleton from tables
  cast-builder.js                 ← Builds supporting cast
  api-client.js                   ← Anthropic API call + response parsing
  types.js                        ← JSDoc type definitions

  genres/
    modern/                       ← Modern genre tables
      professions.js
      life-events.js
      family-structures.js
      tensions.js
      secrets.js
      settings.js
      character-attributes.js
      prompt-template.js

    fantasy/                      ← Fantasy genre tables
      professions.js
      life-events.js
      family-structures.js
      tensions.js
      secrets.js
      settings.js
      character-attributes.js
      names.js
      prompt-template.js

    sci-fi/                       ← Placeholder for v2

cli/
  index.js                        ← CLI wrapper

```

## CLI usage

```bash
# Full generation
ANTHROPIC_API_KEY=sk-ant-... node cli/index.js

# Skeleton only (no API call)
ANTHROPIC_API_KEY=sk-ant-... node cli/index.js --skeleton-only

# JSON output
ANTHROPIC_API_KEY=sk-ant-... node cli/index.js --json
```

## Generator API

```js
import { generateCharacter } from './generator/index.js';

const { skeleton, output } = await generateCharacter({
  genre: 'modern',   // or 'fantasy'
  apiKey: 'sk-ant-...',
});

// Skeleton only (no API call)
const { skeleton } = await generateCharacter({
  genre: 'fantasy',
  skipAI: true,
});
```

## Adding a new genre

1. Create `generator/genres/<name>/` with the same file structure as `modern/`
2. Add the genre's tables to `getGenreTables()` in `index.html`
3. Add a button to the genre selector in the UI
