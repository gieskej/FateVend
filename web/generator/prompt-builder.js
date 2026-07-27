// generator/prompt-builder.js
// The single shared prompt builder + response parser for every genre.
//
// Replaces the former two parallel systems: index.html's inline GENRE_VOICE-
// driven buildPrompt (browser) and the per-genre genres/<g>/prompt-template.js
// buildPrompt/parseResponse (CLI/module path). Both now call buildPrompt(sk,
// voice) and parseResponse() from here.
//
// A `voice` object (a GENRE_VOICE entry, or an uploaded pack's voice) supplies
// the genre-specific pieces:
//   identityLabel  — the one word for the identity row ("Race"/"Species"/"Clan"…)
//   genreLabel     — fills the intro "Generate <genreLabel> content…"
//   systemPrompt   — the system prompt (returned by getSystemPrompt elsewhere)
//   outputRules    — (sk) => string | string: the full "OUTPUT RULES" body.
//                    Built-in genres provide a rich, authored one. Uploaded
//                    packs omit it and fall back to a generic body assembled
//                    from openingNote/appearanceNote (see GENERIC_OUTPUT_RULES).
//   openingNote / appearanceNote — only used for the generic fallback (packs).
//                    appearanceNote may itself be a (sk) => string function.
//
// The CHARACTER SKELETON scaffold is intentionally uniform across all genres —
// row labels are cosmetic and no longer vary per genre.
//
// No browser APIs. No Node-specific APIs. Pure JS.

// ── OUTPUT LIMITS (AI Dungeon field limits) ───────────────────────────────
export const LIMITS = {
  characterEntry: 1000,
  title: 70,
  description: 5000,
  opening: 4000,
  appearancePrompt: 500,
  plotEssentials: 2000,
  authorNote: 500,
  npcEntry: 1000,
  tags: 10,
};

export function smartTruncate(text, maxLen) {
  if (!text || text.length <= maxLen) return text;
  const sub = text.slice(0, maxLen);
  if (maxLen >= 200) {
    const sentEnd = Math.max(
      sub.lastIndexOf(". "),
      sub.lastIndexOf("! "),
      sub.lastIndexOf("? "),
      sub.lastIndexOf(".\n"),
      sub.lastIndexOf("!\n"),
      sub.lastIndexOf("?\n"),
    );
    if (sentEnd > maxLen * 0.7) return text.slice(0, sentEnd + 1).trimEnd();
  }
  const wordEnd = sub.lastIndexOf(" ");
  if (wordEnd > maxLen * 0.5) return text.slice(0, wordEnd).trimEnd() + "…";
  return sub.trimEnd() + "…";
}

// ── PROMPT ASSEMBLY ────────────────────────────────────────────────────────

function appearanceParts(sk) {
  return [
    sk.appearance?.build,
    sk.appearance?.hair,
    sk.appearance?.distinguishingFeature,
    ...(sk.appearance?.statNotes ?? []),
  ]
    .filter(Boolean)
    .join("; ");
}

function castLines(sk) {
  return (sk.cast ?? [])
    .map(
      (npc) =>
        `  - ${npc.name} (${npc.role}, ${npc.status}, ${npc.gender}, ${npc.race}, ${npc.mbti}): ${npc.traits.join(", ")}. ${npc.dynamic}`,
    )
    .join("\n");
}

// Stat line — includes the adjective label in parens only when the skeleton
// carries statLabels (the CLI skeleton does; the browser skeleton does not).
function statLine(sk) {
  const l = sk.statLabels;
  const p = (k) => (l && l[k] ? ` (${l[k]})` : "");
  const s = sk.stats;
  return `Stats: STR ${s.strength}${p("strength")} | INT ${s.intelligence}${p("intelligence")} | WIS ${s.wisdom}${p("wisdom")} | CHA ${s.charisma}${p("charisma")} | DEX ${s.dexterity}${p("dexterity")} | CON ${s.constitution}${p("constitution")}`;
}

// The uniform character-skeleton scaffold shared by every genre.
function scaffold(sk, voice) {
  const identityLabel = voice.identityLabel ?? "Identity";
  const markers = (sk.econMarkers ?? sk.economicMarkers ?? []).join("; ");
  return `CHARACTER SKELETON:
Name: ${sk.name}, ${sk.age}, ${sk.gender} (${sk.pronouns})
${identityLabel}: ${sk.ethnicityBroad} — ${sk.ethnicityFlavor}
Orientation: ${sk.orientation}
Relationship status: ${sk.relationshipStatus}
Appearance: ${appearanceParts(sk)}
Quirk: ${sk.quirk}
Profession: ${sk.profession} (${sk.industry}) — feels ${sk.sentiment} about it
${statLine(sk)}
Personality: ${sk.mbti} — ${sk.mbtiLabel}
Economic status: ${sk.economicLabel} — ${markers}
Housing: ${sk.housing} | Transport: ${sk.transport}
Setting: ${sk.cityLabel} — ${sk.cityFlavor}
Formative event: ${sk.lifeEvent}
Plot archetype (PRIMARY STORY): ${sk.plotArchetype} — ${sk.plotArchetypeDesc}
Background tension (secondary): ${sk.tension}
Secret (severity: ${sk.secretSeverity}): ${sk.secret}`;
}

// Generic OUTPUT RULES body for genres/packs that don't author their own.
// Mirrors the former browser-generic buildPrompt so uploaded packs keep their
// exact behavior. `openingNote`/`appearanceNote` come from the voice.
function GENERIC_OUTPUT_RULES(sk, voice) {
  const openingNote =
    voice.openingNote ??
    "Second person. Drop the player into a vivid, specific moment — right now, mid-scene. Sensory detail. End mid-moment with a clear next decision.";
  const appearanceRaw = voice.appearanceNote;
  const appearanceNote =
    typeof appearanceRaw === "function"
      ? appearanceRaw(sk)
      : (appearanceRaw ??
        'Comma-separated visual descriptors for a text-to-image model. Start with "portrait of" then describe the subject. No sentences — descriptors only.');
  return `"characterEntry": MAX 1000 chars. Open with one sentence: "[Full name] is a [age]-year-old [orientation] [gender] [race/species] with [hair length] [hair color] [hair style], [eye color] eyes, [skin tone] skin[, and any jewelry/piercings/tattoos/scars if notable], wearing [outfit suited to their occupation and background]." Then describe personality, quirks, habits, occupation, and relationships with family and key cast members by name. Do not repeat the situation, conflict, or plot already covered in the description, opening, or plot essentials.

"npcEntries": An object where every key is an NPC name and every value is a PLAIN STRING (not a nested object). Each string MAX 1000 chars. Open with one sentence: "[Full name] is a [age]-year-old [orientation] [gender] [race/species] with [hair length] [hair color] [hair style], [eye color] eyes, [skin tone] skin[, and any jewelry/piercings/tattoos/scars if notable], wearing [outfit suited to their occupation and background]." Then describe personality, quirks, habits, occupation, and their relationship with the protagonist and others by name. Do not repeat the situation or plot.

"title": MAX 70 chars. Hook the player. Specific, evocative. Can be darkly funny if it fits.

"description": MAX 5000 chars. Second person ("You are..."). Set the scene: who the player is, what their world feels like, what's at stake. Weave in 2–3 cast members. Hint at the tension and secret without stating them plainly. End with something that makes the player want to begin.

"tags": Array of 8–10 lowercase strings. Genre-appropriate.

"opening": MAX 4000 chars. ${openingNote}

"appearancePrompt": MAX 500 chars. ${appearanceNote}

"plotEssentials": MAX 2000 chars. Using "${sk.plotArchetype}" as the primary story engine, write the plot overview for this scenario tailored to this specific character. Cover: what triggers the story (the inciting incident), the central objective, the main obstacle or antagonist, and what's at stake if the character fails. Ground it specifically in this character's skills, cast, and setting. The background tension ("${sk.tension}") is a secondary thread — weave it in but don't let it dominate. Write for a GM who needs to run this session tonight: concrete, specific, actionable.

"authorNote": MAX 500 chars. Style directive for AI Dungeon's Author's Note field — injected into every AI turn to shape the game's prose. Terse imperatives tailored to this specific character and setting. Include prose style, 1–2 sensory anchors from their specific world, and the emotional/genre register. No character names, no plot details.`;
}

/**
 * Builds the user prompt from a resolved skeleton and a genre voice.
 * @param {object} sk     CharacterSkeleton
 * @param {object} voice  a GENRE_VOICE entry or an uploaded pack's voice
 * @returns {string}
 */
export function buildPrompt(sk, voice = {}) {
  const genreLabel = voice.genreLabel ?? "AI Dungeon";
  const rules =
    voice.outputRules != null
      ? typeof voice.outputRules === "function"
        ? voice.outputRules(sk)
        : voice.outputRules
      : GENERIC_OUTPUT_RULES(sk, voice);

  return `Generate ${genreLabel} content for this character. Return a single JSON object with these exact keys:
"characterEntry", "npcEntries", "title", "description", "tags", "opening", "appearancePrompt", "plotEssentials", "authorNote"

${scaffold(sk, voice)}

SUPPORTING CAST:
${castLines(sk)}

OUTPUT RULES:

${rules}`;
}

// ── RESPONSE PARSING ───────────────────────────────────────────────────────

function extractJSON(raw) {
  const fence = raw.match(/```(?:json)?\s*([\s\S]*?)```/i);
  if (fence) return fence[1].trim();
  const start = raw.indexOf("{");
  const end = raw.lastIndexOf("}");
  if (start !== -1 && end > start) return raw.slice(start, end + 1);
  return raw.trim();
}

// Gemini sometimes returns { entry, description, bio, text, … } for an NPC
// instead of a plain string; coerce it back to a string.
function coerceEntryString(v) {
  if (typeof v === "string") return v;
  if (typeof v !== "object" || v === null) return String(v);
  for (const key of [
    "entry",
    "description",
    "bio",
    "text",
    "content",
    "characterEntry",
  ]) {
    if (typeof v[key] === "string" && v[key].length > 10) return v[key];
  }
  return (
    Object.values(v)
      .filter((x) => typeof x === "string")
      .join(" ")
      .trim() || JSON.stringify(v)
  );
}

/**
 * Parses a raw model response into the output field object. Does NOT truncate —
 * callers apply enforceOutputLimits(). Returns null on unparseable input.
 */
export function parseResponse(raw) {
  try {
    const p = JSON.parse(extractJSON(raw));
    if (typeof p !== "object" || p === null)
      throw new Error("parsed value is not an object");
    const npcEntries = {};
    for (const [k, v] of Object.entries(p.npcEntries ?? {}))
      npcEntries[k] = coerceEntryString(v);
    return {
      characterEntry: p.characterEntry ?? "",
      npcEntries,
      title: p.title ?? "",
      description: p.description ?? "",
      tags: p.tags ?? [],
      opening: p.opening ?? "",
      appearancePrompt: p.appearancePrompt ?? "",
      plotEssentials: p.plotEssentials ?? "",
      authorNote: p.authorNote ?? "",
    };
  } catch (e) {
    console.error(
      "parseResponse failed:",
      e.message,
      "\nRaw:",
      raw?.slice(0, 300),
    );
    return null;
  }
}

/** Truncates every output field to its AI Dungeon limit. */
export function enforceOutputLimits(output) {
  if (!output) return output;
  const npcEntries = {};
  for (const [k, v] of Object.entries(output.npcEntries ?? {})) {
    npcEntries[k] = smartTruncate(String(v), LIMITS.npcEntry);
  }
  return {
    ...output,
    characterEntry: smartTruncate(output.characterEntry, LIMITS.characterEntry),
    title: smartTruncate(output.title, LIMITS.title),
    description: smartTruncate(output.description, LIMITS.description),
    opening: smartTruncate(output.opening, LIMITS.opening),
    appearancePrompt: smartTruncate(
      output.appearancePrompt,
      LIMITS.appearancePrompt,
    ),
    plotEssentials: smartTruncate(output.plotEssentials, LIMITS.plotEssentials),
    authorNote: smartTruncate(output.authorNote, LIMITS.authorNote),
    tags: (output.tags ?? []).slice(0, LIMITS.tags),
    npcEntries,
  };
}
