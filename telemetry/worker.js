/**
 * Vend of Fate — anonymous telemetry server (Cloudflare Worker + D1)
 *
 * POST /event   body: { "genre": "fantasy", "textProvider": "gemini",
 *                       "imageProvider": "sd", "ttsProvider": "off" }
 *               Country is derived server-side from the CF-IPCountry header.
 *               The client never sends it and the IP is never stored.
 *
 * GET  /stats   Aggregated counts by country, genre, and each provider slot.
 *               Protect or remove this in production if you want stats private.
 *
 * GET  /series  The same facts with the day kept, already grouped.
 *               ?since=YYYY-MM-DD limits how far back to read.
 *               Feeds dashboard.html, which does its own daily/weekly/monthly
 *               bucketing. Protect it alongside /stats if you make stats private.
 */

// ---- Allowlists: reject anything else so the DB can't be polluted ----
//
// These MUST stay in step with the app. Their sources of truth are:
//   genres          web/generator/registry.js  (SUPPORTED_GENRES)
//   text providers  #toolbar-text-provider   in web/index.html
//   image providers #toolbar-image-provider  in web/index.html
//   tts providers   #toolbar-narration       in web/index.html
// Adding a built-in genre or provider to the app means adding it here too,
// or those events start coming back 400.

const GENRES = new Set([
  "modern",
  "fantasy",
  "sci-fi",
  "manga-osaka-highschool1987",
  "paleolithic",
  "historical-korea-joseon-dynasty",
  "nihongi",
  // Imported genre packs report the literal string "pack" rather than their
  // own id: pack ids are author-supplied free text, so allowlisting them is
  // impossible and storing them would put arbitrary strings from strangers
  // into the database. This still answers "are packs being used at all".
  "pack",
]);

// "none"/"off" are first-class values, not absences — a generation with no
// portrait is a fact worth counting, not a gap in the data.
const TEXT_PROVIDERS = new Set(["none", "claude", "gemini", "ollama"]);
const IMAGE_PROVIDERS = new Set(["none", "sd", "stability"]);
const TTS_PROVIDERS = new Set(["off", "browser", "kokoro", "openai"]);

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*", // tighten to your app's origin if it has one
  "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

function json(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", ...CORS_HEADERS },
  });
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: CORS_HEADERS });
    }

    if (request.method === "POST" && url.pathname === "/event") {
      return handleEvent(request, env);
    }

    if (request.method === "GET" && url.pathname === "/stats") {
      return handleStats(env);
    }

    if (request.method === "GET" && url.pathname === "/series") {
      return handleSeries(url, env);
    }

    return json({ error: "not found" }, 404);
  },
};

// Normalizes one provider field. A missing/null field is treated as the
// slot's "not used" value, so a client that only cares about text can post
// just the genre and text provider; an unrecognized value is still rejected
// so typos never silently record as "none".
function readProvider(raw, allowed, unused) {
  if (raw == null || raw === "") return unused;
  const v = String(raw).toLowerCase().trim();
  return allowed.has(v) ? v : null;
}

async function handleEvent(request, env) {
  let body;
  try {
    body = await request.json();
  } catch {
    return json({ error: "invalid JSON" }, 400);
  }

  // ---- Validate genre ----
  const genre =
    typeof body.genre === "string" ? body.genre.toLowerCase().trim() : "";
  if (!GENRES.has(genre)) {
    return json({ error: "unknown genre" }, 400);
  }

  // ---- Validate providers (one per slot) ----
  const textProvider = readProvider(body.textProvider, TEXT_PROVIDERS, "none");
  const imageProvider = readProvider(
    body.imageProvider,
    IMAGE_PROVIDERS,
    "none",
  );
  const ttsProvider = readProvider(body.ttsProvider, TTS_PROVIDERS, "off");

  if (textProvider === null)
    return json({ error: "unknown textProvider" }, 400);
  if (imageProvider === null)
    return json({ error: "unknown imageProvider" }, 400);
  if (ttsProvider === null) return json({ error: "unknown ttsProvider" }, 400);

  // ---- Country: derived from Cloudflare, never from the client, IP never stored ----
  const country = request.headers.get("CF-IPCountry") || "XX";

  // ---- Day-granularity timestamp only ----
  const day = new Date().toISOString().slice(0, 10);

  await env.DB.prepare(
    `INSERT INTO events (day, country, genre, text_provider, image_provider, tts_provider)
     VALUES (?, ?, ?, ?, ?, ?)`,
  )
    .bind(day, country, genre, textProvider, imageProvider, ttsProvider)
    .run();

  return json({ ok: true });
}

async function handleStats(env) {
  // One row per event, so every count here is a plain COUNT(*).
  const groupBy = (col) =>
    env.DB.prepare(
      `SELECT ${col} AS value, COUNT(*) AS n FROM events GROUP BY ${col} ORDER BY n DESC`,
    ).all();

  const [total, byCountry, byGenre, byText, byImage, byTts] = await Promise.all(
    [
      env.DB.prepare("SELECT COUNT(*) AS n FROM events").first(),
      groupBy("country"),
      groupBy("genre"),
      groupBy("text_provider"),
      groupBy("image_provider"),
      groupBy("tts_provider"),
    ],
  );

  return json({
    totalEvents: total?.n ?? 0,
    countries: byCountry.results,
    genres: byGenre.results,
    textProviders: byText.results,
    imageProviders: byImage.results,
    ttsProviders: byTts.results,
  });
}

const DAY_RE = /^\d{4}-\d{2}-\d{2}$/;

// Returns the whole fact table grouped on every column, day included, rather
// than one pre-rolled series per question. That's deliberate: the caller can
// then derive any slice — daily/weekly/monthly totals, a breakdown by any
// field, or a provider *combination* within a single period — from one
// request, which a set of per-dimension rollups cannot do (they've already
// thrown the correlation away). Row count is bounded by the number of
// distinct field combinations present, so it can never exceed the event count
// and in practice is far below it. If this ever gets big, `since` is the lever:
// the dashboard sends it for every range except "all time".
async function handleSeries(url, env) {
  const since = url.searchParams.get("since");
  if (since !== null && !DAY_RE.test(since)) {
    return json({ error: "since must be YYYY-MM-DD" }, 400);
  }

  const stmt = env.DB.prepare(
    `SELECT day, country, genre, text_provider, image_provider, tts_provider,
            COUNT(*) AS n
       FROM events
       ${since ? "WHERE day >= ?" : ""}
      GROUP BY day, country, genre, text_provider, image_provider, tts_provider
      ORDER BY day`,
  );

  const { results } = await (since ? stmt.bind(since) : stmt).all();
  return json({ since, rows: results });
}
