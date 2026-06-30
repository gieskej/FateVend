"""
Generate nihongi genre icons via SD WebUI Forge API.
Reads iconPrompt / iconPath pairs from all JS files in genres/nihongi/.
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

GENRE_DIR = Path(__file__).resolve().parent.parent   # genres/nihongi/
ICON_DIR  = Path(__file__).resolve().parent          # genres/nihongi/icons/

GENRE_PROMPT = (
    "Illustration of a terrified Japanese elder bald Buddhist monk wearing saffron robe running from a Japanese female ghost with black eyes and long black hair tattered white robe floating chasing, moonlit temple, spooky theme, ancient japan, apparition, spirit, foxfire, kitsune, torii, fog, "
)

STYLE = (
    "square icon, ancient Japan yamato-e court painting style, "
    "minhwa-adjacent flat mineral pigments, traditional Japanese asuka court aesthetic, "
    "clean confident ink outline, centered subject, "
    "gold leaf accent, detailed silk textile patterns,"
    "ancient japanese figure study, dignified formal composition"
)

PARAMS = dict(
    negative_prompt     = "modern, photograph, western, anime, manga, 3d render, noisy background",
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
