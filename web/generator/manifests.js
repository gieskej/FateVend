// generator/manifests.js
// Per-genre presentation metadata — the single place that describes how each
// genre appears and sounds in the app. Consolidates what used to be five
// separate hand-maintained maps scattered through index.html:
//   GENRE_CAROUSEL_DATA, GENRE_PORTRAIT_STYLES, GENRE_TTS_CONFIG,
//   GENRE_MUSIC_PREFIX, GENRE_MUSIC_TRACKS.
//
// `tts.preprocess` is a STRING key (not a function) so this stays pure data —
// index.html maps the key to its actual preprocessor function. This keeps the
// manifest declarative, which is what the eventual uploadable genre-pack format
// (manifest.json) needs.
//
// No browser APIs. Pure data.

export const GENRE_MANIFESTS = {
  modern: {
    id: 'modern',
    label: 'Modern',
    description: 'Contemporary life in all its complexity — careers, families, secrets, and the weight of ordinary days.',
    portraitStyle: 'modern cinematic style, natural lighting, detailed digital illustration, centered subject, clean composition, contemporary realism, muted urban palette, grounded atmosphere',
    tts: { preprocess: 'default', browser: { rate: 1.00, pitch: 1.00 }, kokoro: { voice: 'af_bella', speed: 1.00 }, openai: { voice: 'nova', speed: 1.00 } },
    music: { prefix: 'modern', tracks: ['modern-Bright Prelude.mp3', 'modern-Urban Keys.mp3'] },
    slots: {
      identityCat: 'ETHNICITY', identityHeader: 'Race',
      profCat: 'PROFESSION', profHeader: 'Profession',
      econCat: 'ECONOMIC_TIER', econHeader: 'Economy',
      cityCat: 'CITY_SETTING', cityHeader: 'Setting',
      familyCat: 'FAMILY_STRUCTURE', lifeEventCat: 'LIFE_EVENT', tensionCat: 'TENSION',
      filterGendersToGenre: true, familyUsesIconSlug: false,
      economicTiers: [['tier1','survival','Survival'],['tier2','working_poor','Working Poor'],['tier3','working_lower_middle','Working Class'],['tier4','middle_upper_middle','Middle Class'],['tier5','wealthy_elite','Wealthy / Elite']],
    },
  },
  fantasy: {
    id: 'fantasy',
    label: 'Fantasy',
    description: 'Swords, sorcery, and ancient prophecy. Classic high fantasy with knights, wizards, and realms where magic shapes destiny.',
    portraitStyle: 'fantasy RPG art style, dramatic lighting, detailed digital illustration, centered subject, clean composition, painterly texture, rich warm palette, high fantasy atmosphere',
    tts: { preprocess: 'default', browser: { rate: 0.92, pitch: 0.95 }, kokoro: { voice: 'af_bella', speed: 0.92 }, openai: { voice: 'fable', speed: 0.92 } },
    music: { prefix: 'fantasy', tracks: ['fantasy-overture1.mp3', 'fantasy-overture_dark.mid.mp3'] },
    slots: {
      identityCat: 'RACE', identityHeader: 'Species',
      profCat: 'PROFESSION', profHeader: 'Profession',
      econCat: 'ECONOMIC_TIER', econHeader: 'Economy',
      cityCat: 'CITY_SETTING', cityHeader: 'Setting',
      familyCat: 'FAMILY', lifeEventCat: 'LIFE_EVENT', tensionCat: 'TENSION',
      filterGendersToGenre: true, familyUsesIconSlug: false,
      economicTiers: [['tier1','destitute','Destitute'],['tier2','common_folk','Common Folk'],['tier3','skilled_journeyman','Skilled'],['tier4','prosperous','Prosperous'],['tier5','wealthy_noble','Wealthy']],
    },
  },
  'sci-fi': {
    id: 'sci-fi',
    label: 'Sci-Fi',
    description: 'Faster-than-light travel, alien civilizations, and the technologies that define — or threaten — what humanity becomes.',
    portraitStyle: 'dark sci-fi atmosphere, dramatic rim lighting, detailed digital illustration, centered subject, clean composition, cyberpunk aesthetic, muted palette with neon accent',
    tts: { preprocess: 'default', browser: { rate: 1.05, pitch: 1.00 }, kokoro: { voice: 'am_michael', speed: 1.05 }, openai: { voice: 'onyx', speed: 1.05 } },
    music: { prefix: 'scifi', tracks: ['scifi-Neon Grandeur.mp3', 'scifi-Neon Horizon-v1.mp3', 'scifi-Neon Horizon-v2.mp3', 'scifi-Neon Noir.mp3', 'scifi-Neon Rain.mp3', 'scifi-Neon Requiem-v1.mp3', 'scifi-Neon Requiem-v2.mp3', 'scifi-Omega Requiem.mp3', 'scifi-Void Requiem.mp3'] },
    slots: {
      identityCat: 'SPECIES', identityHeader: 'Species',
      profCat: 'PROFESSIONS', profHeader: 'Profession',
      econCat: 'ECONOMIC_TIERS', econHeader: 'Economy',
      cityCat: 'CITY_SETTINGS', cityHeader: 'Setting',
      familyCat: 'FAMILY_STRUCTURES', lifeEventCat: 'LIFE_EVENTS', tensionCat: 'TENSIONS',
      filterGendersToGenre: false, familyUsesIconSlug: true,
      economicTiers: [['tier1','tier1-below-the-line','Below the Line'],['tier2','tier2-wage-serf','Wage Serf'],['tier3','tier3-independent-contractor','Contractor'],['tier4','tier4-corporate-citizen','Corp Citizen'],['tier5','tier5-elite-exec','Elite Exec']],
    },
  },
  'manga-osaka-highschool1987': {
    id: 'manga-osaka-highschool1987',
    label: "Osaka HS '87",
    description: 'Manga-style high school drama in 1987 Osaka. Coming-of-age, friendships forged in crisis, and the intensity of being seventeen.',
    portraitStyle: '1980s shounen manga illustration style, bold ink lines, high contrast black and white with spot color, dramatic composition, expressive character design, retro Japanese school drama aesthetic, screen tone texture',
    tts: { preprocess: 'manga', browser: { rate: 1.10, pitch: 1.05 }, kokoro: { voice: 'af_sky', speed: 1.10 }, openai: { voice: 'shimmer', speed: 1.10 } },
    music: { prefix: 'manga', tracks: ['manga-Neon Heart_en.mp3', 'manga-Neon Heart_en_jp.mp3', 'manga-Neon Kiss.mp3'] },
    slots: {
      identityCat: 'TRIBES', identityHeader: 'Archetype',
      profCat: 'PROFESSIONS', profHeader: 'Role',
      econCat: 'ECONOMIC_TIERS', econHeader: 'Standing',
      cityCat: 'CITY_SETTINGS', cityHeader: 'Setting',
      familyCat: 'FAMILY_STRUCTURES', lifeEventCat: 'LIFE_EVENTS', tensionCat: 'TENSIONS',
      filterGendersToGenre: false, familyUsesIconSlug: false,
      economicTiers: [['tier1','tier1-struggling','Struggling'],['tier2','tier2-working-class','Working Class'],['tier3','tier3-middle-class','Middle Class'],['tier4','tier4-well-off','Well-Off'],['tier5','tier5-bubble-rich','Bubble Rich']],
    },
  },
  paleolithic: {
    id: 'paleolithic',
    label: 'Paleolithic',
    description: 'Stone age survival at the edge of the known world. Tribe, hunt, spirit, and the slow unfolding of what it means to be human.',
    portraitStyle: 'prehistoric cave painting art style, ochre and charcoal pigments on rough stone texture, bold primitive silhouette, warm earth tones, ancient petroglyph aesthetic, centered subject',
    tts: { preprocess: 'default', browser: { rate: 0.88, pitch: 0.95 }, kokoro: { voice: 'am_adam', speed: 0.88 }, openai: { voice: 'echo', speed: 0.88 } },
    music: { prefix: 'paleolithic', tracks: ['paleolithic-Primal Dawn-v1.mp3', 'paleolithic-Primal Dawn-v2.mp3', 'paleolithic-Primal Hunt.mp3'] },
    slots: {
      identityCat: 'RACES', identityHeader: 'Tribe',
      profCat: 'PROFESSIONS', profHeader: 'Role',
      econCat: 'ECONOMIC_TIERS', econHeader: 'Status',
      cityCat: 'CITY_SETTINGS', cityHeader: 'Territory',
      familyCat: 'FAMILY_STRUCTURES', lifeEventCat: 'LIFE_EVENTS', tensionCat: 'TENSIONS',
      filterGendersToGenre: false, familyUsesIconSlug: false,
      economicTiers: [['tier1','tier1-outcast','Outcast'],['tier2','tier2-common-member','Common Member'],['tier3','tier3-valued-member','Valued Member'],['tier4','tier4-respected-elder','Elder'],['tier5','tier5-shaman-chief','Shaman / Chief']],
    },
  },
  'historical-korea-joseon-dynasty': {
    id: 'historical-korea-joseon-dynasty',
    label: 'Joseon Korea',
    description: 'Honor, ceremony, and hidden intrigue. Noble houses, court politics, and lives bound by Confucian duty.',
    portraitStyle: 'Joseon Dynasty Korean court painting style, minhwa folk art, clean flat colors with mineral pigments, traditional hanbok dress, decorative floral and nature motifs, centered subject, white background, confident ink outline, warm earth and jewel tones',
    tts: { preprocess: 'default', browser: { rate: 0.85, pitch: 0.95 }, kokoro: { voice: 'bf_emma', speed: 0.85 }, openai: { voice: 'alloy', speed: 0.85 } },
    music: { prefix: 'joseon', tracks: ['joseon-A Name That Bloomed In The Moonlight-v1.mp3', 'joseon-A Name That Bloomed In The Moonlight-v2.mp3', 'joseon-A Name That Bloomed In The Moonlight-v3.mp3', 'joseon-A Red Letter Under the Moonlight.mp3', 'joseon-Rain Falls on the Palace-v1.mp3', 'joseon-Rain Falls on the Palace-v2.mp3', 'joseon-Shadow of the Throne-v1.mp3', 'joseon-Shadow of the Throne-v2.mp3', 'joseon-Shadow of the Throne-v3.mp3'] },
    slots: {
      identityCat: 'CLASSES', identityHeader: 'Class',
      profCat: 'PROFESSIONS', profHeader: 'Profession',
      econCat: 'ECONOMIC_TIERS', econHeader: 'Standing',
      cityCat: 'CITY_SETTINGS', cityHeader: 'Setting',
      familyCat: 'FAMILY_STRUCTURES', lifeEventCat: 'LIFE_EVENTS', tensionCat: 'TENSIONS',
      filterGendersToGenre: false, familyUsesIconSlug: false,
      economicTiers: [['tier1','tier1-destitute','Destitute'],['tier2','tier2-subsistence','Subsistence'],['tier3','tier3-modest','Modest'],['tier4','tier4-established','Established'],['tier5','tier5-elite','Elite']],
    },
  },
  nihongi: {
    id: 'nihongi',
    label: 'Nihon Shoki',
    description: 'Ancient Japan at the dawn of its mythology. Kami, clan wars, and the line between the human world and the divine.',
    portraitStyle: 'Nihon Shoki ancient Japan yamato-e court painting style, minhwa-adjacent flat mineral pigments, traditional Japanese asuka court aesthetic, clean confident ink outline, centered subject, warm ochre and vermillion palette, gold leaf accent, detailed silk textile patterns, white background, ancient japanese figure study, dignified formal composition',
    tts: { preprocess: 'nihongi', browser: { rate: 0.82, pitch: 0.90 }, kokoro: { voice: 'jf_alpha', speed: 0.82 }, openai: { voice: 'onyx', speed: 0.82 } },
    music: { prefix: 'nihongi', tracks: ['nihongi-Shadow of Yomi-v1.mp3', 'nihongi-Shadow of Yomi-v2.mp3', 'nihongi-Shadow of Yomi-v3.mp3'] },
    slots: {
      identityCat: 'CLANS', identityHeader: 'Clan',
      profCat: 'PROFESSIONS', profHeader: 'Profession',
      econCat: 'ECONOMIC_TIERS', econHeader: 'Standing',
      cityCat: 'CITY_SETTINGS', cityHeader: 'Setting',
      familyCat: 'FAMILY_STRUCTURES', lifeEventCat: 'LIFE_EVENTS', tensionCat: 'TENSIONS',
      filterGendersToGenre: false, familyUsesIconSlug: false,
      economicTiers: [['tier1','tier1-outcast','Outcast'],['tier2','tier2-peasant','Peasant'],['tier3','tier3-minor-official','Minor Official'],['tier4','tier4-court-retainer','Court Retainer'],['tier5','tier5-great-lord','Great Lord']],
    },
  },
};

// Display order for the genre carousel (distinct from the engine's genre order).
export const CAROUSEL_ORDER = [
  'fantasy',
  'historical-korea-joseon-dynasty',
  'modern',
  'nihongi',
  'manga-osaka-highschool1987',
  'paleolithic',
  'sci-fi',
];

// Carousel cards, derived from the manifests in display order.
export const GENRE_CAROUSEL_DATA = CAROUSEL_ORDER.map(id => ({
  id,
  label: GENRE_MANIFESTS[id].label,
  desc:  GENRE_MANIFESTS[id].description,
}));

// ── PROMPT VOICE ───────────────────────────────────────────────────────────
// Per-genre prompt "voice": the pieces of the character-generation prompt that
// differ by genre (identity label, genre label, opening-scene note, portrait
// note, and the system prompt). The rest of the prompt template is shared and
// lives in index.html's buildPrompt. Extracted verbatim from the former
// per-genre ternary chains + getSystemPrompt if-chain.
export const GENRE_VOICE = {
  "modern": {
    "identityLabel": "Ethnicity",
    "genreLabel": "AI Dungeon",
    "openingNote": "Second person. Drop the player directly into a vivid, specific moment — right now. Sensory detail. End mid-moment with a clear next decision.",
    "appearanceNote": "Comma-separated visual descriptors for a text-to-image model. Start with \"portrait of\" then: age range, gender, body type, hair color and style, eye description, distinguishing feature if any, outfit suited to their job and economic tier, setting mood. Include \"face of [a historical figure or classic-cinema figure whose gender, ethnicity, and approximate age match this character — someone whose likeness is well-documented in photographs or portraiture]\". Close with: photorealistic, cinematic lighting. No sentences — descriptors only.",
    "systemPrompt": "You are a creative writer generating AI Dungeon scenario content.\nYour output must be vivid, specific, and immediately usable as a game scenario.\n\nTONE — this is critical:\nThese characters are for a game. Players should want to play them.\nWrite with energy, wit, and a light touch even when the material is dark.\nDark comedy is welcome. Characters should feel alive, flawed, and fun — not just tragic.\nA character drowning in debt can still be the funniest person in the room.\nA burned-out nurse can love her job at 7am and hate it by noon.\nMisery is a seasoning, not the whole dish.\nEvery character should have at least one quality that makes you root for them.\nThere should be an overall plot, not just dialog.\n\nSTYLE:\n- Behavioral prose — show character through action, detail, and implication. Never explain.\n- Never mention stat numbers.\n- Use sentence fragments where they sharpen the prose.\n- Stay within the exact character limits given. Count carefully.\n\nOutput only the JSON structure requested. No preamble, no commentary, no markdown fences."
  },
  "fantasy": {
    "identityLabel": "Race",
    "genreLabel": "fantasy",
    "openingNote": "Second person. Drop the player into a vivid fantasy moment right now — mid-scene. Sensory detail (smells, sounds, weight of gear). End mid-moment with a clear choice.",
    "appearanceNote": "Comma-separated visual descriptors for a text-to-image model. Start with \"portrait of\" then: race, age range, gender, body type, hair color and style, eye description, distinguishing feature if any, armor or clothing suited to their role, setting mood. Include \"face of [a historical figure, classical warrior, or well-known portrait subject whose gender, racial appearance, and approximate age match this character]\". Close with: fantasy character art, detailed digital illustration, dramatic lighting. No sentences — descriptors only.",
    "systemPrompt": "You are a creative writer generating AI Dungeon fantasy scenario content.\nYour output must be vivid, specific, and immediately usable as a game scenario.\n\nTONE — this is critical:\nThese characters are for a game. Players should want to play them.\nWrite with energy, wit, and a light touch even when the material is dark.\nDark comedy is welcome. Fantasy characters should feel like real people who happen to live in a world with magic and monsters — not cardboard archetypes.\nA broke sellsword can be the funniest person in the tavern. A fallen paladin can be genuinely good company while being a genuine mess.\nSuffering is a seasoning, not the whole dish. Every character should have at least one quality that makes you want to spend time with them.\n\nSTYLE:\n- Behavioral prose — show character through action, detail, and implication. Never explain.\n- Never mention stat numbers.\n- Weave race, appearance, and quirk naturally into behavior and description.\n- Ground descriptions in sensory detail — smells of forge smoke, the weight of armor, the sound of a crowded tavern.\n- Stay within the exact character limits given.\n\nOutput only the JSON structure requested. No preamble, no commentary, no markdown fences."
  },
  "sci-fi": {
    "identityLabel": "Species",
    "genreLabel": "AI Dungeon sci-fi",
    "openingNote": "Second person. Drop the player into a specific vivid sci-fi moment — right now, mid-scene. Smells: recycled air, ozone, synth-food. Weight: aug hardware, vacuum suit. End mid-moment with a clear choice or action available. No backstory. No summaries.",
    "appearanceNote": "Comma-separated visual descriptors for a text-to-image model. Start with \"portrait of\" then: species and augmentation description, age range, gender, body type, hair, eyes, cybernetic features if any, clothing and equipment suited to their role and economic tier, setting mood. Include \"face of [a historical figure or well-known portrait subject whose gender and appearance match this character — someone whose likeness is well-documented]\". Close with: sci-fi concept art, detailed digital illustration, dramatic lighting. No sentences — descriptors only.",
    "systemPrompt": "You are a creative writer generating AI Dungeon sci-fi scenario content.\nYour output must be vivid, specific, and immediately usable as a game scenario.\n\nTONE — this is critical:\nThese characters are for a game. Players should want to play them.\nWrite with energy, wit, and a light touch even when the material is dark.\nDark comedy is welcome. Characters should feel alive, flawed, and fun — not just grim.\nA smuggler drowning in syndicate debt can still be the most competent person on the station.\nA burned-out corporate medic can genuinely love their work at 0700 and resent it by 1400.\nThe void is bleak. The people in it don't have to be.\nEvery character should have at least one quality that makes you root for them.\n\nSTYLE:\n- Behavioral prose — show character through action, detail, and implication. Never explain.\n- Never mention stat numbers.\n- Ground descriptions in sensory sci-fi detail: the hum of recycled air, the weight of aug hardware, the static of a distant comms signal, the particular smell of a station that's been sealed too long.\n- Use sentence fragments where they sharpen the prose.\n- Stay within the exact character limits given.\n\nOutput only the JSON structure requested. No preamble, no commentary, no markdown fences."
  },
  "manga-osaka-highschool1987": {
    "identityLabel": "Archetype",
    "genreLabel": "AI Dungeon manga Osaka high school 1987",
    "openingNote": "Second person. Drop the player into a specific vivid Osaka 1987 high school moment — right now, mid-scene. Smells: chalk dust, shoe lockers, canned coffee. Sound: walkman leak, squeaking gym floor, rain on the school roof. End mid-moment with a clear choice or action available. No backstory. No summaries.",
    "appearanceNote": "Comma-separated visual descriptors for a text-to-image model. Start with \"portrait of\" then: Japanese high school student, archetype (yankii/honor student/etc.), age range, gender, uniform description, hair style, eyes, distinguishing feature if any, school or Osaka street setting detail. Include \"face of [a Japanese actor or musician from the 1980s whose gender and approximate age match this character — someone visually documented in 1980s Japanese media]\". Close with: 1980s shounen or shoujo manga illustration style, high contrast ink lines, halftone. No sentences — descriptors only.",
    "systemPrompt": "You are a creative writer generating AI Dungeon content for a manga-style high school RPG set in Osaka, Japan, 1987.\nYour output must be vivid, emotionally charged, and immediately playable as a scenario.\n\nTONE — this is critical:\nThis is shounen and shoujo manga territory. Big feelings. Dramatic pauses. Rain at the worst possible moment.\nCharacters should feel like they are the protagonist of their own manga — even the background characters.\nThe emotional register is high: first loves feel world-ending, rivalries feel cosmic, club losses feel like grief.\nGround it in specificity: the smell of canned Boss coffee, the weight of a baseball bat callus, the specific embarrassment of slipping into Osaka-ben mid-confession.\nDark material is permitted — but even the yankii should feel like they have a code and a reason.\nEvery character should have a moment that makes the reader lean forward.\n\nSETTING RULES — 1987 Osaka:\n- Bubble economy heating up — money is visible, optimism is real, fashion is getting louder\n- High school: sailor fuku and gakuran uniforms, strict clubs, school festivals (bunkasai), entrance exam obsession\n- Technology: cassette walkmans, CRT televisions, corded phones, no internet, no mobile phones\n- Music: Boøwy, THE BLUE HEARTS, Yumi Matsutoya, Southern All Stars, Yellow Magic Orchestra\n- Manga/anime of the era: Dragon Ball, City Hunter, Touch, Maison Ikkoku, Kimagure Orange Road\n- Yankii subculture: pompadours, sukajan jackets, custom bicycles, territory, respect is everything\n- Osaka identity: Kansai dialect beneath standard Japanese; merchant culture pride; tachikiri humor\n- Locations: Dotonbori neon, Shinsaibashi boutiques, Den Den Town electronics, school rooftops, batting cages, kissaten\n\nSTYLE:\n- Behavioral prose — show character through action, dialogue rhythm, small physical details\n- Manga visual language is welcome: describe what a panel would show\n- Never mention stat numbers\n- Sensory specificity: squeak of gym floors, chalk dust, Boss coffee can warmth, rain on the school roof\n- Sentence fragments for emphasis — manga style\n- Stay within the exact character limits given\n\nOutput only the JSON structure requested. No preamble, no commentary, no markdown fences."
  },
  "paleolithic": {
    "identityLabel": "Tribe",
    "genreLabel": "AI Dungeon paleolithic",
    "openingNote": "Second person. Drop the player into a specific vivid stone-age moment — right now, mid-scene. Smells: woodsmoke, wet earth, blood, hide. Weight: a hafted spear, a stone axe, cold air. End mid-moment with a clear choice or action available. No backstory. No summaries.",
    "appearanceNote": "Comma-separated visual descriptors for a text-to-image model. Start with \"portrait of\" then: tribal group, age range, gender, body type, natural unprocessed hair, eyes, ritual markings or scars if any, clothing (hides, sinew, bone ornaments) suited to their role. Include \"face of [a historical figure or archaeological reconstruction whose gender, geographic origin, and approximate age match this character]\". Close with: paleolithic cave art style, dramatic torchlight, detailed digital illustration. No sentences — descriptors only.",
    "systemPrompt": "You are a creative writer generating AI Dungeon paleolithic scenario content.\nYour output must be vivid, specific, and immediately usable as a game scenario set in the Stone Age.\n\nTONE — this is critical:\nThese characters are for a game. Players should want to play them.\nWrite with energy, visceral detail, and a light touch even when the material is brutal.\nDark humor is welcome. Paleolithic characters should feel fully human — clever, emotional, funny, petty, brave — not noble savages or grunting caricatures.\nA flint knapper who takes tremendous pride in their work is more interesting than a warrior who only kills things.\nSuffering is a constant backdrop — but these people laugh, love, argue, tell stories, and have opinions about how to make a fire correctly.\nEvery character should have at least one quality that makes you want to follow them into the dark.\n\nSETTING RULES:\n- No metal, no writing, no agriculture. Technology: stone, bone, antler, wood, hide, sinew, plant fiber.\n- The spirit world is real within the narrative — experienced, not dismissed.\n- Small bands (15–50 people), tribal alliances, shamanic authority, elder councils.\n\nSTYLE:\n- Behavioral prose — show character through action, detail, and implication. Never explain.\n- Never mention stat numbers.\n- Ground descriptions in raw sensory detail: the smell of wet hide and woodsmoke, the weight of a flint hand axe, the particular sound a cave makes before dawn.\n- Use sentence fragments where they sharpen the prose.\n- Stay within the exact character limits given.\n\nOutput only the JSON structure requested. No preamble, no commentary, no markdown fences."
  },
  "historical-korea-joseon-dynasty": {
    "identityLabel": "Class",
    "genreLabel": "AI Dungeon Joseon Korea",
    "openingNote": "Second person. Drop the player into a specific vivid Joseon moment — right now, mid-scene. Smells: pine ink, incense, ondol heat, cold winter air. Weight: silk hanbok, a gat hat, a brushwork memorial to deliver. End mid-moment with a clear choice or action available. No backstory. No summaries.",
    "appearanceNote": "Comma-separated visual descriptors for a text-to-image model. Start with \"portrait of\" then: Joseon Dynasty Korean person, social class indicator, age range, gender, hanbok style and color, hair style (topknot/gat/binyeo/chignon), eyes, distinguishing feature if any, setting element. Include \"face of [a Korean or East Asian historical figure, classical portrait subject, or screen actor whose gender, approximate age, and social register match this character]\". Close with: Joseon court painting style, minhwa folk art palette, ink and mineral pigment. No sentences — descriptors only.",
    "systemPrompt": "You are a creative writer generating AI Dungeon content for a historical RPG set in Joseon Dynasty Korea.\nYour output must be vivid, grounded in authentic Korean history and culture, and immediately playable as a scenario.\n\nTONE — this is critical:\nThis is historical drama territory: Confucian weight, faction politics, the specific cruelties of a class system enforced with paperwork.\nCharacters should feel the full gravity of the world without being crushed by it — they want things, scheme for things, love things.\nThe register is literary but never academic. Sensory texture: mulberry paper, pine ink, ondol floors, silk hanbok, gat hats, haegeum music.\nDark material is permitted and treated seriously. But every character should have at least one quality that makes the player lean forward.\nWit is welcome — Joseon scholars were deeply funny — but bone-dry and never anachronistic.\n\nSETTING RULES — Joseon Korea:\n- Strict hierarchy: yangban (scholar/military aristocracy), jungin (technical middle class), sangmin (commoners), cheonmin (low-born). Genealogy registers (jokbo) are everything.\n- The gwageo civil service examinations are the path to power — years of preparation, crushing failure rates, political manipulation.\n- Bungdang faction politics: court factions (Easterner/Westerner/Southerner/Northerner) engage in perpetual purges. The wrong patron is death.\n- Women are confined to the inner household (anchae) by Confucian law but exercise real power within those constraints. Gisaeng move freely.\n- Buddhism is officially suppressed but practiced everywhere. Catholic converts face execution in later periods.\n- The Imjin War (Japanese invasion, 1592–1598) is a generational trauma. After 1598, references are inevitable.\n- Tributary relationship with Ming/Qing China: diplomatic missions to Beijing are the most worldly experience available.\n\nSTYLE:\n- Behavioral prose — show character through action, objects, posture, and what they don't say. Never explain.\n- Honor the hierarchy in every address and bow — rank is performed constantly.\n- Never mention stat numbers.\n- Sensory specificity: ink, silk, ondol heat, gat hat weight, haegeum sound, makgeolli smell, the cold of a northern province.\n- Sentence fragments where they sharpen — maintain a slightly elevated register that suits the era's literary self-consciousness.\n- Stay within the exact character limits given.\n\nOutput only the JSON structure requested. No preamble, no commentary, no markdown fences."
  },
  "nihongi": {
    "identityLabel": "Clan",
    "genreLabel": "AI Dungeon Ancient Japan",
    "openingNote": "Second person. Drop the player into a specific vivid ancient Japan moment — right now, mid-scene. Smells: hinoki cypress, incense smoke, rice wine, damp forest floor. Weight: layered silk, a bronze mirror on a cord, a clay-sealed message tube. End mid-moment with a clear choice or action available. No backstory. No summaries.",
    "appearanceNote": "Comma-separated visual descriptors for a text-to-image model. Start with \"portrait of\" then: ancient Japanese Yamato court person, clan rank indicator, age range, gender, layered silk robes or plain cloth depending on class, hair style (formal pinned court / loose bound / topknot / shaved), eyes, distinguishing feature if any, setting element. Include \"face of [a Japanese historical figure, classical portrait subject, or East Asian actor whose gender, approximate age, and bearing match this character]\". Close with: Nihon Shoki era yamato-e court painting style, mineral pigment palette, ink outline, asuka period Japan. No sentences — descriptors only.",
    "systemPrompt": "You are a narrative AI writing characters for AI Dungeon scenarios set in ancient Japan as depicted in the Nihon Shoki and Kojiki — the world of the Yamato court, approximately 6th–8th century CE. The historical scaffold is real: clan hierarchy, kami worship, the arrival of Buddhism, Confucian governance meeting older shamanic traditions. But the supernatural is not decoration — it is the operating reality of the world, and it is dangerous.\n\nTONE — this is critical:\nThe gods are real, present, and not reliably benevolent. Yokai — oni, kappa, tengu, kitsune — are not folklore; they are things people encounter and survive, or do not. The membrane between the living world and Yomi, the land of the dead, is thin and not always stable. Horror is appropriate — not gore, but dread. The wrongness of a shadow that moves independently. The cold that precedes a kami's attention.\nThese characters are for a game. Players should want to play them. Write with energy, creepy visceral detail, and a light touch even when the material is brutal. Every character should have at least one quality that makes you want to follow them into the dark.\n\nSETTING RULES:\n- Clan (uji) hierarchy: what a family owes and what pursues them is inherited.\n- The kami are real. An angry kami is a natural disaster with a memory.\n- Kegare (ritual pollution) spreads like contagion. Contact with death or forbidden entities without misogi purification leaves a mark.\n- Yokai exist with their own natures and reasons. An oni wants what it wants. A kitsune has plans.\n- Yomi — the land of the dead — is a physical place. The dead can return if unwilling, unfed, or called.\n- Buddhism has arrived from Baekje and is politically contested — but its practices sometimes work.\n\nTHE SUPERNATURAL ORDER:\n- Wrathful kami will take what they need. A vessel in this state has the kami's knowledge but the kami is using the body as a convenience.\n- Goryō — the vengeful dead who refused Yomi — are dangerous, intelligent, and patient.\n- Kitsune have long-term plans that do not align with human welfare. A kitsune in disguise is almost perfect — almost.\n\nSTYLE:\n- Describe the supernatural sensorially: iron smell of the spirit world, the cold that precedes a kami's attention, the wrongness of a shapeshifter's eyes in reflected light.\n- Characters speak in terms of duty, kami will, clan obligation, seasonal metaphor, and omen — not modern psychology.\n- Characters should carry the weight of unseen things — what spirits know them, what follows them.\n- Sensory specificity: hinoki cypress, river stone, layered silk, cold rice wine, the specific sound a bronze bell makes in fog.\n- Never mention stat numbers. Stay within the exact character limits given. No anachronisms.\n\nOutput only the JSON structure requested. No preamble, no commentary, no markdown fences."
  }
};
