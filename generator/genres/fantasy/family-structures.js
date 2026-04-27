// genres/fantasy/family-structures.js
// Largely mirrors modern structure but with fantasy-appropriate notes.

export const PARENT_STATUSES = [
  { id:'present_close',     label:'present and close' },
  { id:'present_distant',   label:'present but emotionally distant' },
  { id:'present_difficult', label:'present but a source of tension' },
  { id:'estranged',         label:'estranged — no contact' },
  { id:'deceased_recent',   label:'recently deceased' },
  { id:'deceased_long',     label:'died when the character was young' },
  { id:'absent_unknown',    label:'absent — never knew them' },
  { id:'imprisoned',        label:'imprisoned or indentured' },
  { id:'missing',           label:'missing — presumed dead, but unconfirmed' },
  { id:'abroad',            label:'lives far away, little contact' },
];

export const SIBLING_DYNAMICS = [
  { id:'protective_older',   label:'protective older sibling' },
  { id:'rivalry',            label:'long-running rivalry' },
  { id:'estranged',          label:'estranged — fell out years ago' },
  { id:'close_ally',         label:'closest friend and confidant' },
  { id:'troubled',           label:'struggling — conscripted, cursed, or in debt' },
  { id:'golden_child',       label:"the family's golden child" },
  { id:'lost_touch',         label:'drifted apart, rarely in contact' },
  { id:'deceased',           label:'deceased — war, plague, or worse' },
  { id:'younger_dependent',  label:'younger and still depends on the character' },
  { id:'reconnecting',       label:'recently reconnected after years apart' },
];

export const FAMILY_STRUCTURES = [
  { id:'two_parent_intact',     label:'Two parents, still together',               parentCount:2, siblingCount:[0,3], statAffinity:{ wisdom:1.1, charisma:1.1 } },
  { id:'two_parent_divorced',   label:'Parents separated or estranged',            parentCount:2, siblingCount:[0,3], statAffinity:{ wisdom:0.9 } },
  { id:'two_parent_one_deceased', label:'One parent deceased, one surviving',      parentCount:2, siblingCount:[0,2], statAffinity:{ wisdom:1.1, constitution:0.9 } },
  { id:'two_parent_one_absent', label:'One parent absent or unknown',              parentCount:2, siblingCount:[0,2], statAffinity:{ constitution:1.1, charisma:0.9 } },
  { id:'two_parent_both_troubled', label:'Both parents troubled',                  parentCount:2, siblingCount:[0,3], statAffinity:{ constitution:1.2, wisdom:0.8 } },
  { id:'single_mother',         label:'Raised by a single mother',                 parentCount:1, parentGender:'mother', siblingCount:[0,3], statAffinity:{ charisma:1.1, wisdom:1.1 } },
  { id:'single_father',         label:'Raised by a single father',                 parentCount:1, parentGender:'father', siblingCount:[0,2], statAffinity:{ strength:1.1, wisdom:1.1 } },
  { id:'single_parent_struggling', label:'Single parent under severe hardship',    parentCount:1, siblingCount:[1,4], statAffinity:{ constitution:1.2, wisdom:1.1 }, economicHint:-1 },
  { id:'raised_by_grandparents',label:'Raised by grandparents',                    parentCount:0, siblingCount:[0,2], statAffinity:{ wisdom:1.2, charisma:0.9 } },
  { id:'raised_by_older_sibling', label:'Raised by an older sibling',              parentCount:0, siblingCount:[1,2], statAffinity:{ constitution:1.2 } },
  { id:'orphaned_early',        label:'Orphaned before age ten',                   parentCount:0, siblingCount:[0,2], statAffinity:{ constitution:1.3, wisdom:1.2 } },
  { id:'temple_raised',         label:'Raised by a temple or religious order',     parentCount:0, siblingCount:[0,1], statAffinity:{ wisdom:1.3, intelligence:1.1 } },
  { id:'guild_raised',          label:'Raised by a guild or trade house',          parentCount:0, siblingCount:[0,1], statAffinity:{ intelligence:1.2, dexterity:1.1 } },
  { id:'large_family',          label:'Large, chaotic household',                  parentCount:2, siblingCount:[3,6], statAffinity:{ charisma:1.2, constitution:1.1 } },
  { id:'only_child_wealthy',    label:'Only child of wealthy parents',             parentCount:2, siblingCount:[0,0], statAffinity:{ intelligence:1.2, charisma:1.1 }, economicHint:2 },
  { id:'only_child_isolated',   label:'Only child, isolated upbringing',           parentCount:2, siblingCount:[0,0], statAffinity:{ intelligence:1.2, wisdom:1.1, charisma:0.8 } },
  { id:'noble_household',       label:'Noble household with servants and politics', parentCount:2, siblingCount:[0,3], statAffinity:{ charisma:1.3, intelligence:1.2 }, economicHint:2 },
  { id:'war_orphan',            label:'War orphan — raised among survivors',        parentCount:0, siblingCount:[0,2], statAffinity:{ constitution:1.3, strength:1.2 } },
];
