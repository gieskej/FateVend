"""
Shared core for FateVend icon-generation scripts.
Import run() from a genre-specific generate_icons.py wrapper.

--backend gemini requires: pip install google-genai python-dotenv
(python-dotenv is already present in this environment; google-genai is not,
installed separately).
"""

import re, requests, base64, time, sys, argparse, io, os
from PIL import Image, ImageOps
from datetime import datetime
from pathlib import Path

DEFAULT_GEMINI_MODEL = "gemini-2.5-flash-image"
GEMINI_MAX_RETRIES = 3
GEMINI_BACKOFF_BASE = 2.0  # seconds; exponential: 2s, 4s, 8s
# Gemini tends to render the "clean white background, subtle drop shadow" style
# text as a literal framed card/badge rather than a full-bleed square scene.
# Prepending this counters that tendency; SD doesn't have the same issue.
GEMINI_PROMPT_PREFIX = "square, borderless, full bleed illustration, "


def extract_pairs(js_text):
    """Return list of (iconPrompt, iconPath) from a JS file's text."""
    flat = re.sub(r"[\r\n]+\s*", " ", js_text)
    prompts = re.findall(r'iconPrompt\s*:\s*["\'](.+?)["\']', flat)
    paths = re.findall(r'iconPath\s*:\s*["\'](.+?)["\']', flat)
    if len(prompts) != len(paths):
        raise ValueError(
            f"iconPrompt/iconPath count mismatch: {len(prompts)} vs {len(paths)}"
        )
    return list(zip(prompts, paths))


def _generate_sd(base, prompt, params, timeout=360):
    """Calls the local SD WebUI Forge txt2img API. Returns a list of raw PNG bytes."""
    r = requests.post(
        base + "/sdapi/v1/txt2img", json=dict(prompt=prompt, **params), timeout=timeout
    )
    r.raise_for_status()
    return [base64.b64decode(img_b64) for img_b64 in r.json()["images"]]


DEFAULT_SD_URL = "http://localhost:7860"


def _resolve_sd_url(cli_url=None):
    """Base URL for the SD WebUI Forge API.

    Precedence: --url flag, then SD_URL in the repo-root .env (the same key the
    web app reads, so a working app is a working generator), then localhost.
    This used to be a hardcoded hostname, which meant the sd backend only ever
    worked on one machine.
    """
    if cli_url:
        return cli_url.rstrip("/")
    from dotenv import load_dotenv

    load_dotenv(dotenv_path=Path(__file__).resolve().parents[4] / ".env")
    return os.environ.get("SD_URL", DEFAULT_SD_URL).rstrip("/")


def _init_gemini_client():
    """Loads GEMINI_API_KEY from the repo-root .env and returns an authenticated genai.Client."""
    from dotenv import load_dotenv

    repo_root = Path(__file__).resolve().parents[4]
    load_dotenv(dotenv_path=repo_root / ".env")
    api_key = os.environ.get("GEMINI_API_KEY")
    if not api_key:
        sys.stderr.write(
            "Error: GEMINI_API_KEY not set. Add it to .env or export it.\n"
        )
        sys.exit(1)
    try:
        from google import genai
    except ImportError:
        sys.stderr.write(
            "Error: google-genai not installed. Run: pip install google-genai\n"
        )
        sys.exit(1)
    return genai.Client(api_key=api_key)


def _generate_gemini(client, model, prompt, count):
    """Calls the Gemini image-generation API `count` times (no server-side batching).
    Returns a list of raw image bytes. Retries transient rate-limit errors with backoff;
    other failures (or exhausted retries) propagate to the caller's existing per-item
    try/except, which logs the slug as failed and continues the batch."""
    from google.genai import types

    config = types.GenerateContentConfig(
        response_modalities=["IMAGE"],
        image_config=types.ImageConfig(aspect_ratio="1:1"),
    )
    full_prompt = GEMINI_PROMPT_PREFIX + prompt
    results = []
    for _ in range(count):
        for attempt in range(GEMINI_MAX_RETRIES + 1):
            try:
                response = client.models.generate_content(
                    model=model, contents=full_prompt, config=config
                )
                part = next(
                    (p for p in response.candidates[0].content.parts if p.inline_data),
                    None,
                )
                if part is None:
                    raise RuntimeError("Gemini response contained no image part")
                results.append(part.inline_data.data)
                break
            except Exception as e:
                transient = "429" in str(e) or "RESOURCE_EXHAUSTED" in str(e)
                if attempt < GEMINI_MAX_RETRIES and transient:
                    delay = GEMINI_BACKOFF_BASE * (2 ** attempt)
                    sys.stdout.write(
                        f"         rate-limited, retry {attempt+1}/{GEMINI_MAX_RETRIES} in {delay:.0f}s...\n"
                    )
                    sys.stdout.flush()
                    time.sleep(delay)
                    continue
                raise
    return results


def _save_webp(image_bytes, path, target_size=None):
    """Saves raw image bytes as webp. If target_size is given and the image doesn't
    already match, center-crop-then-resize to it first (guarantees exact pixel
    dimensions regardless of what the source actually returned)."""
    pil_img = Image.open(io.BytesIO(image_bytes))
    if target_size is not None and pil_img.size != target_size:
        pil_img = ImageOps.fit(pil_img, target_size, method=Image.LANCZOS)
    pil_img.save(path, "WEBP", quality=90)
    return path.stat().st_size


def run(
    genre_dir,
    icon_dir,
    style,
    params,
    description="",
    recursive=False,
    extra_js_files=None,
    exclude_filenames=None,
    genre_prompt=None,
):
    """
    Collect iconPrompt/iconPath pairs from all JS files in genre_dir,
    generate images via SD WebUI Forge, and save to icon_dir/<timestamp>/.

    Args:
        genre_dir:         Path to the genre's root folder (contains *.js data files).
        icon_dir:          Path to the icons output folder (this script's directory).
        style:             Genre-specific style suffix appended to every prompt.
        params:            SD API parameter dict (steps, cfg_scale, batch_size, etc.).
        description:       CLI --help description string.
        recursive:         If True, scan all subdirectory PNGs when building the skip set.
        extra_js_files:    Optional iterable of additional JS file paths to scan.
        exclude_filenames: Optional set of filenames (e.g. {'plot-archetypes.js'}) to skip.
        genre_prompt:      Optional prompt for the genre cover image (_genre.webp). When given,
                           generates a single 512x512 image saved directly to icon_dir/_genre.webp.
                           Skips if the file already exists (unless --missing matches it).
    """
    parser = argparse.ArgumentParser(description=description)
    parser.add_argument(
        "--missing",
        metavar="PATH",
        help="Path to the placeholder/default image. When given, only regenerate icons whose existing file is byte-identical to this image.",
    )
    parser.add_argument(
        "--backend",
        choices=["sd", "gemini"],
        default="sd",
        help="Image generation backend (default: sd).",
    )
    parser.add_argument(
        "--model",
        default=DEFAULT_GEMINI_MODEL,
        help=f"Gemini model name, only used with --backend gemini (default: {DEFAULT_GEMINI_MODEL}).",
    )
    parser.add_argument(
        "--limit",
        type=int,
        default=None,
        metavar="N",
        help="Only attempt the first N not-already-skipped items (for smoke-testing before a full run).",
    )
    parser.add_argument(
        "--url",
        default=None,
        metavar="URL",
        help=f"SD WebUI base URL, only used with --backend sd. Defaults to SD_URL from .env, else {DEFAULT_SD_URL}.",
    )
    args = parser.parse_args()

    gemini_client = _init_gemini_client() if args.backend == "gemini" else None

    missing_bytes = None
    if args.missing:
        missing_path = Path(args.missing)
        if not missing_path.exists():
            sys.stderr.write(f"ERROR: --missing path not found: {missing_path}\n")
            sys.exit(1)
        missing_bytes = missing_path.read_bytes()
        sys.stdout.write(
            f"Filter: only regenerate icons matching {missing_path} ({len(missing_bytes):,} bytes)\n\n"
        )

    js_files = sorted(genre_dir.glob("*.js"))
    if exclude_filenames:
        js_files = [f for f in js_files if f.name not in exclude_filenames]
    if extra_js_files:
        extra_paths = {Path(f) for f in extra_js_files}
        existing = set(js_files)
        js_files = sorted(existing | extra_paths, key=lambda p: str(p))
    items = []

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
    outdir = icon_dir / timestamp
    outdir.mkdir(parents=True, exist_ok=True)

    existing_slugs = set()
    png_iter = icon_dir.rglob("*.webp") if recursive else icon_dir.glob("*.webp")
    for p in png_iter:
        if recursive and outdir in p.parents:
            continue
        if missing_bytes is not None and p.read_bytes() == missing_bytes:
            continue
        parts = p.stem.rsplit("#", 1)
        existing_slugs.add(
            parts[0] if len(parts) == 2 and parts[1].isdigit() else p.stem
        )

    base = _resolve_sd_url(args.url)
    if args.backend == "sd":
        sys.stdout.write(f"SD backend: {base}\n")
    variants = params.get("batch_size", 3)
    total = len(items)
    skipped = 0
    done = 0
    errors = []

    if genre_prompt is not None:
        genre_out = icon_dir / "_genre.webp"
        genre_exists = genre_out.exists()
        genre_is_placeholder = (
            genre_exists
            and missing_bytes is not None
            and genre_out.read_bytes() == missing_bytes
        )
        if genre_exists and not genre_is_placeholder:
            sys.stdout.write(f"skip  _genre.webp (exists)\n\n")
        else:
            sys.stdout.write(f"gen   _genre.webp...\n")
            sys.stdout.flush()
            try:
                if args.backend == "sd":
                    genre_params = {
                        **params,
                        "batch_size": 1,
                        "width": 512,
                        "height": 512,
                    }
                    raw = _generate_sd(base, genre_prompt, genre_params)[0]
                    target_size = None
                else:
                    raw = _generate_gemini(gemini_client, args.model, genre_prompt, 1)[
                        0
                    ]
                    target_size = (512, 512)
                webp_size = _save_webp(raw, genre_out, target_size=target_size)
                sys.stdout.write(f"         {webp_size:,}b\n\n")
            except Exception as e:
                sys.stdout.write(f"         ERROR: {e}\n\n")
                errors.append("_genre")

    for i, (slug, prompt) in enumerate(items, 1):
        if slug in existing_slugs:
            sys.stdout.write(f"[{i}/{total}] skip  {slug}\n")
            sys.stdout.flush()
            skipped += 1
            continue

        if args.limit is not None and done >= args.limit:
            sys.stdout.write(f"[{i}/{total}] stop  --limit {args.limit} reached\n")
            break

        out_paths = [outdir / f"{slug}#{v}.webp" for v in range(1, variants + 1)]

        sys.stdout.write(f"[{i}/{total}] gen   {slug}...\n")
        sys.stdout.flush()
        try:
            if args.backend == "sd":
                raw_images = _generate_sd(base, prompt, params)
                target_size = None
            else:
                raw_images = _generate_gemini(
                    gemini_client, args.model, prompt, variants
                )
                target_size = (params["width"], params["height"])

            sizes = []
            for v, (img_bytes, path) in enumerate(zip(raw_images, out_paths), 1):
                webp_size = _save_webp(img_bytes, path, target_size=target_size)
                sizes.append(f"#{v}:{webp_size:,}b")
            sys.stdout.write(f"         {' '.join(sizes)}\n")
            sys.stdout.flush()
            done += 1
        except Exception as e:
            sys.stdout.write(f"         ERROR: {e}\n")
            sys.stdout.flush()
            errors.append(slug)

        if args.backend == "sd":
            time.sleep(0.3)

    sys.stdout.write(
        f"\nDone. generated={done}  skipped={skipped}  errors={len(errors)}\n"
    )
    sys.stdout.write(f"Output: {outdir}\n")
    if errors:
        sys.stdout.write("Failed: " + ", ".join(errors) + "\n")
