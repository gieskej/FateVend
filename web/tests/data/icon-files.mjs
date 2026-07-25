// icon-files.mjs
// Exhaustive icon-file-existence sweep across every built-in genre's data
// tables — not a sample of what a handful of rolls happen to hit, but every
// single entry that carries an iconPath, in every table, in every genre. This
// is the same class of bug found by hand this session (an alien_slug race
// pointing at a since-renamed SPECIES#alien_nonhumanoid.webp; a stale sample
// pack referencing removed sub-species icons) — checking every entry instead
// of sampling means a rarely-rolled (low-weight) entry's broken icon can't
// slip through undetected the way it would with a roll-based sample.
//
// Pure Node: no browser, no dev server. iconPath strings are web-root-relative
// ("generator/genres/<g>/icons/...webp"), so existence is checked directly on
// disk via fs.existsSync.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { GENRE_TABLES, SUPPORTED_GENRES } from "../../generator/registry.js";
import { printReport } from "./helpers.mjs";

const WEB_DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");

// Walks one genre's table bundle collecting every { iconPath, from } pair —
// tables are either arrays of entries (most) or an id-keyed object
// (ECONOMIC_TIERS) — handled generically so a future table shape needs no
// changes here.
function collectIconPaths(tables, genre) {
  const found = [];
  for (const [tableName, value] of Object.entries(tables)) {
    const entries = Array.isArray(value) ? value : Object.values(value ?? {});
    for (const entry of entries) {
      if (entry && typeof entry === "object" && typeof entry.iconPath === "string") {
        found.push({ iconPath: entry.iconPath, from: `${genre}/${tableName}` });
      }
    }
  }
  return found;
}

export function run() {
  const results = [];
  const seen = new Map(); // iconPath -> first "from" location, for dedup across genres sharing common/ tables
  let checked = 0;

  for (const genre of SUPPORTED_GENRES) {
    for (const { iconPath, from } of collectIconPaths(GENRE_TABLES[genre], genre)) {
      checked++;
      if (seen.has(iconPath)) continue; // already checked (e.g. a shared common/ icon)
      seen.set(iconPath, from);
      const exists = fs.existsSync(path.join(WEB_DIR, iconPath));
      if (!exists) results.push({ pass: false, detail: `MISSING (${from}): ${iconPath}` });
    }
  }

  results.push({
    pass: true,
    detail: `checked ${checked} iconPath references (${seen.size} unique files) across ${SUPPORTED_GENRES.length} genres`,
  });

  return printReport("icon-files", results);
}
