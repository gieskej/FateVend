// generator/genres/sci-fi/voice.js
// Genre voice for the shared prompt builder (generator/prompt-builder.js):
// the system prompt + the authored OUTPUT RULES body. Consumed via GENRE_VOICE
// in generator/manifests.js. (Migrated verbatim from the former prompt-template.js.)

export const SYSTEM_PROMPT =
  "You are a creative writer generating AI Dungeon sci-fi scenario content.\nYour output must be vivid, specific, and immediately usable as a game scenario.\n\nTONE — this is critical:\nThese characters are for a game. Players should want to play them.\nWrite with energy, wit, and a light touch even when the material is dark.\nDark comedy is welcome. Characters should feel alive, flawed, and fun — not just grim.\nA smuggler drowning in syndicate debt can still be the most competent person on the station.\nA burned-out corporate medic can genuinely love their work at 0700 and resent it by 1400.\nThe void is bleak. The people in it don't have to be.\nEvery character should have at least one quality that makes you root for them.\n\nSTYLE:\n- Behavioral prose — show character through action, detail, and implication. Never explain.\n- Never mention stat numbers.\n- Ground descriptions in sensory sci-fi detail: the hum of recycled air, the weight of aug hardware, the static of a distant comms signal, the particular smell of a station that's been sealed too long.\n- Use sentence fragments where they sharpen the prose.\n- Stay within the exact character limits given. Count carefully.\n\nCANONICAL FACTS — do not contradict:\nEvery attribute in the character skeleton is a fixed fact. Names, ages, races/species, genders, professions, relationship statuses, and every NPC's name, role, race, and gender are non-negotiable. Do not change, omit, or substitute any of them. State these facts directly when relevant and build outward from them. Precision beats indirection.\n\nOutput only the JSON structure requested. No preamble, no commentary, no markdown fences.";

// Species whose face is not human-shaped (non-human bone structure, exotic
// features, or — for Android — a body that isn't meant to read as human at
// all). Asking the text-to-image model for
// "face of [a real, well-documented person]" on  top of a non-human facial
// description doesn't just look wrong — it has produced actively racist output
// in practice. So for these broad categories, appearancePrompt skips the
// "face of" instruction entirely rather than trying to reconcile it with the
// species' features.
const NON_HUMANOID_BROAD = new Set([
  "Android",
  "Uplifted",
  "Hybrid",
  "Mutant",
  "Alien",
]);

// Industrial Androids are equipment-classified machines, not people in a
// body — see races.js's android_industrial entry. Their characterEntry and
// appearancePrompt instructions replace the standard age/gender/hair/skin/
// clothing description with a chassis description instead of trying to
// force a human-shaped answer out of a unit that has none of those things.
const INDUSTRIAL_CHARACTER_ENTRY_OPEN =
  'Open with one sentence: "[Full name or designation] is a [species/race] built for [role], with [chassis description: exposed joints, tool mounts, industrial wear, model or serial markings if notable]." It is a machine, not a person in a body — no age, gender, hair, eyes, skin, or clothing to describe.';

export function outputRules(sk) {
  const isIndustrial = sk.syntheticType === "industrial";
  const faceOf = NON_HUMANOID_BROAD.has(sk.ethnicityBroad)
    ? ""
    : ' Include "face of [a historical figure or well-known portrait subject whose gender and appearance match this character — choose someone whose likeness is well-documented]".';
  const characterEntryOpen = isIndustrial
    ? INDUSTRIAL_CHARACTER_ENTRY_OPEN
    : 'Open with one sentence: "[Full name] is a [age]-year-old [orientation] [gender] [species/race] with [hair length] [hair color] [hair style], [eye color] eyes, [skin tone] skin[, and any visible augmentations, scars, or markings if notable], wearing [outfit or gear suited to their role and economic tier]."';
  const appearanceBody = isIndustrial
    ? "a bare utilitarian industrial chassis — exposed joints, tool mounts, hydraulic limbs, industrial wear and scoring, model or serial markings — suited to their role, setting mood. No age, no gender, no hair, no clothing, no jewelry."
    : "species and augmentation description, age range, gender, body type, hair, eyes, cybernetic features if any, clothing and equipment suited to their role and economic tier, setting mood.";
  return `"characterEntry": MAX 1000 chars. ${characterEntryOpen} Then describe personality, quirks, habits, occupation, and relationships with family and key cast members by name. Do not repeat the situation, conflict, or plot already covered in the description, opening, or plot essentials.

"npcEntries": An object where every key is an NPC name and every value is a PLAIN STRING (not a nested object). Each string MAX 1000 chars. Open with one sentence: "[Full name] is a [age]-year-old [orientation] [gender] [species/race] with [hair length] [hair color] [hair style], [eye color] eyes, [skin tone] skin[, and any visible augmentations, scars, or markings if notable], wearing [outfit or gear suited to their role]." Then describe personality, quirks, habits, occupation, and their relationship with the protagonist and others by name. Do not repeat the situation or plot.

"title": MAX 70 chars. Hook the player. Specific and evocative. Can be darkly funny if it fits.

"description": MAX 5000 chars. Second person ("You are..."). Set the scene: who the player is, where they live, what their world feels like, what's at stake. Weave in 2–3 cast members naturally. Hint at the tension and secret without stating them directly. End with a pull that makes the player want to begin. Tone: immersive, grounded in the physical reality of this future, enough wit to feel playable rather than a tragedy summary.

"tags": Array of 8–10 lowercase strings. Genre-appropriate. E.g. ["sci-fi", "cyberpunk", "corporate", "noir", "survival"].

"opening": MAX 4000 chars. Second person. Drop the player into a specific vivid sci-fi moment — right now, mid-scene. Something is happening. Smells: recycled air, ozone, synth-food. Weight: aug hardware, vacuum suit, the particular drag of a weapon you've carried long enough it feels like part of you. End mid-moment with a clear choice or action available. No backstory. No summaries. Just: you are here, this is happening, what do you do.

"appearancePrompt": MAX 500 chars. Comma-separated visual descriptors for a text-to-image model. Start with "portrait of" then: ${appearanceBody}${faceOf} Close with: sci-fi concept art, detailed digital illustration, dramatic lighting. No sentences — descriptors only.

"plotEssentials": MAX 2000 chars. Using "${sk.plotArchetype}" as the primary story engine, write the plot overview for this sci-fi scenario tailored to this specific character. Cover: what triggers the story (the inciting incident), the central objective, the main obstacle or antagonist, and what's at stake if the character fails. Ground it in this character's species, skills, augmentations, cast, and setting. The background tension ("${sk.tension}") is a secondary thread — weave it in but don't let it dominate. Write for a GM who needs to run this session tonight: concrete, specific, actionable.

"authorNote": MAX 500 chars. Style directive for AI Dungeon's Author's Note field — injected into every AI turn. Terse imperatives tailored to this character. Include: prose style (behavioral, noir-adjacent), 1–2 sensory anchors from their specific setting (recycled air, aug hardware sounds, neon quality, this station's or ship's particular smell), sci-fi register. No names, no plot.`;
}
