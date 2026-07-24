// pack-assets.js
// The uploaded-genre-pack asset layer: the per-genre blob-URL maps for a pack's
// bundled icons/audio, the install/release helpers that build and revoke those
// blob: URLs, and the resolvers that turn a (genre, category, slug) into either
// a pack blob URL or the conventional served path. Also holds the portrait-style
// map derived from the manifests. A pure leaf module — it imports only
// GENRE_MANIFESTS and is imported by app.js (registration, carousel, slot,
// portrait) and audio.js (track resolution), with no import back, so there is no
// circular dependency here. Frontend module (web/, not web/generator/).

import { GENRE_MANIFESTS } from "./generator/manifests.js";

// Per-genre asset base override, keyed by genre id. Empty/null for built-ins
// (they use the conventional ./generator/genres/<id>/ path); set to a blob:
// base for uploaded packs. Populated by registerGenrePack().
export const PACK_ASSET_BASE = {};

// Uploaded-pack assets resolve to blob: URLs (built-ins resolve to real files).
// PACK_ICON_URLS[id] maps a logical icon filename ("CAT#slug.webp" or
// "_genre.webp") → blob URL; PACK_AUDIO_URLS[id] maps a track filename → blob URL.
export const PACK_ICON_URLS = {};
export const PACK_AUDIO_URLS = {};

// Build blob: URLs from a pack's extracted asset Blobs (keyed "icons/…"/"audio/…").
// Returns a truthy marker when the pack ships its own assets. No-op for JSON packs.
export async function installPackAssets(id, assets) {
  if (!assets || !Object.keys(assets).length) return null;
  const icons = {},
    audio = {};
  for (const [path, blob] of Object.entries(assets)) {
    const url = URL.createObjectURL(blob);
    if (/^icons\//i.test(path)) icons[path.replace(/^icons\//i, "")] = url;
    else if (/^audio\//i.test(path)) audio[path.replace(/^audio\//i, "")] = url;
  }
  PACK_ICON_URLS[id] = icons;
  PACK_AUDIO_URLS[id] = audio;
  return "blob";
}

// Revoke a pack's blob: URLs so they don't leak when it's removed.
export function releasePackAssets(id) {
  for (const map of [PACK_ICON_URLS[id], PACK_AUDIO_URLS[id]])
    if (map) for (const url of Object.values(map)) URL.revokeObjectURL(url);
  delete PACK_ICON_URLS[id];
  delete PACK_AUDIO_URLS[id];
}

// Resolve a slot/portrait icon to a pack blob: URL if the active genre is an
// uploaded pack that ships that icon; otherwise return null (use the file path).
export function packIconUrl(genre, cat, slug) {
  return PACK_ICON_URLS[genre]?.[`${cat}#${slug}.webp`] ?? null;
}

// Presentation metadata now lives in ./generator/manifests.js. These maps are
// derived from it so all existing consumers keep working unchanged.
export const GENRE_PORTRAIT_STYLES = Object.fromEntries(
  Object.values(GENRE_MANIFESTS).map((m) => [m.id, m.portraitStyle]),
);

// Served folder a genre's icons resolve from — a pack may override it (reskin
// packs reusing a built-in's art); built-ins use their own conventional folder.
export function genreIconBase(id) {
  return GENRE_MANIFESTS[id]?.iconBase ?? `generator/genres/${id}/icons/`;
}
