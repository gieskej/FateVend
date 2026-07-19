"""
Run all genre icon generators sequentially.
Discovers every generate_icons.py in subfolders and executes each one
in the order it is found (depth-first, sorted).

Examples:
  # Generate all icons for all genres
  $ python ./generate_icons.py

  # Pass arguments through to every child script (e.g. --missing)
  $ python ./generate_icons.py --missing ../common/icons/none.webp
"""

import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent

scripts = sorted(
    p for p in ROOT.rglob("generate_icons.py") if p != Path(__file__).resolve()
)

if not scripts:
    print("No generate_icons.py scripts found in subfolders.")
    sys.exit(0)

extra_args = sys.argv[1:]
failed = []

for script in scripts:
    rel = script.relative_to(ROOT)
    print(f"\n{'='*60}")
    print(f"  {rel}")
    print(f"{'='*60}")
    result = subprocess.run(
        [sys.executable, str(script), *extra_args],
        cwd=script.parent,
    )
    if result.returncode != 0:
        failed.append(rel)

print(f"\n{'='*60}")
if failed:
    print(f"DONE — {len(failed)} script(s) failed:")
    for f in failed:
        print(f"  {f}")
    sys.exit(1)
else:
    print(f"DONE — all {len(scripts)} script(s) completed successfully.")
