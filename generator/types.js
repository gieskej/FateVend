// generator/types.js
// Shared type definitions (JSDoc @typedef).
// Import this file in any module that needs type annotations.
// This file exports nothing at runtime — it exists only for documentation.

/**
 * @typedef {Object} StatBlock
 * @property {number} strength       1–100
 * @property {number} intelligence   1–100
 * @property {number} wisdom         1–100
 * @property {number} charisma       1–100
 * @property {number} dexterity      1–100
 * @property {number} constitution   1–100
 */

/**
 * @typedef {Object} MBTIResult
 * @property {string} type   e.g. 'INTJ'
 * @property {string} label  e.g. 'The Architect'
 */

/**
 * @typedef {Object} AppearanceSkeleton
 * @property {string} build                   e.g. 'lean, wiry'
 * @property {string} hair                    e.g. 'close-cropped or shaved'
 * @property {string|null} distinguishingFeature  e.g. 'a scar across the face or jaw' | null
 */

/**
 * @typedef {Object} NPCSkeleton
 * @property {string}   name
 * @property {string}   role      e.g. 'best friend', 'older sibling', 'mother', 'rival'
 * @property {string}   status    e.g. 'present and close', 'estranged', 'deceased'
 * @property {string[]} traits    2–3 short trait descriptors
 * @property {string}   dynamic   one-line relationship dynamic to protagonist
 */

/**
 * @typedef {Object} CharacterSkeleton
 * @property {string}            name
 * @property {number}            age
 * @property {string}            gender              e.g. 'Man', 'Woman', 'Non-binary'
 * @property {string}            pronouns            e.g. 'he/him', 'they/them'
 * @property {string}            orientation         e.g. 'Bisexual'
 * @property {string}            ethnicityBroad      e.g. 'Latino'
 * @property {string}            ethnicityFlavor     e.g. 'Puerto Rican'
 * @property {AppearanceSkeleton} appearance
 * @property {string}            quirk               one behavioral or physical tell
 * @property {StatBlock}         stats
 * @property {string}            mbti                e.g. 'INTJ'
 * @property {string}            mbtiLabel           e.g. 'The Architect'
 * @property {string}            profession
 * @property {string}            industry
 * @property {number}            economicTier        1–5
 * @property {string}            economicLabel       e.g. 'Working poor'
 * @property {string[]}          economicMarkers     2–3 concrete detail strings
 * @property {string}            housing
 * @property {string}            transport
 * @property {string}            cityLabel           e.g. 'A port city'
 * @property {string}            cityFlavor
 * @property {string}            sentiment           how they feel about their job
 * @property {string}            lifeEvent           formative past event description
 * @property {string}            tension             current inciting situation
 * @property {string}            secret              the hidden thing
 * @property {string}            secretSeverity      'low' | 'medium' | 'high' | 'explosive'
 * @property {string[]}          tags                8–10 scenario tags
 * @property {NPCSkeleton[]}     cast
 */

/**
 * @typedef {Object} GeneratedOutput
 * The parsed result from the Claude API call.
 * @property {string}              characterEntry   AI Dungeon character entry for protagonist (≤1000 chars)
 * @property {Record<string,string>} npcEntries     Keyed by NPC name; each ≤1000 chars
 * @property {string}              title            Scenario title (≤70 chars)
 * @property {string}              description      Scenario description (≤5000 chars)
 * @property {string[]}            tags             8–10 lowercase tag strings
 * @property {string}              opening          Scenario opening (≤4000 chars)
 */

/**
 * @typedef {Object} GeneratedCharacter
 * The full return value from generateCharacter().
 * @property {CharacterSkeleton}    skeleton   The raw resolved skeleton (always present)
 * @property {GeneratedOutput|null} output     AI-generated narrative fields (null if skipAI=true)
 */

/**
 * @typedef {Object} GenerateOptions
 * @property {string}  [genre='modern']  Genre key — must match a folder under /genres
 * @property {string}  [apiKey]          Anthropic API key — required unless skipAI=true
 * @property {boolean} [skipAI=false]    If true, returns skeleton only without calling Claude
 */
