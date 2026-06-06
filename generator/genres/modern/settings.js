// genres/modern/settings.js
// Economic status markers and physical settings for the modern genre.
// These are used to ground the character Entry and scenario Opening
// in specific, vivid details rather than abstractions.

import { CITY_SETTINGS } from './city-settings.js';
import { ECONOMIC_TIERS } from './economic-tiers.js';

// ── SCENARIO TAGS ────────────────────────────────────────────────────────
// Up to 10 tags per scenario. These are drawn from the pools below
// based on toneTag, criminalFlag, and profession/tension matches.

export const TAG_POOLS = {
  always: ['modern', 'character-driven'],
  gritty: ['crime', 'gritty', 'noir', 'underground', 'survival'],
  dramatic: ['drama', 'family', 'secrets', 'betrayal', 'redemption'],
  cozy: ['slice-of-life', 'quiet', 'cozy', 'small-town'],
  neutral: ['realistic', 'urban', 'contemporary'],
  criminal: ['crime', 'criminal', 'noir', 'underworld'],
  professionTags: {
    'Criminal': ['crime', 'criminal', 'noir'],
    'Healthcare': ['medical', 'healing'],
    'Military': ['military', 'veteran', 'ptsd'],
    'Finance': ['money', 'greed', 'ambition'],
    'Entertainment': ['fame', 'ambition', 'performance'],
    'Creative services': ['art', 'creative', 'struggling-artist'],
    'Law enforcement': ['law', 'justice', 'moral-grey'],
    'Education': ['mentorship', 'community'],
    'Food & beverage': ['slice-of-life', 'working-class'],
  },
};
