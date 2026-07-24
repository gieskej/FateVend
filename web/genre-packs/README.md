# Genre packs

A **genre pack** adds a brand-new playable genre to FateVend at runtime — no
source edits, no rebuild. Import one via Settings → Genre → Import a genre
pack. Packs carry no executable code (JSON + image/audio assets only), so
importing one is safe even from an untrusted source.

**Full format spec:** [`.claude/docs/features/genre-packs/DESIGN.md`](../../.claude/docs/features/genre-packs/DESIGN.md) —
the `manifest.json` shape, every `data.*` table's entry shape (races,
professions, tensions, etc.), the asset-loading paths, and how a pack gets
registered into the running app. Start there before authoring a pack.

## What's in this folder

- **`sample-neon-drift.json`** — a JSON-only pack (a "reskin" of Sci-Fi that
  reuses Sci-Fi's served icons via `iconBase` instead of shipping its own art).
  The lightest-weight example. It's a snapshot of Sci-Fi's data (with Neon
  Drift's own identity wrapper), so it must be re-snapshotted when Sci-Fi's data
  changes — otherwise it references species/sentiments that no longer exist.
- **`build-neon-drift-pack.mjs`** — the reproducible source for the pack above.
  Re-run it (`node web/genre-packs/build-neon-drift-pack.mjs`) after changing the
  Sci-Fi genre to refresh `sample-neon-drift.json` from current Sci-Fi data while
  preserving the Neon Drift identity (id/label/voice/portraitStyle/iconBase/tts/
  music). It's the inverse of `pack-loader.js`'s `loadPack()`.
- **`example-pirate-cove.zip`** — a self-contained `.zip` bundling its own
  `icons/` + `audio/`, built by `build-example-pack.py`. Exercises the
  blob-URL asset path end to end.
- **`build-example-pack.py`** — the reproducible source for the zip above.
  Re-run it (`python3 web/genre-packs/build-example-pack.py`) after editing it
  to rebuild the zip. Its data tables are fully shape-documented per
  `CLAUDE.md`'s data-table rule — see DESIGN.md's "Authoring a pack" section
  before copying from it.
- **`generate-icons.py`** — generates real icons (via Stable Diffusion or
  Gemini) for a pack's `iconPrompt`/`iconPath` pairs, modeled on the built-in
  genres' icon pipeline. Never overwrites an existing icon.
- **`index.json`** — a small manifest (label/description/filename per pack)
  that drives the "Download a pack" list in Settings → Genre, so a mobile user
  on a non-localhost deployment has a way to grab a pack file before importing
  it. Add an entry here when you add a new sample pack to this folder.
