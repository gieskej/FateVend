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
  },
  fantasy: {
    id: 'fantasy',
    label: 'Fantasy',
    description: 'Swords, sorcery, and ancient prophecy. Classic high fantasy with knights, wizards, and realms where magic shapes destiny.',
    portraitStyle: 'fantasy RPG art style, dramatic lighting, detailed digital illustration, centered subject, clean composition, painterly texture, rich warm palette, high fantasy atmosphere',
    tts: { preprocess: 'default', browser: { rate: 0.92, pitch: 0.95 }, kokoro: { voice: 'af_bella', speed: 0.92 }, openai: { voice: 'fable', speed: 0.92 } },
    music: { prefix: 'fantasy', tracks: ['fantasy-overture1.mp3', 'fantasy-overture_dark.mid.mp3'] },
  },
  'sci-fi': {
    id: 'sci-fi',
    label: 'Sci-Fi',
    description: 'Faster-than-light travel, alien civilizations, and the technologies that define — or threaten — what humanity becomes.',
    portraitStyle: 'dark sci-fi atmosphere, dramatic rim lighting, detailed digital illustration, centered subject, clean composition, cyberpunk aesthetic, muted palette with neon accent',
    tts: { preprocess: 'default', browser: { rate: 1.05, pitch: 1.00 }, kokoro: { voice: 'am_michael', speed: 1.05 }, openai: { voice: 'onyx', speed: 1.05 } },
    music: { prefix: 'scifi', tracks: ['scifi-Neon Grandeur.mp3', 'scifi-Neon Horizon-v1.mp3', 'scifi-Neon Horizon-v2.mp3', 'scifi-Neon Noir.mp3', 'scifi-Neon Rain.mp3', 'scifi-Neon Requiem-v1.mp3', 'scifi-Neon Requiem-v2.mp3', 'scifi-Omega Requiem.mp3', 'scifi-Void Requiem.mp3'] },
  },
  'manga-osaka-highschool1987': {
    id: 'manga-osaka-highschool1987',
    label: "Osaka HS '87",
    description: 'Manga-style high school drama in 1987 Osaka. Coming-of-age, friendships forged in crisis, and the intensity of being seventeen.',
    portraitStyle: '1980s shounen manga illustration style, bold ink lines, high contrast black and white with spot color, dramatic composition, expressive character design, retro Japanese school drama aesthetic, screen tone texture',
    tts: { preprocess: 'manga', browser: { rate: 1.10, pitch: 1.05 }, kokoro: { voice: 'af_sky', speed: 1.10 }, openai: { voice: 'shimmer', speed: 1.10 } },
    music: { prefix: 'manga', tracks: ['manga-Neon Heart_en.mp3', 'manga-Neon Heart_en_jp.mp3', 'manga-Neon Kiss.mp3'] },
  },
  paleolithic: {
    id: 'paleolithic',
    label: 'Paleolithic',
    description: 'Stone age survival at the edge of the known world. Tribe, hunt, spirit, and the slow unfolding of what it means to be human.',
    portraitStyle: 'prehistoric cave painting art style, ochre and charcoal pigments on rough stone texture, bold primitive silhouette, warm earth tones, ancient petroglyph aesthetic, centered subject',
    tts: { preprocess: 'default', browser: { rate: 0.88, pitch: 0.95 }, kokoro: { voice: 'am_adam', speed: 0.88 }, openai: { voice: 'echo', speed: 0.88 } },
    music: { prefix: 'paleolithic', tracks: ['paleolithic-Primal Dawn-v1.mp3', 'paleolithic-Primal Dawn-v2.mp3', 'paleolithic-Primal Hunt.mp3'] },
  },
  'historical-korea-joseon-dynasty': {
    id: 'historical-korea-joseon-dynasty',
    label: 'Joseon Korea',
    description: 'Honor, ceremony, and hidden intrigue. Noble houses, court politics, and lives bound by Confucian duty.',
    portraitStyle: 'Joseon Dynasty Korean court painting style, minhwa folk art, clean flat colors with mineral pigments, traditional hanbok dress, decorative floral and nature motifs, centered subject, white background, confident ink outline, warm earth and jewel tones',
    tts: { preprocess: 'default', browser: { rate: 0.85, pitch: 0.95 }, kokoro: { voice: 'bf_emma', speed: 0.85 }, openai: { voice: 'alloy', speed: 0.85 } },
    music: { prefix: 'joseon', tracks: ['joseon-A Name That Bloomed In The Moonlight-v1.mp3', 'joseon-A Name That Bloomed In The Moonlight-v2.mp3', 'joseon-A Name That Bloomed In The Moonlight-v3.mp3', 'joseon-A Red Letter Under the Moonlight.mp3', 'joseon-Rain Falls on the Palace-v1.mp3', 'joseon-Rain Falls on the Palace-v2.mp3', 'joseon-Shadow of the Throne-v1.mp3', 'joseon-Shadow of the Throne-v2.mp3', 'joseon-Shadow of the Throne-v3.mp3'] },
  },
  nihongi: {
    id: 'nihongi',
    label: 'Nihon Shoki',
    description: 'Ancient Japan at the dawn of its mythology. Kami, clan wars, and the line between the human world and the divine.',
    portraitStyle: 'Nihon Shoki ancient Japan yamato-e court painting style, minhwa-adjacent flat mineral pigments, traditional Japanese asuka court aesthetic, clean confident ink outline, centered subject, warm ochre and vermillion palette, gold leaf accent, detailed silk textile patterns, white background, ancient japanese figure study, dignified formal composition',
    tts: { preprocess: 'nihongi', browser: { rate: 0.82, pitch: 0.90 }, kokoro: { voice: 'jf_alpha', speed: 0.82 }, openai: { voice: 'onyx', speed: 0.82 } },
    music: { prefix: 'nihongi', tracks: ['nihongi-Shadow of Yomi-v1.mp3', 'nihongi-Shadow of Yomi-v2.mp3', 'nihongi-Shadow of Yomi-v3.mp3'] },
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
