// genres/modern/life-events.js
// Formative past events — one is selected per character.
// Each event carries:
//   id, description, statAffinity (stats that make this more likely),
//   toneTag (gritty | dramatic | cozy | neutral) for filtering,
//   economicHint (optional tier shift suggestion)

export const LIFE_EVENTS = [

  // ── LOSS & GRIEF ──────────────────────────────────────────────────────────
  {
    id: 'lost_parent_young',
    description: 'Lost a parent before the age of twelve',
    toneTag: 'dramatic',
    statAffinity: { wisdom: 1.2, constitution: 0.9 },
    iconPrompt: 'Modern RPG icon. A child standing alone in a room still shaped by someone who isn\'t coming back — a parent\'s coat on the hook, a half-finished cup — the particular quiet of a house permanently changed.',
    iconPath: 'generator/genres/modern/icons/LIFE_EVENT#lost_parent_young.webp'
  },
  {
    id: 'lost_sibling',
    description: 'A sibling died — accident, illness, or violence',
    toneTag: 'dramatic',
    statAffinity: { wisdom: 1.3, constitution: 0.9 },
    iconPrompt: 'Modern RPG icon. An adult holding a worn photograph of themselves with a sibling, the edges softened from being looked at too many times — grief folded into daily life, but never quite gone.',
    iconPath: 'generator/genres/modern/icons/LIFE_EVENT#lost_sibling.webp'
  },
  {
    id: 'partner_died',
    description: 'Lost a long-term partner or spouse',
    toneTag: 'dramatic',
    statAffinity: { wisdom: 1.2, charisma: 0.9 },
    iconPrompt: 'Modern RPG icon. A person sitting alone on a couch that was meant for two, their partner\'s absence written into everything around them — a second mug still on the shelf, a space in the room that no longer has a name.',
    iconPath: 'generator/genres/modern/icons/LIFE_EVENT#partner_died.webp'
  },
  {
    id: 'best_friend_overdose',
    description: 'A best friend died of an overdose in their early twenties',
    toneTag: 'gritty',
    statAffinity: { wisdom: 1.2, constitution: 0.9 },
    iconPrompt: 'Modern RPG icon. A person at a grave that belongs to someone their same age, the flowers recent, the headstone still too new — the particular grief of a loss that did not have to happen.',
    iconPath: 'generator/genres/modern/icons/LIFE_EVENT#best_friend_overdose.webp'
  },
  {
    id: 'miscarriage',
    description: 'Suffered a miscarriage or the loss of a child',
    toneTag: 'dramatic',
    statAffinity: { wisdom: 1.2, constitution: 0.8 },
    iconPrompt: 'Modern RPG icon. A person in a quiet room with a weight that is entirely invisible from the outside — modern setting, ordinary lighting — the kind of loss that leaves no physical trace except in the person carrying it.',
    iconPath: 'generator/genres/modern/icons/LIFE_EVENT#miscarriage.webp'
  },

  // ── FAMILY FRACTURES ──────────────────────────────────────────────────────
  {
    id: 'parents_divorced_badly',
    description: 'Parents divorced in a bitter, drawn-out split during childhood',
    toneTag: 'dramatic',
    statAffinity: { wisdom: 1.1, charisma: 0.9 },
    iconPrompt: 'Modern RPG icon. A child in the backseat of a car with an overnight bag between their feet, watching two adults at the curb exchange them like a transaction — the first day of a permanently divided geography.',
    iconPath: 'generator/genres/modern/icons/LIFE_EVENT#parents_divorced_badly.webp'
  },
  {
    id: 'raised_by_grandparent',
    description: 'Raised primarily by a grandparent while parents were absent',
    toneTag: 'neutral',
    statAffinity: { wisdom: 1.2 },
    iconPrompt: 'Modern RPG icon. A kid doing homework at a kitchen table while an elderly grandparent moves around behind them — warm and close, with a generational gap woven through every ordinary routine.',
    iconPath: 'generator/genres/modern/icons/LIFE_EVENT#raised_by_grandparent.webp'
  },
  {
    id: 'foster_care',
    description: 'Spent time in foster care as a child',
    toneTag: 'gritty',
    statAffinity: { constitution: 1.1, charisma: 0.9, wisdom: 1.1 },
    iconPrompt: 'Modern RPG icon. A child with a single bag sitting outside a new front door, the practiced neutrality of someone who has learned to read a household fast and knows better than to unpack until they\'re sure.',
    iconPath: 'generator/genres/modern/icons/LIFE_EVENT#foster_care.webp'
  },
  {
    id: 'estranged_from_family',
    description: 'Deliberately cut off contact with most of their family as an adult',
    toneTag: 'dramatic',
    statAffinity: { wisdom: 1.2, strength: 1.1 },
    iconPrompt: 'Modern RPG icon. An adult at their kitchen table, phone face-down beside them, ignoring a call from a family member — the quiet resolve of someone who made a hard decision and has learned to live inside it.',
    iconPath: 'generator/genres/modern/icons/LIFE_EVENT#estranged_from_family.webp'
  },
  {
    id: 'abusive_household',
    description: 'Grew up in a household with abuse — physical, emotional, or both',
    toneTag: 'gritty',
    statAffinity: { constitution: 1.2, wisdom: 0.9, strength: 1.1 },
    iconPrompt: 'Modern RPG icon. A child very still in a doorway, listening to something happening in the next room — the particular alertness of someone who learned early to track the emotional temperature of the adults around them.',
    iconPath: 'generator/genres/modern/icons/LIFE_EVENT#abusive_household.webp'
  },

  // ── FAILURE & SETBACK ─────────────────────────────────────────────────────
  {
    id: 'dropped_out_college',
    description: 'Dropped out of college before finishing their degree',
    toneTag: 'neutral',
    statAffinity: { intelligence: 0.9, wisdom: 0.9 },
    economicHint: -1,
    iconPrompt: 'Modern RPG icon. A student packing up a dorm room mid-semester, one box of books, an expression that isn\'t quite failure and isn\'t quite relief — leaving a path without knowing where the next one starts.',
    iconPath: 'generator/genres/modern/icons/LIFE_EVENT#dropped_out_college.webp'
  },
  {
    id: 'business_failed',
    description: 'Started a business that collapsed, taking their savings with it',
    toneTag: 'dramatic',
    statAffinity: { intelligence: 1.1, constitution: 0.9 },
    economicHint: -1,
    iconPrompt: 'Modern RPG icon. A person standing in an empty former office or storefront, the signs of what it was still visible — a few boxes, a closed sign on the door — the aftermath of betting everything on something that didn\'t make it.',
    iconPath: 'generator/genres/modern/icons/LIFE_EVENT#business_failed.webp'
  },
  {
    id: 'bankruptcy',
    description: 'Filed for bankruptcy after debt spiraled out of control',
    toneTag: 'dramatic',
    statAffinity: { wisdom: 0.8, constitution: 0.9 },
    economicHint: -2,
    iconPrompt: 'Modern RPG icon. An adult at an attorney\'s desk signing the last of the paperwork, the particular stillness of someone doing the final administrative act before a chapter closes — grim, practical, and somehow a little freeing.',
    iconPath: 'generator/genres/modern/icons/LIFE_EVENT#bankruptcy.webp'
  },
  {
    id: 'fired_publicly',
    description: 'Was fired in a humiliating or very public way',
    toneTag: 'dramatic',
    statAffinity: { charisma: 0.9, wisdom: 0.9 },
    iconPrompt: 'Modern RPG icon. A person leaving an office building mid-day, a small box of belongings under their arm, aware of eyes on them from the windows above — the walk across the parking lot that seems to take forever.',
    iconPath: 'generator/genres/modern/icons/LIFE_EVENT#fired_publicly.webp'
  },
  {
    id: 'addiction_recovery',
    description: 'Fought through a serious addiction — alcohol, opioids, or gambling — and came out the other side',
    toneTag: 'gritty',
    statAffinity: { constitution: 0.8, wisdom: 1.3 },
    economicHint: -2,
    iconPrompt: 'Modern RPG icon. A person in a folding chair at a church basement or community center meeting, a paper cup of bad coffee in hand — the face of someone who has decided to be honest about something for the very first time.',
    iconPath: 'generator/genres/modern/icons/LIFE_EVENT#addiction_recovery.webp'
  },
  {
    id: 'divorced',
    description: 'Went through a painful divorce in their late twenties or thirties',
    toneTag: 'dramatic',
    statAffinity: { charisma: 0.9, wisdom: 1.1 },
    iconPrompt: 'Modern RPG icon. Two people methodically dividing the ordinary objects of a shared life — books, dishes, furniture — the strange arithmetic of taking apart something that was built together piece by piece.',
    iconPath: 'generator/genres/modern/icons/LIFE_EVENT#divorced.webp'
  },

  // ── CRIME & JUSTICE ───────────────────────────────────────────────────────
  {
    id: 'did_time',
    description: 'Served time in prison — months or years',
    toneTag: 'gritty',
    statAffinity: { strength: 1.2, constitution: 1.2, wisdom: 0.8 },
    economicHint: -1,
    iconPrompt: 'Modern RPG icon. A person walking out through institutional doors into daylight, a paper bag of belongings in hand — the specific blankness of re-entering a world that kept moving without them.',
    iconPath: 'generator/genres/modern/icons/LIFE_EVENT#did_time.webp'
  },
  {
    id: 'juvenile_record',
    description: 'Had a juvenile record that followed them into adulthood',
    toneTag: 'gritty',
    statAffinity: { wisdom: 0.8, strength: 1.1 },
    iconPrompt: 'Modern RPG icon. A young adult at a job interview, the moment a background check form slides across the desk — the familiar internal calculation of how much to disclose, how to frame it, and whether it\'ll matter.',
    iconPath: 'generator/genres/modern/icons/LIFE_EVENT#juvenile_record.webp'
  },
  {
    id: 'wrongfully_accused',
    description: 'Was wrongfully accused of a crime — charges were eventually dropped, but the damage was done',
    toneTag: 'dramatic',
    statAffinity: { wisdom: 1.2, charisma: 0.9 },
    iconPrompt: 'Modern RPG icon. A person outside a courthouse, charges dropped but reputation already burning, navigating the complicated aftermath of being publicly accused of something they didn\'t do — exoneration that doesn\'t quite undo anything.',
    iconPath: 'generator/genres/modern/icons/LIFE_EVENT#wrongfully_accused.webp'
  },
  {
    id: 'witnessed_crime',
    description: 'Witnessed a serious crime — murder, assault — and stayed silent',
    toneTag: 'gritty',
    statAffinity: { wisdom: 0.9, constitution: 0.9 },
    iconPrompt: 'Modern RPG icon. A person at a window, having just seen something happen on the street below that they cannot unsee — the split-second decision already made, the weight of it just beginning to arrive.',
    iconPath: 'generator/genres/modern/icons/LIFE_EVENT#witnessed_crime.webp'
  },
  {
    id: 'victim_of_robbery',
    description: 'Was the victim of a violent robbery that changed how they see the world',
    toneTag: 'gritty',
    statAffinity: { constitution: 0.9, strength: 1.1 },
    iconPrompt: 'Modern RPG icon. A person sitting on a curb in the immediate aftermath of a violent robbery, a first responder nearby — the moment when the world becomes a fundamentally different place than it was an hour ago.',
    iconPath: 'generator/genres/modern/icons/LIFE_EVENT#victim_of_robbery.webp'
  },

  // ── UPHEAVAL & REINVENTION ────────────────────────────────────────────────
  {
    id: 'moved_cities_alone',
    description: 'Moved to a new city alone at 18 with almost nothing',
    toneTag: 'neutral',
    statAffinity: { constitution: 1.1, charisma: 1.1, wisdom: 1.1 },
    iconPrompt: 'Modern RPG icon. A young person on an unfamiliar sidewalk with two bags, phone out giving directions in a city they don\'t know yet — the particular mix of terror and possibility of a life starting completely from scratch.',
    iconPath: 'generator/genres/modern/icons/LIFE_EVENT#moved_cities_alone.webp'
  },
  {
    id: 'immigrated',
    description: 'Immigrated to the country as a child or young adult',
    toneTag: 'neutral',
    statAffinity: { constitution: 1.2, wisdom: 1.1 },
    iconPrompt: 'Modern RPG icon. A child or young adult arriving at an airport or border crossing, alert and wide-eyed, entering a country that will become home — in time, with work, with effort, not yet.',
    iconPath: 'generator/genres/modern/icons/LIFE_EVENT#immigrated.webp'
  },
  {
    id: 'military_service',
    description: 'Served in the military and was deployed abroad',
    toneTag: 'dramatic',
    statAffinity: { strength: 1.3, constitution: 1.3, wisdom: 1.1 },
    iconPrompt: 'Modern RPG icon. A veteran in civilian clothes in an ordinary setting — a diner, a bus — a quality of stillness that wasn\'t there before deployment, navigating a world that kept moving while they were gone.',
    iconPath: 'generator/genres/modern/icons/LIFE_EVENT#military_service.webp'
  },
  {
    id: 'survived_disaster',
    description: 'Survived a natural disaster — flood, fire, hurricane — that destroyed their home',
    toneTag: 'dramatic',
    statAffinity: { constitution: 1.2, wisdom: 1.1 },
    iconPrompt: 'Modern RPG icon. A person standing in front of where their home used to be, the disaster past and the debris still present — the stunned practical look of someone already figuring out what comes next.',
    iconPath: 'generator/genres/modern/icons/LIFE_EVENT#survived_disaster.webp'
  },
  {
    id: 'career_pivot',
    description: 'Abandoned a well-paying career in their thirties to start over in a new field',
    toneTag: 'neutral',
    statAffinity: { wisdom: 1.2, charisma: 1.1 },
    iconPrompt: 'Modern RPG icon. An adult on their first day in an entirely new field — notebook in hand, slightly overdressed for the context — starting over from the beginning at an age when that takes real courage.',
    iconPath: 'generator/genres/modern/icons/LIFE_EVENT#career_pivot.webp'
  },
  {
    id: 'escaped_cult',
    description: 'Left a controlling religious group or cult in their twenties',
    toneTag: 'dramatic',
    statAffinity: { wisdom: 1.3, intelligence: 1.2 },
    iconPrompt: 'Modern RPG icon. A person in their mid-twenties with a phone and a map in an unfamiliar city, rebuilding a worldview from the outside in for the very first time — everything ordinary, nothing yet making sense.',
    iconPath: 'generator/genres/modern/icons/LIFE_EVENT#escaped_cult.webp'
  },
  {
    id: 'came_out',
    description: 'Came out to their family in a moment that changed everything',
    toneTag: 'dramatic',
    statAffinity: { charisma: 1.1, wisdom: 1.2 },
    iconPrompt: 'Modern RPG icon. A person mid-conversation at a family dinner table, the words just said, some faces open and some not — the relief and the fear arriving at exactly the same moment, nothing the same after.',
    iconPath: 'generator/genres/modern/icons/LIFE_EVENT#came_out.webp'
  },

  // ── ACHIEVEMENT & LUCK ────────────────────────────────────────────────────
  {
    id: 'scholarship_kid',
    description: 'Won a scholarship that was the only path out of a difficult home situation',
    toneTag: 'neutral',
    statAffinity: { intelligence: 1.3, wisdom: 1.1 },
    economicHint: 1,
  },
  {
    id: 'unexpected_inheritance',
    description: 'Received an unexpected inheritance from a distant relative',
    toneTag: 'cozy',
    statAffinity: { charisma: 1.1 },
    economicHint: 1,
    iconPrompt: 'Modern RPG icon. A person reading a letter from an attorney, a check folded inside — the number larger than expected, the strange mixture of windfall and the weight of someone\'s death quietly attached to it.',
    iconPath: 'generator/genres/modern/icons/LIFE_EVENT#unexpected_inheritance.webp'
  },
  {
    id: 'viral_moment',
    description: 'Had a viral moment online — famous for fifteen minutes, lasting consequences',
    toneTag: 'neutral',
    statAffinity: { charisma: 1.3 },
    iconPrompt: 'Modern RPG icon. A person staring at their phone as the notifications explode — the moment before internet attention becomes something they have to manage, fifteen minutes of the wrong kind of fame just beginning.',
    iconPath: 'generator/genres/modern/icons/LIFE_EVENT#viral_moment.webp'
  },
  {
    id: 'early_success',
    description: 'Achieved significant professional success very young, then plateaued',
    toneTag: 'neutral',
    statAffinity: { intelligence: 1.2, charisma: 1.2 },
    economicHint: 1,
    iconPrompt: 'Modern RPG icon. A young professional at the height of an early career — press clipping framed on the wall, a good office view — and the first subtle sign that the trajectory everyone expected has quietly started to flatten.',
    iconPath: 'generator/genres/modern/icons/LIFE_EVENT#early_success.webp'
  },
  {
    id: 'lottery_won',
    description: 'Won a mid-sized lottery jackpot that they mostly burned through',
    toneTag: 'cozy',
    statAffinity: { wisdom: 0.8 },
    iconPrompt: 'Modern RPG icon. A person holding a winning lottery ticket under fluorescent gas station lights, the surreal moment before the number is confirmed — and the dawning understanding that this kind of change brings its own problems.',
    iconPath: 'generator/genres/modern/icons/LIFE_EVENT#lottery_won.webp'
  },

  // ── QUIET LIFE ────────────────────────────────────────────────────────────
  {
    id: 'small_town_raised',
    description: 'Grew up in a small town and never really left until recently',
    toneTag: 'cozy',
    statAffinity: { wisdom: 1.1, charisma: 0.9 },
    iconPrompt: 'Modern RPG icon. A person who grew up somewhere small arriving in a city for the first time — the scale of it hitting them all at once — everything technically familiar and nothing remotely recognizable.',
    iconPath: 'generator/genres/modern/icons/LIFE_EVENT#small_town_raised.webp'
  },
  {
    id: 'caretaker_role',
    description: 'Spent years as the primary caretaker for a sick or disabled family member',
    toneTag: 'neutral',
    statAffinity: { wisdom: 1.3, constitution: 1.1, charisma: 0.9 },
    iconPrompt: 'Modern RPG icon. A person helping an elderly or ill family member through the ordinary tasks of a difficult day — medication, a doctor\'s appointment, lunch — years of this accumulated quietly in their posture.',
    iconPath: 'generator/genres/modern/icons/LIFE_EVENT#caretaker_role.webp'
  },
  {
    id: 'long_relationship_ended',
    description: 'Was in the same relationship for a decade before it quietly fell apart',
    toneTag: 'cozy',
    statAffinity: { wisdom: 1.1, charisma: 0.9 },
    iconPrompt: 'Modern RPG icon. A person in an apartment that still holds the shape of a relationship that isn\'t there anymore — two mugs on the shelf from habit, the slow work of figuring out which things are now just theirs.',
    iconPath: 'generator/genres/modern/icons/LIFE_EVENT#long_relationship_ended.webp'
  },
  {
    id: 'late_bloomer',
    description: 'Discovered their passion or identity very late — in their 30s or 40s',
    toneTag: 'cozy',
    statAffinity: { wisdom: 1.3, intelligence: 1.1 },
    iconPrompt: 'Modern RPG icon. A person in their late thirties discovering something that should have been obvious years ago — a first real class, a first honest conversation about who they are — the particular relief of arriving late but arriving.',
    iconPath: 'generator/genres/modern/icons/LIFE_EVENT#late_bloomer.webp'
  },
  {
    id: 'lived_abroad',
    description: 'Spent several years living abroad before returning home',
    toneTag: 'neutral',
    statAffinity: { charisma: 1.2, wisdom: 1.2, intelligence: 1.1 },
    iconPrompt: 'Modern RPG icon. A person who has just returned home after years abroad, standing in a familiar place that no longer quite fits — everything exactly as they left it, themselves entirely changed.',
    iconPath: 'generator/genres/modern/icons/LIFE_EVENT#lived_abroad.webp'
  },
  {
    id: 'childhood_prodigy',
    description: 'Was considered a prodigy as a child — the pressure shaped everything that followed',
    toneTag: 'neutral',
    statAffinity: { intelligence: 1.4, wisdom: 0.9 },
    iconPrompt: 'Modern RPG icon. A child at a competition or performance surrounded by adults, the pressure visible in their posture — the earliest frame of a story about exceptional ability and the long cost that comes attached to it.',
    iconPath: 'generator/genres/modern/icons/LIFE_EVENT#childhood_prodigy.webp'
  },
];
