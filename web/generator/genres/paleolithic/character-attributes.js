// genres/paleolithic/character-attributes.js
// Identity and appearance attributes for the paleolithic genre.

export { GENDERS } from '../../common/genders.js';
export { ORIENTATIONS } from '../../common/orientations.js';
export { BUILDS } from '../../common/build.js';
export { RACES } from './races.js';

// ── HAIR ──────────────────────────────────────────────────────────────────
// Stone-age hair is practical and unprocessed — long, matted, braided
// with sinew or bone, or shorn with a flint scraper.

export const HAIR = [
  'long matted black hair worn loose',
  'dark hair braided tightly with sinew and small bones',
  'coarse brown hair cut short with a flint edge, uneven',
  'auburn hair worn in two rough plaits',
  'thick black hair bound back with a strip of rawhide',
  'grey-streaked hair worn long and wild',
  'dark hair shaved at the sides, long on top and knotted',
  'hair woven with ochre-stained reeds and feathers',
  'close-cropped dark hair with ritual ochre streaks',
  'long black hair always kept covered by a hood or wrap',
  'reddish-brown hair matted with clay and grease',
  'silver-white hair worn long — unusual in someone their age',
];

// ── DISTINGUISHING FEATURES ───────────────────────────────────────────────

export const DISTINGUISHING_FEATURES = [
  { id: 'ritual_scars',       label: 'ritual scarring across the cheeks and forehead — marks of passage and belonging'            },
  { id: 'ochre_tattoos',      label: 'ochre-stained tattoos covering the upper arms and neck'                                     },
  { id: 'bite_scar',          label: 'a bite scar — large predator, healed badly, on the shoulder or forearm'                    },
  { id: 'missing_finger',     label: 'a finger missing — lost to flint, frost, or something that didn\'t leave a clean story'    },
  { id: 'heavy_brow',         label: 'a pronounced brow ridge that makes them look fiercer than they may be'                     },
  { id: 'broken_nose',        label: 'a nose broken and reset crooked — maybe twice'                                              },
  { id: 'burnt_hand',         label: 'a burn scar across the back of one hand — a bad fire, an old winter, a quick decision'     },
  { id: 'tooth_necklace',     label: 'always wearing a necklace of animal teeth that rattle faintly when they move'              },
  { id: 'cave_bear_claw',     label: 'a deep claw gouge from jaw to collarbone — healed, but visible and permanent'              },
  { id: 'filed_teeth',        label: 'two front teeth filed to points — ceremonial or territorial, they don\'t explain which'    },
  { id: 'spirit_eye',         label: 'one eye that is pale and unfocused — they see differently with it, or claim to'            },
  { id: 'mud_paint',          label: 'their face is always partially painted with ochre or clay, even in sleep'                  },
  { id: 'strong_limp',        label: 'a limp from an old injury that healed imperfectly — they outrun most people anyway'        },
  { id: 'none',               label: null },
  { id: 'none2',              label: null },
];

// ── QUIRKS ────────────────────────────────────────────────────────────────

export const QUIRKS = [

  // ── HUNTING & SURVIVAL ────────────────────────────────────────────────
  {
    id: 'scent_check',
    quirk: 'Licks a finger and tests the wind before entering any open space — an unconscious habit that has saved their life at least once',
    statAffinity: { wisdom: 1.3, dexterity: 1.2 },
  },
  {
    id: 'reads_tracks',
    quirk: 'Cannot pass an animal track without stopping to identify it, estimate its age, and describe the animal\'s mood to whoever is unlucky enough to be nearby',
    statAffinity: { intelligence: 1.3, wisdom: 1.2 },
  },
  {
    id: 'taps_flint',
    quirk: 'Taps the nearest rock surface absentmindedly, listening to the tone — always testing if it would knap well, even in the middle of an argument',
    statAffinity: { intelligence: 1.2, dexterity: 1.2 },
  },
  {
    id: 'checks_sky',
    quirk: 'Checks the sky\'s color every hour, silently, without interrupting whatever else is happening — and does something different if they don\'t like what they see',
    statAffinity: { wisdom: 1.3, intelligence: 1.1 },
  },
  {
    id: 'names_game',
    quirk: 'Names every animal they hunt before the kill — says you cannot take something properly without knowing what it is',
    statAffinity: { wisdom: 1.2, charisma: 1.1 },
  },
  {
    id: 'back_to_wall',
    quirk: 'Never sits with their back to an open space — will physically relocate in the middle of a meal to correct this',
    statAffinity: { wisdom: 1.2, constitution: 1.1 },
  },
  {
    id: 'sleeps_light',
    quirk: 'Wakes at sounds others sleep through — the distant snap of a branch, the change in an owl\'s call; they have not slept past the predator hour in years',
    statAffinity: { wisdom: 1.3, dexterity: 1.1 },
  },
  {
    id: 'fire_ritual',
    quirk: 'Has a specific ritual for starting fire — the same words, the same hand positions — and becomes genuinely unsettled if forced to start one differently',
    statAffinity: { wisdom: 1.2, intelligence: 1.1 },
  },

  // ── SOCIAL & SPEECH ───────────────────────────────────────────────────
  {
    id: 'counts_everything',
    quirk: 'Counts things compulsively — members of the group, days since rain, the number of bones in a carcass — and gets unsettled if the count comes out wrong',
    statAffinity: { intelligence: 1.4, wisdom: 1.1 },
  },
  {
    id: 'mimics_animals',
    quirk: 'Unconsciously mimics the sounds of nearby animals in conversation — bird calls, low growls, the snort of a grazing deer — as emphasis or filler',
    statAffinity: { charisma: 1.2, wisdom: 1.1 },
  },
  {
    id: 'touches_earth',
    quirk: 'Places one palm flat on the ground at the start of every significant conversation — says the earth needs to know what\'s being decided',
    statAffinity: { wisdom: 1.3, charisma: 1.1 },
  },
  {
    id: 'stone_gift',
    quirk: 'Offers a stone as greeting to anyone they respect — a specific type, chosen in the moment; accepting it correctly matters more than people realize',
    statAffinity: { charisma: 1.2, intelligence: 1.1 },
  },
  {
    id: 'whisper_hunt',
    quirk: 'Speaks in a hunting whisper for the whole day before any major effort — has never explained why; the habit has become superstition for the people around them',
    statAffinity: { wisdom: 1.2, constitution: 1.1 },
  },

  // ── OBJECTS & RITUALS ─────────────────────────────────────────────────
  {
    id: 'bone_carved',
    quirk: 'Always carving something — bones, soft stone, antler — small figures that they give away immediately, apparently without attachment',
    statAffinity: { dexterity: 1.3, intelligence: 1.1 },
  },
  {
    id: 'carries_ochre',
    quirk: 'Keeps a pouch of red ochre always on their person and marks the first rock they touch in any new territory — cannot explain why; only knows it matters',
    statAffinity: { wisdom: 1.2, intelligence: 1.2 },
  },
  {
    id: 'remembers_dead',
    quirk: 'Recites the names of the dead under their breath before sleeping — a long list, added to slowly; runs longer than most people expect',
    statAffinity: { wisdom: 1.3, charisma: 0.9 },
  },
  {
    id: 'smells_weather',
    quirk: 'Stops mid-sentence to smell the air when the weather changes — not dramatically, just a pause, nostrils flaring — and then continues as if nothing happened',
    statAffinity: { wisdom: 1.3, constitution: 1.1 },
  },
];
