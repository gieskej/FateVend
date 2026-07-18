// genres/manga-osaka-highschool1987/settings.js
// Re-exports ECONOMIC_TIERS/CITY_SETTINGS and defines TAG_POOLS: the pools
// scenario tags (up to 10) are drawn from, keyed by toneTag match on the
// rolled city/tension (`always` is unconditional), `criminal` (added when a
// tension's criminalFlag is true), and `professionTags` (keyed by industry).

export { ECONOMIC_TIERS } from "./economic-tiers.js";
export { CITY_SETTINGS } from "./city-settings.js";

export const TAG_POOLS = {
  always: ["manga", "osaka", "1987", "highschool", "japan"],
  gritty: ["yankii", "delinquent", "yakuza", "arubaito", "debt"],
  dramatic: [
    "love-triangle",
    "confession",
    "rivalry",
    "exam-pressure",
    "graduation",
  ],
  neutral: ["school-life", "club", "bunkasai", "friends", "bento"],
  cozy: ["school-romance", "kissaten", "found-family", "sunny-rooftop"],
  criminal: ["yankii-war", "yakuza-adjacent", "gambling-debt"],
  professionTags: {
    Academic: ["studious", "exam", "cram-school", "honor-student"],
    Athletics: ["sports", "koshien", "club", "tournament"],
    Arts: ["drama", "music", "art", "performance"],
    Leadership: ["student-council", "responsibility", "class-rep"],
    Delinquent: ["yankii", "territory", "conflict", "sukajan"],
    "Part-time": ["arubaito", "konbini", "working", "money"],
    Faculty: ["teacher", "sensei", "authority", "homeroom"],
  },
};
