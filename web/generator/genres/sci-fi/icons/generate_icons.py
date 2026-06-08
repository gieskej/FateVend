"""
Generate sci-fi icons via SD WebUI Forge API.
Reads iconPrompt / iconPath pairs from all JS files in the sci-fi genre.
Saves variants into a timestamp subfolder inside the icons directory.
Skips items whose output files already exist anywhere in the icons tree.
"""

import argparse, re, requests, base64, time, sys
from datetime import datetime
from pathlib import Path

BASE     = "http://bonobo.local:7860"
GENRE_DIR = Path(__file__).resolve().parent.parent   # genres/sci-fi/
ICON_DIR  = Path(__file__).resolve().parent          # genres/sci-fi/icons/

STYLE = (
    "square icon, dark sci-fi atmosphere, dramatic rim lighting, "
    "detailed digital illustration, centered subject, clean composition, "
    "cyberpunk aesthetic, muted palette with neon accent"
)

NEG = ""

VARIANTS = 3

PARAMS = dict(
    negative_prompt     = NEG,
    steps               = 30,
    width               = 256,
    height              = 256,
    cfg_scale           = 1,
    distilled_cfg_scale = 7,
    sampler_name        = "Euler",
    scheduler           = "Simple",
    batch_size          = VARIANTS,
)

# ── JS PARSING ────────────────────────────────────────────────────────────────

# Matches the value of a JS string property, handling both:
#   key: "value",
#   key:\n      "value",
# Captures content inside the outermost quotes (single or double).
_PROP = r"""(?:iconPrompt|iconPath)\s*:\s*["'](.+?)["']"""

def extract_pairs(js_text):
    """Return list of (iconPrompt, iconPath) from a JS file's text."""
    # Collapse escaped newlines and normalise whitespace so multi-line
    # strings joined by the formatter can be matched on one pass.
    flat = re.sub(r'[\r\n]+\s*', ' ', js_text)
    prompts = re.findall(r'iconPrompt\s*:\s*["\'](.+?)["\']', flat)
    paths   = re.findall(r'iconPath\s*:\s*["\'](.+?)["\']',   flat)
    if len(prompts) != len(paths):
        raise ValueError(f"iconPrompt/iconPath count mismatch: {len(prompts)} vs {len(paths)}")
    return list(zip(prompts, paths))


# ── COLLECT ITEMS ─────────────────────────────────────────────────────────────

parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument(
    "--missing",
    metavar="PATH",
    help="Path to the placeholder/default image. When given, only regenerate icons whose existing file is byte-identical to this image.",
)
args = parser.parse_args()

missing_bytes = None
if args.missing:
    missing_path = Path(args.missing)
    if not missing_path.exists():
        sys.stderr.write(f"ERROR: --missing path not found: {missing_path}\n")
        sys.exit(1)
    missing_bytes = missing_path.read_bytes()
    sys.stdout.write(f"Filter: only regenerate icons matching {missing_path} ({len(missing_bytes):,} bytes)\n\n")

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
        # Derive slug from the filename part of the iconPath, minus extension.
        # e.g. "generator/genres/sci-fi/icons/CITY_SETTINGS#orbital_station.png"
        #   → "CITY_SETTINGS#orbital_station"
        slug = Path(icon_path).stem
        ITEMS.append((slug, prompt.rstrip(", ") + ", " + STYLE))

sys.stdout.write(f"Loaded {len(ITEMS)} items from {len(JS_FILES)} JS files.\n\n")

# ── OUTPUT DIRECTORY ──────────────────────────────────────────────────────────

TIMESTAMP = datetime.now().strftime("%Y-%m-%d_%H%M%S")
OUTDIR    = ICON_DIR / TIMESTAMP
OUTDIR.mkdir(parents=True, exist_ok=True)

# Build a set of slugs to skip.
# With --missing: a slug is skipped only if its existing file differs from the
# placeholder, meaning it was already generated with real content.
# Without --missing: any existing file causes the slug to be skipped.
existing_slugs = set()
for p in ICON_DIR.rglob("*.png"):
    if OUTDIR not in p.parents:
        if missing_bytes is not None and p.read_bytes() == missing_bytes:
            continue   # placeholder — allow regeneration
        # Strip trailing #N only when the last component is a numeric variant
        # suffix (e.g. "SLUG#name#1" → "SLUG#name").  Root icon files have the
        # form "SLUG#name.png" with no numeric suffix; stripping would corrupt
        # the slug to just "SLUG".
        parts = p.stem.rsplit("#", 1)
        existing_slugs.add(parts[0] if len(parts) == 2 and parts[1].isdigit() else p.stem)

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
