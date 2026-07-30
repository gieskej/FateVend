# FateVend design guide

The visual rules for `web/styles.css`. **Text size and color must come from the
tokens below — do not write a raw `font-size` or `color` value in a rule.** If
something genuinely needs a value the scale doesn't have, add it to the scale
here first so the next person inherits the decision.

## Why this exists

Before this guide the stylesheet had grown 94 `font-size` declarations across 23
distinct values (49 of them `0.8rem`, plus a scattershot of 0.72 / 0.75 / 0.82 /
0.83 / 0.85 / 0.88 / 0.9 / 0.92 / 0.95) and 14 distinct text colors — including
`--ink-dark`, which was used but never defined. Nothing was obviously wrong at
any single call site; the drift only showed up as "too many sizes and colors".

---

## The two surfaces

The app has two grounds, and the same semantic role is a different color on
each. This is the single most important thing to understand before editing CSS.

| Surface | Where | Ground |
|---|---|---|
| **Chrome** (default) | toolbar, genre carousel, settings modal, audio player, status bar, page background | dark browns |
| **Parchment** | `.card` (character sheet, cast, AI output) and `.help-panel` | light cream |

The four text roles are defined for chrome in `:root` and **redefined inside
`.card` and `.help-panel`**. So every rule just writes `color:
var(--text-standard)` and the surface decides the actual hex — the same
mechanism as light/dark theming.

Adding a new light-background panel? Add its selector to that redefinition block
in `styles.css`, or nest it inside `.card` — otherwise it will inherit chrome
colors and render nearly invisible on cream.

---

## Text colors

Four roles. Use the semantic name, never the raw palette name (`--gold`,
`--ink-faint`, …) — the palette still exists, but it describes *pigment*, not
*purpose*, and a rule that names pigment can't follow its surface.

| Token | Purpose | Chrome | Parchment |
|---|---|---|---|
| `--text-title` | Headings, card titles, section headers | `--gold` | `--brass-dark` |
| `--text-standard` | Body copy, form values — **the default** | `--brass-light` | `--ink` |
| `--text-highlight` | The one thing that matters in a block: active state, emphasized value | `--gold-light` | `--rust` |
| `--text-dim` | Supporting text: captions, meta, hints, disabled | `--brass-dark` | `--ink-faint` |

Plus one role that isn't about the page ground at all:

| `--text-on-accent` | Light text on a **mid/dark brass fill** — a hovered button, a card's header bar, a severity pill. |
| `--text-on-bright` | Dark text on a **bright brass→gold fill** — the Spin The Reels CTA, the settings modal header, primary buttons. Light text washes out on these. |

Both are identical on chrome and parchment: what they must contrast with is the
fill, not the page underneath. Pick between them by how bright the fill is.

### The two allowed exceptions

1. **Status colors** — `--rust` (error/danger) and `--verdigris` (success) are
   the same on both surfaces. They signal *state*, not hierarchy; never reach
   for them as a decorative accent.
2. **Hover accents and decorative glyphs** may use pigment names (`--brass`,
   `--copper`) directly — the gear glyphs flanking the site header, the ⚙
   placeholder on a missing genre card, `:hover` color shifts. These aren't
   text hierarchy, so forcing them into a role would misrepresent them. Body
   and label text never gets this exemption.

**Rule of thumb:** if you're about to use `--text-highlight` more than once in a
block, none of it is highlighted. Pick the single most important thing.

---

## Text sizes

`html` is `17px`, so **`1rem` = 17px**. (This used to be set on `body`, which
left `rem` resolving against the browser's 16px root — every `rem` in the file
was quietly 6% smaller than whoever wrote it intended.)

| Token | Size | Use for |
|---|---|---|
| `--text-xs` | `0.75rem` · ~13px | Badges, counters, char limits. Never prose. |
| `--text-sm` | `0.85rem` · ~14px | UI chrome only: buttons, field labels, meta rows, tabs |
| `--text-base` | `1rem` · 17px | **All body and reading text.** The default. |
| `--text-lg` | `1.15rem` · ~20px | Sub-headings, card titles |
| `--text-xl` | `1.4rem` · ~24px | Section headings |
| `--text-2xl` | `1.9rem` · ~32px | Page-level headings |
| `--text-display` | `clamp(1.8rem, 5vw, 3rem)` | The site title only |

**Body text is `--text-base`.** Anything a person actually reads — prose,
descriptions, character details, help text, cast dynamics — is `--text-base`. It
was the drift into `0.8rem` for reading content that made the app feel cramped.

`--text-sm` is for interface furniture, not content. The test: if it's a
sentence, it's `--text-base`; if it's a label on a control, it's `--text-sm`.

**Headings are always larger than the body text they head** — that's the rule,
not a fixed floor, because the app has two heading idioms:

- *Uppercase small-caps titles* ("Rolled Character Sheet", settings group
  headings) — `--text-base` with `letter-spacing`. The caps treatment already
  reads as a heading; sizing these up as well makes them shout.
- *Mixed-case content headings* (a cast member's name, an NPC section) —
  `--text-lg` or larger, since they have no caps treatment doing that work.

Two deliberate exceptions, both outside the scale:
- the disclaimer in the status bar, which is intentionally fine print
- `.slot-emoji`, sized to fill the slot window as artwork rather than text

---

## Weight, case, and spacing

- Weights: **400** (body), **600** (labels, buttons, emphasis), **700**
  (headings). Nothing else — no `bold` keyword, no 500/800.
- The uppercase + `letter-spacing` small-caps treatment is the app's label
  idiom. Keep it for labels, tabs, buttons and headings; never for prose,
  where it hurts readability.
- Letter-spacing pairs with uppercase. Don't letter-space lowercase body text.

---

## Fonts

- `--font-display` (Cinzel) — headings, titles, labels, buttons.
- `--font-body` (Crimson Pro) — prose, form values, everything read in sentences.

---

## Checklist before committing CSS

1. No raw `font-size` — a `--text-*` token instead.
2. No raw `color` for text — a `--text-*` token instead (status colors excepted).
3. Reading content is `--text-base`, not `--text-sm`.
4. New light-background container? Added to the parchment token block.
5. `npm test` green — the mobile suite enforces tap-target and overflow rules
   that font-size changes can break.
