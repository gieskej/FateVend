"""
Generate paleolithic genre icons via SD WebUI Forge API.
Reads iconPrompt / iconPath pairs from all JS files in genres/paleolithic/.
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

GENRE_DIR = Path(__file__).resolve().parent.parent   # genres/paleolithic/
ICON_DIR  = Path(__file__).resolve().parent          # genres/paleolithic/icons/

STYLE = (
    "square icon, prehistoric cave painting art style, "
    "ochre and charcoal pigments on rough stone texture, "
    "bold primitive silhouette, warm earth tones, "
    "ancient petroglyph aesthetic, centered subject"
)

PARAMS = dict(
    negative_prompt     = "",
    steps               = 25,
    width               = 256,
    height              = 256,
    cfg_scale           = 1,
    distilled_cfg_scale = 6,
    sampler_name        = "Euler",
    scheduler           = "Simple",
    batch_size          = 3,
)

run(GENRE_DIR, ICON_DIR, STYLE, PARAMS, description=__doc__,
    exclude_filenames={'plot-archetypes.js'})
