// genres/fantasy/settings.js

import { ECONOMIC_TIERS } from './economic-tiers.js';
import { CITY_SETTINGS } from './city-settings.js';

export const TAG_POOLS = {
  always: ['fantasy', 'character-driven'],
  gritty: ['gritty', 'dark', 'survival', 'crime', 'low-fantasy'],
  dramatic: ['drama', 'political', 'secrets', 'betrayal', 'high-stakes'],
  cozy: ['cozy', 'slice-of-life', 'small-town', 'light-fantasy'],
  neutral: ['adventure', 'classic-fantasy', 'world-building'],
  criminal: ['crime', 'thieves-guild', 'underworld', 'heist'],
  professionTags: {
    'Martial': ['action', 'combat', 'soldier'],
    'Criminal': ['crime', 'thieves-guild', 'heist'],
    'Arcane': ['magic', 'arcane', 'sorcery'],
    'Divine': ['religion', 'gods', 'faith'],
    'Craft': ['crafting', 'artisan', 'slice-of-life'],
    'Performance': ['bard', 'music', 'performance'],
    'Service': ['slice-of-life', 'community'],
    'Trade': ['merchant', 'trade', 'adventure'],
    'Nobility': ['political', 'intrigue', 'power'],
    'Wilderness': ['ranger', 'nature', 'survival'],
    'Outcast': ['exile', 'survival', 'redemption'],
  },
};
