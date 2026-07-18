// genres/nihongi/tensions.js
// Active supernatural pressures on a Nihongi character — feeds the scenario
// Opening and Description heavily. Each tension carries:
//   id, description, toneTag, criminalFlag (bool),
//   iconPrompt/iconPath (slot-machine reel icon)

export const TENSIONS = [
  {
    id: "something_following",
    description:
      "Something has been following them for several weeks — not always visible, but consistently present; it has not acted yet, which may mean it is patient, or it may mean it is waiting for the right moment",
    toneTag: "horror",
    criminalFlag: false,
    iconPrompt:
      "ancient japanese figure walking at night through moonlit compound, dark shape following at edge of torchlight too still to be human, wrongness in silhouette, nihon shoki yamato-e painting",
    iconPath:
      "generator/genres/nihongi/icons/TENSIONS#something_following.webp",
  },
  {
    id: "family_possessed",
    description:
      "A family member is being ridden by an angry kami or a malicious shade — the character is the only one who knows; the entity inside their family member has noticed that the character knows",
    toneTag: "horror",
    criminalFlag: false,
    iconPrompt:
      "ancient japanese family member with possession in eyes wrong expression watching protagonist who knows the truth, dark divine energy visible only to viewer, family compound interior, nihon shoki yamato-e painting",
    iconPath: "generator/genres/nihongi/icons/TENSIONS#family_possessed.webp",
  },
  {
    id: "holy_site_defiled",
    description:
      "A holy site was defiled — by the character, by someone they protected, or by accident — and the kami whose place it was has not accepted the subsequent offerings; the response is building, and it is not going to be proportionate",
    toneTag: "horror",
    criminalFlag: false,
    iconPrompt:
      "ancient japanese defiled shrine rotting offerings sacred rope torn stone broken kami wrath building signs appearing animals fled disturbed earth, nihon shoki yamato-e painting",
    iconPath: "generator/genres/nihongi/icons/TENSIONS#holy_site_defiled.webp",
  },
  {
    id: "yomi_bleeding_through",
    description:
      "In their home province, the dead are becoming restless — cold spots that move, missing livestock found bloodless, shadows that cast themselves at the wrong angle; the local shrine medium says the gate between worlds is thinning but will not say why",
    toneTag: "horror",
    criminalFlag: false,
    iconPrompt:
      "ancient japanese village with yomi leaking through dead walking cold mist animals bloodless shadows wrong angles shrine medium refusing to say why gate thinning, nihon shoki yamato-e painting",
    iconPath:
      "generator/genres/nihongi/icons/TENSIONS#yomi_bleeding_through.webp",
  },
  {
    id: "deal_coming_due",
    description:
      "An ancestor made a bargain with a supernatural entity — the terms were sealed in blood and are encoded in the family shrine record in a script no living member of the clan can read; the entity has begun sending representatives",
    toneTag: "horror",
    criminalFlag: false,
    iconPrompt:
      "ancient japanese family shrine record in unreadable script supernatural entity representative appearing messenger of deal ancient bargain coming due, nihon shoki yamato-e painting",
    iconPath: "generator/genres/nihongi/icons/TENSIONS#deal_coming_due.webp",
  },
  {
    id: "shadow_wrong",
    description:
      "Their shadow no longer matches their movements exactly — only by a small delay, a slight deviation, a choice of direction the body did not make; only they have noticed so far, but a miko medium looked at them strangely last week",
    toneTag: "horror",
    criminalFlag: false,
    iconPrompt:
      "ancient japanese figure with shadow moving wrong direction wrong timing slightly separate entity miko shrine maiden staring at shadow with recognition dread, nihon shoki yamato-e painting",
    iconPath: "generator/genres/nihongi/icons/TENSIONS#shadow_wrong.webp",
  },
  {
    id: "kami_wrath",
    description:
      "Omens are accumulating specifically around them — floods only in fields they walked through, birds silent wherever they stand, a shrine oracle that named them by a name only the kami should know; whatever they did, the kami has not accepted the appeasement offerings",
    toneTag: "supernatural",
    criminalFlag: false,
    iconPrompt:
      "ancient japanese kami divine wrath omens accumulating flood birds silent oracle naming figure specifically sacred warning supernatural anger, nihon shoki yamato-e painting",
    iconPath: "generator/genres/nihongi/icons/TENSIONS#kami_wrath.webp",
  },
  {
    id: "ritual_pollution_spreading",
    description:
      "They have been exposed to something deeply kegare — a death, a birth, a forbidden contact — and the pollution is spreading to objects and people around them in ways that go beyond the usual ritual contamination",
    toneTag: "horror",
    criminalFlag: false,
    iconPrompt:
      "ancient japanese ritual pollution kegare spreading from figure to objects people dark stain visible on things touched death contamination beyond normal supernatural intensity, nihon shoki yamato-e painting",
    iconPath:
      "generator/genres/nihongi/icons/TENSIONS#ritual_pollution_spreading.webp",
  },
  {
    id: "dire_prophecy",
    description:
      "A shrine medium has delivered a prophecy naming something terrible involving someone the character loves — the oracle has not been wrong in living memory, and the medium refuses to speak further, saying the kami will say no more",
    toneTag: "dramatic",
    criminalFlag: false,
    iconPrompt:
      "ancient japanese shrine oracle prophecy dire miko spirit medium foretelling someone loved refusal to say more kami silent terrible future, nihon shoki yamato-e painting",
    iconPath: "generator/genres/nihongi/icons/TENSIONS#dire_prophecy.webp",
  },
  {
    id: "succession_crisis",
    description:
      "The clan lord is dying and the likely successors are divided — worse, one of them has been seen consulting with something that does not belong at court, late at night, in a room that should have been empty",
    toneTag: "dramatic",
    criminalFlag: false,
    iconPrompt:
      "ancient japanese clan succession dying lord rival heir consulting supernatural entity in empty room at night someone watches secretly, nihon shoki yamato-e painting",
    iconPath: "generator/genres/nihongi/icons/TENSIONS#succession_crisis.webp",
  },
  {
    id: "wrong_twin",
    description:
      "Two people who cannot both be who they claim to be are present in the same community; one of them is wrong in ways that are just barely detectable — small hesitations, slightly incorrect memories, a reflection that is a moment behind",
    toneTag: "horror",
    criminalFlag: false,
    iconPrompt:
      "ancient japanese two identical figures one wrong reflection delayed in water one staring with inhuman patience, imposter shapeshifter in community hidden wrongness, nihon shoki yamato-e painting",
    iconPath: "generator/genres/nihongi/icons/TENSIONS#wrong_twin.webp",
  },
];
