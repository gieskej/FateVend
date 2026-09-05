#!/usr/bin/env bash
# Rebuilds FateVend.app's icon from the site favicon artwork.
#
# The .icns it writes is committed, so running this is only necessary when
# web/android-chrome-512x512.png changes. Needs nothing but macOS: sips and
# iconutil both ship with the system.
#
# Usage: bash tools/make-mac-icon.sh
set -euo pipefail

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SRC="$REPO_ROOT/web/android-chrome-512x512.png"
OUT="$REPO_ROOT/FateVend.app/Contents/Resources/FateVend.icns"

if [ ! -f "$SRC" ]; then
  echo "Source artwork not found: $SRC" >&2
  exit 1
fi

ICONSET="$(mktemp -d)/FateVend.iconset"
mkdir -p "$ICONSET"
trap 'rm -rf "$(dirname "$ICONSET")"' EXIT

# icon_512x512@2x (1024px) is deliberately absent: the artwork is 512px, and an
# upscale would only give Finder a blurrier image than letting it scale the
# 512px slot itself.
while read -r size name; do
  [ -z "$size" ] && continue
  sips -z "$size" "$size" "$SRC" --out "$ICONSET/$name" >/dev/null
done <<'SIZES'
16 icon_16x16.png
32 icon_16x16@2x.png
32 icon_32x32.png
64 icon_32x32@2x.png
128 icon_128x128.png
256 icon_128x128@2x.png
256 icon_256x256.png
512 icon_256x256@2x.png
512 icon_512x512.png
SIZES

iconutil -c icns "$ICONSET" -o "$OUT"
echo "Wrote $OUT"
