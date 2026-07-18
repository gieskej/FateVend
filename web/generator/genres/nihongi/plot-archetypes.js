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
];
