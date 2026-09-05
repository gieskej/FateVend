#!/usr/bin/env bash
# Serve from web/ so .env and other project files are never exposed.
# App is at http://localhost:8080/ (or the next free port, if 8080 is taken —
# watch the "Serving HTTP on ..." line below for the actual port used).
cd "$(dirname "$0")"

# Opening a browser is the right default for a human who just double-clicked
# something, and the wrong one for deploy/fatevend.service, which runs this
# same script headless under systemd. A terminal on stdout is what separates
# the two cases, so use that rather than asking the caller to remember a flag.
OPEN_BROWSER=auto
for arg in "$@"; do
  case "$arg" in
    --open) OPEN_BROWSER=yes ;;
    --no-browser) OPEN_BROWSER=no ;;
    *)
      echo "Unknown option: $arg" >&2
      echo "Usage: serve.sh [--open | --no-browser]" >&2
      exit 2
      ;;
  esac
done
if [ "$OPEN_BROWSER" = auto ]; then
  if [ -t 1 ]; then OPEN_BROWSER=yes; else OPEN_BROWSER=no; fi
fi
export FATEVEND_OPEN_BROWSER="$OPEN_BROWSER"

# macOS ships /usr/bin/python3 as a placeholder that runs nothing until Apple's
# Command Line Tools are installed — invoking it just raises a system install
# dialog with no explanation of what wanted Python or why. Ask xcode-select
# instead, which reports the tools' absence without triggering that dialog, so
# a first run that can't work says so in a sentence the reader can act on.
PYTHON="$(command -v python3 2>/dev/null || true)"
if [ -n "$PYTHON" ] && [ "$(uname -s)" = Darwin ] && [ "$PYTHON" = /usr/bin/python3 ] &&
  ! xcode-select -p >/dev/null 2>&1; then
  PYTHON=""
fi
if [ -z "$PYTHON" ]; then
  echo "FateVend's server needs Python 3, and no working one was found." >&2
  echo >&2
  if [ "$(uname -s)" = Darwin ]; then
    echo "  On macOS, /usr/bin/python3 is only a placeholder until Apple's Command" >&2
    echo "  Line Tools are installed. Installing them takes a couple of minutes and" >&2
    echo "  needs no Apple ID and no full Xcode — run:" >&2
    echo >&2
    echo "      xcode-select --install" >&2
    echo >&2
    echo "  then start FateVend again. Homebrew users can run 'brew install python3'" >&2
    echo "  instead, which works just as well." >&2
  else
    echo "  Install it with your package manager — on Debian or Ubuntu that is:" >&2
    echo >&2
    echo "      sudo apt install python3" >&2
  fi
  exit 1
fi

# Stop stale instances from a previous run before starting new ones — a
# closed terminal or a killed shell doesn't always take its background
# children with it, so a stale process can otherwise keep running (and
# serving stale code, or squatting on a port) indefinitely.
#
# This used to work by writing each process's PID to a file and killing it
# next time. That was unreliable: this script gets run from whatever shell
# the developer prefers (Cygwin, Git Bash, WSL, ...), and a PID recorded by
# one shell's Python/Node process is frequently meaningless in another
# shell's process namespace — `kill <pid>` silently no-ops, and even
# `taskkill //F //PID <pid>` can target the wrong real Windows process if the
# recorded PID came from a POSIX subsystem with its own PID space (Cygwin).
#
# Instead, both servers below identify themselves over their own HTTP
# port (a `/ping`-style marker) and expose a loopback-only shutdown route.
# HTTP works identically no matter which shell launched the other process,
# so there's no PID-namespace mismatch to worry about. See the Python and
# aidungeon-server.mjs code below for the actual marker/shutdown routes.
"$PYTHON" - <<'PY'
import http.client, time

def ping(port, path, ok):
    try:
        conn = http.client.HTTPConnection("127.0.0.1", port, timeout=0.25)
        conn.request("GET", path)
        resp = conn.getresponse()
        body = resp.read()
        conn.close()
        return resp.status == 200 and ok(body)
    except Exception:
        return False

def shutdown(port, method, path):
    try:
        conn = http.client.HTTPConnection("127.0.0.1", port, timeout=0.5)
        conn.request(method, path)
        conn.getresponse()
        conn.close()
    except Exception:
        pass

# AI Dungeon import server always binds the same fixed port.
if ping(7432, "/ping", lambda b: b'"ok":true' in b or b'"ok": true' in b):
    print("Stopping previous AI Dungeon import server (port 7432)…")
    shutdown(7432, "POST", "/shutdown")
    time.sleep(0.3)

# Static file server picks whatever free port it lands on (see find_free_port
# below), so a stale instance from an earlier run could be sitting on any of
# them — sweep a generous range rather than assuming it's still on 8080.
killed = []
for p in range(8080, 8110):
    if ping(p, "/__fatevend_ping__", lambda b: b == b"fatevend-static"):
        shutdown(p, "GET", "/__fatevend_shutdown__")
        killed.append(p)
if killed:
    print(
        f"Stopped {len(killed)} stale static file server instance(s) on port(s): "
        + ", ".join(map(str, killed))
    )
    time.sleep(0.3)
PY

# Write config.js from the root .env so the browser can read the API key
# without the .env file itself ever being served. Also stamps the current git
# commit so the Settings modal can show which version is actually running.
"$PYTHON" - <<'PY'
import os, re, json, pathlib, subprocess

env_path = pathlib.Path('../.env')   # CWD is web/, set by the cd above
keys = {}
if env_path.exists():
    for line in env_path.read_text().splitlines():
        m = re.match(r'^([A-Z_]+)=(.+)', line.strip())
        if m:
            v = m.group(2)
            if len(v) >= 2 and v[0] == v[-1] and v[0] in '"\'':
                v = v[1:-1]
            keys[m.group(1)] = v

try:
    git_version = subprocess.run(
        ['git', 'rev-parse', '--short', 'HEAD'],
        cwd='..', capture_output=True, text=True, check=True,
    ).stdout.strip()
    dirty = subprocess.run(
        ['git', 'status', '--porcelain'],
        cwd='..', capture_output=True, text=True, check=True,
    ).stdout.strip()
    if dirty:
        git_version += '-dirty'
except (subprocess.CalledProcessError, FileNotFoundError):
    git_version = 'dev'

out = pathlib.Path('generator/config.js')
out.write_text(
    '// Auto-generated by serve.sh — do not commit\n'
    f'window.__ANTHROPIC_KEY  = {json.dumps(keys.get("ANTHROPIC_API_KEY", ""))};\n'
    f'window.__GEMINI_KEY     = {json.dumps(keys.get("GEMINI_API_KEY", ""))};\n'
    f'window.__SD_URL         = {json.dumps(keys.get("SD_URL", ""))};\n'
    f'window.__STABILITY_KEY  = {json.dumps(keys.get("STABILITY_API_KEY", ""))};\n'
    f'window.__OLLAMA_URL     = {json.dumps(keys.get("OLLAMA_URL", ""))};\n'
    f'window.__OLLAMA_MODEL   = {json.dumps(keys.get("OLLAMA_MODEL", ""))};\n'
    f'window.__TTS_KOKORO_URL = {json.dumps(keys.get("TTS_KOKORO_URL", ""))};\n'
    f'window.__TTS_OPENAI_KEY = {json.dumps(keys.get("TTS_OPENAI_KEY", ""))};\n'
    f'window.__NSFW_SUFFIX    = {json.dumps(keys.get("NSFW_IMAGE_PROMPT_SUFFIX", ""))};\n'
    f'window.__GIT_VERSION__  = {json.dumps(git_version)};\n'
)
print(f'config.js written (anthropic key length: {len(keys.get("ANTHROPIC_API_KEY",""))}, gemini key length: {len(keys.get("GEMINI_API_KEY",""))}, git version: {git_version})')
PY

# Start the AI Dungeon import server in the background (requires Node.js + Playwright).
# The web app shows an "Import to AI Dungeon" button only when this is reachable.
if command -v node &>/dev/null; then
  node tools/aidungeon-server.mjs &
  AIDUNGEON_SERVER_PID=$!
  # This kill is same-shell job control (the child this bash process just
  # spawned), which — unlike a PID recorded by a *different* prior run — is
  # always in this shell's own process namespace and reliable everywhere.
  # INT/TERM explicitly, not just EXIT — systemd stops services with SIGTERM,
  # and without a handler for it bash kills the child but skips the EXIT trap.
  trap 'kill $AIDUNGEON_SERVER_PID 2>/dev/null; exit 0' EXIT INT TERM
else
  echo "node not found — AI Dungeon import server not started."
fi

# Plain http.server sends no Cache-Control headers, so browsers fall back to
# heuristic caching and can keep showing stale assets (e.g. edited genre icons)
# after a file changes on disk.
#
# This uses no-cache, NOT no-store. Both guarantee you never see a stale file,
# but they differ enormously in cost:
#   no-store  the browser may not keep a copy at all, so every reload re-sent
#             the entire ~3.8MB of genre icons over ~220 requests.
#   no-cache  the browser caches, but must revalidate before each use. Python's
#             SimpleHTTPRequestHandler sends Last-Modified and honours
#             If-Modified-Since, so an unchanged icon costs an empty 304 instead
#             of its full body — and an edited one still updates immediately,
#             because the revalidation is mandatory rather than heuristic.
# -u: unbuffered stdout, so the port/URL message (and journalctl -f) show up
# immediately instead of sitting in a buffer that's lost if the process is killed.
"$PYTHON" -u - <<'PY'
import http.server, socket, os, platform, subprocess

def describe_port_owner(port):
    """Best-effort lookup of what's already listening on `port`, so the
    "port is taken" message says who — not just that it happened."""
    try:
        if platform.system() == 'Windows':
            out = subprocess.run(['netstat', '-ano'], capture_output=True, text=True, timeout=5).stdout
            pid = None
            for line in out.splitlines():
                parts = line.split()
                if len(parts) >= 5 and parts[0] == 'TCP' and parts[1].endswith(f':{port}') and parts[-2] == 'LISTENING':
                    pid = parts[-1]
                    break
            if not pid:
                return None
            tl = subprocess.run(
                ['tasklist', '/FI', f'PID eq {pid}', '/FO', 'CSV', '/NH'],
                capture_output=True, text=True, timeout=5,
            ).stdout.strip()
            name = tl.split(',')[0].strip('"') if tl else None
            return f'PID {pid}' + (f' ({name})' if name else '')
        else:
            out = subprocess.run(
                ['lsof', '-nP', f'-i:{port}', '-sTCP:LISTEN'],
                capture_output=True, text=True, timeout=5,
            ).stdout
            lines = [l for l in out.splitlines() if l and not l.startswith('COMMAND')]
            if not lines:
                return None
            parts = lines[0].split()
            return f'PID {parts[1]} ({parts[0]})'
    except Exception:
        return None

class NoCacheHandler(http.server.SimpleHTTPRequestHandler):
    # Self-identification + shutdown routes so the next serve.sh run can find
    # and retire a stale instance of this exact server over HTTP, regardless
    # of which shell/PID namespace started it (see the comment above the
    # kill-stale sweep near the top of this script for why that matters).
    def do_GET(self):
        if self.path == '/__fatevend_ping__':
            body = b'fatevend-static'
            self.send_response(200)
            self.send_header('Content-Type', 'text/plain')
            self.send_header('Content-Length', str(len(body)))
            self.end_headers()
            self.wfile.write(body)
            return
        if self.path == '/__fatevend_shutdown__':
            if self.client_address[0] not in ('127.0.0.1', '::1'):
                self.send_response(403)
                self.end_headers()
                return
            self.send_response(200)
            self.end_headers()
            self.wfile.flush()
            os._exit(0)  # throwaway dev instance being replaced; no state to save
        super().do_GET()

    def end_headers(self):
        self.send_header('Cache-Control', 'no-cache')
        super().end_headers()

class QuietThreadingHTTPServer(http.server.ThreadingHTTPServer):
    # A cancelled image request (e.g. the browser switching genres mid-preload)
    # closes the socket while we're still writing to it — a normal occurrence,
    # not a bug. Suppress just that traceback; still log anything else.
    def handle_error(self, request, client_address):
        import sys
        exc = sys.exc_info()[1]
        if isinstance(exc, (BrokenPipeError, ConnectionResetError, ConnectionAbortedError)):
            return
        super().handle_error(request, client_address)

def find_free_port(preferred, bind, tries=20):
    port = preferred
    for _ in range(tries):
        with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
            try:
                s.bind((bind, port))
                return port
            except OSError:
                port += 1
    raise RuntimeError(f'No free port found in range {preferred}-{port}')

BIND = '0.0.0.0'
PORT = find_free_port(8080, BIND)
if PORT != 8080:
    owner = describe_port_owner(8080)
    if owner:
        print(f'Port 8080 is already in use by {owner} — using {PORT} instead.')
    else:
        print(f'Port 8080 is already in use — using {PORT} instead.')
print(f'App is at http://localhost:{PORT}/')

if os.environ.get('FATEVEND_OPEN_BROWSER') == 'yes':
    import threading, webbrowser
    # Fire shortly after test() below starts listening rather than now: a
    # browser launched before the bind lands on a connection-refused error
    # page and stays there, since nothing prompts it to retry.
    threading.Timer(0.5, webbrowser.open, [f'http://localhost:{PORT}/']).start()

http.server.test(HandlerClass=NoCacheHandler, ServerClass=QuietThreadingHTTPServer, port=PORT, bind=BIND)
PY
