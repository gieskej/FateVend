// genres/fantasy/names.js
// Name pools keyed by race (broad).
// Each entry has masc, fem, neutral, last arrays.
// Used by skeleton-builder and cast-builder in the same way as modern NAME_POOLS.

export const NAME_POOLS = {
  'Human': {
    masc:    ['Aldric','Brennan','Caelan','Dorin','Edric','Faolan','Gareth','Hadwin','Idris','Jareth','Kellan','Lucan','Merrin','Nolan','Oswin','Peran','Rowan','Soren','Tavish','Ulric'],
    fem:     ['Aerith','Brynn','Calla','Delia','Elowen','Fiona','Gwyneth','Hilde','Isadora','Jessa','Keela','Lena','Maren','Niamh','Oria','Petra','Rhiannon','Senna','Tara','Una'],
    neutral: ['Ash','Blair','Cael','Dale','Eden','Finch','Grey','Haven','Indra','Jesse'],
    last:    ['Ashford','Blackwood','Calloway','Drake','Edgewater','Fairholm','Grimshaw','Hartwell','Ironsides','Justrom','Kellam','Larkmoor','Morven','Nighthollow','Ostram','Pendrath','Redvale','Stonebridge','Thornfield','Underhill'],
  },
  'Elf': {
    masc:    ['Aelindra','Caladrel','Darafel','Elaion','Faervel','Galadh','Haladrel','Ithildir','Laerion','Maedhros','Neldoreth','Orophin','Penlod','Rúmil','Saradoc','Tauron','Uruvon','Vardamir','Welcin','Xyrandel'],
    fem:     ['Aelindra','Caladwen','Daerith','Elowen','Faelwen','Galadreth','Hîril','Ithiliel','Laeriel','Maewen','Neldeth','Orodreth','Penneth','Rúthiel','Sarael','Tauril','Uruviel','Vardawen','Weleth','Xyraiel'],
    neutral: ['Aelin','Caelen','Daerin','Ellin','Faerin','Gaelin','Haelin','Ilin','Laerin','Maelin'],
    last:    ['Amberleaf','Brightstream','Dawnwhisper','Evenfall','Fernweave','Goldenbough','Highglen','Ironbark','Jewelstone','Kindlelight','Leafsong','Moonshadow','Nightbloom','Oakenheart','Petalfall','Quicksilver','Rivensong','Silverleaf','Twilightway','Underveil'],
  },
  'Half-Elf': {
    masc:    ['Adan','Beren','Calin','Daeron','Erlan','Ferin','Galen','Haren','Iolan','Jared','Kalen','Lorn','Miran','Nael','Orin','Peren','Rolan','Sael','Taren','Valen'],
    fem:     ['Ada','Brenna','Calla','Dara','Elara','Fara','Gwyn','Hara','Iola','Jara','Kira','Lara','Mira','Nara','Ora','Petra','Rina','Sera','Tara','Vara'],
    neutral: ['Ash','Blair','Caen','Dale','Eden','Fern','Grey','Haven','Ira','Jesse'],
    last:    ['Ashwood','Bridgeborn','Crosswater','Dualborn','Edgewalker','Farshore','Greyveil','Halfborn','Ironleaf','Jestern','Kinmeet','Longbridge','Merrowside','Noblend','Outborn','Pathweave','Quickblend','Rimborn','Splitway','Twoborn'],
  },
  'Dwarf': {
    masc:    ['Aldrik','Borin','Dolgrin','Eberk','Fargrim','Gardain','Harbek','Kilvar','Lurbuk','Maulnar','Nalkur','Olbric','Pendrak','Rangrim','Suldrun','Tordek','Ulfgar','Vondal','Wulfgar','Zarbak'],
    fem:     ['Agna','Bodill','Dagnal','Eliff','Fenna','Gunnloda','Helja','Kathra','Lurdann','Mardred','Natalka','Orla','Perdra','Ruqiah','Sannl','Tola','Ulma','Vondred','Wylda','Zarda'],
    neutral: ['Anvil','Bonk','Crunk','Dura','Ember','Flint','Grim','Helm','Iron','Keg'],
    last:    ['Anvilstrike','Boulderback','Copperforge','Deepdelve','Emberhammer','Flinteye','Goldvein','Hardrock','Ironbeard','Jadehelm','Keenaxe','Lodesmith','Mountainheart','Orehammer','Proudstone','Rockbreaker','Stonecleft','Thunderforge','Underkeeper','Vaultborn'],
  },
  'Halfling': {
    masc:    ['Alton','Beau','Cade','Dav','Eldon','Finn','Garret','Halin','Ingot','Jasper','Kelpin','Lyle','Merry','Ned','Osric','Pip','Reed','Sam','Tobias','Ulmo'],
    fem:     ['Andry','Bree','Corinna','Dalla','Elva','Falco','Greta','Hilda','Ida','Josie','Kara','Lily','Mira','Nelly','Ophelia','Pearl','Rosie','Salvia','Tilly','Ursa'],
    neutral: ['Burr','Clay','Dock','Fern','Grove','Hedge','Knoll','Leaf','Moor','Nook'],
    last:    ['Bogworthy','Burrows','Cobblepath','Deephole','Everpip','Fairfoot','Goodbarrel','Hilltop','Ironfoot','Joyhill','Kettlefoot','Larder','Merrifoot','Nohill','Oakhollow','Proudfoot','Quarryhill','Reedpath','Sandyfoot','Thickethole'],
  },
  'Half-Orc': {
    masc:    ['Argh','Brug','Crag','Dorn','Drog','Fenk','Gorg','Hurk','Irok','Jark','Korg','Lurk','Morg','Narg','Orkan','Porg','Rorg','Sorg','Torg','Vorg'],
    fem:     ['Arha','Bruga','Crega','Dorna','Droga','Fenka','Gorga','Hurka','Iroka','Jarka','Korga','Lurka','Morga','Narga','Orka','Porga','Rorga','Sorga','Torga','Vorga'],
    neutral: ['Ash','Bark','Crag','Dusk','Edge','Fang','Grit','Husk','Iron','Keld'],
    last:    ['Ashbone','Bloodtusk','Craghide','Darkmantle','Edgeborn','Fangtooth','Greytusk','Hardbone','Ironhide','Jadeclaw','Keldborn','Longfang','Maulborn','Nighthide','Orcborn','Prowltusk','Ravenfang','Shadowtusk','Tuskhide','Voidborn'],
  },
  'Orc': {
    masc:    ['Azog','Bolg','Crug','Drog','Elog','Farg','Gorg','Hruk','Irok','Jorg','Karg','Lurk','Morg','Narg','Org','Prag','Rorg','Sarg','Torg','Ulk'],
    fem:     ['Azra','Bolga','Cruga','Droga','Eloga','Farga','Gorga','Hruka','Iroka','Jorga','Karga','Lurka','Morga','Narga','Orga','Praga','Rorga','Sarga','Torga','Ulka'],
    neutral: ['Ash','Bark','Claw','Dusk','Edge','Fang','Grit','Husk','Iron','Keld'],
    last:    ['Bonebreaker','Clawtooth','Darkbane','Earthshaker','Fangstrike','Gorehand','Helmcrush','Ironjaw','Jawcleave','Killhand','Limbbreaker','Maulstrike','Neckbreak','Oathbreaker','Painhand','Razorhand','Skullsplit','Toothshatter','Urnbreaker','Warshout'],
  },
  'Tiefling': {
    masc:    ['Akmenos','Amnon','Barakas','Damakos','Ekemon','Iados','Kairon','Leucis','Melech','Morthos','Pelaios','Skamos','Therai','Utugash','Valigan','Wrogar','Xykon','Ygorl','Zaxis','Zel'],
    fem:     ['Akta','Anakis','Bryseis','Criella','Damaia','Ea','Kallista','Lerissa','Makaria','Nemeia','Orianna','Phelaia','Rieta','Siora','Taeri','Ubani','Valna','Werna','Xanathos','Yeva'],
    neutral: ['Ash','Brim','Char','Dusk','Ember','Flame','Glow','Hex','Ink','Jest'],
    last:    ['Ashborne','Brimstone','Charblood','Duskweave','Emberkin','Flameborn','Glowshadow','Hexborn','Inkstain','Jestborn','Kindleblood','Lightsbane','Moonscar','Nightborn','Omenbright','Portentborn','Quickfire','Rimeshadow','Shadowkin','Twilightborn'],
  },
  'Dragonborn': {
    masc:    ['Arjhan','Balasar','Bharash','Donaar','Ghesh','Heskan','Kriv','Medrash','Mehen','Nadarr','Pandjed','Patrin','Rhogar','Shamash','Shedinn','Tarhun','Torinn','Uadjit','Vrondiss','Zedaar'],
    fem:     ['Akra','Biri','Daar','Farideh','Harann','Havilar','Jheri','Kava','Korinn','Mishann','Nala','Perra','Raiann','Sora','Surina','Thava','Uadjit','Verthisathurgiesh','Wreas','Zer'],
    neutral: ['Ash','Blaze','Claw','Drake','Emb','Fang','Gale','Haze','Ignite','Kindle'],
    last:    ['Clethtinthiallor','Daardendrian','Delmirev','Drachedandion','Fenkenkabradon','Kerrhylon','Kimbatuul','Linxakasendalor','Myastan','Nemmonis','Norixius','Ophinshtalajiir','Prexijandilin','Shestendeliath','Turnuroth','Umbyrphrax','Verthisathurgiesh','Yarjerit','Zolthux','Zyxannis'],
  },
  'Gnome': {
    masc:    ['Alston','Alvyn','Boddynock','Brocc','Burgell','Dimble','Eldon','Erky','Fonkin','Frug','Gerbo','Gimble','Glim','Jebeddo','Kellen','Namfoodle','Orryn','Roondar','Seebo','Sindri'],
    fem:     ['Bimpnottin','Breena','Caramip','Carlin','Donella','Duvamil','Ella','Ellyjobell','Ellywick','Lilli','Loopmottin','Lorilla','Mardnab','Nissa','Nyx','Oda','Orla','Roywyn','Shamil','Tana'],
    neutral: ['Bell','Chirp','Clink','Dab','Echo','Fizz','Gizmo','Hinge','Imp','Jest'],
    last:    ['Beren','Daergel','Folkor','Garrick','Nackle','Murnig','Ningel','Raulnor','Scheppen','Timbers','Turen','Waywocket','Abernethy','Boffin','Chubbuck','Dringle','Evermoor','Flimwick','Galvorn','Hornrook'],
  },
  'Aasimar': {
    masc:    ['Ariel','Bartholomew','Celestin','Dawnborn','Elias','Gabriel','Hallowed','Illumin','Jasper','Kael','Luminor','Michael','Nathiel','Orindel','Phael','Raphael','Seraph','Triel','Uriel','Vael'],
    fem:     ['Aelia','Brielle','Celestia','Dawning','Elara','Gabrielle','Hallowed','Illumina','Jasia','Kaelia','Lumia','Mikaela','Nathaela','Orindela','Phaelia','Raphaela','Seraphia','Trisia','Urisia','Vaelia'],
    neutral: ['Dawn','Glow','Halo','Light','Lumen','Nimb','Ora','Pure','Ray','Shine'],
    last:    ['Brightmantle','Celestborn','Dawnwalker','Faithborn','Glorysong','Hallowed','Highblessed','Illuminborn','Justiceborn','Kindlelight','Lightborn','Miracleborn','Nobleborn','Oathblessed','Peaceborn','Quickgrace','Rightborn','Soulblessed','Truthborn','Unveiled'],
  },
  'default': {
    masc:    ['Aldric','Bran','Cael','Dorn','Eld','Fenn','Gar','Holt','Ior','Jael','Kel','Lorn','Mor','Nor','Orin','Pen','Ror','Sael','Tor','Vel'],
    fem:     ['Aela','Bree','Calli','Dara','Ela','Fara','Gwen','Hara','Ira','Jara','Kira','Lara','Mira','Nara','Ora','Petra','Rina','Sera','Tara','Vara'],
    neutral: ['Ash','Blair','Cael','Dale','Eden','Fern','Grey','Haven','Ira','Jesse'],
    last:    ['Ashford','Blackwood','Calloway','Drake','Edgewater','Fairholm','Grimshaw','Hartwell','Ironsides','Justrom','Kellam','Larkmoor','Morven','Nighthollow','Ostram','Pendrath','Redvale','Stonebridge','Thornfield','Underhill'],
  },
};
