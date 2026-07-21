// genres/nihongi/settings.js
// Re-exports ECONOMIC_TIERS/CITY_SETTINGS and defines TAG_POOLS: the pools
// scenario tags (up to 10) are drawn from, keyed by toneTag match on the
// rolled city/tension (`always` is unconditional), `criminal` (added when a
// tension's criminalFlag is true), and `professionTags` (keyed by industry).

export { ECONOMIC_TIERS } from "./economic-tiers.js";
export { CITY_SETTINGS } from "./city-settings.js";

export const TAG_POOLS = {
  always: [
    "nihongi",
    "ancient-japan",
    "yamato",
    "kami",
    "yokai",
    "supernatural",
  ],
  horror: [
    "yomi",
    "possession",
    "haunted",
    "cursed-bloodline",
    "divine-wrath",
    "hungry-dead",
    "kegare",
  ],
  supernatural: [
    "spirit-possession",
    "kitsune",
    "shapeshifter",
    "oni",
    "divine-bargain",
    "oracle",
    "sacred-mark",
  ],
  dramatic: [
    "court-intrigue",
    "succession",
    "forbidden-knowledge",
    "divine-omen",
    "sacrifice",
  ],
  gritty: ["clan-war", "exile", "purge", "frontier", "pollution"],
  neutral: ["clan", "ritual", "ancestor-duty", "shrine", "pilgrimage"],
  cozy: ["harvest", "poetry", "found-family", "shrine", "seasonal-ritual"],
  criminal: ["forbidden-rite", "forbidden-pact", "treason", "false-genealogy"],
  professionTags: {
    "Court Service": [
      "court",
      "imperial",
      "protocol",
      "governance",
      "omen-reading",
    ],
    Military: [
      "combat",
      "clan-war",
      "honor",
      "fortress",
      "supernatural-threat",
    ],
    Religion: [
      "kami",
      "ritual",
      "oracle",
      "shrine",
      "exorcism",
      "possession",
      "yomi",
    ],
    Scholarship: [
      "chinese",
      "astronomy",
      "medicine",
      "forbidden-texts",
      "continental",
    ],
    Craft: ["pottery", "silk", "forge", "artisan", "sacred-objects"],
    Agriculture: ["rice", "village", "harvest", "toil", "land-spirits"],
    Trade: ["continental", "ship", "contraband", "market", "forbidden-goods"],
    Performance: ["music", "dance", "spirit-calling", "banquet", "trance"],
    Governance: ["village", "leadership", "mediation", "local-authority"],
  },
};
