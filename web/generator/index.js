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
import { RELATIONSHIP_STATUSES }  from './common/relationship-statuses.js';
import { COMMON_PLOT_ARCHETYPES } from './common/plot-archetypes.js';
import { MODERN_PLOT_ARCHETYPES } from './genres/modern/plot-archetypes.js';
import { FANTASY_PLOT_ARCHETYPES } from './genres/fantasy/plot-archetypes.js';
import { SCIFI_PLOT_ARCHETYPES }  from './genres/sci-fi/plot-archetypes.js';
import { PALEOLITHIC_PLOT_ARCHETYPES } from './genres/paleolithic/plot-archetypes.js';
import { MANGA_HS_PLOT_ARCHETYPES }   from './genres/manga-osaka-highschool1987/plot-archetypes.js';
import { JOSEON_PLOT_ARCHETYPES }     from './genres/historical-korea-joseon-dynasty/plot-archetypes.js';
import { NIHONGI_PLOT_ARCHETYPES }   from './genres/nihongi/plot-archetypes.js';

// ── MODERN TABLES ─────────────────────────────────────────────────────────
import { GENDERS as M_GENDERS, ORIENTATIONS as M_ORIENTATIONS, ETHNICITIES, BUILDS as M_BUILDS, HAIR as M_HAIR, DISTINGUISHING_FEATURES as M_DISTINGUISHING_FEATURES, QUIRKS as M_QUIRKS } from './genres/modern/character-attributes.js';
import { PROFESSIONS as M_PROFESSIONS } from './genres/modern/professions.js';
import { LIFE_EVENTS as M_LIFE_EVENTS } from './genres/modern/life-events.js';
import { FAMILY_STRUCTURES as M_FAMILY_STRUCTURES } from './genres/modern/family-structures.js';
import { TENSIONS as M_TENSIONS } from './genres/modern/tensions.js';
import { SECRETS as M_SECRETS } from './genres/modern/secrets.js';
import { ECONOMIC_TIERS as M_ECONOMIC_TIERS, CITY_SETTINGS as M_CITY_SETTINGS, TAG_POOLS as M_TAG_POOLS } from './genres/modern/settings.js';
import { NAME_POOLS as M_NAME_POOLS } from './genres/modern/names.js';

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

// ── MANGA OSAKA HIGH SCHOOL 1987 TABLES ──────────────────────────────────
import { GENDERS as MH_GENDERS, ORIENTATIONS as MH_ORIENTATIONS, RACES as MH_RACES, BUILDS as MH_BUILDS, HAIR as MH_HAIR, DISTINGUISHING_FEATURES as MH_DISTINGUISHING_FEATURES, QUIRKS as MH_QUIRKS } from './genres/manga-osaka-highschool1987/character-attributes.js';
import { PROFESSIONS as MH_PROFESSIONS } from './genres/manga-osaka-highschool1987/professions.js';
import { LIFE_EVENTS as MH_LIFE_EVENTS } from './genres/manga-osaka-highschool1987/life-events.js';
import { FAMILY_STRUCTURES as MH_FAMILY_STRUCTURES } from './genres/manga-osaka-highschool1987/family-structures.js';
import { TENSIONS as MH_TENSIONS } from './genres/manga-osaka-highschool1987/tensions.js';
import { SECRETS as MH_SECRETS } from './genres/manga-osaka-highschool1987/secrets.js';
import { ECONOMIC_TIERS as MH_ECONOMIC_TIERS, CITY_SETTINGS as MH_CITY_SETTINGS, TAG_POOLS as MH_TAG_POOLS } from './genres/manga-osaka-highschool1987/settings.js';
import { NAME_POOLS as MH_NAME_POOLS } from './genres/manga-osaka-highschool1987/names.js';

// ── PALEOLITHIC TABLES ────────────────────────────────────────────────────
import { GENDERS as PA_GENDERS, ORIENTATIONS as PA_ORIENTATIONS, RACES as PALEO_RACES, BUILDS as PA_BUILDS, HAIR as PA_HAIR, DISTINGUISHING_FEATURES as PA_DISTINGUISHING_FEATURES, QUIRKS as PA_QUIRKS } from './genres/paleolithic/character-attributes.js';
import { PROFESSIONS as PA_PROFESSIONS } from './genres/paleolithic/professions.js';
import { LIFE_EVENTS as PA_LIFE_EVENTS } from './genres/paleolithic/life-events.js';
import { FAMILY_STRUCTURES as PA_FAMILY_STRUCTURES } from './genres/paleolithic/family-structures.js';
import { TENSIONS as PA_TENSIONS } from './genres/paleolithic/tensions.js';
import { SECRETS as PA_SECRETS } from './genres/paleolithic/secrets.js';
import { ECONOMIC_TIERS as PA_ECONOMIC_TIERS, CITY_SETTINGS as PA_CITY_SETTINGS, TAG_POOLS as PA_TAG_POOLS } from './genres/paleolithic/settings.js';
import { NAME_POOLS as PA_NAME_POOLS } from './genres/paleolithic/names.js';

// ── JOSEON DYNASTY KOREA TABLES ───────────────────────────────────────────
import { GENDERS as JS_GENDERS, ORIENTATIONS as JS_ORIENTATIONS, RACES as JOSEON_RACES, BUILDS as JS_BUILDS, HAIR as JS_HAIR, DISTINGUISHING_FEATURES as JS_DISTINGUISHING_FEATURES, QUIRKS as JS_QUIRKS } from './genres/historical-korea-joseon-dynasty/character-attributes.js';
import { PROFESSIONS as JS_PROFESSIONS } from './genres/historical-korea-joseon-dynasty/professions.js';
import { LIFE_EVENTS as JS_LIFE_EVENTS } from './genres/historical-korea-joseon-dynasty/life-events.js';
import { FAMILY_STRUCTURES as JS_FAMILY_STRUCTURES } from './genres/historical-korea-joseon-dynasty/family-structures.js';
import { TENSIONS as JS_TENSIONS } from './genres/historical-korea-joseon-dynasty/tensions.js';
import { SECRETS as JS_SECRETS } from './genres/historical-korea-joseon-dynasty/secrets.js';
import { ECONOMIC_TIERS as JS_ECONOMIC_TIERS, CITY_SETTINGS as JS_CITY_SETTINGS, TAG_POOLS as JS_TAG_POOLS } from './genres/historical-korea-joseon-dynasty/settings.js';
import { NAME_POOLS as JS_NAME_POOLS } from './genres/historical-korea-joseon-dynasty/names.js';

// ── NIHONGI TABLES ────────────────────────────────────────────────────────
import { GENDERS as NI_GENDERS, ORIENTATIONS as NI_ORIENTATIONS, RACES as NIHONGI_RACES, BUILDS as NI_BUILDS, HAIR as NI_HAIR, DISTINGUISHING_FEATURES as NI_DISTINGUISHING_FEATURES, QUIRKS as NI_QUIRKS } from './genres/nihongi/character-attributes.js';
import { PROFESSIONS as NI_PROFESSIONS } from './genres/nihongi/professions.js';
import { LIFE_EVENTS as NI_LIFE_EVENTS } from './genres/nihongi/life-events.js';
import { FAMILY_STRUCTURES as NI_FAMILY_STRUCTURES } from './genres/nihongi/family-structures.js';
import { TENSIONS as NI_TENSIONS } from './genres/nihongi/tensions.js';
import { SECRETS as NI_SECRETS } from './genres/nihongi/secrets.js';
import { ECONOMIC_TIERS as NI_ECONOMIC_TIERS, CITY_SETTINGS as NI_CITY_SETTINGS, TAG_POOLS as NI_TAG_POOLS } from './genres/nihongi/settings.js';
import { NAME_POOLS as NI_NAME_POOLS } from './genres/nihongi/names.js';

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
    RELATIONSHIP_STATUSES,
    PLOT_ARCHETYPES:        [...COMMON_PLOT_ARCHETYPES, ...MODERN_PLOT_ARCHETYPES],
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
    RELATIONSHIP_STATUSES,
    PLOT_ARCHETYPES:        [...COMMON_PLOT_ARCHETYPES, ...FANTASY_PLOT_ARCHETYPES],
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
    RELATIONSHIP_STATUSES,
    PLOT_ARCHETYPES:        [...COMMON_PLOT_ARCHETYPES, ...SCIFI_PLOT_ARCHETYPES],
  },
  'manga-osaka-highschool1987': {
    GENDERS:                MH_GENDERS,
    ORIENTATIONS:           MH_ORIENTATIONS,
    RACES_OR_ETHNICITIES:   MH_RACES,
    BUILDS:                 MH_BUILDS,
    HAIR:                   MH_HAIR,
    DISTINGUISHING_FEATURES:MH_DISTINGUISHING_FEATURES,
    QUIRKS:                 MH_QUIRKS,
    PROFESSIONS:            MH_PROFESSIONS,
    LIFE_EVENTS:            MH_LIFE_EVENTS,
    FAMILY_STRUCTURES:      MH_FAMILY_STRUCTURES,
    TENSIONS:               MH_TENSIONS,
    SECRETS:                MH_SECRETS,
    ECONOMIC_TIERS:         MH_ECONOMIC_TIERS,
    CITY_SETTINGS:          MH_CITY_SETTINGS,
    TAG_POOLS:              MH_TAG_POOLS,
    NAME_POOLS:             MH_NAME_POOLS,
    AGE_RANGE:              [15, 18],
    RELATIONSHIP_STATUSES:  RELATIONSHIP_STATUSES.filter(r => ['single','dating','complicated'].includes(r.id)),
    PLOT_ARCHETYPES:        [...COMMON_PLOT_ARCHETYPES, ...MANGA_HS_PLOT_ARCHETYPES],
  },
  paleolithic: {
    GENDERS:                PA_GENDERS,
    ORIENTATIONS:           PA_ORIENTATIONS,
    RACES_OR_ETHNICITIES:   PALEO_RACES,
    BUILDS:                 PA_BUILDS,
    HAIR:                   PA_HAIR,
    DISTINGUISHING_FEATURES:PA_DISTINGUISHING_FEATURES,
    QUIRKS:                 PA_QUIRKS,
    PROFESSIONS:            PA_PROFESSIONS,
    LIFE_EVENTS:            PA_LIFE_EVENTS,
    FAMILY_STRUCTURES:      PA_FAMILY_STRUCTURES,
    TENSIONS:               PA_TENSIONS,
    SECRETS:                PA_SECRETS,
    ECONOMIC_TIERS:         PA_ECONOMIC_TIERS,
    CITY_SETTINGS:          PA_CITY_SETTINGS,
    TAG_POOLS:              PA_TAG_POOLS,
    NAME_POOLS:             PA_NAME_POOLS,
    RELATIONSHIP_STATUSES,
    PLOT_ARCHETYPES:        [...COMMON_PLOT_ARCHETYPES, ...PALEOLITHIC_PLOT_ARCHETYPES],
  },
  'historical-korea-joseon-dynasty': {
    GENDERS:                JS_GENDERS,
    ORIENTATIONS:           JS_ORIENTATIONS,
    RACES_OR_ETHNICITIES:   JOSEON_RACES,
    BUILDS:                 JS_BUILDS,
    HAIR:                   JS_HAIR,
    DISTINGUISHING_FEATURES:JS_DISTINGUISHING_FEATURES,
    QUIRKS:                 JS_QUIRKS,
    PROFESSIONS:            JS_PROFESSIONS,
    LIFE_EVENTS:            JS_LIFE_EVENTS,
    FAMILY_STRUCTURES:      JS_FAMILY_STRUCTURES,
    TENSIONS:               JS_TENSIONS,
    SECRETS:                JS_SECRETS,
    ECONOMIC_TIERS:         JS_ECONOMIC_TIERS,
    CITY_SETTINGS:          JS_CITY_SETTINGS,
    TAG_POOLS:              JS_TAG_POOLS,
    NAME_POOLS:             JS_NAME_POOLS,
    RELATIONSHIP_STATUSES,
    PLOT_ARCHETYPES:        [...COMMON_PLOT_ARCHETYPES, ...JOSEON_PLOT_ARCHETYPES],
  },
  nihongi: {
    GENDERS:                NI_GENDERS,
    ORIENTATIONS:           NI_ORIENTATIONS,
    RACES_OR_ETHNICITIES:   NIHONGI_RACES,
    BUILDS:                 NI_BUILDS,
    HAIR:                   NI_HAIR,
    DISTINGUISHING_FEATURES:NI_DISTINGUISHING_FEATURES,
    QUIRKS:                 NI_QUIRKS,
    PROFESSIONS:            NI_PROFESSIONS,
    LIFE_EVENTS:            NI_LIFE_EVENTS,
    FAMILY_STRUCTURES:      NI_FAMILY_STRUCTURES,
    TENSIONS:               NI_TENSIONS,
    SECRETS:                NI_SECRETS,
    ECONOMIC_TIERS:         NI_ECONOMIC_TIERS,
    CITY_SETTINGS:          NI_CITY_SETTINGS,
    TAG_POOLS:              NI_TAG_POOLS,
    NAME_POOLS:             NI_NAME_POOLS,
    RELATIONSHIP_STATUSES,
    PLOT_ARCHETYPES:        [...COMMON_PLOT_ARCHETYPES, ...NIHONGI_PLOT_ARCHETYPES],
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
export function rerollStat(currentStats, statName) {
  const fresh = rollStats();
  return { ...currentStats, [statName]: fresh[statName] };
}
*/

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
