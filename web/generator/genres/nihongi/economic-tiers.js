// genres/nihongi/economic-tiers.js
// Wealth tiers for ancient Yamato Japan (Nihon Shoki era).

export const ECONOMIC_TIERS = {
  1: {
    label: 'Outcast',
    descriptors: [
      'no clan protection and no formal social standing',
      'surviving on foraged food, charity, and labour that no one names',
      'invisible to the tax record and to the court — which is both curse and occasional advantage',
      'sleeps where shelter presents itself; owns what can be carried',
    ],
    housing: [
      'a lean-to against a provincial compound wall',
      'a borrowed corner of a craft-guild outbuilding',
      'a shallow pit dwelling at the margin of a village',
      'the storeroom of whoever has use for them this season',
    ],
    transport: [
      'on foot, along the lesser tracks that avoid checkpoint gates',
      'hitching passage on a supply cart in exchange for labour',
      'by river on a borrowed raft, working the current',
    ],
    iconPrompt: 'ancient japanese outcast bondsman no clan bare feet rough cloth roadside humble survival nihon shoki yamato-e folk painting',
    iconPath: 'generator/genres/nihongi/icons/ECONOMIC_TIERS#tier1-outcast.webp',
  },
  2: {
    label: 'Peasant',
    descriptors: [
      'free but barely — rice tribute leaves nothing past the next season',
      'a single bad harvest from debt bondage to the provincial lord',
      'community ties are the only cushion between survival and ruin',
      'modest and sufficient when the year is kind; neither when it is not',
    ],
    housing: [
      'a thatched pit dwelling with a hearth at the centre',
      'a family farmstead with a vegetable plot and a storehouse barely large enough to matter',
      'shared communal longhouse on the village periphery',
      'a rented field hut that technically belongs to the clan lord',
    ],
    transport: [
      'on foot along the paddy-field tracks',
      'a shared ox for ploughing — not for riding',
      'river boat shared between several families for market day',
    ],
    iconPrompt: 'ancient japanese free farmer tami rice paddy village communal simple honest labour nihon shoki yamato-e folk painting',
    iconPath: 'generator/genres/nihongi/icons/ECONOMIC_TIERS#tier2-peasant.webp',
  },
  3: {
    label: 'Minor Official',
    descriptors: [
      'a modest independence — craft skill or minor office provides a buffer against the worst years',
      'respected in the village, legible to the provincial administration',
      'has enough surplus to participate in gift exchange and ritual offerings',
      'reads the social weather carefully; a single misstep at court would erase this position entirely',
    ],
    housing: [
      'a wooden-frame residence with a separate sleeping chamber and a small garden',
      'craft-guild quarters with a proper workshop attached',
      'a shrine compound guesthouse held by hereditary right',
      'a minor provincial official\'s residence with two outbuildings',
    ],
    transport: [
      'a personal horse for provincial travel',
      'a river barge on hire for longer journeys',
      'a sedan palanquin for formal occasions',
    ],
    iconPrompt: 'ancient japanese minor official craftsman shrine keeper modest robes respectful functional nihon shoki yamato-e painting',
    iconPath: 'generator/genres/nihongi/icons/ECONOMIC_TIERS#tier3-minor-official.webp',
  },
  4: {
    label: 'Court Retainer',
    descriptors: [
      'a position that confers real comfort and real visibility — both are double-edged',
      'maintains a household of subordinates and participates in court ritual cycles',
      'silk robes, lacquered furniture, continental goods from the capital',
      'income is tribute from a designated land allotment; position depends on current faction alignment',
    ],
    housing: [
      'a proper courtyard compound with inner and outer residential quarters',
      'a clan-compound wing in a great lord\'s Asuka residence',
      'a provincial governor\'s mansion with storage buildings and servant quarters',
      'a palatial sub-residence within the imperial capital precincts',
    ],
    transport: [
      'a paired ox-cart with attendants for court appearances',
      'a mounted escort for provincial journeys',
      'water travel by covered barge with household retainers',
    ],
    iconPrompt: 'ancient japanese court retainer official silk layered robes lacquered furniture asuka period prosperity court nihon shoki yamato-e painting',
    iconPath: 'generator/genres/nihongi/icons/ECONOMIC_TIERS#tier4-court-retainer.webp',
  },
  5: {
    label: 'Great Lord',
    descriptors: [
      'a great clan lord or high court minister whose tributary income rivals the imperial household\'s',
      'compounds, estates, and hereditary craftsmen across multiple provinces',
      'continental luxury goods, personal scholars, physicians, and musicians',
      'political power that the emperor must negotiate with rather than simply command',
    ],
    housing: [
      'a multi-compound grand residence in Asuka with gardens, storehouses, and a private shrine',
      'a walled clan seat whose inner gate is opened for no one below the rank of provincial governor',
      'seasonal residences at different provincial estates, each fully staffed year-round',
    ],
    transport: [
      'an elaborate procession of ox-carts with mounted guard and trailing household',
      'a dedicated river barge fleet for coastal trade and personal travel',
      'imperial-gifted horses from the continent, stabled in a private paddock',
    ],
    iconPrompt: 'ancient japanese great clan lord omi muraji grand compound silk robes escort prestige asuka court nihon shoki yamato-e court painting',
    iconPath: 'generator/genres/nihongi/icons/ECONOMIC_TIERS#tier5-great-lord.webp',
  },
};
