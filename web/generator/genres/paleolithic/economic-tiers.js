// genres/paleolithic/economic-tiers.js
// Social status within the tribe — from outcast to shaman/chief.
// "Economic" tier here means standing, influence, and access to resources.
// One tier (1-5) per character, derived from profession economicTier +
// life-event/family economicHint shifts. Each tier:
//   label       — display label
//   descriptors — status/standing details woven into the character Entry
//   housing     — pool of housing situations for this tier
//   transport   — pool of transport/mobility options for this tier
//   iconPrompt  — text-to-image prompt for this tier's slot-machine reel icon
//   iconPath    — served path where that icon lives

export const ECONOMIC_TIERS = {
  1: {
    label: "Outcast",
    descriptors: [
      "no shelter claim in any tribe — sleeps at the margins",
      "forages alone; no one shares the kill with them",
      "carries everything they own on their back",
      "other tribes will not trade with them",
      "one bad wound from a death no one will mourn",
    ],
    housing: [
      "exposed lean-to of bark and branches",
      "shallow rock overhang at the camp's edge",
      "sleeping skin tucked beneath a root",
    ],
    transport: [
      "on foot, alone",
      "wears everything they own",
      "no one to help carry their burdens",
    ],
    iconPrompt:
      "paleolithic rpg icon, solitary outcast figure huddled under a rock overhang in rain, small dying fire, alone, miserable, dark and cold, digital art",
    iconPath:
      "generator/genres/paleolithic/icons/ECONOMIC_TIERS#tier1-outcast.webp",
  },
  2: {
    label: "Common Member",
    descriptors: [
      "sleeping skin at the fire's outer ring",
      "carries the full communal burden without complaint",
      "the tribe feeds them — barely, in lean times",
      "voice at the fire but no one leans in to listen",
      "valued enough to keep; not enough to mourn long",
    ],
    housing: [
      "shared sleeping area near the communal fire",
      "cave alcove at the back, away from warmth",
      "lean-to at the camp's working edge",
    ],
    transport: [
      "on foot with the group, carrying full load",
      "assigned the heaviest bundles on the move",
      "first to wade the cold crossings",
    ],
    iconPrompt:
      "paleolithic rpg icon, communal camp fire at night, young tribe member sitting at fire edge carrying bundles and skins, watchful humble expression, warm light, medium shot, digital art",
    iconPath:
      "generator/genres/paleolithic/icons/ECONOMIC_TIERS#tier2-common-member.webp",
  },
  3: {
    label: "Valued Member",
    descriptors: [
      "name spoken well around other fires",
      "skilled work respected without question",
      "given choice cuts after a kill",
      "others ask their read of the weather or the tracks",
      "the tribe would feel the absence — and knows it",
    ],
    housing: [
      "own sleeping place near the warmth",
      "named sleeping spot in the cave",
      "well-made hide shelter, helped by others",
    ],
    transport: [
      "on foot, often out ahead scouting",
      "others carry a share of their gear on long marches",
      "first to ford the river — by choice, not assignment",
    ],
    iconPrompt:
      "paleolithic rpg icon, camp scene, skilled hunter carrying fresh kill over shoulders, other tribe members greeting with respect, firelight, confident posture, medium shot, digital art",
    iconPath:
      "generator/genres/paleolithic/icons/ECONOMIC_TIERS#tier3-valued-member.webp",
  },
  4: {
    label: "Respected Elder",
    descriptors: [
      "council seat at the center fire",
      "others carry their tools on long marches",
      "their word settles disputes before they become blood",
      "gifts appear at their sleeping place — tribute and respect",
      "the tribe's memory of the old ways lives in them",
    ],
    housing: [
      "honored sleeping spot closest to the fire's heart",
      "others build their shelter first",
      "sacred section of the cave, nearest the painted walls",
    ],
    transport: [
      "tribe elders set the pace of the march",
      "the best raft or canoe place on river crossings",
      "others clear the path ahead",
    ],
    iconPrompt:
      "paleolithic rpg icon, elder seated at center of fire ring, tribe members seated around listening attentively, elder gesturing while storytelling, firelight on weathered face, wide shot, digital art",
    iconPath:
      "generator/genres/paleolithic/icons/ECONOMIC_TIERS#tier4-respected-elder.webp",
  },
  5: {
    label: "Shaman / Chief",
    descriptors: [
      "speaks with the spirit world — and the spirits answer",
      "the tribe does not move without their word",
      "wears the sacred tokens that no one else may touch",
      "others fast so they may eat; others carry so they may walk light",
      "their death would unmoor the tribe from the world it knows",
    ],
    housing: [
      "deepest chamber of the cave, alone with the ancestors",
      "ceremonial shelter of aurochs hide, set apart",
      "sleeping place ringed with offerings and bones",
    ],
    transport: [
      "tribe follows their route without question",
      "carried on a litter across the roughest terrain",
      "the first canoe, the finest raft, the most reliable guide",
    ],
    iconPrompt:
      "paleolithic rpg icon, shaman in full ceremonial regalia with antler headdress, ochre face paint, standing over a fire with arms raised, tribe watching from darkness behind, dramatic backlit, medium shot, digital art",
    iconPath:
      "generator/genres/paleolithic/icons/ECONOMIC_TIERS#tier5-shaman-chief.webp",
  },
};
