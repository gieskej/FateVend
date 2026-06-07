#!/bin/bash

shopt -s nullglob

for file in *; do
    if [[ "$file" =~ ^(.*)#[0-9]+(\.[^.]+)$ ]]; then
        target="${BASH_REMATCH[1]}${BASH_REMATCH[2]}"

        echo "Replacing:"
        echo "  $target"
        echo "with"
        echo "  $file"

        mv -f -- "$file" "$target"
    fi
done
