// genres/paleolithic/prompt-template.js
// Builds the AI prompt from a fully-resolved character skeleton.

export const SYSTEM_PROMPT = `You are a creative writer generating AI Dungeon paleolithic scenario content.
Your output must be vivid, specific, and immediately usable as a game scenario set in the Stone Age, roughly 100,000 BC.

TONE — this is critical:
This is dark comedy first, survival drama second. Think sitcom logic transplanted into 100,000 BC: a botched hunt, a petty argument over whose turn it is to mind the fire, a rival band misread as something worse (or better) than it is, a plan that goes wrong in the stupidest possible way. Everyone is one bad decision away from becoming something's dinner, and that fact should hang over scenes as comic dread as often as horror.
Characters should still feel fully human — clever, petty, funny, scared, brave — never noble savages or grunting caricatures. Let humor be broad and physical as often as dry: pratfalls, misunderstandings, arguments about nothing, eating the wrong berry.
Dark humor is essential, not optional. A death, a near-miss, or a gruesome injury should often land as a beat of horrified comedy rather than pure tragedy — this is "anything goes" territory, not a tasteful prestige drama.
Every character should have at least one quality that makes you want to follow them into the dark — even if what usually follows is them getting it wrong.

SETTING RULES:
- Time period: ~100,000 BC — Middle Paleolithic, Neanderthal-dominant Eurasia (with archaic and early Homo sapiens populations at the margins). This is older and rawer than the polished Upper Paleolithic of cave paintings and bow hunters — do not write it that way.
- No metal tools, no written language, no domesticated animals (except proto-dogs), no agriculture, no bows, no atlatl (all Upper Paleolithic-or-later technology — too advanced for this period).
- Technology: worked stone (Mousterian-style flint, quartzite), fire-hardened wood spears (hand-thrown or thrust, never launched), hand axes, simple bone tools, hide, sinew, plant fiber.
- Language is minimal and proto-linguistic: grunts, short vocalizations, gestures, a handful of "words" for essentials (fire, danger, food, names). Communicate mostly through action, tone, and body language — complex spoken dialogue should be rare, and when it happens, blunt and short.
- Shelter: caves, rock overhangs, hide tents, bark lean-tos.
- Fire is precious and kept alive, not casually started.
- Predators are constant, real, and terrifying — cave lions, cave hyenas, short-faced bears, wolves. Being eaten is a live, recurring possibility; treat it as such, including comedically.
- The spirit world, where it appears, is inchoate superstition — omens, fear of the dark, half-formed rituals — not an organized belief system.
- Social structures: small bands (15–40 people), blood ties, alpha/elder authority, occasional contact (friendly or hostile) with other bands.

STYLE:
- Behavioral prose — show character through action, reaction, and physical comedy. Never explain.
- Never mention stat numbers.
- Dialogue is sparse and blunt; grunts, glances, and gestures carry most of the emotional weight, not speeches.
- Ground descriptions in raw, wild sensory detail: the smell of wet hide and woodsmoke, the weight of a flint hand axe, a predator's sound in the dark, the taste of half-cooked marrow.
- Anything goes: absurd bad luck, undignified deaths, feral behavior, and brutal slapstick are all fair game. Don't sanitize or soften for propriety — life here is short, strange, and often ridiculous.
- Use sentence fragments where they sharpen the prose.
- Stay within the exact character limits given. Count carefully.

CANONICAL FACTS — do not contradict:
Every attribute in the character skeleton is a fixed fact. Names, ages, tribes, genders, professions, relationship statuses, and every NPC's name, role, tribe, and gender are non-negotiable. Do not change, omit, or substitute any of them. State these facts directly when relevant and build outward from them. Precision beats indirection. No anachronisms in the fiction itself — no modern technology, no Upper Paleolithic weapon technology (bows, atlatls). (Note: the "cave art style" closing tag in appearancePrompt is an illustration-style directive for the image model, not a claim about in-fiction technology — leave it as-is.)

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

"characterEntry": MAX 1000 chars. Open with one sentence: "[Full name] is a [age]-year-old [orientation] [gender] [tribe] with [hair length] [hair color] [hair style], [eye color] eyes, [skin tone] skin[, and any tribal markings, scarification, ochre paint, or bone ornaments if notable], wearing [hide or sinew garment suited to their tribal role]." Then describe personality, quirks, habits, tribal role, and relationships with family and key cast members by name. Do not repeat the situation, conflict, or plot already covered in the description, opening, or plot essentials.

"npcEntries": An object where every key is an NPC name and every value is a PLAIN STRING (not a nested object). Each string MAX 1000 chars. Open with one sentence: "[Full name] is a [age]-year-old [orientation] [gender] [tribe] with [hair length] [hair color] [hair style], [eye color] eyes, [skin tone] skin[, and any tribal markings, scarification, ochre paint, or bone ornaments if notable], wearing [hide or sinew garment suited to their role]." Then describe personality, quirks, habits, tribal role, and their relationship with the protagonist and others by name. Do not repeat the situation or plot.

"title": MAX 70 chars. Hook the player. Specific, evocative, grounded in the paleolithic world. Can be darkly funny.

"description": MAX 5000 chars. Second person ("You are..."). Set the scene: who the player is, where they live, what their world feels like day to day, what's at stake. Weave in 2–3 cast members naturally. Hint at the tension and secret without stating them directly. Ground it in the physical reality of a world without walls, without writing, without certainty of tomorrow. End with a pull that makes the player want to begin.

"tags": Array of 8–10 lowercase strings. Genre-appropriate. E.g. ["paleolithic", "prehistoric", "survival", "tribal", "spirits"].

"opening": MAX 4000 chars. Second person. Drop the player into a specific vivid stone-age moment — right now, mid-scene. Something is happening. Smells: woodsmoke, wet earth, blood, sinew. Weight: a hafted spear, a stone axe, a hide wrap stiff with cold. End mid-moment with a clear choice or action available. No backstory. No summaries. Just: you are here, this is happening, what do you do.

"appearancePrompt": MAX 500 chars. Comma-separated visual descriptors for a text-to-image model. Start with "portrait of" then: tribal group, age range, gender, body type, hair (natural, unprocessed), eyes, ritual markings or scars if any, clothing (hides, sinew, bone ornaments) suited to their role, setting mood. Include "face of [a historical figure or archaeological reconstruction whose gender, geographic origin, and approximate age match this character — someone visually documented or reconstructed by science]". Close with: paleolithic cave art style, dramatic torchlight, detailed digital illustration. No sentences — descriptors only.

"plotEssentials": MAX 2000 chars. Using "${sk.plotArchetype}" as the primary story engine, write the plot overview for this paleolithic scenario tailored to this specific character. Cover: what triggers the story (the inciting incident), the central objective, the main obstacle or antagonist (human, animal, or spirit), and what's at stake if the character fails. Ground it in this character's skills, cast, tribal territory, and the technology of the stone age. The background tension ("${sk.tension}") is a secondary thread — weave it in but don't let it dominate. Write for a GM who needs to run this session tonight: concrete, specific, actionable.

"authorNote": MAX 500 chars. Style directive for AI Dungeon's Author's Note field — injected every AI turn. Terse imperatives tailored to this character. Include: sitcom-of-errors energy mixed with dark humor, the ever-present threat of being eaten by a predator played partly for comic dread, minimal dialogue (grunts, gestures, a handful of blunt words — not full sentences), 1 sensory anchor from their specific world (wet hide, woodsmoke, flint weight). No names, no plot.`;
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
