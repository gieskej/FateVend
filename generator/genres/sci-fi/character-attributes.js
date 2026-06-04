// genres/sci-fi/character-attributes.js
// Randomizable identity and appearance attributes for the sci-fi genre.
// Each attribute is resolved independently before the AI call.
//
// Design rules:
//   - No stat affinities on identity attributes (gender, species, orientation)
//     Identity is not correlated with capability in this system.
//   - Stat affinities ARE used for appearance (constitution → build/health markers)
//     and quirks (various stats suggest different behavioral tells).
//   - Species replaces Ethnicity — same structural role, sci-fi flavor.
//   - Appearance uses a layered system: build + hair + one distinguishing feature.
//     Claude assembles these into prose.
//   - One quirk per character — picked from a pool, weighted by stats.

import { GENDERS } from '../../common/genders.js';
import { ORIENTATIONS } from '../../common/orientations.js';
import { RACES } from './races.js';
import { BUILDS } from '../../common/build.js';
import { HAIR as HAIR_COMMON } from '../../common/hair.js';

// ── HAIR ─────────────────────────────────────────────────────────────────

export const HAIR = [
  ...HAIR_COMMON,
  // sci-fi additions
  'adaptive color based on emotion, long and flowing',
  'always under a hood',
  'auburn, braided with synthetic fibers',
  'bald, polished chrome',
  'bald, scalp-mounted antenna array',
  'purple, glowing bioluminescent-dyed',
  'purple, chrome-tipped',
];

// ── DISTINGUISHING FEATURES ───────────────────────────────────────────────
// Two null entries included to produce approximately 25% no-feature chance.

export const DISTINGUISHING_FEATURES = [
  { id: 'subdermal_ridges',    label: 'subdermal implant ridges visible along the jaw or temple'         },
  { id: 'synthetic_eyes',      label: 'synthetic eyes — too bright, too steady, don\'t quite track right' },
  { id: 'plasma_burn',         label: 'a plasma burn scar across one side of the face or neck'           },
  { id: 'prosthetic_limb',     label: 'a mechanical prosthetic limb — well-maintained or conspicuously not' },
  { id: 'neural_ports',        label: 'neural interface ports at the temple or neck, visible even when not in use'  },
  { id: 'colour_shifting_skin',label: 'colour-shifting skin panels — biohack, probably not approved'     },
  { id: 'corp_tattoo',         label: 'a corporate ID tattoo they haven\'t bothered to remove'           },
  { id: 'embarrassing_tattoo', label: 'an embarrassing tattoo they try to cover'                         },
  { id: 'mismatched_eyes',     label: 'mismatched eyes — one biological, one mechanical, neither warm'   },
  { id: 'chrome_fingers',      label: 'missing fingers replaced by chrome, no attempt to disguise it'    },
  { id: 'vacuum_burn',         label: 'vacuum burn scarring across the back of one hand'                  },
  { id: 'serial_number',       label: 'a serial number on the side of the neck — origin unclear'         },
  { id: 'economy_of_movement', label: 'an uncanny economy of movement — nothing wasted, nothing casual'  },
  { id: 'respirator',          label: 'always wearing a respirator, indoors or out, no explanation offered' },
  { id: 'incident_scar',       label: 'a scar from an unspecified incident they don\'t discuss'           },
  { id: 'too_perfect',         label: 'a too-perfect complexion — vat-grown smooth, unsettling up close'  },
  { id: 'none',                label: null /* no distinguishing feature */                                },
  { id: 'none2',               label: null /* padding to reduce feature frequency */                      },
];

// ── QUIRKS ────────────────────────────────────────────────────────────────
// One quirk per character. Each is a single vivid behavioral or physical tell —
// specific enough to be interesting, grounded in sci-fi experience.
// Stat affinities weight selection toward fitting character types.

export const QUIRKS = [

  // ── OPERATIONAL HABITS ────────────────────────────────────────────────
  {
    id: 'threat_assessment',
    quirk: 'Runs a threat assessment on every room they enter — narrates it quietly, as if the habit never got an off switch',
    statAffinity: { wisdom: 1.3, intelligence: 1.2 },
  },
  {
    id: 'manual_override',
    quirk: 'Taps a manual override before trusting any automated system — restaurants, airlocks, elevators. All of them.',
    statAffinity: { intelligence: 1.2, wisdom: 1.2 },
  },
  {
    id: 'talks_to_ship',
    quirk: 'Speaks to the ship or station like it can hear — because in their experience, sometimes it can',
    statAffinity: { wisdom: 1.2, charisma: 1.1 },
  },
  {
    id: 'physical_notebook',
    quirk: 'Keeps a physical notebook in the age of neural storage — writes everything down, old-fashioned and deliberate about it',
    statAffinity: { intelligence: 1.3, wisdom: 1.1 },
  },
  {
    id: 'left_sensor',
    quirk: 'Flinches at sudden light on the left — an old sensor issue, never fully resolved, never mentioned',
    statAffinity: { constitution: 0.9, dexterity: 1.1 },
  },
  {
    id: 'airlock_check',
    quirk: 'Checks the nearest airlock on entering any pressurised space — notes the cycle time, notes the seal condition, moves on',
    statAffinity: { wisdom: 1.2, constitution: 1.1 },
  },
  {
    id: 'real_food',
    quirk: 'Refuses to eat synth-protein without adding something real to it — a dried herb, a spice packet, anything — and gets unreasonably specific about why',
    statAffinity: { constitution: 1.1, wisdom: 1.1 },
  },
  {
    id: 'eva_breathing',
    quirk: 'Counts breathing cycles under stress — four in, hold, four out — an EVA habit that never left',
    statAffinity: { constitution: 1.2, wisdom: 1.1 },
  },
  {
    id: 'names_equipment',
    quirk: 'Names all their equipment; becomes quietly inconsolable when a named tool finally fails',
    statAffinity: { wisdom: 1.2, intelligence: 1.1 },
  },
  {
    id: 'paper_maps',
    quirk: 'Trusts paper maps over nav systems — carries one for every station they\'ve docked at, annotated in a personal shorthand',
    statAffinity: { intelligence: 1.3, wisdom: 1.2 },
  },
  {
    id: 'double_backup',
    quirk: 'Runs manual backups twice, in different formats, in different physical locations — and still doesn\'t feel good about it',
    statAffinity: { intelligence: 1.2, wisdom: 1.1 },
  },
  {
    id: 'reads_changelog',
    quirk: 'Never patches a software update without reading the full changelog — a decision that has saved them twice and costs them hours every cycle',
    statAffinity: { intelligence: 1.4, wisdom: 1.1 },
  },
  {
    id: 'fixes_not_talks',
    quirk: 'Fixes things instead of talking about feelings — everyone around them has more working equipment than they know what to do with',
    statAffinity: { intelligence: 1.2, dexterity: 1.2 },
  },
  {
    id: 'sleeps_anywhere',
    quirk: 'Can fall asleep anywhere in ninety seconds — a skill developed out of necessity and never quite relinquished',
    statAffinity: { constitution: 1.3, strength: 1.1 },
  },
  {
    id: 'visible_exit',
    quirk: 'Won\'t enter a room without a visible exit — will physically relocate until this condition is met',
    statAffinity: { wisdom: 1.2, constitution: 1.2 },
  },
  {
    id: 'paranoid_maintenance',
    quirk: 'Maintains their augments at a level that the manufacturer would describe as "beyond spec" and that their colleagues describe as paranoid',
    statAffinity: { intelligence: 1.2, dexterity: 1.3 },
  },

  // ── SPEECH & SOCIAL ───────────────────────────────────────────────────
  {
    id: 'unsettling_pause',
    quirk: 'Pauses unsettlingly before any direct answer — long enough that people start filling in their own interpretation',
    statAffinity: { wisdom: 1.3, intelligence: 1.1 },
  },
  {
    id: 'dark_humour_deflect',
    quirk: 'Deflects anything personal with dark humour — the darker the subject, the funnier the deflection, and they know it',
    statAffinity: { charisma: 1.3, wisdom: 0.9 },
  },
  {
    id: 'emergency_frequencies',
    quirk: 'Has memorised the emergency frequencies for every station they\'ve ever docked at — not written down, just there',
    statAffinity: { intelligence: 1.3, wisdom: 1.2 },
  },
  {
    id: 'callsigns',
    quirk: 'Never uses real names on open comms — everyone gets a callsign whether they asked for one or not',
    statAffinity: { wisdom: 1.2, intelligence: 1.1 },
  },

  // ── OBJECTS & RITUALS ─────────────────────────────────────────────────
  {
    id: 'carries_relic',
    quirk: 'Carries one item from before — the accident, the war, the decision — and you can tell when they\'re touching it through the pocket',
    statAffinity: { wisdom: 1.3, charisma: 1.1 },
  },
  {
    id: 'augment_diagnostic',
    quirk: 'Runs a daily augment diagnostic out loud, like a ritual — the same sequence, the same phrasing, every time',
    statAffinity: { intelligence: 1.2, constitution: 1.1 },
  },
  {
    id: 'extraction_codeword',
    quirk: 'Gives everyone they trust a codeword for "I need extraction" — has needed it used exactly once, and that was enough',
    statAffinity: { wisdom: 1.3, intelligence: 1.2 },
  },
];
