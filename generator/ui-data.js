// generator/ui-data.js
// Single import point for index.html.
// Aggregates all genre data from the generator source files and re-exports
// with the names index.html's UI layer expects.
// To add a profession or city: edit the genre source file only.

// ── MODERN ─────────────────────────────────────────────────────────────────
export {
  GENDERS, ORIENTATIONS, ETHNICITIES, BUILDS, HAIR,
  DISTINGUISHING_FEATURES, QUIRKS,
} from './genres/modern/character-attributes.js';

export { ECONOMIC_TIERS, CITY_SETTINGS, TAG_POOLS } from './genres/modern/settings.js';
export { PROFESSIONS }     from './genres/modern/professions.js';
export { LIFE_EVENTS }     from './genres/modern/life-events.js';
export { TENSIONS }        from './genres/modern/tensions.js';
export { SECRETS }         from './genres/modern/secrets.js';
export { NAME_POOLS }      from './genres/modern/names.js';
export {
  PARENT_STATUSES, SIBLING_DYNAMICS, FAMILY_STRUCTURES,
} from './genres/modern/family-structures.js';

// ── FANTASY ────────────────────────────────────────────────────────────────
export {
  GENDERS          as FANTASY_GENDERS,
  ORIENTATIONS     as FANTASY_ORIENTATIONS,
  BUILDS           as FANTASY_BUILDS,
  HAIR             as FANTASY_HAIR,
  RACES            as FANTASY_RACES,
  DISTINGUISHING_FEATURES as FANTASY_DISTINGUISHING_FEATURES,
  QUIRKS           as FANTASY_QUIRKS,
} from './genres/fantasy/character-attributes.js';

export {
  ECONOMIC_TIERS   as FANTASY_ECONOMIC_TIERS,
  CITY_SETTINGS    as FANTASY_CITY_SETTINGS,
  TAG_POOLS        as FANTASY_TAG_POOLS,
} from './genres/fantasy/settings.js';

export { PROFESSIONS as FANTASY_PROFESSIONS } from './genres/fantasy/professions.js';
export { LIFE_EVENTS as FANTASY_LIFE_EVENTS } from './genres/fantasy/life-events.js';
export { TENSIONS    as FANTASY_TENSIONS    } from './genres/fantasy/tensions.js';
export { SECRETS     as FANTASY_SECRETS     } from './genres/fantasy/secrets.js';
export { NAME_POOLS  as FANTASY_NAME_POOLS  } from './genres/fantasy/names.js';
export {
  PARENT_STATUSES  as FANTASY_PARENT_STATUSES,
  SIBLING_DYNAMICS as FANTASY_SIBLING_DYNAMICS,
  FAMILY_STRUCTURES as FANTASY_FAMILY_STRUCTURES,
} from './genres/fantasy/family-structures.js';

// ── SCI-FI ──────────────────────────────────────────────────────────────────
export {
  GENDERS          as SCIFI_GENDERS,
  ORIENTATIONS     as SCIFI_ORIENTATIONS,
  BUILDS           as SCIFI_BUILDS,
  HAIR             as SCIFI_HAIR,
  SPECIES          as SCIFI_SPECIES,
  DISTINGUISHING_FEATURES as SCIFI_DISTINGUISHING_FEATURES,
  QUIRKS           as SCIFI_QUIRKS,
} from './genres/sci-fi/character-attributes.js';

export {
  ECONOMIC_TIERS   as SCIFI_ECONOMIC_TIERS,
  CITY_SETTINGS    as SCIFI_CITY_SETTINGS,
  TAG_POOLS        as SCIFI_TAG_POOLS,
} from './genres/sci-fi/settings.js';

export { PROFESSIONS as SCIFI_PROFESSIONS } from './genres/sci-fi/professions.js';
export { LIFE_EVENTS as SCIFI_LIFE_EVENTS } from './genres/sci-fi/life-events.js';
export { TENSIONS    as SCIFI_TENSIONS    } from './genres/sci-fi/tensions.js';
export { SECRETS     as SCIFI_SECRETS     } from './genres/sci-fi/secrets.js';
export { NAME_POOLS  as SCIFI_NAME_POOLS  } from './genres/sci-fi/names.js';
export {
  PARENT_STATUSES  as SCIFI_PARENT_STATUSES,
  SIBLING_DYNAMICS as SCIFI_SIBLING_DYNAMICS,
  FAMILY_STRUCTURES as SCIFI_FAMILY_STRUCTURES,
} from './genres/sci-fi/family-structures.js';

// ── MBTI — shared across all genres ────────────────────────────────────────
export const MBTI_TYPES = [
  { type:'INTJ', label:'The Architect'    }, { type:'INTP', label:'The Thinker'      },
  { type:'ENTJ', label:'The Commander'    }, { type:'ENTP', label:'The Debater'      },
  { type:'INFJ', label:'The Advocate'     }, { type:'INFP', label:'The Mediator'     },
  { type:'ENFJ', label:'The Protagonist'  }, { type:'ENFP', label:'The Campaigner'   },
  { type:'ISTJ', label:'The Logistician'  }, { type:'ISFJ', label:'The Defender'     },
  { type:'ESTJ', label:'The Executive'    }, { type:'ESFJ', label:'The Consul'       },
  { type:'ISTP', label:'The Virtuoso'     }, { type:'ISFP', label:'The Adventurer'   },
  { type:'ESTP', label:'The Entrepreneur' }, { type:'ESFP', label:'The Entertainer'  },
];

// ── UI-ONLY DATA — cast builder & NPC tables ────────────────────────────────
export const NPC_TRAITS = [
  'fiercely loyal','surprisingly funny','the most reliable person alive',
  'embarrassingly earnest','annoyingly optimistic','good in a crisis',
  'generous to a fault','shamelessly enthusiastic','never holds a grudge',
  'always picks up the phone','makes everyone feel seen','weirdly calm under pressure',
  'charming and unreliable','protective','impulsive','pragmatic','idealistic',
  'hard to read','stubborn','unpredictable','hot-tempered but quick to apologise',
  "means well, executes poorly","the world's worst liar",'allergic to asking for help',
  'emotionally closed','deeply anxious','cynical','bitter','secretive',
  'quietly broken','running from something','one bad decision from disaster',
];

export const FRIEND_DYNAMICS = [
  'The person {n} calls when things go sideways — and they always pick up',
  'Has covered for {n} before. Will probably have to again.',
  'Believes in {n} more than {n} believes in themselves',
  'The only person who can make {n} laugh when things are genuinely terrible',
  'Has their own chaos, but shows up for {n} anyway',
  'Knows every embarrassing story and has never weaponised one',
  "Drifted for a while; they're close again now, pretending the gap never happened",
  'Would absolutely help {n} move a body. No questions. Light snacks provided.',
  "The voice in {n}'s head that says \"are you sure about this?\" — usually right",
  'Knows {n} better than anyone and has decided to stay anyway',
];

export const PARENT_DYNAMICS_ALIVE = [
  '{n} calls more often than they admit and less often than they mean to',
  'Has opinions about every choice {n} has made since roughly age seven',
  'Proud of {n} in ways they mostly express sideways, at inconvenient moments',
  'The relationship has improved significantly since {n} moved out',
  'Still sends clippings — actual clippings — of things they think {n} should know',
  'Knows something is wrong with {n} right now and is waiting to be asked',
  '{n} inherited exactly the traits they were hoping to avoid',
];

export const FOIL_ROLES = [
  { role:'rival',               dynamics:["Wants what {n} has — and is closer to getting it than {n} realises","Grew up alongside {n}; the competition technically never ended","Respects {n} just enough to make the rivalry feel personal","The only person who can beat {n} — which {n} finds both infuriating and motivating"] },
  { role:'antagonist',          dynamics:["Has a reason to want things to go badly for {n} — and the patience to wait","Operates in the same world as {n}, just on the other side of a line","Knows something about {n} that {n} wishes they didn't","Honestly believes they're the reasonable one in this situation"] },
  { role:'love interest',       dynamics:["Has known {n} long enough to see past the performance — still here","Wants more from {n} than {n} knows how to give right now","The timing has never been right. Might never be. They're both ignoring this.","Finds {n}'s specific brand of disaster oddly endearing"] },
  { role:'estranged former ally',dynamics:["Used to be the person {n} trusted most. Something happened. Neither talks about it.","Resurfaces at exactly the wrong moment, as they always do","Could be an asset or a liability — {n} genuinely doesn't know which"] },
];

export const NEUTRAL_FIRST_MASC = ['Marcus','Ray','Eli','Nate','Omar','Silas','Calvin','Andre','Luca','Hassan','Ricky','Brendan','Patrick','Curtis','Terrence','Sam','Jordan','Alex','Tyler','Jesse'];
export const NEUTRAL_FIRST_FEM  = ['Diana','Cassie','Renee','Angie','Becca','Simone','Tamara','Rosa','Leila','Claudia','Priya','Nadia','Ashley','Morgan','Keisha','Lauren','Amber','Shannon','Tanya','Jade'];
export const NEUTRAL_LAST       = ['Vega','Tran','Kelly','Osei','Park','Walsh','Grant','Patel','Cruz','Flynn','Moss','Shaw','Reed','Kim','Boyd','Hayes','Leon','Moran','Russo','Diaz'];
