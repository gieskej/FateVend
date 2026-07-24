import {
  MBTI_TYPES,
  RELATIONSHIP_STATUSES,
  SENTIMENTS,
  STATIC_CARDS_BY_GENRE,
  statAdjective,
} from "./generator/ui-data.js";
import { rollStats, assignMBTI, buildSkeleton } from "./generator/engine.js";
import { GENRE_TABLES } from "./generator/registry.js";
import {
  GENRE_MANIFESTS,
  GENRE_CAROUSEL_DATA,
  GENRE_VOICE,
} from "./generator/manifests.js";
import { loadPack, validatePack } from "./generator/pack-loader.js";
import { callClaude, callGemini, callOllama } from "./api.js";
import { state } from "./state.js";
import {
  narrate,
  narrateAll,
  stopNarration,
  setTtsProvider,
  setTtsVoiceOverride,
  ttsProvider,
  SVG_NARRATE_ICON,
  GENRE_TTS_CONFIG,
  buildTtsConfigEntry,
} from "./narration.js";
import {
  GENRE_MUSIC_PREFIX,
  GENRE_MUSIC_TRACKS,
  _lastMusicTrack,
  pickGenreTrack,
  showPlayer,
  hidePlayer,
  playerPrev,
  playerNext,
  playerStop,
  playerPlay,
  fadeOutAudio,
  _bellSfx,
  _musicSfx,
  _slotMachinePullSfx,
  _slotMachineReelStopSfx,
} from "./audio.js";
import {
  PACK_ASSET_BASE,
  PACK_ICON_URLS,
  installPackAssets,
  releasePackAssets,
  packIconUrl,
  GENRE_PORTRAIT_STYLES,
  genreIconBase,
} from "./pack-assets.js";

// ── Genre routing ─────────────────────────────────────────────────────────

// ═══════════════════════════════════════════════════════════════════════════
// GENERATOR ENGINE — now in ./generator/engine.js (imported above).
// buildSkeleton/rollStats/assignMBTI are imported; all other engine
// helpers (selectors, cast builder, name helpers) live in that module.
// ═══════════════════════════════════════════════════════════════════════════

// ── API call ──────────────────────────────────────────────────────────────
// The text-provider calls (callClaude/callGemini/callOllama) now live in
// ./api.js (imported above); they build prompts via the shared
// ./generator/prompt-builder.js. callAI() below dispatches to the right one
// based on the selected provider.

// ── Provider selector ─────────────────────────────────────────────────────

async function callAI(skeleton, genre) {
  const anthropicKey = document.getElementById("api-key").value.trim();
  const geminiKey = document.getElementById("gemini-api-key").value.trim();
  const ollamaUrl = document.getElementById("ollama-url").value.trim();
  const ollamaModel = document.getElementById("ollama-model").value.trim();
  let provider, model, result;
  const t0 = Date.now();
  if (currentProvider === "claude" && anthropicKey) {
    provider = "claude";
    model = "claude-sonnet-4-5";
    result = await callClaude(skeleton, anthropicKey, genre);
  } else if (currentProvider === "gemini" && geminiKey) {
    provider = "gemini";
    model = "gemini-2.5-flash";
    result = await callGemini(skeleton, geminiKey, genre);
  } else if (currentProvider === "ollama" && ollamaUrl) {
    provider = "ollama";
    model = ollamaModel || "llama3.2";
    result = await callOllama(skeleton, ollamaUrl, ollamaModel, genre);
  } else if (anthropicKey) {
    provider = "claude";
    model = "claude-sonnet-4-5";
    result = await callClaude(skeleton, anthropicKey, genre);
  } else if (geminiKey) {
    provider = "gemini";
    model = "gemini-2.5-flash";
    result = await callGemini(skeleton, geminiKey, genre);
  } else if (ollamaUrl) {
    provider = "ollama";
    model = ollamaModel || "llama3.2";
    result = await callOllama(skeleton, ollamaUrl, ollamaModel, genre);
  } else
    throw new Error(
      "No text provider configured. Enter an API key or Ollama URL in Settings.",
    );
  return {
    output: result.output,
    stats: {
      provider,
      model,
      ms: Date.now() - t0,
      inputTokens: result.usage.inputTokens,
      outputTokens: result.usage.outputTokens,
    },
  };
}

function setProvider(p) {
  currentProvider = p;
  const sel = document.getElementById("toolbar-text-provider");
  if (sel) sel.value = p;
  updateContinueButtonState();
}

// Keeps the "Generate Scenario" continue button (if currently shown) in sync
// with the text provider selector — no point letting the user click through
// to an AI call that has nowhere to go.
function updateContinueButtonState() {
  const btn = document.getElementById("btn-continue");
  if (!btn) return;
  btn.disabled = currentProvider === "none";
  btn.title = btn.disabled ? "Select a text provider in Settings first" : "";
}

function updateProviderSelector() {
  const hasAnthropic = !!document.getElementById("api-key")?.value.trim();
  const hasGemini = !!document.getElementById("gemini-api-key")?.value.trim();
  const hasOllama = !!document.getElementById("ollama-url")?.value.trim();
  const sel = document.getElementById("toolbar-text-provider");
  if (!sel) return;

  sel.querySelector('option[value="claude"]').disabled = !hasAnthropic;
  sel.querySelector('option[value="gemini"]').disabled = !hasGemini;
  sel.querySelector('option[value="ollama"]').disabled = !hasOllama;

  if (currentProvider === "claude" && !hasAnthropic)
    setProvider(hasGemini ? "gemini" : hasOllama ? "ollama" : "none");
  else if (currentProvider === "gemini" && !hasGemini)
    setProvider(hasAnthropic ? "claude" : hasOllama ? "ollama" : "none");
  else if (currentProvider === "ollama" && !hasOllama)
    setProvider(hasAnthropic ? "claude" : hasGemini ? "gemini" : "none");
  else setProvider(currentProvider);
}

function setImageProvider(p) {
  currentImageProvider = p;
  const sel = document.getElementById("toolbar-image-provider");
  if (sel) sel.value = p ?? "none";
}

function updateImageProviderSelector() {
  const hasSd = !!document.getElementById("sd-url")?.value.trim();
  const hasStability = !!document.getElementById("img-api-key")?.value.trim();
  const sel = document.getElementById("toolbar-image-provider");
  if (!sel) return;

  sel.querySelector('option[value="sd"]').disabled = !hasSd;
  sel.querySelector('option[value="stability"]').disabled = !hasStability;

  if (
    !currentImageProvider ||
    (currentImageProvider === "sd" && !hasSd) ||
    (currentImageProvider === "stability" && !hasStability)
  ) {
    setImageProvider(hasSd ? "sd" : hasStability ? "stability" : null);
  } else {
    setImageProvider(currentImageProvider);
  }
}

function updateNarrationProviderSelector() {
  const hasKokoro = !!document.getElementById("tts-kokoro-url")?.value.trim();
  const hasOpenAI = !!document.getElementById("tts-openai-key")?.value.trim();

  const sel = document.getElementById("toolbar-narration");
  if (sel) {
    const kokoroOpt = sel.querySelector('option[value="kokoro"]');
    const openaiOpt = sel.querySelector('option[value="openai"]');
    if (kokoroOpt) kokoroOpt.hidden = !hasKokoro;
    if (openaiOpt) openaiOpt.hidden = !hasOpenAI;
  }

  if (ttsProvider === "kokoro" && !hasKokoro) setTtsProvider("browser");
  else if (ttsProvider === "openai" && !hasOpenAI) setTtsProvider("browser");
}

// ═══════════════════════════════════════════════════════════════════════════
// UI STATE
// ═══════════════════════════════════════════════════════════════════════════
let currentGeneratedAt = null;
let currentStats = null;
// Appended to appearancePrompt when NSFW is on for an adult character.
// Overridden by NSFW_IMAGE_PROMPT_SUFFIX in .env (via serve.sh's config.js,
// window.__NSFW_SUFFIX — see DOMContentLoaded below) so it's editable without
// touching source; this is just the fallback when no .env key is set.
let nsfwSuffix = ", sexy";
let npcPortraitData = {};
let npcPortraitGenerating = false;

let isGenerating = false;
let currentProvider = "gemini";
let currentImageProvider = null;

// GENRE_CAROUSEL_DATA is imported from ./generator/manifests.js (derived from
// the per-genre manifests in display order).
let carouselIndex = 0;

// Prev/next cards only get room to peek out on desktop widths.
function carouselShowPeeks(width) {
  return width >= 600;
}

function genreCardHTML(g, modifierClass, onclick) {
  return `
    <div class="genre-card ${modifierClass}" ${onclick ? `onclick="${onclick}"` : ""} title="${modifierClass === "genre-card-peek" ? g.label : ""}">
      <div class="genre-card-image-wrap">
        <img class="genre-card-image"
          src="${PACK_ICON_URLS[g.id]?.["_genre.webp"] ?? `${genreIconBase(g.id)}_genre.webp`}"
          onerror="this.parentNode.innerHTML='<div class=&quot;genre-card-image-placeholder&quot;>⚙</div>'"
          alt="${g.label}" />
      </div>
      <div class="genre-card-info">
        <div class="genre-card-title">${g.label}</div>
        <div class="genre-card-desc">${g.desc}</div>
      </div>
    </div>`;
}

function renderCarouselCard() {
  const n = GENRE_CAROUSEL_DATA.length;
  const g = GENRE_CAROUSEL_DATA[carouselIndex];

  let track = genreCardHTML(g, "genre-card-current", null);
  if (carouselShowPeeks(window.innerWidth)) {
    const prevIdx = (carouselIndex - 1 + n) % n;
    const nextIdx = (carouselIndex + 1) % n;
    track =
      genreCardHTML(
        GENRE_CAROUSEL_DATA[prevIdx],
        "genre-card-peek",
        `goToCarouselIndex(${prevIdx})`,
      ) +
      track +
      genreCardHTML(
        GENRE_CAROUSEL_DATA[nextIdx],
        "genre-card-peek",
        `goToCarouselIndex(${nextIdx})`,
      );
  }

  document.getElementById("genre-carousel").innerHTML =
    `<div class="genre-carousel-track">${track}</div>`;
}

function renderCarouselIndicator() {
  document.getElementById("carousel-indicator").innerHTML =
    GENRE_CAROUSEL_DATA.map(
      (g, i) => `
    <div class="carousel-dot${i === carouselIndex ? " active" : ""}"
         onclick="goToCarouselIndex(${i})"
         title="${g.label}"></div>
  `,
    ).join("");
}

function goToCarouselIndex(i, animate = true) {
  if (i === carouselIndex) return;
  carouselIndex =
    ((i % GENRE_CAROUSEL_DATA.length) + GENRE_CAROUSEL_DATA.length) %
    GENRE_CAROUSEL_DATA.length;
  const card = document.querySelector(".genre-card-current");
  if (animate && card) {
    card.classList.add("fading");
    setTimeout(() => {
      renderCarouselCard();
      renderCarouselIndicator();
      setGenre(GENRE_CAROUSEL_DATA[carouselIndex].id);
    }, 180);
  } else {
    renderCarouselCard();
    renderCarouselIndicator();
    setGenre(GENRE_CAROUSEL_DATA[carouselIndex].id);
  }
}

function carouselStep(dir) {
  goToCarouselIndex(carouselIndex + dir);
}

function onToolbarGenreChange(value) {
  const i = GENRE_CAROUSEL_DATA.findIndex((g) => g.id === value);
  if (i !== -1 && i !== carouselIndex) goToCarouselIndex(i);
  setGenre(value);
}

function setGenre(genre) {
  state.currentGenre = genre;
  const sel = document.getElementById("genre-select");
  if (sel && sel.value !== genre) sel.value = genre;
  preloadGenreIcons(genre);
  const idx = GENRE_CAROUSEL_DATA.findIndex((g) => g.id === genre);
  if (idx !== -1 && idx !== carouselIndex) {
    carouselIndex = idx;
    renderCarouselCard();
    renderCarouselIndicator();
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// UI HELPERS
// ═══════════════════════════════════════════════════════════════════════════

const BASE_PHASES = [
  { id: "phase-roll", label: "Rolling Stats" },
  { id: "phase-mbti", label: "Personality" },
  { id: "phase-skeleton", label: "Fate" },
  { id: "phase-ai", label: "Narrative" },
];
const PORTRAIT_PHASE = { id: "phase-portrait", label: "Portrait" };
const NPC_PORTRAIT_PHASE = {
  id: "phase-npc-portraits",
  label: "NPC Portraits",
};

let activePhases = BASE_PHASES;

// Recomputed at the start of each generation so the bar reflects whichever
// optional steps (portrait / NPC portraits) will actually run this time.
function computeActivePhases() {
  const hasImageBackend = !!(
    document.getElementById("sd-url")?.value.trim() ||
    document.getElementById("img-api-key")?.value.trim()
  );
  const phases = [...BASE_PHASES];
  if (hasImageBackend) {
    phases.push(PORTRAIT_PHASE);
    if (document.getElementById("auto-npc-portraits")?.checked) {
      phases.push(NPC_PORTRAIT_PHASE);
    }
  }
  return phases;
}

function setPhase(id) {
  const el = document.getElementById("status-bar");
  if (!el) return;
  const activeIdx = activePhases.findIndex((p) => p.id === id);
  el.innerHTML = activePhases
    .map((p, i) => {
      if (i < activeIdx)
        return `<span style="color:var(--brass);opacity:0.7">✓ ${p.label}</span>`;
      if (i === activeIdx)
        return `<span style="color:var(--gold)">⚙ ${p.label}</span>`;
      return `<span style="opacity:0.3">${p.label}</span>`;
    })
    .join('<span style="opacity:0.2;margin:0 0.5em">·</span>');
  el.classList.add("visible");
}

function clearPhases() {
  setStatus("");
}

function setStatus(msg) {
  const el = document.getElementById("status-bar");
  el.textContent = msg;
  el.classList.toggle("visible", !!msg);
}

function playErrorSound() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(220, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(110, ctx.currentTime + 0.25);
    gain.gain.setValueAtTime(0.18, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.3);
    osc.onended = () => ctx.close();
  } catch (_) {}
}

export function showError(msg) {
  const el = document.getElementById("error-box");
  el.textContent = msg;
  el.classList.toggle("visible", !!msg);
  if (msg) {
    playErrorSound();
    el.scrollIntoView({ behavior: "smooth", block: "center" });
  }
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

// ── Copy to clipboard ─────────────────────────────────────────────────────
// Uses Clipboard API where available, falls back to execCommand for
// environments that block navigator.clipboard (iframes, non-HTTPS, etc.)
function copyToClipboard(text) {
  // Modern API first
  if (navigator.clipboard && navigator.clipboard.writeText) {
    return navigator.clipboard
      .writeText(text)
      .then(() => true)
      .catch(() => {
        return execCommandCopy(text);
      });
  }
  return Promise.resolve(execCommandCopy(text));
}

function execCommandCopy(text) {
  try {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.style.cssText =
      "position:fixed;top:0;left:0;width:1px;height:1px;opacity:0;pointer-events:none";
    document.body.appendChild(ta);
    ta.focus();
    ta.select();
    const ok = document.execCommand("copy");
    document.body.removeChild(ta);
    return ok;
  } catch (e) {
    return false;
  }
}

async function copyText(text, btn) {
  const originalHTML = btn.innerHTML;
  const ok = await copyToClipboard(text);
  if (ok) {
    btn.innerHTML = "✓ Copied";
    btn.classList.add("copied");
    setTimeout(() => {
      btn.innerHTML = originalHTML;
      btn.classList.remove("copied");
    }, 1800);
  } else {
    btn.innerHTML = "✗ Failed";
    setTimeout(() => {
      btn.innerHTML = originalHTML;
    }, 1800);
  }
}

// ── Char counter ──────────────────────────────────────────────────────────
function attachCounter(textarea, limit, counterId) {
  const counter = document.getElementById(counterId);
  if (!counter || !textarea) return;
  const update = () => {
    const len = textarea.value.length;
    const remaining = limit - len;
    counter.textContent = `${len} / ${limit}`;
    counter.classList.toggle("over", remaining < 0);
  };
  textarea.addEventListener("input", update);
  update();
}

// ═══════════════════════════════════════════════════════════════════════════
// SLOT MACHINE
// ═══════════════════════════════════════════════════════════════════════════

const COMMON_ICON_BASE = "./generator/common/icons/";

// Convert a profession title (or similar) to an icon filename slug
function toIconSlug(str) {
  return str
    .toLowerCase()
    .replace(/\s*\/\s*/g, "_")
    .replace(/[-\s]+/g, "_")
    .replace(/[^a-z0-9_]/g, "");
}
// Extract icon slug from an explicit iconPath field (e.g. "PROFESSIONS#foo.webp" → "foo")
function iconSlugFrom(item, fallback) {
  const m = item.iconPath?.match(/#([^.]+)\.webp$/i);
  return m ? m[1] : fallback;
}

// Convert a data id to a readable display label
function idToLabel(id) {
  return id.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

// Resolves the icon base folder for one catalog entry. Most "common" categories
// are entirely common, so def.common covers them — but a catalog entry can carry
// its own base as a 4th tuple element (see plotCat above) when a category mixes
// common and genre-specific icons, which takes priority when present.
function iconBaseFor(entry, def, cfg) {
  return entry[3] ?? (def.common ? COMMON_ICON_BASE : cfg.iconBase);
}

// Preload all icon images for a genre into the browser cache so the slot
// animation doesn't hammer the server with concurrent requests.
function preloadGenreIcons(genre) {
  const cfg = getSlotConfig(genre);
  cfg.defs.forEach((def) => {
    if (def.cat === "SENTIMENTS") return; // rendered as emoji text, no image to preload
    const entries = cfg.catalog[def.cat] ?? [];
    entries.forEach((entry) => {
      const img = new Image();
      img.src =
        packIconUrl(cfg.genre, def.cat, entry[1]) ??
        iconPath(iconBaseFor(entry, def, cfg), def.cat, entry[1]);
    });
  });
}

// Per-genre slot configuration.
// Each catalog entry: [dataSlug, iconSlug, displayLabel]
//   dataSlug  = value stored in skeleton._slots[key]
//   iconSlug  = stem used in the icon filename (after CATEGORY#)
//   label     = short display text for the slot label
function getSlotConfig(genre) {
  // Common categories shared across all genres (icons in generator/common/icons/)
  const GENDERS_CAT = [
    ["man", "man", "Male"],
    ["woman", "woman", "Female"],
    ["non_binary", "non-binary", "Non-binary"],
    ["trans_man", "trans_man", "Trans male"],
    ["trans_woman", "trans_woman", "Trans female"],
    ["genderfluid", "genderfluid", "Genderfluid"],
    ["genderless", "genderless", "Genderless"],
    ["androgyne", "androgyne", "Androgyne"],
    ["custom_gendered", "man", "Custom"],
  ];
  const ORIENT_CAT = [
    ["straight", "straight", "Straight"],
    ["gay", "gay", "Gay / Lesbian"],
    ["bisexual", "bisexual", "Bisexual"],
    ["pansexual", "pansexual", "Pansexual"],
    ["asexual", "asexual", "Asexual"],
    ["questioning", "questioning", "Questioning"],
  ];
  const MBTI_CAT = MBTI_TYPES.map((m) => [
    m.type,
    m.type,
    `${m.type}<br/><i>${m.label}</i>`,
  ]);
  const RELSTATUS_CAT = RELATIONSHIP_STATUSES.map((r) => [
    r.id,
    r.iconPath?.match(/#([^.]+)\.webp$/i)?.[1] ?? r.id,
    r.label,
  ]);
  // PLOT_ARCHETYPES mixes COMMON_PLOT_ARCHETYPES (icons in common/icons/) with
  // genre-specific archetypes (icons in this genre's own icons/) — unlike every
  // other "common" category, its icon base varies per entry, not per category.
  // Carry the per-entry base as a 4th tuple element, read by iconBaseFor() below.
  const plotCat = (pool) =>
    pool.map((p) => {
      const m = p.iconPath?.match(/^(.*\/)PLOT_ARCHETYPES#([^.]+)\.webp$/i);
      return [p.id, m?.[2] ?? p.id, p.label, m?.[1] ?? COMMON_ICON_BASE];
    });
  // 4th tuple element: the sentiment's Unicode emoji glyph, rendered as
  // text (not an <img>) — see the SENTIMENTS branch in renderSlotMachine()
  // and the two reveal/spin call sites.
  const SENT_CAT = SENTIMENTS.map((s) => [s.id, s.id, s.label, s.emoji]);

  const manifest = GENRE_MANIFESTS[genre] ?? GENRE_MANIFESTS["modern"];
  const m = manifest.slots;
  const tables = GENRE_TABLES[genre] ?? GENRE_TABLES["modern"];
  const gendersCat = m.filterGendersToGenre
    ? GENDERS_CAT.filter(([id]) => tables.GENDERS.some((g) => g.id === id))
    : GENDERS_CAT;
  const orientsCat = m.filterGendersToGenre
    ? ORIENT_CAT.filter(([id]) => tables.ORIENTATIONS.some((o) => o.id === id))
    : ORIENT_CAT;
  return {
    genre,
    // A pack may point its genre-specific icons at another served folder
    // (e.g. a lightweight "reskin" pack reusing a built-in genre's art);
    // built-ins leave iconBase unset and resolve from their own folder.
    iconBase: manifest.iconBase ?? `./generator/genres/${genre}/icons/`,
    defs: [
      { key: "gender", header: "Gender", cat: "GENDERS", common: true },
      {
        key: "species",
        header: m.identityHeader,
        cat: m.identityCat,
        common: false,
      },
      {
        key: "orient",
        header: "Orientation",
        cat: "ORIENTATIONS",
        common: true,
      },
      {
        key: "relStatus",
        header: "Relationship",
        cat: "RELATIONSHIP_STATUSES",
        common: true,
      },
      {
        key: "mbti",
        header: "Personality",
        cat: "MBTI_TYPES",
        common: true,
      },
      {
        key: "prof",
        header: m.profHeader,
        cat: m.profCat,
        common: false,
      },
      {
        key: "sentiment",
        header: "Sentiment",
        cat: "SENTIMENTS",
        common: true,
      },
      {
        key: "econ",
        header: m.econHeader,
        cat: m.econCat,
        common: false,
      },
      {
        key: "city",
        header: m.cityHeader,
        cat: m.cityCat,
        common: false,
      },
      {
        key: "family",
        header: "Background",
        cat: m.familyCat,
        common: false,
      },
      {
        key: "lifeEvent",
        header: "Life Event",
        cat: m.lifeEventCat,
        common: false,
      },
      {
        key: "tension",
        header: "Tension",
        cat: m.tensionCat,
        common: false,
      },
      {
        key: "plot",
        header: "Plot",
        cat: "PLOT_ARCHETYPES",
        common: true,
      },
    ],
    catalog: {
      [m.identityCat]: tables.RACES_OR_ETHNICITIES.map((r) => [
        r.id,
        r.id,
        r.broad,
      ]),
      GENDERS: gendersCat,
      ORIENTATIONS: orientsCat,
      RELATIONSHIP_STATUSES: RELSTATUS_CAT,
      MBTI_TYPES: MBTI_CAT,
      [m.profCat]: tables.PROFESSIONS.map((p) => {
        const ds = toIconSlug(p.title);
        return [ds, iconSlugFrom(p, ds), p.title];
      }),
      SENTIMENTS: SENT_CAT,
      [m.econCat]: m.economicTiers,
      [m.cityCat]: tables.CITY_SETTINGS.map((c) => [c.id, c.id, c.label]),
      [m.familyCat]: tables.FAMILY_STRUCTURES.map((f) => [
        f.id,
        m.familyUsesIconSlug ? iconSlugFrom(f, f.id) : f.id,
        f.label,
      ]),
      [m.lifeEventCat]: tables.LIFE_EVENTS.map((e) => [
        e.id,
        e.id,
        idToLabel(e.id),
      ]),
      [m.tensionCat]: tables.TENSIONS.map((t) => [t.id, t.id, idToLabel(t.id)]),
      PLOT_ARCHETYPES: plotCat(tables.PLOT_ARCHETYPES),
    },
  };
}

function iconPath(base, cat, slug) {
  return `${base}${cat}%23${slug}.webp`;
}

function renderSlotMachine(genre) {
  const cfg = getSlotConfig(genre);
  const slots = cfg.defs
    .map(
      (d) => `
    <div class="slot rolling" id="slot-${d.key}">
      <div class="slot-header">${d.header}</div>
      <div class="slot-window">
        ${
          d.cat === "SENTIMENTS"
            ? `<div id="slot-img-${d.key}" class="slot-emoji"></div>`
            : `<img id="slot-img-${d.key}" src="" alt=""
          onerror="this.onerror=null;this.closest('.slot-window').innerHTML='<div class=slot-placeholder>⚙</div>'">`
        }
      </div>
      <div class="slot-label" id="slot-lbl-${d.key}"></div>
      <div class="slot-sublabel" id="slot-sublbl-${d.key}"></div>
    </div>`,
    )
    .join("");
  return `<div class="slot-machine" id="slot-machine">${slots}</div>`;
}

async function animateSlots(skeleton, genre) {
  const cfg = getSlotConfig(genre);
  const slots = skeleton._slots;
  if (!slots) return;

  const intervals = {};
  const indices = {};
  const startSpin = {};

  // Assign each slot's first real frame synchronously — an <img> left at src=""
  // fires onerror (swapping in the ⚙ placeholder) if we yield to the event loop first.
  cfg.defs.forEach((def) => {
    const entries = cfg.catalog[def.cat] ?? [];
    if (!entries.length) return;
    indices[def.key] = Math.floor(Math.random() * entries.length);

    const img = document.getElementById(`slot-img-${def.key}`);
    if (!img) return;

    const showFrame = () => {
      const entry = entries[indices[def.key]];
      if (def.cat === "SENTIMENTS") {
        img.textContent = entry[3] ?? "";
      } else {
        img.src =
          packIconUrl(cfg.genre, def.cat, entry[1]) ??
          iconPath(iconBaseFor(entry, def, cfg), def.cat, entry[1]);
      }
    };
    showFrame();

    startSpin[def.key] = () => {
      intervals[def.key] = setInterval(() => {
        indices[def.key] = (indices[def.key] + 1) % entries.length;
        showFrame();
      }, 90);
    };
  });

  _slotMachinePullSfx.currentTime = 0;
  _slotMachinePullSfx.play().catch(() => {});
  await sleep(500);

  Object.values(startSpin).forEach((start) => start());

  // Land each slot with a stagger
  for (let i = 0; i < cfg.defs.length; i++) {
    await sleep(i === 0 ? 1000 : 650);

    const def = cfg.defs[i];
    clearInterval(intervals[def.key]);

    _slotMachineReelStopSfx.currentTime = 0;
    _slotMachineReelStopSfx.play().catch(() => {});

    const entries = cfg.catalog[def.cat] ?? [];
    const dataSlug = slots[def.key];
    const entry = entries.find((e) => e[0] === dataSlug);

    const img = document.getElementById(`slot-img-${def.key}`);
    const lblEl = document.getElementById(`slot-lbl-${def.key}`);
    const slotEl = document.getElementById(`slot-${def.key}`);

    const sublblEl = document.getElementById(`slot-sublbl-${def.key}`);
    if (entry) {
      const [, iconSlug, label, emoji] = entry;
      if (img) {
        if (def.cat === "SENTIMENTS") {
          img.textContent = emoji ?? "";
        } else {
          img.src =
            packIconUrl(cfg.genre, def.cat, iconSlug) ??
            iconPath(iconBaseFor(entry, def, cfg), def.cat, iconSlug);
        }
      }
      // innerHTML (not textContent): MBTI_CAT's label embeds <br/>/<i> markup.
      // Safe — every catalog label comes from our own static data files, never user input.
      if (lblEl) lblEl.innerHTML = label;
    } else {
      if (img)
        img.closest(".slot-window").innerHTML =
          '<div class="slot-placeholder">⚙</div>';
      if (lblEl) lblEl.textContent = (dataSlug ?? "").replace(/_/g, " ");
    }
    if (sublblEl && def.key === "species")
      sublblEl.textContent = slots.race ?? "";

    if (slotEl) {
      slotEl.classList.remove("rolling");
      slotEl.classList.add("landed");
      slotEl.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "nearest",
      });
    }

    if (i === cfg.defs.length - 1) {
      await sleep(900);
      _bellSfx.currentTime = 0;
      _bellSfx.play().catch(() => {});
    }
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// RENDER
// ═══════════════════════════════════════════════════════════════════════════

function renderSkeleton(sk) {
  const appParts = [
    sk.appearance.build,
    sk.appearance.hair,
    sk.appearance.distinguishingFeature,
    ...(sk.appearance.statNotes ?? []),
  ]
    .filter(Boolean)
    .join("; ");

  return `
  <!-- CHARACTER SHEET -->
  <div class="card" id="card-sheet">
    <div class="card-header">
      <span class="card-title">⚙ Rolled Character Sheet</span>
      <button class="btn-copy" onclick="copySkeletonText(this)">Copy</button>
    </div>
    <div class="card-body">

      <!-- Name + Identity -->
      <div style="margin-bottom:1rem;">
        <div style="font-family:var(--font-display);font-size:1.5rem;font-weight:700;color:var(--brass-dark);margin-bottom:0.1rem;">${sk.name}</div>
        <div style="font-style:italic;color:var(--ink-faint);font-size:0.95rem;">${sk.age} · ${sk.gender} (${sk.pronouns}) · ${sk.ethnicityBroad} — ${sk.ethnicityFlavor.split(" — ")[0].trim()}</div>
      </div>

      <!-- Stats -->
      <div style="margin-bottom:1.25rem;">
        <div style="font-family:var(--font-display);font-size: 0.8rem;letter-spacing:0.16em;color:var(--brass-dark);text-transform:uppercase;margin-bottom:0.5rem;">Stats</div>
        <div class="stat-grid" id="stat-grid">
          ${[
            "strength",
            "intelligence",
            "wisdom",
            "charisma",
            "dexterity",
            "constitution",
          ]
            .map(
              (stat) => `
          <div class="stat-cell">
            <span class="stat-name">${stat.slice(0, 3).toUpperCase()}</span>
            <span class="stat-value" id="stat-${stat}">${sk.stats[stat]}</span>
            <span class="stat-adj" id="adj-${stat}">${statAdjective(stat, sk.stats[stat])}</span>
            <div class="stat-bar"><div class="stat-bar-fill" id="bar-${stat}" style="width:${sk.stats[stat]}%"></div></div>
          </div>`,
            )
            .join("")}
        </div>
      </div>

      <!-- MBTI -->
      <div class="skeleton-row">
        <span class="skeleton-key">Personality</span>
        <span class="skeleton-val">
          <span class="mbti-badge">
            <span class="mbti-type">${sk.mbti}</span>
            <span class="mbti-label">${sk.mbtiLabel}</span>
          </span>
        </span>
      </div>

      <!-- Identity rows -->
      <div class="skeleton-row">
        <span class="skeleton-key">Profession</span>
        <span class="skeleton-val">${sk.profession} <span style="color:var(--ink-faint);font-style:italic">(${sk.industry}) — ${sk.sentiment}</span></span>
      </div>
      <div class="skeleton-row">
        <span class="skeleton-key">Appearance</span>
        <span class="skeleton-val" id="appearance-val">${appParts || "—"}</span>
      </div>
      <div class="skeleton-row">
        <span class="skeleton-key">Quirk</span>
        <span class="skeleton-val">${sk.quirk}</span>
      </div>
      <div class="skeleton-row">
        <span class="skeleton-key">Economy</span>
        <span class="skeleton-val">${sk.economicLabel} · ${sk.housing} · ${sk.transport}</span>
      </div>
      <div class="skeleton-row">
        <span class="skeleton-key">City</span>
        <span class="skeleton-val">${sk.cityLabel} <span style="color:var(--ink-faint);font-style:italic">— ${sk.cityFlavor}</span></span>
      </div>
      <div class="skeleton-row">
        <span class="skeleton-key">Life Event</span>
        <span class="skeleton-val">${sk.lifeEvent}</span>
      </div>
      <div class="skeleton-row">
        <span class="skeleton-key">Plot Archetype</span>
        <span class="skeleton-val"><strong>${sk.plotArchetype}</strong> <span style="color:var(--ink-faint);font-style:italic">— ${sk.plotArchetypeDesc}</span></span>
      </div>
      <div class="skeleton-row">
        <span class="skeleton-key">Background Tension</span>
        <span class="skeleton-val">${sk.tension}</span>
      </div>
      <div class="skeleton-row">
        <span class="skeleton-key">Secret</span>
        <span class="skeleton-val">
          <span class="severity-badge severity-${sk.secretSeverity}">${sk.secretSeverity}</span>${sk.secret}
        </span>
      </div>

    </div>
  </div>

  <!-- CAST -->
  <div class="card" id="card-cast">
    <div class="card-header">
      <span class="card-title">⚙ Rolled Supporting Cast</span>
    </div>
    <div class="card-body">
      <div class="cast-grid">
        ${sk.cast
          .map(
            (npc) => `
        <div class="cast-card">
          <div class="cast-name">${npc.name}</div>
          <div class="cast-role">${npc.role}</div>
          <div class="cast-status-badge">${npc.status}</div>
          <div class="cast-identity">
            <span class="cast-identity-badge">${npc.gender}</span>
            <span class="cast-identity-badge">${npc.race}</span>
          </div>
          <div class="cast-traits">${npc.traits.join(" · ")}</div>
          <div class="cast-dynamic">${npc.dynamic}</div>
        </div>`,
          )
          .join("")}
      </div>
    </div>
  </div>
  `;
}

function renderOutput(sk, output) {
  npcPortraitData = {};
  const showNarrate = ttsProvider !== "off";

  const tagHTML = output.tags
    .map((t) => `<span class="tag-pill">${t}</span>`)
    .join("");

  const castByName = Object.fromEntries(sk.cast.map((n) => [n.name, n]));

  const NPC_SILHOUETTE = `<svg class="npc-silhouette" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 70" aria-hidden="true"><ellipse cx="30" cy="22" rx="14" ry="15"/><path d="M2 70 Q2 46 30 46 Q58 46 58 70"/></svg>`;

  const npcEntriesHTML = Object.entries(output.npcEntries)
    .map(([name, entry]) => {
      const npc = castByName[name];
      const meta = npc
        ? `<div class="npc-entry-meta">${npc.gender} · ${npc.role} · ${npc.race}</div>`
        : "";
      const safeName = name.replace(/\s+/g, "_");
      const nameJS = JSON.stringify(name);
      const safeFile = name
        .replace(/[^a-zA-Z0-9]+/g, "-")
        .replace(/^-|-$/g, "");
      return `
    <div class="npc-section">
      <div class="npc-card-top">
        <div class="npc-portrait-zone" id="npc-pz-${safeName}">
          <button class="npc-portrait-thumb" id="npc-thumb-${safeName}"
                  onclick="toggleNpcPortraitMenu(${escHtml(nameJS)})"
                  title="Portrait options">${NPC_SILHOUETTE}</button>
          <div class="npc-portrait-popup" id="npc-menu-${safeName}" hidden>
            <button class="npc-menu-btn" id="npc-gen-btn-${safeName}"
                    onclick="generateNpcPortrait(${escHtml(nameJS)})">⚙ Generate Portrait</button>
            <a class="npc-menu-btn" id="npc-save-${safeName}" hidden
               download="${safeFile}.png">↓ Save Portrait</a>
          </div>
        </div>
        <div class="npc-card-info">
          <div class="field-header">
            <div>
              <span class="npc-section-name">${name}</span>
              ${meta}
            </div>
            <div class="field-meta">
              <span class="char-count" id="cc-npc-${safeName}">${entry.length} / 1000</span>
              ${showNarrate ? `<button class="btn-narrate" onclick="narrate(document.getElementById('npc-entry-${safeName}').value,this)">${SVG_NARRATE_ICON}</button>` : ""}
              <button class="btn-copy" onclick="copyField('npc-entry-${safeName}', this)">Copy</button>
            </div>
          </div>
        </div>
      </div>
      <textarea class="field-textarea" id="npc-entry-${safeName}" rows="4"
        oninput="updateCount(this,'cc-npc-${safeName}',1000)">${entry}</textarea>
    </div>
  `;
    })
    .join("");

  return `
  <!-- SCENARIO OUTPUT -->
  <div class="card" id="card-scenario">
    <div class="card-header">
      <span class="card-title">⚙ AI Generated Scenario</span>
      <div class="field-meta" style="gap:0.4rem;">
        ${showNarrate ? `<button class="btn-narrate" onclick="narrateAll()">${SVG_NARRATE_ICON} Narrate All</button>` : ""}
        <button id="btn-tts-stop" hidden onclick="stopNarration()">⏹ Stop</button>
      </div>
    </div>
    <div class="card-body">

      <div class="output-field">
        <div class="field-header">
          <span class="field-label">Details: Title</span>
          <div class="field-meta">
            <span class="char-count" id="cc-title">${output.title.length} / 70</span>
            <button class="btn-copy" onclick="copyField('field-title',this)">Copy</button>
          </div>
        </div>
        <input class="field-input" id="field-title" type="text" maxlength="80"
          value="${escHtml(output.title)}"
          oninput="updateCount(this,'cc-title',70)">
      </div>

      <div class="output-field">
        <div class="field-header">
          <span class="field-label">Details: Tags</span>
          <div class="field-meta">
            <button class="btn-copy" onclick="copyTags(this)">Copy</button>
          </div>
        </div>
        <div class="tags-wrap" id="tags-wrap">${tagHTML}</div>
      </div>

      ${
        output.appearancePrompt
          ? `
      <div class="output-field">
        <div class="field-header">
          <span class="field-label">Portrait Prompt <span style="font-size: 0.8rem;color:var(--ink-faint);font-style:italic;font-family:var(--font-body)">(text-to-image)</span></span>
          <div class="field-meta">
            <span class="char-count" id="cc-appearance">${output.appearancePrompt.length} / 500</span>
            <button class="btn-copy" onclick="copyField('field-appearance',this)">Copy</button>
          </div>
        </div>
        <textarea class="field-textarea" id="field-appearance" rows="3"
          oninput="updateCount(this,'cc-appearance',500)">${escHtml(output.appearancePrompt)}</textarea>
        <button class="btn-gen-portrait" id="btn-gen-portrait" onclick="generatePortrait(this)">⚙ Generate Portrait</button>
        <div class="portrait-wrap" id="portrait-wrap"></div>
      </div>`
          : ""
      }

      <div class="output-field">
        <div class="field-header">
          <span class="field-label">Details: Description</span>
          <div class="field-meta">
            <span class="char-count" id="cc-desc">${output.description.length} / 5000</span>
            ${showNarrate ? `<button class="btn-narrate" onclick="narrate(document.getElementById('field-desc').value,this)">${SVG_NARRATE_ICON}</button>` : ""}
            <button class="btn-copy" onclick="copyField('field-desc',this)">Copy</button>
          </div>
        </div>
        <textarea class="field-textarea" id="field-desc" rows="10"
          oninput="updateCount(this,'cc-desc',5000)">${escHtml(output.description)}</textarea>
      </div>

      <div class="output-field">
        <div class="field-header">
          <span class="field-label">Details: Opening (Append to end of Description)</span>
          <div class="field-meta">
            <span class="char-count" id="cc-opening">${output.opening.length} / 4000</span>
            ${showNarrate ? `<button class="btn-narrate" onclick="narrate(document.getElementById('field-opening').value,this)">${SVG_NARRATE_ICON}</button>` : ""}
            <button class="btn-copy" onclick="copyField('field-opening',this)">Copy</button>
          </div>
        </div>
        <textarea class="field-textarea" id="field-opening" rows="10"
          oninput="updateCount(this,'cc-opening',4000)">${escHtml(output.opening)}</textarea>
      </div>

      ${
        output.plotEssentials
          ? `
      <div class="output-field">
        <div class="field-header">
          <span class="field-label">Plot: Plot Essentials</span>
          <div class="field-meta">
            <span class="char-count" id="cc-plot">${output.plotEssentials.length} / 2000</span>
            ${showNarrate ? `<button class="btn-narrate" onclick="narrate(document.getElementById('field-plot').value,this)">${SVG_NARRATE_ICON}</button>` : ""}
            <button class="btn-copy" onclick="copyField('field-plot',this)">Copy</button>
          </div>
        </div>
        <textarea class="field-textarea" id="field-plot" rows="6"
          oninput="updateCount(this,'cc-plot',2000)">${escHtml(output.plotEssentials)}</textarea>
      </div>`
          : ""
      }

      ${
        output.authorNote
          ? `
      <div class="output-field">
        <div class="field-header">
          <span class="field-label">Style: Author's Note</span>
          <div class="field-meta">
            <span class="char-count" id="cc-authornote">${output.authorNote.length} / 500</span>
            ${showNarrate ? `<button class="btn-narrate" onclick="narrate(document.getElementById('field-authornote').value,this)">${SVG_NARRATE_ICON}</button>` : ""}
            <button class="btn-copy" onclick="copyField('field-authornote',this)">Copy</button>
          </div>
        </div>
        <textarea class="field-textarea" id="field-authornote" rows="3"
          oninput="updateCount(this,'cc-authornote',500)">${escHtml(output.authorNote)}</textarea>
      </div>`
          : ""
      }

    </div>
  </div>

  <!-- CHARACTER ENTRIES -->
  <div class="card" id="card-entries">
    <div class="card-header">
      <span class="card-title">⚙ AI Generated Character Story Cards</span>
    </div>
    <div class="card-body">

      <div class="protagonist-section" style="margin-bottom:1.5rem;">
        <div class="field-header">
          <div>
            <span class="npc-section-name" style="font-size:0.85rem;">${sk.name} — Protagonist</span>
            <div class="npc-entry-meta">${sk.gender} · ${sk.ethnicityBroad}</div>
          </div>
          <div class="field-meta">
            <span class="char-count" id="cc-protagonist">${output.characterEntry.length} / 1000</span>
            ${showNarrate ? `<button class="btn-narrate" onclick="narrate(document.getElementById('field-protagonist').value,this)">${SVG_NARRATE_ICON}</button>` : ""}
            <button class="btn-copy" onclick="copyField('field-protagonist',this)">Copy</button>
          </div>
        </div>
        <textarea class="field-textarea" id="field-protagonist" rows="5"
          oninput="updateCount(this,'cc-protagonist',1000)">${escHtml(output.characterEntry)}</textarea>
      </div>

      ${npcEntriesHTML}

    </div>
  </div>

  <div class="copy-all-wrap">
    <button class="btn-copy-all" onclick="copyAll(this)">
      ⚙ Copy Full Text To Clipboard (JSON)
    </button>
    <button class="btn-copy-all" onclick="downloadPackage(this)" style="margin-top:0.5rem;">
      ↓ Download Package (.zip)
    </button>
    <button class="btn-copy-all" id="btn-import-ai-dungeon" onclick="importToAIDungeon(this)" style="margin-top:0.5rem;display:none;">
      ↑ Import to AI Dungeon (Beta)
    </button>
    <div class="bottom-actions">
      <button class="btn-go-top" onclick="window.scrollTo({top:0,behavior:'smooth'})">↑ Go to Top</button>
    </div>
  </div>
  <div id="gen-stats"></div>
  `;
}

function escHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// ═══════════════════════════════════════════════════════════════════════════
// INTERACTIVE FUNCTIONS
// ═══════════════════════════════════════════════════════════════════════════

function updateCount(el, counterId, limit) {
  const counter = document.getElementById(counterId);
  if (!counter) return;
  counter.textContent = `${el.value.length} / ${limit}`;
  counter.classList.toggle("over", el.value.length > limit);
}

async function copyField(id, btn) {
  const el = document.getElementById(id);
  if (!el) return;
  await copyText(el.value ?? el.textContent, btn);
}

async function copyTags(btn) {
  const pills = document.querySelectorAll("#tags-wrap .tag-pill");
  const text = Array.from(pills)
    .map((p) => p.textContent)
    .join(", ");
  await copyText(text, btn);
}

// Mirrors STATIC_CARD_TYPE_MAP in web/tools/aidungeon-importer.mjs — keep in sync.
const STATIC_CARD_TYPE_MAP = {
  STATIC_CHARACTERS: "character",
  STATIC_CLASSES: "class",
  STATIC_RACES: "race",
  STATIC_LOCATIONS: "location",
  STATIC_FACTIONS: "faction",
  STATIC_CUSTOM: "custom",
};

// Shared by copyAll() and downloadPackage() so the two never drift out of sync.
function buildScenarioPayload() {
  const annotatedStats = Object.fromEntries(
    Object.entries(state.currentSkeleton.stats).map(([k, v]) => [
      k,
      `${v} (${statAdjective(k, v)})`,
    ]),
  );

  const genreCards = STATIC_CARDS_BY_GENRE[state.currentGenre];
  const staticCards = genreCards
    ? Object.entries(STATIC_CARD_TYPE_MAP).flatMap(([exportName, type]) =>
        (genreCards[exportName] ?? []).map(({ name, triggers, entry }) => ({
          type,
          title: name,
          keys: triggers,
          value: entry,
        })),
      )
    : [];

  return {
    skeleton: { ...state.currentSkeleton, stats: annotatedStats },
    scenario: {
      genre: state.currentGenre,
      title: state.currentOutput.title,
      description: state.currentOutput.description,
      tags: state.currentOutput.tags,
      opening: state.currentOutput.opening,
      appearancePrompt: state.currentOutput.appearancePrompt,
      plotEssentials: state.currentOutput.plotEssentials ?? "",
      authorNote: state.currentOutput.authorNote ?? "",
    },
    characters: {
      [state.currentSkeleton.name]: state.currentOutput.characterEntry,
      ...state.currentOutput.npcEntries,
    },
    staticCards,
  };
}

// ── Runtime genre-pack registration ────────────────────────────────────────
// Registers a declarative genre pack (see generator/pack-loader.js) into every
// live registry so a newly-loaded genre behaves exactly like a built-in one —
// generation, carousel, portrait style, TTS, music, slot machine, prompt voice,
// and static cards. Mutates the imported registry objects in place (their
// contents are mutable even though the bindings are const) and refreshes the
// carousel. Returns { ok, id, errors }.
function registerGenrePack(pack, { assetBase } = {}) {
  const loaded = loadPack(pack);
  if (loaded.errors && loaded.errors.length)
    return { ok: false, id: pack?.id, errors: loaded.errors };
  const { id, tables, manifest, voice, staticCards } = loaded;

  GENRE_TABLES[id] = tables;
  GENRE_MANIFESTS[id] = manifest;
  GENRE_VOICE[id] = voice;
  STATIC_CARDS_BY_GENRE[id] = staticCards;

  // Keep the precomputed presentation maps (snapshots taken at load) in sync.
  GENRE_PORTRAIT_STYLES[id] = manifest.portraitStyle;
  GENRE_TTS_CONFIG[id] = buildTtsConfigEntry(manifest);
  GENRE_MUSIC_PREFIX[id] = manifest.music.prefix;
  GENRE_MUSIC_TRACKS[manifest.music.prefix] = manifest.music.tracks;

  // Where this pack's icons/audio are served from (a real dir for built-ins, a
  // blob: base for uploaded packs). Recorded for the asset resolver (see
  // iconBaseFor / pickGenreTrack). null → fall back to the conventional path.
  PACK_ASSET_BASE[id] = assetBase ?? null;

  if (!GENRE_CAROUSEL_DATA.some((c) => c.id === id))
    GENRE_CAROUSEL_DATA.push({
      id,
      label: manifest.label,
      desc: manifest.description,
    });

  // The toolbar dropdown is a plain <select>; keep its options in sync with the
  // carousel so an imported pack is selectable there too.
  const sel = document.getElementById("genre-select");
  if (sel && !sel.querySelector(`option[value="${id}"]`))
    sel.appendChild(new Option(manifest.label, id));

  renderCarouselCard();
  renderCarouselIndicator();
  return { ok: true, id, errors: [] };
}

// Genre ids that ship with the app — never removable via the pack manager.
const BUILTIN_GENRE_IDS = new Set(Object.keys(GENRE_TABLES));

function unregisterGenrePack(id) {
  if (BUILTIN_GENRE_IDS.has(id)) return;
  const prefix = GENRE_MANIFESTS[id]?.music?.prefix;
  delete GENRE_TABLES[id];
  delete GENRE_MANIFESTS[id];
  delete GENRE_VOICE[id];
  delete STATIC_CARDS_BY_GENRE[id];
  delete GENRE_PORTRAIT_STYLES[id];
  delete GENRE_TTS_CONFIG[id];
  delete GENRE_MUSIC_PREFIX[id];
  delete PACK_ASSET_BASE[id];
  if (
    prefix &&
    !Object.values(GENRE_MANIFESTS).some((m) => m.music?.prefix === prefix)
  )
    delete GENRE_MUSIC_TRACKS[prefix];
  releasePackAssets(id); // revoke any blob: URLs (see asset serving)
  const i = GENRE_CAROUSEL_DATA.findIndex((c) => c.id === id);
  if (i !== -1) GENRE_CAROUSEL_DATA.splice(i, 1);
  document
    .getElementById("genre-select")
    ?.querySelector(`option[value="${id}"]`)
    ?.remove();
  if (state.currentGenre === id) {
    carouselIndex = 0;
    setGenre(GENRE_CAROUSEL_DATA[0].id);
  }
  renderCarouselCard();
  renderCarouselIndicator();
}

// ── Genre-pack persistence (IndexedDB) ──────────────────────────────────────
const PACK_DB = "fatevend",
  PACK_STORE = "genrePacks";
function packDbOpen() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(PACK_DB, 1);
    req.onupgradeneeded = () => {
      if (!req.result.objectStoreNames.contains(PACK_STORE))
        req.result.createObjectStore(PACK_STORE, { keyPath: "id" });
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}
function packDbTx(mode, fn) {
  return packDbOpen().then(
    (db) =>
      new Promise((resolve, reject) => {
        const tx = db.transaction(PACK_STORE, mode);
        const store = tx.objectStore(PACK_STORE);
        const out = fn(store);
        tx.oncomplete = () => resolve(out?.result ?? out);
        tx.onerror = () => reject(tx.error);
      }),
  );
}
const packDbGetAll = () => packDbTx("readonly", (s) => s.getAll());
const packDbPut = (rec) => packDbTx("readwrite", (s) => s.put(rec));
const packDbDelete = (id) => packDbTx("readwrite", (s) => s.delete(id));

// Parse a user-selected file (.json or .zip) into a pack object + its asset blobs.
async function parseGenrePackFile(file) {
  if (/\.zip$/i.test(file.name) || file.type === "application/zip") {
    if (typeof JSZip === "undefined")
      throw new Error("JSZip not loaded — cannot read .zip packs.");
    const zip = await JSZip.loadAsync(file);
    const manifestEntry =
      zip.file("manifest.json") || zip.file(/(^|\/)manifest\.json$/i)[0];
    if (!manifestEntry) throw new Error("No manifest.json found in the zip.");
    const pack = JSON.parse(await manifestEntry.async("string"));
    const assets = {}; // logical path (e.g. "icons/RACE#x.webp" or "audio/y.mp3") → Blob
    await Promise.all(
      Object.values(zip.files)
        .filter((f) => !f.dir && /^(icons|audio)\//i.test(f.name))
        .map(async (f) => {
          assets[f.name] = await f.async("blob");
        }),
    );
    return { pack, assets };
  }
  return { pack: JSON.parse(await file.text()), assets: {} };
}

async function installGenrePackFromFile(file) {
  const statusEl = document.getElementById("genre-pack-status");
  const setStatus = (msg, ok) => {
    if (statusEl) {
      statusEl.textContent = msg;
      statusEl.style.color =
        ok === false
          ? "var(--danger, #c0392b)"
          : ok
            ? "var(--brass, #b87333)"
            : "";
    }
  };
  try {
    setStatus("Reading pack…");
    const { pack, assets } = await parseGenrePackFile(file);
    const errors = validatePack(pack);
    if (errors.length) {
      setStatus("Invalid pack: " + errors.slice(0, 3).join(" "), false);
      return;
    }
    if (BUILTIN_GENRE_IDS.has(pack.id)) {
      setStatus(
        `"${pack.id}" is a built-in genre id — rename the pack's id.`,
        false,
      );
      return;
    }
    const assetBase = await installPackAssets(pack.id, assets); // blob: URLs (see asset serving)
    const res = registerGenrePack(pack, { assetBase });
    if (!res.ok) {
      setStatus("Could not register: " + res.errors.join(" "), false);
      return;
    }
    // Persist the extracted asset Blobs alongside the pack so a zipped pack's
    // icons/audio survive a reload — blob: URLs are per-document and die on
    // refresh, so loadStoredGenrePacks() rebuilds them from these stored Blobs.
    await packDbPut({ id: pack.id, pack, assets, updatedAt: Date.now() });
    renderGenrePackList();
    setStatus(
      `Installed "${pack.label}". Select it in the genre carousel.`,
      true,
    );
    const idx = GENRE_CAROUSEL_DATA.findIndex((c) => c.id === pack.id);
    if (idx !== -1) goToCarouselIndex(idx);
  } catch (err) {
    console.error("Genre pack install failed:", err);
    setStatus("Import failed: " + err.message, false);
  }
}

async function loadStoredGenrePacks() {
  let records = [];
  try {
    records = await packDbGetAll();
  } catch (e) {
    console.warn("Could not read stored genre packs:", e);
    return;
  }
  for (const rec of records) {
    try {
      const assetBase = await installPackAssets(rec.id, rec.assets ?? {});
      registerGenrePack(rec.pack, { assetBase });
    } catch (e) {
      console.warn(`Failed to register stored pack "${rec.id}":`, e);
    }
  }
  renderGenrePackList();
}

async function removeInstalledPack(id) {
  try {
    await packDbDelete(id);
  } catch (e) {
    console.warn("Pack delete failed:", e);
  }
  unregisterGenrePack(id);
  renderGenrePackList();
}

// Lists the sample/example packs checked into web/genre-packs/ as plain download
// links (via a small hand-maintained index.json) so a phone — which can't browse
// a repo folder the way a desktop file picker can — has some way to grab a pack
// file at all before feeding it into the Import field above.
async function renderDownloadablePacks() {
  const el = document.getElementById("genre-pack-downloads");
  if (!el) return;
  let packs;
  try {
    const res = await fetch("genre-packs/index.json", {
      cache: "no-store",
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    packs = await res.json();
  } catch (e) {
    console.warn("Could not load downloadable genre packs list:", e);
    el.innerHTML = "";
    return;
  }
  el.innerHTML = packs
    .map(
      (p) => `
    <div class="settings-option-row" style="justify-content:space-between;">
      <span class="settings-pack-name">${p.label} <span class="settings-hint">(${p.file})</span></span>
      <a class="settings-btn-secondary" href="genre-packs/${p.file}" download style="padding:0.15rem 0.6rem;text-decoration:none;">Download</a>
    </div>`,
    )
    .join("");
}

function renderGenrePackList() {
  const el = document.getElementById("genre-pack-list");
  if (!el) return;
  const installed = GENRE_CAROUSEL_DATA.filter(
    (c) => !BUILTIN_GENRE_IDS.has(c.id),
  );
  if (!installed.length) {
    el.innerHTML = "";
    return;
  }
  el.innerHTML =
    '<div class="settings-hint" style="margin-bottom:0.25rem;">Installed packs</div>' +
    installed
      .map(
        (c) => `
      <div class="settings-option-row" style="justify-content:space-between;">
        <span class="settings-pack-name">${c.label} <span class="settings-hint">(${c.id})</span></span>
        <button class="settings-btn-secondary" data-remove-pack="${c.id}" style="padding:0.15rem 0.6rem;">Remove</button>
      </div>`,
      )
      .join("");
  el.querySelectorAll("[data-remove-pack]").forEach((btn) =>
    btn.addEventListener("click", () =>
      removeInstalledPack(btn.getAttribute("data-remove-pack")),
    ),
  );
}

async function copyAll(btn) {
  if (!state.currentOutput || !state.currentSkeleton) return;
  await copyText(JSON.stringify(buildScenarioPayload(), null, 2), btn);
}

async function downloadPackage(btn) {
  if (!state.currentOutput || !state.currentSkeleton) return;
  if (typeof JSZip === "undefined") {
    alert("JSZip library not loaded — check your internet connection.");
    return;
  }

  const origText = btn.textContent;
  btn.disabled = true;
  btn.textContent = "⚙ Building…";

  try {
    const payload = buildScenarioPayload();

    const zip = new JSZip();
    zip.file("scenario.json", JSON.stringify(payload, null, 2));

    const portraitImg = document.querySelector("#portrait-wrap img");
    if (portraitImg?.src?.startsWith("data:image/")) {
      const base64 = portraitImg.src.split(",")[1];
      zip.file("portrait.png", base64, { base64: true });
    }

    for (const [npcName, src] of Object.entries(npcPortraitData)) {
      if (src?.startsWith("data:image/")) {
        const base64 = src.split(",")[1];
        const safeFname = npcName
          .replace(/[^a-zA-Z0-9]+/g, "-")
          .replace(/^-|-$/g, "");
        zip.file(`npc-portraits/${safeFname}.png`, base64, {
          base64: true,
        });
      }
    }

    const dt = (currentGeneratedAt ?? new Date())
      .toISOString()
      .replace(/:/g, "-")
      .replace(/\.\d{3}Z$/, "Z");
    const safeName = state.currentSkeleton.name
      .replace(/[^a-zA-Z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
    const safeTitle = state.currentOutput.title
      .replace(/[^a-zA-Z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
    const filename = `${safeName}-${safeTitle}-${dt}.zip`;

    const blob = await zip.generateAsync({ type: "blob" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);

    btn.textContent = "✓ Downloaded";
    setTimeout(() => {
      btn.textContent = origText;
      btn.disabled = false;
    }, 2000);
  } catch (err) {
    console.error("Download failed:", err);
    btn.textContent = "Error";
    setTimeout(() => {
      btn.textContent = origText;
      btn.disabled = false;
    }, 2000);
  }
}

async function checkImportServer() {
  const btn = document.getElementById("btn-import-ai-dungeon");
  if (!btn) return;
  try {
    const r = await fetch("http://localhost:7432/ping", {
      signal: AbortSignal.timeout(1500),
    });
    btn.style.display = r.ok ? "" : "none";
  } catch {
    btn.style.display = "none";
  }
}

async function importToAIDungeon(btn) {
  if (!state.currentOutput || !state.currentSkeleton) return;
  const origText = btn.textContent;
  btn.disabled = true;
  btn.textContent = "⚙ Importing… (this can take a minute)";
  try {
    const portraitImg = document.querySelector("#portrait-wrap img");
    const portraitBase64 = portraitImg?.src?.startsWith("data:image/")
      ? portraitImg.src.split(",")[1]
      : null;

    const payload = {
      scenario: {
        genre: state.currentGenre,
        title: state.currentOutput.title,
        description: state.currentOutput.description,
        tags: state.currentOutput.tags,
        opening: state.currentOutput.opening,
        appearancePrompt: state.currentOutput.appearancePrompt,
        plotEssentials: state.currentOutput.plotEssentials ?? "",
        authorNote: state.currentOutput.authorNote ?? "",
      },
      characters: {
        [state.currentSkeleton.name]: state.currentOutput.characterEntry,
        ...state.currentOutput.npcEntries,
      },
      portraitBase64,
    };

    const r = await fetch("http://localhost:7432/import", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const result = await r.json().catch(() => ({}));
    if (!r.ok || !result.ok)
      throw new Error(result.error || `Server returned ${r.status}`);

    btn.textContent = "✓ Import complete";
    setTimeout(() => {
      btn.textContent = origText;
      btn.disabled = false;
    }, 3000);
  } catch (err) {
    console.error("AI Dungeon import failed:", err);
    const firstLine =
      String(err.message || err)
        .split("\n")
        .find((l) => l.trim()) || "Import failed";
    btn.textContent =
      firstLine.length > 60 ? firstLine.slice(0, 57) + "…" : firstLine;
    btn.title = String(err.message || err);
    setTimeout(() => {
      btn.textContent = origText;
      btn.disabled = false;
      btn.removeAttribute("title");
    }, 6000);
  }
}

function copySkeletonText(btn) {
  if (!state.currentSkeleton) return;
  const sk = state.currentSkeleton;
  const app = [
    sk.appearance.build,
    sk.appearance.hair,
    sk.appearance.distinguishingFeature,
    ...(sk.appearance.statNotes ?? []),
  ]
    .filter(Boolean)
    .join("; ");
  const text = [
    `${sk.name}, ${sk.age}, ${sk.gender} (${sk.pronouns})`,
    `Ethnicity: ${sk.ethnicityBroad}`,
    `Stats: STR ${sk.stats.strength} | INT ${sk.stats.intelligence} | WIS ${sk.stats.wisdom} | CHA ${sk.stats.charisma} | DEX ${sk.stats.dexterity} | CON ${sk.stats.constitution}`,
    `MBTI: ${sk.mbti} — ${sk.mbtiLabel}`,
    `Profession: ${sk.profession} (${sk.industry}) — ${sk.sentiment}`,
    `Appearance: ${app}`,
    `Quirk: ${sk.quirk}`,
    `Economy: ${sk.economicLabel} · ${sk.housing} · ${sk.transport}`,
    `City: ${sk.cityLabel}`,
    `Life event: ${sk.lifeEvent}`,
    `Tension: ${sk.tension}`,
    `Secret [${sk.secretSeverity}]: ${sk.secret}`,
  ].join("\n");
  copyToClipboard(text);
}

// ═══════════════════════════════════════════════════════════════════════════
// MAIN GENERATE FLOW
// ═══════════════════════════════════════════════════════════════════════════

async function runGenerate() {
  if (isGenerating) return;
  isGenerating = true;
  state.currentOutput = null;
  showError("");
  closeSettings();
  activePhases = computeActivePhases();

  // Stop any audio that may be playing
  stopNarration();
  for (const sfx of [
    _bellSfx,
    _musicSfx,
    _slotMachinePullSfx,
    _slotMachineReelStopSfx,
  ]) {
    sfx.pause();
    sfx.currentTime = 0;
  }
  hidePlayer();
  const btn = document.getElementById("btn-generate");
  btn.disabled = true;
  btn.classList.add("spinning");

  // Clear old output and any lingering continue bar
  document.getElementById("output-area").innerHTML = "";

  try {
    // Phase 1 — Roll stats
    setPhase("phase-roll");
    await sleep(300);
    const stats = rollStats();

    // Phase 2 — MBTI
    setPhase("phase-mbti");
    await sleep(250);
    const mbti = assignMBTI(stats);

    // Phase 3 — Skeleton
    setPhase("phase-skeleton");
    await sleep(300);
    const tables = GENRE_TABLES[state.currentGenre] ?? GENRE_TABLES["modern"];
    const skeleton = buildSkeleton(stats, mbti, tables, {
      includeLGBQ: document.getElementById("include-lgbq")?.checked ?? true,
      includeNSFW: document.getElementById("include-nsfw")?.checked ?? false,
      prefGender: document.getElementById("pref-gender")?.value || "any",
      prefOrientation:
        document.getElementById("pref-orientation")?.value || "any",
    });
    state.currentSkeleton = skeleton;

    const outputArea = document.getElementById("output-area");

    // ── Slot machine phase ─────────────────────────────────────────────
    setStatus("The fates are deciding…");
    outputArea.innerHTML = renderSlotMachine(state.currentGenre);
    await animateSlots(skeleton, state.currentGenre);
    await sleep(1200);

    // Skeleton cards appear below the (now locked) slot machine
    outputArea.insertAdjacentHTML("beforeend", renderSkeleton(skeleton));

    await sleep(50);
    document.querySelectorAll(".card").forEach((c, i) => {
      setTimeout(() => c.classList.add("revealed"), i * 120);
    });

    // Pause — show Continue bar instead of immediately calling Claude
    outputArea.insertAdjacentHTML(
      "beforeend",
      `
      <div id="continue-bar" class="continue-bar">
        <div class="continue-bar-label">Like this character? Generate the full scenario.</div>
        <button id="btn-continue" class="btn-continue" onclick="runAIPhase()">
          <span class="gear-icon">⚙</span> Generate Scenario
        </button>
      </div>
    `,
    );
    updateContinueButtonState();

    setStatus(
      "Review the character sheet, then generate the scenario when ready.",
    );
  } catch (err) {
    showError(`Generation failed: ${err.message}`);
    setStatus("");
    clearPhases();
  } finally {
    isGenerating = false;
    btn.disabled = false;
    btn.classList.remove("spinning");
  }
}

async function runAIPhase() {
  if (isGenerating || !state.currentSkeleton) return;
  const anthropicKey = document.getElementById("api-key").value.trim();
  const geminiKey = document.getElementById("gemini-api-key").value.trim();
  const ollamaUrl = document.getElementById("ollama-url").value.trim();
  if (!anthropicKey && !geminiKey && !ollamaUrl) {
    showError(
      "Please enter an API key or Ollama URL in Settings to generate scenario content.",
    );
    return;
  }

  isGenerating = true;
  showError("");

  _musicSfx.src = pickGenreTrack(state.currentGenre);
  _musicSfx.currentTime = 0;
  _musicSfx.play().catch(() => {});
  showPlayer(_lastMusicTrack);

  const continueBtn = document.getElementById("btn-continue");
  const generateBtn = document.getElementById("btn-generate");
  if (continueBtn) {
    continueBtn.disabled = true;
    continueBtn.classList.add("spinning");
  }
  generateBtn.disabled = true;

  const outputArea = document.getElementById("output-area");

  try {
    // Remove Continue bar and insert shimmer placeholder
    document.getElementById("continue-bar")?.remove();

    activePhases = computeActivePhases();
    setPhase("phase-ai");

    outputArea.insertAdjacentHTML(
      "beforeend",
      `
      <div id="ai-placeholder" class="card ai-loading-placeholder revealed">
        <div class="card-header">
          <span class="card-title"><span class="loading-gear">⚙</span> AI Generating Scenario…</span>
        </div>
        <div class="card-body" style="padding:1.25rem 1.5rem;">
          <div class="shimmer-line" style="width:88%"></div>
          <div class="shimmer-line" style="width:72%"></div>
          <div class="shimmer-line" style="width:81%"></div>
          <div class="shimmer-line" style="width:65%"></div>
          <div class="shimmer-line" style="width:78%"></div>
          <div class="shimmer-line" style="width:55%"></div>
        </div>
      </div>
    `,
    );

    const { output, stats: textStats } = await callAI(
      state.currentSkeleton,
      state.currentGenre,
    );
    if (
      output.appearancePrompt &&
      document.getElementById("include-nsfw")?.checked &&
      state.currentSkeleton.age >= 18 &&
      state.currentSkeleton.syntheticType !== "industrial"
    ) {
      output.appearancePrompt =
        output.appearancePrompt.trimEnd().replace(/,?\s*$/, "") + nsfwSuffix;
    }
    state.currentOutput = output;
    currentGeneratedAt = new Date();
    currentStats = { text: textStats, image: null };

    document.getElementById("ai-placeholder")?.remove();

    outputArea.innerHTML += renderOutput(state.currentSkeleton, output);
    checkImportServer();
    await sleep(50);
    document.querySelectorAll(".card:not(.revealed)").forEach((c, i) => {
      setTimeout(() => c.classList.add("revealed"), i * 150);
    });

    updateStatsDisplay();

    // Auto-generate portrait(s) if a backend is configured, then fade the music
    // once all art — including auto NPC portraits, if enabled — is done.
    const hasPortraitBackend =
      output.appearancePrompt &&
      (document.getElementById("sd-url").value.trim() ||
        document.getElementById("img-api-key").value.trim());

    if (hasPortraitBackend) {
      setPhase("phase-portrait");
      await generatePortrait(null);

      const npcNames = Object.keys(output.npcEntries);
      if (
        npcNames.length &&
        document.getElementById("auto-npc-portraits")?.checked
      ) {
        setPhase("phase-npc-portraits");
        await autoGenerateAllNpcPortraits(npcNames);
      }
    }
    await fadeOutAudio(_musicSfx);
    hidePlayer();

    setStatus("Your fate is sealed. Edit and copy as needed.");

    if (
      ttsProvider !== "off" &&
      document.getElementById("auto-narrate-all")?.checked
    ) {
      narrateAll();
    }
  } catch (err) {
    document.getElementById("ai-placeholder")?.remove();
    showError(`Generation failed: ${err.message}`);
    setStatus("");
    fadeOutAudio(_musicSfx);
    hidePlayer();
    // Restore continue bar so they can try again
    outputArea.insertAdjacentHTML(
      "beforeend",
      `
      <div id="continue-bar" class="continue-bar">
        <div class="continue-bar-label">Generation failed — try again?</div>
        <button id="btn-continue" class="btn-continue" onclick="runAIPhase()">
          <span class="gear-icon">⚙</span> Generate Scenario
        </button>
      </div>
    `,
    );
    updateContinueButtonState();
  } finally {
    isGenerating = false;
    generateBtn.disabled = false;
    generateBtn.classList.remove("spinning");
  }
}

// ── Portrait generation ───────────────────────────────────────────────────
async function generatePortrait(btn) {
  const sdUrl = document.getElementById("sd-url").value.trim();
  const apiKey = document.getElementById("img-api-key").value.trim();
  const useSD =
    currentImageProvider === "sd"
      ? !!sdUrl
      : currentImageProvider === "stability"
        ? false
        : !!sdUrl; // fallback if selector not yet initialized
  if (!sdUrl && !apiKey) {
    showError(
      "Enter a local SD URL or Stability AI key to generate portraits.",
    );
    return;
  }
  if (useSD && !sdUrl) {
    showError("No Stable Diffusion URL configured.");
    return;
  }
  if (!useSD && !apiKey) {
    showError("No Stability AI key configured.");
    return;
  }
  const promptEl = document.getElementById("field-appearance");
  if (!promptEl || !promptEl.value.trim()) return;

  const portraitBtn = btn ?? document.getElementById("btn-gen-portrait");
  const wrapEl = document.getElementById("portrait-wrap");
  if (portraitBtn) {
    portraitBtn.disabled = true;
    portraitBtn.innerHTML = '<span class="loading-gear">⚙</span> Rendering…';
  }
  wrapEl.innerHTML = `<div style="color:var(--brass-light);font-style:italic;font-size:0.9rem;margin-top:0.4rem;">Painting the portrait…</div>`;

  try {
    let src;
    const imgT0 = Date.now();
    const imgBackend = useSD ? "Local Stable Diffusion" : "Stability AI";
    if (useSD) {
      // ── Local Stable Diffusion WebUI (Forge / A1111) with Flux1-dev model ──────────────────
      const res = await fetch(`${sdUrl}/sdapi/v1/txt2img`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: promptEl.value.trim(),
          negative_prompt:
            "low quality, blurry, duplicate, deformed, bad anatomy, extra limbs, text, watermark, logo",
          steps: 30,
          width: 512,
          height: 768,
          cfg_scale: 1,
          distilled_cfg_scale: 6,
          sampler_name: "Euler",
          scheduler: "Simple",
        }),
      });
      if (!res.ok) {
        const t = await res.text().catch(() => "");
        throw new Error(`SD API ${res.status}: ${t}`);
      }
      const data = await res.json();
      src = `data:image/png;base64,${data.images[0]}`;
    } else {
      // ── Stability AI fallback ─────────────────────────────────────────
      const form = new FormData();
      form.append("prompt", promptEl.value.trim());
      form.append("aspect_ratio", "2:3");
      form.append("output_format", "png");
      const res = await fetch(
        "https://api.stability.ai/v2beta/stable-image/generate/core",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${apiKey}`,
            Accept: "application/json",
          },
          body: form,
        },
      );
      if (!res.ok) {
        const t = await res.text().catch(() => "");
        throw new Error(`Stability API ${res.status}: ${t}`);
      }
      const data = await res.json();
      src = `data:image/png;base64,${data.image}`;
    }
    if (currentStats) {
      currentStats.image = {
        backend: imgBackend,
        ms: Date.now() - imgT0,
      };
      updateStatsDisplay();
    }

    const filename = `${(state.currentSkeleton?.name ?? "portrait").replace(/\s+/g, "-")}.png`;
    wrapEl.innerHTML = `
      <img src="${src}" alt="Character portrait">
      <div class="portrait-actions">
        <a href="${src}" download="${filename}" class="btn-gen-portrait" style="text-decoration:none;">↓ Save</a>
        <button class="btn-gen-portrait" onclick="generatePortrait(this)">⚙ Regenerate</button>
      </div>`;
  } catch (err) {
    wrapEl.innerHTML = `<div class="portrait-error">Portrait failed: ${err.message}</div>`;
  } finally {
    if (portraitBtn) {
      portraitBtn.disabled = false;
      portraitBtn.innerHTML = "⚙ Generate Portrait";
    }
  }
}

// ── NPC portrait popup toggle ─────────────────────────────────────────────
function toggleNpcPortraitMenu(npcName) {
  const safeName = npcName.replace(/\s+/g, "_");
  const menuEl = document.getElementById(`npc-menu-${safeName}`);
  if (!menuEl) return;
  const wasHidden = menuEl.hidden;
  document.querySelectorAll(".npc-portrait-popup").forEach((m) => {
    m.hidden = true;
  });
  menuEl.hidden = !wasHidden;
}

// ── NPC portrait generation ───────────────────────────────────────────────
const NPC_SILHOUETTE_SVG = `<svg class="npc-silhouette" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 70" aria-hidden="true"><ellipse cx="30" cy="22" rx="14" ry="15"/><path d="M2 70 Q2 46 30 46 Q58 46 58 70"/></svg>`;

async function generateNpcPortrait(npcName) {
  if (npcPortraitGenerating) {
    showError("A portrait is already being generated — please wait.");
    return;
  }

  const sdUrl = document.getElementById("sd-url").value.trim();
  const apiKey = document.getElementById("img-api-key").value.trim();
  const useSD =
    currentImageProvider === "sd"
      ? !!sdUrl
      : currentImageProvider === "stability"
        ? false
        : !!sdUrl;
  if (!sdUrl && !apiKey) {
    showError(
      "Enter a local SD URL or Stability AI key to generate portraits.",
    );
    return;
  }
  if (useSD && !sdUrl) {
    showError("No Stable Diffusion URL configured.");
    return;
  }
  if (!useSD && !apiKey) {
    showError("No Stability AI key configured.");
    return;
  }

  const safeName = npcName.replace(/\s+/g, "_");
  const textarea = document.getElementById(`npc-entry-${safeName}`);
  const thumbEl = document.getElementById(`npc-thumb-${safeName}`);
  const menuEl = document.getElementById(`npc-menu-${safeName}`);
  const genBtn = document.getElementById(`npc-gen-btn-${safeName}`);
  const saveEl = document.getElementById(`npc-save-${safeName}`);
  if (!textarea || !thumbEl) return;

  if (menuEl) menuEl.hidden = true;

  const text = textarea.value.trim();
  const sentences = text.match(/[^.!?]+[.!?]+/g) ?? [text];
  const snippet = sentences.slice(0, 2).join(" ").trim();
  const npc = state.currentSkeleton?.cast?.find((c) => c.name === npcName);
  const prefix = npc
    ? `portrait of ${npc.race} ${npc.gender.toLowerCase()}, `
    : "portrait of ";
  const portraitStyle =
    GENRE_PORTRAIT_STYLES[state.currentGenre] ??
    "photorealistic, cinematic lighting";
  const prompt = prefix + snippet + ", " + portraitStyle;

  npcPortraitGenerating = true;
  const prevHTML = thumbEl.innerHTML;
  thumbEl.innerHTML = `<div class="npc-thumb-spinner"></div>`;
  thumbEl.disabled = true;
  if (genBtn) {
    genBtn.disabled = true;
    genBtn.textContent = "Generating…";
  }

  try {
    let src;
    if (useSD) {
      const res = await fetch(`${sdUrl}/sdapi/v1/txt2img`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt,
          negative_prompt:
            "low quality, blurry, duplicate, deformed, bad anatomy, extra limbs, text, watermark, logo",
          steps: 20,
          width: 256,
          height: 256,
          cfg_scale: 1,
          distilled_cfg_scale: 6,
          sampler_name: "Euler",
          scheduler: "Simple",
        }),
      });
      if (!res.ok) {
        const t = await res.text().catch(() => "");
        throw new Error(`SD API ${res.status}: ${t}`);
      }
      const data = await res.json();
      src = `data:image/png;base64,${data.images[0]}`;
    } else {
      const form = new FormData();
      form.append("prompt", prompt);
      form.append("aspect_ratio", "1:1");
      form.append("output_format", "png");
      const res = await fetch(
        "https://api.stability.ai/v2beta/stable-image/generate/core",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${apiKey}`,
            Accept: "application/json",
          },
          body: form,
        },
      );
      if (!res.ok) {
        const t = await res.text().catch(() => "");
        throw new Error(`Stability API ${res.status}: ${t}`);
      }
      const data = await res.json();
      src = `data:image/png;base64,${data.image}`;
    }

    npcPortraitData[npcName] = src;
    thumbEl.innerHTML = `<img src="${src}" alt="${escHtml(npcName)}" class="npc-portrait-img">`;

    const safeFilename = npcName
      .replace(/[^a-zA-Z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
    if (saveEl) {
      saveEl.href = src;
      saveEl.download = `${safeFilename}.png`;
      saveEl.hidden = false;
    }
    if (genBtn) {
      genBtn.textContent = "⚙ Redo Portrait";
    }
  } catch (err) {
    thumbEl.innerHTML = prevHTML;
    showError(`Portrait failed: ${err.message}`);
  } finally {
    npcPortraitGenerating = false;
    thumbEl.disabled = false;
    if (genBtn) {
      genBtn.disabled = false;
    }
  }
}

// Runs NPC portraits one at a time — generateNpcPortrait rejects overlapping calls
async function autoGenerateAllNpcPortraits(npcNames) {
  for (const name of npcNames) {
    await generateNpcPortrait(name);
  }
}

// ── Key persistence (localStorage) ────────────────────────────────────────
const KEY_FIELDS = [
  { id: "api-key", store: "gof_api_key" },
  { id: "gemini-api-key", store: "gof_gemini_api_key" },
  { id: "ollama-url", store: "gof_ollama_url" },
  { id: "ollama-model", store: "gof_ollama_model" },
  { id: "sd-url", store: "gof_sd_url" },
  { id: "img-api-key", store: "gof_img_api_key" },
  { id: "tts-kokoro-url", store: "gof_tts_kokoro_url" },
  { id: "tts-openai-key", store: "gof_tts_openai_key" },
];

document.addEventListener("click", (e) => {
  if (!e.target.closest(".npc-portrait-zone")) {
    document.querySelectorAll(".npc-portrait-popup").forEach((m) => {
      m.hidden = true;
    });
  }
});

document.addEventListener("DOMContentLoaded", () => {
  // Version stamp from serve.sh (git commit of the running checkout), shown
  // in the Settings footer. Falls back to a static default when opened
  // directly as a file:// URL (no serve.sh, so config.js never loaded).
  const versionEl = document.getElementById("settings-version");
  if (versionEl) {
    const v = window.__GIT_VERSION__ || "dev";
    versionEl.textContent = `v${v}`;
    versionEl.title = `git commit ${v}`;
  }

  // Seed fields from serve.sh-generated config.js (takes priority — always
  // reflects the current .env key), then fall back to localStorage.
  const CONFIG_MAP = {
    "api-key": window.__ANTHROPIC_KEY,
    "gemini-api-key": window.__GEMINI_KEY,
    "sd-url": window.__SD_URL,
    "img-api-key": window.__STABILITY_KEY,
    "ollama-url": window.__OLLAMA_URL,
    "ollama-model": window.__OLLAMA_MODEL,
    "tts-kokoro-url": window.__TTS_KOKORO_URL,
    "tts-openai-key": window.__TTS_OPENAI_KEY,
  };
  KEY_FIELDS.forEach(({ id, store }) => {
    const fromConfig = CONFIG_MAP[id];
    const fromStore = localStorage.getItem(store);
    const value = fromConfig || fromStore || "";
    if (value) {
      document.getElementById(id).value = value;
      localStorage.setItem(store, value);
    }
  });

  if (window.__NSFW_SUFFIX) nsfwSuffix = window.__NSFW_SUFFIX;

  // Save on every change; update provider selector when AI keys change
  KEY_FIELDS.forEach(({ id, store }) => {
    document.getElementById(id).addEventListener("input", (e) => {
      const v = e.target.value.trim();
      if (v) localStorage.setItem(store, v);
      else localStorage.removeItem(store);
      if (id === "api-key" || id === "gemini-api-key" || id === "ollama-url")
        updateProviderSelector();
      if (id === "sd-url" || id === "img-api-key")
        updateImageProviderSelector();
      if (id === "tts-kokoro-url" || id === "tts-openai-key")
        updateNarrationProviderSelector();
    });
  });

  // Init provider selector state now that keys are loaded
  updateProviderSelector();
  updateImageProviderSelector();

  // Preload icons for the default genre so the slot animation has them cached
  preloadGenreIcons(state.currentGenre);

  // LGBQ checkbox persistence
  const lgbqEl = document.getElementById("include-lgbq");
  lgbqEl.checked = localStorage.getItem("gof_include_lgbq") !== "false";
  lgbqEl.addEventListener("change", (e) =>
    localStorage.setItem("gof_include_lgbq", e.target.checked),
  );

  // Preferred gender / orientation persistence
  const prefGenderEl = document.getElementById("pref-gender");
  prefGenderEl.value = localStorage.getItem("gof_pref_gender") || "any";
  prefGenderEl.addEventListener("change", (e) =>
    localStorage.setItem("gof_pref_gender", e.target.value),
  );

  const prefOrientationEl = document.getElementById("pref-orientation");
  prefOrientationEl.value =
    localStorage.getItem("gof_pref_orientation") || "any";
  prefOrientationEl.addEventListener("change", (e) =>
    localStorage.setItem("gof_pref_orientation", e.target.value),
  );

  // NSFW checkbox persistence
  const nsfwEl = document.getElementById("include-nsfw");
  nsfwEl.checked = localStorage.getItem("gof_include_nsfw") === "true";
  nsfwEl.addEventListener("change", (e) =>
    localStorage.setItem("gof_include_nsfw", e.target.checked),
  );

  // Auto NPC portraits checkbox persistence
  const autoNpcEl = document.getElementById("auto-npc-portraits");
  autoNpcEl.checked = localStorage.getItem("gof_auto_npc_portraits") === "true";
  autoNpcEl.addEventListener("change", (e) =>
    localStorage.setItem("gof_auto_npc_portraits", e.target.checked),
  );

  // Auto-play Narrate All checkbox persistence
  const autoNarrateEl = document.getElementById("auto-narrate-all");
  autoNarrateEl.checked =
    localStorage.getItem("gof_auto_narrate_all") === "true";
  autoNarrateEl.addEventListener("change", (e) =>
    localStorage.setItem("gof_auto_narrate_all", e.target.checked),
  );

  // Genre-pack import: wire the file input and register any previously-installed
  // packs from IndexedDB (added to the carousel on load).
  const packFileEl = document.getElementById("genre-pack-file");
  if (packFileEl)
    packFileEl.addEventListener("change", (e) => {
      const file = e.target.files?.[0];
      if (file)
        installGenrePackFromFile(file).finally(() => {
          e.target.value = "";
        });
    });
  loadStoredGenrePacks();
  renderDownloadablePacks();

  // Init genre carousel
  carouselIndex = Math.max(
    0,
    GENRE_CAROUSEL_DATA.findIndex((g) => g.id === state.currentGenre),
  );
  renderCarouselCard();
  renderCarouselIndicator();

  // Re-render the carousel track when crossing the mobile/desktop peek breakpoint
  let _lastShowPeeks = carouselShowPeeks(window.innerWidth);
  let _resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(_resizeTimer);
    _resizeTimer = setTimeout(() => {
      const showPeeks = carouselShowPeeks(window.innerWidth);
      if (showPeeks !== _lastShowPeeks) {
        _lastShowPeeks = showPeeks;
        renderCarouselCard();
      }
    }, 150);
  });

  // TTS provider persistence — setTtsProvider must run first to populate the voice select options
  const savedTtsProvider = localStorage.getItem("gof_tts_provider") || "off";
  setTtsProvider(savedTtsProvider);
  updateNarrationProviderSelector(); // show/hide Kokoro+OpenAI buttons after provider is restored
  // Restore saved voice/speed on top of genre defaults (silently ignored if not a valid option)
  const savedVoice = localStorage.getItem("gof_tts_voice_override");
  const ttsVoiceEl = document.getElementById("tts-voice-override");
  if (savedVoice && ttsVoiceEl && !ttsVoiceEl.disabled)
    ttsVoiceEl.value = savedVoice;
  const savedSpeed = localStorage.getItem("gof_tts_speed_override");
  const ttsSpeedEl = document.getElementById("tts-speed-override");
  if (savedSpeed && ttsSpeedEl) ttsSpeedEl.value = savedSpeed;
});

function openSettings() {
  document.getElementById("settings-overlay").classList.add("open");
}
function closeSettings() {
  document.getElementById("settings-overlay").classList.remove("open");
}

function toggleHelp(show) {
  document.getElementById("help-overlay")?.classList.toggle("open", show);
}

function updateStatsDisplay() {
  const el = document.getElementById("gen-stats");
  if (!el || !currentStats) return;
  const { text, image } = currentStats;
  const fmtMs = (ms) =>
    ms >= 1000 ? `${(ms / 1000).toFixed(1)} s` : `${ms} ms`;
  const fmtN = (n) => Number(n).toLocaleString();
  const providerLabel = text.provider === "claude" ? "Claude" : "Gemini";

  let imageRow = "";
  if (image) {
    imageRow = `
      <div class="gen-stats-row">
        <span class="gen-stats-icon">⊕</span>
        <span class="gen-stats-label">Image</span>
        <span class="gen-stats-provider">${image.backend}</span>
        <span class="gen-stats-sep">·</span>
        <span class="gen-stats-time">${fmtMs(image.ms)}</span>
      </div>`;
  }

  el.innerHTML = `
    <div class="gen-stats-inner">
      <div class="gen-stats-title">Generation Stats</div>
      <div class="gen-stats-row">
        <span class="gen-stats-icon">✦</span>
        <span class="gen-stats-label">Text</span>
        <span class="gen-stats-provider">${providerLabel}</span>
        <span class="gen-stats-model">${text.model}</span>
        <span class="gen-stats-sep">·</span>
        <span class="gen-stats-time">${fmtMs(text.ms)}</span>
        <span class="gen-stats-sep">·</span>
        <span class="gen-stats-tokens">${fmtN(text.inputTokens)} in · ${fmtN(text.outputTokens)} out</span>
      </div>
      ${imageRow}
    </div>`;
}

function switchSettingsTab(tab) {
  document
    .querySelectorAll(".settings-tab")
    .forEach((b) => b.classList.toggle("active", b.dataset.tab === tab));
  document
    .querySelectorAll(".settings-tab-panel")
    .forEach((p) => p.classList.toggle("active", p.id === `tab-${tab}`));
}

// Expose module functions to inline HTML event handlers
Object.assign(window, {
  runGenerate,
  runAIPhase,
  setGenre,
  setProvider,
  setImageProvider,
  toggleHelp,
  openSettings,
  closeSettings,
  copyField,
  copyAll,
  copySkeletonText,
  copyTags,
  generatePortrait,
  generateNpcPortrait,
  toggleNpcPortraitMenu,
  updateCount,
  downloadPackage,
  narrate,
  stopNarration,
  narrateAll,
  setTtsProvider,
  setTtsVoiceOverride,
  switchSettingsTab,
  importToAIDungeon,
  checkImportServer,
  carouselStep,
  goToCarouselIndex,
  onToolbarGenreChange,
  playerPrev,
  playerNext,
  playerStop,
  playerPlay,
  registerGenrePack,
});
