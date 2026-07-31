// telemetry.js
// Anonymous usage reporting: one fire-and-forget POST per completed scenario
// generation. The server (a Cloudflare Worker + D1, see telemetry/ at the repo
// root) records only country, genre, and which text/image/narration provider
// was used — no IPs, no ids, no timestamps finer than the day.
//
// A pure leaf module: it imports nothing from the app and reads no app state.
// Callers pass the values in, which keeps the "what do we send" decision — in
// particular never leaking a genre pack's own id — visible at the call site in
// app.js rather than buried here.

const ENDPOINT = "https://vend-of-fate-telemetry.jgieske.workers.dev/event";
const STORAGE_KEY = "gof_telemetry";

/** Opt-out: on unless the user has explicitly turned it off in Settings. */
export function isTelemetryEnabled() {
  return localStorage.getItem(STORAGE_KEY) !== "false";
}

export function setTelemetryEnabled(enabled) {
  localStorage.setItem(STORAGE_KEY, enabled ? "true" : "false");
}

/**
 * Reports one completed generation. Never throws, never awaits into the caller,
 * never blocks the UI — telemetry must not be able to break a generation that
 * already succeeded.
 *
 * Deliberately NOT suppressed on localhost: serve.sh means nearly every real
 * user runs this from localhost, so skipping it would discard almost all data.
 * Automated browsers are skipped instead (see below).
 */
export function reportGeneration({
  genre,
  textProvider,
  imageProvider,
  ttsProvider,
}) {
  if (!isTelemetryEnabled()) return;

  // Playwright and friends set navigator.webdriver. The e2e suite's --full tier
  // runs a real generation, which would otherwise post a real event on every
  // test run and quietly skew the stats.
  if (navigator.webdriver) return;

  try {
    fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        genre,
        textProvider: textProvider ?? "none",
        imageProvider: imageProvider ?? "none",
        ttsProvider: ttsProvider ?? "off",
      }),
      keepalive: true, // still sent if the tab is closed right after generating
    }).catch(() => {});
  } catch {
    // Malformed URL, blocked by an extension, offline — all non-events here.
  }
}
