// genres/nihongi/character-attributes.js

export { GENDERS }      from '../../common/genders.js';
export { ORIENTATIONS } from '../../common/orientations.js';
export { BUILDS }       from '../../common/build.js';
export { RACES }        from './races.js';

export const HAIR = [
  'long dark hair loosely bound at the nape with a cord of twisted plant fibre, the old way before continental fashion arrived',
  'hair piled high in formal court style and pinned with lacquered hairpins — a style that takes an attendant and considerable time each morning',
  'head shaved smooth at the crown with a narrow fringe remaining, the mark of partial Buddhist ordination',
  'long unbound hair falling freely past the shoulders, worn loose as a deliberate statement of provincial independence from capital fashion',
  'ritual topknot wrapped tightly with white hempen cord for a shrine ceremony, unchanged since the investiture',
  'hair oiled and dressed back with combs of pale polished bone in continental style, a subtle advertisement of foreign learning',
  'practical bun knotted with a strip of linen, entirely unchanged since field work this morning',
  'half-shaved head with elaborate side braids — the style of a provincial warrior household, practical and unmistakable',
  'long hair with the ends lightly tinted with plant pigment, a vanity small enough to be deniable',
  'elaborate double-pinned court hairstyle dressed with gilt bronze ornaments arrived on the last ship from Baekje',
];

export const DISTINGUISHING_FEATURES = [
  { id: 'brush_callus',      label: 'right fingertips ink-stained and calloused from years of copying Chinese characters by oil-lamp light' },
  { id: 'shrine_scar',       label: 'a thin ritual scar at the base of the left thumb — a clan initiation mark, never shown and never discussed with outsiders' },
  { id: 'forge_burns',       label: 'faint burn scars across the forearms from forge work, incongruous with their current court position' },
  { id: 'bronze_mirror',     label: 'a small bronze mirror worn on a cord at the neck — considered a divine protective object, never removed, slightly greenish with age' },
  { id: 'continental_face',  label: 'bone structure and coloring that marks them clearly as descended from continental craftsmen — the clan genealogy says nothing of this' },
  { id: 'birth_mark',        label: 'a birthmark on the left inner wrist noted in the midwife\'s record; the clan diviner declared it an omen at birth and has not agreed on which kind since' },
  { id: 'field_hands',       label: 'hands roughened by agricultural work despite two generations of court rank — noticed, never mentioned' },
  { id: 'jade_ornament',     label: 'a small jade ornament from a foreign ship, sewn into the inner robe where it cannot be seen and only the wearer knows the cost' },
  { id: 'shrine_posture',    label: 'posture formed by years of prostration before shrines — a quality of absolute stillness in the spine that reads as either reverence or suppressed anger' },
  { id: 'unusual_height',    label: 'an uncommon height that the clan\'s oral genealogy notes has appeared in three consecutive generations, unexplained and speculated about by everyone' },
  { id: 'ritual_tattoo',     label: 'a small ritual tattoo on the inner wrist from an older provincial practice — covered at court, not always successfully' },
  { id: 'different_eyes',    label: 'one eye a shade lighter than the other — noticed immediately by everyone who meets them, interpreted differently by each' },
  { id: 'none',              label: null },
  { id: 'none2',             label: null },
];

export const QUIRKS = [
  {
    id: 'misogi_compulsion',
    quirk: 'Performs ritual purification — washing hands, rinsing the mouth, stepping over a rope of rush — whenever they have touched anything associated with death, illness, or ceremonial pollution; this is disruptive in roughly half of all social situations',
    statAffinity: { wisdom: 1.3, constitution: 1.1 },
  },
  {
    id: 'kami_offerings',
    quirk: 'Leaves a small offering — a few grains of rice, a flower, a strip of cloth — at every new location before doing any business there; has been doing this so long they no longer decide to do it, it simply happens',
    statAffinity: { wisdom: 1.2, charisma: 1.1 },
  },
  {
    id: 'wind_direction',
    quirk: 'Checks the wind direction before making any significant decision — reads it as a sign and adjusts course; will postpone a journey, a meeting, or a confrontation based on what the kami of the air appear to be suggesting',
    statAffinity: { wisdom: 1.3, intelligence: 1.1 },
  },
  {
    id: 'dawn_prayer',
    quirk: 'Steps outside each morning before speaking to anyone, faces east, and recites a short prayer — the exact words shift with the season; those who share lodgings quickly learn to wait',
    statAffinity: { wisdom: 1.2, constitution: 1.1 },
  },
  {
    id: 'chinese_text_aloud',
    quirk: 'Reads any available Chinese characters aloud under their breath when thinking — including inscriptions on other people\'s personal objects, which is considered extremely rude',
    statAffinity: { intelligence: 1.3, wisdom: 1.1 },
  },
  {
    id: 'fivefold_count',
    quirk: 'Counts things in groups of five according to continental five-element cosmology; grows quietly uneasy when a count doesn\'t resolve cleanly into the correct schema, and will recount until it does',
    statAffinity: { intelligence: 1.3, wisdom: 1.2 },
  },
  {
    id: 'genealogy_memory',
    quirk: 'Memorizes the genealogy of every significant person they meet — recites it silently when trying to read a situation; finds gaps or inconsistencies in lineage records immediately and involuntarily',
    statAffinity: { intelligence: 1.3, charisma: 1.1 },
  },
  {
    id: 'clan_crest_trace',
    quirk: 'Traces their clan crest with one finger against their thigh when nervous or problem-solving — a habit so old they no longer notice they are doing it, though others sometimes do',
    statAffinity: { charisma: 1.2, wisdom: 1.1 },
  },
  {
    id: 'formal_speech_always',
    quirk: 'Speaks in formal court register to everyone without exception — including the kitchen ox, the fire, the rain, and people who have been rude to them; has no other mode available',
    statAffinity: { charisma: 1.2, wisdom: 1.0 },
  },
  {
    id: 'kotodama_avoidance',
    quirk: 'Refuses to speak certain words considered inauspicious — has developed elaborate circumlocutions that veteran court observers can decode, and that everyone else finds baffling',
    statAffinity: { wisdom: 1.3, charisma: 0.9 },
  },
  {
    id: 'first_portion_kami',
    quirk: 'Sets aside the first portion of any meal as an offering to the kami before eating — even when this is conspicuous, impractical, or takes place in front of someone who disapproves',
    statAffinity: { wisdom: 1.2, constitution: 1.1 },
  },
  {
    id: 'amulet_touch',
    quirk: 'Touches their shrine amulet before entering any unfamiliar building — the cloth is smooth from years of this, the cord nearly worn through; has refused to replace either',
    statAffinity: { wisdom: 1.2, constitution: 1.1 },
  },
  {
    id: 'directional_sleep',
    quirk: 'Insists on sleeping with their head in a specific direction according to continental cosmological prescription — achieves genuinely disrupted sleep in any lodging that prevents this, which is most of them',
    statAffinity: { wisdom: 1.1, intelligence: 1.1 },
  },
  {
    id: 'exit_assessment',
    quirk: 'Maps every room\'s exits and assesses every occupant\'s rank before doing anything else — a habit formed in a court that has witnessed several purges within living memory',
    statAffinity: { wisdom: 1.2, dexterity: 1.1 },
  },
  {
    id: 'sees_shades',
    quirk: 'Occasionally reacts to things no one else can perceive — pauses mid-sentence, adjusts their path to avoid an empty corner, addresses an apology to unoccupied air; they have learned to disguise it as distraction, but not perfectly',
    statAffinity: { wisdom: 1.3, charisma: 0.9 },
  },
  {
    id: 'kami_marked',
    quirk: 'Animals behave wrongly around them — birds go silent when they enter a courtyard, dogs refuse to approach, and on two occasions a fox has sat in a visible location and watched them for an extended period without moving or leaving',
    statAffinity: { wisdom: 1.2, charisma: 1.1 },
  },
  {
    id: 'death_touched',
    quirk: 'Since a near-death experience they run slightly cold to the touch and occasionally know about injuries or illnesses in others before any visible symptom appears — they describe it as a heaviness they sense, not a vision; they do not enjoy the ability',
    statAffinity: { wisdom: 1.3, constitution: 1.1 },
  },
  {
    id: 'wrong_hunger',
    quirk: 'Since an encounter with something they do not speak about directly, their appetite is irregular — sometimes they go two or three days without eating and feel no particular need; occasionally they taste something that is not there; once, they ate something they cannot identify and experienced no ill effects',
    statAffinity: { constitution: 1.2, wisdom: 1.1 },
  },
];
