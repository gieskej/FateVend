// genres/nihongi/professions.js
// Professions in ancient Yamato Japan (Nihon Shoki era). Each entry:
//   id                   — unique slug (optional convenience field; not required
//                          elsewhere since profSlug() derives a slug from title)
//   title, industry      — display title + industry (industry must match
//                          TAG_POOLS.professionTags keys in settings.js)
//   economicTier         — 1-5, social/economic standing
//   nsfw                 — whether this profession is excluded unless the NSFW toggle is on
//   statAffinity         — optional; stats that make this profession more likely
//   sentiments           — pool of feelings-about-the-job, one drawn at random
//                          per roll; values MUST be chosen from the fixed
//                          canonical list in common/sentiments.js — don't
//                          invent a new one-off word, pick the closest
//                          existing id instead (see that file's own header).
//   iconPrompt, iconPath — slot-machine reel icon

export const PROFESSIONS = [
  // ── COURT SERVICE ──────────────────────────────────────────────────────────
  {
    id: "court_scribe",
    title: "Court Scribe",
    industry: "Court Service",
    economicTier: 4,
    nsfw: false,
    statAffinity: { intelligence: 1.4, wisdom: 1.2 },
    sentiments: ["meticulous", "watchful", "ambitious"],
    iconPrompt:
      "ancient japanese court scribe writing brush ink silk robes asuka palace imperial decree careful literate nihon shoki yamato-e painting",
    iconPath: "generator/genres/nihongi/icons/PROFESSIONS#court_scribe.webp",
  },
  {
    id: "palace_steward",
    title: "Palace Steward",
    industry: "Court Service",
    economicTier: 4,
    nsfw: false,
    statAffinity: { charisma: 1.3, wisdom: 1.3 },
    sentiments: ["thoughtful", "watchful", "discreet"],
    iconPrompt:
      "ancient japanese palace steward managing household imperial compound directing servants logistics silk robes asuka period nihon shoki yamato-e painting",
    iconPath: "generator/genres/nihongi/icons/PROFESSIONS#palace_steward.webp",
  },
  {
    id: "court_diviner",
    title: "Court Diviner",
    industry: "Court Service",
    economicTier: 4,
    nsfw: false,
    statAffinity: { wisdom: 1.5, intelligence: 1.2 },
    sentiments: ["discreet", "watchful", "meticulous"],
    iconPrompt:
      "ancient japanese court diviner tortoiseshell reading omen ritual ceremonial robes asuka court prediction nihon shoki yamato-e painting",
    iconPath: "generator/genres/nihongi/icons/PROFESSIONS#court_diviner.webp",
  },
  {
    id: "provincial_aide",
    title: "Provincial Governor's Aide",
    industry: "Court Service",
    economicTier: 3,
    nsfw: false,
    statAffinity: { charisma: 1.2, intelligence: 1.2 },
    sentiments: ["principled", "shrewd", "ambitious"],
    iconPrompt:
      "ancient japanese provincial aide official implementing edicts provincial compound away from capital practical nihon shoki yamato-e painting",
    iconPath: "generator/genres/nihongi/icons/PROFESSIONS#provincial_aide.webp",
  },

  // ── MILITARY ───────────────────────────────────────────────────────────────
  {
    id: "imperial_guard",
    title: "Imperial Guard",
    industry: "Military",
    economicTier: 4,
    nsfw: false,
    statAffinity: { strength: 1.4, constitution: 1.3 },
    sentiments: ["devout", "watchful", "proud"],
    iconPrompt:
      "ancient japanese imperial guard asuka palace protective armor weapon ceremonial formal loyal nihon shoki yamato-e painting",
    iconPath: "generator/genres/nihongi/icons/PROFESSIONS#imperial_guard.webp",
  },
  {
    id: "clan_warrior",
    title: "Clan Warrior",
    industry: "Military",
    economicTier: 3,
    nsfw: false,
    statAffinity: { strength: 1.4, dexterity: 1.2 },
    sentiments: ["devout", "commanding", "proud"],
    iconPrompt:
      "ancient japanese clan warrior hereditary military retainer armor sword bow provincial nihon shoki yamato-e painting",
    iconPath: "generator/genres/nihongi/icons/PROFESSIONS#clan_warrior.webp",
  },
  {
    id: "fortress_soldier",
    title: "Fortress Soldier",
    industry: "Military",
    economicTier: 2,
    nsfw: false,
    statAffinity: { constitution: 1.3, strength: 1.3 },
    sentiments: ["principled", "bored", "yearning"],
    iconPrompt:
      "ancient japanese fortress garrison soldier watchpost provincial border duty spear rough gear nihon shoki yamato-e painting",
    iconPath:
      "generator/genres/nihongi/icons/PROFESSIONS#fortress_soldier.webp",
  },

  // ── RELIGION ───────────────────────────────────────────────────────────────
  {
    id: "buddhist_monk",
    title: "Buddhist Monk",
    industry: "Religion",
    economicTier: 3,
    nsfw: false,
    statAffinity: { wisdom: 1.5, intelligence: 1.3 },
    sentiments: ["thoughtful", "thoughtful", "thoughtful"],
    iconPrompt:
      "ancient japanese buddhist monk newly arrived continental faith robes scriptures asuka period temple incense nihon shoki yamato-e painting",
    iconPath: "generator/genres/nihongi/icons/PROFESSIONS#buddhist_monk.webp",
  },
  {
    id: "kami_priest",
    title: "Kami Priest",
    industry: "Religion",
    economicTier: 3,
    nsfw: false,
    statAffinity: { wisdom: 1.4, charisma: 1.2 },
    sentiments: ["principled", "proud", "suspicious"],
    iconPrompt:
      "ancient japanese kami shrine priest hereditary custodian ritual ceremony white robes sacred forest nihon shoki yamato-e painting",
    iconPath: "generator/genres/nihongi/icons/PROFESSIONS#kami_priest.webp",
  },
  {
    id: "miko",
    title: "Miko (Shrine Maiden / Spirit Medium)",
    industry: "Religion",
    allowedGenders: ["woman", "trans_woman"],
    economicTier: 3,
    nsfw: false,
    statAffinity: { charisma: 1.3, wisdom: 1.4 },
    sentiments: ["welcoming", "astonished", "thoughtful"],
    iconPrompt:
      "ancient japanese miko shrine maiden spirit medium ritual dance white red robes sacred forest oracle nihon shoki yamato-e painting",
    iconPath: "generator/genres/nihongi/icons/PROFESSIONS#miko.webp",
  },
  {
    id: "onmyoji",
    title: "Onmyōji (Yin-Yang Diviner)",
    industry: "Religion",
    economicTier: 4,
    nsfw: false,
    statAffinity: { intelligence: 1.5, wisdom: 1.3 },
    sentiments: ["meticulous", "confident", "shrewd"],
    iconPrompt:
      "ancient japanese onmyoji yin yang diviner continental cosmology calendar astronomical calculation court asuka period nihon shoki yamato-e painting",
    iconPath: "generator/genres/nihongi/icons/PROFESSIONS#onmyoji.webp",
  },

  // ── SCHOLARSHIP ────────────────────────────────────────────────────────────
  {
    id: "court_physician",
    title: "Court Physician (from Baekje)",
    industry: "Scholarship",
    economicTier: 3,
    nsfw: false,
    statAffinity: { intelligence: 1.5, wisdom: 1.2 },
    sentiments: ["thoughtful", "confident", "confident"],
    iconPrompt:
      "ancient japanese court physician baekje continental medicine herbs diagnosis asuka court newcomer learning nihon shoki yamato-e painting",
    iconPath: "generator/genres/nihongi/icons/PROFESSIONS#court_physician.webp",
  },
  {
    id: "astronomer_scribe",
    title: "Astronomer-Scribe",
    industry: "Scholarship",
    economicTier: 4,
    nsfw: false,
    statAffinity: { intelligence: 1.5, wisdom: 1.3 },
    sentiments: ["meticulous", "ambitious", "watchful"],
    iconPrompt:
      "ancient japanese astronomer scribe celestial observation records calendar omen stars court asuka period nihon shoki yamato-e painting",
    iconPath:
      "generator/genres/nihongi/icons/PROFESSIONS#astronomer_scribe.webp",
  },

  // ── CRAFT ──────────────────────────────────────────────────────────────────
  {
    id: "master_potter",
    title: "Master Potter",
    industry: "Craft",
    economicTier: 3,
    nsfw: false,
    statAffinity: { dexterity: 1.4, intelligence: 1.2 },
    sentiments: ["content", "proud", "watchful"],
    iconPrompt:
      "ancient japanese master potter fine ceramics court ritual vessel continental technique craft guild nihon shoki yamato-e painting",
    iconPath: "generator/genres/nihongi/icons/PROFESSIONS#master_potter.webp",
  },
  {
    id: "silk_weaver",
    title: "Silk Weaver",
    industry: "Craft",
    economicTier: 3,
    nsfw: false,
    statAffinity: { dexterity: 1.4, wisdom: 1.2 },
    sentiments: ["meticulous", "discreet", "disappointed"],
    iconPrompt:
      "ancient japanese silk weaver loom continental technique craft guild prestige cloth production nihon shoki yamato-e painting",
    iconPath: "generator/genres/nihongi/icons/PROFESSIONS#silk_weaver.webp",
  },
  {
    id: "forge_master",
    title: "Forge Master",
    industry: "Craft",
    economicTier: 3,
    nsfw: false,
    statAffinity: { strength: 1.3, dexterity: 1.3 },
    sentiments: ["commanding", "confident", "confident"],
    iconPrompt:
      "ancient japanese forge master smithing iron weapons mirrors agricultural tools fire anvil craft guild nihon shoki yamato-e painting",
    iconPath: "generator/genres/nihongi/icons/PROFESSIONS#forge_master.webp",
  },

  // ── AGRICULTURE ────────────────────────────────────────────────────────────
  {
    id: "village_chief",
    title: "Village Chief",
    industry: "Governance",
    economicTier: 3,
    nsfw: false,
    statAffinity: { wisdom: 1.3, charisma: 1.2 },
    sentiments: ["thoughtful", "warm", "thoughtful"],
    iconPrompt:
      "ancient japanese village chief mediating rice paddy community provincial administration mediator respected elder nihon shoki folk painting",
    iconPath: "generator/genres/nihongi/icons/PROFESSIONS#village_chief.webp",
  },
  {
    id: "rice_farmer",
    title: "Rice Farmer",
    industry: "Agriculture",
    economicTier: 2,
    nsfw: false,
    statAffinity: { constitution: 1.3, strength: 1.2 },
    sentiments: ["content", "warm", "thoughtful"],
    iconPrompt:
      "ancient japanese rice farmer paddy field planting harvest seasonal rural tami commoner plain clothing nihon shoki folk painting",
    iconPath: "generator/genres/nihongi/icons/PROFESSIONS#rice_farmer.webp",
  },

  // ── TRADE ──────────────────────────────────────────────────────────────────
  {
    id: "harbor_official",
    title: "Harbor Official",
    industry: "Trade",
    economicTier: 3,
    nsfw: false,
    statAffinity: { charisma: 1.3, intelligence: 1.2 },
    sentiments: ["watchful", "shrewd", "watchful"],
    iconPrompt:
      "ancient japanese harbor official continental ship receiving tribute diplomatic goods naniwa port asuka period nihon shoki yamato-e painting",
    iconPath: "generator/genres/nihongi/icons/PROFESSIONS#harbor_official.webp",
  },
  {
    id: "traveling_merchant",
    title: "Traveling Merchant",
    industry: "Trade",
    economicTier: 2,
    nsfw: false,
    statAffinity: { charisma: 1.3, dexterity: 1.2 },
    sentiments: ["confident", "watchful", "watchful"],
    iconPrompt:
      "ancient japanese traveling merchant goods pack provincial roads moving between markets ancient japan nihon shoki folk painting",
    iconPath:
      "generator/genres/nihongi/icons/PROFESSIONS#traveling_merchant.webp",
  },

  // ── PERFORMANCE ────────────────────────────────────────────────────────────
  {
    id: "court_entertainer",
    title: "Court Entertainer (Unebi)",
    industry: "Performance",
    economicTier: 3,
    nsfw: true,
    statAffinity: { charisma: 1.5, dexterity: 1.3 },
    sentiments: ["content", "watchful", "shrewd"],
    iconPrompt:
      "ancient japanese court entertainer unebi music dance elegant silk robes banquet clan lord patron intimate performance nihon shoki yamato-e painting",
    iconPath:
      "generator/genres/nihongi/icons/PROFESSIONS#court_entertainer.webp",
  },
];
