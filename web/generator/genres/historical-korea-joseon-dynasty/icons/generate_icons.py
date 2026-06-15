"""
Generate historical-korea-joseon-dynasty genre icons via SD WebUI Forge API.
Reads iconPrompt / iconPath pairs from all JS files in genres/historical-korea-joseon-dynasty/.
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

GENRE_DIR = Path(__file__).resolve().parent.parent   # genres/historical-korea-joseon-dynasty/
ICON_DIR  = Path(__file__).resolve().parent          # genres/historical-korea-joseon-dynasty/icons/

STYLE = (
    "square icon, Joseon Dynasty Korean court painting style, "
    "minhwa folk art, clean flat colors with mineral pigments, traditional hanbok dress, "
    "decorative floral and nature motifs, centered subject, "
    "white background, confident ink outline, warm earth and jewel tones"
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
