// genres/fantasy/static-cards.js
// Genre lore — imported into STATIC_CARDS_BY_GENRE (ui-data.js) and injected
// by the AI Dungeon importer as typed Story Cards alongside the generated
// NPC cards (also included in Copy/Download via buildScenarioPayload()).
// Each array holds { name, triggers, entry } objects:
//   name     — the story card's title
//   triggers — comma-separated keyword string AI Dungeon matches against
//   entry    — the lore text itself
// Array name -> AI Dungeon card type (see aidungeon-importer.mjs):
//   STATIC_CHARACTERS -> character   STATIC_CLASSES  -> class
//   STATIC_RACES      -> race        STATIC_LOCATIONS -> location
//   STATIC_FACTIONS   -> faction     STATIC_CUSTOM    -> custom
// May be empty — not every genre populates every category.

export const STATIC_CHARACTERS = [];

export const STATIC_CLASSES = [
  {
    name: "Warrior",
    triggers: "Warrior, Fighter",
    entry:
      "Trained in arms and built for the front line — knights bound to a lord's service, sellswords loyal only to the highest bidder, city guards who've seen every kind of trouble a gate can bring. What separates a warrior from a thug is discipline, and what separates a good one from a dead one is knowing exactly how much of that discipline to abandon once the fighting actually starts.",
  },
  {
    name: "Rogue",
    triggers: "Rogue, Thief",
    entry:
      "Practitioners of the quiet arts — lockpicks, sleight of hand, a knife that finds its mark before anyone notices it was drawn. Guild thieves work within an organization's rules and protection; freelancers take the greater risk for the greater cut. Either way, a rogue's real skill isn't taking what they want — it's making sure nobody realizes it's gone until long after they're clear.",
  },
  {
    name: "Wizard",
    triggers: "Wizard, Mage",
    entry:
      "Practitioners of arcane magic learned through years of study rather than granted by blood or bargain — court wizards who trade counsel for royal patronage, battle mages who turn scholarship into a battlefield weapon, hedge witches who never had access to a proper academy and taught themselves anyway. Power here is earned laboriously, one correctly-recited syllable at a time.",
  },
  {
    name: "Warlock",
    triggers: "Warlock",
    entry:
      "Wielders of magic granted through a pact with something vast, otherworldly, and rarely fully explained even to the warlock themselves. The power is real and often considerable — the price, whatever it eventually turns out to be, is usually the more interesting story.",
  },
  {
    name: "Cleric",
    triggers: "Cleric, Priest",
    entry:
      "Channels of divine power in service to a temple, a god, or simply a conviction that refuses to quit. Some serve settled congregations with quiet devotion; wandering clerics carry that same faith down every dusty road they walk, tending to whoever needs it whether or not they can pay.",
  },
  {
    name: "Paladin",
    triggers: "Paladin",
    entry:
      "Holy warriors bound by sworn oath to a cause larger than themselves — righteous, absolutely certain, and occasionally insufferable about it. A paladin's authority comes from conviction rather than rank, which makes a fallen paladin, oath broken and power gone quiet, one of the more genuinely unsettling figures a story can produce.",
  },
  {
    name: "Druid",
    triggers: "Druid",
    entry:
      "Keepers of a much older kind of power than temple or academy magic — drawn from stone circles, ancient oaks, and a natural world that answers to those who've earned its trust. Druidic loyalty runs to the land itself first, and to kings, guilds, and cities only as far as those interests happen to align.",
  },
  {
    name: "Ranger",
    triggers: "Ranger",
    entry:
      "Guardians of the boundary between settled land and the wilderness beyond it — trackers, hunters, and monster-slayers equally at home reading a forest floor as a battle line. A ranger's real expertise isn't the bow or the blade; it's knowing exactly what's out there before it knows you're looking.",
  },
  {
    name: "Bard",
    triggers: "Bard",
    entry:
      "Storytellers, musicians, and social operators whose real weapon is charm — a bard can talk their way into a locked room a rogue would need an hour to pick. Every performance doubles as information-gathering, and every song has a version that's true and a version that gets a better reaction from the crowd.",
  },
  {
    name: "Necromancer",
    triggers: "Necromancer",
    entry:
      "Arcane specialists in the magic of death, decay, and the thin line between the two — raising the dead not out of malice, in most cases, but clinical curiosity about a subject everyone else finds too uncomfortable to study properly. Necromancers rarely explain themselves, and rarely need to; the reputation does most of the talking.",
  },
  {
    name: "Monk",
    triggers: "Monk",
    entry:
      "Ascetics who trade material possessions and settled comfort for discipline of body and mind, wandering with nothing that can't be carried alone. What looks like poverty from the outside is, from the inside, the entire point — a monk's power comes from what they've deliberately given up, not what they've accumulated.",
  },
];

export const STATIC_RACES = [
  {
    name: "Human",
    triggers: "Human",
    entry:
      "The most numerous and adaptable people of the realm, found in every trade, every social class, and every corner of the map — common folk of quiet endurance, frontier settlers who fix what's broken with whatever's at hand, and old noble houses trading on bloodlines few outside the family still remember or care about.",
  },
  {
    name: "Elf",
    triggers: "Elf, Elves, Elven",
    entry:
      "Long-lived and old-blooded, elves carry themselves with the unhurried certainty of people who measure time in centuries rather than years. Their societies range from the radiant, faintly aloof high elves of ancient cities to the earth-toned wood elves who barely tolerate a roof over their heads, and the obsidian-skinned dark elves whose reputation walks into a room well before they do.",
  },
  {
    name: "Half-Elf",
    triggers: "Half-Elf, Half Elf",
    entry:
      "Caught between two long-lived and deeply different cultures, half-elves grow up belonging fully to neither — too human for elven society's patience, too elven for human society's comfort. Most learn early to turn that in-between status into an advantage: nobody expects as much from someone nobody quite claims.",
  },
  {
    name: "Dwarf",
    triggers: "Dwarf, Dwarves, Dwarven",
    entry:
      "Stout, stubborn, and built for endurance both physical and social, dwarven culture runs on craft, clan loyalty, and grudges nursed for generations. Hill dwarves lean toward hearth and hospitality; mountain dwarves toward stone, precision, and a scrutinizing eye that finds the flaw in anything — including, especially, a stranger's excuses.",
  },
  {
    name: "Halfling",
    triggers: "Halfling",
    entry:
      "Small, quick, and perpetually underestimated — mistaken for children, dismissed as harmless, and routinely proven wrong on both counts. Halfling communities prize comfort, good food, and a keen sense of exactly when to be somewhere else, a survival skill several centuries in the making.",
  },
  {
    name: "Half-Orc",
    triggers: "Half-Orc, Half Orc",
    entry:
      "Stronger than they look and burdened with a reputation that precedes them into every room, half-orcs walk a narrow line between two peoples that rarely extend them the benefit of the doubt. Many turn that presumption of violence into simple leverage; others spend a lifetime trying to prove it wrong.",
  },
  {
    name: "Orc",
    triggers: "Orc, Orcs, Orcish",
    entry:
      "Imposing, scarred, and rarely underestimated twice, orcish culture holds scars and stories in equal regard — every mark on the skin is a mark on the record. Whatever the wider world assumes about orcish tribes, the truth is usually more complicated, and considerably more interesting.",
  },
  {
    name: "Tiefling",
    triggers: "Tiefling",
    entry:
      "Marked by infernal bloodlines generations back — small horns, unusual skin tones, a tail more often tucked away than flaunted — tieflings inherit suspicion they never personally earned. Most decide fairly young whether to hide what they are or wear it like armor; both choices cost something.",
  },
  {
    name: "Dragonborn",
    triggers: "Dragonborn",
    entry:
      "Proud, scaled, and descended from draconic stock old enough that most dragonborn have never met the source of it, this people carry an innate dignity that reads as arrogance to those who don't understand it and as simple self-respect to those who do. Startling one is inadvisable; several have learned to breathe something alarming when they are.",
  },
  {
    name: "Gnome",
    triggers: "Gnome",
    entry:
      "Small, bright-eyed, and dangerously easy to underestimate, gnomish minds run toward invention, curiosity, and the specific pleasure of being three steps ahead of whoever just dismissed them. The lesson tends to land only once, but it lands hard.",
  },
  {
    name: "Aasimar",
    triggers: "Aasimar",
    entry:
      "Touched by celestial blood somewhere in their lineage, aasimar carry a faint luminescence and a divine attention they never asked for and can't entirely set down. Some lean into the expectation of destiny it implies; others would trade the glow for an ordinary, unwatched life without a second thought.",
  },
];

export const STATIC_LOCATIONS = [
  {
    name: "Vaelmoor",
    triggers: "Vaelmoor, the Kingdom of Vaelmoor, the realm",
    entry:
      "The kingdom that gives its name to the region — a patchwork of walled cities, river trade, and old baronies held together less by loyalty than by mutual inconvenience of rebellion. Its throne has changed hands eleven times in three centuries, always through marriage, murder, or some combination of the two, and every villager can tell you which of the three is likeliest to happen next.",
  },
  {
    name: "Ithrengard",
    triggers: "Ithrengard, the capital",
    entry:
      "Vaelmoor's capital, a city built in visible tiers — palace above, guildhalls in the middle, the crowded warrens of everyone else at the bottom, and the sewers below that where the truly desperate or truly dangerous conduct their business. The court here rewards ambition and punishes hesitation in roughly equal measure; half the nobility is one bad season from ruin and knows it.",
  },
  {
    name: "Duskwall",
    triggers: "Duskwall",
    entry:
      "A great walled city on Vaelmoor's western border, old enough that nobody agrees on who built the outer wall or why it's shaped like a closed fist. Three merchant families and two temples run the place in practice, trading favors and grudges through a city council that exists mostly to give their arrangements a name. Visitors are welcomed warmly and watched closely, often by the same person.",
  },
  {
    name: "Last Chance",
    triggers: "Last Chance",
    entry:
      "A frontier town at the ragged edge of the kingdom's maps, named with more honesty than most settlements manage. People come here to disappear, restart, or hide from something, and the town has learned not to ask which. The nearest real law is a week's ride away, which suits almost everyone currently living there just fine.",
  },
  {
    name: "Saltmere",
    triggers: "Saltmere",
    entry:
      "A busy port city where Vaelmoor's coin actually comes from, however little the capital likes to admit it. Half-legal cargo clears customs here as often as the legal kind, harbor officials keep two ledgers each, and the taverns along the wharf have heard every accent this side of the ocean. Nobody stays a stranger in Saltmere for long — the city has a use for everyone eventually.",
  },
  {
    name: "Cindralis",
    triggers: "Cindralis",
    entry:
      "A city of mages and scholars built around a magical academy old enough to have rebuilt its own tower four times, twice deliberately. Status here runs on demonstrated knowledge rather than blood or coin, which makes it more meritocratic than Ithrengard and considerably more likely to catch fire on a given Tuesday. The streets smell faintly of ozone even on quiet days.",
  },
  {
    name: "Ravensgate",
    triggers: "Ravensgate",
    entry:
      "A fortress town garrisoning Vaelmoor's northern border, more barracks than settlement, where every civilian trade exists to serve the soldiers who actually run the place. Tension with whatever lies across the border has simmered for generations without quite boiling over, and everyone stationed here has a theory about when that finally changes.",
  },
  {
    name: "Old Karesh",
    triggers: "Old Karesh, Karesh",
    entry:
      "An ancient city on a trade road far older than Vaelmoor itself, its lower districts built directly atop the ruins of whatever stood here before anyone kept records. Merchants still pass through for the caravan routes; everyone else passes through quickly, on account of the persistent stories about what else uses those lower districts after dark.",
  },
  {
    name: "Lake Mirrengal",
    triggers: "Lake Mirrengal, Mirrengal",
    entry:
      "A vast, unnervingly still lake said to reflect the sky a few seconds out of sync with reality, which is either an old wives' tale or the reason three separate hermits have built shrines along its shore. Fishing villages ring its edges and do good business, so long as nobody stares at the water too long after sunset.",
  },
  {
    name: "The Kaldrun Peaks",
    triggers: "the Kaldrun Peaks, Kaldrun, Mount Kaldrun",
    entry:
      "A jagged mountain range marking Vaelmoor's eastern edge, home to dwarven mining holds, at least one dragon nobody's confirmed alive in a generation, and passes treacherous enough that armies have died trying to cross them in winter. Whoever holds the Kaldrun passes effectively controls when the next war starts.",
  },
];

export const STATIC_FACTIONS = [
  {
    name: "The Regency Council of Ithrengard",
    triggers: "Regency Council, the Council",
    entry:
      "The body of nobles, guildmasters, and temple heads that actually runs Vaelmoor day to day, regardless of who currently sits the throne. Officially advisory; in practice, no royal decree survives long without the Council's quiet cooperation, and every seat on it is worth killing for, which several members have arranged personally.",
  },
  {
    name: "The Hollow Coin",
    triggers: "the Hollow Coin, Hollow Coin",
    entry:
      "A thieves' guild with fingers in every city Vaelmoor bothers to tax, built on the old principle that a well-run criminal enterprise is just an unlicensed business. Members carry a hollowed coin as a mark of standing — pass it to a stranger and you've vouched for them with your own life. The guild enforces its rules more reliably than most kingdoms enforce theirs.",
  },
  {
    name: "The Ironbell Concordat",
    triggers: "Ironbell Concordat, the Concordat",
    entry:
      "A merchant and artisan guild spanning smiths, shipwrights, and traders across Vaelmoor's major cities, bound by shared contracts and a genuinely terrifying arbitration court. Crossing an Ironbell agreement doesn't get you killed — it gets you quietly unable to buy, sell, or borrow anywhere the guild has influence, which is worse.",
  },
  {
    name: "The Order of the Silver Flame",
    triggers: "Order of the Silver Flame, Silver Flame",
    entry:
      "A holy order of paladins and clerics sworn to hold the line against whatever the dark actually contains, rather than any single god or crown. Chapterhouses dot the kingdom's more dangerous borders, and the Order's absolute certainty about its own righteousness makes it either the kingdom's steadiest defense or its most dangerous loose cannon, depending who you ask.",
  },
  {
    name: "The Cinder College",
    triggers: "the Cinder College, Cinder College",
    entry:
      "The governing faculty of Cindralis's academy, and by extension the closest thing Vaelmoor has to a magical authority. The College certifies wizards, polices unlicensed sorcery, and quietly maintains a very long list of banned experiments that keeps getting longer. Membership is prestigious, political, and — given the tower's history — not entirely safe.",
  },
];

export const STATIC_CUSTOM = [];
