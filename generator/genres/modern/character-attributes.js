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
import { RACES } from './races.js';
import { BUILDS } from '../../common/build.js';


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
