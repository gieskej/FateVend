#!/bin/bash
# Strips numeric disambiguator suffixes from generated icon filenames
# (e.g. "PROFESSIONS#slug#3.webp" -> "PROFESSIONS#slug.webp"), overwriting
# any existing file already at the target name.
#
# Purpose: After running generate_icons.py, you get several versions of each icon.  
# You pick your favorite and copy it to the parent directory.  This script handles 
# the bulk renaming of the selected icons.
#
# Usage: squash.sh [TARGET_DIR]   (defaults to current directory)
# Example: web/generator/squash.sh web/generator/genres/fantasy/icons

shopt -s nullglob

TARGET_DIR="${1:-.}"

for file in "$TARGET_DIR"/*; do
    if [[ "$file" =~ ^(.*)#[0-9]+(\.[^.]+)$ ]]; then
        target="${BASH_REMATCH[1]}${BASH_REMATCH[2]}"

        echo "Replacing:"
        echo "  $target"
        echo "with"
        echo "  $file"

        mv -f -- "$file" "$target"
    fi
done
