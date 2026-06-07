// generator/skeleton-builder.js
// Assembles a fully resolved CharacterSkeleton from rolled stats + curated tables.
// Genre tables are passed in as a parameter — no hard-coded imports.
// This makes the function portable across all genres without modification.
//
// No browser APIs. No Node-specific APIs. Pure JS.

import { statWeightedPick, statAndWeightPick, uniformPick, randomInt } from './selector.js';
import { buildCast } from './cast-builder.js';
import { buildStatLabels } from './stat-adjectives.js';

// ── NAME POOL HELPERS ─────────────────────────────────────────────────────
// Used by both buildSkeleton and cast-builder.
// Exported so cast-builder can import them without circular dependency.

/**
 * Returns the name pool for a given broad identity label (ethnicity or race).
 * @param {object} namePools  The NAME_POOLS object for the current genre
 * @param {string} broad      e.g. 'Latino', 'Elf'
 */
export function poolFor(namePools, broad) {
  return namePools[broad] ?? namePools['default'];
}

/**
 * Picks a first name matched to identity and gender.
 * @param {string} genderId  e.g. 'man', 'woman', 'non_binary'
 * @param {object} pool      A single pool entry { masc, fem, neutral, last }
 */
export function pickFirstName(genderId, pool) {
  if (['man','trans_man'].includes(genderId))     return uniformPick(pool.masc);
  if (['woman','trans_woman'].includes(genderId)) return uniformPick(pool.fem);
  const r = Math.random();
  if (r < 0.4) return uniformPick(pool.neutral);
  if (r < 0.7) return uniformPick(pool.masc);
  return uniformPick(pool.fem);
}

// ── ECONOMIC TIER RESOLUTION ──────────────────────────────────────────────

function resolveEconomicTier(professionTier, lifeEvent, familyStructure) {
  let tier = professionTier;
  if (lifeEvent?.economicHint)       tier += lifeEvent.economicHint;
  if (familyStructure?.economicHint) tier += familyStructure.economicHint;
  return Math.min(5, Math.max(1, Math.round(tier)));
}

// ── TAG ASSEMBLY ──────────────────────────────────────────────────────────

function assembleTags(profession, tension, citySettings, secretSeverity, tagPools) {
  const tags = new Set(tagPools.always);
  const cityTone = citySettings.toneTag;
  if (tagPools[cityTone]) tagPools[cityTone].forEach(t => tags.add(t));
  if (tagPools[tension.toneTag]) tagPools[tension.toneTag].forEach(t => tags.add(t));
  if (tension.criminalFlag) tagPools.criminal?.forEach(t => tags.add(t));
  const industryTags = tagPools.professionTags?.[profession.industry] ?? [];
  industryTags.forEach(t => tags.add(t));
  if (secretSeverity === 'explosive' || secretSeverity === 'high') {
    tags.add('secrets');
    tags.add('betrayal');
  }
  return [...tags].slice(0, 10);
}

// ── MAIN SKELETON BUILDER ─────────────────────────────────────────────────

/**
 * Builds a fully resolved CharacterSkeleton from rolled stats + MBTI.
 *
 * @param {import('./types.js').StatBlock} stats
 * @param {{ type: string, label: string }} mbti
 * @param {object} tables  All genre-specific table data:
 *   { PROFESSIONS, LIFE_EVENTS, FAMILY_STRUCTURES, TENSIONS, SECRETS,
 *     ECONOMIC_TIERS, CITY_SETTINGS, TAG_POOLS,
 *     GENDERS, ORIENTATIONS, RACES_OR_ETHNICITIES,
 *     BUILDS, HAIR, DISTINGUISHING_FEATURES, QUIRKS,
 *     NAME_POOLS }
 * @returns {import('./types.js').CharacterSkeleton}
 */
export function buildSkeleton(stats, mbti, tables) {
  const {
    PROFESSIONS, LIFE_EVENTS, FAMILY_STRUCTURES, TENSIONS, SECRETS,
    ECONOMIC_TIERS, CITY_SETTINGS, TAG_POOLS,
    GENDERS, ORIENTATIONS, RACES_OR_ETHNICITIES,
    BUILDS, HAIR, DISTINGUISHING_FEATURES, QUIRKS,
    NAME_POOLS,
  } = tables;

  // ── IDENTITY ──────────────────────────────────────────────────────────
  const gender      = statAndWeightPick(GENDERS, stats);
  const orientation = uniformPick(ORIENTATIONS.flatMap(o => Array(o.weight).fill(o)));
  const identity    = statAndWeightPick(RACES_OR_ETHNICITIES, stats);  // works for both race and ethnicity

  // ── NAME (ethnicity/race-matched) ─────────────────────────────────────
  const namePool = poolFor(NAME_POOLS, identity.broad);
  const firstName = pickFirstName(gender.id, namePool);
  const lastName  = uniformPick(namePool.last);
  const name      = `${firstName} ${lastName}`;

  // ── AGE ───────────────────────────────────────────────────────────────
  const ageRoll = Math.random();
  const age = ageRoll < 0.1  ? randomInt(19, 24)
            : ageRoll < 0.75 ? randomInt(25, 45)
            : ageRoll < 0.95 ? randomInt(46, 58)
            :                  randomInt(59, 70);

  // ── APPEARANCE ────────────────────────────────────────────────────────
  // Filter builds to those compatible with actual STR before weighted pick,
  // preventing contradictions like "powerfully built" on a feeble character.
  const compatibleBuilds = BUILDS.filter(b => {
    const sa = b.statAffinity?.strength ?? 1.0;
    if (sa >= 1.4 && stats.strength < 55) return false;
    if (sa >= 1.2 && stats.strength < 35) return false;
    if (sa <= 0.75 && stats.strength > 65) return false;
    return true;
  });
  const build = statWeightedPick(compatibleBuilds.length >= 2 ? compatibleBuilds : BUILDS, stats);

  const hair  = uniformPick(HAIR);
  const distinguishingFeature = Math.random() < 0.25
    ? null
    : uniformPick(DISTINGUISHING_FEATURES.filter(f => f.label !== null)).label;

  // Stat-derived appearance notes for CON and CHA only.
  // STR is represented by the build label — a separate note would risk contradicting it.
  const statAppearanceNote = (() => {
    const t = v => Math.min(4, Math.floor((v - 1) / 20));
    const CON_NOTES = ['chronically run-down look', 'looks worn, running on less', '', 'healthy, clear-eyed', 'visibly robust, built to last'];
    const CHA_NOTES = ['unkempt, indifferent to appearances', 'rough-edged',       '', 'well-groomed, easy confidence', 'striking — the room notices'];
    return [
      CON_NOTES[t(stats.constitution)],
      CHA_NOTES[t(stats.charisma)],
    ].filter(Boolean);
  })();

  // ── QUIRK ─────────────────────────────────────────────────────────────
  const quirkEntry = statWeightedPick(QUIRKS, stats);

  // ── PROFESSION ────────────────────────────────────────────────────────
  const profession = statWeightedPick(PROFESSIONS, stats);
  const sentiment  = uniformPick(profession.sentiments);

  // ── FAMILY STRUCTURE ──────────────────────────────────────────────────
  const famStructure = statWeightedPick(FAMILY_STRUCTURES, stats);

  // ── LIFE EVENT ────────────────────────────────────────────────────────
  const lifeEvent = statWeightedPick(LIFE_EVENTS, stats);

  // ── ECONOMIC TIER ─────────────────────────────────────────────────────
  const economicTier    = resolveEconomicTier(profession.economicTier, lifeEvent, famStructure);
  const economicData    = ECONOMIC_TIERS[economicTier];
  const economicMarkers = [...economicData.descriptors].sort(() => Math.random() - 0.5).slice(0, 2);
  const housing   = uniformPick(economicData.housing);
  const transport = uniformPick(economicData.transport);

  // ── TENSION & SECRET ──────────────────────────────────────────────────
  const tension = statWeightedPick(TENSIONS, stats);
  const secret  = statWeightedPick(SECRETS, stats);

  // ── CITY SETTING ──────────────────────────────────────────────────────
  const city = statWeightedPick(CITY_SETTINGS, stats);

  // ── TAGS ──────────────────────────────────────────────────────────────
  const tags = assembleTags(profession, tension, city, secret.severity, TAG_POOLS);

  // ── SUPPORTING CAST ───────────────────────────────────────────────────
  const cast = buildCast(name, lastName, identity.broad, famStructure, NAME_POOLS);

  return {
    name, age,
    statLabels:      buildStatLabels(stats),
    gender:          gender.label,
    pronouns:        gender.pronouns,
    orientation:     orientation.label,
    ethnicityBroad:  identity.broad,
    ethnicityFlavor: identity.flavor,
    appearance: {
      build:               build.label,
      hair:                typeof hair === 'string' ? hair : hair.label,
      distinguishingFeature,
      statNotes:           statAppearanceNote,
    },
    quirk:           quirkEntry.quirk,
    stats,
    mbti:            mbti.type,
    mbtiLabel:       mbti.label,
    profession:      profession.title,
    industry:        profession.industry,
    economicTier,
    economicLabel:   economicData.label,
    economicMarkers,
    housing,
    transport,
    cityLabel:       city.label,
    cityFlavor:      city.flavor,
    sentiment,
    lifeEvent:       lifeEvent.description,
    tension:         tension.description,
    secret:          secret.description,
    secretSeverity:  secret.severity,
    tags,
    cast,
  };
}
