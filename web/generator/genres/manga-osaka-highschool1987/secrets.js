// genres/manga-osaka-highschool1987/secrets.js
// One hidden thing per character — steers the AI toward dramatic tension.
// Never stated openly in the character Entry. Each secret carries:
//   id, description, toneTag, severity (low | medium | high | explosive),
//   statAffinity (optional), criminalFlag (bool)

export const SECRETS = [
  {
    id: "hiding_arubaito",
    description:
      "Working an unauthorized part-time job — school regulations prohibit it, parents don't know, the money is going somewhere important",
    toneTag: "neutral",
    severity: "medium",
    statAffinity: { constitution: 1.2, wisdom: 1.1 },
    criminalFlag: false,
  },
  {
    id: "actually_repeating",
    description:
      "Is a year older than their classmates — failed an entrance exam, spent a year as a ronin, and told no one at this school",
    toneTag: "dramatic",
    severity: "medium",
    statAffinity: { wisdom: 1.2, intelligence: 1.1 },
    criminalFlag: false,
  },
  {
    id: "yankii_past",
    description:
      "Had a serious yankii phase before this school — the old nickname still circulates in certain parts of Osaka",
    toneTag: "gritty",
    severity: "medium",
    statAffinity: { strength: 1.2, constitution: 1.1 },
    criminalFlag: false,
  },
  {
    id: "failing_subject",
    description:
      "Secretly failing a critical subject — a failing mark means no university prospects, and nobody knows how bad it is yet",
    toneTag: "dramatic",
    severity: "high",
    statAffinity: { intelligence: 0.9, wisdom: 1.1 },
    criminalFlag: false,
  },
  {
    id: "admitted_already",
    description:
      "Has already received a recommendation admission to a good university — and is pretending to sit the same exam as everyone else",
    toneTag: "neutral",
    severity: "low",
    statAffinity: { intelligence: 1.2, charisma: 1.2 },
    criminalFlag: false,
  },
  {
    id: "family_trouble",
    description:
      "Family finances have collapsed quietly — the uniform is borrowed, the lunch is never quite enough, and everyone will know soon",
    toneTag: "gritty",
    severity: "medium",
    statAffinity: { constitution: 1.2, wisdom: 1.1 },
    economicHint: -1,
    criminalFlag: false,
  },
  {
    id: "anonymous_author",
    description:
      "Writes the anonymous gossip column circulating through the school — everyone is hunting for the author and they think it's fascinating",
    toneTag: "neutral",
    severity: "medium",
    statAffinity: { intelligence: 1.3, charisma: 1.2 },
    criminalFlag: false,
  },
  {
    id: "yakuza_connection",
    description:
      "A family member is connected to a yakuza organization — not involved themselves, but knows things about the family they cannot share",
    toneTag: "gritty",
    severity: "explosive",
    statAffinity: { wisdom: 1.2, constitution: 1.1 },
    criminalFlag: true,
  },
  {
    id: "pen_pal_reveal",
    description:
      "Has been writing love letters to a pen pal who turns out to be someone at this very school",
    toneTag: "cozy",
    severity: "low",
    statAffinity: { charisma: 1.2, wisdom: 0.9 },
    criminalFlag: false,
  },
  {
    id: "witnessed_teacher",
    description:
      "Witnessed a teacher doing something that would end their career — and has not decided what to do with it",
    toneTag: "dramatic",
    severity: "high",
    statAffinity: { wisdom: 1.2, intelligence: 1.2 },
    criminalFlag: false,
  },
  {
    id: "scholarship_conditional",
    description:
      "A scholarship to a prestigious university is conditional on grades they are barely maintaining — one bad month and it vanishes",
    toneTag: "dramatic",
    severity: "high",
    statAffinity: { intelligence: 1.2, wisdom: 1.1 },
    criminalFlag: false,
  },
  {
    id: "health_hidden",
    description:
      "Dealing with a medical condition they have not told their parents about — treating it themselves, money scraped from the arubaito",
    toneTag: "dramatic",
    severity: "high",
    statAffinity: { constitution: 0.8, wisdom: 1.2 },
    criminalFlag: false,
  },
  {
    id: "double_life_band",
    description:
      "Playing in an underground band on weekends under a different name — the music is good and the crowd is getting bigger",
    toneTag: "cozy",
    severity: "low",
    statAffinity: { dexterity: 1.3, charisma: 1.2 },
    criminalFlag: false,
  },
  {
    id: "caused_accident",
    description:
      "Was responsible for an accident — a bicycle collision, a fire at the batting cage, a practice injury — that someone else took the blame for",
    toneTag: "gritty",
    severity: "high",
    statAffinity: { wisdom: 0.8, constitution: 1.1 },
    criminalFlag: false,
  },
];
