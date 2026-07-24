// narration.js
// Text-to-speech narration subsystem — the "Narrate" / "Narrate All" buttons and
// everything behind them: per-provider synthesis (browser SpeechSynthesis,
// Kokoro, OpenAI), voice/config selection, genre-specific text preprocessing,
// and the chunked playback pipeline. Owns its own runtime state (the tts* vars
// and GENRE_TTS_CONFIG); reads the shared app state object for the current
// genre/output/skeleton. Frontend module (lives in web/, not web/generator/,
// which is backend/CLI-shared code only).
//
// Circular-import note: this imports showError from app.js while app.js imports
// this module's public API. That's safe because every cross-module reference is
// used at call time (button clicks, fetch failures), never at module-evaluation
// time, so neither binding is touched before both modules finish evaluating.

import { GENRE_MANIFESTS } from "./generator/manifests.js";
import { state } from "./state.js";
import { showError } from "./app.js";

// The narrate button's speaker glyph. Exported because app.js renders it into
// the output field buttons; setNarrateButtonState() restores it when idle.
export const SVG_NARRATE_ICON = `<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" style="vertical-align:middle"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/></svg>`;

// ── TTS runtime state ───────────────────────────────────────────────────────
// ttsProvider is exported (read by app.js to show/hide narrate buttons and to
// downgrade an unavailable provider); the rest are private to this module.
export let ttsProvider = "off";
let ttsAudio = null;
let ttsSpeaking = false;
let ttsAllActive = false;
let ttsNarrateBtn = null;

// ── TTS preprocessors ──────────────────────────────────────────────────────
function preprocessTts(text) {
  return text
    .replace(/STR\s+\d+[^|]*(\|[^|]*)+/g, "")
    .replace(/\(Append to end of Description\)/gi, "")
    .replace(/\n{3,}/g, "\n\n")
    .replace(/—/g, " — ")
    .trim();
}
function preprocessTtsNihongi(text) {
  return preprocessTts(text)
    .replace(/\bkami\b/gi, "kami,")
    .replace(/\bYomi\b/g, "Yoh-mee")
    .replace(/\bkegare\b/gi, "keh-gah-reh")
    .replace(/\bgory[oō]\b/gi, "gohr-yoh")
    .replace(/\bmisogi\b/gi, "mee-soh-gee")
    .replace(/\bkitsune\b/gi, "kit-sue-neh");
}
function preprocessTtsManga(text) {
  return preprocessTts(text).replace(/!{2,}/g, "!");
}

// ── TTS provider / config ──────────────────────────────────────────────────
const KOKORO_VOICES = [
  "af_bella",
  "af_sky",
  "af_nicole",
  "am_adam",
  "am_michael",
  "bf_emma",
  "bf_isabella",
  "bm_george",
  "bm_lewis",
  "jf_alpha",
  "jf_gongitsune",
  "jm_kumo",
];

const KOKORO_VOICE_PREFIX = {
  af: "American Female",
  am: "American Male",
  bf: "British Female",
  bm: "British Male",
  ef: "Spanish Female",
  em: "Spanish Male",
  ff: "French Female",
  fm: "French Male",
  if: "Italian Female",
  im: "Italian Male",
  hf: "Hindi Female",
  hm: "Hindi Male",
  jf: "Japanese Female",
  jm: "Japanese Male",
  pf: "Portuguese Female",
  pm: "Portuguese Male",
  zf: "Chinese Female",
  zm: "Chinese Male",
};

function kokoroVoiceLabel(id) {
  const m = id.match(/^([a-z]+)_(.+)$/);
  if (!m) return id;
  const [, prefix, name] = m;
  const category = KOKORO_VOICE_PREFIX[prefix];
  const displayName = name.charAt(0).toUpperCase() + name.slice(1);
  return category ? `${displayName} (${category})` : id;
}

const OPENAI_VOICES = [
  { value: "alloy", label: "alloy — neutral" },
  { value: "echo", label: "echo — male" },
  { value: "fable", label: "fable — storyteller" },
  { value: "nova", label: "nova — female" },
  { value: "onyx", label: "onyx — deep male" },
  { value: "shimmer", label: "shimmer — soft female" },
];

export function setTtsProvider(val) {
  ttsProvider = val;
  localStorage.setItem("gof_tts_provider", val);
  const provEl = document.getElementById("tts-provider");
  if (provEl) provEl.value = val;

  const narSel = document.getElementById("toolbar-narration");
  if (narSel) narSel.value = val;

  const voiceEl = document.getElementById("tts-voice-override");
  const speedEl = document.getElementById("tts-speed-override");
  const cfg =
    GENRE_TTS_CONFIG[state.currentGenre] ?? GENRE_TTS_CONFIG["modern"];

  if (val === "kokoro") {
    if (voiceEl) populateKokoroVoices(voiceEl);
    if (speedEl) speedEl.value = cfg.kokoro.speed ?? 1.0;
  } else if (val === "openai") {
    if (voiceEl) {
      voiceEl.innerHTML =
        '<option value="">— Genre default —</option>' +
        OPENAI_VOICES.map(
          (v) => `<option value="${v.value}">${v.label}</option>`,
        ).join("");
      voiceEl.disabled = false;
      voiceEl.value = localStorage.getItem("gof_tts_voice_override") || "";
    }
    if (speedEl) speedEl.value = cfg.openai.speed ?? 1.0;
  } else if (val === "browser") {
    if (voiceEl) populateBrowserVoices(voiceEl);
    if (speedEl) speedEl.value = cfg.browser.rate ?? 1.0;
  } else {
    if (voiceEl) {
      voiceEl.innerHTML =
        '<option value="">— select a provider first —</option>';
      voiceEl.disabled = true;
    }
    if (speedEl) speedEl.value = "";
  }
}

export function setTtsVoiceOverride(val) {
  if (val) localStorage.setItem("gof_tts_voice_override", val);
  else localStorage.removeItem("gof_tts_voice_override");
}

async function populateKokoroVoices(voiceEl) {
  const defaultOption = '<option value="">— Genre default —</option>';
  const kokoroUrl = document.getElementById("tts-kokoro-url")?.value.trim();
  if (!kokoroUrl) {
    voiceEl.innerHTML =
      defaultOption +
      KOKORO_VOICES.map(
        (id) => `<option value="${id}">${kokoroVoiceLabel(id)}</option>`,
      ).join("");
    voiceEl.disabled = false;
    voiceEl.value = localStorage.getItem("gof_tts_voice_override") || "";
    return;
  }
  voiceEl.innerHTML = '<option value="">Loading voices…</option>';
  voiceEl.disabled = true;
  try {
    const res = await fetch(`${kokoroUrl.replace(/\/$/, "")}/v1/audio/voices`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    const voices = Array.isArray(data)
      ? data
      : (data.voices ?? data.data ?? []);
    if (voices.length === 0) throw new Error("empty");
    voiceEl.innerHTML =
      defaultOption +
      voices
        .map((v) => {
          const id =
            typeof v === "string"
              ? v
              : (v.voice_id ?? v.id ?? v.name ?? String(v));
          return `<option value="${id}">${kokoroVoiceLabel(id)}</option>`;
        })
        .join("");
  } catch {
    voiceEl.innerHTML =
      defaultOption +
      KOKORO_VOICES.map(
        (id) => `<option value="${id}">${kokoroVoiceLabel(id)}</option>`,
      ).join("");
  }
  voiceEl.disabled = false;
  const target = localStorage.getItem("gof_tts_voice_override") || "";
  voiceEl.value =
    target && [...voiceEl.options].some((o) => o.value === target)
      ? target
      : "";
}

function populateBrowserVoices(voiceEl) {
  function fill() {
    const voices = speechSynthesis.getVoices();
    const saved = localStorage.getItem("gof_tts_voice_override") || "";
    if (voices.length === 0) {
      voiceEl.innerHTML = '<option value="">System default</option>';
      voiceEl.disabled = true;
      return;
    }
    voiceEl.innerHTML =
      '<option value="">System default</option>' +
      voices
        .map(
          (v) =>
            `<option value="${v.voiceURI}">${v.name}${v.default ? " ★" : ""}</option>`,
        )
        .join("");
    voiceEl.disabled = false;
    if (saved && [...voiceEl.options].some((o) => o.value === saved))
      voiceEl.value = saved;
  }
  fill();
  if (speechSynthesis.getVoices().length === 0) {
    speechSynthesis.addEventListener("voiceschanged", fill, {
      once: true,
    });
  }
}

function getEffectiveTtsConfig() {
  const base =
    GENRE_TTS_CONFIG[state.currentGenre] ?? GENRE_TTS_CONFIG["modern"];
  const voice = document.getElementById("tts-voice-override")?.value || null;
  const speed =
    parseFloat(document.getElementById("tts-speed-override")?.value) || null;
  return {
    preprocess: base.preprocess,
    browser: {
      ...base.browser,
      ...(speed && { rate: speed }),
      ...(voice && { voiceURI: voice }),
    },
    kokoro: {
      voice: voice ?? base.kokoro.voice,
      speed: speed ?? base.kokoro.speed,
    },
    openai: {
      voice: voice ?? base.openai.voice,
      speed: speed ?? base.openai.speed,
    },
  };
}

// ── Core narrate / stop ────────────────────────────────────────────────────
function setNarrateButtonState(btn, mode) {
  if (!btn) return;
  btn.classList.remove("loading", "speaking");
  if (mode === "loading") {
    btn.textContent = "◌";
    btn.classList.add("loading");
  } else if (mode === "speaking") {
    btn.textContent = "⏸";
    btn.classList.add("speaking");
  } else {
    btn.innerHTML = SVG_NARRATE_ICON;
  }
}

export function stopNarration() {
  ttsAllActive = false;
  ttsSpeaking = false;
  setNarrateButtonState(ttsNarrateBtn, "idle");
  ttsNarrateBtn = null;
  if (ttsAudio) {
    ttsAudio.pause();
    ttsAudio = null;
  }
  if (typeof speechSynthesis !== "undefined") speechSynthesis.cancel();
  const stopBtn = document.getElementById("btn-tts-stop");
  if (stopBtn) stopBtn.hidden = true;
}

export function narrate(text, btn = null) {
  if (ttsProvider === "off") return;
  if (btn && btn === ttsNarrateBtn && ttsSpeaking) {
    stopNarration();
    return;
  }
  stopNarration();
  const cfg = getEffectiveTtsConfig();
  const clean = (cfg.preprocess ?? preprocessTts)(text);
  if (!clean) return;
  ttsNarrateBtn = btn;
  ttsSpeaking = true;
  setNarrateButtonState(btn, "loading");
  const stopBtn = document.getElementById("btn-tts-stop");
  if (stopBtn) stopBtn.hidden = false;
  if (ttsProvider === "browser") narrateBrowser(clean, cfg.browser);
  else if (ttsProvider === "kokoro") narrateKokoro(clean, cfg.kokoro);
  else if (ttsProvider === "openai") narrateOpenAI(clean, cfg.openai);
}

function narrateBrowser(text, cfg) {
  setNarrateButtonState(ttsNarrateBtn, "speaking");
  const utt = new SpeechSynthesisUtterance(text);
  utt.rate = cfg.rate ?? 1.0;
  utt.pitch = cfg.pitch ?? 1.0;
  if (cfg.voiceURI) {
    const voice = speechSynthesis
      .getVoices()
      .find((v) => v.voiceURI === cfg.voiceURI);
    if (voice) utt.voice = voice;
  }
  utt.onend = utt.onerror = () => {
    stopNarration();
  };
  speechSynthesis.speak(utt);
}

async function narrateKokoro(text, cfg) {
  const url = document.getElementById("tts-kokoro-url")?.value.trim();
  if (!url) {
    showError("Kokoro URL not set — add it in Settings › Narration.");
    stopNarration();
    return;
  }
  try {
    const res = await fetch(`${url.replace(/\/$/, "")}/v1/audio/speech`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "kokoro",
        input: text,
        voice: cfg.voice,
        speed: cfg.speed ?? 1.0,
      }),
    });
    if (!res.ok) throw new Error(`Kokoro ${res.status}`);
    const blob = await res.blob();
    if (!ttsSpeaking) return;
    ttsAudio = new Audio(URL.createObjectURL(blob));
    setNarrateButtonState(ttsNarrateBtn, "speaking");
    ttsAudio.onended = ttsAudio.onerror = () => {
      stopNarration();
    };
    ttsAudio.play();
  } catch (err) {
    stopNarration();
    showError(`Kokoro TTS failed: ${err.message}`);
  }
}

async function narrateOpenAI(text, cfg) {
  const key = document.getElementById("tts-openai-key")?.value.trim();
  if (!key) {
    showError("OpenAI key not set — add it in Settings › Narration.");
    stopNarration();
    return;
  }
  try {
    const res = await fetch("https://api.openai.com/v1/audio/speech", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${key}`,
      },
      body: JSON.stringify({
        model: "tts-1",
        input: text,
        voice: cfg.voice,
        speed: cfg.speed ?? 1.0,
      }),
    });
    if (!res.ok) throw new Error(`OpenAI TTS ${res.status}`);
    const blob = await res.blob();
    if (!ttsSpeaking) return;
    ttsAudio = new Audio(URL.createObjectURL(blob));
    setNarrateButtonState(ttsNarrateBtn, "speaking");
    ttsAudio.onended = ttsAudio.onerror = () => {
      stopNarration();
    };
    ttsAudio.play();
  } catch (err) {
    stopNarration();
    showError(`OpenAI TTS failed: ${err.message}`);
  }
}

// Split text into sentence-boundary chunks for pipelined TTS
function splitNarrationChunks(text, maxLen = 350) {
  const sentences = text.match(/[^.!?]+[.!?]+\s*/g) ?? [text];
  const chunks = [];
  let cur = "";
  for (const s of sentences) {
    if (cur.length + s.length > maxLen && cur) {
      chunks.push(cur.trim());
      cur = s;
    } else cur += s;
  }
  if (cur.trim()) chunks.push(cur.trim());
  return chunks.filter(Boolean);
}

// Fetch a TTS audio blob from the configured cloud provider
async function _fetchTtsBlob(text, cfg) {
  if (ttsProvider === "kokoro") {
    const url = document.getElementById("tts-kokoro-url")?.value.trim();
    if (!url)
      throw new Error("Kokoro URL not set — add it in Settings › Narration.");
    const res = await fetch(`${url.replace(/\/$/, "")}/v1/audio/speech`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "kokoro",
        input: text,
        voice: cfg.kokoro.voice,
        speed: cfg.kokoro.speed ?? 1.0,
      }),
    });
    if (!res.ok) throw new Error(`Kokoro ${res.status}`);
    return res.blob();
  }
  if (ttsProvider === "openai") {
    const key = document.getElementById("tts-openai-key")?.value.trim();
    if (!key)
      throw new Error("OpenAI key not set — add it in Settings › Narration.");
    const res = await fetch("https://api.openai.com/v1/audio/speech", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${key}`,
      },
      body: JSON.stringify({
        model: "tts-1",
        input: text,
        voice: cfg.openai.voice,
        speed: cfg.openai.speed ?? 1.0,
      }),
    });
    if (!res.ok) throw new Error(`OpenAI TTS ${res.status}`);
    return res.blob();
  }
}

// Play a blob and resolve when playback ends
function _playAudioBlob(blob) {
  return new Promise((resolve, reject) => {
    if (ttsAudio) {
      ttsAudio.pause();
      ttsAudio = null;
    }
    ttsAudio = new Audio(URL.createObjectURL(blob));
    ttsAudio.onended = () => {
      ttsAudio = null;
      resolve();
    };
    ttsAudio.onerror = () => {
      ttsAudio = null;
      reject(new Error("Audio playback error"));
    };
    ttsAudio.play().catch(reject);
  });
}

// Narrate one text block via browser TTS (chunked, sequential)
async function _narrateAllBrowser(text, cfg) {
  for (const chunk of splitNarrationChunks(text, 500)) {
    if (!ttsAllActive) break;
    await new Promise((resolve) => {
      const utt = new SpeechSynthesisUtterance(chunk);
      utt.rate = cfg.browser?.rate ?? 1.0;
      utt.pitch = cfg.browser?.pitch ?? 1.0;
      utt.onend = utt.onerror = resolve;
      speechSynthesis.speak(utt);
    });
  }
}

// Narrate one text block via cloud TTS with prefetch pipeline
async function _narrateAllCloud(text, cfg) {
  const chunks = splitNarrationChunks(text, 350);
  if (!chunks.length) return;
  // Start fetching first chunk immediately so it's ready when we need it
  let nextFetch = _fetchTtsBlob(chunks[0], cfg);
  for (let i = 0; i < chunks.length; i++) {
    if (!ttsAllActive) break;
    const currentFetch = nextFetch;
    // Kick off the next fetch in parallel while we await the current blob
    nextFetch =
      i + 1 < chunks.length ? _fetchTtsBlob(chunks[i + 1], cfg) : null;
    try {
      const blob = await currentFetch;
      if (!ttsAllActive || !blob) break;
      await _playAudioBlob(blob);
    } catch (err) {
      showError(`TTS failed: ${err.message}`);
      break;
    }
  }
}

export async function narrateAll() {
  if (ttsProvider === "off") return;
  stopNarration(); // kill any active individual narration first
  ttsAllActive = true;
  const stopBtn = document.getElementById("btn-tts-stop");
  if (stopBtn) stopBtn.hidden = false;

  // Build the reading sequence: label + content + source element for each section
  const sequence = [];
  if (state.currentOutput?.title) {
    const titleEl = document.getElementById("field-title");
    sequence.push({
      text: state.currentOutput.title,
      el: titleEl?.closest(".output-field") ?? titleEl,
    });
  }
  const fieldDefs = [
    { id: "field-desc", label: "Description" },
    { id: "field-opening", label: "Opening" },
    { id: "field-plot", label: "Plot Essentials" },
    { id: "field-authornote", label: "Author's Note" },
    {
      id: "field-protagonist",
      label: state.currentSkeleton?.name ?? "Protagonist",
    },
  ];
  for (const { id, label } of fieldDefs) {
    const el = document.getElementById(id);
    if (el?.value?.trim()) {
      const container =
        el.closest(".output-field") ?? el.closest(".protagonist-section") ?? el;
      sequence.push({
        text: `${label}. ${el.value.trim()}`,
        el: container,
      });
    }
  }
  document.querySelectorAll(".npc-section").forEach((section) => {
    const name = section
      .querySelector(".npc-section-name")
      ?.textContent?.trim();
    const text = section.querySelector("textarea")?.value?.trim();
    if (name && text) sequence.push({ text: `${name}. ${text}`, el: section });
  });

  for (const item of sequence) {
    if (!ttsAllActive) break;
    item.el?.scrollIntoView({ behavior: "smooth", block: "center" });
    const highlightEl =
      item.el?.querySelector(".field-textarea, .field-input") ?? item.el;
    highlightEl?.classList.add("narrating");
    const cfg = getEffectiveTtsConfig();
    const clean = (cfg.preprocess ?? preprocessTts)(item.text);
    if (clean) {
      if (ttsProvider === "browser") await _narrateAllBrowser(clean, cfg);
      else await _narrateAllCloud(clean, cfg);
    }
    highlightEl?.classList.remove("narrating");
  }

  ttsAllActive = false;
  if (stopBtn) stopBtn.hidden = true;
}

// Manifest stores tts.preprocess as a string key; map it to the real function.
const TTS_PREPROCESSORS = {
  default: preprocessTts,
  manga: preprocessTtsManga,
  nihongi: preprocessTtsNihongi,
};

// Build the { preprocess, browser, kokoro, openai } TTS-config entry for one
// genre manifest. Seeds GENRE_TTS_CONFIG below and is reused by app.js's genre-
// pack registration so an uploaded pack gets the same preprocess wiring.
export function buildTtsConfigEntry(manifest) {
  return {
    preprocess: TTS_PREPROCESSORS[manifest.tts.preprocess] ?? preprocessTts,
    browser: manifest.tts.browser,
    kokoro: manifest.tts.kokoro,
    openai: manifest.tts.openai,
  };
}

// Per-genre TTS config, keyed by genre id. Runtime-mutable: app.js's genre-pack
// registration adds/removes entries as packs are imported/removed.
export const GENRE_TTS_CONFIG = Object.fromEntries(
  Object.values(GENRE_MANIFESTS).map((m) => [m.id, buildTtsConfigEntry(m)]),
);
