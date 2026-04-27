// genres/fantasy/tensions.js

export const TENSIONS = [
  // ── DEBTS & OBLIGATIONS ───────────────────────────────────────────────────
  { id:'debt_to_guild',    description:'Owes a significant debt to a guild or criminal organization — the clock is ticking', toneTag:'dramatic', criminalFlag:true },
  { id:'owed_service',     description:'Is bound by oath or contract to perform a service they\'ve been avoiding', toneTag:'dramatic', criminalFlag:false },
  { id:'price_on_head',    description:'Has a bounty on their head in at least one territory — for reasons that are complicated', toneTag:'gritty', criminalFlag:true },
  { id:'magic_debt',       description:'Owes a debt to something supernatural — a spirit, a deity, or something harder to name', toneTag:'dramatic', criminalFlag:false },

  // ── PURSUIT & DANGER ──────────────────────────────────────────────────────
  { id:'being_hunted',     description:'Is being hunted by someone with the resources to actually find them', toneTag:'gritty', criminalFlag:true },
  { id:'prophecy_attached',description:'Has had a prophecy attached to their name — and is not sure if they believe it, but others do', toneTag:'dramatic', criminalFlag:false },
  { id:'cursed_item',      description:'Is in possession of something powerful and cursed that they cannot simply put down', toneTag:'dramatic', criminalFlag:false },
  { id:'old_enemy_resurfaces', description:'An enemy from their past has resurfaced — better resourced and angrier than before', toneTag:'gritty', criminalFlag:false },
  { id:'witness_to_conspiracy', description:'Witnessed something they weren\'t supposed to see — the people involved have noticed', toneTag:'gritty', criminalFlag:true },

  // ── DUTY & LOYALTY ────────────────────────────────────────────────────────
  { id:'lord_demands_it',  description:'Their lord, patron, or employer has issued a command they are not comfortable carrying out', toneTag:'dramatic', criminalFlag:false },
  { id:'protect_someone',  description:'Responsible for protecting someone who makes that job as difficult as possible', toneTag:'neutral', criminalFlag:false },
  { id:'conflicting_oaths',description:'Has made oaths to two parties whose interests are now directly in conflict', toneTag:'dramatic', criminalFlag:false },
  { id:'last_of_something',description:'Is the last known member of an order, bloodline, or tradition — and that means something dangerous', toneTag:'dramatic', criminalFlag:false },

  // ── POWER & AMBITION ──────────────────────────────────────────────────────
  { id:'power_growing',    description:'Their power is growing faster than their control — and they haven\'t told anyone', toneTag:'dramatic', criminalFlag:false },
  { id:'something_wants_them', description:'Something magical or divine is taking an interest in them — the attention is not comfortable', toneTag:'dramatic', criminalFlag:false },
  { id:'rival_ahead',      description:'A rival is close to achieving something that would be very bad for everyone — including them', toneTag:'neutral', criminalFlag:false },
  { id:'political_pawn',   description:'Has been caught between two powerful factions who both want to use them', toneTag:'dramatic', criminalFlag:false },

  // ── PERSONAL ─────────────────────────────────────────────────────────────
  { id:'searching_for_someone', description:'Is searching for someone who disappeared — or was taken — and the trail is finally warm', toneTag:'neutral', criminalFlag:false },
  { id:'past_catches_up',  description:'Something from their past is catching up — a choice, a crime, a person, a promise', toneTag:'dramatic', criminalFlag:false },
  { id:'health_or_curse',  description:'Something is wrong with them — a wound, a curse, a corruption — and they haven\'t told their companions', toneTag:'dramatic', criminalFlag:false },
  { id:'running_out_of_time', description:'Is working against a deadline they haven\'t told anyone about — something will happen if they don\'t act', toneTag:'dramatic', criminalFlag:false },

  // ── GRITTY ────────────────────────────────────────────────────────────────
  { id:'job_gone_wrong',   description:'A job went sideways — someone died who wasn\'t supposed to, and the fallout is still arriving', toneTag:'gritty', criminalFlag:true },
  { id:'forced_to_work_with_enemy', description:'Has been forced to work alongside someone they deeply distrust — or outright hate', toneTag:'gritty', criminalFlag:false },
  { id:'broke_and_desperate', description:'Flat broke in a city that rewards wealth and punishes poverty, with skills and no coin', toneTag:'gritty', criminalFlag:false },

  // ── COZY / LIGHT ─────────────────────────────────────────────────────────
  { id:'reluctant_hero',   description:'Keeps being asked to solve problems they didn\'t cause and didn\'t volunteer for', toneTag:'cozy', criminalFlag:false },
  { id:'first_adventure',  description:'Has landed in their first real adventure — considerably more dangerous than anticipated', toneTag:'cozy', criminalFlag:false },
  { id:'unlikely_alliance', description:'Has formed an unlikely alliance that makes both parties uncomfortable — but it\'s working', toneTag:'cozy', criminalFlag:false },
];
