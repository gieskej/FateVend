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


// ── SPECIES ───────────────────────────────────────────────────────────────
// Structured as broad category + evocative flavor detail.
// The flavor informs Claude's physical/behavioral description prose —
// never stated as a clinical label in the output.
// No stat affinities — species is not correlated with capability.

export const SPECIES = [

  // ── HUMAN VARIANTS ────────────────────────────────────────────────────
  {
    id: 'human_earther',
    broad: 'Human',
    flavor: 'Earther — born gravity-side, stockier bone density, carries a particular wariness toward anyone who has never needed to worry about weather',
    weight: 15,
    iconPrompt: 'A person with a stockier bone density and a particular wariness toward anyone who has never needed to worry about weather',
    iconPath: 'icons/SPECIES#human_earther.png'
  },
  {
    id: 'human_colonist',
    broad: 'Human',
    flavor: 'Colonist — raised on a settled world not Earth, adapted to local gravity and light, pragmatic in ways that confuse people who grew up with safety nets',
    weight: 12,
    iconPrompt: 'A person raised on a settled world not Earth, adapted to local gravity and light, pragmatic in ways that confuse people who grew up with safety nets',
    iconPath: 'icons/SPECIES#human_colonist.png'
  },
  {
    id: 'human_spacer',
    broad: 'Human',
    flavor: 'Spacer — born or raised aboard ships or stations, lean frame from variable-g, skin that\'s never quite seen enough real light, reads pressure changes in a room the way others read faces',
    weight: 8,
    iconPrompt: 'A person born or raised aboard ships or stations, lean frame from variable-g, skin that\'s never quite seen enough real light, reads pressure changes in a room the way others read faces',
    iconPath: 'icons/SPECIES#human_spacer.png'
  },
  {
    id: 'human_corp',
    broad: 'Human',
    flavor: 'Corp citizen — raised inside a megacorporate arcology, good teeth, filtered air their whole life, a slightly uncanny social ease that comes from being managed since birth',
    weight: 8,
    iconPrompt: 'A person raised inside a megacorporate arcology, good teeth, filtered air their whole life, a slightly uncanny social ease that comes from being managed since birth',
    iconPath: 'icons/SPECIES#human_corp.png'
  },

  // ── CYBORG ────────────────────────────────────────────────────────────
  {
    id: 'cyborg_light',
    broad: 'Cyborg',
    flavor: 'Lightly augmented — one or two integrated systems, subdermal ports or a replacement limb, biological baseline mostly intact but the seams are visible if you look',
    weight: 12,
    iconPrompt: 'A person with one or two integrated systems, subdermal ports or a replacement limb, biological baseline mostly intact but the seams are visible if you look',
    iconPath: 'icons/SPECIES#cyborg_light.png'
  },
  {
    id: 'cyborg_heavy',
    broad: 'Cyborg',
    flavor: 'Heavily augmented — more synthetic than biological now, the remaining organic parts feel almost decorative, moves with a precision that unsettles people who aren\'t used to it',
    weight: 5,
    iconPrompt: 'A person who is more synthetic than biological now, the remaining organic parts feel almost decorative, moves with a precision that unsettles people who aren\'t used to it',
    iconPath: 'icons/SPECIES#cyborg_heavy.png'
  },

  // ── ANDROID ───────────────────────────────────────────────────────────
  {
    id: 'android',
    broad: 'Android',
    flavor: 'Android — fully synthetic, designed to pass at conversational distance, gets clocked by medscans and anyone who has been looking long enough; the question of personhood is legally unsettled and they are aware of this',
    weight: 6,
    iconPrompt: 'A fully synthetic being designed to pass at conversational distance, gets clocked by medscans and anyone who has been looking long enough; the question of personhood is legally unsettled and they are aware of this',
    iconPath: 'icons/SPECIES#android.png'
  },

  // ── UPLIFTED ──────────────────────────────────────────────────────────
  {
    id: 'uplift_primate',
    broad: 'Uplifted',
    flavor: 'Uplifted primate — enhanced cognition and fine motor precision from a corps-funded programme that\'s since been shut down, navigates a world built for a species that still isn\'t sure how to treat them',
    weight: 4,
    iconPrompt: 'An uplifted primate with enhanced cognition and fine motor precision from a corps-funded programme that\'s since been shut down, navigates a world built for a species that still isn\'t sure how to treat them',
    iconPath: 'icons/SPECIES#uplift_primate.png'
  },
  {
    id: 'uplift_feline',
    broad: 'Uplifted',
    flavor: 'Uplifted feline — heightened reflexes and senses, bipedal and fully sapient, the ears and tail are real, the patience for human inefficiency is synthetic',
    weight: 3,
    iconPrompt: 'An uplifted feline with heightened reflexes and senses, bipedal and fully sapient, the ears and tail are real, the patience for human inefficiency is synthetic',
    iconPath: 'icons/SPECIES#uplift_feline.png'
  },

  // ── CLONE ─────────────────────────────────────────────────────────────
  {
    id: 'clone_baseline',
    broad: 'Clone',
    flavor: 'Clone — baseline print, no notable deviations from the source template, grown and decanted like product; the paperwork says they have rights and the paperwork is technically accurate',
    weight: 5,
    iconPrompt: 'A clone with a baseline print, no notable deviations from the source template, grown and decanted like product; the paperwork says they have rights and the paperwork is technically accurate',
    iconPath: 'icons/SPECIES#clone_baseline.png'
  },
  {
    id: 'clone_notable',
    broad: 'Clone',
    flavor: 'Clone — divergent from baseline, whether by design, incident, or the slow drift of living; they may share a face with someone they have never met and would rather not',
    weight: 2,
    iconPrompt: 'A clone divergent from baseline, whether by design, incident, or the slow drift of living; they may share a face with someone they have never met and would rather not',
    iconPath: 'icons/SPECIES#clone_notable.png'
  },

  // ── MUTANT ────────────────────────────────────────────────────────────
  {
    id: 'mutant',
    broad: 'Mutant',
    flavor: 'Mutant — radiation, unregulated biotech, or something in the water; whatever the cause the changes are real and unasked-for, and they have learned which ones to hide',
    weight: 5,
    iconPrompt: 'A mutant with radiation, unregulated biotech, or something in the water; whatever the cause the changes are real and unasked-for, and they have learned which ones to hide',
    iconPath: 'icons/SPECIES#mutant.png'
  },

  // ── ALIEN ─────────────────────────────────────────────────────────────
  {
    id: 'alien_humanoid',
    broad: 'Alien',
    flavor: 'Humanoid alien — bipedal, bilaterally symmetrical, close enough to pass in a crowd until they don\'t; first contact was a generation ago and the social infrastructure for integration is still catching up',
    weight: 6,
    iconPrompt: 'A humanoid alien — bipedal, bilaterally symmetrical, close enough to pass in a crowd until they don\'t; first contact was a generation ago and the social infrastructure for integration is still catching up',
    iconPath: 'icons/SPECIES#alien_humanoid.png'
  },
  {
    id: 'alien_nonhumanoid',
    broad: 'Alien',
    flavor: 'Non-humanoid alien — the interface between their natural form and human-built space requires ongoing adaptation in both directions; they have opinions about the chair situation',
    weight: 2,
    iconPrompt: 'A non-humanoid alien — the interface between their natural form and human-built space requires ongoing adaptation in both directions; they have opinions about the chair situation',
    iconPath: 'icons/SPECIES#alien_nonhumanoid.png'
  },
];

// ── APPEARANCE ────────────────────────────────────────────────────────────
// Layered system. Each layer resolved independently, then passed to Claude
// as a compact description block. Claude writes appearance into prose —
// never as a bullet list.
//
// Stat affinities:
//   constitution → build (high = durable/fit, low = worn/thin)
//   strength     → build reinforcement
//   charisma     → presentation/grooming skew

export const BUILDS = [
  { id: 'lean',            label: 'lean, wiry',                    statAffinity: { constitution: 0.9, dexterity: 1.2 } },
  { id: 'average',         label: 'average build',                 statAffinity: {} },
  { id: 'stocky',          label: 'stocky, solid',                 statAffinity: { strength: 1.2, constitution: 1.1 } },
  { id: 'powerful',        label: 'powerfully built',              statAffinity: { strength: 1.5, constitution: 1.2 } },
  { id: 'heavyset',        label: 'heavyset',                      statAffinity: { constitution: 1.1, strength: 1.1, dexterity: 0.8 } },
  { id: 'tall_rangy',      label: 'tall and rangy',                statAffinity: { dexterity: 1.1 } },
  { id: 'toned',           label: 'lean, toned but not too bulky', statAffinity: { charisma: 1.2, strength: 1.1 } },
  { id: 'thin_underfed',   label: 'thin, underfed-looking',        statAffinity: { constitution: 0.7, wisdom: 1.1 } },
  { id: 'synthetic_smooth',label: 'synthetic-smooth, uniform',     statAffinity: { charisma: 1.2 } },
];

// ── HAIR ─────────────────────────────────────────────────────────────────
export const HAIR = [
  'adaptive color based on emotion, long and flowing',
  'always under a hood',
  'auburn, braided with synthetic fibers',
  'bald',
  'bald, polished chrome',
  'bald, scalp-mounted antenna array',
  'black, close-cropped',
  'black, long and straight',
  'black, Medusa hair that moves on its own, almost alive',
  'black, medium-length, greased and slicked back',
  'black, swept to one side with a metallic sheen',
  'black, tightly braided with embedded circuitry',
  'black, voluminous and styled with holographic gel',
  'black, with a shaved undercut',
  'black, with streaks of neon blue',
  'black, bobcut',
  'black, short and spiky',
  'blonde, long and loose',
  'blonde, shoulder-length',
  'blonde, short and spiky',
  'blonde, pixie cut',
  'blue, short, neon-dyed',
  'brown, dreadlocks',
  'brown, pulled back',
  'brown, shoulder-length',
  'brown, short and spiky',
  'brown, wild and unkempt',
  'chestnut, gorgeous flowing locks',
  'gray ponytail',
  'gray, buzzed short',
  'green, mohawk',
  'multicolored, dyed in neon colors',
  'platinum, impeccably styled',
  'purple, glowing bioluminescent-dyed',
  'purple, chrome-tipped',
  'red, barely maintained',
  'shaved stubble',
  'silver, shaved on one side',
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
