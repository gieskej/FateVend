# Vend of Fate — Anonymous Telemetry Server

Collects exactly five data points per generation event: country, genre, and the
text / image / narration provider. No IPs, no user IDs, no user agents, no
precise timestamps.

> **Status: deployed, but not wired up yet.** The Worker is live at
> `https://vend-of-fate-telemetry.jgieske.workers.dev` with the D1 database
> attached — nothing in the app posts to it yet. See
> [Client usage](#client-usage) for the snippet that turns it on.

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

## Client usage

Fire-and-forget after a character is generated. The three provider values live
in `currentProvider` and `currentImageProvider` (which starts as `null`, hence
the `??`) in `web/app.js`, and `ttsProvider`, which `app.js` already imports
from `narration.js`:

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

```bash
curl https://vend-of-fate-telemetry.jgieske.workers.dev/stats
```

Returns a total plus counts grouped by country, genre, and each provider slot.

If you want stats private, add a check for a secret query param or bearer token
in `handleStats`, or delete the route and query D1 directly:

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
