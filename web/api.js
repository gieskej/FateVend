// api.js
// Text-provider API calls for the AI generation phase — one function per
// backend (Anthropic, Gemini, Ollama). Each takes a rolled skeleton plus the
// caller's credentials and genre id, builds the prompt via the shared
// prompt-builder, and returns { output, usage } with the parsed/limit-enforced
// character output and token counts. These are pure request/response helpers:
// they hold no UI state and touch no DOM — the app layer (app.js) picks which
// one to call based on the selected provider. Frontend module (lives in web/,
// not web/generator/, which is backend/CLI-shared code only).

import {
  buildPrompt,
  parseResponse,
  enforceOutputLimits,
} from "./generator/prompt-builder.js";
import { GENRE_VOICE } from "./generator/manifests.js";

function getSystemPrompt(genre) {
  return (GENRE_VOICE[genre] ?? GENRE_VOICE["modern"]).systemPrompt;
}

export async function callClaude(skeleton, apiKey, genre) {
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
      "anthropic-dangerous-direct-browser-access": "true",
    },
    body: JSON.stringify({
      model: "claude-sonnet-4-5",
      max_tokens: 16384,
      system: getSystemPrompt(genre),
      messages: [
        {
          role: "user",
          content: buildPrompt(
            skeleton,
            GENRE_VOICE[genre] ?? GENRE_VOICE["modern"],
          ),
        },
      ],
    }),
  });
  if (!res.ok) {
    const t = await res.text().catch(() => "");
    throw new Error(`API error ${res.status}: ${t}`);
  }
  const data = await res.json();
  const raw =
    data.content
      ?.filter((b) => b.type === "text")
      .map((b) => b.text)
      .join("") ?? "";
  if (!raw) throw new Error("Empty response from API");
  const parsed = parseResponse(raw);
  if (!parsed) throw new Error("Failed to parse API response as JSON");
  return {
    output: enforceOutputLimits(parsed),
    usage: {
      inputTokens: data.usage?.input_tokens ?? 0,
      outputTokens: data.usage?.output_tokens ?? 0,
    },
  };
}

export async function callGemini(skeleton, apiKey, genre) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${encodeURIComponent(apiKey)}`;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      systemInstruction: { parts: [{ text: getSystemPrompt(genre) }] },
      contents: [
        {
          role: "user",
          parts: [
            {
              text:
                "Return raw JSON only — no markdown, no code fences, no commentary.\n\n" +
                buildPrompt(
                  skeleton,
                  GENRE_VOICE[genre] ?? GENRE_VOICE["modern"],
                ),
            },
          ],
        },
      ],
      generationConfig: {
        maxOutputTokens: 16384,
        temperature: 0.9,
        responseMimeType: "application/json",
      },
    }),
  });
  if (!res.ok) {
    const t = await res.text().catch(() => "");
    throw new Error(`Gemini API error ${res.status}: ${t}`);
  }
  const data = await res.json();
  const raw =
    data.candidates?.[0]?.content?.parts
      ?.filter((p) => !p.thought)
      .map((p) => p.text)
      .join("") ?? "";
  if (!raw) throw new Error("Empty response from Gemini API");
  const parsed = parseResponse(raw);
  if (!parsed)
    throw new Error(
      `Failed to parse Gemini response as JSON. Response started: ${raw.slice(0, 120)}`,
    );
  return {
    output: enforceOutputLimits(parsed),
    usage: {
      inputTokens: data.usageMetadata?.promptTokenCount ?? 0,
      outputTokens: data.usageMetadata?.candidatesTokenCount ?? 0,
    },
  };
}

export async function callOllama(skeleton, baseUrl, modelName, genre) {
  const url = baseUrl.replace(/\/$/, "") + "/api/chat";
  const model = modelName || "llama3.2";
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model,
      stream: false,
      messages: [
        { role: "system", content: getSystemPrompt(genre) },
        {
          role: "user",
          content:
            "Return raw JSON only — no markdown, no code fences, no commentary.\n\n" +
            buildPrompt(skeleton, GENRE_VOICE[genre] ?? GENRE_VOICE["modern"]),
        },
      ],
    }),
  });
  if (!res.ok) {
    const t = await res.text().catch(() => "");
    throw new Error(`Ollama error ${res.status}: ${t}`);
  }
  const data = await res.json();
  const raw = data.message?.content ?? "";
  if (!raw) throw new Error("Empty response from Ollama");
  const parsed = parseResponse(raw);
  if (!parsed)
    throw new Error(
      `Failed to parse Ollama response as JSON. Response started: ${raw.slice(0, 120)}`,
    );
  return {
    output: enforceOutputLimits(parsed),
    usage: {
      inputTokens: data.prompt_eval_count ?? 0,
      outputTokens: data.eval_count ?? 0,
    },
  };
}
