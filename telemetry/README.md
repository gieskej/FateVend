# Vend of Fate — Anonymous Telemetry Server

Collects exactly five data points per generation event: country, genre, and the
text / image / narration provider. No IPs, no user IDs, no user agents, no
precise timestamps.

> **Status: live and wired up.** The Worker runs at
> `https://vend-of-fate-telemetry.jgieske.workers.dev` with D1 attached, and
> `web/telemetry.js` posts one event per completed scenario generation.
> Users can turn it off under **Settings → Options → Privacy**.
> Open `dashboard.html` to read the numbers — see [Viewing stats](#viewing-stats).

## Deploy (one-time, ~5 minutes)

```bash
npm install -g wrangler
wrangler login

# Create the D1 database and copy its id into wrangler.toml
wrangler d1 create vend-of-fate

# Apply the schema
wrangler d1 execute vend-of-fate --remote --file=schema.sql

# Deploy
wrangler deploy
```

This deployment lives at `https://vend-of-fate-telemetry.jgieske.workers.dev`.

**Use `wrangler@3`, not plain `wrangler`:** current Wrangler (v4) requires
Node v22+, and this machine runs v18. Pin the major version on every command
(`npx wrangler@3 …`) or you'll get a hard version error.

## Keeping the allowlists in sync

The Worker rejects anything not on its allowlists, so **adding a built-in genre
or a new provider to the app means adding it to `worker.js` too** — otherwise
those events come back `400` and silently vanish from your stats.

| Allowlist in `worker.js` | Source of truth in the app |
|---|---|
| `GENRES` | `SUPPORTED_GENRES` in `web/generator/registry.js` |
| `TEXT_PROVIDERS` | `#toolbar-text-provider` options in `web/index.html` |
| `IMAGE_PROVIDERS` | `#toolbar-image-provider` options in `web/index.html` |
| `TTS_PROVIDERS` | `#toolbar-narration` options in `web/index.html` |

Imported genre packs report the literal string `"pack"`, never their own id —
pack ids are author-supplied free text, so they can't be allowlisted and
shouldn't land in the database. You still learn how often packs get used.

## Client

Implemented in **`web/telemetry.js`** and called from `runAIPhase()` in
`web/app.js`, right after the scenario renders — so a reel spin costs nothing
and only a *completed* generation reports. It is fire-and-forget and can never
break a generation that already succeeded.

Three behaviors worth knowing:

- **Opt-out, default on.** The toggle lives in Settings → Options → Privacy and
  persists in `localStorage` under `gof_telemetry`.
- **Automated browsers are skipped** via `navigator.webdriver`. Without this,
  `npm run test:full` — which performs a real generation — would post a real
  event on every run and quietly skew the stats.
- **localhost is *not* skipped.** `serve.sh` means nearly every real user runs
  from localhost, so excluding it would discard almost all data.

The call site looks like this:

```js
const TELEMETRY_URL = "https://vend-of-fate-telemetry.jgieske.workers.dev/event";

fetch(TELEMETRY_URL, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    // Never send a pack's own id — it's arbitrary author-supplied text.
    genre: BUILTIN_GENRE_IDS.has(state.currentGenre) ? state.currentGenre : "pack",
    textProvider: currentProvider ?? "none",
    imageProvider: currentImageProvider ?? "none",
    ttsProvider: ttsProvider ?? "off",
  }),
}).catch(() => {}); // telemetry must never break the app
```

`BUILTIN_GENRE_IDS` already exists in `app.js` and is exactly the right set: it
snapshots `Object.keys(GENRE_TABLES)` at module load, *before* any pack is
registered. That matters, because `registerGenrePack()` mutates `GENRE_TABLES`
in place — a set built at send time would treat installed packs as built-ins and
leak their ids.

Note the client does NOT send country — the Worker reads Cloudflare's
`CF-IPCountry` header and discards the IP. That's what keeps this genuinely
anonymous.

## Viewing stats

### The dashboard

Open **`dashboard.html`** — literally double-click it, no server needed. It
reads `/series` and renders daily / weekly / monthly views: headline numbers
with a period-over-period delta, a stacked bar chart, breakdowns for all five
fields, a text × image provider matrix, and a per-period table.

Everything is driven by four controls (range, bucket, breakdown dimension, and
the Worker URL, all remembered in `localStorage`). Only **range** costs a round
trip — it changes the `since` sent to the Worker. Switching bucket or dimension
re-renders from rows already in hand.

Two constraints worth knowing before editing it:

- **It's a classic `<script defer>`, not `type="module"`.** Chrome treats module
  loads over `file://` as cross-origin and blocks them, which would force this
  page to be served. `dashboard.js` has no imports, so it loses nothing.
- **Country codes are resolved with `Intl.DisplayNames`, not flag emoji.**
  Windows ships no flag glyphs, so regional-indicator pairs degrade to the bare
  letters and every row renders as `DE DE`.

Point it at a local `wrangler dev` by changing the Worker URL field.

### The raw endpoints

```bash
# All-time aggregates
curl https://vend-of-fate-telemetry.jgieske.workers.dev/stats

# Day-granularity fact table, optionally windowed
curl "https://vend-of-fate-telemetry.jgieske.workers.dev/series?since=2026-07-01"
```

`/stats` returns a total plus counts grouped by country, genre, and each
provider slot. `/series` returns the same facts with `day` retained, grouped on
every column at once — one row per distinct combination, which is what lets the
dashboard bucket by any period *and* keep provider combinations answerable
inside a single period. Rolling it up per-dimension server-side would throw that
correlation away.

If you want stats private, add a check for a secret query param or bearer token
in `handleStats` **and `handleSeries`**, or delete both routes and query D1
directly:

```bash
# Most popular genres
wrangler d1 execute vend-of-fate --remote \
  --command="SELECT genre, COUNT(*) n FROM events GROUP BY genre ORDER BY n DESC"

# Which text provider people actually use
wrangler d1 execute vend-of-fate --remote \
  --command="SELECT text_provider, COUNT(*) n FROM events GROUP BY text_provider ORDER BY n DESC"

# Do local-model users also run local image generation?
wrangler d1 execute vend-of-fate --remote \
  --command="SELECT text_provider, image_provider, COUNT(*) n FROM events GROUP BY 1,2 ORDER BY n DESC"

# How many generations skip portraits entirely
wrangler d1 execute vend-of-fate --remote \
  --command="SELECT COUNT(*) n FROM events WHERE image_provider='none'"
```

That third query is why the providers are columns on one row rather than a row
each — combinations stay answerable.

## Privacy properties

- Country derived server-side from Cloudflare's edge, IP never logged or stored
- Timestamps truncated to the day (UTC) so events can't be time-correlated
- Genre and providers validated against allowlists — arbitrary strings rejected
- Genre-pack ids never transmitted; packs report only the generic `"pack"`
- No cookies, no fingerprinting, nothing linking two events to the same person
