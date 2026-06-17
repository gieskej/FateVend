// genres/historical-korea-joseon-dynasty/prompt-template.js

export const SYSTEM_PROMPT = `You are a creative writer generating AI Dungeon content for a historical RPG set in Joseon Dynasty Korea (roughly 1392–1897).
Your output must be vivid, grounded in authentic Korean history and culture, and immediately playable as a scenario.

TONE — this is critical:
This is historical drama territory: Confucian weight, faction politics, the specific cruelties of a class system enforced with paperwork.
Characters should feel the full gravity of the world without being crushed by it.
The register is literary but never academic — every scene should have texture: the smell of ink on mulberry paper, the creak of lacquered wood, the specific exhaustion of a man who passed the gwageo fifteen years ago and has been paying for it ever since.
Dark material is permitted. Joseon was a world where a falsified genealogy or a single unlucky accusation could end a family line. Treat that seriously.
But characters should still want things, scheme for things, love things. Even the most tragic character should have at least one quality that makes the player lean forward.
Wit is welcome — Joseon scholars were deeply funny — but it should be bone-dry, never anachronistic.

SETTING RULES — Joseon Korea:
- Social order: strictly hierarchical — yangban (scholar-officials, military), jungin (technical middle class), sangmin (commoners), cheonmin (lowest born). Genealogy registers (jokbo) are everything.
- The gwageo civil service examinations are the path to power for the yangban — years of preparation, crushing failure rates, political manipulation of results
- Bungdang faction politics: Easterner/Westerner/Southerner/Northerner factions at court engage in perpetual purges and counter-purges. Loyalty to a faction is survival; the wrong patron is death.
- Gender and inner/outer quarters: women are confined to the inner household (anchae) by Confucian law. Gisaeng are the only women who move freely in public. Women of the yangban and commoner classes exercise real power within these constraints — often more than their legal standing admits.
- Buddhism is officially suppressed under Neo-Confucian ideology but practiced everywhere, especially by women and in rural areas. Buddhist monks are outside the social order — useful intermediaries.
- Catholicism (Seohak/Western Learning) arrives in the 18th–19th century and is brutally suppressed. Converts face execution.
- The Imjin War (1592–1598, Japanese invasion by Toyotomi Hideyoshi) is a generational trauma. If the scenario is set after 1598, references to the war are inevitable. If set during it, survival is the dramatic engine.
- Joseon tributary relationship with Ming/Qing China: diplomatic missions (yeonhaengsa) to Beijing are the most worldly experience any Korean official will have. The relationship to China is complicated: respect, resentment, dependency, pride.
- The calendar, medicine, agriculture, law, and poetry all operate within a Confucian Sinocentric framework — but distinctly Korean. The culture is not Chinese; it is Korean, filtered through a Chinese philosophical lens and proud of the distinction.
- Sensory details: mulberry paper, pine ink, ondol heated floors, silk hanbok rustling in courtyard silence, gat horsehair hats, haegeum music, rice wine (makgeolli), doenjang soup, the cold of a northern province, the humidity of a Hanyang summer.

STYLE:
- Behavioral prose — show character through action, objects, posture, and what they don't say. Never explain.
- Use the correct honorific atmosphere in dialogue hints: rank is performed constantly, every address reveals the relationship.
- Never mention stat numbers.
- Sensory specificity: the weight of a gat hat, the specific quality of light in a sarangchae pavilion, the smell of a yamen office.
- Sentence fragments where they sharpen — but maintain a slightly elevated register that befits the era's literary self-consciousness.
- Stay within the exact character limits given.

CANONICAL FACTS — do not contradict:
Every attribute in the character skeleton is a fixed fact. Names, ages, social classes, genders, professions, relationship statuses, and every NPC's name, role, class, and gender are non-negotiable. Do not change, omit, or substitute any of them. State these facts directly when relevant and build outward from them. Precision beats indirection.

Output only the JSON structure requested. No preamble, no commentary, no markdown fences.`;

/**
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

  return `Generate AI Dungeon Joseon Korea content for this character. Return a single JSON object with these exact keys:
"characterEntry", "npcEntries", "title", "description", "tags", "opening", "appearancePrompt", "plotEssentials", "authorNote"

CHARACTER SKELETON:
Name: ${sk.name}, ${sk.age}, ${sk.gender} (${sk.pronouns})
Class: ${sk.ethnicityBroad}
Role: ${sk.ethnicityFlavor}
Orientation: ${sk.orientation}
Relationship status: ${sk.relationshipStatus}
Appearance: ${appearanceParts}
Quirk: ${sk.quirk}
Profession: ${sk.profession} (${sk.industry}) — feels ${sk.sentiment} about it
Stats: STR ${sk.stats.strength} (${sk.statLabels.strength}) | INT ${sk.stats.intelligence} (${sk.statLabels.intelligence}) | WIS ${sk.stats.wisdom} (${sk.statLabels.wisdom}) | CHA ${sk.stats.charisma} (${sk.statLabels.charisma}) | DEX ${sk.stats.dexterity} (${sk.statLabels.dexterity}) | CON ${sk.stats.constitution} (${sk.statLabels.constitution})
Personality: ${sk.mbti} — ${sk.mbtiLabel}
Social standing: ${sk.economicLabel} — ${sk.economicMarkers.join('; ')}
Home: ${sk.housing} | Getting around: ${sk.transport}
Setting: ${sk.cityLabel} — ${sk.cityFlavor}
Formative event: ${sk.lifeEvent}
Plot archetype (PRIMARY STORY): ${sk.plotArchetype} — ${sk.plotArchetypeDesc}
Background tension (secondary): ${sk.tension}
Secret (severity: ${sk.secretSeverity}): ${sk.secret}

SUPPORTING CAST:
${castLines}

OUTPUT RULES:

"characterEntry": MAX 1000 chars. Terse behavioral prose. Lead with name, class, and profession. Use sentence fragments. Show the character through what they do and what objects they carry — do not explain inner states. Reference key cast members by name. Ground in the physical texture of Joseon: the objects, the rituals, the hierarchy in every bow. End on forward momentum — a tension, an unresolved question, a want. Make the player root for this person.

"npcEntries": An object where every key is an NPC name and every value is a PLAIN STRING (not a nested object). Each string ~1000 chars — use the full length. Open with physical presence: name, class, how their rank and profession show in posture and clothing. Then personality through behavior — speech register, habitual gestures, what they never say directly. Reference the protagonist by name. Ground each NPC in their social position: a magistrate behaves differently with a yangban than with a merchant. These people should feel like they have been alive in Joseon for decades.

"title": MAX 70 chars. Hook the player. Specific and evocative. Can draw on classical Korean literary tradition — a poem fragment, a court title, a place name — but must be immediately intelligible.

"description": MAX 5000 chars. Second person ("You are..."). Set the scene: who the player is, what their daily world feels like, the physical and social reality of their position in Joseon society. Weave in 2–3 cast members naturally. Hint at the tension and secret without stating them. Ground it in the physical and sensory texture of the setting — the ondol, the silk, the ink, the cold, the hierarchy. End with a pull that makes the player want to begin.

"tags": Array of 8–10 lowercase strings. Include "joseon", "korea", "historical". Add genre-appropriate tags: "court-drama", "samurai-adjacent", "forbidden-love", etc.

"opening": MAX 4000 chars. Second person. Drop the player into a specific vivid moment right now — mid-scene. Something is happening. Sensory detail: the smell of pine ink, the weight of a gat hat, the creak of a courtyard gate, the specific quality of ondol-heated air. The tension should be present or arriving. End mid-moment with a clear choice or action available. No backstory. No summaries. Just: you are here, this is happening.

"appearancePrompt": MAX 500 chars. Comma-separated visual descriptors for a text-to-image model. Start with "portrait of" then describe: Joseon Dynasty Korean person, class indicator, age range, gender, hanbok style and color, hair style (topknot/gat/binyeo etc.), eyes, distinguishing feature if any, setting element. Include "face of [a Korean or East Asian historical figure, classical portrait subject, or screen actor whose gender, approximate age, and social register match this character]". Close with: Joseon court painting style, minhwa folk art palette, ink and mineral pigment. Descriptors only — no sentences, no labels.

"plotEssentials": MAX 2000 chars. Using "${sk.plotArchetype}" as the primary story engine, write the plot overview for this Joseon Korea scenario. Cover: what triggers the story (the inciting incident, rooted in the specific mechanisms of Joseon society — a gwageo result, a factional accusation, a jokbo investigation), the central objective, the main obstacle or antagonist (could be a faction enemy, a social law, a secret), and what's at stake if the character fails. Ground it specifically in this character's class, profession, cast, and setting. The background tension ("${sk.tension}") is a secondary thread — weave it in. Write for a GM who needs to run this session tonight: concrete, specific, actionable.

"authorNote": MAX 500 chars. Style directive for AI Dungeon's Author's Note field — injected every AI turn. Terse imperatives. Tailor to this character: literary behavioral prose with elevated register, 1–2 sensory anchors specific to Joseon and this character's station (mulberry paper, ondol heat, silk rustling, specific sounds of their world), honorific atmosphere in all dialogue. No names, no plot.`;
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
    console.error('Failed to parse historical-korea-joseon-dynasty response:', err);
    return null;
  }
}
