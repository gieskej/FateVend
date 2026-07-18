// genres/paleolithic/professions.js
// Tribal roles — the work a person does for their band. Each entry:
//   title, industry     — display title + industry (industry must match
//                          TAG_POOLS.professionTags keys in settings.js)
//   economicTier         — 1-5, maps to tribal status (1=outcast, 5=shaman/chief)
//   statAffinity         — optional; stats that make this profession more likely
//   sentiments           — pool of feelings-about-the-job drawn from randomly
//   iconPrompt, iconPath — slot-machine reel icon

import { SENTIMENTS } from "../../common/sentiments.js";

export const PROFESSIONS = [
  // ── HUNTERS ───────────────────────────────────────────────────────────────
  {
    title: "Hunter",
    industry: "Hunting",
    economicTier: 3,
    statAffinity: { strength: 1.4, constitution: 1.3, dexterity: 1.2 },
    sentiments: ["proud", "passionate", "quietly satisfied", "burned out"],
    iconPrompt:
      "paleolithic hunter crouching with wooden spear in grassland, ready to throw, focused expression, morning light",
    iconPath: "generator/genres/paleolithic/icons/PROFESSIONS#hunter.webp",
  },
  {
    title: "Tracker",
    industry: "Hunting",
    economicTier: 3,
    statAffinity: { wisdom: 1.4, dexterity: 1.3, intelligence: 1.2 },
    sentiments: ["passionate", "proud", "quietly satisfied", "indifferent"],
    iconPrompt:
      "paleolithic tracker crouching over animal tracks in soft earth, reading the ground, forest background, thoughtful expression",
    iconPath: "generator/genres/paleolithic/icons/PROFESSIONS#tracker.webp",
  },
  {
    title: "Pit Trap Builder",
    industry: "Hunting",
    economicTier: 3,
    statAffinity: { intelligence: 1.3, strength: 1.2, wisdom: 1.1 },
    sentiments: ["quietly satisfied", "proud", "indifferent", "burned out"],
    iconPrompt:
      "paleolithic trap builder digging a camouflaged pit trap in open ground, stakes and brush piled nearby, working expression",
    iconPath:
      "generator/genres/paleolithic/icons/PROFESSIONS#pit_trap_builder.webp",
  },

  // ── GATHERERS & FORAGERS ──────────────────────────────────────────────────
  {
    title: "Gatherer",
    industry: "Foraging",
    economicTier: 2,
    statAffinity: { intelligence: 1.3, wisdom: 1.2, constitution: 1.1 },
    sentiments: ["quietly satisfied", "passionate", "indifferent", "resentful"],
    iconPrompt:
      "paleolithic gatherer filling a woven basket with berries and roots in a forest clearing, focused and efficient, warm light",
    iconPath: "generator/genres/paleolithic/icons/PROFESSIONS#gatherer.webp",
  },
  {
    title: "Fisher",
    industry: "Foraging",
    economicTier: 2,
    statAffinity: { dexterity: 1.3, wisdom: 1.2, constitution: 1.1 },
    sentiments: [
      "quietly satisfied",
      "indifferent",
      "passionate",
      "burned out",
    ],
    iconPrompt:
      "paleolithic fisher standing knee-deep in river, wooden spear poised over water, waiting motionless, dawn mist on river",
    iconPath: "generator/genres/paleolithic/icons/PROFESSIONS#fisher.webp",
  },

  // ── CRAFTERS ──────────────────────────────────────────────────────────────
  {
    title: "Flint Knapper",
    industry: "Crafting",
    economicTier: 3,
    statAffinity: { dexterity: 1.5, intelligence: 1.3 },
    sentiments: ["proud", "passionate", "quietly satisfied", "indifferent"],
    iconPrompt:
      "paleolithic flint knapper working a large flint nodule with antler tool, stone chips around them, absorbed in precise work, firelight",
    iconPath:
      "generator/genres/paleolithic/icons/PROFESSIONS#flint_knapper.webp",
  },
  {
    title: "Hide Tanner",
    industry: "Crafting",
    economicTier: 2,
    statAffinity: { constitution: 1.2, strength: 1.2, dexterity: 1.1 },
    sentiments: ["indifferent", "quietly satisfied", "resentful", "burned out"],
    iconPrompt:
      "paleolithic hide tanner scraping and stretching a large animal hide over a wooden frame, hard practical work, camp background",
    iconPath: "generator/genres/paleolithic/icons/PROFESSIONS#hide_tanner.webp",
  },
  {
    title: "Bone Carver",
    industry: "Crafting",
    economicTier: 3,
    statAffinity: { dexterity: 1.4, intelligence: 1.3, wisdom: 1.1 },
    sentiments: ["passionate", "quietly satisfied", "proud", "indifferent"],
    iconPrompt:
      "paleolithic bone carver etching animal figures into a long bone with a flint burin, delicate focused work, firelight, surrounded by bone tools",
    iconPath: "generator/genres/paleolithic/icons/PROFESSIONS#bone_carver.webp",
  },
  {
    title: "Basket Weaver",
    industry: "Crafting",
    economicTier: 2,
    statAffinity: { dexterity: 1.3, intelligence: 1.1 },
    sentiments: [
      "quietly satisfied",
      "indifferent",
      "passionate",
      "burned out",
    ],
    iconPrompt:
      "paleolithic basket weaver braiding reeds and grasses into a carrying basket, quick nimble fingers, river bank background",
    iconPath:
      "generator/genres/paleolithic/icons/PROFESSIONS#basket_weaver.webp",
  },

  // ── SPECIALISTS ───────────────────────────────────────────────────────────
  {
    title: "Fire Keeper",
    industry: "Ritual",
    economicTier: 3,
    statAffinity: { wisdom: 1.3, constitution: 1.2, intelligence: 1.1 },
    sentiments: ["passionate", "proud", "quietly satisfied", "lost"],
    iconPrompt:
      "paleolithic fire keeper tending a large central camp fire, feeding it carefully, guardian expression, firelight on face, night",
    iconPath: "generator/genres/paleolithic/icons/PROFESSIONS#fire_keeper.webp",
  },
  {
    title: "Shaman",
    industry: "Ritual",
    economicTier: 5,
    statAffinity: { wisdom: 1.6, intelligence: 1.3, charisma: 1.2 },
    sentiments: ["passionate", "proud", "lost", "burned out"],
    iconPrompt:
      "paleolithic shaman in antler headdress and ochre face paint, arms raised in ceremony, fire and painted cave wall behind, commanding presence",
    iconPath: "generator/genres/paleolithic/icons/PROFESSIONS#shaman.webp",
  },
  {
    title: "Healer",
    industry: "Ritual",
    economicTier: 4,
    statAffinity: { wisdom: 1.4, intelligence: 1.3, constitution: 1.1 },
    sentiments: ["passionate", "burned out", "proud", "quietly satisfied"],
    iconPrompt:
      "paleolithic healer applying herb poultice to a wounded tribe member, medicinal plants laid out carefully, focused and gentle, cave shelter",
    iconPath: "generator/genres/paleolithic/icons/PROFESSIONS#healer.webp",
  },
  {
    title: "Midwife",
    industry: "Ritual",
    allowedGenders: ["woman", "trans_woman"],
    economicTier: 4,
    statAffinity: { wisdom: 1.4, constitution: 1.2, charisma: 1.1 },
    sentiments: ["passionate", "quietly satisfied", "burned out", "proud"],
    iconPrompt:
      "paleolithic midwife assisting at a birth, experienced and calm, tribal shelter, other women nearby, firelight",
    iconPath: "generator/genres/paleolithic/icons/PROFESSIONS#midwife.webp",
  },
  {
    title: "Cave Painter",
    industry: "Ritual",
    economicTier: 3,
    statAffinity: { intelligence: 1.4, dexterity: 1.3, wisdom: 1.2 },
    sentiments: ["passionate", "proud", "quietly satisfied", "indifferent"],
    iconPrompt:
      "paleolithic cave painter applying ochre bison figures on a cave wall by torchlight, mixing pigments in stone bowl, absorbed in sacred work",
    iconPath:
      "generator/genres/paleolithic/icons/PROFESSIONS#cave_painter.webp",
  },
  {
    title: "Storyteller",
    industry: "Knowledge",
    economicTier: 4,
    statAffinity: { charisma: 1.4, wisdom: 1.3, intelligence: 1.2 },
    sentiments: ["passionate", "proud", "quietly satisfied", "burned out"],
    iconPrompt:
      "paleolithic storyteller gesturing dramatically by firelight, wide-eyed tribe members watching, animated expressive face, night circle",
    iconPath: "generator/genres/paleolithic/icons/PROFESSIONS#storyteller.webp",
  },

  // ── WARRIORS & SCOUTS ─────────────────────────────────────────────────────
  {
    title: "Scout",
    industry: "Scouting",
    economicTier: 3,
    statAffinity: { dexterity: 1.4, wisdom: 1.3, constitution: 1.2 },
    sentiments: ["proud", "passionate", "quietly satisfied", "indifferent"],
    iconPrompt:
      "paleolithic scout crouching at hilltop observation point, scanning distant landscape, hand shading eyes, light traveling gear",
    iconPath: "generator/genres/paleolithic/icons/PROFESSIONS#scout.webp",
  },
  {
    title: "Warrior",
    industry: "Combat",
    economicTier: 3,
    statAffinity: { strength: 1.5, constitution: 1.4, dexterity: 1.2 },
    sentiments: ["proud", "passionate", "resentful", "burned out"],
    iconPrompt:
      "paleolithic warrior with bone-tipped spear and hide shield, war paint on face, defensive stance, alert and dangerous",
    iconPath: "generator/genres/paleolithic/icons/PROFESSIONS#warrior.webp",
  },
  {
    title: "Tribe Elder",
    industry: "Leadership",
    economicTier: 4,
    statAffinity: { wisdom: 1.5, charisma: 1.3, intelligence: 1.2 },
    sentiments: ["proud", "quietly satisfied", "burned out", "lost"],
    iconPrompt:
      "paleolithic tribal elder seated at fire council, white-streaked hair, weathered face, listening to younger members with measured expression",
    iconPath: "generator/genres/paleolithic/icons/PROFESSIONS#tribe_elder.webp",
  },
  // ── NSFW ─────────────────────────────────────────────────────────────────
  {
    title: "Camp Companion",
    industry: "Entertainment",
    economicTier: 1,
    nsfw: true,
    statAffinity: { charisma: 1.4, constitution: 1.1 },
    sentiments: ["indifferent", "desperate", "quietly satisfied", "resentful"],
    iconPrompt:
      "paleolithic camp companion in minimal hide clothing, firelit cave, uncertain expression",
    iconPath:
      "generator/genres/paleolithic/icons/PROFESSIONS#camp_companion.webp",
  },
];
