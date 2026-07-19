// genres/modern/family-structures.js
// Family composition is randomized per character.
// The generator picks one STRUCTURE, then resolves each member's status.
//
// Structure shape:
//   id, label, parents (array), siblings (array),
//   statAffinity (optional weighting),
//   toneTag (gritty | dramatic | cozy | neutral)

export const PARENT_STATUSES = [
  {
    id: "present_close",
    label: "present and close",
    toneTag: "cozy",
    iconPrompt:
      "Modern RPG icon. A parent and adult child sharing a genuine moment of warmth — coffee on a kitchen table, a hand on a shoulder, the easy comfort of a relationship with real history in it.",
    iconPath: "generator/genres/modern/icons/PARENT_STATUS#present_close.webp",
  },
  {
    id: "present_distant",
    label: "present but emotionally distant",
    toneTag: "neutral",
    iconPrompt:
      "Modern RPG icon. A parent and adult child in the same room but not quite together — one focused elsewhere, a polite distance between them, the silence of people who have quietly stopped trying to reach.",
    iconPath:
      "generator/genres/modern/icons/PARENT_STATUS#present_distant.webp",
  },
  {
    id: "present_difficult",
    label: "present but a source of tension",
    toneTag: "dramatic",
    iconPrompt:
      "Modern RPG icon. A parent and adult child mid-tension in a kitchen or living room, voices not raised but the air loaded — a relationship that generates heat without ever generating light.",
    iconPath:
      "generator/genres/modern/icons/PARENT_STATUS#present_difficult.webp",
  },
  {
    id: "estranged",
    label: "estranged — no contact",
    toneTag: "dramatic",
    iconPrompt:
      "Modern RPG icon. An adult looking at an old family photo alone, the parent's face visible in the image but the relationship clearly severed — distance measured in years of unanswered calls.",
    iconPath: "generator/genres/modern/icons/PARENT_STATUS#estranged.webp",
  },
  {
    id: "deceased_recent",
    label: "recently deceased",
    toneTag: "dramatic",
    iconPrompt:
      "Modern RPG icon. A figure at a modern graveside, flowers still fresh, grief still raw — the loss recent enough that it hasn't settled into something manageable yet, the world still slightly wrong.",
    iconPath:
      "generator/genres/modern/icons/PARENT_STATUS#deceased_recent.webp",
  },
  {
    id: "deceased_long",
    label: "died when the character was young",
    toneTag: "gritty",
    iconPrompt:
      "Modern RPG icon. A worn photograph of a parent with a young child, kept in a wallet or a bedside drawer — the only tangible evidence of a person the character barely had time to know.",
    iconPath: "generator/genres/modern/icons/PARENT_STATUS#deceased_long.webp",
  },
  {
    id: "absent_unknown",
    label: "absent — never knew them",
    toneTag: "gritty",
    iconPrompt:
      "Modern RPG icon. An adult sitting with a blank space where a story should be — looking at documents or a name left empty on a form, the weight of a parent they never knew and have mostly stopped expecting to.",
    iconPath: "generator/genres/modern/icons/PARENT_STATUS#absent_unknown.webp",
  },
  {
    id: "incarcerated",
    label: "currently in prison",
    toneTag: "gritty",
    iconPrompt:
      "Modern RPG icon. A prison visitation room — two people on opposite sides of a table or partition, the awkward weight of a relationship maintained through scheduled hours and supervised conversation.",
    iconPath: "generator/genres/modern/icons/PARENT_STATUS#incarcerated.webp",
  },
  {
    id: "abroad",
    label: "lives far away, little contact",
    toneTag: "neutral",
    iconPrompt:
      "Modern RPG icon. Someone in a dim apartment late at night, phone in hand, a video call crossing time zones — the warmth of a parent still real, the distance between them unmistakable.",
    iconPath: "generator/genres/modern/icons/PARENT_STATUS#abroad.webp",
  },
];

export const SIBLING_DYNAMICS = [
  {
    id: "protective_older",
    label: "protective older sibling",
    toneTag: "cozy",
    iconPrompt:
      "Modern RPG icon. An older sibling with a hand on a younger one's shoulder, the posture instinctively protective — a long history of looking out for someone even when they didn't ask for it.",
    iconPath:
      "generator/genres/modern/icons/SIBLING_DYNAMIC#protective_older.webp",
  },
  {
    id: "rivalry",
    label: "long-running rivalry",
    toneTag: "dramatic",
    iconPrompt:
      "Modern RPG icon. Two adult siblings facing each other with the particular tension of people who know exactly which buttons to push — competition running underneath every exchange like a low current.",
    iconPath: "generator/genres/modern/icons/SIBLING_DYNAMIC#rivalry.webp",
  },
  {
    id: "estranged",
    label: "estranged — fell out years ago",
    toneTag: "dramatic",
    iconPrompt:
      "Modern RPG icon. An adult staring at a sibling's name on their phone screen, finger hovering, the hesitation before declining containing an entire history of something that went wrong and stayed that way.",
    iconPath: "generator/genres/modern/icons/SIBLING_DYNAMIC#estranged.webp",
  },
  {
    id: "close_ally",
    label: "closest friend and confidant",
    toneTag: "cozy",
    iconPrompt:
      "Modern RPG icon. Two siblings laughing about something only they understand, the ease of people who have been in each other's corner long enough that it's simply become baseline — no performance, just familiarity.",
    iconPath: "generator/genres/modern/icons/SIBLING_DYNAMIC#close_ally.webp",
  },
  {
    id: "troubled",
    label: "struggling with addiction or debt",
    toneTag: "gritty",
    iconPrompt:
      "Modern RPG icon. A sibling visibly struggling — worn appearance, a plea barely held back, asking for something the character isn't sure they can keep giving — the exhausting particular weight of loving someone in freefall.",
    iconPath: "generator/genres/modern/icons/SIBLING_DYNAMIC#troubled.webp",
  },
  {
    id: "golden_child",
    label: "the family's golden child — hard to live up to",
    toneTag: "dramatic",
    iconPrompt:
      "Modern RPG icon. A family gathering where one sibling's achievements subtly dominate the conversation, the other sibling aware of every comparison that isn't being made out loud — which somehow makes it worse.",
    iconPath: "generator/genres/modern/icons/SIBLING_DYNAMIC#golden_child.webp",
  },
  {
    id: "lost_touch",
    label: "drifted apart, rarely speak",
    toneTag: "neutral",
    iconPrompt:
      "Modern RPG icon. A sibling's name still in the contacts, months since the last message — lives that diverged not through conflict but through simple distance, not estranged, just gradually gone.",
    iconPath: "generator/genres/modern/icons/SIBLING_DYNAMIC#lost_touch.webp",
  },
  {
    id: "deceased",
    label: "deceased",
    toneTag: "gritty",
    iconPrompt:
      "Modern RPG icon. A figure holding something small that belonged to a deceased sibling — a photo, a piece of jewelry, a folded note — grief worn quietly into the ordinary fabric of daily life.",
    iconPath: "generator/genres/modern/icons/SIBLING_DYNAMIC#deceased.webp",
  },
  {
    id: "younger_dependent",
    label: "younger and still depends on the character",
    toneTag: "neutral",
    iconPrompt:
      "Modern RPG icon. An older sibling helping a younger one sort out a bill, a move, or a problem — the unspoken dynamic of the one who has always been the reliable one, still being reliable.",
    iconPath:
      "generator/genres/modern/icons/SIBLING_DYNAMIC#younger_dependent.webp",
  },
  {
    id: "reconnecting",
    label: "recently reconnected after years apart",
    toneTag: "neutral",
    iconPrompt:
      "Modern RPG icon. Two siblings at a coffee shop or bar after years apart, the conversation careful at first — each feeling for where the familiar thing between them still is, and slowly finding it.",
    iconPath: "generator/genres/modern/icons/SIBLING_DYNAMIC#reconnecting.webp",
  },
];

// Family structure templates.
// siblingCount: [min, max] — resolved at generation time.
// parentCount: 1 or 2 — determines which parent slots are filled.
export const FAMILY_STRUCTURES = [
  // ── TWO-PARENT HOUSEHOLDS ─────────────────────────────────────────────────
  {
    id: "two_parent_intact",
    label: "Two parents, still together",
    parentCount: 2,
    siblingCount: [0, 3],
    toneTag: "cozy",
    statAffinity: { wisdom: 1.1, charisma: 1.1 },
    notes:
      "Both parents are present. Relationship quality randomized separately.",
    iconPrompt:
      "Modern RPG icon. A two-parent household at a Sunday dinner — lived-in furniture, family photos on the walls, the comfortable unremarkable warmth of people who stayed and built something around that choice.",
    iconPath:
      "generator/genres/modern/icons/FAMILY_STRUCTURE#two_parent_intact.webp",
  },
  {
    id: "two_parent_divorced",
    label: "Parents divorced",
    parentCount: 2,
    siblingCount: [0, 3],
    toneTag: "dramatic",
    statAffinity: { wisdom: 0.9 },
    notes: "Both parents alive but separated. Each gets an independent status.",
    iconPrompt:
      "Modern RPG icon. A childhood bedroom that exists in two houses — a duplicate toothbrush, a weekend bag by the door, the specific logistics of a kid navigating two separate versions of home.",
    iconPath:
      "generator/genres/modern/icons/FAMILY_STRUCTURE#two_parent_divorced.webp",
  },
  {
    id: "two_parent_one_deceased",
    label: "One parent deceased, one surviving",
    parentCount: 2,
    siblingCount: [0, 2],
    toneTag: "dramatic",
    statAffinity: { wisdom: 1.1, constitution: 0.9 },
    notes:
      "One parent is deceased (timing randomized). Surviving parent status randomized.",
    iconPrompt:
      "Modern RPG icon. A family photo on a mantle where one face has become the focus of a small daily ritual — flowers, a candle — the surviving parent carrying on around a permanent and accepted absence.",
    iconPath:
      "generator/genres/modern/icons/FAMILY_STRUCTURE#two_parent_one_deceased.webp",
  },
  {
    id: "two_parent_one_absent",
    label: "One parent absent, one present",
    parentCount: 2,
    siblingCount: [0, 2],
    toneTag: "dramatic",
    statAffinity: { constitution: 1.1, charisma: 0.9 },
    notes:
      "One parent was never in the picture or left early. Surviving parent status randomized.",
    iconPrompt:
      "Modern RPG icon. A single parent and child doing ordinary things — homework on the kitchen table, dinner being made — the absent parent a shape in the room that everyone has learned not to name.",
    iconPath:
      "generator/genres/modern/icons/FAMILY_STRUCTURE#two_parent_one_absent.webp",
  },
  {
    id: "two_parent_blended",
    label: "Blended family — step-parent",
    parentCount: 2,
    siblingCount: [1, 4],
    toneTag: "neutral",
    statAffinity: {},
    notes:
      "One biological parent and one step-parent. May include half-siblings.",
    iconPrompt:
      "Modern RPG icon. A blended family around a dinner table that is still figuring out its own rules — step-siblings navigating newness, a step-parent attempting connection, something genuinely being built.",
    iconPath:
      "generator/genres/modern/icons/FAMILY_STRUCTURE#two_parent_blended.webp",
  },
  {
    id: "two_parent_both_troubled",
    label: "Both parents present but troubled",
    parentCount: 2,
    siblingCount: [0, 3],
    toneTag: "gritty",
    statAffinity: { constitution: 1.2, wisdom: 0.8 },
    notes:
      "Both parents in the home but with serious dysfunction — addiction, abuse, poverty.",
    iconPrompt:
      "Modern RPG icon. A child navigating a household where the adults are the source of instability — dishes in the sink, tension in the air, a kid who learned early to be very quiet and very capable.",
    iconPath:
      "generator/genres/modern/icons/FAMILY_STRUCTURE#two_parent_both_troubled.webp",
  },

  // ── SINGLE-PARENT HOUSEHOLDS ─────────────────────────────────────────────
  {
    id: "single_mother",
    label: "Raised by a single mother",
    parentCount: 1,
    parentGender: "mother",
    siblingCount: [0, 3],
    toneTag: "neutral",
    statAffinity: { charisma: 1.1, wisdom: 1.1 },
    notes: "Father absent, unknown, or deceased. Mother's status randomized.",
    iconPrompt:
      "Modern RPG icon. A single mother at the end of a long day, still moving, still managing — the specific exhaustion and quiet pride of someone who made it work entirely on their own terms.",
    iconPath:
      "generator/genres/modern/icons/FAMILY_STRUCTURE#single_mother.webp",
  },
  {
    id: "single_father",
    label: "Raised by a single father",
    parentCount: 1,
    parentGender: "father",
    siblingCount: [0, 2],
    toneTag: "neutral",
    statAffinity: { strength: 1.1, wisdom: 1.1 },
    notes: "Mother absent, unknown, or deceased. Father's status randomized.",
    iconPrompt:
      "Modern RPG icon. A single father and child navigating something domestic together — dinner, homework, bedtime — figuring it out through trial and the kind of closeness that comes from having no one else.",
    iconPath:
      "generator/genres/modern/icons/FAMILY_STRUCTURE#single_father.webp",
  },
  {
    id: "single_parent_struggling",
    label: "Single parent household under financial strain",
    parentCount: 1,
    siblingCount: [1, 4],
    toneTag: "gritty",
    statAffinity: { constitution: 1.2, wisdom: 1.1 },
    economicHint: -1,
    notes:
      "One parent working multiple jobs. Character may have taken on adult responsibilities early.",
    iconPrompt:
      "Modern RPG icon. A parent in work clothes coming through the door after a double shift, kid already asleep, bills on the counter — the particular dignity of someone keeping it together by the thinnest possible margin.",
    iconPath:
      "generator/genres/modern/icons/FAMILY_STRUCTURE#single_parent_struggling.webp",
  },

  // ── NO PARENTS ────────────────────────────────────────────────────────────
  {
    id: "raised_by_grandparents",
    label: "Raised by grandparents",
    parentCount: 0,
    siblingCount: [0, 2],
    toneTag: "neutral",
    statAffinity: { wisdom: 1.2, charisma: 0.9 },
    notes:
      "Both parents absent or deceased. Grandparents were primary caregivers.",
    iconPrompt:
      "Modern RPG icon. A grandparent and grandchild in a home full of another era's objects — mismatched furniture, old photographs — warm and close, with a generational gap built into every conversation.",
    iconPath:
      "generator/genres/modern/icons/FAMILY_STRUCTURE#raised_by_grandparents.webp",
  },
  {
    id: "raised_by_older_sibling",
    label: "Raised by an older sibling",
    parentCount: 0,
    siblingCount: [1, 2],
    toneTag: "gritty",
    statAffinity: { constitution: 1.2, loyalty: 1.3 },
    notes:
      "Parents gone. An older sibling stepped up. Deep bond, complicated dynamic.",
    iconPrompt:
      "Modern RPG icon. A young adult sibling and a younger kid in a small apartment, making something work with almost nothing — the older one stretched thin, the younger one old enough to know it.",
    iconPath:
      "generator/genres/modern/icons/FAMILY_STRUCTURE#raised_by_older_sibling.webp",
  },
  {
    id: "foster_care",
    label: "Grew up in foster care",
    parentCount: 0,
    siblingCount: [0, 1],
    toneTag: "gritty",
    statAffinity: { constitution: 1.3, charisma: 0.9, wisdom: 1.1 },
    notes: "No stable parental figures. Multiple placements possible.",
    iconPrompt:
      "Modern RPG icon. A teenager with a single bag of belongings outside a new front door, the practiced neutrality of someone who has done this before and learned not to unpack until they're sure.",
    iconPath: "generator/genres/modern/icons/FAMILY_STRUCTURE#foster_care.webp",
  },
  {
    id: "orphaned_early",
    label: "Orphaned before age ten",
    parentCount: 0,
    siblingCount: [0, 2],
    toneTag: "gritty",
    statAffinity: { constitution: 1.3, wisdom: 1.2 },
    notes:
      "Both parents died when the character was very young. Raised by relatives or the state.",
    iconPrompt:
      "Modern RPG icon. A child's hand holding a photograph of two people they barely remember, a relative's unfamiliar home in the background — the foundational absence that quietly shapes everything after.",
    iconPath:
      "generator/genres/modern/icons/FAMILY_STRUCTURE#orphaned_early.webp",
  },
  {
    id: "emancipated_minor",
    label: "Left home and became legally independent as a teenager",
    parentCount: 2,
    siblingCount: [0, 2],
    toneTag: "gritty",
    statAffinity: { constitution: 1.3, strength: 1.2, wisdom: 0.9 },
    notes:
      "Parents technically alive but the character left and never looked back.",
    iconPrompt:
      "Modern RPG icon. A teenager standing in a very small, bare apartment holding a key to their own place — the freedom and the weight of it arriving at exactly the same time.",
    iconPath:
      "generator/genres/modern/icons/FAMILY_STRUCTURE#emancipated_minor.webp",
  },

  // ── UNCONVENTIONAL ────────────────────────────────────────────────────────
  {
    id: "large_family",
    label: "Large, chaotic family household",
    parentCount: 2,
    siblingCount: [3, 6],
    toneTag: "neutral",
    statAffinity: { charisma: 1.2, constitution: 1.1 },
    notes:
      "Lots of siblings, relatives in and out. Character learned to fight for attention or disappear.",
    iconPrompt:
      "Modern RPG icon. A loud, crowded household at mealtime — too many people, not enough chairs, siblings talking over each other — the character somewhere in it, having learned either to be heard or to vanish.",
    iconPath:
      "generator/genres/modern/icons/FAMILY_STRUCTURE#large_family.webp",
  },
  {
    id: "only_child_wealthy",
    label: "Only child of wealthy parents",
    parentCount: 2,
    siblingCount: [0, 0],
    toneTag: "cozy",
    statAffinity: { intelligence: 1.2, charisma: 1.1 },
    economicHint: 2,
    notes:
      "Comfortable upbringing. May feel intense pressure or profound loneliness.",
    iconPrompt:
      "Modern RPG icon. A child alone in a large, well-furnished room with every material advantage — and the particular loneliness of having no one to share any of it with.",
    iconPath:
      "generator/genres/modern/icons/FAMILY_STRUCTURE#only_child_wealthy.webp",
  },
  {
    id: "only_child_isolated",
    label: "Only child, isolated upbringing",
    parentCount: 2,
    siblingCount: [0, 0],
    toneTag: "dramatic",
    statAffinity: { intelligence: 1.2, wisdom: 1.1, charisma: 0.8 },
    notes:
      "Few childhood friendships. Deeply self-reliant, struggles socially.",
    iconPrompt:
      "Modern RPG icon. A child alone in their room with books or a screen for company, parents present in the house but elsewhere — deeply self-reliant in the way you only get from having had no other option.",
    iconPath:
      "generator/genres/modern/icons/FAMILY_STRUCTURE#only_child_isolated.webp",
  },
  {
    id: "commune_or_compound",
    label: "Grew up in a commune, collective, or religious compound",
    parentCount: 2,
    siblingCount: [0, 3],
    toneTag: "dramatic",
    statAffinity: { wisdom: 1.2, charisma: 1.1 },
    notes:
      'Non-traditional upbringing. May have escaped or aged out. The outside world was always "other".',
    iconPrompt:
      "Modern RPG icon. A communal property at the edge of the ordinary world — shared meals, shared rules, a way of life deliberately insulated from outside — the character old enough now to understand what that meant.",
    iconPath:
      "generator/genres/modern/icons/FAMILY_STRUCTURE#commune_or_compound.webp",
  },
];
