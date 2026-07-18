# FateVend — RPG Character Generator

A personality-first RPG character generator for AI Dungeon scenarios. Rolls stats, seeds a full character skeleton from curated tables, then calls an AI API (Claude or Gemini) to generate terse behavioral prose — character entries, a scenario description, opening, plot components, text-to-image prompts, and tags — ready to export directly into AI Dungeon.

Seven built-in genres:
- **Modern**
- **Fantasy**
- **Sci-Fi**
- **Paleolithic**
- **Manga (Osaka Highschool 1987)**
- **Joseon Dynasty**
- **Nihongi (Ancient Japan)**

…plus **importable genre packs**: a genre is a pure-data pack (a `manifest.json`,
or a `.zip` with its own icons and music) that you can add at runtime from
**Settings → Genre Packs** — no source edits, no rebuild. See
[Genre packs](#genre-packs) below.

## Screenshots

<table>
<tr>
<td align="center" width="50%"><img src="docs/screenshots-desktop/1-genres-fantasy.webp" width="400"><br><sub>Pick a genre</sub></td>
<td align="center" width="50%"><img src="docs/screenshots-desktop/2-reels-and-skeleton.webp" width="400"><br><sub>Spin the reels, roll a character + cast</sub></td>
</tr>
<tr>
<td align="center"><img src="docs/screenshots-desktop/3-ai-generated-scenario.webp" width="400"><br><sub>Generate the full AI Dungeon scenario</sub></td>
<td align="center"><img src="docs/screenshots-mobile/02-spin-reels.webp" width="200"><br><sub>Works on mobile too</sub></td>
</tr>
</table>

<details>
<summary>More screenshots (all genres, mobile flow, settings)</summary>

**Desktop — other genres**

<table>
<tr>
<td align="center"><img src="docs/screenshots-desktop/1-genres-modern.webp" width="200"><br><sub>Modern</sub></td>
<td align="center"><img src="docs/screenshots-desktop/1-genres-scifi.webp" width="200"><br><sub>Sci-Fi</sub></td>
<td align="center"><img src="docs/screenshots-desktop/1-genres-paleo.webp" width="200"><br><sub>Paleolithic</sub></td>
</tr>
<tr>
<td align="center"><img src="docs/screenshots-desktop/1-genres-manga.webp" width="200"><br><sub>Manga</sub></td>
<td align="center"><img src="docs/screenshots-desktop/1-genres-joseon.webp" width="200"><br><sub>Joseon Dynasty</sub></td>
<td align="center"><img src="docs/screenshots-desktop/1-genres-nihongi.webp" width="200"><br><sub>Nihongi</sub></td>
</tr>
</table>

**Mobile — full flow**

<table>
<tr>
<td align="center"><img src="docs/screenshots-mobile/03-rolled-char-stats.webp" width="150"><br><sub>Rolled stats</sub></td>
<td align="center"><img src="docs/screenshots-mobile/04-skeleton1.webp" width="150"><br><sub>Character skeleton</sub></td>
<td align="center"><img src="docs/screenshots-mobile/04-skeleton2.webp" width="150"><br><sub>Character skeleton</sub></td>
<td align="center"><img src="docs/screenshots-mobile/04-skeleton3.webp" width="150"><br><sub>Character skeleton</sub></td>
</tr>
<tr>
<td align="center"><img src="docs/screenshots-mobile/05-rolled-npc1.webp" width="150"><br><sub>Supporting cast</sub></td>
<td align="center"><img src="docs/screenshots-mobile/05-rolled-npc2.webp" width="150"><br><sub>Supporting cast</sub></td>
<td align="center"><img src="docs/screenshots-mobile/06-ai-generation.webp" width="150"><br><sub>AI generation</sub></td>
<td align="center"><img src="docs/screenshots-mobile/07-ai-scenario1.webp" width="150"><br><sub>Scenario</sub></td>
</tr>
<tr>
<td align="center"><img src="docs/screenshots-mobile/07-ai-scenario2.webp" width="150"><br><sub>Scenario</sub></td>
<td align="center"><img src="docs/screenshots-mobile/07-ai-scenario3.webp" width="150"><br><sub>Scenario</sub></td>
<td align="center"><img src="docs/screenshots-mobile/07-ai-scenario4.webp" width="150"><br><sub>Scenario</sub></td>
<td align="center"><img src="docs/screenshots-mobile/08-ai-storycards1.webp" width="150"><br><sub>Story cards</sub></td>
</tr>
<tr>
<td align="center"><img src="docs/screenshots-mobile/08-ai-storycards2.webp" width="150"><br><sub>Story cards</sub></td>
<td align="center"><img src="docs/screenshots-mobile/09-settings-options.webp" width="150"><br><sub>Settings</sub></td>
<td align="center"><img src="docs/screenshots-mobile/09-settings-text.webp" width="150"><br><sub>Settings</sub></td>
<td></td>
</tr>
</table>

</details>

## Prerequisites
- A laptop, PC or server to serve the HTML/JS/images.  Should work on any OS.
- An AI text provider
  - Ollama (local or on LAN)
    - https://ollama.com/
  - Claude.ai cloud API key
    - https://platform.claude.com/settings/keys
  - Google Gemini cloud API key (Recommended for best creativity, even in free tier)
    - https://aistudio.google.com/api-keys

### Optional
- AI Dungeon account
  - You could use the tool to generate scenarios for other games.  The tool only needs account credentials to auto import the custom scenario.
- An AI text-to-image provider
  - Stable Diffusion WebUI Forge (local or on LAN) with a good model, such as Flux1-dev
    - [Stable Diffusion WebUI Forge](https://github.com/lllyasviel/stable-diffusion-webui-forge)
    - [flux1-dev-bnb-nf4-v2.safetensors](https://huggingface.co/lllyasviel/flux1-dev-bnb-nf4/blob/main/flux1-dev-bnb-nf4-v2.safetensors)
  - Stability.ai cloud API key
    - https://platform.stability.ai/account/credits
- A TTS provider
  - Browser built-in
  - Kokoro TTS (local or LAN) (Recommended)
    - https://github.com/remsky/Kokoro-FastAPI
  - OpenAI TTS cloud API key
- Auto Importer (an external script) requires Node.js, Playwright, and Chromium

## Quick start

### Install
```bash
git clone fatevend.git
cd web
bash serve.sh
```

### Start server
`serve.sh` writes `generator/config.js` from your `.env`, starts a Python HTTP server on `:8080`, and (if Node is installed) starts the AI Dungeon import server on `:7432`.

#### Optional: run as a systemd service (Linux)
To keep `serve.sh` running in the background and auto-restart on boot/failure:
```bash
sudo bash deploy/install.sh
```
This fills in `deploy/fatevend.service`'s user and repo path automatically (using whoever ran `sudo`, or `sudo bash deploy/install.sh <username>` to specify one) and installs/enables/starts it. Safe to re-run any time (e.g. after moving the repo) — it just reinstalls and restarts. Logs via `journalctl -u fatevend -f`. Stop/restart with `sudo systemctl stop|restart fatevend`.

### Open Web Tool
- Open `http://localhost:8080/` in a browser. 
- Enter at least one text AI key in **Settings**
- Choose a genre
- Click **Spin the Reels**.
- When the slot machine UI completes, a scenario template is generated.
- If it looks interesting, Click **Generate Scenario**.
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
  - This option is only available on localhost because of its dependence on Playwright and Chromium.
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

## Genre packs

A genre is entirely **data**, so a new playable genre can be shipped as a
self-contained **pack** and imported at runtime — no source edits, no rebuild.
A pack is either:

- a single **`manifest.json`** (all data inline), or
- a **`.zip`** containing `manifest.json` plus optional `icons/` and `audio/`
  folders (so the pack brings its own slot-machine art, carousel cover, and BGM).

Packs carry **no executable code** — only JSON data and image/audio assets — so
importing one can't run arbitrary JavaScript.

**To install:** open **Settings → Genre Packs**, choose a `.json` or `.zip`
file, and the new genre appears in the carousel immediately. Installed packs are
stored in the browser (IndexedDB) and reload automatically; each has a **Remove**
button.

**To author one:** the fastest start is an existing example in `web/genre-packs/`:

- `sample-neon-drift.json` — a JSON-only pack (reuses Sci-Fi's art via the
  optional `iconBase` field).
- `example-pirate-cove.zip` + `build-example-pack.py` — a self-contained `.zip`
  with bundled icons and audio; the Python script builds it and doubles as a
  worked template.

The full pack format, loader/registration internals, and authoring guide are in
[`.claude/docs/features/genre-packs/DESIGN.md`](.claude/docs/features/genre-packs/DESIGN.md).

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
    engine.js                     ← Roll + skeleton pipeline used by the browser
    roller.js                     ← Stat rolling (Box-Muller bell curve)
    selector.js                   ← Weighted table selection
    skeleton-builder.js           ← Assembles CharacterSkeleton from genre tables
    cast-builder.js               ← Supporting cast (family, friends, foils)
    registry.js                   ← GENRE_TABLES: single source of truth for genre data
    manifests.js                  ← GENRE_MANIFESTS + GENRE_VOICE: presentation, slots, prompt voice
    prompt-builder.js             ← Single shared buildPrompt(sk, voice) + parseResponse + output limits
    pack-loader.js                ← Loads/validates a genre pack into the runtime shapes
    api-client.js                 ← Claude + Gemini API calls (browser + CLI share prompt-builder.js)
    ui-data.js                    ← Static story cards + shared UI constants

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
    sample-neon-drift.json        ← JSON-only example pack
    example-pirate-cove.zip       ← Self-contained .zip example (bundled icons + audio)
    build-example-pack.py         ← Builds the .zip; worked authoring template

  tools/
    aidungeon-importer.mjs        ← Playwright CLI importer
    aidungeon-server.mjs          ← Local HTTP server for one-click import from the UI

cli/
  index.js                        ← Thin CLI wrapper around the generator library

deploy/
  fatevend.service                ← Optional systemd unit for running serve.sh as a service
  install.sh                      ← Installs/updates the unit above (fills in user + repo path)
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

There are two ways, depending on whether the genre should ship in the repo:

**As a genre pack (no source edits, recommended).** Author a `manifest.json` /
`.zip` and import it at runtime — see [Genre packs](#genre-packs) and start from
`web/genre-packs/build-example-pack.py`.

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
