// bulk-roll.mjs
// Rolls N skeletons (skipAI: true — no API call) per built-in genre and checks
// two things generically, across every genre, rather than hardcoding one
// genre's business rules:
//
//   1. Basic shape sanity — every skeleton has the fields the app/prompt-
//      builder assume exist (name, profession, stats, etc.), catching a
//      wholesale generation crash or an undefined field regression.
//   2. Profession-restriction consistency — if a rolled tension/secret's OWN
//      table entry declares requiredProfessions or excludedProfessions (the
//      mechanisms added this session specifically to stop a rolled fact from
//      contradicting a character's own profession/caste — see Joseon's
//      shadow_influence tension and royal_blood secret), the actual roll must
//      respect it. This is a regression test for engine.js's filtering logic
//      itself (tensions.js:749-750, secrets.js:764-765) — if a future change
//      breaks that filter, this catches it across every genre that uses the
//      mechanism, not just the one it was written for.
//
// Pure Node: no browser, no dev server, no network — generateCharacter's
// skipAI path is synchronous table selection.

import { generateCharacter } from "../../generator/index.js";
import { GENRE_TABLES, SUPPORTED_GENRES } from "../../generator/registry.js";
import { printReport } from "./helpers.mjs";

const ROLLS_PER_GENRE = 50;

function checkShape(skeleton, label, results) {
  const required = ["name", "age", "gender", "profession", "stats", "mbti"];
  const missing = required.filter((k) => skeleton[k] == null || skeleton[k] === "");
  if (missing.length) {
    results.push({ pass: false, detail: `${label}: missing/empty field(s): ${missing.join(", ")}` });
    return false;
  }
  return true;
}

function checkProfessionRestrictions(skeleton, tables, label, results) {
  let ok = true;
  const tensionId = skeleton._slots?.tension;
  if (tensionId) {
    const entry = tables.TENSIONS.find((t) => t.id === tensionId);
    if (entry?.requiredProfessions && !entry.requiredProfessions.includes(skeleton.profession)) {
      results.push({
        pass: false,
        detail: `${label}: tension "${entry.id}" requires profession in [${entry.requiredProfessions}], but rolled "${skeleton.profession}"`,
      });
      ok = false;
    }
  }
  const secretId = skeleton._slots?.secret;
  if (secretId) {
    const entry = tables.SECRETS.find((s) => s.id === secretId);
    if (entry?.excludedProfessions?.includes(skeleton.profession)) {
      results.push({
        pass: false,
        detail: `${label}: secret "${entry.id}" excludes profession "${skeleton.profession}", but it was rolled anyway`,
      });
      ok = false;
    }
  }
  return ok;
}

export async function run() {
  const results = [];
  let totalRolls = 0;
  let shapeFails = 0;
  let restrictionFails = 0;

  for (const genre of SUPPORTED_GENRES) {
    const tables = GENRE_TABLES[genre];
    for (let i = 0; i < ROLLS_PER_GENRE; i++) {
      const { skeleton } = await generateCharacter({ genre, skipAI: true });
      totalRolls++;
      const label = `${genre} #${i + 1}`;
      if (!checkShape(skeleton, label, results)) shapeFails++;
      if (!checkProfessionRestrictions(skeleton, tables, label, results)) restrictionFails++;
    }
  }

  results.push({
    pass: shapeFails === 0,
    detail: `shape check: ${totalRolls - shapeFails}/${totalRolls} rolls had all required fields`,
  });
  results.push({
    pass: restrictionFails === 0,
    detail: `profession-restriction check: ${totalRolls - restrictionFails}/${totalRolls} rolls respected their tension/secret's requiredProfessions/excludedProfessions`,
  });

  return printReport(`bulk-roll (${ROLLS_PER_GENRE}/genre x ${SUPPORTED_GENRES.length} genres)`, results);
}
