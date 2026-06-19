// ==UserScript==
// @name         FateVend → AI Dungeon
// @namespace    https://play.aidungeon.com/
// @version      1.1.0
// @description  One-click import of FateVend scenario JSON into AI Dungeon Create Scenario
// @author       FateVend
// @match        https://play.aidungeon.com/*
// @grant        none
// @run-at       document-idle
// ==/UserScript==
// FIXME Too bad this doesn't really work.  It just copies the description text, but skips all the story cards and other metadata.
(function () {
  'use strict';

  // ── React controlled-input helper ─────────────────────────────────────────
  // AI Dungeon uses React. Setting .value directly doesn't trigger onChange.
  // We call the native prototype setter then fire synthetic events.
  function fillInput(el, text) {
    if (!el) return false;
    const proto = el.tagName === 'TEXTAREA'
      ? window.HTMLTextAreaElement.prototype
      : window.HTMLInputElement.prototype;
    const setter = Object.getOwnPropertyDescriptor(proto, 'value')?.set;
    if (setter) setter.call(el, text);
    else el.value = text;
    el.dispatchEvent(new Event('input',  { bubbles: true }));
    el.dispatchEvent(new Event('change', { bubbles: true }));
    el.dispatchEvent(new Event('blur',   { bubbles: true }));
    return true;
  }

  // contenteditable fallback (some AI Dungeon fields use div[contenteditable])
  function fillContentEditable(el, text) {
    if (!el || el.contentEditable !== 'true') return false;
    el.focus();
    document.execCommand('selectAll', false, null);
    document.execCommand('insertText', false, text);
    return true;
  }

  // Fill whatever type of element we found
  function fillAny(el, text) {
    if (!el) return false;
    if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') return fillInput(el, text);
    if (el.contentEditable === 'true') return fillContentEditable(el, text);
    return false;
  }

  // ── Field finders ─────────────────────────────────────────────────────────
  function findByPlaceholder(hint) {
    const h = hint.toLowerCase();
    return [...document.querySelectorAll('input:not([type=hidden]), textarea')]
      .find(el => (el.placeholder || '').toLowerCase().includes(h)) || null;
  }

  function findByAriaLabel(hint) {
    const h = hint.toLowerCase();
    return [...document.querySelectorAll('[aria-label]')]
      .find(el => el.getAttribute('aria-label').toLowerCase().includes(h)) || null;
  }

  function nthEditable(n) {
    const all = [...document.querySelectorAll(
      'input:not([type=hidden]), textarea, [contenteditable=true]'
    )];
    return all[n] || null;
  }

  function findField(...hints) {
    for (const h of hints) {
      const el = findByPlaceholder(h) || findByAriaLabel(h);
      if (el) return el;
    }
    return null;
  }

  // Inject tags one at a time (Enter after each)
  async function injectTags(tagsArray) {
    const input = findField('tag', 'tags', 'genre');
    if (!input) return false;
    for (const tag of tagsArray) {
      fillInput(input, tag);
      input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', keyCode: 13, bubbles: true }));
      input.dispatchEvent(new KeyboardEvent('keyup',   { key: 'Enter', keyCode: 13, bubbles: true }));
      await sleep(150);
      fillInput(input, '');  // clear for next tag
    }
    return true;
  }

  function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

  // ── Styles ────────────────────────────────────────────────────────────────
  const CSS = `
    #gof-fab {
      position: fixed; bottom: 28px; right: 28px; z-index: 2147483647;
      background: #1a1a3e; color: #c7e7ff; border: 1px solid #4466aa;
      padding: 9px 18px; border-radius: 999px; cursor: pointer;
      font: 600 13px system-ui,sans-serif; letter-spacing:.04em;
      box-shadow: 0 4px 20px rgba(0,0,0,.65); user-select: none;
    }
    #gof-fab:hover { background: #252555; }
    #gof-overlay {
      position: fixed; inset: 0; background: rgba(0,0,0,.72);
      z-index: 2147483646; display: flex; align-items: center; justify-content: center;
    }
    #gof-modal {
      background: #111128; border: 1px solid #2a2a55; border-radius: 14px;
      padding: 26px; width: min(580px, 92vw); max-height: 88vh; overflow-y: auto;
      color: #c7e7ff; font: 14px system-ui,sans-serif;
    }
    #gof-modal h2 { margin: 0 0 6px; font-size: 16px; color: #fff; display:inline; }
    #gof-modal p.sub  { margin: 0 0 12px; font-size: 12px; color: #778; }
    #gof-close {
      float: right; background: none; border: none; color: #667;
      font-size: 22px; cursor: pointer; line-height:1; margin-top:-4px;
    }
    #gof-close:hover { color: #aab; }
    #gof-paste {
      width: 100%; height: 80px; background: #090918; border: 1px solid #2a2a55;
      border-radius: 6px; color: #c7e7ff; font: 12px monospace; padding: 8px;
      box-sizing: border-box; resize: vertical;
    }
    #gof-parse-btn, #gof-fill-all {
      padding: 8px 18px; border: none; border-radius: 6px;
      cursor: pointer; font: 600 13px system-ui; transition: background .15s;
    }
    #gof-parse-btn { margin-top: 10px; background: #3355bb; color: #fff; }
    #gof-parse-btn:hover { background: #4466dd; }
    #gof-fill-all {
      margin-top: 16px; width: 100%; padding: 10px;
      background: #225533; border: 1px solid #449966; color: #aaffbb;
    }
    #gof-fill-all:hover { background: #2d6644; }
    .gof-row {
      margin-top: 10px; padding: 10px 12px; background: #0c0c22;
      border: 1px solid #1e1e44; border-radius: 8px;
    }
    .gof-row-header { display:flex; justify-content:space-between; align-items:center; }
    .gof-row label { font: 600 12px system-ui; color: #7799dd; }
    .gof-preview {
      margin: 4px 0 8px; font-size: 11px; color: #667; white-space: pre-wrap;
      max-height: 48px; overflow: hidden;
    }
    .gof-fill { padding: 4px 12px; border-radius: 4px; cursor: pointer; font: 600 11px system-ui; }
    .gof-fill.idle   { background:#1a3322; border:1px solid #336644; color:#99ddaa; }
    .gof-fill.ok     { background:#112211; border:1px solid #335533; color:#557755; }
    .gof-fill.err    { background:#331111; border:1px solid #663333; color:#aa5555; }
    .gof-fill:hover  { filter: brightness(1.2); }
    #gof-status { margin-top: 12px; font-size: 12px; color: #88cc88; min-height: 16px; }
    #gof-debug  {
      margin-top: 10px; padding: 8px; background: #0a0a18; border-radius: 6px;
      font-size: 10px; color: #445; word-break: break-all;
    }
  `;

  // ── Modal ─────────────────────────────────────────────────────────────────
  let parsedData = null;

  function injectStyles() {
    if (document.getElementById('gof-styles')) return;
    const s = document.createElement('style');
    s.id = 'gof-styles'; s.textContent = CSS;
    document.head.appendChild(s);
  }

  function injectFAB() {
    if (document.getElementById('gof-fab')) return;
    injectStyles();
    const btn = document.createElement('button');
    btn.id = 'gof-fab'; btn.textContent = '⚙ GoF Import';
    btn.addEventListener('click', openModal);
    document.body.appendChild(btn);
  }

  function openModal() {
    if (document.getElementById('gof-overlay')) return;
    const overlay = document.createElement('div');
    overlay.id = 'gof-overlay';
    overlay.innerHTML = `
      <div id="gof-modal">
        <button id="gof-close" title="Close">×</button>
        <h2>⚙ FateVend Import</h2>
        <p class="sub">
          In FateVend, click <strong>Copy Full Scenario Package</strong>, then paste here:
        </p>
        <textarea id="gof-paste" placeholder='{ "scenario": { "title": "..." }, "characters": { ... } }'></textarea>
        <button id="gof-parse-btn">Parse →</button>
        <div id="gof-fields"></div>
        <div id="gof-status"></div>
        <div id="gof-debug"></div>
      </div>
    `;
    document.body.appendChild(overlay);
    overlay.addEventListener('click', e => { if (e.target === overlay) overlay.remove(); });
    document.getElementById('gof-close').addEventListener('click', () => overlay.remove());
    document.getElementById('gof-parse-btn').addEventListener('click', onParse);

    // Auto-paste if clipboard has JSON
    navigator.clipboard?.readText().then(text => {
      if (text.trim().startsWith('{')) {
        document.getElementById('gof-paste').value = text;
      }
    }).catch(() => {});
  }

  function onParse() {
    const raw = document.getElementById('gof-paste').value.trim();
    try { parsedData = JSON.parse(raw); }
    catch (e) {
      setStatus('✗ Invalid JSON — ' + e.message, true);
      return;
    }
    renderFields();
    refreshDebug();
  }

  function setStatus(msg, isErr = false) {
    const el = document.getElementById('gof-status');
    if (!el) return;
    el.textContent = msg;
    el.style.color = isErr ? '#dd7777' : '#88cc88';
  }

  // ── Field rendering ───────────────────────────────────────────────────────
  const FIELD_DEFS = [
    { key: 'title',       label: 'Title',        fill: fillTitle },
    { key: 'description', label: 'Description',  fill: fillDescription },
    { key: 'opening',     label: 'Opening',      fill: fillOpening },
    { key: 'memory',      label: 'Memory / World Info', fill: fillMemory },
    { key: 'tags',        label: 'Tags',         fill: fillTags },
  ];

  function renderFields() {
    const sc    = parsedData?.scenario   || {};
    const chars = parsedData?.characters || {};
    const container = document.getElementById('gof-fields');
    container.innerHTML = '';

    const fieldValues = {
      title:       sc.title,
      description: sc.description,
      opening:     sc.opening,
      memory:      null,   // not in GoF output — placeholder for future
      tags:        Array.isArray(sc.tags) ? sc.tags.join(', ') : sc.tags,
    };

    FIELD_DEFS.forEach(def => {
      const val = fieldValues[def.key];
      if (!val) return;
      container.appendChild(makeRow(def.label, val, def.fill, def.key));
    });

    // Character entries
    Object.entries(chars).forEach(([name, entry]) => {
      container.appendChild(makeRow('Character: ' + name, entry, el => fillCharEntry(el, name, entry), 'char'));
    });

    const btn = document.createElement('button');
    btn.id = 'gof-fill-all'; btn.textContent = '⚙ Auto-Fill All';
    btn.addEventListener('click', fillAll);
    container.appendChild(btn);
  }

  function makeRow(label, value, fillFn, key) {
    const row = document.createElement('div');
    row.className = 'gof-row';
    const preview = (value || '').slice(0, 100) + ((value || '').length > 100 ? '…' : '');
    row.innerHTML = `
      <div class="gof-row-header">
        <label>${label}</label>
        <button class="gof-fill idle" data-key="${key}">Fill</button>
      </div>
      <div class="gof-preview">${preview}</div>
    `;
    row.querySelector('.gof-fill').addEventListener('click', async function () {
      const ok = await fillFn(this);
      this.textContent = ok ? '✓ Done' : '✗ Not found';
      this.className   = 'gof-fill ' + (ok ? 'ok' : 'err');
    });
    return row;
  }

  // ── Individual fill functions ─────────────────────────────────────────────
  async function fillTitle(btnEl) {
    const el = findField('title', 'name', 'scenario title')
            || nthEditable(0);
    return fillAny(el, parsedData.scenario.title);
  }

  async function fillDescription(btnEl) {
    const el = findField('description', 'summary', 'about')
            || nthEditable(1);
    return fillAny(el, parsedData.scenario.description);
  }

  async function fillOpening(btnEl) {
    const el = findField('opening', 'first message', 'intro', 'start')
            || nthEditable(2);
    return fillAny(el, parsedData.scenario.opening);
  }

  async function fillMemory(btnEl) {
    // AI Dungeon "World Info" or "Memory" pane — best-effort
    const el = findField('memory', 'world info', 'notes', 'author');
    return fillAny(el, parsedData.scenario.description); // description is closest match
  }

  async function fillTags(btnEl) {
    const tags = parsedData.scenario.tags || [];
    return injectTags(Array.isArray(tags) ? tags : tags.split(',').map(t => t.trim()));
  }

  async function fillCharEntry(btnEl, name, entry) {
    // Character entries live in a separate Memory/Character modal in AI Dungeon.
    // Copy to clipboard and tell the user.
    try {
      await navigator.clipboard.writeText(entry);
      setStatus(`"${name}" entry copied to clipboard — paste it in their Character Memory field.`);
      return true;
    } catch (_) {
      setStatus(`Could not write to clipboard. Copy manually: "${entry.slice(0, 40)}…"`, true);
      return false;
    }
  }

  async function fillAll() {
    setStatus('Filling…');
    const sc    = parsedData?.scenario   || {};
    const chars = parsedData?.characters || {};

    if (sc.title)       await fillTitle();
    await sleep(100);
    if (sc.description) await fillDescription();
    await sleep(100);
    if (sc.opening)     await fillOpening();
    await sleep(100);
    if (sc.tags?.length) await fillTags();
    await sleep(100);

    const charNames = Object.keys(chars);
    if (charNames.length) {
      await fillCharEntry(null, charNames[0], chars[charNames[0]]);
    }

    setStatus(`✓ Done. ${charNames.length} character entr${charNames.length === 1 ? 'y' : 'ies'} in clipboard — paste them in AI Dungeon's Character Memory.`);

    // Refresh fill buttons
    document.querySelectorAll('.gof-fill.idle').forEach(b => {
      b.textContent = '✓ Done'; b.className = 'gof-fill ok';
    });
  }

  // ── Debug: list all editable elements on page ────────────────────────────
  function refreshDebug() {
    const dbg = document.getElementById('gof-debug');
    if (!dbg) return;
    const all = [...document.querySelectorAll(
      'input:not([type=hidden]), textarea, [contenteditable=true]'
    )];
    if (!all.length) {
      dbg.textContent = 'No editable fields found on page yet. Are you on the Create Scenario form?';
      return;
    }
    dbg.textContent = 'Fields found: ' + all.map((el, i) =>
      `[${i}]${el.tagName.toLowerCase()}` +
      (el.placeholder ? `:"${el.placeholder.slice(0, 25)}"` : '') +
      (el.getAttribute('aria-label') ? ` aria="${el.getAttribute('aria-label').slice(0, 20)}"` : '')
    ).join('  ·  ');
  }

  // ── SPA navigation watcher ────────────────────────────────────────────────
  let lastHref = location.href;
  new MutationObserver(() => {
    if (location.href === lastHref) return;
    lastHref = location.href;
    document.getElementById('gof-fab')?.remove();
    setTimeout(injectFAB, 900);
  }).observe(document.documentElement, { childList: true, subtree: true });

  setTimeout(injectFAB, 1200);
})();
