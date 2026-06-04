// genres/modern/character-attributes.js
// Randomizable identity and appearance attributes.
// Each attribute is resolved independently before the AI call.
//
// Design rules:
//   - No stat affinities on identity attributes (gender, race, orientation)
//     Identity is not correlated with capability in this system.
//   - Stat affinities ARE used for appearance (constitution → build/health markers)
//     and quirks (various stats suggest different behavioral tells).
//   - Appearance uses a layered system: build + skin tone + face + hair + one
//     distinguishing feature. Claude assembles these into prose.
//   - One quirk per character — picked from a pool, weighted by stats.

// ── GENDER ────────────────────────────────────────────────────────────────
// weight: relative probability of selection (total need not sum to 100)

import { GENDERS } from '../../common/genders.js';
import { ORIENTATIONS } from '../../common/orientations.js';

// ── RACE / ETHNICITY ──────────────────────────────────────────────────────
// Structured as broad category + optional flavor detail.
// The flavor detail is passed to Claude for richer physical description
// but is never stated as a label in the output — it informs appearance prose only.

export const ETHNICITIES = [

  // ── BLACK / AFRICAN DIASPORA ──────────────────────────────────────────
  {
    id: 'black_american',
    broad: 'Black',
    flavor: 'African American',
    weight: 13,
    iconPrompt: 'Modern RPG icon. A Black American standing on a city street in sharp casual wear — fitted jacket, clean sneakers — someone who reads a room before stepping into it and always comes out ahead.',
    iconPath: 'generator/genres/modern/icons/ETHNICITY#black_american.png'
  },
  {
    id: 'black_caribbean',
    broad: 'Black',
    flavor: 'Caribbean descent — Jamaican, Haitian, Trinidadian, or similar',
    weight: 3,
    iconPrompt: 'Modern RPG icon. A Black Caribbean person with warm expressive features and relaxed, vibrant clothing, the ease of someone entirely comfortable in their own skin and unbothered by anyone who isn\'t.',
    iconPath: 'generator/genres/modern/icons/ETHNICITY#black_caribbean.png'
  },
  {
    id: 'black_african',
    broad: 'Black',
    flavor: 'African-born or first-generation — Nigerian, Ghanaian, Ethiopian, Somali, or similar',
    weight: 3,
    iconPrompt: 'Modern RPG icon. A Black African with composed, dignified bearing in neat modern clothing, a quiet authority shaped by navigating two worlds — and doing it without making it anyone else\'s business.',
    iconPath: 'generator/genres/modern/icons/ETHNICITY#black_african.png'
  },

  // ── LATINO / HISPANIC ─────────────────────────────────────────────────
  {
    id: 'latino_mexican',
    broad: 'Latino',
    flavor: 'Mexican or Mexican-American',
    weight: 9,
    iconPrompt: 'Modern RPG icon. A Mexican or Mexican-American with a direct, warm expression and practical everyday clothes, someone who built something from very little and knows exactly what that cost.',
    iconPath: 'generator/genres/modern/icons/ETHNICITY#latino_mexican.png'
  },
  {
    id: 'latino_puerto_rican',
    broad: 'Latino',
    flavor: 'Puerto Rican',
    weight: 3,
    iconPrompt: 'Modern RPG icon. A Puerto Rican with expressive features and natural urban energy, colorful casual clothing, as at home on a busy city block as anywhere — probably more so.',
    iconPath: 'generator/genres/modern/icons/ETHNICITY#latino_puerto_rican.png'
  },
  {
    id: 'latino_central_american',
    broad: 'Latino',
    flavor: 'Central American — Salvadoran, Guatemalan, Honduran, or similar',
    weight: 3,
    iconPrompt: 'Modern RPG icon. A Central American with determined eyes and quietly work-worn hands, dressed simply and practically, a resilience that doesn\'t announce itself but is obvious once you look for it.',
    iconPath: 'generator/genres/modern/icons/ETHNICITY#latino_central_american.png'
  },
  {
    id: 'latino_south_american',
    broad: 'Latino',
    flavor: 'South American — Colombian, Venezuelan, Brazilian, Argentinian, or similar',
    weight: 2,
    iconPrompt: 'Modern RPG icon. A South American with an animated, engaged expression and smart casual clothing, the ease of someone who has learned to move between different worlds and picked up something useful from each.',
    iconPath: 'generator/genres/modern/icons/ETHNICITY#latino_south_american.png'
  },
  {
    id: 'latino_cuban',
    broad: 'Latino',
    flavor: 'Cuban or Cuban-American',
    weight: 1,
    iconPrompt: 'Modern RPG icon. A Cuban or Cuban-American with a quick, observant expression and practical street clothing, someone who reads a situation fast, adapts faster, and has a layered personal history that\'s never far from the surface.',
    iconPath: 'generator/genres/modern/icons/ETHNICITY#latino_cuban.png'
  },

  // ── WHITE / EUROPEAN ──────────────────────────────────────────────────
  {
    id: 'white_american',
    broad: 'White',
    flavor: 'White American — mixed European ancestry, no strong ethnic identity',
    weight: 20,
    iconPrompt: 'Modern RPG icon. A White American in a city or suburban setting, wearing unremarkable everyday clothes — jeans, a jacket, nothing that draws attention — average in presentation and not remotely average in capability.',
    iconPath: 'generator/genres/modern/icons/ETHNICITY#white_american.png'
  },
  {
    id: 'white_eastern_european',
    broad: 'White',
    flavor: 'Eastern European — Polish, Ukrainian, Russian, Romanian, or similar',
    weight: 3,
    iconPrompt: 'Modern RPG icon. An Eastern European with a guarded, direct expression and practical clothing — coat, boots, nothing wasted — someone who came from somewhere harder and carries it quietly, without complaint or explanation.',
    iconPath: 'generator/genres/modern/icons/ETHNICITY#white_eastern_european.png'
  },
  {
    id: 'white_southern_european',
    broad: 'White',
    flavor: 'Southern European — Italian, Greek, Spanish, Portuguese, or similar',
    weight: 2,
    iconPrompt: 'Modern RPG icon. A Southern European with warmth and sharpness in equal measure, smart casual dress, expressive even in stillness — someone who can charm a room and work it simultaneously without seeming to try.',
    iconPath: 'generator/genres/modern/icons/ETHNICITY#white_southern_european.png'
  },
  {
    id: 'white_irish',
    broad: 'White',
    flavor: 'Irish or Irish-American',
    weight: 2,
    iconPrompt: 'Modern RPG icon. An Irish or Irish-American with pale features and a wry, slightly tired expression, a practical jacket and worn jeans, the kind of dry humor that arrives a beat before the smile does.',
    iconPath: 'generator/genres/modern/icons/ETHNICITY#white_irish.png'
  },
  {
    id: 'white_jewish_ashkenazi',
    broad: 'White',
    flavor: 'Ashkenazi Jewish',
    weight: 2,
    iconPrompt: 'Modern RPG icon. An Ashkenazi Jewish person with sharp, attentive eyes and smart casual or academic dress, someone who has strong opinions on most things, is usually right, and has stopped pretending otherwise.',
    iconPath: 'generator/genres/modern/icons/ETHNICITY#white_jewish_ashkenazi.png'
  },
  {
    id: 'white_middle_eastern',
    broad: 'Middle Eastern / North African',
    flavor: 'Middle Eastern or North African — Arab, Persian, Turkish, Egyptian, or similar',
    weight: 3,
    iconPrompt: 'Modern RPG icon. A Middle Eastern or North African person in polished modern urban clothing, watchful and composed, someone practiced at navigating spaces that start forming opinions about them before they\'ve said a word.',
    iconPath: 'generator/genres/modern/icons/ETHNICITY#white_middle_eastern.png'
  },

  // ── ASIAN ─────────────────────────────────────────────────────────────
  {
    id: 'asian_east_chinese',
    broad: 'Asian',
    flavor: 'Chinese or Chinese-American',
    weight: 4,
    iconPrompt: 'Modern RPG icon. A Chinese or Chinese-American with a measured, composed expression and neat modern clothing, someone for whom precision is second nature and hard work has long since learned to look effortless.',
    iconPath: 'generator/genres/modern/icons/ETHNICITY#asian_east_chinese.png'
  },
  {
    id: 'asian_east_korean',
    broad: 'Asian',
    flavor: 'Korean or Korean-American',
    weight: 2,
    iconPrompt: 'Modern RPG icon. A Korean or Korean-American in clean, current-season fashion, precise and self-assured, someone who holds themselves to high standards and has simply always done so — it\'s not performance, it\'s baseline.',
    iconPath: 'generator/genres/modern/icons/ETHNICITY#asian_east_korean.png'
  },
  {
    id: 'asian_east_japanese',
    broad: 'Asian',
    flavor: 'Japanese or Japanese-American',
    weight: 1,
    iconPrompt: 'Modern RPG icon. A Japanese or Japanese-American with careful posture and impeccably maintained clothing, someone whose attention to detail shows in everything about them — whether or not they intend it to.',
    iconPath: 'generator/genres/modern/icons/ETHNICITY#asian_east_japanese.png'
  },
  {
    id: 'asian_south_indian',
    broad: 'Asian',
    flavor: 'Indian or Indian-American — South Asian',
    weight: 4,
    iconPrompt: 'Modern RPG icon. An Indian or Indian-American with warm, intelligent eyes and modern professional or smart casual wear, the kind of person people call when something actually needs to get solved.',
    iconPath: 'generator/genres/modern/icons/ETHNICITY#asian_south_indian.png'
  },
  {
    id: 'asian_south_pakistani',
    broad: 'Asian',
    flavor: 'Pakistani or Pakistani-American',
    weight: 1,
    iconPrompt: 'Modern RPG icon. A Pakistani or Pakistani-American with a calm, composed expression and practical modern clothing, someone who navigates complexity with a quiet steadiness that requires no recognition to sustain itself.',
    iconPath: 'generator/genres/modern/icons/ETHNICITY#asian_south_pakistani.png'
  },
  {
    id: 'asian_southeast',
    broad: 'Asian',
    flavor: 'Southeast Asian — Vietnamese, Filipino, Thai, Cambodian, or similar',
    weight: 3,
    iconPrompt: 'Modern RPG icon. A Southeast Asian with an open, adaptable manner and casual modern clothing, someone who has made themselves at home in more than one world and quietly learned something useful from each of them.',
    iconPath: 'generator/genres/modern/icons/ETHNICITY#asian_southeast.png'
  },

  // ── INDIGENOUS / NATIVE ───────────────────────────────────────────────
  {
    id: 'native_american',
    broad: 'Indigenous / Native American',
    flavor: 'Native American or Alaska Native',
    weight: 1,
    iconPrompt: 'Modern RPG icon. A Native American in a modern urban or community setting, grounded and present, practical everyday clothing, someone carrying a long history in a world that rarely acknowledges it — and who has learned to live with that.',
    iconPath: 'generator/genres/modern/icons/ETHNICITY#native_american.png'
  },

  // ── MULTIRACIAL ───────────────────────────────────────────────────────
  {
    id: 'multiracial_black_white',
    broad: 'Multiracial',
    flavor: 'Mixed Black and White heritage',
    weight: 2,
    iconPrompt: 'Modern RPG icon. A person of mixed Black and White heritage with features that don\'t fit cleanly into any single category, at ease navigating multiple worlds in casual modern clothing, fully owned by none of them.',
    iconPath: 'generator/genres/modern/icons/ETHNICITY#multiracial_black_white.png'
  },
  {
    id: 'multiracial_asian_white',
    broad: 'Multiracial',
    flavor: 'Mixed Asian and White heritage',
    weight: 2,
    iconPrompt: 'Modern RPG icon. A person of mixed Asian and White heritage whose face reads differently in every room they enter, modern casual clothing, comfortable in that ambiguity — or simply very good at appearing so.',
    iconPath: 'generator/genres/modern/icons/ETHNICITY#multiracial_asian_white.png'
  },
  {
    id: 'multiracial_latino_mixed',
    broad: 'Multiracial',
    flavor: 'Mixed Latino and other heritage',
    weight: 2,
    iconPrompt: 'Modern RPG icon. A person of mixed Latino and other heritage, expressive and adaptable in everyday modern clothing, someone whose identity is more layered than any single label accounts for and who has made peace with that.',
    iconPath: 'generator/genres/modern/icons/ETHNICITY#multiracial_latino_mixed.png'
  },
  {
    id: 'multiracial_other',
    broad: 'Multiracial',
    flavor: 'Mixed heritage — combination not specified',
    weight: 2,
    iconPrompt: 'Modern RPG icon. A person of mixed and unspecified heritage in casual modern clothing, a face that invites questions they have heard before and have learned to answer however they feel like answering that day.',
    iconPath: 'generator/genres/modern/icons/ETHNICITY#multiracial_other.png'
  },
];

// ── APPEARANCE ────────────────────────────────────────────────────────────
// Layered system. Each layer is resolved independently, then passed
// to Claude as a compact description block. Claude writes appearance
// into prose — never as a bullet list.
//
// Stat affinities used here:
//   constitution → build (high = fit/sturdy, low = thin/worn)
//   strength     → build reinforcement
//   charisma     → grooming/presentation skew

export const BUILDS = [
  { id: 'lean', label: 'lean, wiry', statAffinity: { constitution: 0.9, dexterity: 1.2 } },
  { id: 'average', label: 'average build', statAffinity: {} },
  { id: 'stocky', label: 'stocky, solid', statAffinity: { strength: 1.2, constitution: 1.1 } },
  { id: 'athletic', label: 'athletic, visibly fit', statAffinity: { strength: 1.3, constitution: 1.2 } },
  { id: 'heavy', label: 'heavyset', statAffinity: { constitution: 1.1, strength: 1.1 } },
  { id: 'tall_lean', label: 'tall and lean', statAffinity: { dexterity: 1.1 } },
  { id: 'short', label: 'short, compact', statAffinity: {} },
  { id: 'worn', label: 'thin, worn-looking', statAffinity: { constitution: 0.7, wisdom: 1.1 } },
];

export const HAIR = [
  { id: 'short_dark', label: 'short dark hair' },
  { id: 'short_light', label: 'short light hair' },
  { id: 'close_cropped', label: 'close-cropped or shaved' },
  { id: 'medium_wavy', label: 'medium-length, wavy' },
  { id: 'long_straight', label: 'long, straight' },
  { id: 'long_curly', label: 'long, curly or coily' },
  { id: 'natural_coily', label: 'natural coils or locs' },
  { id: 'gray_streaked', label: 'going gray, not hiding it' },
  { id: 'dyed', label: 'dyed an unnatural color' },
  { id: 'messy', label: 'perpetually messy' },
  { id: 'pulled_back', label: 'always pulled back' },
  { id: 'thinning', label: 'thinning or receding' },
];

export const DISTINGUISHING_FEATURES = [
  { id: 'scar_face', label: 'a scar across the face or jaw' },
  { id: 'scar_hands', label: 'scarred or calloused hands' },
  { id: 'tattoos_visible', label: 'tattoos that can\'t be hidden' },
  { id: 'tattoos_hidden', label: 'tattoos always kept covered' },
  { id: 'intense_eyes', label: 'unsettlingly direct eye contact' },
  { id: 'tired_eyes', label: 'eyes that always look tired' },
  { id: 'crooked_nose', label: 'a nose that\'s been broken at least once' },
  { id: 'missing_digit', label: 'a missing finger or partial digit' },
  { id: 'birthmark', label: 'a prominent birthmark' },
  { id: 'limp', label: 'a slight but permanent limp' },
  { id: 'laugh_lines', label: 'deep laugh lines that age them' },
  { id: 'always_tired', label: 'looks perpetually exhausted' },
  { id: 'immaculate', label: 'dressed impeccably, always' },
  { id: 'rough_hands', label: 'hands that tell their whole story' },
  { id: 'none', label: null  /* no distinguishing feature */ },
  { id: 'none2', label: null  /* padding to reduce feature frequency */ },
];

// ── QUIRKS ────────────────────────────────────────────────────────────────
// One quirk per character. Each is a single vivid behavioral or physical tell —
// specific enough to be interesting, universal enough to fit any character.
// Stat affinities weight selection toward fitting character types.

export const QUIRKS = [

  // ── PHYSICAL HABITS ───────────────────────────────────────────────────
  {
    id: 'cracking_knuckles',
    quirk: 'Cracks their knuckles before anything they consider important',
    statAffinity: { strength: 1.2, constitution: 1.1 },
  },
  {
    id: 'always_early',
    quirk: 'Arrives everywhere early and becomes visibly agitated if forced to wait',
    statAffinity: { wisdom: 1.2, intelligence: 1.1 },
  },
  {
    id: 'overexplains',
    quirk: 'Over-explains things when nervous — can\'t stop once they\'ve started',
    statAffinity: { intelligence: 1.2, charisma: 0.9 },
  },
  {
    id: 'never_sits_back',
    quirk: 'Never sits with their back to the door',
    statAffinity: { wisdom: 1.2, constitution: 1.1 },
  },
  {
    id: 'counts_things',
    quirk: 'Silently counts things in stressful situations — steps, tiles, ceiling panels',
    statAffinity: { intelligence: 1.3, wisdom: 0.9 },
  },
  {
    id: 'touches_face',
    quirk: 'Covers their mouth when they lie — even small lies',
    statAffinity: { charisma: 1.1, wisdom: 0.8 },
  },
  {
    id: 'constant_motion',
    quirk: 'Always in motion — tapping, pacing, fidgeting — goes still only when something is very wrong',
    statAffinity: { dexterity: 1.2, constitution: 1.1 },
  },
  {
    id: 'chews_pen',
    quirk: 'Chews pens, straws, or whatever\'s at hand when thinking',
    statAffinity: { intelligence: 1.1 },
  },
  {
    id: 'mirror_check',
    quirk: 'Checks their reflection in every reflective surface, almost unconsciously',
    statAffinity: { charisma: 1.2 },
  },
  {
    id: 'cracking_neck',
    quirk: 'Cracks their neck at the start of any confrontation',
    statAffinity: { strength: 1.3, constitution: 1.2 },
  },

  // ── SPEECH PATTERNS ───────────────────────────────────────────────────
  {
    id: 'long_pauses',
    quirk: 'Pauses for an uncomfortably long time before answering any direct question',
    statAffinity: { wisdom: 1.3, intelligence: 1.1 },
  },
  {
    id: 'never_says_sorry',
    quirk: 'Never says sorry — substitutes action for apology every time',
    statAffinity: { strength: 1.2, charisma: 0.9 },
  },
  {
    id: 'talks_to_self',
    quirk: 'Mutters to themselves while working through a problem — doesn\'t notice they\'re doing it',
    statAffinity: { intelligence: 1.3, wisdom: 1.1 },
  },
  {
    id: 'deflects_with_humor',
    quirk: 'Deflects anything serious with a joke — the worse the moment, the funnier the deflection',
    statAffinity: { charisma: 1.3, wisdom: 0.9 },
  },
  {
    id: 'literal_thinker',
    quirk: 'Takes figures of speech literally, then realizes it and overcorrects',
    statAffinity: { intelligence: 1.2, charisma: 0.9 },
  },
  {
    id: 'repeats_last_word',
    quirk: 'Quietly repeats the last word of a sentence they found important',
    statAffinity: { wisdom: 1.2, intelligence: 1.1 },
  },
  {
    id: 'never_first_name',
    quirk: 'Never uses first names — everyone is addressed by surname, nickname, or nothing at all',
    statAffinity: { wisdom: 1.1, charisma: 1.1 },
  },
  {
    id: 'swears_precisely',
    quirk: 'Swears rarely, but precisely — when they do, the room notices',
    statAffinity: { wisdom: 1.2, strength: 1.1 },
  },

  // ── SOCIAL & BEHAVIORAL ───────────────────────────────────────────────
  {
    id: 'remembers_orders',
    quirk: 'Remembers exactly what everyone ordered or drank at their first meeting — years later',
    statAffinity: { charisma: 1.3, intelligence: 1.2 },
  },
  {
    id: 'overly_punctual',
    quirk: 'Treats being on time as a moral failing in others',
    statAffinity: { wisdom: 1.1, constitution: 1.1 },
  },
  {
    id: 'fixes_things',
    quirk: 'Compulsively fixes things that are slightly wrong — a crooked frame, an uneven stack of papers',
    statAffinity: { intelligence: 1.2, dexterity: 1.1 },
  },
  {
    id: 'reads_the_room_late',
    quirk: 'Always reads the room correctly — about thirty seconds too late',
    statAffinity: { intelligence: 1.2, wisdom: 0.8 },
  },
  {
    id: 'cant_let_go',
    quirk: 'Can\'t leave an argument without getting the last word — even if it costs them',
    statAffinity: { strength: 1.1, wisdom: 0.8 },
  },
  {
    id: 'overly_generous',
    quirk: 'Gives away things they can\'t afford to — money, time, their last cigarette',
    statAffinity: { charisma: 1.2, wisdom: 0.8 },
  },
  {
    id: 'invisible_in_crowds',
    quirk: 'Has a talent for being completely overlooked in a crowd — can\'t decide if it\'s a gift or a curse',
    statAffinity: { dexterity: 1.2, charisma: 0.9 },
  },
  {
    id: 'hypervigilant',
    quirk: 'Clocks every exit the moment they enter a room',
    statAffinity: { wisdom: 1.2, constitution: 1.2 },
  },

  // ── OBJECTS & RITUALS ─────────────────────────────────────────────────
  {
    id: 'specific_mug',
    quirk: 'Will only drink coffee from one specific mug — the ritual is non-negotiable',
    statAffinity: { wisdom: 1.1, constitution: 1.1 },
  },
  {
    id: 'carries_something',
    quirk: 'Always carries one small object that has no practical use — never explains it',
    statAffinity: { wisdom: 1.2, charisma: 1.1 },
  },
  {
    id: 'same_route',
    quirk: 'Takes the exact same route everywhere, every time — detours cause visible distress',
    statAffinity: { wisdom: 1.1, intelligence: 1.1 },
  },
  {
    id: 'hates_phones',
    quirk: 'Refuses to leave a voicemail under any circumstances — will call back indefinitely instead',
    statAffinity: { charisma: 0.9, wisdom: 1.1 },
  },
  {
    id: 'writes_everything',
    quirk: 'Writes everything down — grocery lists, phone numbers, things people say — in a battered notebook',
    statAffinity: { intelligence: 1.3, wisdom: 1.1 },
  },

  // ── DARKER TELLS ──────────────────────────────────────────────────────
  {
    id: 'laughs_wrong_moments',
    quirk: 'Laughs at the wrong moments — funerals, confrontations, bad news',
    statAffinity: { constitution: 1.1, wisdom: 0.8 },
  },
  {
    id: 'disappears',
    quirk: 'Disappears for hours with no explanation, then returns like nothing happened',
    statAffinity: { wisdom: 1.1, charisma: 0.9 },
  },
  {
    id: 'never_celebrates',
    quirk: 'Can\'t celebrate wins — moves to the next problem before the last one is cold',
    statAffinity: { constitution: 1.2, wisdom: 1.1 },
  },
  {
    id: 'sleeps_anywhere',
    quirk: 'Can fall asleep anywhere, instantly — a skill born from necessity',
    statAffinity: { constitution: 1.3, strength: 1.1 },
  },
  {
    id: 'flinches',
    quirk: 'Flinches at sudden movement on their left side — never mentions it, deflects if asked',
    statAffinity: { constitution: 0.9, strength: 1.1 },
  },
];
