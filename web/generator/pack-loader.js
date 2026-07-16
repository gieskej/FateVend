// generator/pack-loader.js
// Loads a declarative genre pack (pure JSON data + a manifest) into the exact
// runtime shapes the app already uses:
//   - tables      → same shape as registry.js GENRE_TABLES[id]
//   - manifest    → same shape as manifests.js GENRE_MANIFESTS[id]
//   - voice       → same shape as manifests.js GENRE_VOICE[id]
//   - staticCards → same shape as ui-data.js STATIC_CARDS_BY_GENRE[id]
//
// A pack carries NO executable code — only data — so an uploaded pack is safe to
// register at runtime (no eval, no dynamic import of pack code). The genre
// "voice" the LLM sees is a plain string the importer can surface for review.
//
// Pack shape (manifest.json):
//   {
//     id, label, description, portraitStyle,
//     tts: { preprocess, browser, kokoro, openai },
//     music: { prefix, tracks: [] },
//     slots: { identityCat, identityHeader, profCat, profHeader, econCat,
//              econHeader, cityCat, cityHeader, familyCat, lifeEventCat,
//              tensionCat, filterGendersToGenre, familyUsesIconSlug,
//              economicTiers: [[id, iconSlug, label], ...] },
//     voice: { identityLabel, genreLabel, openingNote, appearanceNote, systemPrompt },
//     gameplay: { ageRange?: [lo,hi], allowMinorMarriage?: bool,
//                 relationshipStatusFilter?: [ids] },
//     data: {
//       races|identities: [], professions: [], lifeEvents: [],
//       familyStructures: [], parentStatuses: [], siblingDynamics: [],
//       tensions: [], secrets: [], economicTiers: {}, citySettings: [],
//       tagPools: {}, namePools: {}, plotArchetypes: [],
//       genders?: [], orientations?: [], builds?: [], hair?: [],
//       distinguishingFeatures: [], quirks: []
//     },
//     staticCards?: { STATIC_CHARACTERS: [], STATIC_CLASSES: [], ... }
//   }
//
// No browser APIs. Pure JS.

import { GENDERS as COMMON_GENDERS }             from './common/genders.js';
import { ORIENTATIONS as COMMON_ORIENTATIONS }   from './common/orientations.js';
import { BUILDS as COMMON_BUILDS }               from './common/build.js';
import { HAIR as COMMON_HAIR }                   from './common/hair.js';
import { RELATIONSHIP_STATUSES as COMMON_RELATIONSHIP_STATUSES } from './common/relationship-statuses.js';
import { COMMON_PLOT_ARCHETYPES }                from './common/plot-archetypes.js';

const DEFAULT_COMMONS = {
  GENDERS: COMMON_GENDERS, ORIENTATIONS: COMMON_ORIENTATIONS, BUILDS: COMMON_BUILDS,
  HAIR: COMMON_HAIR, RELATIONSHIP_STATUSES: COMMON_RELATIONSHIP_STATUSES, COMMON_PLOT_ARCHETYPES,
};

// Fields a pack must provide (top-level).
const REQUIRED_TOP = ['id', 'label', 'description', 'portraitStyle', 'tts', 'music', 'slots', 'voice', 'data'];
// data.* fields the generator needs (genders/orientations/builds/hair fall back to commons).
const REQUIRED_DATA = ['professions', 'lifeEvents', 'familyStructures', 'parentStatuses',
  'siblingDynamics', 'tensions', 'secrets', 'economicTiers', 'citySettings', 'tagPools',
  'namePools', 'plotArchetypes', 'distinguishingFeatures', 'quirks'];
const SLOT_FIELDS = ['identityCat', 'identityHeader', 'profCat', 'profHeader', 'econCat',
  'econHeader', 'cityCat', 'cityHeader', 'familyCat', 'lifeEventCat', 'tensionCat', 'economicTiers'];
const VOICE_FIELDS = ['identityLabel', 'genreLabel', 'openingNote', 'appearanceNote', 'systemPrompt'];
const STATIC_CARD_KEYS = ['STATIC_CHARACTERS', 'STATIC_CLASSES', 'STATIC_RACES',
  'STATIC_LOCATIONS', 'STATIC_FACTIONS', 'STATIC_CUSTOM'];

/**
 * Validates a pack's structure. Returns an array of human-readable error
 * strings (empty === valid). Does not throw.
 */
export function validatePack(pack) {
  const errors = [];
  if (!pack || typeof pack !== 'object') return ['Pack is not an object.'];
  for (const k of REQUIRED_TOP) if (pack[k] == null) errors.push(`Missing required field: "${k}".`);
  if (typeof pack.id === 'string' && !/^[a-z0-9][a-z0-9-]*$/.test(pack.id))
    errors.push(`Invalid id "${pack.id}" — use lowercase letters, digits, and hyphens.`);
  if (pack.slots && typeof pack.slots === 'object')
    for (const k of SLOT_FIELDS) if (pack.slots[k] == null) errors.push(`Missing slots.${k}.`);
  if (pack.voice && typeof pack.voice === 'object')
    for (const k of VOICE_FIELDS) if (pack.voice[k] == null) errors.push(`Missing voice.${k}.`);
  if (pack.data && typeof pack.data === 'object') {
    const identity = pack.data.races ?? pack.data.identities;
    if (!Array.isArray(identity) || identity.length === 0)
      errors.push('data.races (or data.identities) must be a non-empty array.');
    for (const k of REQUIRED_DATA)
      if (pack.data[k] == null) errors.push(`Missing data.${k}.`);
  }
  if (pack.staticCards && typeof pack.staticCards !== 'object')
    errors.push('staticCards, if present, must be an object.');
  return errors;
}

/**
 * Normalizes a validated pack into the app's runtime shapes.
 * @param {object} pack     Parsed manifest.json (with a `data` sub-object).
 * @param {object} [commons] Shared defaults ({ GENDERS, ORIENTATIONS, BUILDS,
 *                          HAIR, RELATIONSHIP_STATUSES, COMMON_PLOT_ARCHETYPES });
 *                          defaults to the app's common tables.
 * @returns {{ id, tables, manifest, voice, staticCards, errors }}
 */
export function loadPack(pack, commons = DEFAULT_COMMONS) {
  const errors = validatePack(pack);
  if (errors.length) return { id: pack?.id, errors };

  const d = pack.data;
  const identity = d.races ?? d.identities;
  const gameplay = pack.gameplay ?? {};

  let relationshipStatuses = commons.RELATIONSHIP_STATUSES;
  if (Array.isArray(gameplay.relationshipStatusFilter))
    relationshipStatuses = relationshipStatuses.filter(r => gameplay.relationshipStatusFilter.includes(r.id));

  const tables = {
    GENDERS:                 d.genders      ?? commons.GENDERS,
    ORIENTATIONS:            d.orientations ?? commons.ORIENTATIONS,
    RACES_OR_ETHNICITIES:    identity,
    BUILDS:                  d.builds ?? commons.BUILDS,
    HAIR:                    d.hair   ?? commons.HAIR,
    DISTINGUISHING_FEATURES: d.distinguishingFeatures,
    QUIRKS:                  d.quirks,
    PROFESSIONS:             d.professions,
    LIFE_EVENTS:             d.lifeEvents,
    FAMILY_STRUCTURES:       d.familyStructures,
    PARENT_STATUSES:         d.parentStatuses,
    SIBLING_DYNAMICS:        d.siblingDynamics,
    TENSIONS:                d.tensions,
    SECRETS:                 d.secrets,
    ECONOMIC_TIERS:          d.economicTiers,
    CITY_SETTINGS:           d.citySettings,
    TAG_POOLS:               d.tagPools,
    NAME_POOLS:              d.namePools,
    RELATIONSHIP_STATUSES:   relationshipStatuses,
    PLOT_ARCHETYPES:         [...commons.COMMON_PLOT_ARCHETYPES, ...d.plotArchetypes],
  };
  if (Array.isArray(gameplay.ageRange)) tables.AGE_RANGE = gameplay.ageRange;
  if (gameplay.allowMinorMarriage) tables.ALLOW_MINOR_MARRIAGE = true;

  const manifest = {
    id: pack.id,
    label: pack.label,
    description: pack.description,
    portraitStyle: pack.portraitStyle,
    tts: pack.tts,
    music: pack.music,
    slots: pack.slots,
    iconBase: pack.iconBase ?? null,   // optional: resolve icons from another served folder
  };

  const voice = {
    identityLabel:  pack.voice.identityLabel,
    genreLabel:     pack.voice.genreLabel,
    openingNote:    pack.voice.openingNote,
    appearanceNote: pack.voice.appearanceNote,
    systemPrompt:   pack.voice.systemPrompt,
  };

  const staticCards = {};
  for (const k of STATIC_CARD_KEYS) staticCards[k] = pack.staticCards?.[k] ?? [];

  return { id: pack.id, tables, manifest, voice, staticCards, errors: [] };
}
