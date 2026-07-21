// genres/sci-fi/secrets.js
// One hidden thing per character — something the AI can pull on for dramatic tension.
// Secrets should never be stated openly in the character Entry;
// they inform how the AI steers the story.
//
// Each secret carries:
//   id, description, toneTag, severity (low | medium | high | explosive),
//   statAffinity (optional), criminalFlag (bool)
//   excludedBroad — optional array of race `broad` values (see races.js);
//     engine.js's buildSkeleton() drops this secret from the pool for a
//     character of one of these races (falling back to the full pool if
//     that would leave nothing). Omitted everywhere except entries that
//     would be redundant or self-contradictory for a specific race — e.g.
//     "secretly an android" doesn't work for a race already established as
//     Android.

export const SECRETS = [
  // ── CORPORATE / POLITICAL ─────────────────────────────────────────────────
  {
    id: "corp_informant",
    description:
      "Has been feeding information to a megacorporation — started as survival, is now something more complicated",
    toneTag: "gritty",
    severity: "high",
    statAffinity: { charisma: 1.1, wisdom: 0.9 },
    criminalFlag: true,
  },
  {
    id: "corp_war_act",
    description:
      "Did something during a corporate war that didn't make any official record — for very good reason",
    toneTag: "gritty",
    severity: "explosive",
    statAffinity: { constitution: 1.1, wisdom: 0.9 },
    criminalFlag: true,
  },
  {
    id: "proprietary_dataset",
    description:
      "Has a complete proprietary corporate dataset they've been sitting on — hasn't decided what to do with it, which is itself a decision",
    toneTag: "gritty",
    severity: "high",
    statAffinity: { intelligence: 1.3, wisdom: 1.1 },
    criminalFlag: true,
  },

  // ── IDENTITY ──────────────────────────────────────────────────────────────
  {
    id: "false_identity",
    description:
      "Operating under a different identity — the original is wanted, dead, or deleted from the record",
    toneTag: "gritty",
    severity: "high",
    statAffinity: { intelligence: 1.2, charisma: 1.2 },
    criminalFlag: true,
  },
  {
    id: "is_a_clone",
    description:
      "Is a clone — either unaware of it, or aware and telling absolutely no one; the original may or may not still exist",
    toneTag: "dramatic",
    severity: "explosive",
    statAffinity: { constitution: 1.1, wisdom: 1.1 },
    criminalFlag: false,
    excludedBroad: ["Clone"],
  },
  {
    id: "android_passing",
    description:
      "Is an android passing as biological — convincingly, mostly, until a medscanner or the wrong lighting says otherwise",
    toneTag: "dramatic",
    severity: "explosive",
    statAffinity: { charisma: 1.2, intelligence: 1.1 },
    criminalFlag: false,
    excludedBroad: ["Android"],
  },
  {
    id: "illegal_augs",
    description:
      "Has augmentations that are illegal or blacklisted — military-grade, experimental, or pulled from a prohibited batch",
    toneTag: "gritty",
    severity: "medium",
    statAffinity: { dexterity: 1.2, strength: 1.1 },
    criminalFlag: true,
  },
  {
    id: "borrowed_memories",
    description:
      "Has memories that didn't happen to them — at least one significant event is someone else's, and they've built part of their identity on it",
    toneTag: "dramatic",
    severity: "high",
    statAffinity: { wisdom: 1.2, intelligence: 0.9 },
    criminalFlag: false,
  },
  {
    id: "double_agent",
    description:
      "Currently working for two separate factions simultaneously — neither knows about the other, and the math on that eventually stops working",
    toneTag: "gritty",
    severity: "high",
    statAffinity: { charisma: 1.2, intelligence: 1.2 },
    criminalFlag: true,
  },

  // ── CRIMINAL PAST ─────────────────────────────────────────────────────────
  {
    id: "killed_someone",
    description:
      "Killed someone who didn't deserve it — the circumstances are complicated; the result is not",
    toneTag: "gritty",
    severity: "high",
    statAffinity: { constitution: 1.1, wisdom: 0.8 },
    criminalFlag: true,
  },
  {
    id: "bioweapon_smuggled",
    description:
      "Smuggled a bioweapon without knowing what was in the container — only found out at delivery, which was too late",
    toneTag: "gritty",
    severity: "explosive",
    statAffinity: { dexterity: 1.1, wisdom: 0.8 },
    criminalFlag: true,
  },
  {
    id: "black_site",
    description:
      "Knows the location and stated purpose of a corporate black site — and has the coordinates cached in two places",
    toneTag: "gritty",
    severity: "explosive",
    statAffinity: { intelligence: 1.3, wisdom: 1.2 },
    criminalFlag: true,
  },

  // ── BETRAYAL ──────────────────────────────────────────────────────────────
  {
    id: "sold_out_crew",
    description:
      "Sold out a crew or partner to save themselves — some of those people are still alive and still working",
    toneTag: "gritty",
    severity: "explosive",
    statAffinity: { charisma: 1.1, wisdom: 0.7 },
    criminalFlag: true,
  },
  {
    id: "rewrote_the_story",
    description:
      "Was an informant during a period they've since rewritten in their own head — the version they tell sounds better",
    toneTag: "gritty",
    severity: "high",
    statAffinity: { charisma: 1.2, wisdom: 0.8 },
    criminalFlag: true,
  },

  // ── HEALTH / EXISTENTIAL ──────────────────────────────────────────────────
  {
    id: "condition_catching_up",
    description:
      "Has a condition — biological, mechanical, or cognitive — that is going to catch up with them; the timeline is unclear",
    toneTag: "dramatic",
    severity: "medium",
    statAffinity: { constitution: 0.8, wisdom: 1.2 },
    criminalFlag: false,
  },
  {
    id: "addiction_managed",
    description:
      "Actively managing an addiction to stims, painkillers, or something with no approved name — and managing it well enough that nobody has noticed yet",
    toneTag: "gritty",
    severity: "medium",
    statAffinity: { constitution: 0.8, charisma: 1.1 },
    criminalFlag: false,
  },
  {
    id: "unpayable_debt",
    description:
      "Owes someone a debt they genuinely cannot repay — not financial, something more personal — and the other person is still waiting",
    toneTag: "dramatic",
    severity: "medium",
    statAffinity: { wisdom: 1.1, charisma: 1.1 },
    criminalFlag: false,
  },
];
