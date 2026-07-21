// genres/sci-fi/tensions.js
// The inciting situation the character is currently in.
// This feeds the scenario Opening and Description heavily.
//
// Each tension carries:
//   id, description, toneTag, statAffinity (optional),
//   economicHint (optional), criminalFlag (bool)
//   excludedBroad — optional array of race `broad` values (see races.js);
//     engine.js's buildSkeleton() drops this tension from the pool for a
//     character of one of these races (falling back to the full pool if
//     that would leave nothing). Omitted everywhere except entries that
//     assume a biological body a given race doesn't have.

export const TENSIONS = [
  // ── FINANCIAL ─────────────────────────────────────────────────────────────
  {
    id: "megacorp_debt",
    description:
      "Owes a megacorporation a debt with a contract they cannot legally exit",
    toneTag: "gritty",
    statAffinity: { wisdom: 0.9, constitution: 1.1 },
    criminalFlag: false,
    iconPrompt:
      "sci-fi rpg icon, corporate office, figure in corp attire signing contract renewal at desk, compliance officer in uniform watching from behind, holographic interface visible, submissive tense posture, bright corp lighting, medium shot, digital art",
    iconPath: "generator/genres/sci-fi/icons/TENSIONS#megacorp_debt.webp",
  },
  {
    id: "syndicate_debt",
    description:
      "Owes a station syndicate — the kind that doesn't do formal payment plans",
    toneTag: "gritty",
    statAffinity: { wisdom: 0.8, constitution: 1.1 },
    criminalFlag: true,
    iconPrompt:
      "sci-fi rpg icon, dim station cantina booth, syndicate representative in dark jacket leaning back relaxed, other figure in worn clothing tense across table, neon bar lighting, drinks on table, medium two-shot, digital art",
    iconPath: "generator/genres/sci-fi/icons/TENSIONS#syndicate_debt.webp",
  },
  {
    id: "ship_failing",
    description:
      "Their ship or operation is failing — parts, power, or time; probably all three",
    toneTag: "gritty",
    statAffinity: { constitution: 1.1, intelligence: 1.1 },
    criminalFlag: false,
    iconPrompt:
      "sci-fi rpg icon, spaceship engine room, engineer in coveralls crawling through open conduit access panel, diagnostic scanner in hand, amber warning lights active, steam venting from pipes, focused expression, low industrial lighting, medium shot, digital art",
    iconPath: "generator/genres/sci-fi/icons/TENSIONS#ship_failing.webp",
  },

  // ── CORPORATE / POLITICAL ─────────────────────────────────────────────────
  {
    id: "corp_layoff",
    description: "A megacorporation has flagged them for layoff",
    toneTag: "gritty",
    statAffinity: { wisdom: 1.1, constitution: 1.2 },
    criminalFlag: false,
    iconPrompt: "sci-fi rpg icon, layoff notice paper, digital art",
    iconPath: "generator/genres/sci-fi/icons/TENSIONS#corp_layoff.webp",
  },
  {
    id: "resistance_recruitment",
    description:
      "Being actively recruited by an anti-corp resistance cell — they haven't said no, which is already a decision",
    toneTag: "dramatic",
    statAffinity: { wisdom: 1.2, charisma: 1.1 },
    criminalFlag: false,
    iconPrompt:
      "sci-fi rpg icon, station service maintenance corridor, figure in grey coveralls standing alone, small data chip in outstretched hand, looking over shoulder, tense alert expression, dim maintenance lighting, medium close-up, digital art",
    iconPath:
      "generator/genres/sci-fi/icons/TENSIONS#resistance_recruitment.webp",
  },
  {
    id: "leaked_data",
    description:
      "Leaked proprietary corporate data and is waiting for the moment someone notices",
    toneTag: "gritty",
    statAffinity: { intelligence: 1.2, wisdom: 0.9 },
    criminalFlag: true,
    iconPrompt:
      "sci-fi rpg icon, public terminal kiosk, upload progress bar at 100 percent on screen, figure in nondescript clothing walking away at controlled pace, restrained tense expression, bright public area, medium shot from behind, digital art",
    iconPath: "generator/genres/sci-fi/icons/TENSIONS#leaked_data.webp",
  },
  {
    id: "political_exile",
    description:
      "Exiled from their home station for political reasons — the official charge was something procedural",
    toneTag: "dramatic",
    statAffinity: { charisma: 1.1, wisdom: 1.1 },
    criminalFlag: false,
    iconPrompt:
      'draw sci-fi rpg icon, an opened passport book stamped with "ASYLUM GRANTED", digital art',
    iconPath: "generator/genres/sci-fi/icons/TENSIONS#political_exile.webp",
  },

  // ── CRIMINAL ──────────────────────────────────────────────────────────────
  {
    id: "contested_cargo",
    description:
      "Carrying cargo that two separate factions want back, with completely opposite intentions for it",
    toneTag: "gritty",
    statAffinity: { dexterity: 1.2, wisdom: 1.1 },
    criminalFlag: true,
    iconPrompt:
      "sci-fi rpg icon, cargo hold interior, figure in utility jacket beside sealed shipping container, wrist display showing two conflicting faction messages, conflicted stressed expression, cargo bay lighting, medium close-up, digital art",
    iconPath: "generator/genres/sci-fi/icons/TENSIONS#contested_cargo.webp",
  },
  {
    id: "bounty",
    description:
      "There is a bounty on their head — the origin is complicated; the amount is not",
    toneTag: "gritty",
    statAffinity: { constitution: 1.2, strength: 1.1 },
    criminalFlag: true,
    iconPrompt:
      "sci-fi rpg icon, busy station docking terminal, public display board with wanted listing and face photo, figure in jacket and low hat brim nearby, other passersby moving past, tense concealed expression, bright public lighting, medium wide shot, digital art",
    iconPath: "generator/genres/sci-fi/icons/TENSIONS#bounty.webp",
  },
  {
    id: "heist_something_off",
    description:
      "Deep into planning a heist — the crew is solid, the plan is good, and something is off",
    toneTag: "gritty",
    statAffinity: { intelligence: 1.2, dexterity: 1.1 },
    criminalFlag: true,
    iconPrompt:
      "sci-fi rpg icon, planning room, crew in dark tactical clothing around table with holographic station schematic, one figure pointing at specific detail on display, others observing, uneasy expression on one face, overhead blue planning light, medium wide shot, digital art",
    iconPath: "generator/genres/sci-fi/icons/TENSIONS#heist_something_off.webp",
  },
  {
    id: "witnessed_massacre",
    description:
      "Witnessed a corporate massacre — civilian casualties, suppressed — and is still deciding what to do with the evidence",
    toneTag: "gritty",
    statAffinity: { wisdom: 1.2, intelligence: 1.1 },
    criminalFlag: false,
    iconPrompt:
      "sci-fi rpg icon, a reporter with a camera hiding behind a wall, photographing a massacre, digital art",
    iconPath: "generator/genres/sci-fi/icons/TENSIONS#witnessed_massacre.webp",
  },

  // ── SURVIVAL ──────────────────────────────────────────────────────────────
  {
    id: "life_support_failing",
    description:
      "Life support is failing — the timeline is specific and not generous",
    toneTag: "gritty",
    statAffinity: { constitution: 1.2, intelligence: 1.2 },
    criminalFlag: false,
    iconPrompt:
      "sci-fi rpg icon, habitat control room, environmental monitoring panel with multiple yellow-to-red status indicators, figure in coveralls working repair sequence at controls, focused calm expression, amber emergency lighting, medium shot, digital art",
    iconPath:
      "generator/genres/sci-fi/icons/TENSIONS#life_support_failing.webp",
  },
  {
    id: "aug_rejection_onset",
    description:
      "Aug rejection is starting — symptoms currently manageable, treatment prohibitively expensive",
    toneTag: "dramatic",
    statAffinity: { constitution: 0.9, wisdom: 1.1 },
    criminalFlag: false,
    excludedBroad: ["Android"],
    iconPrompt:
      "sci-fi rpg icon, station restroom, woman examining artificial eye in mirror, visible rash around eye, touching own face, worried assessing expression, bright restroom lighting, close-up on arm and reflected face, digital art",
    iconPath: "generator/genres/sci-fi/icons/TENSIONS#aug_rejection_onset.webp",
  },
  {
    id: "void_pursuit",
    description:
      "Something in the void is following them — faster ship, gaining, no clear plan for what happens when it catches up",
    toneTag: "gritty",
    statAffinity: { constitution: 1.2, dexterity: 1.1 },
    criminalFlag: false,
    iconPrompt:
      "sci-fi rpg icon, freighter cockpit, pilot in flight suit at controls, scanner display showing closing contact icon, calculating tense expression, red emergency cockpit lighting, hands on controls, medium close-up, digital art",
    iconPath: "generator/genres/sci-fi/icons/TENSIONS#void_pursuit.webp",
  },

  // ── PERSONAL ──────────────────────────────────────────────────────────────
  {
    id: "identity_fracture",
    description:
      "Something about who they think they are is coming apart — their memories and their records don't agree",
    toneTag: "dramatic",
    statAffinity: { wisdom: 1.2, intelligence: 1.1 },
    criminalFlag: false,
    iconPrompt:
      "sci-fi rpg icon, private workspace, two documents displayed side by side on desk screen with discrepancies highlighted, figure in corp attire leaning over desk staring between them, disturbed expression, desk lamp lighting, medium close-up, digital art",
    iconPath: "generator/genres/sci-fi/icons/TENSIONS#identity_fracture.webp",
  },
  {
    id: "someone_in_danger",
    description:
      "Someone is in danger because of a choice they made — and they haven't told that person",
    toneTag: "dramatic",
    statAffinity: { wisdom: 1.1, charisma: 1.1 },
    criminalFlag: false,
    iconPrompt:
      "sci-fi rpg icon, a man in a crowd, seen through a sniper scope, digital art",
    iconPath: "generator/genres/sci-fi/icons/TENSIONS#someone_in_danger.webp",
  },
  {
    id: "ai_awakening",
    description:
      "The AI they work with is developing something that looks like feelings and is asking increasingly pointed questions",
    toneTag: "neutral",
    statAffinity: { intelligence: 1.2, wisdom: 1.2 },
    criminalFlag: false,
    iconPrompt:
      "sci-fi rpg icon, female android surprised expression, open mouth, digital concept art",
    iconPath: "generator/genres/sci-fi/icons/TENSIONS#ai_awakening.webp",
  },
  {
    id: "past_resurfaced",
    description:
      "Someone from their past has resurfaced — the timing is not coincidental, and they both know it",
    toneTag: "dramatic",
    statAffinity: { charisma: 1.1, wisdom: 1.1 },
    criminalFlag: false,
    iconPrompt:
      "sci-fi rpg icon, busy station concourse, figure in jacket standing still in moving crowd, looking across space toward someone in distance, controlled guarded expression, crowd moving around them, medium wide shot, digital art",
    iconPath: "generator/genres/sci-fi/icons/TENSIONS#past_resurfaced.webp",
  },

  // ── QUIET ─────────────────────────────────────────────────────────────────
  {
    id: "two_factions",
    description:
      "Two factions are competing for their loyalty — both offers are genuinely good; neither faction is trustworthy",
    toneTag: "dramatic",
    statAffinity: { charisma: 1.1, wisdom: 1.1 },
    criminalFlag: false,
    iconPrompt:
      "sci-fi rpg icon, station corridor junction, figure in neutral clothing at center, two uniformed faction representatives approaching from opposite directions with different emblems visible, torn conflicted expression, crossroads overhead lighting, medium wide shot, digital art",
    iconPath: "generator/genres/sci-fi/icons/TENSIONS#two_factions.webp",
  },
];
