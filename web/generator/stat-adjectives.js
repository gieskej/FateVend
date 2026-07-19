// generator/stat-adjectives.js
// Converts numeric stat values (1–100) to descriptive adjectives.
// Used by engine.js to annotate the skeleton (statLabels) for the AI prompt,
// and by the UI to label stat cells.

export const STAT_ADJECTIVES = {
  strength: ["feeble", "weak", "average strength", "strong", "mighty"],
  intelligence: [
    "dim",
    "slow minded",
    "average intelligence",
    "sharp",
    "brilliant",
  ],
  wisdom: ["reckless", "naive", "average wisdom", "perceptive", "sage"],
  charisma: [
    "repellent",
    "socially awkward",
    "personable",
    "charming",
    "magnetic personality",
  ],
  dexterity: ["clumsy", "sluggish", "nimble", "agile", "acrobatic"],
  constitution: ["frail", "sickly", "hardy", "tough", "resilient"],
};

/**
 * Returns the adjective tier for a stat value (1–100).
 * Tiers: 1–20 → 0, 21–40 → 1, 41–60 → 2, 61–80 → 3, 81–100 → 4
 * @param {string} stat   Key of STAT_ADJECTIVES
 * @param {number} value  1–100
 * @returns {string}
 */
export function statAdjective(stat, value) {
  const tiers = STAT_ADJECTIVES[stat];
  if (!tiers) return "";
  return tiers[Math.min(4, Math.floor((value - 1) / 20))];
}

/**
 * Builds a statLabels object from a full stats block.
 * @param {import('./types.js').StatBlock} stats
 * @returns {Record<string, string>}
 */
export function buildStatLabels(stats) {
  return Object.fromEntries(
    Object.entries(stats).map(([k, v]) => [k, statAdjective(k, v)]),
  );
}
