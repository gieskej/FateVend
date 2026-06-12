// genres/sci-fi/names.js
// Name pools keyed by species broad label.
// Each entry has masc, fem, neutral, last arrays.
// Names reflect the multicultural, multi-origin nature of a spacefaring future —
// Earthers draw from real-world name traditions; Spacers and other groups
// have developed their own naming conventions over generations.

export const NAME_POOLS = {

  // ── HUMAN (shared across all human variants) ──────────────────────────────
  'Human': {
    masc:    ['Marcus', 'Daven', 'Kofi', 'Soren', 'Riku', 'Emre', 'Luca', 'Tariq', 'Finn', 'Jesper',
              'Adio', 'Callan', 'Niels', 'Roshan', 'Ezra', 'Matteo', 'Idris', 'Cai', 'Anton', 'Yusuf',
              'Jae', 'Kwame', 'Leandro', 'Mikael', 'Nassim', 'Piotr', 'Rafiq', 'Takeshi', 'Vikram', 'Declan',
              'Bastian', 'Femi', 'Hiro', 'Stellan', 'Oleander', 'Zephyr', 'Ugo', 'Tobias', 'Nneka', 'Sasha'],
    fem:     ['Sera', 'Nadia', 'Keiko', 'Amara', 'Linh', 'Priya', 'Zara', 'Ines', 'Cleo', 'Tamsin',
              'Odera', 'Maren', 'Suki', 'Anwen', 'Farah', 'Delia', 'Yuki', 'Reva', 'Solène', 'Aiko',
              'Bintou', 'Calista', 'Esi', 'Greta', 'Imogen', 'Nizhoni', 'Pernille', 'Salome', 'Tova', 'Wren',
              'Adaeze', 'Chisom', 'Fenella', 'Halima', 'Isadora', 'Jeneba', 'Kiona', 'Luminita', 'Odessa', 'Paloma'],
    neutral: ['Avery', 'Rue', 'Sable', 'Jin', 'Skye', 'Caden', 'Paz', 'River', 'Sloane', 'Echo',
              'Bex', 'Emery', 'Grey', 'Jules', 'Lux', 'Rowan', 'Sage', 'Teal', 'Vale', 'Wren'],
    last:    ['Vasquez', 'Okafor', 'Tanaka', 'Reyes', 'Petrov', 'Adeyemi', 'Chen', 'Novak', 'Diallo', 'Larsen',
              'Mbeki', 'Ferreira', 'Nakamura', 'Kowalski', 'Otieno', 'Svensson', 'Papadopoulos', 'Yilmaz', 'Osei', 'Ramirez',
              'Abara', 'Bergström', 'Costa', 'Dubois', 'Fonseca', 'Guerrero', 'Johansson', 'Mensah', 'Oliveira', 'Park',
              'Santos', 'Torres', 'Nwosu', 'Hashimoto', 'Leclerc', 'Guerrero', 'Kato', 'Andrade', 'Molina', 'Oduya'],
  },

  // ── CYBORG ────────────────────────────────────────────────────────────────
  // Heavy augmentation often correlates with abandoning or renaming the self.
  // Names may be handles, shortened call-signs, or deliberately plain.
  'Cyborg': {
    masc:    ['Brak', 'Venn', 'Holt', 'Dax', 'Sev', 'Cas', 'Ryn', 'Tor', 'Kell', 'Mace',
              'Dren', 'Jak', 'Nox', 'Sten', 'Pier', 'Colt', 'Runn', 'Ash', 'Grim', 'Fex',
              'Byte', 'Chip', 'Grid', 'Hash', 'Jolt', 'Knell', 'Latch', 'Mesh', 'Skiv', 'Tack',
              'Wick', 'Yoke', 'Brace', 'Clamp', 'Drill', 'Forge', 'Hinge', 'Lev', 'Rivet', 'Shear'],
    fem:     ['Vex', 'Ryke', 'Zenn', 'Cass', 'Dace', 'Syla', 'Kira', 'Nyx', 'Brix', 'Tayne',
              'Lyss', 'Wrenn', 'Qade', 'Fenn', 'Mira', 'Sable', 'Cree', 'Vael', 'Dyre', 'Hex',
              'Arc', 'Blink', 'Clip', 'Daze', 'Edge', 'Fray', 'Grit', 'Hiss', 'Jink', 'Kern',
              'Lace', 'Mica', 'Node', 'Prism', 'Quill', 'Shiv', 'Tine', 'Volt', 'Weld', 'Zinc'],
    neutral: ['Seven', 'Null', 'Circuit', 'Relay', 'Patch', 'Loop', 'Codec', 'Splice', 'Wire', 'Flux',
              'Cache', 'Drive', 'Frame', 'Ghost', 'Link', 'Module', 'Node', 'Port', 'Stack', 'Trace'],
    last:    ['Vane', 'Strix', 'Coldrun', 'Ironsides', 'Hardwire', 'Nullbright', 'Greyframe', 'Voidmark', 'Steelrun', 'Coldweld',
              'Silentport', 'Blackline', 'Hexframe', 'Driftwall', 'Sharpnull', 'Rimjack', 'Corespike', 'Darkport', 'Chainburn', 'Nettrace',
              'Blindport', 'Crashweld', 'Deadlock', 'Edgerun', 'Fallframe', 'Gapmark', 'Heatcore', 'Ironlock', 'Joltmark', 'Killswitch',
              'Lockframe', 'Meshburn', 'Nullport', 'Overclock', 'Pinmark', 'Rawjack', 'Shuntline', 'Toggleburn', 'Undervane', 'Voltmark'],
  },

  // ── ANDROID ───────────────────────────────────────────────────────────────
  // Androids often receive assigned designations, then adopt names as they develop.
  'Android': {
    masc:    ['Aden', 'Caelum', 'Doran', 'Elias', 'Felix', 'Garen', 'Hale', 'Ivan', 'Jasper', 'Kael',
              'Loren', 'Mael', 'Nael', 'Orion', 'Pell', 'Quinn', 'Rael', 'Sable', 'Talon', 'Ulric',
              'Ambrose', 'Benedict', 'Caspian', 'Dorian', 'Edmund', 'Florian', 'Gideon', 'Hadrian', 'Ignatius', 'Julian',
              'Leander', 'Marcellus', 'Nicander', 'Oberon', 'Ptolemy', 'Remus', 'Silvanus', 'Theoden', 'Ursyn', 'Valerian'],
    fem:     ['Ada', 'Blythe', 'Clara', 'Dara', 'Evren', 'Faye', 'Grace', 'Hana', 'Iris', 'June',
              'Kael', 'Lyra', 'Mira', 'Nova', 'Opal', 'Pearl', 'Quinn', 'Rae', 'Sera', 'Tara',
              'Alcyone', 'Beatrix', 'Celeste', 'Delia', 'Eleanor', 'Freya', 'Helena', 'Imogen', 'Katerina', 'Lysandra',
              'Meridian', 'Niobe', 'Ophelia', 'Proserpine', 'Rowena', 'Selene', 'Thessaly', 'Undine', 'Vesper', 'Xanthe'],
    neutral: ['Aria', 'Clio', 'Diem', 'Eon', 'Fable', 'Glyph', 'Hex', 'Iota', 'Juno', 'Kira',
              'Lambda', 'Muse', 'Nexus', 'Oracle', 'Prime', 'Query', 'Realm', 'Sine', 'Theta', 'Unity'],
    last:    ['Unit-7', 'Designation-Alpha', 'Model-V', 'Series-9', 'Prototype', 'Revision-3', 'Batch-12', 'Instance', 'Construct', 'Synthesis',
              'Facsimile', 'Pattern', 'Template', 'Archive', 'Iteration', 'Reflection', 'Echo', 'Trace', 'Imprint', 'Likeness',
              'Blueprint', 'Cipher', 'Derivation', 'Emulation', 'Formulation', 'Heuristic', 'Index', 'Junction', 'Kernel', 'Logic',
              'Matrix', 'Notation', 'Output', 'Process', 'Register', 'Schema', 'Token', 'Variable', 'Witness', 'Xenoform'],
  },

  // ── UPLIFTED ──────────────────────────────────────────────────────────────
  // Uplift programs often named subjects for project naming conventions,
  // but many have since chosen their own names.
  'Uplifted': {
    masc:    ['Kito', 'Baraka', 'Ebo', 'Jomo', 'Kofi', 'Leti', 'Mazi', 'Nuru', 'Ode', 'Paka',
              'Ruko', 'Safi', 'Tao', 'Umi', 'Vuka', 'Wapi', 'Xola', 'Yaro', 'Zaki', 'Aza',
              'Bora', 'Chidi', 'Daka', 'Fela', 'Gamba', 'Haki', 'Jabari', 'Kaba', 'Lombe', 'Njoku',
              'Obinna', 'Panko', 'Rasul', 'Simba', 'Tendai', 'Uche', 'Vuyo', 'Wetu', 'Yangu', 'Zuberi'],
    fem:     ['Amani', 'Bisa', 'Chari', 'Dala', 'Elia', 'Fara', 'Gara', 'Haba', 'Imara', 'Jina',
              'Kali', 'Lala', 'Mali', 'Nala', 'Ombi', 'Penda', 'Rasa', 'Sisi', 'Tana', 'Uzuri',
              'Adaeze', 'Bintu', 'Chidera', 'Dalila', 'Fatou', 'Halima', 'Isoke', 'Jeneba', 'Kainda', 'Lumusi',
              'Makena', 'Nkechi', 'Obioma', 'Palesa', 'Remi', 'Salama', 'Taiwo', 'Uchenna', 'Valeria', 'Wanjiru'],
    neutral: ['Aria', 'Briar', 'Cedar', 'Dusk', 'Ember', 'Fern', 'Gale', 'Hawk', 'Indra', 'Jade',
              'Kelp', 'Lark', 'Moss', 'Quill', 'Storm', 'Thorn', 'Umber', 'Vine', 'Wren', 'Yew'],
    last:    ['Project-Chimera', 'Batch-Uplift-3', 'Cohort-Seven', 'Lineage-Prime', 'Strain-Kappa', 'Generation-Two', 'Programme-End', 'Trial-Nine', 'Vector-Six', 'Source-Null',
              'Rootline', 'Stemstock', 'Genetrack', 'Originstrain', 'Basecode', 'Seedstock', 'Primaline', 'Trunkborn', 'Firstbatch', 'Laststrain',
              'Wildtype', 'Deepstrain', 'Foundingbatch', 'Nativeline', 'Primalseed', 'Ancestralcode', 'Heritageline', 'Purestock', 'Wildstock', 'Sourcebatch',
              'Archiveline', 'Corestock', 'Derivedstrain', 'Earlyprint', 'Freeborn', 'Groundline', 'Holdstock', 'Innerline', 'Jointstrain', 'Keybatch'],
  },

  // ── CLONE ─────────────────────────────────────────────────────────────────
  // Clones may share a name with their source, or be given facility designations,
  // or have chosen something entirely new.
  'Clone': {
    masc:    ['Davan', 'Erek', 'Foran', 'Gael', 'Haran', 'Iren', 'Jaran', 'Keren', 'Laran', 'Maran',
              'Naran', 'Oran', 'Paran', 'Quirin', 'Roran', 'Saran', 'Taran', 'Uran', 'Veran', 'Waran',
              'Avan', 'Biran', 'Ceran', 'Dran', 'Evren', 'Fyran', 'Geran', 'Hyran', 'Ieran', 'Jyran',
              'Karan', 'Lyran', 'Myran', 'Nyran', 'Oyran', 'Pyran', 'Ryran', 'Syran', 'Tyran', 'Zyran'],
    fem:     ['Dava', 'Ereka', 'Fora', 'Gaela', 'Hara', 'Irena', 'Jara', 'Kera', 'Lara', 'Mara',
              'Nara', 'Ora', 'Para', 'Quira', 'Rora', 'Sara', 'Tara', 'Ura', 'Vera', 'Wara',
              'Ava', 'Bira', 'Cera', 'Dra', 'Evra', 'Fyra', 'Gera', 'Hyra', 'Iera', 'Jyra',
              'Kyra', 'Lyra', 'Myra', 'Nyra', 'Oyra', 'Pyra', 'Ryra', 'Syra', 'Tyra', 'Zyra'],
    neutral: ['Alpha', 'Beta', 'Gamma', 'Delta', 'Epsilon', 'Zeta', 'Eta', 'Theta', 'Iota', 'Kappa',
              'Lambda', 'Mu', 'Nu', 'Xi', 'Omicron', 'Pi', 'Rho', 'Sigma', 'Tau', 'Upsilon'],
    last:    ['Copy-One', 'Strand-A', 'Print-2', 'Facsimile', 'Duplicate', 'Replica', 'Simulacrum', 'Mirror', 'Ditto', 'Double',
              'Likeness', 'Iteration-2', 'Version-3', 'Revision-4', 'Echo-Line', 'Traceborn', 'Sourceborn', 'Matchborn', 'Twinline', 'Castborn',
              'Copy-Two', 'Strand-B', 'Print-3', 'Sequence-5', 'Genotype', 'Phenotype', 'Baseform', 'Primal', 'Firstprint', 'Castform',
              'Exactline', 'Flawcopy', 'Geneprint', 'Holdform', 'Identical', 'Jointborn', 'Keyform', 'Loopborn', 'Matchform', 'Nativeprint'],
  },

  // ── MUTANT ────────────────────────────────────────────────────────────────
  'Mutant': {
    masc:    ['Dex', 'Kren', 'Vorr', 'Slake', 'Bane', 'Crux', 'Dent', 'Fell', 'Gash', 'Hern',
              'Ire', 'Jax', 'Keld', 'Lurk', 'Maw', 'Nix', 'Orc', 'Pox', 'Rend', 'Scar',
              'Bile', 'Crag', 'Fang', 'Gore', 'Hack', 'Jag', 'Knell', 'Lash', 'Murk', 'Notch',
              'Quarl', 'Reek', 'Shiv', 'Thorn', 'Ulcer', 'Vile', 'Welt', 'Yowl', 'Zeal', 'Bray'],
    fem:     ['Ash', 'Blight', 'Char', 'Dreg', 'Envy', 'Flux', 'Grit', 'Haze', 'Ire', 'Jade',
              'Kith', 'Lurk', 'Mire', 'Numb', 'Oxide', 'Pall', 'Ruin', 'Salt', 'Taint', 'Umber',
              'Blaze', 'Crimp', 'Dross', 'Ember', 'Fume', 'Gaunt', 'Husk', 'Ink', 'Jasp', 'Kink',
              'Leach', 'Malice', 'Notch', 'Ocher', 'Plaque', 'Quell', 'Rust', 'Smear', 'Tinder', 'Vex'],
    neutral: ['Glitch', 'Null', 'Shift', 'Warp', 'Blur', 'Drift', 'Static', 'Flare', 'Void', 'Spike',
              'Burn', 'Crack', 'Dread', 'Edge', 'Fracture', 'Grind', 'Howl', 'Itch', 'Jolt', 'Knell'],
    last:    ['Ashfall', 'Blightborn', 'Charmark', 'Driftborn', 'Exposed', 'Fluxborn', 'Greymark', 'Hazemark', 'Ironmark', 'Jademark',
              'Keldmark', 'Lurkscar', 'Miremark', 'Nullmark', 'Oxidemark', 'Pallmark', 'Ruinborn', 'Saltmark', 'Taintborn', 'Umbermark',
              'Bitescar', 'Crackborn', 'Dredgemark', 'Fallborn', 'Grimborn', 'Hookmark', 'Inkborn', 'Jawmark', 'Knellborn', 'Lashmark',
              'Muckborn', 'Notchborn', 'Oozeborn', 'Pestmark', 'Quarmark', 'Reekborn', 'Snaremark', 'Thornborn', 'Ulcermark', 'Warpborn'],
  },

  // ── ALIEN ─────────────────────────────────────────────────────────────────
  // Transliterated approximations of alien naming conventions — or adopted human names.
  'Alien': {
    masc:    ['Vraek', 'Shael', 'Dhonn', 'Urath', 'Lhyen', 'Zhovar', 'Thyss', 'Kraen', 'Vhorak', 'Aresh',
              'Dryvan', 'Ohren', 'Shakel', 'Vhane', 'Ureth', 'Tyrak', 'Lhoran', 'Kreshna', 'Dhoval', 'Aethren',
              'Zhael', 'Kraoth', 'Vhelan', 'Ashan', 'Dhuren', 'Lhorek', 'Thyrak', 'Ohvael', 'Kraeshna', 'Vhoran',
              'Sharek', 'Dhuvel', 'Aethral', 'Lhyvek', 'Uraesh', 'Zhovrek', 'Thyvel', 'Kraevel', 'Vhoryn', 'Dhaelun'],
    fem:     ['Vraeki', 'Shaela', 'Dhonna', 'Urathi', 'Lhyeni', 'Zhovara', 'Thyssa', 'Kraeni', 'Vhoraki', 'Areshi',
              'Dryvana', 'Ohreni', 'Shakeli', 'Vhanei', 'Urethi', 'Tyraki', 'Lhorani', 'Kreshna', 'Dhovani', 'Aethreni',
              'Zhaeli', 'Kraothi', 'Vhelani', 'Ashani', 'Dhureni', 'Lhoreki', 'Thyraki', 'Ohvaeli', 'Kraeshni', 'Vhorani',
              'Shareki', 'Dhuveli', 'Aethrali', 'Lhyveki', 'Uraeshi', 'Zhovreki', 'Thyveli', 'Kraeveli', 'Vhoryni', 'Dhaeluni'],
    neutral: ['Vael', 'Zhren', 'Thyss', 'Urak', 'Dhael', 'Kresh', 'Lhyn', 'Oreth', 'Shaev', 'Vraen',
              'Aethar', 'Dhorak', 'Lhael', 'Thyv', 'Vhesh', 'Kraev', 'Shren', 'Urvael', 'Dhoran', 'Lhyss'],
    last:    ['Vorath-Seven', 'Dhael-Prime', 'Kresh-Null', 'Lhyen-Three', 'Urath-Origin', 'Vraek-Line', 'Shaen-Root', 'Thys-End', 'Aresh-Deep', 'Ohren-Far',
              'Zhovak-Born', 'Kraen-Mark', 'Vhorak-Strain', 'Dryvan-Flow', 'Shakel-Course', 'Vhane-Track', 'Ureth-Path', 'Tyrak-Run', 'Lhoran-Reach', 'Dhoval-Way',
              'Zhael-Wake', 'Kraoth-Vein', 'Vhelan-Drift', 'Ashan-Root', 'Dhuren-Pale', 'Lhorek-Deep', 'Thyrak-Scar', 'Ohvael-Run', 'Vhoran-Edge', 'Sharek-Dark',
              'Dhuvel-Trace', 'Aethral-Born', 'Lhyvek-Mark', 'Uraesh-Fall', 'Zhovrek-Line', 'Thyvel-Pass', 'Kraevel-Gate', 'Vhoryn-Shore', 'Dhaelun-Null', 'Kraeshna-Far'],
  },

  // ── DEFAULT (fallback) ────────────────────────────────────────────────────
  'default': {
    masc:    ['Marcus', 'Daven', 'Kofi', 'Soren', 'Riku', 'Emre', 'Luca', 'Tariq', 'Finn', 'Jesper',
              'Adio', 'Callan', 'Niels', 'Roshan', 'Ezra', 'Matteo', 'Idris', 'Cai', 'Anton', 'Yusuf',
              'Jae', 'Kwame', 'Leandro', 'Mikael', 'Nassim', 'Piotr', 'Rafiq', 'Takeshi', 'Vikram', 'Declan',
              'Bastian', 'Femi', 'Hiro', 'Stellan', 'Oleander', 'Zephyr', 'Ugo', 'Tobias', 'Nneka', 'Sasha'],
    fem:     ['Sera', 'Nadia', 'Keiko', 'Amara', 'Linh', 'Priya', 'Zara', 'Ines', 'Cleo', 'Tamsin',
              'Odera', 'Maren', 'Suki', 'Anwen', 'Farah', 'Delia', 'Yuki', 'Reva', 'Solène', 'Aiko',
              'Bintou', 'Calista', 'Esi', 'Greta', 'Imogen', 'Nizhoni', 'Pernille', 'Salome', 'Tova', 'Wren',
              'Adaeze', 'Chisom', 'Fenella', 'Halima', 'Isadora', 'Jeneba', 'Kiona', 'Luminita', 'Odessa', 'Paloma'],
    neutral: ['Avery', 'Rue', 'Sable', 'Jin', 'Skye', 'Caden', 'Paz', 'River', 'Sloane', 'Echo',
              'Bex', 'Emery', 'Grey', 'Jules', 'Lux', 'Rowan', 'Sage', 'Teal', 'Vale', 'Wren'],
    last:    ['Vasquez', 'Okafor', 'Tanaka', 'Reyes', 'Petrov', 'Adeyemi', 'Chen', 'Novak', 'Diallo', 'Larsen',
              'Mbeki', 'Ferreira', 'Nakamura', 'Kowalski', 'Otieno', 'Svensson', 'Papadopoulos', 'Yilmaz', 'Osei', 'Ramirez',
              'Abara', 'Bergström', 'Costa', 'Dubois', 'Fonseca', 'Guerrero', 'Johansson', 'Mensah', 'Oliveira', 'Park',
              'Santos', 'Torres', 'Nwosu', 'Hashimoto', 'Leclerc', 'Guerrero', 'Kato', 'Andrade', 'Molina', 'Oduya'],
  },
};
