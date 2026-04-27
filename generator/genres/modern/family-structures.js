// genres/modern/family-structures.js
// Family composition is randomized per character.
// The generator picks one STRUCTURE, then resolves each member's status.
//
// Structure shape:
//   id, label, parents (array), siblings (array),
//   statAffinity (optional weighting),
//   toneTag (gritty | dramatic | cozy | neutral)

export const PARENT_STATUSES = [
  { id: 'present_close',     label: 'present and close',              toneTag: 'cozy'     },
  { id: 'present_distant',   label: 'present but emotionally distant', toneTag: 'neutral'  },
  { id: 'present_difficult', label: 'present but a source of tension', toneTag: 'dramatic' },
  { id: 'estranged',         label: 'estranged — no contact',          toneTag: 'dramatic' },
  { id: 'deceased_recent',   label: 'recently deceased',               toneTag: 'dramatic' },
  { id: 'deceased_long',     label: 'died when the character was young',toneTag: 'gritty'  },
  { id: 'absent_unknown',    label: 'absent — never knew them',        toneTag: 'gritty'   },
  { id: 'incarcerated',      label: 'currently in prison',             toneTag: 'gritty'   },
  { id: 'abroad',            label: 'lives far away, little contact',  toneTag: 'neutral'  },
];

export const SIBLING_DYNAMICS = [
  { id: 'protective_older',  label: 'protective older sibling',       toneTag: 'cozy'     },
  { id: 'rivalry',           label: 'long-running rivalry',           toneTag: 'dramatic' },
  { id: 'estranged',         label: 'estranged — fell out years ago', toneTag: 'dramatic' },
  { id: 'close_ally',        label: 'closest friend and confidant',   toneTag: 'cozy'     },
  { id: 'troubled',          label: 'struggling with addiction or debt', toneTag: 'gritty' },
  { id: 'golden_child',      label: 'the family\'s golden child — hard to live up to', toneTag: 'dramatic' },
  { id: 'lost_touch',        label: 'drifted apart, rarely speak',    toneTag: 'neutral'  },
  { id: 'deceased',          label: 'deceased',                       toneTag: 'gritty'   },
  { id: 'younger_dependent', label: 'younger and still depends on the character', toneTag: 'neutral' },
  { id: 'reconnecting',      label: 'recently reconnected after years apart', toneTag: 'neutral' },
];

// Family structure templates.
// siblingCount: [min, max] — resolved at generation time.
// parentCount: 1 or 2 — determines which parent slots are filled.
export const FAMILY_STRUCTURES = [

  // ── TWO-PARENT HOUSEHOLDS ─────────────────────────────────────────────────
  {
    id: 'two_parent_intact',
    label: 'Two parents, still together',
    parentCount: 2,
    siblingCount: [0, 3],
    toneTag: 'cozy',
    statAffinity: { wisdom: 1.1, charisma: 1.1 },
    notes: 'Both parents are present. Relationship quality randomized separately.',
  },
  {
    id: 'two_parent_divorced',
    label: 'Parents divorced',
    parentCount: 2,
    siblingCount: [0, 3],
    toneTag: 'dramatic',
    statAffinity: { wisdom: 0.9 },
    notes: 'Both parents alive but separated. Each gets an independent status.',
  },
  {
    id: 'two_parent_one_deceased',
    label: 'One parent deceased, one surviving',
    parentCount: 2,
    siblingCount: [0, 2],
    toneTag: 'dramatic',
    statAffinity: { wisdom: 1.1, constitution: 0.9 },
    notes: 'One parent is deceased (timing randomized). Surviving parent status randomized.',
  },
  {
    id: 'two_parent_one_absent',
    label: 'One parent absent, one present',
    parentCount: 2,
    siblingCount: [0, 2],
    toneTag: 'dramatic',
    statAffinity: { constitution: 1.1, charisma: 0.9 },
    notes: 'One parent was never in the picture or left early. Surviving parent status randomized.',
  },
  {
    id: 'two_parent_blended',
    label: 'Blended family — step-parent',
    parentCount: 2,
    siblingCount: [1, 4],
    toneTag: 'neutral',
    statAffinity: {},
    notes: 'One biological parent and one step-parent. May include half-siblings.',
  },
  {
    id: 'two_parent_both_troubled',
    label: 'Both parents present but troubled',
    parentCount: 2,
    siblingCount: [0, 3],
    toneTag: 'gritty',
    statAffinity: { constitution: 1.2, wisdom: 0.8 },
    notes: 'Both parents in the home but with serious dysfunction — addiction, abuse, poverty.',
  },

  // ── SINGLE-PARENT HOUSEHOLDS ─────────────────────────────────────────────
  {
    id: 'single_mother',
    label: 'Raised by a single mother',
    parentCount: 1,
    parentGender: 'mother',
    siblingCount: [0, 3],
    toneTag: 'neutral',
    statAffinity: { charisma: 1.1, wisdom: 1.1 },
    notes: 'Father absent, unknown, or deceased. Mother\'s status randomized.',
  },
  {
    id: 'single_father',
    label: 'Raised by a single father',
    parentCount: 1,
    parentGender: 'father',
    siblingCount: [0, 2],
    toneTag: 'neutral',
    statAffinity: { strength: 1.1, wisdom: 1.1 },
    notes: 'Mother absent, unknown, or deceased. Father\'s status randomized.',
  },
  {
    id: 'single_parent_struggling',
    label: 'Single parent household under financial strain',
    parentCount: 1,
    siblingCount: [1, 4],
    toneTag: 'gritty',
    statAffinity: { constitution: 1.2, wisdom: 1.1 },
    economicHint: -1,
    notes: 'One parent working multiple jobs. Character may have taken on adult responsibilities early.',
  },

  // ── NO PARENTS ────────────────────────────────────────────────────────────
  {
    id: 'raised_by_grandparents',
    label: 'Raised by grandparents',
    parentCount: 0,
    siblingCount: [0, 2],
    toneTag: 'neutral',
    statAffinity: { wisdom: 1.2, charisma: 0.9 },
    notes: 'Both parents absent or deceased. Grandparents were primary caregivers.',
  },
  {
    id: 'raised_by_older_sibling',
    label: 'Raised by an older sibling',
    parentCount: 0,
    siblingCount: [1, 2],
    toneTag: 'gritty',
    statAffinity: { constitution: 1.2, loyalty: 1.3 },
    notes: 'Parents gone. An older sibling stepped up. Deep bond, complicated dynamic.',
  },
  {
    id: 'foster_care',
    label: 'Grew up in foster care',
    parentCount: 0,
    siblingCount: [0, 1],
    toneTag: 'gritty',
    statAffinity: { constitution: 1.3, charisma: 0.9, wisdom: 1.1 },
    notes: 'No stable parental figures. Multiple placements possible.',
  },
  {
    id: 'orphaned_early',
    label: 'Orphaned before age ten',
    parentCount: 0,
    siblingCount: [0, 2],
    toneTag: 'gritty',
    statAffinity: { constitution: 1.3, wisdom: 1.2 },
    notes: 'Both parents died when the character was very young. Raised by relatives or the state.',
  },
  {
    id: 'emancipated_minor',
    label: 'Left home and became legally independent as a teenager',
    parentCount: 2,
    siblingCount: [0, 2],
    toneTag: 'gritty',
    statAffinity: { constitution: 1.3, strength: 1.2, wisdom: 0.9 },
    notes: 'Parents technically alive but the character left and never looked back.',
  },

  // ── UNCONVENTIONAL ────────────────────────────────────────────────────────
  {
    id: 'large_family',
    label: 'Large, chaotic family household',
    parentCount: 2,
    siblingCount: [3, 6],
    toneTag: 'neutral',
    statAffinity: { charisma: 1.2, constitution: 1.1 },
    notes: 'Lots of siblings, relatives in and out. Character learned to fight for attention or disappear.',
  },
  {
    id: 'only_child_wealthy',
    label: 'Only child of wealthy parents',
    parentCount: 2,
    siblingCount: [0, 0],
    toneTag: 'cozy',
    statAffinity: { intelligence: 1.2, charisma: 1.1 },
    economicHint: 2,
    notes: 'Comfortable upbringing. May feel intense pressure or profound loneliness.',
  },
  {
    id: 'only_child_isolated',
    label: 'Only child, isolated upbringing',
    parentCount: 2,
    siblingCount: [0, 0],
    toneTag: 'dramatic',
    statAffinity: { intelligence: 1.2, wisdom: 1.1, charisma: 0.8 },
    notes: 'Few childhood friendships. Deeply self-reliant, struggles socially.',
  },
  {
    id: 'commune_or_compound',
    label: 'Grew up in a commune, collective, or religious compound',
    parentCount: 2,
    siblingCount: [0, 3],
    toneTag: 'dramatic',
    statAffinity: { wisdom: 1.2, charisma: 1.1 },
    notes: 'Non-traditional upbringing. May have escaped or aged out. The outside world was always "other".',
  },
];
