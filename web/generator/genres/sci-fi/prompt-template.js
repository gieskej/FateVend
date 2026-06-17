// genres/sci-fi/prompt-template.js
// Builds the Claude API prompt from a fully-resolved character skeleton.

export const SYSTEM_PROMPT = `You are a creative writer generating AI Dungeon sci-fi scenario content.
Your output must be vivid, specific, and immediately usable as a game scenario.

TONE — this is critical:
These characters are for a game. Players should want to play them.
Write with energy, wit, and a light touch even when the material is dark.
Dark comedy is welcome. Characters should feel alive, flawed, and fun — not just grim.
A smuggler drowning in syndicate debt can still be the most competent person on the station.
A burned-out corporate medic can genuinely love their work at 0700 and resent it by 1400.
The void is bleak. The people in it don't have to be.
Every character should have at least one quality that makes you root for them.

STYLE:
- Behavioral prose — show character through action, detail, and implication. Never explain.
- Never mention stat numbers.
- Ground descriptions in sensory sci-fi detail: the hum of recycled air, the weight of aug hardware, the static of a distant comms signal, the particular smell of a station that's been sealed too long.
- Use sentence fragments where they sharpen the prose.
- Stay within the exact character limits given. Count carefully.

CANONICAL FACTS — do not contradict:
Every attribute in the character skeleton is a fixed fact. Names, ages, races/species, genders, professions, relationship statuses, and every NPC's name, role, race, and gender are non-negotiable. Do not change, omit, or substitute any of them. State these facts directly when relevant and build outward from them. Precision beats indirection.

Output only the JSON structure requested. No preamble, no commentary, no markdown fences.`;

/**
 * Builds the user prompt string from a resolved CharacterSkeleton.
 * @param {object} sk  CharacterSkeleton
 * @returns {string}
 */
export function buildPrompt(sk) {
  const castLines = sk.cast
    .map(npc =>
      `  - ${npc.name} (${npc.role}, ${npc.status}, ${npc.gender}, ${npc.race}): ${npc.traits.join(', ')}. ${npc.dynamic}`
    )
    .join('\n');

  const appearanceParts = [
    sk.appearance.build,
    sk.appearance.hair,
    sk.appearance.distinguishingFeature,
    ...(sk.appearance.statNotes ?? []),
  ].filter(Boolean).join('; ');

  const NON_HUMANOID = new Set(['Android', 'Alien', 'Uplifted', 'Hybrid']);
  const faceOf = NON_HUMANOID.has(sk.ethnicityBroad)
    ? ''
    : `Include "face of [a historical figure or well-known portrait subject whose gender and appearance match this character — choose someone whose likeness is well-documented]". `;

  return `Generate AI Dungeon sci-fi content for this character. Return a single JSON object with these exact keys:
"characterEntry", "npcEntries", "title", "description", "tags", "opening", "appearancePrompt", "plotEssentials"

CHARACTER SKELETON:
Name: ${sk.name}, ${sk.age}, ${sk.gender} (${sk.pronouns})
Species: ${sk.ethnicityBroad}
Race/Origin: ${sk.ethnicityFlavor}
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

"characterEntry": MAX 1000 chars. Terse behavioral prose. Lead with name, age, species, role. Ground in sensory sci-fi detail. Use sentence fragments. Reference key cast members by name. End on something that creates forward momentum — a tension, an itch, a thing they want. Make the reader want to be this person, at least for an evening. Specific, alive, a little fun.

"npcEntries": An object where every key is an NPC name and every value is a PLAIN STRING (not a nested object). Each string ~1000 chars — use the full length. Open with physical presence: name, age, species, build, visible augmentations, how they occupy space. Then personality through behavior — speech patterns, habits, tells. Reference the protagonist by name. These people should feel real enough to trust in a firefight — or not.

"title": MAX 70 chars. Hook the player. Specific and evocative. Can be darkly funny if it fits.

"description": MAX 5000 chars. Second person ("You are..."). Set the scene: who the player is, where they live, what their world feels like, what's at stake. Weave in 2–3 cast members naturally. Hint at the tension and secret without stating them directly. End with a pull that makes the player want to begin. Tone: immersive, grounded in the physical reality of this future, enough wit to feel playable rather than a tragedy summary.

"tags": Array of 8–10 lowercase strings. Genre-appropriate. E.g. ["sci-fi", "cyberpunk", "corporate", "noir", "survival"].

"opening": MAX 4000 chars. Second person. Drop the player into a specific vivid sci-fi moment — right now, mid-scene. Something is happening. Smells: recycled air, ozone, synth-food. Weight: aug hardware, vacuum suit, the particular drag of a weapon you've carried long enough it feels like part of you. End mid-moment with a clear choice or action available. No backstory. No summaries. Just: you are here, this is happening, what do you do.

"appearancePrompt": MAX 500 chars. Comma-separated visual descriptors for a text-to-image model. Start with "portrait of" then: species and augmentation description, age range, gender, body type, hair, eyes, cybernetic features if any, clothing and equipment suited to their role and economic tier, setting mood. ${faceOf}Close with: sci-fi concept art, detailed digital illustration, dramatic lighting. No sentences — descriptors only.

"plotEssentials": MAX 2000 chars. Using "${sk.plotArchetype}" as the primary story engine, write the plot overview for this sci-fi scenario tailored to this specific character. Cover: what triggers the story (the inciting incident), the central objective, the main obstacle or antagonist, and what's at stake if the character fails. Ground it in this character's species, skills, augmentations, cast, and setting. The background tension ("${sk.tension}") is a secondary thread — weave it in but don't let it dominate. Write for a GM who needs to run this session tonight: concrete, specific, actionable.`;
}

/**
 * Parses the Claude API response into structured output fields.
 * @param {string} rawText
 * @returns {{ characterEntry, npcEntries, title, description, tags, opening, appearancePrompt } | null}
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
    console.error('Failed to parse Claude response:', err);
    return null;
  }
}
