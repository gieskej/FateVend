// genres/fantasy/plot-archetypes.js
// Fantasy-specific plot archetypes, added on top of COMMON_PLOT_ARCHETYPES.
// Same shape as common/plot-archetypes.js: id, label, weight, description,
// iconPrompt, iconPath.

export const FANTASY_PLOT_ARCHETYPES = [
  {
    id: "prophecy",
    label: "Prophecy Fulfillment",
    weight: 5,
    description:
      "Ancient words name the character — or doom them. The question isn't whether the prophecy is real. It's what it actually means, and what must be sacrificed to fulfill it.",
    iconPrompt:
      "ancient parchment scroll glowing with golden runes and magical symbols, robed wizard reading it in candlelit stone tower, awestruck expression, magical smoke rising",
    iconPath: "generator/genres/fantasy/icons/PLOT_ARCHETYPES#prophecy.webp",
  },
  {
    id: "dungeon_delve",
    label: "Dungeon Delve",
    weight: 6,
    description:
      "Beneath the earth, behind the sealed door, past the wards — something valuable or terrible waits. Delve in. Don't die. Get back out.",
    iconPrompt:
      "party of adventurers descending torch-lit stone staircase into dark dungeon below, sword and shield raised by the lead figure, ancient carved runes on stone walls",
    iconPath:
      "generator/genres/fantasy/icons/PLOT_ARCHETYPES#dungeon_delve.webp",
  },
  {
    id: "kingdom_at_war",
    label: "Kingdom at War",
    weight: 5,
    description:
      "Armies, borders, and the human cost of who sits on the throne. Survival means choosing a side — or finding a way to change the outcome before the killing is done.",
    iconPrompt:
      "two opposing medieval armies clashing on hilltop battlefield, opposing banners flying, castle silhouette visible through stormy dramatic sky, morning light",
    iconPath:
      "generator/genres/fantasy/icons/PLOT_ARCHETYPES#kingdom_at_war.webp",
  },
  {
    id: "apprentice_rise",
    label: "The Apprentice's Rise",
    weight: 4,
    description:
      "Someone with power has taken the character under their wing — or into their shadow. Learning, earning trust, and discovering what that power really costs.",
    iconPrompt:
      "young apprentice receiving glowing magical staff from wise elder mentor, golden light transferring between their hands, dramatic magical aura, stone chamber",
    iconPath:
      "generator/genres/fantasy/icons/PLOT_ARCHETYPES#apprentice_rise.webp",
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
