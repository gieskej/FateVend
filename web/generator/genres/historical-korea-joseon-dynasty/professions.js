// genres/historical-korea-joseon-dynasty/professions.js
// Professions of Joseon Dynasty Korea. Each entry:
//   title, industry     — display title + industry (industry must match
//                          TAG_POOLS.professionTags keys in settings.js exactly).
//                          Caste eligibility is controlled entirely from the race
//                          side (races.js's `allowedIndustries`), same mechanism
//                          as every other genre — so industries here are split
//                          more finely than a topic label: "Civil Administration"
//                          is the elite gwageo-exam-track office specifically,
//                          separate from "Local Administration" (open clerical/
//                          village posts), even though both are "administration"
//                          in plain English. See races.js for why.
//   allowedGenders       — optional; restricts which genders may roll this profession
//   minAge, maxAge       — optional; engine.js's profPool filters this profession
//                          out for characters younger than minAge or older than
//                          maxAge (falling back to the unfiltered pool if that
//                          would leave nothing). Omitting both means no age
//                          bound — either an open trade learnable at any age, or
//                          (Palace Court Lady, Nobi, Gisaeng entertainer) a role
//                          historically entered in childhood/adolescence, so a
//                          young age is accurate rather than a gap.
//                          IMPORTANT: because the age filter falls back to
//                          ignoring age entirely once a caste+gender's pool is
//                          empty, every (race.allowedIndustries × allowedGenders)
//                          combination that exists in this genre must keep at
//                          least one profession valid at every age from 15-75 —
//                          otherwise the fallback silently reintroduces an
//                          age-inappropriate result instead of erroring loudly.
//                          "Yangban Household Heir"/"Household Steward (Anchae)"
//                          and "Gisaeng Trainee (Dongi)" exist specifically to
//                          plug gaps of this kind for narrow, heavily
//                          gender-restricted castes (see races.js's
//                          allowedIndustries) — don't add a minAge/maxAge to an
//                          existing profession without re-running that coverage
//                          check for every caste and gender that can reach it.
//   economicTier         — 1-5, social/economic standing
//   statAffinity         — optional; stats that make this profession more likely
//   sentiments           — pool of feelings-about-the-job drawn from randomly
//   iconPrompt, iconPath — slot-machine reel icon

export const PROFESSIONS = [
  // ── Civil Administration ──────────────────────────────────────────────
  {
    title: "Scholar-Official",
    industry: "Civil Administration",
    allowedGenders: ["man", "trans_man"],
    minAge: 22,
    economicTier: 5,
    statAffinity: { intelligence: 1.4, wisdom: 1.2, charisma: 1.1 },
    sentiments: ["principled", "suspicious", "exacting"],
    iconPrompt:
      "joseon dynasty korean scholar official seated writing brush ink calligraphy silk hanbok court painting style",
    iconPath:
      "generator/genres/historical-korea-joseon-dynasty/icons/PROFESSIONS#scholar_official.webp",
  },
  {
    title: "Local Magistrate",
    industry: "Magistracy",
    allowedGenders: ["man", "trans_man"],
    minAge: 26,
    economicTier: 4,
    statAffinity: { wisdom: 1.3, charisma: 1.2, strength: 1.0 },
    sentiments: ["proud", "beleaguered", "canny"],
    iconPrompt:
      "joseon dynasty korean local magistrate seated court judgment hall formal robes stern expression traditional court painting",
    iconPath:
      "generator/genres/historical-korea-joseon-dynasty/icons/PROFESSIONS#local_magistrate.webp",
  },
  {
    title: "Magistrate's Aide",
    industry: "Local Administration",
    allowedGenders: ["man", "trans_man"],
    minAge: 18,
    economicTier: 3,
    statAffinity: { intelligence: 1.2, dexterity: 1.1, wisdom: 1.1 },
    sentiments: ["indispensable", "calculating", "knowing"],
    iconPrompt:
      "joseon dynasty korean magistrate aide clerk ledger records practical hanbok government office traditional painting",
    iconPath:
      "generator/genres/historical-korea-joseon-dynasty/icons/PROFESSIONS#magistrate_aide.webp",
  },
  {
    title: "Village Elder",
    industry: "Local Administration",
    minAge: 45,
    economicTier: 3,
    statAffinity: { wisdom: 1.4, charisma: 1.2, constitution: 1.1 },
    sentiments: ["tenacious", "mediating", "subversive"],
    iconPrompt:
      "joseon dynasty korean village elder seated respected elder weathered face plain hanbok village courtyard traditional folk painting",
    iconPath:
      "generator/genres/historical-korea-joseon-dynasty/icons/PROFESSIONS#village_elder.webp",
  },
  // ── Military ──────────────────────────────────────────────────────────
  {
    title: "Royal Guard",
    industry: "Military",
    allowedGenders: ["man", "trans_man"],
    minAge: 18,
    economicTier: 4,
    statAffinity: { strength: 1.3, constitution: 1.2, dexterity: 1.1 },
    sentiments: ["loyal", "skeptical", "alert"],
    iconPrompt:
      "joseon dynasty korean royal palace guard armor helmet weapon standing guard ceremonial proud traditional court painting",
    iconPath:
      "generator/genres/historical-korea-joseon-dynasty/icons/PROFESSIONS#royal_guard.webp",
  },
  {
    title: "Cavalry Officer",
    industry: "Military",
    allowedGenders: ["man", "trans_man"],
    minAge: 22,
    economicTier: 4,
    statAffinity: { strength: 1.3, dexterity: 1.2, constitution: 1.1 },
    sentiments: ["contemptuous", "loyal", "haunted"],
    iconPrompt:
      "joseon dynasty korean cavalry officer horse armor sword mounted warrior proud battlefield traditional court painting",
    iconPath:
      "generator/genres/historical-korea-joseon-dynasty/icons/PROFESSIONS#cavalry_officer.webp",
  },
  {
    title: "Fortress Soldier",
    industry: "Frontier Defense",
    allowedGenders: ["man", "trans_man"],
    minAge: 18,
    economicTier: 2,
    statAffinity: { strength: 1.2, constitution: 1.3, dexterity: 1.0 },
    sentiments: ["resigned", "protective", "homesick"],
    iconPrompt:
      "joseon dynasty korean fortress soldier guard wall spear armor cold northern frontier tired reliable traditional painting",
    iconPath:
      "generator/genres/historical-korea-joseon-dynasty/icons/PROFESSIONS#fortress_soldier.webp",
  },
  // ── Household Study ───────────────────────────────────────────────────
  {
    title: "Yangban Household Heir",
    industry: "Household Study",
    maxAge: 21,
    economicTier: 4,
    statAffinity: { intelligence: 1.1, wisdom: 1.1, charisma: 1.1 },
    sentiments: ["restless", "dutiful", "watched"],
    iconPrompt:
      "joseon dynasty korean yangban household heir young noble child tutor calligraphy practice family compound traditional painting",
    iconPath:
      "generator/genres/historical-korea-joseon-dynasty/icons/PROFESSIONS#yangban_household_heir.webp",
  },
  {
    title: "Household Steward (Anchae)",
    industry: "Household Study",
    minAge: 22,
    economicTier: 4,
    statAffinity: { wisdom: 1.3, charisma: 1.2, constitution: 1.0 },
    sentiments: ["capable", "watchful", "unyielding"],
    iconPrompt:
      "joseon dynasty korean anchae household steward managing estate ledger keys inner quarters composed authoritative traditional painting",
    iconPath:
      "generator/genres/historical-korea-joseon-dynasty/icons/PROFESSIONS#household_steward.webp",
  },
  // ── Arts & Learning ───────────────────────────────────────────────────
  {
    title: "Sungkyunkwan Scholar",
    industry: "Arts & Learning",
    allowedGenders: ["man", "trans_man"],
    minAge: 16,
    economicTier: 4,
    statAffinity: { intelligence: 1.4, wisdom: 1.2, charisma: 1.0 },
    sentiments: ["ambitious", "exacting", "obsessive"],
    iconPrompt:
      "joseon dynasty korean sungkyunkwan scholar student academy night studying books candle lamp gwageo preparation traditional painting",
    iconPath:
      "generator/genres/historical-korea-joseon-dynasty/icons/PROFESSIONS#sungkyunkwan_scholar.webp",
  },
  {
    title: "Royal Painter",
    industry: "Court Painting",
    minAge: 22,
    economicTier: 3,
    statAffinity: { dexterity: 1.3, intelligence: 1.2, wisdom: 1.1 },
    sentiments: ["perceptive", "liminal", "conflicted"],
    iconPrompt:
      "joseon dynasty korean royal court painter brush silk scroll portrait careful precise pigments traditional court painting",
    iconPath:
      "generator/genres/historical-korea-joseon-dynasty/icons/PROFESSIONS#royal_painter.webp",
  },
  {
    title: "Court Historian",
    industry: "Court Records",
    allowedGenders: ["man", "trans_man"],
    minAge: 26,
    economicTier: 4,
    statAffinity: { intelligence: 1.3, wisdom: 1.3, charisma: 0.9 },
    sentiments: ["fearful", "knowing", "principled"],
    iconPrompt:
      "joseon dynasty korean court historian annals writing veritable records brush scroll official archive careful solemn traditional painting",
    iconPath:
      "generator/genres/historical-korea-joseon-dynasty/icons/PROFESSIONS#court_historian.webp",
  },
  // ── Trade ─────────────────────────────────────────────────────────────
  {
    title: "Market Merchant",
    industry: "Trade",
    economicTier: 3,
    statAffinity: { charisma: 1.3, intelligence: 1.2, dexterity: 1.0 },
    sentiments: ["canny", "resentful", "calculating"],
    iconPrompt:
      "joseon dynasty korean market merchant stall goods trade jongno commercial street shrewd confident practical hanbok traditional folk painting",
    iconPath:
      "generator/genres/historical-korea-joseon-dynasty/icons/PROFESSIONS#market_merchant.webp",
  },
  {
    title: "Traveling Peddler",
    industry: "Trade",
    economicTier: 2,
    statAffinity: { dexterity: 1.2, charisma: 1.1, constitution: 1.2 },
    sentiments: ["worldly", "discreet", "prescient"],
    iconPrompt:
      "joseon dynasty korean traveling peddler jangsu pack goods rural road village gate cheerful resilient traditional folk painting",
    iconPath:
      "generator/genres/historical-korea-joseon-dynasty/icons/PROFESSIONS#traveling_peddler.webp",
  },
  {
    title: "Maritime Trader",
    industry: "Trade",
    minAge: 24,
    economicTier: 4,
    statAffinity: { charisma: 1.2, constitution: 1.2, intelligence: 1.2 },
    sentiments: ["pragmatic", "worldly", "duplicitous"],
    iconPrompt:
      "joseon dynasty korean maritime trader ship busan port japanese goods cargo sea coast prosperous risky traditional painting",
    iconPath:
      "generator/genres/historical-korea-joseon-dynasty/icons/PROFESSIONS#maritime_trader.webp",
  },
  // ── Spiritual ─────────────────────────────────────────────────────────
  {
    title: "Buddhist Monk",
    industry: "Spiritual",
    allowedGenders: ["man", "trans_man"],
    economicTier: 2,
    statAffinity: { wisdom: 1.4, constitution: 1.1, intelligence: 1.2 },
    sentiments: ["liminal", "learned", "compassionate"],
    iconPrompt:
      "joseon dynasty korean buddhist monk gray robe shaved head mountain temple incense prayer beads serene steadfast traditional painting",
    iconPath:
      "generator/genres/historical-korea-joseon-dynasty/icons/PROFESSIONS#buddhist_monk.webp",
  },
  {
    title: "Mudang (Shaman)",
    industry: "Spiritual",
    allowedGenders: ["woman", "trans_woman"],
    economicTier: 2,
    statAffinity: { charisma: 1.3, wisdom: 1.2, constitution: 1.1 },
    sentiments: ["marginalized", "perceptive", "devout"],
    iconPrompt:
      "joseon dynasty korean mudang shaman female ritual ceremony colorful costume drum spirit possession traditional folk painting",
    iconPath:
      "generator/genres/historical-korea-joseon-dynasty/icons/PROFESSIONS#mudang_shaman.webp",
  },
  {
    title: "Court Physician",
    industry: "Court Medicine",
    minAge: 24,
    economicTier: 3,
    statAffinity: { intelligence: 1.3, wisdom: 1.3, dexterity: 1.1 },
    sentiments: ["entrusted", "indispensable", "knowing"],
    iconPrompt:
      "joseon dynasty korean court physician acupuncture herbs medical diagnosis careful skilled practical traditional painting",
    iconPath:
      "generator/genres/historical-korea-joseon-dynasty/icons/PROFESSIONS#court_physician.webp",
  },
  // ── Labor ─────────────────────────────────────────────────────────────
  {
    title: "Rice Farmer",
    industry: "Labor",
    economicTier: 2,
    statAffinity: { constitution: 1.4, strength: 1.2, wisdom: 1.1 },
    sentiments: ["observant", "unsentimental", "rooted"],
    iconPrompt:
      "joseon dynasty korean rice farmer paddy field transplanting seedlings plain hanbok straw hat muddy hands hardworking traditional folk painting",
    iconPath:
      "generator/genres/historical-korea-joseon-dynasty/icons/PROFESSIONS#rice_farmer.webp",
  },
  // ── Service ───────────────────────────────────────────────────────────
  {
    title: "Palace Court Lady",
    industry: "Palace Service",
    allowedGenders: ["woman", "trans_woman"],
    economicTier: 3,
    statAffinity: { charisma: 1.2, wisdom: 1.2, intelligence: 1.1 },
    sentiments: ["discreet", "dangerous", "constrained"],
    iconPrompt:
      "joseon dynasty korean court lady nagin palace service elegant green hanbok court duties discreet attentive traditional court painting",
    iconPath:
      "generator/genres/historical-korea-joseon-dynasty/icons/PROFESSIONS#palace_court_lady.webp",
  },
  {
    title: "Nobi (House Slave)",
    industry: "Bonded Service",
    economicTier: 1,
    statAffinity: { dexterity: 1.2, constitution: 1.2, wisdom: 1.1 },
    sentiments: ["perceptive", "calculating", "yearning"],
    iconPrompt:
      "joseon dynasty korean nobi servant slave household duties plain clothing serving master house compound cautious dignified traditional folk painting",
    iconPath:
      "generator/genres/historical-korea-joseon-dynasty/icons/PROFESSIONS#nobi_house_slave.webp",
  },
  // ── Gisaeng Arts ──────────────────────────────────────────────────────
  {
    title: "Gisaeng Trainee (Dongi)",
    industry: "Gisaeng Arts",
    maxAge: 21,
    economicTier: 2,
    statAffinity: { charisma: 1.2, dexterity: 1.2, wisdom: 1.0 },
    sentiments: ["watchful", "eager", "uncertain"],
    iconPrompt:
      "joseon dynasty korean young gisaeng trainee dongi practicing dance instrument gisaeng house courtyard traditional folk painting",
    iconPath:
      "generator/genres/historical-korea-joseon-dynasty/icons/PROFESSIONS#gisaeng_trainee.webp",
  },
  {
    title: "Gisaeng Madam",
    industry: "Gisaeng Arts",
    allowedGenders: ["woman", "trans_woman"],
    minAge: 35,
    economicTier: 4,
    statAffinity: { charisma: 1.4, intelligence: 1.3, wisdom: 1.2 },
    sentiments: ["calculating", "enduring", "unsentimental"],
    iconPrompt:
      "joseon dynasty korean gisaeng madam older woman elegant authority jeweled hairpin silk robe commanding shrewd banquet hall traditional painting",
    iconPath:
      "generator/genres/historical-korea-joseon-dynasty/icons/PROFESSIONS#gisaeng_madam.webp",
  },
  {
    title: "Gisaeng (Entertainer-Courtesan)",
    industry: "Gisaeng Arts",
    allowedGenders: ["woman", "trans_woman"],
    economicTier: 3,
    nsfw: true,
    statAffinity: { charisma: 1.4, dexterity: 1.2, intelligence: 1.2 },
    sentiments: ["accomplished", "guarded", "knowing"],
    iconPrompt:
      "joseon dynasty korean gisaeng female entertainer haegeum musician court performance elegant silk hanbok ornate binyeo hairpin graceful traditional painting",
    iconPath:
      "generator/genres/historical-korea-joseon-dynasty/icons/PROFESSIONS#gisaeng_entertainer.webp",
  },
];
