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
};

// Every shark is a real species. `art` is the bundled illustration, `inat` is the
// iNaturalist taxon id used to load real photos, and `info` fills the info card.
const SHARKS = [
  {
    slug: "great-white", name: "Great White Shark", sci: "Carcharodon carcharias",
    group: "mackerel", inat: 50873,
    fact: "The great white is the biggest hunting shark, and it can leap right out of the water.",
    info: {
      length: "Up to 6 m (20 ft)",
      weight: "Up to ~2,000 kg (4,400 lb)",
      speed: "Up to ~40 km/h (25 mph) in bursts",
      lifespan: "~70 years",
      range: "Cool and warm coastal seas worldwide",
      diet: "Seals, sea lions, fish, and other sharks",
      traits: "Can leap fully out of the water to ambush seals, and senses the tiny electric fields of hidden prey.",
    },
  },
  {
    slug: "mako", name: "Shortfin Mako", sci: "Isurus oxyrinchus",
    group: "mackerel", inat: 69677,
    fact: "The shortfin mako is the fastest shark, and it can leap high out of the sea.",
    info: {
      length: "Up to ~4 m (13 ft)",
      weight: "Up to ~570 kg (1,250 lb)",
      speed: "Over 70 km/h (45 mph) — the fastest shark",
      lifespan: "~30 years",
      range: "Warm and temperate open oceans worldwide",
      diet: "Fast fish like tuna and mackerel, and squid",
      traits: "Keeps its muscles warmer than the water so it can sprint after fast fish and leap high above the surface.",
    },
  },
  {
    slug: "basking", name: "Basking Shark", sci: "Cetorhinus maximus",
    group: "mackerel", inat: 82128,
    fact: "The basking shark swims with its giant mouth wide open to catch tiny plankton.",
    info: {
      length: "Up to ~10 m (33 ft)",
      weight: "Up to ~5,000 kg (11,000 lb)",
      speed: "Slow, about 4 km/h while feeding",
      lifespan: "~50 years",
      range: "Cool coastal waters worldwide",
      diet: "Plankton, filtered from the seawater",
      traits: "The second-biggest fish in the ocean. It cruises with its enormous mouth open, straining plankton through its gills.",
    },
  },
  {
    slug: "thresher", name: "Thresher Shark", sci: "Alopias vulpinus",
    group: "mackerel", inat: 93696,
    fact: "A thresher shark uses its extra long tail like a whip to stun fish.",
    info: {
      length: "Up to ~6 m (20 ft) — about half is tail",
      weight: "Up to ~350 kg (770 lb)",
      speed: "A fast, agile swimmer",
      lifespan: "~20-50 years",
      range: "Open and coastal seas, warm and temperate",
      diet: "Schooling fish like sardines, and squid",
      traits: "Swings its enormously long tail like a whip to slap and stun whole schools of fish.",
    },
  },
  {
    slug: "goblin", name: "Goblin Shark", sci: "Mitsukurina owstoni",
    group: "mackerel", inat: 105913,
    fact: "The goblin shark lives deep down and shoots its jaws out to grab prey.",
    info: {
      length: "~3-4 m (10-13 ft)",
      weight: "~150-200 kg (330-460 lb)",
      speed: "Slow",
      lifespan: "Not known (a deep-sea mystery)",
      range: "Deep sea worldwide, often 200-1,300 m down",
      diet: "Deep-sea fish, squid, and crustaceans",
      traits: "A rare 'living fossil'. It shoots its jaws far out of its mouth to snatch prey it finds with its long snout.",
    },
  },
  {
    slug: "tiger", name: "Tiger Shark", sci: "Galeocerdo cuvier",
    group: "requiem", inat: 52299,
    fact: "Young tiger sharks have dark stripes, and they will try to eat almost anything.",
    info: {
      length: "Up to ~5 m (16 ft)",
      weight: "Up to ~900 kg (2,000 lb)",
      speed: "~30 km/h (20 mph)",
      lifespan: "~30-40 years",
      range: "Tropical and warm coastal seas worldwide",
      diet: "Almost anything — fish, turtles, seabirds, and seals",
      traits: "Named for the dark stripes on young sharks, and famous for eating almost anything it comes across.",
    },
  },
  {
    slug: "bull", name: "Bull Shark", sci: "Carcharhinus leucas",
    group: "requiem", inat: 84996,
    fact: "Bull sharks are strong, and they can even swim up rivers, not just the sea.",
    info: {
      length: "Up to ~3.5 m (11 ft)",
      weight: "Up to ~300 kg (660 lb)",
      speed: "~19 km/h, faster in bursts",
      lifespan: "~16-25 years",
      range: "Warm coasts, plus rivers and lakes",
      diet: "Fish, dolphins, turtles, and other sharks",
      traits: "One of the very few sharks that can live in fresh water, and it has been found far up rivers.",
    },
  },
  {
    slug: "blue", name: "Blue Shark", sci: "Prionace glauca",
    group: "requiem", inat: 110361,
    fact: "Blue sharks travel enormous distances across the open ocean.",
    info: {
      length: "Up to ~3.8 m (12 ft)",
      weight: "Up to ~200 kg (440 lb)",
      speed: "Cruises slowly, but can sprint",
      lifespan: "~20 years",
      range: "Open oceans worldwide, cool and tropical",
      diet: "Squid and small schooling fish",
      traits: "A true world traveler that can cross entire oceans, known for its brilliant blue color and long wing-like fins.",
    },
  },
  {
    slug: "lemon", name: "Lemon Shark", sci: "Negaprion brevirostris",
    group: "requiem", inat: 106650,
    fact: "Lemon sharks have a yellowish color that hides them over sandy sea floors.",
    info: {
      length: "Up to ~3.4 m (11 ft)",
      weight: "Up to ~180 kg (400 lb)",
      speed: "Moderate",
      lifespan: "~25-30 years",
      range: "Warm coasts of the Americas and West Africa",
      diet: "Bony fish, rays, and crustaceans",
      traits: "Its yellow-brown color hides it over sandy sea floors, and it often returns to the same home areas.",
    },
  },
  {
    slug: "hammerhead", name: "Great Hammerhead", sci: "Sphyrna mokarran",
    group: "hammerhead", inat: 56766,
    fact: "The great hammerhead swings its wide head over the sand to find hidden stingrays.",
    info: {
      length: "Up to ~6 m (20 ft)",
      weight: "Up to ~450 kg (1,000 lb)",
      speed: "Agile and quick",
      lifespan: "~20-40 years",
      range: "Warm tropical coasts worldwide",
      diet: "Stingrays, fish, squid, and crabs",
      traits: "Its wide hammer head is packed with sensors to find prey buried in the sand — and it loves to eat stingrays.",
    },
  },
  {
    slug: "whale", name: "Whale Shark", sci: "Rhincodon typus",
    group: "carpet", inat: 52188,
    fact: "The whale shark is the biggest fish in the whole ocean, but it only eats tiny plankton.",
    info: {
      length: "Up to ~12-18 m (40-60 ft)",
      weight: "Up to ~20,000 kg (over 40,000 lb)",
      speed: "Slow, about 5 km/h",
      lifespan: "80-130 years",
      range: "Warm tropical oceans worldwide",
      diet: "Plankton and tiny fish, filtered from the water",
      traits: "The biggest fish in the world. Every whale shark has its own pattern of spots, like a fingerprint.",
    },
  },
  {
    slug: "nurse", name: "Nurse Shark", sci: "Ginglymostoma cirratum",
    group: "carpet", inat: 49964,
    fact: "Nurse sharks are calm, and they love to rest on the sandy bottom.",
    info: {
      length: "Up to ~3 m (10 ft)",
      weight: "Up to ~110 kg (240 lb)",
      speed: "Slow",
      lifespan: "~25 years",
      range: "Warm shallow coasts of the Americas and West Africa",
      diet: "Snails, crabs, lobsters, and small fish",
      traits: "A calm shark that rests on the bottom by day and sucks up hidden prey with a strong, vacuum-like mouth.",
    },
  },
  {
    slug: "zebra", name: "Zebra Shark", sci: "Stegostoma tigrinum",
    group: "carpet", inat: 1303450,
    fact: "Baby zebra sharks have stripes that slowly turn into spots as they grow up.",
    info: {
      length: "Up to ~2.5 m (8 ft)",
      weight: "Up to ~30 kg (66 lb)",
      speed: "Slow",
      lifespan: "~25-30 years",
      range: "Tropical coral reefs of the Indian and Pacific Oceans",
      diet: "Snails, small fish, and crabs",
      traits: "Babies have stripes that turn into spots as they grow, and they can wriggle into narrow reef cracks to find food.",
    },
  },
  {
    slug: "wobbegong", name: "Spotted Wobbegong", sci: "Orectolobus maculatus",
    group: "carpet", inat: 63638,
    fact: "The wobbegong is a flat carpet shark that hides on the sea floor waiting for a meal.",
    info: {
      length: "Up to ~3 m (10 ft)",
      weight: "Up to ~70 kg (150 lb)",
      speed: "Very slow — an ambush hunter",
      lifespan: "~25-30 years",
      range: "Shallow reefs around Australia",
      diet: "Fish, crabs, and octopus",
      traits: "A carpet shark with a fringe of skin flaps around its mouth. Its patterned body is perfect camouflage on the sea floor.",
    },
  },
  {
    slug: "greenland", name: "Greenland Shark", sci: "Somniosus microcephalus",
    group: "dogfish", inat: 112841,
    fact: "The Greenland shark lives in icy cold water and can live for hundreds of years.",
    info: {
      length: "Up to ~6-7 m (20-24 ft)",
      weight: "Up to ~1,000 kg (2,200 lb)",
      speed: "Very slow, about 3 km/h",
      lifespan: "250-400+ years — the longest-living vertebrate",
      range: "Cold deep waters of the North Atlantic and Arctic",
      diet: "Fish, seals, and scavenged animals",
      traits: "The longest-living backboned animal known. It grows only about 1 cm a year in the freezing cold.",
    },
  },
  {
    slug: "angel", name: "Angelshark", sci: "Squatina squatina",
    group: "angel", inat: 113064,
    fact: "Angel sharks are flat, and they bury themselves in the sand to surprise their prey.",
    info: {
      length: "Up to ~2.4 m (8 ft)",
      weight: "Up to ~80 kg (180 lb)",
      speed: "Slow — an ambush hunter",
      lifespan: "~25-35 years",
      range: "Coastal Northeast Atlantic and Mediterranean",
      diet: "Flatfish, other fish, and crustaceans",
      traits: "A flat, ray-like shark that buries itself in the sand and bursts upward to surprise passing fish.",
    },
  },
];

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

function speak(text) {
  if (!window.speechSynthesis) return;
  const u = new SpeechSynthesisUtterance(text);
  u.rate = 0.95;
  u.pitch = 1.0;
  window.speechSynthesis.speak(u);
}

function article(name) {
  return /^[aeiou]/i.test(name) ? "an" : "a";
}

function hearShark(shark) {
  if (window.speechSynthesis) window.speechSynthesis.cancel();
  speak(shark.name);
  speak(shark.fact);
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
      <h2 class="modal-name" id="modal-name"></h2>
      <p class="modal-group"><span class="group-dot" aria-hidden="true"></span><span class="group-name"></span></p>
      <button class="modal-hear" type="button">🔊 Hear its name &amp; fact</button>
      <dl class="stat-grid"></dl>
      <div class="modal-section">
        <h3>Cool facts</h3>
        <p class="modal-traits"></p>
      </div>
      <div class="modal-section">
        <h3>Real photos</h3>
        <div class="gallery" aria-live="polite"></div>
        <p class="modal-credit">Photos from <a href="https://www.inaturalist.org" target="_blank" rel="noopener">iNaturalist</a> under Creative Commons.</p>
      </div>
    </div>`;
  document.body.appendChild(overlay);

  modalEls = {
    overlay,
    card: overlay.querySelector(".modal-card"),
    close: overlay.querySelector(".modal-close"),
    img: overlay.querySelector(".modal-img"),
    name: overlay.querySelector(".modal-name"),
    groupDot: overlay.querySelector(".modal-group .group-dot"),
    groupName: overlay.querySelector(".modal-group .group-name"),
    hear: overlay.querySelector(".modal-hear"),
    stats: overlay.querySelector(".stat-grid"),
    traits: overlay.querySelector(".modal-traits"),
    gallery: overlay.querySelector(".gallery"),
  };

  overlay.addEventListener("click", (e) => {
    if (e.target.hasAttribute("data-close")) closeInfo();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !overlay.hidden) closeInfo();
  });
}

function fillStats(shark) {
  modalEls.stats.replaceChildren();
  STAT_ROWS.forEach(([label, key]) => {
    const value = key === "sci" ? shark.sci : shark.info[key];
    if (!value) return;
    const dt = document.createElement("dt");
    dt.textContent = label;
    const dd = document.createElement("dd");
    dd.textContent = value;
    if (key === "sci") dd.classList.add("sci");
    modalEls.stats.append(dt, dd);
  });
}

function galleryMessage(text) {
  modalEls.gallery.replaceChildren();
  const p = document.createElement("p");
  p.className = "gallery-msg";
  p.textContent = text;
  modalEls.gallery.appendChild(p);
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
      .map((p) => ({
        url: p.photo.medium_url || p.photo.url,
        credit: (p.photo.attribution || "iNaturalist").replace(/\(c\)\s*/i, "").trim(),
      }));
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
    const fig = document.createElement("figure");
    fig.className = "gallery-item";
    const img = document.createElement("img");
    img.src = p.url;
    img.alt = `Photo of ${shark.name}`;
    img.loading = "lazy";
    const cap = document.createElement("figcaption");
    cap.textContent = p.credit;
    fig.append(img, cap);
    modalEls.gallery.appendChild(fig);
  });
}

function openInfo(shark) {
  if (!modalEls) buildModal();
  currentSlug = shark.slug;
  lastFocused = document.activeElement;

  modalEls.img.src = artUrl(shark);
  modalEls.img.alt = `Illustration of the ${shark.name}`;
  modalEls.name.textContent = shark.name;
  modalEls.groupDot.style.background = GROUPS[shark.group].color;
  modalEls.groupName.textContent = GROUPS[shark.group].name;
  modalEls.traits.textContent = shark.info.traits;
  modalEls.hear.onclick = () => hearShark(shark);
  fillStats(shark);

  modalEls.overlay.hidden = false;
  document.body.classList.add("modal-open");
  modalEls.card.scrollTop = 0;
  modalEls.close.focus();

  loadGallery(shark);
}

function closeInfo() {
  if (!modalEls || modalEls.overlay.hidden) return;
  if (window.speechSynthesis) window.speechSynthesis.cancel();
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
