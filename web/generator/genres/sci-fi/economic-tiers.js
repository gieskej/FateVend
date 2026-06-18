// ── ECONOMIC STATUS MARKERS ───────────────────────────────────────────────
// One tier per character, derived from profession economicTier + life event hints.
// Each tier includes concrete visual/sensory details for the AI prompt.

export const ECONOMIC_TIERS = {
  1: {
    label: "Below the Line",
    descriptors: [
      "stack bunk in an undercity shelter",
      "running on grey-market scrip",
      "no corp ID — invisible to the official economy",
      "synth-paste for every meal, no complaints left to give",
      "one bad shift from nothing",
    ],
    housing: [
      "undercity stack bunk",
      "abandoned maintenance corridor",
      "grey-market capsule pod",
      "substation squat",
    ],
    transport: [
      "on foot",
      "mag-rail with a borrowed pass",
      "unreliable cargo bike",
    ],
    iconPrompt:
      "Faceless homeless man crouching in a maintenance tunnel wearing worn ragged clothes, puddle, squalor, graffiti, broken pipes, trash, rats, emergency lighting, grime and desperation, ",
    iconPath:
      "generator/genres/sci-fi/icons/ECONOMIC_TIERS#tier1-below-the-line.webp",
  },
  2: {
    label: "Wage-Serf",
    descriptors: [
      "corp housing that belongs to the corp, not them",
      "paid in company scrip — spendable only at company outlets",
      "two shifts just to cover life support",
      "secondhand everything, maintained carefully",
      "the contract renews automatically unless they ask it not to",
    ],
    housing: [
      "corp-assigned hab unit",
      "shared worker block",
      "station dormitory bay",
    ],
    transport: [
      "public mag-rail",
      "corp shuttle pass",
      "beat-up personal skimmer",
    ],
    iconPrompt:
      "Faceless female corporate worker wearing a company-issue uniform, ID badge on a lanyard, sterile dormitory bunk behind them, company logo on the wall, exhausted compliance, weary expression, hunched shoulders",
    iconPath:
      "generator/genres/sci-fi/icons/ECONOMIC_TIERS#tier2-wage-serf.webp",
  },
  3: {
    label: "Independent Contractor",
    descriptors: [
      "their own hab — small, but theirs",
      "gig credits that clear in real currency",
      "ship share or reliable transport with actual specs",
      "a small emergency fund they try not to think about",
      "not corp-dependent, which costs something every day",
    ],
    housing: [
      "private hab unit",
      "berth on their own ship",
      "rented ring-sector apartment",
    ],
    transport: [
      "own ship or share of a ship",
      "reliable skimmer",
      "station transit unrestricted",
    ],
    iconPrompt:
      "Faceless male independent spacer in practical worn gear, small personal ship airlock behind them, hand on a battered toolkit, self-reliant expression, modest but free",
    iconPath:
      "generator/genres/sci-fi/icons/ECONOMIC_TIERS#tier3-independent-contractor.webp",
  },
  4: {
    label: "Corporate Citizen",
    descriptors: [
      "full benefits package from a tier-one megacorp",
      "real apartment with real air filtration",
      "company vehicle with actual performance specs",
      "expense account and the meetings that justify it",
      "access to corp medical that doesn't involve a waiting list",
    ],
    housing: [
      "corp-provided arcology apartment",
      "mid-ring private residence",
      "executive hab suite",
    ],
    transport: [
      "corp vehicle with full systems",
      "priority shuttle access",
      "company cruiser clearance",
    ],
    iconPrompt:
      "Faceless female mid-level corporate professional in clean business attire, arcology apartment window behind them showing filtered sky, polished and compliant",
    iconPath:
      "generator/genres/sci-fi/icons/ECONOMIC_TIERS#tier4-corporate-citizen.webp",
  },
  5: {
    label: "Elite / Exec",
    descriptors: [
      "arcology penthouse — the air is noticeably better",
      "personal ship or standing fleet access",
      "security detail that doesn't feel intrusive because they're good at their job",
      "money as a social instrument rather than a survival mechanism",
      "insulated from consequences in ways that have stopped being remarkable",
    ],
    housing: [
      "arcology penthouse",
      "private orbital residence",
      "multi-property portfolio",
    ],
    transport: [
      "personal ship",
      "private shuttle on demand",
      "corp executive transport with escort",
    ],
    iconPrompt:
      "Faceless male megacorporate executive in tailored suit, penthouse deck behind them, personal starship visible through panoramic viewport, security detail at the edge of frame, insulated from consequences",
    iconPath:
      "generator/genres/sci-fi/icons/ECONOMIC_TIERS#tier5-elite-exec.webp",
  },
};
