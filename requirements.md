# RPG Character Generator — Requirements

## Overview

A richly-detailed, personality-first RPG character generator for use in AI Dungeon's modern-genre scenarios. The core generator is a portable, framework-agnostic JavaScript library that can be consumed by a web UI, a CLI, or embedded directly in an AI Dungeon script. The primary output is a fully-populated AI Dungeon scenario template plus a cast of character templates, ready to copy-paste.

---

## MVP Scope

- **Genre: Modern only.** Architecture must support adding genres in future versions without refactoring the core engine.
- **Core generator is UI-agnostic.** The generation logic is a standalone library with no dependency on any UI framework, browser APIs, or Node.js-specific modules. It must run in a web browser (via bundler), Node.js, and AI Dungeon's scripted JS environment.
- **No backend.** All generation runs client-side via the Anthropic API.
- **No persistence.** Stateless — each visit starts fresh.
- **No login or user accounts.**

---

## User Flow

1. User lands on the page and hits **Generate**
2. Stats are rolled (1–100 per stat)
3. MBTI type is assigned, weighted by stats
4. Character skeleton is seeded from curated tables, filtered by stats
5. Claude API call generates all narrative text fields
6. Full output is displayed — character sheet + scenario templates
7. User reviews, optionally tweaks fields, then copies to clipboard

---

## Character — Stats

Six classic RPG stats, each rolled randomly in the range **1–100**.

| Stat | Narrative influence |
|---|---|
| Strength | Physical presence, job type, conflict style |
| Intelligence | Vocabulary, profession tier, problem-solving |
| Wisdom | Emotional maturity, life philosophy, decision-making |
| Charisma | Social role, relationship dynamics, how others describe them |
| Dexterity | Grace vs. clumsiness, physical hobbies, certain professions |
| Constitution | Health, stamina, vices, resilience under pressure |

- Stats are **shown to the user** as part of the character sheet output.
- Stats **weight the MBTI assignment** and **filter curated tables** (e.g. low Wisdom + high Charisma skews toward con artist or salesperson professions).

---

## Character — Personality (MBTI)

- One of 16 MBTI types assigned per character.
- **Not purely random** — weighted by stat values:
  - High Charisma + High Strength → skews Extrovert
  - High Intelligence + Low Wisdom → skews Intuitive + Thinking
  - Low Constitution + High Wisdom → skews Feeling + Judging
  - etc.
- MBTI type influences the character's speech style, relationship dynamics, goals, fears, and secrets in the generated narrative.
- **MBTI type name is never written into the AI Dungeon output** — it is translated into behavioral prose only.

---

## Character — Skeleton (Curated Tables)

The following attributes are seeded from static curated tables before the AI call. Tables are weighted/filtered by stats.

- **Identity:** gender (with pronouns), sexual orientation, race/ethnicity (broad category + flavor detail)
- **Appearance:** build, hair, distinguishing feature — assembled into prose by Claude, never as a list
- **Quirk:** one behavioral or physical tell, stat-weighted, woven into the character entry naturally
- **Profession** (job title, industry, tenure, how they feel about it)
- **Economic status** (wealth tier, how they got there, visible markers)
- **Family structure** (randomized: composition, living status, presence/absence, relationship quality)
- **Formative life event** (one defining past moment)
- **Current tension** (the inciting situation the character is in right now)
- **Core secret** (something hidden that the AI can use for dramatic tension)
- **Goals and motivations**

**Identity attribute rules:**
- Gender, race/ethnicity, and orientation carry **no stat affinities** — identity is not correlated with capability in this system
- Ethnicity flavor detail informs Claude's appearance prose but is **never stated as a label** in any output field
- Orientation is **never explicitly named** in the character entry — it surfaces only through relationship prose if relevant

---

## Character — Supporting Cast

Each generated protagonist comes with a full supporting cast. Each NPC is generated as a separate AI Dungeon character entry.

**Cast composition (randomized within bounds):**
- Best friend(s): 1–2
- Sibling(s): 0–2 (family structure dependent)
- Parents: 0–2 (family structure dependent; may be deceased, absent, or estranged)
- Dramatic foil: 1 (rival, antagonist, or love interest)

**Hard cap: 6–8 total characters** (protagonist included).

**NPC depth — light profile only:**
- Relationship dynamic to protagonist
- 2–3 defining personality traits
- No recursive cast generation (NPCs do not get their own friends/family)

**NPC entries reference the protagonist by name** to maintain coherence in AI Dungeon's context.

---

## AI Dungeon Output — Field Specifications

### Scenario template

| Field | Limit | Notes |
|---|---|---|
| Title | 70 chars | Hooks the player immediately |
| Description | 5,000 chars | Tone, setting, who the player is, what's at stake |
| Tags | 10 tags max | Genre-relevant (e.g. modern, crime, drama, redemption) |
| Opening | 4,000 chars | In-world narrative that drops the player into the scene |

### Character template (one per character)

| Field | Limit | Notes |
|---|---|---|
| Name | 80 chars | |
| Entry | 1,000 chars | AI context — terse behavioral prose (see below) |

---

## Character Entry — Prompt Engineering

The 1,000 character limit requires maximum density. The Claude-generated entry must convey stats and personality through *behavioral description*, never by stating numbers or labels.

**Principles:**
- Never mention stat numbers, MBTI type name, orientation label, or ethnicity label
- Weave appearance and quirk into behavior — show, don't list
- Use sentence fragments where possible
- Lead with identity: name, age, role in one line
- Fold relationships in — reference key NPCs by name and dynamic
- End on tension — one line that gives the AI something to pull on

**Example of correct style:**
> "John Mara. Dock worker, mid-30s. Built like a wall, moves like he owns the room. Talks first, thinks later — if at all. Fiercely loyal to his sister Rosa and his crew; treats strangers like a test he hasn't decided to pass yet. Owes money to the wrong people and knows it."

**Claude prompt input (the skeleton passed to the API):**
```
Write a terse AI Dungeon character entry. Max 1000 chars.
No labels, no stat numbers, no MBTI mention. Pure behavioral prose.

Character:
- Name, age, gender (pronouns)
- Ethnicity flavor, orientation
- Appearance: build, hair, distinguishing feature
- Quirk
- Profession (tier, sentiment)
- Stats: Strength, Intelligence, Wisdom, Charisma, Dexterity, Constitution
- MBTI type
- Economic status
- Key relationships (name + dynamic)
- Core secret
- Current tension
```

The Description and Opening scenario fields (5,000 and 4,000 chars respectively) carry the richer narrative — the Entry is context only.

---

## Functional Requirements

- **Single-click generate** — one button produces the full output
- **Regenerate individual fields** — re-roll a single stat, profession, or NPC without losing the rest
- **Editable fields** — all generated text is editable in-place before copying
- **Character count indicators** — live counters on every field, showing remaining characters against AI Dungeon limits
- **Copy to clipboard** — per-field copy buttons plus a "Copy all" for the full scenario
- **Coherent cast** — NPC entries reference the protagonist; the scenario Description and Opening reference the full cast by name

---

## Technical Architecture

### Separation of concerns — core requirement

The generator must be a **pure, portable JavaScript library** fully decoupled from any UI or runtime environment. This enables three deployment targets from one codebase:

| Consumer | How it uses the generator |
|---|---|
| **Web UI** | Imports generator; handles rendering, copy buttons, animations |
| **CLI** | Thin wrapper — calls generator, prints JSON or formatted text to stdout |
| **AI Dungeon script** | Imports generator directly; hooks into AI Dungeon's `modifier` / `onOutput` scripting API |

**Constraints on the generator module:**
- No `window`, `document`, or any browser globals
- No UI framework imports (no React, Vue, etc.)
- No Node.js-specific APIs (`fs`, `path`, `process`, etc.)
- All side effects (API calls) are async and explicitly invoked — nothing fires on import
- Must run in: browser (via bundler), Node.js, and AI Dungeon's restricted scripted JS environment
- AI Dungeon scripts have `fetch` available — the generator uses only `fetch` for API calls

### Public API surface

```js
import { generateCharacter } from './generator/index.js';

// Full generation — rolls stats, seeds skeleton, calls Claude API
const character = await generateCharacter({
  genre: 'modern',
  apiKey: 'sk-...',
});

// Skeleton only — no API call, useful for previewing or testing
const skeleton = await generateCharacter({
  genre: 'modern',
  skipAI: true,
});
```

### Generation pipeline

```
Roll stats (1–100)
    ↓
Assign MBTI (weighted by stats)
    ↓
Seed skeleton (curated tables, filtered by stats + MBTI)
    ↓
Claude API call → character entries + scenario fields
    ↓
Return fully resolved character object
    ↓
Consumer renders / formats / outputs
```

### Folder structure

```
/generator
  index.js                  ← public API surface
  roller.js                 ← stat rolling, MBTI weighting
  selector.js               ← weighted table selection logic
  cast-builder.js           ← NPC assembly
  skeleton-builder.js       ← assembles full CharacterSkeleton
  api-client.js             ← Anthropic API call + response parsing
  /genres
    /modern
      professions.js
      life-events.js
      family-structures.js
      tensions.js
      secrets.js
      settings.js
      character-attributes.js
      prompt-template.js
    /fantasy                ← empty, ready for v2
    /sci-fi                 ← empty, ready for v2

/ui                         ← web app (imports from /generator)

/cli
  index.js                  ← thin CLI wrapper (imports from /generator)
```

---

## UI — V1 (Functional)

- Clean, readable character sheet layout
- Stats displayed as a visible block
- MBTI type shown with a brief descriptor
- All AI Dungeon fields displayed with character count indicators
- Copy buttons per field and copy-all
- Mobile-friendly

## UI — V2 (Clockwork Gears of Fate)

A visual skin over the same generation engine:

- **Reveal sequence:** stats roll first → MBTI locks in → skeleton seeds → narrative unfolds
- **Gear states:** spinning (generating), locking (value assigned), idle (complete)
- **Per-stat gears** that spin and snap to a value; clicking a gear re-rolls that stat
- **Aesthetic:** brass/copper tones, aged metal, serif or Roman numeral stat values, parchment-feel text areas
- Each generation phase animates independently

---

## Out of Scope (V1)

- Multiple genre support
- User accounts or saved characters
- Character portraits or image generation
- Export to file (PDF, JSON)
- Direct AI Dungeon API integration
- MBTI or stat editing by the user before generation
