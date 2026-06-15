// genres/paleolithic/names.js
// Name pools keyed by tribal broad label.
// Proto-human sounding names — short, consonant-strong, evocative.
// Surnames are totem/clan markers: natural elements and creatures.

export const NAME_POOLS = {

  // ── MAMMOTH HUNTERS ────────────────────────────────────────────────────────
  'Mammoth Hunters': {
    masc:    ['Gor', 'Krak', 'Dun', 'Bron', 'Harg', 'Tal', 'Ruk', 'Vor', 'Grel', 'Skam',
              'Ulf', 'Brak', 'Drav', 'Ekk', 'Fend', 'Gron', 'Holt', 'Irk', 'Jorn', 'Keld'],
    fem:     ['Huna', 'Ava', 'Kela', 'Nara', 'Bora', 'Tura', 'Yeva', 'Grela', 'Drava', 'Mira',
              'Sera', 'Tala', 'Vela', 'Wyna', 'Xara', 'Zela', 'Alna', 'Breva', 'Cana', 'Dela'],
    neutral: ['Ash', 'Tusk', 'Flint', 'Stone', 'Ice', 'Bone', 'Snow', 'Gale', 'Shard', 'Peak',
              'Sleet', 'Frost', 'Bluff', 'Crag', 'Drift'],
    last:    ['Ashbone', 'Coldstone', 'Darkflint', 'Earthback', 'Firebone', 'Greatherd',
              'Hardrock', 'Iceborn', 'Jawbone', 'Killstone', 'Longspear', 'Mammotheye',
              'Northwind', 'Oldblood', 'Plainmark', 'Rockfall', 'Strongback', 'Tundraborn',
              'Whitepelt', 'Wolfchest'],
  },

  // ── RIVER PEOPLE ──────────────────────────────────────────────────────────
  'River People': {
    masc:    ['Edo', 'Kan', 'Lom', 'Pari', 'Rel', 'Sev', 'Tiru', 'Venu', 'Wasi', 'Yaru',
              'Anu', 'Benu', 'Duru', 'Filu', 'Genu', 'Haku', 'Ibu', 'Jiru', 'Koru', 'Lenu'],
    fem:     ['Ela', 'Faru', 'Hiru', 'Lara', 'Nuri', 'Olu', 'Pala', 'Rusa', 'Sira', 'Tula',
              'Ama', 'Bira', 'Cela', 'Diru', 'Emu', 'Fela', 'Gura', 'Hara', 'Iru', 'Jala'],
    neutral: ['Reed', 'River', 'Drift', 'Wade', 'Flow', 'Mist', 'Tide', 'Brook', 'Foam', 'Weir',
              'Silt', 'Eddy', 'Pool', 'Rush', 'Current'],
    last:    ['Riverbed', 'Mudstone', 'Wetstone', 'Longcurrent', 'Deepwade', 'Fishbone',
              'Gentleflow', 'Heron-Eye', 'Ironreed', 'Pondmark', 'Quietwater', 'Rushbed',
              'Sandbar', 'Spawning-Run', 'Trout-Blood', 'Underpool', 'Valleyborn',
              'Watermark', 'Eel-Catch', 'Frogstone'],
  },

  // ── CAVE DWELLERS ─────────────────────────────────────────────────────────
  'Cave Dwellers': {
    masc:    ['Dar', 'Kem', 'Lok', 'Mor', 'Nar', 'Pek', 'Rok', 'Sol', 'Tor', 'Vok',
              'Ack', 'Bor', 'Dek', 'Fok', 'Gak', 'Hek', 'Ick', 'Jok', 'Kak', 'Lek'],
    fem:     ['Ara', 'Bela', 'Dava', 'Ela', 'Fara', 'Huna', 'Isa', 'Kava', 'Lava', 'Mara',
              'Nava', 'Ola', 'Para', 'Rava', 'Sela', 'Tava', 'Ula', 'Vara', 'Wala', 'Xela'],
    neutral: ['Ochre', 'Amber', 'Chalk', 'Ember', 'Pitch', 'Shadow', 'Smoke', 'Spark', 'Dark', 'Hollow',
              'Echo', 'Gallery', 'Deep', 'Glow', 'Soot'],
    last:    ['Ashwall', 'Bonedepth', 'Cavemark', 'Darkstone', 'Deepfire', 'Echowall',
              'Flintborn', 'Galleryborn', 'Handmark', 'Ironochre', 'Jaw-of-Stone', 'Knapper',
              'Longwall', 'Mountainborn', 'Nightstone', 'Ochremark', 'Pigmenthand',
              'Rockborn', 'Stonecutter', 'Underearth'],
  },

  // ── COASTAL FORAGERS ──────────────────────────────────────────────────────
  'Coastal Foragers': {
    masc:    ['Kai', 'Mor', 'Ren', 'Sal', 'Tel', 'Var', 'Wen', 'Xan', 'Yel', 'Zan',
              'Abas', 'Balu', 'Coro', 'Delu', 'Embu', 'Folu', 'Galu', 'Helu', 'Ibalu', 'Joru'],
    fem:     ['Ara', 'Bisa', 'Cora', 'Dela', 'Ela', 'Fina', 'Gara', 'Hina', 'Ira', 'Jina',
              'Kola', 'Lira', 'Mina', 'Nora', 'Osa', 'Pina', 'Rina', 'Sina', 'Tina', 'Uva'],
    neutral: ['Salt', 'Tide', 'Shore', 'Gull', 'Kelp', 'Crag', 'Swell', 'Reef', 'Brine', 'Foam',
              'Shell', 'Drift', 'Wrack', 'Mist', 'Spray'],
    last:    ['Saltbone', 'Tidemark', 'Shoreborn', 'Gull-Eye', 'Kelp-Catcher', 'Deep-Reef',
              'Brine-Walker', 'Foam-Kin', 'Shell-Mound', 'Wave-Reader', 'Rock-Pool',
              'Oar-Grip', 'Ebb-Born', 'Coral-Touch', 'Otter-Blood', 'Clam-Digger',
              'Heron-Watch', 'Surf-Runner', 'Spume-Born', 'Anchor-Stone'],
  },

  // ── FOREST WANDERERS ──────────────────────────────────────────────────────
  'Forest Wanderers': {
    masc:    ['Bren', 'Cael', 'Dael', 'Fen', 'Gael', 'Hael', 'Irel', 'Jael', 'Kael', 'Lael',
              'Mael', 'Nael', 'Oel', 'Pael', 'Rael', 'Sael', 'Tael', 'Uael', 'Vael', 'Wael'],
    fem:     ['Brana', 'Cala', 'Dana', 'Fana', 'Gala', 'Hala', 'Iala', 'Jana', 'Kana', 'Lana',
              'Mana', 'Nala', 'Oana', 'Pana', 'Rana', 'Sana', 'Tana', 'Uana', 'Vana', 'Wana'],
    neutral: ['Briar', 'Fern', 'Moss', 'Root', 'Thorn', 'Bark', 'Leaf', 'Branch', 'Bough', 'Grove',
              'Canopy', 'Shade', 'Hollow', 'Burrow', 'Thicket'],
    last:    ['Ashwood', 'Briarborn', 'Canopymark', 'Darkwood', 'Elm-Heart', 'Fernback',
              'Grovedweller', 'Hollowborn', 'Ivygrip', 'Juniperborn', 'Knot-Root',
              'Leafmark', 'Mosscrown', 'Nightwood', 'Oak-Blood', 'Pinecrest', 'Quiverleaf',
              'Root-Runner', 'Shadewood', 'Thorn-Path'],
  },

  // ── HIGHLAND CLAN ─────────────────────────────────────────────────────────
  'Highland Clan': {
    masc:    ['Ack', 'Brak', 'Cruk', 'Druk', 'Fruk', 'Gruk', 'Hruk', 'Iruk', 'Jruk', 'Kruk',
              'Arl', 'Brl', 'Carl', 'Darl', 'Earl', 'Farl', 'Garl', 'Harl', 'Iarl', 'Jarl'],
    fem:     ['Arka', 'Breka', 'Creka', 'Dreka', 'Freka', 'Greka', 'Hreka', 'Ireka', 'Jreka', 'Kreka',
              'Alta', 'Belta', 'Celta', 'Delta', 'Elta', 'Felta', 'Gelta', 'Helta', 'Ielta', 'Jelta'],
    neutral: ['Peak', 'Ridge', 'Pass', 'Bluff', 'Scarp', 'Crag', 'Fell', 'Tor', 'Glen', 'Cairn',
              'Wind', 'Moor', 'Heath', 'Scree', 'Summit'],
    last:    ['Ascent', 'Blizzard-Born', 'Coldpass', 'Direwolf-Scar', 'Eagle-Eye',
              'Frost-Walker', 'Goat-Blood', 'High-Ground', 'Ice-Heart', 'Jagged-Peak',
              'Kestrel-Mark', 'Ledge-Born', 'Mist-Walker', 'North-Wind', 'Overhang',
              'Peak-Dweller', 'Quartzhand', 'Ridgeback', 'Stone-Climber', 'Tundra-Edge'],
  },

  // ── GRASSLAND NOMADS ──────────────────────────────────────────────────────
  'Grassland Nomads': {
    masc:    ['Aro', 'Bero', 'Cero', 'Dero', 'Ero', 'Fero', 'Gero', 'Hero', 'Iero', 'Jero',
              'Ako', 'Beko', 'Ceko', 'Deko', 'Eko', 'Feko', 'Geko', 'Heko', 'Ieko', 'Jeko'],
    fem:     ['Aera', 'Bera', 'Cera', 'Dera', 'Era', 'Fera', 'Gera', 'Hera', 'Iera', 'Jera',
              'Asha', 'Besha', 'Cesha', 'Desha', 'Esha', 'Fesha', 'Gesha', 'Hesha', 'Iesha', 'Jesha'],
    neutral: ['Steppe', 'Plain', 'Grass', 'Wind', 'Dust', 'Horizon', 'Herd', 'Burn', 'Ember', 'Trail',
              'Stampede', 'Drought', 'Rain', 'Lightning', 'Field'],
    last:    ['Ashfield', 'Bison-Blood', 'Charred-Ground', 'Dustborn', 'Ember-Path',
              'Far-Horizon', 'Grass-Runner', 'Herd-Mark', 'Iron-Stamper', 'Journey-Long',
              'Kill-Plain', 'Longtrail', 'Meadow-Born', 'Nomad-Heart', 'Open-Sky',
              'Plain-Walker', 'Quake-Earth', 'Runningfire', 'Steppe-Born', 'Thunderstep'],
  },

  // ── DESERT SURVIVORS ──────────────────────────────────────────────────────
  'Desert Survivors': {
    masc:    ['Aden', 'Badin', 'Cadin', 'Dadin', 'Edin', 'Fadin', 'Gadin', 'Hadin', 'Iadin', 'Jadin',
              'Aker', 'Baker', 'Caker', 'Daker', 'Eaker', 'Faker', 'Gaker', 'Haker', 'Iaker', 'Jaker'],
    fem:     ['Adna', 'Badna', 'Cadna', 'Dadna', 'Edna', 'Fadna', 'Gadna', 'Hadna', 'Iadna', 'Jadna',
              'Afra', 'Bafra', 'Cafra', 'Dafra', 'Efra', 'Fafra', 'Gafra', 'Hafra', 'Iafra', 'Jafra'],
    neutral: ['Grit', 'Sand', 'Dune', 'Shard', 'Bone', 'Dry', 'Crack', 'Dust', 'Parch', 'Mirage',
              'Oasis', 'Flint', 'Hollow', 'Dark', 'Stone'],
    last:    ['Arid-Born', 'Bone-Dry', 'Cracked-Earth', 'Dustwalker', 'Edge-of-Shade',
              'Flintmark', 'Gritborn', 'Heatwalker', 'Iron-Sun', 'Jawbone',
              'Kill-Dry', 'Leather-Skin', 'Midnight-Walk', 'Nighthunter', 'Ochre-Sand',
              'Parched-Land', 'Quick-Water', 'Rock-Seeker', 'Sand-Runner', 'Thirstborn'],
  },
};
