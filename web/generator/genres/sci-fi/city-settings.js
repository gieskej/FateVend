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
];
