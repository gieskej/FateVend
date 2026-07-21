// genres/historical-korea-joseon-dynasty/family-structures.js
// Family situations in Joseon Dynasty Korea. Family composition is randomized
// per character; the generator picks one FAMILY_STRUCTURES entry, then
// resolves each parent's status independently.
//
// PARENT_STATUSES / SIBLING_DYNAMICS entries: id, label, toneTag, iconPrompt, iconPath.
//
// FAMILY_STRUCTURES entries:
//   id, label            — identity + display label
//   parentCount          — 0, 1, or 2 — determines which parent slots are filled
//   siblingCount         — [min, max], resolved at generation time
//   parentGender         — optional; forces 'mother'/'father' for a 1-parent structure
//   toneTag              — gritty | dramatic | cozy | neutral
//   statAffinity         — optional stat-weighted selection bias
//   economicHint         — optional tier shift suggestion
//   notes                — internal note on what this structure represents
//   excludedBroad        — optional array of race `broad` values (see races.js);
//                          engine.js's buildSkeleton() drops this structure from
//                          the pool for a character of one of these castes
//                          (falling back to the full pool if that would leave
//                          nothing). Joseon caste was inherited from your family
//                          of birth, so a household's social standing has to be
//                          compatible with the character's own caste — omitted
//                          only on structures with no caste assumption baked in
//                          (widow_household, monastery_raised).
//   iconPrompt, iconPath — slot-machine reel icon

export const PARENT_STATUSES = [
  {
    id: "father_official_present",
    label: "Father is a present official (demanding, invested)",
    toneTag: "pressure",
    iconPrompt:
      "joseon dynasty korean father official scholar seated authoritative demanding silk hanbok calligraphy home study traditional court painting",
    iconPath:
      "generator/genres/historical-korea-joseon-dynasty/icons/PARENT_STATUSES#father_official_present.webp",
  },
  {
    id: "father_official_distant",
    label: "Father is a posted official in another province (absent)",
    toneTag: "absent",
    iconPrompt:
      "joseon dynasty korean father official distant away provincial posting absent child alone home waiting traditional painting",
    iconPath:
      "generator/genres/historical-korea-joseon-dynasty/icons/PARENT_STATUSES#father_official_distant.webp",
  },
  {
    id: "father_deceased_early",
    label: "Father died early (pressure fell on them)",
    toneTag: "burden",
    iconPrompt:
      "joseon dynasty korean deceased father memorial tablet ancestral shrine mourning child responsibility traditional painting",
    iconPath:
      "generator/genres/historical-korea-joseon-dynasty/icons/PARENT_STATUSES#father_deceased_early.webp",
  },
  {
    id: "mother_inner_court",
    label: "Mother runs the inner household with iron competence",
    toneTag: "matriarchal",
    iconPrompt:
      "joseon dynasty korean capable mother anchae inner quarters managing household authority silk hanbok competent traditional painting",
    iconPath:
      "generator/genres/historical-korea-joseon-dynasty/icons/PARENT_STATUSES#mother_inner_court.webp",
  },
  {
    id: "mother_concubine",
    label: "Mother is the father's concubine (lower-status household)",
    toneTag: "class_limbo",
    iconPrompt:
      "joseon dynasty korean concubine mother outer quarters separate lower status child uncertain position traditional painting",
    iconPath:
      "generator/genres/historical-korea-joseon-dynasty/icons/PARENT_STATUSES#mother_concubine.webp",
  },
  {
    id: "father_in_exile",
    label: "Father exiled by factional purge",
    toneTag: "disgrace",
    iconPrompt:
      "joseon dynasty korean exiled father provincial exile road leaving family shame waiting return traditional court painting",
    iconPath:
      "generator/genres/historical-korea-joseon-dynasty/icons/PARENT_STATUSES#father_in_exile.webp",
  },
  {
    id: "father_gwageo_failure",
    label: "Father failed the gwageo repeatedly — bitterness and expectation",
    toneTag: "legacy_pressure",
    iconPrompt:
      "joseon dynasty korean father gwageo failure bitter expectation watching child study resentment hope traditional painting",
    iconPath:
      "generator/genres/historical-korea-joseon-dynasty/icons/PARENT_STATUSES#father_gwageo_failure.webp",
  },
  {
    id: "both_parents_deceased",
    label: "Both parents deceased (raised by clan elders)",
    toneTag: "orphan",
    iconPrompt:
      "joseon dynasty korean orphan child raised clan elders compound alone discipline cold kindness traditional painting",
    iconPath:
      "generator/genres/historical-korea-joseon-dynasty/icons/PARENT_STATUSES#both_parents_deceased.webp",
  },
  {
    id: "parent_remarried",
    label: "Parent remarried — stepparent in the household",
    toneTag: "friction",
    iconPrompt:
      "joseon dynasty korean remarried parent stepparent household tension awkward distance formal cold traditional painting",
    iconPath:
      "generator/genres/historical-korea-joseon-dynasty/icons/PARENT_STATUSES#parent_remarried.webp",
  },
];

export const SIBLING_DYNAMICS = [
  {
    id: "na",
    label: "Only child",
    toneTag: "neutral",
    iconPrompt:
      "joseon dynasty korean only child alone compound study solitary heir single traditional painting",
    iconPath:
      "generator/genres/historical-korea-joseon-dynasty/icons/SIBLING_DYNAMICS#na.webp",
  },
  {
    id: "eldest_son",
    label: "Eldest son — carries the clan line and all its obligations",
    toneTag: "burden",
    iconPrompt:
      "joseon dynasty korean eldest son heir clan obligation responsible serious adult hanbok traditional court painting",
    iconPath:
      "generator/genres/historical-korea-joseon-dynasty/icons/SIBLING_DYNAMICS#eldest_son.webp",
  },
  {
    id: "younger_overlooked",
    label: "Younger sibling — overlooked in favor of the heir",
    toneTag: "resentment",
    iconPrompt:
      "joseon dynasty korean younger sibling overlooked watching elder brother attention resentment traditional painting",
    iconPath:
      "generator/genres/historical-korea-joseon-dynasty/icons/SIBLING_DYNAMICS#younger_overlooked.webp",
  },
  {
    id: "sister_married_away",
    label: "Sister married into a distant clan — now an informant and an ally",
    toneTag: "alliance",
    iconPrompt:
      "joseon dynasty korean sister married away letter news different clan alliance network traditional court painting",
    iconPath:
      "generator/genres/historical-korea-joseon-dynasty/icons/SIBLING_DYNAMICS#sister_married_away.webp",
  },
  {
    id: "sibling_rivalry",
    label: "Sibling is a direct rival for the same clan position",
    toneTag: "rivalry",
    iconPrompt:
      "joseon dynasty korean sibling rivalry brothers competing gwageo clan position competitive tense traditional painting",
    iconPath:
      "generator/genres/historical-korea-joseon-dynasty/icons/SIBLING_DYNAMICS#sibling_rivalry.webp",
  },
  {
    id: "concubine_sibling",
    label:
      "Half-sibling from father's concubine — legally subordinate, personally complicated",
    toneTag: "complicated",
    iconPrompt:
      "joseon dynasty korean half sibling concubine awkward position different status household complicated relationship traditional painting",
    iconPath:
      "generator/genres/historical-korea-joseon-dynasty/icons/SIBLING_DYNAMICS#concubine_sibling.webp",
  },
  {
    id: "deceased_older_brother",
    label: "Older brother died — inherited the role and the ghost",
    toneTag: "grief",
    iconPrompt:
      "joseon dynasty korean deceased older brother memorial inherited role ghost expectation grief younger sibling traditional painting",
    iconPath:
      "generator/genres/historical-korea-joseon-dynasty/icons/SIBLING_DYNAMICS#deceased_older_brother.webp",
  },
  {
    id: "close_sister_bond",
    label:
      "Close bond with a sister — the most honest relationship in the household",
    toneTag: "warmth",
    iconPrompt:
      "joseon dynasty korean close sister bond inner quarters together warm trust honest relationship traditional painting",
    iconPath:
      "generator/genres/historical-korea-joseon-dynasty/icons/SIBLING_DYNAMICS#close_sister_bond.webp",
  },
];

export const FAMILY_STRUCTURES = [
  {
    id: "noble_compound",
    label: "Prominent Yangban Compound",
    parentCount: 2,
    siblingCount: [1, 3],
    toneTag: "prestigious",
    statAffinity: { intelligence: 1.2, charisma: 1.1 },
    // A yangban-title household — restricted to castes that could actually
    // hold that title (or be raised alongside it, for Royal Court).
    excludedBroad: ["Jungin", "Common Folk", "Merchant", "Gisaeng", "Cheonmin"],
    notes:
      "High expectations, faction politics start at the dinner table, the family genealogy book is read like scripture",
    iconPrompt:
      "joseon dynasty korean yangban noble compound grand tiled manor inner outer quarters family clan prestigious traditional court painting",
    iconPath:
      "generator/genres/historical-korea-joseon-dynasty/icons/FAMILY_STRUCTURES#noble_compound.webp",
  },
  {
    id: "reduced_yangban",
    label: "Reduced Yangban Household",
    parentCount: 2,
    siblingCount: [0, 2],
    toneTag: "proud_but_poor",
    statAffinity: { wisdom: 1.2, intelligence: 1.1 },
    // Same yangban-title restriction as noble_compound above — this is that
    // same title fallen on hard times, not a different caste's poverty.
    excludedBroad: ["Jungin", "Common Folk", "Merchant", "Gisaeng", "Cheonmin"],
    notes:
      "Still uses the title, still holds the standard, the silk hanbok is carefully mended — ambition is proportional to how far they have fallen",
    iconPrompt:
      "joseon dynasty korean reduced yangban modest house faded silk proud dignified struggling traditional painting",
    iconPath:
      "generator/genres/historical-korea-joseon-dynasty/icons/FAMILY_STRUCTURES#reduced_yangban.webp",
  },
  {
    id: "commoner_farming",
    label: "Common Farming Household",
    parentCount: 2,
    siblingCount: [2, 4],
    toneTag: "grounded",
    statAffinity: { constitution: 1.2, strength: 1.1 },
    // Free peasant farming — not for castes with their own household (yangban,
    // royal court), a technical/urban trade (Jungin), or their own dedicated
    // household type (Merchant → merchant_family).
    excludedBroad: [
      "Civil Yangban",
      "Military Yangban",
      "Royal Court",
      "Jungin",
      "Merchant",
    ],
    notes:
      "Hard life, close family, seasonal rhythm of labor, the village is the world and everyone knows everything",
    iconPrompt:
      "joseon dynasty korean commoner farming family thatched house rice paddy village community close traditional folk painting",
    iconPath:
      "generator/genres/historical-korea-joseon-dynasty/icons/FAMILY_STRUCTURES#commoner_farming.webp",
  },
  {
    id: "widow_household",
    label: "Widow-Led Household",
    parentCount: 1,
    siblingCount: [0, 2],
    toneTag: "resilient",
    statAffinity: { wisdom: 1.2, charisma: 1.1 },
    notes:
      "A widowed mother running the household against all odds, usually with remarkable competence and complete social invisibility",
    iconPrompt:
      "joseon dynasty korean widowed mother leading household children managing alone strong determined hanbok traditional painting",
    iconPath:
      "generator/genres/historical-korea-joseon-dynasty/icons/FAMILY_STRUCTURES#widow_household.webp",
  },
  {
    id: "merchant_family",
    label: "Merchant Trading Family",
    parentCount: 2,
    siblingCount: [0, 2],
    toneTag: "pragmatic",
    statAffinity: { charisma: 1.2, intelligence: 1.1 },
    // This household's whole identity is being in trade — reserved for the
    // Merchant caste itself, not just anyone with money.
    excludedBroad: [
      "Civil Yangban",
      "Military Yangban",
      "Royal Court",
      "Jungin",
      "Common Folk",
      "Gisaeng",
      "Cheonmin",
    ],
    notes:
      "Wealthy by Confucian standards should not be, the children understand commerce better than protocol, social ceiling is visible from birth",
    iconPrompt:
      "joseon dynasty korean merchant family market goods ledger comfortable home practical shrewd traditional folk painting",
    iconPath:
      "generator/genres/historical-korea-joseon-dynasty/icons/FAMILY_STRUCTURES#merchant_family.webp",
  },
  {
    id: "exiled_clan",
    label: "Clan Exiled from the Capital",
    parentCount: 2,
    siblingCount: [0, 2],
    toneTag: "bitter",
    statAffinity: { wisdom: 1.2, dexterity: 1.1 },
    // A political-purge exile is a court/government-adjacent phenomenon —
    // plausible for yangban, royal court, and Jungin (court-adjacent
    // technical officials), not for castes with no capital-politics stake.
    excludedBroad: ["Common Folk", "Merchant", "Gisaeng", "Cheonmin"],
    notes:
      "The whole family was removed after a political purge; everyone speaks quietly, everyone knows the reason, nobody discusses it openly",
    iconPrompt:
      "joseon dynasty korean exiled family provincial village isolation shame political purge quiet careful traditional painting",
    iconPath:
      "generator/genres/historical-korea-joseon-dynasty/icons/FAMILY_STRUCTURES#exiled_clan.webp",
  },
  {
    id: "monastery_raised",
    label: "Raised in a Buddhist Monastery",
    parentCount: 0,
    siblingCount: [0, 0],
    toneTag: "detached",
    statAffinity: { wisdom: 1.3, intelligence: 1.2 },
    notes:
      "Left at the gates, raised by monks, deeply learned and profoundly outside the social norms they now must navigate",
    iconPrompt:
      "joseon dynasty korean child raised buddhist monastery monks mountain temple learning prayer incense outside society traditional painting",
    iconPath:
      "generator/genres/historical-korea-joseon-dynasty/icons/FAMILY_STRUCTURES#monastery_raised.webp",
  },
  {
    id: "nobi_household",
    label: "Nobi Household (Slave Family)",
    parentCount: 2,
    siblingCount: [1, 3],
    toneTag: "survival",
    statAffinity: { constitution: 1.2, dexterity: 1.2 },
    // Legal bondage was hereditary in Joseon — a Civil Yangban scholar-
    // aristocrat can't have been "born into" a slave family, since caste
    // passed down through your own household. Left open to Gisaeng too:
    // gisaeng were frequently drawn from nobi or commoner families before
    // being sold or assigned into gisaeng service.
    excludedBroad: [
      "Civil Yangban",
      "Military Yangban",
      "Royal Court",
      "Jungin",
      "Common Folk",
      "Merchant",
    ],
    notes:
      "Born into legal bondage; the parents have learned every technique for surviving a world that does not include them in its moral calculus",
    iconPrompt:
      "joseon dynasty korean nobi slave household family compound service poverty dignity survival together traditional folk painting",
    iconPath:
      "generator/genres/historical-korea-joseon-dynasty/icons/FAMILY_STRUCTURES#nobi_household.webp",
  },
];
