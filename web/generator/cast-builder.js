// generator/cast-builder.js
// Assembles the supporting cast for a protagonist.
//
// Changes from v1:
//   - Parents and siblings share the protagonist's last name
//     (with optional divergence for divorced/remarried parents)
//   - NPC first names are drawn from ethnicity-matched pools
//   - Friends and foils get culturally neutral names (they come from anywhere)
//   - Dynamics and traits lean toward playable, occasionally funny,
//     rather than uniformly heavy
//
// No browser APIs. No Node-specific APIs. Pure JS.

import { uniformPick, uniformPickN, randomInt } from './selector.js';
import { PARENT_STATUSES, SIBLING_DYNAMICS }    from './genres/modern/family-structures.js';
import { poolFor, pickFirstName }               from './skeleton-builder.js';

// Gender id → display label (mirrors common/genders.js without the import)
const GENDER_LABELS = {
  man: 'Male', trans_man: 'Trans male', woman: 'Female',
  trans_woman: 'Trans female', non_binary: 'Non-binary', genderfluid: 'Genderfluid',
};

// Picks a random broad identity key from namePools (excluding 'default' fallback).
function randomBroadFrom(namePools) {
  const keys = Object.keys(namePools).filter(k => k !== 'default');
  return uniformPick(keys.length ? keys : Object.keys(namePools));
}

// Returns a full name for an NPC drawn from the genre's name pools.
function nameForGender(genderId, namePools) {
  const broad    = randomBroadFrom(namePools);
  const pool     = poolFor(namePools, broad);
  const firstName = pickFirstName(genderId, pool);
  const lastName  = uniformPick(pool.last);
  return { fullName: `${firstName} ${lastName}`, broad };
}

function neutralGenderId() {
  const r = Math.random();
  return r < 0.45 ? 'man' : r < 0.90 ? 'woman' : 'non_binary';
}

// Returns 'man' or 'woman' for the love interest based on protagonist orientation+gender.
function loveInterestGenderId(protagonistGenderId, protagonistOrientation) {
  const isMasc = protagonistGenderId === 'man'   || protagonistGenderId === 'trans_man';
  const isFem  = protagonistGenderId === 'woman' || protagonistGenderId === 'trans_woman';
  const orient = (protagonistOrientation ?? '').toLowerCase();

  if (orient.includes('straight')) {
    if (isMasc) return 'woman';
    if (isFem)  return 'man';
  } else if (orient.includes('gay') || orient.includes('lesbian')) {
    if (isMasc) return 'man';
    if (isFem)  return 'woman';
  }
  // bisexual, pansexual, asexual, questioning, non-binary — any gender
  return Math.random() < 0.5 ? 'man' : 'woman';
}

// ── NPC TRAIT POOLS ───────────────────────────────────────────────────────
// Mix of light, dark, and comedic traits — weighted so not every NPC
// is "quietly broken" or "bitter". Playable characters need people
// worth talking to.

const TRAITS_POSITIVE = [
  'fiercely loyal',         'surprisingly funny',       'the most reliable person alive',
  'embarrassingly earnest', 'annoyingly optimistic',    'good in a crisis',
  'generous to a fault',    'shamelessly enthusiastic', 'the one who always has snacks',
  'makes everyone feel seen','weirdly calm under pressure','knows everyone in town',
  'gives excellent unsolicited advice','never holds a grudge','always picks up the phone',
];
const TRAITS_MIXED = [
  'charming and unreliable', 'protective',         'impulsive',
  'pragmatic',               'idealistic',         'hard to read',
  'stubborn',                'quietly ambitious',  'unpredictable',
  'hot-tempered but quick to apologise',            'means well, executes poorly',
  'emotionally unavailable except at 2am',          'the world\'s worst liar',
  'extremely competent at exactly one thing',       'allergic to asking for help',
];
const TRAITS_DARK = [
  'emotionally closed',     'deeply anxious',      'cynical',
  'bitter',                 'secretive',           'manipulative',
  'living in the past',     'burned out',          'quietly broken',
  'running from something', 'one bad decision from disaster',
];

const NPC_TRAITS = [...TRAITS_POSITIVE, ...TRAITS_MIXED, ...TRAITS_DARK];

// ── FRIEND DYNAMICS ───────────────────────────────────────────────────────
// Roughly half warm, half complicated — but all feel like real friendships

const FRIEND_DYNAMICS = [
  'The person {n} calls when things go sideways — and they always pick up',
  'Has covered for {n} before. Will probably have to again.',
  'Believes in {n} more than {n} believes in themselves',
  'The only person who can make {n} laugh when things are genuinely terrible',
  'Has their own chaos, but shows up for {n} anyway',
  'Knows every embarrassing story and has never weaponised one',
  'Drifted for a while; they\'re close again now, pretending the gap never happened',
  'Technically {n}\'s oldest friend — the history is more complicated than the friendship',
  'Would absolutely help {n} move a body. No questions. Light snacks provided.',
  'The voice in {n}\'s head that says "are you sure about this?" — usually right',
  'Has opinions about all of {n}\'s decisions and shares them regardless',
  'Knows {n} better than anyone and has decided to stay anyway',
];

// ── FOIL ROLES ────────────────────────────────────────────────────────────
const FOIL_ROLES = [
  {
    role: 'rival',
    dynamics: [
      'Wants what {n} has — and is closer to getting it than {n} realises',
      'Grew up alongside {n}; the competition never officially ended',
      'Respects {n} just enough to make the rivalry feel personal',
      'Would help {n} in a genuine crisis, but only to stay one step ahead',
      'The only person who can beat {n} — which {n} finds both infuriating and motivating',
    ],
  },
  {
    role: 'antagonist',
    dynamics: [
      'Has a reason to want things to go badly for {n} — and the patience to wait',
      'Operates in the same world as {n}, just on the other side of a line',
      'Knows something about {n} that {n} wishes they didn\'t',
      'Isn\'t villainous — just pursuing something that puts them directly in {n}\'s way',
      'Honestly believes they\'re the reasonable one in this situation',
    ],
  },
  {
    role: 'love interest',
    dynamics: [
      'Has known {n} long enough to see past the performance — still here',
      'Wants more from {n} than {n} knows how to give right now',
      'The timing has never been right. Might never be. They\'re both ignoring this.',
      'Is making {n} question things they thought were settled',
      'Finds {n}\'s specific brand of disaster oddly endearing',
    ],
  },
  {
    role: 'estranged former ally',
    dynamics: [
      'Used to be the person {n} trusted most. Something happened. Neither talks about it.',
      'Resurfaces at exactly the wrong moment, as they always do',
      'Could be an asset or a liability — {n} genuinely doesn\'t know which',
      'The unfinished business between them has developed serious interest',
    ],
  },
];

// ── PARTNER DATA ──────────────────────────────────────────────────────────

const PARTNER_ROLE = {
  dating:      'partner',
  engaged:     'fiancé(e)',
  married:     'spouse',
  separated:   'separated spouse',
  divorced:    'ex-spouse',
  widowed:     'late spouse',
  complicated: 'complicated relationship',
};

const PARTNER_STATUS = {
  dating:      'present — dating',
  engaged:     'present — engaged',
  married:     'present — married',
  separated:   'separated — still legally married',
  divorced:    'divorced',
  widowed:     'deceased',
  complicated: 'present — status unclear',
};

const PARTNER_DYNAMICS = {
  dating: [
    'Things are good — probably. {n} keeps waiting for the catch.',
    'More serious than {n} is ready to admit, even to themselves',
    'The person {n} is currently trying to be good for, with mixed success',
    'They met at the worst possible moment. Still here.',
  ],
  engaged: [
    'The wedding is set. {n} has feelings about this they are actively not examining.',
    'Has rearranged their entire sense of the future to include {n}',
    'The person who knows exactly what they\'re getting into — and said yes anyway',
    '{n} proposed impulsively and has since become quietly convinced it was the right call',
  ],
  married: [
    'Knows exactly when {n} is lying — and which lies are worth calling out',
    'Has built something real with {n}, one argument and one quiet evening at a time',
    'The person who still surprises {n}, after everything',
    'The marriage is good. The current situation is putting pressure on "good".',
    'Has covered for {n} more times than {n} remembers — and fewer than they do',
  ],
  separated: [
    'Still technically {n}\'s spouse. The "technically" is doing a lot of work there.',
    'It hasn\'t been filed yet. {n} keeps telling themselves it\'s just not the right moment.',
    'Lives separately now. Still shows up in {n}\'s life in ways that complicate everything.',
  ],
  divorced: [
    'They\'re civil. It took a while to get here.',
    'The split was {n}\'s fault, their fault, nobody\'s fault — depends who you ask.',
    'Back in {n}\'s orbit in a professional context, which is either fine or a disaster.',
    '{n} ran into them recently. Stranger than expected. Still not sure what to make of it.',
  ],
  widowed: [
    '{n} still reaches for their phone to send them something, before remembering.',
    'The grief is old enough that {n} can function. That\'s the word they use: function.',
    'Would have known exactly what to say about the current situation. {n} thinks about that constantly.',
    'The chair is still where they left it. {n} hasn\'t moved it.',
  ],
  complicated: [
    '"Complicated" does not fully capture the texture of what this actually is.',
    'Both of them agree on nothing — including whether this is a relationship.',
    '{n} would not call it healthy. {n} would also not call it finished.',
    'They have history. The history has opinions about the present.',
  ],
};

// ── SIBLING DYNAMICS ──────────────────────────────────────────────────────
const SIBLING_MAP = {
  protective_older:   n => `Stepped up for ${n} when no one else did — a habit they haven't broken`,
  rivalry:            n => `The competition with ${n} started in childhood and technically never stopped`,
  estranged:          n => `${n} and them haven't spoken in years. The reason is known. Unremarked upon.`,
  close_ally:         n => `The one person ${n} tells everything to, including the parts they shouldn't`,
  troubled:           n => `${n} is the "stable" one in this equation, which is its own kind of funny`,
  golden_child:       n => `The family benchmark — ${n} has spent years being measured against them without consent`,
  lost_touch:         n => `They were close once. Drifted. ${n} still occasionally drafts messages and doesn't send them`,
  deceased:           n => `Gone — and ${n} still sometimes forgets, for a moment, before remembering again`,
  younger_dependent:  n => `Looks to ${n} for stability ${n} is largely improvising`,
  reconnecting:       n => `Back in ${n}'s life after years away, both pretending it wasn't that long`,
};

// ── PARENT DYNAMICS ───────────────────────────────────────────────────────
const PARENT_DYNAMICS_ALIVE = [
  '{n} calls more often than they admit and less often than they mean to',
  'Has opinions about every choice {n} has made since roughly age seven',
  'Proud of {n} in ways they mostly express sideways, at inconvenient moments',
  'The relationship has improved significantly since {n} moved out',
  'Still sends clippings — actual clippings — of things they think {n} should know',
  'Knows something is wrong with {n} right now and is waiting to be asked',
  '{n} inherited exactly the traits they were hoping to avoid',
];
const PARENT_DYNAMIC_DECEASED = n =>
  `${n} still catches themselves thinking "I should call" before remembering`;

// ── FAMILY NAME LOGIC ─────────────────────────────────────────────────────
// Parents:  same last name as protagonist by default
//   Exception: divorced parents — one may have a different last name
//   Exception: absent/unknown parent — gets a different last name (unknown origin)
// Siblings: always same last name as protagonist

function familyLastName(protagonistLast, forceNew, ethnicityBroad, namePools) {
  if (!forceNew) return protagonistLast;
  const pool = poolFor(namePools, ethnicityBroad).last;
  const options = pool.filter(n => n !== protagonistLast);
  return uniformPick(options.length ? options : pool);
}

// ── PARENT BUILDER ────────────────────────────────────────────────────────

function buildParent(role, structure, protName, protLast, ethnicityBroad, namePools) {
  const pool = PARENT_STATUSES;
  let status;
  const id = structure.id;

  if (id === 'two_parent_one_deceased') {
    status = role === 'deceased'
      ? uniformPick(pool.filter(s => s.id.startsWith('deceased')))
      : uniformPick(pool.filter(s => !s.id.startsWith('deceased') && s.id !== 'absent_unknown' && s.id !== 'incarcerated'));
  } else if (id === 'two_parent_one_absent') {
    status = role === 'absent'
      ? uniformPick(pool.filter(s => s.id === 'absent_unknown' || s.id === 'estranged'))
      : uniformPick(pool.filter(s => !s.id.startsWith('deceased') && s.id !== 'absent_unknown'));
  } else if (['foster_care','orphaned_early','raised_by_grandparents','raised_by_older_sibling'].includes(id)) {
    status = uniformPick(pool.filter(s => s.id.startsWith('deceased') || s.id === 'absent_unknown' || s.id === 'estranged'));
  } else {
    status = uniformPick(pool);
  }

  const isDeceased  = status.id.startsWith('deceased');
  const isAbsent    = status.id === 'absent_unknown';
  const isDivorced  = id === 'two_parent_divorced' || id === 'two_parent_blended';
  const isMother    = role === 'mother';
  const genderId    = isMother ? 'woman' : 'man';

  // Divorced mothers may have reverted to maiden name; absent parents have different surname
  const useDifferentLast = isAbsent || (isDivorced && isMother && Math.random() < 0.5);
  const last = familyLastName(protLast, useDifferentLast, ethnicityBroad, namePools);

  const namePool  = poolFor(namePools, ethnicityBroad);
  const firstName = pickFirstName(genderId, namePool);

  const dynamic = isDeceased
    ? PARENT_DYNAMIC_DECEASED(protName)
    : fillD(uniformPick(PARENT_DYNAMICS_ALIVE), protName);

  return {
    name:    `${firstName} ${last}`,
    role:    isMother ? 'mother' : 'father',
    status:  status.label,
    gender:  GENDER_LABELS[genderId],
    race:    ethnicityBroad,
    traits:  pickTraits(2),
    dynamic,
  };
}

// ── SIBLING BUILDER ───────────────────────────────────────────────────────

function buildSibling(protName, protLast, ethnicityBroad, namePools) {
  const dyn         = uniformPick(SIBLING_DYNAMICS);
  const genderId    = Math.random() < 0.5 ? 'man' : 'woman';
  const namePool    = poolFor(namePools, ethnicityBroad);
  const firstName   = pickFirstName(genderId, namePool);
  const isOlder     = ['protective_older','golden_child'].includes(dyn.id);
  const isYounger   = dyn.id === 'younger_dependent';
  const role        = isOlder ? 'older sibling' : isYounger ? 'younger sibling' : 'sibling';

  return {
    name:    `${firstName} ${protLast}`,   // always shares family surname
    role,
    status:  dyn.id === 'deceased' ? 'deceased' : dyn.label,
    gender:  GENDER_LABELS[genderId],
    race:    ethnicityBroad,
    traits:  pickTraits(2),
    dynamic: (SIBLING_MAP[dyn.id] ?? (n => `Part of ${n}'s story in ways that are hard to untangle`))(protName),
  };
}

// ── FRIEND BUILDER ────────────────────────────────────────────────────────

function buildFriend(protName, namePools) {
  const genderId = neutralGenderId();
  const { fullName, broad } = nameForGender(genderId, namePools);
  return {
    name:    fullName,
    role:    'best friend',
    status:  'present and close',
    gender:  GENDER_LABELS[genderId],
    race:    broad,
    traits:  pickTraits(3),
    dynamic: fillD(uniformPick(FRIEND_DYNAMICS), protName),
  };
}

// ── FOIL BUILDER ──────────────────────────────────────────────────────────

function buildFoil(protName, protagonistGenderId, protagonistOrientation, excludeLoveInterest, namePools) {
  const pool     = excludeLoveInterest ? FOIL_ROLES.filter(f => f.role !== 'love interest') : FOIL_ROLES;
  const foilType = uniformPick(pool.length ? pool : FOIL_ROLES);
  let genderId;
  if (foilType.role === 'love interest' && protagonistGenderId && protagonistOrientation) {
    genderId = loveInterestGenderId(protagonistGenderId, protagonistOrientation);
  } else {
    genderId = neutralGenderId();
  }
  const { fullName, broad } = nameForGender(genderId, namePools);
  return {
    name:    fullName,
    role:    foilType.role,
    status:  'present',
    gender:  GENDER_LABELS[genderId],
    race:    broad,
    traits:  pickTraits(2),
    dynamic: fillD(uniformPick(foilType.dynamics), protName),
  };
}

// ── HELPERS ───────────────────────────────────────────────────────────────

function fillD(t, n) { return t.replace(/\{n\}/g, n); }
function pickTraits(n) { return uniformPickN(NPC_TRAITS, n); }

// ── PARTNER BUILDER ───────────────────────────────────────────────────────

const PARTNER_HAS_NPC = new Set(['dating','engaged','married','separated','divorced','widowed','complicated']);

function buildPartner(relStatusId, protName, protLast, ethnicityBroad, namePools, protagonistGenderId, protagonistOrientation) {
  const genderId = loveInterestGenderId(protagonistGenderId, protagonistOrientation);
  const namePool = poolFor(namePools, ethnicityBroad);
  const firstName = pickFirstName(genderId, namePool);
  const lastOpts  = namePool.last.filter(n => n !== protLast);
  const lastName  = uniformPick(lastOpts.length ? lastOpts : namePool.last);
  const dynamics  = PARTNER_DYNAMICS[relStatusId] ?? PARTNER_DYNAMICS.complicated;
  return {
    name:    `${firstName} ${lastName}`,
    role:    PARTNER_ROLE[relStatusId]   ?? 'partner',
    status:  PARTNER_STATUS[relStatusId] ?? 'present',
    gender:  GENDER_LABELS[genderId],
    race:    ethnicityBroad,
    traits:  pickTraits(3),
    dynamic: fillD(uniformPick(dynamics), protName),
  };
}

// ── MAIN CAST BUILDER ─────────────────────────────────────────────────────

/**
 * Builds the full supporting cast for a protagonist.
 *
 * @param {string} protagonistName         Full name e.g. "Maya Reyes"
 * @param {string} protagonistLast         Last name only e.g. "Reyes" — shared with family
 * @param {string} ethnicityBroad          e.g. "Latino" — used for family first name pools
 * @param {object} familyStructure         Resolved FAMILY_STRUCTURES entry
 * @param {object} [namePools]             Genre NAME_POOLS (threaded for consistency)
 * @param {string} [protagonistGenderId]   e.g. "man", "woman", "non_binary"
 * @param {string} [protagonistOrientation] e.g. "Straight", "Gay / Lesbian"
 * @param {string} [relationshipStatusId]  e.g. "married", "single", "widowed"
 * @returns {import('./types.js').NPCSkeleton[]}
 */
export function buildCast(protagonistName, protagonistLast, ethnicityBroad, familyStructure, namePools, protagonistGenderId, protagonistOrientation, relationshipStatusId) {
  const cast = [];
  const MAX  = 6;

  // ── PARENTS ──────────────────────────────────────────────────────────
  const pc = familyStructure.parentCount ?? 0;

  if (pc === 2) {
    const isOneDeceased = familyStructure.id === 'two_parent_one_deceased';
    const isOneAbsent   = familyStructure.id === 'two_parent_one_absent';
    const mRole = isOneDeceased ? (Math.random()<0.5?'deceased':'surviving')
                : isOneAbsent   ? (Math.random()<0.5?'absent':'present') : 'present';
    const fRole = isOneDeceased ? (mRole==='deceased'?'surviving':'deceased')
                : isOneAbsent   ? (mRole==='absent'?'present':'absent') : 'present';
    cast.push(buildParent('mother', {...familyStructure, _r:mRole}, protagonistName, protagonistLast, ethnicityBroad, namePools));
    cast.push(buildParent('father', {...familyStructure, _r:fRole}, protagonistName, protagonistLast, ethnicityBroad, namePools));
  } else if (pc === 1) {
    const g = familyStructure.parentGender ?? (Math.random()<0.5?'mother':'father');
    cast.push(buildParent(g, familyStructure, protagonistName, protagonistLast, ethnicityBroad, namePools));
  }

  // ── PARTNER ───────────────────────────────────────────────────────────
  if (relationshipStatusId && PARTNER_HAS_NPC.has(relationshipStatusId) && cast.length < MAX) {
    cast.push(buildPartner(relationshipStatusId, protagonistName, protagonistLast, ethnicityBroad, namePools, protagonistGenderId, protagonistOrientation));
  }

  // ── SIBLINGS ──────────────────────────────────────────────────────────
  const [minS, maxS] = familyStructure.siblingCount ?? [0, 0];
  const sibSlots = Math.min(randomInt(minS, maxS), 2, MAX - cast.length - 2);
  for (let i = 0; i < sibSlots; i++) {
    cast.push(buildSibling(protagonistName, protagonistLast, ethnicityBroad, namePools));
  }

  // ── BEST FRIENDS ──────────────────────────────────────────────────────
  const friendSlots = Math.min(randomInt(1, 2), MAX - cast.length - 1);
  for (let i = 0; i < friendSlots; i++) {
    cast.push(buildFriend(protagonistName, namePools));
  }

  // ── DRAMATIC FOIL ─────────────────────────────────────────────────────
  const hasPartner = relationshipStatusId && PARTNER_HAS_NPC.has(relationshipStatusId);
  if (cast.length < MAX) cast.push(buildFoil(protagonistName, protagonistGenderId, protagonistOrientation, hasPartner, namePools));

  return cast;
}
