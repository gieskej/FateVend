-- Vend of Fate telemetry schema
-- One row per generation event. No IPs, no user IDs, no user agents.
-- Timestamp is truncated to the day so events can't be correlated
-- to an individual by time-of-request.
--
-- The app has three independent provider slots and one generation uses at
-- most one of each, so they are columns on a single event row rather than a
-- row per provider. An event is then countable with a plain COUNT(*), and
-- combination questions ("do Ollama users also run local Stable Diffusion?")
-- stay answerable, which a row-per-provider layout cannot do.
--
-- "Not used" is recorded explicitly ('none' for text/image, 'off' for tts)
-- rather than as NULL, so "how many generations ran without a portrait" is
-- the same kind of GROUP BY as every other question.

CREATE TABLE IF NOT EXISTS events (
    id             INTEGER PRIMARY KEY AUTOINCREMENT,
    day            TEXT NOT NULL,   -- 'YYYY-MM-DD' (UTC)
    country        TEXT NOT NULL,   -- ISO 3166-1 alpha-2, or 'XX' if unknown
    genre          TEXT NOT NULL,   -- built-in genre id, or 'pack' for an imported genre pack
    text_provider  TEXT NOT NULL,   -- none | claude | gemini | ollama
    image_provider TEXT NOT NULL,   -- none | sd | stability
    tts_provider   TEXT NOT NULL    -- off | browser | kokoro | openai
);

CREATE INDEX IF NOT EXISTS idx_events_day     ON events (day);
CREATE INDEX IF NOT EXISTS idx_events_country ON events (country);
CREATE INDEX IF NOT EXISTS idx_events_genre   ON events (genre);
CREATE INDEX IF NOT EXISTS idx_events_text    ON events (text_provider);
CREATE INDEX IF NOT EXISTS idx_events_image   ON events (image_provider);
CREATE INDEX IF NOT EXISTS idx_events_tts     ON events (tts_provider);
