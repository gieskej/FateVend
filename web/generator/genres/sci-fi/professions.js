// genres/sci-fi/professions.js
// Each profession carries: title, industry, economicTier (1-5),
// statAffinity (optional — stats that make this profession more likely),
// sentiments (pool to draw from randomly)
//
// Economic tiers:
//   1 = below the line / grey-market survival
//   2 = wage-serf / corp labour
//   3 = independent contractor / working class
//   4 = corporate citizen / professional class
//   5 = elite / executive
//
// minAge — optional; engine.js's profPool filter drops this profession for a
//   character younger than this (falling back to the unfiltered pool if that
//   would leave nothing). Omitted everywhere except professions that
//   genuinely require years the character wouldn't have had yet — a
//   completed professional degree, veteran status (served, then left), or
//   an executive-level career. Deliberately NOT added to hacking/art/
//   journalism/manual-labor/criminal roles — teenage prodigies fit the
//   genre fine there.
// maxAge — optional; same filter, opposite direction: drops this profession
//   for a character older than this. Currently only Student (a role you age
//   out of, unlike the minAge entries above, which you age into).

import { SENTIMENTS } from "../../common/sentiments.js";

export const PROFESSIONS = [
  // ── CREW & HAULERS ────────────────────────────────────────────────────────
  {
    title: "Freighter Pilot",
    industry: "Shipping & transit",
    economicTier: 3,
    statAffinity: { dexterity: 1.4, wisdom: 1.2 },
    sentiments: ["proud", "quietly satisfied", "burned out", "indifferent"],
    iconPrompt:
      "A seasoned freighter pilot navigating through asteroid fields, wearing a weathered flight suit and goggles.",
    iconPath: "generator/genres/sci-fi/icons/PROFESSIONS#freighter_pilot.webp",
  },
  {
    title: "Ship Engineer",
    industry: "Shipping & transit",
    economicTier: 3,
    statAffinity: { intelligence: 1.3, dexterity: 1.3 },
    sentiments: ["proud", "passionate", "quietly satisfied", "burned out"],
    iconPrompt:
      "A ship engineer working on a spaceship engine, wearing a mechanic suit with tools.",
    iconPath: "generator/genres/sci-fi/icons/PROFESSIONS#ship_engineer.webp",
  },
  {
    title: "Cargo Hauler",
    industry: "Logistics",
    economicTier: 2,
    statAffinity: { constitution: 1.3, strength: 1.2 },
    sentiments: ["resentful", "indifferent", "burned out", "desperate"],
    iconPrompt:
      "A cargo hauler loading goods onto a freighter, wearing a utilitarian work suit.",
    iconPath: "generator/genres/sci-fi/icons/PROFESSIONS#cargo_hauler.webp",
  },
  {
    title: "Navigation Specialist",
    industry: "Shipping & transit",
    economicTier: 3,
    statAffinity: { intelligence: 1.4, wisdom: 1.2 },
    sentiments: ["proud", "quietly satisfied", "indifferent", "passionate"],
    iconPrompt:
      "A navigation specialist plotting a course through a star map, wearing a command uniform with a headset.",
    iconPath:
      "generator/genres/sci-fi/icons/PROFESSIONS#navigation_specialist.webp",
  },
  {
    title: "Shuttle Operator",
    industry: "Transit",
    economicTier: 2,
    statAffinity: { dexterity: 1.2 },
    sentiments: ["indifferent", "burned out", "quietly satisfied", "resentful"],
    iconPrompt:
      "A shuttle operator guiding a small spacecraft through docking ports, wearing a transit uniform.",
    iconPath: "generator/genres/sci-fi/icons/PROFESSIONS#shuttle_operator.webp",
  },

  // ── SECURITY & COMBAT ─────────────────────────────────────────────────────
  {
    title: "Corporate Mercenary",
    industry: "Security",
    economicTier: 3,
    statAffinity: { strength: 1.5, constitution: 1.3 },
    sentiments: ["proud", "indifferent", "resentful", "burned out"],
    iconPrompt:
      "A corporate mercenary in a tactical uniform, carrying a high-tech weapon.",
    iconPath:
      "generator/genres/sci-fi/icons/PROFESSIONS#corporate_mercenary.webp",
  },
  {
    title: "Bounty Hunter",
    industry: "Security",
    economicTier: 3,
    statAffinity: { strength: 1.3, dexterity: 1.2, wisdom: 1.2 },
    sentiments: ["proud", "indifferent", "passionate", "quietly satisfied"],
    iconPrompt: "A bounty hunter in a rugged suit, holding a tracking device.",
    iconPath: "generator/genres/sci-fi/icons/PROFESSIONS#bounty_hunter.webp",
  },
  {
    title: "Station Security",
    industry: "Security",
    economicTier: 2,
    statAffinity: { strength: 1.2, constitution: 1.2 },
    sentiments: ["indifferent", "burned out", "resentful", "quietly satisfied"],
    iconPrompt:
      "A station security officer on patrol, wearing a standard security uniform with a radio.",
    iconPath: "generator/genres/sci-fi/icons/PROFESSIONS#station_security.webp",
  },
  {
    title: "Military Veteran",
    industry: "Military",
    economicTier: 2,
    minAge: 26,
    statAffinity: { strength: 1.4, constitution: 1.3, wisdom: 1.1 },
    sentiments: ["lost", "proud", "resentful", "burned out"],
    iconPrompt:
      "A military veteran in a worn uniform, carrying a service medal.",
    iconPath: "generator/genres/sci-fi/icons/PROFESSIONS#military_veteran.webp",
  },
  {
    title: "Combat Medic",
    industry: "Medical",
    economicTier: 3,
    statAffinity: { wisdom: 1.3, dexterity: 1.3, constitution: 1.2 },
    sentiments: ["proud", "burned out", "passionate", "quietly satisfied"],
    iconPrompt:
      "A combat medic in a medical uniform, tending to a wounded soldier.",
    iconPath: "generator/genres/sci-fi/icons/PROFESSIONS#combat_medic.webp",
  },

  // ── TECH & DATA ───────────────────────────────────────────────────────────
  {
    title: "Hacker / Netrunner",
    industry: "Criminal",
    economicTier: 3,
    statAffinity: { intelligence: 1.6, dexterity: 1.2 },
    sentiments: ["passionate", "proud", "indifferent", "quietly satisfied"],
    iconPrompt: "A hacker in a dark room, surrounded by screens and cables.",
    iconPath: "generator/genres/sci-fi/icons/PROFESSIONS#hacker_netrunner.webp",
  },
  {
    title: "AI Technician",
    industry: "Technology",
    economicTier: 4,
    statAffinity: { intelligence: 1.5, wisdom: 1.2 },
    sentiments: ["passionate", "proud", "indifferent", "burned out"],
    iconPrompt:
      "An AI technician working on a holographic interface, wearing a tech uniform.",
    iconPath: "generator/genres/sci-fi/icons/PROFESSIONS#ai_technician.webp",
  },
  {
    title: "Data Broker",
    industry: "Information",
    economicTier: 4,
    statAffinity: { intelligence: 1.4, charisma: 1.3, wisdom: 1.1 },
    sentiments: ["quietly satisfied", "indifferent", "proud", "burned out"],
    iconPrompt: "A data broker in a sleek office, surrounded by data streams.",
    iconPath: "generator/genres/sci-fi/icons/PROFESSIONS#data_broker.webp",
  },
  {
    title: "Systems Analyst",
    industry: "Technology",
    economicTier: 4,
    statAffinity: { intelligence: 1.4, dexterity: 1.1 },
    sentiments: [
      "indifferent",
      "quietly satisfied",
      "burned out",
      "passionate",
    ],
    iconPrompt:
      "A systems analyst working at a console, reviewing data streams.",
    iconPath: "generator/genres/sci-fi/icons/PROFESSIONS#systems_analyst.webp",
  },
  {
    title: "Comm Tech",
    industry: "Communications",
    economicTier: 3,
    statAffinity: { intelligence: 1.2, dexterity: 1.2 },
    sentiments: ["indifferent", "burned out", "quietly satisfied", "resentful"],
    iconPrompt:
      "A comm tech working on communication equipment, wearing a tech uniform.",
    iconPath: "generator/genres/sci-fi/icons/PROFESSIONS#comm_tech.webp",
  },
  {
    title: "Pleasure Droid Maintenance Tech",
    industry: "Entertainment",
    economicTier: 3,
    statAffinity: { intelligence: 1.1, dexterity: 1.2 },
    sentiments: [
      "indifferent",
      "burned out",
      "resentful",
      "ashamed",
      "desperate",
    ],
    iconPrompt:
      "A maintenance tech cleaning a pleasure droid, wearing a tech uniform and rubber gloves, disgusted.",
    iconPath:
      "generator/genres/sci-fi/icons/PROFESSIONS#pleasure_droid_tech.webp",
  },

  // ── MEDICAL ───────────────────────────────────────────────────────────────
  {
    title: "Street Doc",
    industry: "Medical",
    economicTier: 3,
    statAffinity: { intelligence: 1.4, dexterity: 1.3, wisdom: 1.2 },
    sentiments: ["passionate", "burned out", "proud", "resentful"],
    iconPrompt:
      "A street doc working in a makeshift clinic, wearing a medical uniform.",
    iconPath: "generator/genres/sci-fi/icons/PROFESSIONS#street_doc.webp",
  },
  {
    title: "Corporate Physician",
    industry: "Medical",
    economicTier: 4,
    minAge: 24,
    statAffinity: { intelligence: 1.4, wisdom: 1.3 },
    sentiments: ["indifferent", "quietly satisfied", "burned out", "proud"],
    iconPrompt:
      "A corporate physician in a sleek office, wearing a medical uniform.",
    iconPath:
      "generator/genres/sci-fi/icons/PROFESSIONS#corporate_physician.webp",
  },
  {
    title: "Gene-Tech",
    industry: "Biotech",
    economicTier: 4,
    minAge: 24,
    statAffinity: { intelligence: 1.5, dexterity: 1.2 },
    sentiments: ["passionate", "proud", "indifferent", "quietly satisfied"],
    iconPrompt: "A gene-tech working on genetic material, wearing a lab coat.",
    iconPath: "generator/genres/sci-fi/icons/PROFESSIONS#gene_tech.webp",
  },
  {
    title: "Psych-Tech",
    industry: "Medical",
    economicTier: 4,
    minAge: 24,
    statAffinity: { wisdom: 1.5, intelligence: 1.3 },
    sentiments: [
      "passionate",
      "burned out",
      "quietly satisfied",
      "indifferent",
    ],
    iconPrompt: "A psych-tech working on a patient, wearing a medical uniform.",
    iconPath: "generator/genres/sci-fi/icons/PROFESSIONS#psych_tech.webp",
  },

  // ── CRIMINAL ──────────────────────────────────────────────────────────────
  {
    title: "Smuggler",
    industry: "Criminal",
    economicTier: 3,
    statAffinity: { dexterity: 1.3, charisma: 1.2, wisdom: 1.1 },
    sentiments: ["proud", "indifferent", "quietly satisfied", "desperate"],
    iconPrompt: "A smuggler in a dark room, surrounded by cargo.",
    iconPath: "generator/genres/sci-fi/icons/PROFESSIONS#smuggler.webp",
  },
  {
    title: "Black-Market Dealer",
    industry: "Criminal",
    economicTier: 3,
    statAffinity: { charisma: 1.4, intelligence: 1.2 },
    sentiments: ["proud", "quietly satisfied", "indifferent", "desperate"],
    iconPrompt: "A black-market dealer in a dark room, surrounded by goods.",
    iconPath:
      "generator/genres/sci-fi/icons/PROFESSIONS#black_market_dealer.webp",
  },
  {
    title: "Corporate Spy",
    industry: "Criminal",
    economicTier: 4,
    minAge: 24,
    statAffinity: { charisma: 1.4, intelligence: 1.3, wisdom: 1.2 },
    sentiments: ["indifferent", "quietly satisfied", "burned out", "proud"],
    iconPrompt: "A corporate spy in a dark room, surrounded by documents.",
    iconPath: "generator/genres/sci-fi/icons/PROFESSIONS#corporate_spy.webp",
  },
  {
    title: "Fixer",
    industry: "Criminal",
    economicTier: 4,
    minAge: 26,
    statAffinity: { intelligence: 1.4, charisma: 1.4, wisdom: 1.2 },
    sentiments: ["proud", "quietly satisfied", "indifferent"],
    iconPrompt: "A fixer in a dark room, surrounded by documents.",
    iconPath: "generator/genres/sci-fi/icons/PROFESSIONS#fixer.webp",
  },
  {
    title: "Augmentation Bootlegger",
    industry: "Criminal",
    economicTier: 3,
    statAffinity: { intelligence: 1.3, dexterity: 1.2 },
    sentiments: ["proud", "passionate", "indifferent", "desperate"],
    iconPrompt:
      "An augmentation bootlegger in a dark room, surrounded by augmented parts.",
    iconPath:
      "generator/genres/sci-fi/icons/PROFESSIONS#augmentation_bootlegger.webp",
  },
  {
    title: "Memory Thief",
    industry: "Criminal",
    economicTier: 3,
    statAffinity: { dexterity: 1.4, intelligence: 1.3 },
    sentiments: ["indifferent", "quietly satisfied", "ashamed", "proud"],
    iconPrompt: "A memory thief in a dark room, surrounded by memory chips.",
    iconPath: "generator/genres/sci-fi/icons/PROFESSIONS#memory_thief.webp",
  },
  {
    title: "Undercity Enforcer",
    industry: "Criminal",
    economicTier: 2,
    statAffinity: { strength: 1.5, constitution: 1.3 },
    sentiments: ["proud", "indifferent", "resentful", "ashamed"],
    iconPrompt:
      "An undercity enforcer in a dark room, surrounded by criminals.",
    iconPath:
      "generator/genres/sci-fi/icons/PROFESSIONS#undercity_enforcer.webp",
  },

  // ── CORPORATE ─────────────────────────────────────────────────────────────
  {
    title: "Mid-Level Corporate Suit",
    industry: "Corporate",
    economicTier: 4,
    minAge: 22,
    statAffinity: { charisma: 1.3, intelligence: 1.2 },
    sentiments: ["indifferent", "burned out", "quietly satisfied", "resentful"],
    iconPrompt:
      "A mid-level corporate suit in a dark room, surrounded by documents.",
    iconPath: "generator/genres/sci-fi/icons/PROFESSIONS#corporate_suit.webp",
  },
  {
    title: "Compliance Officer",
    industry: "Corporate",
    economicTier: 4,
    minAge: 24,
    statAffinity: { wisdom: 1.3, intelligence: 1.2 },
    sentiments: ["indifferent", "burned out", "quietly satisfied", "ashamed"],
    iconPrompt: "A compliance officer in a dark room, surrounded by documents.",
    iconPath:
      "generator/genres/sci-fi/icons/PROFESSIONS#compliance_officer.webp",
  },
  {
    title: "Propaganda Specialist",
    industry: "Corporate",
    economicTier: 4,
    statAffinity: { charisma: 1.5, intelligence: 1.2 },
    sentiments: ["indifferent", "ashamed", "quietly satisfied", "burned out"],
    iconPrompt:
      "A propaganda specialist in a dark room, surrounded by propaganda materials.",
    iconPath:
      "generator/genres/sci-fi/icons/PROFESSIONS#propaganda_specialist.webp",
  },

  // ── SCIENCE ───────────────────────────────────────────────────────────────
  {
    title: "Terraforming Engineer",
    industry: "Science",
    economicTier: 3,
    minAge: 22,
    statAffinity: { intelligence: 1.4, wisdom: 1.2, constitution: 1.1 },
    sentiments: ["passionate", "proud", "burned out", "quietly satisfied"],
    iconPrompt:
      "A terraforming engineer in a dark room, surrounded by engineering tools.",
    iconPath:
      "generator/genres/sci-fi/icons/PROFESSIONS#terraforming_engineer.webp",
  },
  {
    title: "Xenobiologist",
    industry: "Science",
    economicTier: 3,
    minAge: 24,
    statAffinity: { intelligence: 1.5, wisdom: 1.3 },
    sentiments: ["passionate", "proud", "indifferent", "quietly satisfied"],
    iconPrompt:
      "A xenobiologist in a dark room, surrounded by biological samples.",
    iconPath: "generator/genres/sci-fi/icons/PROFESSIONS#xenobiologist.webp",
  },
  {
    title: "Deep-Space Scout",
    industry: "Exploration",
    economicTier: 3,
    statAffinity: { constitution: 1.3, wisdom: 1.2, dexterity: 1.1 },
    sentiments: ["passionate", "proud", "indifferent", "burned out"],
    iconPrompt:
      "A deep-space scout in a dark room, surrounded by exploration tools.",
    iconPath: "generator/genres/sci-fi/icons/PROFESSIONS#deep_space_scout.webp",
  },
  {
    title: "Colonist",
    industry: "Settlement",
    economicTier: 2,
    statAffinity: { constitution: 1.3, strength: 1.2, wisdom: 1.1 },
    sentiments: ["proud", "desperate", "quietly satisfied", "resentful"],
    iconPrompt: "A colonist in a dark room, surrounded by settlement tools.",
    iconPath: "generator/genres/sci-fi/icons/PROFESSIONS#colonist.webp",
  },
  {
    title: "Salvager",
    industry: "Salvage",
    economicTier: 2,
    statAffinity: { dexterity: 1.3, wisdom: 1.2, constitution: 1.1 },
    sentiments: ["indifferent", "quietly satisfied", "desperate", "proud"],
    iconPrompt: "A salvager in a dark room, surrounded by salvaged items.",
    iconPath: "generator/genres/sci-fi/icons/PROFESSIONS#salvager.webp",
  },

  // ── ARTS ──────────────────────────────────────────────────────────────────
  {
    title: "Netspace Artist",
    industry: "Creative",
    economicTier: 2,
    statAffinity: { intelligence: 1.3, charisma: 1.3 },
    sentiments: ["passionate", "desperate", "burned out", "quietly satisfied"],
    iconPrompt: "A netspace artist in a dark room, surrounded by digital art.",
    iconPath: "generator/genres/sci-fi/icons/PROFESSIONS#netspace_artist.webp",
  },
  {
    title: "Underground Journalist",
    industry: "Media",
    economicTier: 2,
    statAffinity: { intelligence: 1.3, charisma: 1.2, wisdom: 1.2 },
    sentiments: ["passionate", "resentful", "burned out", "proud"],
    iconPrompt:
      "An underground journalist in a dark room, surrounded by documents.",
    iconPath:
      "generator/genres/sci-fi/icons/PROFESSIONS#underground_journalist.webp",
  },

  // ── EDUCATION ─────────────────────────────────────────────────────────────
  {
    title: "Student",
    industry: "Education",
    economicTier: 2,
    maxAge: 25,
    statAffinity: { intelligence: 1.2, wisdom: 1.1 },
    sentiments: ["passionate", "burned out", "desperate", "quietly satisfied"],
    iconPrompt:
      "A student in a lecture hall or study pod, surrounded by holographic textbooks and datapads.",
    iconPath: "generator/genres/sci-fi/icons/PROFESSIONS#student.webp",
  },

  // ── ELITE ─────────────────────────────────────────────────────────────────
  {
    title: "Megacorp Executive",
    industry: "Corporate",
    economicTier: 5,
    minAge: 32,
    statAffinity: { charisma: 1.4, intelligence: 1.3, wisdom: 1.2 },
    sentiments: ["proud", "indifferent", "quietly satisfied", "burned out"],
    iconPrompt:
      "A megacorp executive in a dark room, surrounded by corporate documents.",
    iconPath:
      "generator/genres/sci-fi/icons/PROFESSIONS#megacorp_executive.webp",
  },
  {
    title: "AI Architect",
    industry: "Technology",
    economicTier: 5,
    minAge: 30,
    statAffinity: { intelligence: 1.6, wisdom: 1.2 },
    sentiments: ["passionate", "proud", "indifferent", "quietly satisfied"],
    iconPrompt: "An AI architect in a dark room, surrounded by AI components.",
    iconPath: "generator/genres/sci-fi/icons/PROFESSIONS#ai_architect.webp",
  },
  {
    title: "Orbital Mogul",
    industry: "Corporate",
    economicTier: 5,
    minAge: 32,
    statAffinity: { charisma: 1.5, intelligence: 1.3 },
    sentiments: ["proud", "indifferent", "quietly satisfied"],
    iconPrompt:
      "An orbital mogul in a dark room, surrounded by orbital structures.",
    iconPath: "generator/genres/sci-fi/icons/PROFESSIONS#orbital_mogul.webp",
  },
  // ── NSFW ─────────────────────────────────────────────────────────────────
  {
    title: "Sex Worker",
    industry: "Entertainment",
    economicTier: 2,
    nsfw: true,
    statAffinity: { charisma: 1.4, intelligence: 0.9, wisdom: 0.8 },
    sentiments: ["proud", "indifferent", "quietly satisfied", "burned out"],
    iconPrompt:
      "A female sex worker wearing a skimpy outfit outside a dimly lit club, surrounded by neon lights.",
    iconPath: "generator/genres/sci-fi/icons/PROFESSIONS#sex_worker.webp",
  },
];
