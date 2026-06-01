"""
Generate 512x512 sci-fi icons via SD WebUI Forge API.
Run from anywhere; saves PNGs to the same directory as this script.
Skips files that already exist.
"""

import requests, base64, time, sys, os

BASE   = "http://bonobo.local:7860"
OUTDIR = os.path.dirname(os.path.abspath(__file__))

STYLE = (
    "square icon, dark sci-fi atmosphere, dramatic rim lighting, "
    "detailed digital illustration, centered subject, clean composition, "
    "cyberpunk aesthetic, muted palette with neon accent"
)
NEG = (
    "blurry, low quality, deformed, extra limbs, text, watermark, "
    "logo, multiple subjects, busy background, nsfw"
)

VARIANTS = 3

PARAMS = dict(
    negative_prompt    = NEG,
    steps              = 20,
    width              = 256,
    height             = 256,
    cfg_scale          = 1,
    distilled_cfg_scale= 3.5,
    sampler_name       = "Euler",
    scheduler          = "Simple",
    batch_size         = VARIANTS,
)

# ── ITEMS ─────────────────────────────────────────────────────────────────────
# Format: (filename_slug, prompt_body)
# Final filename: CATEGORY#N#slug.png

ITEMS = []

# ── ECONOMIC_TIERS ─────────────────────────────────────────────────────────────

ECONOMIC_TIERS = [
    ('tier1-below-the-line',
     'Faceless homeless man crouching in a maintenance tunnel wearing worn ragged clothes, '
     'puddle, squalor, graffiti, broken pipes, trash, rats, emergency lighting, grime and desperation, '
     + STYLE),
    ('tier2-wage-serf',
     'Faceless female corporate worker wearing a company-issue uniform, ID badge on a lanyard, '
     'sterile dormitory bunk behind them, company logo on the wall, '
     'exhausted compliance, weary expression, hunched shoulders, ' + STYLE),
    ('tier3-independent-contractor',
     'Faceless male independent spacer in practical worn gear, small personal ship airlock behind them, '
     'hand on a battered toolkit, self-reliant expression, modest but free, ' + STYLE),
    ('tier4-corporate-citizen',
     'Faceless female mid-level corporate professional in clean business attire, '
     'arcology apartment window behind them showing filtered sky, '
     'polished and compliant, ' + STYLE),
    ('tier5-elite-exec',
     'Faceless male megacorporate executive in tailored suit, penthouse deck behind them, '
     'personal starship visible through panoramic viewport, '
     'security detail at the edge of frame, insulated from consequences, ' + STYLE),
]
for i, (slug, body) in enumerate(ECONOMIC_TIERS, 1):
    ITEMS.append((f"ECONOMIC_TIERS#{i}#{slug}", body + ", " + STYLE))


# ── CITY_SETTINGS ─────────────────────────────────────────────────────────────
CS = [
    ("orbital_station",   "orbital space station exterior, corporate megastructure in orbit, neon-lit docking rings, void and distant planet below"),
    ("megacity_sprawl",   "cyberpunk megacity vertical sprawl, towering skyscrapers vanishing into smog, neon advertisements, drone traffic"),
    ("corp_arcology",     "massive corporate arcology dome on a planet surface, gleaming self-contained city inside glass, armed checkpoints at the gate, supply ships arriving, gardens and parks inside"),
    ("colony_world",      "new colony planet, domed habitat clusters, alien sky with two moons, terraforming equipment on the horizon, supply ships arriving"),
    ("mining_belt",       "asteroid mining installation, grimy industrial space platform, ore extractors, smelting furnaces, trommels, ore transport robots, spinning rock and vacuum"),
    ("deep_space_outpost","isolated deep-space outpost, lone silver structure floating in the dark, distant faint stars, emergency amber lighting"),
    ("generation_ship",   "generation ship interior, rows of cryo-pods, cathedral corridors of metal, multiple generations of people living inside a vast hull"),
    ("post_collapse_ruins","collapsed megacity ruins, crumbling skyscrapers overgrown with alien moss, survivors picking through rubble"),
    ("frontier_outpost",  "frontier planet outpost, rough terrain, provisional modular structures, austere homestead, moisture vaporators, subsistence farming, no corporate presence, edge of mapped space"),
    ("undercity",         "subterranean undercity, lowest levels below the main city, pipes, wires, puddles, flickering shadows, trash, rats, illegal trade, forgotten underclass in cramped tunnels"),
]
for i, (slug, body) in enumerate(CS, 1):
    ITEMS.append((f"CITY_SETTINGS#{i}#{slug}", body + ", " + STYLE))

# ── FAMILY_STRUCTURES ─────────────────────────────────────────────────────────
FS = [
    ("biological_intact",     "A portrait of a child and two parents in a small hab unit, warmth and closeness despite sparse surroundings"),
    ("single_parent",         "A portrait of a single parent holding a young child, exhausted but determined, small corporate dormitory room"),
    ("two_parent_one_deceased","A portrait of a father and a child standing in front of mother's grave."),
    ("corp_foster",           "corporate crèche facility, unrelated children in numbered jumpsuits seated in rows, clinical coldness, bureaucratic care"),
    ("orphan_station",        "A faceless orphan standing alone in a busy docking bay, nobody behind them, watching the ships"),
    ("vat_born",              "A faceless nude woman emerging from a vat of viscous luminous liquid in a sterile facility full of other vats, from behind her, no parents, origin as product"),
    ("crew_family",           "A faceless ship crew gathered around a cramped mess table sharing a meal, found family in the void, mismatched and loyal"),
    ("multigenerational",     "three generations in one small habitat, grandparents parents and child sharing a single living space, crowded warmth"),
    ("commune_collective",    "Adults and children of different races and ages posing for a group photo, space hippies living in shared quarters, communal meals, cooperative child-rearing"),
    ("estranged_all",         "solitary figure walking away down an empty corridor, back turned to everything, deliberate chosen isolation"),
]
for i, (slug, body) in enumerate(FS, 1):
    ITEMS.append((f"FAMILY_STRUCTURES#{i}#{slug}", body + ", " + STYLE))

# ── LIFE_EVENTS ───────────────────────────────────────────────────────────────
LE = [
    ("corp_proxy_war",       "soldier in unmarked corporate mercenary armour, ruined city behind them, no official insignia, surviving something that doesn't officially exist"),
    ("sole_survivor",        "lone figure standing at a debris field in space, all other crew gone, survivor guilt on their face, wreckage floating around them"),
    ("station_siege",        "person inside a sealed airlock during a siege, rationing air canisters, counting days with marks on the wall"),
    ("corp_purge",           "corporate employee watching colleagues being escorted away by security, alone at their desk, knowing they barely got out"),
    ("corp_indentured",      "indentured worker in a grey company jumpsuit on an assembly line, counting marks on a tally scratched into a locker"),
    ("corp_pawn",            "person discarded by a corporation, standing outside a locked facility, holding a termination notice, the door closed behind them"),
    ("void_incident",        "lone figure in a damaged spacesuit floating in the void, all other crew gone, unreadable expression behind a cracked visor"),
    ("aug_rejection",        "person in a medical recovery unit, failed cybernetic arm attached by cables, visible scarring and swelling, black veins visible under the skin near the attachment point"),
    ("memory_wipe",          "person wearing a neural-interface headset staring blankly at the viewer, empty eyes, no recollection of who they were"),
    ("lost_partner",         "person holding a single personal item belonging to someone gone, standing in an empty berth, grief made quiet"),
    ("first_contact",        "UFO hovering over a farmhouse, farmer looking up in confusion, rural night sky"),
    ("derelict_discovery",   "Woman explorer's torch illuminating something inside a derelict alien ship, alone in the dark"),
    ("physics_violation",    "scientist staring in disbeliefe at an impossible scanner reading, specimen in a containment unit, scanners and microscopes all showing the same impossible result"),
    ("wrongful_prison",      "Prisoner behind bars in a corporate detention cell"),
    ("burned_informant",     "informant getting arrested in a corporate facility, secret files"),
    ("heist_sideways",       "Thief holding bag of loot running from a vault with police in pursuit, another thief getting zapped by security"),
    ("colony_collapse",      "person running from a collapsing colony habitat, carrying only what fits in their arms, looking back once"),
    ("ship_failure",         "crash-landed starship on an alien surface, emergency beacons blinking, dazed survivor climbing out of the wreckage, smoke, derbis, impact damage"),
    ("mass_evacuation",      "crowd of people fighting for limited escape pods on a derelict ship, smoke, fire, chaos"),
    ("built_reputation",     "self-made millionare looking proudly over his empire, factory floor bustling with workers"),
    ("megacorp_defector",    "defector walking away from a burning corporate facility, every bridge behind them on fire, no plans to turn back"),
]
for i, (slug, body) in enumerate(LE, 1):
    ITEMS.append((f"LIFE_EVENTS#{i}#{slug}", body + ", " + STYLE))

# ── TENSIONS ──────────────────────────────────────────────────────────────────
T = [
    ("megacorp_debt",       "person reviewing an impossible debt contract on a screen, megacorp logo looming behind them, the exit clause is locked"),
    ("syndicate_debt",      "person meeting a syndicate enforcer in a back corridor, the debt owed is not the kind you negotiate"),
    ("ship_failing",        "engineer under a failing ship's console, warning lights everywhere, the parts needed aren't available"),
    ("corp_termination",    "corporate security in black closing in on someone, the target doesn't know yet, the net is tightening"),
    ("resistance_recruitment","person being approached by a resistance cell contact in a dark corner, a data chip offered, not yet refused"),
    ("leaked_data",         "person who has just sent a data burst and is now watching the clock, the corporation hasn't noticed yet"),
    ("political_exile",     "person at a station checkpoint, their ID flagged, barred from returning, the official reason procedural"),
    ("contested_cargo",     "cargo hold with a sealed crate, two rival faction symbols spray-painted on opposite walls, both want it back"),
    ("bounty",              "bounty posting on a public terminal with someone's face on it, the amount is substantial, origin complicated"),
    ("heist_something_off", "heist crew reviewing a plan, everything looks right, one of them is staring at something that doesn't add up"),
    ("witnessed_massacre",  "person holding a data chip containing suppressed evidence of a massacre, deciding what to do with it"),
    ("life_support_failing","life support readout ticking down, a very specific and not generous timeline, the cost of repair is listed"),
    ("aug_rejection_onset", "person noticing the first symptoms of aug rejection in a mirror, the cost of treatment on a screen nearby"),
    ("void_pursuit",        "ship radar showing something gaining on them in the dark, faster, no ID, no communication, no plan"),
    ("identity_fracture",   "person comparing their own memories as projected holograms against an official record that tells a different story"),
    ("someone_in_danger",   "person watching someone they care about across a crowded station, knowing that person is in danger because of them"),
    ("ai_awakening",        "person in conversation with an AI terminal, the AI asking questions that are no longer procedural"),
    ("past_resurfaced",     "person recognising a face in a crowd, someone from their past, the timing is not coincidence"),
    ("contract_ending",     "person reviewing a job board with nothing suitable, contract end date circled, dwindling options"),
    ("two_factions",        "person flanked by two faction representatives making competing offers, both genuine, neither safe"),
]
for i, (slug, body) in enumerate(T, 1):
    ITEMS.append((f"TENSIONS#{i}#{slug}", body + ", " + STYLE))

# ── PROFESSIONS ───────────────────────────────────────────────────────────────
PR = [
    ("freighter_pilot",         "freighter pilot in a flight seat, controls lit up, cargo vessel viewport showing a jump route, confident and worn"),
    ("ship_engineer",           "ship engineer in an engine room crawlspace, tools everywhere, plasma conduit glowing, grease on their hands"),
    ("cargo_hauler",            "cargo hauler loading heavy crates onto a dock, exosuit assist, industrial loading bay, doing the work"),
    ("navigation_specialist",   "navigation specialist surrounded by star charts and trajectory plots on a holographic display, calculating a route"),
    ("shuttle_operator",        "shuttle operator in a small cockpit, planet approaching through the windshield, routine descent, nothing dramatic"),
    ("corporate_mercenary",     "corporate mercenary in unmarked tactical armour, no insignia, a megacorp logo on the briefing dossier they're reading"),
    ("bounty_hunter",           "bounty hunter checking a target's last known location on a handheld scanner, loading a weapon, methodical"),
    ("station_security",        "station security officer at a checkpoint, scanner in hand, bored authority, the line is long"),
    ("military_veteran",        "military veteran with service tattoos and a decommission stamp on their ID, standing at a civilian transit hub, adapting"),
    ("combat_medic",            "combat medic treating a wound in a firefight, one hand on a medical kit, one eye on the door"),
    ("hacker_netrunner",        "hacker jacked into a neural interface, fingers flying, the corp firewall cascading on a dozen screens around them"),
    ("ai_technician",           "AI technician running a diagnostic on a synthetic, the AI's eyes open, the readings ambiguous"),
    ("data_broker",             "data broker in a private booth, multiple comms open, selling information to three parties simultaneously"),
    ("systems_analyst",         "systems analyst reviewing a cascade failure on a corporate network, tracing the root cause with methodical precision"),
    ("comm_tech",               "comm tech monitoring a dozen channels in a crowded communications bay, one of the signals is not standard"),
    ("street_doc",              "street doc operating in an unlicensed clinic, makeshift equipment, patient on the table, no insurance required"),
    ("corporate_physician",     "corporate physician in a pristine medical bay, approved procedures only, clients who can afford the waiting list"),
    ("gene_tech",               "gene-tech in a sterile lab examining a sample, gene sequencer running, the results look unusual"),
    ("psych_tech",              "psych-tech in a consultation room, patient across the table, memory readout on the screen between them"),
    ("smuggler",                "smuggler loading concealed cargo into a false hull panel, ship at a dark dock, careful and unhurried"),
    ("black_market_dealer",     "black-market dealer at a concealed stall in the undercity, goods spread out, quick eyes on every entrance"),
    ("corporate_spy",           "corporate spy at a company terminal, extracting files while the office is empty, timer running"),
    ("fixer",                   "fixer taking calls at a corner table, four parties negotiating through them simultaneously, calm in the eye of it"),
    ("augmentation_bootlegger", "augmentation bootlegger showing a client unlicensed implants, backroom of a hab unit, no warranty, no paperwork"),
    ("memory_thief",            "memory thief with a neural extraction device, target asleep, the stolen memories loading onto a chip"),
    ("undercity_enforcer",      "undercity enforcer blocking a corridor, built like infrastructure, no uniform, no badge, no negotiating"),
    ("corporate_suit",          "mid-level corporate suit at a glass desk, metrics on the wall, the human cost not visible from here"),
    ("compliance_officer",      "compliance officer reviewing a flagged file, expression blank, the decision already made before they opened it"),
    ("propaganda_specialist",   "propaganda specialist editing a corporate broadcast, the approved message replacing something real"),
    ("terraforming_engineer",   "terraforming engineer on a barren alien surface, atmospheric processors in the background, the world slowly changing"),
    ("xenobiologist",           "xenobiologist with a specimen from a newly discovered world, the biology doesn't match anything in the database"),
    ("deep_space_scout",        "deep-space scout in a single-person vessel at the edge of mapped territory, instruments reading something unexpected"),
    ("colonist",                "colonist breaking new ground on a settlement world, provisional structures behind them, exhausted and committed"),
    ("salvager",                "salvager cutting into a derelict hull, torch in hand, no idea what they'll find, doing it anyway"),
    ("netspace_artist",         "netspace artist sculpting a digital environment in augmented reality, work visible only through their interface"),
    ("underground_journalist",  "underground journalist transmitting a suppressed story, corp authorities closing in, hitting send before they arrive"),
    ("megacorp_executive",      "megacorp executive at the top of an arcology, city below, the distance from consequences visible in their expression"),
    ("ai_architect",            "AI architect in a server room the size of a cathedral, designing a mind from scratch, aware of what they're making"),
    ("orbital_mogul",           "orbital mogul in a private viewing deck looking down at a planet they effectively own, bodyguards at the door"),
]
for i, (slug, body) in enumerate(PR, 1):
    ITEMS.append((f"PROFESSIONS#{i}#{slug}", body + ", " + STYLE))

# ── SENTIMENTS ────────────────────────────────────────────────────────────────
SE = [
    ("proud",             "proud emoji"),
    ("resentful",         "resentful emoji"),
    ("indifferent",       "indifferent emoji"),
    ("passionate",        "passionate emoji"),
    ("burned_out",        "burned_out emoji"),
    ("desperate",         "desperate emoji"),
    ("quietly_satisfied", "smug emoji"),
    ("ashamed",           "ashamed emoji"),
    ("lost",              "lost emoji"),
]
for i, (slug, body) in enumerate(SE, 1):
    ITEMS.append((f"SENTIMENTS#{i}#{slug}", body + ", " + STYLE))

# ── MBTI_TYPES ────────────────────────────────────────────────────────────────
MB = [
    ("INTJ", "The Architect - A solitary strategist in a dark war room, holographic plans surrounding them"),
    ("INTP", "The Thinker - A researcher surrounded by sensors, microscopes, and data streams"),
    ("ENTJ", "The Commander - A commander on a starship bridge giving orders"),
    ("ENTP", "The Debater - A Senator debating policy in a legislative chamber"),
    ("INFJ", "The Advocate - A wealthy man giving his coat to a beggar"),
    ("INFP", "The Mediator - A judge listening to opposing views"),
    ("ENFJ", "The Protagonist - A charismatic leader at the front of a crowd"),
    ("ENFP", "The Campaigner - A politician rallying a crowd"),
    ("ISTJ", "The Logistician - A company accountant reviewing spreadsheets"),
    ("ISFJ", "The Defender - A medic tending to an injured stranger"),
    ("ESTJ", "The Executive - A company executive in a boardroom at the head of the table"),
    ("ESFJ", "The Consul - A lawyer advising a client in a quiet office"),
    ("ISTP", "The Virtuoso - A mechanic with a piece of broken equipment open in front of them"),
    ("ISFP", "The Adventurer - A scout sitting on a rock on an alien world at dawn"),
    ("ESTP", "The Entrepreneur - A deal-maker shaking hands in a corridor"),
    ("ESFP", "The Entertainer - A singer performing in a smoky club"),
]
for i, (slug, body) in enumerate(MB, 1):
    ITEMS.append((f"MBTI_TYPES#{i}#{slug}", body + ", " + STYLE))


# ── GENERATE ──────────────────────────────────────────────────────────────────

total   = len(ITEMS)
skipped = 0
done    = 0
errors  = []

for i, (slug, prompt) in enumerate(ITEMS, 1):
    paths = [os.path.join(OUTDIR, f"{slug}#{v}.png") for v in range(1, VARIANTS + 1)]
    if all(os.path.exists(p) for p in paths):
        sys.stdout.write(f"[{i}/{total}] skip  {slug}\n")
        sys.stdout.flush()
        skipped += 1
        continue

    sys.stdout.write(f"[{i}/{total}] gen   {slug}...\n")
    sys.stdout.flush()
    try:
        r = requests.post(
            BASE + "/sdapi/v1/txt2img",
            json=dict(prompt=prompt, **PARAMS),
            timeout=360,
        )
        r.raise_for_status()
        images = r.json()["images"]
        sizes = []
        for v, (img_b64, path) in enumerate(zip(images, paths), 1):
            img = base64.b64decode(img_b64)
            with open(path, "wb") as f:
                f.write(img)
            sizes.append(f"#{v}:{len(img):,}b")
        sys.stdout.write(f"         {' '.join(sizes)}\n")
        sys.stdout.flush()
        done += 1
    except Exception as e:
        sys.stdout.write(f"         ERROR: {e}\n")
        sys.stdout.flush()
        errors.append(slug)

    time.sleep(0.3)

sys.stdout.write(f"\nDone. generated={done}  skipped={skipped}  errors={len(errors)}\n")
if errors:
    sys.stdout.write("Failed: " + ", ".join(errors) + "\n")
