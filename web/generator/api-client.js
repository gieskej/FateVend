// generator/api-client.js
// Handles the Anthropic Claude API call and parses the response.
// Uses only fetch — works in browser, Node 18+, and AI Dungeon's scripted JS.
//
// No browser APIs beyond fetch. No Node-specific APIs. Pure JS + fetch.

import {
  SYSTEM_PROMPT as MODERN_SYSTEM_PROMPT,
  buildPrompt   as modernBuildPrompt,
  parseResponse as modernParseResponse,
} from './genres/modern/prompt-template.js';

import {
  SYSTEM_PROMPT as FANTASY_SYSTEM_PROMPT,
  buildPrompt   as fantasyBuildPrompt,
  parseResponse as fantasyParseResponse,
} from './genres/fantasy/prompt-template.js';

import {
  SYSTEM_PROMPT as SCIFI_SYSTEM_PROMPT,
  buildPrompt   as scifiBuildPrompt,
  parseResponse as scifiParseResponse,
} from './genres/sci-fi/prompt-template.js';

import {
  SYSTEM_PROMPT as PALEO_SYSTEM_PROMPT,
  buildPrompt   as paleoBuildPrompt,
  parseResponse as paleoParseResponse,
} from './genres/paleolithic/prompt-template.js';

const ANTHROPIC_API_URL = 'https://api.anthropic.com/v1/messages';
const MODEL             = 'claude-sonnet-4-5';
const MAX_TOKENS        = 8192;

// ── OUTPUT LIMITS ─────────────────────────────────────────────────────────
// AI Dungeon field limits: https://help.aidungeon.com
const LIMITS = {
  characterEntry:   1000,
  title:              70,
  description:      5000,
  opening:          4000,
  appearancePrompt:  500,
  plotEssentials:   2000,
  npcEntry:         1000,
  tags:               10,
};

function smartTruncate(text, maxLen) {
  if (!text || text.length <= maxLen) return text;
  const sub = text.slice(0, maxLen);
  if (maxLen >= 200) {
    const sentEnd = Math.max(
      sub.lastIndexOf('. '), sub.lastIndexOf('! '), sub.lastIndexOf('? '),
      sub.lastIndexOf('.\n'), sub.lastIndexOf('!\n'), sub.lastIndexOf('?\n')
    );
    if (sentEnd > maxLen * 0.7) return text.slice(0, sentEnd + 1).trimEnd();
  }
  const wordEnd = sub.lastIndexOf(' ');
  if (wordEnd > maxLen * 0.5) return text.slice(0, wordEnd).trimEnd() + '…';
  return sub.trimEnd() + '…';
}

function enforceOutputLimits(output) {
  if (!output) return output;
  const npcEntries = {};
  for (const [k, v] of Object.entries(output.npcEntries ?? {})) {
    npcEntries[k] = smartTruncate(String(v), LIMITS.npcEntry);
  }
  return {
    ...output,
    characterEntry:   smartTruncate(output.characterEntry,   LIMITS.characterEntry),
    title:            smartTruncate(output.title,            LIMITS.title),
    description:      smartTruncate(output.description,      LIMITS.description),
    opening:          smartTruncate(output.opening,          LIMITS.opening),
    appearancePrompt: smartTruncate(output.appearancePrompt, LIMITS.appearancePrompt),
    plotEssentials:   smartTruncate(output.plotEssentials,   LIMITS.plotEssentials),
    tags:             (output.tags ?? []).slice(0, LIMITS.tags),
    npcEntries,
  };
}

// ── PROMPT TEMPLATE REGISTRY ──────────────────────────────────────────────

const PROMPT_TEMPLATES = {
  modern: {
    systemPrompt:  MODERN_SYSTEM_PROMPT,
    buildPrompt:   modernBuildPrompt,
    parseResponse: modernParseResponse,
  },
  fantasy: {
    systemPrompt:  FANTASY_SYSTEM_PROMPT,
    buildPrompt:   fantasyBuildPrompt,
    parseResponse: fantasyParseResponse,
  },
  'sci-fi': {
    systemPrompt:  SCIFI_SYSTEM_PROMPT,
    buildPrompt:   scifiBuildPrompt,
    parseResponse: scifiParseResponse,
  },
  paleolithic: {
    systemPrompt:  PALEO_SYSTEM_PROMPT,
    buildPrompt:   paleoBuildPrompt,
    parseResponse: paleoParseResponse,
  },
};

/**
 * Calls the Claude API with the assembled character skeleton
 * and returns the parsed narrative output.
 *
 * @param {import('./types.js').CharacterSkeleton} skeleton
 * @param {string} apiKey   Anthropic API key (sk-ant-...)
 * @param {string} [genre='modern']
 * @returns {Promise<import('./types.js').GeneratedOutput>}
 * @throws {Error} on HTTP error or parse failure
 */
export async function callClaudeAPI(skeleton, apiKey, genre = 'modern') {
  const template = PROMPT_TEMPLATES[genre] ?? PROMPT_TEMPLATES.modern;

  const userPrompt = template.buildPrompt(skeleton);

  const requestBody = {
    model:      MODEL,
    max_tokens: MAX_TOKENS,
    system:     template.systemPrompt,
    messages: [
      { role: 'user', content: userPrompt },
    ],
  };

  const response = await fetch(ANTHROPIC_API_URL, {
    method:  'POST',
    headers: {
      'Content-Type':            'application/json',
      'x-api-key':               apiKey,
      'anthropic-version':       '2023-06-01',
      'anthropic-dangerous-direct-browser-access': 'true',
    },
    body: JSON.stringify(requestBody),
  });

  if (!response.ok) {
    const errorText = await response.text().catch(() => '(no body)');
    throw new Error(`Anthropic API error ${response.status}: ${errorText}`);
  }

  const data = await response.json();

  // Extract raw text from the response content blocks
  const rawText = data.content
    ?.filter(block => block.type === 'text')
    .map(block => block.text)
    .join('') ?? '';

  if (!rawText) {
    throw new Error('Anthropic API returned an empty response');
  }

  const parsed = template.parseResponse(rawText);

  if (!parsed) {
    throw new Error('Failed to parse Claude response as JSON');
  }

  return enforceOutputLimits(parsed);
}

const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent';

/**
 * Calls the Google Gemini API with the assembled character skeleton.
 *
 * @param {import('./types.js').CharacterSkeleton} skeleton
 * @param {string} apiKey   Google Gemini API key (AIza...)
 * @param {string} [genre='modern']
 * @returns {Promise<import('./types.js').GeneratedOutput>}
 * @throws {Error} on HTTP error or parse failure
 */
export async function callGeminiAPI(skeleton, apiKey, genre = 'modern') {
  const template = PROMPT_TEMPLATES[genre] ?? PROMPT_TEMPLATES.modern;

  const response = await fetch(`${GEMINI_API_URL}?key=${encodeURIComponent(apiKey)}`, {
    method:  'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      systemInstruction: { parts: [{ text: template.systemPrompt }] },
      contents: [{ role: 'user', parts: [{ text: 'Return raw JSON only — no markdown, no code fences, no commentary.\n\n' + template.buildPrompt(skeleton) }] }],
      generationConfig: { maxOutputTokens: MAX_TOKENS, temperature: 0.9, responseMimeType: 'application/json' },
    }),
  });

  if (!response.ok) {
    const errorText = await response.text().catch(() => '(no body)');
    throw new Error(`Gemini API error ${response.status}: ${errorText}`);
  }

  const data = await response.json();
  const rawText = data.candidates?.[0]?.content?.parts?.filter(p => !p.thought).map(p => p.text).join('') ?? '';

  if (!rawText) {
    throw new Error('Gemini API returned an empty response');
  }

  const parsed = template.parseResponse(rawText);

  if (!parsed) {
    throw new Error(`Failed to parse Gemini response as JSON. Response started: ${rawText.slice(0, 120)}`);
  }

  return enforceOutputLimits(parsed);
}
