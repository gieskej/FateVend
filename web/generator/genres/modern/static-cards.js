// genres/modern/static-cards.js
// Genre lore — imported into STATIC_CARDS_BY_GENRE (ui-data.js) and injected
// by the AI Dungeon importer as typed Story Cards alongside the generated
// NPC cards (also included in Copy/Download via buildScenarioPayload()).
// Each array holds { name, triggers, entry } objects:
//   name     — the story card's title
//   triggers — comma-separated keyword string AI Dungeon matches against
//   entry    — the lore text itself
// Array name -> AI Dungeon card type (see aidungeon-importer.mjs):
//   STATIC_CHARACTERS -> character   STATIC_CLASSES  -> class
//   STATIC_RACES      -> race        STATIC_LOCATIONS -> location
//   STATIC_FACTIONS   -> faction     STATIC_CUSTOM    -> custom
// May be empty — not every genre populates every category.

export const STATIC_CHARACTERS = [];

export const STATIC_CLASSES = [];

export const STATIC_RACES = [];

export const STATIC_LOCATIONS = [];

export const STATIC_FACTIONS = [];

export const STATIC_CUSTOM = [];
