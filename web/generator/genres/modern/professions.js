// genres/modern/professions.js
// Each profession carries: title, industry, economicTier (1-5),
// statAffinity (optional — the stats that make this profession more likely),
// sentiments (pool to draw from randomly)
//
// Economic tiers:
//   1 = poverty / survival
//   2 = working poor
//   3 = working / lower-middle class
//   4 = middle / upper-middle class
//   5 = wealthy / elite
//
// minAge — optional; engine.js's profPool filter drops this profession for a
//   character younger than this (falling back to the unfiltered pool if that
//   would leave nothing). Omitted everywhere except professions that
//   genuinely require years of real-world credentialing or career
//   progression the character wouldn't have had yet (a medical/law degree,
//   licensure, senior leadership, military discharge). Deliberately NOT
//   added to trades, creative work, tech, or street-level crime — teenage
//   prodigies/workers are realistic there.

import { SENTIMENTS } from "../../common/sentiments.js";

export const PROFESSIONS = [
  // ── BLUE COLLAR / TRADES ──────────────────────────────────────────────────
  {
    title: "Dock worker",
    industry: "Shipping & logistics",
    economicTier: 2,
    statAffinity: { strength: 1.4, constitution: 1.2 },
    sentiments: ["resentful", "burned out", "quietly satisfied", "proud"],
    iconPrompt:
      "Modern RPG icon. A dock worker in high-visibility gear on a shipping pier, checking a manifest beside a stack of containers, harbor cranes visible in the early morning behind them.",
    iconPath: "generator/genres/modern/icons/PROFESSION#dock_worker.webp",
  },
  {
    title: "Electrician",
    industry: "Trades",
    economicTier: 3,
    statAffinity: { dexterity: 1.3, intelligence: 1.1 },
    sentiments: ["proud", "quietly satisfied", "indifferent"],
    iconPrompt:
      "Modern RPG icon. An electrician in work gear crouching at an open commercial electrical panel, flashlight between their teeth, methodical and unhurried with a job that has no margin for error.",
    iconPath: "generator/genres/modern/icons/PROFESSION#electrician.webp",
  },
  {
    title: "Plumber",
    industry: "Trades",
    economicTier: 3,
    statAffinity: { strength: 1.2, dexterity: 1.2 },
    sentiments: ["proud", "indifferent", "quietly satisfied"],
    iconPrompt:
      "Modern RPG icon. A plumber under a kitchen sink in a residential home, wrenches within reach, reading the pipe configuration before deciding where to start — someone who has seen everything.",
    iconPath: "generator/genres/modern/icons/PROFESSION#plumber.webp",
  },
  {
    title: "Auto mechanic",
    industry: "Automotive",
    economicTier: 3,
    statAffinity: { dexterity: 1.3, intelligence: 1.1, strength: 1.1 },
    sentiments: ["passionate", "proud", "quietly satisfied", "burned out"],
    iconPrompt:
      "Modern RPG icon. An auto mechanic leaning over an open engine bay, grease-stained hands and a diagnostic tablet nearby — the focused confidence of genuine knowledge of machines.",
    iconPath: "generator/genres/modern/icons/PROFESSION#auto_mechanic.webp",
  },
  {
    title: "Long-haul truck driver",
    industry: "Transportation",
    economicTier: 3,
    statAffinity: { constitution: 1.3, wisdom: 1.1 },
    sentiments: ["indifferent", "quietly satisfied", "homesick", "burned out"],
    iconPrompt:
      "Modern RPG icon. A long-haul truck driver at a rest stop at night, coffee in hand, studying a route on the dash — hours of road behind them, more ahead, comfortable in a way the job either teaches you or breaks you.",
    iconPath:
      "generator/genres/modern/icons/PROFESSION#long_haul_truck_driver.webp",
  },
  {
    title: "Construction worker",
    industry: "Construction",
    economicTier: 2,
    statAffinity: { strength: 1.5, constitution: 1.3 },
    sentiments: ["resentful", "proud", "burned out", "indifferent"],
    iconPrompt:
      "Modern RPG icon. A construction worker on a job site at dawn, hard hat on, steel framing visible behind them — the work already started before most of the city is awake.",
    iconPath:
      "generator/genres/modern/icons/PROFESSION#construction_worker.webp",
  },
  {
    title: "Welder",
    industry: "Manufacturing",
    economicTier: 3,
    statAffinity: { strength: 1.3, dexterity: 1.3 },
    sentiments: ["proud", "indifferent", "quietly satisfied"],
    iconPrompt:
      "Modern RPG icon. A welder in full protective gear, face shield raised between passes, sparks still settling on the metal shop floor around their boots.",
    iconPath: "generator/genres/modern/icons/PROFESSION#welder.webp",
  },
  {
    title: "Garbage collector",
    industry: "Municipal services",
    economicTier: 2,
    statAffinity: { constitution: 1.4, strength: 1.2 },
    sentiments: ["resentful", "indifferent", "quietly satisfied", "ashamed"],
    iconPrompt:
      "Modern RPG icon. A garbage collector working an early morning route, the truck running behind them on an empty residential street — efficient and invisible to a city that depends entirely on this work.",
    iconPath: "generator/genres/modern/icons/PROFESSION#garbage_collector.webp",
  },
  {
    title: "Factory line worker",
    industry: "Manufacturing",
    economicTier: 2,
    statAffinity: { constitution: 1.3, dexterity: 1.1 },
    sentiments: ["resentful", "burned out", "indifferent"],
    iconPrompt:
      "Modern RPG icon. A factory line worker at their station, headphones in, the rhythm of the production line visible in practiced movements — hours of this ahead and hours behind.",
    iconPath:
      "generator/genres/modern/icons/PROFESSION#factory_line_worker.webp",
  },
  {
    title: "Warehouse worker",
    industry: "Logistics",
    economicTier: 2,
    statAffinity: { strength: 1.3, constitution: 1.2 },
    sentiments: ["resentful", "burned out", "indifferent", "desperate"],
    iconPrompt:
      "Modern RPG icon. A warehouse worker in a vast distribution center, scanning barcodes with a handheld device, surrounded by shelves that go up further than they should — the scale of the place indifferent to any one person in it.",
    iconPath: "generator/genres/modern/icons/PROFESSION#warehouse_worker.webp",
  },

  // ── SERVICE INDUSTRY ──────────────────────────────────────────────────────
  {
    title: "Barista",
    industry: "Food & beverage",
    economicTier: 2,
    statAffinity: { charisma: 1.2, dexterity: 1.1 },
    sentiments: [
      "indifferent",
      "quietly satisfied",
      "passionate",
      "burned out",
    ],
    iconPrompt:
      "Modern RPG icon. A barista behind the counter during the morning rush, pulling espresso with the efficiency of someone who has run this particular race a thousand times and still takes it seriously.",
    iconPath: "generator/genres/modern/icons/PROFESSION#barista.webp",
  },
  {
    title: "Line cook",
    industry: "Food & beverage",
    economicTier: 2,
    statAffinity: { dexterity: 1.3, constitution: 1.2 },
    sentiments: ["passionate", "burned out", "resentful", "proud"],
    iconPrompt:
      "Modern RPG icon. A line cook at a hot station mid-service, tickets running above, everything moving at once — the controlled chaos of someone who is exactly where the pressure is and has made their peace with that.",
    iconPath: "generator/genres/modern/icons/PROFESSION#line_cook.webp",
  },
  {
    title: "Restaurant manager",
    industry: "Food & beverage",
    economicTier: 3,
    statAffinity: { charisma: 1.3, wisdom: 1.2 },
    sentiments: ["burned out", "proud", "resentful", "quietly satisfied"],
    iconPrompt:
      "Modern RPG icon. A restaurant manager during dinner service doing ten things at once — checking a table, reading a ticket, scanning the room — the invisible spine of an operation that cannot stop moving.",
    iconPath:
      "generator/genres/modern/icons/PROFESSION#restaurant_manager.webp",
  },
  {
    title: "Hotel front desk clerk",
    industry: "Hospitality",
    economicTier: 2,
    statAffinity: { charisma: 1.3, wisdom: 1.1 },
    sentiments: ["indifferent", "burned out", "quietly satisfied"],
    iconPrompt:
      "Modern RPG icon. A hotel front desk clerk during a busy check-in evening, professionally pleasant under pressure, managing three problems simultaneously while appearing to manage none.",
    iconPath:
      "generator/genres/modern/icons/PROFESSION#hotel_front_desk_clerk.webp",
  },
  {
    title: "Rideshare driver",
    industry: "Gig economy",
    economicTier: 2,
    statAffinity: { charisma: 1.2, wisdom: 1.1 },
    sentiments: ["resentful", "indifferent", "desperate", "quietly satisfied"],
    iconPrompt:
      "Modern RPG icon. A rideshare driver waiting between fares in a parking lot, phone mounted on the dash, the city visible through the windshield — earning a living hour by hour on someone else's platform.",
    iconPath: "generator/genres/modern/icons/PROFESSION#rideshare_driver.webp",
  },
  {
    title: "Tattoo artist",
    industry: "Personal services",
    economicTier: 3,
    statAffinity: { dexterity: 1.5, charisma: 1.2 },
    sentiments: ["passionate", "proud", "quietly satisfied"],
    iconPrompt:
      "Modern RPG icon. A tattoo artist focused over a client's arm in a well-lit studio, needlework precise and deliberate, the walls covered in flash art and framed photos of completed work.",
    iconPath: "generator/genres/modern/icons/PROFESSION#tattoo_artist.webp",
  },
  {
    title: "Hairdresser",
    industry: "Personal services",
    economicTier: 3,
    statAffinity: { charisma: 1.4, dexterity: 1.2 },
    sentiments: ["passionate", "quietly satisfied", "burned out", "proud"],
    iconPrompt:
      "Modern RPG icon. A hairdresser in a busy salon, scissors working confidently, talking easily with the client in the chair — someone who knows more about this neighborhood than most people who live in it.",
    iconPath: "generator/genres/modern/icons/PROFESSION#hairdresser.webp",
  },
  {
    title: "Personal trainer",
    industry: "Fitness",
    economicTier: 3,
    statAffinity: { strength: 1.4, charisma: 1.3, constitution: 1.2 },
    sentiments: ["passionate", "proud", "indifferent", "burned out"],
    iconPrompt:
      "Modern RPG icon. A personal trainer in a gym watching a client work through a set, one eye on form and one on the clock — pushing without babying, knowing exactly how far is far enough.",
    iconPath: "generator/genres/modern/icons/PROFESSION#personal_trainer.webp",
  },
  {
    title: "Security guard",
    industry: "Private security",
    economicTier: 2,
    statAffinity: { strength: 1.3, constitution: 1.2 },
    sentiments: ["indifferent", "resentful", "quietly satisfied", "burned out"],
    iconPrompt:
      "Modern RPG icon. A security guard on a late-night lobby post, uniform neat, watching the monitors and entrance — the practiced alertness of someone who has learned to be bored and ready at the exact same time.",
    iconPath: "generator/genres/modern/icons/PROFESSION#security_guard.webp",
  },
  {
    title: "Delivery driver",
    industry: "Gig economy",
    economicTier: 2,
    statAffinity: { constitution: 1.2, dexterity: 1.1 },
    sentiments: ["indifferent", "resentful", "desperate"],
    iconPrompt:
      "Modern RPG icon. A delivery driver jogging up an apartment stairwell with a stack of packages, app open on their phone — the math of a shift that only works if nothing goes wrong.",
    iconPath: "generator/genres/modern/icons/PROFESSION#delivery_driver.webp",
  },

  // ── CREATIVE / ARTS ───────────────────────────────────────────────────────
  {
    title: "Freelance graphic designer",
    industry: "Creative services",
    economicTier: 3,
    statAffinity: { intelligence: 1.3, dexterity: 1.2, charisma: 1.1 },
    sentiments: ["passionate", "burned out", "quietly satisfied", "desperate"],
    iconPrompt:
      "Modern RPG icon. A freelance graphic designer at a home desk surrounded by monitors and cold coffee, deep in a deadline — the professional solitude of someone who works for everyone and answers to no one.",
    iconPath:
      "generator/genres/modern/icons/PROFESSION#freelance_graphic_designer.webp",
  },
  {
    title: "Struggling musician",
    industry: "Entertainment",
    economicTier: 1,
    statAffinity: { charisma: 1.4, wisdom: 1.2 },
    sentiments: ["passionate", "desperate", "resentful", "burned out"],
    iconPrompt:
      "Modern RPG icon. A struggling musician loading their own gear into a van after a late set at a half-empty bar — another night of doing it for the love of it, and not much else.",
    iconPath:
      "generator/genres/modern/icons/PROFESSION#struggling_musician.webp",
  },
  {
    title: "Working actor",
    industry: "Entertainment",
    economicTier: 2,
    statAffinity: { charisma: 1.5, intelligence: 1.2 },
    sentiments: ["passionate", "desperate", "burned out", "quietly satisfied"],
    iconPrompt:
      "Modern RPG icon. A working actor in a green room between takes, script in hand, running lines quietly — not a star, just someone who shows up and does the work, every time.",
    iconPath: "generator/genres/modern/icons/PROFESSION#working_actor.webp",
  },
  {
    title: "Photographer",
    industry: "Creative services",
    economicTier: 3,
    statAffinity: { dexterity: 1.2, intelligence: 1.2, charisma: 1.1 },
    sentiments: ["passionate", "indifferent", "quietly satisfied"],
    iconPrompt:
      "Modern RPG icon. A photographer crouched on a street corner, camera up, waiting for a frame that hasn't happened yet — the patience of someone who makes a living seeing what everyone else walks past.",
    iconPath: "generator/genres/modern/icons/PROFESSION#photographer.webp",
  },
  {
    title: "Tattoo artist",
    industry: "Art & personal services",
    economicTier: 3,
    statAffinity: { dexterity: 1.5, charisma: 1.2 },
    sentiments: ["passionate", "proud", "quietly satisfied"],
    iconPrompt:
      "Modern RPG icon. A tattoo artist at their station sketching a custom design before the client arrives — art made to order, worn for life, taken as seriously as it deserves.",
    iconPath: "generator/genres/modern/icons/PROFESSION#tattoo_artist.webp",
  },
  {
    title: "Freelance writer",
    industry: "Media",
    economicTier: 2,
    statAffinity: { intelligence: 1.4, wisdom: 1.2 },
    sentiments: ["passionate", "desperate", "burned out", "quietly satisfied"],
    iconPrompt:
      "Modern RPG icon. A freelance writer at a coffee shop table or apartment desk, notebook open alongside a laptop, wrestling with something that isn't working yet but will — probably.",
    iconPath: "generator/genres/modern/icons/PROFESSION#freelance_writer.webp",
  },
  {
    title: "Graffiti artist",
    industry: "Street art",
    economicTier: 1,
    statAffinity: { dexterity: 1.4, charisma: 1.2 },
    sentiments: ["passionate", "resentful", "proud"],
    iconPrompt:
      "Modern RPG icon. A graffiti artist at work on a wall in the pre-dawn quiet of an urban alley, spray can in hand, the city asleep around them — something being made where nothing was before.",
    iconPath: "generator/genres/modern/icons/PROFESSION#graffiti_artist.webp",
  },

  // ── WHITE COLLAR / PROFESSIONAL ───────────────────────────────────────────
  {
    title: "Accountant",
    industry: "Finance",
    economicTier: 4,
    minAge: 22,
    statAffinity: { intelligence: 1.4, wisdom: 1.2 },
    sentiments: ["indifferent", "quietly satisfied", "burned out", "resentful"],
    iconPrompt:
      "Modern RPG icon. An accountant at a mid-rise office desk surrounded by dual monitors of spreadsheets, the quiet authority of someone who understands exactly where all the money actually goes.",
    iconPath: "generator/genres/modern/icons/PROFESSION#accountant.webp",
  },
  {
    title: "Software developer",
    industry: "Technology",
    economicTier: 4,
    statAffinity: { intelligence: 1.5, dexterity: 1.1 },
    sentiments: [
      "passionate",
      "burned out",
      "indifferent",
      "quietly satisfied",
    ],
    iconPrompt:
      "Modern RPG icon. A software developer in headphones at a standing desk, multiple monitors running, deep in a problem — the concentrated look of someone in the middle of building something that doesn't exist yet.",
    iconPath:
      "generator/genres/modern/icons/PROFESSION#software_developer.webp",
  },
  {
    title: "Nurse",
    industry: "Healthcare",
    economicTier: 3,
    statAffinity: { wisdom: 1.3, constitution: 1.2, charisma: 1.1 },
    sentiments: ["passionate", "burned out", "proud", "resentful"],
    iconPrompt:
      "Modern RPG icon. A nurse in scrubs moving through a hospital ward near the end of a long shift, still sharp, still present — the practiced care of someone who has learned to give more than they have.",
    iconPath: "generator/genres/modern/icons/PROFESSION#nurse.webp",
  },
  {
    title: "Paramedic",
    industry: "Emergency services",
    economicTier: 3,
    statAffinity: { constitution: 1.3, wisdom: 1.3, dexterity: 1.2 },
    sentiments: ["passionate", "burned out", "proud"],
    iconPrompt:
      "Modern RPG icon. A paramedic at the back of an ambulance during a call, working fast and calm in a confined space — the practiced efficiency of someone for whom seconds have always been the unit of measure.",
    iconPath: "generator/genres/modern/icons/PROFESSION#paramedic.webp",
  },
  {
    title: "High school teacher",
    industry: "Education",
    economicTier: 3,
    statAffinity: { wisdom: 1.4, charisma: 1.2, intelligence: 1.1 },
    sentiments: ["passionate", "burned out", "resentful", "quietly satisfied"],
    iconPrompt:
      "Modern RPG icon. A high school teacher at the front of a classroom, marker in hand, trying to reach twenty-something teenagers at once — the persistent optimism of someone who stayed in the job because it matters.",
    iconPath:
      "generator/genres/modern/icons/PROFESSION#high_school_teacher.webp",
  },
  {
    title: "Social worker",
    industry: "Public services",
    economicTier: 3,
    statAffinity: { wisdom: 1.4, charisma: 1.2 },
    sentiments: ["passionate", "burned out", "resentful", "quietly satisfied"],
    iconPrompt:
      "Modern RPG icon. A social worker in a cramped office or a client's home, case files open, trying to connect someone to a system with one hand while holding it back with the other.",
    iconPath: "generator/genres/modern/icons/PROFESSION#social_worker.webp",
  },
  {
    title: "Lawyer",
    industry: "Legal",
    economicTier: 4,
    minAge: 25,
    statAffinity: { intelligence: 1.4, charisma: 1.3, wisdom: 1.1 },
    sentiments: ["proud", "burned out", "indifferent", "quietly satisfied"],
    iconPrompt:
      "Modern RPG icon. A lawyer in a courthouse hallway between hearings, phone up and briefcase in hand — the particular pace of someone who bills by the hour and never has enough of them.",
    iconPath: "generator/genres/modern/icons/PROFESSION#lawyer.webp",
  },
  {
    title: "Corporate HR manager",
    industry: "Corporate",
    economicTier: 4,
    statAffinity: { charisma: 1.3, wisdom: 1.2 },
    sentiments: ["indifferent", "burned out", "quietly satisfied", "resentful"],
    iconPrompt:
      "Modern RPG icon. A corporate HR manager in a glass-walled conference room, across the table from a difficult conversation they've been trained to have and never quite get used to.",
    iconPath:
      "generator/genres/modern/icons/PROFESSION#corporate_hr_manager.webp",
  },
  {
    title: "Financial analyst",
    industry: "Finance",
    economicTier: 4,
    minAge: 22,
    statAffinity: { intelligence: 1.5, wisdom: 1.1 },
    sentiments: ["indifferent", "proud", "burned out", "quietly satisfied"],
    iconPrompt:
      "Modern RPG icon. A financial analyst at a bank of market data screens, making fast calibrated decisions in a field where being right 60% of the time is considered a career.",
    iconPath: "generator/genres/modern/icons/PROFESSION#financial_analyst.webp",
  },
  {
    title: "Journalist",
    industry: "Media",
    economicTier: 3,
    statAffinity: { intelligence: 1.3, charisma: 1.3, wisdom: 1.1 },
    sentiments: ["passionate", "burned out", "resentful", "quietly satisfied"],
    iconPrompt:
      "Modern RPG icon. A journalist outside a building with recorder and notepad, the alert professional attention of someone looking for the story inside the official statement.",
    iconPath: "generator/genres/modern/icons/PROFESSION#journalist.webp",
  },
  {
    title: "Therapist",
    industry: "Mental health",
    economicTier: 4,
    minAge: 26,
    statAffinity: { wisdom: 1.5, charisma: 1.2, intelligence: 1.1 },
    sentiments: ["passionate", "quietly satisfied", "burned out"],
    iconPrompt:
      "Modern RPG icon. A therapist in a quiet, carefully arranged office, an empty chair across from them — the contained present stillness of someone who holds a great deal without showing where it goes afterward.",
    iconPath: "generator/genres/modern/icons/PROFESSION#therapist.webp",
  },
  {
    title: "Pharmacist",
    industry: "Healthcare",
    economicTier: 4,
    minAge: 24,
    statAffinity: { intelligence: 1.3, wisdom: 1.2 },
    sentiments: ["indifferent", "quietly satisfied", "burned out"],
    iconPrompt:
      "Modern RPG icon. A pharmacist at the dispensary counter reading a prescription carefully before filling it — the professional thoroughness of someone who knows this particular detail cannot be gotten wrong.",
    iconPath: "generator/genres/modern/icons/PROFESSION#pharmacist.webp",
  },

  // ── SALES / HUSTLE ────────────────────────────────────────────────────────
  {
    title: "Car salesperson",
    industry: "Automotive",
    economicTier: 3,
    statAffinity: { charisma: 1.5, intelligence: 1.1 },
    sentiments: ["proud", "indifferent", "resentful", "burned out"],
    iconPrompt:
      "Modern RPG icon. A car salesperson on the lot, hands in pockets, watching a couple walk between vehicles — someone who has read this type of customer before and already knows how it ends.",
    iconPath: "generator/genres/modern/icons/PROFESSION#car_salesperson.webp",
  },
  {
    title: "Real estate agent",
    industry: "Real estate",
    economicTier: 4,
    statAffinity: { charisma: 1.5, wisdom: 1.2 },
    sentiments: ["proud", "passionate", "burned out", "quietly satisfied"],
    iconPrompt:
      "Modern RPG icon. A real estate agent walking a client through an empty house, gesturing at the light and the ceiling height — the practiced enthusiasm of someone who makes a living making things feel possible.",
    iconPath: "generator/genres/modern/icons/PROFESSION#real_estate_agent.webp",
  },
  {
    title: "Insurance salesperson",
    industry: "Finance",
    economicTier: 3,
    statAffinity: { charisma: 1.4, intelligence: 1.1 },
    sentiments: ["indifferent", "resentful", "burned out", "ashamed"],
    iconPrompt:
      "Modern RPG icon. An insurance salesperson at a kitchen table with a potential client, papers spread between them — trying to close a deal that is genuinely good for everyone and cannot make anyone want to hear it.",
    iconPath:
      "generator/genres/modern/icons/PROFESSION#insurance_salesperson.webp",
  },
  {
    title: "Pawn shop owner",
    industry: "Retail",
    economicTier: 3,
    statAffinity: { charisma: 1.3, intelligence: 1.2, wisdom: 1.1 },
    sentiments: ["quietly satisfied", "indifferent", "proud"],
    iconPrompt:
      "Modern RPG icon. A pawn shop owner behind a cluttered glass counter, examining an item just brought in with the unsentimental eye of someone who has handled everybody's emergencies for years.",
    iconPath: "generator/genres/modern/icons/PROFESSION#pawn_shop_owner.webp",
  },

  // ── LAW ENFORCEMENT / MILITARY ────────────────────────────────────────────
  {
    title: "Police officer",
    industry: "Law enforcement",
    economicTier: 3,
    minAge: 21,
    statAffinity: { strength: 1.3, constitution: 1.2, charisma: 1.1 },
    sentiments: ["proud", "burned out", "resentful", "quietly satisfied"],
    iconPrompt:
      "Modern RPG icon. A police officer on a city beat, standing outside a building during a call — the weight of authority and its complications visible in how they hold themselves at the threshold.",
    iconPath: "generator/genres/modern/icons/PROFESSION#police_officer.webp",
  },
  {
    title: "Private investigator",
    industry: "Security",
    economicTier: 3,
    statAffinity: { intelligence: 1.3, wisdom: 1.3, dexterity: 1.1 },
    sentiments: [
      "passionate",
      "quietly satisfied",
      "burned out",
      "indifferent",
    ],
    iconPrompt:
      "Modern RPG icon. A private investigator parked on a quiet street, camera ready, watching a front door — the unglamorous patience of someone who does this for a living and stopped expecting drama years ago.",
    iconPath:
      "generator/genres/modern/icons/PROFESSION#private_investigator.webp",
  },
  {
    title: "Bounty hunter",
    industry: "Security",
    economicTier: 3,
    statAffinity: { strength: 1.4, dexterity: 1.2, wisdom: 1.1 },
    sentiments: ["passionate", "proud", "indifferent"],
    iconPrompt:
      "Modern RPG icon. A bounty hunter in a parking lot, checking a phone photo against a face — practical, focused, the methodical work of tracking someone who doesn't want to be found.",
    iconPath: "generator/genres/modern/icons/PROFESSION#bounty_hunter.webp",
  },
  {
    title: "Military veteran (recently discharged)",
    industry: "Military",
    economicTier: 2,
    minAge: 22,
    statAffinity: { strength: 1.4, constitution: 1.3, wisdom: 1.1 },
    sentiments: ["lost", "proud", "resentful", "burned out"],
    iconPrompt:
      "Modern RPG icon. A recently discharged veteran in civilian clothes at a grocery store or bus stop, the discipline still in their posture, navigating a world that operates at a completely different pace.",
    iconPath: "generator/genres/modern/icons/PROFESSION#military_veteran.webp",
  },
  {
    title: "Firefighter",
    industry: "Emergency services",
    economicTier: 3,
    statAffinity: { strength: 1.4, constitution: 1.3, charisma: 1.1 },
    sentiments: ["proud", "passionate", "burned out"],
    iconPrompt:
      "Modern RPG icon. A firefighter between calls at the station, gear within arm's reach, the particular alertness of someone always at some fraction of full readiness — waiting is most of the job.",
    iconPath: "generator/genres/modern/icons/PROFESSION#firefighter.webp",
  },

  // ── CRIMINAL / UNDERGROUND ────────────────────────────────────────────────
  {
    title: "Street-level drug dealer",
    industry: "Criminal",
    economicTier: 2,
    statAffinity: { charisma: 1.3, strength: 1.2, wisdom: 0.8 },
    sentiments: ["desperate", "resentful", "proud", "ashamed"],
    iconPrompt:
      "Modern RPG icon. A street-level dealer on a corner after dark, hoodie up, watching the block — the exhausting mathematics of a hustle that comes with no safety net and no days off.",
    iconPath:
      "generator/genres/modern/icons/PROFESSION#street_level_drug_dealer.webp",
  },
  {
    title: "Mid-level drug distributor",
    industry: "Criminal",
    economicTier: 3,
    statAffinity: { charisma: 1.3, intelligence: 1.2, strength: 1.1 },
    sentiments: ["proud", "quietly satisfied", "desperate", "resentful"],
    iconPrompt:
      "Modern RPG icon. A mid-level distributor in a car or warehouse, running logistics on a phone — insulated from the street but not from the risk, middle management in an industry with no HR department.",
    iconPath:
      "generator/genres/modern/icons/PROFESSION#mid_level_drug_distributor.webp",
  },
  {
    title: "Fixer",
    industry: "Criminal",
    economicTier: 4,
    statAffinity: { intelligence: 1.4, charisma: 1.3, wisdom: 1.2 },
    sentiments: ["proud", "quietly satisfied", "indifferent"],
    iconPrompt:
      "Modern RPG icon. A fixer in a neutral car or unremarkable office, phone to their ear, solving a problem that required exactly their particular network and zero official capacity.",
    iconPath: "generator/genres/modern/icons/PROFESSION#fixer.webp",
  },
  {
    title: "Con artist",
    industry: "Criminal",
    economicTier: 3,
    statAffinity: { charisma: 1.6, intelligence: 1.3, wisdom: 0.9 },
    sentiments: ["proud", "passionate", "indifferent", "quietly satisfied"],
    iconPrompt:
      "Modern RPG icon. A con artist at a hotel bar or networking event, working a mark they identified twenty minutes ago — attentive, charming, and thinking three steps ahead of everything being said.",
    iconPath: "generator/genres/modern/icons/PROFESSION#con_artist.webp",
  },
  {
    title: "Pickpocket / petty thief",
    industry: "Criminal",
    economicTier: 1,
    statAffinity: { dexterity: 1.5, charisma: 1.2 },
    sentiments: ["desperate", "resentful", "indifferent", "ashamed"],
    iconPrompt:
      "Modern RPG icon. A pickpocket moving through a crowded transit station or market, invisible in the flow, working a craft that depends entirely on never being the thing anyone notices.",
    iconPath:
      "generator/genres/modern/icons/PROFESSION#pickpocket_petty_thief.webp",
  },
  {
    title: "Burglar",
    industry: "Criminal",
    economicTier: 2,
    statAffinity: { dexterity: 1.5, intelligence: 1.2 },
    sentiments: ["proud", "desperate", "indifferent", "resentful"],
    iconPrompt:
      "Modern RPG icon. A burglar in dark clothes outside a residential building at night, methodically checking an entry point — the professional assessment that happens before the job, not during it.",
    iconPath: "generator/genres/modern/icons/PROFESSION#burglar.webp",
  },
  {
    title: "Enforcer / muscle",
    industry: "Criminal",
    economicTier: 3,
    statAffinity: { strength: 1.6, constitution: 1.3 },
    sentiments: ["proud", "indifferent", "resentful", "ashamed"],
    iconPrompt:
      "Modern RPG icon. An enforcer standing in the background of a meeting, arms crossed, not speaking — the reminder whose job is to exist in the room and be recognized for exactly what that means.",
    iconPath: "generator/genres/modern/icons/PROFESSION#enforcer_muscle.webp",
  },
  {
    title: "Getaway driver",
    industry: "Criminal",
    economicTier: 2,
    statAffinity: { dexterity: 1.4, constitution: 1.2 },
    sentiments: ["indifferent", "desperate", "quietly satisfied", "resentful"],
    iconPrompt:
      "Modern RPG icon. A getaway driver at the wheel of a parked car with the engine running, watching a building entrance in the rearview mirror, every sense calibrated for the moment things start moving.",
    iconPath: "generator/genres/modern/icons/PROFESSION#getaway_driver.webp",
  },
  {
    title: "Hacker / cybercriminal",
    industry: "Criminal",
    economicTier: 4,
    statAffinity: { intelligence: 1.6, dexterity: 1.2 },
    sentiments: ["passionate", "proud", "indifferent", "quietly satisfied"],
    iconPrompt:
      "Modern RPG icon. A hacker at a multi-screen setup in a darkened apartment, working through a system that doesn't know it's being entered — the focused quiet of someone breaking things from the inside.",
    iconPath:
      "generator/genres/modern/icons/PROFESSION#hacker_cybercriminal.webp",
  },
  {
    title: "Money launderer",
    industry: "Criminal",
    economicTier: 4,
    statAffinity: { intelligence: 1.4, charisma: 1.2, wisdom: 1.1 },
    sentiments: ["indifferent", "quietly satisfied", "ashamed", "proud"],
    iconPrompt:
      "Modern RPG icon. A money launderer in a legitimate-looking business — a restaurant, a dry cleaner — running numbers that make dirty money look ordinary, calm in the way expertise makes you calm.",
    iconPath: "generator/genres/modern/icons/PROFESSION#money_launderer.webp",
  },
  {
    title: "Forger",
    industry: "Criminal",
    economicTier: 3,
    statAffinity: { intelligence: 1.3, dexterity: 1.4 },
    sentiments: ["passionate", "proud", "quietly satisfied"],
    iconPrompt:
      "Modern RPG icon. A forger at a meticulous workstation with a loupe and focused lamp, comparing a document to a reference — the perfectionism of someone whose product has to be flawless or it's worthless.",
    iconPath: "generator/genres/modern/icons/PROFESSION#forger.webp",
  },
  {
    title: "Underground fight promoter",
    industry: "Criminal",
    economicTier: 3,
    statAffinity: { charisma: 1.4, strength: 1.2, intelligence: 1.1 },
    sentiments: ["proud", "quietly satisfied", "indifferent"],
    iconPrompt:
      "Modern RPG icon. An underground fight promoter at the edge of a makeshift venue, watching the crowd and the action, managing money and risk — the impresario of an operation that officially doesn't exist.",
    iconPath:
      "generator/genres/modern/icons/PROFESSION#underground_fight_promoter.webp",
  },

  // ── ELITE / WEALTHY ───────────────────────────────────────────────────────
  {
    title: "Investment banker",
    industry: "Finance",
    economicTier: 5,
    minAge: 23,
    statAffinity: { intelligence: 1.5, charisma: 1.3 },
    sentiments: ["proud", "burned out", "indifferent", "quietly satisfied"],
    iconPrompt:
      "Modern RPG icon. An investment banker in a high-floor office at night, city lights below, running numbers on a phone — the intensity of someone who equates time with money because that's literally true.",
    iconPath: "generator/genres/modern/icons/PROFESSION#investment_banker.webp",
  },
  {
    title: "Surgeon",
    industry: "Healthcare",
    economicTier: 5,
    minAge: 30,
    statAffinity: { intelligence: 1.5, dexterity: 1.4, wisdom: 1.2 },
    sentiments: ["proud", "burned out", "passionate", "quietly satisfied"],
    iconPrompt:
      "Modern RPG icon. A surgeon scrubbing in before a procedure, focused and unhurried — the quiet authority of someone in whose hands things that cannot be undone routinely are.",
    iconPath: "generator/genres/modern/icons/PROFESSION#surgeon.webp",
  },
  {
    title: "Corporate executive",
    industry: "Corporate",
    economicTier: 5,
    minAge: 32,
    statAffinity: { charisma: 1.4, intelligence: 1.3, wisdom: 1.2 },
    sentiments: ["proud", "indifferent", "burned out", "quietly satisfied"],
    iconPrompt:
      "Modern RPG icon. A corporate executive at the head of a glass-walled boardroom, comfortable at the top of a structure they built or inherited — the confidence that doesn't need a loud voice.",
    iconPath:
      "generator/genres/modern/icons/PROFESSION#corporate_executive.webp",
  },
  {
    title: "Corrupt politician",
    industry: "Government",
    economicTier: 5,
    minAge: 28,
    statAffinity: { charisma: 1.5, intelligence: 1.3, wisdom: 0.9 },
    sentiments: ["proud", "quietly satisfied", "indifferent"],
    iconPrompt:
      "Modern RPG icon. A politician at a public podium, the professional warmth of someone whose image is carefully constructed — the gap between the face and the agenda visible only if you know where to look.",
    iconPath:
      "generator/genres/modern/icons/PROFESSION#corrupt_politician.webp",
  },
  {
    title: "Crime boss",
    industry: "Criminal",
    economicTier: 5,
    minAge: 30,
    statAffinity: { charisma: 1.5, intelligence: 1.4, strength: 1.1 },
    sentiments: ["proud", "quietly satisfied", "indifferent"],
    iconPrompt:
      "Modern RPG icon. A crime boss in a well-appointed private room — restaurant back room, penthouse — calm and deliberate, surrounded by people who do not speak unless spoken to.",
    iconPath: "generator/genres/modern/icons/PROFESSION#crime_boss.webp",
  },
  // ── NSFW ─────────────────────────────────────────────────────────────────
  {
    title: "Sex Worker",
    industry: "Entertainment",
    economicTier: 2,
    nsfw: true,
    statAffinity: { charisma: 1.4, intelligence: 0.9, wisdom: 0.8 },
    sentiments: ["proud", "indifferent", "quietly satisfied", "burned out"],
    iconPrompt:
      "A female sex worker wearing a skimpy outfit outside a dimly lit club, surrounded by neon lights.",
    iconPath: "generator/genres/modern/icons/PROFESSION#sex_worker.webp",
  },
];
