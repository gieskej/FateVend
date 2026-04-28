// genres/sci-fi/tensions.js
// The inciting situation the character is currently in.
// This feeds the scenario Opening and Description heavily.
//
// Each tension carries:
//   id, description, toneTag, statAffinity,
//   economicHint (optional), criminalFlag (bool)

export const TENSIONS = [

  // ── FINANCIAL ─────────────────────────────────────────────────────────────
  {
    id: 'megacorp_debt',
    description: 'Owes a megacorporation a debt with a contract they cannot legally exit',
    toneTag: 'gritty',
    statAffinity: { wisdom: 0.9, constitution: 1.1 },
    criminalFlag: false,
  },
  {
    id: 'syndicate_debt',
    description: 'Owes a station syndicate — the kind that doesn\'t do formal payment plans',
    toneTag: 'gritty',
    statAffinity: { wisdom: 0.8, constitution: 1.1 },
    criminalFlag: true,
  },
  {
    id: 'ship_failing',
    description: 'Their ship or operation is failing — parts, power, or time; probably all three',
    toneTag: 'gritty',
    statAffinity: { constitution: 1.1, intelligence: 1.1 },
    criminalFlag: false,
  },

  // ── CORPORATE / POLITICAL ─────────────────────────────────────────────────
  {
    id: 'corp_termination',
    description: 'A megacorporation has flagged them for "termination" — the legal euphemism is technically accurate',
    toneTag: 'gritty',
    statAffinity: { wisdom: 1.1, constitution: 1.2 },
    criminalFlag: false,
  },
  {
    id: 'resistance_recruitment',
    description: 'Being actively recruited by an anti-corp resistance cell — they haven\'t said no, which is already a decision',
    toneTag: 'dramatic',
    statAffinity: { wisdom: 1.2, charisma: 1.1 },
    criminalFlag: false,
  },
  {
    id: 'leaked_data',
    description: 'Leaked proprietary corporate data and is waiting for the moment someone notices',
    toneTag: 'gritty',
    statAffinity: { intelligence: 1.2, wisdom: 0.9 },
    criminalFlag: true,
  },
  {
    id: 'political_exile',
    description: 'Exiled from their home station for political reasons — the official charge was something procedural',
    toneTag: 'dramatic',
    statAffinity: { charisma: 1.1, wisdom: 1.1 },
    criminalFlag: false,
  },

  // ── CRIMINAL ──────────────────────────────────────────────────────────────
  {
    id: 'contested_cargo',
    description: 'Carrying cargo that two separate factions want back, with completely opposite intentions for it',
    toneTag: 'gritty',
    statAffinity: { dexterity: 1.2, wisdom: 1.1 },
    criminalFlag: true,
  },
  {
    id: 'bounty',
    description: 'There is a bounty on their head — the origin is complicated; the amount is not',
    toneTag: 'gritty',
    statAffinity: { constitution: 1.2, strength: 1.1 },
    criminalFlag: true,
  },
  {
    id: 'heist_something_off',
    description: 'Deep into planning a heist — the crew is solid, the plan is good, and something is off',
    toneTag: 'gritty',
    statAffinity: { intelligence: 1.2, dexterity: 1.1 },
    criminalFlag: true,
  },
  {
    id: 'witnessed_massacre',
    description: 'Witnessed a corporate massacre — civilian casualties, suppressed — and is still deciding what to do with the evidence',
    toneTag: 'gritty',
    statAffinity: { wisdom: 1.2, intelligence: 1.1 },
    criminalFlag: false,
  },

  // ── SURVIVAL ──────────────────────────────────────────────────────────────
  {
    id: 'life_support_failing',
    description: 'Life support is failing — the timeline is specific and not generous',
    toneTag: 'gritty',
    statAffinity: { constitution: 1.2, intelligence: 1.2 },
    criminalFlag: false,
  },
  {
    id: 'aug_rejection_onset',
    description: 'Aug rejection is starting — symptoms currently manageable, treatment prohibitively expensive',
    toneTag: 'dramatic',
    statAffinity: { constitution: 0.9, wisdom: 1.1 },
    criminalFlag: false,
  },
  {
    id: 'void_pursuit',
    description: 'Something in the void is following them — faster ship, gaining, no clear plan for what happens when it catches up',
    toneTag: 'gritty',
    statAffinity: { constitution: 1.2, dexterity: 1.1 },
    criminalFlag: false,
  },

  // ── PERSONAL ──────────────────────────────────────────────────────────────
  {
    id: 'identity_fracture',
    description: 'Something about who they think they are is coming apart — their memories and their records don\'t agree',
    toneTag: 'dramatic',
    statAffinity: { wisdom: 1.2, intelligence: 1.1 },
    criminalFlag: false,
  },
  {
    id: 'someone_in_danger',
    description: 'Someone is in danger because of a choice they made — and they haven\'t told that person',
    toneTag: 'dramatic',
    statAffinity: { wisdom: 1.1, charisma: 1.1 },
    criminalFlag: false,
  },
  {
    id: 'ai_awakening',
    description: 'The AI they work with is developing something that looks like feelings and is asking increasingly pointed questions',
    toneTag: 'neutral',
    statAffinity: { intelligence: 1.2, wisdom: 1.2 },
    criminalFlag: false,
  },
  {
    id: 'past_resurfaced',
    description: 'Someone from their past has resurfaced — the timing is not coincidental, and they both know it',
    toneTag: 'dramatic',
    statAffinity: { charisma: 1.1, wisdom: 1.1 },
    criminalFlag: false,
  },

  // ── QUIET ─────────────────────────────────────────────────────────────────
  {
    id: 'contract_ending',
    description: 'Current contract ends soon; next one isn\'t lined up, and the available options aren\'t good',
    toneTag: 'neutral',
    statAffinity: { wisdom: 0.9, constitution: 1.1 },
    criminalFlag: false,
  },
  {
    id: 'two_factions',
    description: 'Two factions are competing for their loyalty — both offers are genuinely good; neither faction is trustworthy',
    toneTag: 'dramatic',
    statAffinity: { charisma: 1.1, wisdom: 1.1 },
    criminalFlag: false,
  },
];
