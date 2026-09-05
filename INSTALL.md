# Installing FateVend

**You do not need WSL, Git, or GitHub CLI.** FateVend is a plain web page —
HTML, JavaScript and images. It talks to AI providers directly from your
browser, so there is no backend to install and nothing to compile.

**Windows needs nothing at all.** A Mac needs Python 3, which comes with Apple's
Command Line Tools rather than the base system; the launcher checks for it and
prints the one command that installs it.

Pick the section that matches what you want:

| I want to… | What it takes | Section |
|---|---|---|
| Just try it | Nothing but Windows or a Mac | [Level 1](#level-1--run-it-5-minutes) |
| Use my own AI keys | A free API key | [Level 2](#level-2--add-an-ai-provider) |
| One-click import into AI Dungeon | Node.js + a download | [Level 3](#level-3--one-click-ai-dungeon-import) |
| Portraits and narration | Optional extras | [Level 4](#level-4--portraits-and-narration) |
| Change the code | Git + Node.js | [CONTRIBUTING.md](CONTRIBUTING.md) |

Each level is optional and builds on the one before. **Level 1 alone gives you a
working character generator.**

---

## Level 1 — Run it (5 minutes)

### Step 1: Download the files

1. Go to <https://github.com/gieskej/FateVend>
2. Click the green **Code** button.
3. Click **Download ZIP**.
4. When it finishes, find `FateVend-main.zip` in your Downloads folder.
5. Unpack it:
   - **Windows:** right-click it → **Extract All…** → **Extract**.
   - **macOS:** double-click it. Finder unpacks it beside the ZIP.

> **Windows: do not skip the extract step.** Windows lets you open a ZIP as if
> it were a folder, but files inside are not really on disk yet and the app will
> not run. After extracting you should have a normal folder named
> `FateVend-main`.

You do **not** need Git for this. `git clone` does the same job, and if you
already use Git you're welcome to — but it is not required.

### Step 2: Start it

Open the extracted folder and double-click the launcher for your system:

- **Windows:** `Start-FateVend.cmd`
- **macOS:** `FateVend.app` (or `Start-FateVend.command`, which is the same
  thing without the icon)

A console window appears — black on Windows, a Terminal window on a Mac — and
your browser opens automatically at `http://localhost:8080/`.

That's it. **Leave that window open** — it is the app. Closing it stops the
server, and the page stops working.

To stop it later: click the window and press **Ctrl+C**, or just close it.

<details>
<summary><b>"Windows protected your PC" blue popup</b></summary>

Windows shows this for any downloaded script that isn't code-signed. Click
**More info**, then **Run anyway**.

If you'd rather verify first: `Start-FateVend.cmd` is four lines long and you
can read it in Notepad. It only launches `web\serve.ps1`.
</details>

<details>
<summary><b>The window flashes open and closes instantly</b></summary>

Almost always means the ZIP wasn't extracted (see Step 1). Extract it properly
and try again.

If it still happens, open PowerShell in the folder and run it directly so the
error stays on screen:

```powershell
powershell -ExecutionPolicy Bypass -File web\serve.ps1
```
</details>

<details>
<summary><b>"running scripts is disabled on this system"</b></summary>

Use `Start-FateVend.cmd` rather than right-click → *Run with PowerShell*. The
`.cmd` passes `-ExecutionPolicy Bypass`, which applies to that one window only
and changes no system setting.
</details>

<details>
<summary><b>Nothing opens, or the page says it can't connect</b></summary>

Read the console window. If port 8080 was busy it will have moved to 8081,
8082, and so on, and prints the real address:

```
App is at http://localhost:8081/
```

Type that address into your browser.
</details>

<details>
<summary><b>macOS: "cannot be opened because it is from an unidentified developer"</b></summary>

macOS quarantines anything unpacked from a downloaded ZIP, and shows this for
any app that isn't signed by a paying Apple developer.

**Right-click `FateVend.app` → Open**, then click **Open** in the dialog. That
button only appears on the right-click route, not on a plain double-click. You
have to do it once; afterwards it opens normally.

Newer macOS versions send you to **System Settings → Privacy & Security**
instead, where an **Open Anyway** button waits near the bottom.

If you'd rather read it first: the app is a short shell script. Right-click →
**Show Package Contents** → `Contents/MacOS/FateVend`. All it does is open
Terminal on `Start-FateVend.command`.
</details>

<details>
<summary><b>macOS: it asks to install the "command line developer tools"</b></summary>

The server is written in Python, and `/usr/bin/python3` on a Mac is only a
placeholder until Apple's Command Line Tools are installed.

Accept the prompt, or run this in Terminal:

```bash
xcode-select --install
```

It takes a couple of minutes, needs no Apple ID, and does not install the
full Xcode. Then start FateVend again.

Homebrew users can run `brew install python3` instead — that works just as well.
</details>

<details>
<summary><b>macOS: the Terminal window closes the moment it opens</b></summary>

Run it by hand so the error stays on screen:

```bash
cd FateVend-main
bash web/serve.sh
```
</details>

<details>
<summary><b>Linux</b></summary>

Use `serve.sh` — it does the same thing and needs Python 3, which every
distribution already has:

```bash
cd FateVend-main/web
bash serve.sh
```

To run it as a always-on service instead, see `deploy/install.sh`.
</details>

### Step 3: Try it

Click **Spin the Reels**.

You'll get a complete character — name, age, stats, family, profession,
secrets, a plot hook. **This needs no API key and no internet.** It's all
generated locally.

That is the whole of Level 1. If you only ever want rolled characters to use in
your own games, you're done.

---

## Level 2 — Add an AI provider

Level 1 rolls the character. An AI provider writes the *prose* — the backstory,
the scenario, the character voice — when you click **Generate Scenario**.

**Google Gemini has a free tier and is the recommended starting point.**

### Get a free Gemini key

1. Go to <https://aistudio.google.com/api-keys>
2. Sign in with a Google account.
3. Click **Create API key**.
4. Copy the key (a long string of letters and numbers).

### Put the key into FateVend

1. In FateVend, click **⚙ Settings**.
2. Paste the key into the **Gemini API key** box.
3. Close Settings.
4. In the toolbar, set the text provider dropdown to **Gemini**.

Keys are stored in your browser and never sent anywhere except to the provider.

Now spin the reels, then click **Generate Scenario**. It takes a minute or two.

<details>
<summary><b>Saving keys in a file instead of typing them</b></summary>

If you restart often, put the keys in a file so you don't retype them.  
ONLY DO THIS ON YOUR PERSONAL COMPUTER, NOT A SHARED COMPUTER.

In the **main FateVend folder** (the one holding the launcher), create a
file named exactly `.env` — note the leading dot, and **no `.txt` on the end**.
Easiest way: copy the included `.env.example` and rename the copy to `.env`.

Put your key in it:

```
GEMINI_API_KEY=your-key-here
```

Restart the launcher. The keys load automatically.

> Windows hides file extensions by default, so a file you named `.env` may
> really be `.env.txt`. In File Explorer: **View → Show → File name
> extensions**, then check.
>
> Finder hides dotfiles rather than extensions: press **Cmd-Shift-.** in the
> FateVend folder to see `.env` at all. It also refuses to save a name starting
> with a dot from some editors — `cp .env.example .env` in Terminal sidesteps
> that.

Never commit `.env` or share it — it holds your keys. It is gitignored.
</details>

### Other text providers

| Provider | Cost | Get a key |
|---|---|---|
| **Google Gemini** | Free tier | <https://aistudio.google.com/api-keys> |
| **Anthropic Claude** | Paid | <https://console.anthropic.com> |
| **Ollama** | Free, runs on your PC | <https://ollama.com/> — no key, needs a decent GPU |

---

## Level 3 — One-click AI Dungeon import

**You can skip this entirely.** Without it, FateVend still gets your scenario
into AI Dungeon — every section has a **Copy** button, and **↓ Download
Package** saves everything as a `.zip`. Copy and paste works on any device.

This level only adds the **↑ Import to AI Dungeon** button, which logs into AI
Dungeon and creates the scenario for you. It needs real software installed
because it drives a real browser.

**This is the one part of FateVend that needs Node.js.**

### Step 1: Install Node.js

1. Go to <https://nodejs.org>
2. Download the **LTS** version.
3. Run the installer and accept the defaults.
4. **Restart the launcher** so it picks up Node.

### Step 2: Install the browser automation

Open a terminal in the FateVend folder:

- **Windows:** in File Explorer, hold **Shift**, right-click empty space in the
  folder, choose **Open PowerShell window here**.
- **macOS:** right-click the folder in Finder and choose **Services → New
  Terminal at Folder**, or run `cd` to it in Terminal.

Run these two commands, one at a time:

```bash
npm install
npx playwright install chromium
```

The second downloads a private copy of Chromium (~150 MB). It does not touch
your normal browser.

### Step 3: Add your AI Dungeon login

The importer signs in as you, so it needs your credentials. Create a `.env`
file in the main FateVend folder (see the Level 2 box above) containing:

```
AIDUNGEON_EMAIL=you@example.com
AIDUNGEON_PASSWORD=your-password
```

> Your password stays on your own computer, in a file only you can read. It is
> sent only to AI Dungeon's own login page. If that's not a trade you want to
> make, use the Copy / Download Package buttons instead — they need no
> password.

### Step 4: Use it

Restart the launcher. You should now see:

```
AI Dungeon import server started on http://localhost:7432
```

Generate a scenario and the **↑ Import to AI Dungeon** button appears. A
browser window opens and drives itself — let it work.

> The button only appears when the import server is running, and only on
> `localhost`. If you don't see it, Node isn't installed or the server didn't
> start; check the console window.

---

## Level 4 — Portraits and narration

All optional, all configured the same way — in **Settings**, or in `.env`.

### Character portraits

| Option | Cost | Notes |
|---|---|---|
| **Stability AI** | Paid | Key from <https://platform.stability.ai> |
| **Stable Diffusion WebUI Forge** | Free | Runs on your PC, needs a good GPU. [Install guide](https://github.com/lllyasviel/stable-diffusion-webui-forge) |

For local Stable Diffusion, start it with the `--api` flag and put its address
(usually `http://localhost:7860`) in Settings.

### Narration

| Option | Cost | Notes |
|---|---|---|
| **Browser voice** | Free | Already built into your browser — just select it |
| **Kokoro TTS** | Free | Runs on your PC. [Install guide](https://github.com/remsky/Kokoro-FastAPI) |
| **OpenAI TTS** | Paid | Key from <https://platform.openai.com> |

Browser voice needs no setup at all — pick it from the narration dropdown.

---

## Quick reference

**Everything FateVend can use, and whether you need it:**

| Thing | Required? | For what |
|---|---|---|
| A web browser | **Yes** | Everything |
| `Start-FateVend.cmd` | **Yes** (Windows) | Serving the page |
| `FateVend.app` | **Yes** (macOS) | Serving the page |
| Python 3 | **Yes** on macOS/Linux | `serve.sh`, the non-Windows equivalent |
| An AI text key | Only for prose | Written scenarios |
| Node.js | No | One-click AI Dungeon import |
| Playwright + Chromium | No | One-click AI Dungeon import |
| Git | No | Only if you want to modify the code |
| WSL | No | Only if you want to modify the code on Windows, WSL + git + BASH make it easy. |

## Still stuck?

Open an issue at <https://github.com/gieskej/FateVend/issues> with:

- what you clicked,
- what you expected,
- what happened instead,
- anything printed in the console window.

The console output is the single most useful thing you can include.
