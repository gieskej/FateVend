// genres/manga-osaka-highschool1987/plot-archetypes.js
// Manga high school-specific plot archetypes added on top of COMMON_PLOT_ARCHETYPES.
// Same shape as common/plot-archetypes.js: id, label, weight, description,
// iconPrompt, iconPath.

export const MANGA_HS_PLOT_ARCHETYPES = [
  {
    id: "koshien_dream",
    label: "Road to Koshien",
    weight: 6,
    description:
      "The summer tournament bracket. Every game matters. One loss and it's over. This might be the last time this team is together — and everyone knows it without saying it.",
    iconPrompt:
      "japanese high school baseball player in uniform at bat, packed summer stadium crowd roaring behind them, bright sunshine, sweat and intensity, Koshien atmosphere",
    iconPath:
      "generator/genres/manga-osaka-highschool1987/icons/PLOT_ARCHETYPES#koshien_dream.webp",
  },
  {
    id: "rooftop_confession",
    label: "Rooftop Confession",
    weight: 7,
    description:
      "Someone has to say the thing they've been not-saying since April. Graduation is coming. Third years are leaving. Say it now or lose it forever. The rooftop is waiting.",
    iconPrompt:
      "high school student on school rooftop reaching out hand toward another student, both in school uniforms, cherry blossom petals drifting in breeze, afternoon golden light",
    iconPath:
      "generator/genres/manga-osaka-highschool1987/icons/PLOT_ARCHETYPES#rooftop_confession.webp",
  },
  {
    id: "bunkasai",
    label: "The Cultural Festival",
    weight: 5,
    description:
      "Three days of controlled chaos. Haunted houses, maid cafes run by the math club, a live band performance that someone has been building toward all year. Everything important happens during bunkasai.",
    iconPrompt:
      "colorful school cultural festival courtyard with handmade banners and decorated booths, students in creative costumes performing and serving, lively joyful chaos",
    iconPath:
      "generator/genres/manga-osaka-highschool1987/icons/PLOT_ARCHETYPES#bunkasai.webp",
  },
  {
    id: "rival_school_war",
    label: "School War",
    weight: 4,
    description:
      "A confrontation with the rival school — on the field, in the arcade, or in the parking lot of the Tennoji batting cages at midnight. Honor, territory, and who gets to walk through which part of Namba without looking over their shoulder.",
    iconPrompt:
      "two groups of japanese high school students in different school uniforms facing off tensely in parking lot at night, city lights in background, pride and territory at stake",
    iconPath:
      "generator/genres/manga-osaka-highschool1987/icons/PLOT_ARCHETYPES#rival_school_war.webp",
  },
  {
    id: "university_exam_gauntlet",
    label: "The Exam Gauntlet",
    weight: 5,
    description:
      "National university entrance exams in January. One shot. The cram school, the mock exams, the parents' expectations, the future — all converging on a single 200-question multiple choice form in a cold gymnasium.",
    iconPrompt:
      "japanese student alone at wooden desk in cold empty gymnasium surrounded by towers of textbooks and study notes, pencil gripped in hand over exam paper, intense focused expression",
    iconPath:
      "generator/genres/manga-osaka-highschool1987/icons/PLOT_ARCHETYPES#university_exam_gauntlet.webp",
  },
  // ── The relationship rollercoaster ──────────────────────────────────────
  // The emotional whiplash of teen romance — the whole point of the genre.
  // Weighted 4-6 so they collectively dominate without drowning out the
  // school-life plots above (Koshien, bunkasai, exams).
  {
    id: "crush_rumor",
    label: "Someone Likes You",
    weight: 6,
    description:
      "Third-hand, from a friend of a friend: somebody in this building likes you. No name. Now every hallway is an interrogation, every glance is evidence, and you are reading far too much into a borrowed eraser.",
    iconPrompt:
      "two japanese high school students whispering behind a raised hand in a classroom doorway while a third student turns to look, surprised hopeful expression, 1987 school uniforms, bright afternoon classroom, medium shot",
    iconPath:
      "generator/genres/manga-osaka-highschool1987/icons/PLOT_ARCHETYPES#crush_rumor.webp",
  },
  {
    id: "lovers_quarrel",
    label: "The Fight",
    weight: 5,
    description:
      "It started over something stupid and stopped being about that within a minute. Now neither of you will speak first. Days of passing each other in the corridor, both pretending the other is furniture.",
    iconPrompt:
      "two japanese high school students standing apart facing away from each other in an empty school corridor, arms crossed, tense angry expressions, 1987 school uniforms, long afternoon shadows, wide shot",
    iconPath:
      "generator/genres/manga-osaka-highschool1987/icons/PLOT_ARCHETYPES#lovers_quarrel.webp",
  },
  {
    id: "dumped_no_reason",
    label: "Dumped Without a Reason",
    weight: 5,
    description:
      '"I\'m sorry." That is the entire explanation. No fight, no warning, no third party to point at — just a person who used to hold your hand, now looking at the floor.',
    iconPrompt:
      "japanese high school student standing alone on a train platform holding a folded note, devastated expression, another student walking away into the distance, 1987 school uniforms, evening light, wide shot",
    iconPath:
      "generator/genres/manga-osaka-highschool1987/icons/PLOT_ARCHETYPES#dumped_no_reason.webp",
  },
  {
    id: "friend_took_them",
    label: "Your Best Friend, Your Person",
    weight: 4,
    description:
      "You found out the way everyone finds out — seeing them together from across the street, not touching, standing too close. The two people you would have called first. Neither of them called you.",
    iconPrompt:
      "japanese high school student frozen mid-step on a sidewalk staring at two other students standing close together across the street, shocked hurt expression, 1987 school uniforms, osaka city street, wide shot",
    iconPath:
      "generator/genres/manga-osaka-highschool1987/icons/PLOT_ARCHETYPES#friend_took_them.webp",
  },
  {
    id: "transfer_notice",
    label: "The Transfer Notice",
    weight: 5,
    description:
      "Dad's company is moving him. New city, new school, before the term ends. You have not told them yet. Every day you do not say it is a day you still get to pretend it is not happening.",
    iconPrompt:
      "japanese high school student sitting on a bedroom floor among packing boxes holding a photograph, sad expression, moving truck visible through the window, 1987 japanese bedroom, medium shot",
    iconPath:
      "generator/genres/manga-osaka-highschool1987/icons/PLOT_ARCHETYPES#transfer_notice.webp",
  },
  {
    id: "rumor_mill",
    label: "The Rumor Mill",
    weight: 4,
    description:
      "By lunch the whole school has a version of what supposedly happened between the two of you. Nobody is asking whether it is true. Conversations stop when you walk in and start again the moment you pass.",
    iconPrompt:
      "japanese high school student pausing in a classroom doorway holding a bag, downcast thoughtful expression, seated classmates leaning together talking quietly in the background, 1987 school uniforms, afternoon classroom light, medium shot",
    iconPath:
      "generator/genres/manga-osaka-highschool1987/icons/PLOT_ARCHETYPES#rumor_mill.webp",
  },
  {
    id: "parents_disapprove",
    label: "Not Good Enough for Their Kid",
    weight: 4,
    description:
      "Their parents were polite exactly once. Wrong school, wrong family, wrong future — the objection is never stated plainly enough to argue with. Now every meeting is either a secret or a fight.",
    iconPrompt:
      "japanese high school student kneeling across a low table from two stern disapproving parents in a traditional living room, defiant upset expression, 1987 japanese home interior, medium shot",
    iconPath:
      "generator/genres/manga-osaka-highschool1987/icons/PLOT_ARCHETYPES#parents_disapprove.webp",
  },
  {
    id: "rival_school_romance",
    label: "Across Enemy Lines",
    weight: 5,
    description:
      "They wear the other school's uniform. Your friends have opinions. Their friends have opinions. You meet three train stops from either school and still spend the whole time watching the door.",
    iconPrompt:
      "two japanese high school students in different school uniforms meeting under a train overpass, glancing nervously over their shoulders, 1987 osaka street, evening, wide shot",
    iconPath:
      "generator/genres/manga-osaka-highschool1987/icons/PLOT_ARCHETYPES#rival_school_romance.webp",
  },
  {
    id: "same_person",
    label: "You Like the Same Person",
    weight: 6,
    description:
      "Your best friend said the name out loud, glowing, and it was the same name you have been carrying around since spring. They do not know. You could tell them. You keep not telling them.",
    iconPrompt:
      "japanese high school student listening to an excited friend talking, forced smile and hurt eyes, a third student visible in the background, 1987 school uniforms, school courtyard, medium shot",
    iconPath:
      "generator/genres/manga-osaka-highschool1987/icons/PLOT_ARCHETYPES#same_person.webp",
  },
  {
    id: "assumed_couple",
    label: "Everyone Already Thinks So",
    weight: 5,
    description:
      "A misunderstanding at the shoe lockers became a rumor became established fact. The whole class treats you as a couple. Neither of you has corrected it. It has been two weeks. It is getting complicated.",
    iconPrompt:
      "two flustered japanese high school students standing side by side as grinning classmates point at them, embarrassed blushing expressions, 1987 classroom, medium shot",
    iconPath:
      "generator/genres/manga-osaka-highschool1987/icons/PLOT_ARCHETYPES#assumed_couple.webp",
  },
];
