# Creating a genre

A **genre pack** adds a whole new playable genre to FateVend at runtime. No
source edits, no rebuild, no pull request — you import a file through
**Settings → Genre Packs** and it behaves exactly like a built-in genre:
carousel card, slot machine, character rolls, portraits, narration, music,
AI Dungeon export.

Packs are **pure data**. There is no executable code in a pack, so importing
one from a stranger cannot run JavaScript on your machine.

> Already know the format and just want the field list? Jump to
> [The complete field reference](#the-complete-field-reference).

---

## Contents

1. [Which kind of pack do you want?](#1-which-kind-of-pack-do-you-want)
2. [The smallest pack that works](#2-the-smallest-pack-that-works)
3. [Top-level fields](#3-top-level-fields)
4. [`slots` — wiring the slot machine](#4-slots--wiring-the-slot-machine)
5. [`voice` — what the AI is told](#5-voice--what-the-ai-is-told)
6. [`gameplay` — optional rule tweaks](#6-gameplay--optional-rule-tweaks)
7. [The complete field reference](#the-complete-field-reference) (`data.*`)
8. [Icons and audio](#8-icons-and-audio)
9. [Five mistakes that fail silently](#9-five-mistakes-that-fail-silently)
10. [The two shipped examples](#10-the-two-shipped-examples)
11. [Testing your pack](#11-testing-your-pack)
12. [Shipping a genre in the repo instead](#12-shipping-a-genre-in-the-repo-instead)

---

## 1. Which kind of pack do you want?

| | **JSON pack** | **Zip pack** |
|---|---|---|
| File | one `.json` | `.zip` with `manifest.json` + folders |
| Art | none, or borrowed via `iconBase` | ships its own `icons/` |
| Music | none, or a built-in genre's | ships its own `audio/` |
| Effort | an afternoon | a weekend plus art generation |
| Example | `sample-neon-drift.json` | `example-pirate-cove.zip` |

There are three sane ways to start, easiest first:

**A. Reskin** — keep an existing genre's data structure and art, change the
identity. Set `iconBase` to point at a built-in genre's icon folder and your
pack renders that genre's art with your names, voice and flavor. This is what
`sample-neon-drift.json` does with Sci-Fi's icons. Zero art required.

**B. Fork a built-in** — copy a built-in genre's tables out of
`web/generator/genres/<genre>/*.js`, convert to JSON, then rewrite the content.
You inherit a known-good structure and only change words.

**C. From scratch** — start from [the minimal pack below](#2-the-smallest-pack-that-works)
and grow it. Most control, most work.

Whichever you pick, author it as a **pack** first — it reloads without a
restart and needs no source edits, so iteration is fast. If the genre should ship
in the repo rather than be imported, convert it afterwards:
[§12](#12-shipping-a-genre-in-the-repo-instead) covers that, and what it buys.

---

## 2. The smallest pack that works

This is a complete, valid pack. It is deliberately tiny — two folk, two trades,
two of everything — so you can see the whole shape at once. It imports, appears
in the carousel, and rolls characters.

Save as `tiny-example.json` and import via **Settings → Genre Packs**.

```jsonc
{
  "id": "tiny-example",
  "label": "Tiny Example",
  "description": "The smallest pack that actually works.",
  "portraitStyle": "storybook illustration, soft ink lines, warm muted palette, centered subject",

  "tts": {
    "preprocess": "default",
    "browser": { "rate": 1.0, "pitch": 1.0 },
    "kokoro":  { "voice": "af_bella", "speed": 1.0 },
    "openai":  { "voice": "nova", "speed": 1.0 }
  },
  "music": { "prefix": "tiny", "tracks": [] },

  "slots": {
    "identityCat": "FOLK",   "identityHeader": "Folk",
    "profCat": "TRADE",      "profHeader": "Trade",
    "econCat": "ECONOMIC_TIER", "econHeader": "Standing",
    "cityCat": "PLACE",      "cityHeader": "Place",
    "familyCat": "FAMILY",
    "lifeEventCat": "LIFE_EVENT",
    "tensionCat": "TENSION",
    "filterGendersToGenre": false,
    "familyUsesIconSlug": false,
    "economicTiers": [
      ["tier1", "tier1", "Pauper"],
      ["tier2", "tier2", "Hand-to-mouth"],
      ["tier3", "tier3", "Comfortable"],
      ["tier4", "tier4", "Well-off"],
      ["tier5", "tier5", "Wealthy"]
    ]
  },

  "voice": {
    "identityLabel": "Folk",
    "genreLabel": "a small riverside town",
    "openingNote": "Open in the middle of an ordinary errand that is about to go wrong.",
    "appearanceNote": "Describe clothing as worn and specific to the person's trade.",
    "systemPrompt": "You are writing a grounded, small-scale story set in a riverside town. Keep the stakes personal. Avoid epic fantasy language."
  },

  "data": {
    "races": [
      { "id": "river_folk", "broad": "River Folk",
        "flavor": "River folk — grew up on the water, reads weather by the smell of it",
        "weight": 10 },
      { "id": "hill_folk", "broad": "Hill Folk",
        "flavor": "Hill folk — came down from the high pastures, still walks like the ground might tilt",
        "weight": 6 }
    ],

    "professions": [
      { "title": "Ferryman", "industry": "River trade", "economicTier": 2,
        "statAffinity": { "strength": 1.2, "wisdom": 1.1 },
        "sentiments": ["content", "tired", "proud"] },
      { "title": "Baker", "industry": "Food", "economicTier": 3,
        "sentiments": ["content", "anxious", "proud"] }
    ],

    "lifeEvents": [
      { "id": "lost_the_boat", "toneTag": "dramatic",
        "description": "Lost the family boat in a flood and has never quite replaced it" },
      { "id": "took_in_a_stray", "toneTag": "cozy",
        "description": "Took in a stranger for a winter and never explained why" }
    ],

    "familyStructures": [
      { "id": "both_parents", "label": "Both parents living, house too small",
        "parentCount": 2, "siblingCount": [1, 3], "toneTag": "cozy" },
      { "id": "orphan", "label": "Raised by the town after both parents drowned",
        "parentCount": 0, "siblingCount": [0, 1], "toneTag": "dramatic" }
    ],
    "parentStatuses": [
      { "id": "steady", "label": "steady, undemonstrative, always there", "toneTag": "cozy" },
      { "id": "drinker", "label": "drinks more than the town pretends not to notice", "toneTag": "gritty" }
    ],
    "siblingDynamics": [
      { "id": "close", "label": "inseparable since childhood", "toneTag": "cozy" },
      { "id": "rivalry", "label": "competitive about everything, warmly", "toneTag": "neutral" }
    ],

    "tensions": [
      { "id": "debt_to_miller", "toneTag": "gritty", "criminalFlag": false,
        "description": "Owes the miller more than a year of work and the miller has started saying so publicly" },
      { "id": "smuggling_run", "toneTag": "gritty", "criminalFlag": true,
        "description": "Moves untaxed goods downriver for someone whose name they were told never to learn" }
    ],
    "secrets": [
      { "id": "wrong_body", "toneTag": "dramatic", "severity": "high", "criminalFlag": false,
        "description": "Pulled a body from the river last spring and told no one" },
      { "id": "burned_the_ledger", "toneTag": "gritty", "severity": "explosive", "criminalFlag": true,
        "description": "Burned the tax ledger and let a neighbour take the blame" }
    ],

    "economicTiers": {
      "1": { "label": "Pauper", "descriptors": ["sleeps in the boathouse"],
             "housing": ["a corner of someone else's shed"], "transport": ["on foot, always"] },
      "2": { "label": "Hand-to-mouth", "descriptors": ["one bad season from nothing"],
             "housing": ["a rented room over the tannery"], "transport": ["a borrowed skiff"] },
      "3": { "label": "Comfortable", "descriptors": ["pays debts on time, mostly"],
             "housing": ["a narrow house on the low street"], "transport": ["own skiff, patched"] },
      "4": { "label": "Well-off", "descriptors": ["lends money and expects it back"],
             "housing": ["a stone house above the flood line"], "transport": ["a cart and a good mule"] },
      "5": { "label": "Wealthy", "descriptors": ["owns the wharf everyone else works on"],
             "housing": ["the big house on the hill"], "transport": ["a covered barge with a crew"] }
    },

    "citySettings": [
      { "id": "the_wharf", "label": "The Wharf", "toneTag": "gritty",
        "flavor": "Tar, rope, and shouting; the town's whole economy in fifty yards" },
      { "id": "low_street", "label": "Low Street", "toneTag": "cozy",
        "flavor": "Crooked houses leaning together over a lane that floods twice a year" }
    ],

    "tagPools": {
      "always": ["small-town", "character-driven"],
      "cozy": ["warm", "community"],
      "gritty": ["hard-luck", "debt"],
      "dramatic": ["secrets", "reckoning"],
      "neutral": ["slice-of-life"],
      "criminal": ["smuggling", "crime"],
      "professionTags": {
        "River trade": ["boats", "water"],
        "Food": ["bread", "trade"]
      }
    },

    "namePools": {
      "River Folk": { "masc": ["Corin", "Adem", "Bryn"], "fem": ["Marta", "Ilse", "Wren"],
                      "neutral": ["Ash", "Rill"], "last": ["Weir", "Tallow", "Fen"] },
      "default":    { "masc": ["Tomas", "Garrick"], "fem": ["Nessa", "Orla"],
                      "neutral": ["Quill"], "last": ["Stone", "Barrow"] }
    },

    "plotArchetypes": [
      { "id": "the_flood", "label": "The Flood", "weight": 6,
        "description": "The water is rising and someone has to decide what gets saved and what gets left." }
    ],

    "distinguishingFeatures": [
      { "id": "rope_scars", "label": "rope scars across both palms" },
      { "id": "river_squint", "label": "a permanent squint from thirty years of glare off water" }
    ],
    "quirks": [
      { "id": "counts_knots", "statAffinity": { "dexterity": 1.2 },
        "quirk": "Ties and unties a knot while thinking, without noticing they're doing it" },
      { "id": "names_boats", "quirk": "Names every boat they touch, even ones they don't own" }
    ]
  }
}
```

Note there is **no `"Hill Folk"` name pool**. That's intentional — it
demonstrates the `"default"` fallback, and Hill Folk characters get names like
*Nessa Stone* while River Folk get *Adem Weir*.

Also note there's no art at all. Every reel shows the ⚙ gear placeholder, which
is a perfectly valid state — add icons once the writing is good.

**Real packs are much bigger.** For a genre that doesn't feel repetitive after
ten rolls, aim for roughly what the built-ins carry: 8–20 identities, 30–40
professions, 20+ life events, 15+ tensions, 15+ secrets, 20+ city settings.

---

## 3. Top-level fields

Nine fields are **required**. The loader rejects the pack and lists every
problem if any is missing — it never half-imports.

| Field | Required | Purpose |
|---|---|---|
| `id` | **yes** | Unique key. Lowercase letters, digits, hyphens only (`^[a-z0-9][a-z0-9-]*$`). Must not collide with a built-in. |
| `label` | **yes** | Display name on the carousel card and genre dropdown. |
| `description` | **yes** | One-line pitch under the card. |
| `portraitStyle` | **yes** | Comma-separated text-to-image style tags appended to every portrait prompt. Sets the whole genre's visual identity. |
| `tts` | **yes** | Narration voice config. See below. |
| `music` | **yes** | Background music. `{"prefix": "x", "tracks": []}` is valid — empty tracks means no music. |
| `slots` | **yes** | Slot-machine wiring. [Section 4](#4-slots--wiring-the-slot-machine). |
| `voice` | **yes** | What the AI is told. [Section 5](#5-voice--what-the-ai-is-told). |
| `data` | **yes** | All the tables. [Field reference](#the-complete-field-reference). |
| `iconBase` | no | Serve icons from another folder instead of your own. See [reskin packs](#reskin-packs-iconbase). |
| `gameplay` | no | Rule tweaks. [Section 6](#6-gameplay--optional-rule-tweaks). |
| `staticCards` | no | AI Dungeon story cards. [Section 7.16](#716-staticcards-optional-top-level). |

### `tts`

```jsonc
"tts": {
  "preprocess": "default",              // "default" | "manga" | "nihongi"
  "browser": { "rate": 1.0, "pitch": 1.0 },
  "kokoro":  { "voice": "af_bella", "speed": 1.0 },
  "openai":  { "voice": "nova", "speed": 1.0 }
}
```

`preprocess` selects text cleanup before speech — `"manga"` and `"nihongi"`
handle Japanese terms that English voices mangle. Use `"default"` unless your
genre has that problem. The three provider blocks are used only when the player
has that narration provider selected; include all three so any choice works.

### `music`

```jsonc
"music": { "prefix": "mygenre", "tracks": ["mygenre-theme.mp3"] }
```

`prefix` groups the tracks; `tracks` are filenames. In a **zip pack** these must
match files in `audio/`. In a **JSON pack** they must match files already in
`web/audio/music/` — which is how a reskin borrows a built-in genre's music.
An empty `tracks` array is fine and means silence.

---

## 4. `slots` — wiring the slot machine

`slots` does two jobs: it names the reels in the UI, and it determines the
**icon filename prefix** for each category.

| Field | Required | Purpose |
|---|---|---|
| `identityCat` | **yes** | Icon category for identity. `"FOLK"` → `icons/FOLK#river_folk.webp` |
| `identityHeader` | **yes** | Reel label shown to the player (`"Folk"`, `"Species"`, `"Crew"`) |
| `profCat` / `profHeader` | **yes** | Same, for professions |
| `econCat` / `econHeader` | **yes** | Same, for economic tier |
| `cityCat` / `cityHeader` | **yes** | Same, for setting |
| `familyCat` | **yes** | Icon category for family structures (no header — not a labelled reel) |
| `lifeEventCat` | **yes** | Icon category for life events |
| `tensionCat` | **yes** | Icon category for tensions |
| `economicTiers` | **yes** | Five reel rows — see below |
| `filterGendersToGenre` | no | Defaults off |
| `familyUsesIconSlug` | no | Defaults off |

The `*Cat` values are yours to choose. Pirate Cove uses `CREW`, `TRADE`,
`PURSE`, `PORT`, `KIN`, `YARN`, `SQUALL`; Sci-Fi uses `SPECIES`, `PROFESSIONS`,
and so on. Pick names that read well as filenames — you'll be typing them a lot.

### `slots.economicTiers`

Five rows of `[reelSlug, iconSlug, shortLabel]`:

```jsonc
"economicTiers": [
  ["tier1", "bilge",        "Bilge Rat"],
  ["tier2", "crew_share",   "Crew Share"],
  ["tier3", "boatswain",    "Boatswain"],
  ["tier4", "quartermaster","Quartermaster"],
  ["tier5", "captain",      "Captain's Cut"]
]
```

> **The first element must literally be `tier1`…`tier5`.** The engine builds
> the reel slug as `` `tier${n}` `` from the rolled tier number — it does not
> read your string. Anything else silently fails to match the reel.
> ([`engine.js`](web/generator/engine.js) does this in `_slots.econ`.)

The second element is free-form and becomes the icon filename:
`icons/PURSE#bilge.webp`. The third is the compact reel label.

### `filterGendersToGenre`

When `true`, the gender and orientation reels show **only** the ids present in
your `data.genders` / `data.orientations`. Use this for a setting that
deliberately narrows those options. When `false` or omitted, all common
genders/orientations appear regardless.

### `familyUsesIconSlug`

By default a family structure's icon is looked up by its `id` —
`icons/FAMILY#both_parents.webp`. Set this to `true` when your family icon
**filenames don't match your family ids**, and the slug is read from the entry's
`iconPath` instead.

The Neon Drift pack needs this for exactly one entry: `id: "android_origin"`
whose art lives at `FAMILY_STRUCTURES#vat_born.webp`. One mismatch is enough to
require the flag for the whole genre. **If you're authoring fresh, just name the
files after the ids and leave this off.**

---

## 5. `voice` — what the AI is told

All five fields are required. This is the only pack content that reaches the
language model, and it does more to define your genre than any data table.

| Field | Purpose |
|---|---|
| `identityLabel` | What the identity axis is *called* in the prompt — `"Race"`, `"Species"`, `"Crew"`, `"Folk"`. |
| `genreLabel` | A short phrase naming the setting, dropped into sentences: `"a small riverside town"`. |
| `openingNote` | Instruction for the scenario's opening scene. |
| `appearanceNote` | Instruction for describing physical appearance. |
| `systemPrompt` | The system prompt. Sets tone, register, and what to avoid. |

`systemPrompt` is where a genre lives or dies. Be specific about what you *don't*
want — the most common failure is an AI defaulting to generic epic-fantasy
narration regardless of setting.

> **Security note:** because `voice` reaches the model, an imported pack can
> influence the AI's behavior. That is inherent to user-authored genres, which
> is why the import UI surfaces this text for review. Read the `voice` block of
> any pack you didn't write.

---

## 6. `gameplay` — optional rule tweaks

```jsonc
"gameplay": {
  "ageRange": [15, 18],
  "allowMinorMarriage": false,
  "relationshipStatusFilter": ["single", "dating", "complicated"]
}
```

All three are optional; `{}` or omitting the block entirely is fine.

- **`ageRange`** — `[min, max]` protagonist age. Omit for the default adult range.
- **`allowMinorMarriage`** — permits married/engaged statuses for under-18
  characters. Off unless your historical setting needs it.
- **`relationshipStatusFilter`** — whitelist of relationship-status ids. The
  school-drama genre uses this to remove `married`/`widowed`, which also makes
  every partner NPC a fellow student. Omit to allow all.

---

## The complete field reference

Everything below lives under `data`. **Fifteen keys are required**, and the
loader names any that are missing.

`iconPrompt` and `iconPath` are optional on every table. `iconPrompt` is the
text-to-image prompt used by the icon generation scripts — it is **never read at
runtime**, it exists only so your art is reproducible. `iconPath` is where the
finished image lives. Omit both and the entry shows a ⚙ gear placeholder.

### 7.1 `races` (or `identities`) — **required, non-empty**

> **"Race" is deliberately loose here.** It's whatever axis your setting sorts
> people by, and it means something different in every built-in genre:
>
> | Genre | What this table actually holds |
> |---|---|
> | Modern | ethnicity — literal human populations |
> | Sci-Fi | species — humans, androids, uplifts, aliens |
> | Osaka HS '87 | school clique — a social tribe, not ancestry at all |
> | Paleolithic | tribe — regional adaptation and culture |
>
> It's ultimately just text handed to the AI, so it doesn't need a strict
> definition — pick the axis your genre cares about. That's why the key can be
> spelled `identities` instead of `races`; the two are identical and you should
> use whichever reads honestly for your setting. `slots.identityHeader` is what
> players actually see on the reel ("Species", "Crew", "Folk"), so it doesn't
> have to say "Race" either.

```jsonc
{ "id": "river_folk", "broad": "River Folk",
  "flavor": "River folk — grew up on the water, reads weather by the smell of it",
  "weight": 10, "iconPrompt": "…", "iconPath": "…" }
```

| Field | Required | Purpose |
|---|---|---|
| `id` | yes | Unique slug; the icon filename stem (`FOLK#river_folk.webp`) |
| `broad` | yes | **The `namePools` lookup key.** Several ids may share one `broad`. |
| `flavor` | yes | Character detail sent to the AI in full |
| `weight` | yes | Relative roll frequency. Higher = commoner. Not a stat bonus. |

> **`flavor` is truncated in the UI at the first ` — ` (space em-dash space).**
> The slot-machine sub-label and the character-sheet header both show only the
> text before it. Put a short punchy phrase first, then the em-dash, then the
> detail. A long `flavor` with no em-dash displays *in full* and overflows.

Identity carries **no stat affinity** anywhere in FateVend — who you are is not
correlated with what you're good at. That's deliberate; don't look for the field.

#### Subclassing: one `broad`, many variants

The `id` / `broad` split is how you get sub-types. Several entries share one
`broad` — which keeps them on one name pool and one cultural identity — while
each `id` names a specific variant. The convention across the built-ins is
`<group>_<variant>`, **underscore, not hyphen**, matching the icon filename:

```jsonc
{ "id": "android_standard",   "broad": "Android", "flavor": "Plastic Android — human-shaped but obviously synthetic …" }
{ "id": "android_industrial", "broad": "Android", "flavor": "Industrial Android — purpose-built for heavy labor …" }
{ "id": "android_combat",     "broad": "Android", "flavor": "Combat Android — purpose-built for combat …" }
```

Sci-Fi does this heavily: 22 entries collapse into 8 `broad` groups (9 Aliens,
4 Androids, 2 Cyborgs…). Note the variant's display name leads the `flavor` string,
before the em-dash — that's what becomes the reel sub-label, so *"Plastic
Android"* is what a player reads while `android_standard` is only ever the
filename and internal key.

#### Optional mechanical fields

Three optional fields turn a variant from flavor text into an actual rules
difference. Omit them all and nothing changes; most genres never need them.

| Field | Effect |
|---|---|
| `syntheticType` | `"industrial"` forces the character genderless (it/its), asexual and single, and drops body description. `"plastic"` keeps the rolled gender as pure outward appearance but still forces asexual and single. `"biomechanical"` sets no overrides — it's a marker your `voice` can special-case. |
| `nonHumanoidBody` | `true` suppresses hair, distinguishing feature and physique notes — for bodies where human descriptors are nonsense (Sci-Fi's slug, vapor and plant aliens all set it). |
| `allowedIndustries` | Array of `industry` values this identity may take professions from. Sci-Fi's industrial android is restricted to Logistics, Salvage, Settlement, Shipping & transit, Transit and Security. If the filter would leave no professions at all, the engine falls back to the full pool rather than failing. |

`syntheticType` is also passed through to the AI prompt, so a genre's `voice`
can write per-subtype output rules without the engine knowing about them.

### 7.2 `professions` — **required**

```jsonc
{ "title": "Ferryman", "industry": "River trade", "economicTier": 2,
  "statAffinity": { "strength": 1.2, "wisdom": 1.1 },
  "sentiments": ["content", "tired", "proud"] }
```

| Field | Required | Purpose |
|---|---|---|
| `title` | yes | Display name; also the icon slug source |
| `industry` | yes | **Must match a key in `tagPools.professionTags`** |
| `economicTier` | yes | 1–5; the tier this job usually lands in |
| `sentiments` | yes | Pool of feelings-about-the-job; one is rolled per character |
| `statAffinity` | no | Multipliers, e.g. `{"strength": 1.2}`. Omitted = no bias. |
| `allowedGenders` | no | Restrict this job to specific gender ids. Omitted = open to all. |

Note there's no `id` — professions are keyed by `title`.

`allowedGenders` exists for roles a setting genuinely gates by gender — Joseon's
`King (Wang)` is `["man", "trans_man"]`, Paleolithic's `Midwife` is
`["woman", "trans_woman"]`. Non-binary characters bypass the restriction
entirely, so it never blocks them out of the profession pool. Use it sparingly;
it's for hereditary or biologically-defined roles, not for stereotyping ordinary
jobs.

### 7.3 `lifeEvents` — **required**

```jsonc
{ "id": "lost_the_boat", "toneTag": "dramatic",
  "description": "Lost the family boat in a flood and has never quite replaced it",
  "statAffinity": {…}, "economicHint": 2 }
```

| Field | Required | Purpose |
|---|---|---|
| `id` | yes | Unique slug; icon filename stem |
| `description` | yes | The event, sent to the AI |
| `toneTag` | yes | Needs a matching `tagPools` key |
| `statAffinity` | no | Stat multipliers |
| `economicHint` | no | Nudges the rolled economic tier up or down |
| `forcedIndustries` | no | Overrides the profession pool entirely |

`forcedIndustries` is the strongest hook in the table: it takes priority over the
identity's own `allowedIndustries`, letting a life event decide the career
outright. Joseon uses it for `palace_selection` → `["Palace Service"]` — being
chosen for the palace *is* the job. Same empty-result safety as
`allowedIndustries`: if nothing matches, the full pool is used instead.

### 7.4 `tensions` — **required**

```jsonc
{ "id": "debt_to_miller", "toneTag": "gritty", "criminalFlag": false,
  "description": "Owes the miller more than a year of work…" }
```

The character's active problem — the engine of the opening scene. `criminalFlag:
true` mixes `tagPools.criminal` into the scenario tags. `statAffinity` optional.

### 7.5 `secrets` — **required**

```jsonc
{ "id": "wrong_body", "toneTag": "dramatic", "severity": "high",
  "criminalFlag": false, "description": "Pulled a body from the river last spring…" }
```

`severity` is `"low" | "medium" | "high" | "explosive"`.

**Secrets have no reel**, so no `iconPrompt`/`iconPath`.

### 7.6 `familyStructures` — **required**

```jsonc
{ "id": "both_parents", "label": "Both parents living, house too small",
  "parentCount": 2, "siblingCount": [1, 3], "toneTag": "cozy",
  "parentGender": "mother", "notes": "…", "economicHint": 3 }
```

| Field | Required | Purpose |
|---|---|---|
| `parentCount` | yes | `0`, `1`, or `2` — how many parent NPCs get built |
| `siblingCount` | yes | `[min, max]`, resolved per character |
| `label` | yes | Shown on the sheet and sent to the AI |
| `parentGender` | no | For `parentCount: 1`, which parent |
| `notes` | no | Extra context for the AI |

### 7.7 `parentStatuses` / `siblingDynamics` — **required**

```jsonc
{ "id": "steady", "label": "steady, undemonstrative, always there", "toneTag": "cozy" }
```

Flavor text for rolled family NPCs. No reels, no icons needed.

### 7.8 `citySettings` — **required**

```jsonc
{ "id": "the_wharf", "label": "The Wharf", "toneTag": "gritty",
  "flavor": "Tar, rope, and shouting; the town's whole economy in fifty yards" }
```

Where the character lives. `toneTag` drives tag selection. `statAffinity` optional.

### 7.9 `economicTiers` — **required, and it's an object**

An **object keyed `"1"` through `"5"` as strings** — not an array:

```jsonc
"economicTiers": {
  "1": { "label": "Pauper",
         "descriptors": ["sleeps in the boathouse"],
         "housing": ["a corner of someone else's shed"],
         "transport": ["on foot, always"] },
  … "2" … "3" … "4" … "5" …
}
```

All five keys must exist. `descriptors`, `housing` and `transport` are pools —
one of each is rolled per character. Give each 3–5 options or every wealthy
character lives in the same house.

Don't confuse this with `slots.economicTiers`, which is the *reel* config.
Both are required and they are different things.

### 7.10 `plotArchetypes` — **required**

```jsonc
{ "id": "the_flood", "label": "The Flood", "weight": 6,
  "description": "The water is rising and someone has to decide what gets saved…" }
```

`description` becomes the primary story engine in the AI prompt.

> Your archetypes are **added to** the shared common pool, not replacing it.
> Five common archetypes are always available, so a pack with one archetype
> actually rolls from six. Only add archetypes that need your genre's specifics.

### 7.11 `tagPools` — **required**

```jsonc
"tagPools": {
  "always": ["small-town", "character-driven"],
  "cozy": ["warm", "community"],
  "gritty": ["hard-luck", "debt"],
  "dramatic": ["secrets", "reckoning"],
  "neutral": ["slice-of-life"],
  "criminal": ["smuggling", "crime"],
  "professionTags": { "River trade": ["boats", "water"], "Food": ["bread", "trade"] }
}
```

- `always` — tags on every scenario
- **one key per `toneTag` you use anywhere** in `citySettings` or `tensions`.
  The lookup is dynamic, not a fixed enum — invent your own tone tags freely,
  just define a matching pool for each.
- `criminal` — mixed in when a rolled tension or secret has `criminalFlag: true`
- `professionTags` — **keyed by `industry`, never by `title`**

### 7.12 `namePools` — **required**

```jsonc
"namePools": {
  "River Folk": { "masc": [...], "fem": [...], "neutral": [...], "last": [...] },
  "default":    { "masc": [...], "fem": [...], "neutral": [...], "last": [...] }
}
```

Keyed by the **`broad`** value from `races` — not by `id`.

**A `"default"` pool is mandatory.** Any `broad` without its own pool falls back
to it, so a missing key produces oddly-named characters rather than an error.

Give each pool at least 30–50 first names per gender and 30+ surnames, or
repeats show up within a handful of rolls.

### 7.13 `distinguishingFeatures` — **required**

```jsonc
{ "id": "rope_scars", "label": "rope scars across both palms" }
```

The engine already rolls "no distinguishing feature" about 25% of the time, so
you don't need to pad the list with empty entries.

### 7.14 `quirks` — **required**

```jsonc
{ "id": "counts_knots", "statAffinity": { "dexterity": 1.2 },
  "quirk": "Ties and unties a knot while thinking, without noticing they're doing it" }
```

Note the field is `quirk`, not `label`. Behavioral tics do more for a character
feeling alive than any stat — write plenty.

### 7.15 `genders` / `orientations` / `builds` / `hair` — optional

Omit all four and your pack inherits the common tables (6 genders, 6
orientations, 11 builds, 41 hair options). Only override for a setting that
genuinely needs different options.

### 7.16 `staticCards` (optional, top-level)

Note this one is a **sibling of `data`, not inside it** — a common slip.

AI Dungeon story cards exported with every scenario:

```jsonc
"staticCards": {
  "STATIC_CHARACTERS": [], "STATIC_CLASSES": [], "STATIC_RACES": [],
  "STATIC_LOCATIONS": [],  "STATIC_FACTIONS": [], "STATIC_CUSTOM": []
}
```

Each entry is exactly `{ name, triggers, entry }`:

```jsonc
{ "name": "Pilot",
  "triggers": "Pilot, Freighter Pilot, Navigator",
  "entry": "Anyone who's actually flown a ship…" }
```

`triggers` is a **comma-separated string**, not an array. Don't add a `type`
field — the importer derives it from which array the entry is in. Don't rename
`triggers` to `keys`. Any of the six keys may be omitted; each defaults to empty.

---

## 8. Icons and audio

### Zip layout

```
my-genre.zip
├── manifest.json
├── icons/
│   ├── _genre.webp              ← carousel cover
│   ├── FOLK#river_folk.webp     ← CATEGORY#slug.webp
│   ├── TRADE#ferryman.webp
│   └── PLOT_ARCHETYPES#the_flood.webp
└── audio/
    └── mygenre-theme.mp3        ← must match music.tracks
```

`CATEGORY` comes from your `slots.*Cat` values; the slug is the entry's `id`
(or `title` for professions, or the `slots.economicTiers` middle element). The
`#` is literal — it's in the actual filename.

`_genre.webp` is the carousel cover. Without it the card shows a placeholder.

Zip assets load as blob URLs and take priority over every other path.

### Reskin packs (`iconBase`)

A JSON-only pack with no bundled art can borrow another served folder's icons:

```jsonc
"iconBase": "generator/genres/sci-fi/icons/"
```

Your icon lookups then resolve against that folder. This only works if you keep
that genre's **category names and slugs** — which is exactly what a reskin is.
`sample-neon-drift.json` renders all of Sci-Fi's art this way with zero assets.

### Generating art

`web/genre-packs/generate-icons.py` reads `iconPrompt`/`iconPath` pairs and
generates images via Stable Diffusion or Gemini. It never overwrites an existing
icon, so it's safe to re-run for just the missing ones. Write good `iconPrompt`
values as you author — that's what makes the art reproducible later.

---

## 9. Five mistakes that fail silently

The loader catches missing fields. These five are *structurally valid* and
produce a pack that imports cleanly and then behaves oddly.

1. **`professionTags` keyed by `title` instead of `industry`.** Matches nothing;
   scenarios lose their profession tags. Both example packs shipped with this
   bug at one point.
2. **No `"default"` name pool**, or a `broad` value with no pool and no default.
   Characters get names from the wrong culture instead of an error.
3. **`economicTiers` as an array, or keyed by numbers instead of strings.**
   Must be an object with `"1"`–`"5"` as string keys.
4. **A `toneTag` with no matching `tagPools` key.** Any tone tag you use in
   `citySettings` or `tensions` needs a pool of the same name, or those
   scenarios come out under-tagged.
5. **`flavor` with no ` — ` separator.** It's shown in full in the UI instead of
   truncating to a short label, and overflows the reel.

A sixth, less silent: `slots.economicTiers` rows not starting with
`tier1`…`tier5` — the economy reel just won't match.

---

## 10. The two shipped examples

Both live in [`web/genre-packs/`](web/genre-packs/) and both are reproducible —
each has a build script that regenerates it.

### `sample-neon-drift.json` — the reskin

A JSON-only pack derived from Sci-Fi. Its whole trick is `iconBase`, pointing at
Sci-Fi's icon folder so it renders finished art while shipping no assets.

Read it for: the reskin pattern, `familyUsesIconSlug: true` in a real case, and
a full-size data set (22 identities, 42 professions) to calibrate scale against.

Rebuild with `node web/genre-packs/build-neon-drift-pack.mjs`. Because it's a
snapshot of Sci-Fi's live data, it **must** be regenerated when Sci-Fi changes or
it references species that no longer exist.

### `example-pirate-cove.zip` — the self-contained pack

A `.zip` bundling its own `icons/` and `audio/`. Uses fully custom slot
categories (`CREW`, `TRADE`, `PURSE`, `PORT`, `KIN`, `YARN`, `SQUALL`) — good
proof that the `*Cat` names really are yours to pick.

Read its builder, `build-example-pack.py`, for: the zip layout, the
`[reelSlug, iconSlug, label]` economic-tier tuples, and per-table shape comments
on every field. Rebuild with `python3 web/genre-packs/build-example-pack.py`.

---

## 11. Testing your pack

**Import it.** Settings → Genre Packs → choose your file. Invalid packs are
rejected with a list naming every problem; nothing half-installs.

**Roll thirty characters.** Most authoring bugs are boredom bugs, and they only
show up in volume — repeated names (pools too small), the same house every time
(thin `housing`), every character in one profession (weights).

**Check the reels.** A ⚙ gear means that entry's icon didn't resolve: wrong
category prefix, wrong slug, or a filename that doesn't match the `id`.

**Read one full generated scenario.** This is where `voice.systemPrompt`
problems surface — if it reads like generic fantasy regardless of your setting,
the system prompt isn't specific enough about what to avoid.

**Reload the page.** Installed packs persist in IndexedDB and re-register on
load. If your pack vanishes, it didn't install.

Packs are hot-swappable — edit the file, remove the pack, re-import. No restart.

---

## 12. Shipping a genre in the repo instead

Everything above describes a **pack** — data-only, imported at runtime, no
source edits. That's the recommended path and what most genres should be.

A **built-in** genre lives in the repo as JavaScript modules under
`web/generator/genres/<id>/`. It's more work and requires a pull request, but it
buys two things a pack cannot have:

- **`outputRules(sk)` — a real function.** Every built-in authors its own
  "OUTPUT RULES" prompt body as code, so it can branch on the rolled character
  (Sci-Fi suppresses body description for an industrial-chassis android, for
  instance). A pack is pure data, so it supplies `openingNote` +
  `appearanceNote` strings and the builder falls back to a generic body
  (`GENERIC_OUTPUT_RULES` in `prompt-builder.js`). All seven built-ins use the
  function form.
- **CLI availability.** The CLI reads the compiled-in registry, so only
  built-ins are reachable from it. Packs live in browser storage.

The data tables are the *same shapes* documented above — the built-ins just
write them as `.js` modules with header comments instead of JSON. So the fastest
route is still to author and iterate as a pack, then convert once you're happy.

### Wiring it in

Create `web/generator/genres/<id>/` mirroring an existing genre's modules
(`character-attributes.js`, `professions.js`, `life-events.js`,
`family-structures.js`, `tensions.js`, `secrets.js`, `settings.js`, `names.js`,
`plot-archetypes.js`, `static-cards.js`, `voice.js`, `icons/`), then register it
at four sites:

| File | What to add |
|---|---|
| `generator/registry.js` | Import the tables, add a `GENRE_TABLES['<id>']` entry. `SUPPORTED_GENRES` derives from its keys automatically. |
| `generator/manifests.js` | `GENRE_MANIFESTS['<id>']`, `GENRE_VOICE['<id>']` (importing `SYSTEM_PROMPT` + `outputRules` from your `voice.js`), and the id in `CAROUSEL_ORDER` |
| `generator/ui-data.js` | `STATIC_CARDS_BY_GENRE['<id>']` — AI Dungeon story cards |
| `genres/<id>/icons/` | A `generate_icons.py` wrapper, matching the other genres' |

Per `CLAUDE.md`, every data module needs a header comment documenting **every**
property it uses — that rule is not optional for these files, because the
properties are consumed generically several layers away and the header is the
only place the shape is written down.

The engine, carousel, slot machine, TTS and music are all data-driven, so a new
genre needs **no `index.html` edits**. The Claude Code **`/add-genre`** skill
walks the whole path step by step.

---

## Sharing your pack

A pack is a single file. Post it, attach it to an issue, or open a PR adding it
to `web/genre-packs/` — if you do the latter, add an entry to
[`index.json`](web/genre-packs/index.json) so it appears in the in-app
"Download a pack" list.

Because packs carry no executable code, importing one is safe. The exception
worth stating plainly: `voice` reaches the language model, so read that block of
any pack you didn't write.

---

## See also

- [`.claude/docs/features/genre-packs/DESIGN.md`](.claude/docs/features/genre-packs/DESIGN.md)
  — implementation internals: how registration, persistence and blob assets work.
- [`web/generator/pack-loader.js`](web/generator/pack-loader.js) — the validator.
  The definitive answer to "is this field required?"
- [`web/generator/genres/`](web/generator/genres/) — the built-in genres' data
  tables. Same entry shapes, with full header comments on every file.
