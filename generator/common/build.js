// ── APPEARANCE ────────────────────────────────────────────────────────────
// Layered system. Each layer resolved independently, then passed to Claude
// as a compact description block. Claude writes appearance into prose —
// never as a bullet list.
//
// Stat affinities:
//   constitution → build (high = durable/fit, low = worn/thin)
//   strength     → build reinforcement
//   charisma     → presentation/grooming skew

export const BUILDS = [
  { 
    id: 'lean', 
    label: 'lean, wiry', 
    statAffinity: { constitution: 0.9, dexterity: 1.2 } 
  },
  { 
    id: 'average', 
    label: 'average build', 
    statAffinity: {} 
  },
  { 
    id: 'stocky', 
    label: 'stocky, solid', 
    statAffinity: { strength: 1.2, constitution: 1.1 } 
  },
  { 
    id: 'powerful', 
    label: 'powerfully built', 
    statAffinity: { strength: 1.5, constitution: 1.2 } 
  },
  { 
    id: 'heavyset', 
    label: 'heavyset', 
    statAffinity: { constitution: 1.1, strength: 1.1, dexterity: 0.8 } 
  },
  { 
    id: 'tall_rangy', 
    label: 'tall and rangy', 
    statAffinity: { dexterity: 1.1 } 
  },
  { 
    id: 'toned', 
    label: 'lean, toned but not too bulky', 
    statAffinity: { charisma: 1.2, strength: 1.1 } 
  },
  { 
    id: 'athletic', 
    label: 'athletic, visibly fit', 
    statAffinity: { strength: 1.3, constitution: 1.2 } 
  },
  { 
    id: 'thin_underfed', 
    label: 'thin, underfed-looking', 
    statAffinity: { constitution: 0.7, wisdom: 1.1 } 
  },
  { 
    id: 'short', 
    label: 'short, compact', 
    statAffinity: {} 
  },
  { 
    id: 'worn', 
    label: 'thin, worn-looking', 
    statAffinity: { constitution: 0.7, wisdom: 1.1 } 
  },
];
