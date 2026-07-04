// ==UserScript==
// @name         AI Dungeon → Kokoro TTS
// @namespace    http://tampermonkey.net/
// @version      1.2
// @description  Sends the latest AI Dungeon story block to a local Kokoro TTS server and plays it
// @author       FateVend
// @match        https://play.aidungeon.com/*
// @grant        GM_xmlhttpRequest
// @connect      localhost
// @connect      127.0.0.1
// @connect      bonobo.local
// ==/UserScript==

(function () {
    'use strict';

    // ── Config ───────────────────────────────────────────────────────────────
    const KOKORO_URL = 'http://bonobo.local:8880/v1/audio/speech';
    const VOICE      = 'af_sky';
    const MODEL      = 'kokoro';
    const SPEED      = 1.0;
    const AUTO_PLAY  = true;
    // ─────────────────────────────────────────────────────────────────────────

    let lastSpokenText = '';
    let currentAudio   = null;
    let busy           = false;
    let observer       = null;

    // ── Path guard ───────────────────────────────────────────────────────────
    function onAdventurePage() {
        return /^\/adventure\//i.test(location.pathname);
    }

    // ── UI lifecycle ─────────────────────────────────────────────────────────
    function mountUI() {
        if (document.getElementById('kokoro-tts-btn')) return; // already mounted

        const btn = document.createElement('button');
        btn.id        = 'kokoro-tts-btn';
        btn.innerText = '🔊 Read';
        btn.title     = 'Read latest block via Kokoro TTS';
        Object.assign(btn.style, {
            position:     'fixed',
            bottom:       '80px',
            right:        '18px',
            zIndex:       '99999',
            padding:      '8px 14px',
            background:   '#1a1a2e',
            color:        '#e0c97f',
            border:       '1px solid #e0c97f',
            borderRadius: '6px',
            cursor:       'pointer',
            fontFamily:   'sans-serif',
            fontSize:     '13px',
            opacity:      '0.85',
        });

        const statusEl = document.createElement('div');
        statusEl.id = 'kokoro-tts-status';
        Object.assign(statusEl.style, {
            position:      'fixed',
            bottom:        '120px',
            right:         '18px',
            zIndex:        '99999',
            color:         '#aaa',
            fontSize:      '11px',
            fontFamily:    'sans-serif',
            maxWidth:      '200px',
            textAlign:     'right',
            pointerEvents: 'none',
        });

        document.body.appendChild(btn);
        document.body.appendChild(statusEl);

        function setStatus(msg) { statusEl.innerText = msg; }

        function resetBtn() {
            busy          = false;
            btn.innerText = '🔊 Read';
            setStatus('');
            btn.onclick = onClickRead;
        }

        function stopCurrent() {
            if (currentAudio) { currentAudio.pause(); currentAudio = null; }
        }

        function speak(text) {
            if (busy) stopCurrent();
            busy = true;
            btn.innerText = '⏳ …';
            setStatus('Fetching audio…');

            GM_xmlhttpRequest({
                method:       'POST',
                url:          KOKORO_URL,
                headers:      { 'Content-Type': 'application/json' },
                data:         JSON.stringify({ model: MODEL, input: text, voice: VOICE, speed: SPEED }),
                responseType: 'arraybuffer',
                onload(res) {
                    if (res.status !== 200) {
                        setStatus(`Error ${res.status}`);
                        resetBtn();
                        return;
                    }
                    const blob = new Blob([res.response], { type: 'audio/mpeg' });
                    const blobUrl = URL.createObjectURL(blob);
                    currentAudio = new Audio(blobUrl);
                    currentAudio.onended = () => { URL.revokeObjectURL(blobUrl); resetBtn(); };
                    currentAudio.onerror = () => { setStatus('Audio error'); resetBtn(); };
                    currentAudio.play();
                    setStatus('Playing…');
                    btn.innerText = '⏹ Stop';
                    btn.onclick   = () => { stopCurrent(); resetBtn(); };
                },
                onerror() {
                    setStatus('Cannot reach Kokoro server.');
                    resetBtn();
                },
            });
        }

        function onClickRead() {
            const text = getLatestBlock();
            if (text) speak(text);
            else setStatus('No story text found.');
        }

        btn.onclick = onClickRead;

        if (AUTO_PLAY) {
            observer = new MutationObserver(() => {
                const text = getLatestBlock();
                if (text && text !== lastSpokenText) {
                    lastSpokenText = text;
                    setTimeout(() => {
                        if (getLatestBlock() === text && !busy) speak(text);
                    }, 800);
                }
            });
            observer.observe(document.body, { childList: true, subtree: true, characterData: true });
            setStatus('Auto-play on');
        }
    }

    function unmountUI() {
        document.getElementById('kokoro-tts-btn')?.remove();
        document.getElementById('kokoro-tts-status')?.remove();
        if (observer) { observer.disconnect(); observer = null; }
        if (currentAudio) { currentAudio.pause(); currentAudio = null; }
        busy = false;
    }

    // ── Selector strategy ────────────────────────────────────────────────────
    function getLatestBlock() {
        const candidates = [
            '[class*="ActionOutput"] p',
            '[class*="action-output"] p',
            '[class*="StoryOutput"] p',
            '[class*="story-output"] p',
            '[class*="adventure"] p',
            '[class*="Adventure"] p',
            'main p',
        ];
        for (const sel of candidates) {
            const nodes = [...document.querySelectorAll(sel)];
            for (let i = nodes.length - 1; i >= 0; i--) {
                const t = nodes[i].innerText?.trim();
                if (t && t.length > 2) return t;
            }
        }
        return null;
    }

    // ── SPA navigation watcher ───────────────────────────────────────────────
    function onRouteChange() {
        if (onAdventurePage()) {
            // Give React/Next.js a moment to render the page
            setTimeout(mountUI, 500);
        } else {
            unmountUI();
        }
    }

    // Patch pushState / replaceState so we catch client-side navigation
    ['pushState', 'replaceState'].forEach(method => {
        const orig = history[method];
        history[method] = function (...args) {
            orig.apply(this, args);
            onRouteChange();
        };
    });
    window.addEventListener('popstate', onRouteChange);

    // Run once on initial load
    onRouteChange();
})();
