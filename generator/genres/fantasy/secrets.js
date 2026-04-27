// genres/fantasy/secrets.js

export const SECRETS = [
  // ── IDENTITY ──────────────────────────────────────────────────────────────
  { id:'noble_blood',       description:'Has noble or royal blood they\'ve been hiding — claiming it would be complicated and dangerous', severity:'high',      statAffinity:{ charisma:1.2, intelligence:1.1 } },
  { id:'not_who_they_claim',description:'Is not who they claim to be — the real person is somewhere, and the lie is getting harder to maintain', severity:'explosive', statAffinity:{ charisma:1.3, dexterity:1.1 } },
  { id:'marked_by_darkness',description:'Bears a mark or corruption from a dark power — functional, hidden, and growing', severity:'explosive', statAffinity:{ constitution:0.9, intelligence:1.2 } },
  { id:'former_enemy',      description:'Was once an enemy of the people they now travel with — in a different life, or under different orders', severity:'explosive', statAffinity:{ wisdom:1.1, strength:1.1 } },
  { id:'divine_chosen',     description:'Has been marked or chosen by a deity — an honour they have not mentioned because the responsibilities are alarming', severity:'high', statAffinity:{ wisdom:1.3, charisma:1.1 } },

  // ── CRIME & GUILT ─────────────────────────────────────────────────────────
  { id:'killed_someone',    description:'Has killed someone who didn\'t deserve it — an accident, an order, a moment of rage — and lives with it', severity:'explosive', statAffinity:{ constitution:0.9, wisdom:1.1 } },
  { id:'responsible_for_disaster', description:'Was responsible for a disaster — directly or through inaction — that others have been blamed for', severity:'explosive', statAffinity:{ wisdom:0.9, intelligence:1.1 } },
  { id:'still_works_for_them', description:'Still has ties to a faction, organization, or lord they claim to have left', severity:'high', statAffinity:{ charisma:1.2, intelligence:1.2 } },
  { id:'stole_something_important', description:'Stole something significant — an artifact, a secret, an identity — and hasn\'t found a way to return it', severity:'high', statAffinity:{ dexterity:1.3, intelligence:1.2 } },
  { id:'betrayed_someone',  description:'Betrayed someone who trusted them completely — the betrayal had consequences they\'re still living with', severity:'high', statAffinity:{ charisma:1.1, wisdom:0.9 } },

  // ── MAGIC & POWER ─────────────────────────────────────────────────────────
  { id:'untrained_power',   description:'Has magical ability they\'ve never formally trained — more powerful than they should be, less controlled', severity:'high', statAffinity:{ intelligence:1.3, wisdom:0.9 } },
  { id:'pact_with_something', description:'Has made a pact with a being or power they haven\'t disclosed — the terms require occasional... services', severity:'explosive', statAffinity:{ charisma:1.2, wisdom:0.8 } },
  { id:'cursed_by_something', description:'Has been cursed in a way that isn\'t immediately obvious — it surfaces under pressure', severity:'medium', statAffinity:{ constitution:0.9, wisdom:1.1 } },
  { id:'lost_their_faith',  description:'Has privately lost their faith or connection to their deity — still going through the motions', severity:'medium', statAffinity:{ wisdom:1.2, charisma:0.9 } },

  // ── RELATIONSHIPS ─────────────────────────────────────────────────────────
  { id:'informing_on_party', description:'Has been reporting on their companions to a third party — the original reasons seemed justified', severity:'explosive', statAffinity:{ intelligence:1.2, charisma:1.1 } },
  { id:'protecting_enemy',  description:'Is protecting or covering for someone their companions would consider an enemy', severity:'high', statAffinity:{ charisma:1.2, wisdom:1.1 } },
  { id:'old_love',          description:'Has a significant person in their past — a love, a rival, a lost companion — who is now on the other side of a conflict', severity:'medium', statAffinity:{ charisma:1.1, wisdom:0.9 } },
  { id:'family_involved',   description:'Has a family member entangled in the current situation — in a way that creates a conflict of interest they\'ve concealed', severity:'high', statAffinity:{ wisdom:1.1, constitution:1.1 } },

  // ── QUIETER SECRETS ───────────────────────────────────────────────────────
  { id:'doesnt_want_this',  description:'Doesn\'t want the destiny, quest, or role that keeps finding them — and is starting to consider walking away from it', severity:'low', statAffinity:{ wisdom:1.2, charisma:0.9 } },
  { id:'knows_how_it_ends', description:'Has seen or been told how things end for them — and has told no one', severity:'medium', statAffinity:{ wisdom:1.3, intelligence:1.1 } },
  { id:'just_tired',        description:'Is more exhausted than they let on — has been running on obligation and stubbornness for a long time', severity:'low', statAffinity:{ constitution:0.8, wisdom:1.2 } },
  { id:'wants_something_simple', description:'Secretly wants something embarrassingly simple — a home, a quiet year, a garden — and is ashamed of how much', severity:'low', statAffinity:{ wisdom:1.2, constitution:1.1 } },
];
