// genres/sci-fi/names.js
// Name pools keyed by species broad label.
// Each entry has masc, fem, neutral, last arrays.
// Names reflect the multicultural, multi-origin nature of a spacefaring future —
// Earthers draw from real-world name traditions; Spacers and other groups
// have developed their own naming conventions over generations.

export const NAME_POOLS = {

  // ── HUMAN (shared across all human variants) ──────────────────────────────
  'Human': {
    masc:    ['Marcus', 'Daven', 'Kofi', 'Soren', 'Riku', 'Emre', 'Luca', 'Tariq', 'Finn', 'Jesper', 'Adio', 'Callan', 'Niels', 'Roshan', 'Ezra', 'Matteo', 'Idris', 'Cai', 'Anton', 'Yusuf'],
    fem:     ['Sera', 'Nadia', 'Keiko', 'Amara', 'Linh', 'Priya', 'Zara', 'Ines', 'Cleo', 'Tamsin', 'Odera', 'Vivek', 'Maren', 'Suki', 'Anwen', 'Farah', 'Delia', 'Yuki', 'Reva', 'Solène'],
    neutral: ['Avery', 'Rue', 'Sable', 'Jin', 'Skye', 'Caden', 'Paz', 'River', 'Sloane', 'Echo'],
    last:    ['Vasquez', 'Okafor', 'Tanaka', 'Reyes', 'Petrov', 'Adeyemi', 'Chen', 'Novak', 'Diallo', 'Larsen', 'Mbeki', 'Ferreira', 'Nakamura', 'Kowalski', 'Otieno', 'Svensson', 'Papadopoulos', 'Yilmaz', 'Osei', 'Ramirez'],
  },

  // ── CYBORG ────────────────────────────────────────────────────────────────
  // Heavy augmentation often correlates with abandoning or renaming the self.
  // Names may be handles, shortened call-signs, or deliberately plain.
  'Cyborg': {
    masc:    ['Brak', 'Venn', 'Holt', 'Dax', 'Sev', 'Cas', 'Ryn', 'Tor', 'Kell', 'Mace', 'Dren', 'Jak', 'Nox', 'Sten', 'Pier', 'Colt', 'Runn', 'Ash', 'Grim', 'Fex'],
    fem:     ['Vex', 'Ryke', 'Zenn', 'Cass', 'Dace', 'Syla', 'Kira', 'Nyx', 'Brix', 'Tayne', 'Lyss', 'Wrenn', 'Qade', 'Fenn', 'Mira', 'Sable', 'Cree', 'Vael', 'Dyre', 'Hex'],
    neutral: ['Seven', 'Null', 'Circuit', 'Relay', 'Patch', 'Loop', 'Codec', 'Splice', 'Wire', 'Flux'],
    last:    ['Vane', 'Strix', 'Coldrun', 'Ironsides', 'Hardwire', 'Nullbright', 'Greyframe', 'Voidmark', 'Steelrun', 'Coldweld', 'Silentport', 'Blackline', 'Hexframe', 'Driftwall', 'Sharpnull', 'Rimjack', 'Corespike', 'Darkport', 'Chainburn', 'Nettrace'],
  },

  // ── ANDROID ───────────────────────────────────────────────────────────────
  // Androids often receive assigned designations, then adopt names as they develop.
  'Android': {
    masc:    ['Aden', 'Caelum', 'Doran', 'Elias', 'Felix', 'Garen', 'Hale', 'Ivan', 'Jasper', 'Kael', 'Loren', 'Mael', 'Nael', 'Orion', 'Pell', 'Quinn', 'Rael', 'Sable', 'Talon', 'Ulric'],
    fem:     ['Ada', 'Blythe', 'Clara', 'Dara', 'Evren', 'Faye', 'Grace', 'Hana', 'Iris', 'June', 'Kael', 'Lyra', 'Mira', 'Nova', 'Opal', 'Pearl', 'Quinn', 'Rae', 'Sera', 'Tara'],
    neutral: ['Aria', 'Clio', 'Diem', 'Eon', 'Fable', 'Glyph', 'Hex', 'Iota', 'Juno', 'Kira'],
    last:    ['Unit-7', 'Designation-Alpha', 'Model-V', 'Series-9', 'Prototype', 'Revision-3', 'Batch-12', 'Instance', 'Construct', 'Synthesis', 'Facsimile', 'Pattern', 'Template', 'Archive', 'Iteration', 'Reflection', 'Echo', 'Trace', 'Imprint', 'Likeness'],
  },

  // ── UPLIFTED ──────────────────────────────────────────────────────────────
  // Uplift programs often named subjects for project naming conventions,
  // but many have since chosen their own names.
  'Uplifted': {
    masc:    ['Kito', 'Baraka', 'Ebo', 'Jomo', 'Kofi', 'Leti', 'Mazi', 'Nuru', 'Ode', 'Paka', 'Ruko', 'Safi', 'Tao', 'Umi', 'Vuka', 'Wapi', 'Xola', 'Yaro', 'Zaki', 'Aza'],
    fem:     ['Amani', 'Bisa', 'Chari', 'Dala', 'Elia', 'Fara', 'Gara', 'Haba', 'Imara', 'Jina', 'Kali', 'Lala', 'Mali', 'Nala', 'Ombi', 'Penda', 'Rasa', 'Sisi', 'Tana', 'Uzuri'],
    neutral: ['Aria', 'Briar', 'Cedar', 'Dusk', 'Ember', 'Fern', 'Gale', 'Hawk', 'Indra', 'Jade'],
    last:    ['Project-Chimera', 'Batch-Uplift-3', 'Cohort-Seven', 'Lineage-Prime', 'Strain-Kappa', 'Generation-Two', 'Programme-End', 'Trial-Nine', 'Vector-Six', 'Source-Null', 'Rootline', 'Stemstock', 'Genetrack', 'Originstrain', 'Basecode', 'Seedstock', 'Primaline', 'Trunkborn', 'Firstbatch', 'Laststrain'],
  },

  // ── CLONE ─────────────────────────────────────────────────────────────────
  // Clones may share a name with their source, or be given facility designations,
  // or have chosen something entirely new.
  'Clone': {
    masc:    ['Davan', 'Erek', 'Foran', 'Gael', 'Haran', 'Iren', 'Jaran', 'Keren', 'Laran', 'Maran', 'Naran', 'Oran', 'Paran', 'Quirin', 'Roran', 'Saran', 'Taran', 'Uran', 'Veran', 'Waran'],
    fem:     ['Dava', 'Ereka', 'Fora', 'Gaela', 'Hara', 'Irena', 'Jara', 'Kera', 'Lara', 'Mara', 'Nara', 'Ora', 'Para', 'Quira', 'Rora', 'Sara', 'Tara', 'Ura', 'Vera', 'Wara'],
    neutral: ['Alpha', 'Beta', 'Gamma', 'Delta', 'Epsilon', 'Zeta', 'Eta', 'Theta', 'Iota', 'Kappa'],
    last:    ['Copy-One', 'Strand-A', 'Print-2', 'Facsimile', 'Duplicate', 'Replica', 'Simulacrum', 'Mirror', 'Ditto', 'Double', 'Likeness', 'Iteration-2', 'Version-3', 'Revision-4', 'Echo-Line', 'Traceborn', 'Sourceborn', 'Matchborn', 'Twinline', 'Castborn'],
  },

  // ── MUTANT ────────────────────────────────────────────────────────────────
  'Mutant': {
    masc:    ['Dex', 'Kren', 'Vorr', 'Slake', 'Bane', 'Crux', 'Dent', 'Fell', 'Gash', 'Hern', 'Ire', 'Jax', 'Keld', 'Lurk', 'Maw', 'Nix', 'Orc', 'Pox', 'Rend', 'Scar'],
    fem:     ['Ash', 'Blight', 'Char', 'Dreg', 'Envy', 'Flux', 'Grit', 'Haze', 'Ire', 'Jade', 'Kith', 'Lurk', 'Mire', 'Numb', 'Oxide', 'Pall', 'Ruin', 'Salt', 'Taint', 'Umber'],
    neutral: ['Glitch', 'Null', 'Shift', 'Warp', 'Blur', 'Drift', 'Static', 'Flare', 'Void', 'Spike'],
    last:    ['Ashfall', 'Blightborn', 'Charmark', 'Driftborn', 'Exposed', 'Fluxborn', 'Greymark', 'Hazemark', 'Ironmark', 'Jademark', 'Keldmark', 'Lurkscar', 'Miremark', 'Nullmark', 'Oxidemark', 'Pallmark', 'Ruinborn', 'Saltmark', 'Taintborn', 'Umbermark'],
  },

  // ── ALIEN ─────────────────────────────────────────────────────────────────
  // Transliterated approximations of alien naming conventions — or adopted human names.
  'Alien': {
    masc:    ['Vraek', 'Shael', 'Dhonn', 'Urath', 'Lhyen', 'Zhovar', 'Thyss', 'Kraen', 'Vhorak', 'Aresh', 'Dryvan', 'Ohren', 'Shakel', 'Vhane', 'Ureth', 'Tyrak', 'Lhoran', 'Kreshna', 'Dhoval', 'Aethren'],
    fem:     ['Vraeki', 'Shaela', 'Dhonna', 'Urathi', 'Lhyeni', 'Zhovara', 'Thyssa', 'Kraeni', 'Vhoraki', 'Areshi', 'Dryvana', 'Ohreni', 'Shakeli', 'Vhanei', 'Urethi', 'Tyraki', 'Lhorani', 'Kreshna', 'Dhovani', 'Aethreni'],
    neutral: ['Vael', 'Zhren', 'Thyss', 'Urak', 'Dhael', 'Kresh', 'Lhyn', 'Oreth', 'Shaev', 'Vraen'],
    last:    ['Vorath-Seven', 'Dhael-Prime', 'Kresh-Null', 'Lhyen-Three', 'Urath-Origin', 'Vraek-Line', 'Shaen-Root', 'Thys-End', 'Aresh-Deep', 'Ohren-Far', 'Zhovak-Born', 'Kraen-Mark', 'Vhorak-Strain', 'Dryvan-Flow', 'Shakel-Course', 'Vhane-Track', 'Ureth-Path', 'Tyrak-Run', 'Lhoran-Reach', 'Dhoval-Way'],
  },

  // ── DEFAULT (fallback) ────────────────────────────────────────────────────
  'default': {
    masc:    ['Marcus', 'Daven', 'Kofi', 'Soren', 'Riku', 'Emre', 'Luca', 'Tariq', 'Finn', 'Jesper', 'Adio', 'Callan', 'Niels', 'Roshan', 'Ezra', 'Matteo', 'Idris', 'Cai', 'Anton', 'Yusuf'],
    fem:     ['Sera', 'Nadia', 'Keiko', 'Amara', 'Linh', 'Priya', 'Zara', 'Ines', 'Cleo', 'Tamsin', 'Odera', 'Vivek', 'Maren', 'Suki', 'Anwen', 'Farah', 'Delia', 'Yuki', 'Reva', 'Solène'],
    neutral: ['Avery', 'Rue', 'Sable', 'Jin', 'Skye', 'Caden', 'Paz', 'River', 'Sloane', 'Echo'],
    last:    ['Vasquez', 'Okafor', 'Tanaka', 'Reyes', 'Petrov', 'Adeyemi', 'Chen', 'Novak', 'Diallo', 'Larsen', 'Mbeki', 'Ferreira', 'Nakamura', 'Kowalski', 'Otieno', 'Svensson', 'Papadopoulos', 'Yilmaz', 'Osei', 'Ramirez'],
  },
};
