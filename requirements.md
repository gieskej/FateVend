# Gears of Fate — Requirements & Design

## Overview

A richly-detailed, personality-first RPG character generator for AI Dungeon scenarios. The core generator is a portable, framework-agnostic JavaScript library consumed by a web UI and a CLI. The primary output is a fully-populated AI Dungeon scenario template plus a cast of NPC character entries, ready to copy-paste or download as a ZIP.

Three genres are fully implemented: **Modern**, **Fantasy**, **Sci-Fi**.

---

## User Flow

1. User selects a genre (Modern / Fantasy / Sci-Fi) and clicks **Turn the Gears**
2. Stats are rolled via a bell-curve distribution (1–100 per stat)
3. MBTI type is assigned, weighted by stats
4. Character skeleton is seeded from curated tables, filtered/weighted by stats
5. A slot machine animation reveals each skeleton attribute in sequence
6. User optionally clicks **Continue** to call the Claude API for narrative generation
7. Full output is displayed — character sheet, scenario fields, NPC entries, portrait prompt
8. User reviews, edits fields in-place, copies to clipboard, or downloads a ZIP

---

## Character — Stats

Six classic RPG stats, each rolled in the range **1–100** using a **Box-Muller normal distribution** (mean 50, stddev 15). This produces a genuine bell curve: ~68% of rolls land between 35–65, with extreme values (below 20 or above 80) being genuinely rare.

| Stat | Narrative influence |
|---|---|
| Strength | Physical presence, job type, conflict style |
| Intelligence | Vocabulary, profession tier, problem-solving |
| Wisdom | Emotional maturity, life philosophy, decision-making |
| Charisma | Social role, relationship dynamics, how others describe them |
| Dexterity | Grace vs. clumsiness, physical hobbies, certain professions |
| Constitution | Health, stamina, vices, resilience under pressure |

Stats are shown to the user and drive both MBTI weighting and curated table selection.

---

## Character — Age

Age is rolled using a **Box-Muller normal distribution** (mean 25, stddev 8), clamped to **[15, 75]**. This produces a young-skewed population — most protagonists are in their late teens to mid-thirties — with a gradual tail allowing for middle-aged and older characters.

---

## Character — Personality (MBTI)

- One of 16 MBTI types assigned per character, weighted by stat values:
  - High Charisma + Strength → skews Extrovert
  - High Intelligence + Wisdom → skews Intuitive, Thinking, Introverted
  - High Wisdom + Constitution → skews Judging
  - High Charisma + Dexterity → skews Perceiving
- MBTI type influences speech style, relationship dynamics, goals, and secrets in generated prose
- **MBTI type name is never written into AI Dungeon output** — translated to behavioral prose only

---

## Character — Skeleton (Curated Tables)

Attributes seeded from static curated tables before the AI call. Tables are weighted/filtered by stats.

- **Identity:** gender (with pronouns), sexual orientation, race/ethnicity/species (broad + flavor)
- **Appearance:** build, hair, distinguishing feature — assembled into prose by Claude
- **Quirk:** one behavioral or physical tell, stat-weighted
- **Profession** (job title, industry, sentiment toward it)
- **Economic status** (wealth tier, visible markers, housing, transport)
- **Family structure** (composition, living status, relationship quality)
- **Formative life event** (one defining past moment)
- **Current tension** (the inciting situation)
- **Core secret** (hidden information for dramatic tension)
- **City/setting** (location flavor, tone)

**Identity attribute rules:**
- Gender, race/ethnicity/species, and orientation carry **no stat affinities** — identity is not correlated with capability
- Race/ethnicity flavor informs Claude's appearance prose but is never stated as a label in output
- Orientation is never explicitly named in the character entry — surfaces only through relationship prose

**Optional settings (user-configurable):**
- **LGBQ:** toggles inclusion of non-binary genders and queer orientations in rolls (on by default)
- **NSFW:** toggles inclusion of adult professions and adds "sexy" to portrait prompt (off by default)

---

## Character — Supporting Cast

Each protagonist comes with a supporting cast of 4–7 NPCs.

**Cast composition (family-structure dependent):**
- Parents: 0–2 (may be deceased, absent, estranged, or present)
- Siblings: 0–2
- Best friend(s): 1–2
- Dramatic foil: 1 (rival, antagonist, love interest, or estranged former ally)

**Hard cap: 7 NPCs maximum.**

**Each NPC profile includes:**
- Name (family members share the protagonist's surname; friends/foils use culturally neutral names)
- Role (e.g. mother, older sibling, best friend, rival)
- Status (e.g. present and close, estranged, deceased)
- **Gender** (e.g. Man, Woman, Non-binary, Trans man)
- **Race** (broad identity label — inherits protagonist's for family; diverse neutral pool for friends/foils)
- 2–3 defining personality traits
- One-line relationship dynamic to the protagonist

NPC entries reference the protagonist by name. No recursive cast generation.

---

## AI Dungeon Output — Field Specifications

### Scenario fields

| Field | Limit | Notes |
|---|---|---|
| Title | 70 chars | Hooks the player immediately |
| Description | 5,000 chars | Tone, setting, who the player is, what's at stake |
| Tags | 10 tags max | Genre-appropriate lowercase strings |
| Opening | 4,000 chars | In-world narrative that drops the player into the scene |

### Character entries (one per character)

| Field | Limit | Notes |
|---|---|---|
| Entry | 1,000 chars | Terse behavioral prose — no stat numbers, show don't tell |

### Portrait

A comma-separated image generation prompt (≤500 chars) is produced for each character, suitable for Flux1dev / Stable Diffusion with danbooru-style tags. The UI supports generation via a local Stable Diffusion endpoint or the Stability AI API.

---

## Character Entry — Style

The 1,000-character limit requires maximum density. Generated entries convey stats and personality through behavioral description.

**Principles:**
- Never mention stat numbers
- Weave appearance and quirk into behavior — show, don't list
- Use sentence fragments where possible
- Lead with name, age, role in one line
- Reference key NPCs by name and dynamic
- End on tension — one line that gives the AI something to pull on

---

## Functional Features

- **Single-click generate** — one button produces the full skeleton and (optionally) narrative output
- **Two-phase flow** — skeleton appears immediately after rolling; AI narrative requires a second click (allows previewing before spending API tokens)
- **Editable fields** — all generated text is editable in-place before copying
- **Character count indicators** — live counters on every field against AI Dungeon limits
- **Copy to clipboard** — per-field copy buttons plus a "Copy Full Scenario Package" button
- **Download ZIP** — exports the full scenario package as a timestamped `.zip` (scenario.json + portrait if generated)
- **Portrait generation** — generates a character portrait via local Stable Diffusion or Stability AI API
- **Slot machine animation** — reveals each skeleton attribute with a staggered rolling animation and bell SFX
- **Genre selector** — switches between Modern, Fantasy, and Sci-Fi with full table swap

---

## Technical Architecture

### Core principle

The generator is a **pure, portable JavaScript library** fully decoupled from any UI or runtime. Same code runs in browser, Node.js, and AI Dungeon's scripted JS environment.

**Constraints on the generator module:**
- No `window`, `document`, or browser globals
- No UI framework imports
- No Node.js-specific APIs (`fs`, `path`, `process`)
- All side effects are async and explicitly invoked — nothing fires on import
- Only uses `fetch` for API calls (available in all three targets)

### Public API

```js
import { generateCharacter } from './generator/index.js';

const { skeleton, output } = await generateCharacter({
  genre: 'modern',   // 'modern' | 'fantasy' | 'sci-fi'
  apiKey: 'sk-...',
});

// Skeleton only — no API call
const { skeleton } = await generateCharacter({
  genre: 'fantasy',
  skipAI: true,
});
```

### Generation pipeline

```
Roll stats (Box-Muller bell curve, 1–100)
    ↓
Assign MBTI (weighted by stats)
    ↓
Seed skeleton (curated genre tables, filtered/weighted by stats)
    ↓
Build supporting cast (family-structure-aware, ethnicity-matched names)
    ↓
[Optional] Claude API call → character entries + scenario fields + portrait prompt
    ↓
Return fully resolved character object
```

### Folder structure

```
web/generator/
  index.js              ← public API
  roller.js             ← stat rolling (Box-Muller), age rolling, MBTI weighting
  selector.js           ← weighted/stat-weighted table selection
  skeleton-builder.js   ← assembles CharacterSkeleton from genre tables
  cast-builder.js       ← NPC assembly (family, friends, foils)
  api-client.js         ← Anthropic API call + response parsing
  stat-adjectives.js    ← stat-to-label mapping
  ui-data.js            ← re-exports all genre tables for the web UI
  types.js              ← JSDoc types (StatBlock, CharacterSkeleton, NPCSkeleton, …)

  common/               ← shared across all genres
    genders.js, orientations.js, mbti.js, build.js, hair.js, sentiments.js

  genres/               ← one folder per genre, identical structure
    modern/             ← ethnicities, contemporary professions/tensions/secrets
    fantasy/            ← races, medieval/magical professions/tensions/secrets
    sci-fi/             ← species, futuristic professions/tensions/secrets

    Each genre:
      character-attributes.js   races.js   professions.js   life-events.js
      family-structures.js      tensions.js   secrets.js    economic-tiers.js
      city-settings.js          settings.js   names.js      prompt-template.js

cli/
  index.js              ← thin wrapper: calls generateCharacter(), prints to stdout
```
