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
    id: 'na',
    label: 'N/A — synthetic origin',
    toneTag: 'neutral',
    iconPrompt: 'sci-fi rpg icon, android chassis on a factory assembly line, no family, no parents, manufactured not born, cold industrial lighting, wide shot, digital art',
    iconPath: 'generator/genres/sci-fi/icons/PARENT_STATUSES#na.webp'
  },
  {
    id: 'present_close',
    label: 'present and close',
    toneTag: 'cozy',
    iconPrompt: 'sci-fi rpg icon, small hab unit interior, parent and grown child at meal table, comm devices set aside, relaxed warm expressions, practical near-future decor, warm overhead lighting, medium two-shot, digital art',
    iconPath: 'generator/genres/sci-fi/icons/PARENT_STATUSES#present_close.webp'
  },
  {
    id: 'present_distant',
    label: 'present but emotionally distant',
    toneTag: 'neutral',
    iconPrompt: 'sci-fi rpg icon, hab unit living space, parent focused on wall screen, grown child staring at ceiling, both on same couch, cold distance between them, blue screen glow, uncomfortable postures, medium shot, digital art',
    iconPath: 'generator/genres/sci-fi/icons/PARENT_STATUSES#present_distant.webp'
  },
  {
    id: 'present_difficult',
    label: 'present but a source of tension',
    toneTag: 'dramatic',
    iconPrompt: 'sci-fi rpg icon, hab corridor or living space, parent and grown child in coveralls facing each other, tense arguing posture, pointing gestures, frustrated expressions, neutral corp lighting, medium two-shot, digital art',
    iconPath: 'generator/genres/sci-fi/icons/PARENT_STATUSES#present_difficult.webp'
  },
  {
    id: 'estranged',
    label: 'estranged — no contact',
    toneTag: 'dramatic',
    iconPrompt: 'sci-fi rpg icon, old man sitting in private hab room holding a faded photo of a boy, digital art',
    iconPath: 'generator/genres/sci-fi/icons/PARENT_STATUSES#estranged.webp'
  },
  {
    id: 'deceased_recent',
    label: 'recently deceased',
    toneTag: 'dramatic',
    iconPrompt: 'sci-fi rpg icon, fresh grave, tombstone for "FATHER" in a cemetery, dirt, digital art',
    iconPath: 'generator/genres/sci-fi/icons/PARENT_STATUSES#deceased_recent.webp'
  },
  {
    id: 'deceased_long',
    label: 'died when the character was young',
    toneTag: 'gritty',
    iconPrompt: 'sci-fi rpg icon, moss covered tombstone for "FATHER" in a cemetery, unkempt, digital art',
    iconPath: 'generator/genres/sci-fi/icons/PARENT_STATUSES#deceased_long.webp'
  },
  {
    id: 'absent_unknown',
    label: 'absent — never knew them',
    toneTag: 'gritty',
    iconPrompt: 'sci-fi rpg icon, portrait of family with two children, one parent is faceless, digital art',
    iconPath: 'generator/genres/sci-fi/icons/PARENT_STATUSES#absent_unknown.webp'
  },
  {
    id: 'corp_detained',
    label: 'detained by a megacorporation',
    toneTag: 'gritty',
    iconPrompt: 'draw sci-fi rpg icon, prison visit, adult man in gray prison uniform separated from woman behind glass wall, touching glass wall, tears, clinical white fluorescent lighting, medium two-shot, digital art',
    iconPath: 'generator/genres/sci-fi/icons/PARENT_STATUSES#corp_detained.webp'
  },
  {
    id: 'missing',
    label: 'missing — no confirmed status',
    toneTag: 'dramatic',
    iconPrompt: 'sci-fi rpg icon, public network terminal, missing person case file on screen, photo and case ID visible, status open, figure reading screen, concerned expression, blue screen glow on face, medium close-up, digital art',
    iconPath: 'generator/genres/sci-fi/icons/PARENT_STATUSES#missing.webp'
  },
];

export const SIBLING_DYNAMICS = [
  {
    id: 'na',
    label: 'N/A — no biological siblings',
    toneTag: 'neutral',
    iconPrompt: 'sci-fi rpg icon, single android unit standing alone in an empty factory bay, no companions, manufactured alone, cold industrial lighting, wide shot, digital art',
    iconPath: 'generator/genres/sci-fi/icons/SIBLING_DYNAMICS#na.webp'
  },
  {
    id: 'protective_older',
    label: 'protective older sibling',
    toneTag: 'cozy',
    iconPrompt: 'sci-fi rpg icon, space station corridor, older sibling in tactical vest arm out blocking younger sibling behind them, confrontational stance toward off-frame threat, protective posture, neon corridor lighting, medium shot, digital art',
    iconPath: 'generator/genres/sci-fi/icons/SIBLING_DYNAMICS#protective_older.webp'
  },
  {
    id: 'rivalry',
    label: 'long-running rivalry',
    toneTag: 'dramatic',
    iconPrompt: 'sci-fi rpg icon, narrow station corridor, two siblings in corp uniforms facing each other, one with promotion badge, other with arms crossed, competitive tense expressions, fluorescent lighting, medium two-shot, digital art',
    iconPath: 'generator/genres/sci-fi/icons/SIBLING_DYNAMICS#rivalry.webp'
  },
  {
    id: 'estranged',
    label: 'estranged — fell out years ago',
    toneTag: 'dramatic',
    iconPrompt: 'sci-fi rpg icon, man sitting in private hab room holding a faded photo of two boys, digital art',
    iconPath: 'generator/genres/sci-fi/icons/SIBLING_DYNAMICS#estranged.webp'
  },
  {
    id: 'close_ally',
    label: 'closest friend and confidant',
    toneTag: 'cozy',
    iconPrompt: 'sci-fi rpg icon, split-screen video call, two siblings in different settings, relaxed happy expressions, casual animated conversation, warm screen light on each face, medium two-shot split-screen, digital art',
    iconPath: 'generator/genres/sci-fi/icons/SIBLING_DYNAMICS#close_ally.webp'
  },
  {
    id: 'troubled',
    label: 'you two never saw eye to eye',
    toneTag: 'gritty',
    iconPrompt: 'sci-fi rpg icon, hab unit bedroom, two child fighting, frustrated expressions, corridor lighting, close two-shot, realistic, digital art',
    iconPath: 'generator/genres/sci-fi/icons/SIBLING_DYNAMICS#troubled.webp'
  },
  {
    id: 'golden_child',
    label: 'the family\'s golden child — hard to live up to',
    toneTag: 'dramatic',
    iconPrompt: 'family photo with two parents and two children.  One child circled in red ink with "favorite child" written above. sci-fi rpg icon, digital art',
    iconPath: 'generator/genres/sci-fi/icons/SIBLING_DYNAMICS#golden_child.webp'
  },
  {
    id: 'lost_touch',
    label: 'drifted apart, rarely speak',
    toneTag: 'neutral',
    iconPrompt: 'A fake phone screenshot of a text message app showing "Hey bro, you still alive?", sci-fi rpg icon, digital art',
    iconPath: 'generator/genres/sci-fi/icons/SIBLING_DYNAMICS#lost_touch.webp'
  },
  {
    id: 'deceased',
    label: 'deceased',
    toneTag: 'gritty',
    iconPrompt: 'sci-fi rpg icon, fresh grave, tombstone for "SISTER" in a cemetery, dirt',
    iconPath: 'generator/genres/sci-fi/icons/SIBLING_DYNAMICS#deceased.webp'
  },
  {
    id: 'younger_dependent',
    label: 'younger and still depends on the character',
    toneTag: 'neutral',
    iconPrompt: 'teenager pouring water into a child\'s cup, star field visible through window in background, realistic, sci-fi rpg icon, hab unit,  digital art',
    iconPath: 'generator/genres/sci-fi/icons/SIBLING_DYNAMICS#younger_dependent.webp'
  },
  {
    id: 'reconnecting',
    label: 'recently reconnected after years apart',
    toneTag: 'neutral',
    iconPrompt: 'sci-fi rpg icon, station café or cantina, two siblings in utilitarian clothing at small table, cautious hopeful expressions, drinks between them, leaning toward each other, warm ambient light, medium two-shot, digital art',
    iconPath: 'generator/genres/sci-fi/icons/SIBLING_DYNAMICS#reconnecting.webp'
  },
];

// Family structure templates.
// siblingCount: [min, max] — resolved at generation time.
// parentCount: 0, 1, or 2 — determines which parent slots are filled.
export const FAMILY_STRUCTURES = [

  // ── SYNTHETIC ORIGIN (android species only) ───────────────────────────────
  {
    id: 'android_origin',
    label: 'N/A — synthetic construct',
    parentCount: 0,
    siblingCount: [0, 0],
    toneTag: 'neutral',
    notes: 'Manufactured, not born. No biological family. No parents. No siblings. The concept does not apply.',
    iconPrompt: 'sci-fi rpg icon, android emerging from a manufacturing pod, factory floor, no family present, cold blue industrial lighting, medium shot, digital art',
    iconPath: 'generator/genres/sci-fi/icons/FAMILY_STRUCTURES#vat_born.webp'
  },

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
    iconPath: 'generator/genres/sci-fi/icons/FAMILY_STRUCTURES#biological_intact.webp'
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
    iconPath: 'generator/genres/sci-fi/icons/FAMILY_STRUCTURES#single_parent.webp'
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
    iconPath: 'generator/genres/sci-fi/icons/FAMILY_STRUCTURES#two_parent_one_deceased.webp'
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
    iconPath: 'generator/genres/sci-fi/icons/FAMILY_STRUCTURES#corp_foster.webp'
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
    iconPath: 'generator/genres/sci-fi/icons/FAMILY_STRUCTURES#orphan_station.webp'
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
    iconPath: 'generator/genres/sci-fi/icons/FAMILY_STRUCTURES#vat_born.webp'
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
    iconPath: 'generator/genres/sci-fi/icons/FAMILY_STRUCTURES#crew_family.webp'
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
    iconPath: 'generator/genres/sci-fi/icons/FAMILY_STRUCTURES#multigenerational.webp'
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
    iconPath: 'generator/genres/sci-fi/icons/FAMILY_STRUCTURES#commune_collective.webp'
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
    iconPath: 'generator/genres/sci-fi/icons/FAMILY_STRUCTURES#estranged_all.webp'
  },
];
