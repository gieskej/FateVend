// genres/historical-korea-joseon-dynasty/settings.js
// Narrative tone and tag configuration for Joseon Dynasty Korea.

export { ECONOMIC_TIERS } from './economic-tiers.js';
export { CITY_SETTINGS }  from './city-settings.js';

export const TAG_POOLS = {
  always:   ['joseon', 'korea', 'historical', 'confucian', 'dynasty'],
  gritty:   ['rebellion', 'nobi', 'corruption', 'exile', 'torture', 'invasion'],
  dramatic: ['court-intrigue', 'forbidden-love', 'gwageo', 'vendetta', 'betrayal'],
  neutral:  ['clan', 'scholarship', 'tea', 'tradition', 'duty'],
  cozy:     ['village', 'festival', 'ondol', 'poetry', 'found-family'],
  criminal: ['banditry', 'black-market', 'rebellion', 'treason'],
  professionTags: {
    'Civil Administration': ['gwageo', 'magistrate', 'governance', 'confucian'],
    'Military':             ['combat', 'archery', 'honor', 'fortress'],
    'Arts & Learning':      ['poetry', 'painting', 'calligraphy', 'scholarship'],
    'Trade':                ['merchant', 'market', 'barter', 'wealth'],
    'Spiritual':            ['shaman', 'medicine', 'ritual', 'buddhist'],
    'Labor':                ['farming', 'craft', 'toil', 'village'],
    'Gisaeng Arts':         ['performance', 'music', 'dance', 'banquet'],
    'Service':              ['duty', 'palace', 'household', 'servitude'],
  },
};
