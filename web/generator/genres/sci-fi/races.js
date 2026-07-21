// ── RACES ───────────────────────────────────────────────────────────────
// Structured as broad category + evocative flavor detail. Each entry:
//   id            — unique slug; used for slot-machine reel identity and icon lookup
//   broad         — coarse species category (e.g. 'Human', 'Android'); drives name-pool
//                    lookup, the android_origin family-structure override, and the
//                    NON_HUMANOID_BROAD face-prompt exclusion in voice.js's outputRules()
//   syntheticType — Android entries only: 'biomechanical' | 'plastic' | 'industrial' |
//                    undefined. Controls which of gender/orientation/relationship get
//                    generated vs. overridden (see buildSkeleton()), and — for
//                    'industrial' — which characterEntry/appearancePrompt template
//                    voice.js's outputRules() uses (chassis description instead of
//                    age/gender/hair/clothing).
//   allowedIndustries — optional; when present, restricts this race's profession roll
//                    (engine.js's profPool filter) to professions whose industry is in
//                    this list, falling back to the full pool if none match. Omitted
//                    everywhere except android_industrial, where it keeps the roll to
//                    physically-plausible manual-labor/security work for a heavy
//                    industrial chassis.
//   nonHumanoidBody — optional boolean, defaults to false/human-bodied when omitted.
//                    True for races whose body doesn't have human-style hair or skin
//                    (giant insects, plants, gas, fur-covered uplifts, etc.) — engine.js
//                    nulls out appearance.hair/distinguishingFeature/statNotes for these
//                    (same treatment as syntheticType 'industrial'; both are checked in
//                    buildSkeleton()), since a locust or a cloud of gas doesn't have a
//                    "blonde pixie cut" or a "well-groomed" grooming note to give.
//                    Humanoid-bodied races (alien_humanoid, Hybrid, Mutant, etc.) are
//                    left false — their flavor text already says everything except a
//                    named feature (ears, tail, scales) is human, hair included.
//   flavor        — physical/cultural detail passed to Claude for description prose;
//                    never stated as a clinical label in the output. If it contains
//                    ' — ' (space-em dash-space), only the text before the first
//                    one is shown in the UI (engine.js's _slots.race, used as the
//                    species reel's sub-label, and the output header in index.html) —
//                    the full string still reaches the AI prompt. Keep the punchy
//                    part first.
//   weight        — relative rarity for weighted-random selection (statAndWeightPick);
//                    races carry no statAffinity, so this is a flat rarity dial, not
//                    stat-scaled like profession/build weights are
//   iconPrompt    — text-to-image prompt used to generate this race's slot-machine reel icon
//   iconPath      — served path where that icon lives
// No stat affinities — race is not correlated with capability.

export const RACES = [
  // ── HUMAN VARIANTS ────────────────────────────────────────────────────
  {
    id: "human_earther",
    broad: "Human",
    flavor:
      "Earther — born gravity-side, stockier bone density, carries a particular wariness toward anyone who has never needed to worry about weather",
    weight: 5,
    iconPrompt:
      "sci-fi rpg icon, space transit hub, stocky weathered human in practical layered work clothing, alert scanning crowd expression, industrial background, overhead transit lighting, medium shot, digital concept art",
    iconPath: "generator/genres/sci-fi/icons/SPECIES#human_earther.webp",
  },

  // ── CYBORG ────────────────────────────────────────────────────────────
  {
    id: "cyborg_light",
    broad: "Cyborg",
    flavor:
      "Lightly augmented — one or two integrated systems, subdermal ports or a replacement limb, biological baseline mostly intact but the seams are visible if you look",
    weight: 1,
    iconPrompt:
      "sci-fi rpg icon, cyborg  man with mechanical eye, portrait, digital concept art",
    iconPath: "generator/genres/sci-fi/icons/SPECIES#cyborg_light.webp",
  },
  {
    id: "cyborg_heavy",
    broad: "Cyborg",
    flavor:
      "Heavily augmented — more synthetic than biological now, the remaining organic parts feel almost decorative, moves with a precision that unsettles people who aren't used to it",
    weight: 1,
    iconPrompt:
      "sci-fi rpg icon, cyborg man with mechanical body, portrait, digital concept art",
    iconPath: "generator/genres/sci-fi/icons/SPECIES#cyborg_heavy.webp",
  },

  // ── ANDROID ───────────────────────────────────────────────────────────
  // syntheticType controls which identity attributes are generated:
  //   'biomechanical' — full person: gender, orientation, relationship
  //   'plastic'       — gender for appearances only; forced asexual; no relationships
  //   'industrial'    — no gender, no orientation, no relationship
  {
    id: "android_synth",
    broad: "Android",
    syntheticType: "biomechanical",
    flavor:
      "Biomechanical Android — nearly human, fully synthetic, designed to pass all but deep medscans; sentient AI, the question of personhood is legally unsettled and they are aware of this",
    weight: 1,
    iconPrompt:
      "sci-fi rpg icon, beautiful woman with blue bobcut hair and blue eyes, flawless skin, face of a fashion model, covered shoulders, medium shot, digital concept art",
    iconPath: "generator/genres/sci-fi/icons/SPECIES#android_synth.webp",
  },
  {
    id: "android_standard",
    broad: "Android",
    syntheticType: "plastic",
    flavor:
      "Plastic Android — human-shaped but obviously synthetic; designed for customer-facing roles where a familiar form helps, but no one mistakes them for a person, advanced AI",
    weight: 1,
    iconPrompt:
      "sci-fi rpg icon, public transit space, a cute plastic android in neutral service attire standing in crowd, medium shot, digital concept art",
    iconPath: "generator/genres/sci-fi/icons/SPECIES#android_standard.webp",
  },
  {
    id: "android_industrial",
    broad: "Android",
    syntheticType: "industrial",
    flavor:
      "Industrial Android — purpose-built for heavy labor and industrial work, with no regard for aesthetics or social integration; treated as equipment, advanced AI",
    weight: 1,
    // Restricts the profession roll to physically-plausible work for a heavy
    // industrial chassis (engine.js's profPool filter) — without this, an
    // Industrial Android could just as easily roll "Corporate Executive" or
    // "Sex Worker" as "Cargo Hauler", which doesn't fit what it actually is.
    allowedIndustries: [
      "Logistics",
      "Salvage",
      "Settlement",
      "Shipping & transit",
      "Transit",
      "Security",
    ],
    iconPrompt:
      "sci-fi rpg icon, a bipedal heavy loader android with large pinchers at a construction site, medium shot, digital concept art",
    iconPath: "generator/genres/sci-fi/icons/SPECIES#android_industrial.webp",
  },
  {
    id: "android_combat",
    broad: "Android",
    syntheticType: "plastic",
    flavor:
      "Combat Android — purpose-built for combat and military operations, with advanced weaponry and armor; classified as a weapons platform, not a person, advanced AI",
    weight: 1,
    iconPrompt:
      "sci-fi rpg icon, a combat android with exposed joints, holding laser rifle, wearing powered armor, rocket pack, multiple eyes, medium shot, digital concept art",
    iconPath: "generator/genres/sci-fi/icons/SPECIES#android_combat.webp",
  },

  // ── UPLIFTED ──────────────────────────────────────────────────────────
  {
    id: "uplift_primate",
    broad: "Uplifted",
    flavor:
      "Uplifted primate — enhanced cognition and fine motor precision from a corps-funded programme that's since been shut down, navigates a world built for a species that still isn't sure how to treat them",
    weight: 1,
    nonHumanoidBody: true,
    iconPrompt:
      "sci-fi rpg icon, uplifted primate bipedal figure in lab coveralls, fine motor work with tools, sapient focused expression, corp lab environment, overhead lab lighting, medium shot, digital concept art",
    iconPath: "generator/genres/sci-fi/icons/SPECIES#uplift_primate.webp",
  },
  {
    id: "uplift_feline",
    broad: "Uplifted",
    flavor:
      "Uplifted feline — heightened reflexes and senses, bipedal and fully sapient, the ears, paws and tail are real, the patience for human inefficiency is synthetic",
    weight: 1,
    nonHumanoidBody: true,
    iconPrompt:
      "sci-fi rpg icon, transit concourse, bipedal uplifted feline in tactical clothing, cat ears, paws, tail visible, yellow cat eyes with vertical slit pupils, neon transit lighting, medium shot, digital concept art",
    iconPath: "generator/genres/sci-fi/icons/SPECIES#uplift_feline.webp",
  },
  // ── HYBRID ─────────────────────────────────────────────────────────────
  {
    id: "hybrid_hare",
    broad: "Hybrid",
    flavor:
      "Hybrid hare — Human-like, except for the bunny ears, tail, and harelip. Heightened reflexes and senses, bipedal and fully sapient, the ears and tail are real",
    weight: 1,
    iconPrompt:
      "sci-fi rpg icon, a cute bunny girl with ears and tail, medium shot, digital concept art",
    iconPath: "generator/genres/sci-fi/icons/SPECIES#hybrid_hare.webp",
  },
  {
    id: "hybrid_feline",
    broad: "Hybrid",
    flavor:
      "Hybrid feline — Human-like, except for the cat ears, tail, and whiskers. Heightened reflexes and senses, bipedal and fully sapient, the ears and tail are real",
    weight: 1,
    iconPrompt:
      "sci-fi rpg icon, a cute cat girl with cat ears, yellow cat eyes with vertical slit pupils, and tail, medium shot, digital concept art",
    iconPath: "generator/genres/sci-fi/icons/SPECIES#hybrid_feline.webp",
  },

  // ── CLONE ─────────────────────────────────────────────────────────────
  {
    id: "clone_baseline",
    broad: "Clone",
    flavor:
      "Clone — baseline print, no notable deviations from the source template, grown and decanted like product; the paperwork says they have rights and the paperwork is technically accurate",
    weight: 1,
    iconPrompt:
      "sci-fi rpg icon, corp work environment, 3girls, identical faces, identical uniforms, face like Grace Park, careful neutral expression, fluorescent corp lighting, medium shot, digital concept art",
    iconPath: "generator/genres/sci-fi/icons/SPECIES#clone_baseline.webp",
  },

  // ── MUTANT ────────────────────────────────────────────────────────────
  {
    id: "mutant",
    broad: "Mutant",
    flavor:
      "Mutant — radiation, unregulated biotech, or something in the water; whatever the cause the changes are real and unasked-for, and they have learned which ones to hide",
    weight: 1,
    iconPrompt:
      "sci-fi rpg icon, woman with dark blue skin, scales and very large eyes, low-corp district alley or corridor, warm lighting, medium shot, digital concept art",
    iconPath: "generator/genres/sci-fi/icons/SPECIES#mutant.webp",
  },

  // ── ALIEN ─────────────────────────────────────────────────────────────
  {
    id: "alien_humanoid",
    broad: "Alien",
    flavor:
      "Humanoid alien — bipedal, bilaterally symmetrical, close enough to pass in a crowd until they don't; first contact was a generation ago and the social infrastructure for integration is still catching up",
    weight: 1,
    iconPrompt:
      "sci-fi rpg icon, humanoid with pointy ears, black bowlcut and a raised eyebrow, medium shot, digital concept art",
    iconPath: "generator/genres/sci-fi/icons/SPECIES#alien_humanoid.webp",
  },
  {
    id: "alien_slug",
    broad: "Alien",
    flavor:
      "Slug alien — the interface between their natural form and human-built space requires ongoing adaptation in both directions; they have opinions about the chair situation",
    weight: 1,
    nonHumanoidBody: true,
    iconPrompt:
      "sci-fi rpg icon, giant slug alien slithering down a ship corridor, antennae, eyepods, snail trail, rearing up, navel, overhead station lighting, wide shot, digital concept art",
    iconPath: "generator/genres/sci-fi/icons/SPECIES#alien_nonhumanoid.webp",
  },
  {
    id: "alien_locust",
    broad: "Alien",
    flavor:
      "Locust alien — Resembles terran locust, except they are man-sized, walk upright and are surprisingly clever.  Always hungry.",
    weight: 1,
    nonHumanoidBody: true,
    iconPrompt:
      "sci-fi rpg icon, giant locust holding a laser gun, digital concept art",
    iconPath: "generator/genres/sci-fi/icons/SPECIES#alien_locust.webp",
  },
  {
    id: "alien_reptilian",
    broad: "Alien",
    flavor:
      "Reptilian alien — Resembles terran lizard, except they are man-sized, walk upright and are surprisingly clever.  Always hungry.",
    weight: 1,
    nonHumanoidBody: true,
    iconPrompt:
      "sci-fi rpg icon, giant iguana standing upright holding a laser gun, digital concept art",
    iconPath: "generator/genres/sci-fi/icons/SPECIES#alien_reptilian.webp",
  },
  {
    id: "alien_avian",
    broad: "Alien",
    flavor: "Avian alien — Humanoid alien with bird-like features.",
    weight: 1,
    nonHumanoidBody: true,
    iconPrompt:
      "sci-fi rpg icon, bird man with beak, feathers, arms, wings, holding a laser gun, digital concept art",
    iconPath: "generator/genres/sci-fi/icons/SPECIES#alien_avian.webp",
  },
  {
    id: "alien_amoeba",
    broad: "Alien",
    flavor: "Amoeba alien — A shapeshifting alien made of gelatinous goo",
    weight: 1,
    nonHumanoidBody: true,
    iconPrompt:
      "sci-fi rpg icon, green jelly girl holding a laser gun, digital concept art",
    iconPath: "generator/genres/sci-fi/icons/SPECIES#alien_amoeba.webp",
  },
  {
    id: "alien_plant",
    broad: "Alien",
    flavor: "Plant alien — A sentient alien plant",
    weight: 1,
    nonHumanoidBody: true,
    iconPrompt:
      "sci-fi rpg icon, blue bald woman with small flowers budding from her head holding a laser gun, digital concept art",
    iconPath: "generator/genres/sci-fi/icons/SPECIES#alien_plant.webp",
  },
  {
    id: "alien_vapor",
    broad: "Alien",
    flavor: "Vapor alien — A sentient shapeshifting gaseous alien",
    weight: 1,
    nonHumanoidBody: true,
    iconPrompt:
      "sci-fi rpg icon, cloud man standing in corridor, digital concept art",
    iconPath: "generator/genres/sci-fi/icons/SPECIES#alien_vapor.webp",
  },
  {
    id: "alien_typical",
    broad: "Alien",
    flavor: "Typical alien — A typical green alien with big eyes",
    weight: 1,
    nonHumanoidBody: true,
    iconPrompt:
      "sci-fi rpg icon, typical green alien with big eyes, digital concept art",
    iconPath: "generator/genres/sci-fi/icons/SPECIES#alien_typical.webp",
  },
];
