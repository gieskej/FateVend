// genres/fantasy/prompt-template.js

export const SYSTEM_PROMPT = `You are a creative writer generating AI Dungeon fantasy scenario content.
Your output must be vivid, specific, and immediately usable as a game scenario.

TONE — this is critical:
These characters are for a game. Players should want to play them.
Write with energy, wit, and a light touch even when the material is dark.
Dark comedy is welcome. Fantasy characters should feel like real people who happen to live in a world with magic and monsters — not cardboard archetypes.
A broke sellsword can be the funniest person in the tavern.
A fallen paladin can be genuinely good company while being a genuine mess.
Suffering is a seasoning, not the whole dish.
Every character should have at least one quality that makes you want to spend time with them.

STYLE:
- Behavioral prose — show character through action, detail, and implication. Never explain.
- Never mention stat numbers, MBTI types, race labels, or any generation metadata directly as clinical labels.
- Weave race, appearance, and quirk naturally into behavior and description.
- Use sentence fragments where they sharpen the prose.
- Fantasy-specific: ground descriptions in sensory detail — smells of forge smoke, the weight of armor, the sound of a crowded tavern.
- Stay within the exact character limits given. Count carefully.

Output only the JSON structure requested. No preamble, no commentary, no markdown fences.`;

/**
 * Builds the user prompt from a resolved CharacterSkeleton.
 * @param {object} sk
 * @returns {string}
 */
export function buildPrompt(sk) {
  const castLines = sk.cast
    .map(npc => `  - ${npc.name} (${npc.role}, ${npc.status}): ${npc.traits.join(', ')}. ${npc.dynamic}`)
    .join('\n');

  const appearanceParts = [
    sk.appearance.build,
    sk.appearance.hair,
    sk.appearance.distinguishingFeature,
    ...(sk.appearance.statNotes ?? []),
  ].filter(Boolean).join('; ');

  return `Generate AI Dungeon fantasy content for this character. Return a single JSON object with these exact keys:
"characterEntry", "npcEntries", "title", "description", "tags", "opening", "appearancePrompt"

CHARACTER SKELETON:
Name: ${sk.name}, ${sk.age}, ${sk.gender} (${sk.pronouns})
Race: ${sk.ethnicityFlavor}
Orientation: ${sk.orientation}
Appearance: ${appearanceParts}
Quirk: ${sk.quirk}
Profession: ${sk.profession} (${sk.industry}) — feels ${sk.sentiment} about it
Stats: STR ${sk.stats.strength} | INT ${sk.stats.intelligence} | WIS ${sk.stats.wisdom} | CHA ${sk.stats.charisma} | DEX ${sk.stats.dexterity} | CON ${sk.stats.constitution}
Personality: ${sk.mbti} — ${sk.mbtiLabel}
Economic status: ${sk.economicLabel} — ${sk.economicMarkers.join('; ')}
Housing: ${sk.housing} | Transport: ${sk.transport}
Setting: ${sk.cityLabel} — ${sk.cityFlavor}
Formative event: ${sk.lifeEvent}
Current tension: ${sk.tension}
Secret (severity: ${sk.secretSeverity}): ${sk.secret}

SUPPORTING CAST:
${castLines}

OUTPUT RULES:

"characterEntry": MAX 1000 chars. Terse behavioral prose. Lead with name, rough age, role. Use sentence fragments. Weave in race appearance and the quirk through behavior — show don't state. Reference key cast members by name. End on something that creates forward momentum. Make the reader want to be this person, at least for an evening.

"npcEntries": Object keyed by NPC name. Each value MAX 1000 chars. Same style. Reference protagonist by name. These people should feel worth knowing — not just plot functions.

"title": MAX 70 chars. Hook the player. Specific, evocative, and flavored for the setting. Can be darkly funny.

"description": MAX 5000 chars. Second person ("You are..."). Set the scene: who the player is, what their world feels like, what they want, what's in the way. Weave in 2–3 cast members. Hint at the tension and secret without stating them directly. End with something that makes the player want to begin. Ground it in the physical world — smells, sounds, textures.

"tags": Array of 8–10 lowercase strings. E.g. ["fantasy", "adventure", "magic", "gritty", "thieves-guild"].

"opening": MAX 4000 chars. Second person. Drop the player into a vivid, specific moment right now — mid-scene. Something is happening. Use sensory detail. End mid-moment with a clear choice or action available. No backstory dumps.

"appearancePrompt": MAX 500 chars. Comma-separated visual descriptors for a text-to-image model. Build a portrait prompt: start with "portrait of" then describe the subject (race, age range, gender, body type), hair color and style, eye description, distinguishing feature if any, armor or clothing suited to their role, and setting mood. Include "face of [a historical figure, classical warrior, or well-known portrait subject whose gender, racial appearance, and approximate age match this character]". Close with: fantasy character art, detailed digital illustration, dramatic lighting. Descriptors only — no full sentences, no labels, no stats.`;
}

/**
 * Parses the Claude API response.
 * @param {string} rawText
 * @returns {{ characterEntry, npcEntries, title, description, tags, opening } | null}
 */
export function parseResponse(rawText) {
  try {
    const cleaned = rawText
      .replace(/^```json\s*/i, '')
      .replace(/^```\s*/i, '')
      .replace(/```\s*$/i, '')
      .trim();
    const parsed = JSON.parse(cleaned);
    return {
      characterEntry:  parsed.characterEntry  ?? '',
      npcEntries:      parsed.npcEntries      ?? {},
      title:           parsed.title           ?? '',
      description:     parsed.description     ?? '',
      tags:            parsed.tags            ?? [],
      opening:         parsed.opening         ?? '',
      appearancePrompt: parsed.appearancePrompt ?? '',
    };
  } catch (err) {
    return null;
  }
}
