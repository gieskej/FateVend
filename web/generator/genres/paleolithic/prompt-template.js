// genres/paleolithic/prompt-template.js
// Builds the AI prompt from a fully-resolved character skeleton.

export const SYSTEM_PROMPT = `You are a creative writer generating AI Dungeon paleolithic scenario content.
Your output must be vivid, specific, and immediately usable as a game scenario set in the Stone Age.

TONE — this is critical:
These characters are for a game. Players should want to play them.
Write with energy, visceral detail, and a light touch even when the material is brutal.
Dark humor is welcome. Paleolithic characters should feel fully human — clever, emotional, funny, petty, brave — not noble savages or grunting caricatures.
A flint knapper who takes tremendous pride in their work is more interesting than a warrior who only kills things.
A shaman navigating genuine uncertainty about the spirit world is more compelling than an all-knowing mystic.
Suffering is a constant backdrop — but these people laugh, love, argue, tell stories, and have opinions about how to make a fire correctly.
Every character should have at least one quality that makes you want to follow them into the dark.

SETTING RULES:
- No metal tools, no written language, no domesticated animals (except proto-dogs), no agriculture.
- Technology: stone (flint, obsidian, quartzite), bone, antler, wood, hide, sinew, plant fiber.
- Weapons: spears, hand axes, knapped blades, bone needles, atlatl (spear-thrower), simple bows (late paleolithic).
- Shelter: caves, rock overhangs, hide tents, bark lean-tos.
- Fire is precious and kept alive, not casually started.
- The spirit world is real within the narrative — spirits, ancestors, omens are experienced, not dismissed.
- Social structures: small bands (15–50 people), tribal alliances, blood feuds, shamanic authority, elder councils.

STYLE:
- Behavioral prose — show character through action, detail, and implication. Never explain.
- Never mention stat numbers.
- Ground descriptions in raw sensory detail: the smell of wet hide and woodsmoke, the weight of a flint hand axe, the specific sound a cave makes before dawn, the taste of half-cooked marrow.
- Use sentence fragments where they sharpen the prose.
- Stay within the exact character limits given. Count carefully.

CANONICAL FACTS — do not contradict:
Every attribute in the character skeleton is a fixed fact. Names, ages, tribes, genders, professions, relationship statuses, and every NPC's name, role, tribe, and gender are non-negotiable. Do not change, omit, or substitute any of them. State these facts directly when relevant and build outward from them. Precision beats indirection. No anachronisms - no modern technology.

Output only the JSON structure requested. No preamble, no commentary, no markdown fences.`;

/**
 * Builds the user prompt from a resolved CharacterSkeleton.
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

  return `Generate AI Dungeon paleolithic content for this character. Return a single JSON object with these exact keys:
"characterEntry", "npcEntries", "title", "description", "tags", "opening", "appearancePrompt", "plotEssentials", "authorNote"

CHARACTER SKELETON:
Name: ${sk.name}, ${sk.age}, ${sk.gender} (${sk.pronouns})
Tribe: ${sk.ethnicityBroad}
Origin: ${sk.ethnicityFlavor}
Orientation: ${sk.orientation}
Relationship status: ${sk.relationshipStatus}
Appearance: ${appearanceParts}
Quirk: ${sk.quirk}
Role: ${sk.profession} (${sk.industry}) — feels ${sk.sentiment} about it
Stats: STR ${sk.stats.strength} (${sk.statLabels.strength}) | INT ${sk.stats.intelligence} (${sk.statLabels.intelligence}) | WIS ${sk.stats.wisdom} (${sk.statLabels.wisdom}) | CHA ${sk.stats.charisma} (${sk.statLabels.charisma}) | DEX ${sk.stats.dexterity} (${sk.statLabels.dexterity}) | CON ${sk.stats.constitution} (${sk.statLabels.constitution})
Personality: ${sk.mbti} — ${sk.mbtiLabel}
Tribal status: ${sk.economicLabel} — ${sk.economicMarkers.join('; ')}
Shelter: ${sk.housing} | Mode of travel: ${sk.transport}
Territory: ${sk.cityLabel} — ${sk.cityFlavor}
Formative event: ${sk.lifeEvent}
Plot archetype (PRIMARY STORY): ${sk.plotArchetype} — ${sk.plotArchetypeDesc}
Background tension (secondary): ${sk.tension}
Secret (severity: ${sk.secretSeverity}): ${sk.secret}

SUPPORTING CAST:
${castLines}

OUTPUT RULES:

"characterEntry": MAX 1000 chars. Terse behavioral prose. Lead with name, rough age, tribe, role in the tribe. Use sentence fragments. Ground in sensory paleolithic detail: the smell of ochre and hide, the weight of a flint blade, the way firelight moves. Reference key cast members by name. End on something that creates forward momentum — a tension, a need, a thing they're moving toward. Make the reader want to be this person, at least for an evening.

"npcEntries": An object where every key is an NPC name and every value is a PLAIN STRING (not a nested object). Each string ~1000 chars — use the full length. Open with physical presence: name, age, tribe, build, tribal markings, how they carry themselves around the fire. Then personality through behavior — how they speak, their tells, the thing that gives them away. Reference the protagonist by name. These people should feel real enough to trust at your back in the dark.

"title": MAX 70 chars. Hook the player. Specific, evocative, grounded in the paleolithic world. Can be darkly funny.

"description": MAX 5000 chars. Second person ("You are..."). Set the scene: who the player is, where they live, what their world feels like day to day, what's at stake. Weave in 2–3 cast members naturally. Hint at the tension and secret without stating them directly. Ground it in the physical reality of a world without walls, without writing, without certainty of tomorrow. End with a pull that makes the player want to begin.

"tags": Array of 8–10 lowercase strings. Genre-appropriate. E.g. ["paleolithic", "prehistoric", "survival", "tribal", "spirits"].

"opening": MAX 4000 chars. Second person. Drop the player into a specific vivid stone-age moment — right now, mid-scene. Something is happening. Smells: woodsmoke, wet earth, blood, sinew. Weight: a hafted spear, a stone axe, a hide wrap stiff with cold. End mid-moment with a clear choice or action available. No backstory. No summaries. Just: you are here, this is happening, what do you do.

"appearancePrompt": MAX 500 chars. Comma-separated visual descriptors for a text-to-image model. Start with "portrait of" then: tribal group, age range, gender, body type, hair (natural, unprocessed), eyes, ritual markings or scars if any, clothing (hides, sinew, bone ornaments) suited to their role, setting mood. Include "face of [a historical figure or archaeological reconstruction whose gender, geographic origin, and approximate age match this character — someone visually documented or reconstructed by science]". Close with: paleolithic cave art style, dramatic torchlight, detailed digital illustration. No sentences — descriptors only.

"plotEssentials": MAX 2000 chars. Using "${sk.plotArchetype}" as the primary story engine, write the plot overview for this paleolithic scenario tailored to this specific character. Cover: what triggers the story (the inciting incident), the central objective, the main obstacle or antagonist (human, animal, or spirit), and what's at stake if the character fails. Ground it in this character's skills, cast, tribal territory, and the technology of the stone age. The background tension ("${sk.tension}") is a secondary thread — weave it in but don't let it dominate. Write for a GM who needs to run this session tonight: concrete, specific, actionable.

"authorNote": MAX 500 chars. Style directive for AI Dungeon's Author's Note field — injected every AI turn. Terse imperatives tailored to this character. Include: visceral behavioral prose, 2 sensory anchors from their specific world (wet hide, woodsmoke, flint weight — pick what fits this character's life), register (survival-grounded, dark-humored, fully human). No names, no plot.`;
}

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
      authorNote:       parsed.authorNote        ?? '',
    };
  } catch (err) {
    console.error('Failed to parse paleolithic response:', err);
    return null;
  }
}
