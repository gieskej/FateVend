// genres/historical-korea-joseon-dynasty/settings.js
// Re-exports ECONOMIC_TIERS/CITY_SETTINGS and defines TAG_POOLS: the pools
// scenario tags (up to 10) are drawn from, keyed by toneTag match on the
// rolled city/tension (`always` is unconditional), `criminal` (added when a
// tension's criminalFlag is true), and `professionTags` (keyed by industry).

export { ECONOMIC_TIERS } from "./economic-tiers.js";
export { CITY_SETTINGS } from "./city-settings.js";

export const TAG_POOLS = {
  always: ["joseon", "korea", "historical", "confucian", "dynasty"],
  gritty: ["rebellion", "nobi", "corruption", "exile", "torture", "invasion"],
  dramatic: [
    "court-intrigue",
    "forbidden-love",
    "gwageo",
    "vendetta",
    "betrayal",
  ],
  neutral: ["clan", "scholarship", "tea", "tradition", "duty"],
  cozy: ["village", "festival", "ondol", "poetry", "found-family"],
  criminal: ["banditry", "black-market", "rebellion", "treason"],
  professionTags: {
    "Civil Administration": ["gwageo", "governance", "confucian"],
    Magistracy: ["magistrate", "governance", "justice"],
    "Local Administration": ["village", "governance", "mediation"],
    Military: ["combat", "archery", "honor"],
    "Frontier Defense": ["combat", "fortress", "frontier"],
    "Arts & Learning": ["poetry", "scholarship", "gwageo"],
    "Court Painting": ["painting", "art", "scholarship"],
    "Court Records": ["calligraphy", "scholarship", "gwageo", "confucian"],
    Trade: ["merchant", "market", "barter", "wealth"],
    Spiritual: ["shaman", "ritual", "buddhist"],
    "Court Medicine": ["medicine", "governance", "confucian"],
    Labor: ["farming", "craft", "toil", "village"],
    "Gisaeng Arts": ["performance", "music", "dance", "banquet"],
    "Palace Service": ["duty", "palace", "servitude"],
    "Bonded Service": ["duty", "household", "servitude", "nobi"],
  },
};
