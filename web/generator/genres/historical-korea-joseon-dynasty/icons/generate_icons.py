"""
Generate historical-korea-joseon-dynasty genre icons via SD WebUI Forge API.
Reads iconPrompt / iconPath pairs from all JS files in genres/historical-korea-joseon-dynasty/.
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

GENRE_DIR = Path(__file__).resolve().parent.parent   # genres/historical-korea-joseon-dynasty/
ICON_DIR  = Path(__file__).resolve().parent          # genres/historical-korea-joseon-dynasty/icons/

GENRE_PROMPT = (
    "Ancient Joseon Korean king sitting on throne wearing royal red silk hanbok with gold dragon embroidery",
    "and Won-yugwan crown, flanked by two eunic advisors wearing green hanbok with black ceremonial hats",
    "cherry blossoms drifting, stone lanterns glowing at dusk, wooden pavilion with curved tile roof, "
    "serene dignified atmosphere, minhwa folk art style,"
    "detailed mineral pigments, decorative nature motifs"
)

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

run(GENRE_DIR, ICON_DIR, STYLE, PARAMS, description=__doc__,
    exclude_filenames={'plot-archetypes.js'}, genre_prompt=GENRE_PROMPT)
