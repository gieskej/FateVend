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
  const missing = required.filter(
    (k) => skeleton[k] == null || skeleton[k] === "",
  );
  if (missing.length) {
    results.push({
      pass: false,
      detail: `${label}: missing/empty field(s): ${missing.join(", ")}`,
    });
    return false;
  }
  return true;
}

// A broad race is "ambiguous" if the genre defines at least one concrete
// sub-race under it whose label differs from the broad itself (e.g. Android ->
// "Combat Android", Alien -> "Slug alien"). Clone/Mutant/Human-in-some-genres
// are NOT ambiguous — their single form's label equals the broad, so a cast
// member carrying that value is already as concrete as the data gets.
function ambiguousBroads(tables) {
  const set = new Set();
  for (const r of tables.RACES_OR_ETHNICITIES) {
    const concrete = r.flavor.split(" — ")[0].trim();
    if (concrete !== r.broad) set.add(r.broad);
  }
  return set;
}

// Cast members must carry a concrete race, never a bare ambiguous broad — a
// broad "Android"/"Alien" leaves the LLM to invent sub-race details that then
// contradict the rest of the story (the bug this checks for).
function checkCastRaceConcreteness(skeleton, ambiguous, label, results) {
  const offenders = (skeleton.cast ?? [])
    .filter((npc) => ambiguous.has(npc.race))
    .map((npc) => `${npc.role}="${npc.race}"`);
  if (offenders.length) {
    results.push({
      pass: false,
      detail: `${label}: cast member(s) got a bare ambiguous broad race: ${offenders.join(", ")}`,
    });
    return false;
  }
  return true;
}

// Every cast member needs the fields the prompt/UI read off them: an MBTI type
// (a personality anchor for the LLM), a non-empty traits list, and role/race.
const MBTI_RE = /^[EI][NS][TF][JP]$/;
function checkCastMemberShape(skeleton, label, results) {
  const bad = (skeleton.cast ?? []).filter(
    (npc) =>
      !MBTI_RE.test(npc.mbti ?? "") ||
      !Array.isArray(npc.traits) ||
      npc.traits.length === 0 ||
      !npc.role ||
      !npc.race,
  );
  if (bad.length) {
    results.push({
      pass: false,
      detail: `${label}: ${bad.length} cast member(s) missing mbti/traits/role/race (e.g. ${bad[0].name}: mbti=${bad[0].mbti})`,
    });
    return false;
  }
  return true;
}

// Several genres write parent statuses in gendered terms ("salaryman father,
// home late every night", "Mother runs the inner household"), tagged with
// forRole. A status must only ever land on the parent it describes — otherwise
// a father ends up "mother working long hours, supportive but stretched thin".
function checkParentStatusGender(skeleton, tables, label, results) {
  const roleByLabel = new Map(
    (tables.PARENT_STATUSES ?? [])
      .filter((s) => s.forRole)
      .map((s) => [s.label, s.forRole]),
  );
  if (!roleByLabel.size) return true;
  const bad = (skeleton.cast ?? [])
    .filter((c) => c.role === "mother" || c.role === "father")
    .filter((c) => {
      const want = roleByLabel.get(c.status);
      return want && want !== c.role;
    });
  if (bad.length) {
    results.push({
      pass: false,
      detail: `${label}: ${bad[0].role} got a ${roleByLabel.get(bad[0].status)}-only status — "${bad[0].status}"`,
    });
    return false;
  }
  return true;
}

// A "one parent deceased/absent" family structure must actually produce that
// parent. This silently did nothing for a long time: buildCast passed the
// singled-out parent as structure._r but compared it against `role` (always
// "mother"/"father"), so the branch never fired and both parents came back
// alive and present.
const DECEASED_TEXT = /died|deceased|killed|fallen|lost in/i;
const ABSENT_TEXT =
  /absent|estranged|never knew|no contact|has not been in contact/i;
function checkSingledOutParent(skeleton, label, results) {
  const fam = skeleton._slots?.family;
  if (fam !== "two_parent_one_deceased" && fam !== "two_parent_one_absent")
    return true;
  const parents = (skeleton.cast ?? []).filter(
    (c) => c.role === "mother" || c.role === "father",
  );
  if (parents.length < 2) return true;
  const wantDeceased = fam === "two_parent_one_deceased";
  const hit = parents.some((p) =>
    wantDeceased
      ? DECEASED_TEXT.test(p.status) && !/not deceased/i.test(p.status)
      : ABSENT_TEXT.test(p.status),
  );
  if (!hit) {
    results.push({
      pass: false,
      detail: `${label}: family is "${fam}" but neither parent is ${wantDeceased ? "deceased" : "absent"} — got ${parents.map((p) => `${p.role}: "${p.status}"`).join(", ")}`,
    });
    return false;
  }
  return true;
}

function checkProfessionRestrictions(skeleton, tables, label, results) {
  let ok = true;
  const tensionId = skeleton._slots?.tension;
  if (tensionId) {
    const entry = tables.TENSIONS.find((t) => t.id === tensionId);
    if (
      entry?.requiredProfessions &&
      !entry.requiredProfessions.includes(skeleton.profession)
    ) {
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
  let castRaceFails = 0;
  let castShapeFails = 0;
  let parentGenderFails = 0;
  let singledParentFails = 0;

  for (const genre of SUPPORTED_GENRES) {
    const tables = GENRE_TABLES[genre];
    const ambiguous = ambiguousBroads(tables);
    for (let i = 0; i < ROLLS_PER_GENRE; i++) {
      const { skeleton } = await generateCharacter({ genre, skipAI: true });
      totalRolls++;
      const label = `${genre} #${i + 1}`;
      if (!checkShape(skeleton, label, results)) shapeFails++;
      if (!checkProfessionRestrictions(skeleton, tables, label, results))
        restrictionFails++;
      if (!checkCastRaceConcreteness(skeleton, ambiguous, label, results))
        castRaceFails++;
      if (!checkCastMemberShape(skeleton, label, results)) castShapeFails++;
      if (!checkParentStatusGender(skeleton, tables, label, results))
        parentGenderFails++;
      if (!checkSingledOutParent(skeleton, label, results))
        singledParentFails++;
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
  results.push({
    pass: castRaceFails === 0,
    detail: `cast-race concreteness: ${totalRolls - castRaceFails}/${totalRolls} rolls gave every cast member a concrete (non-ambiguous-broad) race`,
  });
  results.push({
    pass: castShapeFails === 0,
    detail: `cast-member shape: ${totalRolls - castShapeFails}/${totalRolls} rolls gave every cast member a valid mbti + traits + role + race`,
  });
  results.push({
    pass: parentGenderFails === 0,
    detail: `parent-status gender: ${totalRolls - parentGenderFails}/${totalRolls} rolls kept forRole-tagged statuses on the parent they describe`,
  });
  results.push({
    pass: singledParentFails === 0,
    detail: `singled-out parent: ${totalRolls - singledParentFails}/${totalRolls} rolls honored "one parent deceased/absent" family structures`,
  });

  return printReport(
    `bulk-roll (${ROLLS_PER_GENRE}/genre x ${SUPPORTED_GENRES.length} genres)`,
    results,
  );
}
