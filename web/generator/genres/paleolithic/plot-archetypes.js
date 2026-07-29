// genres/paleolithic/plot-archetypes.js
// Paleolithic-specific plot archetypes, added on top of COMMON_PLOT_ARCHETYPES.
// Same shape as common/plot-archetypes.js: id, label, weight, description,
// iconPrompt, iconPath.

export const PALEOLITHIC_PLOT_ARCHETYPES = [
  {
    id: "great_hunt",
    label: "The Great Hunt",
    weight: 6,
    description:
      "A legendary beast — mammoth, cave bear, or great auroch — that the tribe must bring down or die trying. One chance. Every hunter accounted for. The land doesn't forgive failure.",
    iconPrompt:
      "circle of painted stone age hunters with raised spears surrounding enormous woolly mammoth in snowy plain, dramatic tense standoff, misty cold landscape",
    iconPath:
      "generator/genres/paleolithic/icons/PLOT_ARCHETYPES#great_hunt.webp",
  },
  {
    id: "long_migration",
    label: "The Long Migration",
    weight: 5,
    description:
      "The tribe must reach winter ground through contested territory. The route is dangerous, the group is fractious, and not everyone will make it. Leadership isn't a title — it's a weight.",
    iconPrompt:
      "tribal group wrapped in furs walking in line through blizzard across frozen tundra, snow-covered mountains ahead, bundled packs and children carried, exhausted determined faces",
    iconPath:
      "generator/genres/paleolithic/icons/PLOT_ARCHETYPES#long_migration.webp",
  },
  {
    id: "tribal_war",
    label: "Tribal War",
    weight: 4,
    description:
      "Open conflict with a rival band over territory, water, or blood debt. The fighting is brutal and personal. Victory means survival. Losing means something worse.",
    iconPrompt:
      "two bands of face-painted stone age warriors facing each other across open rocky ground with raised weapons, moment before first strike, fierce expressions, primal landscape",
    iconPath:
      "generator/genres/paleolithic/icons/PLOT_ARCHETYPES#tribal_war.webp",
  },
  {
    id: "spirit_calling",
    label: "The Spirit Calling",
    weight: 4,
    description:
      "A vision, an omen, a demand from the unseen world. Follow it or refuse it. Either choice carries consequence. The spirits don't explain themselves, but they keep score.",
    iconPrompt:
      "shaman in animal-hide robes in deep trance before sacred fire, glowing spirit animal form rising from the flames, circle of standing stones at night, stars above",
    iconPath:
      "generator/genres/paleolithic/icons/PLOT_ARCHETYPES#spirit_calling.webp",
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
