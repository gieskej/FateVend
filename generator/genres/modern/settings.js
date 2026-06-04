// genres/modern/settings.js
// Economic status markers and physical settings for the modern genre.
// These are used to ground the character Entry and scenario Opening
// in specific, vivid details rather than abstractions.

// ── ECONOMIC STATUS MARKERS ───────────────────────────────────────────────
// One tier per character, derived from profession economicTier + life event hints.
// Each tier includes concrete visual/sensory details for the AI prompt.

export const ECONOMIC_TIERS = {
  1: {
    label: 'Survival',
    descriptors: [
      'sleeping on a friend\'s couch',
      'living out of a storage unit',
      'rotating between shelters',
      'one paycheck from nothing',
      'eating from convenience stores',
    ],
    housing: ['couch-surfing', 'SRO hotel room', 'shelter', 'car'],
    transport: ['on foot', 'bus pass', 'borrowed bike'],
    iconPrompt: 'Modern RPG icon. A person sleeping on a pulled-out couch in someone else\'s apartment, a single bag of belongings by the door — the specific precarity of a life where the floor could drop out at any moment.',
    iconPath: 'generator/genres/modern/icons/ECONOMIC_TIER#survival.png'
  },
  2: {
    label: 'Working poor',
    descriptors: [
      'a studio apartment with thin walls',
      'two jobs just to make rent',
      'secondhand everything',
      'no savings, no cushion',
      'the car is old and unreliable',
    ],
    housing: ['studio apartment', 'shared house with roommates', 'basement unit', 'low-rent motel by the week'],
    transport: ['aging sedan', 'public transit', 'old motorcycle'],
    iconPrompt: 'Modern RPG icon. A small studio apartment late at night — shoes off at the door, takeout container on the counter, the exhausted posture of someone who worked two shifts today and has to be up early for the next.',
    iconPath: 'generator/genres/modern/icons/ECONOMIC_TIER#working_poor.png'
  },
  3: {
    label: 'Working / lower-middle class',
    descriptors: [
      'a decent one-bedroom',
      'a used car that mostly works',
      'small savings they try not to touch',
      'a neighborhood that\'s getting expensive',
    ],
    housing: ['one-bedroom apartment', 'rented house', 'condo with a mortgage that stresses them out'],
    transport: ['reliable mid-range car', 'public transit by choice'],
    iconPrompt: 'Modern RPG icon. A decent one-bedroom in a neighborhood getting more expensive — comfortable, bills paid, a small savings account they try not to think about too hard. Stable, for now.',
    iconPath: 'generator/genres/modern/icons/ECONOMIC_TIER#working_lower_middle.png'
  },
  4: {
    label: 'Middle / upper-middle class',
    descriptors: [
      'a nice apartment in a good part of town',
      'a house in the suburbs with a mortgage',
      'a car they\'re proud of',
      'vacations once a year',
      'money is not the problem',
    ],
    housing: ['house in a good neighborhood', 'upscale apartment', 'townhouse'],
    transport: ['late-model car', 'two-car household'],
    iconPrompt: 'Modern RPG icon. A well-furnished house in a good neighborhood — a late-model car in the driveway, a vacation photo on the fridge — the material comfort that doesn\'t automatically mean everything is fine.',
    iconPath: 'generator/genres/modern/icons/ECONOMIC_TIER#middle_upper_middle.png'
  },
  5: {
    label: 'Wealthy / elite',
    descriptors: [
      'a penthouse or estate',
      'staff',
      'a driver or private car service',
      'money as a social weapon',
      'insulated from consequences',
    ],
    housing: ['penthouse', 'estate', 'multiple properties', 'gated community'],
    transport: ['luxury vehicle', 'driver', 'private car service'],
    iconPrompt: 'Modern RPG icon. A penthouse or private estate with city views — staff present in the background, a lifestyle insulated from consequences, power worn as comfortably as furniture.',
    iconPath: 'generator/genres/modern/icons/ECONOMIC_TIER#wealthy_elite.png'
  },
};

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
    iconPath: 'generator/genres/modern/icons/CITY_SETTING#rust_belt_city.png'
  },
  {
    id: 'coastal_metropolis',
    label: 'A coastal metropolis',
    flavor: 'expensive, anonymous, electric, everyone is from somewhere else',
    toneTag: 'neutral',
    statAffinity: { charisma: 1.2, intelligence: 1.1 },
    iconPrompt: 'Modern RPG icon. A coastal metropolis from street level — glass towers, crowded sidewalks, ten languages in one block, the anonymous electric energy of a city where everyone is from somewhere else.',
    iconPath: 'generator/genres/modern/icons/CITY_SETTING#coastal_metropolis.png'
  },
  {
    id: 'sunbelt_sprawl',
    label: 'A sprawling Sunbelt city',
    flavor: 'fast-growing, car-dependent, no history, anything can reinvent itself here',
    toneTag: 'neutral',
    statAffinity: { charisma: 1.1 },
    iconPrompt: 'Modern RPG icon. A sprawling Sunbelt city highway view — strip malls and new construction stretching to the horizon, the infrastructure of somewhere still figuring out what it actually is.',
    iconPath: 'generator/genres/modern/icons/CITY_SETTING#sunbelt_sprawl.png'
  },
  {
    id: 'midwest_mid_sized',
    label: 'A mid-sized Midwestern city',
    flavor: 'overlooked, working, tight-knit neighborhoods, people stay or people leave',
    toneTag: 'cozy',
    statAffinity: { wisdom: 1.1, constitution: 1.1 },
    iconPrompt: 'Modern RPG icon. A mid-sized Midwestern city on an ordinary afternoon — brick storefronts, residential streets with front porches, the working-class solidity of a place that doesn\'t appear in many movies and doesn\'t particularly need to.',
    iconPath: 'generator/genres/modern/icons/CITY_SETTING#midwest_mid_sized.png'
  },
  {
    id: 'southern_city',
    label: 'A Southern city',
    flavor: 'old money and new growth, politeness as armor, history that won\'t stay buried',
    toneTag: 'dramatic',
    statAffinity: { charisma: 1.2, wisdom: 1.1 },
    iconPrompt: 'Modern RPG icon. A Southern city neighborhood — old architecture beside new glass towers, the layered politeness of a place where history is always just below the surface and everyone knows it.',
    iconPath: 'generator/genres/modern/icons/CITY_SETTING#southern_city.png'
  },
  {
    id: 'small_town',
    label: 'A small town',
    flavor: 'everyone knows everything, nothing stays secret long, leaving means something',
    toneTag: 'cozy',
    statAffinity: { wisdom: 1.2, charisma: 0.9 },
    iconPrompt: 'Modern RPG icon. A small-town main street on a weekday — a diner, a hardware store, people who know each other\'s business, the particular quiet of a place where everyone is always somewhat aware of being watched.',
    iconPath: 'generator/genres/modern/icons/CITY_SETTING#small_town.png'
  },
  {
    id: 'college_town',
    label: 'A college town',
    flavor: 'youth and stagnation side by side, town-gown tension, cheap beer and big ideas',
    toneTag: 'cozy',
    statAffinity: { intelligence: 1.2, charisma: 1.1 },
    iconPrompt: 'Modern RPG icon. A college town street at the edge of campus — bars and bookstores, students with strong opinions, permanent residents who remember when the buildings were different, two worlds never quite overlapping.',
    iconPath: 'generator/genres/modern/icons/CITY_SETTING#college_town.png'
  },
  {
    id: 'port_city',
    label: 'A port city',
    flavor: 'transient, layered, goods and people moving constantly, old criminal infrastructure',
    toneTag: 'gritty',
    statAffinity: { strength: 1.1, charisma: 1.1, constitution: 1.1 },
    iconPrompt: 'Modern RPG icon. A port city waterfront — container ships in the distance, working docks below, a neighborhood built on the constant transient flow of goods and people, old criminal infrastructure just below the tourist surface.',
    iconPath: 'generator/genres/modern/icons/CITY_SETTING#port_city.png'
  },
  {
    id: 'tech_hub',
    label: 'A tech hub',
    flavor: 'money and disruption, old neighborhoods disappearing, everyone has a startup or a grievance',
    toneTag: 'neutral',
    statAffinity: { intelligence: 1.3, charisma: 1.1 },
    iconPrompt: 'Modern RPG icon. A tech hub neighborhood in visible transition — a Victorian building beside a glass startup office, a legacy diner beside a cold brew bar, old residents and new money in the same frame.',
    iconPath: 'generator/genres/modern/icons/CITY_SETTING#tech_hub.png'
  },
  {
    id: 'border_town',
    label: 'A border town',
    flavor: 'two worlds overlapping, informal economy, the law means different things on different streets',
    toneTag: 'gritty',
    statAffinity: { wisdom: 1.1, strength: 1.1, constitution: 1.2 },
    iconPrompt: 'Modern RPG icon. A border town street — two national identities overlapping in the same block, an informal economy visible in every corner, a place where the law means different things on different sides of the same street.',
    iconPath: 'generator/genres/modern/icons/CITY_SETTING#border_town.png'
  },
];

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
