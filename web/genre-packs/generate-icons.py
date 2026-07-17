"""
Generate icons for genre-pack JSON files via SD WebUI Forge API (or Gemini).
Reads iconPrompt / iconPath pairs from anywhere in a pack's "data" section and
uses the pack's "portraitStyle" as the shared style suffix.

Saves variants into a timestamp subfolder next to each icon's target location.
Never overwrites an existing icon file — any slug that already resolves to a
file on disk is skipped.

Examples:
  # Generate icons for every *.json genre pack in this folder
  $ python ./generate-icons.py

  # Just one pack
  $ python ./generate-icons.py sample-neon-drift.json

  # Use Gemini instead of the local SD WebUI Forge server
  $ python ./generate-icons.py --backend gemini
"""

import argparse
import json
import sys
import time
from datetime import datetime
from pathlib import Path

PACKS_DIR = Path(__file__).resolve().parent   # web/genre-packs/
WEB_ROOT  = PACKS_DIR.parent                  # web/

sys.path.insert(0, str(WEB_ROOT / "generator" / "common" / "icons"))
from generate_icons_core import (
    DEFAULT_GEMINI_MODEL, _generate_sd, _generate_gemini, _init_gemini_client, _save_webp,
)

SD_BASE = "http://bonobo.local:7860"

PARAMS = dict(
    negative_prompt     = "",
    steps               = 30,
    width               = 256,
    height              = 256,
    cfg_scale           = 1,
    distilled_cfg_scale = 7,
    sampler_name        = "Euler",
    scheduler           = "Simple",
    batch_size          = 3,
)


def find_icon_items(node):
    """Recursively collect (iconPrompt, iconPath) pairs from a pack's data tree."""
    items = []
    if isinstance(node, dict):
        if "iconPrompt" in node and "iconPath" in node:
            items.append((node["iconPrompt"], node["iconPath"]))
        for value in node.values():
            items.extend(find_icon_items(value))
    elif isinstance(node, list):
        for value in node:
            items.extend(find_icon_items(value))
    return items


def load_pack_items(pack_path):
    """Returns [(slug, full_prompt, icon_dir), ...] for one pack JSON file."""
    pack = json.loads(pack_path.read_text(encoding="utf-8"))
    style = pack.get("portraitStyle", "")
    if not style:
        sys.stdout.write(f"WARNING {pack_path.name}: no portraitStyle, icons will have no style suffix\n")
    style = "square icon, " + style.rstrip(", ")

    items = []
    for icon_prompt, icon_path in find_icon_items(pack.get("data", {})):
        dest = (WEB_ROOT / icon_path).resolve()
        prompt = icon_prompt.rstrip(", ") + ", " + style
        items.append((dest.stem, prompt, dest.parent))
    return items


def main():
    parser = argparse.ArgumentParser(
        description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter
    )
    parser.add_argument(
        "packs", nargs="*", metavar="PACK.json",
        help="Genre-pack JSON file(s) to process (default: every *.json in this folder).",
    )
    parser.add_argument(
        "--missing", metavar="PATH",
        help="Path to the placeholder/default image. When given, only regenerate icons whose existing file is byte-identical to this image.",
    )
    parser.add_argument(
        "--backend", choices=["sd", "gemini"], default="sd",
        help="Image generation backend (default: sd).",
    )
    parser.add_argument(
        "--model", default=DEFAULT_GEMINI_MODEL,
        help=f"Gemini model name, only used with --backend gemini (default: {DEFAULT_GEMINI_MODEL}).",
    )
    parser.add_argument(
        "--limit", type=int, default=None, metavar="N",
        help="Only attempt the first N not-already-skipped items (for smoke-testing before a full run).",
    )
    args = parser.parse_args()

    if args.packs:
        pack_paths = []
        for p in args.packs:
            path = Path(p)
            pack_paths.append(path if path.exists() else PACKS_DIR / p)
    else:
        pack_paths = sorted(PACKS_DIR.glob("*.json"))

    if not pack_paths:
        sys.stdout.write("No genre-pack JSON files found.\n")
        sys.exit(0)

    gemini_client = _init_gemini_client() if args.backend == "gemini" else None

    missing_bytes = None
    if args.missing:
        missing_path = Path(args.missing)
        if not missing_path.exists():
            sys.stderr.write(f"ERROR: --missing path not found: {missing_path}\n")
            sys.exit(1)
        missing_bytes = missing_path.read_bytes()
        sys.stdout.write(f"Filter: only regenerate icons matching {missing_path} ({len(missing_bytes):,} bytes)\n\n")

    # Merge items from every requested pack, keyed by destination directory, so a
    # directory shared by multiple packs (e.g. a reused base genre's icons/) is
    # only scanned for existing files once.
    by_dir = {}
    for pack_path in pack_paths:
        if not pack_path.exists():
            sys.stderr.write(f"ERROR: pack not found: {pack_path}\n")
            continue
        items = load_pack_items(pack_path)
        sys.stdout.write(f"{pack_path.name}: {len(items)} icon prompt(s)\n")
        for slug, prompt, icon_dir in items:
            by_dir.setdefault(icon_dir, {})[slug] = prompt

    total = sum(len(slugs) for slugs in by_dir.values())
    sys.stdout.write(f"\nLoaded {total} unique icon(s) across {len(by_dir)} director{'y' if len(by_dir) == 1 else 'ies'}.\n\n")

    variants = PARAMS.get("batch_size", 3)
    done = skipped = 0
    errors = []
    i = 0
    stop = False

    for icon_dir in sorted(by_dir):
        if stop:
            break

        existing_slugs = set()
        for p in icon_dir.glob("*.webp") if icon_dir.exists() else []:
            if missing_bytes is not None and p.read_bytes() == missing_bytes:
                continue
            parts = p.stem.rsplit("#", 1)
            existing_slugs.add(parts[0] if len(parts) == 2 and parts[1].isdigit() else p.stem)

        timestamp = datetime.now().strftime("%Y-%m-%d_%H%M%S")
        outdir = icon_dir / timestamp
        try:
            label = icon_dir.relative_to(WEB_ROOT)
        except ValueError:
            label = icon_dir

        for slug, prompt in sorted(by_dir[icon_dir].items()):
            i += 1
            if slug in existing_slugs:
                sys.stdout.write(f"[{i}/{total}] skip  {label}/{slug}  (exists)\n")
                skipped += 1
                continue

            if args.limit is not None and done >= args.limit:
                sys.stdout.write(f"[{i}/{total}] stop  --limit {args.limit} reached\n")
                stop = True
                break

            outdir.mkdir(parents=True, exist_ok=True)
            out_paths = [outdir / f"{slug}#{v}.webp" for v in range(1, variants + 1)]

            sys.stdout.write(f"[{i}/{total}] gen   {label}/{slug}...\n")
            sys.stdout.flush()
            try:
                if args.backend == "sd":
                    raw_images  = _generate_sd(SD_BASE, prompt, PARAMS)
                    target_size = None
                else:
                    raw_images  = _generate_gemini(gemini_client, args.model, prompt, variants)
                    target_size = (PARAMS["width"], PARAMS["height"])

                sizes = []
                for v, (img_bytes, out_path) in enumerate(zip(raw_images, out_paths), 1):
                    webp_size = _save_webp(img_bytes, out_path, target_size=target_size)
                    sizes.append(f"#{v}:{webp_size:,}b")
                sys.stdout.write(f"         {' '.join(sizes)}\n")
                sys.stdout.flush()
                done += 1
            except Exception as e:
                sys.stdout.write(f"         ERROR: {e}\n")
                sys.stdout.flush()
                errors.append(f"{label}/{slug}")

            if args.backend == "sd":
                time.sleep(0.3)

    sys.stdout.write(f"\nDone. generated={done}  skipped={skipped}  errors={len(errors)}\n")
    if errors:
        sys.stdout.write("Failed: " + ", ".join(errors) + "\n")


if __name__ == "__main__":
    main()
