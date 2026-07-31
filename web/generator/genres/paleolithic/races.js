// genres/paleolithic/races.js
// Tribal groups — broad identity + evocative flavor detail. Each entry:
//   id         — unique slug; used for slot-machine reel identity and icon lookup
//   broad      — tribe label used for name pool lookup (this genre's identityCat is 'Tribe')
//   flavor     — cultural/physical detail passed to Claude for description prose.
//                If it contains ' — ' (space-em dash-space), only the text before
//                the first one is shown in the UI (engine.js's _slots.race, used
//                as the identity reel's sub-label, and the output header in
//                index.html) — the full string still reaches the AI prompt.
//                Keep the punchy part first.
//   weight     — relative rarity for weighted-random selection (statAndWeightPick)
//   iconPrompt — text-to-image prompt used to generate this tribe's slot-machine reel icon
//   iconPath   — served path where that icon lives
// Each group reflects a distinct regional adaptation and cultural character.
// No stat affinities on identity.

export const RACES = [
  // ── MAMMOTH HUNTERS ──────────────────────────────────────────────────────
  {
    id: "mammoth_hunters",
    broad: "Mammoth Hunters",
    flavor:
      "Northern tundra kin — cold-adapted, reads the herd like others read faces, carries the patience of a people who follow slow prey across a thousand days of ice",
    weight: 10,
    iconPrompt:
      "paleolithic rpg icon, tundra landscape, stocky fur-clad hunter with spear standing beside a mammoth skull, frost breath in cold air, overcast sky, medium shot, digital concept art",
    iconPath: "generator/genres/paleolithic/icons/RACES#mammoth_hunters.webp",
  },
  {
    id: "river_people",
    broad: "River People",
    flavor:
      "Valley dwellers — expert fishers and plant-readers, semi-sedentary, their camps smell of woodsmoke and drying fish; they know every season of the river by name",
    weight: 12,
    iconPrompt:
      "paleolithic rpg icon, river bank camp, lean figure kneeling at water with woven fish trap, lush valley background, warm light, medium shot, digital concept art",
    iconPath: "generator/genres/paleolithic/icons/RACES#river_people.webp",
  },

  // ── CAVE DWELLERS ─────────────────────────────────────────────────────────
  {
    id: "cave_dwellers",
    broad: "Cave Dwellers",
    flavor:
      "Rocky highland people — master flint knappers and cave painters, they live in the mountain's belly and know how sound travels in stone, how firelight makes the ancestors speak",
    weight: 10,
    iconPrompt:
      "paleolithic rpg icon, cave entrance with handprint art visible on walls, figure sitting with stone tools and ochre pigments, warm firelight inside darkness, medium shot, digital concept art",
    iconPath: "generator/genres/paleolithic/icons/RACES#cave_dwellers.webp",
  },

  // ── COASTAL FORAGERS ──────────────────────────────────────────────────────
  {
    id: "coastal_foragers",
    broad: "Coastal Foragers",
    flavor:
      "Shoreline wanderers — seafood harvesters, early rafters, they carry the smell of salt and know the tides as well as any shaman knows the stars; death from the sea is always close",
    weight: 8,
    iconPrompt:
      "paleolithic rpg icon, rocky shoreline, figure wading in shallow surf with a long spear poised over water, seabirds overhead, dawn light, medium shot, digital concept art",
    iconPath: "generator/genres/paleolithic/icons/RACES#coastal_foragers.webp",
  },

  // ── FOREST WANDERERS ──────────────────────────────────────────────────────
  {
    id: "forest_wanderers",
    broad: "Forest Wanderers",
    flavor:
      "Old-growth hunters — move silently, read the canopy for weather, ambush from shadow; their bands are small and fast and they trust no one they haven't shared a fire with",
    weight: 10,
    iconPrompt:
      "paleolithic rpg icon, ancient forest, lithe figure crouching behind massive tree roots with a wooden bow, dappled light through canopy, hunting crouch, medium shot, digital concept art",
    iconPath: "generator/genres/paleolithic/icons/RACES#forest_wanderers.webp",
  },

  // ── HIGHLAND CLAN ─────────────────────────────────────────────────────────
  {
    id: "highland_clan",
    broad: "Highland Clan",
    flavor:
      "Mountain kin — goat hunters and fire keepers, adapted to cold and altitude, they read the wind and the rockfall; coming down from the peaks feels like leaving the world that matters",
    weight: 8,
    iconPrompt:
      "paleolithic rpg icon, mountain ridge, weathered figure in thick hide cloak standing at a clifftop with a burning torch, snowcapped peaks behind, dramatic light, medium shot, digital concept art",
    iconPath: "generator/genres/paleolithic/icons/RACES#highland_clan.webp",
  },

  // ── GRASSLAND NOMADS ──────────────────────────────────────────────────────
  {
    id: "grassland_nomads",
    broad: "Grassland Nomads",
    flavor:
      "Steppe wanderers — fire-herders who use controlled burns to drive game, long-distance travelers who memorize the landscape across a season's walk; the horizon is their only boundary",
    weight: 10,
    iconPrompt:
      "paleolithic rpg icon, open grassland steppe, group of nomads walking in single file carrying bundles, distant hills, wide sky, late afternoon golden light, medium wide shot, digital concept art",
    iconPath: "generator/genres/paleolithic/icons/RACES#grassland_nomads.webp",
  },

  // ── DESERT SURVIVORS ──────────────────────────────────────────────────────
  {
    id: "desert_survivors",
    broad: "Desert Survivors",
    flavor:
      "Arid-land people — read the landscape for hidden water, hunt at night when the heat breaks, carry knowledge of every dry gulch and shade-rock in a range that would kill anyone else",
    weight: 6,
    iconPrompt:
      "paleolithic rpg icon, arid rocky desert, lean figure crouching at a crack in rock where water seeps, bone tools on belt, harsh noon light, medium shot, digital concept art",
    iconPath: "generator/genres/paleolithic/icons/RACES#desert_survivors.webp",
  },

  // ── TROPICAL ISLANDERS ────────────────────────────────────────────────────
  // Distinct from Coastal Foragers: those work a cold temperate shoreline and
  // fear the sea. These live surrounded by warm water — the reef is the larder
  // and the horizon is the wall.
  {
    id: "tropical_islanders",
    broad: "Tropical Islanders",
    flavor:
      "Warm-water reef divers — hold a breath past what seems possible, read the lagoon by its color and the sky by its smell, and live where the sea is both the larder and the wall; on an island everyone is kin, nothing stays secret, and no one leaves without the whole band knowing",
    weight: 6,
    iconPrompt:
      "paleolithic rpg icon, turquoise lagoon ringed by a coral reef and palms, lean diver surfacing with a speared fish, bamboo raft moored behind, bright tropical sun, medium shot, digital concept art",
    iconPath:
      "generator/genres/paleolithic/icons/RACES#tropical_islanders.webp",
  },

  // ── JUNGLE DWELLERS ───────────────────────────────────────────────────────
  // Distinct from Forest Wanderers: those hunt temperate old-growth with long
  // sightlines and cold nights. Here the canopy never opens, sight ends at ten
  // paces, and the danger is as much rot and venom as it is teeth.
  {
    id: "jungle_dwellers",
    broad: "Jungle Dwellers",
    flavor:
      "Rainforest kin — live in a green gloom under a canopy that never opens, navigate by sound because sight ends at ten paces, and carry the names of a hundred plants that heal, feed, or kill; everything here rots, bites, or both, and the ones who last are the ones who never stop listening",
    weight: 8,
    iconPrompt:
      "paleolithic rpg icon, dense rainforest interior, figure crouched on a huge buttress tree root holding a long reed blowpipe, dripping broad leaves and hanging vines, shafts of green filtered light, humid haze, medium shot, digital concept art",
    iconPath: "generator/genres/paleolithic/icons/RACES#jungle_dwellers.webp",
  },
];
