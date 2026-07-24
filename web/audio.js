// audio.js
// All sound for the app: the generation-phase background-music player (track
// selection, prev/next/stop/play, the status-bar player widget) and the one-off
// sound effects (bell, slot-machine pull/reel-stop), plus the shared fade-out
// helper. Owns every Audio element and the music-manifest lookup maps. Reads the
// shared app state for the current genre and app.js's PACK_AUDIO_URLS to resolve
// an uploaded pack's bundled tracks. Frontend module (lives in web/, not
// web/generator/, which is backend/CLI-shared code only).
//
// PACK_AUDIO_URLS comes from the pack-assets leaf module (bundled-track blob
// URLs for uploaded packs); app.js imports this module's players/SFX. No
// circular dependency.

import { state } from "./state.js";
import { GENRE_MANIFESTS } from "./generator/manifests.js";
import { PACK_AUDIO_URLS } from "./pack-assets.js";

// Music prefix (by genre id) and tracks (by prefix) derived from the manifests.
export const GENRE_MUSIC_PREFIX = Object.fromEntries(
  Object.values(GENRE_MANIFESTS).map((m) => [m.id, m.music.prefix]),
);
export const GENRE_MUSIC_TRACKS = Object.fromEntries(
  Object.values(GENRE_MANIFESTS).map((m) => [m.music.prefix, m.music.tracks]),
);

export let _lastMusicTrack = null;
let _playerTrackIndex = -1;
function currentGenreTracks() {
  const prefix = GENRE_MUSIC_PREFIX[state.currentGenre] || "fantasy";
  return GENRE_MUSIC_TRACKS[prefix] || GENRE_MUSIC_TRACKS.fantasy;
}
// Resolve a BGM filename to a pack blob: URL (uploaded pack) or the served path.
function trackSrc(file) {
  return (
    PACK_AUDIO_URLS[state.currentGenre]?.[file] ??
    `audio/music/${encodeURIComponent(file)}`
  );
}
export function pickGenreTrack(genre) {
  const tracks = currentGenreTracks();
  let choice = tracks[Math.floor(Math.random() * tracks.length)];
  if (tracks.length > 1 && choice === _lastMusicTrack) {
    choice = tracks[(tracks.indexOf(choice) + 1) % tracks.length];
  }
  _lastMusicTrack = choice;
  _playerTrackIndex = tracks.indexOf(choice);
  return trackSrc(choice);
}

// Human-readable track title from a filename like "joseon-A Red Letter Under the Moonlight.mp3"
function trackTitleFromFilename(filename) {
  return filename
    .replace(/\.mp3$/i, "")
    .replace(/^[a-z0-9]+-/i, "")
    .replace(/_/g, " ");
}

function updatePlayerTitle(filename) {
  const el = document.getElementById("player-track-title");
  if (el) el.textContent = trackTitleFromFilename(filename);
}

// Shown while the generation-phase BGM plays; swaps places with the disclaimer.
export function showPlayer(filename) {
  updatePlayerTitle(filename);
  document.getElementById("statusbar-player").hidden = false;
  document.getElementById("statusbar-disclaimer").hidden = true;
}
export function hidePlayer() {
  document.getElementById("statusbar-player").hidden = true;
  document.getElementById("statusbar-disclaimer").hidden = false;
}

function playerLoadIndex(idx) {
  const tracks = currentGenreTracks();
  if (!tracks.length) return;
  _playerTrackIndex = ((idx % tracks.length) + tracks.length) % tracks.length;
  const file = tracks[_playerTrackIndex];
  _lastMusicTrack = file;
  _musicSfx.src = trackSrc(file);
  _musicSfx.currentTime = 0;
  _musicSfx.volume = 1;
  _musicSfx.play().catch(() => {});
  updatePlayerTitle(file);
}
export function playerPrev() {
  playerLoadIndex(_playerTrackIndex - 1);
}
export function playerNext() {
  playerLoadIndex(_playerTrackIndex + 1);
}
export function playerStop() {
  _musicSfx.pause();
}
export function playerPlay() {
  _musicSfx.play().catch(() => {});
}

export const _bellSfx = new Audio("audio/fx/u_omspjqprot-bell-222490.mp3");
export const _musicSfx = new Audio();
_musicSfx.preload = "none";
export const _slotMachinePullSfx = new Audio("audio/fx/slotmachine-pull.mp3");
export const _slotMachineReelStopSfx = new Audio(
  "audio/fx/slotmachine-reelstop.mp3",
);

export function fadeOutAudio(audio, duration = 5000) {
  if (audio.paused) return Promise.resolve();
  const steps = 40;
  const decrement = audio.volume / steps;
  return new Promise((resolve) => {
    const timer = setInterval(() => {
      if (audio.volume > decrement) {
        audio.volume -= decrement;
      } else {
        audio.volume = 0;
        audio.pause();
        audio.currentTime = 0;
        audio.volume = 1;
        clearInterval(timer);
        resolve();
      }
    }, duration / steps);
  });
}
