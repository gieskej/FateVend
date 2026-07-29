// genres/historical-korea-joseon-dynasty/plot-archetypes.js
// Joseon Dynasty-specific plot archetypes, added on top of COMMON_PLOT_ARCHETYPES.
// Same shape as common/plot-archetypes.js: id, label, weight, description,
// iconPrompt, iconPath. Weights are kept in a tight 6-7 band deliberately —
// this is a game, not a lottery, so no plot here should feel like a rare
// jackpot pull relative to the others or to COMMON_PLOT_ARCHETYPES.

export const JOSEON_PLOT_ARCHETYPES = [
  {
    id: "gwageo_quest",
    label: "The Examination Path",
    weight: 7,
    description:
      "Everything rides on passing the civil service examinations — but the path involves corruption, sabotage, and a system that rewards the well-connected over the deserving",
    iconPrompt:
      "joseon dynasty korean scholar hunched over gwageo examination paper by candlelight, brush and inkstone at hand, determined strained expression, lantern casting warm light on rice paper",
    iconPath:
      "generator/genres/historical-korea-joseon-dynasty/icons/PLOT_ARCHETYPES#gwageo_quest.webp",
  },
  {
    id: "court_conspiracy",
    label: "Court Conspiracy",
    weight: 6,
    description:
      "The bungdang faction wars have drawn them in — one side wants them as an ally, the other wants them eliminated, and neutrality is not an option the court permits",
    iconPrompt:
      "two joseon court officials in silk robes whispering conspiratorially behind ornate carved wooden screen at night, candles casting long shadows, secretive urgent expressions",
    iconPath:
      "generator/genres/historical-korea-joseon-dynasty/icons/PLOT_ARCHETYPES#court_conspiracy.webp",
  },
  {
    id: "forbidden_hearts",
    label: "Forbidden Hearts",
    weight: 6,
    description:
      "Love that the social order has made illegal: across class lines, between rival clans, or in a form the Confucian code names as impossible",
    iconPrompt:
      "joseon dynasty man and woman reaching fingertips toward each other through narrow gap in bamboo screen separating inner and outer quarters, longing expressions, soft evening light",
    iconPath:
      "generator/genres/historical-korea-joseon-dynasty/icons/PLOT_ARCHETYPES#forbidden_hearts.webp",
  },
  {
    id: "debt_of_blood",
    label: "A Debt of Blood",
    weight: 6,
    description:
      "A killing — deliberate or accidental, justified or not — has created an obligation that cannot be discharged through ordinary means",
    iconPrompt:
      "joseon dynasty figure kneeling before ancestral memorial tablet with hands clasped, incense smoke rising, heavy weight of obligation, low candlelight on stone floor",
    iconPath:
      "generator/genres/historical-korea-joseon-dynasty/icons/PLOT_ARCHETYPES#debt_of_blood.webp",
  },
  {
    id: "fires_of_imjin",
    label: "Fires of the Imjin",
    weight: 6,
    description:
      "Set during the Japanese invasion of 1592–1598: survival, resistance, collaboration, and the question of what Joseon will be when the fighting ends",
    iconPrompt:
      "joseon defender in military armor at fortress wall with bow drawn, flames and siege smoke rising from valley below, desperate battle atmosphere, Imjin war setting",
    iconPath:
      "generator/genres/historical-korea-joseon-dynasty/icons/PLOT_ARCHETYPES#fires_of_imjin.webp",
  },
  {
    id: "exile_return",
    label: "Return from Exile",
    weight: 6,
    description:
      "After years in provincial exile, the political winds have shifted — but coming home means confronting everything left unresolved when they were forced to leave",
    iconPrompt:
      "joseon traveler in worn traveling clothes on mountain road looking back at capital city visible in valley below, mixed emotion of relief and dread, autumn landscape",
    iconPath:
      "generator/genres/historical-korea-joseon-dynasty/icons/PLOT_ARCHETYPES#exile_return.webp",
  },
  {
    id: "switched_at_birth",
    label: "Switched at Birth",
    weight: 6,
    description:
      "Two infants — one high-born, one low — were swapped through accident, malice, or a mother's desperate gamble, and the life being lived now was never meant for them",
    iconPrompt:
      "joseon dynasty korean two swaddled infants swapped in a candlelit room, midwife's nervous glance, dramatic secret irony, traditional court painting",
    iconPath:
      "generator/genres/historical-korea-joseon-dynasty/icons/PLOT_ARCHETYPES#switched_at_birth.webp",
  },
  {
    id: "false_standing",
    label: "False Standing",
    weight: 6,
    description:
      "They hold a status — yangban rank, official position, clan lineage — that is built on a lie, and someone has begun to investigate",
    iconPrompt:
      "joseon official in formal court robes clutching genealogy record scroll with visible nervous sweat, official seal visible, someone examining documents in background",
    iconPath:
      "generator/genres/historical-korea-joseon-dynasty/icons/PLOT_ARCHETYPES#false_standing.webp",
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
