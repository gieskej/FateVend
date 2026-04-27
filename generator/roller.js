// generator/roller.js
// Responsible for:
//   - Rolling six RPG stats (1–100 each)
//   - Assigning an MBTI type weighted by those stats
//
// No browser APIs. No Node-specific APIs. Pure JS.

// ── MBTI TYPES ────────────────────────────────────────────────────────────

export const MBTI_TYPES = [
  { type: 'INTJ', label: 'The Architect'     },
  { type: 'INTP', label: 'The Thinker'       },
  { type: 'ENTJ', label: 'The Commander'     },
  { type: 'ENTP', label: 'The Debater'       },
  { type: 'INFJ', label: 'The Advocate'      },
  { type: 'INFP', label: 'The Mediator'      },
  { type: 'ENFJ', label: 'The Protagonist'   },
  { type: 'ENFP', label: 'The Campaigner'    },
  { type: 'ISTJ', label: 'The Logistician'   },
  { type: 'ISFJ', label: 'The Defender'      },
  { type: 'ESTJ', label: 'The Executive'     },
  { type: 'ESFJ', label: 'The Consul'        },
  { type: 'ISTP', label: 'The Virtuoso'      },
  { type: 'ISFP', label: 'The Adventurer'    },
  { type: 'ESTP', label: 'The Entrepreneur'  },
  { type: 'ESFP', label: 'The Entertainer'   },
];

// ── STAT ROLLING ──────────────────────────────────────────────────────────

/**
 * Rolls a single stat in range 1–100.
 * Uses a slight bell curve: average of two random rolls, scaled back to 1–100.
 * This produces more mid-range values and fewer extreme outliers.
 * @returns {number}
 */
function rollStat() {
  const a = Math.random() * 100 + 1;
  const b = Math.random() * 100 + 1;
  return Math.min(100, Math.max(1, Math.round((a + b) / 2)));
}

/**
 * Rolls all six stats.
 * @returns {import('./types.js').StatBlock}
 */
export function rollStats() {
  return {
    strength:     rollStat(),
    intelligence: rollStat(),
    wisdom:       rollStat(),
    charisma:     rollStat(),
    dexterity:    rollStat(),
    constitution: rollStat(),
  };
}

// ── MBTI WEIGHTING ────────────────────────────────────────────────────────
// Each of the four MBTI dichotomies is scored independently from stats,
// then combined into a type. This gives stat-coherent personalities
// without hard-locking any type to any stat value.
//
// Dichotomies:
//   E/I  — Extrovert vs Introvert
//   N/S  — Intuitive vs Sensing
//   T/F  — Thinking vs Feeling
//   J/P  — Judging vs Perceiving

/**
 * Converts a raw score (any range) to a 0–1 probability.
 * @param {number} score
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
function normalize(score, min, max) {
  return Math.min(1, Math.max(0, (score - min) / (max - min)));
}

/**
 * Given a probability p (0–1), randomly returns true (first option) or false (second).
 * @param {number} p  probability of returning true
 * @returns {boolean}
 */
function decide(p) {
  return Math.random() < p;
}

/**
 * Assigns an MBTI type weighted by stat values.
 *
 * Weighting logic:
 *   E/I:  Charisma + Strength vs Wisdom + Intelligence
 *   N/S:  Intelligence + Wisdom vs Constitution + Strength
 *   T/F:  Intelligence vs Charisma + Wisdom
 *   J/P:  Wisdom + Constitution vs Charisma + Dexterity
 *
 * @param {import('./types.js').StatBlock} stats
 * @returns {{ type: string, label: string }}
 */
export function assignMBTI(stats) {
  const { strength, intelligence, wisdom, charisma, dexterity, constitution } = stats;

  // E/I — high Charisma+Strength skews Extrovert; high Wisdom+Intelligence skews Introvert
  const extrovertScore = (charisma + strength) / 2;
  const introvertScore = (wisdom + intelligence) / 2;
  const eScore = normalize(extrovertScore - introvertScore + 50, 0, 100);
  const isExtrovert = decide(eScore);

  // N/S — high Intelligence+Wisdom skews Intuitive; high Constitution+Strength skews Sensing
  const intuitiveScore = (intelligence + wisdom) / 2;
  const sensingScore   = (constitution + strength) / 2;
  const nScore = normalize(intuitiveScore - sensingScore + 50, 0, 100);
  const isIntuitive = decide(nScore);

  // T/F — high Intelligence skews Thinking; high Charisma+Wisdom skews Feeling
  const thinkingScore = intelligence;
  const feelingScore  = (charisma + wisdom) / 2;
  const tScore = normalize(thinkingScore - feelingScore + 50, 0, 100);
  const isThinking = decide(tScore);

  // J/P — high Wisdom+Constitution skews Judging; high Charisma+Dexterity skews Perceiving
  const judgingScore    = (wisdom + constitution) / 2;
  const perceivingScore = (charisma + dexterity) / 2;
  const jScore = normalize(judgingScore - perceivingScore + 50, 0, 100);
  const isJudging = decide(jScore);

  const typeStr = [
    isExtrovert ? 'E' : 'I',
    isIntuitive ? 'N' : 'S',
    isThinking  ? 'T' : 'F',
    isJudging   ? 'J' : 'P',
  ].join('');

  const match = MBTI_TYPES.find(m => m.type === typeStr);
  return match ?? MBTI_TYPES[0]; // fallback should never be needed
}
