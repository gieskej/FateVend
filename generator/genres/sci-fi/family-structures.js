// genres/sci-fi/family-structures.js
// Family composition is randomized per character.
// The generator picks one STRUCTURE, then resolves each member's status.
//
// Structure shape:
//   id, label, parentCount, siblingCount [min, max],
//   statAffinity (optional), toneTag (gritty | dramatic | neutral | cozy),
//   economicHint (optional), notes

export const PARENT_STATUSES = [
  { id: 'present_close',     label: 'present and close',               toneTag: 'cozy'     },
  { id: 'present_distant',   label: 'present but emotionally distant',  toneTag: 'neutral'  },
  { id: 'present_difficult', label: 'present but a source of tension',  toneTag: 'dramatic' },
  { id: 'estranged',         label: 'estranged — no contact',           toneTag: 'dramatic' },
  { id: 'deceased_recent',   label: 'recently deceased',                toneTag: 'dramatic' },
  { id: 'deceased_long',     label: 'died when the character was young', toneTag: 'gritty'  },
  { id: 'absent_unknown',    label: 'absent — never knew them',         toneTag: 'gritty'   },
  { id: 'corp_detained',     label: 'detained by a megacorporation',    toneTag: 'gritty'   },
  { id: 'missing',           label: 'missing — no confirmed status',    toneTag: 'dramatic' },
];

export const SIBLING_DYNAMICS = [
  { id: 'protective_older',  label: 'protective older sibling',         toneTag: 'cozy'     },
  { id: 'rivalry',           label: 'long-running rivalry',             toneTag: 'dramatic' },
  { id: 'estranged',         label: 'estranged — fell out years ago',   toneTag: 'dramatic' },
  { id: 'close_ally',        label: 'closest friend and confidant',     toneTag: 'cozy'     },
  { id: 'troubled',          label: 'deep in corp debt or running from something', toneTag: 'gritty' },
  { id: 'golden_child',      label: 'the family\'s golden child — hard to live up to', toneTag: 'dramatic' },
  { id: 'lost_touch',        label: 'drifted apart, rarely speak',      toneTag: 'neutral'  },
  { id: 'deceased',          label: 'deceased',                         toneTag: 'gritty'   },
  { id: 'younger_dependent', label: 'younger and still depends on the character', toneTag: 'neutral' },
  { id: 'reconnecting',      label: 'recently reconnected after years apart', toneTag: 'neutral' },
];

// Family structure templates.
// siblingCount: [min, max] — resolved at generation time.
// parentCount: 0, 1, or 2 — determines which parent slots are filled.
export const FAMILY_STRUCTURES = [

  // ── STANDARD HOUSEHOLDS ───────────────────────────────────────────────────
  {
    id: 'biological_intact',
    label: 'Biological family, intact',
    parentCount: 2,
    siblingCount: [0, 2],
    toneTag: 'neutral',
    statAffinity: { wisdom: 1.1, charisma: 1.1 },
    notes: 'Both biological parents present. Relationship quality randomized separately.',
  },
  {
    id: 'single_parent',
    label: 'Single parent household',
    parentCount: 1,
    siblingCount: [0, 2],
    toneTag: 'neutral',
    statAffinity: { constitution: 1.1 },
    economicHint: -1,
    notes: 'One parent absent, unknown, or deceased. Character may have taken on responsibilities early.',
  },
  {
    id: 'two_parent_one_deceased',
    label: 'One parent deceased, one surviving',
    parentCount: 2,
    siblingCount: [0, 2],
    toneTag: 'dramatic',
    statAffinity: { wisdom: 1.1, constitution: 0.9 },
    economicHint: -1,
    notes: 'One parent is deceased. Surviving parent status randomized.',
  },

  // ── INSTITUTIONAL / CORPORATE ─────────────────────────────────────────────
  {
    id: 'corp_foster',
    label: 'Corporate foster assignment',
    parentCount: 2,
    siblingCount: [0, 0],
    toneTag: 'gritty',
    statAffinity: { intelligence: 1.1, constitution: 1.1 },
    notes: 'Guardian parents assigned by a corporation — functional, structured, and transactional in ways that took a while to process.',
  },
  {
    id: 'orphan_station',
    label: 'Station orphan — raised by the system',
    parentCount: 0,
    siblingCount: [0, 1],
    toneTag: 'gritty',
    statAffinity: { constitution: 1.3, wisdom: 1.1 },
    economicHint: -1,
    notes: 'No parental figures. Multiple facility placements. Self-reliance was a survival skill, not a virtue.',
  },
  {
    id: 'vat_born',
    label: 'Vat-born — facility-raised',
    parentCount: 0,
    siblingCount: [0, 6],
    toneTag: 'neutral',
    statAffinity: { constitution: 1.1 },
    notes: 'Grown and raised in a corporate or independent facility. "Siblings" are other vat-prints from the same batch — relationships vary widely.',
  },

  // ── NON-TRADITIONAL ───────────────────────────────────────────────────────
  {
    id: 'crew_family',
    label: 'Ship crew — raised aboard',
    parentCount: 0,
    siblingCount: [2, 4],
    toneTag: 'neutral',
    statAffinity: { constitution: 1.2, charisma: 1.1 },
    notes: 'Parents absent or the concept didn\'t apply. A ship crew raised them — adults rotating in and out, loyalty forged by proximity and necessity.',
  },
  {
    id: 'multigenerational',
    label: 'Multigenerational household',
    parentCount: 2,
    siblingCount: [1, 3],
    toneTag: 'cozy',
    statAffinity: { wisdom: 1.2, charisma: 1.1 },
    notes: 'Extended family, multiple generations under one hab or close by. Loud, warm, complicated, hard to leave.',
  },
  {
    id: 'commune_collective',
    label: 'Collective or commune upbringing',
    parentCount: 0,
    siblingCount: [2, 5],
    toneTag: 'neutral',
    statAffinity: { constitution: 1.1, charisma: 1.1 },
    economicHint: -1,
    notes: 'Raised in a communal settlement — anti-corp, frontier, or ideological. The outside world was always "other".',
  },
  {
    id: 'estranged_all',
    label: 'Estranged from everyone — chose to be',
    parentCount: 0,
    siblingCount: [0, 1],
    toneTag: 'dramatic',
    statAffinity: { wisdom: 1.2, constitution: 1.1 },
    notes: 'Family exists but has been deliberately severed. The reasons are real and are not discussed.',
  },
];
