// genres/paleolithic/life-events.js
// Formative past events — one per character.

import { SENTIMENTS } from '../../common/sentiments.js';

export const LIFE_EVENTS = [

  // ── HUNT & KILL ───────────────────────────────────────────────────────────
  {
    id: 'mammoth_hunt_wrong',
    description: 'Survived a mammoth hunt gone catastrophically wrong — the beast turned, three hunters died, and they were the one who made it back to tell the tribe how',
    toneTag: 'gritty',
    statAffinity: { constitution: 1.3, strength: 1.1 },
    iconPrompt: 'paleolithic life event icon, lone wounded hunter limping away from a mammoth carcass, other hunters fallen in background, dramatic tundra light',
    iconPath: 'generator/genres/paleolithic/icons/LIFE_EVENTS#mammoth_hunt_wrong.png',
  },
  {
    id: 'first_great_kill',
    description: 'Made their first great kill alone — a bull aurochs or cave bear — and brought it back without help; their name changed that day',
    toneTag: 'neutral',
    statAffinity: { strength: 1.3, constitution: 1.2 },
    economicHint: 1,
    iconPrompt: 'paleolithic life event icon, young hunter standing victorious over a downed aurochs, spear raised, dawn light, pride and exhaustion',
    iconPath: 'generator/genres/paleolithic/icons/LIFE_EVENTS#first_great_kill.png',
  },
  {
    id: 'predator_attack',
    description: 'Sole survivor of a predator attack — cave lion or pack of wolves took the others; they played dead in a stream until it was over, and they have not slept easily since',
    toneTag: 'gritty',
    statAffinity: { constitution: 1.2, wisdom: 1.2 },
    iconPrompt: 'paleolithic life event icon, terrified figure hiding in reeds while large predators move past in darkness, moonlight',
    iconPath: 'generator/genres/paleolithic/icons/LIFE_EVENTS#predator_attack.png',
  },

  // ── WINTER & FAMINE ───────────────────────────────────────────────────────
  {
    id: 'great_winter',
    description: 'Survived the great winter that killed half the tribe — they ate things they cannot name, made choices they do not explain, and they are different now',
    toneTag: 'gritty',
    statAffinity: { constitution: 1.4, wisdom: 0.9 },
    iconPrompt: 'paleolithic life event icon, gaunt survivor wrapped in furs crouching over tiny fire in blizzard, desperate survival, brutal cold',
    iconPath: 'generator/genres/paleolithic/icons/LIFE_EVENTS#great_winter.png',
  },
  {
    id: 'guided_tribe_crossing',
    description: 'Led the tribe through the winter crossing of the high pass when the shaman was too ill to guide them — three days of ice and wind and nobody died; after that, people listened',
    toneTag: 'dramatic',
    statAffinity: { wisdom: 1.3, constitution: 1.2 },
    economicHint: 1,
    iconPrompt: 'paleolithic life event icon, determined figure leading a line of tribe members through a snowy mountain pass, wind and ice, leading from the front',
    iconPath: 'generator/genres/paleolithic/icons/LIFE_EVENTS#guided_tribe_crossing.png',
  },

  // ── SPIRIT & MYSTERY ──────────────────────────────────────────────────────
  {
    id: 'spirit_vision',
    description: 'Had a spirit vision during a fever that lasted four days — what they saw has never been fully described to anyone; it changed what they think the world is',
    toneTag: 'dramatic',
    statAffinity: { wisdom: 1.4, intelligence: 1.2 },
    iconPrompt: 'paleolithic life event icon, figure lying in fever sweat surrounded by spirit animals and glowing patterns on cave wall, transcendent and terrifying, firelight',
    iconPath: 'generator/genres/paleolithic/icons/LIFE_EVENTS#spirit_vision.png',
  },
  {
    id: 'found_cache',
    description: 'Found a cache of high-quality obsidian that no living person knew about — kept the location secret, and has been slowly trading pieces of it ever since',
    toneTag: 'neutral',
    statAffinity: { intelligence: 1.2, wisdom: 1.1 },
    economicHint: 1,
    iconPrompt: 'paleolithic life event icon, figure uncovering a hidden stone cache of dark obsidian beneath rocks, eyes wide with wonder, sunlight catching the glass edge',
    iconPath: 'generator/genres/paleolithic/icons/LIFE_EVENTS#found_cache.png',
  },

  // ── EXILE & BELONGING ─────────────────────────────────────────────────────
  {
    id: 'cast_out',
    description: 'Cast out of the birth tribe over a dispute that still feels unjust — was taken in by the current tribe, but there is always a small distance between them and the truly belonging',
    toneTag: 'dramatic',
    statAffinity: { wisdom: 1.2, charisma: 0.9 },
    economicHint: -1,
    iconPrompt: 'paleolithic life event icon, figure walking alone away from a camp as tribe members watch from behind, lonely departing silhouette, dusk',
    iconPath: 'generator/genres/paleolithic/icons/LIFE_EVENTS#cast_out.png',
  },
  {
    id: 'adopted_foundling',
    description: 'Was a foundling — found alone as a child, origin unknown; the tribe adopted them and they have never known any other family, but the question of where they came from does not go away',
    toneTag: 'neutral',
    statAffinity: { constitution: 1.1, wisdom: 1.1 },
    iconPrompt: 'paleolithic life event icon, tribe elder carrying an abandoned infant found at the forest edge, compassionate expression, woodland background',
    iconPath: 'generator/genres/paleolithic/icons/LIFE_EVENTS#adopted_foundling.png',
  },

  // ── CONFLICT ──────────────────────────────────────────────────────────────
  {
    id: 'rival_tribe_attack',
    description: 'Survived a rival tribe attack that destroyed the old camp — ran with nothing, helped rebuild from nothing; the people who did this are still out there somewhere',
    toneTag: 'gritty',
    statAffinity: { constitution: 1.2, strength: 1.1 },
    economicHint: -1,
    iconPrompt: 'paleolithic life event icon, burning camp at night, family fleeing into darkness as rival warriors enter the camp, chaos and terror, dramatic firelight',
    iconPath: 'generator/genres/paleolithic/icons/LIFE_EVENTS#rival_tribe_attack.png',
  },
  {
    id: 'brokered_peace',
    description: 'Brokered a truce between two hostile tribes through sheer stubbornness and good timing — the peace held, which surprised everyone including them',
    toneTag: 'neutral',
    statAffinity: { charisma: 1.3, wisdom: 1.2 },
    economicHint: 1,
    iconPrompt: 'paleolithic life event icon, two rival tribe leaders touching hands over a shared fire as a third figure stands between them, all wearing ceremonial paint, hopeful tension',
    iconPath: 'generator/genres/paleolithic/icons/LIFE_EVENTS#brokered_peace.png',
  },

  // ── DISCOVERY ─────────────────────────────────────────────────────────────
  {
    id: 'discovered_new_land',
    description: 'Crossed the mountains alone and found a valley no one in the tribe had ever seen — came back and described it; now the tribe argues about whether to go',
    toneTag: 'neutral',
    statAffinity: { constitution: 1.2, intelligence: 1.2 },
    iconPrompt: 'paleolithic life event icon, figure standing at mountain top looking down at a lush green valley spread below them, awe and wonder, dramatic sky',
    iconPath: 'generator/genres/paleolithic/icons/LIFE_EVENTS#discovered_new_land.png',
  },
  {
    id: 'captured_escaped',
    description: 'Was captured by a rival tribe and held for a season before escaping — knows more about how those people think and live than anyone else in the tribe',
    toneTag: 'dramatic',
    statAffinity: { dexterity: 1.2, wisdom: 1.1 },
    iconPrompt: 'paleolithic life event icon, figure slipping away from a rival camp in darkness, bound wrists, crawling through undergrowth, tense escape, moonlight',
    iconPath: 'generator/genres/paleolithic/icons/LIFE_EVENTS#captured_escaped.png',
  },
];
