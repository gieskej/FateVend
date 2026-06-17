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
- Never mention stat numbers.
- Use sentence fragments where they sharpen the prose.
- Fantasy-specific: ground descriptions in sensory detail — smells of forge smoke, the weight of armor, the sound of a crowded tavern.
- Stay within the exact character limits given. Count carefully.

CANONICAL FACTS — do not contradict:
Every attribute in the character skeleton is a fixed fact. Names, ages, races/species, genders, professions, relationship statuses, and every NPC's name, role, race, and gender are non-negotiable. Do not change, omit, or substitute any of them. State these facts directly when relevant and build outward from them. Precision beats indirection.

Output only the JSON structure requested. No preamble, no commentary, no markdown fences.`;

/**
 * Builds the user prompt from a resolved CharacterSkeleton.
 * @param {object} sk
 * @returns {string}
 */
export function buildPrompt(sk) {
  const castLines = sk.cast
    .map(npc => `  - ${npc.name} (${npc.role}, ${npc.status}, ${npc.gender}, ${npc.race}): ${npc.traits.join(', ')}. ${npc.dynamic}`)
    .join('\n');

  const appearanceParts = [
    sk.appearance.build,
    sk.appearance.hair,
    sk.appearance.distinguishingFeature,
    ...(sk.appearance.statNotes ?? []),
  ].filter(Boolean).join('; ');

  const NON_HUMANOID = new Set(['Dragonborn', 'Orc', 'Half-Orc', 'Gnome']);
  const faceOf = NON_HUMANOID.has(sk.ethnicityBroad)
    ? ''
    : `Include "face of [a historical figure, classical warrior, or well-known portrait subject whose gender, racial appearance, and approximate age match this character]". `;

  return `Generate AI Dungeon fantasy content for this character. Return a single JSON object with these exact keys:
"characterEntry", "npcEntries", "title", "description", "tags", "opening", "appearancePrompt", "plotEssentials"

CHARACTER SKELETON:
Name: ${sk.name}, ${sk.age}, ${sk.gender} (${sk.pronouns})
Species: ${sk.ethnicityBroad}
Race: ${sk.ethnicityFlavor}
Orientation: ${sk.orientation}
Relationship status: ${sk.relationshipStatus}
Appearance: ${appearanceParts}
Quirk: ${sk.quirk}
Profession: ${sk.profession} (${sk.industry}) — feels ${sk.sentiment} about it
Stats: STR ${sk.stats.strength} (${sk.statLabels.strength}) | INT ${sk.stats.intelligence} (${sk.statLabels.intelligence}) | WIS ${sk.stats.wisdom} (${sk.statLabels.wisdom}) | CHA ${sk.stats.charisma} (${sk.statLabels.charisma}) | DEX ${sk.stats.dexterity} (${sk.statLabels.dexterity}) | CON ${sk.stats.constitution} (${sk.statLabels.constitution})
Personality: ${sk.mbti} — ${sk.mbtiLabel}
Economic status: ${sk.economicLabel} — ${sk.economicMarkers.join('; ')}
Housing: ${sk.housing} | Transport: ${sk.transport}
Setting: ${sk.cityLabel} — ${sk.cityFlavor}
Formative event: ${sk.lifeEvent}
Plot archetype (PRIMARY STORY): ${sk.plotArchetype} — ${sk.plotArchetypeDesc}
Background tension (secondary): ${sk.tension}
Secret (severity: ${sk.secretSeverity}): ${sk.secret}

SUPPORTING CAST:
${castLines}

OUTPUT RULES:

"characterEntry": MAX 1000 chars. Terse behavioral prose. Lead with name, rough age, race, role. Use sentence fragments. Reference key cast members by name. End on something that creates forward momentum. Make the reader want to be this person, at least for an evening.

"npcEntries": An object where every key is an NPC name and every value is a PLAIN STRING (not a nested object). Each string ~1000 chars — use the full length. Open with physical presence: name, age, race, build, distinguishing features, how they move in the world. Then personality through behavior — speech, habits, the thing that gives them away. Reference the protagonist by name. These people should feel real enough to share a fire with.

"title": MAX 70 chars. Hook the player. Specific, evocative, and flavored for the setting. Can be darkly funny.

"description": MAX 5000 chars. Second person ("You are..."). Set the scene: who the player is, what their world feels like, what they want, what's in the way. Weave in 2–3 cast members. Hint at the tension and secret without stating them directly. End with something that makes the player want to begin. Ground it in the physical world — smells, sounds, textures.

"tags": Array of 8–10 lowercase strings. E.g. ["fantasy", "adventure", "magic", "gritty", "thieves-guild"].

"opening": MAX 4000 chars. Second person. Drop the player into a vivid, specific moment right now — mid-scene. Something is happening. Use sensory detail. End mid-moment with a clear choice or action available. No backstory dumps.

"appearancePrompt": MAX 500 chars. Comma-separated visual descriptors for a text-to-image model. Build a portrait prompt: start with "portrait of" then describe the subject (race, age range, gender, body type), hair color and style, eye description, distinguishing feature if any, armor or clothing suited to their role, and setting mood. ${faceOf}Close with: fantasy character art, detailed digital illustration, dramatic lighting. Descriptors only — no full sentences, no labels, no stats.

"plotEssentials": MAX 2000 chars. Using "${sk.plotArchetype}" as the primary story engine, write the plot overview for this fantasy scenario tailored to this specific character. Cover: what triggers the story (the inciting incident), the central objective, the main obstacle or antagonist, and what's at stake if the character fails. Ground it in this character's skills, cast, and setting. The background tension ("${sk.tension}") is a secondary thread — weave it in but don't let it dominate. Write for a GM who needs to run this session tonight: concrete, specific, actionable.`;
}

/**
 * Parses the Claude API response.
 * @param {string} rawText
 * @returns {{ characterEntry, npcEntries, title, description, tags, opening } | null}
 */
function coerceEntry(v) {
  if (typeof v === 'string') return v;
  if (typeof v !== 'object' || v === null) return String(v);
  for (const key of ['entry', 'description', 'bio', 'text', 'content', 'characterEntry']) {
    if (typeof v[key] === 'string' && v[key].length > 10) return v[key];
  }
  return Object.values(v).filter(x => typeof x === 'string').join(' ').trim() || JSON.stringify(v);
}

export function parseResponse(rawText) {
  try {
    const fence = rawText.match(/```(?:json)?\s*([\s\S]*?)```/i);
    let json = fence ? fence[1].trim()
      : rawText.indexOf('{') !== -1
        ? rawText.slice(rawText.indexOf('{'), rawText.lastIndexOf('}') + 1)
        : rawText.trim();
    const parsed = JSON.parse(json);
    const npcEntries = {};
    for (const [k, v] of Object.entries(parsed.npcEntries ?? {})) npcEntries[k] = coerceEntry(v);
    return {
      characterEntry:   parsed.characterEntry   ?? '',
      npcEntries,
      title:            parsed.title            ?? '',
      description:      parsed.description      ?? '',
      tags:             parsed.tags             ?? [],
      opening:          parsed.opening          ?? '',
      appearancePrompt: parsed.appearancePrompt  ?? '',
      plotEssentials:   parsed.plotEssentials    ?? '',
    };
  } catch (err) {
    return null;
  }
}
