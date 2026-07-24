// genres/manga-osaka-highschool1987/professions.js
// School roles, part-time jobs, and club positions in 1987 Osaka.
// "Profession" here means the character's primary social role or occupation. Each entry:
//   title, industry     — display title + industry (industry must match
//                          TAG_POOLS.professionTags keys in settings.js)
//   economicTier         — 1-5, family/personal economic standing
//   statAffinity         — optional; stats that make this role more likely
//   sentiments           — pool of feelings-about-the-role, one drawn at random
//                          per roll; values MUST be chosen from the fixed
//                          canonical list in common/sentiments.js — don't
//                          invent a new one-off word, pick the closest
//                          existing id instead (see that file's own header).
//   iconPrompt, iconPath — slot-machine reel icon

export const PROFESSIONS = [
  // ── ACADEMIC ──────────────────────────────────────────────────────────────
  {
    title: "Class Representative",
    industry: "Academic",
    economicTier: 3,
    statAffinity: { intelligence: 1.3, charisma: 1.2, wisdom: 1.1 },
    sentiments: ["proud", "exhausted", "content", "angry"],
    iconPrompt:
      "japanese class representative student 1987 standing front class roll call confident serious manga illustration",
    iconPath:
      "generator/genres/manga-osaka-highschool1987/icons/PROFESSIONS#class_representative.webp",
  },
  {
    title: "Cram School Star",
    industry: "Academic",
    economicTier: 3,
    statAffinity: { intelligence: 1.5, wisdom: 1.2 },
    sentiments: ["exhausted", "proud", "confused", "angry"],
    iconPrompt:
      "japanese cram school student 1987 night study desk books exam pressure stress manga illustration",
    iconPath:
      "generator/genres/manga-osaka-highschool1987/icons/PROFESSIONS#cram_school_star.webp",
  },
  {
    title: "Science Club Member",
    industry: "Academic",
    economicTier: 2,
    statAffinity: { intelligence: 1.4, dexterity: 1.2 },
    sentiments: ["ambitious", "content", "bored", "proud"],
    iconPrompt:
      "japanese science club student 1987 chemistry lab bubbling flask curious excited experiment manga illustration",
    iconPath:
      "generator/genres/manga-osaka-highschool1987/icons/PROFESSIONS#science_club_member.webp",
  },
  {
    title: "School Newspaper Editor",
    industry: "Academic",
    economicTier: 3,
    statAffinity: { intelligence: 1.3, charisma: 1.2, wisdom: 1.1 },
    sentiments: ["ambitious", "proud", "exhausted", "content"],
    iconPrompt:
      "japanese school newspaper club student editor 1987 typewriter deadline papers deadline manga illustration",
    iconPath:
      "generator/genres/manga-osaka-highschool1987/icons/PROFESSIONS#school_newspaper_editor.webp",
  },

  // ── ATHLETICS ─────────────────────────────────────────────────────────────
  {
    title: "Baseball Club Ace",
    industry: "Athletics",
    economicTier: 3,
    statAffinity: { strength: 1.4, constitution: 1.3, dexterity: 1.2 },
    sentiments: ["proud", "ambitious", "exhausted", "content"],
    iconPrompt:
      "japanese high school baseball pitcher 1987 Koshien windup full power summer heat manga illustration",
    iconPath:
      "generator/genres/manga-osaka-highschool1987/icons/PROFESSIONS#baseball_club_ace.webp",
  },
  {
    title: "Basketball Captain",
    industry: "Athletics",
    economicTier: 3,
    statAffinity: { strength: 1.3, charisma: 1.2, constitution: 1.2 },
    sentiments: ["proud", "ambitious", "exhausted", "content"],
    iconPrompt:
      "japanese high school basketball captain 1987 court dribbling leading team confident manga illustration",
    iconPath:
      "generator/genres/manga-osaka-highschool1987/icons/PROFESSIONS#basketball_captain.webp",
  },
  {
    title: "Track and Field Runner",
    industry: "Athletics",
    economicTier: 2,
    statAffinity: { dexterity: 1.4, constitution: 1.3 },
    sentiments: ["ambitious", "content", "proud", "confused"],
    iconPrompt:
      "japanese high school track sprinter 1987 starting blocks explosion speed athletic manga illustration",
    iconPath:
      "generator/genres/manga-osaka-highschool1987/icons/PROFESSIONS#track_and_field_runner.webp",
  },
  {
    title: "Kendo Club Member",
    industry: "Athletics",
    economicTier: 3,
    statAffinity: { wisdom: 1.3, strength: 1.2, dexterity: 1.2 },
    sentiments: ["proud", "ambitious", "content", "bored"],
    iconPrompt:
      "japanese kendo club student 1987 full bogu armor sparring match dojo manga illustration",
    iconPath:
      "generator/genres/manga-osaka-highschool1987/icons/PROFESSIONS#kendo_club_member.webp",
  },

  // ── ARTS ──────────────────────────────────────────────────────────────────
  {
    title: "School Band Member",
    industry: "Arts",
    economicTier: 2,
    statAffinity: { dexterity: 1.3, charisma: 1.2 },
    sentiments: ["ambitious", "proud", "content", "exhausted"],
    iconPrompt:
      "japanese school band student 1987 electric guitar bass rehearsal room after school manga illustration",
    iconPath:
      "generator/genres/manga-osaka-highschool1987/icons/PROFESSIONS#school_band_member.webp",
  },
  {
    title: "Drama Club Lead",
    industry: "Arts",
    economicTier: 3,
    statAffinity: { charisma: 1.5, intelligence: 1.2 },
    sentiments: ["ambitious", "proud", "confused", "content"],
    iconPrompt:
      "japanese drama club lead student 1987 stage performance spotlight expressive acting manga illustration",
    iconPath:
      "generator/genres/manga-osaka-highschool1987/icons/PROFESSIONS#drama_club_lead.webp",
  },
  {
    title: "Art Club Member",
    industry: "Arts",
    economicTier: 2,
    statAffinity: { dexterity: 1.4, intelligence: 1.2 },
    sentiments: ["ambitious", "content", "bored", "proud"],
    iconPrompt:
      "japanese art club student 1987 canvas painting brushes after school sunlight studio manga illustration",
    iconPath:
      "generator/genres/manga-osaka-highschool1987/icons/PROFESSIONS#art_club_member.webp",
  },

  // ── LEADERSHIP ────────────────────────────────────────────────────────────
  {
    title: "Student Council President",
    industry: "Leadership",
    economicTier: 4,
    statAffinity: { charisma: 1.5, intelligence: 1.3, wisdom: 1.2 },
    sentiments: ["proud", "exhausted", "ambitious", "content"],
    iconPrompt:
      "japanese student council president 1987 election poster podium speech authoritative manga illustration",
    iconPath:
      "generator/genres/manga-osaka-highschool1987/icons/PROFESSIONS#student_council_president.webp",
  },
  {
    title: "Club Manager",
    industry: "Leadership",
    economicTier: 2,
    statAffinity: { wisdom: 1.3, charisma: 1.1 },
    sentiments: ["content", "exhausted", "bored", "angry"],
    iconPrompt:
      "japanese sports club manager student 1987 towels scorebook water bottles sideline dedicated manga illustration",
    iconPath:
      "generator/genres/manga-osaka-highschool1987/icons/PROFESSIONS#club_manager.webp",
  },

  // ── DELINQUENT ────────────────────────────────────────────────────────────
  {
    title: "Yankii Gang Leader",
    industry: "Delinquent",
    economicTier: 3,
    statAffinity: { strength: 1.4, charisma: 1.3, constitution: 1.2 },
    sentiments: ["proud", "ambitious", "angry", "exhausted"],
    iconPrompt:
      "japanese yankii gang leader 1987 bleached pompadour school gate confrontation intimidating sukajan manga illustration",
    iconPath:
      "generator/genres/manga-osaka-highschool1987/icons/PROFESSIONS#yankii_gang_leader.webp",
  },
  {
    title: "Yankii",
    industry: "Delinquent",
    economicTier: 2,
    statAffinity: { strength: 1.3, constitution: 1.2 },
    sentiments: ["angry", "bored", "ambitious", "exhausted"],
    iconPrompt:
      "japanese yankii delinquent student 1987 outside school fence cigarette sukajan bored tough manga illustration",
    iconPath:
      "generator/genres/manga-osaka-highschool1987/icons/PROFESSIONS#yankii.webp",
  },

  // ── PART-TIME ─────────────────────────────────────────────────────────────
  {
    title: "Convenience Store Clerk",
    industry: "Part-time",
    economicTier: 2,
    statAffinity: { constitution: 1.2, charisma: 1.1 },
    sentiments: ["bored", "exhausted", "content", "angry"],
    iconPrompt:
      "japanese convenience store konbini clerk student 1987 uniform counter late night manga illustration",
    iconPath:
      "generator/genres/manga-osaka-highschool1987/icons/PROFESSIONS#convenience_store_clerk.webp",
  },
  {
    title: "Fast Food Worker",
    industry: "Part-time",
    economicTier: 1,
    statAffinity: { constitution: 1.2, dexterity: 1.1 },
    sentiments: ["bored", "angry", "exhausted", "confused"],
    iconPrompt:
      "japanese fast food student worker 1987 Osaka hamburger apron tired after school arubaito manga illustration",
    iconPath:
      "generator/genres/manga-osaka-highschool1987/icons/PROFESSIONS#fast_food_worker.webp",
  },

  // ── FACULTY ───────────────────────────────────────────────────────────────
  {
    title: "Homeroom Teacher",
    industry: "Faculty",
    economicTier: 4,
    statAffinity: { wisdom: 1.4, charisma: 1.2, intelligence: 1.2 },
    sentiments: ["exhausted", "ambitious", "content", "confused"],
    iconPrompt:
      "japanese homeroom teacher sensei 1987 chalkboard class tired knowing eyes authority manga illustration",
    iconPath:
      "generator/genres/manga-osaka-highschool1987/icons/PROFESSIONS#homeroom_teacher.webp",
  },

  // ── NSFW ──────────────────────────────────────────────────────────────────
  {
    title: "Hostess Bar Recruit",
    industry: "Part-time",
    economicTier: 1,
    nsfw: true,
    statAffinity: { charisma: 1.4, constitution: 1.1 },
    sentiments: ["anxious", "angry", "bored", "confused"],
    iconPrompt:
      "japanese teenage girl wearing a serafuku holding money in front of a bar with a neon martini sign, manga illustration",
    iconPath:
      "generator/genres/manga-osaka-highschool1987/icons/PROFESSIONS#hostess_bar_recruit.webp",
  },
];
