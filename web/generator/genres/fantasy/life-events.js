// genres/fantasy/life-events.js

export const LIFE_EVENTS = [
  // ── LOSS ─────────────────────────────────────────────────────────────────
  {
    id: 'village_burned',
    description: 'Their home village was destroyed — by war, monsters, or something worse — when they were young',
    statAffinity: { constitution: 1.2, wisdom: 1.1 },
    iconPrompt: 'Fantasy RPG icon. A young figure standing at the edge of a smoldering ruined village, watching the embers of what was once home, smoke rising against a dark sky, nothing left to go back to.',
    iconPath: 'generator/genres/fantasy/icons/LIFE_EVENT#village_burned.png'
  },
  {
    id: 'lost_mentor',
    description: 'Lost their teacher or mentor — the person who gave them their first real purpose',
    statAffinity: { wisdom: 1.2, intelligence: 1.1 },
    iconPrompt: 'Fantasy RPG icon. A student kneeling beside their fallen mentor on a road, grief and purpose crossing their face in the same moment, the mentor\'s staff and worn spellbook lying in the dust beside them.',
    iconPath: 'generator/genres/fantasy/icons/LIFE_EVENT#lost_mentor.png'
  },
  {
    id: 'watch_friend_die',
    description: 'Watched a companion die and couldn\'t prevent it — and has been running from that moment since',
    statAffinity: { constitution: 0.9, strength: 1.1 },
    iconPrompt: 'Fantasy RPG icon. A figure kneeling over a fallen companion on a battlefield, one hand outstretched too late, the moment frozen in helpless grief, the fight already over around them.',
    iconPath: 'generator/genres/fantasy/icons/LIFE_EVENT#watch_friend_die.png'
  },
  {
    id: 'lost_sibling_war',
    description: 'Lost a sibling to war, conscription, or a campaign that should never have happened',
    statAffinity: { wisdom: 1.2, strength: 1.1 },
    iconPrompt: 'Fantasy RPG icon. An empty set of soldier\'s armor displayed on a stand in a modest home, a family member standing before it in silence, a conscription notice still on the table beside them.',
    iconPath: 'generator/genres/fantasy/icons/LIFE_EVENT#lost_sibling_war.png'
  },

  // ── FAMILY FRACTURES ──────────────────────────────────────────────────────
  {
    id: 'sold_to_guild',
    description: 'Was sold or indentured to a guild, temple, or trade as a child',
    statAffinity: { constitution: 1.2, wisdom: 1.1 },
    iconPrompt: 'Fantasy RPG icon. A young child being led through the heavy doors of a guild hall by a hooded figure, looking back over their shoulder at the family disappearing behind them, no choice in any of it.',
    iconPath: 'generator/genres/fantasy/icons/LIFE_EVENT#sold_to_guild.png'
  },
  {
    id: 'noble_fell',
    description: 'Their family was noble once — a war, a bad debt, or a political enemy ended that',
    statAffinity: { charisma: 1.1, wisdom: 1.1 },
    economicHint: -2,
    iconPrompt: 'Fantasy RPG icon. A family in fine but fraying clothing standing before a manor gate whose noble seal has been struck away, dispossessed and trying to hold their dignity in the face of it.',
    iconPath: 'generator/genres/fantasy/icons/LIFE_EVENT#noble_fell.png'
  },
  {
    id: 'bastard_child',
    description: 'Is a bastard — officially unacknowledged by a parent of some standing',
    statAffinity: { charisma: 1.1, wisdom: 1.1 },
    iconPrompt: 'Fantasy RPG icon. A young figure standing outside the closed gates of a great house, bearing the unmistakable features of a noble bloodline but wearing a commoner\'s clothes, watching a family that will not claim them.',
    iconPath: 'generator/genres/fantasy/icons/LIFE_EVENT#bastard_child.png'
  },
  {
    id: 'orphaned_war',
    description: 'Orphaned by a war or raid they\'re too young to remember clearly',
    statAffinity: { constitution: 1.2, strength: 1.1 },
    iconPrompt: 'Fantasy RPG icon. A small child alone amid the aftermath of a ransacked settlement, clutching a single keepsake from a life they can barely remember, surrounded by evidence of violence they do not yet understand.',
    iconPath: 'generator/genres/fantasy/icons/LIFE_EVENT#orphaned_war.png'
  },

  // ── FAILURE & DISGRACE ────────────────────────────────────────────────────
  {
    id: 'failed_quest',
    description: 'Failed a quest or mission that mattered — lives were lost, and they carry that',
    statAffinity: { wisdom: 1.1, constitution: 0.9 },
    iconPrompt: 'Fantasy RPG icon. A lone survivor walking away from a dungeon entrance, the rest of their party gone, head bowed under the weight of a mission that cannot be undone or repeated.',
    iconPath: 'generator/genres/fantasy/icons/LIFE_EVENT#failed_quest.png'
  },
  {
    id: 'expelled_order',
    description: 'Was expelled from a guild, order, or temple — the official story isn\'t the whole truth',
    statAffinity: { charisma: 0.9, wisdom: 1.1 },
    iconPrompt: 'Fantasy RPG icon. A figure being escorted out through the gates of a temple or guild hall, their insignia torn from their cloak, the doors closing firmly behind them as the order turns its back.',
    iconPath: 'generator/genres/fantasy/icons/LIFE_EVENT#expelled_order.png'
  },
  {
    id: 'betrayed_party',
    description: 'Betrayed by companions they trusted completely — has been cautious about trust since',
    statAffinity: { wisdom: 1.2, charisma: 0.9 },
    iconPrompt: 'Fantasy RPG icon. A figure alone in the dark, cornered and abandoned, the retreating shadows of those they called friends disappearing through a doorway, the betrayal still raw on their face.',
    iconPath: 'generator/genres/fantasy/icons/LIFE_EVENT#betrayed_party.png'
  },
  {
    id: 'lost_battle',
    description: 'Survived a battle that everyone else didn\'t — asks themselves why, still',
    statAffinity: { constitution: 1.2, wisdom: 1.1 },
    iconPrompt: 'Fantasy RPG icon. A single soldier standing amid the devastation of a lost battle, surrounded by the fallen, unable to understand why they alone are still standing as the smoke settles.',
    iconPath: 'generator/genres/fantasy/icons/LIFE_EVENT#lost_battle.png'
  },

  // ── CRIME & INJUSTICE ─────────────────────────────────────────────────────
  {
    id: 'wrongly_branded',
    description: 'Was wrongly accused, branded, or imprisoned — and the real culprit never faced justice',
    statAffinity: { wisdom: 1.2, charisma: 0.9 },
    iconPrompt: 'Fantasy RPG icon. A prisoner in chains being marched through a town square, false charges read aloud from a proclamation board, a visible brand or criminal mark burned onto their skin for a crime they did not commit.',
    iconPath: 'generator/genres/fantasy/icons/LIFE_EVENT#wrongly_branded.png'
  },
  {
    id: 'served_wrong_lord',
    description: 'Served a lord or cause they now know was wrong — won\'t talk about what they did',
    statAffinity: { wisdom: 1.1, constitution: 0.9 },
    iconPrompt: 'Fantasy RPG icon. A soldier carefully folding and setting down a banner they once carried with pride, the sigil now a source of shame, turning away from it without looking back.',
    iconPath: 'generator/genres/fantasy/icons/LIFE_EVENT#served_wrong_lord.png'
  },
  {
    id: 'escaped_slavery',
    description: 'Escaped slavery or forced servitude — carries both the scars and the skills it gave them',
    statAffinity: { constitution: 1.3, strength: 1.2 },
    economicHint: -1,
    iconPrompt: 'Fantasy RPG icon. A figure slipping through a gap in a wall at night, one wrist still marked where a shackle was, moving fast toward a horizon that finally has possibilities in it.',
    iconPath: 'generator/genres/fantasy/icons/LIFE_EVENT#escaped_slavery.png'
  },
  {
    id: 'was_criminal',
    description: 'Had a criminal past — petty theft became something larger, and they eventually got out',
    statAffinity: { dexterity: 1.2, wisdom: 1.1 },
    iconPrompt: 'Fantasy RPG icon. A figure setting down a thief\'s tools on a table for the last time, a shadow of who they were visible behind them, walking toward a doorway and a different kind of life.',
    iconPath: 'generator/genres/fantasy/icons/LIFE_EVENT#was_criminal.png'
  },

  // ── MAGIC & THE STRANGE ───────────────────────────────────────────────────
  {
    id: 'cursed',
    description: 'Carries a curse — minor but persistent, a reminder of a bad decision or worse luck',
    statAffinity: { wisdom: 1.1, intelligence: 1.1 },
    iconPrompt: 'Fantasy RPG icon. A figure with a faint dark mark on their skin that pulses with a dim unhealthy glow, going about an ordinary day while the curse quietly makes everything a little harder than it should be.',
    iconPath: 'generator/genres/fantasy/icons/LIFE_EVENT#cursed.png'
  },
  {
    id: 'magic_accident',
    description: 'Was caught in a magical accident that changed something fundamental about them',
    statAffinity: { intelligence: 1.2, wisdom: 1.1 },
    iconPrompt: 'Fantasy RPG icon. A figure standing in the aftershock of a magical explosion in a mage\'s workshop, their form subtly different than before, arcane energy still crackling and settling around them.',
    iconPath: 'generator/genres/fantasy/icons/LIFE_EVENT#magic_accident.png'
  },
  {
    id: 'survived_ritual',
    description: 'Survived a ritual they weren\'t supposed to survive — nobody is sure what that means',
    statAffinity: { constitution: 1.3, wisdom: 1.1 },
    iconPrompt: 'Fantasy RPG icon. A figure rising from the center of a ritual circle, robed officiants frozen in shock around them, the glowing symbols still burning on the floor, the expected outcome entirely failing to occur.',
    iconPath: 'generator/genres/fantasy/icons/LIFE_EVENT#survived_ritual.png'
  },
  {
    id: 'saw_something',
    description: 'Saw something they cannot explain — a vision, a creature, a truth — and it hasn\'t left them',
    statAffinity: { wisdom: 1.3, intelligence: 1.1 },
    iconPrompt: 'Fantasy RPG icon. A figure standing alone at a forest\'s edge at night, staring into the dark where something vast and inexplicable briefly appeared, expression haunted and entirely certain of what they saw.',
    iconPath: 'generator/genres/fantasy/icons/LIFE_EVENT#saw_something.png'
  },

  // ── JOURNEY & REINVENTION ─────────────────────────────────────────────────
  {
    id: 'long_road',
    description: 'Spent years wandering after leaving home — learned more about the world than about themselves',
    statAffinity: { constitution: 1.2, wisdom: 1.1 },
    iconPrompt: 'Fantasy RPG icon. A lone traveler on a winding road between distant mountains, a pack worn smooth from years of use, a road-marked map in hand, looking toward the next horizon with no particular destination.',
    iconPath: 'generator/genres/fantasy/icons/LIFE_EVENT#long_road.png'
  },
  {
    id: 'deserted',
    description: 'Deserted from an army or order — technically still wanted in at least one jurisdiction',
    statAffinity: { dexterity: 1.2, wisdom: 1.1 },
    economicHint: -1,
    iconPrompt: 'Fantasy RPG icon. A soldier in the dead of night, their armor abandoned beside a campfire, slipping away from a military encampment in civilian clothes, not looking back at what they are leaving.',
    iconPath: 'generator/genres/fantasy/icons/LIFE_EVENT#deserted.png'
  },
  {
    id: 'changed_sides',
    description: 'Changed allegiances mid-conflict — has never been fully trusted by either side since',
    statAffinity: { wisdom: 1.2, charisma: 0.9 },
    iconPrompt: 'Fantasy RPG icon. A figure standing between two opposing faction banners, having just set down one insignia and not yet claimed the other, belonging fully to neither, regarded with suspicion by both.',
    iconPath: 'generator/genres/fantasy/icons/LIFE_EVENT#changed_sides.png'
  },
  {
    id: 'made_pact',
    description: 'Made a pact or bargain they\'ve been paying off ever since — the terms were not as clear as they seemed',
    statAffinity: { intelligence: 1.2, wisdom: 0.9 },
    iconPrompt: 'Fantasy RPG icon. A younger version of the character pressing their hand to a glowing contract, a shadowy entity on the other side of a table, the fine print already fading from readable before the ink is dry.',
    iconPath: 'generator/genres/fantasy/icons/LIFE_EVENT#made_pact.png'
  },

  // ── ACHIEVEMENT & LUCK ────────────────────────────────────────────────────
  {
    id: 'slew_monster',
    description: 'Killed something famous enough that stories about it still circulate — they\'re more complicated about it than the stories suggest',
    statAffinity: { strength: 1.3, constitution: 1.1 },
    economicHint: 1,
    iconPrompt: 'Fantasy RPG icon. A lone warrior standing over the massive fallen form of a legendary creature, bloodied and exhausted, already more complicated about it than the songs being written about them will ever be.',
    iconPath: 'generator/genres/fantasy/icons/LIFE_EVENT#slew_monster.png'
  },
  {
    id: 'found_treasure',
    description: 'Found significant treasure once — and spent it in ways that made sense at the time',
    statAffinity: { wisdom: 0.9, charisma: 1.1 },
    iconPrompt: 'Fantasy RPG icon. A figure sitting in an empty vault, a few scattered coins the only remnant of a once-great hoard, looking at an empty purse with the complicated expression of someone who has no regrets and all of them.',
    iconPath: 'generator/genres/fantasy/icons/LIFE_EVENT#found_treasure.png'
  },
  {
    id: 'saved_someone_important',
    description: 'Saved someone important without knowing who they were — the debt hasn\'t been called in yet',
    statAffinity: { wisdom: 1.1, charisma: 1.1 },
    iconPrompt: 'Fantasy RPG icon. An ordinary figure helping an injured stranger to their feet on a roadside, neither yet aware of who the stranger is, a quiet unremarkable act already setting something large in motion.',
    iconPath: 'generator/genres/fantasy/icons/LIFE_EVENT#saved_someone_important.png'
  },
  {
    id: 'self_taught',
    description: 'Taught themselves everything they know — no master, no school, just necessity and stubbornness',
    statAffinity: { intelligence: 1.3, constitution: 1.2 },
    iconPrompt: 'Fantasy RPG icon. A figure alone in a makeshift study at night, borrowed or stolen books stacked around them, practicing a skill by candlelight with no master to correct their form and no one to ask.',
    iconPath: 'generator/genres/fantasy/icons/LIFE_EVENT#self_taught.png'
  },

  // ── QUIET ────────────────────────────────────────────────────────────────
  {
    id: 'good_childhood',
    description: 'Had a genuinely good childhood — which makes the contrast with everything since all the sharper',
    statAffinity: { wisdom: 1.1, charisma: 1.1 },
    iconPrompt: 'Fantasy RPG icon. A warm memory: a family gathered around a hearth in a modest cottage, laughter implied in their posture, the simplest kind of happiness — the kind that is much harder to find than it looks.',
    iconPath: 'generator/genres/fantasy/icons/LIFE_EVENT#good_childhood.png'
  },
  {
    id: 'still_from_home',
    description: 'Never travelled far from where they were born until recently — every town is still a little astonishing',
    statAffinity: { wisdom: 1.1, constitution: 1.1 },
    iconPrompt: 'Fantasy RPG icon. A wide-eyed traveler arriving at the gates of a large city for the first time, taking in the scale and noise and life with undisguised astonishment, pack from home still clean on their back.',
    iconPath: 'generator/genres/fantasy/icons/LIFE_EVENT#still_from_home.png'
  },
  {
    id: 'late_bloomer',
    description: 'Discovered their calling or power late — later than everyone around them — and is still catching up',
    statAffinity: { wisdom: 1.2, intelligence: 1.1 },
    iconPrompt: 'Fantasy RPG icon. An older-than-usual apprentice sitting among younger students in a training hall, working harder than anyone else in the room, unbothered by the gap and entirely driven to close it.',
    iconPath: 'generator/genres/fantasy/icons/LIFE_EVENT#late_bloomer.png'
  },
];
