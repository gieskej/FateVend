// generator/common/plot-archetypes.js
// Core plot archetypes shared across ALL genres — only archetypes that make
// sense in every single setting live here. Anything that assumes combat,
// wilderness, criminality, or a body count (The Siege, Monster Hunt, Frontier
// Expedition, Quest for Artifact, Murder Mystery, The Heist, The Escape) was
// relocated into the individual genre files that want it, because it does not
// fit manga-osaka-highschool1987 (a grounded 1987 high school drama with no
// monsters, no frontier, and no sieges). Add a new archetype here ONLY if it
// works in all seven genres; otherwise put it in the genre files that suit it.
// Genre files add their own entries on top of these. Each entry:
//   id, label            — identity + display label
//   weight               — relative rarity for weighted-random selection
//   description          — the plot's premise, interpolated into the
//                          "plotEssentials" AI prompt instructions as the
//                          primary story engine
//   iconPrompt, iconPath — slot-machine reel icon

export const COMMON_PLOT_ARCHETYPES = [
  {
    id: "heros_journey",
    label: "Hero's Journey",
    weight: 8,
    description:
      "An ordinary person is thrust into extraordinary circumstances and must rise to meet them. The call cannot be refused.",
    iconPrompt:
      "ordinary person standing at crossroads with magical portal glowing ahead, worn traveling pack, wide-eyed wonder, dawn light breaking over epic landscape",
    iconPath: "generator/common/icons/PLOT_ARCHETYPES#heros_journey.webp",
  },
  {
    id: "rescue_mission",
    label: "Rescue Mission",
    weight: 8,
    description:
      "Someone important has been taken, trapped, or gone missing. Every hour that passes makes it worse.",
    iconPrompt:
      "rescuer rappelling down sheer cliff on rope toward stranded person on narrow ledge below, urgent determined expression, dramatic rocky cliff face and open sky",
    iconPath: "generator/common/icons/PLOT_ARCHETYPES#rescue_mission.webp",
  },
  {
    id: "political_web",
    label: "The Political Web",
    weight: 6,
    description:
      "Power, allegiance, and betrayal. Navigating the machinations of factions, rulers, or rival organizations — one wrong move ends everything.",
    iconPrompt:
      "two opposing figures moving chess pieces at opposite ends of long ornate table, chess pieces shaped like people, grand throne room in background, dramatic split lighting",
    iconPath: "generator/common/icons/PLOT_ARCHETYPES#political_web.webp",
  },
  {
    id: "race_against_time",
    label: "Race Against Time",
    weight: 7,
    description:
      "The clock is running. Something terrible will happen unless stopped — and there's not enough time to do this right.",
    iconPrompt:
      "sprinting figure in motion blur with enormous clock face exploding into shards behind them, deadline atmosphere, dramatic speed lines",
    iconPath: "generator/common/icons/PLOT_ARCHETYPES#race_against_time.webp",
  },
  {
    id: "corruption_within",
    label: "Corruption From Within",
    weight: 6,
    description:
      "The rot is on the inside. Someone trusted is the enemy, or something pure has been poisoned — and finding it means accepting what that means.",
    iconPrompt:
      "smiling friendly face with cracks revealing sinister grin underneath, dramatic split lighting half good half evil, council chamber background",
    iconPath: "generator/common/icons/PLOT_ARCHETYPES#corruption_within.webp",
  },
];
