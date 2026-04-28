// genres/sci-fi/professions.js
// Each profession carries: title, industry, economicTier (1-5),
// statAffinity (stats that make this profession more likely),
// sentiments (pool to draw from randomly)
//
// Economic tiers:
//   1 = below the line / grey-market survival
//   2 = wage-serf / corp labour
//   3 = independent contractor / working class
//   4 = corporate citizen / professional class
//   5 = elite / executive

export const SENTIMENTS = [
  'proud', 'resentful', 'indifferent', 'passionate',
  'burned out', 'desperate', 'quietly satisfied', 'ashamed', 'lost',
];

export const PROFESSIONS = [

  // ── CREW & HAULERS ────────────────────────────────────────────────────────
  {
    title: 'Freighter pilot',
    industry: 'Shipping & transit',
    economicTier: 3,
    statAffinity: { dexterity: 1.4, wisdom: 1.2 },
    sentiments: ['proud', 'quietly satisfied', 'burned out', 'indifferent'],
  },
  {
    title: 'Ship engineer',
    industry: 'Shipping & transit',
    economicTier: 3,
    statAffinity: { intelligence: 1.3, dexterity: 1.3 },
    sentiments: ['proud', 'passionate', 'quietly satisfied', 'burned out'],
  },
  {
    title: 'Cargo hauler',
    industry: 'Logistics',
    economicTier: 2,
    statAffinity: { constitution: 1.3, strength: 1.2 },
    sentiments: ['resentful', 'indifferent', 'burned out', 'desperate'],
  },
  {
    title: 'Navigation specialist',
    industry: 'Shipping & transit',
    economicTier: 3,
    statAffinity: { intelligence: 1.4, wisdom: 1.2 },
    sentiments: ['proud', 'quietly satisfied', 'indifferent', 'passionate'],
  },
  {
    title: 'Shuttle operator',
    industry: 'Transit',
    economicTier: 2,
    statAffinity: { dexterity: 1.2 },
    sentiments: ['indifferent', 'burned out', 'quietly satisfied', 'resentful'],
  },

  // ── SECURITY & COMBAT ─────────────────────────────────────────────────────
  {
    title: 'Corporate mercenary',
    industry: 'Security',
    economicTier: 3,
    statAffinity: { strength: 1.5, constitution: 1.3 },
    sentiments: ['proud', 'indifferent', 'resentful', 'burned out'],
  },
  {
    title: 'Bounty hunter',
    industry: 'Security',
    economicTier: 3,
    statAffinity: { strength: 1.3, dexterity: 1.2, wisdom: 1.2 },
    sentiments: ['proud', 'indifferent', 'passionate', 'quietly satisfied'],
  },
  {
    title: 'Station security',
    industry: 'Security',
    economicTier: 2,
    statAffinity: { strength: 1.2, constitution: 1.2 },
    sentiments: ['indifferent', 'burned out', 'resentful', 'quietly satisfied'],
  },
  {
    title: 'Military veteran',
    industry: 'Military',
    economicTier: 2,
    statAffinity: { strength: 1.4, constitution: 1.3, wisdom: 1.1 },
    sentiments: ['lost', 'proud', 'resentful', 'burned out'],
  },
  {
    title: 'Combat medic',
    industry: 'Medical',
    economicTier: 3,
    statAffinity: { wisdom: 1.3, dexterity: 1.3, constitution: 1.2 },
    sentiments: ['proud', 'burned out', 'passionate', 'quietly satisfied'],
  },

  // ── TECH & DATA ───────────────────────────────────────────────────────────
  {
    title: 'Hacker / Netrunner',
    industry: 'Criminal',
    economicTier: 3,
    statAffinity: { intelligence: 1.6, dexterity: 1.2 },
    sentiments: ['passionate', 'proud', 'indifferent', 'quietly satisfied'],
  },
  {
    title: 'AI technician',
    industry: 'Technology',
    economicTier: 4,
    statAffinity: { intelligence: 1.5, wisdom: 1.2 },
    sentiments: ['passionate', 'proud', 'indifferent', 'burned out'],
  },
  {
    title: 'Data broker',
    industry: 'Information',
    economicTier: 4,
    statAffinity: { intelligence: 1.4, charisma: 1.3, wisdom: 1.1 },
    sentiments: ['quietly satisfied', 'indifferent', 'proud', 'burned out'],
  },
  {
    title: 'Systems analyst',
    industry: 'Technology',
    economicTier: 4,
    statAffinity: { intelligence: 1.4, dexterity: 1.1 },
    sentiments: ['indifferent', 'quietly satisfied', 'burned out', 'passionate'],
  },
  {
    title: 'Comm tech',
    industry: 'Communications',
    economicTier: 3,
    statAffinity: { intelligence: 1.2, dexterity: 1.2 },
    sentiments: ['indifferent', 'burned out', 'quietly satisfied', 'resentful'],
  },

  // ── MEDICAL ───────────────────────────────────────────────────────────────
  {
    title: 'Street doc',
    industry: 'Medical',
    economicTier: 3,
    statAffinity: { intelligence: 1.4, dexterity: 1.3, wisdom: 1.2 },
    sentiments: ['passionate', 'burned out', 'proud', 'resentful'],
  },
  {
    title: 'Corporate physician',
    industry: 'Medical',
    economicTier: 4,
    statAffinity: { intelligence: 1.4, wisdom: 1.3 },
    sentiments: ['indifferent', 'quietly satisfied', 'burned out', 'proud'],
  },
  {
    title: 'Gene-tech',
    industry: 'Biotech',
    economicTier: 4,
    statAffinity: { intelligence: 1.5, dexterity: 1.2 },
    sentiments: ['passionate', 'proud', 'indifferent', 'quietly satisfied'],
  },
  {
    title: 'Psych-tech',
    industry: 'Medical',
    economicTier: 4,
    statAffinity: { wisdom: 1.5, intelligence: 1.3 },
    sentiments: ['passionate', 'burned out', 'quietly satisfied', 'indifferent'],
  },

  // ── CRIMINAL ──────────────────────────────────────────────────────────────
  {
    title: 'Smuggler',
    industry: 'Criminal',
    economicTier: 3,
    statAffinity: { dexterity: 1.3, charisma: 1.2, wisdom: 1.1 },
    sentiments: ['proud', 'indifferent', 'quietly satisfied', 'desperate'],
  },
  {
    title: 'Black-market dealer',
    industry: 'Criminal',
    economicTier: 3,
    statAffinity: { charisma: 1.4, intelligence: 1.2 },
    sentiments: ['proud', 'quietly satisfied', 'indifferent', 'desperate'],
  },
  {
    title: 'Corporate spy',
    industry: 'Criminal',
    economicTier: 4,
    statAffinity: { charisma: 1.4, intelligence: 1.3, wisdom: 1.2 },
    sentiments: ['indifferent', 'quietly satisfied', 'burned out', 'proud'],
  },
  {
    title: 'Fixer',
    industry: 'Criminal',
    economicTier: 4,
    statAffinity: { intelligence: 1.4, charisma: 1.4, wisdom: 1.2 },
    sentiments: ['proud', 'quietly satisfied', 'indifferent'],
  },
  {
    title: 'Augmentation bootlegger',
    industry: 'Criminal',
    economicTier: 3,
    statAffinity: { intelligence: 1.3, dexterity: 1.2 },
    sentiments: ['proud', 'passionate', 'indifferent', 'desperate'],
  },
  {
    title: 'Memory thief',
    industry: 'Criminal',
    economicTier: 3,
    statAffinity: { dexterity: 1.4, intelligence: 1.3 },
    sentiments: ['indifferent', 'quietly satisfied', 'ashamed', 'proud'],
  },
  {
    title: 'Undercity enforcer',
    industry: 'Criminal',
    economicTier: 2,
    statAffinity: { strength: 1.5, constitution: 1.3 },
    sentiments: ['proud', 'indifferent', 'resentful', 'ashamed'],
  },

  // ── CORPORATE ─────────────────────────────────────────────────────────────
  {
    title: 'Mid-level corporate suit',
    industry: 'Corporate',
    economicTier: 4,
    statAffinity: { charisma: 1.3, intelligence: 1.2 },
    sentiments: ['indifferent', 'burned out', 'quietly satisfied', 'resentful'],
  },
  {
    title: 'Compliance officer',
    industry: 'Corporate',
    economicTier: 4,
    statAffinity: { wisdom: 1.3, intelligence: 1.2 },
    sentiments: ['indifferent', 'burned out', 'quietly satisfied', 'ashamed'],
  },
  {
    title: 'Propaganda specialist',
    industry: 'Corporate',
    economicTier: 4,
    statAffinity: { charisma: 1.5, intelligence: 1.2 },
    sentiments: ['indifferent', 'ashamed', 'quietly satisfied', 'burned out'],
  },

  // ── SCIENCE ───────────────────────────────────────────────────────────────
  {
    title: 'Terraforming engineer',
    industry: 'Science',
    economicTier: 3,
    statAffinity: { intelligence: 1.4, wisdom: 1.2, constitution: 1.1 },
    sentiments: ['passionate', 'proud', 'burned out', 'quietly satisfied'],
  },
  {
    title: 'Xenobiologist',
    industry: 'Science',
    economicTier: 3,
    statAffinity: { intelligence: 1.5, wisdom: 1.3 },
    sentiments: ['passionate', 'proud', 'indifferent', 'quietly satisfied'],
  },
  {
    title: 'Deep-space scout',
    industry: 'Exploration',
    economicTier: 3,
    statAffinity: { constitution: 1.3, wisdom: 1.2, dexterity: 1.1 },
    sentiments: ['passionate', 'proud', 'indifferent', 'burned out'],
  },
  {
    title: 'Colonist',
    industry: 'Settlement',
    economicTier: 2,
    statAffinity: { constitution: 1.3, strength: 1.2, wisdom: 1.1 },
    sentiments: ['proud', 'desperate', 'quietly satisfied', 'resentful'],
  },
  {
    title: 'Salvager',
    industry: 'Salvage',
    economicTier: 2,
    statAffinity: { dexterity: 1.3, wisdom: 1.2, constitution: 1.1 },
    sentiments: ['indifferent', 'quietly satisfied', 'desperate', 'proud'],
  },

  // ── ARTS ──────────────────────────────────────────────────────────────────
  {
    title: 'Netspace artist',
    industry: 'Creative',
    economicTier: 2,
    statAffinity: { intelligence: 1.3, charisma: 1.3 },
    sentiments: ['passionate', 'desperate', 'burned out', 'quietly satisfied'],
  },
  {
    title: 'Underground journalist',
    industry: 'Media',
    economicTier: 2,
    statAffinity: { intelligence: 1.3, charisma: 1.2, wisdom: 1.2 },
    sentiments: ['passionate', 'resentful', 'burned out', 'proud'],
  },

  // ── ELITE ─────────────────────────────────────────────────────────────────
  {
    title: 'Megacorp executive',
    industry: 'Corporate',
    economicTier: 5,
    statAffinity: { charisma: 1.4, intelligence: 1.3, wisdom: 1.2 },
    sentiments: ['proud', 'indifferent', 'quietly satisfied', 'burned out'],
  },
  {
    title: 'AI architect',
    industry: 'Technology',
    economicTier: 5,
    statAffinity: { intelligence: 1.6, wisdom: 1.2 },
    sentiments: ['passionate', 'proud', 'indifferent', 'quietly satisfied'],
  },
  {
    title: 'Orbital mogul',
    industry: 'Corporate',
    economicTier: 5,
    statAffinity: { charisma: 1.5, intelligence: 1.3 },
    sentiments: ['proud', 'indifferent', 'quietly satisfied'],
  },
];
