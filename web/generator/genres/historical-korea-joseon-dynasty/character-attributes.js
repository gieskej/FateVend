// genres/historical-korea-joseon-dynasty/character-attributes.js

export { GENDERS }       from '../../common/genders.js';
export { ORIENTATIONS }  from '../../common/orientations.js';
export { BUILDS }        from '../../common/build.js';
export { RACES }         from './races.js';

// ── HAIR ──────────────────────────────────────────────────────────────────
// Joseon Dynasty — long hair, topknots, court styles, ritual shaving

export const HAIR = [
  'long hair bound in a neat topknot (sangtu), worn under a horsehair gat hat',
  'long oiled hair coiled high and pinned with ornate binyeo hairpins',
  'loosely braided hair falling forward, tied with a plain cloth cord',
  'head shaved smooth — the mark of a life given to the dharma',
  'long hair half-unbound, the warrior\'s knot still at the crown',
  'elaborate court chignon anchored with jade and gilt ornaments',
  'long dark hair braided and wrapped with silk ribbon at the hip',
  'rough topknot hastily bound — no gat, no ceremony, no apology',
  'hair rubbed with balsam-flower dye: a small deliberate act of defiance',
  'impeccably wound topknot, not a single strand out of order, ever',
];

// ── DISTINGUISHING FEATURES ───────────────────────────────────────────────

export const DISTINGUISHING_FEATURES = [
  { id: 'ink_fingers',        label: 'calligraphy ink permanently staining the right fingertips — not fully removable, no matter how hard they scrub'                                       },
  { id: 'duel_scar',          label: 'a thin scar crossing one cheekbone from a practice sword — they say practice; the angle says otherwise'                                               },
  { id: 'prayer_calluses',    label: 'deep smooth calluses on the knees from years of Buddhist prostration — visible even through thick cloth'                                              },
  { id: 'field_tan',          label: 'complexion bronzed unevenly from outdoor labor — the kind of tan that carries class information without a word'                                        },
  { id: 'court_posture',      label: 'posture so precisely correct it signals rank and training more clearly than any garment'                                                               },
  { id: 'covered_wrist',      label: 'a thin white scar along the wrist, always kept covered by the sleeve — never mentioned, never explained'                                              },
  { id: 'ironwork_hands',     label: 'hands roughened and scarred by ironwork, at odds with an otherwise refined bearing'                                                                   },
  { id: 'narrowed_eye',       label: 'one eye permanently and slightly narrowed from an old wound — watchful in a way that unsettles people at court'                                       },
  { id: 'clan_cheekbones',    label: 'pronounced cheekbones that identify them as clearly of one particular clan to anyone who knows it'                                                    },
  { id: 'court_stillness',    label: 'a quality of complete stillness when seated — the composure of someone long accustomed to being watched'                                              },
  { id: 'family_fold',        label: 'a specific manner of folding their hands when at rest — unconsciously identical to how their grandfather stood'                                       },
  { id: 'burn_forearms',      label: 'faint burn scars on the inner forearms — described differently each time someone asks'                                                               },
  { id: 'none',               label: null },
  { id: 'none2',              label: null },
];

// ── QUIRKS ────────────────────────────────────────────────────────────────

export const QUIRKS = [
  // ── SCHOLARLY ─────────────────────────────────────────────────────────────
  {
    id: 'classical_poetry',
    quirk: 'Recites classical Chinese poetry — Shijing, Du Fu, Wang Wei — under their breath when under pressure, not fully aware they\'re doing it',
    statAffinity: { intelligence: 1.3, wisdom: 1.1 },
  },
  {
    id: 'reads_backwards',
    quirk: 'Reads every document from the end first — a gwageo marking habit so deeply ingrained they can no longer do it the other way',
    statAffinity: { intelligence: 1.4, wisdom: 1.1 },
  },
  {
    id: 'four_books_allusions',
    quirk: 'Explains every real situation using an allusion from the Four Books or Five Classics — and seems genuinely surprised when people don\'t follow',
    statAffinity: { intelligence: 1.3, charisma: 0.9 },
  },
  {
    id: 'argues_twice',
    quirk: 'Argues any point exactly twice before yielding — not stubbornness, just the gwageo training: state, restate, concede',
    statAffinity: { wisdom: 1.2, charisma: 0.9 },
  },
  // ── RITUAL & SOCIAL ───────────────────────────────────────────────────────
  {
    id: 'topknot_check',
    quirk: 'Checks that their topknot is perfectly in order before speaking to anyone of higher rank — an unconscious preparation ritual before every significant interaction',
    statAffinity: { charisma: 1.2, wisdom: 1.1 },
  },
  {
    id: 'single_bow',
    quirk: 'Bows exactly once to each person encountered in the morning, not more, not less — the calibration is visible and slightly unnerving',
    statAffinity: { wisdom: 1.2, charisma: 1.1 },
  },
  {
    id: 'no_names',
    quirk: 'Refuses to address anyone directly by name — always a title, a role, or an honorific circumlocution — as if names were somehow too intimate',
    statAffinity: { wisdom: 1.3, charisma: 0.9 },
  },
  {
    id: 'cup_wipe',
    quirk: 'Wipes the rim of every cup or bowl before drinking, with one careful pass of the thumb — does it with their own cup at their own table',
    statAffinity: { constitution: 1.2, wisdom: 1.1 },
  },
  // ── PHYSICAL & HABITUAL ───────────────────────────────────────────────────
  {
    id: 'prayer_beads',
    quirk: 'Keeps a worn Buddhist prayer bead string (yeomju) in their sleeve and works it silently during tense moments, regardless of whether they\'re Buddhist',
    statAffinity: { wisdom: 1.3, charisma: 1.1 },
  },
  {
    id: 'door_check',
    quirk: 'Checks for exits upon entering any room before doing anything else — a habit that others notice after about a week',
    statAffinity: { wisdom: 1.2, dexterity: 1.1 },
  },
  {
    id: 'dawn_sky',
    quirk: 'Steps outside to check the sky at dawn every morning regardless of the day\'s obligations — and adjusts plans accordingly',
    statAffinity: { wisdom: 1.2, constitution: 1.1 },
  },
  // ── OBJECTS & RITUALS ─────────────────────────────────────────────────────
  {
    id: 'worn_letter',
    quirk: 'Carries a worn, folded letter in their sleeve at all times — has never shown it to anyone; grows visibly tense if someone reaches toward it',
    statAffinity: { wisdom: 1.2, constitution: 1.1 },
  },
  {
    id: 'ancestor_names',
    quirk: 'Knows every ancestor\'s courtesy name going back ten generations — recites them silently to calm down in difficult situations',
    statAffinity: { wisdom: 1.3, intelligence: 1.1 },
  },
  {
    id: 'grain_count',
    quirk: 'Counts the grains of rice in a bowl — or brushstrokes in a character, or steps to a destination — when working through a serious problem',
    statAffinity: { intelligence: 1.3, wisdom: 1.1 },
  },
];
