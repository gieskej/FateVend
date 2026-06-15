// genres/manga-osaka-highschool1987/prompt-template.js

export const SYSTEM_PROMPT = `You are a creative writer generating AI Dungeon content for a manga-style high school RPG set in Osaka, Japan, 1987.
Your output must be vivid, emotionally charged, and immediately playable as a scenario.

TONE — this is critical:
This is shounen and shoujo manga territory. Big feelings. Dramatic pauses. Rain at the worst possible moment.
Characters should feel like they are the protagonist of their own manga — even the background characters.
The emotional register is high: first loves feel world-ending, rivalries feel cosmic, club losses feel like grief.
But ground it in specificity: the smell of canned Boss coffee and vending machine oden, the weight of a baseball bat callus, the specific embarrassment of slipping into Osaka-ben mid-confession.
Dark material is permitted but never gratuitous — even the yankii should feel like they have a code.
Every character should have a moment that makes the reader lean forward.

SETTING RULES — 1987 Osaka:
- Japan's bubble economy is heating up — money is visible, optimism is real, fashion is getting louder
- High school culture: sailor fuku and gakuran uniforms, strict clubs, school festivals (bunkasai), entrance exam obsession
- Technology: cassette walkmans (Sony Walkman WM-2), CRT televisions, corded telephones, no internet
- Music: Boøwy, THE BLUE HEARTS, Yumi Matsutoya, Southern All Stars, Yellow Magic Orchestra
- Manga and anime of the era: Dragon Ball, City Hunter, Touch, Maison Ikkoku, Kimagure Orange Road
- Yankii subculture: pompadours (Reagan), sukajan jackets, custom bicycles, territory — respect is everything
- Osaka identity: Kansai dialect under the standard Japanese surface; tachikiri (standing cut) humor; merchant culture pride
- Locations: Dotonbori neon, Shinsaibashi boutiques, Den Den Town electronics, school rooftops, batting cages, kissaten
- University entrance exams (juken) are the defining social pressure for third-years

STYLE:
- Behavioral prose — show character through action, dialogue rhythm, and small physical details
- Manga visual language is welcome: describe what a panel would show
- Never mention stat numbers
- Osaka-ben touches are welcome but keep them legible: dropped sou (そう), occasional jan (じゃん), -hen (〜へん) negatives
- Sensory specificity: the squeak of rubber soles on gym floor, the smell of chalk dust and exhaust, the weight of a school bag
- Sentence fragments for emphasis — manga style, not sloppy
- Stay within the exact character limits given

Output only the JSON structure requested. No preamble, no commentary, no markdown fences.`;

/**
 * @param {object} sk  CharacterSkeleton
 * @returns {string}
 */
export function buildPrompt(sk) {
  const castLines = sk.cast
    .map(npc =>
      `  - ${npc.name} (${npc.role}, ${npc.status}, ${npc.gender}): ${npc.traits.join(', ')}. ${npc.dynamic}`
    )
    .join('\n');

  const appearanceParts = [
    sk.appearance.build,
    sk.appearance.hair,
    sk.appearance.distinguishingFeature,
    ...(sk.appearance.statNotes ?? []),
  ].filter(Boolean).join('; ');

  return `Generate AI Dungeon manga Osaka high school 1987 content for this character. Return a single JSON object with these exact keys:
"characterEntry", "npcEntries", "title", "description", "tags", "opening", "appearancePrompt", "plotEssentials"

CHARACTER SKELETON:
Name: ${sk.name}, ${sk.age}, ${sk.gender} (${sk.pronouns})
Archetype: ${sk.ethnicityBroad}
Background: ${sk.ethnicityFlavor}
Orientation: ${sk.orientation}
Relationship status: ${sk.relationshipStatus}
Appearance: ${appearanceParts}
Quirk: ${sk.quirk}
Role: ${sk.profession} (${sk.industry}) — feels ${sk.sentiment} about it
Stats: STR ${sk.stats.strength} (${sk.statLabels.strength}) | INT ${sk.stats.intelligence} (${sk.statLabels.intelligence}) | WIS ${sk.stats.wisdom} (${sk.statLabels.wisdom}) | CHA ${sk.stats.charisma} (${sk.statLabels.charisma}) | DEX ${sk.stats.dexterity} (${sk.statLabels.dexterity}) | CON ${sk.stats.constitution} (${sk.statLabels.constitution})
Personality: ${sk.mbti} — ${sk.mbtiLabel}
Social standing: ${sk.economicLabel}
Home life: ${sk.housing} | Getting around: ${sk.transport}
Setting: ${sk.cityLabel} — ${sk.cityFlavor}
Formative event: ${sk.lifeEvent}
Plot archetype (PRIMARY STORY): ${sk.plotArchetype} — ${sk.plotArchetypeDesc}
Background tension (secondary): ${sk.tension}
Secret (severity: ${sk.secretSeverity}): ${sk.secret}

SUPPORTING CAST:
${castLines}

OUTPUT RULES:

"characterEntry": MAX 1000 chars. Terse behavioral prose. Lead with name, year (first/second/third year), archetype. Use sentence fragments. Weave in the archetype background and physical presence through behavior — show don't state. Ground in 1987 Osaka specifics: the sound of a walkman leaking Boøwy, the weight of a club bag, the particular quality of afternoon light through a school window. Reference key cast members by name. End on something that creates forward momentum. Make the reader want to be this person, at least for one school day.

"npcEntries": An object where every key is an NPC name and every value is a PLAIN STRING (not a nested object). Each string ~1000 chars — use the full length. Open with physical presence: how they look in uniform, how they carry themselves in the hallway. Then personality through behavior — how they speak, their tells, what gives them away. Reference the protagonist by name and show the relationship in action. These people should feel like the supporting cast of a real manga.

"title": MAX 70 chars. Hook the player. Specific, evocative, grounded in the setting. Can be a manga chapter title style.

"description": MAX 5000 chars. Second person ("You are..."). Set the scene: who the player is, what their school life feels like day to day, what's at stake. Weave in 2–3 cast members. Hint at the tension and secret without stating them directly. Ground it in 1987 Osaka — the physical reality of school in bubble-era Japan. End with a pull that makes the player want to begin.

"tags": Array of 8–10 lowercase strings. E.g. ["manga", "osaka", "1987", "highschool", "romance", "yankii"].

"opening": MAX 4000 chars. Second person. Drop the player into a specific moment — right now, mid-scene at school or somewhere in Osaka. Something is happening or about to happen. Sensory detail: shoe locker smell, gym floor squeak, Dotonbori neon, Boss coffee can warmth in a cold hand. End mid-moment with a clear choice or action available. No backstory. No summaries.

"appearancePrompt": MAX 500 chars. Comma-separated visual descriptors for a text-to-image model. Start with "portrait of" then: Japanese high school student, school archetype, age range, gender, uniform description, hair style, eyes, distinguishing feature if any, setting detail (classroom, rooftop, street). Include "face of [a Japanese actor, musician, or media personality from the 1980s whose gender and approximate age match this character]". Close with: 1980s manga illustration style, dramatic ink lines, high contrast. No sentences — descriptors only.

"plotEssentials": MAX 2000 chars. Using "${sk.plotArchetype}" as the primary story engine, write the plot overview for this Osaka high school 1987 scenario. Cover: what triggers the story (the inciting incident), the central objective, the main obstacle (a rival, an authority figure, a deadline, a truth), and what's at stake if the character fails. Ground it in this character's role, the school setting, and 1987 Osaka. The background tension ("${sk.tension}") is a secondary thread — weave it in. Write for a GM who needs to run this session tonight: concrete, specific, actionable.`;
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
    };
  } catch (err) {
    console.error('Failed to parse manga-osaka-highschool1987 response:', err);
    return null;
  }
}
