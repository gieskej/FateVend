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

const ANTHROPIC_API_URL = 'https://api.anthropic.com/v1/messages';
const MODEL             = 'claude-sonnet-4-5';
const MAX_TOKENS        = 4096;

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

  return parsed;
}
