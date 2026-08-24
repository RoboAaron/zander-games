const FIELD_SIZE = 3;
const SPOT_MS = 1100;

// iNaturalist photo licenses we are allowed to show in the gallery.
const OPEN_LICENSES = new Set([
  "cc0", "cc-by", "cc-by-nc", "cc-by-sa", "cc-by-nd", "cc-by-nc-sa", "cc-by-nc-nd", "pd",
]);
const GALLERY_MAX = 5;

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

const field = [];
const spotted = [];
const slotButtons = [];
let locked = false;

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
  if (!window.speechSynthesis || !text) return;
  const u = new SpeechSynthesisUtterance(text);
  u.rate = 0.95;
  u.pitch = 1.0;
  window.speechSynthesis.speak(u);
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

function hearShark(shark) {
  cancelSpeech();
  speak(shark.name);
  speak(shark.facts[0]);
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
  cheerEl.textContent = `You spotted ${article(shark.name)} ${shark.name}!`;
  hearShark(shark);
  addToSpotted(shark);

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

function start() {
  const exclude = [];
  for (let i = 0; i < FIELD_SIZE; i += 1) {
    const shark = pickSpawn(exclude);
    exclude.push(shark.slug);
    field.push(shark);
    const btn = makeFieldCard(i);
    slotButtons.push(btn);
    fieldEl.appendChild(btn);
  }
  renderSpotted();
  updateProgress();
}

start();
