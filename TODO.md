# TODO
- Play scenarios from each genre and make sure they are fun, not just some grim chatbot trying to kill you or chat you to death.  Most of the genre's AI generated try to be factual, historical, and boring.

- e2e unit test

- Randomness: seems like the reels pick the same thing repeatedly.
- Need some sort of a post-skeleton or pre-generation consistency check

- NPCs seem to get a broad race instead of a concrete one.

## Bugs
- Plot essentials should be short bullet points, not wordy prose.  Ideally around 1000 characters, maximum 1500 characters.

- The Settings modal recently got a new Genre tab, but it makes the modal too wide on mobile browsers.  Either make tabs smaller, use icons, scroll the tab bar, or wrap it.

- Need consistent style for text.  I see text in 3-4 colors and the fonts tend to be tiny for some reason.  Other than the disclaimer, all text should be 1.0em.  Maybe even put this in the DESIGN.md because Claude seems to forget after a time.


## Bugs - Fantasy
- The text-to-image prompt needs to handle special cases:
  - Dragonborn: Illustration of a person with golden dragon scale skin, muscular body, fiery golden eyes, sharp filed teeth, prominent facial scales, subtle horns protruding from hair, scaly tail

## Bugs - Modern
- The Modern genre is crap.  It is too general and open ended to be any fun.  Let's recast it to ...
- Why does Modern character with name "Suzuki" get Asian/Indian?
## Bugs - Joseon
- Redo all of the Joseon.  The current icons are a cultural mashup of Chinese, Japanese, Vietnamese and Korean, so they are not accurate.
## Bugs - Nihongi
- Redo all of the Nihongi icons.  The current icons are a cultural mashup of Chinese, Japanese, Vietnamese and Korean, so they are not accurate.

## Bugs - Osaka
## Bugs - Paleo
## Bugs - Sci-Fi
- The text-to-image prompt needs to handle special cases:
  - "Plastic Android": portrait of Plastic Android, female, tall and electronic eyes, pale plastic skin, subtle corporate insignia, 
  - "Plant alien": A sentient plant.  May be human shaped, but has floral or foliage elements.

### Low Priority Bugs
- Sometimes generate_icons hangs and you have to restart the whole shell to recover.
- Think of a better project name.

## New Features
- Enable AID scripting and automatically inject the latest auto-cards (https://github.com/LewdLeah/Auto-Cards)
- Update the skeleton with a new "metadata" section with name and version of the text and image provider, generation datetime, commit hash
- Add a button that creates a promo video for the scenario using the character portraits, overture, name overlays, "Starring YOU as xxx".
- Add a NPC portrait Zoom to popup menu?
- Add settings option to disable BGM.
- Kokoro'e english voices don't pronounce Japanese or Korean words properly, but the Japanese voices produce incomprehensible English.  So either we preprocess English -> Katakana so the Japanese voice works?  Or even better, extend the Kokoro service to do this heavy lifting.  Consider using CMU Pronouncing Dictionary (CMUdict)
- Add more AI providers
- Add anonymous telemetry.  I am curious what genres are popular, and what country users are from.

## Open Questions
- Should Plot Essentials be considers as spoilers, and therefore not automatically read by the narrator?

## Rejected ideas
- Auto-load web/genre-packs (N/A - Uploaded genre-packs are stored in the browser's index DB )
- Modern's races.js has 14 entries with no em-dash in `flavor` (same truncation mechanism as the Manga-Osaka fix in Fixed Bugs below), but those are already short ethnicity labels (e.g. "Ashkenazi Jewish"), so there's no actual truncation problem — just inconsistent style vs. the rest of the file. Low priority; not a functional bug.


---

## Fixed Bugs
- Consistency-tested sci-fi by rolling a batch of skeletons and checking appearance/secret/tension/life-event fit against race. Found and fixed three issues: (1) `common/hair.js` (shared by Fantasy/Modern/Sci-Fi) had a magical "Medusa hair that moves on its own" entry — moved it to Fantasy's own `character-attributes.js` hair additions, out of the shared pool. (2) Secrets `is_a_clone` and `android_passing` could roll for a character whose race is already Clone/Android — redundant at best ("secretly a clone" for a Clone), self-contradictory at worst (Industrial Android, which is visibly a machine, getting "passing as biological convincingly"). (3) Tension `aug_rejection_onset` assumes a biological body, but could roll for Android (no biological body to reject an implant). Added a general mechanism rather than one-off patches: secrets.js/tensions.js entries can now carry an optional `excludedBroad: [...]` array; `engine.js` exports a new `excludeByBroad(arr, broad)` helper (falls back to the full array if filtering would empty it) used when picking both tension and secret. Applied `excludedBroad: ["Clone"]` to `is_a_clone`, `excludedBroad: ["Android"]` to `android_passing` and `aug_rejection_onset`.
- Industrial Android (a genderless, equipment-classified machine) still got a normal human characterEntry/appearancePrompt (age, hair, clothing) and normal profession pool (anything from Corporate Executive to Sex Worker), and its raw rolled skeleton's `appearance` fields (hair/distinguishingFeature/statNotes) — sent to the AI as a "canonical fact" and shown directly in the pre-AI Rolled Character Sheet — described human grooming/body details (e.g. "black hair, with a shaved undercut") for a machine that has none of that. Fixed: `engine.js` now exposes `syntheticType` on the skeleton and nulls out hair/distinguishingFeature/statNotes for `syntheticType === 'industrial'` (keeps only the build/bulk descriptor, which still reads fine for a chassis); `sci-fi/voice.js` swaps in a chassis-description template for characterEntry/appearancePrompt instead of the standard age/gender/hair/clothing one; the NSFW-append in index.html now skips industrial androids; and `android_industrial`'s race entry gained `allowedIndustries` (Logistics/Salvage/Settlement/Shipping & transit/Transit/Security) so its profession roll is restricted to physically-plausible work. Verified via real Claude API calls against a forced Industrial Android skeleton — both fields now read as pure chassis description with no age/gender/hair/clothing/celebrity-face.
  - Follow-up: the same bug also showed up on non-mechanical non-humanoid races — e.g. a Locust Alien's Rolled Character Sheet showing "blonde hair, pixie cut" and "well-groomed, easy confidence". Generalized the fix: races.js entries can now set `nonHumanoidBody: true` (added to all the clearly non-humanoid Aliens — slug/locust/reptilian/avian/amoeba/plant/vapor/typical — and both Uplifted races), and `engine.js` nulls hair/distinguishingFeature/statNotes for those too, same as `syntheticType === 'industrial'`. Also generalized `voice.js`'s standard (non-industrial) characterEntry/npcEntries/appearancePrompt hair/skin phrasing to ask for "hair, fur, feathers, or other head/body covering appropriate to their actual species" rather than assuming human hair, so the AI's own free-form prose doesn't reintroduce the problem even for a future race that isn't explicitly flagged. Verified via a real API call against a forced Locust Alien skeleton — the result described "chitinous plating," "compound eyes," and "mandibles," no human hair anywhere.
- Sci-Fi's and Fantasy's appearancePrompt output rules unconditionally asked the text-to-image model to include "face of [a real, well-documented person]" for every character, regardless of species/race. Combined with a non-human-faced race's own description, this has produced actively racist output in practice. Fixed in both genres' `voice.js`: added a `NON_HUMANOID_BROAD` set (Sci-Fi: Android, Uplifted, Hybrid, Mutant, Alien; Fantasy: Orc, Half-Orc, Dragonborn, Tiefling — races whose face is not human-shaped) and the "face of" instruction is skipped entirely for any race in that set. Human-passing races (Human, Cyborg, Clone in Sci-Fi; Elf, Half-Elf, Dwarf, Halfling, Gnome, Aasimar in Fantasy) are unaffected. Verified via direct unit checks that the instruction is present/absent for the correct races in both genres.
- Rearranged the "⚙ AI Generated Scenario" card's field order to Title, Tags, Portrait Prompt, Description, Opening, Plot Essentials, Author's Note (previously Opening was rendered last, after Author's Note). `narrateAll()`'s actual read order was already Title, Description, Opening, Plot Essentials, Author's Note — only the visual DOM order was out of sync with it.
- Manga-Osaka's races.js had 4 `flavor` strings with no em-dash — 'honor_student', 'otaku' (Den Den Town regular), 'popular_crowd' (fashion-forward), and 'ordinary_kid' (average grades) — so the slot-machine sub-label and output header (both truncate at the first `' — '` via `identity.flavor.split(' — ')[0].trim()`) showed the entire sentence instead of a short punchy label. Added a natural em-dash break to each, preserving the full original text/meaning; the other 4 entries in this file and all of Fantasy/Sci-Fi/Paleolithic/Joseon/Nihongi's races.js were already clean.
- web/genre-packs/build-example-pack.py's `staticCards` entries (STATIC_LOCATIONS/STATIC_FACTIONS) were shaped `{keys, type, entry}` instead of the correct `{name, triggers, entry}` that both index.html's `STATIC_CARDS_BY_GENRE` consumer and aidungeon-importer.mjs destructure — the card's title would have come through blank (`name` was missing) and `triggers` would have been `undefined`. Fixed by renaming `keys` → `triggers`, adding `name`, and dropping the per-entry `type` field (it's derived from which STATIC_* array the entry is in, not stored on the entry itself).
- web/genre-packs/build-example-pack.py's `TAG_POOLS.professionTags` was keyed by profession *title* ("Deckhand", "Navigator", …) instead of *industry* ("Ship crew") — engine.js looks this up by `profession.industry`, so none of the keys ever matched and professionTags silently contributed nothing. Fixed by collapsing it to a single `"Ship crew"` key (all five example PROFESSIONS share that industry, matching the built-in genre convention of one industry spanning several professions) with a combined tag list.
- Move the NSFW image prompt slug out of hardcoded source so users can modify it to do whatever they want — added `NSFW_IMAGE_PROMPT_SUFFIX` to `.env`/`.env.example`, baked into `generator/config.js` by `serve.sh` (as `window.__NSFW_SUFFIX`) alongside the existing API keys, read once at startup into a fallback-backed `nsfwSuffix` variable in index.html. Reuses the existing `.env` → `config.js` pipeline instead of adding a second config mechanism (an earlier version of this fix used a standalone `generator/nsfw-suffix.json`, which was replaced).
- De-duplicate the two engine copies — the CLI now uses generator/engine.js (the canonical, bug-fixed engine) instead of the parallel skeleton-builder.js/cast-builder.js/selector.js/roller.js, which are deleted. This also fixed a latent CLI-path bug (its NPC gender roll ignored the LGBQ toggle) and gave both paths stat-adjective labels in the prompt.
- Collapse the two prompt systems — unified the browser's GENRE_VOICE-driven buildPrompt and the CLI/module path's per-genre prompt-template.js onto one shared `buildPrompt(skeleton, voice)` (generator/prompt-builder.js). Each genre now supplies only a voice.js (SYSTEM_PROMPT + outputRules); the scaffold is normalized. Rich per-genre content won; the 7 prompt-template.js files are deleted.
- Create some concrete alien species instead of leaving it to be completely random — added 9 distinct sci-fi alien species (humanoid, slug, locust, reptilian, avian, amoeba, plant, vapor, typical) in place of the old generic humanoid/non-humanoid split.
- Redo all the missing icons in Fantasy
- Add a new script in genre-packs to generate icons using SD or Gemini to read the icon prompts from the new genre-pack data structures.
- FEAT: Uploadable genre packs — a genre is now a pure-JSON pack (or .zip with icons/audio) that can be imported at runtime via Settings → Genre Packs, persisted in IndexedDB, and removed, with zero source edits. Built on a large internal refactor (one shared engine module, one genre-table registry, one manifest for presentation/slots/voice) that de-duplicated ~1000 lines out of index.html. See .claude/docs/features/genre-packs/DESIGN.md.
- BUG: Joseon static cards were missing from Copy-to-Clipboard / Download Package (ui-data.js never imported the genre's static-cards.js). Now wired in.
- BUG: The aidungeon-importer's portrait upload was flaky (sometimes worked, sometimes silently landed on an unrelated stock image). Root cause: the code unconditionally clicked a "SELECT" button after uploading, but that button belongs to a *different* flow (choosing an existing image from the gallery grid) — a fresh upload actually finishes and closes the modal on its own, no confirm click needed. Depending on timing, clicking it could land on a random stock/template image instead of the real upload. Removed the click entirely; now waits for the Content Image element's own src to actually change.
- BUG: Re-running serve.sh never stopped the previous run's background processes (aidungeon-server.mjs, the static file server) — a closed terminal left them running indefinitely. Both now write a PID file on startup that the next run stops first (via `kill` + a `taskkill` fallback, needed since plain `kill` can't reliably signal a PID a different prior process wrote to disk on this Windows setup).
- BUG: The Story Card TYPE selector broke again after a live AI Dungeon UI change (role="combobox" removed entirely from the control) — rewrote `setCardType()` to locate it structurally instead of by ARIA role. Also fixed a separate bug found in the same investigation: the real "Import to AI Dungeon" button never sent `scenario.genre`, so genre lore cards silently never loaded through the actual UI (only through manually-built test packages). Added an opt-in `--debug-screenshots` flag to the importer for diagnosing this class of live-site-drift bug faster next time.
- BUG: AI Dungeon import failures (bad credentials, a changed selector, a Playwright crash) were completely silent — the companion server responded "ok" the instant it spawned the importer, before anything could actually fail. It now holds the HTTP response open until the importer process exits and reports real success/failure/error text back to the button.
- FEAT: Added a "Preferred gender" / "Preferred orientation" option in Settings → Options — pins the protagonist's rolled gender/orientation instead of leaving it fully random, cascading naturally to the generated love-interest NPC. Defaults to "Any (random)", the prior behavior.
- FEAT: Filled out static-cards.js content across genres — Fantasy locations/factions, Sci-Fi and Paleolithic classes/races/locations/factions (previously all empty), five invented student hangout spots for Manga-Osaka, and physical appearance/personality added to every Nihongi character and race entry.
- FEAT: Added genre lore story cards (static-cards.js, currently Fantasy/Sci-Fi/Paleolithic/Manga/Modern/Nihongi) — the AI Dungeon importer now injects these as typed Story Cards (character/class/race/location/faction/custom) alongside NPC cards, and "Copy Full Text To Clipboard (JSON)" / "Download Package" both include them too via a new shared buildScenarioPayload() helper (previously the two had already drifted out of sync — download had `genre`, copy didn't).
- FEAT: Status bar now shows a mini media player (prev/stop/next + track title) in place of the disclaimer while the generation-phase BGM plays, reverting to the disclaimer once the scenario (and any portraits) finish generating. Prev/next cycle through the current genre's BGM pool.
- BUG: Minor protagonists could roll a marriage-derived relationship status (married/separated/divorced/widowed) in every genre. Now withheld for characters under 18, except Paleolithic (opt-in via ALLOW_MINOR_MARRIAGE), where early marriage age fits the genre's tone.
- BUG: On wide desktop screens, the slot machine reels always wrapped into a ~6-per-row grid regardless of available width, because they inherited the page's 900px reading-column max-width. The slot machine now breaks out of that column on screens ≥1000px wide, spreading reels across the full viewport instead.
- BUG: Slot machine's Sentiment reel showed a gear-placeholder icon for most rolls in Nihongi/Joseon Dynasty — its catalog was a stale hardcoded 9-entry list disconnected from the real 79-entry SENTIMENTS data. Also fixed two profession entries referencing sentiment ids that never existed.
- FEAT: Expanded every genre's name pools (Fantasy, Sci-Fi, Paleolithic, Modern, Manga, Joseon Dynasty, Nihongi) so each masc/fem/last array has at least 50 unique entries per identity/social-class group.
- FEAT: In the slot machine reels, the Personality reel label now shows "{MBTI_TYPES.type} - {MBTI_TYPES.label}" instead of just the type.
- BUG: Missing slot machine reel icons — Paleolithic's Tribe reel and Manga's Archetype reel 404'd on every roll. Turned out to be a category-name mismatch in getSlotConfig() (not missing art) — the real hand-crafted icons already existed on disk under different filenames than the code was looking for.
- BUG: The Generate Scenario button should be disabled if the text provider selector has chosen None.
- FEAT: Inject current git version from serve.sh so we can show the current version in the Settings modal.
- BUG: All PLOT_ARCHETYPES icons lived in the common icons folder, even genre-specific archetypes — organized by genre.
- BUG: Fix the genre card layout — genre card was too wide on PC and images were cropped instead of shown in full (they're square).
- BUG: NPC's sometimes get "non-binary" despite LGBQ option isn't enabled.
- BUG: The NPC Character Story Cards, add their relationship to the protagonist in the npc-entry-meta
- BUG: On mobile browsers, Settings -> Narration tab is too tall and gets clipped by the status bar. The Settings modal should have fixed height and scroll vertically if necessary to show tall tabs.
- FEAT: Update help with narration settings
- BUG: Change the tone of the Paleolithic genre in Authors Notes - It should be more sitcom/comedy of errors mixed with dark humor that you'll likely be eaten by a predator.  Also make it 100000 BC, more Neanderthal period, less language, more wild, anything goes.
- BUG: Change the tone of the Joseon genre in Authors Notes - It should be more about palace intrigue.
- BUG: Remove secondary Spin The Reels button
- BUG: For genders, change "man" to "male" and "woman" to "female"
- BUG: Stop Narrate All button looks bad
- FEAT: Add an option to auto play Narrate All
- FEAT: Add an option to auto generate NPC portraits.
- BUG: Remove token stats completely from the status bar
- BUG: Redo the UI title bar and selectors.  It occupies too much vertical space.  Selectors should move to a single line toolbar.
- FEAT: Add more music, and make it specific to the genre selected.
- FEAT: Make genre selector a carousel, and each Genre should get a thumbnail and brief description like "Nihongi - Japanese horror"
- Stat adjectives need some work so AI understand them better (e.g. use "average intelligence" instead of just "average").
- Synthetic constructs need special handling:
    - Industrial Androids should have no gender, orientation, relationship, or family background.
    - Plastic Androids and Combat Androids may have a gender for appearances, but are asexual and do not have relationships.
    - Biomechanical Androids should have gender, orientation and relationship.
- In the Narration Settings, the Voice pick list seems static.  It should query the TTS provider for its installed voices.
- The aidungeon-importer needs to import the skeleton.tags after setting the title.  Each tag must be entered one at a time after pressing the "+" button.  The input field has placeholder="dragons, magic, etc."  The Add button: locator('[role="button"]:has-text("+"))
- If I click Narrate All button, it plays the sections out in wrong order. It should be title, description, opening, plot essentials, authors note, then characters.
- If I click Narrate All button, it only narrates the first text blob.  It should read out everything, including the section titles (e.g. character names).  If possible, it is desirable to make multiple TTS calls since it takes a long time to generate.
- Clicking on Spin The Reels should abort any music or sound effect currently playing.
- When generating NPC's, do NOT allow two characters with the same first name.  It just makes game play easier.
- The Copy To Clipboard builder needs to also add the Plot Essentials and Author's Notes sections.
- In the skeleton builder, add the NSFW attribute.
- In the aidungeon-importer, don't upload the portrait if the NSFW flag is set in the scenario.json.
- The Genre pick list style is hard to read.
- The font sizes are inconsistent.  Except for the title bar, make all fonts at least 0.8rem.
- BUG: The status bar says "* Narrative" and then "Your fate is sealed. Edit and copy as needed."  But there should be a step in between - "* Portrait".
