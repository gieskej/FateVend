// genres/paleolithic/settings.js
// Re-exports ECONOMIC_TIERS/CITY_SETTINGS and defines TAG_POOLS: the pools
// scenario tags (up to 10) are drawn from, keyed by toneTag match on the
// rolled city/tension (`always` is unconditional), `criminal` (added when a
// tension's criminalFlag is true), and `professionTags` (keyed by industry).

export { ECONOMIC_TIERS } from "./economic-tiers.js";
export { CITY_SETTINGS } from "./city-settings.js";

export const TAG_POOLS = {
  always: ["paleolithic", "prehistoric", "survival"],
  gritty: ["harsh-survival", "brutal", "famine", "predator", "danger"],
  dramatic: ["tribal-conflict", "spirits", "betrayal", "exile", "ritual"],
  neutral: ["hunting", "foraging", "migration", "tribe"],
  cozy: ["found-family", "community", "clan-bonds"],
  criminal: ["rivalry", "theft", "blood-feud"],
  professionTags: {
    Hunting: ["hunting", "wilderness", "predator"],
    Foraging: ["foraging", "nature", "survival"],
    Crafting: ["crafting", "tools", "artisan"],
    Ritual: ["shaman", "spirits", "ceremony", "healing"],
    Knowledge: ["oral-tradition", "memory", "wisdom"],
    Scouting: ["exploration", "territory", "tracking"],
    Combat: ["tribal-war", "raiding", "warrior"],
    Leadership: ["chief", "elder", "council"],
    Entertainment: ["social", "camp-life"],
  },
};
