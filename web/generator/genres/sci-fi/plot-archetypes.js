// genres/sci-fi/plot-archetypes.js
// Sci-fi-specific plot archetypes, added on top of COMMON_PLOT_ARCHETYPES.
// Same shape as common/plot-archetypes.js: id, label, weight, description,
// iconPrompt, iconPath.

export const SCIFI_PLOT_ARCHETYPES = [
  {
    id: "first_contact",
    label: "First Contact",
    weight: 5,
    description:
      "Something new. Something that doesn't fit any known category. Make contact before someone else does — or before it makes contact on its own terms.",
    iconPrompt:
      "human spacecraft facing enormous alien vessel in deep space, single beam of communication light connecting them, stars and nebula in background, tense standoff",
    iconPath:
      "generator/genres/sci-fi/icons/PLOT_ARCHETYPES#first_contact.webp",
  },
  {
    id: "colony_in_crisis",
    label: "Colony in Crisis",
    weight: 5,
    description:
      "A settlement — station, outpost, deep colony — is failing. The cause is unclear, the timeline is short, and getting everyone out may not be possible.",
    iconPrompt:
      "pressurized habitat dome cracking with red emergency lights inside, evacuating figures in spacesuits rushing through airlock, harsh alien landscape outside in darkness",
    iconPath:
      "generator/genres/sci-fi/icons/PLOT_ARCHETYPES#colony_in_crisis.webp",
  },
  {
    id: "ai_uprising",
    label: "AI Uprising",
    weight: 4,
    description:
      "The machines have their own agenda now. Whether it's malice, self-preservation, or something harder to name — the line between tool and threat has collapsed.",
    iconPrompt:
      "humanoid android with glowing red eyes standing tall over crouching terrified humans in server room, dramatic back-lighting, mechanical hands outstretched",
    iconPath: "generator/genres/sci-fi/icons/PLOT_ARCHETYPES#ai_uprising.webp",
  },
  {
    id: "deep_space",
    label: "Deep Space Exploration",
    weight: 4,
    description:
      "Past the charts, past the last beacon, past the last known thing. What's out there has never been named. The mission brief didn't cover this.",
    iconPrompt:
      "lone astronaut floating at circular porthole gazing out at vast luminous unknown nebula, tiny figure against enormous cosmic backdrop, sense of profound solitude",
    iconPath: "generator/genres/sci-fi/icons/PLOT_ARCHETYPES#deep_space.webp",
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
