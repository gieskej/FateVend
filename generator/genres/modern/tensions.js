// genres/modern/tensions.js
// The inciting situation the character is currently in.
// This feeds the scenario Opening and Description heavily.
//
// Each tension carries:
//   id, description, toneTag, statAffinity,
//   economicHint (optional), criminalFlag (bool)

export const TENSIONS = [

  // ── FINANCIAL PRESSURE ────────────────────────────────────────────────────
  {
    id: 'facing_eviction',
    description: 'Has 30 days before eviction — needs money fast',
    toneTag: 'dramatic',
    statAffinity: { wisdom: 0.9, constitution: 0.9 },
    economicHint: -1,
    criminalFlag: false,
  },
  {
    id: 'debt_collectors',
    description: 'Debt collectors — or worse — are circling',
    toneTag: 'gritty',
    statAffinity: { wisdom: 0.8, constitution: 1.1 },
    criminalFlag: false,
  },
  {
    id: 'bankruptcy_looming',
    description: 'On the verge of personal bankruptcy with no exit in sight',
    toneTag: 'dramatic',
    statAffinity: { wisdom: 0.8, intelligence: 0.9 },
    economicHint: -2,
    criminalFlag: false,
  },
  {
    id: 'gambling_debt',
    description: 'Owes a serious gambling debt to people who don\'t do payment plans',
    toneTag: 'gritty',
    statAffinity: { wisdom: 0.7, charisma: 1.1 },
    criminalFlag: true,
  },
  {
    id: 'supporting_family',
    description: 'Sole financial support for a family member who can\'t work',
    toneTag: 'dramatic',
    statAffinity: { wisdom: 1.2, constitution: 1.1 },
    criminalFlag: false,
  },
  {
    id: 'medical_bills',
    description: 'Drowning in medical bills — theirs or someone they love',
    toneTag: 'dramatic',
    statAffinity: { constitution: 0.9, wisdom: 1.1 },
    criminalFlag: false,
  },

  // ── CAREER & IDENTITY ─────────────────────────────────────────────────────
  {
    id: 'just_got_fired',
    description: 'Just got fired — unexpectedly, possibly unjustly',
    toneTag: 'dramatic',
    statAffinity: { charisma: 0.9, wisdom: 0.9 },
    criminalFlag: false,
  },
  {
    id: 'business_collapsing',
    description: 'Their small business is collapsing and taking everything with it',
    toneTag: 'dramatic',
    statAffinity: { intelligence: 1.1, wisdom: 0.9 },
    economicHint: -1,
    criminalFlag: false,
  },
  {
    id: 'passed_over_promotion',
    description: 'Was passed over for a promotion they\'ve worked toward for years',
    toneTag: 'neutral',
    statAffinity: { charisma: 0.9, wisdom: 1.1 },
    criminalFlag: false,
  },
  {
    id: 'midlife_crisis',
    description: 'In the grip of a midlife identity crisis — everything they built feels hollow',
    toneTag: 'cozy',
    statAffinity: { wisdom: 1.2, charisma: 0.9 },
    criminalFlag: false,
  },
  {
    id: 'whistleblower_dilemma',
    description: 'Knows about serious wrongdoing at work — and hasn\'t decided what to do',
    toneTag: 'dramatic',
    statAffinity: { wisdom: 1.2, intelligence: 1.2 },
    criminalFlag: false,
  },
  {
    id: 'career_scandal',
    description: 'Embroiled in a professional scandal — real or fabricated',
    toneTag: 'dramatic',
    statAffinity: { charisma: 1.1, intelligence: 1.1 },
    criminalFlag: false,
  },

  // ── RELATIONSHIPS ─────────────────────────────────────────────────────────
  {
    id: 'messy_divorce',
    description: 'In the middle of a contested, bitter divorce',
    toneTag: 'dramatic',
    statAffinity: { charisma: 0.9, wisdom: 0.9 },
    criminalFlag: false,
  },
  {
    id: 'custody_battle',
    description: 'Fighting a custody battle for their child',
    toneTag: 'dramatic',
    statAffinity: { wisdom: 1.1, constitution: 1.1 },
    criminalFlag: false,
  },
  {
    id: 'affair_discovered',
    description: 'Their affair has just been discovered — or they just discovered their partner\'s',
    toneTag: 'dramatic',
    statAffinity: { charisma: 1.1, wisdom: 0.9 },
    criminalFlag: false,
  },
  {
    id: 'toxic_relationship',
    description: 'Trapped in a relationship they know is destroying them but can\'t leave',
    toneTag: 'dramatic',
    statAffinity: { charisma: 0.9, wisdom: 0.8 },
    criminalFlag: false,
  },
  {
    id: 'estranged_child',
    description: 'Their adult child has cut off contact — and they\'re not sure why',
    toneTag: 'dramatic',
    statAffinity: { wisdom: 1.1, charisma: 0.9 },
    criminalFlag: false,
  },
  {
    id: 'old_flame_returned',
    description: 'Someone from the past has reappeared — and complicated everything',
    toneTag: 'cozy',
    statAffinity: { charisma: 1.1, wisdom: 0.9 },
    criminalFlag: false,
  },
  {
    id: 'secret_relationship',
    description: 'In a relationship that must stay hidden — for now',
    toneTag: 'dramatic',
    statAffinity: { charisma: 1.1, wisdom: 0.9 },
    criminalFlag: false,
  },

  // ── CRIMINAL / DANGEROUS ──────────────────────────────────────────────────
  {
    id: 'witness_to_murder',
    description: 'Witnessed a murder and is being pressured to stay quiet',
    toneTag: 'gritty',
    statAffinity: { constitution: 1.2, wisdom: 0.9 },
    criminalFlag: true,
  },
  {
    id: 'targeted_by_crew',
    description: 'Has made enemies in the wrong circles — people who hold grudges violently',
    toneTag: 'gritty',
    statAffinity: { strength: 1.2, constitution: 1.1 },
    criminalFlag: true,
  },
  {
    id: 'under_investigation',
    description: 'Under police or federal investigation — guilty or not',
    toneTag: 'gritty',
    statAffinity: { intelligence: 1.1, wisdom: 0.9 },
    criminalFlag: true,
  },
  {
    id: 'one_last_job',
    description: 'Agreed to do "one last job" to clear a debt — it\'s already gone sideways',
    toneTag: 'gritty',
    statAffinity: { constitution: 1.1, intelligence: 1.1 },
    criminalFlag: true,
  },
  {
    id: 'blackmailed',
    description: 'Being blackmailed over something they did — or something they\'re falsely accused of',
    toneTag: 'gritty',
    statAffinity: { charisma: 0.9, wisdom: 0.9 },
    criminalFlag: true,
  },
  {
    id: 'working_for_wrong_people',
    description: 'Deep in business with people they can\'t just walk away from',
    toneTag: 'gritty',
    statAffinity: { strength: 1.1, constitution: 1.2 },
    criminalFlag: true,
  },
  {
    id: 'informant_dilemma',
    description: 'Being pressured by law enforcement to inform on people they care about',
    toneTag: 'gritty',
    statAffinity: { wisdom: 1.1, charisma: 1.1 },
    criminalFlag: true,
  },

  // ── HEALTH & MENTAL HEALTH ────────────────────────────────────────────────
  {
    id: 'serious_diagnosis',
    description: 'Just received a serious medical diagnosis that changes everything',
    toneTag: 'dramatic',
    statAffinity: { constitution: 0.8, wisdom: 1.2 },
    criminalFlag: false,
  },
  {
    id: 'relapse',
    description: 'Relapsed after years of sobriety — trying to hide it',
    toneTag: 'gritty',
    statAffinity: { constitution: 0.8, wisdom: 0.9 },
    criminalFlag: false,
  },
  {
    id: 'mental_health_spiral',
    description: 'Quietly unraveling — depression, anxiety, or worse — while keeping up appearances',
    toneTag: 'dramatic',
    statAffinity: { constitution: 0.8, intelligence: 1.1 },
    criminalFlag: false,
  },
  {
    id: 'caring_for_sick_family',
    description: 'Primary caretaker for a family member with a terminal illness',
    toneTag: 'dramatic',
    statAffinity: { wisdom: 1.2, constitution: 0.9 },
    criminalFlag: false,
  },

  // ── QUIET CRISES ──────────────────────────────────────────────────────────
  {
    id: 'just_moved_alone',
    description: 'Just moved to a new city alone — starting completely from scratch',
    toneTag: 'cozy',
    statAffinity: { charisma: 1.1, constitution: 1.1 },
    criminalFlag: false,
  },
  {
    id: 'haunted_by_secret',
    description: 'Carrying a secret that\'s been eating at them for years — and it\'s getting heavier',
    toneTag: 'dramatic',
    statAffinity: { wisdom: 0.9, intelligence: 1.1 },
    criminalFlag: false,
  },
  {
    id: 'inheritance_dispute',
    description: 'In the middle of a family conflict over a will or inheritance',
    toneTag: 'dramatic',
    statAffinity: { charisma: 1.1, wisdom: 0.9 },
    criminalFlag: false,
  },
  {
    id: 'lost_in_grief',
    description: 'Still processing a loss that happened more recently than anyone knows',
    toneTag: 'dramatic',
    statAffinity: { wisdom: 1.2, constitution: 0.9 },
    criminalFlag: false,
  },
  {
    id: 'searching_for_someone',
    description: 'Quietly searching for someone who disappeared from their life years ago',
    toneTag: 'neutral',
    statAffinity: { wisdom: 1.1, intelligence: 1.1 },
    criminalFlag: false,
  },
  {
    id: 'reinvention',
    description: 'Decided to completely reinvent themselves — burning every old bridge to do it',
    toneTag: 'neutral',
    statAffinity: { charisma: 1.2, wisdom: 1.1 },
    criminalFlag: false,
  },
  {
    id: 'opportunity_of_a_lifetime',
    description: 'A once-in-a-lifetime opportunity has appeared — but it requires sacrificing something important',
    toneTag: 'neutral',
    statAffinity: { intelligence: 1.2, charisma: 1.1 },
    criminalFlag: false,
  },
];
