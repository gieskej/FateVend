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
    iconPrompt: 'A person with a stockier bone density and a particular wariness toward anyone who has never needed to worry about weather',
    iconPath: 'generator/genres/sci-fi/icons/SPECIES#human_earther.png'
  },
  {
    id: 'human_colonist',
    broad: 'Human',
    flavor: 'Colonist — raised on a settled world not Earth, adapted to local gravity and light, pragmatic in ways that confuse people who grew up with safety nets',
    weight: 12,
    iconPrompt: 'A person raised on a settled world not Earth, adapted to local gravity and light, pragmatic in ways that confuse people who grew up with safety nets',
    iconPath: 'generator/genres/sci-fi/icons/SPECIES#human_colonist.png'
  },
  {
    id: 'human_spacer',
    broad: 'Human',
    flavor: 'Spacer — born or raised aboard ships or stations, lean frame from variable-g, skin that\'s never quite seen enough real light, reads pressure changes in a room the way others read faces',
    weight: 8,
    iconPrompt: 'A person born or raised aboard ships or stations, lean frame from variable-g, skin that\'s never quite seen enough real light, reads pressure changes in a room the way others read faces',
    iconPath: 'generator/genres/sci-fi/icons/SPECIES#human_spacer.png'
  },
  {
    id: 'human_corp',
    broad: 'Human',
    flavor: 'Corp citizen — raised inside a megacorporate arcology, good teeth, filtered air their whole life, a slightly uncanny social ease that comes from being managed since birth',
    weight: 8,
    iconPrompt: 'A person raised inside a megacorporate arcology, good teeth, filtered air their whole life, a slightly uncanny social ease that comes from being managed since birth',
    iconPath: 'generator/genres/sci-fi/icons/SPECIES#human_corp.png'
  },

  // ── CYBORG ────────────────────────────────────────────────────────────
  {
    id: 'cyborg_light',
    broad: 'Cyborg',
    flavor: 'Lightly augmented — one or two integrated systems, subdermal ports or a replacement limb, biological baseline mostly intact but the seams are visible if you look',
    weight: 12,
    iconPrompt: 'A person with one or two integrated systems, subdermal ports or a replacement limb, biological baseline mostly intact but the seams are visible if you look',
    iconPath: 'generator/genres/sci-fi/icons/SPECIES#cyborg_light.png'
  },
  {
    id: 'cyborg_heavy',
    broad: 'Cyborg',
    flavor: 'Heavily augmented — more synthetic than biological now, the remaining organic parts feel almost decorative, moves with a precision that unsettles people who aren\'t used to it',
    weight: 5,
    iconPrompt: 'A person who is more synthetic than biological now, the remaining organic parts feel almost decorative, moves with a precision that unsettles people who aren\'t used to it',
    iconPath: 'generator/genres/sci-fi/icons/SPECIES#cyborg_heavy.png'
  },

  // ── ANDROID ───────────────────────────────────────────────────────────
  {
    id: 'android',
    broad: 'Android',
    flavor: 'Android — fully synthetic, designed to pass at conversational distance, gets clocked by medscans and anyone who has been looking long enough; the question of personhood is legally unsettled and they are aware of this',
    weight: 6,
    iconPrompt: 'A fully synthetic being designed to pass at conversational distance, gets clocked by medscans and anyone who has been looking long enough; the question of personhood is legally unsettled and they are aware of this',
    iconPath: 'generator/genres/sci-fi/icons/SPECIES#android.png'
  },

  // ── UPLIFTED ──────────────────────────────────────────────────────────
  {
    id: 'uplift_primate',
    broad: 'Uplifted',
    flavor: 'Uplifted primate — enhanced cognition and fine motor precision from a corps-funded programme that\'s since been shut down, navigates a world built for a species that still isn\'t sure how to treat them',
    weight: 4,
    iconPrompt: 'An uplifted primate with enhanced cognition and fine motor precision from a corps-funded programme that\'s since been shut down, navigates a world built for a species that still isn\'t sure how to treat them',
    iconPath: 'generator/genres/sci-fi/icons/SPECIES#uplift_primate.png'
  },
  {
    id: 'uplift_feline',
    broad: 'Uplifted',
    flavor: 'Uplifted feline — heightened reflexes and senses, bipedal and fully sapient, the ears and tail are real, the patience for human inefficiency is synthetic',
    weight: 3,
    iconPrompt: 'An uplifted feline with heightened reflexes and senses, bipedal and fully sapient, the ears and tail are real, the patience for human inefficiency is synthetic',
    iconPath: 'generator/genres/sci-fi/icons/SPECIES#uplift_feline.png'
  },

  // ── CLONE ─────────────────────────────────────────────────────────────
  {
    id: 'clone_baseline',
    broad: 'Clone',
    flavor: 'Clone — baseline print, no notable deviations from the source template, grown and decanted like product; the paperwork says they have rights and the paperwork is technically accurate',
    weight: 5,
    iconPrompt: 'A clone with a baseline print, no notable deviations from the source template, grown and decanted like product; the paperwork says they have rights and the paperwork is technically accurate',
    iconPath: 'generator/genres/sci-fi/icons/SPECIES#clone_baseline.png'
  },
  {
    id: 'clone_notable',
    broad: 'Clone',
    flavor: 'Clone — divergent from baseline, whether by design, incident, or the slow drift of living; they may share a face with someone they have never met and would rather not',
    weight: 2,
    iconPrompt: 'A clone divergent from baseline, whether by design, incident, or the slow drift of living; they may share a face with someone they have never met and would rather not',
    iconPath: 'generator/genres/sci-fi/icons/SPECIES#clone_notable.png'
  },

  // ── MUTANT ────────────────────────────────────────────────────────────
  {
    id: 'mutant',
    broad: 'Mutant',
    flavor: 'Mutant — radiation, unregulated biotech, or something in the water; whatever the cause the changes are real and unasked-for, and they have learned which ones to hide',
    weight: 5,
    iconPrompt: 'A mutant with radiation, unregulated biotech, or something in the water; whatever the cause the changes are real and unasked-for, and they have learned which ones to hide',
    iconPath: 'generator/genres/sci-fi/icons/SPECIES#mutant.png'
  },

  // ── ALIEN ─────────────────────────────────────────────────────────────
  {
    id: 'alien_humanoid',
    broad: 'Alien',
    flavor: 'Humanoid alien — bipedal, bilaterally symmetrical, close enough to pass in a crowd until they don\'t; first contact was a generation ago and the social infrastructure for integration is still catching up',
    weight: 6,
    iconPrompt: 'A humanoid alien — bipedal, bilaterally symmetrical, close enough to pass in a crowd until they don\'t; first contact was a generation ago and the social infrastructure for integration is still catching up',
    iconPath: 'generator/genres/sci-fi/icons/SPECIES#alien_humanoid.png'
  },
  {
    id: 'alien_nonhumanoid',
    broad: 'Alien',
    flavor: 'Non-humanoid alien — the interface between their natural form and human-built space requires ongoing adaptation in both directions; they have opinions about the chair situation',
    weight: 2,
    iconPrompt: 'A non-humanoid alien — the interface between their natural form and human-built space requires ongoing adaptation in both directions; they have opinions about the chair situation',
    iconPath: 'generator/genres/sci-fi/icons/SPECIES#alien_nonhumanoid.png'
  },
];

