// generator/engine.js
// The single character-generation engine — selectors, stat rolling, MBTI, the
// supporting cast, and the full skeleton. Used by BOTH the browser app
// (web/index.html) and the Node CLI/module path (generator/index.js). It is the
// source of truth for how a character is rolled.
//
// buildSkeleton takes an `options` object ({ includeLGBQ, includeNSFW | nsfw,
// prefGender, prefOrientation }) rather than reading the DOM, so the module has
// no browser dependency; index.html reads its checkboxes and passes them at the
// call site, while the CLI passes { nsfw }.
//
// (This replaced the former parallel generator/skeleton-builder.js +
// cast-builder.js + selector.js + roller.js CLI implementation, which had
// silently diverged — e.g. its NPC gender roll ignored the LGBQ toggle. Those
// files are gone; everything now points here.)
//
// No browser APIs. Pure JS + the shared UI data tables.

import {
  MBTI_TYPES,
  NPC_TRAITS,
  FRIEND_DYNAMICS,
  PARENT_DYNAMICS_ALIVE,
  FOIL_ROLES,
} from "./ui-data.js";
import { buildStatLabels } from "./stat-adjectives.js";

// ── Selectors ────────────────────────────────────────────────────────────
export function uniformPick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}
export function uniformPickN(arr, n) {
  return [...arr]
    .sort(() => Math.random() - 0.5)
    .slice(0, Math.min(n, arr.length));
}
export function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function weightedPick(arr) {
  const total = arr.reduce((s, i) => s + (i.weight ?? 1), 0);
  let r = Math.random() * total;
  for (const item of arr) {
    r -= item.weight ?? 1;
    if (r <= 0) return item;
  }
  return arr[arr.length - 1];
}

export function effectiveWeight(item, stats, base = 10) {
  const aff = item.statAffinity ?? {};
  let m = 1;
  for (const [stat, factor] of Object.entries(aff)) {
    if (stats[stat] !== undefined) m *= 1 + (factor - 1) * (stats[stat] / 100);
  }
  return Math.max(0.1, (item.weight ?? base) * m);
}

export function statWeightedPick(arr, stats) {
  const w = arr.map((i) => ({ item: i, weight: effectiveWeight(i, stats) }));
  const total = w.reduce((s, x) => s + x.weight, 0);
  let r = Math.random() * total;
  for (const { item, weight } of w) {
    r -= weight;
    if (r <= 0) return item;
  }
  return w[w.length - 1].item;
}

export function statAndWeightPick(arr, stats) {
  const w = arr.map((i) => ({
    item: i,
    weight: effectiveWeight(i, stats, i.weight ?? 10),
  }));
  const total = w.reduce((s, x) => s + x.weight, 0);
  let r = Math.random() * total;
  for (const { item, weight } of w) {
    r -= weight;
    if (r <= 0) return item;
  }
  return w[w.length - 1].item;
}

// Excludes entries whose optional `excludedBroad` list contains this
// character's race — e.g. a secret about secretly being an android doesn't
// fit a race already established as Android, a tension about a biological
// body rejecting an implant doesn't fit one with no biological body, a life
// event about passing an exam doesn't fit a caste legally barred from
// sitting it, and a family structure implying a hereditary caste doesn't fit
// a character of a different one. Used for tensions, secrets, life events,
// and family structures. Falls back to the full array if excluding would
// leave nothing.
export function excludeByBroad(arr, broad) {
  const filtered = arr.filter((item) => !item.excludedBroad?.includes(broad));
  return filtered.length > 0 ? filtered : arr;
}

// ── Stat rolling ─────────────────────────────────────────────────────────
function rollStat() {
  const u1 = Math.random() || 1e-10;
  const u2 = Math.random();
  const z = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
  return Math.min(100, Math.max(1, Math.round(50 + 15 * z)));
}
export function rollStats() {
  return {
    strength: rollStat(),
    intelligence: rollStat(),
    wisdom: rollStat(),
    charisma: rollStat(),
    dexterity: rollStat(),
    constitution: rollStat(),
  };
}

// ── MBTI ─────────────────────────────────────────────────────────────────
function norm(v, min, max) {
  return Math.min(1, Math.max(0, (v - min) / (max - min)));
}
function decide(p) {
  return Math.random() < p;
}

export function assignMBTI(s) {
  const isE = decide(
    norm(
      (s.charisma + s.strength) / 2 - (s.wisdom + s.intelligence) / 2 + 50,
      0,
      100,
    ),
  );
  const isN = decide(
    norm(
      (s.intelligence + s.wisdom) / 2 - (s.constitution + s.strength) / 2 + 50,
      0,
      100,
    ),
  );
  const isT = decide(
    norm((s.intelligence + s.wisdom) / 2 - s.charisma + 50, 0, 100),
  );
  const isJ = decide(
    norm(
      (s.wisdom + s.constitution) / 2 - (s.charisma + s.dexterity) / 2 + 50,
      0,
      100,
    ),
  );
  const typeStr = `${isE ? "E" : "I"}${isN ? "N" : "S"}${isT ? "T" : "F"}${isJ ? "J" : "P"}`;
  return MBTI_TYPES.find((m) => m.type === typeStr) ?? MBTI_TYPES[0];
}

// ── Appearance stat notes ──────────────────────────────────────────────────
const CON_APPEARANCE_NOTES = [
  "chronically run-down look",
  "looks worn, running on less",
  "",
  "healthy, clear-eyed",
  "visibly robust, built to last",
];
const CHA_APPEARANCE_NOTES = [
  "unkempt, indifferent to appearances",
  "rough-edged",
  "",
  "well-groomed, easy confidence",
  "striking — the room notices",
];

// STR is represented by the build label — a separate note would risk contradicting it.
function appearanceStatNotes(stats) {
  const t = (v) => Math.min(4, Math.floor((v - 1) / 20));
  return [
    CON_APPEARANCE_NOTES[t(stats.constitution)],
    CHA_APPEARANCE_NOTES[t(stats.charisma)],
  ].filter(Boolean);
}

// ── Cast builder ─────────────────────────────────────────────────────────
const SIBLING_MAP = {
  protective_older: (n) =>
    `Stepped up for ${n} when no one else did — a habit they haven't broken`,
  rivalry: (n) =>
    `The competition with ${n} started in childhood and technically never stopped`,
  estranged: (n) =>
    `${n} and them haven't spoken in years. The reason is known. Unremarked upon.`,
  close_ally: (n) =>
    `The one person ${n} tells everything to, including the parts they shouldn't`,
  troubled: (n) =>
    `${n} is the "stable" one in this equation, which is its own kind of funny`,
  golden_child: (n) =>
    `The family benchmark — ${n} has spent years being measured against them without consent`,
  lost_touch: (n) =>
    `They were close once. Drifted. ${n} still occasionally drafts messages and doesn't send them`,
  deceased: (n) =>
    `Gone — and ${n} still sometimes forgets, for a moment, before remembering again`,
  younger_dependent: (n) =>
    `Looks to ${n} for stability ${n} is largely improvising`,
  reconnecting: (n) =>
    `Back in ${n}'s life after years away, both pretending it wasn't that long`,
};

function fillD(t, n) {
  return t.replace(/\{n\}/g, n);
}
function pickTraits(n) {
  return uniformPickN(NPC_TRAITS, n);
}

const PARTNER_ROLE = {
  dating: "partner",
  engaged: "fiancé(e)",
  married: "spouse",
  separated: "separated spouse",
  divorced: "ex-spouse",
  widowed: "late spouse",
  complicated: "complicated relationship",
};
const PARTNER_STATUS = {
  dating: "present — dating",
  engaged: "present — engaged",
  married: "present — married",
  separated: "separated — still legally married",
  divorced: "divorced",
  widowed: "deceased",
  complicated: "present — status unclear",
};
const PARTNER_DYNAMICS = {
  dating: [
    "Things are good — probably. {n} keeps waiting for the catch.",
    "More serious than {n} is ready to admit, even to themselves",
    "The person {n} is currently trying to be good for, with mixed success",
    "They met at the worst possible moment. Still here.",
  ],
  engaged: [
    "The wedding is set. {n} has feelings about this they are actively not examining.",
    "Has rearranged their entire sense of the future to include {n}",
    "The person who knows exactly what they're getting into — and said yes anyway",
    "{n} proposed impulsively and has since become quietly convinced it was the right call",
  ],
  married: [
    "Knows exactly when {n} is lying — and which lies are worth calling out",
    "Has built something real with {n}, one argument and one quiet evening at a time",
    "The person who still surprises {n}, after everything",
    'The marriage is good. The current situation is putting pressure on "good".',
    "Has covered for {n} more times than {n} remembers — and fewer than they do",
  ],
  separated: [
    'Still technically {n}\'s spouse. The "technically" is doing a lot of work there.',
    "It hasn't been filed yet. {n} keeps telling themselves it's just not the right moment.",
    "Lives separately now. Still shows up in {n}'s life in ways that complicate everything.",
  ],
  divorced: [
    "They're civil. It took a while to get here.",
    "The split was {n}'s fault, their fault, nobody's fault — depends who you ask.",
    "Back in {n}'s orbit in a professional context, which is either fine or a disaster.",
    "{n} ran into them recently. Stranger than expected. Still not sure what to make of it.",
  ],
  widowed: [
    "{n} still reaches for their phone to send them something, before remembering.",
    "The grief is old enough that {n} can function. That's the word they use: function.",
    "Would have known exactly what to say about the current situation. {n} thinks about that constantly.",
    "The chair is still where they left it. {n} hasn't moved it.",
  ],
  complicated: [
    '"Complicated" does not fully capture the texture of what this actually is.',
    "Both of them agree on nothing — including whether this is a relationship.",
    "{n} would not call it healthy. {n} would also not call it finished.",
    "They have history. The history has opinions about the present.",
  ],
};
const PARTNER_HAS_NPC = new Set([
  "dating",
  "engaged",
  "married",
  "separated",
  "divorced",
  "widowed",
  "complicated",
]);

export function buildCast(
  protName,
  protLast,
  ethnicityBroad,
  familyStructure,
  tables,
  protagonistGenderId,
  protagonistOrientation,
  relStatusId,
  includeLGBQ = true,
) {
  const namePools = tables.NAME_POOLS;
  const SIBLING_DYN = tables.SIBLING_DYNAMICS;
  const PARENT_STAT = tables.PARENT_STATUSES;
  const cast = [];
  const MAX = 6;
  const pc = familyStructure.parentCount ?? 0;

  const usedFirstNames = new Set([protName.split(" ")[0]]);
  function uniqueFirst(genderId, pool) {
    for (let i = 0; i < 15; i++) {
      const fn = pickFirst(genderId, pool);
      if (!usedFirstNames.has(fn)) {
        usedFirstNames.add(fn);
        return fn;
      }
    }
    const fn = pickFirst(genderId, pool);
    usedFirstNames.add(fn);
    return fn;
  }

  function _parentName(isMother) {
    const pool = namePools[ethnicityBroad] ?? namePools["default"];
    return uniqueFirst(isMother ? "woman" : "man", pool);
  }
  function _buildParent(role, structure) {
    let status;
    const id = structure.id;
    if (id === "two_parent_one_deceased") {
      status =
        role === "deceased"
          ? uniformPick(PARENT_STAT.filter((s) => s.id.startsWith("deceased")))
          : uniformPick(
              PARENT_STAT.filter(
                (s) =>
                  !s.id.startsWith("deceased") && s.id !== "absent_unknown",
              ),
            );
    } else if (id === "two_parent_one_absent") {
      status =
        role === "absent"
          ? uniformPick(
              PARENT_STAT.filter(
                (s) => s.id === "absent_unknown" || s.id === "estranged",
              ),
            )
          : uniformPick(
              PARENT_STAT.filter(
                (s) =>
                  !s.id.startsWith("deceased") && s.id !== "absent_unknown",
              ),
            );
    } else if (
      [
        "foster_care",
        "orphaned_early",
        "raised_by_grandparents",
        "raised_by_older_sibling",
        "temple_raised",
        "guild_raised",
        "war_orphan",
      ].includes(id)
    ) {
      status = uniformPick(
        PARENT_STAT.filter(
          (s) =>
            s.id.startsWith("deceased") ||
            s.id === "absent_unknown" ||
            s.id === "estranged" ||
            s.id === "missing",
        ),
      );
    } else {
      status = uniformPick(PARENT_STAT);
    }
    const isDeceased =
      status.id.startsWith("deceased") || status.id === "missing";
    const isAbsent = status.id === "absent_unknown";
    const isDivorced = id === "two_parent_divorced";
    const isMother = role === "mother";
    const useDiffLast =
      isAbsent || (isDivorced && isMother && Math.random() < 0.5);
    const lastName = useDiffLast
      ? altLastName(protLast, ethnicityBroad, namePools)
      : protLast;
    const firstName = _parentName(isMother);
    const dynamic = isDeceased
      ? `${protName} still catches themselves thinking "I should call" before remembering`
      : fillD(uniformPick(PARENT_DYNAMICS_ALIVE), protName);
    return {
      name: `${firstName} ${lastName}`,
      role: isMother ? "mother" : "father",
      status: status.label,
      gender: isMother ? "Female" : "Male",
      race: ethnicityBroad,
      traits: pickTraits(2),
      dynamic,
    };
  }

  if (pc === 2) {
    const isOneDeceased = familyStructure.id === "two_parent_one_deceased";
    const isOneAbsent = familyStructure.id === "two_parent_one_absent";
    const mRole = isOneDeceased
      ? Math.random() < 0.5
        ? "deceased"
        : "surviving"
      : isOneAbsent
        ? Math.random() < 0.5
          ? "absent"
          : "present"
        : "present";
    const fRole = isOneDeceased
      ? mRole === "deceased"
        ? "surviving"
        : "deceased"
      : isOneAbsent
        ? mRole === "absent"
          ? "present"
          : "absent"
        : "present";
    cast.push(_buildParent("mother", { ...familyStructure, _r: mRole }));
    cast.push(_buildParent("father", { ...familyStructure, _r: fRole }));
  } else if (pc === 1) {
    const g =
      familyStructure.parentGender ??
      (Math.random() < 0.5 ? "mother" : "father");
    cast.push(_buildParent(g, familyStructure));
  }

  // ── PARTNER ────────────────────────────────────────────────────────────
  if (relStatusId && PARTNER_HAS_NPC.has(relStatusId) && cast.length < MAX) {
    const pGid = loveInterestGenderId(
      protagonistGenderId,
      protagonistOrientation,
    );
    const pPool = namePools[ethnicityBroad] ?? namePools["default"];
    const pFirst = uniqueFirst(pGid, pPool);
    const lastOpts = pPool.last.filter((n) => n !== protLast);
    const pLast = uniformPick(lastOpts.length ? lastOpts : pPool.last);
    const pDyns = PARTNER_DYNAMICS[relStatusId] ?? PARTNER_DYNAMICS.complicated;
    cast.push({
      name: `${pFirst} ${pLast}`,
      role: PARTNER_ROLE[relStatusId] ?? "partner",
      status: PARTNER_STATUS[relStatusId] ?? "present",
      gender: GENDER_LABELS[pGid],
      race: ethnicityBroad,
      traits: pickTraits(3),
      dynamic: fillD(uniformPick(pDyns), protName),
    });
  }

  const [minS, maxS] = familyStructure.siblingCount ?? [0, 0];
  const sibSlots = Math.min(randomInt(minS, maxS), 2, MAX - cast.length - 2);
  for (let i = 0; i < sibSlots; i++) {
    const dyn = uniformPick(SIBLING_DYN);
    const genderId = Math.random() < 0.5 ? "man" : "woman";
    const pool = namePools[ethnicityBroad] ?? namePools["default"];
    const firstName = uniqueFirst(genderId, pool);
    const isOlder = ["protective_older", "golden_child"].includes(dyn.id);
    const isYounger = dyn.id === "younger_dependent";
    cast.push({
      name: `${firstName} ${protLast}`,
      role: isOlder
        ? "older sibling"
        : isYounger
          ? "younger sibling"
          : "sibling",
      status: dyn.id === "deceased" ? "deceased" : dyn.label,
      gender: GENDER_LABELS[genderId],
      race: ethnicityBroad,
      traits: pickTraits(2),
      dynamic: (
        SIBLING_MAP[dyn.id] ??
        ((n) => `Part of ${n}'s story in ways that are hard to untangle`)
      )(protName),
    });
  }

  const friendSlots = Math.min(randomInt(1, 2), MAX - cast.length - 1);
  for (let i = 0; i < friendSlots; i++) {
    const fGid = neutralGenderId(includeLGBQ);
    const fBroad = randomBroadFrom(namePools);
    const fPool = namePools[fBroad] ?? namePools["default"];
    const fName = `${uniqueFirst(fGid, fPool)} ${uniformPick(fPool.last)}`;
    cast.push({
      name: fName,
      role: "best friend",
      status: "present and close",
      gender: GENDER_LABELS[fGid],
      race: fBroad,
      traits: pickTraits(3),
      dynamic: fillD(uniformPick(FRIEND_DYNAMICS), protName),
    });
  }

  if (cast.length < MAX) {
    const hasPartner = relStatusId && PARTNER_HAS_NPC.has(relStatusId);
    const foilPool = hasPartner
      ? FOIL_ROLES.filter((f) => f.role !== "love interest")
      : FOIL_ROLES;
    const foilType = uniformPick(foilPool.length ? foilPool : FOIL_ROLES);
    const foilGid =
      foilType.role === "love interest"
        ? loveInterestGenderId(protagonistGenderId, protagonistOrientation)
        : neutralGenderId(includeLGBQ);
    const foilBroad = randomBroadFrom(namePools);
    const foilNPool = namePools[foilBroad] ?? namePools["default"];
    const foilName = `${uniqueFirst(foilGid, foilNPool)} ${uniformPick(foilNPool.last)}`;
    cast.push({
      name: foilName,
      role: foilType.role,
      status: "present",
      gender: GENDER_LABELS[foilGid],
      race: foilBroad,
      traits: pickTraits(2),
      dynamic: fillD(uniformPick(foilType.dynamics), protName),
    });
  }
  return cast;
}

// ── Name helpers ──────────────────────────────────────────────────────────
function pickFirst(genderId, pool) {
  if (["man", "trans_man"].includes(genderId)) return uniformPick(pool.masc);
  if (["woman", "trans_woman"].includes(genderId)) return uniformPick(pool.fem);
  const r = Math.random();
  return r < 0.4
    ? uniformPick(pool.neutral)
    : r < 0.7
      ? uniformPick(pool.masc)
      : uniformPick(pool.fem);
}

function protoName(genderId, pool) {
  const first = pickFirst(genderId, pool);
  const last = uniformPick(pool.last);
  return { first, last, full: `${first} ${last}` };
}

const GENDER_LABELS = {
  man: "Male",
  trans_man: "Trans male",
  woman: "Female",
  trans_woman: "Trans female",
  non_binary: "Non-binary",
  genderfluid: "Genderfluid",
};

function randomBroadFrom(namePools) {
  const keys = Object.keys(namePools).filter((k) => k !== "default");
  return uniformPick(keys.length ? keys : Object.keys(namePools));
}

function neutralGenderId(includeLGBQ = true) {
  const r = Math.random();
  if (!includeLGBQ) return r < 0.5 ? "man" : "woman";
  return r < 0.45 ? "man" : r < 0.9 ? "woman" : "non_binary";
}

function loveInterestGenderId(protagonistGenderId, protagonistOrientation) {
  const isMasc =
    protagonistGenderId === "man" || protagonistGenderId === "trans_man";
  const isFem =
    protagonistGenderId === "woman" || protagonistGenderId === "trans_woman";
  const orient = (protagonistOrientation ?? "").toLowerCase();
  if (orient.includes("straight")) {
    if (isMasc) return "woman";
    if (isFem) return "man";
  } else if (orient.includes("gay") || orient.includes("lesbian")) {
    if (isMasc) return "man";
    if (isFem) return "woman";
  }
  return Math.random() < 0.5 ? "man" : "woman";
}

function altLastName(currentLast, ethnicityBroad, namePools) {
  const opts = (namePools[ethnicityBroad] ?? namePools["default"]).last.filter(
    (n) => n !== currentLast,
  );
  return uniformPick(
    opts.length
      ? opts
      : (namePools[ethnicityBroad] ?? namePools["default"]).last,
  );
}

// ── Skeleton builder ──────────────────────────────────────────────────────
// Statuses that presuppose having been legally married — withheld from
// minors by default (see ALLOW_MINOR_MARRIAGE in the genre registry/paleolithic).
const MARRIAGE_DERIVED_STATUS_IDS = new Set([
  "married",
  "separated",
  "divorced",
  "widowed",
]);

// options: { includeLGBQ, includeNSFW, prefGender, prefOrientation }
// (previously read directly from the DOM inside this function; now passed in by
// index.html so the engine has no browser dependency.)
export function buildSkeleton(stats, mbti, tables, options = {}) {
  const {
    PROFESSIONS: P,
    LIFE_EVENTS: LE,
    TENSIONS: T,
    SECRETS: S,
    FAMILY_STRUCTURES: FS,
    ECONOMIC_TIERS: ET,
    CITY_SETTINGS: CS,
    TAG_POOLS: TP,
    RACES_OR_ETHNICITIES: ROE,
    GENDERS: G,
    ORIENTATIONS: O,
    BUILDS: B,
    HAIR: H,
    DISTINGUISHING_FEATURES: DF,
    QUIRKS: Q,
    NAME_POOLS: NP,
    RELATIONSHIP_STATUSES: RS,
    PLOT_ARCHETYPES: PA,
  } = tables;

  const includeLGBQ = options.includeLGBQ ?? true;
  const includeNSFW = options.includeNSFW ?? options.nsfw ?? false;
  const prefGender = options.prefGender ?? "any";
  const prefOrientation = options.prefOrientation ?? "any";
  const age = (() => {
    if (tables.AGE_RANGE) {
      const [lo, hi] = tables.AGE_RANGE;
      return Math.floor(Math.random() * (hi - lo + 1)) + lo;
    }
    const _au1 = Math.random() || 1e-10;
    const _az =
      Math.sqrt(-2 * Math.log(_au1)) * Math.cos(2 * Math.PI * Math.random());
    return Math.min(75, Math.max(15, Math.round(25 + 8 * _az)));
  })();
  const allowNSFW = includeNSFW && age >= 18;
  const genderPool =
    prefGender !== "any"
      ? G.filter((g) => g.id === prefGender)
      : includeLGBQ
        ? G
        : G.filter((g) => g.id === "man" || g.id === "woman");
  const orientPool =
    prefOrientation !== "any"
      ? O.filter((o) => o.id === prefOrientation)
      : includeLGBQ
        ? O
        : O.filter((o) => o.id === "straight");
  const identity = statAndWeightPick(ROE, stats);
  const syntheticType = identity.syntheticType ?? null;
  let gender = statAndWeightPick(genderPool, stats);
  const isNB =
    gender.id === "non_binary" ||
    gender.id === "genderfluid" ||
    gender.id === "genderless";
  // Computed before profPool: a life event can override caste as the
  // deciding factor in profession selection (see forcedIndustries below).
  const lifeEvent = statWeightedPick(excludeByBroad(LE, identity.broad), stats);
  const nsfwPool = allowNSFW ? P : P.filter((p) => !p.nsfw);
  const profPool = (() => {
    const byIndustry = lifeEvent.forcedIndustries
      ? nsfwPool.filter((p) => lifeEvent.forcedIndustries.includes(p.industry))
      : identity.allowedIndustries
        ? nsfwPool.filter((p) =>
            identity.allowedIndustries.includes(p.industry),
          )
        : nsfwPool;
    const base = byIndustry.length > 0 ? byIndustry : nsfwPool;
    const byGender = base.filter(
      (p) => !p.allowedGenders || isNB || p.allowedGenders.includes(gender.id),
    );
    const genderFiltered = byGender.length > 0 ? byGender : base;
    const ageFiltered = genderFiltered.filter(
      (p) => age >= (p.minAge ?? 0) && age <= (p.maxAge ?? Infinity),
    );
    return ageFiltered.length > 0 ? ageFiltered : genderFiltered;
  })();
  let orientation = weightedPick(orientPool);
  const isMinor = age < 18;
  const relStatusPool =
    isMinor && !tables.ALLOW_MINOR_MARRIAGE
      ? RS.filter((r) => !MARRIAGE_DERIVED_STATUS_IDS.has(r.id))
      : RS;
  let relStatus = uniformPick(
    relStatusPool.flatMap((r) => Array(r.weight).fill(r)),
  );

  // Synthetic construct overrides — must run after identity is known
  if (syntheticType === "industrial") {
    gender = { id: "genderless", label: "Genderless", pronouns: "it/its" };
    orientation = { id: "asexual", label: "N/A" };
    relStatus = { id: "single", label: "N/A" };
  } else if (syntheticType === "plastic") {
    // Gender stays as rolled (outward appearance only); always asexual; no relationships
    orientation = O.find((o) => o.id === "asexual") ?? {
      id: "asexual",
      label: "Asexual",
    };
    relStatus = RS.find((r) => r.id === "single") ?? {
      id: "single",
      label: "Single",
    };
  }
  const plotArchetypeEntry = uniformPick(
    PA.flatMap((p) => Array(p.weight).fill(p)),
  );
  const namePool = NP[identity.broad] ?? NP["default"];
  const nameResult = protoName(gender.id, namePool);
  const name = nameResult.full;
  const lastName = nameResult.last;
  const compatBuilds = B.filter((b) => {
    const sa = b.statAffinity?.strength ?? 1.0;
    if (sa >= 1.4 && stats.strength < 55) return false;
    if (sa >= 1.2 && stats.strength < 35) return false;
    if (sa <= 0.75 && stats.strength > 65) return false;
    return true;
  });
  const build = statWeightedPick(
    compatBuilds.length >= 2 ? compatBuilds : B,
    stats,
  );
  const hairItem = uniformPick(H);
  const hair = typeof hairItem === "string" ? hairItem : hairItem.label;
  const feat =
    Math.random() < 0.25 ? null : uniformPick(DF.filter((f) => f.label)).label;
  // True for a body with no human-style hair/skin to describe at all —
  // either equipment (Industrial Android) or a non-humanoid species body
  // (identity.nonHumanoidBody). See the `appearance` block below.
  const noBodyText =
    syntheticType === "industrial" || !!identity.nonHumanoidBody;
  const quirk = statWeightedPick(Q, stats);
  const profession = statWeightedPick(profPool, stats);
  const sentiment = uniformPick(profession.sentiments);
  const famStruct =
    identity.broad === "Android"
      ? (FS.find((f) => f.id === "android_origin") ?? {
          id: "android_origin",
          label: "N/A — synthetic construct",
          parentCount: 0,
          siblingCount: [0, 0],
          toneTag: "neutral",
        })
      : statWeightedPick(excludeByBroad(FS, identity.broad), stats);
  let tier =
    profession.economicTier +
    (lifeEvent.economicHint ?? 0) +
    (famStruct.economicHint ?? 0);
  tier = Math.min(5, Math.max(1, Math.round(tier)));
  const econ = ET[tier];
  const econMarkers = [...econ.descriptors]
    .sort(() => Math.random() - 0.5)
    .slice(0, 2);
  const tensionPool = (() => {
    const byProfession = T.filter(
      (t) =>
        !t.requiredProfessions ||
        t.requiredProfessions.includes(profession.title),
    );
    const base = byProfession.length > 0 ? byProfession : T;
    return excludeByBroad(base, identity.broad);
  })();
  const tension = statWeightedPick(tensionPool, stats);
  const secretPool = (() => {
    const byBroad = excludeByBroad(S, identity.broad);
    const byGender = byBroad.filter(
      (s) => !s.allowedGenders || isNB || s.allowedGenders.includes(gender.id),
    );
    const genderFiltered = byGender.length > 0 ? byGender : byBroad;
    const byProfession = genderFiltered.filter(
      (s) =>
        !s.excludedProfessions ||
        !s.excludedProfessions.includes(profession.title),
    );
    return byProfession.length > 0 ? byProfession : genderFiltered;
  })();
  const secret = statWeightedPick(secretPool, stats);
  const city = statWeightedPick(CS, stats);
  const cast = buildCast(
    name,
    lastName,
    identity.broad,
    famStruct,
    tables,
    gender.id,
    orientation.label,
    relStatus.id,
    includeLGBQ,
  );

  // assemble tags
  const tags = new Set(TP.always);
  if (TP[city.toneTag]) TP[city.toneTag].forEach((t) => tags.add(t));
  if (TP[tension.toneTag]) TP[tension.toneTag].forEach((t) => tags.add(t));
  if (tension.criminalFlag && TP.criminal)
    TP.criminal.forEach((t) => tags.add(t));
  (TP.professionTags?.[profession.industry] ?? []).forEach((t) => tags.add(t));
  if (secret.severity === "explosive" || secret.severity === "high") {
    tags.add("secrets");
    tags.add("betrayal");
  }

  const PROF_SLUG_OVERRIDES = { "Mid-level corporate suit": "corporate_suit" };
  function profSlug(t) {
    if (PROF_SLUG_OVERRIDES[t]) return PROF_SLUG_OVERRIDES[t];
    return t
      .toLowerCase()
      .replace(/\s*\/\s*/g, "_")
      .replace(/[-\s]+/g, "_")
      .replace(/[^a-z0-9_]/g, "");
  }

  return {
    name,
    age,
    gender: gender.label,
    pronouns: gender.pronouns,
    orientation: orientation.label,
    relationshipStatus: relStatus.label,
    plotArchetype: plotArchetypeEntry.label,
    plotArchetypeDesc: plotArchetypeEntry.description,
    ethnicityBroad: identity.broad,
    ethnicityFlavor: identity.flavor,
    // 'biomechanical' | 'plastic' | 'industrial' | null — lets a genre's
    // voice.js special-case output rules per Android subtype (e.g. Sci-Fi's
    // industrial-chassis appearance override), same idea as ethnicityBroad.
    syntheticType,
    appearance: {
      build: build.label,
      // hair/distinguishingFeature/statNotes are all body/grooming concepts
      // (human hairstyles, scars, tattoos, "well-groomed", etc.) that don't
      // apply to a machine chassis (Industrial Android) or a body with no
      // human-style hair/skin at all (identity.nonHumanoidBody — giant
      // insects, plants, gas, fur-covered uplifts). Both keep only the
      // size/bulk descriptor (build), which reads fine either way
      // ("heavyset", "lean, wiry").
      hair: noBodyText ? null : hair,
      distinguishingFeature: noBodyText ? null : feat,
      statNotes: noBodyText ? [] : appearanceStatNotes(stats),
    },
    quirk: quirk.quirk,
    stats,
    statLabels: buildStatLabels(stats),
    mbti: mbti.type,
    mbtiLabel: mbti.label,
    nsfw: allowNSFW,
    profession: profession.title,
    industry: profession.industry,
    economicTier: tier,
    economicLabel: econ.label,
    economicMarkers: econMarkers,
    housing: uniformPick(econ.housing),
    transport: uniformPick(econ.transport),
    cityLabel: city.label,
    cityFlavor: city.flavor,
    sentiment,
    lifeEvent: lifeEvent.description,
    tension: tension.description,
    secret: secret.description,
    secretSeverity: secret.severity,
    tags: [...tags].slice(0, 10),
    cast,
    _slots: {
      species: identity.id,
      race: identity.flavor.split(" — ")[0].trim(),
      gender: gender.id,
      orient: orientation.id,
      relStatus: relStatus.id,
      plot: plotArchetypeEntry.id,
      mbti: mbti.type,
      prof: profSlug(profession.title),
      sentiment: sentiment.replace(/\s+/g, "_"),
      econ: `tier${tier}`,
      city: city.id,
      family: famStruct.id,
      lifeEvent: lifeEvent.id,
      tension: tension.id,
    },
  };
}
