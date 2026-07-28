# CLI usage

[← Back to README](../README.md)

The CLI reads keys from `.env` and shares the exact same generator engine as the
web app.

```bash
# Full generation (modern genre, Claude by default)
node cli/index.js

# Pick a genre and provider
node cli/index.js --genre sci-fi --provider gemini
node cli/index.js --genre fantasy --provider ollama --ollama-model llama3.2

# Skeleton only — no API call (instant, free)
node cli/index.js --genre nihongi --skeleton-only

# Machine-readable JSON
node cli/index.js --json
```

Options: `--genre <id>`, `--provider claude|gemini|ollama`, `--ollama-url`,
`--ollama-model`, `--skeleton-only`, `--json`.

Genre ids: `modern`, `fantasy`, `sci-fi`, `paleolithic`,
`manga-osaka-highschool1987`, `historical-korea-joseon-dynasty`, `nihongi`.
