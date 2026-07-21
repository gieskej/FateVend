// genres/nihongi/races.js
// Social/clan identity layers of ancient Japan as depicted in the Nihon Shoki. Each entry:
//   id                — unique slug; used for slot-machine reel identity and icon lookup
//   broad             — clan label used for NAME_POOLS lookup
//   label             — display label (mirrors broad for this genre)
//   flavor            — cultural/social detail passed to Claude for description prose.
//                        If it contains ' — ' (space-em dash-space), only the text
//                        before the first one is shown in the UI (engine.js's
//                        _slots.race, used as the identity reel's sub-label, and the
//                        output header in index.html) — the full string still
//                        reaches the AI prompt. Keep the punchy part first.
//   allowedIndustries — professions.js industries this clan may roll (optional;
//                        omitted means any profession is eligible). "Governance"
//                        is its own industry, separate from "Agriculture", even
//                        though Village Chief (its only profession) is a rural
//                        role — it's a position of authority over free people,
//                        which Bondsman (allowed "Agriculture" for Rice Farmer)
//                        should not be able to reach.
//   weight            — relative rarity for weighted-random selection (statAndWeightPick)
//   iconPrompt        — text-to-image prompt used to generate this clan's reel icon
//   iconPath          — served path where that icon lives

export const RACES = [
  {
    id: "imperial_clan",
    broad: "Imperial Clan",
    label: "Imperial Clan",
    flavor:
      "Imperial Clan — connected to the Yamato household by blood or long service; divine lineage is simultaneously their identity and the most dangerous thing about them",
    allowedIndustries: [
      "Court Service",
      "Religion",
      "Military",
      "Scholarship",
      "Performance",
    ],
    weight: 2,
    iconPrompt:
      "ancient japanese yamato imperial clan noble silk robes court ritual divine lineage asuka period nihon shoki yamato-e painting style",
    iconPath: "generator/genres/nihongi/icons/CLANS#imperial_clan.webp",
  },
  {
    id: "great_omi",
    broad: "Great Omi Clan",
    label: "Great Omi Clan",
    flavor:
      "Great Omi Clan — court noble of the highest non-imperial rank; power measured in genealogy depth, rice-paddy tribute, and proximity to the throne",
    allowedIndustries: [
      "Court Service",
      "Military",
      "Religion",
      "Scholarship",
      "Trade",
      "Performance",
    ],
    weight: 5,
    iconPrompt:
      "ancient japanese great omi clan court noble aristocrat silk layered robes asuka court dignified powerful nihon shoki yamato-e painting",
    iconPath: "generator/genres/nihongi/icons/CLANS#great_omi.webp",
  },
  {
    id: "great_muraji",
    broad: "Great Muraji Clan",
    label: "Great Muraji Clan",
    flavor:
      "Great Muraji Clan — hereditary functional lord with military and ritual duties; the sword arm and voice of the old kami that the Omi clans would prefer to replace",
    allowedIndustries: ["Military", "Religion", "Court Service", "Performance"],
    weight: 5,
    iconPrompt:
      "ancient japanese great muraji clan warrior lord ceremonial armor shrine duty traditional weapons asuka period nihon shoki yamato-e painting",
    iconPath: "generator/genres/nihongi/icons/CLANS#great_muraji.webp",
  },
  {
    id: "court_official",
    broad: "Court Official",
    label: "Court Official",
    flavor:
      "Court Official — palace functionary: scribe, diviner, steward, or ritual specialist in direct imperial service; literate, cautious, entirely aware of who is watching",
    allowedIndustries: [
      "Court Service",
      "Scholarship",
      "Religion",
      "Performance",
    ],
    weight: 7,
    iconPrompt:
      "ancient japanese court official asuka palace scribe brush ink silk robes writing divination careful diligent nihon shoki yamato-e painting",
    iconPath: "generator/genres/nihongi/icons/CLANS#court_official.webp",
  },
  {
    id: "provincial_lord",
    broad: "Provincial Lord",
    label: "Provincial Lord",
    flavor:
      "Provincial Lord — kuni no miyatsuko, hereditary governor of a province; officially answerable to the capital, sovereign in daily practice, far from the capital's scrutiny",
    allowedIndustries: [
      "Military",
      "Court Service",
      "Agriculture",
      "Trade",
      "Religion",
      "Governance",
    ],
    weight: 6,
    iconPrompt:
      "ancient japanese provincial lord governor regional authority traditional armor provincial court yamato landscape power nihon shoki yamato-e painting",
    iconPath: "generator/genres/nihongi/icons/CLANS#provincial_lord.webp",
  },
  {
    id: "craft_guild",
    broad: "Craft Guild",
    label: "Craft Guild (Be)",
    flavor:
      "Craft Guild (Be) — hereditary specialist in a single skill, often of continental origin; indispensable to court and clan alike, socially invisible except when needed",
    allowedIndustries: ["Craft", "Trade", "Scholarship"],
    weight: 8,
    iconPrompt:
      "ancient japanese craft guild be artisan potter weaver smith continental immigrant skilled hands tools workshop nihon shoki yamato-e painting",
    iconPath: "generator/genres/nihongi/icons/CLANS#craft_guild.webp",
  },
  {
    id: "free_farmer",
    broad: "Free Farmer",
    label: "Free Farmer (Tami)",
    flavor:
      "Free Farmer (Tami) — free peasant of the rice paddies; the foundational productive unit of Yamato civilization and the last to benefit from its arrangements",
    allowedIndustries: ["Agriculture", "Trade", "Governance"],
    weight: 10,
    iconPrompt:
      "ancient japanese free farmer tami rice paddy field village simple clothing agricultural rural ancient yamato landscape nihon shoki folk painting",
    iconPath: "generator/genres/nihongi/icons/CLANS#free_farmer.webp",
  },
  {
    id: "bondsman",
    broad: "Bondsman",
    label: "Bondsman (Yatsuko)",
    flavor:
      "Bondsman (Yatsuko) — clan servant or slave, outside the formal social order; occasionally its most indispensable and most dangerous element",
    allowedIndustries: ["Agriculture", "Craft", "Trade"],
    weight: 5,
    iconPrompt:
      "ancient japanese bondsman servant yatsuko clan service rough cloth humble determined outside social order nihon shoki ancient yamato folk painting",
    iconPath: "generator/genres/nihongi/icons/CLANS#bondsman.webp",
  },
];
