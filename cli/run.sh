#!/usr/bin/env bash
# FateVend CLI runner
# Usage: ./run.sh [cli options]
#   e.g. ./run.sh --genre fantasy
#        ./run.sh --genre nihongi --skeleton-only
#        ./run.sh --genre modern --json > out.json
#
# To capture output to a file while still seeing it:
#   ./run.sh --genre fantasy | tee cli-output.txt
#   (Do NOT use 2>&1 — that mixes Node startup diagnostics into the output)

cd "$(dirname "$0")/.."
node cli/index.js "$@" 
