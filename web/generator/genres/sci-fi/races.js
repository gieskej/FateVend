// ── RACES ───────────────────────────────────────────────────────────────
// Structured as broad category + evocative flavor detail.
// The flavor informs Claude's physical/behavioral description prose —
// never stated as a clinical label in the output.
// No stat affinities — race is not correlated with capability.

export const RACES = [

  // ── HUMAN VARIANTS ────────────────────────────────────────────────────
  {
    id: 'human_earther',
    broad: 'Human',
    flavor: 'Earther — born gravity-side, stockier bone density, carries a particular wariness toward anyone who has never needed to worry about weather',
    weight: 15,
    iconPrompt: 'sci-fi rpg icon, space transit hub, stocky weathered human in practical layered work clothing, alert scanning crowd expression, industrial background, overhead transit lighting, medium shot, digital concept art',
    iconPath: 'generator/genres/sci-fi/icons/SPECIES#human_earther.png'
  },
  {
    id: 'human_colonist',
    broad: 'Human',
    flavor: 'Colonist — raised on a settled world not Earth, adapted to local gravity and light, pragmatic in ways that confuse people who grew up with safety nets',
    weight: 12,
    iconPrompt: 'sci-fi rpg icon, colony world habitat edge, lean human in functional field gear, confident pragmatic posture, bright adapted-world daylight, open frontier background, medium shot, digital concept art',
    iconPath: 'generator/genres/sci-fi/icons/SPECIES#human_colonist.png'
  },
  {
    id: 'human_spacer',
    broad: 'Human',
    flavor: 'Spacer — born or raised aboard ships or stations, lean frame from variable-g, skin that\'s never quite seen enough real light, reads pressure changes in a room the way others read faces',
    weight: 8,
    iconPrompt: 'sci-fi rpg icon, ship corridor, lean pale human in worn flight suit with hollow alert eyes, hyperaware scanning posture, hand resting on bulkhead, low corridor lighting, medium close-up, digital concept art',
    iconPath: 'generator/genres/sci-fi/icons/SPECIES#human_spacer.png'
  },
  {
    id: 'human_corp',
    broad: 'Human',
    flavor: 'Corp citizen — raised inside a megacorporate arcology, good teeth, filtered air their whole life, a slightly uncanny social ease that comes from being managed since birth',
    weight: 8,
    iconPrompt: 'sci-fi rpg icon, corporate arcology corridor, well-groomed human in crisp corp-standard uniform, polished practiced social expression, glass and steel interior, bright filtered lighting, medium shot, digital concept art',
    iconPath: 'generator/genres/sci-fi/icons/SPECIES#human_corp.png'
  },

  // ── CYBORG ────────────────────────────────────────────────────────────
  {
    id: 'cyborg_light',
    broad: 'Cyborg',
    flavor: 'Lightly augmented — one or two integrated systems, subdermal ports or a replacement limb, biological baseline mostly intact but the seams are visible if you look',
    weight: 12,
    iconPrompt: 'sci-fi rpg icon, cyborg  man with mechanical eye, portrait, digital concept art',
    iconPath: 'generator/genres/sci-fi/icons/SPECIES#cyborg_light.png'
  },
  {
    id: 'cyborg_heavy',
    broad: 'Cyborg',
    flavor: 'Heavily augmented — more synthetic than biological now, the remaining organic parts feel almost decorative, moves with a precision that unsettles people who aren\'t used to it',
    weight: 5,
    iconPrompt: 'sci-fi rpg icon, cyborg man with mechanical body, portrait, digital concept art',
    iconPath: 'generator/genres/sci-fi/icons/SPECIES#cyborg_heavy.png'
  },

  // ── ANDROID ───────────────────────────────────────────────────────────
  {
    id: 'android_synth',
    broad: 'Android',
    flavor: 'Biomechanical — nearly human, fully synthetic, designed to pass all but deep medscans; the question of personhood is legally unsettled and they are aware of this',
    weight: 6,
    iconPrompt: 'sci-fi rpg icon, beautiful woman with blue bobcut hair and blue eyes, flawless skin, face of a fashion model, covered shoulders, medium shot, digital concept art',
    iconPath: 'generator/genres/sci-fi/icons/SPECIES#android_synth.png'
  },
  {
    id: 'android_standard',
    broad: 'Android',
    flavor: 'Mechanical Android — Sorta human-like caricature, but obviously synthetic, designed to perform routine tasks in public spaces',
    weight: 6,
    iconPrompt: 'sci-fi rpg icon, public transit space, a cute plastic android in neutral service attire standing in crowd, medium shot, digital concept art',
    iconPath: 'generator/genres/sci-fi/icons/SPECIES#android_standard.png'
  },
  {
    id: 'android_industrial',
    broad: 'Android',
    flavor: 'Industrial Android — Purpose built mechanical androids designed for heavy labor and industrial work, with little regard for aesthetics or social integration',
    weight: 6,
    iconPrompt: 'sci-fi rpg icon, a bipedal heavy loader android with large pinchers at a construction site, medium shot, digital concept art',
    iconPath: 'generator/genres/sci-fi/icons/SPECIES#android_industrial.png'
  },
  {
    id: 'android_combat',
    broad: 'Android',
    flavor: 'Combat Android — Purpose built mechanical androids designed for combat and military operations, with advanced weaponry and armor',
    weight: 6,
    iconPrompt: 'sci-fi rpg icon, a combat android with exposed joints, holding laser rifle, wearing powered armor, rocket pack, multiple eyes, medium shot, digital concept art',
    iconPath: 'generator/genres/sci-fi/icons/SPECIES#android_combat.png'
  },

  // ── UPLIFTED ──────────────────────────────────────────────────────────
  {
    id: 'uplift_primate',
    broad: 'Uplifted',
    flavor: 'Uplifted primate — enhanced cognition and fine motor precision from a corps-funded programme that\'s since been shut down, navigates a world built for a species that still isn\'t sure how to treat them',
    weight: 4,
    iconPrompt: 'sci-fi rpg icon, laboratory or tech corridor, uplifted primate bipedal figure in lab coveralls, fine motor work with tools, sapient focused expression, corp lab environment, overhead lab lighting, medium shot, digital concept art',
    iconPath: 'generator/genres/sci-fi/icons/SPECIES#uplift_primate.png'
  },
  {
    id: 'uplift_feline',
    broad: 'Uplifted',
    flavor: 'Uplifted feline — heightened reflexes and senses, bipedal and fully sapient, the ears, paws and tail are real, the patience for human inefficiency is synthetic',
    weight: 3,
    iconPrompt: 'sci-fi rpg icon, transit concourse, bipedal uplifted feline in tactical clothing, cat ears, paws, tail visible, yellow cat eyes with vertical slit pupils, neon transit lighting, medium shot, digital concept art',
    iconPath: 'generator/genres/sci-fi/icons/SPECIES#uplift_feline.png'
  },
  // ── HYBRID ─────────────────────────────────────────────────────────────
  {
    id: 'hybrid_hare',
    broad: 'Hybrid',
    flavor: 'Hybrid hare — Human-like, except for the bunny ears, tail, and harelip. Heightened reflexes and senses, bipedal and fully sapient, the ears and tail are real',
    weight: 3,
    iconPrompt: 'sci-fi rpg icon, a cute bunny girl with ears and tail, medium shot, digital concept art',
    iconPath: 'generator/genres/sci-fi/icons/SPECIES#hybrid_hare.png'
  },
  {
    id: 'hybrid_feline',
    broad: 'Hybrid',
    flavor: 'Hybrid feline — Human-like, except for the cat ears, tail, and whiskers. Heightened reflexes and senses, bipedal and fully sapient, the ears and tail are real',
    weight: 3,
    iconPrompt: 'sci-fi rpg icon, a cute cat girl with cat ears, yellow cat eyes with vertical slit pupils, and tail, medium shot, digital concept art',
    iconPath: 'generator/genres/sci-fi/icons/SPECIES#hybrid_feline.png'
  },

  // ── CLONE ─────────────────────────────────────────────────────────────
  {
    id: 'clone_baseline',
    broad: 'Clone',
    flavor: 'Clone — baseline print, no notable deviations from the source template, grown and decanted like product; the paperwork says they have rights and the paperwork is technically accurate',
    weight: 5,
    iconPrompt: 'sci-fi rpg icon, corp work environment, 3girls, identical faces, identical uniforms, face like grace park, careful neutral expression, fluorescent corp lighting, medium shot, digital concept art',
    iconPath: 'generator/genres/sci-fi/icons/SPECIES#clone_baseline.png'
  },
  {
    id: 'clone_notable',
    broad: 'Clone',
    flavor: 'Clone — divergent from baseline, whether by design, incident, or the slow drift of living; they may share a face with someone they have never met and would rather not',
    weight: 2,
    iconPrompt: 'sci-fi rpg icon, corp work environment, 3girls, identical faces, identical uniforms, face like Angelina Jolie, plastic skin, careful neutral expression, fluorescent corp lighting, medium shot, digital concept art',
    iconPath: 'generator/genres/sci-fi/icons/SPECIES#clone_notable.png'
  },

  // ── MUTANT ────────────────────────────────────────────────────────────
  {
    id: 'mutant',
    broad: 'Mutant',
    flavor: 'Mutant — radiation, unregulated biotech, or something in the water; whatever the cause the changes are real and unasked-for, and they have learned which ones to hide',
    weight: 5,
    iconPrompt: 'sci-fi rpg icon, woman with dark blue skin, scales and very large eyes, low-corp district alley or corridor, warm lighting, medium shot, digital concept art',
    iconPath: 'generator/genres/sci-fi/icons/SPECIES#mutant.png'
  },

  // ── ALIEN ─────────────────────────────────────────────────────────────
  {
    id: 'alien_humanoid',
    broad: 'Alien',
    flavor: 'Humanoid alien — bipedal, bilaterally symmetrical, close enough to pass in a crowd until they don\'t; first contact was a generation ago and the social infrastructure for integration is still catching up',
    weight: 6,
    iconPrompt: 'sci-fi rpg icon, station checkpoint, humanoid alien with distinctive alien features or coloring in neutral transit clothing, integration documents in hand, resigned expression, overhead checkpoint lighting, medium shot, digital concept art',
    iconPath: 'generator/genres/sci-fi/icons/SPECIES#alien_humanoid.png'
  },
  {
    id: 'alien_nonhumanoid',
    broad: 'Alien',
    flavor: 'Non-humanoid alien — the interface between their natural form and human-built space requires ongoing adaptation in both directions; they have opinions about the chair situation',
    weight: 2,
    iconPrompt: 'sci-fi rpg icon, giant slug alien slithering down a ship corridor, antennae, eyepods, snail trail, rearing up, navel, overhead station lighting, wide shot, digital concept art',
    iconPath: 'generator/genres/sci-fi/icons/SPECIES#alien_nonhumanoid.png'
  },
];
