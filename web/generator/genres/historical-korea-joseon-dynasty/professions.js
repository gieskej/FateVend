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
//   weight               — optional relative rarity for weighted-random
//                          selection (statWeightedPick); defaults to 10 when
//                          omitted (see effectiveWeight in engine.js). Used
//                          sparingly, and kept close to the default rather
//                          than crushingly low — e.g. blood-royal Prince/
//                          Princess (weight 7) are a bit less common than
//                          Royal Court's other court professions, but this is
//                          a game, not a lottery: a player should actually
//                          see this content at the table sometimes, not chase
//                          a jackpot. Compounding rarities (a rare race times
//                          a rare profession within it) get rare fast, so keep
//                          per-field weights relaxed even when the flavor
//                          calls for something to feel special.
//   statAffinity         — optional; stats that make this profession more likely
//   sentiments           — pool of feelings-about-the-job, one drawn at random
//                          per roll; values MUST be chosen from the fixed
//                          canonical list in common/sentiments.js — don't
//                          invent a new one-off word, pick the closest
//                          existing id instead (see that file's own header).
//   iconPrompt, iconPath — slot-machine reel icon

export const PROFESSIONS = [
  // ── Royal Bloodline ───────────────────────────────────────────────────
  {
    title: "King (Wang)",
    industry: "Royal Bloodline",
    allowedGenders: ["man", "trans_man"],
    weight: 4,
    economicTier: 5,
    statAffinity: { charisma: 1.4, wisdom: 1.2, intelligence: 1.2 },
    sentiments: ["exhausted", "suspicious", "lonely"],
    iconPrompt:
      "joseon dynasty korean king bright red gonryongpo dragon robe gold dragon emblem black ikseongwan winged court hat throne room supreme authority commanding traditional court painting",
    iconPath:
      "generator/genres/historical-korea-joseon-dynasty/icons/PROFESSIONS#king_wang.webp",
  },
  {
    title: "Prince (Blood Royal)",
    industry: "Royal Bloodline",
    allowedGenders: ["man", "trans_man"],
    weight: 7,
    economicTier: 5,
    statAffinity: { charisma: 1.3, wisdom: 1.2, intelligence: 1.1 },
    sentiments: ["ambitious", "suspicious", "exhausted"],
    // Dragon motif is the king's exclusively — a royal prince (Daegun/Gun)
    // wears blue or purple, a lesser non-dragon robe.
    iconPrompt:
      "joseon dynasty korean royal prince blue or purple silk robes no dragon motif refined rank insignia palace corridor formal wary traditional court painting",
    iconPath:
      "generator/genres/historical-korea-joseon-dynasty/icons/PROFESSIONS#prince_blood_royal.webp",
  },
  {
    title: "Princess (Blood Royal)",
    industry: "Royal Bloodline",
    allowedGenders: ["woman", "trans_woman"],
    weight: 7,
    economicTier: 5,
    statAffinity: { charisma: 1.3, wisdom: 1.2, intelligence: 1.1 },
    sentiments: ["shrewd", "anxious", "watchful"],
    iconPrompt:
      "joseon dynasty korean royal princess bright colorful hanbok jokduri decorative crown elaborate braided hair with ribbons and pins palace courtyard formal composed watchful traditional court painting",
    iconPath:
      "generator/genres/historical-korea-joseon-dynasty/icons/PROFESSIONS#princess_blood_royal.webp",
  },
  // ── Royal Consort ─────────────────────────────────────────────────────
  {
    title: "Queen (Wangbi)",
    industry: "Royal Consort",
    allowedGenders: ["woman", "trans_woman"],
    weight: 4,
    economicTier: 5,
    statAffinity: { charisma: 1.3, wisdom: 1.3, intelligence: 1.2 },
    sentiments: ["shrewd", "watchful", "exhausted"],
    iconPrompt:
      "joseon dynasty korean queen crimson and dark green ceremonial robes gold embroidery phoenix motif massive ceremonial daesu wig gold and jade hairpins palace throne room regal traditional court painting",
    iconPath:
      "generator/genres/historical-korea-joseon-dynasty/icons/PROFESSIONS#queen_wangbi.webp",
  },
  {
    title: "Queen Dowager (Daebi)",
    industry: "Royal Consort",
    allowedGenders: ["woman", "trans_woman"],
    weight: 4,
    minAge: 45,
    economicTier: 5,
    statAffinity: { wisdom: 1.4, charisma: 1.2, intelligence: 1.2 },
    sentiments: ["commanding", "shrewd", "watchful"],
    iconPrompt:
      "joseon dynasty korean queen dowager older woman dark rich ceremonial robes phoenix motif silver-streaked hair ornate crown commanding authoritative presence palace inner quarters traditional court painting",
    iconPath:
      "generator/genres/historical-korea-joseon-dynasty/icons/PROFESSIONS#queen_dowager_daebi.webp",
  },
  {
    title: "Royal Concubine (Hugung)",
    industry: "Royal Consort",
    allowedGenders: ["woman", "trans_woman"],
    economicTier: 4,
    statAffinity: { charisma: 1.3, dexterity: 1.1, wisdom: 1.1 },
    sentiments: ["shrewd", "watchful", "ambitious"],
    iconPrompt:
      "joseon dynasty korean royal concubine hugung colorful ornate hanbok fine hairpins less elaborate than the queen watchful calculating expression palace inner quarters traditional court painting",
    iconPath:
      "generator/genres/historical-korea-joseon-dynasty/icons/PROFESSIONS#royal_concubine_hugung.webp",
  },
  // ── Royal Inspection ──────────────────────────────────────────────────
  {
    title: "Royal Inspector (Amhaeng-eosa)",
    industry: "Royal Inspection",
    allowedGenders: ["man", "trans_man"],
    economicTier: 4,
    statAffinity: { intelligence: 1.3, wisdom: 1.2, dexterity: 1.1 },
    sentiments: ["watchful", "proud", "discreet"],
    iconPrompt:
      "joseon dynasty korean royal secret inspector amhaeng-eosa disguised as an ordinary traveling scholar plain gat hat and hanbok concealing a mapae horse tablet dramatic reveal traditional court painting",
    iconPath:
      "generator/genres/historical-korea-joseon-dynasty/icons/PROFESSIONS#royal_inspector_amhaeng_eosa.webp",
  },
  // ── Palace Service (Eunuch) ──────────────────────────────────────────
  {
    title: "Palace Eunuch (Naesi)",
    industry: "Palace Service",
    allowedGenders: ["man", "trans_man"],
    economicTier: 3,
    statAffinity: { wisdom: 1.2, charisma: 1.1, intelligence: 1.1 },
    sentiments: ["discreet", "shrewd", "lonely"],
    iconPrompt:
      "joseon dynasty korean palace eunuch naesi green robe simple black service cap palace corridor discreet watchful traditional court painting",
    iconPath:
      "generator/genres/historical-korea-joseon-dynasty/icons/PROFESSIONS#palace_eunuch_naesi.webp",
  },
  // ── Royal Secretariat ─────────────────────────────────────────────────
  {
    title: "Royal Secretary (Seungji)",
    industry: "Royal Secretariat",
    allowedGenders: ["man", "trans_man"],
    minAge: 24,
    economicTier: 4,
    statAffinity: { intelligence: 1.2, wisdom: 1.2, charisma: 1.1 },
    sentiments: ["principled", "watchful", "meticulous"],
    iconPrompt:
      "joseon dynasty korean royal secretary seungji formal blue official robes bird rank badge scroll of royal orders palace corridor traditional court painting",
    iconPath:
      "generator/genres/historical-korea-joseon-dynasty/icons/PROFESSIONS#royal_secretary_seungji.webp",
  },
  // ── Constabulary ──────────────────────────────────────────────────────
  {
    title: "Constable (Pojol)",
    industry: "Constabulary",
    allowedGenders: ["man", "trans_man"],
    minAge: 18,
    economicTier: 2,
    statAffinity: { strength: 1.2, dexterity: 1.1, constitution: 1.1 },
    sentiments: ["principled", "exhausted", "watchful"],
    iconPrompt:
      "joseon dynasty korean police constable pojol blue uniform broad black wide-brimmed jeollip hat wooden club at the waist guarding a government office traditional folk painting",
    iconPath:
      "generator/genres/historical-korea-joseon-dynasty/icons/PROFESSIONS#constable_pojol.webp",
  },
  // ── Folk Medicine ─────────────────────────────────────────────────────
  {
    title: "Village Healer",
    industry: "Folk Medicine",
    economicTier: 2,
    statAffinity: { wisdom: 1.3, intelligence: 1.1, constitution: 1.1 },
    sentiments: ["warm", "exhausted", "welcoming"],
    iconPrompt:
      "joseon dynasty korean village healer herbalist plain hanbok grinding herbs medicinal satchel humble home traditional folk painting",
    iconPath:
      "generator/genres/historical-korea-joseon-dynasty/icons/PROFESSIONS#village_healer.webp",
  },
  // ── Civil Administration ──────────────────────────────────────────────
  {
    title: "Scholar-Official",
    industry: "Civil Administration",
    allowedGenders: ["man", "trans_man"],
    minAge: 22,
    economicTier: 5,
    statAffinity: { intelligence: 1.4, wisdom: 1.2, charisma: 1.1 },
    sentiments: ["principled", "suspicious", "meticulous"],
    iconPrompt:
      "joseon dynasty korean scholar official gat hat manggeon headband seated writing brush ink calligraphy silk hanbok court painting style",
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
    sentiments: ["proud", "overwhelmed", "shrewd"],
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
    sentiments: ["confident", "shrewd", "shrewd"],
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
    sentiments: ["proud", "thoughtful", "duplicitous"],
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
    sentiments: ["devout", "suspicious", "watchful"],
    iconPrompt:
      "joseon dynasty korean royal palace guard armor iron helmet weapon standing guard ceremonial proud traditional court painting",
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
    sentiments: ["contemptuous", "devout", "fearful"],
    iconPrompt:
      "joseon dynasty korean cavalry officer plumed iron helmet horse armor sword mounted warrior proud battlefield traditional court painting",
    iconPath:
      "generator/genres/historical-korea-joseon-dynasty/icons/PROFESSIONS#cavalry_officer.webp",
  },
  {
    title: "General",
    industry: "Military",
    allowedGenders: ["man", "trans_man"],
    minAge: 30,
    economicTier: 5,
    statAffinity: { strength: 1.3, wisdom: 1.2, charisma: 1.2 },
    sentiments: ["exhausted", "proud", "fearful"],
    iconPrompt:
      "joseon dynasty korean general military commander plumed iron helmet ornate armor animal rank badge frontier command post traditional court painting",
    iconPath:
      "generator/genres/historical-korea-joseon-dynasty/icons/PROFESSIONS#general.webp",
  },
  {
    title: "Fortress Soldier",
    industry: "Frontier Defense",
    allowedGenders: ["man", "trans_man"],
    minAge: 18,
    economicTier: 2,
    statAffinity: { strength: 1.2, constitution: 1.3, dexterity: 1.0 },
    sentiments: ["disappointed", "warm", "yearning"],
    iconPrompt:
      "joseon dynasty korean fortress soldier leather helmet guard wall spear armor cold northern frontier tired reliable traditional painting",
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
    sentiments: ["anxious", "principled", "anxious"],
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
    sentiments: ["confident", "watchful", "proud"],
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
    sentiments: ["ambitious", "meticulous", "anxious"],
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
    sentiments: ["watchful", "lonely", "confused"],
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
    sentiments: ["fearful", "shrewd", "principled"],
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
    sentiments: ["shrewd", "angry", "shrewd"],
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
    sentiments: ["confident", "discreet", "watchful"],
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
    sentiments: ["thoughtful", "confident", "duplicitous"],
    iconPrompt:
      "joseon dynasty korean maritime trader ship busan port japanese goods cargo sea coast prosperous risky traditional painting",
    iconPath:
      "generator/genres/historical-korea-joseon-dynasty/icons/PROFESSIONS#maritime_trader.webp",
  },
  {
    title: "Innkeeper",
    industry: "Trade",
    economicTier: 3,
    statAffinity: { charisma: 1.2, wisdom: 1.1, constitution: 1.1 },
    sentiments: ["shrewd", "playful", "welcoming"],
    iconPrompt:
      "joseon dynasty korean innkeeper practical hanbok apron welcoming gesture roadside inn courtyard traditional folk painting",
    iconPath:
      "generator/genres/historical-korea-joseon-dynasty/icons/PROFESSIONS#innkeeper.webp",
  },
  // ── Spiritual ─────────────────────────────────────────────────────────
  {
    title: "Buddhist Monk",
    industry: "Spiritual",
    allowedGenders: ["man", "trans_man"],
    economicTier: 2,
    statAffinity: { wisdom: 1.4, constitution: 1.1, intelligence: 1.2 },
    sentiments: ["lonely", "thoughtful", "warm"],
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
    sentiments: ["lonely", "watchful", "devout"],
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
    sentiments: ["confident", "confident", "shrewd"],
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
    sentiments: ["watchful", "principled", "content"],
    iconPrompt:
      "joseon dynasty korean rice farmer paddy field transplanting seedlings plain hanbok straw hat muddy hands hardworking traditional folk painting",
    iconPath:
      "generator/genres/historical-korea-joseon-dynasty/icons/PROFESSIONS#rice_farmer.webp",
  },
  {
    title: "Blacksmith",
    industry: "Labor",
    economicTier: 2,
    statAffinity: { strength: 1.3, constitution: 1.2, dexterity: 1.0 },
    sentiments: ["angry", "meticulous", "content"],
    iconPrompt:
      "joseon dynasty korean blacksmith forge hammer sparks practical rough clothing muscular traditional folk painting",
    iconPath:
      "generator/genres/historical-korea-joseon-dynasty/icons/PROFESSIONS#blacksmith.webp",
  },
  // ── Service ───────────────────────────────────────────────────────────
  {
    title: "Palace Court Lady",
    industry: "Palace Service",
    allowedGenders: ["woman", "trans_woman"],
    economicTier: 3,
    statAffinity: { charisma: 1.2, wisdom: 1.2, intelligence: 1.1 },
    sentiments: ["discreet", "confident", "anxious"],
    iconPrompt:
      "joseon dynasty korean court lady nagin palace service elegant green jacket red skirt hanbok court duties discreet attentive traditional court painting",
    iconPath:
      "generator/genres/historical-korea-joseon-dynasty/icons/PROFESSIONS#palace_court_lady.webp",
  },
  {
    title: "Royal Kitchen Worker",
    industry: "Palace Service",
    economicTier: 2,
    statAffinity: { constitution: 1.2, dexterity: 1.2, wisdom: 1.0 },
    sentiments: ["exhausted", "watchful", "principled"],
    iconPrompt:
      "joseon dynasty korean royal kitchen worker palace cooking pots steam plain servant clothing hardworking traditional folk painting",
    iconPath:
      "generator/genres/historical-korea-joseon-dynasty/icons/PROFESSIONS#royal_kitchen_worker.webp",
  },
  {
    title: "Palace Groundskeeper",
    industry: "Palace Service",
    economicTier: 2,
    statAffinity: { strength: 1.2, constitution: 1.2, wisdom: 1.0 },
    sentiments: ["principled", "watchful", "lonely"],
    iconPrompt:
      "joseon dynasty korean palace groundskeeper sweeping courtyard stable duties plain servant clothing humble traditional folk painting",
    iconPath:
      "generator/genres/historical-korea-joseon-dynasty/icons/PROFESSIONS#palace_groundskeeper.webp",
  },
  {
    title: "Nobi (House Slave)",
    industry: "Bonded Service",
    economicTier: 1,
    statAffinity: { dexterity: 1.2, constitution: 1.2, wisdom: 1.1 },
    sentiments: ["watchful", "shrewd", "yearning"],
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
    sentiments: ["watchful", "ambitious", "confused"],
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
    sentiments: ["shrewd", "exhausted", "principled"],
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
    sentiments: ["proud", "discreet", "shrewd"],
    iconPrompt:
      "joseon dynasty korean gisaeng female entertainer haegeum musician court performance elegant silk hanbok ornate binyeo hairpin graceful traditional painting",
    iconPath:
      "generator/genres/historical-korea-joseon-dynasty/icons/PROFESSIONS#gisaeng_entertainer.webp",
  },
];
