const FIELD_SIZE = 3;
const SPOT_MS = 1100;

// iNaturalist photo licenses we are allowed to show in the gallery.
const OPEN_LICENSES = new Set([
  "cc0", "cc-by", "cc-by-nc", "cc-by-sa", "cc-by-nd", "cc-by-nc-sa", "cc-by-nc-nd", "pd",
]);
const GALLERY_MAX = 5;

// The logbook and sound preference are saved on the device so a returning
// child finds their own collection of spotted sharks again.
const STORE_KEY = "shark-spotter-collection-v1";
const SOUND_KEY = "shark-spotter-sound";

// Real shark families, grouped into kid-friendly names with a badge color.
const GROUPS = {
  mackerel: { name: "Mackerel shark", color: "#3b82c4" },
  requiem: { name: "Requiem shark", color: "#2f9d8f" },
  hammerhead: { name: "Hammerhead", color: "#7c6cd6" },
  carpet: { name: "Carpet shark", color: "#d9a441" },
  dogfish: { name: "Dogfish shark", color: "#7a8b99" },
  angel: { name: "Angel shark", color: "#b06ab3" },
  houndshark: { name: "Hound shark", color: "#8a9a4a" },
  bullhead: { name: "Bullhead shark", color: "#c96f4a" },
  sawshark: { name: "Sawshark", color: "#4a9db0" },
  frilled: { name: "Frilled shark", color: "#9b6a8a" },
  cowshark: { name: "Cow shark", color: "#5c8a86" },
  catshark: { name: "Cat shark", color: "#b5793b" },
  lantern: { name: "Lantern shark", color: "#4bb39a" },
  megatooth: { name: "Megatooth shark", color: "#b0562f" },
};

// Every shark is a real species. `art` is the bundled illustration, `inat` is the
// iNaturalist taxon id used to load real photos, `facts` is a list of kid-friendly
// facts (each can be heard on its own), and `info` fills the stat rows.
const SHARKS = [
  {
    slug: "great-white", name: "Great White Shark", sci: "Carcharodon carcharias",
    group: "mackerel", inat: 50873,
    facts: [
      "The great white is the biggest hunting shark in the ocean.",
      "It can leap right out of the water to surprise a seal.",
      "It can sense the tiny electric buzz of animals hiding in the sand.",
      "It grows new teeth all its life, so it never runs out.",
    ],
    info: {
      length: "Up to 6 m (20 ft)",
      weight: "Up to ~2,000 kg (4,400 lb)",
      speed: "Up to ~40 km/h (25 mph) in bursts",
      lifespan: "~70 years",
      range: "Cool and warm coastal seas worldwide",
      diet: "Seals, sea lions, fish, and other sharks",
    },
  },
  {
    slug: "mako", name: "Shortfin Mako", sci: "Isurus oxyrinchus",
    group: "mackerel", inat: 69677,
    facts: [
      "The shortfin mako is the fastest shark of them all.",
      "It can swim faster than cars drive around town.",
      "It keeps its body warmer than the sea so its muscles work super fast.",
      "It can leap high into the air when it chases speedy fish.",
    ],
    info: {
      length: "Up to ~4 m (13 ft)",
      weight: "Up to ~570 kg (1,250 lb)",
      speed: "Over 70 km/h (45 mph) — the fastest shark",
      lifespan: "~30 years",
      range: "Warm and temperate open oceans worldwide",
      diet: "Fast fish like tuna and mackerel, and squid",
    },
  },
  {
    slug: "basking", name: "Basking Shark", sci: "Cetorhinus maximus",
    group: "mackerel", inat: 82128,
    facts: [
      "The basking shark is the second-biggest fish in the whole ocean.",
      "It swims with its giant mouth wide open to catch tiny plankton.",
      "It does not bite — it strains its food out of the seawater.",
      "Even though it is huge, it is calm and gentle.",
    ],
    info: {
      length: "Up to ~10 m (33 ft)",
      weight: "Up to ~5,000 kg (11,000 lb)",
      speed: "Slow, about 4 km/h while feeding",
      lifespan: "~50 years",
      range: "Cool coastal waters worldwide",
      diet: "Plankton, filtered from the seawater",
    },
  },
  {
    slug: "thresher", name: "Thresher Shark", sci: "Alopias vulpinus",
    group: "mackerel", inat: 93696,
    facts: [
      "A thresher shark has a tail almost as long as the rest of its body.",
      "It swings its long tail like a whip to slap and stun fish.",
      "One whip of its tail can knock out several fish at once.",
      "It has big eyes to help it hunt in dim, deep water.",
    ],
    info: {
      length: "Up to ~6 m (20 ft) — about half is tail",
      weight: "Up to ~350 kg (770 lb)",
      speed: "A fast, agile swimmer",
      lifespan: "~20-50 years",
      range: "Open and coastal seas, warm and temperate",
      diet: "Schooling fish like sardines, and squid",
    },
  },
  {
    slug: "goblin", name: "Goblin Shark", sci: "Mitsukurina owstoni",
    group: "mackerel", inat: 105913,
    facts: [
      "The goblin shark lives deep down in the dark ocean.",
      "It can shoot its jaws right out of its mouth to grab prey.",
      "Its long flat snout can sense hidden animals nearby.",
      "It is pinkish because its blood shows through its thin skin.",
    ],
    info: {
      length: "~3-4 m (10-13 ft)",
      weight: "~150-200 kg (330-460 lb)",
      speed: "Slow",
      lifespan: "Not known (a deep-sea mystery)",
      range: "Deep sea worldwide, often 200-1,300 m down",
      diet: "Deep-sea fish, squid, and crustaceans",
    },
  },
  {
    slug: "tiger", name: "Tiger Shark", sci: "Galeocerdo cuvier",
    group: "requiem", inat: 52299,
    facts: [
      "Baby tiger sharks have dark stripes, just like a tiger.",
      "Tiger sharks will try to eat almost anything they find.",
      "Their curved teeth can even crack open a sea turtle's shell.",
      "The stripes slowly fade away as the shark grows up.",
    ],
    info: {
      length: "Up to ~5 m (16 ft)",
      weight: "Up to ~900 kg (2,000 lb)",
      speed: "~30 km/h (20 mph)",
      lifespan: "~30-40 years",
      range: "Tropical and warm coastal seas worldwide",
      diet: "Almost anything — fish, turtles, seabirds, and seals",
    },
  },
  {
    slug: "bull", name: "Bull Shark", sci: "Carcharhinus leucas",
    group: "requiem", inat: 84996,
    facts: [
      "Bull sharks are strong and stocky, just like a bull.",
      "They can swim up rivers into fresh water, not just the sea.",
      "They have been found far up rivers, a long way from the ocean.",
      "They like warm, shallow water close to shore.",
    ],
    info: {
      length: "Up to ~3.5 m (11 ft)",
      weight: "Up to ~300 kg (660 lb)",
      speed: "~19 km/h, faster in bursts",
      lifespan: "~16-25 years",
      range: "Warm coasts, plus rivers and lakes",
      diet: "Fish, dolphins, turtles, and other sharks",
    },
  },
  {
    slug: "blue", name: "Blue Shark", sci: "Prionace glauca",
    group: "requiem", inat: 110361,
    facts: [
      "The blue shark is a beautiful bright blue on top.",
      "It travels enormous distances, sometimes right across an ocean.",
      "It has long, thin, wing-like fins for gliding through the water.",
      "Blue sharks love to eat squid.",
    ],
    info: {
      length: "Up to ~3.8 m (12 ft)",
      weight: "Up to ~200 kg (440 lb)",
      speed: "Cruises slowly, but can sprint",
      lifespan: "~20 years",
      range: "Open oceans worldwide, cool and tropical",
      diet: "Squid and small schooling fish",
    },
  },
  {
    slug: "lemon", name: "Lemon Shark", sci: "Negaprion brevirostris",
    group: "requiem", inat: 106650,
    facts: [
      "The lemon shark has a yellow-brown color, like a lemon.",
      "Its color helps it hide over sandy sea floors.",
      "It often comes back to the same home area again and again.",
      "Young lemon sharks grow up together in safe, shallow nurseries.",
    ],
    info: {
      length: "Up to ~3.4 m (11 ft)",
      weight: "Up to ~180 kg (400 lb)",
      speed: "Moderate",
      lifespan: "~25-30 years",
      range: "Warm coasts of the Americas and West Africa",
      diet: "Bony fish, rays, and crustaceans",
    },
  },
  {
    slug: "hammerhead", name: "Great Hammerhead", sci: "Sphyrna mokarran",
    group: "hammerhead", inat: 56766,
    facts: [
      "The great hammerhead has a wide head shaped like a hammer.",
      "It swings its head over the sand to find hidden stingrays.",
      "Its eyes are on the ends of the hammer, so it can see almost all around.",
      "Its favorite food is stingrays.",
    ],
    info: {
      length: "Up to ~6 m (20 ft)",
      weight: "Up to ~450 kg (1,000 lb)",
      speed: "Agile and quick",
      lifespan: "~20-40 years",
      range: "Warm tropical coasts worldwide",
      diet: "Stingrays, fish, squid, and crabs",
    },
  },
  {
    slug: "whale", name: "Whale Shark", sci: "Rhincodon typus",
    group: "carpet", inat: 52188,
    facts: [
      "The whale shark is the biggest fish in the whole world.",
      "Even though it is giant, it only eats tiny plankton and small fish.",
      "Every whale shark has its own pattern of white spots, like a fingerprint.",
      "It is gentle, and divers love to swim beside it.",
    ],
    info: {
      length: "Up to ~12-18 m (40-60 ft)",
      weight: "Up to ~20,000 kg (over 40,000 lb)",
      speed: "Slow, about 5 km/h",
      lifespan: "80-130 years",
      range: "Warm tropical oceans worldwide",
      diet: "Plankton and tiny fish, filtered from the water",
    },
  },
  {
    slug: "nurse", name: "Nurse Shark", sci: "Ginglymostoma cirratum",
    group: "carpet", inat: 49964,
    facts: [
      "Nurse sharks are calm and love to rest on the sandy bottom.",
      "They can lie still on the sea floor all day long.",
      "They suck up hidden crabs and snails with a strong, vacuum-like mouth.",
      "They can breathe while resting without swimming.",
    ],
    info: {
      length: "Up to ~3 m (10 ft)",
      weight: "Up to ~110 kg (240 lb)",
      speed: "Slow",
      lifespan: "~25 years",
      range: "Warm shallow coasts of the Americas and West Africa",
      diet: "Snails, crabs, lobsters, and small fish",
    },
  },
  {
    slug: "zebra", name: "Zebra Shark", sci: "Stegostoma tigrinum",
    group: "carpet", inat: 1303450,
    facts: [
      "Baby zebra sharks have stripes, just like a zebra.",
      "As they grow up, the stripes slowly turn into spots.",
      "They can wriggle into narrow cracks in the reef to find food.",
      "They are gentle and slow, and rest on the sea floor.",
    ],
    info: {
      length: "Up to ~2.5 m (8 ft)",
      weight: "Up to ~30 kg (66 lb)",
      speed: "Slow",
      lifespan: "~25-30 years",
      range: "Tropical coral reefs of the Indian and Pacific Oceans",
      diet: "Snails, small fish, and crabs",
    },
  },
  {
    slug: "wobbegong", name: "Spotted Wobbegong", sci: "Orectolobus maculatus",
    group: "carpet", inat: 63638,
    facts: [
      "The wobbegong is a flat shark that lies on the sea floor.",
      "Its patterned skin is perfect camouflage, like a carpet.",
      "It has a fringe of skin flaps around its mouth, like a beard.",
      "It waits, hidden, then gulps up fish that swim too close.",
    ],
    info: {
      length: "Up to ~3 m (10 ft)",
      weight: "Up to ~70 kg (150 lb)",
      speed: "Very slow — an ambush hunter",
      lifespan: "~25-30 years",
      range: "Shallow reefs around Australia",
      diet: "Fish, crabs, and octopus",
    },
  },
  {
    slug: "greenland", name: "Greenland Shark", sci: "Somniosus microcephalus",
    group: "dogfish", inat: 112841,
    facts: [
      "The Greenland shark lives in freezing cold, deep water.",
      "It can live for hundreds of years — longer than any other animal with a backbone.",
      "It grows only about one centimetre each year, so it grows very slowly.",
      "It swims very slowly through the icy dark.",
    ],
    info: {
      length: "Up to ~6-7 m (20-24 ft)",
      weight: "Up to ~1,000 kg (2,200 lb)",
      speed: "Very slow, about 3 km/h",
      lifespan: "250-400+ years — the longest-living vertebrate",
      range: "Cold deep waters of the North Atlantic and Arctic",
      diet: "Fish, seals, and scavenged animals",
    },
  },
  {
    slug: "angel", name: "Angelshark", sci: "Squatina squatina",
    group: "angel", inat: 113064,
    facts: [
      "The angelshark is flat and wide, a bit like a ray.",
      "It buries itself in the sand with just its eyes peeking out.",
      "It bursts up from the sand to surprise fish swimming above.",
      "Its wide fins look a little like an angel's wings.",
    ],
    info: {
      length: "Up to ~2.4 m (8 ft)",
      weight: "Up to ~80 kg (180 lb)",
      speed: "Slow — an ambush hunter",
      lifespan: "~25-35 years",
      range: "Coastal Northeast Atlantic and Mediterranean",
      diet: "Flatfish, other fish, and crustaceans",
    },
  },
  {
    slug: "scalloped-hammerhead", name: "Scalloped Hammerhead", sci: "Sphyrna lewini",
    group: "hammerhead", inat: 56764,
    facts: [
      "It has little bumps along the front of its hammer head, like scallops.",
      "Hundreds of them can gather together in big groups called schools.",
      "Its wide head is packed with sensors to find hidden food.",
      "Young ones grow up in calm, shallow bays.",
    ],
    info: {
      length: "Up to ~4.3 m (14 ft)",
      weight: "Up to ~150 kg (330 lb)",
      speed: "Agile and quick",
      lifespan: "~30 years",
      range: "Warm coastal seas worldwide",
      diet: "Fish, squid, and stingrays",
    },
  },
  {
    slug: "bonnethead", name: "Bonnethead", sci: "Sphyrna tiburo",
    group: "hammerhead", inat: 112960,
    facts: [
      "The bonnethead is the smallest hammerhead shark.",
      "Its head is smooth and round, shaped like a shovel.",
      "It is one of the only sharks known to eat seagrass as well as crabs.",
      "It loves snapping up crabs, shrimp, and small shellfish.",
    ],
    info: {
      length: "Up to ~1.5 m (5 ft)",
      weight: "Up to ~11 kg (24 lb)",
      speed: "Quick and active",
      lifespan: "~12 years",
      range: "Warm coasts of the Americas",
      diet: "Crabs, shrimp, small fish — and even seagrass",
    },
  },
  {
    slug: "whitetip-reef", name: "Whitetip Reef Shark", sci: "Triaenodon obesus",
    group: "requiem", inat: 52314,
    facts: [
      "It has bright white tips on its fins.",
      "It rests in caves and under ledges during the day.",
      "At night it hunts fish hiding in the coral reef.",
      "Several of them can squeeze into the same cave to sleep.",
    ],
    info: {
      length: "Up to ~1.6 m (5 ft)",
      weight: "Up to ~18 kg (40 lb)",
      speed: "Slow by day, quick at night",
      lifespan: "~25 years",
      range: "Coral reefs of the Indian and Pacific Oceans",
      diet: "Reef fish, octopus, and crabs",
    },
  },
  {
    slug: "blacktip-reef", name: "Blacktip Reef Shark", sci: "Carcharhinus melanopterus",
    group: "requiem", inat: 67964,
    facts: [
      "It has black tips on all of its fins.",
      "You can often see its fin poking above shallow reef water.",
      "It is shy and usually swims away from people.",
      "It zooms around coral reefs chasing small fish.",
    ],
    info: {
      length: "Up to ~1.8 m (6 ft)",
      weight: "Up to ~24 kg (53 lb)",
      speed: "Fast and darting",
      lifespan: "~10-13 years",
      range: "Shallow coral reefs of the Indian and Pacific Oceans",
      diet: "Small reef fish, shrimp, and squid",
    },
  },
  {
    slug: "oceanic-whitetip", name: "Oceanic Whitetip Shark", sci: "Carcharhinus longimanus",
    group: "requiem", inat: 96760,
    facts: [
      "It has long, rounded fins with white tips.",
      "It lives far out in the deep open ocean.",
      "It is curious and often follows ships across the sea.",
      "It is a bold hunter in a place with not much food.",
    ],
    info: {
      length: "Up to ~3 m (10 ft)",
      weight: "Up to ~170 kg (370 lb)",
      speed: "Slow cruiser, quick when hunting",
      lifespan: "~15-22 years",
      range: "Warm open oceans worldwide",
      diet: "Fish, squid, and sea birds",
    },
  },
  {
    slug: "sand-tiger", name: "Sand Tiger Shark", sci: "Carcharias taurus",
    group: "mackerel", inat: 96768,
    facts: [
      "It looks fierce because its pointy teeth always show.",
      "Even so, it is slow and calm around people.",
      "It can gulp air at the surface to hang still like a balloon.",
      "It hunts fish at night around reefs and shipwrecks.",
    ],
    info: {
      length: "Up to ~3.2 m (10.5 ft)",
      weight: "Up to ~160 kg (350 lb)",
      speed: "Slow and steady",
      lifespan: "~15-40 years",
      range: "Warm coasts worldwide (not the eastern Pacific)",
      diet: "Fish, small sharks, rays, and squid",
    },
  },
  {
    slug: "leopard", name: "Leopard Shark", sci: "Triakis semifasciata",
    group: "houndshark", inat: 52297,
    facts: [
      "It has beautiful dark spots and saddles, just like a leopard.",
      "It is small and harmless to people.",
      "It swims over sandy flats looking for crabs and clams.",
      "It can suck worms and clams right out of the sand.",
    ],
    info: {
      length: "Up to ~1.8 m (6 ft)",
      weight: "Up to ~18 kg (40 lb)",
      speed: "Slow and gentle",
      lifespan: "~30 years",
      range: "Cool coasts of the western United States and Mexico",
      diet: "Crabs, clams, worms, and small fish",
    },
  },
  {
    slug: "port-jackson", name: "Port Jackson Shark", sci: "Heterodontus portusjacksoni",
    group: "bullhead", inat: 57810,
    facts: [
      "It has dark bands that look like a harness or backpack straps.",
      "It has flat back teeth for crushing shells.",
      "It lays spiral-shaped eggs that it tucks into rocky cracks.",
      "It has a sharp spine in front of each back fin for protection.",
    ],
    info: {
      length: "Up to ~1.65 m (5.4 ft)",
      weight: "Up to ~10 kg (22 lb)",
      speed: "Slow",
      lifespan: "~30 years",
      range: "Coastal reefs around southern Australia",
      diet: "Sea urchins, shellfish, and crabs",
    },
  },
  {
    slug: "horn", name: "Horn Shark", sci: "Heterodontus francisci",
    group: "bullhead", inat: 102710,
    facts: [
      "It has sharp spines on its back, like little horns.",
      "It is small and rests in rocky reefs during the day.",
      "Its spotted body hides it among the rocks and kelp.",
      "It uses strong back teeth to crush sea urchins and crabs.",
    ],
    info: {
      length: "Up to ~1.2 m (4 ft)",
      weight: "Up to ~5 kg (11 lb)",
      speed: "Slow",
      lifespan: "~25 years",
      range: "Warm coasts of the western United States and Mexico",
      diet: "Sea urchins, crabs, snails, and small fish",
    },
  },
  {
    slug: "spiny-dogfish", name: "Spiny Dogfish", sci: "Squalus acanthias",
    group: "dogfish", inat: 52306,
    facts: [
      "It has a sharp spine in front of each back fin.",
      "It hunts in big packs, like a pack of dogs.",
      "It is one of the most common sharks in the world.",
      "It can live a very long time — often more than 40 years.",
    ],
    info: {
      length: "Up to ~1.2 m (4 ft)",
      weight: "Up to ~9 kg (20 lb)",
      speed: "Steady cruiser",
      lifespan: "~40-70 years",
      range: "Cool seas worldwide",
      diet: "Small fish, squid, and crabs",
    },
  },
  {
    slug: "cookiecutter", name: "Cookiecutter Shark", sci: "Isistius brasiliensis",
    group: "dogfish", inat: 103503,
    facts: [
      "It is tiny, but it bites round holes out of much bigger animals.",
      "It bites even whales and big fish, leaving a mark like a cookie cutter.",
      "Its belly glows with a soft green light in the deep dark sea.",
      "It rises up from the deep at night to feed.",
    ],
    info: {
      length: "Up to ~50 cm (20 in)",
      weight: "About 1 kg (2 lb)",
      speed: "Slow",
      lifespan: "Not well known",
      range: "Warm deep oceans worldwide",
      diet: "Round bites from whales, dolphins, and big fish",
    },
  },
  {
    slug: "epaulette", name: "Epaulette Shark", sci: "Hemiscyllium ocellatum",
    group: "carpet", inat: 102601,
    facts: [
      "It can 'walk' on its fins across the reef.",
      "It has a big black spot behind each fin, like a fake eye.",
      "It can even walk over dry rock from one pool to the next.",
      "It can survive with very little oxygen for a while.",
    ],
    info: {
      length: "Up to ~1 m (3.3 ft)",
      weight: "About 1-2 kg (2-4 lb)",
      speed: "Slow — it walks more than swims",
      lifespan: "~20-25 years",
      range: "Shallow reefs around Australia and New Guinea",
      diet: "Crabs, worms, shrimp, and small fish",
    },
  },
  {
    slug: "sawshark", name: "Common Sawshark", sci: "Pristiophorus cirratus",
    group: "sawshark", inat: 110372,
    facts: [
      "It has a long snout lined with teeth, just like a saw.",
      "It has two long whiskers on its saw to feel for food.",
      "It swipes its saw side to side to find and stun prey in the sand.",
      "Its saw teeth stay folded flat before it is born.",
    ],
    info: {
      length: "Up to ~1.5 m (5 ft)",
      weight: "A few kilograms",
      speed: "Slow",
      lifespan: "~15 years",
      range: "Sandy sea floors around southern Australia",
      diet: "Small fish, shrimp, and squid",
    },
  },
  {
    slug: "frilled", name: "Frilled Shark", sci: "Chlamydoselachus anguineus",
    group: "frilled", inat: 47302,
    facts: [
      "It looks more like a snake or an eel than a shark.",
      "It has frilly, ruffly gills around its neck.",
      "It is a 'living fossil' that has barely changed in millions of years.",
      "It has rows of tiny three-pointed teeth to hold slippery squid.",
    ],
    info: {
      length: "Up to ~2 m (6.5 ft)",
      weight: "A few kilograms",
      speed: "Slow",
      lifespan: "Not well known",
      range: "Deep oceans worldwide",
      diet: "Squid, fish, and other sharks",
    },
  },
  {
    slug: "sixgill", name: "Bluntnose Sixgill Shark", sci: "Hexanchus griseus",
    group: "cowshark", inat: 102743,
    facts: [
      "It has six gill slits on each side — most sharks have only five.",
      "It lives deep down in the dark, cold ocean.",
      "It rises toward the surface to hunt at night, then sinks back down by day.",
      "It is a slow, heavy shark that has looked the same for millions of years.",
    ],
    info: {
      length: "Up to ~5 m (16 ft)",
      weight: "Up to ~600 kg (1,300 lb)",
      speed: "Slow, with quick bursts",
      lifespan: "~80 years",
      range: "Deep oceans worldwide",
      diet: "Fish, rays, squid, and seals",
    },
  },
  {
    slug: "sevengill", name: "Broadnose Sevengill Shark", sci: "Notorynchus cepedianus",
    group: "cowshark", inat: 107194,
    facts: [
      "It has seven gill slits on each side, even more than most sharks.",
      "Its body is sprinkled with tiny black and white spots.",
      "It sometimes hunts in groups to catch bigger prey like seals.",
      "It has just one dorsal fin, set far back near its tail.",
    ],
    info: {
      length: "Up to ~3 m (10 ft)",
      weight: "Up to ~110 kg (240 lb)",
      speed: "Nimble",
      lifespan: "~30-50 years",
      range: "Cool coastal seas and bays worldwide",
      diet: "Fish, rays, seals, and other sharks",
    },
  },
  {
    slug: "megamouth", name: "Megamouth Shark", sci: "Megachasma pelagios",
    group: "mackerel", inat: 50869,
    facts: [
      "It has an enormous, wide mouth — that is how it got its name.",
      "It swims with its huge mouth open to filter tiny plankton.",
      "It is very rare, and scientists didn't discover it until 1976.",
      "It spends the day deep down and rises toward the surface at night.",
    ],
    info: {
      length: "Up to ~5.5 m (18 ft)",
      weight: "Up to ~1,200 kg (2,600 lb)",
      speed: "Very slow",
      lifespan: "Not well known",
      range: "Deep open oceans worldwide",
      diet: "Plankton and tiny shrimp, filtered from the water",
    },
  },
  {
    slug: "crocodile", name: "Crocodile Shark", sci: "Pseudocarcharias kamoharai",
    group: "mackerel", inat: 110962,
    facts: [
      "It is small but has huge round eyes for seeing in the deep.",
      "Its big eyes help it hunt where there is almost no light.",
      "It is one of the smallest mackerel sharks, only about a metre long.",
      "It rises up at night to feed on fish and squid.",
    ],
    info: {
      length: "Up to ~1.1 m (3.6 ft)",
      weight: "Up to ~6 kg (13 lb)",
      speed: "Active",
      lifespan: "Not well known",
      range: "Deep open oceans worldwide",
      diet: "Small fish, squid, and shrimp",
    },
  },
  {
    slug: "salmon", name: "Salmon Shark", sci: "Lamna ditropis",
    group: "mackerel", inat: 62739,
    facts: [
      "It looks like a small great white shark.",
      "It keeps its body warm so it can hunt in cold northern seas.",
      "It is a fast, powerful swimmer.",
      "It loves to eat salmon, which is how it got its name.",
    ],
    info: {
      length: "Up to ~3 m (10 ft)",
      weight: "Up to ~220 kg (485 lb)",
      speed: "Fast — a warm-bodied sprinter",
      lifespan: "~20-30 years",
      range: "Cold North Pacific Ocean",
      diet: "Salmon, squid, and other fish",
    },
  },
  {
    slug: "swell", name: "Swellshark", sci: "Cephaloscyllium ventriosum",
    group: "catshark", inat: 59223,
    facts: [
      "It can gulp water to puff up like a balloon.",
      "Puffing up wedges it into a rocky crack so nothing can pull it out.",
      "It rests in reefs by day and hunts at night.",
      "Its skin can glow green under blue light — this is called biofluorescence.",
    ],
    info: {
      length: "Up to ~1 m (3.3 ft)",
      weight: "Up to ~4 kg (9 lb)",
      speed: "Slow",
      lifespan: "~25-30 years",
      range: "Rocky reefs off the western Americas",
      diet: "Small fish and crustaceans",
    },
  },
  {
    slug: "chain-catshark", name: "Chain Catshark", sci: "Scyliorhinus retifer",
    group: "catshark", inat: 112380,
    facts: [
      "It is covered in a pattern that looks like a chain-link fence.",
      "It is a small deep-water shark from the Atlantic Ocean.",
      "It glows bright green under blue light — this is called biofluorescence.",
      "It lays its eggs in tough little cases called 'mermaid's purses'.",
    ],
    info: {
      length: "Up to ~60 cm (24 in)",
      weight: "About 0.5 kg (1 lb)",
      speed: "Slow",
      lifespan: "Not well known",
      range: "Deep waters of the western Atlantic",
      diet: "Small fish, squid, and worms",
    },
  },
  {
    slug: "bamboo", name: "White-spotted Bamboo Shark", sci: "Chiloscyllium plagiosum",
    group: "carpet", inat: 97440,
    facts: [
      "It is covered in little white and pale-blue spots.",
      "It can 'walk' along the sea floor on its fins, like the epaulette shark.",
      "It is small and gentle, and is often kept in aquariums.",
      "It uses tiny whiskers called barbels to taste and feel for food.",
    ],
    info: {
      length: "Up to ~1 m (3.3 ft)",
      weight: "About 1-2 kg (2-4 lb)",
      speed: "Slow",
      lifespan: "~25 years",
      range: "Warm reefs of the Indian and Pacific Oceans",
      diet: "Small fish, crabs, and shrimp",
    },
  },
  {
    slug: "spinner", name: "Spinner Shark", sci: "Carcharhinus brevipinna",
    group: "requiem", inat: 96751,
    facts: [
      "It spins like a top when it leaps out of the water.",
      "It spins up through a school of fish, snapping, and flies into the air.",
      "It is a slim, fast requiem shark with black-tipped fins.",
      "It often travels in big groups.",
    ],
    info: {
      length: "Up to ~3 m (10 ft)",
      weight: "Up to ~90 kg (200 lb)",
      speed: "Fast and acrobatic",
      lifespan: "~15-20 years",
      range: "Warm coastal seas worldwide",
      diet: "Small schooling fish like sardines and anchovies",
    },
  },
  {
    slug: "pyjama", name: "Pyjama Shark", sci: "Poroderma africanum",
    group: "catshark", inat: 110143,
    facts: [
      "Its bold stripes look just like striped pyjamas.",
      "It sleeps in reef caves during the day and hunts at night.",
      "It is a small, slow shark found only around South Africa.",
      "It loves to eat octopus.",
    ],
    info: {
      length: "Up to ~1 m (3.3 ft)",
      weight: "About 2-3 kg (4-7 lb)",
      speed: "Slow",
      lifespan: "Not well known",
      range: "Rocky reefs around South Africa",
      diet: "Octopus, small fish, and crabs",
    },
  },
  {
    slug: "megalodon", name: "Megalodon", sci: "Otodus megalodon",
    group: "megatooth", inat: 1493507,
    facts: [
      "Megalodon was the biggest shark that ever lived — as long as a school bus!",
      "Just one of its teeth was bigger than your whole hand.",
      "It lived long, long ago and is now extinct.",
      "All that is left of it today are its giant fossil teeth.",
    ],
    info: {
      length: "Up to ~15-18 m (50-60 ft)",
      weight: "Maybe over 50,000 kg (100,000 lb)",
      speed: "A powerful, heavy swimmer",
      lifespan: "Extinct for about 3.5 million years",
      range: "Warm oceans all around the ancient world",
      diet: "Big prey like whales and giant fish",
    },
  },
  {
    slug: "winghead", name: "Winghead Shark", sci: "Eusphyra blochii",
    group: "hammerhead", inat: 48066,
    facts: [
      "The winghead shark has the widest head of any hammerhead.",
      "Its head can be almost half as wide as its whole body is long!",
      "Its eyes sit way out on the tips of its wing-shaped head.",
      "The extra-wide head helps it sniff out hidden food.",
    ],
    info: {
      length: "Up to ~1.9 m (6 ft)",
      weight: "Up to ~10 kg (22 lb)",
      speed: "Nimble",
      lifespan: "~20-25 years",
      range: "Warm shallow coasts of the Indian and Pacific Oceans",
      diet: "Small fish, shrimp, and squid",
    },
  },
  {
    slug: "tasselled-wobbegong", name: "Tasselled Wobbegong", sci: "Eucrossorhinus dasypogon",
    group: "carpet", inat: 63637,
    facts: [
      "It wears a beard of frilly skin tassels all around its mouth.",
      "Its maze-like pattern makes it disappear against the reef.",
      "It lies very still, then gulps down fish that swim too close.",
      "It can even wiggle its tail like a wormy lure to trick prey closer.",
    ],
    info: {
      length: "Up to ~1.8 m (6 ft)",
      weight: "Up to ~12 kg (26 lb)",
      speed: "Very slow — a hidden ambush hunter",
      lifespan: "~20-30 years",
      range: "Coral reefs around Australia and New Guinea",
      diet: "Fish, crabs, and octopus",
    },
  },
  {
    slug: "grey-reef", name: "Grey Reef Shark", sci: "Carcharhinus amblyrhynchos",
    group: "requiem", inat: 67970,
    facts: [
      "It is one of the most common sharks on coral reefs.",
      "When it feels grumpy it arches its back and does a warning dance.",
      "It has a wide black band along the back edge of its tail.",
      "Lots of them can gather together over the reef by day.",
    ],
    info: {
      length: "Up to ~2.1 m (7 ft)",
      weight: "Up to ~34 kg (75 lb)",
      speed: "Fast and agile",
      lifespan: "~25 years",
      range: "Coral reefs of the Indian and Pacific Oceans",
      diet: "Reef fish, squid, and octopus",
    },
  },
  {
    slug: "velvet-lanternshark", name: "Velvet Belly Lanternshark", sci: "Etmopterus spinax",
    group: "lantern", inat: 100597,
    facts: [
      "This little shark glows in the dark, deep sea!",
      "Its belly makes a soft blue-green light called bioluminescence.",
      "The glow hides its shadow from animals looking up from below.",
      "It even has glowing spines to warn others to stay away.",
    ],
    info: {
      length: "Up to ~45 cm (18 in)",
      weight: "Less than 1 kg (2 lb)",
      speed: "Slow",
      lifespan: "~8 years or more",
      range: "Deep Atlantic and Mediterranean waters",
      diet: "Small fish, shrimp, and squid",
    },
  },
  {
    slug: "dwarf-lanternshark", name: "Dwarf Lanternshark", sci: "Etmopterus perryi",
    group: "lantern", inat: 100588,
    facts: [
      "This is the smallest shark in the whole world!",
      "It is small enough to hold in your hand.",
      "Its belly glows with a gentle light in the deep dark sea.",
      "It lives so deep that people almost never see it.",
    ],
    info: {
      length: "Only ~20 cm (8 in) — the tiniest shark",
      weight: "Just a few grams — super tiny!",
      speed: "Slow",
      lifespan: "Not well known",
      range: "Deep sea off Colombia and Venezuela",
      diet: "Tiny shrimp and other small creatures",
    },
  },
  {
    slug: "shyshark", name: "Puffadder Shyshark", sci: "Haploblepharus edwardsii",
    group: "catshark", inat: 102101,
    facts: [
      "When it is scared it curls into a ring and hides its eyes with its tail.",
      "That is why it is called a 'shy' shark!",
      "It is small and covered in pretty orange saddles and white spots.",
      "It lays its eggs in little cases called mermaid's purses.",
    ],
    info: {
      length: "Up to ~60 cm (24 in)",
      weight: "About 1 kg (2 lb)",
      speed: "Slow",
      lifespan: "Not well known",
      range: "Rocky reefs around South Africa",
      diet: "Small crabs, shrimp, and worms",
    },
  },
  {
    slug: "zebra-bullhead", name: "Zebra Bullhead Shark", sci: "Heterodontus zebra",
    group: "bullhead", inat: 102717,
    facts: [
      "It is covered in bold dark stripes, just like a zebra.",
      "It has a short, blunt, piggy face with bony ridges over its eyes.",
      "It has a sharp spine in front of each back fin to keep it safe.",
      "It uses flat back teeth to crush shellfish and sea urchins.",
    ],
    info: {
      length: "Up to ~1.25 m (4 ft)",
      weight: "A few kilograms",
      speed: "Slow",
      lifespan: "~20-30 years",
      range: "Reefs of the western Pacific Ocean",
      diet: "Shellfish, sea urchins, and crabs",
    },
  },
  {
    slug: "roughshark", name: "Angular Roughshark", sci: "Oxynotus centrina",
    group: "dogfish", inat: 108112,
    facts: [
      "This funny shark has a fat, triangle-shaped body like a little pig.",
      "It even has piggy nostrils and can make a grunting sound!",
      "Its skin is so rough it feels like sandpaper.",
      "It has two tall, sail-like fins on its back, each with a spine.",
    ],
    info: {
      length: "Up to ~1 m (3.3 ft)",
      weight: "A few kilograms",
      speed: "Slow",
      lifespan: "Not well known",
      range: "Deep sea floors of the eastern Atlantic and Mediterranean",
      diet: "Worms, crabs, and other small sea-floor animals",
    },
  },
  {
    slug: "bigeye-thresher", name: "Bigeye Thresher", sci: "Alopias superciliosus",
    group: "mackerel", inat: 93695,
    facts: [
      "It has enormous eyes to see in the dark, deep ocean.",
      "Its eyes point upward to spot food swimming above it.",
      "Its long, whip-like tail is almost as long as its body.",
      "It swings that tail to slap and stun the fish it hunts.",
    ],
    info: {
      length: "Up to ~4.9 m (16 ft) — about half is tail",
      weight: "Up to ~360 kg (795 lb)",
      speed: "A strong swimmer",
      lifespan: "~20 years or more",
      range: "Deep open oceans worldwide",
      diet: "Fish and squid",
    },
  },
];

// Inline speaker icon so the "read it aloud" buttons look the same on every
// device (emoji glyphs render inconsistently across systems).
const SPEAKER_SVG =
  '<svg class="speaker-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">' +
  '<path fill="currentColor" d="M3 9v6h4l5 4V5L7 9H3z"/>' +
  '<path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" d="M16 8.5a5 5 0 0 1 0 7M18.8 6a9 9 0 0 1 0 12"/>' +
  "</svg>";

const STAT_ROWS = [
  ["Scientific name", "sci"],
  ["Size", "length"],
  ["Weight", "weight"],
  ["Top speed", "speed"],
  ["Lifespan", "lifespan"],
  ["Where it lives", "range"],
  ["What it eats", "diet"],
];

const fieldEl = document.getElementById("field");
const cheerEl = document.getElementById("cheer");
const progressEl = document.getElementById("progress");
const caughtListEl = document.getElementById("caught-list");
const soundBtn = document.getElementById("sound-toggle");
const resetBtn = document.getElementById("reset-btn");

const field = [];
const spotted = [];
const slotButtons = [];
let locked = false;

let soundOn = loadSound();

/* ---------- Saving progress on the device ---------- */

function loadSpotted() {
  try {
    const raw = localStorage.getItem(STORE_KEY);
    const slugs = raw ? JSON.parse(raw) : [];
    return Array.isArray(slugs) ? slugs : [];
  } catch (err) {
    return [];
  }
}

function saveSpotted() {
  try {
    localStorage.setItem(STORE_KEY, JSON.stringify(spotted.map((s) => s.slug)));
  } catch (err) {
    /* storage may be unavailable (e.g. private mode) — the game still works */
  }
}

function loadSound() {
  try {
    return localStorage.getItem(SOUND_KEY) !== "off";
  } catch (err) {
    return true;
  }
}

function saveSound() {
  try {
    localStorage.setItem(SOUND_KEY, soundOn ? "on" : "off");
  } catch (err) {
    /* ignore */
  }
}

function randomInt(min, max) {
  return min + Math.floor(Math.random() * (max - min + 1));
}

function artUrl(shark) {
  return `art/${shark.slug}.webp`;
}

/* ---------- Speech ---------- */

function cancelSpeech() {
  if (window.speechSynthesis) window.speechSynthesis.cancel();
}

function speak(text) {
  if (!soundOn || !window.speechSynthesis || !text) return;
  const u = new SpeechSynthesisUtterance(text);
  u.rate = 0.95;
  u.pitch = 1.0;
  window.speechSynthesis.speak(u);
}

/* ---------- Happy sounds (Web Audio) ---------- */

let audioCtx = null;

function getAudioCtx() {
  if (audioCtx) return audioCtx;
  const AC = window.AudioContext || window.webkitAudioContext;
  if (!AC) return null;
  audioCtx = new AC();
  return audioCtx;
}

function playTone(freq, start, dur, gain, type) {
  const ctx = getAudioCtx();
  if (!ctx) return;
  const osc = ctx.createOscillator();
  const g = ctx.createGain();
  osc.type = type || "sine";
  osc.frequency.value = freq;
  const t0 = ctx.currentTime + start;
  g.gain.setValueAtTime(0.0001, t0);
  g.gain.exponentialRampToValueAtTime(gain, t0 + 0.02);
  g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
  osc.connect(g);
  g.connect(ctx.destination);
  osc.start(t0);
  osc.stop(t0 + dur + 0.03);
}

// A short, friendly chime. "new" and "complete" are extra celebratory.
function playChime(kind) {
  if (!soundOn) return;
  const ctx = getAudioCtx();
  if (!ctx) return;
  if (ctx.state === "suspended") ctx.resume();
  if (kind === "complete") {
    [523.25, 659.25, 783.99, 1046.5].forEach((f, i) => playTone(f, i * 0.14, 0.5, 0.18, "triangle"));
  } else if (kind === "new") {
    [659.25, 830.61, 987.77].forEach((f, i) => playTone(f, i * 0.1, 0.35, 0.16, "triangle"));
  } else {
    [587.33, 880].forEach((f, i) => playTone(f, i * 0.09, 0.26, 0.13, "sine"));
  }
}

/* ---------- Confetti / bubble burst ---------- */

const BURST_COLORS = ["#58e0d6", "#ffd166", "#ff8fab", "#8ecae6", "#c8f76b", "#ffffff"];

function burstAt(x, y, big) {
  const layer = document.createElement("div");
  layer.className = "burst";
  layer.style.left = `${x}px`;
  layer.style.top = `${y}px`;
  const n = big ? 22 : 12;
  for (let i = 0; i < n; i += 1) {
    const dot = document.createElement("span");
    dot.className = "burst-dot";
    const angle = (Math.PI * 2 * i) / n + Math.random() * 0.6;
    const dist = (big ? 90 : 60) + Math.random() * (big ? 80 : 40);
    dot.style.setProperty("--dx", `${Math.cos(angle) * dist}px`);
    dot.style.setProperty("--dy", `${Math.sin(angle) * dist - 20}px`);
    dot.style.background = BURST_COLORS[i % BURST_COLORS.length];
    dot.style.animationDelay = `${Math.random() * 0.05}s`;
    layer.appendChild(dot);
  }
  document.body.appendChild(layer);
  window.setTimeout(() => layer.remove(), 1100);
}

// Big party when the whole collection is complete.
function celebrateAll() {
  cheerEl.textContent = "WOW! You found ALL the sharks! You are a shark expert!";
  playChime("complete");
  cancelSpeech();
  speak("Wow! You found all the sharks! You are a shark expert!");
  const w = window.innerWidth;
  const h = window.innerHeight;
  for (let i = 0; i < 5; i += 1) {
    window.setTimeout(() => burstAt(Math.random() * w, h * 0.1 + Math.random() * h * 0.5, true), i * 180);
  }
}

// Say a single phrase on its own (used by the little speaker buttons).
function speakField(text) {
  cancelSpeech();
  speak(text);
}

// Read the whole info card out loud, one piece at a time.
function speakAll(shark) {
  cancelSpeech();
  speak(shark.name);
  speak(`This is a ${GROUPS[shark.group].name}.`);
  STAT_ROWS.forEach(([label, key]) => {
    const value = key === "sci" ? shark.sci : shark.info[key];
    if (value) speak(`${label}. ${value}.`);
  });
  shark.facts.forEach((f) => speak(f));
}

function article(name) {
  return /^[aeiou]/i.test(name) ? "an" : "a";
}

function makeSayButton(label, onSay) {
  const btn = document.createElement("button");
  btn.type = "button";
  btn.className = "say-btn";
  btn.setAttribute("aria-label", label);
  btn.innerHTML = SPEAKER_SVG;
  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    onSay();
  });
  return btn;
}

function setGroupRow(row, shark) {
  const group = GROUPS[shark.group];
  row.querySelector(".group-dot").style.background = group.color;
  row.querySelector(".group-name").textContent = group.name;
}

function makeGroupRow() {
  const row = document.createElement("span");
  row.className = "group-row";
  const dot = document.createElement("span");
  dot.className = "group-dot";
  dot.setAttribute("aria-hidden", "true");
  const name = document.createElement("span");
  name.className = "group-name";
  row.append(dot, name);
  return row;
}

function makeArt(shark, eager) {
  const wrap = document.createElement("span");
  wrap.className = "shark-art";
  const img = document.createElement("img");
  img.src = artUrl(shark);
  img.alt = shark.name;
  img.loading = eager ? "eager" : "lazy";
  img.draggable = false;
  wrap.appendChild(img);
  return wrap;
}

function pickSpawn(excludeSlugs) {
  const pool = SHARKS.filter((s) => !excludeSlugs.includes(s.slug));
  const source = pool.length ? pool : SHARKS;
  return source[randomInt(0, source.length - 1)];
}

function updateProgress() {
  progressEl.textContent = `Spotted ${spotted.length} of ${SHARKS.length} sharks`;
}

function fillCard(btn, shark, index) {
  btn.dataset.index = String(index);
  btn.classList.remove("spotting");
  btn.setAttribute("aria-label", `Spot the ${shark.name}`);
  btn.querySelector(".shark-art img").src = artUrl(shark);
  btn.querySelector(".shark-art img").alt = shark.name;
  btn.querySelector(".shark-name").textContent = shark.name;
  setGroupRow(btn.querySelector(".group-row"), shark);
}

function makeFieldCard(index) {
  const btn = document.createElement("button");
  btn.type = "button";
  btn.className = "shark-card";

  const name = document.createElement("span");
  name.className = "shark-name";
  const splash = document.createElement("span");
  splash.className = "splash";
  splash.setAttribute("aria-hidden", "true");

  btn.append(makeArt(field[index], true), name, makeGroupRow(), splash);
  btn.addEventListener("click", () => onSpot(Number(btn.dataset.index)));
  fillCard(btn, field[index], index);
  return btn;
}

function renderSpotted() {
  caughtListEl.replaceChildren();
  if (!spotted.length) {
    const empty = document.createElement("p");
    empty.className = "caught-empty";
    empty.textContent = "No sharks yet — tap one above!";
    caughtListEl.appendChild(empty);
    return;
  }

  spotted.forEach((shark) => {
    const li = document.createElement("li");
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "caught-card";
    btn.setAttribute("aria-label", `Open the info card for the ${shark.name}`);

    const name = document.createElement("span");
    name.className = "caught-name";
    name.textContent = shark.name;
    const hint = document.createElement("span");
    hint.className = "tap-hint";
    hint.textContent = "Tap for info";

    const row = makeGroupRow();
    setGroupRow(row, shark);

    btn.append(makeArt(shark, false), name, row, hint);
    btn.addEventListener("click", () => openInfo(shark));
    li.appendChild(btn);
    caughtListEl.appendChild(li);
  });
}

function addToSpotted(shark) {
  if (spotted.some((s) => s.slug === shark.slug)) return;
  spotted.push(shark);
  saveSpotted();
  renderSpotted();
  updateProgress();
}

function onSpot(index) {
  if (locked) return;
  const shark = field[index];
  if (!shark) return;

  locked = true;
  const btn = slotButtons[index];
  btn.classList.add("spotting");

  const isNew = !spotted.some((s) => s.slug === shark.slug);
  const completes = isNew && spotted.length + 1 === SHARKS.length;
  const rect = btn.getBoundingClientRect();
  burstAt(rect.left + rect.width / 2, rect.top + rect.height / 2, isNew);

  addToSpotted(shark);

  if (completes) {
    celebrateAll();
  } else {
    cheerEl.textContent = isNew
      ? `New! You found ${article(shark.name)} ${shark.name}!`
      : `You spotted ${article(shark.name)} ${shark.name}!`;
    playChime(isNew ? "new" : "spot");
    cancelSpeech();
    speak(shark.name);
    speak(shark.facts[0]);
  }

  window.setTimeout(() => {
    field[index] = pickSpawn(field.map((s) => s.slug));
    fillCard(btn, field[index], index);
    locked = false;
  }, SPOT_MS);
}

/* ---------- Info card modal ---------- */

let modalEls = null;
let currentSlug = null;
let lastFocused = null;

function buildModal() {
  const overlay = document.createElement("div");
  overlay.className = "modal";
  overlay.hidden = true;
  overlay.innerHTML = `
    <div class="modal-backdrop" data-close></div>
    <div class="modal-card" role="dialog" aria-modal="true" aria-labelledby="modal-name">
      <button class="modal-close" type="button" data-close aria-label="Close info card">&times;</button>
      <div class="modal-hero"><img class="modal-img" alt="" draggable="false" /></div>
      <div class="modal-title-row">
        <h2 class="modal-name" id="modal-name"></h2>
        <button class="say-btn modal-name-say" type="button" aria-label="Hear the name">${SPEAKER_SVG}</button>
      </div>
      <p class="modal-group"><span class="group-dot" aria-hidden="true"></span><span class="group-name"></span></p>
      <button class="modal-hear" type="button">${SPEAKER_SVG}<span>Hear everything</span></button>
      <div class="modal-section">
        <h3>All about this shark</h3>
        <div class="stat-grid"></div>
      </div>
      <div class="modal-section">
        <h3>Fun facts</h3>
        <ul class="fact-list"></ul>
      </div>
      <div class="modal-section">
        <h3>Real photos <span class="photo-hint">(tap to see bigger)</span></h3>
        <div class="gallery" aria-live="polite"></div>
        <p class="modal-credit">Photos from <a href="https://www.inaturalist.org" target="_blank" rel="noopener">iNaturalist</a> under Creative Commons.</p>
      </div>
    </div>`;
  document.body.appendChild(overlay);

  const lightbox = document.createElement("div");
  lightbox.className = "lightbox";
  lightbox.hidden = true;
  lightbox.innerHTML = `
    <div class="lightbox-backdrop" data-lb-close></div>
    <div class="lightbox-inner">
      <button class="lightbox-close" type="button" data-lb-close aria-label="Close photo">&times;</button>
      <img class="lightbox-img" alt="" draggable="false" />
      <p class="lightbox-credit"></p>
    </div>`;
  document.body.appendChild(lightbox);

  modalEls = {
    overlay,
    card: overlay.querySelector(".modal-card"),
    close: overlay.querySelector(".modal-close"),
    img: overlay.querySelector(".modal-img"),
    name: overlay.querySelector(".modal-name"),
    nameSay: overlay.querySelector(".modal-name-say"),
    groupDot: overlay.querySelector(".modal-group .group-dot"),
    groupName: overlay.querySelector(".modal-group .group-name"),
    hear: overlay.querySelector(".modal-hear"),
    stats: overlay.querySelector(".stat-grid"),
    facts: overlay.querySelector(".fact-list"),
    gallery: overlay.querySelector(".gallery"),
    lightbox,
    lightImg: lightbox.querySelector(".lightbox-img"),
    lightCredit: lightbox.querySelector(".lightbox-credit"),
    lightClose: lightbox.querySelector(".lightbox-close"),
  };

  overlay.addEventListener("click", (e) => {
    if (e.target.hasAttribute("data-close")) closeInfo();
  });
  lightbox.addEventListener("click", (e) => {
    if (e.target.hasAttribute("data-lb-close")) closeLightbox();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key !== "Escape" || !modalEls) return;
    if (!modalEls.lightbox.hidden) closeLightbox();
    else if (!modalEls.overlay.hidden) closeInfo();
  });
}

function fillStats(shark) {
  modalEls.stats.replaceChildren();
  STAT_ROWS.forEach(([label, key]) => {
    const value = key === "sci" ? shark.sci : shark.info[key];
    if (!value) return;
    const phrase = `${label}. ${value}.`;

    const row = document.createElement("div");
    row.className = "stat-row";
    row.append(makeSayButton(`Hear ${label}`, () => speakField(phrase)));

    const text = document.createElement("div");
    text.className = "stat-text";
    const l = document.createElement("span");
    l.className = "stat-label";
    l.textContent = label;
    const v = document.createElement("span");
    v.className = "stat-value";
    v.textContent = value;
    if (key === "sci") v.classList.add("sci");
    text.append(l, v);
    row.append(text);

    row.addEventListener("click", () => speakField(phrase));
    modalEls.stats.append(row);
  });
}

function fillFacts(shark) {
  modalEls.facts.replaceChildren();
  shark.facts.forEach((fact) => {
    const li = document.createElement("li");
    li.className = "fact-item";
    li.append(makeSayButton("Hear this fact", () => speakField(fact)));
    const span = document.createElement("span");
    span.className = "fact-text";
    span.textContent = fact;
    li.append(span);
    li.addEventListener("click", () => speakField(fact));
    modalEls.facts.append(li);
  });
}

function galleryMessage(text) {
  modalEls.gallery.replaceChildren();
  const p = document.createElement("p");
  p.className = "gallery-msg";
  p.textContent = text;
  modalEls.gallery.appendChild(p);
}

// Build medium and large image URLs from an iNaturalist photo.
function photoSizes(photo) {
  const base = photo.url || photo.medium_url || "";
  const hasSquare = base.includes("/square.");
  const medium = hasSquare ? base.replace("/square.", "/medium.") : (photo.medium_url || base);
  const large = hasSquare ? base.replace("/square.", "/large.") : (photo.large_url || photo.medium_url || base);
  return { medium, large };
}

async function loadGallery(shark) {
  if (shark._photos) {
    renderGallery(shark, shark._photos);
    return;
  }
  galleryMessage("Loading real photos…");
  try {
    const res = await fetch(`https://api.inaturalist.org/v1/taxa/${shark.inat}`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    const taxon = data.results && data.results[0];
    const photos = (taxon && taxon.taxon_photos ? taxon.taxon_photos : [])
      .filter((p) => p.photo && OPEN_LICENSES.has(p.photo.license_code) && (p.photo.medium_url || p.photo.url))
      .slice(0, GALLERY_MAX)
      .map((p) => {
        const sizes = photoSizes(p.photo);
        return {
          url: sizes.medium,
          large: sizes.large,
          credit: (p.photo.attribution || "iNaturalist").replace(/\(c\)\s*/i, "").trim(),
        };
      });
    shark._photos = photos;
    if (currentSlug === shark.slug) renderGallery(shark, photos);
  } catch (err) {
    if (currentSlug === shark.slug) {
      galleryMessage("Couldn't load photos — check your internet connection and try again.");
    }
  }
}

function renderGallery(shark, photos) {
  modalEls.gallery.replaceChildren();
  if (!photos.length) {
    galleryMessage("No photos available for this shark yet.");
    return;
  }
  photos.forEach((p) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "gallery-item";
    btn.setAttribute("aria-label", `See a bigger photo of the ${shark.name}`);
    const img = document.createElement("img");
    img.src = p.url;
    img.alt = `Photo of ${shark.name}`;
    img.loading = "lazy";
    const cap = document.createElement("span");
    cap.className = "gallery-credit";
    cap.textContent = p.credit;
    btn.append(img, cap);
    btn.addEventListener("click", () => openLightbox(p, shark));
    modalEls.gallery.appendChild(btn);
  });
}

function openLightbox(photo, shark) {
  modalEls.lightImg.src = photo.large || photo.url;
  modalEls.lightImg.alt = `Large photo of the ${shark.name}`;
  modalEls.lightCredit.textContent = photo.credit;
  modalEls.lightbox.hidden = false;
  modalEls.lightClose.focus();
}

function closeLightbox() {
  if (!modalEls || modalEls.lightbox.hidden) return;
  modalEls.lightbox.hidden = true;
  modalEls.lightImg.removeAttribute("src");
  modalEls.close.focus();
}

function openInfo(shark) {
  if (!modalEls) buildModal();
  currentSlug = shark.slug;
  lastFocused = document.activeElement;

  modalEls.img.src = artUrl(shark);
  modalEls.img.alt = `Illustration of the ${shark.name}`;
  modalEls.name.textContent = shark.name;
  modalEls.nameSay.onclick = () => speakField(shark.name);
  modalEls.groupDot.style.background = GROUPS[shark.group].color;
  modalEls.groupName.textContent = GROUPS[shark.group].name;
  modalEls.hear.onclick = () => speakAll(shark);
  fillStats(shark);
  fillFacts(shark);

  modalEls.overlay.hidden = false;
  document.body.classList.add("modal-open");
  modalEls.card.scrollTop = 0;
  modalEls.close.focus();

  loadGallery(shark);
}

function closeInfo() {
  if (!modalEls || modalEls.overlay.hidden) return;
  cancelSpeech();
  closeLightbox();
  modalEls.overlay.hidden = true;
  document.body.classList.remove("modal-open");
  currentSlug = null;
  if (lastFocused && lastFocused.focus) lastFocused.focus();
}

function renderSound() {
  soundBtn.setAttribute("aria-pressed", String(soundOn));
  soundBtn.classList.toggle("is-off", !soundOn);
  soundBtn.innerHTML = `${SPEAKER_SVG}<span class="sound-label">${soundOn ? "Sound on" : "Sound off"}</span>`;
}

function initControls() {
  renderSound();
  soundBtn.addEventListener("click", () => {
    soundOn = !soundOn;
    saveSound();
    if (soundOn) {
      playChime("spot");
    } else {
      cancelSpeech();
    }
    renderSound();
  });

  resetBtn.addEventListener("click", () => {
    if (!spotted.length) return;
    if (!window.confirm("Start over and clear your shark logbook?")) return;
    spotted.length = 0;
    saveSpotted();
    renderSpotted();
    updateProgress();
    cheerEl.textContent = "Logbook cleared — go spot some sharks!";
  });
}

function restoreSpotted() {
  const bySlug = new Map(SHARKS.map((s) => [s.slug, s]));
  loadSpotted().forEach((slug) => {
    const shark = bySlug.get(slug);
    if (shark && !spotted.includes(shark)) spotted.push(shark);
  });
}

function start() {
  restoreSpotted();
  const exclude = [];
  for (let i = 0; i < FIELD_SIZE; i += 1) {
    const shark = pickSpawn(exclude);
    exclude.push(shark.slug);
    field.push(shark);
    const btn = makeFieldCard(i);
    slotButtons.push(btn);
    fieldEl.appendChild(btn);
  }
  initControls();
  renderSpotted();
  updateProgress();
}

start();
