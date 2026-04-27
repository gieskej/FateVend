// genres/fantasy/life-events.js

export const LIFE_EVENTS = [
  // ── LOSS ─────────────────────────────────────────────────────────────────
  { id:'village_burned',   description:'Their home village was destroyed — by war, monsters, or something worse — when they were young', statAffinity:{ constitution:1.2, wisdom:1.1 } },
  { id:'lost_mentor',      description:'Lost their teacher or mentor — the person who gave them their first real purpose', statAffinity:{ wisdom:1.2, intelligence:1.1 } },
  { id:'watch_friend_die', description:'Watched a companion die and couldn\'t prevent it — and has been running from that moment since', statAffinity:{ constitution:0.9, strength:1.1 } },
  { id:'lost_sibling_war', description:'Lost a sibling to war, conscription, or a campaign that should never have happened', statAffinity:{ wisdom:1.2, strength:1.1 } },

  // ── FAMILY FRACTURES ──────────────────────────────────────────────────────
  { id:'sold_to_guild',    description:'Was sold or indentured to a guild, temple, or trade as a child', statAffinity:{ constitution:1.2, wisdom:1.1 } },
  { id:'noble_fell',       description:'Their family was noble once — a war, a bad debt, or a political enemy ended that', statAffinity:{ charisma:1.1, wisdom:1.1 }, economicHint:-2 },
  { id:'bastard_child',    description:'Is a bastard — officially unacknowledged by a parent of some standing', statAffinity:{ charisma:1.1, wisdom:1.1 } },
  { id:'orphaned_war',     description:'Orphaned by a war or raid they\'re too young to remember clearly', statAffinity:{ constitution:1.2, strength:1.1 } },

  // ── FAILURE & DISGRACE ────────────────────────────────────────────────────
  { id:'failed_quest',     description:'Failed a quest or mission that mattered — lives were lost, and they carry that', statAffinity:{ wisdom:1.1, constitution:0.9 } },
  { id:'expelled_order',   description:'Was expelled from a guild, order, or temple — the official story isn\'t the whole truth', statAffinity:{ charisma:0.9, wisdom:1.1 } },
  { id:'betrayed_party',   description:'Betrayed by companions they trusted completely — has been cautious about trust since', statAffinity:{ wisdom:1.2, charisma:0.9 } },
  { id:'lost_battle',      description:'Survived a battle that everyone else didn\'t — asks themselves why, still', statAffinity:{ constitution:1.2, wisdom:1.1 } },

  // ── CRIME & INJUSTICE ─────────────────────────────────────────────────────
  { id:'wrongly_branded',  description:'Was wrongly accused, branded, or imprisoned — and the real culprit never faced justice', statAffinity:{ wisdom:1.2, charisma:0.9 } },
  { id:'served_wrong_lord',description:'Served a lord or cause they now know was wrong — won\'t talk about what they did', statAffinity:{ wisdom:1.1, constitution:0.9 } },
  { id:'escaped_slavery',  description:'Escaped slavery or forced servitude — carries both the scars and the skills it gave them', statAffinity:{ constitution:1.3, strength:1.2 }, economicHint:-1 },
  { id:'was_criminal',     description:'Had a criminal past — petty theft became something larger, and they eventually got out', statAffinity:{ dexterity:1.2, wisdom:1.1 } },

  // ── MAGIC & THE STRANGE ───────────────────────────────────────────────────
  { id:'cursed',           description:'Carries a curse — minor but persistent, a reminder of a bad decision or worse luck', statAffinity:{ wisdom:1.1, intelligence:1.1 } },
  { id:'magic_accident',   description:'Was caught in a magical accident that changed something fundamental about them', statAffinity:{ intelligence:1.2, wisdom:1.1 } },
  { id:'survived_ritual',  description:'Survived a ritual they weren\'t supposed to survive — nobody is sure what that means', statAffinity:{ constitution:1.3, wisdom:1.1 } },
  { id:'saw_something',    description:'Saw something they cannot explain — a vision, a creature, a truth — and it hasn\'t left them', statAffinity:{ wisdom:1.3, intelligence:1.1 } },

  // ── JOURNEY & REINVENTION ─────────────────────────────────────────────────
  { id:'long_road',        description:'Spent years wandering after leaving home — learned more about the world than about themselves', statAffinity:{ constitution:1.2, wisdom:1.1 } },
  { id:'deserted',         description:'Deserted from an army or order — technically still wanted in at least one jurisdiction', statAffinity:{ dexterity:1.2, wisdom:1.1 }, economicHint:-1 },
  { id:'changed_sides',    description:'Changed allegiances mid-conflict — has never been fully trusted by either side since', statAffinity:{ wisdom:1.2, charisma:0.9 } },
  { id:'made_pact',        description:'Made a pact or bargain they\'ve been paying off ever since — the terms were not as clear as they seemed', statAffinity:{ intelligence:1.2, wisdom:0.9 } },

  // ── ACHIEVEMENT & LUCK ────────────────────────────────────────────────────
  { id:'slew_monster',     description:'Killed something famous enough that stories about it still circulate — they\'re more complicated about it than the stories suggest', statAffinity:{ strength:1.3, constitution:1.1 }, economicHint:1 },
  { id:'found_treasure',   description:'Found significant treasure once — and spent it in ways that made sense at the time', statAffinity:{ wisdom:0.9, charisma:1.1 } },
  { id:'saved_someone_important', description:'Saved someone important without knowing who they were — the debt hasn\'t been called in yet', statAffinity:{ wisdom:1.1, charisma:1.1 } },
  { id:'self_taught',      description:'Taught themselves everything they know — no master, no school, just necessity and stubbornness', statAffinity:{ intelligence:1.3, constitution:1.2 } },

  // ── QUIET ────────────────────────────────────────────────────────────────
  { id:'good_childhood',   description:'Had a genuinely good childhood — which makes the contrast with everything since all the sharper', statAffinity:{ wisdom:1.1, charisma:1.1 } },
  { id:'still_from_home',  description:'Never travelled far from where they were born until recently — every town is still a little astonishing', statAffinity:{ wisdom:1.1, constitution:1.1 } },
  { id:'late_bloomer',     description:'Discovered their calling or power late — later than everyone around them — and is still catching up', statAffinity:{ wisdom:1.2, intelligence:1.1 } },
];
