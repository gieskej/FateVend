// generator/api-client.js
// Handles the Claude / Gemini API calls and parses the response.
// Uses only fetch — works in browser, Node 18+, and AI Dungeon's scripted JS.
//
// The prompt itself (system prompt, user prompt, response parsing, output
// limits) all come from the single shared builder in ./prompt-builder.js,
// driven by the per-genre voice in ./manifests.js (GENRE_VOICE). There is no
// longer a per-genre prompt-template.js.
//
// No browser APIs beyond fetch. No Node-specific APIs. Pure JS + fetch.

import { GENRE_VOICE } from "./manifests.js";
import {
  buildPrompt,
  parseResponse,
  enforceOutputLimits,
} from "./prompt-builder.js";

const ANTHROPIC_API_URL = "https://api.anthropic.com/v1/messages";
const MODEL = "claude-sonnet-4-5";
const CLAUDE_MAX_TOKENS = 16384;
const GEMINI_MAX_TOKENS = 32768;

const voiceFor = (genre) => GENRE_VOICE[genre] ?? GENRE_VOICE.modern;

/**
 * Calls the Claude API with the assembled character skeleton
 * and returns the parsed, limit-enforced narrative output.
 *
 * @param {import('./types.js').CharacterSkeleton} skeleton
 * @param {string} apiKey   Anthropic API key (sk-ant-...)
 * @param {string} [genre='modern']
 * @returns {Promise<import('./types.js').GeneratedOutput>}
 * @throws {Error} on HTTP error or parse failure
 */
export async function callClaudeAPI(skeleton, apiKey, genre = "modern") {
  const voice = voiceFor(genre);

  const requestBody = {
    model: MODEL,
    max_tokens: CLAUDE_MAX_TOKENS,
    system: voice.systemPrompt,
    messages: [{ role: "user", content: buildPrompt(skeleton, voice) }],
  };

  const response = await fetch(ANTHROPIC_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
      "anthropic-dangerous-direct-browser-access": "true",
    },
    body: JSON.stringify(requestBody),
  });

  if (!response.ok) {
    const errorText = await response.text().catch(() => "(no body)");
    throw new Error(`Anthropic API error ${response.status}: ${errorText}`);
  }

  const data = await response.json();

  const rawText =
    data.content
      ?.filter((block) => block.type === "text")
      .map((block) => block.text)
      .join("") ?? "";

  if (!rawText) {
    throw new Error("Anthropic API returned an empty response");
  }

  const parsed = parseResponse(rawText);

  if (!parsed) {
    throw new Error("Failed to parse Claude response as JSON");
  }

  return enforceOutputLimits(parsed);
}

const GEMINI_API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent";

/**
 * Calls the Google Gemini API with the assembled character skeleton.
 *
 * @param {import('./types.js').CharacterSkeleton} skeleton
 * @param {string} apiKey   Google Gemini API key (AIza...)
 * @param {string} [genre='modern']
 * @returns {Promise<import('./types.js').GeneratedOutput>}
 * @throws {Error} on HTTP error or parse failure
 */
export async function callGeminiAPI(skeleton, apiKey, genre = "modern") {
  const voice = voiceFor(genre);

  const response = await fetch(
    `${GEMINI_API_URL}?key=${encodeURIComponent(apiKey)}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: voice.systemPrompt }] },
        contents: [
          {
            role: "user",
            parts: [
              {
                text:
                  "Return raw JSON only — no markdown, no code fences, no commentary.\n\n" +
                  buildPrompt(skeleton, voice),
              },
            ],
          },
        ],
        generationConfig: {
          maxOutputTokens: GEMINI_MAX_TOKENS,
          temperature: 0.9,
          responseMimeType: "application/json",
        },
      }),
    },
  );

  if (!response.ok) {
    const errorText = await response.text().catch(() => "(no body)");
    throw new Error(`Gemini API error ${response.status}: ${errorText}`);
  }

  const data = await response.json();
  const rawText =
    data.candidates?.[0]?.content?.parts
      ?.filter((p) => !p.thought)
      .map((p) => p.text)
      .join("") ?? "";

  if (!rawText) {
    throw new Error("Gemini API returned an empty response");
  }

  const parsed = parseResponse(rawText);

  if (!parsed) {
    throw new Error(
      `Failed to parse Gemini response as JSON. Response started: ${rawText.slice(0, 120)}`,
    );
  }

  return enforceOutputLimits(parsed);
}
