/**
 * Fixed canonical vocabulary of "how do you feel about your role" sentiments,
 * shared across every genre's professions.js. Each entry:
 *   id    — the exact string every genre's `sentiments` arrays must use
 *   label — display label for the slot-machine reel
 *   emoji — a single standard Unicode emoji character (Smileys & Emotion
 *           category, unicode.org/emoji/charts/full-emoji-list.html), rendered
 *           directly as text by the browser's native emoji font — no icon
 *           file, no generation cost, no missing-icon failure mode possible
 *           for a real codepoint.
 *
 * This list is intentionally fixed and curated, not open-ended. Do not add a
 * new one-off sentiment word for a new profession — pick the closest existing
 * id from this list instead. The whole point is consolidation: many
 * near-synonyms (suspicious/wary/skeptical, tenacious/resolute/unyielding)
 * deliberately collapse onto the same id rather than each getting bespoke art.
 * If truly nothing here fits, add a new entry here first (with a real
 * standard emoji) rather than inventing a word in a genre file that nothing
 * else defines.
 */
export const SENTIMENTS = [
  { id: "proud", label: "Proud", emoji: "😤" },
  { id: "ambitious", label: "Ambitious", emoji: "🤩" },
  { id: "confident", label: "Confident", emoji: "😎" },
  { id: "shrewd", label: "Shrewd", emoji: "😏" },
  { id: "duplicitous", label: "Duplicitous", emoji: "🤥" },
  { id: "discreet", label: "Discreet", emoji: "🤫" },
  { id: "suspicious", label: "Suspicious", emoji: "🤨" },
  { id: "watchful", label: "Watchful", emoji: "🧐" },
  { id: "commanding", label: "Commanding", emoji: "😑" },
  { id: "principled", label: "Principled", emoji: "😐" },
  { id: "thoughtful", label: "Thoughtful", emoji: "🤔" },
  { id: "meticulous", label: "Meticulous", emoji: "🤓" },
  { id: "bored", label: "Bored", emoji: "🥱" },
  { id: "content", label: "Content", emoji: "😌" },
  { id: "warm", label: "Warm", emoji: "🥰" },
  { id: "welcoming", label: "Welcoming", emoji: "😊" },
  { id: "amused", label: "Amused", emoji: "😂" },
  { id: "playful", label: "Playful", emoji: "😉" },
  { id: "yearning", label: "Yearning", emoji: "🥺" },
  { id: "lonely", label: "Lonely", emoji: "😔" },
  { id: "disappointed", label: "Disappointed", emoji: "😞" },
  { id: "contemptuous", label: "Contemptuous", emoji: "🙄" },
  { id: "angry", label: "Angry", emoji: "😠" },
  { id: "furious", label: "Furious", emoji: "🤬" },
  { id: "fearful", label: "Fearful", emoji: "😨" },
  { id: "anxious", label: "Anxious", emoji: "😰" },
  { id: "grieving", label: "Grieving", emoji: "😢" },
  { id: "devastated", label: "Devastated", emoji: "😭" },
  { id: "exhausted", label: "Exhausted", emoji: "😩" },
  { id: "overwhelmed", label: "Overwhelmed", emoji: "😖" },
  { id: "guilty", label: "Guilty", emoji: "😳" },
  { id: "confused", label: "Confused", emoji: "😕" },
  { id: "astonished", label: "Astonished", emoji: "😲" },
  { id: "devout", label: "Devout", emoji: "😇" },
];
