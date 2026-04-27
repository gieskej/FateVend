#!/usr/bin/env node
// cli/index.js
// Thin CLI wrapper around the generator library.
// Calls generateCharacter and prints results to stdout.
//
// Usage:
//   ANTHROPIC_API_KEY=sk-ant-... node cli/index.js
//   ANTHROPIC_API_KEY=sk-ant-... node cli/index.js --skeleton-only
//   ANTHROPIC_API_KEY=sk-ant-... node cli/index.js --json

import { generateCharacter } from '../generator/index.js';

const args       = process.argv.slice(2);
const skeletonOnly = args.includes('--skeleton-only');
const jsonMode     = args.includes('--json');
const apiKey       = process.env.ANTHROPIC_API_KEY ?? null;

if (!skeletonOnly && !apiKey) {
  console.error('Error: ANTHROPIC_API_KEY environment variable is required.');
  console.error('Run with --skeleton-only to skip the AI call.');
  process.exit(1);
}

async function main() {
  console.error('Generating character...');

  const { skeleton, output } = await generateCharacter({
    genre:  'modern',
    apiKey: skeletonOnly ? null : apiKey,
    skipAI: skeletonOnly,
  });

  if (jsonMode) {
    // Machine-readable output
    console.log(JSON.stringify({ skeleton, output }, null, 2));
    return;
  }

  // ── HUMAN-READABLE OUTPUT ─────────────────────────────────────────────

  const hr = '─'.repeat(60);

  console.log(`\n${hr}`);
  console.log('CHARACTER SHEET');
  console.log(hr);
  console.log(`Name:        ${skeleton.name}`);
  console.log(`Age:         ${skeleton.age}`);
  console.log(`Gender:      ${skeleton.gender} (${skeleton.pronouns})`);
  console.log(`Orientation: ${skeleton.orientation}`);
  console.log(`Ethnicity:   ${skeleton.ethnicityBroad}`);
  console.log(`Appearance:  ${[skeleton.appearance.build, skeleton.appearance.hair, skeleton.appearance.distinguishingFeature].filter(Boolean).join('; ')}`);
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

    console.log(`\nTAGS:`);
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

    for (const [npcName, entry] of Object.entries(output.npcEntries)) {
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
