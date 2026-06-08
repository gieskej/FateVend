
# CLAUDE.md

## Code Style

Follow these coding conventions:

- Use clear, descriptive variable and function names
- Write self-documenting code with minimal comments
- Keep functions small and focused on a single responsibility
- Use consistent indentation and formatting
- Follow the existing code style in the project

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
