// ── CITY SETTINGS ────────────────────────────────────────────────────────
// The scenario is grounded in a specific urban context.
// One is selected randomly; used to flavor the Opening and Description.

export const CITY_SETTINGS = [
  {
    id: 'rust_belt_city',
    label: 'A Rust Belt city',
    flavor: 'half-empty, post-industrial, cheap rent, proud and fading',
    toneTag: 'gritty',
    statAffinity: { constitution: 1.2, strength: 1.1 },
    iconPrompt: 'Modern RPG icon. A Rust Belt city street at dusk — vacant factories beside still-occupied neighborhoods, proud architecture in need of work, a place that used to be something and is still deciding what it is.',
    iconPath: 'generator/genres/modern/icons/CITY_SETTING#rust_belt_city.webp'
  },
  {
    id: 'coastal_metropolis',
    label: 'A coastal metropolis',
    flavor: 'expensive, anonymous, electric, everyone is from somewhere else',
    toneTag: 'neutral',
    statAffinity: { charisma: 1.2, intelligence: 1.1 },
    iconPrompt: 'Modern RPG icon. A coastal metropolis from street level — glass towers, crowded sidewalks, ten languages in one block, the anonymous electric energy of a city where everyone is from somewhere else.',
    iconPath: 'generator/genres/modern/icons/CITY_SETTING#coastal_metropolis.webp'
  },
  {
    id: 'sunbelt_sprawl',
    label: 'A sprawling Sunbelt city',
    flavor: 'fast-growing, car-dependent, no history, anything can reinvent itself here',
    toneTag: 'neutral',
    statAffinity: { charisma: 1.1 },
    iconPrompt: 'Modern RPG icon. A sprawling Sunbelt city highway view — strip malls and new construction stretching to the horizon, the infrastructure of somewhere still figuring out what it actually is.',
    iconPath: 'generator/genres/modern/icons/CITY_SETTING#sunbelt_sprawl.webp'
  },
  {
    id: 'midwest_mid_sized',
    label: 'A mid-sized Midwestern city',
    flavor: 'overlooked, working, tight-knit neighborhoods, people stay or people leave',
    toneTag: 'cozy',
    statAffinity: { wisdom: 1.1, constitution: 1.1 },
    iconPrompt: 'Modern RPG icon. A mid-sized Midwestern city on an ordinary afternoon — brick storefronts, residential streets with front porches, the working-class solidity of a place that doesn\'t appear in many movies and doesn\'t particularly need to.',
    iconPath: 'generator/genres/modern/icons/CITY_SETTING#midwest_mid_sized.webp'
  },
  {
    id: 'southern_city',
    label: 'A Southern city',
    flavor: 'old money and new growth, politeness as armor, history that won\'t stay buried',
    toneTag: 'dramatic',
    statAffinity: { charisma: 1.2, wisdom: 1.1 },
    iconPrompt: 'Modern RPG icon. A Southern city neighborhood — old architecture beside new glass towers, the layered politeness of a place where history is always just below the surface and everyone knows it.',
    iconPath: 'generator/genres/modern/icons/CITY_SETTING#southern_city.webp'
  },
  {
    id: 'small_town',
    label: 'A small town',
    flavor: 'everyone knows everything, nothing stays secret long, leaving means something',
    toneTag: 'cozy',
    statAffinity: { wisdom: 1.2, charisma: 0.9 },
    iconPrompt: 'Modern RPG icon. A small-town main street on a weekday — a diner, a hardware store, people who know each other\'s business, the particular quiet of a place where everyone is always somewhat aware of being watched.',
    iconPath: 'generator/genres/modern/icons/CITY_SETTING#small_town.webp'
  },
  {
    id: 'college_town',
    label: 'A college town',
    flavor: 'youth and stagnation side by side, town-gown tension, cheap beer and big ideas',
    toneTag: 'cozy',
    statAffinity: { intelligence: 1.2, charisma: 1.1 },
    iconPrompt: 'Modern RPG icon. A college town street at the edge of campus — bars and bookstores, students with strong opinions, permanent residents who remember when the buildings were different, two worlds never quite overlapping.',
    iconPath: 'generator/genres/modern/icons/CITY_SETTING#college_town.webp'
  },
  {
    id: 'port_city',
    label: 'A port city',
    flavor: 'transient, layered, goods and people moving constantly, old criminal infrastructure',
    toneTag: 'gritty',
    statAffinity: { strength: 1.1, charisma: 1.1, constitution: 1.1 },
    iconPrompt: 'Modern RPG icon. A port city waterfront — container ships in the distance, working docks below, a neighborhood built on the constant transient flow of goods and people, old criminal infrastructure just below the tourist surface.',
    iconPath: 'generator/genres/modern/icons/CITY_SETTING#port_city.webp'
  },
  {
    id: 'tech_hub',
    label: 'A tech hub',
    flavor: 'money and disruption, old neighborhoods disappearing, everyone has a startup or a grievance',
    toneTag: 'neutral',
    statAffinity: { intelligence: 1.3, charisma: 1.1 },
    iconPrompt: 'Modern RPG icon. A tech hub neighborhood in visible transition — a Victorian building beside a glass startup office, a legacy diner beside a cold brew bar, old residents and new money in the same frame.',
    iconPath: 'generator/genres/modern/icons/CITY_SETTING#tech_hub.webp'
  },
  {
    id: 'border_town',
    label: 'A border town',
    flavor: 'two worlds overlapping, informal economy, the law means different things on different streets',
    toneTag: 'gritty',
    statAffinity: { wisdom: 1.1, strength: 1.1, constitution: 1.2 },
    iconPrompt: 'Modern RPG icon. A border town street — two national identities overlapping in the same block, an informal economy visible in every corner, a place where the law means different things on different sides of the same street.',
    iconPath: 'generator/genres/modern/icons/CITY_SETTING#border_town.webp'
  },
];
