
# CLAUDE.md

## Code Style

Follow these coding conventions:

- Use clear, descriptive variable and function names
- Write self-documenting code with minimal inline comments — comments should explain a non-obvious *why* (a hidden constraint, a workaround, a subtle invariant), not restate what the code already says
- Keep functions small and focused on a single responsibility
- Follow the existing code style in the project
- Exception to "minimal comments": data shapes are documented in the file header, always — see "Data-table file headers" below. This isn't optional or best-effort; every data file's header must fully describe its own shape.

### Formatting

- **JS/JSON files**: Prettier, using its default settings — there is no `.prettierrc`, and that's deliberate; don't add one without discussing it first. Prettier isn't installed as a project dependency; run it via `npx --yes prettier@latest --write <file(s)>` (npx fetches it once and caches it).
- **Python files** (`web/genre-packs/*.py`, etc.): Prettier does **not** support Python — don't run it on a `.py` file, it will no-op or error. Use `black` instead, which is already installed but not on `PATH`: run it as `python3 -m black --line-length 88 <file(s)>` (add `--diff` first to preview without writing).
- Not every file has been run through a formatter yet — some still use an older compact style. When making a small edit to one of those, match the surrounding style rather than reformatting the whole file; only run the formatter over a whole file when that's the actual task (or you're already rewriting most of it).

### Data-table file headers

Every `web/generator/genres/<genre>/*.js` data-table file (races, professions, life-events, tensions, secrets, family-structures, city-settings, economic-tiers, plot-archetypes, static-cards, etc.) **must** carry a header comment fully documenting its shape — every property, always, no exceptions for "obvious" ones. This is the one place "minimal comments" doesn't apply: these properties are consumed generically several layers away (engine.js, prompt-builder.js, the slot machine), and that link isn't visible from the data file itself, so the header is the only place the shape is actually documented. A data file without a complete header is an incomplete change, not a stylistic nit. When writing or updating one:

- List every property, including ones that seem obvious, since the goal is a complete field reference.
- Call out which properties are optional and what happens when they're omitted (e.g., "statAffinity — optional; defaults to no bias when omitted" — the actual default behavior, not just the word "optional").
- Document special runtime/UI behavior tied to a field's exact content, not just its type. Example: a race's `flavor` field is truncated at the first `' — '` wherever it's displayed in the UI (the slot-machine sub-label in `engine.js`'s `_slots.race`, and the output header in `index.html`) — so a long `flavor` string with no em-dash shows in full instead of a short punchy sub-label.
- When you add or change a property in one genre's copy of a data file, check whether the same file in the other 6 genres needs the same treatment — these tables are meant to stay structurally parallel across genres, and a header/property that's true in one is usually true (or should be made true) in all.

## Track Design Changes

When making design changes, document them clearly:

- What changed and why
- How it affects gameplay
- Any visual or mechanical implications
- Test cases to verify the change
- Append to CHANGELOG.md with date, change description, and impact


## Image Generation Prompts

- Generate image prompts, not story descriptions.
- Convert abstract concepts into visual metaphors.
- Use concrete, specific details that a text-to-image model can understand.
- Avoid abstract or metaphorical language.
- Avoid literary prose.
- Use Flux1dev model for image generation with danbooru style tags.

### Game Icon Structure

Game icons generally use:

- [main subject]
- [action]
- [key visual symbol]
- [emotion]
- [art style]
- [composition]

### Every prompt must contain:

- visible subject
- visible action
- visible environment
- visible emotional cue
- camera composition

### Avoid:

- internal thoughts
- character motivations
- hidden information
- literary prose
- phrases like "realizes", "suspects", "doesn't know", "notices something wrong"
