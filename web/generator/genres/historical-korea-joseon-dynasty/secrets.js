// genres/historical-korea-joseon-dynasty/secrets.js
// Hidden truths that could change everything for a Joseon Dynasty character.
// Never stated openly in the character Entry. Each secret carries:
//   id, label (optional display override), description, severity (low |
//   medium | high | explosive), criminalFlag (bool), toneTag,
//   allowedGenders    — optional array of gender ids (see genders.js); engine.js
//                       filters this secret out for a character whose gender
//                       isn't in the list (non_binary/genderfluid/genderless
//                       characters bypass the check entirely, same as
//                       professions' allowedGenders), falling back to the
//                       unfiltered pool if that would leave nothing. Omitted
//                       means any gender can roll it.
//   iconPrompt/iconPath (slot-machine reel icon)

export const SECRETS = [
  {
    id: "false_lineage",
    label: "Their Lineage Record Is Falsified",
    description:
      "The clan genealogy register (jokbo) that grants their yangban status was purchased, altered, or forged — they may or may not have known when it happened",
    severity: "explosive",
    criminalFlag: true,
    toneTag: "identity",
    iconPrompt:
      "joseon dynasty korean false genealogy record forged jokbo document hidden secret flame burning evidence traditional court painting",
    iconPath:
      "generator/genres/historical-korea-joseon-dynasty/icons/SECRETS#false_lineage.webp",
  },
  {
    id: "catholic_convert",
    label: "Secretly Converted to Catholicism",
    description:
      "Has been practicing the Western Learning (Seohak) faith in private — a capital offense in a dynasty that has executed converts in the hundreds",
    severity: "explosive",
    criminalFlag: true,
    toneTag: "faith",
    iconPrompt:
      "joseon dynasty korean secret catholic convert rosary hidden cross private prayer night fearful whisper traditional painting",
    iconPath:
      "generator/genres/historical-korea-joseon-dynasty/icons/SECRETS#catholic_convert.webp",
  },
  {
    id: "illegal_japan_trade",
    label: "Profits from Illegal Japan Trade",
    description:
      "Has ongoing commercial relationships with Japanese merchants outside the licensed trade posts — silver, silks, goods that move without official knowledge",
    severity: "high",
    criminalFlag: true,
    toneTag: "mercantile",
    iconPrompt:
      "joseon dynasty korean illegal japan trade secret night dock contraband silver goods hidden boats merchant traditional painting",
    iconPath:
      "generator/genres/historical-korea-joseon-dynasty/icons/SECRETS#illegal_japan_trade.webp",
  },
  {
    id: "aided_rebel",
    label: "Aided a Rebel or Fugitive",
    description:
      "Sheltered, fed, or helped escape someone the government was hunting — a relative, a lover, or a stranger they could not turn away",
    severity: "high",
    criminalFlag: true,
    toneTag: "loyalty",
    iconPrompt:
      "joseon dynasty korean hiding rebel fugitive night shelter secret food water help dangerous compassion traditional folk painting",
    iconPath:
      "generator/genres/historical-korea-joseon-dynasty/icons/SECRETS#aided_rebel.webp",
  },
  {
    id: "helped_nobi_escape",
    label: "Helped a Nobi Slave Escape",
    description:
      "Facilitated the flight of a legal slave — motivated by love, conscience, or debt — and has been covering the tracks ever since",
    severity: "high",
    criminalFlag: true,
    toneTag: "moral",
    iconPrompt:
      "joseon dynasty korean nobi slave escape help night road dark secret compassion danger guilt traditional folk painting",
    iconPath:
      "generator/genres/historical-korea-joseon-dynasty/icons/SECRETS#helped_nobi_escape.webp",
  },
  {
    id: "betrayed_clan",
    label: "Betrayed Their Clan to a Rival Faction",
    description:
      "Provided information to factional enemies that led to a relative's ruin — for survival, for ambition, or under threats they have never spoken of",
    severity: "explosive",
    criminalFlag: true,
    toneTag: "guilt",
    iconPrompt:
      "joseon dynasty korean clan betrayal secret meeting rival faction whisper document passed guilt shame traditional court painting",
    iconPath:
      "generator/genres/historical-korea-joseon-dynasty/icons/SECRETS#betrayed_clan.webp",
  },
  {
    id: "covered_up_death",
    label: "Covered Up a Death",
    description:
      "A death happened — accident, anger, or something in between — and they altered the record, bribed the official, or arranged the silence of witnesses",
    severity: "explosive",
    criminalFlag: true,
    toneTag: "dark",
    iconPrompt: "joseon dynasty korean unmarked grave",
    iconPath:
      "generator/genres/historical-korea-joseon-dynasty/icons/SECRETS#covered_up_death.webp",
  },
  {
    id: "nobi_origins",
    label: "Born Nobi — Now Passing as Free",
    description:
      "Was born into legal slavery and escaped or was manumitted — now lives under a fabricated identity that does not survive close inspection",
    severity: "high",
    toneTag: "identity",
    iconPrompt:
      "joseon dynasty korean nobi born free now identity hidden papers forged anxiety watchful careful traditional folk painting",
    iconPath:
      "generator/genres/historical-korea-joseon-dynasty/icons/SECRETS#nobi_origins.webp",
  },
  {
    id: "failed_exam_hidden",
    label: "Has Hidden Repeated Gwageo Failures",
    description:
      "Has told their family and clan they passed or are still eligible — while the examination board has a different record entirely",
    severity: "medium",
    toneTag: "shame",
    iconPrompt:
      "joseon dynasty korean gwageo exam failure hidden lie shame family expectations performance scholar anxious traditional painting",
    iconPath:
      "generator/genres/historical-korea-joseon-dynasty/icons/SECRETS#failed_exam_hidden.webp",
  },
  {
    id: "royal_blood",
    label: "Undisclosed Royal Connection",
    description:
      "Has a blood connection to the royal family that is not in any official record — through an illegitimate line, a concubine, or a deliberate erasure",
    severity: "explosive",
    toneTag: "identity",
    iconPrompt:
      "joseon dynasty korean secret royal blood connection palace genealogy hidden lineage dangerous beauty traditional court painting",
    iconPath:
      "generator/genres/historical-korea-joseon-dynasty/icons/SECRETS#royal_blood.webp",
  },
  {
    id: "sold_information",
    label: "Sold Court Information",
    description:
      "Has passed official intelligence to a merchant, foreign contact, or rival faction for money — once, or as an ongoing arrangement",
    severity: "high",
    toneTag: "mercantile",
    iconPrompt:
      "joseon dynasty korean sold secrets information money exchange night document passed nervous corruption traditional court painting",
    iconPath:
      "generator/genres/historical-korea-joseon-dynasty/icons/SECRETS#sold_information.webp",
  },
  {
    id: "concubine_child",
    label: "Has an Unacknowledged Concubine Child",
    description:
      "A child exists that the main household does not formally recognize — with all the inheritance and loyalty complications that follow from that",
    severity: "medium",
    toneTag: "family",
    iconPrompt:
      "joseon dynasty korean unacknowledged child concubine hidden meeting secret love outer quarters traditional painting",
    iconPath:
      "generator/genres/historical-korea-joseon-dynasty/icons/SECRETS#concubine_child.webp",
  },
  {
    id: "borrowed_scholarship",
    label: "Their Great Work Was Written by Another",
    description:
      "The essay, the memorial, or the poem that established their reputation was written by a ghost — a servant, a friend, or a bribed scholar",
    severity: "medium",
    toneTag: "shame",
    iconPrompt:
      "joseon dynasty korean plagiarism ghost writer scholarly work poem essay famous attribution false shame traditional painting",
    iconPath:
      "generator/genres/historical-korea-joseon-dynasty/icons/SECRETS#borrowed_scholarship.webp",
  },
  {
    id: "living_as_a_man",
    label: "Lives Publicly as a Man",
    description:
      "Passes as a man in public and professional life — for the freedom to study, soldier, or work in ways their birth sex forbids — a disguise that depends on no one ever looking too closely",
    severity: "explosive",
    toneTag: "identity",
    allowedGenders: ["woman", "trans_woman"],
    iconPrompt:
      "joseon dynasty korean woman disguised as a man topknot male scholar or soldier hanbok determined secretive glance traditional court painting",
    iconPath:
      "generator/genres/historical-korea-joseon-dynasty/icons/SECRETS#living_as_a_man.webp",
  },
  {
    id: "conversion_ancestor",
    label: "A Converted Ancestor in the Family Tree",
    description:
      "A grandparent or great-grandparent converted to Catholicism — the record was suppressed but not destroyed, and someone else knows this",
    severity: "high",
    toneTag: "faith",
    iconPrompt:
      "joseon dynasty korean hidden ancestor convert genealogy record fear discovery old document traditional court painting",
    iconPath:
      "generator/genres/historical-korea-joseon-dynasty/icons/SECRETS#conversion_ancestor.webp",
  },
];
