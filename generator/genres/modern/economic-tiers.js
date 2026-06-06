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
