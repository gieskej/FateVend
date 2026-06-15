"""
Shared core for Gears of Fate icon-generation scripts.
Import run() from a genre-specific generate_icons.py wrapper.
"""

import re, requests, base64, time, sys, argparse
from datetime import datetime
from pathlib import Path


def extract_pairs(js_text):
    """Return list of (iconPrompt, iconPath) from a JS file's text."""
    flat    = re.sub(r'[\r\n]+\s*', ' ', js_text)
    prompts = re.findall(r'iconPrompt\s*:\s*["\'](.+?)["\']', flat)
    paths   = re.findall(r'iconPath\s*:\s*["\'](.+?)["\']',   flat)
    if len(prompts) != len(paths):
        raise ValueError(f"iconPrompt/iconPath count mismatch: {len(prompts)} vs {len(paths)}")
    return list(zip(prompts, paths))


def run(genre_dir, icon_dir, style, params, description="", recursive=False):
    """
    Collect iconPrompt/iconPath pairs from all JS files in genre_dir,
    generate images via SD WebUI Forge, and save to icon_dir/<timestamp>/.

    Args:
        genre_dir:   Path to the genre's root folder (contains *.js data files).
        icon_dir:    Path to the icons output folder (this script's directory).
        style:       Genre-specific style suffix appended to every prompt.
        params:      SD API parameter dict (steps, cfg_scale, batch_size, etc.).
        description: CLI --help description string.
        recursive:   If True, scan all subdirectory PNGs when building the skip set.
    """
    parser = argparse.ArgumentParser(description=description)
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

    js_files = sorted(genre_dir.glob("*.js"))
    items    = []

    for js_path in js_files:
        text = js_path.read_text(encoding="utf-8")
        try:
            pairs = extract_pairs(text)
        except ValueError as e:
            sys.stdout.write(f"WARNING {js_path.name}: {e}\n")
            continue
        for prompt, icon_path in pairs:
            slug = Path(icon_path).stem
            items.append((slug, prompt.rstrip(", ") + ", " + style))

    sys.stdout.write(f"Loaded {len(items)} items from {len(js_files)} JS files.\n\n")

    timestamp = datetime.now().strftime("%Y-%m-%d_%H%M%S")
    outdir    = icon_dir / timestamp
    outdir.mkdir(parents=True, exist_ok=True)

    existing_slugs = set()
    png_iter = icon_dir.rglob("*.png") if recursive else icon_dir.glob("*.png")
    for p in png_iter:
        if recursive and outdir in p.parents:
            continue
        if missing_bytes is not None and p.read_bytes() == missing_bytes:
            continue
        parts = p.stem.rsplit("#", 1)
        existing_slugs.add(parts[0] if len(parts) == 2 and parts[1].isdigit() else p.stem)

    base     = "http://bonobo.local:7860"
    variants = params.get("batch_size", 3)
    total    = len(items)
    skipped  = 0
    done     = 0
    errors   = []

    for i, (slug, prompt) in enumerate(items, 1):
        if slug in existing_slugs:
            sys.stdout.write(f"[{i}/{total}] skip  {slug}\n")
            sys.stdout.flush()
            skipped += 1
            continue

        out_paths = [outdir / f"{slug}#{v}.png" for v in range(1, variants + 1)]

        sys.stdout.write(f"[{i}/{total}] gen   {slug}...\n")
        sys.stdout.flush()
        try:
            r = requests.post(
                base + "/sdapi/v1/txt2img",
                json=dict(prompt=prompt, **params),
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
    sys.stdout.write(f"Output: {outdir}\n")
    if errors:
        sys.stdout.write("Failed: " + ", ".join(errors) + "\n")
