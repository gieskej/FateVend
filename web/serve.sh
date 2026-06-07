#!/usr/bin/env bash
# Serve from web/ so .env and other project files are never exposed.
# App is at http://localhost:8080/
cd "$(dirname "$0")"
python -m http.server 8080 --bind 0.0.0.0
