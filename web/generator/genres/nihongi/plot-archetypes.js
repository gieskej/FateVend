// genres/nihongi/plot-archetypes.js
// Plot archetypes for the Nihongi supernatural horror world, added on top of
// COMMON_PLOT_ARCHETYPES. Same shape as common/plot-archetypes.js: id, label,
// weight, description, iconPrompt, iconPath.

export const NIHONGI_PLOT_ARCHETYPES = [
  {
    id: "kamis_bargain",
    label: "The Kami's Bargain",
    weight: 7,
    description:
      "A kami offered power, protection, or knowledge at a price that seemed acceptable at the time — the terms are now coming due in ways that were never explained; the character must honour a deal they do not fully understand with an entity that does not negotiate",
    toneTag: "supernatural",
    iconPrompt:
      "ancient japanese figure kneeling before glowing kami spirit manifestation in misty forest shrine, divine bargain moment, kami towering luminous terrifying above mortal, sacred cedar trees, nihon shoki yamato-e painting",
    iconPath:
      "generator/genres/nihongi/icons/PLOT_ARCHETYPES#kamis_bargain.webp",
  },
  {
    id: "hungry_dead",
    label: "The Hungry Dead",
    weight: 7,
    description:
      "A wronged ancestor or murder victim refuses to remain in Yomi — their shade is returning, haunting and corrupting the living, demanding something the character must provide or deny; ignoring them has already proven costly",
    toneTag: "horror",
    iconPrompt:
      "ancient japanese vengeful ghost shade returning from yomi land of dead haunting figure corrupt spreading shadow, pale rotting dead ancestor confronting living descendant candlelight shrine, nihon shoki yamato-e painting",
    iconPath: "generator/genres/nihongi/icons/PLOT_ARCHETYPES#hungry_dead.webp",
  },
  {
    id: "yokai_hunt",
    label: "The Yokai Hunt",
    weight: 6,
    description:
      "Something supernatural — an oni, kappa, tengu, or creature without a name yet — is preying on the community; the character must identify it, understand what it wants, and then decide whether to destroy it, bargain with it, or drive it elsewhere",
    toneTag: "horror",
    iconPrompt:
      "ancient japanese village night scene monstrous yokai shadowy oni figure lurking at edge of firelight, hunter in asuka court robes approaching with sacred rope and salt, terror in darkness, nihon shoki yamato-e painting",
    iconPath: "generator/genres/nihongi/icons/PLOT_ARCHETYPES#yokai_hunt.webp",
  },
  {
    id: "gate_to_yomi",
    label: "The Gate to Yomi",
    weight: 5,
    description:
      "The border between the living world and Yomi — the land of the dead — has been breached somewhere in the character's province; the dead are returning through it, and whatever tore the gate open may still be nearby",
    toneTag: "horror",
    iconPrompt:
      "ancient japanese cave entrance gaping into darkness yomi underworld gate torn open dead figures emerging pale rotting, shrine priest with sacred mirror trying to seal it, hellish light from below, nihon shoki yamato-e painting",
    iconPath:
      "generator/genres/nihongi/icons/PLOT_ARCHETYPES#gate_to_yomi.webp",
  },
  {
    id: "divine_possession",
    label: "The Vessel",
    weight: 6,
    description:
      "A kami has claimed someone — the character or someone essential to them — as a living vessel; the possession grants real power and terrible cost, and no one can agree whether the kami is benevolent, wrathful, or simply indifferent to the host's survival",
    toneTag: "supernatural",
    iconPrompt:
      "ancient japanese figure with eyes rolled back glowing divine energy streaming through body kami possession vessel miko shrine maiden, sacred light breaking through mortal form, terror and awe in watching priests, nihon shoki yamato-e painting",
    iconPath:
      "generator/genres/nihongi/icons/PLOT_ARCHETYPES#divine_possession.webp",
  },
  {
    id: "shape_changer",
    label: "The Shape-Changer",
    weight: 6,
    description:
      "A kitsune or tanuki has infiltrated the character's community — wearing someone's face, serving a purpose no one understands; the character must unmask it before it completes whatever it came to do, without destroying an innocent person in the process",
    toneTag: "supernatural",
    iconPrompt:
      "ancient japanese kitsune fox spirit woman beautiful but wrong eyes slightly reflective, court robes, other courtiers around her unaware of her fox tail barely hidden, suspicious samurai figure watching, nihon shoki yamato-e painting",
    iconPath:
      "generator/genres/nihongi/icons/PLOT_ARCHETYPES#shape_changer.webp",
  },
  {
    id: "cursed_lineage",
    label: "The Cursed Lineage",
    weight: 5,
    description:
      "The family carries a supernatural curse sealed into the bloodline by a deal made generations ago — something is waking it up; the character must find what activated it, what it demands, and whether they can end it or only redirect it",
    toneTag: "horror",
    iconPrompt:
      "ancient japanese cursed family shrine ancestor altar with rotting offerings darkness spreading from clan symbols, cursed figure with strange marks appearing on skin, family records showing pattern of deaths, nihon shoki yamato-e painting",
    iconPath:
      "generator/genres/nihongi/icons/PLOT_ARCHETYPES#cursed_lineage.webp",
  },
  {
    id: "oracle_warning",
    label: "The Oracle's Warning",
    weight: 5,
    description:
      "A kami has spoken through a shrine medium with terrible clarity — the prophecy is unambiguous, the timeline is uncertain, and whoever it concerns is powerful enough to make the messenger dangerous to know; avoiding it has already proven impossible",
    toneTag: "dramatic",
    iconPrompt:
      "ancient japanese miko shrine maiden in white and red robes with eyes rolled back in divine trance, glowing kami spirit manifestation rising above sacred fire, ancient shrine setting at night, nihon shoki yamato-e painting",
    iconPath:
      "generator/genres/nihongi/icons/PLOT_ARCHETYPES#oracle_warning.webp",
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
