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
  },
  {
    id: 'coastal_metropolis',
    label: 'A coastal metropolis',
    flavor: 'expensive, anonymous, electric, everyone is from somewhere else',
    toneTag: 'neutral',
    statAffinity: { charisma: 1.2, intelligence: 1.1 },
  },
  {
    id: 'sunbelt_sprawl',
    label: 'A sprawling Sunbelt city',
    flavor: 'fast-growing, car-dependent, no history, anything can reinvent itself here',
    toneTag: 'neutral',
    statAffinity: { charisma: 1.1 },
  },
  {
    id: 'midwest_mid_sized',
    label: 'A mid-sized Midwestern city',
    flavor: 'overlooked, working, tight-knit neighborhoods, people stay or people leave',
    toneTag: 'cozy',
    statAffinity: { wisdom: 1.1, constitution: 1.1 },
  },
  {
    id: 'southern_city',
    label: 'A Southern city',
    flavor: 'old money and new growth, politeness as armor, history that won\'t stay buried',
    toneTag: 'dramatic',
    statAffinity: { charisma: 1.2, wisdom: 1.1 },
  },
  {
    id: 'small_town',
    label: 'A small town',
    flavor: 'everyone knows everything, nothing stays secret long, leaving means something',
    toneTag: 'cozy',
    statAffinity: { wisdom: 1.2, charisma: 0.9 },
  },
  {
    id: 'college_town',
    label: 'A college town',
    flavor: 'youth and stagnation side by side, town-gown tension, cheap beer and big ideas',
    toneTag: 'cozy',
    statAffinity: { intelligence: 1.2, charisma: 1.1 },
  },
  {
    id: 'port_city',
    label: 'A port city',
    flavor: 'transient, layered, goods and people moving constantly, old criminal infrastructure',
    toneTag: 'gritty',
    statAffinity: { strength: 1.1, charisma: 1.1, constitution: 1.1 },
  },
  {
    id: 'tech_hub',
    label: 'A tech hub',
    flavor: 'money and disruption, old neighborhoods disappearing, everyone has a startup or a grievance',
    toneTag: 'neutral',
    statAffinity: { intelligence: 1.3, charisma: 1.1 },
  },
  {
    id: 'border_town',
    label: 'A border town',
    flavor: 'two worlds overlapping, informal economy, the law means different things on different streets',
    toneTag: 'gritty',
    statAffinity: { wisdom: 1.1, strength: 1.1, constitution: 1.2 },
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
