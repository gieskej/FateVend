"""
Generate common icons (MBTI, Sentiments) via SD WebUI Forge API.
Reads iconPrompt / iconPath pairs from all JS files in generator/common/.
Saves variants into a timestamp subfolder inside the icons directory.
Skips items whose output files already exist anywhere in the icons tree.
"""

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from generate_icons_core import run

GENRE_DIR = Path(__file__).resolve().parent.parent  # generator/common/
ICON_DIR = Path(__file__).resolve().parent  # generator/common/icons/

STYLE = (
    "square icon, clean white background, subtle drop shadow, "
    "Pixar-style 3D cartoon illustration, centered subject, "
    "expressive and friendly, vibrant but not garish"
)

PARAMS = dict(
    negative_prompt="",
    steps=20,
    width=256,
    height=256,
    cfg_scale=1,
    distilled_cfg_scale=6,
    sampler_name="Euler",
    scheduler="Simple",
    batch_size=3,
)

run(GENRE_DIR, ICON_DIR, STYLE, PARAMS, description=__doc__, recursive=True)
