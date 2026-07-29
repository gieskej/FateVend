// genres/manga-osaka-highschool1987/family-structures.js
// Japanese family dynamics, 1987 Osaka. Family composition is randomized per
// character; the generator picks one FAMILY_STRUCTURES entry, then resolves
// each parent's status independently.
//
// PARENT_STATUSES / SIBLING_DYNAMICS entries: id, label, toneTag, iconPrompt,
// iconPath. SIBLING_DYNAMICS entries may also carry:
//   impliesNonTeenSibling — optional; when true, signals this dynamic
//     describes a sibling who isn't a same-generation, currently-in-school
//     teen (e.g. already moved out for university/work, or too young to be
//     in high school yet). engine.js's buildCast() uses this to decide
//     whether a sibling should share the protagonist's own clique race or
//     get the genre's FAMILY_RACE instead — see races.js's FAMILY_RACE doc.
//     Omit (or false) when the dynamic still plausibly describes a fellow
//     student, which keeps today's behavior (clique inherited from the
//     protagonist).
//
// FAMILY_STRUCTURES entries:
//   id, label            — identity + display label
//   parentCount          — 0, 1, or 2 — determines which parent slots are filled
//   siblingCount         — [min, max], resolved at generation time
//   parentGender         — optional; forces 'mother'/'father' for a 1-parent structure
//   toneTag              — gritty | dramatic | cozy | neutral
//   statAffinity         — optional stat-weighted selection bias
//   economicHint         — optional tier shift suggestion
//   notes                — internal note on what this structure represents
//   iconPrompt, iconPath — slot-machine reel icon

export const PARENT_STATUSES = [
  {
    id: "salaryman_present_close",
    label: "salaryman father, present and close — rare",
    toneTag: "cozy",
    iconPrompt:
      "japanese salaryman father 1987 home weekend with student child warm family moment manga illustration",
    iconPath:
      "generator/genres/manga-osaka-highschool1987/icons/PARENT_STATUSES#salaryman_present_close.webp",
  },
  {
    id: "salaryman_present_distant",
    label: "salaryman father, home late every night — present but absent",
    toneTag: "neutral",
    iconPrompt:
      "japanese salaryman father 1987 arriving home midnight child already asleep dark apartment manga illustration",
    iconPath:
      "generator/genres/manga-osaka-highschool1987/icons/PARENT_STATUSES#salaryman_present_distant.webp",
  },
  {
    id: "mother_homemaker_close",
    label: "mother at home, close and supportive",
    toneTag: "cozy",
    iconPrompt:
      "japanese mother homemaker 1987 kitchen waiting for student child home bento warm light manga illustration",
    iconPath:
      "generator/genres/manga-osaka-highschool1987/icons/PARENT_STATUSES#mother_homemaker_close.webp",
  },
  {
    id: "mother_working",
    label: "mother working long hours — supportive but stretched thin",
    toneTag: "neutral",
    iconPrompt:
      "japanese working mother 1987 grocery store clerk tired end of day thinking of home manga illustration",
    iconPath:
      "generator/genres/manga-osaka-highschool1987/icons/PARENT_STATUSES#mother_working.webp",
  },
  {
    id: "parent_deceased",
    label:
      "died when the character was young — memory and absence in equal measure",
    toneTag: "dramatic",
    iconPrompt:
      "japanese student 1987 holding worn photograph of deceased parent quiet bedroom manga illustration",
    iconPath:
      "generator/genres/manga-osaka-highschool1987/icons/PARENT_STATUSES#parent_deceased.webp",
  },
  {
    id: "parent_abroad",
    label: "stationed or working overseas — phone calls and rare visits",
    toneTag: "neutral",
    iconPrompt:
      "japanese student 1987 on telephone late night parent overseas call long distance manga illustration",
    iconPath:
      "generator/genres/manga-osaka-highschool1987/icons/PARENT_STATUSES#parent_abroad.webp",
  },
  {
    id: "parent_ill",
    label:
      "dealing with serious illness — the household has reorganized around it",
    toneTag: "dramatic",
    iconPrompt:
      "japanese student 1987 caring for ill parent hospital visit after school manga illustration",
    iconPath:
      "generator/genres/manga-osaka-highschool1987/icons/PARENT_STATUSES#parent_ill.webp",
  },
  {
    id: "parent_difficult",
    label:
      "present but a source of real tension — alcohol, pressure, or old anger",
    toneTag: "gritty",
    iconPrompt:
      "japanese student 1987 tense dinner table difficult father argument quiet stress manga illustration",
    iconPath:
      "generator/genres/manga-osaka-highschool1987/icons/PARENT_STATUSES#parent_difficult.webp",
  },
  {
    id: "parent_estranged",
    label: "left and has not been in contact — not deceased, just gone",
    toneTag: "gritty",
    iconPrompt:
      "japanese student 1987 empty chair at family dinner looking at door that never opens manga illustration",
    iconPath:
      "generator/genres/manga-osaka-highschool1987/icons/PARENT_STATUSES#parent_estranged.webp",
  },
];

export const SIBLING_DYNAMICS = [
  {
    id: "na",
    label: "no siblings — only child",
    toneTag: "neutral",
    iconPrompt:
      "japanese only child student 1987 alone room toys shelves solitary peaceful manga illustration",
    iconPath:
      "generator/genres/manga-osaka-highschool1987/icons/SIBLING_DYNAMICS#na.webp",
  },
  {
    id: "protective_older",
    label:
      "protective older sibling — has always been the one who solves things",
    toneTag: "cozy",
    iconPrompt:
      "japanese older sibling 1987 protective walking younger sibling home from school manga illustration",
    iconPath:
      "generator/genres/manga-osaka-highschool1987/icons/SIBLING_DYNAMICS#protective_older.webp",
  },
  {
    id: "rivalry",
    label: "sibling rivalry — comparison is constant and exhausting",
    toneTag: "dramatic",
    iconPrompt:
      "japanese siblings 1987 competitive test results compare scores tension family manga illustration",
    iconPath:
      "generator/genres/manga-osaka-highschool1987/icons/SIBLING_DYNAMICS#rivalry.webp",
  },
  {
    id: "close_ally",
    label:
      "closest ally — the only person in the family who actually understands",
    toneTag: "cozy",
    iconPrompt:
      "japanese siblings 1987 sharing secret laughing together bedroom close bond manga illustration",
    iconPath:
      "generator/genres/manga-osaka-highschool1987/icons/SIBLING_DYNAMICS#close_ally.webp",
  },
  {
    id: "older_left_home",
    label:
      "older sibling left for university or work — the younger one feels the absence",
    impliesNonTeenSibling: true,
    toneTag: "neutral",
    iconPrompt:
      "japanese student 1987 older sibling's empty room looking through doorway missing them manga illustration",
    iconPath:
      "generator/genres/manga-osaka-highschool1987/icons/SIBLING_DYNAMICS#older_left_home.webp",
  },
  {
    id: "younger_dependent",
    label: "younger sibling who looks up to them — and counts on them",
    impliesNonTeenSibling: true,
    toneTag: "neutral",
    iconPrompt:
      "japanese older student 1987 walking younger sibling to school hand-holding responsible manga illustration",
    iconPath:
      "generator/genres/manga-osaka-highschool1987/icons/SIBLING_DYNAMICS#younger_dependent.webp",
  },
  {
    id: "golden_child",
    label: "the family's golden child sibling — the comparisons never stop",
    toneTag: "dramatic",
    iconPrompt:
      "japanese family 1987 parents praising successful sibling other child sitting quietly manga illustration",
    iconPath:
      "generator/genres/manga-osaka-highschool1987/icons/SIBLING_DYNAMICS#golden_child.webp",
  },
  {
    id: "deceased",
    label: "deceased sibling — the loss quietly shapes everything",
    impliesNonTeenSibling: true,
    toneTag: "gritty",
    iconPrompt:
      "japanese student 1987 small framed photo of sibling on bedroom shelf candle quiet grief manga illustration",
    iconPath:
      "generator/genres/manga-osaka-highschool1987/icons/SIBLING_DYNAMICS#deceased.webp",
  },
];

export const FAMILY_STRUCTURES = [
  {
    id: "standard_nuclear",
    label: "Standard nuclear family — salaryman father, homemaker mother",
    parentCount: 2,
    siblingCount: [1, 3],
    toneTag: "cozy",
    statAffinity: { wisdom: 1.1, charisma: 1.1 },
    notes:
      "The 1987 norm. Father works late, mother runs the household, everyone studies.",
    iconPrompt:
      "japanese family 1987 dinner table salaryman father suit homemaker mother children school uniforms manga illustration",
    iconPath:
      "generator/genres/manga-osaka-highschool1987/icons/FAMILY_STRUCTURES#standard_nuclear.webp",
  },
  {
    id: "dual_income",
    label:
      "Both parents working — comfortable but the house is always slightly empty",
    parentCount: 2,
    siblingCount: [0, 2],
    toneTag: "neutral",
    statAffinity: { intelligence: 1.1, wisdom: 1.1 },
    notes: "Bubble economy prosperity. Character is often alone after school.",
    iconPrompt:
      "japanese student 1987 returning to empty apartment both parents still at work latchkey child manga illustration",
    iconPath:
      "generator/genres/manga-osaka-highschool1987/icons/FAMILY_STRUCTURES#dual_income.webp",
  },
  {
    id: "single_mother",
    label: "Single mother household — divorced or widowed",
    parentCount: 1,
    parentGender: "mother",
    siblingCount: [0, 2],
    toneTag: "neutral",
    statAffinity: { constitution: 1.2, wisdom: 1.1 },
    notes:
      "Divorce still unusual in 1987. Widow is more acceptable. Either way, character has taken on responsibility early.",
    iconPrompt:
      "japanese single mother 1987 working late night student doing homework waiting character mature manga illustration",
    iconPath:
      "generator/genres/manga-osaka-highschool1987/icons/FAMILY_STRUCTURES#single_mother.webp",
  },
  {
    id: "single_father",
    label: "Single father household — widower or rare divorce",
    parentCount: 1,
    parentGender: "father",
    siblingCount: [0, 2],
    toneTag: "neutral",
    statAffinity: { strength: 1.1, wisdom: 1.1 },
    notes:
      "Unusual in 1987. Father struggling with domestic life. Character has learned to be self-sufficient.",
    iconPrompt:
      "japanese single father 1987 awkwardly cooking for student child late evening trying hard manga illustration",
    iconPath:
      "generator/genres/manga-osaka-highschool1987/icons/FAMILY_STRUCTURES#single_father.webp",
  },
  {
    id: "extended_family",
    label: "Extended family household — grandparents under one roof",
    parentCount: 2,
    siblingCount: [0, 3],
    toneTag: "cozy",
    statAffinity: { wisdom: 1.2, charisma: 1.1 },
    notes:
      "Grandparents live in the house or next door. Three-generation household dynamics.",
    iconPrompt:
      "japanese three generation household 1987 grandparents parents student all at dinner table warm manga illustration",
    iconPath:
      "generator/genres/manga-osaka-highschool1987/icons/FAMILY_STRUCTURES#extended_family.webp",
  },
  {
    id: "grandparents_raising",
    label: "Raised by grandparents — parents abroad or absent",
    parentCount: 0,
    siblingCount: [0, 1],
    toneTag: "neutral",
    statAffinity: { wisdom: 1.2, charisma: 0.9 },
    notes:
      "Parents working overseas or absent. Grandparents are the primary caregivers — a generational gap in every conversation.",
    iconPrompt:
      "japanese grandparents 1987 raising grandchild helping with homework old tatami room warm light manga illustration",
    iconPath:
      "generator/genres/manga-osaka-highschool1987/icons/FAMILY_STRUCTURES#grandparents_raising.webp",
  },
  {
    id: "broken_home",
    label: "Troubled household — dysfunction under a maintained surface",
    parentCount: 2,
    siblingCount: [0, 2],
    toneTag: "gritty",
    statAffinity: { constitution: 1.2, wisdom: 0.9 },
    notes:
      "Both parents present but the household is not stable. Character has learned to be very self-sufficient.",
    iconPrompt:
      "japanese student 1987 tense quiet apartment household arguing muted parents child reading alone manga illustration",
    iconPath:
      "generator/genres/manga-osaka-highschool1987/icons/FAMILY_STRUCTURES#broken_home.webp",
  },
  {
    id: "boarding_student",
    label: "Living in a student boarding house — parents in another city",
    parentCount: 2,
    siblingCount: [0, 2],
    toneTag: "cozy",
    statAffinity: { constitution: 1.2, intelligence: 1.1 },
    notes:
      "Parents in Tokyo, Kyoto, or abroad. Character is nearly independent, which has advantages and complications.",
    iconPrompt:
      "japanese student boarding house 1987 small room shared meals other students after school manga illustration",
    iconPath:
      "generator/genres/manga-osaka-highschool1987/icons/FAMILY_STRUCTURES#boarding_student.webp",
  },
];
