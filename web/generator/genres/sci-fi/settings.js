// genres/sci-fi/settings.js
// Economic status markers and physical settings for the sci-fi genre.
// These are used to ground the character Entry and scenario Opening
// in specific, vivid details rather than abstractions.

export { ECONOMIC_TIERS } from "./economic-tiers.js";
export { CITY_SETTINGS } from "./city-settings.js";

// ── SCENARIO TAGS ────────────────────────────────────────────────────────
// Up to 10 tags per scenario. Drawn from the pools below based on
// toneTag, criminalFlag, and profession/tension matches.

export const TAG_POOLS = {
  always: ["sci-fi", "character-driven"],
  gritty: ["cyberpunk", "dystopia", "survival", "noir", "undercity"],
  dramatic: ["drama", "corporate", "betrayal", "identity", "secrets"],
  neutral: ["space-opera", "exploration", "frontier", "political"],
  cozy: ["crew-drama", "found-family", "slice-of-life"],
  criminal: ["crime", "smuggling", "black-market", "underground"],
  professionTags: {
    Criminal: ["crime", "criminal", "noir"],
    Medical: ["medical", "biotech"],
    Biotech: ["biotech", "gene-tech"],
    Military: ["military", "veteran", "war"],
    Security: ["security", "mercenary"],
    Corporate: ["corporate", "megacorp", "dystopia"],
    Technology: ["ai", "tech", "hacking"],
    Information: ["espionage", "data", "noir"],
    Science: ["exploration", "discovery"],
    Exploration: ["exploration", "frontier"],
    "Shipping & transit": ["space-opera", "crew-drama"],
    Salvage: ["survival", "frontier"],
    Settlement: ["frontier", "colony"],
    Creative: ["art", "underground"],
    Media: ["journalism", "resistance"],
    Communications: ["tech", "espionage"],
    Logistics: ["working-class", "survival"],
    Transit: ["working-class"],
    Education: ["coming-of-age", "academia"],
  },
};
