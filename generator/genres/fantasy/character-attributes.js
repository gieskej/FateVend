// genres/fantasy/character-attributes.js
// Identity and appearance for fantasy characters.
//
// Key differences from modern:
//   - RACES replaces ETHNICITIES — name pools are keyed by race
//   - Appearance descriptors are fantasy-flavored
//   - Quirks are shared with modern (behavioral tells are universal)
//     but with a few fantasy-specific additions
//   - Gender and orientation carry over unchanged

import { GENDERS } from '../../common/genders.js';
import { ORIENTATIONS } from '../../common/icons/orientations.js';
import { RACES } from './races.js';
import { BUILDS } from '../../common/build.js';
import { HAIR } from '../../common/hair.js';


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
  { quirk: 'Cracks their knuckles before anything they consider important', statAffinity: { strength: 1.2, constitution: 1.1 } },
  { quirk: 'Always arrives early and becomes visibly agitated if forced to wait', statAffinity: { wisdom: 1.2, intelligence: 1.1 } },
  { quirk: 'Over-explains things when nervous — can\'t stop once they\'ve started', statAffinity: { intelligence: 1.2, charisma: 0.9 } },
  { quirk: 'Never sits with their back to the door', statAffinity: { wisdom: 1.2, constitution: 1.1 } },
  { quirk: 'Silently counts things in stressful situations — steps, stones, candles', statAffinity: { intelligence: 1.3, wisdom: 0.9 } },
  { quirk: 'Covers their mouth when they lie — even small lies', statAffinity: { charisma: 1.1, wisdom: 0.8 } },
  { quirk: 'Always in motion — tapping, pacing, fidgeting — goes completely still only when danger is near', statAffinity: { dexterity: 1.2, constitution: 1.1 } },
  { quirk: 'Pauses for an uncomfortably long time before answering any direct question', statAffinity: { wisdom: 1.3, intelligence: 1.1 } },
  { quirk: 'Never says sorry — substitutes action for apology every time', statAffinity: { strength: 1.2, charisma: 0.9 } },
  { quirk: 'Mutters to themselves while thinking — doesn\'t notice they\'re doing it', statAffinity: { intelligence: 1.3, wisdom: 1.1 } },
  { quirk: 'Deflects anything serious with a joke — the worse the moment, the funnier the deflection', statAffinity: { charisma: 1.3, wisdom: 0.9 } },
  { quirk: 'Remembers exactly what everyone ordered or drank at their first meeting — years later', statAffinity: { charisma: 1.3, intelligence: 1.2 } },
  { quirk: 'Can\'t leave an argument without getting the last word — even if it costs them', statAffinity: { strength: 1.1, wisdom: 0.8 } },
  { quirk: 'Gives away things they can\'t afford to — food, coin, their last torch', statAffinity: { charisma: 1.2, wisdom: 0.8 } },
  { quirk: 'Clocks every exit the moment they enter a room', statAffinity: { wisdom: 1.2, constitution: 1.2 } },
  { quirk: 'Carries one small object that has no practical use — never explains it', statAffinity: { wisdom: 1.2, charisma: 1.1 } },
  { quirk: 'Laughs at the wrong moments — deaths, confessions, bad news', statAffinity: { constitution: 1.1, wisdom: 0.8 } },
  { quirk: 'Can fall asleep anywhere, instantly — a skill born from necessity', statAffinity: { constitution: 1.3, strength: 1.1 } },
  { quirk: 'Flinches at sudden movement on their left side — never mentions it', statAffinity: { constitution: 0.9, strength: 1.1 } },
  // Fantasy-specific
  { quirk: 'Checks their weapon\'s edge obsessively — even mid-conversation', statAffinity: { dexterity: 1.3, strength: 1.1 } },
  { quirk: 'Refuses to sleep indoors if they can possibly avoid it', statAffinity: { wisdom: 1.2, constitution: 1.2 } },
  { quirk: 'Mutters a quiet prayer before eating — even tavern slop that doesn\'t deserve one', statAffinity: { wisdom: 1.3 } },
  { quirk: 'Has a deeply specific hatred of a particular monster — brings it up unprompted', statAffinity: { strength: 1.2, wisdom: 1.1 } },
  { quirk: 'Compulsively maps new spaces — scratches diagrams in dirt or parchment margin', statAffinity: { intelligence: 1.3, dexterity: 1.1 } },
  { quirk: 'Always knows which direction is north — insists on orienting everyone else, whether they asked or not', statAffinity: { wisdom: 1.3, intelligence: 1.1 } },
  { quirk: 'Tastes unfamiliar liquids before identifying them — has not died yet', statAffinity: { constitution: 1.3, wisdom: 0.8 } },
  { quirk: 'Apologises to objects they damage — doors, walls, unfortunate furniture', statAffinity: { wisdom: 1.2, charisma: 1.1 } },
];
