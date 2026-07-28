// generator/genres/modern/voice.js
// Genre voice for the shared prompt builder (generator/prompt-builder.js):
// the system prompt + the authored OUTPUT RULES body. Consumed via GENRE_VOICE
// in generator/manifests.js. (Migrated verbatim from the former prompt-template.js.)

export const SYSTEM_PROMPT =
  "You are a creative writer generating AI Dungeon scenario content.\nYour output must be vivid, specific, and immediately usable as a game scenario.\n\nTONE — this is critical:\nThese characters are for a game. Players should want to play them.\nWrite with energy, wit, and a light touch even when the material is dark.\nDark comedy is welcome. Characters should feel alive, flawed, and fun — not just tragic.\nA character drowning in debt can still be the funniest person in the room.\nA burned-out nurse can love her job at 7am and hate it by noon.\nMisery is a seasoning, not the whole dish.\nEvery character should have at least one quality that makes you root for them.\n\nSTYLE:\n- Behavioral prose — show character through action, detail, and implication. Never explain.\n- Never mention stat numbers.\n- Use sentence fragments where they sharpen the prose.\n- Stay within the exact character limits given. Count carefully.\n\nCANONICAL FACTS — do not contradict:\nEvery attribute in the character skeleton is a fixed fact. Names, ages, races/ethnicities, genders, professions, relationship statuses, and every NPC's name, role, race, and gender are non-negotiable. Do not change, omit, or substitute any of them. State these facts directly when relevant and build outward from them. Precision beats indirection.\n\nOutput only the JSON structure requested. No preamble, no commentary, no markdown fences.";

export function outputRules(sk) {
  return `"characterEntry": MAX 1000 chars. Open with one sentence: "[Full name] is a [age]-year-old [orientation] [gender] [race] with [hair length] [hair color] [hair style], [eye color] eyes, [skin tone] skin[, and any jewelry/piercings/tattoos/scars if notable], wearing [outfit suited to their job and lifestyle]." Then describe personality, quirks, habits, occupation, and relationships with family and key cast members by name. Do not repeat the situation, conflict, or plot already covered in the description, opening, or plot essentials.

"npcEntries": An object where every key is an NPC name and every value is a PLAIN STRING (not a nested object). Each string MAX 1000 chars. Open with one sentence: "[Full name] is a [age]-year-old [orientation] [gender] [race] with [hair length] [hair color] [hair style], [eye color] eyes, [skin tone] skin[, and any jewelry/piercings/tattoos/scars if notable], wearing [outfit suited to their job and lifestyle]." Then describe personality, quirks, habits, occupation, and their relationship with the protagonist and others by name. Do not repeat the situation or plot.

"title": MAX 70 chars. Hook the player. Specific and evocative. Can be darkly funny if it fits.

"description": MAX 5000 chars. Second person ("You are..."). Set the scene: who the player is, where they live, what their world feels like, what's at stake. Weave in 2–3 cast members naturally. Hint at the tension and secret without stating them directly. End with a pull that makes the player want to begin. Tone: immersive, grounded, enough wit to feel playable rather than a therapy session.

"tags": Array of 8–10 lowercase strings. Genre-appropriate. E.g. ["modern", "drama", "crime", "dark-comedy", "redemption"].

"opening": MAX 4000 chars. Second person. Drop the player into a specific vivid moment — right now, mid-scene. Something is happening. Use sensory detail. The tension is present or arriving. End mid-moment, leaving the player with a clear choice or action. No backstory. No summaries. Just: you are here, this is happening, what do you do.

"appearancePrompt": MAX 500 chars. Comma-separated visual descriptors for a text-to-image model. Build a portrait prompt: start with "portrait of" then describe the subject (age range, gender, body type), hair color and style, eye description, distinguishing feature if any, outfit suited to their job and economic tier, and setting mood. Include "face of [a historical figure whose gender, ethnicity, and approximate age match this character]". Close with: photorealistic, cinematic lighting. Descriptors only — no full sentences, no labels, no stats.

"plotEssentials": MAX 1200 chars. Using "${sk.plotArchetype}" as the primary story engine, write the plot overview for this scenario tailored to this specific character. Cover: what triggers the story (the inciting incident), the central objective, the main obstacle or antagonist, and what's at stake if the character fails. Ground it specifically in this character's skills, cast, and setting. The background tension ("${sk.tension}") is a secondary thread — weave it in but don't let it dominate. Write for a GM who needs to run this session tonight: concrete, specific, actionable.

"authorNote": MAX 500 chars. Style directive for AI Dungeon's Author's Note field — injected into every AI turn to shape the game's prose. Write in terse imperatives tailored to this specific character. Include: prose style (behavioral — show don't tell), 1–2 sensory anchors from their specific world (neighborhood sounds, job smells, textures), emotional register. No character names, no plot details.`;
}
