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
//   const skeleton = await generateCharacter({ genre: 'modern', skipAI: true });
//
// No browser APIs. No Node-specific APIs. Pure JS + fetch.

import { rollStats, assignMBTI }  from './roller.js';
import { buildSkeleton }          from './skeleton-builder.js';
import { callClaudeAPI }          from './api-client.js';

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
 *   genre: 'modern',
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
  // Only 'modern' is implemented in v1. Future genres extend here.
  if (genre !== 'modern') {
    throw new Error(`Genre "${genre}" is not yet supported. Available: modern`);
  }

  if (!skipAI && !apiKey) {
    throw new Error('apiKey is required unless skipAI is true');
  }

  // ── PHASE 1: Roll stats ──────────────────────────────────────────────
  const stats = rollStats();

  // ── PHASE 2: Assign MBTI ────────────────────────────────────────────
  const mbti = assignMBTI(stats);

  // ── PHASE 3: Build skeleton ──────────────────────────────────────────
  const skeleton = buildSkeleton(stats, mbti, genre);

  // ── PHASE 4: AI narrative (optional) ────────────────────────────────
  let output = null;
  if (!skipAI) {
    output = await callClaudeAPI(skeleton, apiKey);
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
  const mbti = assignMBTI(stats);
  return buildSkeleton(stats, mbti, genre);
}

/**
 * Calls the Claude API on an existing skeleton.
 * Useful for regenerating narrative text without re-rolling the character.
 *
 * @param {import('./types.js').CharacterSkeleton} skeleton
 * @param {string} apiKey
 * @returns {Promise<import('./types.js').GeneratedOutput>}
 */
export async function regenerateOutput(skeleton, apiKey) {
  if (!apiKey) throw new Error('apiKey is required');
  return callClaudeAPI(skeleton, apiKey);
}

// Re-export types file for consumers who want the JSDoc typedefs
export * from './types.js';
