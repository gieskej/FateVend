// genres/sci-fi/settings.js
// Economic status markers and physical settings for the sci-fi genre.
// These are used to ground the character Entry and scenario Opening
// in specific, vivid details rather than abstractions.

// ── ECONOMIC STATUS MARKERS ───────────────────────────────────────────────
// One tier per character, derived from profession economicTier + life event hints.
// Each tier includes concrete visual/sensory details for the AI prompt.

export const ECONOMIC_TIERS = {
  1: {
    label: 'Below the Line',
    descriptors: [
      'stack bunk in an undercity shelter',
      'running on grey-market scrip',
      'no corp ID — invisible to the official economy',
      'synth-paste for every meal, no complaints left to give',
      'one bad shift from nothing',
    ],
    housing: ['undercity stack bunk', 'abandoned maintenance corridor', 'grey-market capsule pod', 'substation squat'],
    transport: ['on foot', 'mag-rail with a borrowed pass', 'unreliable cargo bike'],
    iconPrompt: 'A person standing in a undercity setting, looking out over the ruins.',
    iconPath: 'icons/ECONOMIC_TIERS#1#below_the_line.png'
  },
  2: {
    label: 'Wage-Serf',
    descriptors: [
      'corp housing that belongs to the corp, not them',
      'paid in company scrip — spendable only at company outlets',
      'two shifts just to cover life support',
      'secondhand everything, maintained carefully',
      'the contract renews automatically unless they ask it not to',
    ],
    housing: ['corp-assigned hab unit', 'shared worker block', 'station dormitory bay'],
    transport: ['public mag-rail', 'corp shuttle pass', 'beat-up personal skimmer'],
    iconPrompt: 'A person standing in a wage-serf setting, looking out over the ruins.',
    iconPath: 'icons/ECONOMIC_TIERS#2#wage_serf.png'
  },
  3: {
    label: 'Independent Contractor',
    descriptors: [
      'their own hab — small, but theirs',
      'gig credits that clear in real currency',
      'ship share or reliable transport with actual specs',
      'a small emergency fund they try not to think about',
      'not corp-dependent, which costs something every day',
    ],
    housing: ['private hab unit', 'berth on their own ship', 'rented ring-sector apartment'],
    transport: ['own ship or share of a ship', 'reliable skimmer', 'station transit unrestricted'],
    iconPrompt: 'A person standing in a independent contractor setting, looking out over the ruins.',
    iconPath: 'icons/ECONOMIC_TIERS#3#independent_contractor.png'
  },
  4: {
    label: 'Corporate Citizen',
    descriptors: [
      'full benefits package from a tier-one megacorp',
      'real apartment with real air filtration',
      'company vehicle with actual performance specs',
      'expense account and the meetings that justify it',
      'access to corp medical that doesn\'t involve a waiting list',
    ],
    housing: ['corp-provided arcology apartment', 'mid-ring private residence', 'executive hab suite'],
    transport: ['corp vehicle with full systems', 'priority shuttle access', 'company cruiser clearance'],
    iconPrompt: 'A person standing in a corporate citizen setting, looking out over the ruins.',
    iconPath: 'icons/ECONOMIC_TIERS#4#corporate_citizen.png'
  },
  5: {
    label: 'Elite / Exec',
    descriptors: [
      'arcology penthouse — the air is noticeably better',
      'personal ship or standing fleet access',
      'security detail that doesn\'t feel intrusive because they\'re good at their job',
      'money as a social instrument rather than a survival mechanism',
      'insulated from consequences in ways that have stopped being remarkable',
    ],
    housing: ['arcology penthouse', 'private orbital residence', 'multi-property portfolio'],
    transport: ['personal ship', 'private shuttle on demand', 'corp executive transport with escort'],
    iconPrompt: 'A person standing in a elite/exec setting, looking out over the ruins.',
    iconPath: 'icons/ECONOMIC_TIERS#5#elite_exec.png'
  },
};

// ── LOCATION SETTINGS ────────────────────────────────────────────────────
// The scenario is grounded in a specific physical setting.
// One is selected randomly; used to flavor the Opening and Description.

export const CITY_SETTINGS = [
  {
    id: 'orbital_station',
    label: 'An orbital station',
    flavor: 'recycled air and recycled people, everyone transient, everything negotiable, the void just outside the hull',
    toneTag: 'neutral',
    statAffinity: { intelligence: 1.2, dexterity: 1.1 },
    iconPrompt: 'A person standing in an orbital station setting, looking out over the ruins.',
    iconPath: 'icons/CITY_SETTINGS#1#orbital_station.png'
  },
  {
    id: 'megacity_sprawl',
    label: 'A megacity sprawl',
    flavor: 'ninety levels of vertical geography, corp logos blocking out the sky, the lower you are the less the rules apply',
    toneTag: 'gritty',
    statAffinity: { charisma: 1.1, constitution: 1.1 },
    iconPrompt: 'A person standing in a megacity sprawl setting, looking out over the ruins.',
    iconPath: 'icons/CITY_SETTINGS#2#megacity_sprawl.png'
  },
  {
    id: 'corp_arcology',
    label: 'A corporate arcology',
    flavor: 'self-contained, climate-controlled, the whole city is the company — nice if you don\'t notice the edges',
    toneTag: 'neutral',
    statAffinity: { intelligence: 1.2, charisma: 1.1 },
    iconPrompt: 'A person standing in a corporate arcology setting, looking out over the ruins.',
    iconPath: 'icons/CITY_SETTINGS#3#corp_arcology.png'
  },
  {
    id: 'colony_world',
    label: 'A colony world',
    flavor: 'young settlement, everything still being built, the rules are what you negotiate, corp presence is recent and hungry',
    toneTag: 'neutral',
    statAffinity: { constitution: 1.3, strength: 1.1 },
    iconPrompt: 'A person standing in a colony world setting, looking out over the ruins.',
    iconPath: 'icons/CITY_SETTINGS#4#colony_world.png'
  },
  {
    id: 'mining_belt',
    label: 'A mining belt installation',
    flavor: 'rock dust and shift rotations, everyone has a number and a quota, space is close and so are the people',
    toneTag: 'gritty',
    statAffinity: { strength: 1.2, constitution: 1.3 },
    iconPrompt: 'A person standing in a mining belt installation setting, looking out over the ruins.',
    iconPath: 'icons/CITY_SETTINGS#5#mining_belt.png'
  },
  {
    id: 'deep_space_outpost',
    label: 'A deep-space outpost',
    flavor: 'days from the nearest lane marker, crew-small, supply-dependent, the silence outside is total',
    toneTag: 'gritty',
    statAffinity: { constitution: 1.3, wisdom: 1.2 },
    iconPrompt: 'A person standing in a deep-space outpost setting, looking out over the ruins.',
    iconPath: 'icons/CITY_SETTINGS#6#deep_space_outpost.png'
  },
  {
    id: 'generation_ship',
    label: 'A generation ship',
    flavor: 'born mid-voyage, destination theoretical, the ship is the world and the world has politics',
    toneTag: 'dramatic',
    statAffinity: { wisdom: 1.2, charisma: 1.1 },
    iconPrompt: 'A person standing in a generation ship setting, looking out over the ruins.',
    iconPath: 'icons/CITY_SETTINGS#7#generation_ship.png'
  },
  {
    id: 'post_collapse_ruins',
    label: 'Post-collapse city ruins',
    flavor: 'whatever this was before the corp withdrew or the war came through, it isn\'t anymore; people live here anyway',
    toneTag: 'gritty',
    statAffinity: { constitution: 1.2, wisdom: 1.1 },
    iconPrompt: 'A person standing in a post-collapse city ruins setting, looking out over the ruins.',
    iconPath: 'icons/CITY_SETTINGS#8#post_collapse_ruins.png'
  },
  {
    id: 'frontier_outpost',
    label: 'A frontier outpost',
    flavor: 'edge of mapped space, three factions competing for the same resources, law is what the locals agree to this week',
    toneTag: 'neutral',
    statAffinity: { constitution: 1.2, wisdom: 1.1, charisma: 1.1 },
    iconPrompt: 'A person standing in a frontier outpost setting, looking out over the ruins.',
    iconPath: 'icons/CITY_SETTINGS#9#frontier_outpost.png'
  },
  {
    id: 'undercity',
    label: 'The undercity',
    flavor: 'below the corp-serviced levels, grey-market everything, the infrastructure is older than anyone living remembers, survival is a local expertise',
    toneTag: 'gritty',
    statAffinity: { dexterity: 1.2, constitution: 1.2 },
    iconPrompt: 'A person standing in the undercity setting, looking out over the ruins.',
    iconPath: 'icons/CITY_SETTINGS#10#undercity.png'
  },
];

// ── SCENARIO TAGS ────────────────────────────────────────────────────────
// Up to 10 tags per scenario. Drawn from the pools below based on
// toneTag, criminalFlag, and profession/tension matches.

export const TAG_POOLS = {
  always: ['sci-fi', 'character-driven'],
  gritty: ['cyberpunk', 'dystopia', 'survival', 'noir', 'undercity'],
  dramatic: ['drama', 'corporate', 'betrayal', 'identity', 'secrets'],
  neutral: ['space-opera', 'exploration', 'frontier', 'political'],
  cozy: ['crew-drama', 'found-family', 'slice-of-life'],
  criminal: ['crime', 'smuggling', 'black-market', 'underground'],
  professionTags: {
    'Criminal':          ['crime', 'criminal', 'noir'],
    'Medical':           ['medical', 'biotech'],
    'Biotech':           ['biotech', 'gene-tech'],
    'Military':          ['military', 'veteran', 'war'],
    'Security':          ['security', 'mercenary'],
    'Corporate':         ['corporate', 'megacorp', 'dystopia'],
    'Technology':        ['ai', 'tech', 'hacking'],
    'Information':       ['espionage', 'data', 'noir'],
    'Science':           ['exploration', 'discovery'],
    'Exploration':       ['exploration', 'frontier'],
    'Shipping & transit':['space-opera', 'crew-drama'],
    'Salvage':           ['survival', 'frontier'],
    'Settlement':        ['frontier', 'colony'],
    'Creative':          ['art', 'underground'],
    'Media':             ['journalism', 'resistance'],
    'Communications':    ['tech', 'espionage'],
    'Logistics':         ['working-class', 'survival'],
    'Transit':           ['working-class'],
  },
};
