// genres/paleolithic/tensions.js
// The current situation pressing on the character.

export const TENSIONS = [

  // ── FOOD & SURVIVAL ───────────────────────────────────────────────────────
  {
    id: 'stores_running_low',
    description: 'Winter is weeks away and the tribe\'s food stores are dangerously short — the last hunt failed and the gathering season is ending',
    toneTag: 'gritty',
    statAffinity: { constitution: 1.2, strength: 1.1 },
    criminalFlag: false,
    iconPrompt: 'paleolithic rpg icon, tribe member counting nearly empty food stores in a cave, worried expression, sparse food supplies visible, dim light',
    iconPath: 'generator/genres/paleolithic/icons/TENSIONS#stores_running_low.webp',
  },
  {
    id: 'famine_territory',
    description: 'The traditional hunting ground has gone quiet — the herds have shifted or been hunted out and the tribe needs to find new territory before desperation sets in',
    toneTag: 'gritty',
    statAffinity: { constitution: 1.2, wisdom: 1.1 },
    criminalFlag: false,
    iconPrompt: 'paleolithic rpg icon, hunter standing in empty grassland, no game visible, scanning horizon with growing unease, bleak open landscape',
    iconPath: 'generator/genres/paleolithic/icons/TENSIONS#famine_territory.webp',
  },

  // ── PREDATORS ─────────────────────────────────────────────────────────────
  {
    id: 'cave_lion_stalking',
    description: 'A cave lion has been taking livestock animals from the camp fringe — last night it came close enough to sniff the sleeping children; it will be back',
    toneTag: 'gritty',
    statAffinity: { constitution: 1.2, strength: 1.1 },
    criminalFlag: false,
    iconPrompt: 'paleolithic rpg icon, massive cave lion silhouette at the edge of firelight, eyes glowing, tribe members frozen in terror by the fire, night',
    iconPath: 'generator/genres/paleolithic/icons/TENSIONS#cave_lion_stalking.webp',
  },
  {
    id: 'wolf_pack_territory',
    description: 'A large wolf pack has moved into the hunting grounds and is out-competing the tribe for the deer herds — every hunt ends in a confrontation',
    toneTag: 'gritty',
    statAffinity: { strength: 1.2, dexterity: 1.1 },
    criminalFlag: false,
    iconPrompt: 'paleolithic rpg icon, hunter being circled by wolves in a forest clearing, spear raised, outnumbered, tense standoff, twilight',
    iconPath: 'generator/genres/paleolithic/icons/TENSIONS#wolf_pack_territory.webp',
  },

  // ── RIVAL TRIBES ──────────────────────────────────────────────────────────
  {
    id: 'rival_encroachment',
    description: 'A rival tribe has been moving into the traditional hunting range — fires visible across the river at night; not yet an attack but the message is clear',
    toneTag: 'dramatic',
    statAffinity: { strength: 1.2, wisdom: 1.1 },
    criminalFlag: false,
    iconPrompt: 'paleolithic rpg icon, two hunters from different tribes facing off across a stream, spears held but not raised, mutual wary assessment, tense daylight',
    iconPath: 'generator/genres/paleolithic/icons/TENSIONS#rival_encroachment.webp',
  },
  {
    id: 'raid_coming',
    description: 'The scouts have seen sign of a war party three days\' march away — the tribe must decide whether to flee, fortify, or attack first',
    toneTag: 'gritty',
    statAffinity: { strength: 1.2, constitution: 1.1 },
    criminalFlag: false,
    iconPrompt: 'paleolithic rpg icon, scout running into camp with urgent news, tribe chief and warriors gathering to listen, alarm, firelit camp evening',
    iconPath: 'generator/genres/paleolithic/icons/TENSIONS#raid_coming.webp',
  },

  // ── SPIRITS & OMENS ───────────────────────────────────────────────────────
  {
    id: 'spirits_silent',
    description: 'The spirits have gone quiet — the shaman\'s rituals go unanswered, the omens are unreadable, and the tribe is beginning to ask if someone has offended the ancestors',
    toneTag: 'dramatic',
    statAffinity: { wisdom: 1.2, charisma: 1.1 },
    criminalFlag: false,
    iconPrompt: 'paleolithic rpg icon, shaman performing ceremony in cave, arms raised but fire guttering, animals on cave walls seeming empty, troubled expression, eerie atmosphere',
    iconPath: 'generator/genres/paleolithic/icons/TENSIONS#spirits_silent.webp',
  },
  {
    id: 'bad_omen',
    description: 'Three unusual signs in one week — a two-headed bird, blood in the river at dawn, and a child who woke up speaking a language no one recognizes',
    toneTag: 'dramatic',
    statAffinity: { wisdom: 1.3, intelligence: 1.1 },
    criminalFlag: false,
    iconPrompt: 'paleolithic rpg icon, tribe members examining a dead two-headed bird with fear and awe, shaman kneeling beside it, gathering dark clouds, ominous light',
    iconPath: 'generator/genres/paleolithic/icons/TENSIONS#bad_omen.webp',
  },

  // ── INTERNAL ──────────────────────────────────────────────────────────────
  {
    id: 'leadership_challenge',
    description: 'The tribe\'s chief is aging and a younger challenger is gathering supporters — the divide is widening and everyone is choosing a side whether they want to or not',
    toneTag: 'dramatic',
    statAffinity: { charisma: 1.2, wisdom: 1.1 },
    criminalFlag: false,
    iconPrompt: 'paleolithic rpg icon, tense council fire scene, old chief and young challenger across from each other, other tribe members watching the confrontation, firelight',
    iconPath: 'generator/genres/paleolithic/icons/TENSIONS#leadership_challenge.webp',
  },
  {
    id: 'thief_among_us',
    description: 'Someone within the tribe has been stealing from the communal food stores — the missing portions are small but consistent, and suspicion is poisoning the camp',
    toneTag: 'dramatic',
    statAffinity: { wisdom: 1.2, charisma: 1.1 },
    criminalFlag: true,
    iconPrompt: 'paleolithic rpg icon, tribe members pointing at each other in accusation by the fire, suspicion and anger in their faces, someone looking guilty in background',
    iconPath: 'generator/genres/paleolithic/icons/TENSIONS#thief_among_us.webp',
  },

  // ── ENVIRONMENT ───────────────────────────────────────────────────────────
  {
    id: 'migration_time',
    description: 'The tribe must migrate to the winter camp but the route is flooded or contested by another group — staying risks starvation; going risks violence',
    toneTag: 'gritty',
    statAffinity: { constitution: 1.2, wisdom: 1.2 },
    criminalFlag: false,
    iconPrompt: 'paleolithic rpg icon, tribe gathered at flooded river crossing, looking across at far bank, debating the crossing, heavy packs and children in arms, tension',
    iconPath: 'generator/genres/paleolithic/icons/TENSIONS#migration_time.webp',
  },
  {
    id: 'healing_crisis',
    description: 'A sickness is moving through the tribe — three people feverish already, the healer out of the herbs that would help, and the cause unknown',
    toneTag: 'dramatic',
    statAffinity: { constitution: 0.9, wisdom: 1.2 },
    criminalFlag: false,
    iconPrompt: 'paleolithic rpg icon, healer tending to feverish tribe members in cave shelter, worried expression, insufficient herbs visible, others watching anxiously',
    iconPath: 'generator/genres/paleolithic/icons/TENSIONS#healing_crisis.webp',
  },
  {
    id: 'someone_dangerous',
    description: 'Someone in the tribe has been acting strangely — disappearing for days, coming back with unexplained wounds, speaking of things seen in dreams that cannot be trusted',
    toneTag: 'dramatic',
    statAffinity: { wisdom: 1.2, charisma: 1.1 },
    criminalFlag: false,
    iconPrompt: 'paleolithic rpg icon, tribe member watching another figure return from the dark forest edge with strange demeanor, others observing warily from camp',
    iconPath: 'generator/genres/paleolithic/icons/TENSIONS#someone_dangerous.webp',
  },
];
