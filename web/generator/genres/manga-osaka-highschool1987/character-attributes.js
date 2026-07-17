// genres/manga-osaka-highschool1987/character-attributes.js

export { GENDERS }       from '../../common/genders.js';
export { ORIENTATIONS }  from '../../common/orientations.js';
export { BUILDS }        from '../../common/build.js';
export { RACES }         from './races.js';

// ── HAIR ──────────────────────────────────────────────────────────────────
// 1987 Osaka — perms, pompadours, chapatsu, scrunchies, the whole era

export const HAIR = [
  'straight black hair cut blunt at the collar, ruler-straight bangs',
  'permed hair in thick spirals, still smelling faintly of the salon',
  'long straight dark hair in a high ponytail with a scrunchie',
  'bleached chapatsu tips on naturally black hair, half-grown out',
  'heavy pompadour stiffened with pomade — a deliberate statement',
  'tidy bowl cut that somehow always looks exactly right',
  'straight black hair worn loose to the chin, center-parted',
  'teased-out feathered bangs that take serious maintenance',
  'close-cropped natural style, no product needed',
  'long dark hair in two neat plaits with white ribbon ties',
  'shaggy overgrown fringe half-covering the eyes — on purpose',
  'slicked-back undercut that looks two years too mature',
];

// ── DISTINGUISHING FEATURES ───────────────────────────────────────────────

export const DISTINGUISHING_FEATURES = [
  { id: 'strong_eyebrows',   label: 'thick, strong eyebrows that telegraph every mood without permission'                                                    },
  { id: 'chin_scar',         label: 'a thin scar across the chin — they say it was a bicycle accident; their eyes say otherwise'                             },
  { id: 'deep_tan',          label: 'a deep outdoor tan that marks someone who does not spend lunch inside'                                                   },
  { id: 'bandaged_knuckles', label: 'knuckles that are always lightly bandaged — someone asks, they just shrug'                                              },
  { id: 'ink_stained',       label: 'fingertips permanently ink-stained — manga panels, study notes, or both'                                               },
  { id: 'sport_calluses',    label: 'heavy calluses on both palms from ten thousand practice swings or throws'                                               },
  { id: 'thick_glasses',     label: 'thick-framed glasses that have been repaired at least once with tape'                                                   },
  { id: 'crooked_tooth',     label: 'one front tooth slightly crooked — gives the smile a specific kind of charm'                                            },
  { id: 'forearm_scar',      label: 'a long faded scar along the forearm — souvenir of a slide into home plate, or something else they don\'t discuss'     },
  { id: 'wide_eyes',         label: 'eyes that are just slightly too large for their face — manga characters look like this'                                 },
  { id: 'enamel_pin',        label: 'always wears an enamel pin or badge that means something specific to exactly the right people'                          },
  { id: 'paint_stained',     label: 'faint paint or clay always visible on the wrists and forearms, no matter how hard they scrub'                          },
  { id: 'none',              label: null },
  { id: 'none2',             label: null },
];

// ── QUIRKS ────────────────────────────────────────────────────────────────

export const QUIRKS = [

  // ── ACADEMIC & STUDIOUS ───────────────────────────────────────────────────
  {
    id: 'checks_clock',
    quirk: 'Glances at the clock during every conversation as if already calculating when it ends — not rude, just perpetually scheduled',
    statAffinity: { intelligence: 1.3, wisdom: 1.1 },
  },
  {
    id: 'mutters_answers',
    quirk: 'Mutters the correct answer under their breath while someone else gives the wrong one — quietly, but not quietly enough',
    statAffinity: { intelligence: 1.4, charisma: 0.9 },
  },
  {
    id: 'draws_margins',
    quirk: 'Fills every textbook margin with small precise drawings — battle scenes, robots, faces from memory — the textbooks look like manga originals',
    statAffinity: { dexterity: 1.2, intelligence: 1.2 },
  },
  {
    id: 'manga_analogies',
    quirk: 'Explains every real-world situation using a manga or anime analogy — usually accurate, which somehow makes it worse',
    statAffinity: { intelligence: 1.3, charisma: 1.1 },
  },

  // ── SOCIAL & EMOTIONAL ────────────────────────────────────────────────────
  {
    id: 'osaka_slip',
    quirk: 'Slips into full Osaka-ben when surprised, flustered, or genuinely angry — the rest of the time speaks standard Japanese with deliberate effort',
    statAffinity: { charisma: 1.2, wisdom: 0.9 },
  },
  {
    id: 'enters_last',
    quirk: 'Always enters a room last, sits nearest the door, and leaves first — people notice after about a week that this is deliberate',
    statAffinity: { wisdom: 1.2, charisma: 0.9 },
  },
  {
    id: 'over_apologises',
    quirk: 'Apologizes reflexively for things that are not their fault, then apologizes for apologizing — genuinely working on it',
    statAffinity: { charisma: 1.1, constitution: 0.9 },
  },
  {
    id: 'says_exactly',
    quirk: 'Says exactly what they think, immediately, with no apparent awareness that this is unusual — generates a lot of interesting situations',
    statAffinity: { charisma: 1.3, wisdom: 0.8 },
  },
  {
    id: 'competes_everything',
    quirk: 'Cannot help turning anything into a competition — lunch speed, umbrella folding, staircase time — usually wins, which is the problem',
    statAffinity: { strength: 1.2, charisma: 1.1 },
  },

  // ── PHYSICAL & HABITUAL ───────────────────────────────────────────────────
  {
    id: 'taps_boowy',
    quirk: 'Taps the drum intro to a Boøwy song on any available surface while thinking — does not seem to notice it happening',
    statAffinity: { dexterity: 1.2, charisma: 1.1 },
  },
  {
    id: 'always_eating',
    quirk: 'Always eating something — yakisoba bread, Boss coffee, convenience store onigiri — fuel for a schedule nobody else can fully see',
    statAffinity: { constitution: 1.3, strength: 1.1 },
  },
  {
    id: 'no_umbrella',
    quirk: 'Never carries an umbrella despite Osaka\'s rain — either extremely optimistic or working through something',
    statAffinity: { constitution: 1.2, wisdom: 0.9 },
  },
  {
    id: 'bikes_everywhere',
    quirk: 'Arrives everywhere slightly sweaty from cycling — changes the bicycle combination lock weekly and tells no one',
    statAffinity: { dexterity: 1.2, constitution: 1.1 },
  },

  // ── OBJECTS & RITUALS ─────────────────────────────────────────────────────
  {
    id: 'lucky_item',
    quirk: 'Carries a specific lucky item — a worn ¥10 coin, a key holder from a crane game, a folded piece of manga — and touches it before anything important',
    statAffinity: { wisdom: 1.2, charisma: 1.1 },
  },
  {
    id: 'private_notebook',
    quirk: 'Carries a small notebook and writes in it during any idle moment — has never shown it to anyone; gets visibly tense if someone reaches for it',
    statAffinity: { intelligence: 1.3, wisdom: 1.1 },
  },
  {
    id: 'walkman_always',
    quirk: 'Always has a cassette walkman on one hip, headphones around the neck — says the music helps concentration; the teachers have stopped arguing about it',
    statAffinity: { charisma: 1.2, dexterity: 1.1 },
  },
  {
    id: 'window_check',
    quirk: 'Checks their reflection in every window they pass — not vanity exactly; more like confirming they\'re still there',
    statAffinity: { charisma: 1.3, constitution: 0.9 },
  },
];
