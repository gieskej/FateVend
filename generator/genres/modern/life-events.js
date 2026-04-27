// genres/modern/life-events.js
// Formative past events — one is selected per character.
// Each event carries:
//   id, description, statAffinity (stats that make this more likely),
//   toneTag (gritty | dramatic | cozy | neutral) for filtering,
//   economicHint (optional tier shift suggestion)

export const LIFE_EVENTS = [

  // ── LOSS & GRIEF ──────────────────────────────────────────────────────────
  {
    id: 'lost_parent_young',
    description: 'Lost a parent before the age of twelve',
    toneTag: 'dramatic',
    statAffinity: { wisdom: 1.2, constitution: 0.9 },
  },
  {
    id: 'lost_sibling',
    description: 'A sibling died — accident, illness, or violence',
    toneTag: 'dramatic',
    statAffinity: { wisdom: 1.3, constitution: 0.9 },
  },
  {
    id: 'partner_died',
    description: 'Lost a long-term partner or spouse',
    toneTag: 'dramatic',
    statAffinity: { wisdom: 1.2, charisma: 0.9 },
  },
  {
    id: 'best_friend_overdose',
    description: 'A best friend died of an overdose in their early twenties',
    toneTag: 'gritty',
    statAffinity: { wisdom: 1.2, constitution: 0.9 },
  },
  {
    id: 'miscarriage',
    description: 'Suffered a miscarriage or the loss of a child',
    toneTag: 'dramatic',
    statAffinity: { wisdom: 1.2, constitution: 0.8 },
  },

  // ── FAMILY FRACTURES ──────────────────────────────────────────────────────
  {
    id: 'parents_divorced_badly',
    description: 'Parents divorced in a bitter, drawn-out split during childhood',
    toneTag: 'dramatic',
    statAffinity: { wisdom: 1.1, charisma: 0.9 },
  },
  {
    id: 'raised_by_grandparent',
    description: 'Raised primarily by a grandparent while parents were absent',
    toneTag: 'neutral',
    statAffinity: { wisdom: 1.2 },
  },
  {
    id: 'foster_care',
    description: 'Spent time in foster care as a child',
    toneTag: 'gritty',
    statAffinity: { constitution: 1.1, charisma: 0.9, wisdom: 1.1 },
  },
  {
    id: 'estranged_from_family',
    description: 'Deliberately cut off contact with most of their family as an adult',
    toneTag: 'dramatic',
    statAffinity: { wisdom: 1.2, strength: 1.1 },
  },
  {
    id: 'abusive_household',
    description: 'Grew up in a household with abuse — physical, emotional, or both',
    toneTag: 'gritty',
    statAffinity: { constitution: 1.2, wisdom: 0.9, strength: 1.1 },
  },

  // ── FAILURE & SETBACK ─────────────────────────────────────────────────────
  {
    id: 'dropped_out_college',
    description: 'Dropped out of college before finishing their degree',
    toneTag: 'neutral',
    statAffinity: { intelligence: 0.9, wisdom: 0.9 },
    economicHint: -1,
  },
  {
    id: 'business_failed',
    description: 'Started a business that collapsed, taking their savings with it',
    toneTag: 'dramatic',
    statAffinity: { intelligence: 1.1, constitution: 0.9 },
    economicHint: -1,
  },
  {
    id: 'bankruptcy',
    description: 'Filed for bankruptcy after debt spiraled out of control',
    toneTag: 'dramatic',
    statAffinity: { wisdom: 0.8, constitution: 0.9 },
    economicHint: -2,
  },
  {
    id: 'fired_publicly',
    description: 'Was fired in a humiliating or very public way',
    toneTag: 'dramatic',
    statAffinity: { charisma: 0.9, wisdom: 0.9 },
  },
  {
    id: 'addiction_recovery',
    description: 'Fought through a serious addiction — alcohol, opioids, or gambling — and came out the other side',
    toneTag: 'gritty',
    statAffinity: { constitution: 0.8, wisdom: 1.3 },
  },
  {
    id: 'divorced',
    description: 'Went through a painful divorce in their late twenties or thirties',
    toneTag: 'dramatic',
    statAffinity: { charisma: 0.9, wisdom: 1.1 },
  },

  // ── CRIME & JUSTICE ───────────────────────────────────────────────────────
  {
    id: 'did_time',
    description: 'Served time in prison — months or years',
    toneTag: 'gritty',
    statAffinity: { strength: 1.2, constitution: 1.2, wisdom: 0.8 },
    economicHint: -1,
  },
  {
    id: 'juvenile_record',
    description: 'Had a juvenile record that followed them into adulthood',
    toneTag: 'gritty',
    statAffinity: { wisdom: 0.8, strength: 1.1 },
  },
  {
    id: 'wrongfully_accused',
    description: 'Was wrongfully accused of a crime — charges were eventually dropped, but the damage was done',
    toneTag: 'dramatic',
    statAffinity: { wisdom: 1.2, charisma: 0.9 },
  },
  {
    id: 'witnessed_crime',
    description: 'Witnessed a serious crime — murder, assault — and stayed silent',
    toneTag: 'gritty',
    statAffinity: { wisdom: 0.9, constitution: 0.9 },
  },
  {
    id: 'victim_of_robbery',
    description: 'Was the victim of a violent robbery that changed how they see the world',
    toneTag: 'gritty',
    statAffinity: { constitution: 0.9, strength: 1.1 },
  },

  // ── UPHEAVAL & REINVENTION ────────────────────────────────────────────────
  {
    id: 'moved_cities_alone',
    description: 'Moved to a new city alone at 18 with almost nothing',
    toneTag: 'neutral',
    statAffinity: { constitution: 1.1, charisma: 1.1, wisdom: 1.1 },
  },
  {
    id: 'immigrated',
    description: 'Immigrated to the country as a child or young adult',
    toneTag: 'neutral',
    statAffinity: { constitution: 1.2, wisdom: 1.1 },
  },
  {
    id: 'military_service',
    description: 'Served in the military and was deployed abroad',
    toneTag: 'dramatic',
    statAffinity: { strength: 1.3, constitution: 1.3, wisdom: 1.1 },
  },
  {
    id: 'survived_disaster',
    description: 'Survived a natural disaster — flood, fire, hurricane — that destroyed their home',
    toneTag: 'dramatic',
    statAffinity: { constitution: 1.2, wisdom: 1.1 },
  },
  {
    id: 'career_pivot',
    description: 'Abandoned a well-paying career in their thirties to start over in a new field',
    toneTag: 'neutral',
    statAffinity: { wisdom: 1.2, charisma: 1.1 },
  },
  {
    id: 'escaped_cult',
    description: 'Left a controlling religious group or cult in their twenties',
    toneTag: 'dramatic',
    statAffinity: { wisdom: 1.3, intelligence: 1.2 },
  },
  {
    id: 'came_out',
    description: 'Came out to their family in a moment that changed everything',
    toneTag: 'dramatic',
    statAffinity: { charisma: 1.1, wisdom: 1.2 },
  },

  // ── ACHIEVEMENT & LUCK ────────────────────────────────────────────────────
  {
    id: 'scholarship_kid',
    description: 'Won a scholarship that was the only path out of a difficult home situation',
    toneTag: 'neutral',
    statAffinity: { intelligence: 1.3, wisdom: 1.1 },
    economicHint: 1,
  },
  {
    id: 'unexpected_inheritance',
    description: 'Received an unexpected inheritance from a distant relative',
    toneTag: 'cozy',
    statAffinity: { charisma: 1.1 },
    economicHint: 1,
  },
  {
    id: 'viral_moment',
    description: 'Had a viral moment online — famous for fifteen minutes, lasting consequences',
    toneTag: 'neutral',
    statAffinity: { charisma: 1.3 },
  },
  {
    id: 'early_success',
    description: 'Achieved significant professional success very young, then plateaued',
    toneTag: 'neutral',
    statAffinity: { intelligence: 1.2, charisma: 1.2 },
    economicHint: 1,
  },
  {
    id: 'lottery_won',
    description: 'Won a mid-sized lottery jackpot that they mostly burned through',
    toneTag: 'cozy',
    statAffinity: { wisdom: 0.8 },
  },

  // ── QUIET LIFE ────────────────────────────────────────────────────────────
  {
    id: 'small_town_raised',
    description: 'Grew up in a small town and never really left until recently',
    toneTag: 'cozy',
    statAffinity: { wisdom: 1.1, charisma: 0.9 },
  },
  {
    id: 'caretaker_role',
    description: 'Spent years as the primary caretaker for a sick or disabled family member',
    toneTag: 'neutral',
    statAffinity: { wisdom: 1.3, constitution: 1.1, charisma: 0.9 },
  },
  {
    id: 'long_relationship_ended',
    description: 'Was in the same relationship for a decade before it quietly fell apart',
    toneTag: 'cozy',
    statAffinity: { wisdom: 1.1, charisma: 0.9 },
  },
  {
    id: 'late_bloomer',
    description: 'Discovered their passion or identity very late — in their 30s or 40s',
    toneTag: 'cozy',
    statAffinity: { wisdom: 1.3, intelligence: 1.1 },
  },
  {
    id: 'lived_abroad',
    description: 'Spent several years living abroad before returning home',
    toneTag: 'neutral',
    statAffinity: { charisma: 1.2, wisdom: 1.2, intelligence: 1.1 },
  },
  {
    id: 'childhood_prodigy',
    description: 'Was considered a prodigy as a child — the pressure shaped everything that followed',
    toneTag: 'neutral',
    statAffinity: { intelligence: 1.4, wisdom: 0.9 },
  },
];
