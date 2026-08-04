// music-files.mjs
// Keeps web/audio/music/ and the manifests' music.tracks lists in agreement,
// in both directions:
//
//   missing  — a manifest track with no file on disk. This one is invisible at
//              runtime: audio.js resolves a track to `audio/music/<name>` and
//              hands it to an <audio> element, so a bad name is a silent 404
//              and a dead BGM slot that only shows up if that track happens to
//              be the one picked for a spin.
//   orphan   — an .mp3 on disk that no manifest lists. Not a runtime fault, but
//              it means music was added and never wired up, which is exactly
//              the state this file was written in response to: four fantasy and
//              six manga tracks sat in the folder unreferenced.
//
// Both are failures. Dropping a file in the folder is only half of adding a
// track, and the half that's easy to forget is the half with no symptom.
//
// Pure Node: no browser, no dev server, no decoding — existence and naming
// only. Nothing here verifies a file is playable audio.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { GENRE_MANIFESTS } from "../../generator/manifests.js";
import { printReport } from "./helpers.mjs";

const WEB_DIR = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
  "..",
);
const MUSIC_DIR = path.join(WEB_DIR, "audio", "music");

export function run() {
  const results = [];

  const onDisk = new Set(
    fs
      .readdirSync(MUSIC_DIR)
      .filter((name) => name.toLowerCase().endsWith(".mp3")),
  );

  const listed = new Map(); // filename -> genre ids referencing it
  for (const manifest of Object.values(GENRE_MANIFESTS)) {
    for (const track of manifest.music.tracks) {
      if (!listed.has(track)) listed.set(track, []);
      listed.get(track).push(manifest.id);
    }
  }

  for (const [track, genres] of listed) {
    if (!onDisk.has(track)) {
      results.push({
        pass: false,
        detail: `MISSING (${genres.join(", ")}): audio/music/${track}`,
      });
    }
  }

  for (const file of onDisk) {
    if (!listed.has(file)) {
      results.push({
        pass: false,
        detail: `ORPHAN (on disk, in no manifest): audio/music/${file}`,
      });
    }
  }

  // A genre whose prefix doesn't match its own filenames still plays, since
  // tracks are looked up by the list rather than by globbing the prefix — but
  // it breaks the naming convention the folder is sorted and read by.
  for (const manifest of Object.values(GENRE_MANIFESTS)) {
    const wrong = manifest.music.tracks.filter(
      (track) => !track.startsWith(`${manifest.music.prefix}-`),
    );
    for (const track of wrong) {
      results.push({
        pass: false,
        detail: `PREFIX (${manifest.id}): "${track}" does not start with "${manifest.music.prefix}-"`,
      });
    }
  }

  results.push({
    pass: true,
    detail: `checked ${listed.size} tracks across ${Object.keys(GENRE_MANIFESTS).length} genres against ${onDisk.size} files on disk`,
  });

  return printReport("music-files", results);
}
