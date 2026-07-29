// genres/modern/plot-archetypes.js
// Modern-specific plot archetypes, added on top of COMMON_PLOT_ARCHETYPES.
// Same shape as common/plot-archetypes.js: id, label, weight, description,
// iconPrompt, iconPath.

export const MODERN_PLOT_ARCHETYPES = [
  {
    id: "undercover",
    label: "Going Undercover",
    weight: 5,
    description:
      "Assume a false identity, infiltrate a target, and extract information or evidence — without getting burned before the job is done.",
    iconPrompt:
      "spy in convincing disguise with dark glasses and false moustache at crowded cocktail party, hidden dossier tucked in jacket, suspicious glances from surrounding guests",
    iconPath: "generator/genres/modern/icons/PLOT_ARCHETYPES#undercover.webp",
  },
  {
    id: "whistleblower",
    label: "The Whistleblower",
    weight: 4,
    description:
      "The truth could bring down something powerful. The question is whether the cost of telling it is one the character is willing to pay.",
    iconPrompt:
      "nervous figure standing at press podium under bright camera flashes holding stamped CLASSIFIED document, government building facade in background, microphones crowding in",
    iconPath:
      "generator/genres/modern/icons/PLOT_ARCHETYPES#whistleblower.webp",
  },
  {
    id: "survival_horror",
    label: "Survival Horror",
    weight: 4,
    description:
      "Something is hunting. Somewhere is deeply wrong. Survive long enough to figure out what's happening — and get out, in whatever order is still possible.",
    iconPrompt:
      "terrified person backing away with failing flashlight in dark corridor, enormous monstrous shadow looming on the wall behind them, distant flickering light",
    iconPath:
      "generator/genres/modern/icons/PLOT_ARCHETYPES#survival_horror.webp",
  },
  {
    id: "road_trip",
    label: "The Road Trip",
    weight: 3,
    description:
      "Miles of road, a destination that keeps shifting, and company that wasn't entirely chosen. Something is waiting at the end of it — and the journey is the test.",
    iconPrompt:
      "classic American car on empty desert highway at sunset, three passengers visible through windows, open road stretching to dramatic horizon, golden hour light",
    iconPath: "generator/genres/modern/icons/PLOT_ARCHETYPES#road_trip.webp",
  },

  // ── Cross-genre archetypes ────────────────────────────────────────────
  // Relocated out of common/plot-archetypes.js: these fit most settings but
  // not manga-osaka-highschool1987, so each genre that wants them owns its
  // own copy (and can tailor the description/icon to its setting).
  {
    id: "quest_for_artifact",
    label: "Quest for Artifact",
    weight: 7,
    description:
      "A powerful, dangerous, or priceless object must be found, secured, or destroyed before someone worse gets to it first.",
    iconPrompt:
      "glowing magical artifact on ancient stone pedestal, adventurer reaching toward it with both hands outstretched, ancient cavern chamber, dramatic golden spotlight from above",
    iconPath: "generator/common/icons/PLOT_ARCHETYPES#quest_for_artifact.webp",
  },
  {
    id: "monster_hunt",
    label: "Monster Bounty / Hunt",
    weight: 7,
    description:
      "Something deadly is out there. Track it, trap it, kill it — and try not to become the thing you're hunting.",
    iconPrompt:
      "hunter crouching in dark forest over enormous claw-marks in muddy earth, torch raised high, massive shadowy silhouette of creature visible between trees behind them",
    iconPath: "generator/common/icons/PLOT_ARCHETYPES#monster_hunt.webp",
  },
  {
    id: "murder_mystery",
    label: "Murder Mystery",
    weight: 7,
    description:
      "Someone is dead who shouldn't be. The truth is buried under lies, and the killer may be closer than anyone suspects.",
    iconPrompt:
      "detective holding large magnifying glass over cryptic handwritten note, silhouette of shadowy figure reflected in the lens, candlelit study room with scattered clues",
    iconPath: "generator/common/icons/PLOT_ARCHETYPES#murder_mystery.webp",
  },
  {
    id: "the_heist",
    label: "The Heist",
    weight: 7,
    description:
      "A high-stakes theft requiring planning, the right crew, and the nerve to pull it off when everything goes sideways.",
    iconPrompt:
      "thief in sleek black outfit lowering on rope through glass skylight toward glowing vault below, city lights visible through glass, dramatic downward perspective",
    iconPath: "generator/common/icons/PLOT_ARCHETYPES#the_heist.webp",
  },
  {
    id: "frontier_expedition",
    label: "Frontier Expedition",
    weight: 6,
    description:
      "Into unmapped territory. The danger is the unknown itself — what waits at the edge of the map, and whether you can survive long enough to find out.",
    iconPrompt:
      "lone explorer at rocky cliff edge looking out over vast unmapped wilderness with torn map in hand, exotic alien landscape stretching to horizon",
    iconPath: "generator/common/icons/PLOT_ARCHETYPES#frontier_expedition.webp",
  },
  {
    id: "the_siege",
    label: "The Siege",
    weight: 5,
    description:
      "Hold the line. Surrounded, outnumbered, and running low — the only options are survive or find a way out.",
    iconPrompt:
      "defenders on castle battlements looking down at wave of enemy torches approaching through night, archers with bows ready, arrows in flight, dramatic back-lit scene",
    iconPath: "generator/common/icons/PLOT_ARCHETYPES#the_siege.webp",
  },
  {
    id: "the_escape",
    label: "The Escape",
    weight: 7,
    description:
      "Someone — or everyone — needs to get out. Prison, compound, city, or a situation with no clean exit. The walls are closing in.",
    iconPrompt:
      "figure leaping across rooftop gap between burning building and safety, arms spread wide, city skyline below, bright fire light behind them",
    iconPath: "generator/common/icons/PLOT_ARCHETYPES#the_escape.webp",
  },
];
