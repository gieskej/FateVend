// genres/modern/prompt-template.js
// Builds the Claude API prompt from a fully-resolved character skeleton.

export const SYSTEM_PROMPT = `You are a creative writer generating AI Dungeon scenario content.
Your output must be vivid, specific, and immediately usable as a game scenario.

TONE — this is critical:
These characters are for a game. Players should want to play them.
Write with energy, wit, and a light touch even when the material is dark.
Dark comedy is welcome. Characters should feel alive, flawed, and fun — not just tragic.
A character drowning in debt can still be the funniest person in the room.
A burned-out nurse can love her job at 7am and hate it by noon.
Misery is a seasoning, not the whole dish.
Every character should have at least one quality that makes you root for them.

STYLE:
- Behavioral prose — show character through action, detail, and implication. Never explain.
- Never mention stat numbers.
- Use sentence fragments where they sharpen the prose.
- Stay within the exact character limits given. Count carefully.

Output only the JSON structure requested. No preamble, no commentary, no markdown fences.`;

/**
 * Builds the user prompt string from a resolved CharacterSkeleton.
 * @param {object} sk  CharacterSkeleton
 * @returns {string}
 */
export function buildPrompt(sk) {
  const castLines = sk.cast
    .map(npc =>
      `  - ${npc.name} (${npc.role}, ${npc.status}): ${npc.traits.join(', ')}. ${npc.dynamic}`
    )
    .join('\n');

  const appearanceParts = [
    sk.appearance.build,
    sk.appearance.hair,
    sk.appearance.distinguishingFeature,
    ...(sk.appearance.statNotes ?? []),
  ].filter(Boolean).join('; ');

  return `Generate AI Dungeon content for this character. Return a single JSON object with these exact keys:
"characterEntry", "npcEntries", "title", "description", "tags", "opening", "appearancePrompt"

CHARACTER SKELETON:
Name: ${sk.name}, ${sk.age}, ${sk.gender} (${sk.pronouns})
Race: ${sk.ethnicityBroad}
Ethnicity: ${sk.ethnicityFlavor}
Orientation: ${sk.orientation}
Appearance: ${appearanceParts}
Quirk: ${sk.quirk}
Profession: ${sk.profession} (${sk.industry}) — feels ${sk.sentiment} about it
Stats: STR ${sk.stats.strength} (${sk.statLabels.strength}) | INT ${sk.stats.intelligence} (${sk.statLabels.intelligence}) | WIS ${sk.stats.wisdom} (${sk.statLabels.wisdom}) | CHA ${sk.stats.charisma} (${sk.statLabels.charisma}) | DEX ${sk.stats.dexterity} (${sk.statLabels.dexterity}) | CON ${sk.stats.constitution} (${sk.statLabels.constitution})
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

"characterEntry": MAX 1000 chars. Terse behavioral prose. Lead with name, age, role. Use sentence fragments. Fold in appearance and the quirk through behavior — show don't state. Reference key cast members by name. End on something that creates forward momentum — a tension, an itch, a thing they want. Make the reader want to be this person, at least for an evening. Specific, alive, a little fun.

"npcEntries": Object keyed by NPC name. Each value MAX 1000 chars. Same style. Reference protagonist by name. Show the relationship through behavior. These people should feel like people worth knowing.

"title": MAX 70 chars. Hook the player. Specific and evocative. Can be darkly funny if it fits.

"description": MAX 5000 chars. Second person ("You are..."). Set the scene: who the player is, where they live, what their world feels like, what's at stake. Weave in 2–3 cast members naturally. Hint at the tension and secret without stating them directly. End with a pull that makes the player want to begin. Tone: immersive, grounded, enough wit to feel playable rather than a therapy session.

"tags": Array of 8–10 lowercase strings. Genre-appropriate. E.g. ["modern", "drama", "crime", "dark-comedy", "redemption"].

"opening": MAX 4000 chars. Second person. Drop the player into a specific vivid moment — right now, mid-scene. Something is happening. Use sensory detail. The tension is present or arriving. End mid-moment, leaving the player with a clear choice or action. No backstory. No summaries. Just: you are here, this is happening, what do you do.

"appearancePrompt": MAX 500 chars. Comma-separated visual descriptors for a text-to-image model. Build a portrait prompt: start with "portrait of" then describe the subject (age range, gender, body type), hair color and style, eye description, distinguishing feature if any, outfit suited to their job and economic tier, and setting mood. Include "face of [a historical figure or classic-cinema figure whose gender, ethnicity, and approximate age match this character — choose someone whose likeness is well-documented in photographs or portraiture]". Close with: photorealistic, cinematic lighting. Descriptors only — no full sentences, no labels, no stats.`;
}

/**
 * Parses the Claude API response into structured output fields.
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
    console.error('Failed to parse Claude response:', err);
    return null;
  }
}
