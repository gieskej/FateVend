// generator/selector.js
// Weighted random selection utilities.
// Used by skeleton-builder to pick from stat-weighted curated tables.
//
// No browser APIs. No Node-specific APIs. Pure JS.

// ── CORE WEIGHTED SELECTION ───────────────────────────────────────────────

/**
 * Selects one item from an array using weighted probabilities.
 * Each item must have a numeric `weight` property.
 *
 * @template T
 * @param {T[]} items   Array of items, each with a `weight` property
 * @returns {T}
 */
export function weightedPick(items) {
  const total = items.reduce((sum, item) => sum + (item.weight ?? 1), 0);
  let rand = Math.random() * total;
  for (const item of items) {
    rand -= item.weight ?? 1;
    if (rand <= 0) return item;
  }
  return items[items.length - 1]; // fallback
}

/**
 * Selects one item from an array with uniform probability.
 * @template T
 * @param {T[]} items
 * @returns {T}
 */
export function uniformPick(items) {
  return items[Math.floor(Math.random() * items.length)];
}

/**
 * Selects n unique items from an array with uniform probability.
 * @template T
 * @param {T[]} items
 * @param {number} n
 * @returns {T[]}
 */
export function uniformPickN(items, n) {
  const shuffled = [...items].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(n, items.length));
}

/**
 * Returns a random integer between min and max (inclusive).
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
export function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// ── STAT-WEIGHTED SELECTION ───────────────────────────────────────────────
// The core mechanic: items carry statAffinity multipliers that scale their
// effective weight up or down based on the character's rolled stats.
//
// Example: a profession with statAffinity { strength: 1.5, intelligence: 0.8 }
// becomes more likely when Strength is high, less likely when Intelligence is high.
//
// Affinity values are multipliers applied to the item's base weight.
// If no base weight is present, 1.0 is assumed.

/**
 * Computes the effective weight of an item given the character's stats.
 *
 * @param {object} item             Must have optional statAffinity: Record<string, number>
 * @param {import('./types.js').StatBlock} stats
 * @param {number} [baseWeight=10]  Default weight before affinity scaling
 * @returns {number}
 */
export function effectiveWeight(item, stats, baseWeight = 10) {
  const affinity = item.statAffinity ?? {};
  let multiplier = 1;

  for (const [stat, factor] of Object.entries(affinity)) {
    if (stats[stat] !== undefined) {
      // Normalize the stat to 0–1, then scale the multiplier.
      // A factor of 1.5 with a stat of 100 → full 1.5× boost.
      // A factor of 0.8 with a stat of 100 → 0.8× penalty.
      // At stat=50 (midpoint), factor has half its effect.
      const normalized = stats[stat] / 100;
      // Interpolate between 1.0 (no effect at 0) and factor (full effect at 100)
      multiplier *= 1 + (factor - 1) * normalized;
    }
  }

  const base = item.weight ?? baseWeight;
  return Math.max(0.1, base * multiplier); // floor at 0.1 to keep all items selectable
}

/**
 * Picks one item from an array using stat-weighted probabilities.
 *
 * @template T
 * @param {T[]} items
 * @param {import('./types.js').StatBlock} stats
 * @param {number} [baseWeight=10]
 * @returns {T}
 */
export function statWeightedPick(items, stats, baseWeight = 10) {
  const weighted = items.map(item => ({
    item,
    weight: effectiveWeight(item, stats, baseWeight),
  }));

  const total = weighted.reduce((sum, w) => sum + w.weight, 0);
  let rand = Math.random() * total;

  for (const { item, weight } of weighted) {
    rand -= weight;
    if (rand <= 0) return item;
  }

  return weighted[weighted.length - 1].item; // fallback
}

/**
 * Picks one item from an array of items that have a `weight` property,
 * further scaled by stat affinities.
 * Combines explicit item weights with stat-affinity scaling.
 *
 * @template T
 * @param {T[]} items
 * @param {import('./types.js').StatBlock} stats
 * @returns {T}
 */
export function statAndWeightPick(items, stats) {
  const weighted = items.map(item => ({
    item,
    weight: effectiveWeight(item, stats, item.weight ?? 10),
  }));

  const total = weighted.reduce((sum, w) => sum + w.weight, 0);
  let rand = Math.random() * total;

  for (const { item, weight } of weighted) {
    rand -= weight;
    if (rand <= 0) return item;
  }

  return weighted[weighted.length - 1].item;
}
