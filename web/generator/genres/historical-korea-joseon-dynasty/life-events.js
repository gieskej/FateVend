// genres/historical-korea-joseon-dynasty/life-events.js
// Formative experiences of Joseon Dynasty Korea. Each event carries:
//   id, description, label (optional display override), statAffinity
//   (optional — stats that make this more likely), toneTag (gritty | dramatic | cozy | neutral |
//   triumph, etc.) for filtering, economicHint (optional tier shift
//   suggestion), iconPrompt/iconPath (slot-machine reel icon)
//   forcedIndustries — optional array of professions.js industries; when
//   set, engine.js's buildSkeleton() picks this character's profession from
//   ONLY this list, ignoring the race's own `allowedIndustries` entirely (the
//   life event overrides caste as the deciding factor). For life events
//   significant enough to lock in a specific career track regardless of what
//   the character would otherwise have done — e.g. palace_selection: a child
//   taken for palace service doesn't grow up to be whatever their caste
//   would normally allow, they grow up palace staff.
//   excludedBroad — optional array of race `broad` values (see races.js);
//   engine.js's buildSkeleton() drops this event from the pool for a
//   character of one of these castes (falling back to the full pool if that
//   would leave nothing). Omitted on events with no caste assumption baked
//   in. Used for: events that assume legal access to the elite gwageo civil
//   examination track (passed_gwageo/failed_gwageo — Jungin were "forever
//   locked out of real power by birth" per their own flavor, and Military
//   Yangban pursued the separate martial exam, not this one); adopted_up
//   (being adopted *into* a noble household only makes sense for castes that
//   have one); palace_selection (being *selected* for palace service doesn't
//   apply to castes who'd already have palace access by birth).

export const LIFE_EVENTS = [
  {
    id: "passed_gwageo",
    label: "Passed the Gwageo Civil Examination",
    description:
      "Achieved what generations of their family sacrificed for: a place in the official class through the civil service examinations",
    toneTag: "triumph",
    excludedBroad: [
      "Military Yangban",
      "Jungin",
      "Common Folk",
      "Merchant",
      "Gisaeng",
      "Cheonmin",
    ],
    iconPrompt:
      "joseon dynasty korean gwageo civil exam success royal posting announcement celebration scholar silk hanbok traditional court painting",
    iconPath:
      "generator/genres/historical-korea-joseon-dynasty/icons/LIFE_EVENTS#passed_gwageo.webp",
  },
  {
    id: "failed_gwageo",
    label: "Failed the Gwageo Repeatedly",
    description:
      "Has taken the examination three or more times and failed — not for lack of learning but for faction, luck, or something darker",
    toneTag: "bitter",
    excludedBroad: [
      "Military Yangban",
      "Jungin",
      "Common Folk",
      "Merchant",
      "Gisaeng",
      "Cheonmin",
    ],
    iconPrompt:
      "joseon dynasty korean gwageo exam failure walking away dismissed scholar plain hanbok shame disappointment traditional painting",
    iconPath:
      "generator/genres/historical-korea-joseon-dynasty/icons/LIFE_EVENTS#failed_gwageo.webp",
  },
  {
    id: "survived_imjin",
    label: "Survived the Imjin War",
    description:
      "Lived through the Japanese invasion of 1592–1598 — either as a soldier, a refugee, or someone who made difficult choices",
    toneTag: "gritty",
    iconPrompt:
      "joseon dynasty korean imjin war survivor soldier refugee battle village burning armored warrior exhausted relief traditional painting",
    iconPath:
      "generator/genres/historical-korea-joseon-dynasty/icons/LIFE_EVENTS#survived_imjin.webp",
  },
  {
    id: "famine_survivor",
    label: "Survived a Great Famine",
    description:
      "Endured a provincial famine — knows what people do and become when the rice harvest fails two years in a row",
    toneTag: "gritty",
    iconPrompt:
      "joseon dynasty korean famine survivor gaunt hollow-eyed villager barren field winter desperation relief traditional folk painting",
    iconPath:
      "generator/genres/historical-korea-joseon-dynasty/icons/LIFE_EVENTS#famine_survivor.webp",
  },
  {
    id: "clan_exile",
    label: "Exiled by Clan Faction",
    description:
      "Sent to a remote province after their family lost a court power struggle — built a new life in the margins",
    toneTag: "bitter",
    iconPrompt:
      "joseon dynasty korean political exile departing capital horse provincial road alone disgrace carrying luggage traditional court painting",
    iconPath:
      "generator/genres/historical-korea-joseon-dynasty/icons/LIFE_EVENTS#clan_exile.webp",
  },
  {
    id: "witnessed_execution",
    label: "Witnessed a Public Execution",
    description:
      "Was present at the execution of someone they knew — for treason, for heresy, or for nothing at all that made sense",
    toneTag: "dark",
    iconPrompt:
      "joseon dynasty korean public execution crowd witness square solemn horrified silent crowd official punishment traditional painting",
    iconPath:
      "generator/genres/historical-korea-joseon-dynasty/icons/LIFE_EVENTS#witnessed_execution.webp",
  },
  {
    id: "political_accusation",
    label: "Survived a Political Accusation",
    description:
      "Was formally accused of a court crime — treason, sedition, or factional treachery — and survived through luck, patronage, or compromise",
    toneTag: "gritty",
    iconPrompt:
      "joseon dynasty korean political accusation court hearing official records kneeling accused tense confrontation traditional court painting",
    iconPath:
      "generator/genres/historical-korea-joseon-dynasty/icons/LIFE_EVENTS#political_accusation.webp",
  },
  {
    id: "bandit_encounter",
    label: "Survived a Bandit Attack",
    description:
      "Was ambushed on a provincial road and escaped — changed everything they thought about safety and strangers",
    toneTag: "dramatic",
    iconPrompt:
      "joseon dynasty korean bandit ambush mountain road escape chase survivor aftermath tense dramatic traditional painting",
    iconPath:
      "generator/genres/historical-korea-joseon-dynasty/icons/LIFE_EVENTS#bandit_encounter.webp",
  },
  {
    id: "diplomatic_mission",
    label: "Served on a Diplomatic Mission to China",
    description:
      "Traveled to the Ming or Qing court as part of a tributary delegation — saw the world beyond Korea's borders",
    toneTag: "broadening",
    iconPrompt:
      "joseon dynasty korean diplomatic mission beijing chinese court tributary embassy delegation formal impressive awe traditional painting",
    iconPath:
      "generator/genres/historical-korea-joseon-dynasty/icons/LIFE_EVENTS#diplomatic_mission.webp",
  },
  {
    id: "forbidden_knowledge",
    label: "Encountered Forbidden Knowledge",
    description:
      "Read something — a Catholic text, a secret history, a technical document from Japan — that the state would prefer had never been read",
    toneTag: "dangerous",
    iconPrompt:
      "joseon dynasty korean forbidden book hidden reading secret text night candlelight nervous scholar forbidden knowledge traditional painting",
    iconPath:
      "generator/genres/historical-korea-joseon-dynasty/icons/LIFE_EVENTS#forbidden_knowledge.webp",
  },
  {
    id: "arranged_marriage",
    label: "Entered an Arranged Marriage",
    description:
      "Was married for clan alliance or economic necessity — the match was either unexpectedly fine or quietly catastrophic",
    toneTag: "neutral",
    iconPrompt:
      "joseon dynasty korean arranged marriage ceremony hanbok couple formal wedding ritual family compound traditional painting",
    iconPath:
      "generator/genres/historical-korea-joseon-dynasty/icons/LIFE_EVENTS#arranged_marriage.webp",
  },
  {
    id: "widowed",
    label: "Widowed",
    description:
      "Lost a spouse — to illness, execution, war, or a truth that could not be survived — and navigated the social restrictions that followed",
    toneTag: "sorrowful",
    iconPrompt:
      "joseon dynasty korean widowed figure mourning white mourning clothes grief solitary traditional court painting",
    iconPath:
      "generator/genres/historical-korea-joseon-dynasty/icons/LIFE_EVENTS#widowed.webp",
  },
  {
    id: "adopted_up",
    label: "Adopted into a Noble Household",
    description:
      "Was born into a common or low family but formally adopted as a child into their current household — a change of fortune that everyone around them never quite lets them forget",
    toneTag: "identity",
    excludedBroad: ["Jungin", "Common Folk", "Merchant", "Gisaeng", "Cheonmin"],
    iconPrompt:
      "joseon dynasty korean adopted child noble household formal ceremony new family uncertain gratitude belonging traditional court painting",
    iconPath:
      "generator/genres/historical-korea-joseon-dynasty/icons/LIFE_EVENTS#adopted_up.webp",
  },
  {
    id: "palace_selection",
    label: "Selected as a Child for Palace Service",
    description:
      "Was chosen young by palace officials and raised apart from their birth family for a life of court service — an honor and a loss in the same breath",
    toneTag: "bitter",
    forcedIndustries: ["Palace Service"],
    economicHint: -1,
    excludedBroad: [
      "Civil Yangban",
      "Military Yangban",
      "Royal Court",
      "Merchant",
    ],
    iconPrompt:
      "joseon dynasty korean child selected palace service officials examining candidates courtyard uncertain family watching traditional painting",
    iconPath:
      "generator/genres/historical-korea-joseon-dynasty/icons/LIFE_EVENTS#palace_selection.webp",
  },
  {
    id: "escaped_servitude",
    label: "Escaped from Nobi Servitude",
    description:
      "Left behind a life of legal bondage — still carries the papers, the habits, and the specific kind of alertness that service requires",
    toneTag: "gritty",
    iconPrompt:
      "joseon dynasty korean escaped nobi slave freedom running hiding new identity fearful hopeful traditional folk painting",
    iconPath:
      "generator/genres/historical-korea-joseon-dynasty/icons/LIFE_EVENTS#escaped_servitude.webp",
  },
];
