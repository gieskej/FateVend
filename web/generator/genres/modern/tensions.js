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
    iconPrompt: 'Modern RPG icon. An eviction notice taped to an apartment door, a person staring at it in the hallway with 30 days to solve a problem that has no easy solution.',
    iconPath: 'generator/genres/modern/icons/TENSION#facing_eviction.webp'
  },
  {
    id: 'debt_collectors',
    description: 'Debt collectors — or worse — are circling',
    toneTag: 'gritty',
    statAffinity: { wisdom: 0.8, constitution: 1.1 },
    criminalFlag: false,
    iconPrompt: 'Modern RPG icon. A person checking missed calls on their phone — three from the same unfamiliar number — the specific low-grade dread of people who are circling and will eventually stop waiting.',
    iconPath: 'generator/genres/modern/icons/TENSION#debt_collectors.webp'
  },
  {
    id: 'bankruptcy_looming',
    description: 'On the verge of personal bankruptcy with no exit in sight',
    toneTag: 'dramatic',
    statAffinity: { wisdom: 0.8, intelligence: 0.9 },
    economicHint: -2,
    criminalFlag: false,
    iconPrompt: 'Modern RPG icon. A person at a kitchen table surrounded by paper statements and an open laptop showing red numbers — the math not working no matter how many times they run it.',
    iconPath: 'generator/genres/modern/icons/TENSION#bankruptcy_looming.webp'
  },
  {
    id: 'gambling_debt',
    description: 'Owes a serious gambling debt to people who don\'t do payment plans',
    toneTag: 'gritty',
    statAffinity: { wisdom: 0.7, charisma: 1.1 },
    criminalFlag: true,
    iconPrompt: 'Modern RPG icon. A person in a diner booth receiving a visit from two men who didn\'t sit down, the conversation quiet and very clear — the kind of debt that doesn\'t come with a grace period.',
    iconPath: 'generator/genres/modern/icons/TENSION#gambling_debt.webp'
  },
  {
    id: 'supporting_family',
    description: 'Sole financial support for a family member who can\'t work',
    toneTag: 'dramatic',
    statAffinity: { wisdom: 1.2, constitution: 1.1 },
    criminalFlag: false,
    iconPrompt: 'Modern RPG icon. A person transferring money on their phone at the end of the month, the balance dropping below comfortable — supporting someone else\'s life before they can think about their own.',
    iconPath: 'generator/genres/modern/icons/TENSION#supporting_family.webp'
  },
  {
    id: 'medical_bills',
    description: 'Drowning in medical bills — theirs or someone they love',
    toneTag: 'dramatic',
    statAffinity: { constitution: 0.9, wisdom: 1.1 },
    criminalFlag: false,
    iconPrompt: 'Modern RPG icon. A person at a kitchen table with a stack of medical billing envelopes, opening the next one with the resignation of someone who already knows it\'s more than they have.',
    iconPath: 'generator/genres/modern/icons/TENSION#medical_bills.webp'
  },

  // ── CAREER & IDENTITY ─────────────────────────────────────────────────────
  {
    id: 'just_got_fired',
    description: 'Just got fired — unexpectedly, possibly unjustly',
    toneTag: 'dramatic',
    statAffinity: { charisma: 0.9, wisdom: 0.9 },
    criminalFlag: false,
    iconPrompt: 'Modern RPG icon. A person walking out of an office building mid-morning with a small box of belongings, the workday carrying on behind the glass above them without missing a beat.',
    iconPath: 'generator/genres/modern/icons/TENSION#just_got_fired.webp'
  },
  {
    id: 'business_collapsing',
    description: 'Their small business is collapsing and taking everything with it',
    toneTag: 'dramatic',
    statAffinity: { intelligence: 1.1, wisdom: 0.9 },
    economicHint: -1,
    criminalFlag: false,
    iconPrompt: 'Modern RPG icon. A person in an empty storefront or office, looking at their phone and a spreadsheet that say the same thing — the end coming faster than expected and already visible.',
    iconPath: 'generator/genres/modern/icons/TENSION#business_collapsing.webp'
  },
  {
    id: 'passed_over_promotion',
    description: 'Was passed over for a promotion they\'ve worked toward for years',
    toneTag: 'neutral',
    statAffinity: { charisma: 0.9, wisdom: 1.1 },
    criminalFlag: false,
    iconPrompt: 'Modern RPG icon. A person reading an all-hands email announcing someone else\'s promotion, the expression of someone doing the math on what that means for the next five years of their career.',
    iconPath: 'generator/genres/modern/icons/TENSION#passed_over_promotion.webp'
  },
  {
    id: 'midlife_crisis',
    description: 'In the grip of a midlife identity crisis — everything they built feels hollow',
    toneTag: 'cozy',
    statAffinity: { wisdom: 1.2, charisma: 0.9 },
    criminalFlag: false,
    iconPrompt: 'Modern RPG icon. A person standing in the middle of a life they built — good job, decent apartment, all the right things — unable to explain why none of it is working the way it was supposed to.',
    iconPath: 'generator/genres/modern/icons/TENSION#midlife_crisis.webp'
  },
  {
    id: 'whistleblower_dilemma',
    description: 'Knows about serious wrongdoing at work — and hasn\'t decided what to do',
    toneTag: 'dramatic',
    statAffinity: { wisdom: 1.2, intelligence: 1.2 },
    criminalFlag: false,
    iconPrompt: 'Modern RPG icon. A person at a work computer late at night, an incriminating file open on screen — weighing the cost of acting against the cost of staying silent, neither option clean.',
    iconPath: 'generator/genres/modern/icons/TENSION#whistleblower_dilemma.webp'
  },
  {
    id: 'career_scandal',
    description: 'Embroiled in a professional scandal — real or fabricated',
    toneTag: 'dramatic',
    statAffinity: { charisma: 1.1, intelligence: 1.1 },
    criminalFlag: false,
    iconPrompt: 'Modern RPG icon. A person scrolling through news alerts about themselves, the story already out and spreading, their professional identity on fire in public and no clear way to put it out.',
    iconPath: 'generator/genres/modern/icons/TENSION#career_scandal.webp'
  },

  // ── RELATIONSHIPS ─────────────────────────────────────────────────────────
  {
    id: 'messy_divorce',
    description: 'In the middle of a contested, bitter divorce',
    toneTag: 'dramatic',
    statAffinity: { charisma: 0.9, wisdom: 0.9 },
    criminalFlag: false,
    iconPrompt: 'Modern RPG icon. A person in their lawyer\'s waiting room, the formal machinery of a contested divorce underway — the relationship now being translated into documents, deadlines, and asset columns.',
    iconPath: 'generator/genres/modern/icons/TENSION#messy_divorce.webp'
  },
  {
    id: 'custody_battle',
    description: 'Fighting a custody battle for their child',
    toneTag: 'dramatic',
    statAffinity: { wisdom: 1.1, constitution: 1.1 },
    criminalFlag: false,
    iconPrompt: 'Modern RPG icon. A parent sitting in a family court waiting area, every piece of paperwork a function of what\'s at stake — the stakes being a child who doesn\'t understand any of it yet.',
    iconPath: 'generator/genres/modern/icons/TENSION#custody_battle.webp'
  },
  {
    id: 'affair_discovered',
    description: 'Their affair has just been discovered — or they just discovered their partner\'s',
    toneTag: 'dramatic',
    statAffinity: { charisma: 1.1, wisdom: 0.9 },
    criminalFlag: false,
    iconPrompt: 'Modern RPG icon. A person on one side of a kitchen table, the discovery just made — the specific silence of when the story being told about a relationship stops being true.',
    iconPath: 'generator/genres/modern/icons/TENSION#affair_discovered.webp'
  },
  {
    id: 'toxic_relationship',
    description: 'Trapped in a relationship they know is destroying them but can\'t leave',
    toneTag: 'dramatic',
    statAffinity: { charisma: 0.9, wisdom: 0.8 },
    criminalFlag: false,
    iconPrompt: 'Modern RPG icon. A person sitting in their car in a driveway not going inside — the stillness of someone who knows exactly what they should do and exactly why they cannot do it yet.',
    iconPath: 'generator/genres/modern/icons/TENSION#toxic_relationship.webp'
  },
  {
    id: 'estranged_child',
    description: 'Their adult child has cut off contact — and they\'re not sure why',
    toneTag: 'dramatic',
    statAffinity: { wisdom: 1.1, charisma: 0.9 },
    criminalFlag: false,
    iconPrompt: 'Modern RPG icon. A parent with their phone, their adult child\'s name in the contacts, the last message months old — the specific grief of a silence you don\'t know how to break.',
    iconPath: 'generator/genres/modern/icons/TENSION#estranged_child.webp'
  },
  {
    id: 'old_flame_returned',
    description: 'Someone from the past has reappeared — and complicated everything',
    toneTag: 'cozy',
    statAffinity: { charisma: 1.1, wisdom: 0.9 },
    criminalFlag: false,
    iconPrompt: 'Modern RPG icon. A person who just received a text or saw someone across a coffee shop — the specific complicated feeling of a past person walking back into a present that had finally settled.',
    iconPath: 'generator/genres/modern/icons/TENSION#old_flame_returned.webp'
  },
  {
    id: 'secret_relationship',
    description: 'In a relationship that must stay hidden — for now',
    toneTag: 'dramatic',
    statAffinity: { charisma: 1.1, wisdom: 0.9 },
    criminalFlag: false,
    iconPrompt: 'Modern RPG icon. Two people at the same office party or social event maintaining careful ordinary distance — every glance a performance of not looking, every normal exchange the work of concealment.',
    iconPath: 'generator/genres/modern/icons/TENSION#secret_relationship.webp'
  },

  // ── CRIMINAL / DANGEROUS ──────────────────────────────────────────────────
  {
    id: 'witness_to_murder',
    description: 'Witnessed a murder and is being pressured to stay quiet',
    toneTag: 'gritty',
    statAffinity: { constitution: 1.2, wisdom: 0.9 },
    criminalFlag: true,
    iconPrompt: 'Modern RPG icon. A person in their apartment with the blinds closed, thinking about what comes next now that the wrong people know their name and what they saw.',
    iconPath: 'generator/genres/modern/icons/TENSION#witness_to_murder.webp'
  },
  {
    id: 'targeted_by_crew',
    description: 'Has made enemies in the wrong circles — people who hold grudges violently',
    toneTag: 'gritty',
    statAffinity: { strength: 1.2, constitution: 1.1 },
    criminalFlag: true,
    iconPrompt: 'Modern RPG icon. A person checking over their shoulder on a city street, a car they\'ve seen before idling near the corner — the recognition that the attention is no longer theoretical.',
    iconPath: 'generator/genres/modern/icons/TENSION#targeted_by_crew.webp'
  },
  {
    id: 'under_investigation',
    description: 'Under police or federal investigation — guilty or not',
    toneTag: 'gritty',
    statAffinity: { intelligence: 1.1, wisdom: 0.9 },
    criminalFlag: true,
    iconPrompt: 'Modern RPG icon. A person being approached by a federal agent at their workplace or door — the formal opening of a process that has its own logic and doesn\'t particularly care about their version of events.',
    iconPath: 'generator/genres/modern/icons/TENSION#under_investigation.webp'
  },
  {
    id: 'one_last_job',
    description: 'Agreed to do "one last job" to clear a debt — it\'s already gone sideways',
    toneTag: 'gritty',
    statAffinity: { constitution: 1.1, intelligence: 1.1 },
    criminalFlag: true,
    iconPrompt: 'Modern RPG icon. A person at a meeting point or wheel of a car at night, the job already sideways — the realization arriving that "one last job" was always going to mean exactly this.',
    iconPath: 'generator/genres/modern/icons/TENSION#one_last_job.webp'
  },
  {
    id: 'blackmailed',
    description: 'Being blackmailed over something they did — or something they\'re falsely accused of',
    toneTag: 'gritty',
    statAffinity: { charisma: 0.9, wisdom: 0.9 },
    criminalFlag: true,
    iconPrompt: 'Modern RPG icon. A person receiving an anonymous message containing something they cannot let anyone see — the cold certainty that the person on the other end already knows they will pay.',
    iconPath: 'generator/genres/modern/icons/TENSION#blackmailed.webp'
  },
  {
    id: 'working_for_wrong_people',
    description: 'Deep in business with people they can\'t just walk away from',
    toneTag: 'gritty',
    statAffinity: { strength: 1.1, constitution: 1.2 },
    criminalFlag: true,
    iconPrompt: 'Modern RPG icon. A person at a meeting they cannot leave with people they cannot cross, running the calculation of how deep in they are behind a composed and careful expression.',
    iconPath: 'generator/genres/modern/icons/TENSION#working_for_wrong_people.webp'
  },
  {
    id: 'informant_dilemma',
    description: 'Being pressured by law enforcement to inform on people they care about',
    toneTag: 'gritty',
    statAffinity: { wisdom: 1.1, charisma: 1.1 },
    criminalFlag: true,
    iconPrompt: 'Modern RPG icon. A person across from a detective in a gray interview room, given a choice they cannot make — both sides of it have consequences they would give anything to avoid.',
    iconPath: 'generator/genres/modern/icons/TENSION#informant_dilemma.webp'
  },

  // ── HEALTH & MENTAL HEALTH ────────────────────────────────────────────────
  {
    id: 'serious_diagnosis',
    description: 'Just received a serious medical diagnosis that changes everything',
    toneTag: 'dramatic',
    statAffinity: { constitution: 0.8, wisdom: 1.2 },
    criminalFlag: false,
    iconPrompt: 'Modern RPG icon. A person sitting in a hospital corridor after receiving news, the world continuing around them at full speed while everything they understood about their future restructures.',
    iconPath: 'generator/genres/modern/icons/TENSION#serious_diagnosis.webp'
  },
  {
    id: 'relapse',
    description: 'Relapsed after years of sobriety — trying to hide it',
    toneTag: 'gritty',
    statAffinity: { constitution: 0.8, wisdom: 0.9 },
    criminalFlag: false,
    iconPrompt: 'Modern RPG icon. A person alone in their apartment, the evidence of a relapse out of sight but present, calculating how long they can keep this quiet and what it will cost when they can\'t.',
    iconPath: 'generator/genres/modern/icons/TENSION#relapse.webp'
  },
  {
    id: 'mental_health_spiral',
    description: 'Quietly unraveling — depression, anxiety, or worse — while keeping up appearances',
    toneTag: 'dramatic',
    statAffinity: { constitution: 0.8, intelligence: 1.1 },
    criminalFlag: false,
    iconPrompt: 'Modern RPG icon. A person at work or in a social situation, managing an invisible interior unraveling — every functional response a performance, the effort of appearing fine accumulating.',
    iconPath: 'generator/genres/modern/icons/TENSION#mental_health_spiral.webp'
  },
  {
    id: 'caring_for_sick_family',
    description: 'Primary caretaker for a family member with a terminal illness',
    toneTag: 'dramatic',
    statAffinity: { wisdom: 1.2, constitution: 0.9 },
    criminalFlag: false,
    iconPrompt: 'Modern RPG icon. A person helping a terminally ill family member through a difficult ordinary day — medical equipment in the background, the specific love and accumulated weight of being the one who always shows up.',
    iconPath: 'generator/genres/modern/icons/TENSION#caring_for_sick_family.webp'
  },

  // ── QUIET CRISES ──────────────────────────────────────────────────────────
  {
    id: 'just_moved_alone',
    description: 'Just moved to a new city alone — starting completely from scratch',
    toneTag: 'cozy',
    statAffinity: { charisma: 1.1, constitution: 1.1 },
    criminalFlag: false,
    iconPrompt: 'Modern RPG icon. A person in a mostly empty apartment in a new city, boxes still on the floor — the specific combination of freedom and loneliness of having started over from zero.',
    iconPath: 'generator/genres/modern/icons/TENSION#just_moved_alone.webp'
  },
  {
    id: 'haunted_by_secret',
    description: 'Carrying a secret that\'s been eating at them for years — and it\'s getting heavier',
    toneTag: 'dramatic',
    statAffinity: { wisdom: 0.9, intelligence: 1.1 },
    criminalFlag: false,
    iconPrompt: 'Modern RPG icon. A person at a dinner or party, the thing they haven\'t told anyone present in every ordinary exchange — the secret growing heavier because the people around them don\'t know to be careful with it.',
    iconPath: 'generator/genres/modern/icons/TENSION#haunted_by_secret.webp'
  },
  {
    id: 'inheritance_dispute',
    description: 'In the middle of a family conflict over a will or inheritance',
    toneTag: 'dramatic',
    statAffinity: { charisma: 1.1, wisdom: 0.9 },
    criminalFlag: false,
    iconPrompt: 'Modern RPG icon. A family gathering where something under the surface is wrong — too-careful conversation, meaningful looks, the money question present in every exchange and raised in none of them.',
    iconPath: 'generator/genres/modern/icons/TENSION#inheritance_dispute.webp'
  },
  {
    id: 'lost_in_grief',
    description: 'Still processing a loss that happened more recently than anyone knows',
    toneTag: 'dramatic',
    statAffinity: { wisdom: 1.2, constitution: 0.9 },
    criminalFlag: false,
    iconPrompt: 'Modern RPG icon. A person appearing fine to everyone around them, processing a loss that is more recent and more present than anyone in the room knows — the performance of being okay, sustained.',
    iconPath: 'generator/genres/modern/icons/TENSION#lost_in_grief.webp'
  },
  {
    id: 'searching_for_someone',
    description: 'Quietly searching for someone who disappeared from their life years ago',
    toneTag: 'neutral',
    statAffinity: { wisdom: 1.1, intelligence: 1.1 },
    criminalFlag: false,
    iconPrompt: 'Modern RPG icon. A person with an old photo on their phone and a list of leads, quietly looking for someone who fell out of their life years ago — the search ongoing behind an ordinary-looking exterior.',
    iconPath: 'generator/genres/modern/icons/TENSION#searching_for_someone.webp'
  },
  {
    id: 'reinvention',
    description: 'Decided to completely reinvent themselves — burning every old bridge to do it',
    toneTag: 'neutral',
    statAffinity: { charisma: 1.2, wisdom: 1.1 },
    criminalFlag: false,
    iconPrompt: 'Modern RPG icon. A person walking away from the evidence of who they used to be — burning the last bridge deliberately, the future entirely unmapped and that being exactly the point.',
    iconPath: 'generator/genres/modern/icons/TENSION#reinvention.webp'
  },
  {
    id: 'opportunity_of_a_lifetime',
    description: 'A once-in-a-lifetime opportunity has appeared — but it requires sacrificing something important',
    toneTag: 'neutral',
    statAffinity: { intelligence: 1.2, charisma: 1.1 },
    criminalFlag: false,
    iconPrompt: 'Modern RPG icon. A person holding an offer — a letter, a contract, a call — the thing they always wanted on one side and the thing it requires giving up on the other, no way to have both.',
    iconPath: 'generator/genres/modern/icons/TENSION#opportunity_of_a_lifetime.webp'
  },
];
