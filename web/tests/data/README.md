# data-integrity tests

Pure Node, no browser, no dev server, no network — imports `generator/index.js`
and `generator/registry.js` directly. Both checks run in well under a second
combined, which is why they're folded into the default `npm test` ahead of the
Playwright suite in `../e2e/`.

```bash
npm run test:data   # just this tier
npm test            # this tier, then the e2e tier
```

## Files

| File | What it checks |
|---|---|
| `icon-files.mjs` | Every entry with an `iconPath`, in every table, in every built-in genre — not a sample, all of them — resolves to a real file on disk. |
| `bulk-roll.mjs` | Rolls 50 skeletons per genre (`skipAI: true`) and checks (a) every skeleton has the fields the app assumes exist, and (b) any rolled tension/secret whose own table entry declares `requiredProfessions`/`excludedProfessions` was actually respected by the roll. |

## Why exhaustive rather than sampled

`icon-files.mjs` walks every table entry instead of relying on rolls to
happen to hit one, because a low-weight (rare) entry's broken icon can hide
behind randomness for a long time otherwise — which is exactly how the
`alien_slug` iconPath bug (pointing at a since-renamed file) and the stale
sample-pack bugs went unnoticed earlier this session. `bulk-roll.mjs` still
rolls (fields like profession-restriction consistency are about *combinations*
that only exist once something is actually generated), but 50/genre is enough
to exercise the mechanism without needing a browser or taking more than a
fraction of a second.

## Why generic, not genre-specific

`bulk-roll.mjs`'s profession-restriction check reads `requiredProfessions`/
`excludedProfessions` directly off whatever table entry got rolled — it
doesn't hardcode Joseon's rules. Today only Joseon's `tensions.js`/`secrets.js`
use these fields, so in practice this check only ever exercises Joseon data,
but any other genre adopting the same declarative mechanism gets covered for
free, with no changes needed here.
