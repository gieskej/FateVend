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

export { GENDERS } from '../../common/genders.js';
export { ORIENTATIONS } from '../../common/orientations.js';
export { BUILDS } from '../../common/build.js';
export { RACES as SPECIES } from './races.js';

import { HAIR as HAIR_COMMON } from '../../common/hair.js';

// ── HAIR ─────────────────────────────────────────────────────────────────

export const HAIR = [
  ...HAIR_COMMON,
  // sci-fi additions
  'adaptive color hair based on emotion, long and flowing',
  'hair always under a hood',
  'auburn hair braided with synthetic fibers',
  'bald polished chrome',
  'bald scalp-mounted antenna array',
  'purple glowing bioluminescent-dyed hair',
  'purple chrome-tipped hair',
];

// ── DISTINGUISHING FEATURES ───────────────────────────────────────────────
// Two null entries included to produce approximately 25% no-feature chance.

export const DISTINGUISHING_FEATURES = [
  { id: 'subdermal_ridges',    label: 'subdermal implant ridges visible along the jaw or temple'                    },
  { id: 'synthetic_eyes',      label: 'synthetic eyes — too bright, too steady, don\'t quite track right'           },
  { id: 'plasma_burn',         label: 'a plasma burn scar across one side of the face or neck'                      },
  { id: 'prosthetic_limb',     label: 'a mechanical prosthetic limb — well-maintained or conspicuously not'         },
  { id: 'neural_ports',        label: 'neural interface ports at the temple or neck, visible even when not in use'  },
  { id: 'colour_shifting_skin',label: 'colour-shifting skin panels — biohack, probably not approved'                },
  { id: 'corp_tattoo',         label: 'a corporate ID tattoo they haven\'t bothered to remove'                      },
  { id: 'embarrassing_tattoo', label: 'an embarrassing tattoo they try to cover'                                    },
  { id: 'mismatched_eyes',     label: 'mismatched eyes — one biological, one mechanical, neither warm'              },
  { id: 'chrome_fingers',      label: 'missing fingers replaced by chrome, no attempt to disguise it'               },
  { id: 'vacuum_burn',         label: 'vacuum burn scarring across the back of one hand'                            },
  { id: 'serial_number',       label: 'a serial number on the side of the neck — origin unclear'                    },
  { id: 'economy_of_movement', label: 'an uncanny economy of movement — nothing wasted, nothing casual'             },
  { id: 'respirator',          label: 'always wearing a respirator, indoors or out, no explanation offered'         },
  { id: 'incident_scar',       label: 'a scar from an unspecified incident they don\'t discuss'                     },
  { id: 'too_perfect',         label: 'a too-perfect complexion — vat-grown smooth, unsettling up close'            },
  { id: 'decompression_scars', label: 'decompression scarring across the neck and collarbone — the capillaries never quite healed right' },
  { id: 'synthetic_ear',       label: 'one ear replaced by a sensor array — slightly too good at picking things up' },
  { id: 'cooling_vents',       label: 'heat dissipation vents along the forearm — visible, warm to the touch, occasionally audible' },
  { id: 'nerve_twitch',        label: 'a subtle, involuntary hand twitch — old nerve implant, never worth fixing, impossible not to notice' },
  { id: 'skin_mismatch',       label: 'a patch of synthetic skin on the jaw or cheek that doesn\'t quite match — close, but not close enough' },
  { id: 'bioluminescent',      label: 'faint bioluminescent markings along the neck or forearms — natural, modified, or both; they\'re not saying' },
  { id: 'radiation_pattern',   label: 'radiation exposure patterning across one side of the face — a map of a bad decision or bad luck'  },
  { id: 'gravity_limp',        label: 'a slight asymmetry in their gait — long-haul low-gravity damage, the kind physio can\'t fully fix'  },
  { id: 'subcutaneous_display',label: 'a subcutaneous data display visible through the skin of the wrist — numbers scrolling, always on'   },
  { id: 'military_brand',      label: 'a unit brand or service mark on the forearm — not decorative, not hidden, not discussed'            },
  { id: 'magnetic_hands',      label: 'fingertips with magnetic implants — small metal objects drift toward them at close range, which they find funny' },
  { id: 'none',                label: null /* no distinguishing feature */                                                                 },
  { id: 'none2',               label: null /* padding to reduce feature frequency */                                                       },
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
    quirk: 'Counts breathing cycles under stress — four in, four out, hold — an EVA habit that never left',
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

  {
    id: 'suit_order',
    quirk: 'Has extremely strong opinions about the correct order to put on a pressure suit and will share them, unprompted, while you are already putting yours on incorrectly',
    statAffinity: { wisdom: 1.2, charisma: 0.9 },
  },
  {
    id: 'thanks_the_ai',
    quirk: 'Instinctively says "thank you" to every AI system — life support, vending units, nav computers. Insists it\'s just good manners. Will not be argued out of this.',
    statAffinity: { charisma: 1.2, wisdom: 1.1 },
  },
  {
    id: 'working_as_intended',
    quirk: 'Reflexively says "working as intended" when something breaks catastrophically — delivered with total sincerity, which somehow makes it worse',
    statAffinity: { intelligence: 1.2, charisma: 0.9 },
  },
  {
    id: 'corrects_grip',
    quirk: 'Cannot watch someone hold a multi-tool incorrectly and say nothing — has started more conversations with "sorry, do you mind if I—" than they\'ve had hot meals',
    statAffinity: { dexterity: 1.3, charisma: 0.9 },
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
  {
    id: 'status_report',
    quirk: 'Answers "how are you?" with a full status report: systems nominal, mood at 64%, caloric intake below target. It\'s thorough. Nobody asked for thorough.',
    statAffinity: { intelligence: 1.2, charisma: 0.8 },
  },
  {
    id: 'literal_idioms',
    quirk: 'Takes idioms completely literally — has caused at least one diplomatic misunderstanding and still maintains they were the reasonable one in that situation',
    statAffinity: { intelligence: 1.3, charisma: 0.8 },
  },
  {
    id: 'voice_messages',
    quirk: 'Still sends voice messages when everyone else has moved to neural text — always three times longer than necessary and ending with "okay, that\'s it, bye... actually one more thing"',
    statAffinity: { charisma: 1.2, intelligence: 0.9 },
  },
  {
    id: 'stat_compliments',
    quirk: 'Cannot accept a compliment without immediately providing statistical context for why it\'s probably undeserved — a habit others describe as exhausting and endearing in equal measure',
    statAffinity: { intelligence: 1.3, charisma: 0.8 },
  },
  {
    id: 'job_title_first',
    quirk: 'Introduces themselves by job function first, name second, and finds it genuinely puzzling that other people do it the other way around',
    statAffinity: { intelligence: 1.1, charisma: 0.9 },
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
  {
    id: 'lucky_rational',
    quirk: 'Carries a lucky charm but has prepared a detailed rational explanation for why it doesn\'t count as superstition — unpacks the whole argument if you look at the charm for more than two seconds',
    statAffinity: { intelligence: 1.2, wisdom: 0.9 },
  },
  {
    id: 'manual_alarm',
    quirk: 'Keeps a physical alarm clock as backup to their neural wake cycle — has never once needed it and calls it "redundancy protocol" rather than admit it\'s a comfort object',
    statAffinity: { intelligence: 1.1, wisdom: 1.1 },
  },
  {
    id: 'ship_third_person',
    quirk: 'Refers to their ship by name, in the third person, and gently corrects anyone who doesn\'t — "she, not it. She has feelings about that."',
    statAffinity: { charisma: 1.2, wisdom: 1.1 },
  },
  {
    id: 'terrible_coffee',
    quirk: 'Drinks the same terrible recycled station coffee every morning and has developed a detailed philosophy about why good coffee would be a distraction',
    statAffinity: { constitution: 1.2, wisdom: 1.0 },
  },
];
