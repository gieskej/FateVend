// genres/nihongi/names.js
// NAME_POOLS keyed by RACES[].broad — must match exactly.
// Names drawn from Nihon Shoki, Kojiki, and Asuka-period records.
// Structure: Clan name (last) + given name (first), joined with " no " in text.

export const NAME_POOLS = {
  'Imperial Clan': {
    masc:    ['Ōama', 'Takechi', 'Kusukabe', 'Naka', 'Ōtsu', 'Kume', 'Mommu', 'Yamabe', 'Ōhito', 'Hitachi', 'Ōtomo', 'Kashiwade', 'Kusakabe'],
    fem:     ['Nukata', 'Hashihito', 'Genmei', 'Ōta', 'Kagami', 'Uji', 'Ara', 'Toji', 'Hitachihime', 'Ōshisaka'],
    neutral: ['Kage', 'Teru', 'Michi', 'Hime', 'Kimi', 'Take'],
    last:    ['Yamato', 'Ōama', 'Katsuragi', 'Ōshisaka', 'Ōhatsuse', 'Takeru', 'Asuka', 'Naniwa'],
  },
  'Great Omi Clan': {
    masc:    ['Umako', 'Iruka', 'Emishi', 'Hote', 'Toyora', 'Katashima', 'Koma', 'Iname', 'Okura', 'Akae', 'Sarara', 'Furuhito'],
    fem:     ['Kashiwade', 'Ōta', 'Hotarubi', 'Tokime', 'Furu', 'Maro', 'Ahe'],
    neutral: ['Kashi', 'Tomi', 'Nori', 'Hata', 'Furu'],
    last:    ['Soga', 'Ki', 'Kose', 'Heguri', 'Takechi', 'Katsuragi', 'Sakurai'],
  },
  'Great Muraji Clan': {
    masc:    ['Okoshi', 'Moriya', 'Kamatari', 'Azumi', 'Kamako', 'Furu', 'Ōkura', 'Imaro', 'Ōbisho', 'Ōchi', 'Miwa', 'Kusushi'],
    fem:     ['Kagami', 'Suseri', 'Uji', 'Ōta', 'Toji', 'Hime', 'Furu'],
    neutral: ['Furu', 'Tama', 'Nagi', 'Miwa', 'Kami'],
    last:    ['Nakatomi', 'Mononobe', 'Ōtomo', 'Abe', 'Imbe', 'Inukami', 'Miwa', 'Wani'],
  },
  'Court Official': {
    masc:    ['Bun', 'Fumi', 'Kose', 'Kurome', 'Sakanoue', 'Agata', 'Koto', 'Mano', 'Yuge', 'Fune', 'Tori', 'Imaki', 'Hata'],
    fem:     ['Toji', 'Fuji', 'Koma', 'Ichi', 'Sono', 'Nui', 'Hata', 'Ima'],
    neutral: ['Koto', 'Michi', 'Nori', 'Bun', 'Ichi', 'Fumi'],
    last:    ['Fumi', 'Yamabe', 'Tsuki', 'Hata', 'Kume', 'Sakanoue', 'Ōhida', 'Yuge'],
  },
  'Provincial Lord': {
    masc:    ['Kibi', 'Izumo', 'Musashi', 'Totomi', 'Hitachi', 'Kazusa', 'Iwaki', 'Hida', 'Ōmi', 'Kii', 'Tosa', 'Awa', 'Shimosa'],
    fem:     ['Ube', 'Nui', 'Koma', 'Sue', 'Tori', 'Mure', 'Kuni'],
    neutral: ['Kuni', 'Tachi', 'Hara', 'Mure', 'Hiko', 'Hime'],
    last:    ['Kibi', 'Izumo', 'Tsukushi', 'Koshi', 'Ōmi', 'Kazusa', 'Yamashiro', 'Settsu'],
  },
  'Craft Guild': {
    masc:    ['Hata', 'Aya', 'Kuratsukuri', 'Mimashi', 'Tokome', 'Imiki', 'Nishikori', 'Kajiya', 'Fumi', 'Numa', 'Koma', 'Ōtachi', 'Shima'],
    fem:     ['Sue', 'Kinu', 'Ori', 'Tama', 'Hana', 'Aya', 'Nui', 'Sode'],
    neutral: ['Hata', 'Aya', 'Sue', 'Ori', 'Tama', 'Koma'],
    last:    ['Hata', 'Aya', 'Fumi', 'Kuratsukuri', 'Nishikori', 'Kajiya', 'Imiki', 'Ōtachi'],
  },
  'Free Farmer': {
    masc:    ['Kome', 'Take', 'Mine', 'Fuyu', 'Ike', 'Haru', 'Numa', 'Mori', 'Tani', 'Hata', 'Kaya', 'Sawa', 'Nobe'],
    fem:     ['Kome', 'Mine', 'Haru', 'Fuyu', 'Sato', 'Sue', 'Nobe', 'Kaya'],
    neutral: ['Kome', 'Mine', 'Ike', 'Hara', 'Mori', 'Nobe'],
    last:    ['Mura', 'Sato', 'Hata', 'Mori', 'Shima', 'Ike', 'Numa', 'Tani', 'Kaya'],
  },
  'Bondsman': {
    masc:    ['Ki', 'Ma', 'Ku', 'Taka', 'Mi', 'Hina', 'Nuri', 'Kaya', 'Ima', 'Sawa', 'Tori'],
    fem:     ['Ki', 'Ma', 'Hina', 'Sue', 'Aya', 'Nui', 'Ori', 'Sode', 'Sawa'],
    neutral: ['Ki', 'Hina', 'Aya', 'Ma', 'Sawa', 'Tori'],
    last:    ['Yamato', 'Soga', 'Hata', 'Mura', 'Sato', 'Mori', 'Shima'],
  },
};
