// genres/sci-fi/life-events.js
// Formative past events — one is selected per character.
// Each event carries:
//   id, description, statAffinity (stats that make this more likely),
//   toneTag (gritty | dramatic | neutral) for filtering,
//   economicHint (optional tier shift suggestion)

export const LIFE_EVENTS = [

  // ── WAR & CONFLICT ────────────────────────────────────────────────────────
  {
    id: 'corp_proxy_war',
    description: 'Survived a corporate proxy war — the sponsoring megacorps never officially existed',
    toneTag: 'gritty',
    statAffinity: { constitution: 1.3, wisdom: 1.1 },
  },
  {
    id: 'sole_survivor',
    description: 'Sole survivor of their unit or crew — still not sure whether that\'s luck or something worse',
    toneTag: 'gritty',
    statAffinity: { constitution: 1.2, wisdom: 1.2 },
  },
  {
    id: 'station_siege',
    description: 'Lived through a station siege — weeks of lockdown, rationed air, and decisions they still think about',
    toneTag: 'gritty',
    statAffinity: { constitution: 1.3, strength: 1.1 },
  },

  // ── CORPORATE ─────────────────────────────────────────────────────────────
  {
    id: 'corp_purge',
    description: 'Caught in a corporate purge — colleagues who knew too much disappeared over a week; they got out, just',
    toneTag: 'gritty',
    statAffinity: { wisdom: 1.2, dexterity: 1.1 },
  },
  {
    id: 'corp_indentured',
    description: 'Served time in corporate indentured labour — the contract had an end date; they counted every shift',
    toneTag: 'gritty',
    statAffinity: { constitution: 1.3, wisdom: 1.1 },
  },
  {
    id: 'corp_pawn',
    description: 'Used as a corporate pawn and discarded when the operation concluded — the paperwork said "restructuring"',
    toneTag: 'dramatic',
    statAffinity: { wisdom: 1.2, charisma: 0.9 },
  },

  // ── PERSONAL TRAGEDY ──────────────────────────────────────────────────────
  {
    id: 'void_incident',
    description: 'Lost their entire crew in a void incident — the official investigation found no fault, which was its own kind of finding',
    toneTag: 'dramatic',
    statAffinity: { wisdom: 1.3, constitution: 0.9 },
  },
  {
    id: 'aug_rejection',
    description: 'Catastrophic aug rejection after a botched installation — long recovery, lasting complications, a bill they\'re still paying',
    toneTag: 'gritty',
    statAffinity: { constitution: 0.8, wisdom: 1.2 },
  },
  {
    id: 'memory_wipe',
    description: 'Underwent a partial memory wipe — voluntary at the time, disputed now; what remains is edges and the feeling of edges',
    toneTag: 'dramatic',
    statAffinity: { wisdom: 1.2, intelligence: 0.9 },
    economicHint: -1,
  },
  {
    id: 'lost_partner',
    description: 'Lost a partner to a shipboard accident or a war that ended before anyone agreed it had started',
    toneTag: 'dramatic',
    statAffinity: { wisdom: 1.3, charisma: 0.9 },
  },

  // ── WONDER & DISCOVERY ────────────────────────────────────────────────────
  {
    id: 'first_contact',
    description: 'Was present at a first-contact event — classified, officially unremarkable, personally life-changing',
    toneTag: 'neutral',
    statAffinity: { wisdom: 1.3, intelligence: 1.2 },
  },
  {
    id: 'derelict_discovery',
    description: 'Found a derelict ship with something inside they haven\'t told anyone about — not because they can\'t, because they haven\'t decided what it means',
    toneTag: 'gritty',
    statAffinity: { wisdom: 1.2, dexterity: 1.1 },
  },
  {
    id: 'physics_violation',
    description: 'Witnessed something that violates known physics — they have a log entry, and they have never shared it',
    toneTag: 'neutral',
    statAffinity: { intelligence: 1.3, wisdom: 1.2 },
  },

  // ── CRIME & JUSTICE ───────────────────────────────────────────────────────
  {
    id: 'wrongful_prison',
    description: 'Did time for something wrongful — or something they did, just not quite the way the record tells it',
    toneTag: 'gritty',
    statAffinity: { wisdom: 1.2, constitution: 1.1 },
  },
  {
    id: 'burned_informant',
    description: 'Was an informant for a faction that later burned them without ceremony or compensation',
    toneTag: 'gritty',
    statAffinity: { wisdom: 1.2, charisma: 0.8 },
  },
  {
    id: 'heist_sideways',
    description: 'Part of a heist that went catastrophically sideways — some of the crew didn\'t make it; nobody talks about whose call it was',
    toneTag: 'gritty',
    statAffinity: { dexterity: 1.1, wisdom: 1.1 },
  },

  // ── DISASTER ──────────────────────────────────────────────────────────────
  {
    id: 'colony_collapse',
    description: 'Home colony collapsed — environmental failure, corporate abandonment, or conflict; they got out with what they could carry',
    toneTag: 'gritty',
    statAffinity: { constitution: 1.2, wisdom: 1.1 },
    economicHint: -1,
  },
  {
    id: 'ship_failure',
    description: 'Survived a catastrophic ship failure — crash-landed or ejected; the wreck is still on some navigation chart as a hazard marker',
    toneTag: 'gritty',
    statAffinity: { constitution: 1.3, dexterity: 1.1 },
  },
  {
    id: 'mass_evacuation',
    description: 'Part of a mass evacuation — left everything behind in under an hour; they are very efficient packers now',
    toneTag: 'dramatic',
    statAffinity: { constitution: 1.2, wisdom: 1.1 },
    economicHint: -1,
  },

  // ── ACHIEVEMENT ───────────────────────────────────────────────────────────
  {
    id: 'built_reputation',
    description: 'Built a reputation from nothing in a place that doesn\'t give second chances — entirely by not asking for one',
    toneTag: 'neutral',
    statAffinity: { charisma: 1.2, intelligence: 1.1 },
    economicHint: 1,
  },
  {
    id: 'megacorp_defector',
    description: 'Defected from a megacorp or military installation — burned every bridge on the way out and has no plans to rebuild them',
    toneTag: 'dramatic',
    statAffinity: { wisdom: 1.2, constitution: 1.1 },
    economicHint: -1,
  },
];
