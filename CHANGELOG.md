# Changelog

## 2026-07-11

### feat: Added an optional systemd service for running serve.sh on Linux
**What changed:** `serve.sh` previously only ran in the foreground of an interactive terminal, with no supported way to keep it alive across a reboot or crash on a Linux host. Added `deploy/fatevend.service`, a systemd unit (`Type=simple`, `Restart=on-failure`) that runs `serve.sh` directly — its `ExecStart`/`WorkingDirectory`/`User` fields use placeholder values (`YOUR_USERNAME`, `/home/YOUR_USERNAME/FateVend`) meant to be edited per install. Also hardened `serve.sh` itself: its cleanup trap for the AI Dungeon import server subprocess only ran on the `EXIT` signal, which systemd's `SIGTERM` on `stop` doesn't reliably trigger the same way an interactive Ctrl+C does — added explicit `INT TERM` to the trap (plus `exit 0`) so a `systemctl stop` always kills the import server subprocess and exits cleanly rather than leaving it orphaned. Documented both in `README.md`'s "Start server" section (install/enable commands, `journalctl` for logs) and in the project structure tree.
**Impact:** `serve.sh` can now run as a persistent, auto-restarting background service on any systemd-based Linux distro, instead of only working in an attached terminal session.
**Test cases:** Verified end-to-end against a real systemd (WSL2 Ubuntu, not just a syntax read-through): `systemd-analyze verify` passes; `systemctl start` brings up both the web app (port 8080, confirmed with `curl` including a moved genre icon) and the AI Dungeon import server (port 7432) under the service's cgroup; `systemctl stop` exits with `status=0/SUCCESS` and leaves zero orphaned processes or listening sockets; `systemctl restart` and the `enable`/`disable` boot-symlink lifecycle both work correctly.

## 2026-07-09

### fix: PLOT_ARCHETYPES icons were all dumped in the common folder, even genre-specific ones
**What changed:** `PLOT_ARCHETYPES` is the only roller category that merges a shared list (`COMMON_PLOT_ARCHETYPES`, 12 entries genuinely usable in any genre) with per-genre lists (e.g. `FANTASY_PLOT_ARCHETYPES`, `NIHONGI_PLOT_ARCHETYPES`, 36 entries total across 7 genres that only make sense for their genre — "AI Uprising" for sci-fi, "The Kami's Bargain" for nihongi, etc.). Every genre-specific archetype's `iconPath` nonetheless hardcoded `generator/common/icons/...`, and `getSlotConfig()`'s slot-machine rendering resolved the icon base folder once per *category* (`def.common ? COMMON_ICON_BASE : cfg.iconBase`) rather than per *entry* — so there was no way for a single mixed category to serve some icons from `common/icons/` and others from the genre's own `icons/` folder. Moved all 36 genre-specific icon files (`git mv`) into their own genre's `icons/` folder, updated each one's `iconPath` field accordingly, and reworked `plotCat()` to extract the base folder from each entry's own `iconPath` (as a 4th tuple element) instead of assuming one shared base. Added an `iconBaseFor(entry, def, cfg)` helper — entry's own base wins when present, falling back to the old category-wide `def.common` logic for every other (genuinely single-source) category. Also deleted 6 orphaned `PLOT_ARCHETYPES#*.webp` files in `common/icons/` (`buddhist_question`, `clan_purge`, `clan_succession`, `diplomatic_mission`, `divine_blood`, `forbidden_alliance`) that weren't referenced by any archetype id in any genre.
**Impact:** No behavior change to what a user sees — the icons still render identically — but the codebase is now organized by ownership (genre-specific icons live with their genre) and the code correctly supports categories that legitimately mix common and genre-specific assets, instead of a same-category assumption that happened to go unnoticed only because base-folder mismatches for `PLOT_ARCHETYPES` were silently working around it (the files just happened to physically sit in the folder the code always looked in).
**Test cases:** (1) Statically verified all 48 `iconPath` values (12 common + 36 genre-specific) resolve with HTTP 200 and that genre-file entries point into their own genre's `icons/` folder, not `common/`. (2) Rolled the Plot reel 6 times per genre across all 7 genres via the real `runGenerate()`/slot-machine pipeline and confirmed every landed icon loaded successfully (`img.complete && naturalWidth > 0`, no placeholder fallback) — 7/7 genres, all rolls resolving both common and genre-specific archetypes correctly.

### fix: Genre carousel's active card could get clipped by its own border on narrow desktop widths
**What changed:** The active card and its two peek cards all had `flex-shrink: 0`, so at desktop widths where the fixed 620px active card plus two fixed 620px peeks didn't fit `#genre-carousel`'s available width (squeezed by the nav buttons' 88px + wrap padding + gaps), the flex row simply overflowed and `#genre-carousel`'s `overflow: hidden` silently cropped the active card's gold border along with the peeks — most noticeably in the ~600–800px range. Gave `.genre-card-current` `flex-shrink: 1` with an explicit `min-width: 340px` (needed because `.genre-card`'s own `overflow: hidden` makes a flex item's automatic minimum size resolve to 0 per spec, not its content size), and gave `.genre-card-peek` a much higher `flex-shrink: 500`. With that ratio, any negative space is absorbed almost entirely by the peeks first (shrinking them down to a thin sliver or nothing) — the active card only gives up width once both peeks are already fully collapsed, which in practice keeps it at ~616-620px down to about 620px of available space, then shrinking gracefully to its 340px floor beyond that, always fully inside `#genre-carousel`'s visible bounds.
**Impact:** The active genre card's border is never clipped by the nav buttons or container edge at any window width — it either stays full-size with peeks showing proportionally less of themselves, or shrinks gracefully on very narrow desktop windows instead of getting cut off.
**Test cases:** (1) At 600–800px widths, confirm the active card's full gold border and rounded corners stay visible, with peek cards fading to a thin sliver rather than the active card getting cropped. (2) At ≥900px, confirm the active card sits at its full ~620px size with progressively more of each peek visible as width grows. (3) Peek-click-to-navigate, nav arrows, and the mobile (no peek) layout are all unaffected. Verified programmatically across 600/650/700/750/800px widths (bounding-box comparison against the container) plus the existing interaction suite — 11/11 checks passed.

### feat: Redesigned the genre carousel — full square images, peeking prev/next cards on desktop
**What changed:** The genre card's image was cropped to a wide rectangle (`180px` tall on mobile, `210×280px` on desktop) even though every `_genre.webp` is actually a 512×512 square — so `object-fit: cover` was always cutting off part of the artwork. Changed `.genre-card-image-wrap` to `aspect-ratio: 1/1` on mobile and a fixed `220×220px` square on desktop, so the full image always shows; the only remaining platform difference is the description's position (below the image on mobile, beside it on desktop — unchanged). Separately, the desktop card previously stretched to fill the entire toolbar width, which read as oversized. Capped it at a fixed, reasonable `620px` and rebuilt `renderCarouselCard()` to render a `.genre-carousel-track` (flexbox, `justify-content: center`) containing the previous, current, and next genre's cards side by side — `#genre-carousel`'s `overflow: hidden` naturally crops the flanking cards at the container edge, giving a "peeking neighbor" look with no transform/animation math needed. Peek cards get a dimmed/desaturated treatment (`opacity: 0.4`, `filter: saturate(0.7) brightness(0.75)`) and are clickable to jump straight to that genre. Peeks only render at ≥600px width (`carouselShowPeeks()`); a debounced `resize` listener re-renders the track when crossing that breakpoint. (An earlier version of this fix tried stacking background cards diagonally behind the active one — scrapped in favor of this side-peek layout after reviewing a mockup of the intended look.)
**Impact:** Genre artwork is never cropped on any screen size, and the desktop carousel now reads as a proper carousel — a reasonably-sized active card with the previous/next genres visibly waiting on either side — instead of one oversized, isolated card.
**Test cases:** (1) At a mobile width, confirm the full square image renders above the description, no cropping, no peeks. (2) At desktop widths (700/950/1400px), confirm the active card stays a fixed reasonable size and increasingly more of the flanking peek cards is visible as width grows. (3) Click a peek card — confirm it navigates directly to that genre. (4) Resize across the 600px breakpoint — confirm peeks appear/disappear accordingly. (5) Confirm the prev/next arrow buttons and the dot indicator still work. Verified all of the above with Playwright screenshots at four widths and a scripted interaction pass (8/9 checks passed; the one "failure" was a false positive in the test itself, comparing `textContent` against the CSS-only `text-transform: uppercase` styling).

### fix: NPCs could roll Non-binary/Genderfluid even with LGBQ disabled
**What changed:** The protagonist's gender roll in `buildSkeleton()` already respected the "LGBQ" setting (`genderPool = includeLGBQ ? G : G.filter(g => g.id === 'man' || g.id === 'woman')`), but `buildCast()`'s `neutralGenderId()` — used to pick a gender for best friends and non-love-interest foils — had its own independent roll (`r < 0.45 ? 'man' : r < 0.90 ? 'woman' : 'non_binary'`) with no awareness of the setting at all, so those NPCs could still come back Non-binary or Genderfluid 10% of the time regardless. Added an `includeLGBQ` parameter to `neutralGenderId()` and `buildCast()`, threaded from the same `includeLGBQ` flag `buildSkeleton()` already reads from the Settings checkbox; when it's off, `neutralGenderId()` now only returns `man`/`woman`.
**Impact:** With LGBQ disabled, no cast member — protagonist or NPC — can roll a non-binary/genderfluid gender anymore.
**Test cases:** (1) With LGBQ off, roll many scenarios and confirm every NPC's gender badge reads Male or Female. (2) With LGBQ on, confirm Non-binary/Genderfluid NPCs can still appear as before.

### fix: Background music cut out before NPC portraits finished generating
**What changed:** `generatePortrait()` (the protagonist portrait function) had a `finally` block that unconditionally called `await fadeOutAudio(_overtureSfx)` — fading and stopping the scenario's background music as soon as *that one portrait* finished. `runAIPhase()` calls `generatePortrait(null)` first and, when "Auto-generate NPC portraits" is enabled, *then* loops through `autoGenerateAllNpcPortraits(npcNames)` afterward — so with that setting on, the music silently cut out right after the protagonist's portrait, leaving all the NPC portraits to render in silence. Removed the fade from `generatePortrait()`'s `finally` and instead moved a single `await fadeOutAudio(_overtureSfx)` to the end of `runAIPhase()`'s portrait block, after both the protagonist portrait and (if enabled) the full NPC portrait loop complete. The `else` branch (no portrait backend configured) folded into the same call since it now always fires at that point regardless of which path was taken.
**Impact:** With Auto-generate NPC portraits enabled, the overture track now keeps playing through the entire portrait sequence and only fades out once the last NPC portrait is done, instead of going silent partway through.
**Test cases:** (1) Enable a portrait backend + "Auto-generate NPC portraits," generate a scenario with 2+ NPCs — confirm music keeps playing through the protagonist portrait and all NPC portraits, fading only at the very end. (2) With the setting disabled (or no NPCs), confirm music still fades right after the single protagonist portrait, same as before. (3) Manually clicking "Regenerate" portrait after generation (music already silent) still works with no error. Verified with a scripted Playwright pass driving the real `runGenerate()`/`runAIPhase()`/`generatePortrait()`/`generateNpcPortrait()` functions end-to-end (only the Anthropic and SD network calls mocked), asserting via a patched `HTMLMediaElement.prototype.play/pause` that the overture's pause event fires only after all 3 portrait fetches (protagonist + 2 NPCs) complete — 4/4 checks passed on the fix, and the same test correctly failed (3/4) when run against the pre-fix code, confirming it catches the regression.

### feat: Narrate All now highlights the section currently being read
**What changed:** `narrateAll()` already auto-scrolled each section's container into view as narration progressed (`item.el?.scrollIntoView(...)`), but gave no visual cue once scrolled there for which specific field was actively being read versus just adjacent on screen. Added a `.narrating` CSS class (`styles.css`) on `.field-textarea`/`.field-input` that draws a gold border and glowing box-shadow (`var(--gold)`, matching the existing "active" accent used elsewhere, e.g. `.phase-step.active`), with the existing `border-color`/`box-shadow` transition extended to animate it smoothly. In the `narrateAll()` loop, resolved the actual `<textarea>`/`<input>` inside each sequence item's container (`item.el?.querySelector('.field-textarea, .field-input') ?? item.el`) and toggled the `narrating` class on it: added right before scrolling/narrating that section, removed right after its narration awaits resolve (covers both the browser and cloud TTS paths, and the empty-text skip case).
**Impact:** While Narrate All is reading a scenario aloud, the field currently being read now has a clear glowing border, not just a scroll position, making it obvious which section corresponds to the narration.
**Test cases:** (1) Click Narrate All on a generated scenario — confirm each field (title, description, opening, plot essentials, author's note, protagonist, each NPC) gets a gold glowing border exactly while it's being read, and it clears before the next field's border appears. (2) Clicking Stop mid-read clears any lingering highlight. (3) Verified the highlight add/remove sequencing programmatically with a scripted Playwright pass against injected DOM + a mocked `speechSynthesis.speak` (4/4 checks passed): highlight appears on the active field, clears before the next field highlights, and no field remains highlighted once Narrate All finishes.

### fix: Narration Voice dropdown had no way to clear an override back to the genre default
**What changed:** The Settings → Narration → Voice dropdown always showed a specific voice as selected for the Kokoro and OpenAI providers — either a saved override or the genre's default voice ID resolved in place — with no option meaning "no override." The Help text claimed Voice/Speed "override the genre's default," implying the override was optional, but the UI gave no way to actually clear one once set; a user had to know to manually delete the `gof_tts_voice_override` localStorage key. Added a `— Genre default —` option (`value=""`) as the first entry in both the Kokoro (`populateKokoroVoices`) and OpenAI (`setTtsProvider`) voice lists. Selecting it now calls a new `setTtsVoiceOverride(val)` helper that removes the `gof_tts_voice_override` key from localStorage instead of storing an empty string, so `getEffectiveTtsConfig()`'s existing `voice ?? base.voice` fallback correctly resumes using the genre's built-in voice. The Browser provider already had an equivalent `System default` option and was left as-is. Updated the matching Help paragraph to mention both "clear the override" options by name.
**Impact:** Users can now explicitly opt back into a genre's default narration voice for Kokoro/OpenAI after having picked a specific one, without needing to touch browser storage by hand.
**Test cases:** (1) Select OpenAI provider with no saved override — Voice dropdown shows `— Genre default —` selected. (2) Pick a specific voice, reload the page — the picked voice is still selected. (3) Switch back to `— Genre default —`, reload — it's still selected (confirms the override was removed from localStorage, not just re-set to a value matching the genre default). (4) Same sequence for Kokoro LAN with no server URL configured (static voice list). Verified all four with a scripted Playwright pass (10/10 checks) against the local dev server.

## 2026-07-06

### feat: Status bar now shows Portrait / NPC Portraits phases
**What changed:** The generation status bar (`PHASES`, `setPhase()`) previously had a fixed 4-step list (Rolling Stats → Personality → Fate → Narrative) and jumped straight from "⚙ Narrative" to the plain text "Your fate is sealed…" the instant the AI text call finished — even though portrait generation (and, if enabled, NPC portrait generation) kept running afterward in the background with no phase indicator. Renamed the fixed list to `BASE_PHASES` and added a `computeActivePhases()` helper that appends a `Portrait` step whenever an image backend (SD URL or Stability key) is configured, and further appends an `NPC Portraits` step whenever the "Auto-generate NPC portraits" setting is also checked. `activePhases` (read by `setPhase()`) is recomputed at the start of `runGenerate()` and again at the start of `runAIPhase()` so it reflects whatever settings are active at each point. `runAIPhase()` now awaits `generatePortrait(null)` and, when applicable, `autoGenerateAllNpcPortraits(...)` in sequence — calling `setPhase('phase-portrait')` / `setPhase('phase-npc-portraits')` before each — before showing the final "Your fate is sealed" status, instead of firing them in the background unawaited. Also removed a dead `forEach` block that tried to toggle `active`/`done` classes on `#phase-roll` etc. elements that never actually exist in the DOM (the phase bar is fully re-rendered as plain `<span>`s by `setPhase`, with no ids).
**Impact:** Players now see accurate progress ("⚙ Portrait", then "⚙ NPC Portraits" when enabled) instead of a premature "sealed" message while portrait art is still rendering. Auto-narration (if enabled) now reliably starts after all art generation finishes rather than potentially overlapping with it. No behavior change when no image backend is configured — it still just fades the music and shows the sealed status immediately.
**Test cases:** (1) With no image backend configured, generate a scenario — status bar goes Rolling Stats → Personality → Fate → Narrative → "Your fate is sealed" with no Portrait step shown. (2) With a local SD URL configured, generate — confirm "⚙ Portrait" appears in the bar while the portrait card shows "Painting the portrait…", then the final status appears only after the portrait image renders. (3) With an image backend configured and "Auto-generate NPC portraits" checked, generate a scenario with NPCs — confirm "⚙ NPC Portraits" appears after the Portrait step and before the final status, and that it's skipped if the AI response contains zero NPCs.

### feat: Genre-specific random background music
**What changed:** The "overture" track that plays during scenario generation (`_overtureSfx`) was a single hardcoded file (`fantasy-overture_dark.mid.mp3`) regardless of genre. Added a `GENRE_MUSIC_TRACKS` manifest listing each genre's uploaded tracks in `web/audio/music/` (fantasy, joseon, manga, modern, nihongi, paleolithic, scifi — each with 2-9 variants) plus a `GENRE_MUSIC_PREFIX` map reconciling the three genre keys that don't match their filename prefix 1:1 (`historical-korea-joseon-dynasty`→`joseon`, `manga-osaka-highschool1987`→`manga`, `sci-fi`→`scifi`). Added `pickGenreTrack(genre)`, which randomly picks a track from the current genre's pool (avoiding an immediate repeat of the last track played) and returns its URL-encoded path. `_overtureSfx` no longer preloads a fixed file at page load (`new Audio()` with `preload = 'none'`); instead `runAIPhase()` sets `_overtureSfx.src` via `pickGenreTrack(currentGenre)` right before playing, so only the one chosen mp3 is ever fetched — not all ~30 files across genres.
**Impact:** Each genre now plays music that matches its tone, and repeated generations vary the track instead of always playing the same fantasy overture. No memory/network cost from the growing music library since only one track loads per generation.
**Test cases:** (1) Generate a scenario in Sci-Fi, Joseon Korea, and Paleolithic — confirm the music audibly matches each genre and never crosses over. (2) Generate several times in a row in the same genre — confirm the track varies rather than repeating. (3) Check the Network tab during generation — confirm only the single selected mp3 is requested, not the whole `audio/music/` folder.

## 2026-07-03

### fix: Settings modal appeared cut off on mobile due to page-wide horizontal overflow
**What changed:** The decorative titlebar gear icons (`.site-header::before`/`::after`, 160×160px, intentionally spilling 80px past each header edge via `translateX(±50%)`) had a `@media (max-width: 600px) { display: none; }` rule in `styles.css` meant to hide them on mobile. A later change added a second, unconditional `.site-header::before/::after` rule directly in `index.html`'s inline `<style>` block (to switch the icon from a text glyph to a PNG) — with equal selector specificity and no media guard, and appearing later in document order, that unconditional rule silently won the cascade on every screen size, re-enabling the 80px overflow on mobile. That overflow inflated the page's layout viewport (confirmed: `document.documentElement.scrollWidth` was 492px on a 412px-wide mobile viewport), which drags fixed-position elements — including the Settings/Help modals — along with it, visually cutting off their right edge (the Options tab and Save button, in the reported screenshot). Removed the now-dead duplicate rule from `styles.css` and added the mobile `display: none` override directly after the icon-defining rule in `index.html`, where it correctly wins the cascade.
**Impact:** No more page-wide horizontal overflow on mobile — the Settings modal (all four tabs) and Help modal now render fully within the mobile viewport with nothing clipped.
**Test cases:** (1) Emulated a 412×915 mobile viewport — verified `document.documentElement.scrollWidth` now equals `window.innerWidth` (412px, previously 492px) both before and after opening Settings. (2) Verified via computed styles that `.site-header::before` now resolves to `display: none` at that viewport width. (3) Screenshot confirms all four Settings tabs and the Save button are fully visible, un-clipped.

### fix: Settings/Help modals could get clipped by mobile browser chrome
**What changed:** `.settings-modal` and `.help-panel` capped their height with `max-height: 90vh` / `82vh`. On mobile browsers, `vh` is computed against the *largest* possible viewport (address bar hidden), not the actually-visible one — so with the address bar showing, the modal could render taller than the real visible area, pushing its bottom (including the Narration tab's later fields and the Save/Help footer buttons) below the fold with no way to reach it. Added a `dvh`-based `max-height` override (`90dvh` / `82dvh`) after the existing `vh` fallback — `dvh` tracks the actual visible viewport dynamically as mobile browser chrome shows/hides, so the modal's internal `overflow-y: auto` scroll now reliably reaches the full content on mobile. Browsers without `dvh` support silently keep the `vh` fallback.
**Impact:** The Settings modal's Narration tab (the tallest one) — and the Help modal — no longer get clipped by the browser's mobile UI or our fixed status bar; both scroll internally to reveal all content and the footer buttons.
**Test cases:** (1) Emulated a 375×600 mobile viewport — verified the Settings modal's `max-height` computes from the dynamic viewport (540px = 90% of 600px) and that scrolling the modal reaches the Save/Help footer buttons past the Narration tab's Voice/Speed fields. (2) Desktop rendering unaffected (dvh ≈ vh when there's no dynamic browser chrome).

### feat: Added "How to Use Vend of Fate" Help section
**What changed:** Added a new "How to Use Vend of Fate" group to the Help modal (positioned first, right after the top intro line), covering the three ways to get a generated scenario into AI Dungeon: "Copy & Paste (Side-by-Side)" (per-field Copy buttons or the Copy Full Text To Clipboard (JSON) button), "Download Package (.zip)" (the Download Package button), and "Auto Import (Beta)" (the local Playwright-driven one-click importer). The Auto Import section documents the actual requirements read from `web/tools/aidungeon-importer.mjs` and `aidungeon-server.mjs`: `AIDUNGEON_EMAIL`/`AIDUNGEON_PASSWORD` in `.env`, `npm install` + `npx playwright install chromium`, and that the button only appears once `serve.sh`'s import server (port 7432) is reachable. Also clarified in the "Local .env Setup" section that these two AI Dungeon credential vars use a different mechanism than the browser-prefill keys — read directly by the Node-side importer script, never baked into `generator/config.js` or exposed to the browser.
**Impact:** New users now have an explicit, accurate walkthrough of all three export paths instead of having to infer them from the buttons alone.
**Test cases:** (1) Open Settings → Help — verified via screenshot that "How to Use Vend of Fate" renders first, before "Text Providers", with all three sub-sections. (2) `.env` section now correctly distinguishes the two different `.env`-reading mechanisms in the app.

### feat: Restructured the Help modal into grouped categories
**What changed:** Reorganized the Help modal's content into three (now four) labeled groups — "Text Providers" (Anthropic, Gemini, Ollama), "Image Providers" (Local Stable Diffusion, Stability AI), "TTS Providers" (Browser, Kokoro, OpenAI), and a new "Local .env Setup" group — each with a short intro paragraph and new `.help-group-heading`/`.help-group-intro`/`.help-intro` CSS classes (styled consistently with existing `.help-section-title`/`.help-section` conventions: brass-dark headings, italic muted intros). Trimmed redundant suffixes from individual section titles (e.g. "Anthropic — Claude (Text Generation)" → "Anthropic — Claude") since the group heading now supplies that context. Filled in the two previously-TODO sections: "Image Options" now documents the "Auto-generate NPC portraits" setting, and a new "Local .env Setup" group documents the `.env` → `serve.sh` → `generator/config.js` key pre-fill mechanism (supported keys: `ANTHROPIC_API_KEY`, `GEMINI_API_KEY`, `STABILITY_API_KEY`, `SD_URL`), noting Ollama/TTS settings aren't part of it.
**Impact:** The Help modal now mirrors the requested outline exactly, with both previously-blank sections written out, and is easier to scan with clear category groupings instead of one flat list of provider sections.
**Test cases:** (1) Open Settings → Help — verified via headless-browser screenshots that all 4 group headings render with their intro paragraphs, in the correct order, with the sticky title bar still opaque while scrolling. (2) All existing links/steps/code snippets are unchanged in substance, only regrouped and re-titled.

### fix: Help modal content bled through the sticky title bar when scrolling
**What changed:** `.help-panel-header` uses `position: sticky` to stay pinned while `.help-panel` scrolls, but had no `z-index`. The `.help-steps li::before` numbered circles were changed to `position: absolute` in an earlier fix today, and without an explicit `z-index` on either element, paint order fell back to DOM order — since the step badges appear later in the document than the header, they painted on top of it once scrolled underneath, showing step numbers and text bleeding through the title bar. Added `z-index: 2` to `.help-panel-header` so it reliably stacks above scrolled-under content.
**Impact:** Scrolling the Help modal no longer shows step content bleeding through the sticky "Getting API Keys & Setup" title bar.
**Test cases:** (1) Open Settings → Help, scroll down — verified via screenshot that the title bar stays fully opaque with no step numbers/text showing through it.
**Note:** a follow-up change briefly gave `.help-panel-title` a solid `var(--ink)` background badge, then reverted it back to transparent (sitting directly on the header gradient, as originally designed) per feedback that it looked wrong.

### fix: Help modal step lists rendered as fragmented boxes instead of flowing text
**What changed:** `.help-steps li` used `display: flex` to lay the numbered circle (`::before`) next to the step text. Flexbox treats every child as a separate flex item — including each contiguous text run and every inline element (`<code>`, `<a>`, `<strong>`) inside the `<li>` — so instead of flowing together as one paragraph, each fragment became its own independently-wrapping box, producing a disjointed, multi-row layout whenever a step contained more than one inline element (e.g. the Ollama and Stable Diffusion setup steps, which have several `<code>` snippets per line). Replaced the flex layout with `position: relative` + `padding-left` on the `<li>` and an absolutely-positioned `::before` badge, so the step number is a floating overlay and the actual content flows as normal inline text/wrapping.
**Impact:** All numbered step lists in the Help modal (API key setup, Ollama, Stable Diffusion, narration providers) now read as normal wrapped paragraphs with inline code snippets, instead of fragmenting into separate boxes.
**Test cases:** (1) Open Settings → Help — verified via a headless-browser screenshot that the Ollama and Stable Diffusion steps (which mix prose with multiple `<code>` snippets) now wrap as continuous text. (2) Numbered circles remain visually aligned to the left of each step across all sections.

### fix: Help modal recommended the wrong Stable Diffusion WebUI
**What changed:** The "Local Stable Diffusion" Help section linked to vanilla AUTOMATIC1111 WebUI and also listed ComfyUI as an alternative. Replaced with a link to [Stable Diffusion WebUI Forge](https://github.com/lllyasviel/stable-diffusion-webui-forge), which has native Flux1-dev support (the model the app's portrait prompts are actually optimized for) and implements the same `/sdapi/v1/txt2img` API the app calls. Removed the ComfyUI mention since it doesn't expose that API out of the box and would have led users astray.
**Impact:** Setup instructions now point to the WebUI the app was actually designed around, instead of a plain AUTOMATIC1111 install that doesn't support Flux1-dev as well.
**Test cases:** (1) Open Settings → Help → Local Stable Diffusion section — link points to `lllyasviel/stable-diffusion-webui-forge`. (2) Remaining setup steps (`--api` flag, default port 7860, `/sdapi/v1/txt2img` endpoint) are unchanged and still accurate for Forge.

### feat: Documented narration settings in the Help modal
**What changed:** Added four new sections to the Help modal ([index.html](web/index.html)): "Browser Narration" (built-in, no setup), "Kokoro LAN" (local TTS server setup, `/v1/audio/speech` + `/v1/audio/voices` endpoints, default port 8880), "OpenAI TTS" (API key setup at platform.openai.com), and "Narration Options" explaining the per-field narrate buttons, "Narrate All", the Voice/Speed overrides, and the "Auto-play Narrate All" option — none of which were previously documented anywhere in-app.
**Impact:** Users can now find setup instructions for all three narration providers and an explanation of the narration-related options directly in Settings → Help, instead of the Help modal only covering text/image providers.
**Test cases:** (1) Open Settings → Help — verified via a headless-browser run that all 4 new `.help-section-title` entries render, in addition to the existing 5. (2) Modal remains scrollable and visually consistent with existing sections (verified via screenshot).

### feat: Paleolithic tone rewritten — sitcom/dark comedy, 100,000 BC Neanderthal setting
**What changed:** Rewrote `SYSTEM_PROMPT` in `web/generator/genres/paleolithic/prompt-template.js`. TONE section now calls for sitcom-of-errors energy mixed with dark humor (botched hunts, petty arguments, misunderstandings) with the constant threat of being eaten by a predator played for comic dread as much as horror. SETTING RULES now pin the era to ~100,000 BC Middle Paleolithic, Neanderthal-dominant Eurasia — explicitly bans Upper Paleolithic-or-later weapon tech (bows, atlatls) that the previous prompt allowed ("simple bows (late paleolithic)"), and adds a rule that language is minimal/proto-linguistic (grunts, gestures, a handful of words) rather than fluent dialogue. STYLE section adds "anything goes" permission for absurd bad luck, undignified deaths, and feral slapstick. Updated the `authorNote` output-rule to match: sitcom-of-errors + dark humor, predator-threat-as-comedy, minimal grunted dialogue.
**Impact:** Paleolithic scenarios should now read as darkly comedic Stone Age sitcoms rather than straight survival drama, set explicitly in the Neanderthal-era Middle Paleolithic instead of a vague "Stone Age" that stretched into Upper Paleolithic bow technology.
**Test cases:** (1) Generate a Paleolithic character — `authorNote` and `description`/`opening` should read with comic-dread predator threat and sparse, blunt dialogue rather than articulate speeches. (2) No mention of bows or atlatls in generated content. (3) `plotEssentials`/`characterEntry` still respect existing char limits.
**Known follow-up (not addressed here):** a few static data entries predate this period change and are now anachronistic for 100,000 BC — notably the "Cave Painter" profession (`professions.js`) and a race icon prompt referencing a bow (`races.js:52`). These are pre-authored data/icon-prompt text, not live AI output, so left alone pending a decision on whether to do a fuller period-accuracy pass across `professions.js`/`races.js`/icons.

### feat: Joseon Author's Note now leans into palace intrigue
**What changed:** Rewrote the `authorNote` output-rules directive in `web/generator/genres/historical-korea-joseon-dynasty/prompt-template.js` (line ~100). Previously it asked only for literary behavioral prose with sensory anchors and honorific dialogue. It now explicitly directs the AI to maintain an atmosphere of palace/faction intrigue every turn — every courtier has an agenda, alliances are provisional, silence and eye contact carry weight, someone is always watching or reporting, and nothing should be stated plainly that could instead be implied.
**Impact:** The AI Dungeon Author's Note (injected every turn) will steer scenes toward court scheming, hidden agendas, and watchful tension rather than purely descriptive/sensory prose, matching the genre's Bungdang faction-politics setting rules already present in the system prompt.
**Test cases:** (1) Generate a Joseon character — inspect the `authorNote` field for intrigue-oriented language (agendas, alliances, being watched/reported) rather than only sensory description. (2) Confirm it still respects the 500-char limit and omits character names and plot details, per the existing constraints.

### fix: Consolidated the four duplicate squash.sh scripts into one
**What changed:** `web/generator/genres/{fantasy,modern,sci-fi}/icons/squash.sh` and `web/generator/common/icons/squash.sh` were near-identical copies (fantasy, modern, and common were byte-identical; sci-fi had one stray extra blank `echo`) that strip numeric disambiguator suffixes from icon filenames (e.g. `PROFESSIONS#slug#3.webp` -> `PROFESSIONS#slug.webp`). Consolidated into a single `web/generator/squash.sh` that takes an optional target directory argument (defaults to current directory), matching the pattern used by the recently-merged `resize.sh`. Deleted all four per-genre/common copies.
**Impact:** One shared script for squashing disambiguated icon filenames across all genres instead of four diverging copies. Run it as `web/generator/squash.sh path/to/genre/icons`.
**Test cases:** (1) Run against a directory containing a `NAME#slug#2.webp` file with no existing `NAME#slug.webp` — it's renamed to `NAME#slug.webp`. (2) Run against a directory containing a `NAME#slug#2.webp` file where `NAME#slug.webp` already exists — the numbered file overwrites it (matches prior `mv -f` behavior). (3) Files without a numeric `#N` suffix are left untouched.

### fix: Merged the two divergent icon resize scripts into one
**What changed:** `web/generator/genres/fantasy/icons/resize.sh` and `web/generator/genres/sci-fi/icons/resize.bash` had drifted into different (and partly buggy) behavior — fantasy's shrunk images to fit within 256x256 preserving aspect ratio and converted jpg/png to webp; sci-fi's forced every image to an exact 256x256 square (distorting non-square sources) and left formats untouched. Consolidated both into a single `web/generator/resize.sh` that takes an optional target directory argument, only touches `CATEGORY#slug` icon-named files, converts jpg/jpeg/png/gif sources to webp (quality 80) before resizing, and always shrinks-to-fit rather than forcing a square (no distortion). Deleted both of the old per-genre scripts.
**Impact:** One shared script for resizing icons across all genres instead of two diverging copies. Run it as `web/generator/resize.sh path/to/genre/icons`.
**Test cases:** (1) Run against a directory with oversized webp icons — they're shrunk to fit within 256x256 with aspect ratio preserved. (2) Run against a directory with jpg/png icons — they're converted to webp, resized, and the original file is removed. (3) Non-icon files (no `#` in the name) are left untouched.

### fix: Removed redundant secondary "Spin the Reels" button
**What changed:** Removed the second "Spin the Reels" button from the bottom-actions bar (shown below the generated scenario output), leaving only "↑ Go to Top" there. Also removed the now-dead `.btn-generate-secondary` CSS rule and updated the `test-ui` skill's stale assertion that checked for the removed button.
**Impact:** One less redundant control — the toolbar's "Spin The Reels" button (always visible, sticky) already covers re-rolling; the bottom copy no longer duplicates it. `.bottom-actions` is `justify-content: center`, so "Go to Top" re-centers on its own with no layout changes needed.
**Test cases:** (1) Generate a scenario through completion — verified via a headless-browser run that `.btn-generate-secondary` no longer exists in the DOM and `.btn-go-top` is visible and centered in `.bottom-actions`. (2) Toolbar "Spin The Reels" button still starts a fresh roll as before.

### feat: Gender labels changed from Man/Woman to Male/Female
**What changed:** Display labels for the `man`/`woman`/`trans_man`/`trans_woman` gender ids changed from "Man"/"Woman"/"Trans man"/"Trans woman" to "Male"/"Female"/"Trans male"/"Trans female" across `generator/common/genders.js` (source of truth), the slot machine catalog and `GENDER_LABELS` map in `index.html`, the parent-gender ternary in `index.html`, `generator/cast-builder.js`'s mirrored `GENDER_LABELS` map, and the JSDoc examples in `generator/types.js`. Internal `id` values (`man`, `woman`, `trans_man`, `trans_woman`) and icon filenames (`GENDER#man.webp`, etc.) were intentionally left unchanged since they're used as logic/lookup keys, not shown to the user.
**Impact:** Every place a gender is displayed to the player (slot machine label, character sheet, supporting-cast entries) now reads "Male"/"Female"/"Trans male"/"Trans female" instead of "Man"/"Woman"/"Trans man"/"Trans woman". No effect on icon loading, masc/fem pool selection logic, or saved/exported data keyed by `id`.
**Test cases:** (1) Roll a character — verified via a headless-browser run that the gender slot lands showing "Male" (or "Female") instead of "Man"/"Woman". (2) Supporting cast (parents, NPCs) display the updated labels. (3) Icon images still load correctly since `iconPath`/`dataSlug` values were untouched.

### fix: Delay before reel spin broke reel animation entirely
**What changed:** A prior change added `await sleep(500)` before `animateSlots()` assigned each slot's first image frame, to create a pause between the pull sound and the reels starting to spin. Each slot `<img>` renders with `src=""`, and yielding to the event loop during that 500ms let the browser fire the tag's `onerror` handler (which replaces `.slot-window` with a static ⚙ placeholder `<div>`, destroying the `<img>` element) before any real icon was ever set — so `document.getElementById('slot-img-*')` returned `null` for every slot afterward and no spin interval ever started. Reworked `animateSlots()` to assign each slot's first real frame synchronously (before any `await`), then play the pull sound and wait, then start the spin intervals via a stored `startSpin` map.
**Impact:** Reels spin again. Slots also now show a static icon during the pull-sound pause instead of the ⚙ placeholder, and visibly start cycling only after the delay — matching the intended "pause before spin" behavior.
**Test cases:** (1) Click Spin The Reels — verified via a headless-browser run that all reel `<img>` elements keep real icon `src` values (no placeholders) and cycle every ~90ms during the spin phase, landing correctly per slot. (2) No regression to the pull sound, reel-stop sounds, or bell timing from earlier changes today.

### feat: Split slot machine SFX into pull + per-reel stop sounds
**What changed:** Replaced the single `_slotMachineSfx` (`audio/slot_machine.mp3`) with two clips: `_slotMachinePullSfx` (`audio/slotmachine-pull.mp3`) played once in `animateSlots()` right before any reel starts spinning, and `_slotMachineReelStopSfx` (`audio/slotmachine-reelstop.mp3`) played on every reel landing inside the staggered landing loop (alongside the existing win bell on the final reel). Also added both new SFX to the audio-reset list in the roll-start handler (previously only `_bellSfx`, `_overtureSfx`, `_slotMachineSfx`).
**Impact:** Slot reel audio timing now matches the animation — one clear "pull" cue at the start, a distinct "stop" thunk as each reel lands — instead of one long clip whose timing drifted from the staggered reel animation. `audio/slot_machine.mp3` is no longer referenced in code (left on disk in case it's still wanted).
**Test cases:** (1) Click Spin The Reels — pull sound plays immediately before the first reel starts cycling. (2) Each reel plays a stop sound exactly when it lands, including the last one (which also plays the bell). (3) Starting a new roll while a previous one's audio is still playing resets/stops both new SFX cleanly (no overlap).

### fix: Narrate All read the protagonist entry twice
**What changed:** The protagonist's character-entry wrapper in the Character Entries card reused the `.npc-section` class (with `.npc-section-name` for its label), which `narrateAll()` also queries via `document.querySelectorAll('.npc-section')` to build the NPC reading sequence. Since the protagonist was *also* added to the sequence explicitly via the `field-protagonist` entry in `fieldDefs`, it got read twice — once by name, once by the generic NPC loop. Renamed the protagonist wrapper's class from `npc-section` to `protagonist-section` (it already carries an inline `margin-bottom` override, so no CSS rule was needed for the rename) so the NPC loop no longer matches it.
**Impact:** "Narrate All" and auto-play Narrate All now read the protagonist description exactly once.
**Test cases:** (1) Click "Narrate All" — protagonist entry is read once, followed by each NPC once. (2) Individual protagonist narrate button (`field-protagonist`) still works standalone. (3) NPC portrait/story-card layout and spacing unchanged (protagonist section still has `margin-bottom:1.5rem`).

### feat: Narrate All auto-scrolls to the section being read
**What changed:** `narrateAll()`'s reading sequence changed from an array of plain strings to `{ text, el }` objects, where `el` is the source element for that entry (`.output-field` wrapper for Title/Description/Opening/Plot/Author's Note, `.protagonist-section` for the protagonist entry, `.npc-section` for each NPC). Before narrating each item, the loop now calls `item.el?.scrollIntoView({ behavior: 'smooth', block: 'center' })`, matching the smooth-scroll convention already used elsewhere in the app (e.g. the skeleton-roll slot animation).
**Impact:** During "Narrate All" (manual or auto-play), the page now smoothly scrolls to keep the section currently being read centered in view, instead of leaving the user to scroll manually to follow along.
**Test cases:** (1) Click "Narrate All" — page scrolls to Title, then Description, Opening, Plot, Author's Note, Protagonist, and each NPC in turn as narration progresses. (2) Clicking "Stop" mid-sequence halts narration without further scrolling. (3) Manual single-field narrate buttons (`narrate()`) are unaffected — no scroll behavior change there.

### fix: Narrate All read the scenario title twice
**What changed:** In `narrateAll()`'s `fieldDefs`, the protagonist entry's spoken label was `currentOutput?.title ?? 'Protagonist'` — the scenario title — so it was read once as the standalone first sequence item, then read again as the label prefix immediately before the protagonist's character entry. Changed the label to `currentSkeleton?.name ?? 'Protagonist'`, i.e. the character's own name, matching the label already shown on-screen (`${sk.name} — Protagonist`).
**Impact:** The scenario title is now read exactly once, as the very first thing in the sequence; the protagonist entry is introduced by the character's name instead of a repeat of the title.
**Test cases:** (1) Click "Narrate All" — title is spoken once at the start, protagonist entry is introduced by the character's name, not the title. (2) Auto-play Narrate All exhibits the same corrected sequence.

## 2026-07-02

### feat: Auto-generate NPC portraits option
**What changed:** Added an "Auto-generate NPC portraits" checkbox to the Settings modal Options tab (`#auto-npc-portraits`, persisted to `localStorage` as `gof_auto_npc_portraits`). When enabled and an image backend (local SD or Stability AI) is configured, `runAIPhase()` now calls a new `autoGenerateAllNpcPortraits()` helper after scenario generation, which awaits `generateNpcPortrait()` for each NPC in sequence (NPC portrait generation guards against overlapping calls via `npcPortraitGenerating`, so they can't run concurrently).
**Impact:** Users no longer have to open each NPC's portrait menu and click "Generate Portrait" individually — cast portraits populate automatically alongside the protagonist portrait when the option is on. Off by default, so existing behavior (manual per-NPC generation) is unchanged unless opted in.
**Test cases:** (1) Option off — NPC thumbnails remain silhouettes after generation, same as before. (2) Option on, no image backend configured — no NPC portraits attempt (matches existing protagonist portrait gating). (3) Option on with SD/Stability configured — each NPC thumbnail fills in sequentially without overlapping "already generating" errors.

### feat: Auto-play Narrate All option
**What changed:** Added an "Auto-play Narrate All" checkbox to the Settings modal Options tab, alongside the other auto-behavior toggles (`#auto-narrate-all`, persisted to `localStorage` as `gof_auto_narrate_all`). When enabled and a TTS provider is selected (anything other than "Off"), `runAIPhase()` now calls `narrateAll()` right after the scenario renders, so playback starts automatically without the user clicking the "Narrate All" button.
**Impact:** Users who want hands-free playback no longer have to manually start narration after every generation. Off by default, so existing behavior (manual "Narrate All" click) is unchanged unless opted in.
**Test cases:** (1) Option off — narration does not start automatically after generation, "Narrate All" button still works manually. (2) Option on, TTS provider set to "Off" — no auto-play attempt. (3) Option on with a TTS provider configured — narration begins automatically once the scenario cards render, and the Stop button appears/behaves the same as a manual "Narrate All" click.

### fix: Auto-play Narrate All now waits for the overture music to fade out
**What changed:** `fadeOutAudio()` now returns a `Promise` that resolves once the fade completes (or immediately if the audio was already paused), instead of firing a `setInterval` with no completion signal. `generatePortrait()`'s `finally` block now `await`s it, and `runAIPhase()` captures whichever fade path ran (portrait generation or the direct no-backend fade) as `musicFadeDone`, chaining the auto-narrate trigger with `musicFadeDone.then(() => narrateAll())` instead of calling `narrateAll()` immediately.
**Impact:** Auto-play Narrate All no longer talks over the overture — narration now starts only after the background music has finished fading out, matching the manual "Narrate All" button's implicit expectation that the scene is quiet first.
**Test cases:** (1) Auto-narrate on, no image backend configured — music fades (~5s) then narration starts, not before. (2) Auto-narrate on with an image backend configured — narration waits for the protagonist portrait to finish generating and its music fade to complete. (3) Manual "Narrate All" / "Regenerate" portrait clicks still behave as before (fire-and-forget, no new blocking).

## 2026-06-29

### feat: New sticky toolbar + genre carousel UI
**What changed:** Replaced the old floating provider button groups, standalone genre select, and generate button with a sticky toolbar. Toolbar contains icon-labeled dropdowns for Text, Image, Narration, and Genre providers, plus Settings and Spin The Reels buttons. Genre selection now also shows a full-width carousel below the toolbar with the genre artwork, title, and description. Carousel supports prev/next navigation buttons and dot indicators. Toolbar and carousel are always visible; content scrolls beneath them.
**Impact:** All provider controls are always accessible without scrolling. Genre selection is more visual and discoverable on both mobile and desktop.

### feat: Fixed bottom status bar
**What changed:** Added a fixed `#statusbar` at the bottom of the viewport. Status messages, the disclaimer text, and (previously) token stats all live here. Removed the old `<footer>` element. Status bar is always visible regardless of scroll position.
**Impact:** Generation status and disclaimer are always readable without scrolling to the bottom.

### feat: Phase pipeline moved into status bar
**What changed:** Removed the `#phase-pipeline` HTML element from the content area. `setPhase()` now renders an inline step indicator directly into `#status-bar` using brass/gold color coding: done steps show ✓ in brass, the active step shows ⚙ in gold, pending steps are dimmed. `clearPhases()` calls `setStatus('')`.
**Impact:** Reduces visual clutter in the content area; generation progress is visible in the always-present status bar.

### feat: Version number in Settings modal
**What changed:** Moved the `v5197027` git hash from the status bar to the bottom-left of the Settings modal footer. Styled in faint brass monospace.
**Impact:** Status bar is less cluttered; version is still discoverable.

### feat: Toolbar labels replaced with SVG icons
**What changed:** Replaced the text labels ("Text", "Image", "Narration", "Genre") in the toolbar with inline SVG icons (pen, image frame, speaker, book). Added `title` attributes to each `.toolbar-field` for accessibility. Updated `.toolbar-label` CSS to flex-align the SVG.
**Impact:** Toolbar is significantly more compact on mobile, reducing wrapping from 3 rows to 2.

### feat: Titlebar gear icons replaced with half-clipped PNG
**What changed:** Overrode `.site-header::before` and `::after` in the inline `<style>` block to use `android-chrome-192x192.png` instead of the text `⚙` glyph. Icons are 160×160px, positioned at the header edges with `translateX(±50%)` so exactly half is visible. Added mobile padding (`90px`) on `.site-title` and `.site-subtitle` so text wraps inside the visible area on narrow screens.
**Impact:** More visually striking titlebar decoration consistent with the app icon.

### feat: Responsive genre carousel card layout
**What changed:** Genre carousel cards are mobile-first column layout (image on top, text below) at viewports under 600px. At 600px+ they switch to a row layout (210px image on the left, title and description on the right) matching the mockup.
**Impact:** Cards are readable on both mobile and desktop without horizontal scrolling.

### fix: Carousel next/prev buttons not working
**What changed:** Added `carouselStep`, `goToCarouselIndex`, and `onToolbarGenreChange` to the `Object.assign(window, {...})` export at the bottom of the module script. These functions were defined inside `<script type="module">` scope and were unreachable from inline `onclick` handlers.
**Impact:** Carousel navigation buttons now work correctly.

### fix: Genre card info panel appearing outside card border
**What changed:** The `onerror` attribute on the genre card `<img>` used `\\"` (backslash-quote) for inner HTML escaping. In a double-quoted HTML attribute, `"` closes the attribute regardless of the preceding backslash, causing the HTML parser to split `.genre-card-info` out of `.genre-card` as a sibling. Fixed by replacing `\\"` with `&quot;` in the template literal. Also fixed a companion bug where `@media (min-width: 100px)` with `width: 210px` on `.genre-card` was clamping the card to the image width on all screen sizes; corrected to `min-width: 600px` with no explicit width override.
**Impact:** Genre card title and description now display correctly inside the card border on desktop.

### feat: Convert _genre.png to WebP
**What changed:** Converted all 7 `_genre.png` genre artwork files to `_genre.webp` using ffmpeg at quality 90. Updated the carousel `renderCarouselCard()` src reference from `_genre.png` to `_genre.webp`.
**Impact:** Genre images reduced from ~1.2MB each to ~130KB each (~90% smaller), significantly improving carousel load time.

## 2026-06-28

### fix: Narrate All section playback order
**What changed:** Added `currentOutput?.title` as the first item spoken in `narrateAll()` before iterating `fieldDefs`. Sections now play in the correct order: title → description → opening → plot essentials → author's note → protagonist → NPCs.
**Impact:** The Narrate All button reads sections in the intended narrative sequence.

## 2026-06-27

### feat: Synthetic construct identity rules for sci-fi androids
**What changed:** Added `syntheticType` property to all four android race entries in `genres/sci-fi/races.js`:
- `android_synth` (Biomechanical) → `'biomechanical'` — full person; gender, orientation, and relationship generated normally
- `android_standard` (Plastic) → `'plastic'` — gender generated for appearances; orientation forced to Asexual; relationship forced to Single (no partner in cast); also renamed flavor text from "Mechanical Android" to "Plastic Android"
- `android_industrial` (Industrial) → `'industrial'` — no gender (N/A / it/its), no orientation (N/A), no relationship (N/A); no partner generated
- `android_combat` (Combat) → `'industrial'` — same rules as industrial (weapons platform, not a person)

In `skeleton-builder.js`, moved the `identity` pick to before gender/orientation/relationship, then branches on `syntheticType` to enforce the correct attribute set. `'single'` relationship status is passed to `buildCast` for plastic/industrial androids, which naturally blocks partner NPC generation via `PARTNER_HAS_NPC`.
**Impact:** Industrial and Combat Androids no longer get gender, sexual orientation, romantic relationships, or family. Plastic Androids get a gender presentation but are always asexual and unpartnered. Biomechanical Androids are fully human-equivalent in these attributes.

### feat: Human-readable Kokoro voice labels
**What changed:** Replaced the `{ value, label }` object array in `KOKORO_VOICES` with a plain string array of voice IDs. Added `kokoroVoiceLabel(id)` which parses the `prefix_name` format and returns e.g. `"Lewis (British Male)"` for `bm_lewis`. Applied to both the static fallback list and live-fetched voices from the Kokoro server. Unknown ID formats fall back to displaying the raw ID.
**Impact:** Voice names in the Settings dropdown are readable instead of showing raw identifiers like `bm_lewis`.

### feat: Narration Provider Selector in Main UI
**What changed:** Added a Narration button group to the provider selectors area (alongside Text Provider and Image Provider). Buttons: Off, Browser, Kokoro, OpenAI. Kokoro and OpenAI buttons are hidden until their URL/key is entered in Settings. Selecting a button calls `setTtsProvider()`, which now also syncs the button highlight state. Added `updateNarrationProviderSelector()` — called on settings input and on page load — to show/hide provider buttons and auto-fall-back to Browser if credentials are removed.
**Impact:** Players can switch narration on/off and change providers directly from the main UI without opening Settings.

### fix: Narration button 🔊 icon replaced with brass-light SVG
**What changed:** Replaced the `🔊` emoji on all narrate buttons (6 field buttons + Narrate All) with an inline SVG speaker icon using `fill="currentColor"`, inheriting the button's CSS color. Defined `SVG_NARRATE_ICON` constant; `setNarrateButtonState` idle branch now uses `innerHTML` instead of `textContent`.
**Impact:** Narration buttons match the brass color scheme instead of showing an OS-rendered emoji.

### fix: NPC gender and race omitted from fallback AI prompt
**What changed:** The inline `buildPrompt()` in `index.html` was formatting cast lines as `name (role, status): traits` — dropping `gender` and `race`. Updated to match the genre prompt files: `name (role, status, gender, race): traits`.
**Impact:** The AI now receives all canonical NPC attributes in the fallback prompt path, reducing contradictions between rolled attributes and generated descriptions.

### feat: Voice pick list queries TTS provider for installed voices
**What changed:** Added `populateKokoroVoices(voiceEl, genreDefault)` — async, fetches `GET /v1/audio/voices` from the configured Kokoro URL, falls back to the static list on any error. Added `populateBrowserVoices(voiceEl)` — populates from `speechSynthesis.getVoices()` with a "System default" first option, handles the async `voiceschanged` event. Both functions restore the saved voice override from localStorage after populating. `getEffectiveTtsConfig` now passes `voiceURI` into the browser config; `narrateBrowser` applies it to the utterance. OpenAI voice list remains static (API voices are fixed).
**Impact:** Kokoro voice list reflects what is actually installed on the server. Browser voice list shows all OS/browser voices and the selection is applied during playback.

### fix: Narration provider selection not persisted across sessions
**What changed:** `updateNarrationProviderSelector()` was calling `setTtsProvider(ttsProvider)` unconditionally, which wrote the default `'off'` value to localStorage before the saved provider was read from storage. Removed that redundant call (button highlighting is already handled inside `setTtsProvider`). Moved the init call to `updateNarrationProviderSelector()` to after `setTtsProvider(savedTtsProvider)` so credentials are visible and the saved provider is already active when visibility is evaluated.
**Impact:** Choosing Kokoro (or any provider) is now remembered across page loads.

## 2026-06-24 (continued)

### fix: Story Card Format — Structured Physical Description
**What changed:** Updated `characterEntry` and `npcEntries` output rules in all 7 genre prompt templates (fantasy, modern, sci-fi, paleolithic, joseon, manga, nihongi) and the fallback inline prompt in `index.html`. All story cards now open with a standardised sentence: "[Full name] is a [age]-year-old [orientation] [gender] [race] with [hair description], [eye color] eyes, [skin tone] skin[, accessories/marks if notable], wearing [outfit suited to occupation]." followed by personality, quirks, habits, occupation, and family/friend relationships. Cards explicitly must not repeat situation or plot already in description/opening/plotEssentials.
**Impact:** Story cards imported into AI Dungeon will be immediately scannable — the AI knows exactly who each character is physically before the prose begins, and won't duplicate plot context.

## 2026-06-24

### fix: importToAIDungeon Button Not Responding
**What changed:** `importToAIDungeon` and `checkImportServer` were defined inside a `<script type="module">` and therefore not in the global scope. Added both to the `Object.assign(window, {...})` export block.
**Impact:** The "↑ Import to AI Dungeon" button now fires correctly when clicked.

### fix: Narrate All Only Played First Section
**What changed:** Rewrote `narrateAll` to use its own internal playback pipeline instead of calling `narrate()`. The old code called `narrate()` in a loop, which called `stopNarration()` at the start of each call, resetting `ttsAllActive = false` and breaking the loop after the first field.
**Also added:**
- Section titles read aloud before each field ("Description. …", "Opening. …", protagonist title, each NPC name)
- Text chunked into sentence-boundary segments (~350 chars for cloud, ~500 for browser) so each TTS call is short and fast
- Cloud TTS prefetch pipeline: next chunk starts fetching while the current one plays, minimising gap between chunks
**Impact:** Full scenario narration now reads all fields in order including section labels. Cloud TTS latency between chunks is nearly zero.

### feat: AI Dungeon Importer — Tags Import
**What changed:** After filling the title and description, the importer now adds each tag from `scenario.tags` one at a time using the tag input (`placeholder="dragons, magic, etc."`) and the `+` button (`[role="button"][aria-label*="Add"]`). Waits for `aria-disabled` to clear before each click.
**Impact:** Tags are now fully imported alongside all other scenario fields.

### fix: AI Dungeon Importer — Skip Portrait if NSFW
**What changed:** Portrait upload is skipped when `scenario.nsfw` is `true`.
**Impact:** Prevents NSFW portraits from being uploaded to AI Dungeon's content servers.

### feat: Skeleton Builder — NSFW Flag
**What changed:** `buildSkeleton` now accepts `opts = { nsfw }`. Derives `allowNSFW = opts.nsfw && age >= 18`, filters professions flagged `p.nsfw`, and includes `nsfw: allowNSFW` in the returned skeleton. `generateCharacter` and `regenerateSkeleton` in `generator/index.js` both thread the option through.
**Impact:** NSFW professions are suppressed by default; opt-in is required and restricted to adult characters.

### fix: Unique NPC First Names
**What changed:** `buildCast` now tracks used first names in a Set seeded with the protagonist's first name. All NPC name picks (parents, partner, siblings, friends, foil) go through a `uniqueFirst()` helper that retries up to 15 times to avoid duplicates.
**Impact:** No two characters in a generated cast share a first name.

### fix: Spin the Reels Stops Audio
**What changed:** `runGenerate` now calls `stopNarration()` and pauses `_bellSfx`, `_overtureSfx`, and `_slotMachineSfx` before starting a new generation.
**Impact:** Any playing music, sound effect, or TTS narration is silenced immediately when a new spin begins.

### fix: Copy Full Text Missing plotEssentials and authorNote
**What changed:** `copyAll` payload now includes `plotEssentials` and `authorNote` in the `scenario` object, matching `downloadPackage`.
**Impact:** JSON clipboard export now contains the full scenario data.

### fix: Genre Selector Hard to Read
**What changed:** Replaced the dense inline style on `#genre-select` with a `.genre-select` CSS class: solid dark background (`#1a1208`), `--gold-light` text, `--brass` border, hover/focus states, and font size raised to `0.85rem`.

### fix: Minimum Font Size 0.8rem
**What changed:** All `font-size` values below `0.8rem` in `styles.css` and `index.html` bumped to `0.8rem`. Title bar (`clamp(1.8rem…)`) unchanged.
**Impact:** Consistent, readable text throughout the UI.

### fix: Button Label — "Spin the Reels"
**What changed:** Renamed "Turn the Gears" → "Spin the Reels" in the generate button and status message.

## 2026-06-20

### feat: "Import to AI Dungeon" Button in Web UI
**What changed:** Added `web/tools/aidungeon-server.mjs` — a companion HTTP server on `localhost:7432` — and an "Import to AI Dungeon" button in the web app that appears only when the server is reachable.
**Why:** Previously the user had to download a `.zip`, extract it, and run the importer manually. With the server running, one button click sends the current scenario directly to the Playwright importer.
**How to use:**
1. Run `node web/tools/aidungeon-server.mjs` in a terminal and keep it open.
2. Generate a scenario in the web app. The "Import to AI Dungeon" button appears below the Download button.
3. Click it — the Playwright browser opens and imports automatically.
**What is sent:** Same payload as the download package — `scenario.*` fields, `characters{}`, and portrait base64 if one was generated. The server writes a temp folder and spawns `aidungeon-importer.mjs --headed`.
**Technical:** Server at `http://localhost:7432`; `GET /ping` for availability check; `POST /import` with JSON body. CORS is open (`*`) since this is a local tool. The button is hidden by default and shown via `checkImportServer()` called after output renders.



### Fix: AI Dungeon Importer — Story Cards Now Created Individually
**What changed:** Replaced the "Import Story Cards" file-upload flow with individual card creation via the "CREATE STORY CARD" button.
**Why:** The file-import dialog uses a dynamically-created `<input type="file">` whose `change` event requires `isTrusted: true`. Playwright's programmatic `setFiles()` and all `dispatchEvent()` approaches produce `isTrusted: false`, which AI Dungeon's handler rejects silently. Manually uploading the same JSON file worked fine — confirming the format was correct, only the automation path was broken.
**How it works now:** For each character in `scenario.characters`, the script clicks CREATE STORY CARD, fills the NAME ("Enter a name…"), ENTRY (`aria-label="Value"`, 1000-char limit), and TRIGGERS fields, then clicks the modal FINISH.
**Key selectors:** NAME = `getByPlaceholder(/enter a name/i)`; ENTRY = `[aria-label="Value"]`; TRIGGERS = `getByPlaceholder(/comma separated.*trigger/i)`; save = last `role="button" name="Finish"` (dialog is last in DOM order); scenario save = `.first()` (rendered before the dialog portal).

## 2026-06-19

### Fix: Gemini Generation Fails with 6 NPCs (Token Limit)
**What changed:** `api-client.js` now uses separate token limits: `CLAUDE_MAX_TOKENS = 16384` and `GEMINI_MAX_TOKENS = 32768`, replacing the shared `MAX_TOKENS = 8192`.
**Why:** With 6 NPCs, Gemini's response exceeded 8192 tokens mid-JSON, producing an unparseable truncated response. Gemini 2.5 Flash supports up to 65K output tokens; the old cap was unnecessarily tight. Claude's limit is also raised to 16384 to match the inline `index.html` calls.
**Gameplay impact:** Generation with large casts (5–6 NPCs) should now complete without parse errors.

### Fix: Export Package Missing plotEssentials and authorNote
**What changed:** `downloadPackage` in `web/index.html` now includes `scenario.plotEssentials` and `scenario.authorNote` in the exported `scenario.json`.
**Why:** The AI generates these fields and they are displayed in the UI, but they were silently dropped from the zip package — making it impossible to import them into AI Dungeon automatically.
**Gameplay impact:** Existing zips won't have these fields; the importer treats them as optional and skips blank values.

### feat: AI Dungeon Importer (Playwright) — Verified Working
**What changed:** Added `web/tools/aidungeon-importer.mjs` — a Node.js CLI script that drives a browser via Playwright to import a FateVend scenario package into AI Dungeon's Create Scenario form.
**Why:** The previous TamperMonkey approach (`aidungeon-importer.user.js`) only filled the description field and could not trigger native file dialogs (needed for story cards JSON import and portrait upload) or drive multi-step tab navigation reliably.
**What it does:** Signs in, navigates Play → Create a Scenario → Empty template, fills Title and Description, switches to the Plot tab and adds Story Summary / Plot Essentials / Author's Note components, imports story cards JSON via the "Story card actions" → "Import Story Cards" flow, uploads the portrait PNG via the Images modal Upload sidebar, then clicks FINISH.
**Usage:** `node web/tools/aidungeon-importer.mjs --input <folder> [--headed] [--slowmo 200]`
**Dependencies:** `npm install --save-dev playwright && npx playwright install chromium`
**Key selectors:** `/scenario/create` redirects to home — must navigate via Play menu; portrait container uses `dispatchEvent` to bypass tab overlays; story cards import uses `[aria-label="Story card actions"]` dropdown; portrait file upload uses `input[type="file"]` directly.

## 2026-06-18

### Fix: Nihongi AI Output Missing Spaces Between Words
**What changed:** Removed a broken `.replace()` in `parseResponse()` in `genres/nihongi/prompt-template.js`.
**Why:** The regex `/[ -]/g` was interpreted as a character range from space (U+0020) to hyphen (U+002D), stripping every space from the Claude API response before JSON parsing. All words in the AI-generated scenario ran together with no whitespace.
**Gameplay impact:** Nihongi character descriptions, openings, NPC entries, and titles now display correctly.
**Root cause:** `[ -]` in a regex character class is a range, not "space or hyphen". The `\n`/`\t` guard in the callback was dead code — those chars fall outside the matched range.

### Project Renamed: Gears of Fate → FateVend
**What changed:** All display names, titles, and code references updated from "Gears of Fate" / "GearsOfFate" to "FateVend".
**Why:** Trademark avoidance.
**Files updated:** `web/index.html` (title, h1, settings modal header), `README.md`, `requirements.md`, `package-lock.json`, `web/tools/aidungeon-importer.user.js` (all 5 occurrences), `web/generator/common/icons/generate_icons_core.py`, `.claude/skills/add-genre/SKILL.md`, `.claude/skills/test-ui/SKILL.md`.
**Note:** `localStorage` keys retain the `gof_` prefix to preserve existing user settings (changing them would wipe saved API keys and preferences). The project directory on disk remains `GearsOfFate/`.
**Gameplay impact:** None.

## 2026-06-18

### Settings Modal — 4-Tab Restructure
**What changed:** Replaced the 2-column grid layout in the settings modal with four tabs: Text, Image, Narration, Options.
**Why:** The 2-column layout collapsed poorly on mobile screens; tabs give each section room and add a clean home for the new Narration settings.
**Gameplay impact:** None — purely structural. All existing settings are preserved in their respective tabs.
**Visual:** Tab bar with gold underline on active tab, matching the brass/parchment theme.

### TTS Narration System
**What changed:** Added a full text-to-speech narration system supporting three providers: Browser (built-in SpeechSynthesis), Kokoro (LAN OpenAI-compatible endpoint), and OpenAI TTS API.
**Why:** Allows the generated character sheets and scenario text to be read aloud for immersive tabletop play.
**Gameplay impact:** 🔊 narrate buttons appear on all prose fields (Description, Opening, Author Note, Plot, Protagonist, each NPC) when a provider is selected. A "Narrate All" button reads the full sheet sequentially. Clicking a speaking button stops it.
**Visual:** Narrate buttons show a loading spinner (◌), pause icon (⏸ on rust background while speaking), or speaker (🔊 at rest). A global Stop button appears during narration.
**Mechanical:** Per-genre voice and speed defaults in `GENRE_TTS_CONFIG`; preprocessors normalize text before synthesis (Nihongi: pronunciation substitutions; Manga: exclamation compression).

### Voice Picklist Auto-Population
**What changed:** Selecting a TTS provider in settings now immediately populates the Voice dropdown with provider-appropriate options and pre-selects the genre default.
**Why:** Previously the voice field was a free-text input — users had no way to know valid voice IDs.
**Gameplay impact:** None.

### Narrate Button Busy State + Toggle Stop
**What changed:** Narrate buttons now show a pulsing ◌ during network fetch (Kokoro/OpenAI), switch to ⏸ while audio plays, and clicking the active button stops playback.
**Why:** TTS generation takes time; without feedback users couldn't tell if the click registered, and there was no way to interrupt.
**Gameplay impact:** More usable narration flow, especially for long NPC descriptions.

### New Sentiments for Joseon and Nihongi Genres
**What changed:** Added 70 new sentiment entries to `sentiments.js`, all using common emoji face icons. Normalized all Joseon Dynasty and Nihongi profession sentiment arrays from full-sentence descriptions to short underscore-delimited IDs.
**Why:** The new historical genres used complex full-sentence sentiments that had no matching icons. Normalizing to short IDs matches the existing icon lookup system.
**Gameplay impact:** Sentiment icons now display correctly for Joseon and Nihongi characters. New sentiments include: `methodical`, `diplomatic`, `contemplative`, `calculating`, `worldly`, `adaptable`, `loyal`, `stoic`, `resigned`, `yearning`, and ~60 others.

### PNG → WEBP Icon Reference Update
**What changed:** All `iconPath` values in 64 JS data files updated from `.png` to `.webp`. Regex patterns in `index.html` updated to match `.webp`. The `iconPath()` URL builder updated to append `.webp`. The `generate_icons_core.py` generator now saves icons as WEBP (via PIL) instead of PNG, and scans for existing `.webp` files when skipping.
**Why:** Icon files were already converted to WEBP on disk; code references still said `.png`, causing 404s for all icon images.
**Gameplay impact:** All profession, sentiment, life event, tension, secret, city setting, economic tier, family, and race icons now load correctly.
**Test:** Generate a character in any genre — icons should appear on all picklists and the output sheet.

### Fantasy Icon — sex_worker Promoted
**What changed:** Renamed `PROFESSION#sex_worker#1.webp` → `PROFESSION#sex_worker.webp` in the fantasy icons directory.
**Why:** The icon was generated but left with its variant-number suffix, causing a 404 when the profession was selected.
**Gameplay impact:** Fantasy sex_worker profession now displays its icon correctly.

### Settings Modal — Font Size and Color Fixes
**What changed:** Increased font sizes for four settings UI elements and lightened the group heading color.
- `.settings-group-heading`: `0.56rem` → `0.65rem`; color `--brass-dark` → `--gold` (was too dark against parchment background)
- `.settings-field label`: `0.6rem` → `0.72rem`
- `.settings-option-row label`: `0.6rem` → `0.72rem`
- `.settings-hint`: `0.58rem` → `0.68rem`
**Why:** Labels were difficult to read at small sizes; group headings were nearly invisible against the brown background.
**Gameplay impact:** None — readability improvement only.
