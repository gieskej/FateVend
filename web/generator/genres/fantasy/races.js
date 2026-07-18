// ── RACES ─────────────────────────────────────────────────────────────────
// Each entry:
//   id         — unique slug; used for slot-machine reel identity and icon lookup
//   broad      — race label used for name pool lookup and the NON_HUMANOID face-prompt
//                check in prompt-template.js
//   flavor     — physical/cultural detail passed to Claude for description prose.
//                If it contains ' — ' (space-em dash-space), only the text before
//                the first one is shown in the UI (engine.js's _slots.race, used
//                as the identity reel's sub-label, and the output header in
//                index.html) — the full string still reaches the AI prompt.
//                Keep the punchy part first.
//   weight     — relative rarity for weighted-random selection (statAndWeightPick);
//                races carry no statAffinity, so this is a flat rarity dial, not
//                stat-scaled like profession/build weights are
//   iconPrompt — text-to-image prompt used to generate this race's slot-machine reel icon
//   iconPath   — served path where that icon lives
// No stat affinities — race does not determine capability

export const RACES = [
  // Humans are the most common
  {
    id: "human_common",
    broad: "Human",
    flavor: "common folk — unremarkable features, built for endurance",
    weight: 30,
    iconPrompt:
      "Fantasy RPG icon. A sturdy human with weathered hands and a tired but warm face, wearing simple practical clothes bearing the quiet marks of years of honest, unremarkable labor.",
    iconPath: "generator/genres/fantasy/icons/RACE#human_common.webp",
  },
  {
    id: "human_noble",
    broad: "Human",
    flavor: "distant noble blood — probably means nothing",
    weight: 10,
    iconPrompt:
      "Fantasy RPG icon. A human with refined angular features hinting at distant noble blood, wearing well-cut but not extravagant clothing, carrying the quiet confidence of someone who knows their lineage even if no one else cares.",
    iconPath: "generator/genres/fantasy/icons/RACE#human_noble.webp",
  },
  {
    id: "human_frontier",
    broad: "Human",
    flavor: "frontier stock — weathered, practical, the kind who fixes things",
    weight: 10,
    iconPrompt:
      "Fantasy RPG icon. A weathered frontier human with squinting eyes from years of open sky, calloused hands, and practical patched clothing — the kind of person who can fix anything with whatever is nearest to hand.",
    iconPath: "generator/genres/fantasy/icons/RACE#human_frontier.webp",
  },

  // Elves
  {
    id: "elf_high",
    broad: "Elf",
    flavor:
      "high elf — angular features, silver or gold hair, moves like they know they're watched",
    weight: 6,
    iconPrompt:
      "Fantasy RPG icon. A high elf with sharp angular features, silver-gold hair, and long pointed ears, wearing shimmering robes, moving with the deliberate unhurried grace of someone who has always assumed an audience.",
    iconPath: "generator/genres/fantasy/icons/RACE#elf_high.webp",
  },
  {
    id: "elf_wood",
    broad: "Elf",
    flavor:
      "wood elf — lean, earth-toned, more comfortable in trees than taverns",
    weight: 6,
    iconPrompt:
      "Fantasy RPG icon. A lean wood elf with earth-toned skin and muted forest-green attire, pointed ears alert, far more at ease perched in a forest canopy than seated at any tavern table.",
    iconPath: "generator/genres/fantasy/icons/RACE#elf_wood.webp",
  },
  {
    id: "elf_dark",
    broad: "Elf",
    flavor:
      "dark elf — obsidian skin, white hair, the kind of entrance that silences a room",
    weight: 4,
    iconPrompt:
      "Fantasy RPG icon. A dark elf with obsidian skin and stark white hair, long pointed ears, dressed in dark fitted leathers, the kind of presence that silences a tavern before the door finishes opening.",
    iconPath: "generator/genres/fantasy/icons/RACE#elf_dark.webp",
  },
  {
    id: "half_elf",
    broad: "Half-Elf",
    flavor:
      "half-elf — caught between worlds, slightly pointed ears, perpetually underestimated",
    weight: 8,
    iconPrompt:
      "Fantasy RPG icon. A half-elf with slightly pointed ears and features caught between two heritages, an expression shaped by a lifetime of belonging fully to neither world and being underestimated by both.",
    iconPath: "generator/genres/fantasy/icons/RACE#half_elf.webp",
  },

  // Dwarves
  {
    id: "dwarf_hill",
    broad: "Dwarf",
    flavor:
      "hill dwarf — stocky, braided beard, smells faintly of forge smoke and ale",
    weight: 6,
    iconPrompt:
      "Fantasy RPG icon. A stocky hill dwarf with an elaborately braided beard, wearing sturdy work clothes that carry the faint evidence of a forge fire and a satisfying evening in a well-stocked tavern.",
    iconPath: "generator/genres/fantasy/icons/RACE#dwarf_hill.webp",
  },
  {
    id: "dwarf_mountain",
    broad: "Dwarf",
    flavor:
      "mountain dwarf — dense as granite, twice as stubborn, eyes that never miss a flaw",
    weight: 4,
    iconPrompt:
      "Fantasy RPG icon. A mountain dwarf built like solid granite, wearing stone-carved plate and a scrutinizing expression that finds the flaw in anything, a manner that has never once been in a hurry.",
    iconPath: "generator/genres/fantasy/icons/RACE#dwarf_mountain.webp",
  },

  // Halflings
  {
    id: "halfling",
    broad: "Halfling",
    flavor:
      "halfling — barely reaches most people's chests, mistaken for a child once a week",
    weight: 5,
    iconPrompt:
      "Fantasy RPG icon. A halfling standing barely chest-high to a human, with large expressive eyes and an easy grin, light on their feet and frequently mistaken for a child by people who will shortly regret it.",
    iconPath: "generator/genres/fantasy/icons/RACE#halfling.webp",
  },

  // Orcs / Half-Orcs
  {
    id: "half_orc",
    broad: "Half-Orc",
    flavor:
      "half-orc — grey-green skin, tusks they may or may not hide, stronger than they look",
    weight: 5,
    iconPrompt:
      "Fantasy RPG icon. A half-orc with grey-green skin and small visible tusks, a powerful frame in functional worn gear, carrying the weight of a reputation that walks into every room several steps ahead of them.",
    iconPath: "generator/genres/fantasy/icons/RACE#half_orc.webp",
  },
  {
    id: "orc",
    broad: "Orc",
    flavor:
      "full orc — imposing, scarred, carries a reputation into every room before they do",
    weight: 3,
    iconPrompt:
      "Fantasy RPG icon. A full orc with deep green skin and heavy battle scars, an imposing frame that fills a doorway, every scar a story, the kind of presence that quiets a room before they say a word.",
    iconPath: "generator/genres/fantasy/icons/RACE#orc.webp",
  },

  // Tiefling
  {
    id: "tiefling",
    broad: "Tiefling",
    flavor:
      "tiefling — small horns, unusual skin tone, tail they've learned to tuck away or flaunt",
    weight: 4,
    iconPrompt:
      "Fantasy RPG icon. A tiefling with small curved horns and a deep unusual skin tone, tail either tucked discreetly or displayed with deliberate flair, the choice between them saying everything about today's mood.",
    iconPath: "generator/genres/fantasy/icons/RACE#tiefling.webp",
  },

  // Dragonborn
  {
    id: "dragonborn",
    broad: "Dragonborn",
    flavor:
      "dragonborn — muscular man covered in scales with fiery eyes, fangs and a spiked tail. Proud, occasionally breathes something alarming when startled",
    weight: 3,
    iconPrompt:
      "Fantasy RPG icon. A muscular man covered in gold scales, fiery eyes and a proud stance.  Fangs visible in a subtle snarl.  Spiked tail curled behind them.  Wearing heavy plate armor.  Standing in a stone castle hallway.",
    iconPath: "generator/genres/fantasy/icons/RACE#dragonborn.webp",
  },

  // Gnome
  {
    id: "gnome",
    broad: "Gnome",
    flavor:
      "gnome — small, bright-eyed, the most dangerous person in the room to underestimate",
    weight: 3,
    iconPrompt:
      "Fantasy RPG icon. A gnome with bright curious eyes and a constantly animated expression, small enough to be overlooked and sharp enough to ensure that particular mistake is made only once.",
    iconPath: "generator/genres/fantasy/icons/RACE#gnome.webp",
  },

  // Aasimar
  {
    id: "aasimar",
    broad: "Aasimar",
    flavor:
      "aasimar — faint luminescence, striking eyes, the weight of divine attention they didn't ask for",
    weight: 3,
    iconPrompt:
      "Fantasy RPG icon. An aasimar with a faint luminescence along their skin and eyes like captured starlight, wearing the quiet weight of divine attention they never requested and cannot quite set down.",
    iconPath: "generator/genres/fantasy/icons/RACE#aasimar.webp",
  },
];
