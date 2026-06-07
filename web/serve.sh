#!/usr/bin/env bash
# Always serve from the project root (parent of web/) so that both
# web/ and generator/ are reachable under the same origin.
# App is at http://localhost:8080/web/
cd "$(dirname "$0")/.."
python -m http.server 8080 --bind 0.0.0.0
