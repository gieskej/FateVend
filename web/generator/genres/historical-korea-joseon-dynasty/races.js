// genres/historical-korea-joseon-dynasty/races.js
// Social classes of Joseon Dynasty Korea. Each entry:
//   id                — unique slug; used for slot-machine reel identity and icon lookup
//   broad             — class label used for NAME_POOLS lookup
//   label             — display label (mirrors broad for this genre)
//   flavor            — cultural/social detail passed to Claude for description prose.
//                        If it contains ' — ' (space-em dash-space), only the text
//                        before the first one is shown in the UI (engine.js's
//                        _slots.race, used as the identity reel's sub-label, and the
//                        output header in index.html) — the full string still
//                        reaches the AI prompt. Keep the punchy part first.
//   allowedIndustries — professions.js industries this class may roll (optional;
//                        omitted means any profession is eligible). Several
//                        industries are split more finely than their plain-English
//                        name suggests specifically to keep this restriction
//                        meaningful — e.g. "Civil Administration" (Scholar-Official,
//                        gwageo-exam-track only) is separate from "Local
//                        Administration" (Magistrate's Aide/Village Elder, open to
//                        commoners), and "Gisaeng Arts" is intentionally Gisaeng-only
//                        even though gisaeng were legally Cheonmin historically —
//                        this game models them as distinct identities.
//   weight            — relative rarity for weighted-random selection (statAndWeightPick)
//   iconPrompt        — text-to-image prompt used to generate this class's reel icon
//   iconPath          — served path where that icon lives

export const RACES = [
  {
    id: "civil_yangban",
    broad: "Civil Yangban",
    label: "Civil Yangban",
    flavor:
      "Scholar-aristocrat of the gwageo path — brushwork and classical learning define both identity and ambition",
    allowedIndustries: [
      "Civil Administration",
      "Magistracy",
      "Local Administration",
      "Arts & Learning",
      "Court Painting",
      "Court Records",
      "Military",
      "Household Study",
      "Royal Inspection",
      "Royal Secretariat",
    ],
    weight: 8,
    iconPrompt:
      "joseon dynasty korean civil yangban scholar official gat horsehair hat manggeon headband topknot silk robes gwageo exam traditional court painting style",
    iconPath:
      "generator/genres/historical-korea-joseon-dynasty/icons/CLASSES#civil_yangban.webp",
  },
  {
    id: "military_yangban",
    broad: "Military Yangban",
    label: "Military Yangban",
    flavor:
      "Warrior-aristocrat of the musa path — honor measured in the archery range and on the battlefield, not in the examination hall",
    // No Court Painting/Court Records — those are civil scholarly pursuits,
    // and this class's own flavor text says explicitly that isn't their path.
    allowedIndustries: [
      "Military",
      "Frontier Defense",
      "Magistracy",
      "Local Administration",
      "Household Study",
    ],
    weight: 7,
    iconPrompt:
      "joseon dynasty korean military yangban warrior officer armor sword archery proud stance traditional court painting style",
    iconPath:
      "generator/genres/historical-korea-joseon-dynasty/icons/CLASSES#military_yangban.webp",
  },
  {
    id: "royal_court",
    broad: "Royal Court",
    label: "Royal Court",
    flavor:
      "Connected to the palace and the throne — proximity to power is both privilege and mortal risk in a dynasty of faction wars",
    allowedIndustries: [
      "Civil Administration",
      "Magistracy",
      "Local Administration",
      "Military",
      "Arts & Learning",
      "Court Painting",
      "Court Records",
      "Court Medicine",
      "Palace Service",
      "Household Study",
      "Royal Bloodline",
      "Royal Consort",
      "Royal Inspection",
      "Royal Secretariat",
    ],
    weight: 7,
    iconPrompt:
      "joseon dynasty korean royal court official palace gyeongbokgung ceremonial robes refined posture traditional court painting style",
    iconPath:
      "generator/genres/historical-korea-joseon-dynasty/icons/CLASSES#royal_court.webp",
  },
  {
    id: "jungin",
    broad: "Jungin",
    label: "Jungin",
    flavor:
      "Middle functionary — interpreter, physician, or technical official; indispensable but forever locked out of real power by birth",
    allowedIndustries: [
      "Local Administration",
      "Court Painting",
      "Court Records",
      "Court Medicine",
      "Trade",
      "Constabulary",
    ],
    weight: 7,
    iconPrompt:
      "joseon dynasty korean jungin middle class official interpreter physician practical hanbok ledger traditional painting style",
    iconPath:
      "generator/genres/historical-korea-joseon-dynasty/icons/CLASSES#jungin.webp",
  },
  {
    id: "common_folk",
    broad: "Common Folk",
    label: "Common Folk",
    flavor:
      "Farmer, potter, weaver — the backbone of Joseon, bearing its taxes and its hungers with patient endurance",
    allowedIndustries: [
      "Labor",
      "Trade",
      "Local Administration",
      "Spiritual",
      "Folk Medicine",
      "Constabulary",
    ],
    weight: 10,
    iconPrompt:
      "joseon dynasty korean common farmer village worker plain hanbok rice field straw hat traditional minhwa folk painting style",
    iconPath:
      "generator/genres/historical-korea-joseon-dynasty/icons/CLASSES#common_folk.webp",
  },
  {
    id: "merchant",
    broad: "Merchant",
    label: "Merchant",
    flavor:
      "Trader and peddler — low social standing by Confucian law, yet often the wealthiest and most connected person in any room",
    allowedIndustries: ["Trade"],
    weight: 7,
    iconPrompt:
      "joseon dynasty korean merchant trader market stall goods ledger shrewd practical hanbok traditional painting style",
    iconPath:
      "generator/genres/historical-korea-joseon-dynasty/icons/CLASSES#merchant.webp",
  },
  {
    id: "gisaeng",
    broad: "Gisaeng",
    label: "Gisaeng",
    flavor:
      "Entertainer-scholar — more educated than most yangban daughters, music and poetry her armor, a liminal figure society both prized and discarded",
    // Spiritual (Mudang/shaman) deliberately excluded — a gisaeng's training
    // is performance and court refinement, not the folk ritual specialty a
    // shaman practices. Both are marginal-status roles, but they're distinct
    // professions, not overlapping skill sets. Court Painting (not Court
    // Records) for the same reason: painting is an art a gisaeng plausibly
    // practices, but Court Historian is a formal exam-vetted government
    // office a gisaeng had no legal path into.
    allowedIndustries: ["Gisaeng Arts", "Court Painting", "Palace Service"],
    weight: 6,
    iconPrompt:
      "joseon dynasty korean gisaeng female entertainer musician haegeum elegant hanbok ornate hairpin court banquet traditional painting style",
    iconPath:
      "generator/genres/historical-korea-joseon-dynasty/icons/CLASSES#gisaeng.webp",
  },
  {
    id: "cheonmin",
    broad: "Cheonmin",
    label: "Cheonmin",
    flavor:
      "Low-born — nobi slave, mudang shaman, or baekjeong butcher; outside the social order, occasionally its most dangerous element",
    allowedIndustries: [
      "Labor",
      "Bonded Service",
      "Spiritual",
      "Folk Medicine",
    ],
    weight: 7,
    iconPrompt:
      "joseon dynasty korean cheonmin low born servant shaman plain rough clothing weathered defiant expression traditional painting style",
    iconPath:
      "generator/genres/historical-korea-joseon-dynasty/icons/CLASSES#cheonmin.webp",
  },
];
