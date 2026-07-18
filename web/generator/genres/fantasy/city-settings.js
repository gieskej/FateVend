// genres/fantasy/city-settings.js
// Where the scenario is grounded. One is selected randomly. Each entry:
//   id           — unique slug; used for slot-machine reel identity and icon lookup
//   label        — display label
//   flavor       — atmospheric detail passed to Claude for the Opening/Description
//   toneTag      — gritty | dramatic | cozy | neutral; feeds TAG_POOLS in settings.js
//   statAffinity — optional stat-weighted selection bias
//   iconPrompt   — text-to-image prompt for this setting's slot-machine reel icon
//   iconPath     — served path where that icon lives

export const CITY_SETTINGS = [
  {
    id: "great_city",
    label: "A great walled city",
    flavor:
      "political, overcrowded, layered with history and competing factions — everyone wants something here",
    toneTag: "neutral",
    statAffinity: { charisma: 1.2, intelligence: 1.1 },
    iconPrompt:
      "Fantasy RPG icon. An enormous walled city sprawling to the horizon, towers and spires of many eras crowded together, faction banners hanging from every wall, crowds thronging the gates.",
    iconPath: "generator/genres/fantasy/icons/CITY_SETTING#great_city.webp",
  },
  {
    id: "frontier_town",
    label: "A frontier town",
    flavor:
      "rough, practical, too far from the capital to care about its laws — people come here to disappear or start over",
    toneTag: "gritty",
    statAffinity: { constitution: 1.2, strength: 1.1 },
    iconPrompt:
      "Fantasy RPG icon. A rough-hewn frontier town at the edge of a dark wilderness, wooden palisade walls, muddy unpaved streets, hard-looking locals watching a stranger arrive with flat suspicious eyes.",
    iconPath: "generator/genres/fantasy/icons/CITY_SETTING#frontier_town.webp",
  },
  {
    id: "port_city",
    label: "A busy port city",
    flavor:
      "transient, corrupt, alive with trade and the things that follow trade — nobody is from here, everyone is passing through",
    toneTag: "gritty",
    statAffinity: { charisma: 1.1, dexterity: 1.1 },
    iconPrompt:
      "Fantasy RPG icon. A bustling fantasy port city at dusk, ships of many nations crowding the harbor, lamplit dock stalls loud with trade, sailors and merchants from distant lands moving through the fog.",
    iconPath: "generator/genres/fantasy/icons/CITY_SETTING#port_city.webp",
  },
  {
    id: "kingdom_capital",
    label: "The kingdom's capital",
    flavor:
      "grand, stratified, where reputations are made and destroyed — the kind of city that rewards the ruthless",
    toneTag: "dramatic",
    statAffinity: { charisma: 1.3, intelligence: 1.2 },
    iconPrompt:
      "Fantasy RPG icon. A gleaming royal capital atop a hill, a vast palace dominating the skyline, liveried guards at every gate, the grandeur of carved stone and gold leaf masking ruthless politics within.",
    iconPath:
      "generator/genres/fantasy/icons/CITY_SETTING#kingdom_capital.webp",
  },
  {
    id: "small_town",
    label: "A small market town",
    flavor:
      "everyone knows everyone, gossip is currency, leaving is an event — the kind of place that's easier to love from a distance",
    toneTag: "cozy",
    statAffinity: { wisdom: 1.2, charisma: 0.9 },
    iconPrompt:
      "Fantasy RPG icon. A cozy market town square on a busy morning, locals haggling over stalls of produce and wares, a warm inn at the corner, everyone watching everyone with cheerful nosiness.",
    iconPath: "generator/genres/fantasy/icons/CITY_SETTING#small_town.webp",
  },
  {
    id: "mage_city",
    label: "A city of mages and scholars",
    flavor:
      "stratified by knowledge, experimental, occasionally on fire — fascinating if you're in the right guild, dangerous if you're not",
    toneTag: "neutral",
    statAffinity: { intelligence: 1.4, wisdom: 1.1 },
    iconPrompt:
      "Fantasy RPG icon. A city of tall towers crackling with arcane energy, robed scholars debating in the streets below, magical experiments visible through high windows, one tower gently on fire in the background.",
    iconPath: "generator/genres/fantasy/icons/CITY_SETTING#mage_city.webp",
  },
  {
    id: "fortress_town",
    label: "A fortress town near a border",
    flavor:
      "military, tense, built for war whether or not there's one currently happening — discipline enforced, questions discouraged",
    toneTag: "gritty",
    statAffinity: { strength: 1.2, constitution: 1.2 },
    iconPrompt:
      "Fantasy RPG icon. A grim fortress town at the edge of hostile territory, heavy stone walls and war engines on the battlements, soldiers drilling in the courtyard below, tension in every stone.",
    iconPath: "generator/genres/fantasy/icons/CITY_SETTING#fortress_town.webp",
  },
  {
    id: "ancient_city",
    label: "An ancient city on a trade road",
    flavor:
      "layered over centuries of history, haunted by what came before, rich and paranoid in equal measure",
    toneTag: "dramatic",
    statAffinity: { wisdom: 1.2, intelligence: 1.1 },
    iconPrompt:
      "Fantasy RPG icon. A city built over the ruins of older civilizations, ancient columns and crumbling arches mixed with newer buildings, a busy trade road running through its heart, the weight of centuries in every stone.",
    iconPath: "generator/genres/fantasy/icons/CITY_SETTING#ancient_city.webp",
  },
  {
    id: "village",
    label: "A small village",
    flavor:
      "close-knit, suspicious of outsiders, the kind of quiet that holds its breath — something is always just beneath the surface",
    toneTag: "cozy",
    statAffinity: { wisdom: 1.2, constitution: 1.1 },
    iconPrompt:
      "Fantasy RPG icon. A small village of thatched cottages in a forest clearing, villagers pausing their work to stare at an arriving stranger, an uncanny stillness beneath the ordinary surface.",
    iconPath: "generator/genres/fantasy/icons/CITY_SETTING#village.webp",
  },
  {
    id: "thieves_city",
    label: "A city where the guilds run things",
    flavor:
      "politely lawless, everything has a price, the watch looks the other way as long as the bribes are current",
    toneTag: "gritty",
    statAffinity: { dexterity: 1.2, charisma: 1.2 },
    iconPrompt:
      "Fantasy RPG icon. A prosperous city at night, watchmen conspicuously looking away as hooded guild figures pass, coin changing hands in shadowed doorways, wealth and crime layered beneath a veneer of order.",
    iconPath: "generator/genres/fantasy/icons/CITY_SETTING#thieves_city.webp",
  },
];
