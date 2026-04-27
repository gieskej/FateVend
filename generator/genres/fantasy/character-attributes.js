// genres/fantasy/character-attributes.js
// Identity and appearance for fantasy characters.
//
// Key differences from modern:
//   - RACES replaces ETHNICITIES — name pools are keyed by race
//   - Appearance descriptors are fantasy-flavored
//   - Quirks are shared with modern (behavioral tells are universal)
//     but with a few fantasy-specific additions
//   - Gender and orientation carry over unchanged

// ── GENDER ────────────────────────────────────────────────────────────────
export const GENDERS = [
  { id: 'man',         label: 'Man',        pronouns: 'he/him',   weight: 45 },
  { id: 'woman',       label: 'Woman',      pronouns: 'she/her',  weight: 45 },
  { id: 'non_binary',  label: 'Non-binary', pronouns: 'they/them',weight: 10 },
];

// ── ORIENTATION ───────────────────────────────────────────────────────────
export const ORIENTATIONS = [
  { id: 'straight',   label: 'Straight',      weight: 60 },
  { id: 'gay',        label: 'Gay / Lesbian',  weight: 12 },
  { id: 'bisexual',   label: 'Bisexual',       weight: 15 },
  { id: 'pansexual',  label: 'Pansexual',      weight: 8  },
  { id: 'asexual',    label: 'Asexual',        weight: 5  },
];

// ── RACES ─────────────────────────────────────────────────────────────────
// broad = the race label used for name pool lookup
// flavor = physical/cultural detail passed to Claude for description prose
// No stat affinities — race does not determine capability

export const RACES = [
  // Humans are the most common
  { id: 'human_common',   broad: 'Human',    flavor: 'common folk, unremarkable features, built for endurance',                                  weight: 30 },
  { id: 'human_noble',    broad: 'Human',    flavor: 'finer features suggesting distant noble blood — probably means nothing',                   weight: 10 },
  { id: 'human_frontier', broad: 'Human',    flavor: 'frontier stock — weathered, practical, the kind who fixes things',                         weight: 10 },

  // Elves
  { id: 'elf_high',      broad: 'Elf',       flavor: 'high elf — angular features, silver or gold hair, moves like they know they\'re watched',  weight: 6  },
  { id: 'elf_wood',      broad: 'Elf',       flavor: 'wood elf — lean, earth-toned, more comfortable in trees than taverns',                     weight: 6  },
  { id: 'elf_dark',      broad: 'Elf',       flavor: 'dark elf — obsidian skin, white hair, the kind of entrance that silences a room',          weight: 4  },
  { id: 'half_elf',      broad: 'Half-Elf',  flavor: 'half-elf — caught between worlds, slightly pointed ears, perpetually underestimated',      weight: 8  },

  // Dwarves
  { id: 'dwarf_hill',    broad: 'Dwarf',     flavor: 'hill dwarf — stocky, braided beard, smells faintly of forge smoke and ale',                weight: 6  },
  { id: 'dwarf_mountain', broad: 'Dwarf',    flavor: 'mountain dwarf — dense as granite, twice as stubborn, eyes that never miss a flaw',        weight: 4  },

  // Halflings
  { id: 'halfling',      broad: 'Halfling',  flavor: 'halfling — barely reaches most people\'s chests, mistaken for a child once a week',         weight: 5  },

  // Orcs / Half-Orcs
  { id: 'half_orc',      broad: 'Half-Orc',  flavor: 'half-orc — grey-green skin, tusks they may or may not hide, stronger than they look',      weight: 5  },
  { id: 'orc',           broad: 'Orc',       flavor: 'full orc — imposing, scarred, carries a reputation into every room before they do',        weight: 3  },

  // Tiefling
  { id: 'tiefling',      broad: 'Tiefling',  flavor: 'tiefling — small horns, unusual skin tone, tail they\'ve learned to tuck away or flaunt',   weight: 4  },

  // Dragonborn
  { id: 'dragonborn',    broad: 'Dragonborn', flavor: 'dragonborn — scaled, proud, occasionally breathes something alarming when startled',       weight: 3  },

  // Gnome
  { id: 'gnome',         broad: 'Gnome',     flavor: 'gnome — small, bright-eyed, the most dangerous person in the room to underestimate',       weight: 3  },

  // Aasimar
  { id: 'aasimar',       broad: 'Aasimar',   flavor: 'aasimar — faint luminescence, striking eyes, the weight of divine attention they didn\'t ask for', weight: 3 },
];

// ── APPEARANCE BUILDS ──────────────────────────────────────────────────────
export const BUILDS = [
  { label: 'lean and wiry',           statAffinity: { constitution: 0.9, dexterity: 1.3 } },
  { label: 'average build',           statAffinity: {} },
  { label: 'stocky and solid',        statAffinity: { strength: 1.2, constitution: 1.2 } },
  { label: 'powerfully built',        statAffinity: { strength: 1.5, constitution: 1.2 } },
  { label: 'heavyset',                statAffinity: { constitution: 1.2, strength: 1.1 } },
  { label: 'tall and rangy',          statAffinity: { dexterity: 1.1 } },
  { label: 'compact and low to the ground', statAffinity: {} },
  { label: 'thin, underfed-looking',  statAffinity: { constitution: 0.7, wisdom: 1.1 } },
  { label: 'broad-shouldered, soldier-built', statAffinity: { strength: 1.4, constitution: 1.1 } },
];

// ── HAIR ─────────────────────────────────────────────────────────────────
export const HAIR = [
  'close-cropped', 'roughly shorn', 'shaved',
  'long and braided', 'long and loose', 'pulled back in a knot',
  'wild and unkempt', 'short and dark', 'short and fair',
  'silver-streaked', 'always half-hidden by a hood',
  'matted, not by choice', 'impeccably kept despite everything',
];

// ── DISTINGUISHING FEATURES ───────────────────────────────────────────────
export const DISTINGUISHING_FEATURES = [
  { label: 'a sword scar across the jaw' },
  { label: 'missing two fingers on the left hand' },
  { label: 'a brand or tattoo they don\'t explain' },
  { label: 'eyes that are two different colors' },
  { label: 'a nose that\'s been broken at least twice' },
  { label: 'calloused hands that tell the whole story' },
  { label: 'a limp they\'ve long since stopped apologising for' },
  { label: 'a scar that crosses one eye — the eye still works, somehow' },
  { label: 'ritual scarring across the cheeks' },
  { label: 'teeth filed to points' },
  { label: 'ink from a culture not their own' },
  { label: 'burns along one forearm — old, not recent' },
  { label: 'an old collar scar they keep covered' },
  { label: 'moves with a fighter\'s economy even when relaxed' },
  { label: 'always impeccably clean — unnervingly so given their life' },
];

// ── QUIRKS ───────────────────────────────────────────────────────────────
// Mostly shared with modern — behavioral tells are universal.
// A few fantasy-specific additions at the end.
export const QUIRKS = [
  { quirk: 'Cracks their knuckles before anything they consider important',                                statAffinity: { strength: 1.2, constitution: 1.1 } },
  { quirk: 'Always arrives early and becomes visibly agitated if forced to wait',                         statAffinity: { wisdom: 1.2, intelligence: 1.1 } },
  { quirk: 'Over-explains things when nervous — can\'t stop once they\'ve started',                       statAffinity: { intelligence: 1.2, charisma: 0.9 } },
  { quirk: 'Never sits with their back to the door',                                                      statAffinity: { wisdom: 1.2, constitution: 1.1 } },
  { quirk: 'Silently counts things in stressful situations — steps, stones, candles',                    statAffinity: { intelligence: 1.3, wisdom: 0.9 } },
  { quirk: 'Covers their mouth when they lie — even small lies',                                          statAffinity: { charisma: 1.1, wisdom: 0.8 } },
  { quirk: 'Always in motion — tapping, pacing, fidgeting — goes completely still only when danger is near', statAffinity: { dexterity: 1.2, constitution: 1.1 } },
  { quirk: 'Pauses for an uncomfortably long time before answering any direct question',                  statAffinity: { wisdom: 1.3, intelligence: 1.1 } },
  { quirk: 'Never says sorry — substitutes action for apology every time',                               statAffinity: { strength: 1.2, charisma: 0.9 } },
  { quirk: 'Mutters to themselves while thinking — doesn\'t notice they\'re doing it',                   statAffinity: { intelligence: 1.3, wisdom: 1.1 } },
  { quirk: 'Deflects anything serious with a joke — the worse the moment, the funnier the deflection',   statAffinity: { charisma: 1.3, wisdom: 0.9 } },
  { quirk: 'Remembers exactly what everyone ordered or drank at their first meeting — years later',       statAffinity: { charisma: 1.3, intelligence: 1.2 } },
  { quirk: 'Can\'t leave an argument without getting the last word — even if it costs them',             statAffinity: { strength: 1.1, wisdom: 0.8 } },
  { quirk: 'Gives away things they can\'t afford to — food, coin, their last torch',                    statAffinity: { charisma: 1.2, wisdom: 0.8 } },
  { quirk: 'Clocks every exit the moment they enter a room',                                              statAffinity: { wisdom: 1.2, constitution: 1.2 } },
  { quirk: 'Carries one small object that has no practical use — never explains it',                      statAffinity: { wisdom: 1.2, charisma: 1.1 } },
  { quirk: 'Laughs at the wrong moments — deaths, confessions, bad news',                               statAffinity: { constitution: 1.1, wisdom: 0.8 } },
  { quirk: 'Can fall asleep anywhere, instantly — a skill born from necessity',                          statAffinity: { constitution: 1.3, strength: 1.1 } },
  { quirk: 'Flinches at sudden movement on their left side — never mentions it',                         statAffinity: { constitution: 0.9, strength: 1.1 } },
  // Fantasy-specific
  { quirk: 'Checks their weapon\'s edge obsessively — even mid-conversation',                            statAffinity: { dexterity: 1.3, strength: 1.1 } },
  { quirk: 'Refuses to sleep indoors if they can possibly avoid it',                                      statAffinity: { wisdom: 1.2, constitution: 1.2 } },
  { quirk: 'Mutters a quiet prayer before eating — even tavern slop that doesn\'t deserve one',          statAffinity: { wisdom: 1.3 } },
  { quirk: 'Has a deeply specific hatred of a particular monster — brings it up unprompted',             statAffinity: { strength: 1.2, wisdom: 1.1 } },
  { quirk: 'Compulsively maps new spaces — scratches diagrams in dirt or parchment margin',              statAffinity: { intelligence: 1.3, dexterity: 1.1 } },
  { quirk: 'Always knows which direction is north — insists on orienting everyone else, whether they asked or not', statAffinity: { wisdom: 1.3, intelligence: 1.1 } },
  { quirk: 'Tastes unfamiliar liquids before identifying them — has not died yet',                       statAffinity: { constitution: 1.3, wisdom: 0.8 } },
  { quirk: 'Apologises to objects they damage — doors, walls, unfortunate furniture',                    statAffinity: { wisdom: 1.2, charisma: 1.1 } },
];
