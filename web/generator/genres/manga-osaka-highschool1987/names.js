// genres/manga-osaka-highschool1987/names.js
// Japanese name pools keyed by school archetype (identity.broad).
// Surnames are common Japanese family names from the era.
// Given names reflect the archetype's flavor while staying period-authentic.

export const NAME_POOLS = {

  // ── YANKII ────────────────────────────────────────────────────────────────
  'Yankii': {
    masc:    ['Ryuji', 'Takeshi', 'Kunio', 'Makoto', 'Tetsuya', 'Hiroyuki', 'Masaaki', 'Noboru',
              'Kenji', 'Toshio', 'Akira', 'Junnosuke', 'Kyosuke', 'Daichi', 'Ryu'],
    fem:     ['Junko', 'Yuki', 'Tomoe', 'Akemi', 'Kazue', 'Sachiko', 'Miyuki', 'Fumie',
              'Noriko', 'Reiko', 'Yoshiko', 'Haruko', 'Sumiko', 'Teruko', 'Kimiko'],
    neutral: ['Kaoru', 'Nao', 'Sora', 'Tomo', 'Akira', 'Rei', 'Hikaru', 'Yuu'],
    last:    ['Tanaka', 'Yamamoto', 'Nakamura', 'Watanabe', 'Kobayashi', 'Ito', 'Kato',
              'Shimizu', 'Hayashi', 'Inoue', 'Ogawa', 'Mori', 'Maeda', 'Fujita', 'Nishida',
              'Goto', 'Okamoto', 'Kimura', 'Ueda', 'Naito'],
  },

  // ── HONOR STUDENT ─────────────────────────────────────────────────────────
  'Honor Student': {
    masc:    ['Hiroshi', 'Kenji', 'Shinichi', 'Toshiro', 'Kazuhiro', 'Masato', 'Nobuhiro',
              'Satoshi', 'Yoshiro', 'Takahiro', 'Shunsuke', 'Naoki', 'Tomohiro', 'Fumihiro', 'Koji'],
    fem:     ['Yukiko', 'Michiko', 'Keiko', 'Akiko', 'Tomoko', 'Noriko', 'Yoshiko', 'Kyoko',
              'Hiroko', 'Fumiko', 'Kazuko', 'Mariko', 'Sachiko', 'Reiko', 'Naoko'],
    neutral: ['Hikaru', 'Kaoru', 'Rei', 'Nao', 'Akira', 'Saki', 'Natsuki', 'Tomo'],
    last:    ['Suzuki', 'Yamada', 'Sasaki', 'Yamazaki', 'Matsumoto', 'Ikeda', 'Hashimoto',
              'Fujiwara', 'Nishimura', 'Ishikawa', 'Abe', 'Miyamoto', 'Honda', 'Hasegawa',
              'Tamura', 'Saito', 'Kawamoto', 'Nakajima', 'Yamamoto', 'Kondo'],
  },

  // ── SPORTS ACE ────────────────────────────────────────────────────────────
  'Sports Ace': {
    masc:    ['Ichiro', 'Kenta', 'Daisuke', 'Yusuke', 'Tatsuya', 'Kosuke', 'Ryota',
              'Shohei', 'Daiki', 'Takuya', 'Koichi', 'Masahiro', 'Tsubasa', 'Kotaro', 'Goro'],
    fem:     ['Ayumi', 'Haruka', 'Miho', 'Rie', 'Kaori', 'Yumiko', 'Madoka', 'Yoko',
              'Satsuki', 'Tomoe', 'Mika', 'Asuka', 'Natsuko', 'Chiharu', 'Kana'],
    neutral: ['Sora', 'Natsuki', 'Akira', 'Tomo', 'Hikaru', 'Kiri', 'Nao', 'Haruki'],
    last:    ['Tanaka', 'Yamamoto', 'Ito', 'Nakamura', 'Watanabe', 'Kato', 'Yoshida',
              'Shimizu', 'Mori', 'Hayashi', 'Okamoto', 'Maeda', 'Kimura', 'Fujita',
              'Ueda', 'Inoue', 'Tamura', 'Honda', 'Goto', 'Takahashi'],
  },

  // ── DRAMA KID ─────────────────────────────────────────────────────────────
  'Drama Kid': {
    masc:    ['Hikaru', 'Ryosuke', 'Shuichi', 'Taichi', 'Makoto', 'Kazuya', 'Shinya',
              'Yoji', 'Haruki', 'Seiichi', 'Ryo', 'Masaki', 'Takeshi', 'Koji', 'Isamu'],
    fem:     ['Ayaka', 'Emi', 'Saki', 'Yuri', 'Kanako', 'Madoka', 'Nana', 'Shiori',
              'Yumiko', 'Fumiko', 'Akane', 'Chiharu', 'Ritsuko', 'Yoshimi', 'Hanako'],
    neutral: ['Rei', 'Kaoru', 'Akira', 'Hikaru', 'Sora', 'Nao', 'Tomo', 'Yuu'],
    last:    ['Kawamoto', 'Fujiwara', 'Hashimoto', 'Nishimura', 'Sasaki', 'Yamazaki',
              'Ikeda', 'Matsumoto', 'Abe', 'Hasegawa', 'Ishikawa', 'Miyamoto', 'Kondo',
              'Nakajima', 'Saito', 'Ogawa', 'Honda', 'Tamura', 'Ueda', 'Takahashi'],
  },

  // ── TRANSFER STUDENT ──────────────────────────────────────────────────────
  'Transfer Student': {
    masc:    ['Shin', 'Ryu', 'Ken', 'Hiro', 'Jun', 'Sho', 'Taro', 'Jiro', 'Saburo',
              'Kazuya', 'Naoki', 'Shota', 'Yuto', 'Kei', 'Sosuke'],
    fem:     ['Mio', 'Rin', 'Yui', 'Ai', 'Hana', 'Nao', 'Riko', 'Sae',
              'Nana', 'Yuna', 'Minami', 'Haruna', 'Koharu', 'Aoi', 'Misaki'],
    neutral: ['Sora', 'Nao', 'Kiri', 'Rei', 'Hikaru', 'Tomo', 'Natsuki', 'Akira'],
    last:    ['Yamamoto', 'Tanaka', 'Suzuki', 'Ito', 'Watanabe', 'Kato', 'Nakamura',
              'Kobayashi', 'Yoshida', 'Yamada', 'Mori', 'Hayashi', 'Inoue', 'Shimizu',
              'Kimura', 'Yamaguchi', 'Ogawa', 'Matsumoto', 'Saito', 'Goto'],
  },

  // ── OTAKU ─────────────────────────────────────────────────────────────────
  'Otaku': {
    masc:    ['Satoshi', 'Tomohiro', 'Noboru', 'Kazuaki', 'Shigeru', 'Hiroshi', 'Makoto',
              'Tetsuya', 'Kenji', 'Toshihiko', 'Masao', 'Yasuhiro', 'Fumihiko', 'Shuji', 'Koji'],
    fem:     ['Tomoko', 'Yumiko', 'Fumiko', 'Noriko', 'Sachiko', 'Akiko', 'Yukiko',
              'Yoshiko', 'Keiko', 'Hiroko', 'Michiko', 'Mariko', 'Kyoko', 'Kazuko', 'Naoko'],
    neutral: ['Tomo', 'Hikaru', 'Rei', 'Nao', 'Kaoru', 'Akira', 'Saki', 'Yuu'],
    last:    ['Sasaki', 'Yamazaki', 'Matsumoto', 'Ikeda', 'Hashimoto', 'Fujiwara',
              'Nishimura', 'Ishikawa', 'Abe', 'Miyamoto', 'Hasegawa', 'Kondo', 'Honda',
              'Tamura', 'Nakajima', 'Ueda', 'Saito', 'Kawamoto', 'Ogawa', 'Goto'],
  },

  // ── POPULAR CROWD ─────────────────────────────────────────────────────────
  'Popular Crowd': {
    masc:    ['Yusuke', 'Daisuke', 'Takuya', 'Ryosuke', 'Kei', 'Shota', 'Kosuke',
              'Naoki', 'Daiki', 'Sho', 'Taisei', 'Ryo', 'Kotaro', 'Masaki', 'Jun'],
    fem:     ['Ayumi', 'Emi', 'Mika', 'Rie', 'Kaori', 'Asuka', 'Nana', 'Yuri',
              'Miho', 'Saki', 'Riko', 'Haruka', 'Yui', 'Minami', 'Mio'],
    neutral: ['Sora', 'Nao', 'Hikaru', 'Rei', 'Tomo', 'Akira', 'Natsuki', 'Kiri'],
    last:    ['Tanaka', 'Yamamoto', 'Suzuki', 'Nakamura', 'Ito', 'Watanabe', 'Kato',
              'Yoshida', 'Mori', 'Kimura', 'Shimizu', 'Hayashi', 'Inoue', 'Maeda',
              'Fujita', 'Okamoto', 'Ueda', 'Honda', 'Goto', 'Takahashi'],
  },

  // ── ORDINARY KID ──────────────────────────────────────────────────────────
  'Ordinary Kid': {
    masc:    ['Taro', 'Ichiro', 'Hiroshi', 'Kenji', 'Masato', 'Kazuya', 'Satoshi', 'Koichi',
              'Noboru', 'Tsutomu', 'Jun', 'Kenta', 'Naoki', 'Shota', 'Yusuke'],
    fem:     ['Hanako', 'Yuki', 'Akemi', 'Keiko', 'Michiko', 'Noriko', 'Tomoko', 'Sachiko',
              'Haruko', 'Fumiko', 'Yoshiko', 'Kyoko', 'Akiko', 'Naoko', 'Reiko'],
    neutral: ['Nao', 'Tomo', 'Akira', 'Sora', 'Rei', 'Hikaru', 'Kaoru', 'Yuu'],
    last:    ['Tanaka', 'Yamamoto', 'Suzuki', 'Watanabe', 'Ito', 'Nakamura', 'Kobayashi',
              'Kato', 'Yoshida', 'Yamada', 'Sasaki', 'Yamazaki', 'Matsumoto', 'Inoue',
              'Kimura', 'Hayashi', 'Shimizu', 'Yamaguchi', 'Mori', 'Abe'],
  },
};
