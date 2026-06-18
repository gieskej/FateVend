// ── RACE / ETHNICITY ──────────────────────────────────────────────────────
// Structured as broad category + optional flavor detail.
// The flavor detail is passed to Claude for richer physical description
// but is never stated as a label in the output — it informs appearance prose only.

export const RACES = [

  // ── BLACK / AFRICAN DIASPORA ──────────────────────────────────────────
  {
    id: 'black_american',
    broad: 'Black',
    flavor: 'African American',
    weight: 13,
    iconPrompt: 'Modern RPG icon. A Black American standing on a city street in sharp casual wear — fitted jacket, clean sneakers — someone who reads a room before stepping into it and always comes out ahead.',
    iconPath: 'generator/genres/modern/icons/ETHNICITY#black_american.webp'
  },
  {
    id: 'black_caribbean',
    broad: 'Black',
    flavor: 'Caribbean descent — Jamaican, Haitian, Trinidadian, or similar',
    weight: 3,
    iconPrompt: 'Modern RPG icon. A Black Caribbean person with warm expressive features and relaxed, vibrant clothing, the ease of someone entirely comfortable in their own skin and unbothered by anyone who isn\'t.',
    iconPath: 'generator/genres/modern/icons/ETHNICITY#black_caribbean.webp'
  },
  {
    id: 'black_african',
    broad: 'Black',
    flavor: 'African-born or first-generation — Nigerian, Ghanaian, Ethiopian, Somali, or similar',
    weight: 3,
    iconPrompt: 'Modern RPG icon. A Black African with composed, dignified bearing in neat modern clothing, a quiet authority shaped by navigating two worlds — and doing it without making it anyone else\'s business.',
    iconPath: 'generator/genres/modern/icons/ETHNICITY#black_african.webp'
  },

  // ── LATINO / HISPANIC ─────────────────────────────────────────────────
  {
    id: 'latino_mexican',
    broad: 'Latino',
    flavor: 'Mexican or Mexican-American',
    weight: 9,
    iconPrompt: 'Modern RPG icon. A Mexican or Mexican-American with a direct, warm expression and practical everyday clothes, someone who built something from very little and knows exactly what that cost.',
    iconPath: 'generator/genres/modern/icons/ETHNICITY#latino_mexican.webp'
  },
  {
    id: 'latino_puerto_rican',
    broad: 'Latino',
    flavor: 'Puerto Rican',
    weight: 3,
    iconPrompt: 'Modern RPG icon. A Puerto Rican with expressive features and natural urban energy, colorful casual clothing, as at home on a busy city block as anywhere — probably more so.',
    iconPath: 'generator/genres/modern/icons/ETHNICITY#latino_puerto_rican.webp'
  },
  {
    id: 'latino_central_american',
    broad: 'Latino',
    flavor: 'Central American — Salvadoran, Guatemalan, Honduran, or similar',
    weight: 3,
    iconPrompt: 'Modern RPG icon. A Central American with determined eyes and quietly work-worn hands, dressed simply and practically, a resilience that doesn\'t announce itself but is obvious once you look for it.',
    iconPath: 'generator/genres/modern/icons/ETHNICITY#latino_central_american.webp'
  },
  {
    id: 'latino_south_american',
    broad: 'Latino',
    flavor: 'South American — Colombian, Venezuelan, Brazilian, Argentinian, or similar',
    weight: 2,
    iconPrompt: 'Modern RPG icon. A South American with an animated, engaged expression and smart casual clothing, the ease of someone who has learned to move between different worlds and picked up something useful from each.',
    iconPath: 'generator/genres/modern/icons/ETHNICITY#latino_south_american.webp'
  },
  {
    id: 'latino_cuban',
    broad: 'Latino',
    flavor: 'Cuban or Cuban-American',
    weight: 1,
    iconPrompt: 'Modern RPG icon. A Cuban or Cuban-American with a quick, observant expression and practical street clothing, someone who reads a situation fast, adapts faster, and has a layered personal history that\'s never far from the surface.',
    iconPath: 'generator/genres/modern/icons/ETHNICITY#latino_cuban.webp'
  },

  // ── WHITE / EUROPEAN ──────────────────────────────────────────────────
  {
    id: 'white_american',
    broad: 'White',
    flavor: 'White American — mixed European ancestry, no strong ethnic identity',
    weight: 20,
    iconPrompt: 'Modern RPG icon. A White American in a city or suburban setting, wearing unremarkable everyday clothes — jeans, a jacket, nothing that draws attention — average in presentation and not remotely average in capability.',
    iconPath: 'generator/genres/modern/icons/ETHNICITY#white_american.webp'
  },
  {
    id: 'white_eastern_european',
    broad: 'White',
    flavor: 'Eastern European — Polish, Ukrainian, Russian, Romanian, or similar',
    weight: 3,
    iconPrompt: 'Modern RPG icon. An Eastern European with a guarded, direct expression and practical clothing — coat, boots, nothing wasted — someone who came from somewhere harder and carries it quietly, without complaint or explanation.',
    iconPath: 'generator/genres/modern/icons/ETHNICITY#white_eastern_european.webp'
  },
  {
    id: 'white_southern_european',
    broad: 'White',
    flavor: 'Southern European — Italian, Greek, Spanish, Portuguese, or similar',
    weight: 2,
    iconPrompt: 'Modern RPG icon. A Southern European with warmth and sharpness in equal measure, smart casual dress, expressive even in stillness — someone who can charm a room and work it simultaneously without seeming to try.',
    iconPath: 'generator/genres/modern/icons/ETHNICITY#white_southern_european.webp'
  },
  {
    id: 'white_irish',
    broad: 'White',
    flavor: 'Irish or Irish-American',
    weight: 2,
    iconPrompt: 'Modern RPG icon. An Irish or Irish-American with pale features and a wry, slightly tired expression, a practical jacket and worn jeans, the kind of dry humor that arrives a beat before the smile does.',
    iconPath: 'generator/genres/modern/icons/ETHNICITY#white_irish.webp'
  },
  {
    id: 'white_jewish_ashkenazi',
    broad: 'White',
    flavor: 'Ashkenazi Jewish',
    weight: 2,
    iconPrompt: 'Modern RPG icon. An Ashkenazi Jewish person with sharp, attentive eyes and smart casual or academic dress, someone who has strong opinions on most things, is usually right, and has stopped pretending otherwise.',
    iconPath: 'generator/genres/modern/icons/ETHNICITY#white_jewish_ashkenazi.webp'
  },
  {
    id: 'white_middle_eastern',
    broad: 'Middle Eastern / North African',
    flavor: 'Middle Eastern or North African — Arab, Persian, Turkish, Egyptian, or similar',
    weight: 3,
    iconPrompt: 'Modern RPG icon. A Middle Eastern or North African person in polished modern urban clothing, watchful and composed, someone practiced at navigating spaces that start forming opinions about them before they\'ve said a word.',
    iconPath: 'generator/genres/modern/icons/ETHNICITY#white_middle_eastern.webp'
  },

  // ── ASIAN ─────────────────────────────────────────────────────────────
  {
    id: 'asian_east_chinese',
    broad: 'Asian',
    flavor: 'Chinese or Chinese-American',
    weight: 4,
    iconPrompt: 'Modern RPG icon. A Chinese or Chinese-American with a measured, composed expression and neat modern clothing, someone for whom precision is second nature and hard work has long since learned to look effortless.',
    iconPath: 'generator/genres/modern/icons/ETHNICITY#asian_east_chinese.webp'
  },
  {
    id: 'asian_east_korean',
    broad: 'Asian',
    flavor: 'Korean or Korean-American',
    weight: 2,
    iconPrompt: 'Modern RPG icon. A Korean or Korean-American in clean, current-season fashion, precise and self-assured, someone who holds themselves to high standards and has simply always done so — it\'s not performance, it\'s baseline.',
    iconPath: 'generator/genres/modern/icons/ETHNICITY#asian_east_korean.webp'
  },
  {
    id: 'asian_east_japanese',
    broad: 'Asian',
    flavor: 'Japanese or Japanese-American',
    weight: 1,
    iconPrompt: 'Modern RPG icon. A Japanese or Japanese-American with careful posture and impeccably maintained clothing, someone whose attention to detail shows in everything about them — whether or not they intend it to.',
    iconPath: 'generator/genres/modern/icons/ETHNICITY#asian_east_japanese.webp'
  },
  {
    id: 'asian_south_indian',
    broad: 'Asian',
    flavor: 'Indian or Indian-American — South Asian',
    weight: 4,
    iconPrompt: 'Modern RPG icon. An Indian or Indian-American with warm, intelligent eyes and modern professional or smart casual wear, the kind of person people call when something actually needs to get solved.',
    iconPath: 'generator/genres/modern/icons/ETHNICITY#asian_south_indian.webp'
  },
  {
    id: 'asian_south_pakistani',
    broad: 'Asian',
    flavor: 'Pakistani or Pakistani-American',
    weight: 1,
    iconPrompt: 'Modern RPG icon. A Pakistani or Pakistani-American with a calm, composed expression and practical modern clothing, someone who navigates complexity with a quiet steadiness that requires no recognition to sustain itself.',
    iconPath: 'generator/genres/modern/icons/ETHNICITY#asian_south_pakistani.webp'
  },
  {
    id: 'asian_southeast',
    broad: 'Asian',
    flavor: 'Southeast Asian — Vietnamese, Filipino, Thai, Cambodian, or similar',
    weight: 3,
    iconPrompt: 'Modern RPG icon. A Southeast Asian with an open, adaptable manner and casual modern clothing, someone who has made themselves at home in more than one world and quietly learned something useful from each of them.',
    iconPath: 'generator/genres/modern/icons/ETHNICITY#asian_southeast.webp'
  },

  // ── INDIGENOUS / NATIVE ───────────────────────────────────────────────
  {
    id: 'native_american',
    broad: 'Indigenous / Native American',
    flavor: 'Native American or Alaska Native',
    weight: 1,
    iconPrompt: 'Modern RPG icon. A Native American in a modern urban or community setting, grounded and present, practical everyday clothing, someone carrying a long history in a world that rarely acknowledges it — and who has learned to live with that.',
    iconPath: 'generator/genres/modern/icons/ETHNICITY#native_american.webp'
  },

  // ── MULTIRACIAL ───────────────────────────────────────────────────────
  {
    id: 'multiracial_black_white',
    broad: 'Multiracial',
    flavor: 'Mixed Black and White heritage',
    weight: 2,
    iconPrompt: 'Modern RPG icon. A person of mixed Black and White heritage with features that don\'t fit cleanly into any single category, at ease navigating multiple worlds in casual modern clothing, fully owned by none of them.',
    iconPath: 'generator/genres/modern/icons/ETHNICITY#multiracial_black_white.webp'
  },
  {
    id: 'multiracial_asian_white',
    broad: 'Multiracial',
    flavor: 'Mixed Asian and White heritage',
    weight: 2,
    iconPrompt: 'Modern RPG icon. A person of mixed Asian and White heritage whose face reads differently in every room they enter, modern casual clothing, comfortable in that ambiguity — or simply very good at appearing so.',
    iconPath: 'generator/genres/modern/icons/ETHNICITY#multiracial_asian_white.webp'
  },
  {
    id: 'multiracial_latino_mixed',
    broad: 'Multiracial',
    flavor: 'Mixed Latino and other heritage',
    weight: 2,
    iconPrompt: 'Modern RPG icon. A person of mixed Latino and other heritage, expressive and adaptable in everyday modern clothing, someone whose identity is more layered than any single label accounts for and who has made peace with that.',
    iconPath: 'generator/genres/modern/icons/ETHNICITY#multiracial_latino_mixed.webp'
  },
  {
    id: 'multiracial_other',
    broad: 'Multiracial',
    flavor: 'Mixed heritage — combination not specified',
    weight: 2,
    iconPrompt: 'Modern RPG icon. A person of mixed and unspecified heritage in casual modern clothing, a face that invites questions they have heard before and have learned to answer however they feel like answering that day.',
    iconPath: 'generator/genres/modern/icons/ETHNICITY#multiracial_other.webp'
  },
];
