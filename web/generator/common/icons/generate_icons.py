"""
Generate common icons (MBTI, Sentiments) via SD WebUI Forge API.
Reads iconPrompt / iconPath pairs from all JS files in generator/common/.
Saves variants into a timestamp subfolder inside the icons directory.
Skips items whose output files already exist anywhere in the icons tree.
"""

import re, requests, base64, time, sys
from datetime import datetime
from pathlib import Path

BASE      = "http://bonobo.local:7860"
GENRE_DIR = Path(__file__).resolve().parent.parent   # generator/common/
ICON_DIR  = Path(__file__).resolve().parent          # generator/common/icons/

STYLE = (
    "square icon, clean white background, subtle drop shadow, "
    "Pixar-style 3D cartoon illustration, centered subject, "
    "expressive and friendly, vibrant but not garish"
)

NEG = ""

VARIANTS = 3

PARAMS = dict(
    negative_prompt     = NEG,
    steps               = 20,
    width               = 256,
    height              = 256,
    cfg_scale           = 1,
    distilled_cfg_scale = 6,
    sampler_name        = "Euler",
    scheduler           = "Simple",
    batch_size          = VARIANTS,
)

# ── JS PARSING ────────────────────────────────────────────────────────────────

def extract_pairs(js_text):
    """Return list of (iconPrompt, iconPath) from a JS file's text."""
    flat    = re.sub(r'[\r\n]+\s*', ' ', js_text)
    prompts = re.findall(r'iconPrompt\s*:\s*["\'](.+?)["\']', flat)
    paths   = re.findall(r'iconPath\s*:\s*["\'](.+?)["\']',   flat)
    if len(prompts) != len(paths):
        raise ValueError(f"iconPrompt/iconPath count mismatch: {len(prompts)} vs {len(paths)}")
    return list(zip(prompts, paths))

# ── COLLECT ITEMS ─────────────────────────────────────────────────────────────

JS_FILES = sorted(GENRE_DIR.glob("*.js"))

ITEMS = []   # list of (slug, full_prompt)

for js_path in JS_FILES:
    text = js_path.read_text(encoding="utf-8")
    try:
        pairs = extract_pairs(text)
    except ValueError as e:
        sys.stdout.write(f"WARNING {js_path.name}: {e}\n")
        continue
    for prompt, icon_path in pairs:
        slug = Path(icon_path).stem
        ITEMS.append((slug, prompt.rstrip(", ") + ", " + STYLE))

sys.stdout.write(f"Loaded {len(ITEMS)} items from {len(JS_FILES)} JS files.\n\n")

# ── OUTPUT DIRECTORY ──────────────────────────────────────────────────────────

TIMESTAMP = datetime.now().strftime("%Y-%m-%d_%H%M%S")
OUTDIR    = ICON_DIR / TIMESTAMP
OUTDIR.mkdir(parents=True, exist_ok=True)

existing_slugs = set()
for p in ICON_DIR.rglob("*.png"):
    if OUTDIR not in p.parents:
        existing_slugs.add(p.stem.rsplit("#", 1)[0])

# ── GENERATE ──────────────────────────────────────────────────────────────────

total   = len(ITEMS)
skipped = 0
done    = 0
errors  = []

for i, (slug, prompt) in enumerate(ITEMS, 1):
    if slug in existing_slugs:
        sys.stdout.write(f"[{i}/{total}] skip  {slug}\n")
        sys.stdout.flush()
        skipped += 1
        continue

    out_paths = [OUTDIR / f"{slug}#{v}.png" for v in range(1, VARIANTS + 1)]

    sys.stdout.write(f"[{i}/{total}] gen   {slug}...\n")
    sys.stdout.flush()
    try:
        r = requests.post(
            BASE + "/sdapi/v1/txt2img",
            json=dict(prompt=prompt, **PARAMS),
            timeout=360,
        )
        r.raise_for_status()
        images = r.json()["images"]
        sizes  = []
        for v, (img_b64, path) in enumerate(zip(images, out_paths), 1):
            img = base64.b64decode(img_b64)
            with open(path, "wb") as f:
                f.write(img)
            sizes.append(f"#{v}:{len(img):,}b")
        sys.stdout.write(f"         {' '.join(sizes)}\n")
        sys.stdout.flush()
        done += 1
    except Exception as e:
        sys.stdout.write(f"         ERROR: {e}\n")
        sys.stdout.flush()
        errors.append(slug)

    time.sleep(0.3)

sys.stdout.write(f"\nDone. generated={done}  skipped={skipped}  errors={len(errors)}\n")
sys.stdout.write(f"Output: {OUTDIR}\n")
if errors:
    sys.stdout.write("Failed: " + ", ".join(errors) + "\n")
