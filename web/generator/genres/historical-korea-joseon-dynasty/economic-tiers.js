// genres/historical-korea-joseon-dynasty/economic-tiers.js
// Social standing in Joseon Dynasty Korea.

export const ECONOMIC_TIERS = {
  1: {
    label: 'Destitute',
    descriptors: [
      'born into nobi status — everything owned belongs to the master',
      'winter means real cold and real hunger',
      'clothing is whatever wasn\'t thrown away by someone else',
      'no land, no clan compound, no name that carries weight',
      'survival is the plan; dignity is the hope',
    ],
    housing: [
      'a corner of a landowner\'s servant quarters, shared with others',
      'a mat in a drafty outbuilding, cold all winter',
      'nowhere permanent — moves with the master\'s household',
    ],
    transport: [
      'on foot, always — sometimes barefoot on frozen roads',
      'carries everything on an A-frame jige on their back',
      'the ox belongs to someone else; they walk behind it',
    ],
    iconPrompt: 'joseon dynasty korean destitute nobi servant cold winter carrying load landowner compound poverty suffering traditional minhwa folk painting',
    iconPath: 'generator/genres/historical-korea-joseon-dynasty/icons/ECONOMIC_TIERS#tier1-destitute.webp',
  },
  2: {
    label: 'Subsistence',
    descriptors: [
      'tenant farmer or day laborer — land rented, rent always owed',
      'plain hanbok patched and re-patched at the elbows',
      'meals are barley and millet; rice is for festivals and illness',
      'every drought, every bad harvest, every illness is a crisis',
      'no ambition for more — just not less',
    ],
    housing: [
      'small thatched-roof chogajip cottage with earthen floor',
      'one-room home with the ondol heated only on the coldest nights',
      'cramped but their own — the only thing that is theirs',
    ],
    transport: [
      'on foot; occasionally borrows a neighbor\'s ox for planting',
      'walks every road in the region and knows them all by feel',
      'no horse, no palanquin — those belong to another world entirely',
    ],
    iconPrompt: 'joseon dynasty korean subsistence farmer thatched chogajip cottage barley meal plain hanbok modest hardship traditional minhwa folk painting',
    iconPath: 'generator/genres/historical-korea-joseon-dynasty/icons/ECONOMIC_TIERS#tier2-subsistence.webp',
  },
  3: {
    label: 'Modest',
    descriptors: [
      'free commoner, artisan, or minor merchant — independent but not powerful',
      'clean hanbok, well-maintained; no silk, no regrets',
      'rice most days; the household does not go hungry',
      'one ox, a small plot, a trade passed down for two generations',
      'respected in the village, invisible at the county seat',
    ],
    housing: [
      'modest tile-roofed giwajip with a small courtyard',
      'well-kept thatched house, larger than the neighbors\'',
      'separate kitchen building and small storage room — a mark of modest comfort',
    ],
    transport: [
      'own ox for hauling goods and field work',
      'walks to market; hires a cart for larger loads',
      'no palanquin — but not embarrassed about it',
    ],
    iconPrompt: 'joseon dynasty korean modest commoner artisan market clean hanbok tile roof courtyard comfortable ordinary traditional folk painting',
    iconPath: 'generator/genres/historical-korea-joseon-dynasty/icons/ECONOMIC_TIERS#tier3-modest.webp',
  },
  4: {
    label: 'Established',
    descriptors: [
      'successful merchant, jungin official, or lesser yangban',
      'fine cotton hanbok, silk for ceremonies and formal occasions',
      'permanent compound with inner and outer rooms',
      'servants — one or two; enough that the family doesn\'t cook',
      'known at the county seat; consulted, not dismissed',
    ],
    housing: [
      'proper giwajip compound with inner (anchae) and outer (sarangchae) quarters',
      'tile-roofed house with separate servants\' room and storage granary',
      'well-maintained compound in a respectable neighborhood of the town',
    ],
    transport: [
      'family palanquin for the women; horse for the head of household',
      'own horse, well-fed and recognizable on local roads',
      'hired chair and bearers for formal visits to officials',
    ],
    iconPrompt: 'joseon dynasty korean established yangban official silk hanbok tile compound inner courtyard horse servants formal traditional painting',
    iconPath: 'generator/genres/historical-korea-joseon-dynasty/icons/ECONOMIC_TIERS#tier4-established.webp',
  },
  5: {
    label: 'Elite',
    descriptors: [
      'high yangban, senior court official, or royal family connection',
      'finest silk hanbok; court robes for official occasions',
      'generations of gwageo success recorded in the genealogy book',
      'multiple servants, a staff, specific people whose job is managing those servants',
      'a name that opens doors before they are knocked on',
    ],
    housing: [
      'grand jongga clan compound: women\'s wing (anchae), men\'s pavilion (sarangchae), servants\' courtyard',
      'palatial tile-roofed manor in the aristocratic quarter of Hanyang',
      'separate provincial estate in addition to the Hanyang compound',
    ],
    transport: [
      'full palanquin retinue with servants and a formal escort',
      'finest horse with a dedicated groom; mounted escort on official travel',
      'never walks anywhere that requires an explanation',
    ],
    iconPrompt: 'joseon dynasty korean elite yangban high official grand clan compound silk robes gat hat ceremony servants dignified imposing traditional court painting',
    iconPath: 'generator/genres/historical-korea-joseon-dynasty/icons/ECONOMIC_TIERS#tier5-elite.webp',
  },
};
