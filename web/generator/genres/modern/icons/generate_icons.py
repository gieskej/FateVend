"""
Generate modern genre icons via SD WebUI Forge API.
Reads iconPrompt / iconPath pairs from all JS files in genres/modern/.
Saves variants into a timestamp subfolder inside the icons directory.
Skips items whose output files already exist anywhere in the icons tree.
"""

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[3] / 'common' / 'icons'))
from generate_icons_core import run

GENRE_DIR = Path(__file__).resolve().parent.parent   # genres/modern/
ICON_DIR  = Path(__file__).resolve().parent          # genres/modern/icons/

GENRE_PROMPT = (
    "Illustration of a couple talking in a cafe, medium shot, painterly style"
)

STYLE = (
    "square icon, modern cinematic style, natural lighting, "
    "detailed digital illustration, centered subject, clean composition, "
    "contemporary realism, muted urban palette, grounded atmosphere"
)

PARAMS = dict(
    negative_prompt     = "",
    steps               = 20,
    width               = 256,
    height              = 256,
    cfg_scale           = 1,
    distilled_cfg_scale = 6,
    sampler_name        = "Euler",
    scheduler           = "Simple",
    batch_size          = 3,
)

run(GENRE_DIR, ICON_DIR, STYLE, PARAMS, description=__doc__,
    exclude_filenames={'plot-archetypes.js'}, genre_prompt=GENRE_PROMPT)
