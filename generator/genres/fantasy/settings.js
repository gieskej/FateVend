// genres/fantasy/settings.js

export const ECONOMIC_TIERS = {
  1: {
    label: 'Destitute',
    descriptors: ['sleeping rough or in a stable', 'begging or stealing to eat', 'one bad day from destitute', 'clothes that were someone else\'s first'],
    housing: ['stable loft', 'doorway or alley', 'a corner of a crowded common room', 'a cave or ruin'],
    transport: ['on foot', 'a lame mule', 'nothing'],
    iconPrompt: 'Fantasy RPG icon. A gaunt figure huddled in a stone doorway wrapped in a threadbare cloak, a cracked begging bowl beside them, rain-slicked cobblestones, city wealth visible and indifferent in the distance.',
    iconPath: 'fantasy/icons/ECONOMIC_TIER#destitute.png',
  },
  2: {
    label: 'Common folk',
    descriptors: ['a rented room above a tavern', 'pays their debts, barely', 'secondhand gear that mostly works', 'coin enough for bread and not much else'],
    housing: ['rented room', 'shared dormitory', 'a modest cottage'],
    transport: ['on foot', 'a serviceable horse', 'passage on a merchant barge'],
    iconPrompt: 'Fantasy RPG icon. A tired laborer eating a simple meal at a tavern table, a nearly empty coin purse beside a mug of ale, patched secondhand gear hanging on the chair, making ends meet.',
    iconPath: 'fantasy/icons/ECONOMIC_TIER#common_folk.png',
  },
  3: {
    label: 'Skilled / journeyman',
    descriptors: ['decent lodgings in the craftsmen\'s quarter', 'a horse of their own', 'gear they chose rather than inherited', 'steady work if not spectacular'],
    housing: ['own room at an inn', 'rented townhouse', 'quarters provided by an employer'],
    transport: ['reliable horse', 'their own small boat', 'hired passage'],
    iconPrompt: 'Fantasy RPG icon. A skilled artisan at a tidy workshop bench in the craftsmen\'s quarter, quality tools on the wall, a reliable horse visible through the window, steady and capable if not wealthy.',
    iconPath: 'fantasy/icons/ECONOMIC_TIER#skilled_journeyman.png',
  },
  4: {
    label: 'Prosperous',
    descriptors: ['a house in the merchant district or keeps rooms at a good inn', 'well-equipped', 'money is not currently the problem', 'a name that opens some doors'],
    housing: ['townhouse', 'estate rooms', 'private quarters at a keep'],
    transport: ['quality horse', 'carriage', 'private ship cabin'],
    iconPrompt: 'Fantasy RPG icon. A well-dressed merchant in a fine townhouse study, maps and ledgers spread across an oak desk, quality arms displayed on the wall, a carriage visible through the window below.',
    iconPath: 'fantasy/icons/ECONOMIC_TIER#prosperous.png',
  },
  5: {
    label: 'Wealthy / noble',
    descriptors: ['an estate or manor', 'staff and servants', 'money as leverage', 'insulated from the consequences that affect everyone else'],
    housing: ['manor house', 'castle wing', 'palatial city residence'],
    transport: ['fine warhorse', 'private carriage', 'personal ship'],
    iconPrompt: 'Fantasy RPG icon. A noble seated in a grand manor hall, liveried servants in attendance, tall windows overlooking manicured estate grounds, wealth and power woven into every surface.',
    iconPath: 'fantasy/icons/ECONOMIC_TIER#wealthy_noble.png',
  },
};

export const CITY_SETTINGS = [
  {
    id: 'great_city',
    label: 'A great walled city',
    flavor: 'political, overcrowded, layered with history and competing factions — everyone wants something here',
    toneTag: 'neutral',
    statAffinity: { charisma: 1.2, intelligence: 1.1 },
    iconPrompt: 'Fantasy RPG icon. An enormous walled city sprawling to the horizon, towers and spires of many eras crowded together, faction banners hanging from every wall, crowds thronging the gates.',
    iconPath: 'fantasy/icons/CITY_SETTING#great_city.png'
  },
  {
    id: 'frontier_town',
    label: 'A frontier town',
    flavor: 'rough, practical, too far from the capital to care about its laws — people come here to disappear or start over',
    toneTag: 'gritty',
    statAffinity: { constitution: 1.2, strength: 1.1 },
    iconPrompt: 'Fantasy RPG icon. A rough-hewn frontier town at the edge of a dark wilderness, wooden palisade walls, muddy unpaved streets, hard-looking locals watching a stranger arrive with flat suspicious eyes.',
    iconPath: 'fantasy/icons/CITY_SETTING#frontier_town.png'
  },
  {
    id: 'port_city',
    label: 'A busy port city',
    flavor: 'transient, corrupt, alive with trade and the things that follow trade — nobody is from here, everyone is passing through',
    toneTag: 'gritty',
    statAffinity: { charisma: 1.1, dexterity: 1.1 },
    iconPrompt: 'Fantasy RPG icon. A bustling fantasy port city at dusk, ships of many nations crowding the harbor, lamplit dock stalls loud with trade, sailors and merchants from distant lands moving through the fog.',
    iconPath: 'fantasy/icons/CITY_SETTING#port_city.png'
  },
  {
    id: 'kingdom_capital',
    label: 'The kingdom\'s capital',
    flavor: 'grand, stratified, where reputations are made and destroyed — the kind of city that rewards the ruthless',
    toneTag: 'dramatic',
    statAffinity: { charisma: 1.3, intelligence: 1.2 },
    iconPrompt: 'Fantasy RPG icon. A gleaming royal capital atop a hill, a vast palace dominating the skyline, liveried guards at every gate, the grandeur of carved stone and gold leaf masking ruthless politics within.',
    iconPath: 'fantasy/icons/CITY_SETTING#kingdom_capital.png'
  },
  {
    id: 'small_town',
    label: 'A small market town',
    flavor: 'everyone knows everyone, gossip is currency, leaving is an event — the kind of place that\'s easier to love from a distance',
    toneTag: 'cozy',
    statAffinity: { wisdom: 1.2, charisma: 0.9 },
    iconPrompt: 'Fantasy RPG icon. A cozy market town square on a busy morning, locals haggling over stalls of produce and wares, a warm inn at the corner, everyone watching everyone with cheerful nosiness.',
    iconPath: 'fantasy/icons/CITY_SETTING#small_town.png'
  },
  {
    id: 'mage_city',
    label: 'A city of mages and scholars',
    flavor: 'stratified by knowledge, experimental, occasionally on fire — fascinating if you\'re in the right guild, dangerous if you\'re not',
    toneTag: 'neutral',
    statAffinity: { intelligence: 1.4, wisdom: 1.1 },
    iconPrompt: 'Fantasy RPG icon. A city of tall towers crackling with arcane energy, robed scholars debating in the streets below, magical experiments visible through high windows, one tower gently on fire in the background.',
    iconPath: 'fantasy/icons/CITY_SETTING#mage_city.png'
  },
  {
    id: 'fortress_town',
    label: 'A fortress town near a border',
    flavor: 'military, tense, built for war whether or not there\'s one currently happening — discipline enforced, questions discouraged',
    toneTag: 'gritty',
    statAffinity: { strength: 1.2, constitution: 1.2 },
    iconPrompt: 'Fantasy RPG icon. A grim fortress town at the edge of hostile territory, heavy stone walls and war engines on the battlements, soldiers drilling in the courtyard below, tension in every stone.',
    iconPath: 'fantasy/icons/CITY_SETTING#fortress_town.png'
  },
  {
    id: 'ancient_city',
    label: 'An ancient city on a trade road',
    flavor: 'layered over centuries of history, haunted by what came before, rich and paranoid in equal measure',
    toneTag: 'dramatic',
    statAffinity: { wisdom: 1.2, intelligence: 1.1 },
    iconPrompt: 'Fantasy RPG icon. A city built over the ruins of older civilizations, ancient columns and crumbling arches mixed with newer buildings, a busy trade road running through its heart, the weight of centuries in every stone.',
    iconPath: 'fantasy/icons/CITY_SETTING#ancient_city.png'
  },
  {
    id: 'village',
    label: 'A small village',
    flavor: 'close-knit, suspicious of outsiders, the kind of quiet that holds its breath — something is always just beneath the surface',
    toneTag: 'cozy',
    statAffinity: { wisdom: 1.2, constitution: 1.1 },
    iconPrompt: 'Fantasy RPG icon. A small village of thatched cottages in a forest clearing, villagers pausing their work to stare at an arriving stranger, an uncanny stillness beneath the ordinary surface.',
    iconPath: 'fantasy/icons/CITY_SETTING#village.png'
  },
  {
    id: 'thieves_city',
    label: 'A city where the guilds run things',
    flavor: 'politely lawless, everything has a price, the watch looks the other way as long as the bribes are current',
    toneTag: 'gritty',
    statAffinity: { dexterity: 1.2, charisma: 1.2 },
    iconPrompt: 'Fantasy RPG icon. A prosperous city at night, watchmen conspicuously looking away as hooded guild figures pass, coin changing hands in shadowed doorways, wealth and crime layered beneath a veneer of order.',
    iconPath: 'fantasy/icons/CITY_SETTING#thieves_city.png'
  },
];

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
