// genres/paleolithic/secrets.js
// Hidden truths — one per character; never stated openly in the character
// Entry, informs how the AI steers the story. Each secret carries:
//   id, description, toneTag, severity (low | medium | high | explosive),
//   statAffinity (optional), criminalFlag (bool)

export const SECRETS = [
  // ── BLOOD & DEATH ─────────────────────────────────────────────────────────
  {
    id: "killed_tribesman",
    description:
      "Killed a tribesman during a dispute that was ruled an accident — it was not an accident, and the dead man's family carries a grief that does not quite match the story",
    toneTag: "gritty",
    severity: "explosive",
    statAffinity: { constitution: 1.1, wisdom: 0.8 },
    criminalFlag: true,
  },
  {
    id: "abandoned_injured",
    description:
      "Left an injured hunter behind when flight was the only option — told the tribe the person had already died; the tribe believed it, and might still",
    toneTag: "gritty",
    severity: "high",
    statAffinity: { constitution: 1.1, charisma: 0.9 },
    criminalFlag: true,
  },
  {
    id: "caused_predator",
    description:
      "Was responsible for drawing the predator that killed two people — a loud fire, a careless path, a smell they knew was dangerous — and has never said so",
    toneTag: "gritty",
    severity: "high",
    statAffinity: { wisdom: 0.9, constitution: 1.1 },
    criminalFlag: false,
  },

  // ── TRIBAL BETRAYAL ───────────────────────────────────────────────────────
  {
    id: "stealing_stores",
    description:
      "Has been quietly taking small amounts from the communal food cache during lean seasons — the amounts are small, but they have been doing it for two winters",
    toneTag: "gritty",
    severity: "high",
    statAffinity: { wisdom: 0.8, constitution: 1.1 },
    criminalFlag: true,
  },
  {
    id: "betrayed_location",
    description:
      "Gave the location of the tribe's winter camp to a rival group in exchange for safe passage — it was before they truly belonged here, but the camp was raided and people died",
    toneTag: "gritty",
    severity: "explosive",
    statAffinity: { charisma: 1.1, wisdom: 0.7 },
    criminalFlag: true,
  },
  {
    id: "rival_tribe_contact",
    description:
      "Has been secretly meeting with someone from a rival tribe — trading information, trading favors; started as curiosity, continued as something harder to name",
    toneTag: "dramatic",
    severity: "high",
    statAffinity: { charisma: 1.2, wisdom: 1.1 },
    criminalFlag: true,
  },

  // ── IDENTITY ──────────────────────────────────────────────────────────────
  {
    id: "not_true_born",
    description:
      "Is not of this tribe's bloodline — was adopted or traded as a child and told a different story; two elders know the truth and have kept it out of kindness",
    toneTag: "dramatic",
    severity: "medium",
    statAffinity: { constitution: 1.1, charisma: 1.1 },
    criminalFlag: false,
  },
  {
    id: "desecrated_burial",
    description:
      "Took something from the sacred burial ground once — hunger, curiosity, desperation; the ancestors have not been right since, and the shaman suspects",
    toneTag: "dramatic",
    severity: "explosive",
    statAffinity: { wisdom: 0.8, constitution: 1.1 },
    criminalFlag: true,
  },
  {
    id: "false_vision",
    description:
      "Once fabricated a spirit vision that the tribe made a significant decision around — the decision was correct by luck, but the lie has grown roots",
    toneTag: "dramatic",
    severity: "high",
    statAffinity: { charisma: 1.2, wisdom: 0.8 },
    criminalFlag: false,
  },

  // ── FORBIDDEN KNOWLEDGE ───────────────────────────────────────────────────
  {
    id: "knows_better_camp",
    description:
      "Knows of a better campsite — more sheltered, better hunting, with permanent water — but it lies in territory where going would mean leaving everything familiar behind",
    toneTag: "neutral",
    severity: "low",
    statAffinity: { intelligence: 1.2, wisdom: 1.1 },
    criminalFlag: false,
  },
  {
    id: "shaman_knowledge",
    description:
      "Has learned certain shamanic knowledge they were never meant to know — overheard a ceremony, read signs meant for other eyes; they have the knowledge but not the permission",
    toneTag: "dramatic",
    severity: "medium",
    statAffinity: { intelligence: 1.3, wisdom: 1.2 },
    criminalFlag: false,
  },
  {
    id: "sickness_source",
    description:
      "Knows what caused the last illness to sweep the camp — contaminated water source, a tainted animal — but identified it too late and said nothing, hoping it would pass",
    toneTag: "gritty",
    severity: "medium",
    statAffinity: { wisdom: 1.1, intelligence: 1.1 },
    criminalFlag: false,
  },

  // ── PERSONAL ──────────────────────────────────────────────────────────────
  {
    id: "child_not_theirs",
    description:
      "The child the tribe believes is theirs was fathered or born outside the pairing — the other parent is someone everyone knows; this has never been said aloud",
    toneTag: "dramatic",
    severity: "high",
    statAffinity: { charisma: 1.1, wisdom: 1.0 },
    criminalFlag: false,
  },
  {
    id: "enemy_mercy",
    description:
      "Once spared an enemy warrior when the tribe needed them dead — let them go in the dark, said the body was lost in the river; the enemy is probably still out there",
    toneTag: "dramatic",
    severity: "high",
    statAffinity: { wisdom: 1.2, constitution: 1.1 },
    criminalFlag: false,
  },
];
