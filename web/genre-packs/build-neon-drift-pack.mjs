#!/usr/bin/env node
// build-neon-drift-pack.mjs
// Regenerates sample-neon-drift.json by re-exporting the CURRENT built-in Sci-Fi
// genre's data into the JSON genre-pack format, while preserving Neon Drift's own
// identity wrapper (id, label, description, cyberpunk voice/portraitStyle, the
// reused Sci-Fi iconBase, tts, music, gameplay). Neon Drift is a "reskin" of
// Sci-Fi that reuses Sci-Fi's served icons, so its data tables must stay in sync
// with the built-in genre — otherwise the pack references races/sentiments that
// no longer exist (missing slot-machine icons, pre-normalization sentiments).
//
// Re-run after any change to the Sci-Fi genre's data:
//   node web/genre-packs/build-neon-drift-pack.mjs
//
// The inverse of pack-loader.js's loadPack(): loadPack maps pack.data.<x> onto
// the runtime table keys; this maps the runtime tables back onto pack.data.<x>.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { GENRE_TABLES } from "../generator/registry.js";
import { GENRE_MANIFESTS } from "../generator/manifests.js";
import { STATIC_CARDS_BY_GENRE } from "../generator/ui-data.js";
import { COMMON_PLOT_ARCHETYPES } from "../generator/common/plot-archetypes.js";

const SRC = "sci-fi";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outPath = path.join(__dirname, "sample-neon-drift.json");

const t = GENRE_TABLES[SRC];
const manifest = GENRE_MANIFESTS[SRC];
const staticCards = STATIC_CARDS_BY_GENRE[SRC] ?? {};

// The existing pack supplies the Neon Drift identity — everything that makes it
// "Neon Drift" rather than "Sci-Fi" and is unaffected by the data roster.
const prev = JSON.parse(fs.readFileSync(outPath, "utf8"));

// A genre's PLOT_ARCHETYPES table is [...COMMON_PLOT_ARCHETYPES, ...genreSpecific];
// loadPack re-prepends the commons, so the pack must carry only the genre-specific
// tail.
const genreSpecificPlots = t.PLOT_ARCHETYPES.slice(COMMON_PLOT_ARCHETYPES.length);

const STATIC_CARD_KEYS = [
  "STATIC_CHARACTERS",
  "STATIC_CLASSES",
  "STATIC_RACES",
  "STATIC_LOCATIONS",
  "STATIC_FACTIONS",
  "STATIC_CUSTOM",
];

const pack = {
  // ── Preserved Neon Drift identity ──
  id: prev.id,
  label: prev.label,
  description: prev.description,
  portraitStyle: prev.portraitStyle,
  iconBase: prev.iconBase,
  tts: prev.tts,
  music: prev.music,
  voice: prev.voice,
  ...(prev.gameplay ? { gameplay: prev.gameplay } : {}),
  // ── Structural config + data, refreshed from current Sci-Fi ──
  slots: manifest.slots,
  data: {
    races: t.RACES_OR_ETHNICITIES,
    professions: t.PROFESSIONS,
    lifeEvents: t.LIFE_EVENTS,
    familyStructures: t.FAMILY_STRUCTURES,
    parentStatuses: t.PARENT_STATUSES,
    siblingDynamics: t.SIBLING_DYNAMICS,
    tensions: t.TENSIONS,
    secrets: t.SECRETS,
    economicTiers: t.ECONOMIC_TIERS,
    citySettings: t.CITY_SETTINGS,
    tagPools: t.TAG_POOLS,
    namePools: t.NAME_POOLS,
    plotArchetypes: genreSpecificPlots,
    genders: t.GENDERS,
    orientations: t.ORIENTATIONS,
    builds: t.BUILDS,
    hair: t.HAIR,
    distinguishingFeatures: t.DISTINGUISHING_FEATURES,
    quirks: t.QUIRKS,
  },
  staticCards: Object.fromEntries(
    STATIC_CARD_KEYS.map((k) => [k, staticCards[k] ?? []]),
  ),
};

fs.writeFileSync(outPath, JSON.stringify(pack, null, 2) + "\n", "utf8");
console.log(`Wrote ${path.basename(outPath)}`);
console.log(
  `  races: ${pack.data.races.length}, professions: ${pack.data.professions.length}, ` +
    `plotArchetypes: ${pack.data.plotArchetypes.length}`,
);
