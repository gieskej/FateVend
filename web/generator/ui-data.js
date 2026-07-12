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

// ── PALEOLITHIC ────────────────────────────────────────────────────────────
export {
  GENDERS          as PALEO_GENDERS,
  ORIENTATIONS     as PALEO_ORIENTATIONS,
  BUILDS           as PALEO_BUILDS,
  HAIR             as PALEO_HAIR,
  RACES            as PALEO_RACES,
  DISTINGUISHING_FEATURES as PALEO_DISTINGUISHING_FEATURES,
  QUIRKS           as PALEO_QUIRKS,
} from './genres/paleolithic/character-attributes.js';

export {
  ECONOMIC_TIERS   as PALEO_ECONOMIC_TIERS,
  CITY_SETTINGS    as PALEO_CITY_SETTINGS,
  TAG_POOLS        as PALEO_TAG_POOLS,
} from './genres/paleolithic/settings.js';

export { PROFESSIONS as PALEO_PROFESSIONS } from './genres/paleolithic/professions.js';
export { LIFE_EVENTS as PALEO_LIFE_EVENTS } from './genres/paleolithic/life-events.js';
export { TENSIONS    as PALEO_TENSIONS    } from './genres/paleolithic/tensions.js';
export { SECRETS     as PALEO_SECRETS     } from './genres/paleolithic/secrets.js';
export { NAME_POOLS  as PALEO_NAME_POOLS  } from './genres/paleolithic/names.js';
export {
  PARENT_STATUSES  as PALEO_PARENT_STATUSES,
  SIBLING_DYNAMICS as PALEO_SIBLING_DYNAMICS,
  FAMILY_STRUCTURES as PALEO_FAMILY_STRUCTURES,
} from './genres/paleolithic/family-structures.js';

// ── MANGA OSAKA HIGH SCHOOL 1987 ───────────────────────────────────────────
export {
  GENDERS          as MANGA_HS_GENDERS,
  ORIENTATIONS     as MANGA_HS_ORIENTATIONS,
  BUILDS           as MANGA_HS_BUILDS,
  HAIR             as MANGA_HS_HAIR,
  RACES            as MANGA_HS_RACES,
  DISTINGUISHING_FEATURES as MANGA_HS_DISTINGUISHING_FEATURES,
  QUIRKS           as MANGA_HS_QUIRKS,
} from './genres/manga-osaka-highschool1987/character-attributes.js';

export {
  ECONOMIC_TIERS   as MANGA_HS_ECONOMIC_TIERS,
  CITY_SETTINGS    as MANGA_HS_CITY_SETTINGS,
  TAG_POOLS        as MANGA_HS_TAG_POOLS,
} from './genres/manga-osaka-highschool1987/settings.js';

export { PROFESSIONS as MANGA_HS_PROFESSIONS } from './genres/manga-osaka-highschool1987/professions.js';
export { LIFE_EVENTS as MANGA_HS_LIFE_EVENTS } from './genres/manga-osaka-highschool1987/life-events.js';
export { TENSIONS    as MANGA_HS_TENSIONS    } from './genres/manga-osaka-highschool1987/tensions.js';
export { SECRETS     as MANGA_HS_SECRETS     } from './genres/manga-osaka-highschool1987/secrets.js';
export { NAME_POOLS  as MANGA_HS_NAME_POOLS  } from './genres/manga-osaka-highschool1987/names.js';
export {
  PARENT_STATUSES  as MANGA_HS_PARENT_STATUSES,
  SIBLING_DYNAMICS as MANGA_HS_SIBLING_DYNAMICS,
  FAMILY_STRUCTURES as MANGA_HS_FAMILY_STRUCTURES,
} from './genres/manga-osaka-highschool1987/family-structures.js';

// ── JOSEON DYNASTY KOREA ───────────────────────────────────────────────────
export {
  GENDERS          as JOSEON_GENDERS,
  ORIENTATIONS     as JOSEON_ORIENTATIONS,
  BUILDS           as JOSEON_BUILDS,
  HAIR             as JOSEON_HAIR,
  RACES            as JOSEON_RACES,
  DISTINGUISHING_FEATURES as JOSEON_DISTINGUISHING_FEATURES,
  QUIRKS           as JOSEON_QUIRKS,
} from './genres/historical-korea-joseon-dynasty/character-attributes.js';

export {
  ECONOMIC_TIERS   as JOSEON_ECONOMIC_TIERS,
  CITY_SETTINGS    as JOSEON_CITY_SETTINGS,
  TAG_POOLS        as JOSEON_TAG_POOLS,
} from './genres/historical-korea-joseon-dynasty/settings.js';

export { PROFESSIONS as JOSEON_PROFESSIONS } from './genres/historical-korea-joseon-dynasty/professions.js';
export { LIFE_EVENTS as JOSEON_LIFE_EVENTS } from './genres/historical-korea-joseon-dynasty/life-events.js';
export { TENSIONS    as JOSEON_TENSIONS    } from './genres/historical-korea-joseon-dynasty/tensions.js';
export { SECRETS     as JOSEON_SECRETS     } from './genres/historical-korea-joseon-dynasty/secrets.js';
export { NAME_POOLS  as JOSEON_NAME_POOLS  } from './genres/historical-korea-joseon-dynasty/names.js';
export {
  PARENT_STATUSES  as JOSEON_PARENT_STATUSES,
  SIBLING_DYNAMICS as JOSEON_SIBLING_DYNAMICS,
  FAMILY_STRUCTURES as JOSEON_FAMILY_STRUCTURES,
} from './genres/historical-korea-joseon-dynasty/family-structures.js';

// ── NIHONGI (ANCIENT JAPAN) ────────────────────────────────────────────────
export {
  GENDERS          as NIHONGI_GENDERS,
  ORIENTATIONS     as NIHONGI_ORIENTATIONS,
  BUILDS           as NIHONGI_BUILDS,
  HAIR             as NIHONGI_HAIR,
  RACES            as NIHONGI_RACES,
  DISTINGUISHING_FEATURES as NIHONGI_DISTINGUISHING_FEATURES,
  QUIRKS           as NIHONGI_QUIRKS,
} from './genres/nihongi/character-attributes.js';

export {
  ECONOMIC_TIERS   as NIHONGI_ECONOMIC_TIERS,
  CITY_SETTINGS    as NIHONGI_CITY_SETTINGS,
  TAG_POOLS        as NIHONGI_TAG_POOLS,
} from './genres/nihongi/settings.js';

export { PROFESSIONS as NIHONGI_PROFESSIONS } from './genres/nihongi/professions.js';
export { LIFE_EVENTS as NIHONGI_LIFE_EVENTS } from './genres/nihongi/life-events.js';
export { TENSIONS    as NIHONGI_TENSIONS    } from './genres/nihongi/tensions.js';
export { SECRETS     as NIHONGI_SECRETS     } from './genres/nihongi/secrets.js';
export { NAME_POOLS  as NIHONGI_NAME_POOLS  } from './genres/nihongi/names.js';
export {
  PARENT_STATUSES  as NIHONGI_PARENT_STATUSES,
  SIBLING_DYNAMICS as NIHONGI_SIBLING_DYNAMICS,
  FAMILY_STRUCTURES as NIHONGI_FAMILY_STRUCTURES,
} from './genres/nihongi/family-structures.js';

// ── COMMON ──────────────────────────────────────────────────────────────────
export { RELATIONSHIP_STATUSES } from './common/relationship-statuses.js';
export { SENTIMENTS } from './common/sentiments.js';
export { COMMON_PLOT_ARCHETYPES } from './common/plot-archetypes.js';
export { MODERN_PLOT_ARCHETYPES } from './genres/modern/plot-archetypes.js';
export { FANTASY_PLOT_ARCHETYPES } from './genres/fantasy/plot-archetypes.js';
export { SCIFI_PLOT_ARCHETYPES } from './genres/sci-fi/plot-archetypes.js';
export { PALEOLITHIC_PLOT_ARCHETYPES } from './genres/paleolithic/plot-archetypes.js';
export { MANGA_HS_PLOT_ARCHETYPES }   from './genres/manga-osaka-highschool1987/plot-archetypes.js';
export { JOSEON_PLOT_ARCHETYPES }     from './genres/historical-korea-joseon-dynasty/plot-archetypes.js';
export { NIHONGI_PLOT_ARCHETYPES }   from './genres/nihongi/plot-archetypes.js';

// ── STAT ADJECTIVES ─────────────────────────────────────────────────────────
export { STAT_ADJECTIVES, statAdjective } from './stat-adjectives.js';

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
