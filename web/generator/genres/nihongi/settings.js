// genres/nihongi/settings.js

export { ECONOMIC_TIERS } from './economic-tiers.js';
export { CITY_SETTINGS  } from './city-settings.js';

export const TAG_POOLS = {
  always:   ['nihongi', 'ancient-japan', 'yamato', 'kami', 'asuka'],
  gritty:   ['clan-war', 'exile', 'pollution', 'frontier', 'sacrifice', 'purge'],
  dramatic: ['court-intrigue', 'succession', 'forbidden-knowledge', 'divine-omen', 'diplomatic-crisis'],
  neutral:  ['clan', 'ritual', 'rice', 'ancestor-duty', 'genealogy'],
  cozy:     ['shrine', 'harvest', 'pilgrimage', 'poetry', 'found-family'],
  criminal: ['forgery', 'smuggling', 'assassination', 'treason', 'seal-fraud'],
  professionTags: {
    'Court Service': ['court', 'imperial', 'protocol', 'governance', 'literacy'],
    'Military':      ['combat', 'clan-war', 'honor', 'fortress', 'patrol'],
    'Religion':      ['kami', 'ritual', 'buddhist', 'oracle', 'shrine'],
    'Scholarship':   ['chinese', 'astronomy', 'medicine', 'literacy', 'continental'],
    'Craft':         ['pottery', 'silk', 'forge', 'artisan', 'guild'],
    'Agriculture':   ['rice', 'village', 'harvest', 'toil', 'seasonal'],
    'Trade':         ['continental', 'ship', 'tribute', 'market', 'diplomacy'],
    'Performance':   ['music', 'dance', 'court', 'banquet', 'aesthetic'],
  },
};
