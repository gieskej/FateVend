"""
Generate fantasy genre icons via SD WebUI Forge API.
Reads iconPrompt / iconPath pairs from all JS files in genres/fantasy/.
Saves variants into a timestamp subfolder inside the icons directory.
Skips items whose output files already exist anywhere in the icons tree.

Examples:
# Usual usage - generate all icons
$ python ./generate_icons.py

# Replace icons matching the specified image's filesize (good for replacing default icons)
$ python ./generate_icons.py --missing ../../../common/icons/none.webp
"""

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[3] / 'common' / 'icons'))
from generate_icons_core import run

GENRE_DIR = Path(__file__).resolve().parent.parent   # genres/fantasy/
ICON_DIR  = Path(__file__).resolve().parent          # genres/fantasy/icons/

GENRE_PROMPT = (
    "armored knight and a green orc locked in battle, dramatic stormy purple sky, "
    "sigil flag, fantasy digital painting, warm amber torchlight"
)

STYLE = (
    "square icon, fantasy RPG art style, dramatic lighting, "
    "detailed digital illustration, centered subject, clean composition, "
    "painterly texture, rich warm palette, high fantasy atmosphere"
)

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

run(GENRE_DIR, ICON_DIR, STYLE, PARAMS, description=__doc__,
    exclude_filenames={'plot-archetypes.js'}, genre_prompt=GENRE_PROMPT)
