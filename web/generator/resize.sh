#!/bin/bash
# Resizes genre icons (named CATEGORY#slug.ext) down to fit within 256x256,
# converting any non-webp source (jpg/jpeg/png/gif) to webp first.
#
# Purpose: Sometimes generate_icons.py isn't giving you good output for a 
# difficult concept, so I used other cloud based text-to-image generators to
# fill in the gaps, but they output different formats and sizes than we need.
#
# Usage: resize.sh [TARGET_DIR]   (defaults to current directory)
# Example: web/generator/resize.sh web/generator/genres/fantasy/icons

TARGET_DIR="${1:-.}"

function resize() {
    local file="$1"
    local dimensions width height

    # Get dimensions (width and height). %w = width, %h = height
    dimensions=$(identify -format "%w %h" "$file")
    width=$(echo "$dimensions" | cut -d' ' -f1)
    height=$(echo "$dimensions" | cut -d' ' -f2)

    # Check if either dimension is greater than 256
    if [ "$width" -gt 256 ] || [ "$height" -gt 256 ]; then
        echo "Resizing: $file (${width}x${height})"

        # Scale down to fit within 256x256, preserving aspect ratio.
        # Using '>' ensures images smaller than 256 are not upscaled.
        mogrify -resize 256x256\> "$file"
    else
        echo "Skipping: $file (already small enough)"
    fi
}

# Resize icons that are already webp
find "$TARGET_DIR" -maxdepth 1 -name "*#*.webp" -print0 | while IFS= read -r -d '' file; do
    resize "$file"
done

# Convert jpg/jpeg/png/gif icons to webp, then resize the result
find "$TARGET_DIR" -maxdepth 1 \( -iname "*#*.jpg" -o -iname "*#*.jpeg" -o -iname "*#*.png" -o -iname "*#*.gif" \) -print0 | while IFS= read -r -d '' file; do
    wfile="${file%.*}.webp"
    cwebp -q 80 "$file" -o "$wfile"
    resize "$wfile"
    rm "$file"
done

echo "Done."
