#!/bin/bash

shopt -s nullglob

for img in *.png *.jpg *.jpeg *.webp *.gif; do
    [ -f "$img" ] || continue

    dimensions=$(identify -format "%wx%h" "$img" 2>/dev/null)

    if [ "$dimensions" != "256x256" ]; then
        echo "Resizing: $img ($dimensions -> 256x256)"

        magick "$img" -resize 256x256\! "$img"
    fi
done

echo "Done."
