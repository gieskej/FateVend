#!/usr/bin/env python3
"""Builds `example-pirate-cove.zip` — a small, self-contained example genre pack.

Unlike the JSON-only `sample-neon-drift.json` (which reuses Sci-Fi's art via
`iconBase`), this is a .zip that BUNDLES its own icons/ and audio/ so it
exercises the blob-URL asset path end to end. The icons here are simple
generated placeholders (a themed color + the slug) — a real pack would run the
icon pipeline to produce art. Re-run this script to regenerate the zip.

    python3 web/genre-packs/build-example-pack.py
"""
import io, json, math, struct, wave, zipfile
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

OUT = Path(__file__).parent / "example-pirate-cove.zip"

# ── Genre content ───────────────────────────────────────────────────────────
IDENTITIES = [
    {"id": "sea_rover",    "broad": "Rover",    "weight": 14,
     "flavor": "born on the deck of a roving ship, never owned a scrap of dry land, treats every port as a room to pass through"},
    {"id": "island_born",  "broad": "Islander", "weight": 12,
     "flavor": "raised on a sun-baked island of fishers and wreckers, salt in the blood and a grudge against the tax men"},
    {"id": "navy_deserter","broad": "Deserter", "weight": 8,
     "flavor": "jumped ship from the royal navy one moonless night, still flinches at the sound of a bosun's whistle"},
    {"id": "selkie",       "broad": "Selkie",   "weight": 6,
     "flavor": "seal-folk who wears a human shape ashore, keeps a hidden pelt and a longing for the cold deep water"},
]

PROFESSIONS = [
    {"title": "Deckhand",      "industry": "Ship crew", "economicTier": 1,
     "statAffinity": {"strength": 1.3, "constitution": 1.2}, "sentiments": ["enduring", "loyal", "yearning"],
     "iconPrompt": "pirate rpg icon, deckhand hauling wet rope on a ship deck, straining muscles, spray and sunlight, medium shot, painterly",
     "iconPath": "TRADE#deckhand.webp"},
    {"title": "Navigator",     "industry": "Ship crew", "economicTier": 3,
     "statAffinity": {"intelligence": 1.4, "wisdom": 1.2}, "sentiments": ["methodical", "proud", "discreet"],
     "iconPrompt": "pirate rpg icon, navigator bent over a sea chart with brass dividers and a sextant, lantern light, medium shot, painterly",
     "iconPath": "TRADE#navigator.webp"},
    {"title": "Ship's Cook",   "industry": "Ship crew", "economicTier": 2,
     "statAffinity": {"constitution": 1.3, "charisma": 1.1}, "sentiments": ["stoic", "compassionate", "devout"],
     "iconPrompt": "pirate rpg icon, one-eyed ship's cook stirring a huge iron pot in a cramped galley, steam and hanging pans, medium shot, painterly",
     "iconPath": "TRADE#cook.webp"},
    {"title": "Gunner",        "industry": "Ship crew", "economicTier": 2,
     "statAffinity": {"strength": 1.3, "dexterity": 1.2}, "sentiments": ["dangerous", "stoic", "resigned"],
     "iconPrompt": "pirate rpg icon, gunner ramming a charge into a cannon on a gun deck, smoke and cannonballs, tense expression, medium shot, painterly",
     "iconPath": "TRADE#gunner.webp"},
    {"title": "Quartermaster", "industry": "Ship crew", "economicTier": 4,
     "statAffinity": {"charisma": 1.4, "wisdom": 1.2}, "sentiments": ["canny", "status_conscious", "observant"],
     "iconPrompt": "pirate rpg icon, quartermaster tallying loot in a ledger while crew watch, coins and pistols on the table, medium shot, painterly",
     "iconPath": "TRADE#quartermaster.webp"},
]

# slots.economicTiers tuples: [dataTierId, iconSlug, shortLabel]
ECON_TUPLES = [
    ["tier1", "bilge",         "Bilge Rat"],
    ["tier2", "crew_share",    "Crew Share"],
    ["tier3", "boatswain",     "Boatswain"],
    ["tier4", "quartermaster", "Quartermaster"],
    ["tier5", "captain",       "Captain's Cut"],
]
ECON_DATA = {
    "1": {"label": "Bilge Rat", "descriptors": ["sleeps in the bilge among the rats", "one thin share behind on debts", "boots held together with tarred twine"],
          "housing": ["a hammock over the ballast", "a corner of the orlop deck"], "transport": ["whatever ship will have them"],
          "iconPrompt": "pirate rpg icon, ragged sailor asleep in a dark flooded bilge among rats and barrels, single lantern, wide shot, painterly"},
    "2": {"label": "Crew Share", "descriptors": ["draws an honest crew share", "a few coins sewn into the hem", "owns a decent knife and a change of shirt"],
          "housing": ["a shared berth below decks"], "transport": ["a berth on a working ship"],
          "iconPrompt": "pirate rpg icon, sailor counting a small handful of coins by a swinging lantern below decks, medium shot, painterly"},
    "3": {"label": "Boatswain", "descriptors": ["trusted with the ship's stores", "a fair purse and a good coat", "keeps a locked sea chest"],
          "housing": ["a curtained cabin nook"], "transport": ["a named berth and a say in the course"],
          "iconPrompt": "pirate rpg icon, boatswain with a coil of rope and a whistle inspecting the rigging, confident, medium shot, painterly"},
    "4": {"label": "Quartermaster", "descriptors": ["holds the crew's shared loot", "silver buckles and a brace of pistols", "a cabin of their own"],
          "housing": ["a private cabin astern"], "transport": ["a cabin and a vote at the captain's table"],
          "iconPrompt": "pirate rpg icon, well-dressed quartermaster at a chart table with a heavy strongbox, coins and pistols, medium shot, painterly"},
    "5": {"label": "Captain's Cut", "descriptors": ["takes the captain's double share", "gold rings and a fine plumed hat", "owns the ship under their boots"],
          "housing": ["the great cabin"], "transport": ["their own ship and crew"],
          "iconPrompt": "pirate rpg icon, richly dressed pirate captain in a plumed hat before a treasure-laden great cabin, commanding, medium shot, painterly"},
}

CITIES = [
    {"id": "port_royale",   "label": "Port Royale, the wickedest town afloat",
     "flavor": "rum, gambling, and gallows all on the same street; a fortune won and lost before dawn",
     "toneTag": "dramatic", "statAffinity": {"charisma": 1.2, "dexterity": 1.1},
     "iconPrompt": "pirate rpg icon, crowded lawless harbour town at dusk, taverns and hanging lanterns, ships in the bay, wide shot, painterly"},
    {"id": "smugglers_cove","label": "A hidden smugglers' cove",
     "flavor": "a sea cave stacked with untaxed crates, one narrow channel in, everyone armed and no one trusted",
     "toneTag": "criminal", "statAffinity": {"dexterity": 1.2, "wisdom": 1.1},
     "iconPrompt": "pirate rpg icon, torchlit sea cave stacked with contraband crates, a moored longboat, shadowy figures, wide shot, painterly"},
    {"id": "naval_harbor",  "label": "A fortified naval harbour",
     "flavor": "cannon on every wall and a noose for every pirate; safe if you keep your papers and your mouth in order",
     "toneTag": "neutral", "statAffinity": {"constitution": 1.1, "intelligence": 1.1},
     "iconPrompt": "pirate rpg icon, stone naval fortress guarding a harbour of tall warships, cannon and flags, wide shot, painterly"},
    {"id": "kraken_reef",   "label": "The reefs where the kraken sleeps",
     "flavor": "green water and broken masts jutting from the shallows; sailors row quiet and pray quieter",
     "toneTag": "gritty", "statAffinity": {"wisdom": 1.2, "constitution": 1.1},
     "iconPrompt": "pirate rpg icon, eerie green reef littered with shipwreck masts, calm water, a vast shadow beneath the surface, wide shot, painterly"},
]

FAMILIES = [
    {"id": "two_parent_sailors", "label": "Two sailing parents", "parentCount": 2, "siblingCount": [0, 3], "toneTag": "cozy",
     "notes": "Raised aboard or dockside by two working sailors; learned knots before letters.",
     "iconPrompt": "pirate rpg icon, two weathered sailor parents and a child mending nets on a dock, warm, medium shot, painterly"},
    {"id": "orphan_of_the_sea",  "label": "Orphan of the sea",  "parentCount": 0, "siblingCount": [0, 0], "toneTag": "gritty",
     "notes": "Lost both parents to the water young; the crew is the only family left.",
     "iconPrompt": "pirate rpg icon, lone child on an empty dock watching ships leave, grey overcast, wide shot, painterly"},
    {"id": "pirate_dynasty",     "label": "A pirate dynasty",    "parentCount": 2, "siblingCount": [1, 4], "toneTag": "dramatic",
     "notes": "Born into a notorious sea-raiding family with a name that opens doors and gets ships boarded.",
     "iconPrompt": "pirate rpg icon, a formidable pirate family posed before their ship with a black flag, proud, medium shot, painterly"},
    {"id": "press_ganged",       "label": "Press-ganged young",  "parentCount": 1, "siblingCount": [0, 2], "toneTag": "gritty",
     "notes": "Dragged from a home port into ship's service as a youth; still remembers the family left behind.",
     "iconPrompt": "pirate rpg icon, a youth hauled up a gangplank by sailors while a parent reaches out from the dock, tense, medium shot, painterly"},
]

PARENT_STATUSES = [
    {"id": "both_alive",       "label": "Both parents alive, ashore", "toneTag": "cozy"},
    {"id": "one_lost_at_sea",  "label": "One parent lost at sea",     "toneTag": "gritty"},
    {"id": "both_gone",        "label": "Both parents gone",          "toneTag": "gritty"},
]
SIBLING_DYNAMICS = [
    {"id": "close_crewmates",  "label": "Siblings who crew together",    "toneTag": "cozy"},
    {"id": "scattered_ports",  "label": "Siblings scattered across ports","toneTag": "neutral"},
    {"id": "rival_captains",   "label": "A sibling on a rival ship",      "toneTag": "dramatic"},
]

LIFE_EVENTS = [
    {"id": "survived_a_mutiny", "description": "Survived a mutiny — and never said which side they were really on", "toneTag": "dramatic", "statAffinity": {"charisma": 1.2, "wisdom": 1.1},
     "iconPrompt": "pirate rpg icon, tense standoff of armed sailors on a storm-lashed deck at night, drawn cutlasses, wide shot, painterly"},
    {"id": "buried_treasure",   "description": "Buried a chest of gold on an unmarked island and lost the map to a card game", "toneTag": "dramatic", "statAffinity": {"dexterity": 1.1, "intelligence": 1.1},
     "iconPrompt": "pirate rpg icon, sailor burying an iron chest on a moonlit beach, palm trees and a longboat, wide shot, painterly"},
    {"id": "marooned",          "description": "Was marooned on a bare spit of sand with a pistol and one shot, and lived to tell it wrong", "toneTag": "gritty", "statAffinity": {"constitution": 1.3, "wisdom": 1.1},
     "iconPrompt": "pirate rpg icon, ragged figure alone on a tiny sandbar under a blazing sun, distant sail on the horizon, wide shot, painterly"},
    {"id": "lost_a_ship",       "description": "Captained a ship to the bottom and has been trying to earn back a deck ever since", "toneTag": "gritty", "statAffinity": {"wisdom": 1.2, "charisma": 1.1},
     "iconPrompt": "pirate rpg icon, a sailor in a lifeboat watching their ship sink in the distance, smoke and debris, wide shot, painterly"},
]

TENSIONS = [
    {"id": "bounty_on_head", "description": "Has a naval bounty on their head large enough to tempt their own crew", "toneTag": "dramatic", "statAffinity": {"charisma": 1.1, "dexterity": 1.1}, "criminalFlag": True,
     "iconPrompt": "pirate rpg icon, a WANTED poster nailed to a harbour post showing a sailor's face and a heap of gold, medium shot, painterly"},
    {"id": "cursed_debt",    "description": "Owes a blood debt to a superstitious captain who never forgets a name", "toneTag": "gritty", "statAffinity": {"wisdom": 1.1, "constitution": 1.1}, "criminalFlag": False,
     "iconPrompt": "pirate rpg icon, a scarred captain gripping a debt-marked coin and staring down a nervous sailor in a dim cabin, medium shot, painterly"},
    {"id": "rival_captain",  "description": "Is hunted across the sea lanes by a rival captain with a personal grudge", "toneTag": "dramatic", "statAffinity": {"strength": 1.1, "charisma": 1.1}, "criminalFlag": False,
     "iconPrompt": "pirate rpg icon, two ships closing for battle at dawn under black flags, cannon smoke, wide shot, painterly"},
    {"id": "mutinous_crew",  "description": "Commands (or serves in) a crew one bad meal away from mutiny", "toneTag": "gritty", "statAffinity": {"charisma": 1.2, "wisdom": 1.1}, "criminalFlag": False,
     "iconPrompt": "pirate rpg icon, muttering sailors glaring toward the helm below decks, clenched fists, tense, medium shot, painterly"},
]

SECRETS = [
    {"id": "hidden_pelt",     "description": "Keeps a selkie pelt hidden and would kill or die to keep it secret", "toneTag": "dramatic", "severity": "high", "statAffinity": {"wisdom": 1.2}, "criminalFlag": False},
    {"id": "royal_pardon",    "description": "Secretly carries a royal pardon and is spying on their own crew for the crown", "toneTag": "dramatic", "severity": "high", "statAffinity": {"charisma": 1.1}, "criminalFlag": True},
    {"id": "sank_own_ship",   "description": "Scuttled their last ship for the insurance and let the blame fall on a friend", "toneTag": "gritty", "severity": "medium", "statAffinity": {"intelligence": 1.1}, "criminalFlag": True},
]

PLOTS = [
    {"id": "buried_gold",      "label": "The Buried Gold",   "weight": 6,
     "description": "A map, a rumour, a chest of gold on an unmarked island — and a dozen other souls who want it. Get there first, and get off alive.",
     "iconPrompt": "pirate rpg icon, an old torn treasure map, a compass and a spade on weathered planks, dramatic lighting, close shot, painterly",
     "iconPath": "PLOT_ARCHETYPES#buried_gold.webp"},
    {"id": "the_kraken",       "label": "The Kraken Rises",  "weight": 4,
     "description": "Ships are vanishing on the reef road and the old sailors have stopped laughing about it. Something enormous is awake beneath the green water.",
     "iconPrompt": "pirate rpg icon, a massive kraken tentacle rising to seize a ship at dusk, terrified crew, wide shot, painterly",
     "iconPath": "PLOT_ARCHETYPES#the_kraken.webp"},
    {"id": "letters_of_marque","label": "Letters of Marque", "weight": 5,
     "description": "The crown will make your raiding legal — for a price and a leash. Take the papers and hunt for a flag, or stay free and hunted.",
     "iconPrompt": "pirate rpg icon, a wax-sealed royal commission laid over a black flag, a quill and a pistol, close shot, painterly",
     "iconPath": "PLOT_ARCHETYPES#letters_of_marque.webp"},
]

DISTINGUISHING = [
    {"id": "peg_leg",     "label": "a carved wooden peg leg"},
    {"id": "eye_patch",   "label": "a leather eye patch over an old wound"},
    {"id": "hook_hand",   "label": "an iron hook in place of a hand"},
    {"id": "gold_tooth",  "label": "a glinting gold front tooth"},
    {"id": "salt_scarred","label": "sun- and salt-scarred weathered skin"},
]
QUIRKS = [
    {"id": "talks_to_gulls", "quirk": "Talks to the gulls as if they answer, and swears they do", "statAffinity": {"wisdom": 1.2}},
    {"id": "hoards_charts",  "quirk": "Cannot pass up a sea chart, hoards them rolled in every pocket", "statAffinity": {"intelligence": 1.2}},
    {"id": "counts_coins",   "quirk": "Counts their coins aloud, always, even in a fight", "statAffinity": {"charisma": 1.1}},
    {"id": "fears_dry_land", "quirk": "Gets landsick and uneasy the moment their boots leave a deck", "statAffinity": {"constitution": 1.1}},
]

TAG_POOLS = {
    "always":      ["pirate", "age-of-sail", "high seas", "adventure"],
    "gritty":      ["survival", "hardship", "desperation"],
    "dramatic":    ["betrayal", "treasure", "duel"],
    "neutral":     ["voyage", "trade", "port life"],
    "cozy":        ["shanties", "crewmates", "warm galley"],
    "criminal":    ["smuggling", "bounty", "contraband"],
    "professionTags": {
        "Deckhand": ["rigging", "labour"], "Navigator": ["charts", "stars"],
        "Ship's Cook": ["galley", "rations"], "Gunner": ["cannon", "powder"],
        "Quartermaster": ["loot", "ledger"],
    },
}

def names(masc, fem, neutral, last):
    return {"masc": masc, "fem": fem, "neutral": neutral, "last": last}

NAME_POOLS = {
    "Rover":    names(["Bartholomew", "Silas", "Emory", "Ren", "Cormac"],
                      ["Anne", "Grace", "Mirren", "Isolde", "Perl"],
                      ["Marlow", "Sian", "Rael"],
                      ["Blackwater", "Tidecaller", "Ravenmoor", "Saltmarsh", "Deepwell"]),
    "Islander": names(["Kai", "Teodoro", "Malolo", "Reef", "Manu"],
                      ["Leilani", "Marisol", "Talia", "Noa", "Sela"],
                      ["Aloa", "Keo", "Nauti"],
                      ["Palmwright", "Coralind", "Shoalborn", "Reefkin", "Sunward"]),
    "Deserter": names(["Edmund", "Percival", "Hollis", "Bram", "Alaric"],
                      ["Constance", "Winifred", "Adelaide", "Maren", "Lucia"],
                      ["Ash", "Wren", "Sol"],
                      ["Ashford", "Blackwood", "Crane", "Whitlock", "Fenn"]),
    "Selkie":   names(["Rónán", "Finn", "Muir", "Cael", "Bran"],
                      ["Muirenn", "Saoirse", "Oona", "Delphine", "Nerida"],
                      ["Tarn", "Selk", "Mara"],
                      ["Greyseal", "Coldcurrent", "Pelttaker", "Deepsong", "Underwave"]),
    "default":  names(["Jack", "Will", "Tom", "Ned", "Sam"],
                      ["Bess", "Kit", "Nan", "Meg", "Poll"],
                      ["Robin", "Frey", "Lark"],
                      ["Sparrow", "Flint", "Bones", "Teach", "Rackham"]),
}

MANIFEST = {
    "id": "example-pirate-cove",
    "label": "Pirate Cove (Example)",
    "description": "A bundled-asset example genre pack — swashbuckling crews, buried gold, and a kraken on the reef.",
    "portraitStyle": "painterly age-of-sail pirate portrait, weathered skin, nautical clothing, warm dramatic lighting, oil painting style",
    "tts": {"preprocess": "default",
            "browser": {"rate": 1.0, "pitch": 0.95},
            "kokoro":  {"voice": "am_michael", "speed": 1.0},
            "openai":  {"voice": "onyx", "speed": 1.0}},
    "music": {"prefix": "piratecove", "tracks": ["piratecove-shanty.wav"]},
    "slots": {
        "identityCat": "CREW",  "identityHeader": "Crew",
        "profCat": "TRADE",     "profHeader": "Trade",
        "econCat": "PURSE",     "econHeader": "Purse",
        "cityCat": "PORT",      "cityHeader": "Port",
        "familyCat": "KIN", "lifeEventCat": "YARN", "tensionCat": "SQUALL",
        "filterGendersToGenre": False, "familyUsesIconSlug": False,
        "economicTiers": ECON_TUPLES,
    },
    "voice": {
        "identityLabel": "Crew",
        "genreLabel": "age-of-sail pirate",
        "openingNote": "Open on a deck, a dock, or a smoky tavern — put the character in the middle of ship's life with salt on the air.",
        "appearanceNote": "Describe weathered, sun-and-salt-worn features and practical nautical dress; scars and missing pieces are welcome.",
        "systemPrompt": "You are running a rollicking age-of-sail pirate adventure — equal parts danger, dark humour, and camaraderie. Keep it swashbuckling, not grim; every scene should smell of tar, rum, and salt water.",
    },
    "gameplay": {"ageRange": [16, 60]},
    "data": {
        "races": IDENTITIES, "professions": PROFESSIONS, "lifeEvents": LIFE_EVENTS,
        "familyStructures": FAMILIES, "parentStatuses": PARENT_STATUSES,
        "siblingDynamics": SIBLING_DYNAMICS, "tensions": TENSIONS, "secrets": SECRETS,
        "economicTiers": ECON_DATA, "citySettings": CITIES, "tagPools": TAG_POOLS,
        "namePools": NAME_POOLS, "plotArchetypes": PLOTS,
        "distinguishingFeatures": DISTINGUISHING, "quirks": QUIRKS,
    },
    "staticCards": {
        "STATIC_LOCATIONS": [
            {"keys": "Port Royale", "type": "location",
             "entry": "Port Royale — a lawless boomtown of taverns, gambling dens, and a busy gallows, where a fortune can be won and lost before sunrise."}
        ],
        "STATIC_FACTIONS": [
            {"keys": "The Brethren", "type": "faction",
             "entry": "The Brethren of the Cove — a loose pirate confederation bound by a shared code, quick to feud and quicker to unite against the navy."},
            {"keys": "Royal Navy", "type": "faction",
             "entry": "The Royal Navy — disciplined, well-gunned, and hanging pirates by the dozen; safety and death in the same blue coat."},
        ],
    },
}

# ── Icon + audio generation ─────────────────────────────────────────────────
# Themed background color per category so the placeholders read at a glance.
CAT_COLORS = {
    "CREW": (46, 89, 122), "TRADE": (120, 79, 43), "PURSE": (138, 112, 40),
    "PORT": (58, 96, 74), "KIN": (110, 66, 92), "YARN": (72, 84, 120),
    "SQUALL": (95, 60, 60), "PLOT_ARCHETYPES": (40, 66, 92),
}

def font(size):
    for name in ("seguibl.ttf", "segoeui.ttf", "arialbd.ttf", "arial.ttf", "DejaVuSans-Bold.ttf"):
        try:
            return ImageFont.truetype(name, size)
        except OSError:
            continue
    return ImageFont.load_default()

def wrap(draw, text, fnt, max_w):
    words, lines, cur = text.split(), [], ""
    for w in words:
        trial = (cur + " " + w).strip()
        if draw.textlength(trial, font=fnt) <= max_w:
            cur = trial
        else:
            if cur:
                lines.append(cur)
            cur = w
    if cur:
        lines.append(cur)
    return lines

def make_icon(cat, slug, size=256):
    bg = CAT_COLORS.get(cat, (70, 70, 80))
    img = Image.new("RGB", (size, size), bg)
    d = ImageDraw.Draw(img)
    pad = int(size * 0.06)
    d.rounded_rectangle([pad, pad, size - pad, size - pad], radius=int(size * 0.1),
                        outline=(235, 226, 200), width=max(2, size // 80))
    # category chip
    cfnt = font(int(size * 0.085))
    d.text((size / 2, size * 0.16), cat.replace("_", " "), font=cfnt, fill=(235, 226, 200), anchor="mm")
    # slug label, wrapped
    label = slug.replace("_", " ").replace("-", " ").title()
    lfnt = font(int(size * 0.13))
    lines = wrap(d, label, lfnt, size - 2 * pad - int(size * 0.08))
    lh = (lfnt.getbbox("Ag")[3] - lfnt.getbbox("Ag")[1]) + int(size * 0.03)
    y = size / 2 - (len(lines) - 1) * lh / 2 + int(size * 0.04)
    for ln in lines:
        d.text((size / 2, y), ln, font=lfnt, fill=(255, 250, 240), anchor="mm")
        y += lh
    buf = io.BytesIO()
    img.save(buf, format="WEBP", quality=88)
    return buf.getvalue()

def make_cover(size=512):
    img = Image.new("RGB", (size, size), (26, 42, 58))
    d = ImageDraw.Draw(img)
    d.rounded_rectangle([12, 12, size - 12, size - 12], radius=28, outline=(212, 175, 90), width=6)
    d.text((size / 2, size * 0.34), "PIRATE", font=font(int(size * 0.15)), fill=(240, 226, 180), anchor="mm")
    d.text((size / 2, size * 0.5), "COVE", font=font(int(size * 0.15)), fill=(240, 226, 180), anchor="mm")
    d.text((size / 2, size * 0.66), "example genre pack", font=font(int(size * 0.05)), fill=(190, 205, 220), anchor="mm")
    buf = io.BytesIO()
    img.save(buf, format="WEBP", quality=90)
    return buf.getvalue()

def make_shanty_wav(seconds=6, rate=16000):
    """A short, gentle major-key arpeggio so the bundled BGM track is real audio."""
    notes = [220.0, 277.18, 329.63, 440.0, 329.63, 277.18]  # A major-ish, looping
    buf = io.BytesIO()
    w = wave.open(buf, "wb")
    w.setnchannels(1); w.setsampwidth(2); w.setframerate(rate)
    total = int(seconds * rate)
    frames = bytearray()
    per_note = total // len(notes)
    for i in range(total):
        note = notes[min(i // per_note, len(notes) - 1)]
        t = i / rate
        env = min(1.0, (i % per_note) / (0.05 * rate)) * max(0.0, 1.0 - ((i % per_note) / per_note))
        s = 0.28 * env * math.sin(2 * math.pi * note * t)
        frames += struct.pack("<h", int(max(-1, min(1, s)) * 32767))
    w.writeframes(bytes(frames))
    w.close()
    return buf.getvalue()

def collect_icons():
    """Every CATEGORY#slug.webp the slot machine will request for this genre."""
    files = {"icons/_genre.webp": make_cover()}
    def add(cat, slug):
        files[f"icons/{cat}#{slug}.webp"] = make_icon(cat, slug)
    for r in IDENTITIES:            add("CREW", r["id"])
    for p in PROFESSIONS:           add("TRADE", p["iconPath"].split("#")[1].split(".")[0])
    for _, slug, _ in ECON_TUPLES:  add("PURSE", slug)
    for c in CITIES:                add("PORT", c["id"])
    for f in FAMILIES:              add("KIN", f["id"])
    for e in LIFE_EVENTS:           add("YARN", e["id"])
    for t in TENSIONS:              add("SQUALL", t["id"])
    for pl in PLOTS:                add("PLOT_ARCHETYPES", pl["id"])
    return files

def main():
    icons = collect_icons()
    wav = make_shanty_wav()
    with zipfile.ZipFile(OUT, "w", zipfile.ZIP_DEFLATED) as z:
        z.writestr("manifest.json", json.dumps(MANIFEST, indent=2, ensure_ascii=False))
        for path, data in icons.items():
            z.writestr(path, data)
        z.writestr("audio/piratecove-shanty.wav", wav)
    print(f"Wrote {OUT}  ({len(icons)} icons + 1 audio track, {OUT.stat().st_size // 1024} KB)")

if __name__ == "__main__":
    main()
