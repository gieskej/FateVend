#!/usr/bin/env node
// cli/index.js — FateVend CLI
// Reads .env from the project root for API keys.
//
// Usage:
//   node cli/index.js [options]
//
// Options:
//   --genre <genre>        modern (default), fantasy, sci-fi, paleolithic,
//                          manga-osaka-highschool1987,
//                          historical-korea-joseon-dynasty, nihongi
//   --provider <provider>  claude (default), gemini, ollama
//   --ollama-url <url>     Ollama base URL (default: http://localhost:11434)
//   --ollama-model <name>  Ollama model name (default: llama3.2)
//   --skeleton-only        Skip AI call, print character skeleton only
//   --json                 Output machine-readable JSON

import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { generateCharacter } from '../web/generator/index.js';
import { callGeminiAPI } from '../web/generator/api-client.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Exit cleanly when stdout pipe closes (e.g. piping into `head`)
process.stdout.on('error', err => { if (err.code === 'EPIPE') process.exit(0); });

// ── Load .env (before reading process.env) ─────────────────────────────────
function loadEnv() {
  try {
    const text = readFileSync(resolve(__dirname, '../.env'), 'utf8');
    for (const line of text.split(/\r?\n/)) {
      const t = line.trim();
      if (!t || t.startsWith('#')) continue;
      const eq = t.indexOf('=');
      if (eq === -1) continue;
      const key = t.slice(0, eq).trim();
      let val = t.slice(eq + 1).trim();
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'")))
        val = val.slice(1, -1);
      if (key && !(key in process.env)) process.env[key] = val;
    }
  } catch { /* .env is optional — fall through to env vars */ }
}
loadEnv();

// ── Parse CLI args ─────────────────────────────────────────────────────────
function flag(name) {
  const i = process.argv.indexOf(name);
  if (i !== -1 && i + 1 < process.argv.length && !process.argv[i + 1].startsWith('--'))
    return process.argv[i + 1];
  const prefix = process.argv.find(a => a.startsWith(`${name}=`));
  return prefix ? prefix.slice(name.length + 1) : null;
}
const has = name => process.argv.includes(name);

const genre        = flag('--genre')        ?? 'modern';
const provider     = flag('--provider')     ?? 'claude';
const ollamaUrl    = flag('--ollama-url')   ?? process.env.OLLAMA_URL   ?? 'http://localhost:11434';
const ollamaModel  = flag('--ollama-model') ?? process.env.OLLAMA_MODEL ?? 'llama3.2';
const skeletonOnly = has('--skeleton-only');
const jsonMode     = has('--json');

const anthropicKey = process.env.ANTHROPIC_API_KEY ?? null;
const geminiKey    = process.env.GEMINI_API_KEY    ?? null;

// ── Validate ───────────────────────────────────────────────────────────────
const VALID_GENRES = [
  'modern', 'fantasy', 'sci-fi', 'paleolithic',
  'manga-osaka-highschool1987', 'historical-korea-joseon-dynasty', 'nihongi',
];

if (!VALID_GENRES.includes(genre)) {
  console.error(`Error: Unknown genre "${genre}".`);
  console.error(`Valid genres: ${VALID_GENRES.join(', ')}`);
  process.exit(1);
}

if (!skeletonOnly) {
  if (provider === 'claude' && !anthropicKey) {
    console.error('Error: ANTHROPIC_API_KEY not set. Add it to .env or export it.');
    process.exit(1);
  }
  if (provider === 'gemini' && !geminiKey) {
    console.error('Error: GEMINI_API_KEY not set. Add it to .env or export it.');
    process.exit(1);
  }
  if (!['claude', 'gemini', 'ollama'].includes(provider)) {
    console.error(`Error: Unknown provider "${provider}". Valid: claude, gemini, ollama`);
    process.exit(1);
  }
}

// ── Ollama call ────────────────────────────────────────────────────────────
async function callOllamaAPI(skeleton, baseUrl, model, genreId) {
  const tmpl = await import(`../web/generator/genres/${genreId}/prompt-template.js`);
  const prompt = 'Return raw JSON only — no markdown, no code fences, no commentary.\n\n'
    + tmpl.buildPrompt(skeleton);

  const res = await fetch(`${baseUrl.replace(/\/+$/, '')}/api/chat`, {
    method:  'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model,
      messages: [
        { role: 'system', content: tmpl.SYSTEM_PROMPT },
        { role: 'user',   content: prompt },
      ],
      stream: false,
    }),
  });

  if (!res.ok) {
    const err = await res.text().catch(() => '(no body)');
    throw new Error(`Ollama error ${res.status}: ${err}`);
  }

  const data   = await res.json();
  const raw    = data.message?.content ?? '';
  const parsed = tmpl.parseResponse(raw);
  if (!parsed) throw new Error('Failed to parse Ollama response as JSON');
  return parsed;
}

// ── Main ───────────────────────────────────────────────────────────────────
async function main() {
  const providerLabel = skeletonOnly ? 'skeleton only' : provider;
  console.error(`Generating character… (genre: ${genre}, provider: ${providerLabel})`);

  let skeleton, output;

  if (provider === 'claude' && !skeletonOnly) {
    ({ skeleton, output } = await generateCharacter({ genre, apiKey: anthropicKey }));
  } else {
    ({ skeleton } = await generateCharacter({ genre, skipAI: true }));
    if (!skeletonOnly) {
      if (provider === 'gemini') {
        output = await callGeminiAPI(skeleton, geminiKey, genre);
      } else if (provider === 'ollama') {
        output = await callOllamaAPI(skeleton, ollamaUrl, ollamaModel, genre);
      }
    }
  }

  if (jsonMode) {
    console.log(JSON.stringify({ skeleton, output: output ?? null }, null, 2));
    return;
  }

  // ── Human-readable output ──────────────────────────────────────────────
  const hr = '─'.repeat(60);

  console.log(`\n${hr}`);
  console.log('CHARACTER SHEET');
  console.log(hr);
  console.log(`Name:        ${skeleton.name}`);
  console.log(`Age:         ${skeleton.age}`);
  console.log(`Gender:      ${skeleton.gender} (${skeleton.pronouns})`);
  console.log(`Orientation: ${skeleton.orientation}`);
  console.log(`Ethnicity:   ${skeleton.ethnicityBroad}`);
  console.log(`Appearance:  ${[skeleton.appearance?.build, skeleton.appearance?.hair, skeleton.appearance?.distinguishingFeature].filter(Boolean).join('; ')}`);
  console.log(`Quirk:       ${skeleton.quirk}`);
  console.log('');
  console.log('STATS');
  console.log(`  STR ${String(skeleton.stats.strength).padStart(3)}  |  INT ${String(skeleton.stats.intelligence).padStart(3)}  |  WIS ${String(skeleton.stats.wisdom).padStart(3)}`);
  console.log(`  CHA ${String(skeleton.stats.charisma).padStart(3)}  |  DEX ${String(skeleton.stats.dexterity).padStart(3)}  |  CON ${String(skeleton.stats.constitution).padStart(3)}`);
  console.log('');
  console.log(`MBTI:        ${skeleton.mbti} — ${skeleton.mbtiLabel}`);
  console.log(`Profession:  ${skeleton.profession} (${skeleton.industry}) — feels ${skeleton.sentiment}`);
  console.log(`Economy:     ${skeleton.economicLabel} | ${skeleton.housing} | ${skeleton.transport}`);
  console.log(`City:        ${skeleton.cityLabel}`);
  console.log(`Life event:  ${skeleton.lifeEvent}`);
  console.log(`Tension:     ${skeleton.tension}`);
  console.log(`Secret:      [${skeleton.secretSeverity}] ${skeleton.secret}`);

  console.log(`\n${hr}`);
  console.log('SUPPORTING CAST');
  console.log(hr);
  skeleton.cast.forEach(npc => {
    console.log(`\n${npc.name} (${npc.role}) — ${npc.status}`);
    console.log(`  Traits:  ${npc.traits.join(', ')}`);
    console.log(`  Dynamic: ${npc.dynamic}`);
  });

  if (output) {
    console.log(`\n${hr}`);
    console.log('AI DUNGEON — SCENARIO');
    console.log(hr);

    console.log(`\nTITLE (${output.title.length}/70 chars):`);
    console.log(output.title);

    console.log('\nTAGS:');
    console.log(output.tags.join(', '));

    console.log(`\nDESCRIPTION (${output.description.length}/5000 chars):`);
    console.log(output.description);

    console.log(`\nOPENING (${output.opening.length}/4000 chars):`);
    console.log(output.opening);

    console.log(`\n${hr}`);
    console.log('AI DUNGEON — CHARACTER ENTRIES');
    console.log(hr);

    console.log(`\n${skeleton.name} — PROTAGONIST (${output.characterEntry.length}/1000 chars):`);
    console.log(output.characterEntry);

    for (const [npcName, entry] of Object.entries(output.npcEntries ?? {})) {
      console.log(`\n${npcName} (${entry.length}/1000 chars):`);
      console.log(entry);
    }
  } else {
    console.log('\n(Skeleton only — run without --skeleton-only to generate AI narrative)');
  }

  console.log('');
}

main().catch(err => {
  console.error('Generation failed:', err.message);
  process.exit(1);
});
