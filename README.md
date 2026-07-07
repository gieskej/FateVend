# FateVend — RPG Character Generator

A personality-first RPG character generator for AI Dungeon scenarios. Rolls stats, seeds a full character skeleton from curated tables, then calls an AI API (Claude or Gemini) to generate terse behavioral prose — character entries, a scenario description, opening, plot components, text-to-image prompts, and tags — ready to export directly into AI Dungeon.

Seven genres: 
- **Modern**
- **Fantasy**
- **Sci-Fi**
- **Paleolithic**
- **Manga (Osaka Highschool 1987)**
- **Joseon Dynasty**
- **Nihongi (Ancient Japan)**

## Prerequisits
- A laptop, PC or server to serve the HTML/JS/images.  Should work on any OS.
- An AI text provider
  - Ollama (local or on LAN) with a good LLM, such as Llama 3.x
    - https://ollama.com/
  - Claude.ai cloud API key
    - https://platform.claude.com/settings/keys
  - Google Gemini cloud API key
    - https://aistudio.google.com/api-keys

### Optional
- AI Dungeon account
  - You could use the tool to generate scenarios for other games.  The tool only needs account credentials to auto import the custom scenario.
- An AI text-to-image provider
  - Stable Diffusion WebUI Forge (local or on LAN) with a good model, such as Flux1-dev
    - https://github.com/lllyasviel/stable-diffusion-webui-forge
    - https://huggingface.co/black-forest-labs/FLUX.1-dev    
  - Stability.ai cloud API key
    - https://platform.stability.ai/account/credits
- A TTS provider
  - Browser built-in
  - Kokoro TTS (local or LAN)
    - https://github.com/remsky/Kokoro-FastAPI
  - OpenAI TTS cloud API key
- Auto Importer (an external script) requires node.js and playwrite and chromium

## Quick start

### Install
```bash
git clone fatevend.git
cd web
bash serve.sh
```

### Start server
`serve.sh` writes `generator/config.js` from your `.env`, starts a Python HTTP server on `:8080`, and (if Node is installed) starts the AI Dungeon import server on `:7432`.

### Open Web Tool
- Open `http://localhost:8080/` in a browser. 
- Enter at least one text AI key in **Settings**
- Choose a genre
- Click **Spin the Reels**.
- When the slot machine UI completes, a scenario template is generated.
- If it looks interesting, Click **Generate Full Scenario**.
- Wait a couple minutes to generate the text and, if an image provider is defined, a protagonist portrait.
  - Adjust the Portrait Prompt and click Generate Portrait as needed.
  - Click Generate on each NPC's portrait
- If a Narration Provider is defined, you can listen to the generated scenario.

#### Importing the scenario into AI Dungeon
There are a few ways to use the results:
- Open both the tool and AI Dungeon in separate browser tabs and use each section's Copy button to copy and paste into the game.
  - Available on all platforms
- Open the tool side-by-side with AI Dungeon and use each section's Copy button to copy and paste into the game.
  - Available on desktop
- ⚙ Copy Full Text To Clipboard (JSON)
  - This is great to capture the story for editing.
  - Available on all platforms
- ↓ Download Package (.zip)
  - This is great to capture the story for later editing while on mobile, or use in other games.
  - Available on all platforms
- ↑ Import to AI Dungeon
  - This option is only available on localhost because of its dependence on playwrite and chromium.
  - Requires your AI Dungeon credentials

You can also open `web/index.html` directly in a browser and enter keys manually.

## API keys

| Key | Provider | Used for |
|-----|----------|----------|
| `ANTHROPIC_API_KEY` | [console.anthropic.com](https://console.anthropic.com) | Text generation (Claude) |
| `GEMINI_API_KEY` | [aistudio.google.com](https://aistudio.google.com/app/apikey) | Text generation (Gemini) |
| `STABILITY_API_KEY` | [platform.stability.ai](https://platform.stability.ai) | Portrait generation (cloud) |
| `SD_URL` | Local AUTOMATIC1111 instance | Portrait generation (local, takes priority) |
| `AIDUNGEON_EMAIL` | AI Dungeon account | Playwright importer login |
| `AIDUNGEON_PASSWORD` | AI Dungeon account | Playwright importer login |

Add keys to a `.env` file at the project root, or enter them in the **Settings** panel in the app. Click **? Getting API Keys** in Settings for step-by-step instructions.

## AI Dungeon import

After generating a scenario you can export it directly into AI Dungeon automatically.

### One-click import (requires Node + Playwright)

```bash
# Install Playwright once
npm install
npx playwright install chromium

# Start the import server alongside serve.sh (serve.sh does this automatically)
node web/tools/aidungeon-server.mjs
```

With the server running, an **↑ Import to AI Dungeon** button appears below the Download button after each generation. Click it — a browser window opens and fills in the scenario title, description, plot components, story cards, and portrait automatically.

### Manual import (download package first)

```bash
node web/tools/aidungeon-importer.mjs \
  --input <path-to-extracted-package-folder> \
  --headed \
  --slowmo 200
```

The package folder comes from **↓ Download Package (.zip)** in the web app. It contains `scenario.json` and `portrait.png`.

### What gets imported

| AI Dungeon field | Source |
|-----------------|--------|
| Title | `scenario.title` |
| Description | `scenario.description` |
| Opening: Story | description + opening |
| Story Summary | `scenario.opening` |
| Plot Essentials | `scenario.plotEssentials` |
| Author's Note | `scenario.authorNote` |
| Story Cards | one per character (name, description, trigger words) |
| Portrait | `portrait.png` |

## TTS narration

Select a voice provider in **Settings → Narration**: Browser (built-in), Kokoro (local LAN endpoint), or OpenAI TTS. Speaker buttons appear on all prose fields. **Narrate All** reads the full sheet sequentially.

## CLI usage

```bash
# Full generation (modern genre by default)
ANTHROPIC_API_KEY=sk-ant-... node cli/index.js

# Skeleton only — no API call
node cli/index.js --skeleton-only

# Machine-readable JSON
node cli/index.js --json
```


## Contributing

### Project structure

```
web/
  index.html                      ← Single-page UI
  styles.css
  serve.sh                        ← Dev server + import server launcher

  generator/                      ← Core library (no UI or Node dependencies)
    index.js                      ← Public API: generateCharacter()
    roller.js                     ← Stat rolling (Box-Muller bell curve)
    selector.js                   ← Weighted table selection
    skeleton-builder.js           ← Assembles CharacterSkeleton from genre tables
    cast-builder.js               ← Supporting cast (family, friends, foils)
    api-client.js                 ← Claude + Gemini API calls, output truncation
    ui-data.js                    ← Re-exports all genre tables for the UI

    genres/
      modern/
      fantasy/
      sci-fi/
      paleolithic/
      manga-osaka-highschool1987/
      historical-korea-joseon-dynasty/
      nihongi/

      Each genre contains:
        prompt-template.js        ← Genre-specific AI prompt + response parser
        professions.js, races.js, life-events.js, tensions.js, secrets.js, …

  tools/
    aidungeon-importer.mjs        ← Playwright CLI importer
    aidungeon-server.mjs          ← Local HTTP server for one-click import from the UI

cli/
  index.js                        ← Thin CLI wrapper around the generator library
```


### Generator API

```js
import { generateCharacter } from './generator/index.js';

// Claude
const { skeleton, output } = await generateCharacter({ genre: 'modern', apiKey: 'sk-ant-...' });

// Gemini
const { skeleton, output } = await generateCharacter({ genre: 'nihongi', geminiKey: 'AIza...' });

// Skeleton only (no AI call)
const { skeleton } = await generateCharacter({ genre: 'fantasy', skipAI: true });
```

### Adding a new genre

#### Easy
- Use the Claude Code "/add-genre {title}" skill

#### Manual
1. Create `generator/genres/<name>/` mirroring an existing genre's file structure
2. Export the new tables from `generator/ui-data.js`
3. Register the genre in `getGenreTables()` and `api-client.js` in `index.html`
4. Add a genre button to the selector in the UI
5. Create the prompts, icons, etc.
