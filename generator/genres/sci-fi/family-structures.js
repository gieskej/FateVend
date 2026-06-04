// genres/sci-fi/family-structures.js
// Family composition is randomized per character.
// The generator picks one STRUCTURE, then resolves each member's status.
//
// Structure shape:
//   id, label, parentCount, siblingCount [min, max],
//   statAffinity (optional), toneTag (gritty | dramatic | neutral | cozy),
//   economicHint (optional), notes, iconPrompt, iconPath

export const PARENT_STATUSES = [
  { 
    id: 'present_close',
    label: 'present and close',
    toneTag: 'cozy',
    iconPrompt: 'A parent and child in a cozy home, sharing a moment together.',
    iconPath: 'icons/PARENT_STATUSES#1#present_close.png' 
  },
  { 
    id: 'present_distant',
    label: 'present but emotionally distant',
    toneTag: 'neutral',
    iconPrompt: 'A parent and child eating dinner looking down at their phones.',
    iconPath: 'icons/PARENT_STATUSES#2#present_distant.png' 
  },
  { 
    id: 'present_difficult',
    label: 'present but a source of tension',
    toneTag: 'dramatic',
    iconPrompt: 'A mother and daughter arguing in a tense home moment.',
    iconPath: 'icons/PARENT_STATUSES#3#present_difficult.png' 
  },
  { 
    id: 'estranged',
    label: 'estranged — no contact',
    toneTag: 'dramatic',
    iconPrompt: 'A lonely man on sidewalk staring at a house from across the street.',
    iconPath: 'icons/PARENT_STATUSES#4#estranged.png' 
  },
  { 
    id: 'deceased_recent',
    label: 'recently deceased',
    toneTag: 'dramatic',
    iconPrompt: 'A cardboard box of used men\'s shoes sitting by the door.',
    iconPath: 'icons/PARENT_STATUSES#5#deceased_recent.png' 
  },
  { 
    id: 'deceased_long',
    label: 'died when the character was young',
    toneTag: 'gritty',
    iconPrompt: 'A black and white photo of a father in a frame with a black ribbon tied around it.',
    iconPath: 'icons/PARENT_STATUSES#6#deceased_long.png' 
  },
  { 
    id: 'absent_unknown',
    label: 'absent — never knew them',
    toneTag: 'gritty',
    iconPrompt: 'A torn blurry photo of a man holding a baby.',
    iconPath: 'icons/PARENT_STATUSES#7#absent_unknown.png' 
  },
  { 
    id: 'corp_detained',
    label: 'detained by a megacorporation',
    toneTag: 'gritty',
    iconPrompt: 'A man in a prison cell.',
    iconPath: 'icons/PARENT_STATUSES#8#corp_detained.png' 
  },
  { 
    id: 'missing',
    label: 'missing — no confirmed status',
    toneTag: 'dramatic',
    iconPrompt: 'A lost person poster with a photo of a man.',
    iconPath: 'icons/PARENT_STATUSES#9#missing.png' 
  },
];

export const SIBLING_DYNAMICS = [
  { 
    id: 'protective_older',
    label: 'protective older sibling',
    toneTag: 'cozy',
    iconPrompt: 'A protective older sibling hugging a younger sibling.',
    iconPath: 'icons/SIBLING_DYNAMICS#1#protective_older.png' 
  },
  { 
    id: 'rivalry',
    label: 'long-running rivalry',
    toneTag: 'dramatic',
    iconPrompt: 'Two siblings arguing in a tense moment.',
    iconPath: 'icons/SIBLING_DYNAMICS#2#rivalry.png' 
  },
  { 
    id: 'estranged',
    label: 'estranged — fell out years ago',
    toneTag: 'dramatic',
    iconPrompt: 'Two estranged siblings standing awkwardly in a room.',
    iconPath: 'icons/SIBLING_DYNAMICS#3#estranged.png' 
  },
  { 
    id: 'close_ally',
    label: 'closest friend and confidant',
    toneTag: 'cozy',
    iconPrompt: 'Two siblings sharing a moment of trust and support.',
    iconPath: 'icons/SIBLING_DYNAMICS#4#close_ally.png' 
  },
  { 
    id: 'troubled',
    label: 'deep in corp debt or running from something',
    toneTag: 'gritty',
    iconPrompt: 'A troubled sibling looking worried while talking to another sibling.',
    iconPath: 'icons/SIBLING_DYNAMICS#5#troubled.png' 
  },
  { 
    id: 'golden_child',
    label: 'the family\'s golden child — hard to live up to',
    toneTag: 'dramatic',
    iconPrompt: 'A golden child sibling standing apart from others, feeling pressure.',
    iconPath: 'icons/SIBLING_DYNAMICS#6#golden_child.png' 
  },
  { 
    id: 'lost_touch',
    label: 'drifted apart, rarely speak',
    toneTag: 'neutral',
    iconPrompt: 'Two siblings standing at a distance from each other, not speaking.',
    iconPath: 'icons/SIBLING_DYNAMICS#7#lost_touch.png' 
  },
  { 
    id: 'deceased',
    label: 'deceased',
    toneTag: 'gritty',
    iconPrompt: 'A black and white photo of a sibling in a frame with a black ribbon tied around it.',
    iconPath: 'icons/SIBLING_DYNAMICS#8#deceased.png' 
  },
  { 
    id: 'younger_dependent',
    label: 'younger and still depends on the character',
    toneTag: 'neutral',
    iconPrompt: 'A younger sibling looking up to an older sibling for support.',
    iconPath: 'icons/SIBLING_DYNAMICS#9#younger_dependent.png' 
  },
  { 
    id: 'reconnecting',
    label: 'recently reconnected after years apart',
    toneTag: 'neutral',
    iconPrompt: 'Two siblings embracing after a long time apart.',
    iconPath: 'icons/SIBLING_DYNAMICS#10#reconnecting.png' 
  },
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
    iconPrompt: 'A happy family with two parents and children in a cozy home.',
    iconPath: 'icons/FAMILY_STRUCTURES#1#biological_intact.png'
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
    iconPrompt: 'A single parent with children in a modest home.',
    iconPath: 'icons/FAMILY_STRUCTURES#2#single_parent.png'
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
    iconPrompt: 'A family with one parent and children, one parent deceased.',
    iconPath: 'icons/FAMILY_STRUCTURES#3#two_parent_one_deceased.png'
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
    iconPrompt: 'A corporate foster family with assigned parents and children.',
    iconPath: 'icons/FAMILY_STRUCTURES#4#corp_foster.png'
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
    iconPrompt: 'A station orphan with children in a modest home.',
    iconPath: 'icons/FAMILY_STRUCTURES#5#orphan_station.png'
  },
  {
    id: 'vat_born',
    label: 'Vat-born — facility-raised',
    parentCount: 0,
    siblingCount: [0, 6],
    toneTag: 'neutral',
    statAffinity: { constitution: 1.1 },
    notes: 'Grown and raised in a corporate or independent facility. "Siblings" are other vat-prints from the same batch — relationships vary widely.',
    iconPrompt: 'A vat-born character with other vat-prints from the same batch.',
    iconPath: 'icons/FAMILY_STRUCTURES#6#vat_born.png'
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
    iconPrompt: 'A ship crew with children raised aboard.',
    iconPath: 'icons/FAMILY_STRUCTURES#7#crew_family.png'
  },
  {
    id: 'multigenerational',
    label: 'Multigenerational household',
    parentCount: 2,
    siblingCount: [1, 3],
    toneTag: 'cozy',
    statAffinity: { wisdom: 1.2, charisma: 1.1 },
    notes: 'Extended family, multiple generations under one hab or close by. Loud, warm, complicated, hard to leave.',
    iconPrompt: 'A multigenerational family with parents and children in a cozy home.',
    iconPath: 'icons/FAMILY_STRUCTURES#8#multigenerational.png'
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
    iconPrompt: 'A collective or commune with children.',
    iconPath: 'icons/FAMILY_STRUCTURES#9#commune_collective.png'
  },
  {
    id: 'estranged_all',
    label: 'Estranged from everyone — chose to be',
    parentCount: 0,
    siblingCount: [0, 1],
    toneTag: 'dramatic',
    statAffinity: { wisdom: 1.2, constitution: 1.1 },
    notes: 'Family exists but has been deliberately severed. The reasons are real and are not discussed.',
    iconPrompt: 'A character who is estranged from their family.',
    iconPath: 'icons/FAMILY_STRUCTURES#10#estranged_all.png'
  },
];
