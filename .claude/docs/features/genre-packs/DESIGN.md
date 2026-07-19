# feat: Uploadable Genre Packs

Goal: let a user add a brand-new playable genre to FateVend at runtime by
importing a self-contained **genre pack** — no source edits, no rebuild. Packs
are pure data (no executable code), so they're safe to share.

## Background: how a genre is described

After the Stage A/B refactor, a genre is almost entirely **data**, split across:

- `web/generator/registry.js` — `GENRE_TABLES[id]`: the generation tables
  (races, professions, life-events, family structures, tensions, secrets,
  economic tiers, city settings, tag pools, name pools, plot archetypes, plus
  shared genders/orientations/builds/hair/relationship-statuses).
- `web/generator/manifests.js` — `GENRE_MANIFESTS[id]` (label, description,
  portrait style, TTS config, music, and the slot-machine `slots` descriptor)
  and `GENRE_VOICE[id]` (the per-genre prompt voice + system prompt).
- `web/generator/ui-data.js` — `STATIC_CARDS_BY_GENRE[id]` (AI Dungeon story cards).

A genre pack simply carries all of this as one JSON document.

## Pack format

A pack is either a **single `manifest.json`** (data inline) or a **`.zip`**
containing `manifest.json` plus optional `icons/` and `audio/` asset folders:

```
my-genre.zip
  manifest.json
  icons/
    _genre.webp                 ← carousel cover
    RACE#elf.webp               ← CATEGORY#slug.webp (categories from slots.*)
    PROFESSION#alchemist.webp
    …
  audio/
    my-genre-theme.mp3          ← filenames must match manifest.music.tracks
```

### `manifest.json` shape

```jsonc
{
  "id": "my-genre",              // lowercase, digits, hyphens; must not collide with a built-in
  "label": "My Genre",
  "description": "One-line pitch shown on the carousel card.",
  "portraitStyle": "comma-separated text-to-image style tags",
  "iconBase": "generator/genres/sci-fi/icons/",  // optional: reuse another served
                                 // folder's icons instead of shipping your own (see below)
  "tts": { "preprocess": "default",   // "default" | "manga" | "nihongi"
           "browser": { "rate": 1.0, "pitch": 1.0 },
           "kokoro":  { "voice": "af_bella", "speed": 1.0 },
           "openai":  { "voice": "nova", "speed": 1.0 } },
  "music": { "prefix": "mygenre", "tracks": ["mygenre-theme.mp3"] },
  "slots": {                     // slot-machine reel config (icon categories = file prefixes)
    "identityCat": "RACE", "identityHeader": "Species",
    "profCat": "PROFESSION", "profHeader": "Profession",
    "econCat": "ECONOMIC_TIER", "econHeader": "Economy",
    "cityCat": "CITY_SETTING", "cityHeader": "Setting",
    "familyCat": "FAMILY", "lifeEventCat": "LIFE_EVENT", "tensionCat": "TENSION",
    "filterGendersToGenre": false, "familyUsesIconSlug": false,
    "economicTiers": [["tier1","destitute","Destitute"], /* …5 rows */ ]
  },
  "voice": {                     // the only user text the LLM sees — importer surfaces it
    "identityLabel": "Race", "genreLabel": "my genre",
    "openingNote": "…", "appearanceNote": "…", "systemPrompt": "…"
  },
  "gameplay": {                  // all optional
    "ageRange": [15, 18],
    "allowMinorMarriage": false,
    "relationshipStatusFilter": ["single", "dating", "complicated"]
  },
  "data": {
    "races": [ /* or "identities" */ ], "professions": [], "lifeEvents": [],
    "familyStructures": [], "parentStatuses": [], "siblingDynamics": [],
    "tensions": [], "secrets": [], "economicTiers": { "1": {…}, …, "5": {…} },
    "citySettings": [], "tagPools": {}, "namePools": {}, "plotArchetypes": [],
    "distinguishingFeatures": [], "quirks": [],
    "genders": [], "orientations": [], "builds": [], "hair": []   // optional; default to common
  },
  "staticCards": {               // optional AI Dungeon story cards
    "STATIC_CHARACTERS": [], "STATIC_CLASSES": [], "STATIC_RACES": [],
    "STATIC_LOCATIONS": [], "STATIC_FACTIONS": [], "STATIC_CUSTOM": []
  }
}
```

`data.plotArchetypes` holds only the genre-specific archetypes — the loader
prepends the shared `COMMON_PLOT_ARCHETYPES`. `genders`/`orientations`/`builds`/
`hair` may be omitted to inherit the common tables.

### `data.*` table entry shapes

Every table's entries follow the same shape the built-in genre `.js` files use
(`web/generator/genres/<genre>/*.js`) — this is the canonical reference; the
list below is a quick summary, not a substitute for reading one of those files.
`iconPrompt`/`iconPath` are optional everywhere — a pack with no bundled icons
(and no `iconBase` reskin) just shows the ⚙ gear placeholder for that entry.

- **`races`** (or `identities`): `{ id, broad, flavor, weight, iconPrompt?, iconPath? }`.
  `broad` is the name-pool lookup key. `weight` is a flat rarity dial — races
  carry no `statAffinity` anywhere in the app (identity isn't correlated with
  capability). `flavor` is shown in full in the AI prompt, but truncated in the
  UI at the first `' — '` (the slot-machine sub-label and the output header
  both do `flavor.split(' — ')[0].trim()`) — put the short, punchy part first,
  or a long `flavor` with no em-dash displays in full.
- **`professions`**: `{ title, industry, economicTier, statAffinity?, sentiments, iconPrompt?, iconPath? }`.
  `economicTier` is 1-5. `industry` must match the keys used in
  `tagPools.professionTags` (see below) — a common mistake is keying
  `professionTags` by `title` instead, which silently matches nothing.
- **`lifeEvents`**: `{ id, description, toneTag, statAffinity?, economicHint?, iconPrompt?, iconPath? }`.
- **`tensions`**: `{ id, description, toneTag, statAffinity?, criminalFlag, iconPrompt?, iconPath? }`.
  `criminalFlag: true` adds `tagPools.criminal` to the scenario's tags.
- **`secrets`**: `{ id, description, toneTag, severity, statAffinity?, criminalFlag }`.
  `severity` is `low | medium | high | explosive`. No icon fields — secrets
  have no slot-machine reel.
- **`familyStructures`**: `{ id, label, parentCount, siblingCount, parentGender?, toneTag, statAffinity?, economicHint?, notes?, iconPrompt?, iconPath? }`.
  `parentCount` (0/1/2) determines which parent slots get filled; `siblingCount`
  is `[min, max]`, resolved per character.
- **`parentStatuses`** / **`siblingDynamics`**: `{ id, label, toneTag }`. Consumed
  only by the cast builder to flavor a rolled parent's/sibling's status text —
  no slot-machine reel, no icon fields.
- **`citySettings`**: `{ id, label, flavor, toneTag, statAffinity?, iconPrompt?, iconPath? }`.
- **`economicTiers`**: an object keyed `"1"`-`"5"` **as strings**, not a list —
  `{ label, descriptors, housing, transport, iconPrompt?, iconPath? }` per tier.
- **`plotArchetypes`**: `{ id, label, weight, description, iconPrompt?, iconPath? }`.
  `description` is interpolated into the "plotEssentials" AI prompt instruction
  as the primary story engine.
- **`distinguishingFeatures`**: `{ id, label }`. `label: null` is the "no
  feature" entry some built-ins include for padding — but it's not required:
  the engine already rolls no-feature ~25% of the time regardless.
- **`quirks`**: `{ id, quirk, statAffinity? }`.
- **`tagPools`**: `{ always: [...], <toneTag>: [...], criminal: [...], professionTags: { <industry>: [...] } }`.
  One `<toneTag>` array per toneTag value actually used by any `citySettings`
  or `tensions` entry — the lookup is dynamic (`tagPools[city.toneTag]`), not a
  fixed enum. `professionTags` **must** be keyed by `professions[].industry`,
  not by `title`.
- **`namePools`**: keyed by each table's `broad` value, plus a required
  `"default"` fallback. Each pool: `{ masc, fem, neutral, last }` — first-name
  arrays by gender plus a shared last-name array.
- **`staticCards`** (top-level, sibling of `data`, not inside it): optional,
  keyed `STATIC_CHARACTERS` / `STATIC_CLASSES` / `STATIC_RACES` /
  `STATIC_LOCATIONS` / `STATIC_FACTIONS` / `STATIC_CUSTOM`. Each entry:
  `{ name, triggers, entry }` — `name` is the card title, `triggers` a
  comma-separated keyword string AI Dungeon matches against, `entry` the lore
  text. (`aidungeon-importer.mjs` destructures exactly these three field names
  plus a `type` it derives itself from which array the entry came from — don't
  add a `type` field per entry, and don't rename `triggers` to `keys`.)

## Implementation

- **`web/generator/pack-loader.js`** — `validatePack(pack)` (structural checks →
  error list) and `loadPack(pack)` → `{ id, tables, manifest, voice, staticCards }`
  in the exact shapes the registries use. Pure data in, pure data out; it imports
  its own common defaults. Proven **lossless** by a round-trip test (serialize a
  built-in genre → JSON → `loadPack` → byte-identical tables/manifest/voice/cards).

- **`registerGenrePack(pack, { assetBase })`** (in `index.html`) — calls
  `loadPack`, then merges the result into every live registry (`GENRE_TABLES`,
  `GENRE_MANIFESTS`, `GENRE_VOICE`, `STATIC_CARDS_BY_GENRE`) and the precomputed
  presentation maps (`GENRE_PORTRAIT_STYLES`, `GENRE_TTS_CONFIG`,
  `GENRE_MUSIC_PREFIX`/`TRACKS`), pushes a carousel card, and re-renders. A
  registered pack is indistinguishable from a built-in for generation, the
  carousel, portraits, TTS, music, the slot machine, and the prompt.
  `unregisterGenrePack(id)` reverses it (built-ins are protected).

- **Persistence** — installed packs live in IndexedDB (`fatevend` / `genrePacks`,
  keyed by id). `loadStoredGenrePacks()` re-registers them on every page load;
  `removeInstalledPack(id)` deletes + unregisters.

- **Import UI** — Settings → Options → "Genre Packs": a file input
  (`installGenrePackFromFile`) accepts `.json` or `.zip`. `parseGenrePackFile`
  reads the manifest and, for zips, extracts `icons/`+`audio/` entries to Blobs.
  Installed packs are listed with Remove buttons.

- **Assets (blob URLs)** — a zip pack's icons/audio become `blob:` URLs
  (`PACK_ICON_URLS` / `PACK_AUDIO_URLS`, built by `installPackAssets`). Icon
  lookups (slot reels via `packIconUrl`, the carousel cover) and BGM (`trackSrc`)
  resolve to the pack's blob URL when the active genre is an uploaded pack, and
  fall back to the conventional served path (`./generator/genres/<id>/…`,
  `audio/music/…`) for built-ins. Blobs are revoked on removal. A JSON-only pack
  (no assets) simply shows the gear placeholder for any missing icon — exactly
  like a built-in genre with an ungenerated icon.

- **`iconBase` (reskin packs)** — a JSON-only pack that has no bundled `icons/`
  can still show real art by declaring `iconBase`: a served folder its
  genre-specific icons resolve from. `getSlotConfig()` uses it as the icon base
  (in place of the default `./generator/genres/<pack-id>/icons/`) and the carousel
  cover reads it for `_genre.webp`. This lets a lightweight "reskin" pack reuse a
  built-in genre's icons when it keeps that genre's category/slug names — e.g.
  `sample-neon-drift.json` sets `"iconBase": "generator/genres/sci-fi/icons/"` and
  renders Sci-Fi's art. A zipped pack's own blob icons still take priority
  (`packIconUrl` is checked first); `iconBase` only affects the served-path
  fallback. Built-ins omit it and are unaffected.

## Security

Packs carry **no executable code** — only JSON data + image/audio assets. There
is no `eval` and no dynamic `import()` of pack code, so importing an untrusted
pack cannot run arbitrary JavaScript. The one piece of user-authored text that
reaches the LLM is `voice.systemPrompt` / the voice notes; the importer surfaces
these for review. (Prompt-injection via a genre's own voice is inherent to any
user-authored genre and acceptable for an opt-in import.)

## Authoring a pack

The fastest way to build one is to start from a built-in genre: serialize its
`GENRE_TABLES` / `GENRE_MANIFESTS` / `GENRE_VOICE` / `STATIC_CARDS_BY_GENRE`
entries into the `manifest.json` shape above (the round-trip test in the
`pack-loader` work shows the exact inverse mapping), change the `id`/`label`/
`description`/voice, swap in your own data and `icons/`+`audio/`, and zip it.

Two worked examples ship in `web/genre-packs/`:
- **`sample-neon-drift.json`** — a JSON-only pack (derived from Sci-Fi) that
  reuses Sci-Fi's served art via `iconBase`; the lightweight "reskin" case.
- **`example-pirate-cove.zip`** — a self-contained `.zip` (bundled `icons/` +
  `audio/`) that exercises the blob-URL asset path end to end. It's produced by
  `build-example-pack.py`, which also shows the inverse mapping from plain data
  to the pack format and generates simple placeholder icons; re-run it to rebuild
  the zip. (A real pack would run the icon pipeline for finished art instead of
  the placeholders.) Its data tables carry full shape-header comments per
  `CLAUDE.md`'s data-table rule. (Two earlier versions of this pack each had an
  intentional bug left in place as a cautionary example — `tagPools.professionTags`
  keyed by profession `title` instead of `industry`, and `staticCards` entries
  shaped `{ keys, type, entry }` instead of `{ name, triggers, entry }` — both
  have since been corrected.)

## Note on the icon pipeline

Built-in genres keep their `.js` data modules, so the existing
`common/icons/generate_icons_core.py` (which regex-scrapes `iconPrompt`/
`iconPath` pairs from the genre `.js` files) is unchanged. A pack author who
wants generated icons runs that pipeline against their own source before zipping;
the app itself only consumes the finished `.webp` files a pack ships.

## Verification

Every increment was verified in a real browser (Playwright) against the running
dev server:
- Round-trip losslessness across 4 built-in genres (unit test).
- Runtime registration: sample pack fetched + registered → appears in carousel,
  rolls a character, slot machine renders 13 reels, zero JS errors.
- Import + persistence: imported via the file input, appeared in carousel +
  installed-packs list, **survived a page reload** (IndexedDB), rolled after
  reload, Remove cleared it and it stayed gone after another reload.
- Blob assets: a `.zip` pack's carousel cover resolved to a `blob:` URL.
