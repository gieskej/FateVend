"""
Generate manga-osaka-highschool1987 genre icons via SD WebUI Forge API.
Reads iconPrompt / iconPath pairs from all JS files in genres/manga-osaka-highschool1987/.
Saves variants into a timestamp subfolder inside the icons directory.
Skips items whose output files already exist anywhere in the icons tree.

Examples:
# Usual usage - generate all icons
$ python ./generate_icons.py

# Replace icons matching the specified image's filesize (good for replacing default icons)
$ python ./generate_icons.py --missing ../../../common/icons/none.png
"""

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[3] / 'common' / 'icons'))
from generate_icons_core import run

GENRE_DIR = Path(__file__).resolve().parent.parent   # genres/manga-osaka-highschool1987/
ICON_DIR  = Path(__file__).resolve().parent          # genres/manga-osaka-highschool1987/icons/

STYLE = (
    "square icon, 1980s shounen manga illustration style, "
    "bold ink lines, high contrast black and white with spot color, "
    "dramatic composition, expressive character design, "
    "retro Japanese school drama aesthetic, screen tone texture"
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

run(GENRE_DIR, ICON_DIR, STYLE, PARAMS, description=__doc__)
