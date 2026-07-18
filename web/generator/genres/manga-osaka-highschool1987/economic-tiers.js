// genres/manga-osaka-highschool1987/economic-tiers.js
// Family economic standing in bubble-era 1987 Osaka.
// One tier (1-5) per character, derived from profession economicTier +
// life-event/family economicHint shifts. Each tier:
//   label       — display label
//   descriptors — status details woven into the character Entry
//   housing     — pool of housing situations for this tier
//   transport   — pool of transport options for this tier
//   iconPrompt  — text-to-image prompt for this tier's slot-machine reel icon
//   iconPath    — served path where that icon lives

export const ECONOMIC_TIERS = {
  1: {
    label: "Struggling",
    descriptors: [
      "hand-me-down uniform repaired more than once",
      "lunch is white rice and umeboshi, every day",
      "the rent is always nearly late",
      "arubaito every day after school — no choice",
      "too proud to accept charity, too tired to refuse help",
    ],
    housing: [
      "tiny 1K apartment with paper-thin walls",
      "cramped room in a rundown bunka jutaku building",
      "shared futon in a room that doubles as the living room",
    ],
    transport: [
      "ancient bicycle with a squeaky chain",
      "walks everywhere, rain or shine",
      "standing room on the last train, every time",
    ],
    iconPrompt:
      "manga osaka highschool 1987 rpg icon, student in worn uniform eating simple rice lunch alone, small cracked apartment window, tired expression, autumn light",
    iconPath:
      "generator/genres/manga-osaka-highschool1987/icons/ECONOMIC_TIERS#tier1-struggling.webp",
  },
  2: {
    label: "Working Class",
    descriptors: [
      "dad works factory shifts, mom works the register at a shotengai",
      "new uniform but barely — bought two sizes up to last longer",
      "konbini onigiri for lunch when there's money for it",
      "one arubaito shift keeps things manageable",
      "never hungry, never comfortable",
    ],
    housing: [
      "2DK apartment in a quiet residential block",
      "older danchi public housing with good neighbors",
      "small house shared with grandparents",
    ],
    transport: [
      "bicycle, route memorized for speed",
      "monthly commuter pass, always clipped to the bag",
      "trains and transfers, never a taxi",
    ],
    iconPrompt:
      "manga osaka highschool 1987 rpg icon, student in clean school uniform eating konbini onigiri on rooftop, cheerful despite everything, ordinary apartment block background, midday light",
    iconPath:
      "generator/genres/manga-osaka-highschool1987/icons/ECONOMIC_TIERS#tier2-working-class.webp",
  },
  3: {
    label: "Middle Class",
    descriptors: [
      "dad's a salaryman, home late, weekends golf",
      "mom drives a small car and shops at Daiei",
      "cram school is paid for, barely",
      "the TV is color, the fridge is full",
      "nothing extravagant, nothing missing",
    ],
    housing: [
      "3DK apartment in a new residential complex",
      "modest detached house in the suburbs with a small garden",
      "bright apartment near the train line",
    ],
    transport: [
      "own bicycle plus train pass",
      "parents occasionally give rides in the family car",
      "commuter train, has a reserved spot in the bike shed",
    ],
    iconPrompt:
      "manga osaka highschool 1987 rpg icon, student in neat uniform arriving at school gate by bicycle, confident relaxed expression, neat suburban neighborhood background, morning light",
    iconPath:
      "generator/genres/manga-osaka-highschool1987/icons/ECONOMIC_TIERS#tier3-middle-class.webp",
  },
  4: {
    label: "Well-Off",
    descriptors: [
      "father is a department head or runs a local business",
      "the family car is a Cedric or a Cressida",
      "private cram school, tutors, brand uniforms",
      "holidays in Kyoto, talk of Hawaii for the summer",
      "generous allowance, casually spent",
    ],
    housing: [
      "large detached house in a good neighborhood",
      "spacious apartment with Western-style rooms",
      "house in Nishi-ku or Sumiyoshi-ku with a real garden",
    ],
    transport: [
      "parent drives them to school in a proper car",
      "brand bicycle with a real lock",
      "taxi if the train is inconvenient",
    ],
    iconPrompt:
      "manga osaka highschool 1987 rpg icon, student in crisp uniform stepping out of a family car at school gate, confident expression, well-kept neighborhood, cherry trees, morning",
    iconPath:
      "generator/genres/manga-osaka-highschool1987/icons/ECONOMIC_TIERS#tier4-well-off.webp",
  },
  5: {
    label: "Bubble Rich",
    descriptors: [
      "father's in real estate or finance — the bubble has been very kind",
      "Porsche in the garage, art on the wall",
      "private school transfer to a brand-name high school",
      "designer goods before anyone else at school has them",
      "the allowance is embarrassing to mention",
    ],
    housing: [
      "large mansion in Ashiya or Nishinomiya",
      "penthouse apartment with a view of Osaka Bay",
      "private house in Kobe's hill district",
    ],
    transport: [
      "dropped off by a Mercedes or BMW",
      "own moped kept a block from school so it doesn't show",
      "private car service for weekend trips",
    ],
    iconPrompt:
      "manga osaka highschool 1987 rpg icon, student in expensive designer uniform arriving at school gate from a luxury car, other students watching, slightly uncomfortable with the attention, Osaka cityscape background",
    iconPath:
      "generator/genres/manga-osaka-highschool1987/icons/ECONOMIC_TIERS#tier5-bubble-rich.webp",
  },
};
