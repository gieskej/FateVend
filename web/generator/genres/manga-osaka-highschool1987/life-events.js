// genres/manga-osaka-highschool1987/life-events.js
// Formative events for Osaka high school students, circa 1987. Each event carries:
//   id, description, statAffinity (optional — stats that make this more likely),
//   toneTag (gritty | dramatic | cozy | neutral) for filtering,
//   economicHint (optional tier shift suggestion),
//   iconPrompt/iconPath (slot-machine reel icon)

export const LIFE_EVENTS = [
  {
    id: "lost_parent_early",
    description:
      "Lost a parent before middle school — shaped everything that came after",
    toneTag: "dramatic",
    statAffinity: { wisdom: 1.3, constitution: 0.9 },
    iconPrompt:
      "japanese student 1987 holding old family photo alone quiet room manga illustration",
    iconPath:
      "generator/genres/manga-osaka-highschool1987/icons/LIFE_EVENTS#lost_parent_early.webp",
  },
  {
    id: "parents_divorced",
    description:
      "Parents divorced — still unusual in 1987 Japan, and the social stigma followed",
    toneTag: "dramatic",
    statAffinity: { wisdom: 1.1, charisma: 0.9 },
    iconPrompt:
      "japanese student 1987 sitting between two adults who are not looking at each other quiet apartment manga illustration",
    iconPath:
      "generator/genres/manga-osaka-highschool1987/icons/LIFE_EVENTS#parents_divorced.webp",
  },
  {
    id: "failed_entrance_exam",
    description:
      "Failed the entrance exam for their first-choice high school — ended up here by default",
    toneTag: "neutral",
    statAffinity: { intelligence: 0.9, wisdom: 1.1 },
    iconPrompt:
      "japanese student 1987 staring at exam results sheet posted on board disappointed quiet manga illustration",
    iconPath:
      "generator/genres/manga-osaka-highschool1987/icons/LIFE_EVENTS#failed_entrance_exam.webp",
  },
  {
    id: "koshien_loss",
    description:
      "Was on the team that lost Koshien prefectural finals in middle school — one out from going",
    toneTag: "dramatic",
    statAffinity: { strength: 1.2, constitution: 1.1 },
    iconPrompt:
      "japanese middle school baseball team 1987 kneeling after loss on field summer heat tears manga illustration",
    iconPath:
      "generator/genres/manga-osaka-highschool1987/icons/LIFE_EVENTS#koshien_loss.webp",
  },
  {
    id: "first_arubaito",
    description:
      "Started working part-time at twelve to help the family — grew up faster than their classmates",
    toneTag: "gritty",
    statAffinity: { constitution: 1.2, wisdom: 1.1 },
    iconPrompt:
      "japanese young student 1987 early morning delivery newspaper arubaito part time job bicycle predawn manga illustration",
    iconPath:
      "generator/genres/manga-osaka-highschool1987/icons/LIFE_EVENTS#first_arubaito.webp",
  },
  {
    id: "bullied_badly",
    description:
      "Was bullied severely in middle school — this school was supposed to be a fresh start",
    toneTag: "gritty",
    statAffinity: { constitution: 1.1, charisma: 0.9 },
    iconPrompt:
      "japanese student with black eye surrounded by boys wearing gakuran uniforms, 1987, manga illustration",
    iconPath:
      "generator/genres/manga-osaka-highschool1987/icons/LIFE_EVENTS#bullied_badly.webp",
  },
  {
    id: "moved_from_tokyo",
    description:
      "Transferred from Tokyo — the Osaka culture is different and people keep pointing it out",
    toneTag: "neutral",
    statAffinity: { charisma: 1.1, wisdom: 1.1 },
    iconPrompt:
      "japanese transfer student 1987 looking at new school building from outside first day Tokyo transfer manga illustration",
    iconPath:
      "generator/genres/manga-osaka-highschool1987/icons/LIFE_EVENTS#moved_from_tokyo.webp",
  },
  {
    id: "witnessed_yakuza_incident",
    description:
      "Witnessed something involving yakuza in Namba that they were not supposed to see",
    toneTag: "gritty",
    statAffinity: { wisdom: 1.2, constitution: 1.1 },
    iconPrompt:
      "japanese student 1987 Dotonbori night alley witnessed something dangerous frozen scared manga illustration",
    iconPath:
      "generator/genres/manga-osaka-highschool1987/icons/LIFE_EVENTS#witnessed_yakuza_incident.webp",
  },
  {
    id: "prodigy_faded",
    description:
      "Was considered a prodigy in primary school — piano, mathematics, or art — the pressure faded but the expectations never did",
    toneTag: "neutral",
    statAffinity: { intelligence: 1.3, wisdom: 0.9 },
    iconPrompt:
      "japanese child prodigy 1987 recital performance young parents watching pressure spotlight manga illustration",
    iconPath:
      "generator/genres/manga-osaka-highschool1987/icons/LIFE_EVENTS#prodigy_faded.webp",
  },
  {
    id: "first_love_moved",
    description:
      "First love moved away before they could say what needed saying — has been trying to say important things on time since",
    toneTag: "cozy",
    statAffinity: { charisma: 1.1, wisdom: 1.1 },
    iconPrompt:
      "japanese students 1987 one waving goodbye train station other watching from platform unsaid feelings manga illustration",
    iconPath:
      "generator/genres/manga-osaka-highschool1987/icons/LIFE_EVENTS#first_love_moved.webp",
  },
  {
    id: "sickness_missed_year",
    description:
      "A serious illness meant repeating a year — a year behind everyone they started with",
    toneTag: "dramatic",
    statAffinity: { constitution: 0.8, wisdom: 1.2 },
    iconPrompt:
      "japanese student 1987 hospital bed window light looking outside missing school manga illustration",
    iconPath:
      "generator/genres/manga-osaka-highschool1987/icons/LIFE_EVENTS#sickness_missed_year.webp",
  },
  {
    id: "family_business_collapsed",
    description:
      "The family business failed when they were twelve — everything that followed was the aftermath",
    toneTag: "gritty",
    statAffinity: { wisdom: 1.1, constitution: 1.1 },
    economicHint: -1,
    iconPrompt:
      "japanese family 1987 small shop shuttered closed sign family looking at empty store manga illustration",
    iconPath:
      "generator/genres/manga-osaka-highschool1987/icons/LIFE_EVENTS#family_business_collapsed.webp",
  },
  {
    id: "top_of_class",
    description:
      "Was top of their middle school class — the pressure to stay there has never stopped",
    toneTag: "neutral",
    statAffinity: { intelligence: 1.3, charisma: 1.1 },
    iconPrompt:
      "japanese student 1987 receiving award ceremony middle school top grades nervous proud manga illustration",
    iconPath:
      "generator/genres/manga-osaka-highschool1987/icons/LIFE_EVENTS#top_of_class.webp",
  },
];
