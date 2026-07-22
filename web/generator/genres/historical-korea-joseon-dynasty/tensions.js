// genres/historical-korea-joseon-dynasty/tensions.js
// Active pressures and ongoing conflicts for Joseon Dynasty characters — feeds
// the scenario Opening and Description heavily. Each tension carries:
//   id, label (optional display override), description, toneTag,
//   iconPrompt/iconPath (slot-machine reel icon)
//   excludedBroad — optional array of race `broad` values (see races.js);
//   engine.js's buildSkeleton() drops this tension from the pool for a
//   character of one of these castes (falling back to the full pool if that
//   would leave nothing). Omitted everywhere except tensions tied to the
//   court bungdang faction system or the gwageo exam track, neither of which
//   the common/merchant/entertainer/bonded castes had any real stake in.
//   requiredProfessions — optional array of professions.js `title` values;
//   engine.js's buildSkeleton() picks this tension ONLY if the character's
//   own profession title is in this list (falling back to the full pool if
//   that would leave nothing) — the inverse of excludedBroad: an opt-IN
//   rather than an opt-out, for tensions specific to one exact profession
//   rather than a whole caste. Used for the succession-politics tensions,
//   which only make sense for a character who is themselves literally in
//   the line of succession ("Prince (Blood Royal)") — Joseon succession was
//   strictly patrilineal, so this deliberately does not include "Princess
//   (Blood Royal)" even though both share the "Royal Bloodline" industry.

export const TENSIONS = [
  {
    id: "faction_enemy",
    label: "A Rival Faction Has Targeted Them",
    description:
      "Enemies in the court bungdang system are actively working to discredit or destroy them through slander, false accusation, or manipulation of the examination system",
    toneTag: "political",
    excludedBroad: ["Common Folk", "Merchant", "Gisaeng", "Cheonmin"],
    iconPrompt:
      "joseon dynasty korean court faction intrigue rival officials whispers plotting scheming palace corridor traditional court painting",
    iconPath:
      "generator/genres/historical-korea-joseon-dynasty/icons/TENSIONS#faction_enemy.webp",
  },
  {
    id: "succession_rivalry",
    label: "Vying to Be Named Heir Apparent",
    description:
      "Locked in open competition with brothers and half-brothers for the one title that matters — Crown Prince — where faction backing and a mother's rank count for as much as birth order",
    toneTag: "dramatic",
    requiredProfessions: ["Prince (Blood Royal)"],
    iconPrompt:
      "joseon dynasty korean princes rivals competing for crown prince title tense formal court audience wary glances traditional court painting",
    iconPath:
      "generator/genres/historical-korea-joseon-dynasty/icons/TENSIONS#succession_rivalry.webp",
  },
  {
    id: "succession_crisis",
    label: "The Succession Is Dangerously Unclear",
    description:
      "No heir has been formally named — through death, disgrace, or the king's own hesitation — and the court is fracturing into camps behind every plausible claimant, including them",
    toneTag: "high_stakes",
    requiredProfessions: ["Prince (Blood Royal)"],
    iconPrompt:
      "joseon dynasty korean empty throne succession crisis officials arguing factions divided palace hall tense traditional court painting",
    iconPath:
      "generator/genres/historical-korea-joseon-dynasty/icons/TENSIONS#succession_crisis.webp",
  },
  {
    id: "living_under_heir",
    label: "Living Under an Elder Sibling's Shadow",
    description:
      "Was passed over for the succession and must now publicly defer to the brother who won it — smiling at court, and privately unsure whether that brother sees them as family or as a threat still to be managed",
    toneTag: "bitter",
    requiredProfessions: ["Prince (Blood Royal)"],
    iconPrompt:
      "joseon dynasty korean younger prince bowing deferring to elder brother crown prince tense formal court traditional court painting",
    iconPath:
      "generator/genres/historical-korea-joseon-dynasty/icons/TENSIONS#living_under_heir.webp",
  },
  {
    id: "prince_exile",
    label: "Stripped of Succession Rights and Exiled",
    description:
      "Was formally removed from the line of succession and sent to live far from the capital — alive, watched, and permanently barred from ever returning to real power",
    toneTag: "bitter",
    requiredProfessions: ["Prince (Blood Royal)"],
    iconPrompt:
      "joseon dynasty korean exiled prince remote provincial residence watched guards distant capital view melancholy traditional court painting",
    iconPath:
      "generator/genres/historical-korea-joseon-dynasty/icons/TENSIONS#prince_exile.webp",
  },
  {
    id: "prince_hiding",
    label: "Living in Hiding, Erased from the Royal Line",
    description:
      "Their birth was never officially recorded, or the record was destroyed — they live under a lesser identity because acknowledging their blood would mark them for elimination",
    toneTag: "dangerous",
    requiredProfessions: ["Prince (Blood Royal)"],
    iconPrompt:
      "joseon dynasty korean hidden prince disguised commoner clothing anxious glance hidden identity shadow traditional folk painting",
    iconPath:
      "generator/genres/historical-korea-joseon-dynasty/icons/TENSIONS#prince_hiding.webp",
  },
  {
    id: "prince_target",
    label: "Marked for Death by a Rival Claimant",
    description:
      "A sibling or a faction backing a rival claimant has decided the succession would be safer with them dead — poison, an arranged accident, or an assassin are all live possibilities",
    toneTag: "dark",
    criminalFlag: true,
    requiredProfessions: ["Prince (Blood Royal)"],
    iconPrompt:
      "joseon dynasty korean prince alert wary night shadow assassin threat palace corridor tense dangerous traditional court painting",
    iconPath:
      "generator/genres/historical-korea-joseon-dynasty/icons/TENSIONS#prince_target.webp",
  },
  {
    id: "debt_of_favor",
    label: "Owe an Unpayable Debt of Obligation",
    description:
      "A powerful person saved or elevated them — and now expects repayment in a form that conflicts with their principles",
    toneTag: "dramatic",
    iconPrompt:
      "joseon dynasty korean obligation debt powerful patron pressure bowing tense meeting request refusal traditional court painting",
    iconPath:
      "generator/genres/historical-korea-joseon-dynasty/icons/TENSIONS#debt_of_favor.webp",
  },
  {
    id: "clan_disgrace",
    label: "Family Name Under a Shadow",
    description:
      "A relative's disgrace — treason, corruption, or conversion — casts legal and social suspicion over the whole clan",
    toneTag: "gritty",
    iconPrompt:
      "joseon dynasty korean family disgrace shame clan house gate closed ostracism avoidance shadow traditional painting",
    iconPath:
      "generator/genres/historical-korea-joseon-dynasty/icons/TENSIONS#clan_disgrace.webp",
  },
  {
    id: "forbidden_love",
    label: "A Forbidden Attachment",
    description:
      "In love with someone the social order forbids: across class lines, into a rival clan, or within a relationship that Confucian law names as impossible",
    toneTag: "romantic",
    iconPrompt:
      "joseon dynasty korean forbidden love secret meeting hanbok couple moonlight garden wall hidden longing traditional painting",
    iconPath:
      "generator/genres/historical-korea-joseon-dynasty/icons/TENSIONS#forbidden_love.webp",
  },
  {
    id: "imperial_commission",
    label: "Under Pressure from a Royal Commission",
    description:
      "Has received an official command from the throne or a senior official — the task is dangerous, the margin for failure is zero",
    toneTag: "high_stakes",
    iconPrompt:
      "joseon dynasty korean royal command commission official document seal pressure obligation court messenger traditional court painting",
    iconPath:
      "generator/genres/historical-korea-joseon-dynasty/icons/TENSIONS#imperial_commission.webp",
  },
  {
    id: "gwageo_pressure",
    label: "Family Obsession with the Examinations",
    description:
      "The entire household's status, finances, and hopes rest on them passing the gwageo — and they are not sure they want to",
    toneTag: "dramatic",
    excludedBroad: [
      "Military Yangban",
      "Jungin",
      "Common Folk",
      "Merchant",
      "Gisaeng",
      "Cheonmin",
    ],
    iconPrompt:
      "joseon dynasty korean gwageo exam family pressure studying night candle anxious scholar family watching expecting traditional painting",
    iconPath:
      "generator/genres/historical-korea-joseon-dynasty/icons/TENSIONS#gwageo_pressure.webp",
  },
  {
    id: "bandit_passes",
    label: "In Contact with a Bandit Network",
    description:
      "Has been drawn into the orbit of a provincial bandit or rebel leader — provides information, shelter, or passage they cannot easily stop providing",
    toneTag: "criminal",
    criminalFlag: true,
    iconPrompt:
      "joseon dynasty korean bandit network secret contact mountain hideout nervous messenger night meeting dangerous traditional painting",
    iconPath:
      "generator/genres/historical-korea-joseon-dynasty/icons/TENSIONS#bandit_passes.webp",
  },
  {
    id: "inheritance_dispute",
    label: "Clan Inheritance Dispute",
    description:
      "The clan compound, land, or lineage position is contested — a cousin, a concubine's son, or a creditor is making a legal case",
    toneTag: "bitter",
    iconPrompt:
      "joseon dynasty korean inheritance dispute clan elders meeting argument property records legal document tense traditional painting",
    iconPath:
      "generator/genres/historical-korea-joseon-dynasty/icons/TENSIONS#inheritance_dispute.webp",
  },
  {
    id: "dangerous_knowledge",
    label: "Knows Something Lethal",
    description:
      "Is in possession of information — a bribe, a cover-up, a falsified record — that would destroy a powerful person if spoken",
    toneTag: "high_stakes",
    iconPrompt:
      "joseon dynasty korean dangerous secret knowledge hidden document cautious fear powerful enemy night alone fearful traditional painting",
    iconPath:
      "generator/genres/historical-korea-joseon-dynasty/icons/TENSIONS#dangerous_knowledge.webp",
  },
  {
    id: "rebel_contact",
    label: "Connected to a Rebel Movement",
    description:
      "Has family, friends, or sympathies tied to a peasant uprising or political resistance — one informant away from arrest",
    toneTag: "criminal",
    criminalFlag: true,
    iconPrompt:
      "joseon dynasty korean rebel movement peasant uprising secret meeting night forest banner protest connection dangerous traditional folk painting",
    iconPath:
      "generator/genres/historical-korea-joseon-dynasty/icons/TENSIONS#rebel_contact.webp",
  },
  {
    id: "haunted_by_imjin",
    label: "Haunted by the Imjin War",
    description:
      "Carries specific memories of the Japanese invasion that they have never been able to set down — affects sleep, judgment, and reaction",
    toneTag: "dark",
    iconPrompt:
      "joseon dynasty korean imjin war haunted veteran nightmare flashback memory trauma survivor quiet withdrawn traditional painting",
    iconPath:
      "generator/genres/historical-korea-joseon-dynasty/icons/TENSIONS#haunted_by_imjin.webp",
  },
  {
    id: "marriage_trap",
    label: "Trapped in a Political Marriage",
    description:
      "The marriage was an alliance, not a choice — and one of the parties is now actively working against the other's family",
    toneTag: "bitter",
    iconPrompt:
      "joseon dynasty korean political marriage trap cold couple formal duty resentment obligation inner quarters traditional court painting",
    iconPath:
      "generator/genres/historical-korea-joseon-dynasty/icons/TENSIONS#marriage_trap.webp",
  },
];
