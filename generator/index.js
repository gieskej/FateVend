// generator/index.js
// Public API surface for the RPG character generator.
// This is the only file consumers should import directly.
//
// Usage:
//   import { generateCharacter } from './generator/index.js';
//
//   // Full generation — skeleton + Claude API narrative
//   const character = await generateCharacter({ genre: 'modern', apiKey: 'sk-ant-...' });
//
//   // Skeleton only — no API call (for testing, previewing, or AI Dungeon scripts)
//   const skeleton = await generateCharacter({ genre: 'sci-fi', skipAI: true });
//
// No browser APIs. No Node-specific APIs. Pure JS + fetch.

import { rollStats, assignMBTI }  from './roller.js';
import { buildSkeleton }          from './skeleton-builder.js';
import { callClaudeAPI }          from './api-client.js';

// ── MODERN TABLES ─────────────────────────────────────────────────────────
import { GENDERS as M_GENDERS, ORIENTATIONS as M_ORIENTATIONS, ETHNICITIES, BUILDS as M_BUILDS, HAIR as M_HAIR, DISTINGUISHING_FEATURES as M_DISTINGUISHING_FEATURES, QUIRKS as M_QUIRKS } from './genres/modern/character-attributes.js';
import { PROFESSIONS as M_PROFESSIONS } from './genres/modern/professions.js';
import { LIFE_EVENTS as M_LIFE_EVENTS } from './genres/modern/life-events.js';
import { FAMILY_STRUCTURES as M_FAMILY_STRUCTURES } from './genres/modern/family-structures.js';
import { TENSIONS as M_TENSIONS } from './genres/modern/tensions.js';
import { SECRETS as M_SECRETS } from './genres/modern/secrets.js';
import { ECONOMIC_TIERS as M_ECONOMIC_TIERS, CITY_SETTINGS as M_CITY_SETTINGS, TAG_POOLS as M_TAG_POOLS } from './genres/modern/settings.js';

// ── FANTASY TABLES ────────────────────────────────────────────────────────
import { GENDERS as F_GENDERS, ORIENTATIONS as F_ORIENTATIONS, RACES, BUILDS as F_BUILDS, HAIR as F_HAIR, DISTINGUISHING_FEATURES as F_DISTINGUISHING_FEATURES, QUIRKS as F_QUIRKS } from './genres/fantasy/character-attributes.js';
import { PROFESSIONS as F_PROFESSIONS } from './genres/fantasy/professions.js';
import { LIFE_EVENTS as F_LIFE_EVENTS } from './genres/fantasy/life-events.js';
import { FAMILY_STRUCTURES as F_FAMILY_STRUCTURES } from './genres/fantasy/family-structures.js';
import { TENSIONS as F_TENSIONS } from './genres/fantasy/tensions.js';
import { SECRETS as F_SECRETS } from './genres/fantasy/secrets.js';
import { ECONOMIC_TIERS as F_ECONOMIC_TIERS, CITY_SETTINGS as F_CITY_SETTINGS, TAG_POOLS as F_TAG_POOLS } from './genres/fantasy/settings.js';
import { NAME_POOLS as F_NAME_POOLS } from './genres/fantasy/names.js';

// ── SCI-FI TABLES ─────────────────────────────────────────────────────────
import { GENDERS as SF_GENDERS, ORIENTATIONS as SF_ORIENTATIONS, SPECIES, BUILDS as SF_BUILDS, HAIR as SF_HAIR, DISTINGUISHING_FEATURES as SF_DISTINGUISHING_FEATURES, QUIRKS as SF_QUIRKS } from './genres/sci-fi/character-attributes.js';
import { PROFESSIONS as SF_PROFESSIONS } from './genres/sci-fi/professions.js';
import { LIFE_EVENTS as SF_LIFE_EVENTS } from './genres/sci-fi/life-events.js';
import { FAMILY_STRUCTURES as SF_FAMILY_STRUCTURES } from './genres/sci-fi/family-structures.js';
import { TENSIONS as SF_TENSIONS } from './genres/sci-fi/tensions.js';
import { SECRETS as SF_SECRETS } from './genres/sci-fi/secrets.js';
import { ECONOMIC_TIERS as SF_ECONOMIC_TIERS, CITY_SETTINGS as SF_CITY_SETTINGS, TAG_POOLS as SF_TAG_POOLS } from './genres/sci-fi/settings.js';
import { NAME_POOLS as SF_NAME_POOLS } from './genres/sci-fi/names.js';

// ── MODERN: name pools are embedded in character-attributes (ETHNICITIES.broad) ──
// Modern uses a different pattern — names come from an external source.
// Until a modern names.js is added, fall back to a minimal pool.
const M_NAME_POOLS = { default: {
  masc:    ['James','Michael','Robert','David','William','Richard','Joseph','Thomas','Charles','Christopher','Daniel','Matthew','Anthony','Mark','Donald','Steven','Paul','Andrew','Joshua','Kenneth'],
  fem:     ['Mary','Patricia','Jennifer','Linda','Barbara','Elizabeth','Susan','Jessica','Sarah','Karen','Lisa','Nancy','Betty','Margaret','Sandra','Ashley','Dorothy','Kimberly','Emily','Donna'],
  neutral: ['Alex','Jordan','Taylor','Morgan','Casey','Riley','Avery','Jesse','Cameron','Quinn'],
  last:    ['Smith','Johnson','Williams','Brown','Jones','Garcia','Miller','Davis','Martinez','Hernandez','Lopez','Gonzalez','Wilson','Anderson','Thomas','Taylor','Moore','Jackson','Martin','Lee'],
}};

// ── GENRE TABLES REGISTRY ─────────────────────────────────────────────────
// skeleton-builder expects the key RACES_OR_ETHNICITIES — it handles both.

const GENRE_TABLES = {
  modern: {
    GENDERS:                M_GENDERS,
    ORIENTATIONS:           M_ORIENTATIONS,
    RACES_OR_ETHNICITIES:   ETHNICITIES,
    BUILDS:                 M_BUILDS,
    HAIR:                   M_HAIR,
    DISTINGUISHING_FEATURES:M_DISTINGUISHING_FEATURES,
    QUIRKS:                 M_QUIRKS,
    PROFESSIONS:            M_PROFESSIONS,
    LIFE_EVENTS:            M_LIFE_EVENTS,
    FAMILY_STRUCTURES:      M_FAMILY_STRUCTURES,
    TENSIONS:               M_TENSIONS,
    SECRETS:                M_SECRETS,
    ECONOMIC_TIERS:         M_ECONOMIC_TIERS,
    CITY_SETTINGS:          M_CITY_SETTINGS,
    TAG_POOLS:              M_TAG_POOLS,
    NAME_POOLS:             M_NAME_POOLS,
  },
  fantasy: {
    GENDERS:                F_GENDERS,
    ORIENTATIONS:           F_ORIENTATIONS,
    RACES_OR_ETHNICITIES:   RACES,
    BUILDS:                 F_BUILDS,
    HAIR:                   F_HAIR,
    DISTINGUISHING_FEATURES:F_DISTINGUISHING_FEATURES,
    QUIRKS:                 F_QUIRKS,
    PROFESSIONS:            F_PROFESSIONS,
    LIFE_EVENTS:            F_LIFE_EVENTS,
    FAMILY_STRUCTURES:      F_FAMILY_STRUCTURES,
    TENSIONS:               F_TENSIONS,
    SECRETS:                F_SECRETS,
    ECONOMIC_TIERS:         F_ECONOMIC_TIERS,
    CITY_SETTINGS:          F_CITY_SETTINGS,
    TAG_POOLS:              F_TAG_POOLS,
    NAME_POOLS:             F_NAME_POOLS,
  },
  'sci-fi': {
    GENDERS:                SF_GENDERS,
    ORIENTATIONS:           SF_ORIENTATIONS,
    RACES_OR_ETHNICITIES:   SPECIES,
    BUILDS:                 SF_BUILDS,
    HAIR:                   SF_HAIR,
    DISTINGUISHING_FEATURES:SF_DISTINGUISHING_FEATURES,
    QUIRKS:                 SF_QUIRKS,
    PROFESSIONS:            SF_PROFESSIONS,
    LIFE_EVENTS:            SF_LIFE_EVENTS,
    FAMILY_STRUCTURES:      SF_FAMILY_STRUCTURES,
    TENSIONS:               SF_TENSIONS,
    SECRETS:                SF_SECRETS,
    ECONOMIC_TIERS:         SF_ECONOMIC_TIERS,
    CITY_SETTINGS:          SF_CITY_SETTINGS,
    TAG_POOLS:              SF_TAG_POOLS,
    NAME_POOLS:             SF_NAME_POOLS,
  },
};

const SUPPORTED_GENRES = Object.keys(GENRE_TABLES);

/**
 * Generates a fully resolved RPG character.
 *
 * Pipeline:
 *   1. Roll six stats (1–100)
 *   2. Assign MBTI type, weighted by stats
 *   3. Build skeleton from curated tables, filtered by stats
 *   4. (Unless skipAI) Call Claude API → narrative text fields
 *   5. Return { skeleton, output }
 *
 * @param {import('./types.js').GenerateOptions} options
 * @returns {Promise<import('./types.js').GeneratedCharacter>}
 *
 * @example
 * const { skeleton, output } = await generateCharacter({
 *   genre: 'sci-fi',
 *   apiKey: 'sk-ant-...',
 * });
 * console.log(output.title);
 * console.log(skeleton.stats);
 */
export async function generateCharacter({
  genre   = 'modern',
  apiKey  = null,
  skipAI  = false,
} = {}) {
  if (!GENRE_TABLES[genre]) {
    throw new Error(`Genre "${genre}" is not supported. Available: ${SUPPORTED_GENRES.join(', ')}`);
  }

  if (!skipAI && !apiKey) {
    throw new Error('apiKey is required unless skipAI is true');
  }

  const tables = GENRE_TABLES[genre];

  // ── PHASE 1: Roll stats ──────────────────────────────────────────────
  const stats = rollStats();

  // ── PHASE 2: Assign MBTI ────────────────────────────────────────────
  const mbti = assignMBTI(stats);

  // ── PHASE 3: Build skeleton ──────────────────────────────────────────
  const skeleton = buildSkeleton(stats, mbti, tables);

  // ── PHASE 4: AI narrative (optional) ────────────────────────────────
  let output = null;
  if (!skipAI) {
    output = await callClaudeAPI(skeleton, apiKey, genre);
  }

  return { skeleton, output };
}

/**
 * Re-rolls a single stat and returns a new stats block.
 * Useful for the "click a gear to re-roll" UI interaction.
 *
 * @param {import('./types.js').StatBlock} currentStats
 * @param {'strength'|'intelligence'|'wisdom'|'charisma'|'dexterity'|'constitution'} statName
 * @returns {import('./types.js').StatBlock}
 */
export function rerollStat(currentStats, statName) {
  const fresh = rollStats();
  return { ...currentStats, [statName]: fresh[statName] };
}

/**
 * Regenerates just the skeleton from existing stats (no API call).
 * Useful for re-seeding profession/backstory while keeping rolled stats.
 *
 * @param {import('./types.js').StatBlock} stats
 * @param {string} [genre='modern']
 * @returns {import('./types.js').CharacterSkeleton}
 */
export function regenerateSkeleton(stats, genre = 'modern') {
  if (!GENRE_TABLES[genre]) {
    throw new Error(`Genre "${genre}" is not supported. Available: ${SUPPORTED_GENRES.join(', ')}`);
  }
  const mbti = assignMBTI(stats);
  return buildSkeleton(stats, mbti, GENRE_TABLES[genre]);
}

/**
 * Calls the Claude API on an existing skeleton.
 * Useful for regenerating narrative text without re-rolling the character.
 *
 * @param {import('./types.js').CharacterSkeleton} skeleton
 * @param {string} apiKey
 * @param {string} [genre='modern']
 * @returns {Promise<import('./types.js').GeneratedOutput>}
 */
export async function regenerateOutput(skeleton, apiKey, genre = 'modern') {
  if (!apiKey) throw new Error('apiKey is required');
  return callClaudeAPI(skeleton, apiKey, genre);
}

// Re-export types file for consumers who want the JSDoc typedefs
export * from './types.js';
