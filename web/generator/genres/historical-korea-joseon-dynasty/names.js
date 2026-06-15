// genres/historical-korea-joseon-dynasty/names.js
// Joseon Dynasty Korean names by social class.
// Keys must exactly match RACES[].broad values.

export const NAME_POOLS = {
  'Civil Yangban': {
    masc:    ['Seong-guk', 'Dae-ho', 'Gyeong-su', 'Byeong-jun', 'In-su', 'Hak-gyu', 'Seung-won', 'Mun-hyeon', 'Tae-jun', 'Jeong-bae', 'Won-gyeong', 'Cheol-gyu', 'Yeong-ho', 'Gyu-tae'],
    fem:     ['Hyeong-seon', 'Jeong-suk', 'Eun-hye', 'Myeong-ok', 'Jeong-im', 'Seon-ok', 'Yeong-hye', 'Ok-soon', 'Hye-ran', 'Bong-soon', 'Jeong-hee', 'Mi-ok', 'Gyeong-soon'],
    neutral: ['Bong', 'Jeong', 'In', 'Gyu', 'Won', 'Hak', 'Seong'],
    last:    ['Kim', 'Yi', 'Park', 'Choi', 'Jeong', 'Gang', 'Jo', 'Yun', 'Jang', 'Lim', 'Han', 'Oh', 'Seo', 'Shin', 'Gwon'],
  },
  'Military Yangban': {
    masc:    ['Mu-yeol', 'Gyeong-ung', 'Jin-hyeok', 'Seok-hyeon', 'Dae-sung', 'Hwan-woong', 'Byeong-cheol', 'In-hyeok', 'Sang-guk', 'Cheol-jun', 'Yeong-geun', 'Bong-su'],
    fem:     ['Seon-hee', 'Gyeong-ae', 'In-ok', 'Jeong-soon', 'Yeong-ok', 'Bong-im', 'Hye-gyeong', 'Myeong-soon'],
    neutral: ['Mu', 'Jin', 'Seok', 'Hwan', 'Bong', 'Sang'],
    last:    ['Yi', 'Kim', 'Park', 'Choi', 'Oh', 'Hong', 'Kwon', 'Shin', 'Nam', 'Lim', 'Yun', 'Gang'],
  },
  'Royal Court': {
    masc:    ['Hyeon-jong', 'Gyeong-jun', 'Jeong-mun', 'In-byeong', 'Seong-jo', 'Mun-seong', 'Cheol-hyeon', 'Tae-won', 'Yeong-jo', 'Gyeong-seong'],
    fem:     ['Jeong-soon', 'Hye-gyeong', 'Ok-jeong', 'In-hyeon', 'Gyeong-bin', 'Suk-won', 'Yeong-bin', 'Hye-bin', 'Ok-yeong', 'Seon-hwa'],
    neutral: ['Jeong', 'Hyeon', 'Gyeong', 'In', 'Mun', 'Seong'],
    last:    ['Yi', 'Kim', 'Sim', 'Jo', 'Hong', 'Jang', 'Min', 'Yun', 'Oh', 'Gwon'],
  },
  'Jungin': {
    masc:    ['Seok-gyu', 'Chang-ok', 'In-sun', 'Yeong-pal', 'Byeong-sun', 'Tae-ok', 'Gwi-dong', 'Bok-deuk', 'Du-hwan', 'Nam-sun'],
    fem:     ['Bok-soon', 'In-sun', 'Jeong-ok', 'Bong-nyeo', 'Ok-dan', 'Chun-sim', 'Mal-soon', 'Geum-soon'],
    neutral: ['Bok', 'Pal', 'Gwi', 'Du', 'Nam', 'Chang'],
    last:    ['Kim', 'Yi', 'Park', 'Choi', 'Shin', 'Hong', 'Oh', 'Yun', 'Gang', 'Lim'],
  },
  'Common Folk': {
    masc:    ['Gwi-dong', 'Bok-sun', 'Su-dong', 'Jeong-pal', 'Du-man', 'Man-seok', 'Sam-deuk', 'Il-bok', 'Yong-man', 'Cheol-soon', 'Bong-gyu', 'Dong-su'],
    fem:     ['Bok-nyeo', 'Mal-soon', 'Geum-soon', 'Ok-nyeo', 'Bong-nyeo', 'Chun-nyeo', 'Dan-sim', 'Su-ok', 'In-soon', 'Jeong-nyeo', 'Geum-i'],
    neutral: ['Bok', 'Mal', 'Geum', 'Bong', 'Chun', 'Dan', 'Su', 'Il'],
    last:    ['Kim', 'Yi', 'Park', 'Choi', 'Oh', 'Shin', 'Jeong', 'Lim', 'Han', 'Gang'],
  },
  'Merchant': {
    masc:    ['Geum-dong', 'Chang-sik', 'Byeong-ok', 'Su-bok', 'Yong-sik', 'In-bok', 'Du-cheol', 'Bong-su', 'Gwi-ok', 'Man-bok'],
    fem:     ['Geum-nyeo', 'Ok-soon', 'Bong-soon', 'Su-dan', 'Bok-dan', 'In-dan', 'Chun-hwa', 'Mal-dan'],
    neutral: ['Geum', 'Chang', 'Bong', 'Su', 'Bok', 'In'],
    last:    ['Kim', 'Yi', 'Park', 'Choi', 'Oh', 'Shin', 'Gang', 'Lim', 'Jeong', 'Jang'],
  },
  'Gisaeng': {
    masc:    ['Gyeong-su', 'In-hwan', 'Bong-su', 'Chang-ok', 'Du-hwan'],
    fem:     ['Wol-hyang', 'Chun-hyang', 'Nak-hyang', 'Bong-nyeo', 'Ok-yeo', 'Hong-rang', 'Mae-hwa', 'Dan-hong', 'Nok-su', 'Bae-hwa', 'Seol-hyang', 'Bi-chwi', 'Ok-dan', 'Chun-sim', 'Hwa-rang', 'Bong-hwa'],
    neutral: ['Hyang', 'Rang', 'Nok', 'Dan', 'Wol', 'Ok'],
    last:    ['Kim', 'Yi', 'Park', 'Choi', 'Oh', 'Jang', 'Shin', 'Gang'],
  },
  'Cheonmin': {
    masc:    ['Bok-deuk', 'Sam-shik', 'Il-man', 'Gwi-shik', 'Yong-deuk', 'Du-shik', 'Man-deuk', 'Nam-shik', 'Pal-bok', 'Su-deuk'],
    fem:     ['Bok-deuk', 'Su-bak', 'Geum-bok', 'In-deuk', 'Bong-deuk', 'Ok-bok', 'Chun-deuk', 'Mal-bok'],
    neutral: ['Bok', 'Deuk', 'Sam', 'Il', 'Gwi', 'Yong', 'Nam'],
    last:    ['Kim', 'Yi', 'Park', 'Oh', 'Shin', 'Choi', 'Gang', 'Lim'],
  },
};
