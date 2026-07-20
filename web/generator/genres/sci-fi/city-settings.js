// ── LOCATION SETTINGS ────────────────────────────────────────────────────
// The scenario is grounded in a specific physical setting.
// One is selected randomly; used to flavor the Opening and Description.

export const CITY_SETTINGS = [
  {
    id: "orbital_station",
    label: "An orbital station",
    flavor:
      "recycled air and recycled people, everyone transient, everything negotiable, the void just outside the hull",
    toneTag: "neutral",
    statAffinity: { intelligence: 1.2, dexterity: 1.1 },
    iconPrompt:
      "orbital space station exterior, corporate megastructure in orbit, neon-lit docking rings, void and distant planet below",
    iconPath:
      "generator/genres/sci-fi/icons/CITY_SETTINGS#orbital_station.webp",
  },
  {
    id: "megacity_sprawl",
    label: "A megacity sprawl",
    flavor:
      "ninety levels of vertical geography, corp logos blocking out the sky, the lower you are the less the rules apply",
    toneTag: "gritty",
    statAffinity: { charisma: 1.1, constitution: 1.1 },
    iconPrompt:
      "cyberpunk megacity vertical sprawl, towering skyscrapers vanishing into smog, neon advertisements, drone traffic",
    iconPath:
      "generator/genres/sci-fi/icons/CITY_SETTINGS#megacity_sprawl.webp",
  },
  {
    id: "corp_arcology",
    label: "A corporate arcology",
    flavor:
      "self-contained, climate-controlled, the whole city is the company — nice if you don't notice the edges",
    toneTag: "neutral",
    statAffinity: { intelligence: 1.2, charisma: 1.1 },
    iconPrompt:
      "massive corporate arcology dome on a planet surface, gleaming self-contained city inside glass, armed checkpoints at the gate, supply ships arriving, gardens and parks inside",
    iconPath: "generator/genres/sci-fi/icons/CITY_SETTINGS#corp_arcology.webp",
  },
  {
    id: "colony_world",
    label: "A colony world",
    flavor:
      "young settlement, everything still being built, the rules are what you negotiate, corp presence is recent and hungry",
    toneTag: "neutral",
    statAffinity: { constitution: 1.3, strength: 1.1 },
    iconPrompt:
      "new colony planet, domed habitat clusters, alien sky with two moons, terraforming equipment on the horizon, supply ships arriving",
    iconPath: "generator/genres/sci-fi/icons/CITY_SETTINGS#colony_world.webp",
  },
  {
    id: "mining_belt",
    label: "A mining belt installation",
    flavor:
      "rock dust and shift rotations, everyone has a number and a quota, space is close and so are the people",
    toneTag: "gritty",
    statAffinity: { strength: 1.2, constitution: 1.3 },
    iconPrompt:
      "asteroid mining installation, grimy industrial space platform, ore extractors, smelting furnaces, trommels, ore transport robots, spinning rock and vacuum",
    iconPath: "generator/genres/sci-fi/icons/CITY_SETTINGS#mining_belt.webp",
  },
  {
    id: "deep_space_outpost",
    label: "A deep-space outpost",
    flavor:
      "days from the nearest lane marker, crew-small, supply-dependent, the silence outside is total",
    toneTag: "gritty",
    statAffinity: { constitution: 1.3, wisdom: 1.2 },
    iconPrompt:
      "isolated deep-space outpost, lone silver structure floating in the dark, distant faint stars, emergency amber lighting",
    iconPath:
      "generator/genres/sci-fi/icons/CITY_SETTINGS#deep_space_outpost.webp",
  },
  {
    id: "generation_ship",
    label: "A generation ship",
    flavor:
      "born mid-voyage, destination theoretical, the ship is the world and the world has politics",
    toneTag: "dramatic",
    statAffinity: { wisdom: 1.2, charisma: 1.1 },
    iconPrompt:
      "generation ship interior, rows of cryo-pods glowing a faint blue, cathedral corridors of metal, multiple generations of people living inside a vast hull",
    iconPath:
      "generator/genres/sci-fi/icons/CITY_SETTINGS#generation_ship.webp",
  },
  {
    id: "post_collapse_ruins",
    label: "Post-collapse city ruins",
    flavor:
      "whatever this was before the corp withdrew or the war came through, it isn't anymore; people live here anyway",
    toneTag: "gritty",
    statAffinity: { constitution: 1.2, wisdom: 1.1 },
    iconPrompt:
      "collapsed megacity ruins, crumbling skyscrapers overgrown with alien moss, survivors picking through rubble",
    iconPath:
      "generator/genres/sci-fi/icons/CITY_SETTINGS#post_collapse_ruins.webp",
  },
  {
    id: "frontier_outpost",
    label: "A frontier outpost",
    flavor:
      "edge of mapped space, three factions competing for the same resources, law is what the locals agree to this week",
    toneTag: "neutral",
    statAffinity: { constitution: 1.2, wisdom: 1.1, charisma: 1.1 },
    iconPrompt:
      "frontier planet outpost, rough terrain, provisional modular structures, austere homestead, moisture vaporators, subsistence farming, no corporate presence, edge of mapped space",
    iconPath:
      "generator/genres/sci-fi/icons/CITY_SETTINGS#frontier_outpost.webp",
  },
  {
    id: "undercity",
    label: "The undercity",
    flavor:
      "below the corp-serviced levels, grey-market everything, the infrastructure is older than anyone living remembers, survival is a local expertise",
    toneTag: "gritty",
    statAffinity: { dexterity: 1.2, constitution: 1.2 },
    iconPrompt:
      "subterranean undercity, lowest levels below the main city, pipes, wires, puddles, flickering shadows, trash, rats, illegal trade, forgotten underclass in cramped tunnels",
    iconPath: "generator/genres/sci-fi/icons/CITY_SETTINGS#undercity.webp",
  },
  {
    id: "trade_hub_station",
    label: "A thriving trade hub station",
    flavor:
      "a hundred flags on a hundred ships, deals cut in six languages before breakfast, nobody owns this place and everybody profits",
    toneTag: "cozy",
    statAffinity: { charisma: 1.3, intelligence: 1.1 },
    iconPrompt:
      "bustling multicultural space trade station, colorful ship pennants and market stalls along a wide docking concourse, diverse alien and human traders haggling, warm golden light, festive lived-in atmosphere",
    iconPath:
      "generator/genres/sci-fi/icons/CITY_SETTINGS#trade_hub_station.webp",
  },
  {
    id: "solarpunk_arcology",
    label: "A solarpunk arcology",
    flavor:
      "terraced gardens climb every wall, the power grid runs on sunlight and goodwill, and for once the future looks like it's actually working",
    toneTag: "cozy",
    statAffinity: { wisdom: 1.2, charisma: 1.1 },
    iconPrompt:
      "green solarpunk arcology, terraced gardens and vertical farms climbing a curved glass tower, solar sails overhead, people relaxing among plants, warm daylight, utopian atmosphere",
    iconPath:
      "generator/genres/sci-fi/icons/CITY_SETTINGS#solarpunk_arcology.webp",
  },
  {
    id: "independent_free_port",
    label: "An independent free port",
    flavor:
      "no corp flag flies here, the council votes on everything twice, and somehow the streets still get swept",
    toneTag: "neutral",
    statAffinity: { charisma: 1.1, wisdom: 1.1 },
    iconPrompt:
      "independent space port free of corporate branding, mismatched modular architecture built by many hands over many years, communal market square, hand-painted signage, warm evening lighting, self-governed atmosphere",
    iconPath:
      "generator/genres/sci-fi/icons/CITY_SETTINGS#independent_free_port.webp",
  },
  {
    id: "alien_homeworld_benevolent",
    label: "The homeworld of a benevolent advanced alien civilization",
    flavor:
      "post-scarcity, achingly patient, humans are guests here and everyone remembers it — kindly",
    toneTag: "cozy",
    statAffinity: { wisdom: 1.3, intelligence: 1.1 },
    iconPrompt:
      "utopian alien homeworld, bioluminescent organic architecture grown rather than built, twin suns, alien and human figures walking together peacefully, serene golden light",
    iconPath:
      "generator/genres/sci-fi/icons/CITY_SETTINGS#alien_homeworld_benevolent.webp",
  },
  {
    id: "family_exploration_ship",
    label: "A deep-space exploration ship with families aboard",
    flavor:
      "school schedules and stellar cartography share the same corridor, it's a mission and also just home",
    toneTag: "cozy",
    statAffinity: { wisdom: 1.1, charisma: 1.2 },
    iconPrompt:
      "deep-space exploration ship interior, families and children in a communal living deck, observation windows showing starfield, warm homey lighting, plants and personal touches",
    iconPath:
      "generator/genres/sci-fi/icons/CITY_SETTINGS#family_exploration_ship.webp",
  },
  {
    id: "military_starship",
    label: "Aboard a military starship",
    flavor:
      "chain of command down to the last bulkhead, drills at 0500, the war might be cold but the discipline isn't",
    toneTag: "gritty",
    statAffinity: { strength: 1.2, constitution: 1.2 },
    iconPrompt:
      "military starship corridor, uniformed crew at battle stations, red alert lighting, blast doors, disciplined formation, tense readiness",
    iconPath:
      "generator/genres/sci-fi/icons/CITY_SETTINGS#military_starship.webp",
  },
  {
    id: "tourism_planet",
    label: "A tourism planet",
    flavor:
      "manufactured paradise, curated sunsets, the locals work the resorts their ancestors used to own",
    toneTag: "neutral",
    statAffinity: { charisma: 1.2, dexterity: 1.1 },
    iconPrompt:
      "manufactured tourist resort planet, curated pristine beach and artificial sunset, luxury domes, service workers in uniform in the background, glossy vacation-brochure lighting",
    iconPath: "generator/genres/sci-fi/icons/CITY_SETTINGS#tourism_planet.webp",
  },
  {
    id: "garbage_dump_planet",
    label: "A garbage-dump planet",
    flavor:
      "the rest of the galaxy's trash lands here, an entire economy built on sorting it, some of it beautiful once you know where to look",
    toneTag: "gritty",
    statAffinity: { constitution: 1.2, intelligence: 1.1 },
    iconPrompt:
      "planetary garbage-dump world, mountains of sorted scrap and salvage under an orange sky, workers in patched suits sorting debris, industrial haze, scavenger economy atmosphere",
    iconPath:
      "generator/genres/sci-fi/icons/CITY_SETTINGS#garbage_dump_planet.webp",
  },
  {
    id: "neotokyo",
    label: "NeoTokyo",
    flavor:
      "vertical neon canyons, vending machines that know your name, a hundred subcultures stacked on top of each other",
    toneTag: "neutral",
    statAffinity: { dexterity: 1.1, charisma: 1.2 },
    iconPrompt:
      "neon-drenched NeoTokyo megacity street level, towering holographic advertisements, crowded crosswalk, vending machines and ramen stalls, vibrant subculture energy, night rain reflections",
    iconPath: "generator/genres/sci-fi/icons/CITY_SETTINGS#neotokyo.webp",
  },
  {
    id: "secret_research_station",
    label: "A secret military research station",
    flavor:
      "clearance levels above your clearance level, doors that don't officially exist, everyone here signed something",
    toneTag: "dramatic",
    statAffinity: { intelligence: 1.3, wisdom: 1.1 },
    iconPrompt:
      "hidden military research station, sterile restricted corridors, unmarked blast doors, personnel in hazmat suits and lab coats, classified equipment under harsh fluorescent light",
    iconPath:
      "generator/genres/sci-fi/icons/CITY_SETTINGS#secret_research_station.webp",
  },
  {
    id: "aquatic_planet",
    label: "An aquatic planet",
    flavor:
      "cities built on floating platforms and coral scaffolds, the depths are unexplored on purpose, everyone can swim by age five",
    toneTag: "neutral",
    statAffinity: { constitution: 1.2, dexterity: 1.1 },
    iconPrompt:
      "aquatic planet city, floating platforms and coral scaffolding above an endless ocean, submerged towers visible below the surface, bioluminescent sea life, turquoise water light",
    iconPath: "generator/genres/sci-fi/icons/CITY_SETTINGS#aquatic_planet.webp",
  },
  {
    id: "forest_planet",
    label: "A forest planet",
    flavor:
      "canopy cities strung between trees a kilometer tall, the ecosystem is alive and occasionally opinionated, settlers tread carefully",
    toneTag: "neutral",
    statAffinity: { wisdom: 1.2, dexterity: 1.1 },
    iconPrompt:
      "forest planet canopy city, wooden walkways strung between kilometer-tall alien trees, dappled green light, native fauna in the underbrush, misty atmosphere",
    iconPath: "generator/genres/sci-fi/icons/CITY_SETTINGS#forest_planet.webp",
  },
  {
    id: "frozen_planet",
    label: "A frozen planet",
    flavor:
      "endless white, heated corridors between domes, the cold outside kills in minutes and everyone respects it",
    toneTag: "gritty",
    statAffinity: { constitution: 1.3, wisdom: 1.1 },
    iconPrompt:
      "frozen planet outpost, heated dome habitats connected by enclosed tunnels, endless white tundra and blizzard beyond the glass, harsh pale light",
    iconPath: "generator/genres/sci-fi/icons/CITY_SETTINGS#frozen_planet.webp",
  },
  {
    id: "primitive_planet",
    label: "A pre-industrial frontier planet",
    flavor:
      "no grid, no satellites, tech from home slowly failing and nobody's coming to fix it, the locals figured out how to live here first",
    toneTag: "gritty",
    statAffinity: { constitution: 1.2, wisdom: 1.2 },
    iconPrompt:
      "pre-industrial frontier planet settlement, thatched huts built around failing salvaged tech, dense alien jungle at the edge of the clearing, cookfire smoke, isolated frontier atmosphere",
    iconPath:
      "generator/genres/sci-fi/icons/CITY_SETTINGS#primitive_planet.webp",
  },
];
