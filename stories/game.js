const FIELD_SIZE = 3;
const SPOT_MS = 1100;
const STORE_KEY = "story-spotter-v1";
const BURST_COLORS = ["#ffd166", "#ff8fab", "#8ecae6", "#c8f76b", "#ffffff", "#f6a04d"];

// Spoken lines are the preschool lines from the story list. Do not paraphrase them.
const SETS = [
  {
    id: "who-god-is",
    name: "Who God is",
    icon: "one-god",
    cards: [
      { id: "one-god", name: "One God", line: "There is one true God." },
      { id: "father-son-spirit", name: "Father, Son, and Spirit", line: "God is Father, Son, and Holy Spirit. One God, three persons." },
      { id: "god-is-good", name: "God is good", line: "God is truly good." },
      { id: "living-god", name: "The living God", line: "God is alive. He is not a pretend god." },
      { id: "made-like-him", name: "Made like him", line: "God made people in his image, to show what he is like." },
      { id: "for-his-glory", name: "For his glory", line: "God made everything for his glory." },
      { id: "gods-word", name: "God\u2019s Word", line: "The Bible is God speaking, and it is true." },
      { id: "points-to-jesus", name: "It points to Jesus", line: "The whole Bible lifts up Jesus." },
    ],
  },
  {
    id: "gospel",
    name: "The gospel story",
    icon: "jesus-born",
    cards: [
      { id: "god-made-world", name: "God made the world", line: "God made the heavens and the earth." },
      { id: "people-turned-away", name: "People turned away", line: "All people have turned away from God. The first people hid from him." },
      { id: "promised-rescuer", name: "God promised a Rescuer", line: "God promised a Savior who would beat the enemy." },
      { id: "jesus-born", name: "Jesus was born", line: "Jesus came to earth and was born, just as God promised." },
      { id: "jesus-gods-son", name: "Jesus is God\u2019s Son", line: "Jesus is God\u2019s Son forever. At his baptism the Father said so out loud." },
      { id: "jesus-died", name: "Jesus died for us", line: "Jesus died on the cross to take our sin, while we were still sinners." },
      { id: "jesus-rose", name: "Jesus rose", line: "Jesus rose. He is alive, and he beat death." },
      { id: "trust-jesus", name: "Trust Jesus", line: "God saves everyone who trusts Jesus. We cannot earn it." },
    ],
  },
  {
    id: "promise",
    name: "God keeps his promise",
    icon: "noah",
    cards: [
      { id: "noah", name: "Noah", line: "People were cruel, and God sent a flood. He saved Noah\u2019s family in the ark, then promised mercy." },
      { id: "abraham", name: "Abraham", line: "God promised Abraham a family, and a blessing for every people." },
      { id: "god-provides", name: "God provides", line: "God gave a ram instead of Isaac. Later he gave his own Son for us." },
      { id: "joseph", name: "Joseph", line: "People meant to hurt Joseph. God used it to save many lives." },
      { id: "out-of-egypt", name: "Out of Egypt", line: "God opened the sea and led his people out of slavery. He saves." },
      { id: "gods-rules", name: "God\u2019s good rules", line: "God gave good rules. They show our sin. They do not save us." },
      { id: "forever-king", name: "A forever King", line: "God promised David a King whose throne would last forever." },
      { id: "promised-child", name: "A promised child", line: "God promised a child who would be God and King. Jesus is that child." },
    ],
  },
  {
    id: "with-us",
    name: "Jesus with us",
    icon: "wind-and-waves",
    cards: [
      { id: "never-sinned", name: "Jesus never sinned", line: "Jesus never sinned. He always obeyed his Father." },
      { id: "god-with-us", name: "God with us", line: "Jesus is God, come to be with us." },
      { id: "jesus-said-no", name: "Jesus said no", line: "Jesus would not follow the devil. He obeyed his Father." },
      { id: "children-come", name: "Children can come", line: "Jesus wants children to come to him. He does not send them away." },
      { id: "jesus-healed", name: "Jesus healed", line: "Jesus healed sick people. He carried our hurt." },
      { id: "wind-and-waves", name: "Wind and waves", line: "Jesus told the storm to stop, and it did." },
      { id: "bread-of-life", name: "Bread of life", line: "Jesus fed a huge crowd, and he is the one who gives real life." },
      { id: "lord-serves", name: "The Lord who serves", line: "Jesus, the Lord, washed feet. He loved us before we served anyone." },
    ],
  },
  {
    id: "his-people",
    name: "His people",
    icon: "the-helper",
    cards: [
      { id: "the-helper", name: "The Helper", line: "Jesus sent the Holy Spirit. We cannot follow Jesus without him." },
      { id: "spirits-fruit", name: "The Spirit\u2019s fruit", line: "The Spirit grows love, joy, and peace in us. We do not make that to earn God." },
      { id: "pray-father", name: "Pray to the Father", line: "Jesus taught us to pray to God as Father. We pray to know him, not to boss him." },
      { id: "jesus-church", name: "Jesus\u2019 church", line: "The church is everyone who trusts Jesus. They meet, pray, and help each other." },
      { id: "baptism", name: "Baptism", line: "When someone trusts Jesus, they are baptized to show his death and rising. Baptism does not save. Jesus does." },
      { id: "love-god-people", name: "Love God and people", line: "We love God and people because he loved us first. Love does not buy his love." },
      { id: "go-and-tell", name: "Go and tell", line: "Jesus sends his people to tell his good news to everyone." },
      { id: "tell-the-truth", name: "Tell God the truth", line: "When we sin, we tell God, and he forgives. Jesus\u2019 people stay in his hand." },
      { id: "heaven-hell", name: "Heaven and hell", line: "Jesus prepares a home for his people. Hell is real: forever without him." },
      { id: "jesus-comes-back", name: "Jesus will come back", line: "Jesus will come back and set up his kingdom." },
    ],
  },
];

const PLAY_ORDER = ["gospel", "who-god-is", "promise", "with-us", "his-people"];

const cheerEl = document.getElementById("cheer");
const spokenEl = document.getElementById("spoken");
const setsEl = document.getElementById("sets");
const fieldEl = document.getElementById("field");
const bookHeading = document.getElementById("book-heading");
const progressEl = document.getElementById("progress");
const pipsEl = document.getElementById("pips");
const bookListEl = document.getElementById("book-list");
const hearStoryBtn = document.getElementById("hear-story");
const resetBtn = document.getElementById("reset-btn");
const howToEl = document.getElementById("how-to");

const field = [];
const slotButtons = [];
let state = null;
let locked = false;
let dealGen = 0;
let playToken = 0;
let audioCtx = null;

function setById(id) {
  return SETS.find((s) => s.id === id);
}

function current() {
  return setById(state.current);
}

function artUrl(id) {
  return `art/${id}.svg`;
}

function soundOn() {
  return !window.Kids || window.Kids.sound.enabled;
}

function foundIds(set) {
  return state.found[set.id];
}

function isFound(set, id) {
  return foundIds(set).includes(id);
}

function isComplete(set) {
  return foundIds(set).length === set.cards.length;
}

function allComplete() {
  return SETS.every(isComplete);
}

function suggestedNext() {
  if (!isComplete(current())) return null;
  for (let i = 0; i < PLAY_ORDER.length; i += 1) {
    const set = setById(PLAY_ORDER[i]);
    if (!isComplete(set)) return set;
  }
  return null;
}

function howTo() {
  return `${current().name}. Tap a picture to keep it. Tap a picture in your book to hear it again.`;
}

function loadState() {
  const fresh = { current: "gospel", found: {} };
  SETS.forEach((set) => {
    fresh.found[set.id] = [];
  });
  const raw = window.Kids ? window.Kids.store.get(STORE_KEY, null) : null;
  if (!raw || typeof raw !== "object") return fresh;
  if (setById(raw.current)) fresh.current = raw.current;
  SETS.forEach((set) => {
    const ids = raw.found && Array.isArray(raw.found[set.id]) ? raw.found[set.id] : [];
    const keep = [];
    ids.forEach((id) => {
      if (set.cards.some((card) => card.id === id) && !keep.includes(id)) keep.push(id);
    });
    fresh.found[set.id] = keep;
  });
  return fresh;
}

function saveState() {
  if (window.Kids) window.Kids.store.set(STORE_KEY, state);
}

function stopPlayback() {
  playToken += 1;
  clearHighlights();
  if (window.Kids) window.Kids.sound.cancel();
  else if (window.speechSynthesis) window.speechSynthesis.cancel();
}

function speakLines(lines) {
  stopPlayback();
  if (!soundOn()) return;
  const list = (lines || []).filter(Boolean);
  if (!list.length) return;
  if (window.Kids) window.Kids.sound.speakQueue(list, { rate: 0.92, pitch: 1.05 });
}

function speakThen(text, onDone, token) {
  let finished = false;
  function finish() {
    if (finished || token !== playToken) return;
    finished = true;
    onDone();
  }
  const wait = soundOn() ? Math.min(16000, 900 + String(text).length * 70) : 700;
  const timer = window.setTimeout(finish, wait);
  if (!soundOn() || !window.speechSynthesis) return;
  const u = new SpeechSynthesisUtterance(text);
  u.rate = 0.92;
  u.pitch = 1.05;
  u.onend = () => {
    window.clearTimeout(timer);
    finish();
  };
  u.onerror = () => {
    window.clearTimeout(timer);
    finish();
  };
  window.setTimeout(() => {
    if (token !== playToken) return;
    try {
      const synth = window.speechSynthesis;
      if (synth.speaking || synth.pending) synth.cancel();
      window.setTimeout(() => {
        if (token !== playToken) return;
        try {
          synth.speak(u);
        } catch (err) {
          window.clearTimeout(timer);
          finish();
        }
      }, 80);
    } catch (err) {
      window.clearTimeout(timer);
      finish();
    }
  }, 40);
}

function runSteps(steps) {
  const token = ++playToken;
  if (window.Kids) window.Kids.sound.cancel();
  let index = 0;
  function run() {
    if (token !== playToken) return;
    if (index >= steps.length) {
      clearHighlights();
      return;
    }
    const step = steps[index];
    index += 1;
    highlight(step.id || null);
    if (step.show) spokenEl.textContent = step.show;
    speakThen(step.say, run, token);
  }
  window.setTimeout(run, 90);
}

function storySteps(set, intro) {
  const steps = [];
  if (intro) steps.push({ say: intro, show: intro });
  set.cards.forEach((card) => {
    steps.push({
      id: card.id,
      say: `${card.name}. ${card.line}`,
      show: card.line,
    });
  });
  return steps;
}

function playFinishedStory(set, bigger) {
  const intro = bigger ? "New! You found the whole story!" : `New! You found all of ${set.name}!`;
  const steps = storySteps(set, intro);
  const next = suggestedNext();
  if (next) steps.push({ say: `Next. ${next.name}.`, show: next.name });
  runSteps(steps);
}

function playSavedStory() {
  runSteps(storySteps(current(), null));
}

function getAudioCtx() {
  if (audioCtx) return audioCtx;
  const AC = window.AudioContext || window.webkitAudioContext;
  if (!AC) return null;
  try {
    audioCtx = new AC();
  } catch (err) {
    return null;
  }
  return audioCtx;
}

function playTone(freq, start, dur, gain, type) {
  const ctx = getAudioCtx();
  if (!ctx) return;
  const osc = ctx.createOscillator();
  const amp = ctx.createGain();
  osc.type = type || "sine";
  osc.frequency.value = freq;
  const t0 = ctx.currentTime + start;
  amp.gain.setValueAtTime(0.0001, t0);
  amp.gain.exponentialRampToValueAtTime(gain, t0 + 0.02);
  amp.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
  osc.connect(amp);
  amp.connect(ctx.destination);
  osc.start(t0);
  osc.stop(t0 + dur + 0.03);
}

function playChime(kind) {
  if (!soundOn()) return;
  const ctx = getAudioCtx();
  if (!ctx) return;
  if (ctx.state === "suspended") ctx.resume();
  if (kind === "complete") {
    [523.25, 659.25, 783.99, 1046.5].forEach((freq, i) => playTone(freq, i * 0.14, 0.5, 0.18, "triangle"));
  } else if (kind === "new") {
    [659.25, 830.61, 987.77].forEach((freq, i) => playTone(freq, i * 0.1, 0.35, 0.16, "triangle"));
  } else {
    [587.33, 880].forEach((freq, i) => playTone(freq, i * 0.09, 0.26, 0.13, "sine"));
  }
}

function burstAt(x, y, big) {
  const layer = document.createElement("div");
  layer.className = "burst";
  layer.style.left = `${x}px`;
  layer.style.top = `${y}px`;
  const count = big ? 22 : 12;
  for (let i = 0; i < count; i += 1) {
    const dot = document.createElement("span");
    dot.className = "burst-dot";
    const angle = (Math.PI * 2 * i) / count + Math.random() * 0.6;
    const dist = (big ? 90 : 60) + Math.random() * (big ? 80 : 40);
    dot.style.setProperty("--dx", `${Math.cos(angle) * dist}px`);
    dot.style.setProperty("--dy", `${Math.sin(angle) * dist - 20}px`);
    dot.style.background = BURST_COLORS[i % BURST_COLORS.length];
    layer.appendChild(dot);
  }
  document.body.appendChild(layer);
  window.setTimeout(() => layer.remove(), 1100);
}

function celebrate(big) {
  playChime("complete");
  const w = window.innerWidth;
  const h = window.innerHeight;
  const bursts = big ? 8 : 5;
  for (let i = 0; i < bursts; i += 1) {
    window.setTimeout(() => burstAt(Math.random() * w, h * 0.08 + Math.random() * h * 0.45, true), i * 160);
  }
}

function clearHighlights() {
  bookListEl.querySelectorAll(".is-speaking").forEach((el) => el.classList.remove("is-speaking"));
}

function highlight(id) {
  clearHighlights();
  if (!id) return;
  const card = bookListEl.querySelector(`[data-id="${id}"]`);
  if (!card) return;
  card.classList.add("is-speaking");
  const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  card.scrollIntoView({ block: "nearest", behavior: reduce ? "auto" : "smooth" });
}

function randomItem(list) {
  return list[Math.floor(Math.random() * list.length)];
}

function pickCard(exclude) {
  const cards = current().cards;
  let pool = cards.filter((card) => !exclude.includes(card.id) && !isFound(current(), card.id));
  if (!pool.length) pool = cards.filter((card) => !exclude.includes(card.id));
  if (!pool.length) pool = cards;
  return randomItem(pool);
}

function fillCard(index) {
  const card = field[index];
  const btn = slotButtons[index];
  btn.dataset.index = String(index);
  btn.classList.remove("spotting");
  btn.setAttribute("aria-label", card.name);
  const img = btn.querySelector("img");
  img.src = artUrl(card.id);
  img.alt = "";
  btn.querySelector(".card-name").textContent = card.name;
}

function makeFieldCard(index) {
  const btn = document.createElement("button");
  btn.type = "button";
  btn.className = "story-card";
  const art = document.createElement("span");
  art.className = "card-art";
  const img = document.createElement("img");
  img.alt = "";
  img.draggable = false;
  art.appendChild(img);
  const name = document.createElement("span");
  name.className = "card-name";
  const splash = document.createElement("span");
  splash.className = "splash";
  splash.setAttribute("aria-hidden", "true");
  btn.append(art, name, splash);
  btn.addEventListener("click", () => onSpot(Number(btn.dataset.index)));
  slotButtons[index] = btn;
  fieldEl.appendChild(btn);
  fillCard(index);
  return btn;
}

function renderSets() {
  setsEl.replaceChildren();
  const next = suggestedNext();
  SETS.forEach((set) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "set-btn";
    if (set.id === state.current) btn.classList.add("is-current");
    if (next && next.id === set.id) btn.classList.add("is-next");
    btn.setAttribute("aria-pressed", String(set.id === state.current));
    btn.setAttribute("aria-label", set.name);
    const img = document.createElement("img");
    img.src = artUrl(set.icon);
    img.alt = "";
    img.draggable = false;
    const label = document.createElement("span");
    label.textContent = set.name;
    btn.append(img, label);
    if (isComplete(set)) {
      const star = document.createElement("span");
      star.className = "set-star";
      star.setAttribute("aria-hidden", "true");
      star.textContent = "\u2605";
      btn.appendChild(star);
    }
    btn.addEventListener("click", () => openSet(set.id));
    setsEl.appendChild(btn);
  });
}

function renderBook() {
  const set = current();
  bookHeading.textContent = set.name;
  const found = set.cards.filter((card) => isFound(set, card.id));
  progressEl.textContent = `Found ${found.length} of ${set.cards.length}`;
  hearStoryBtn.hidden = !isComplete(set);
  pipsEl.replaceChildren();
  set.cards.forEach((card) => {
    const pip = document.createElement("span");
    pip.className = "pip" + (isFound(set, card.id) ? " is-found" : "");
    pipsEl.appendChild(pip);
  });
  bookListEl.replaceChildren();
  if (!found.length) {
    const empty = document.createElement("p");
    empty.className = "book-empty";
    empty.textContent = "No stories yet. Tap one above!";
    bookListEl.appendChild(empty);
    return;
  }
  found.forEach((card) => {
    const li = document.createElement("li");
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "book-card";
    btn.dataset.id = card.id;
    btn.setAttribute("aria-label", card.name);
    const art = document.createElement("span");
    art.className = "card-art";
    const img = document.createElement("img");
    img.src = artUrl(card.id);
    img.alt = "";
    img.draggable = false;
    art.appendChild(img);
    const name = document.createElement("span");
    name.className = "card-name";
    name.textContent = card.name;
    btn.append(art, name);
    btn.addEventListener("click", () => {
      spokenEl.textContent = card.line;
      cheerEl.textContent = card.name;
      speakLines([card.name, card.line]);
    });
    li.appendChild(btn);
    bookListEl.appendChild(li);
  });
}

function dealFresh() {
  dealGen += 1;
  locked = false;
  const exclude = [];
  for (let i = 0; i < FIELD_SIZE; i += 1) {
    const card = pickCard(exclude);
    exclude.push(card.id);
    field[i] = card;
    if (slotButtons[i]) fillCard(i);
  }
}

function openSet(id) {
  const set = setById(id);
  if (!set) return;
  const same = state.current === id;
  state.current = id;
  saveState();
  stopPlayback();
  cheerEl.textContent = set.name;
  spokenEl.textContent = "";
  if (!same) dealFresh();
  renderSets();
  renderBook();
  speakLines([set.name]);
}

function slideIn(index, gen) {
  const next = pickCard(field.map((card) => card.id));
  const unfoundElsewhere = field
    .map((card, i) => ({ card, i }))
    .filter(({ card, i }) => i !== index && !isFound(current(), card.id));
  if (isFound(current(), next.id) && unfoundElsewhere.length) {
    const swap = unfoundElsewhere[0];
    field[index] = swap.card;
    field[swap.i] = next;
    if (gen === dealGen) {
      fillCard(index);
      fillCard(swap.i);
    }
    return;
  }
  field[index] = next;
  if (gen === dealGen) fillCard(index);
}

function onSpot(index) {
  if (locked) return;
  const card = field[index];
  if (!card) return;
  const set = current();
  locked = true;
  const gen = dealGen;
  const btn = slotButtons[index];
  btn.classList.add("spotting");

  const wasNew = !isFound(set, card.id);
  const completes = wasNew && foundIds(set).length + 1 === set.cards.length;
  if (wasNew) {
    foundIds(set).push(card.id);
    saveState();
  }
  const bigger = completes && allComplete();
  const rect = btn.getBoundingClientRect();
  burstAt(rect.left + rect.width / 2, rect.top + rect.height / 2, wasNew || completes);

  renderBook();
  renderSets();

  if (completes) {
    cheerEl.textContent = bigger ? "New! You found the whole story!" : `New! You found all of ${set.name}!`;
    spokenEl.textContent = card.line;
    celebrate(bigger);
    playFinishedStory(set, bigger);
  } else {
    cheerEl.textContent = wasNew ? `New! ${card.name}` : card.name;
    spokenEl.textContent = card.line;
    playChime(wasNew ? "new" : "spot");
    speakLines(wasNew ? ["New!", card.name, card.line] : [card.name, card.line]);
  }

  window.setTimeout(() => {
    if (gen !== dealGen) return;
    slideIn(index, gen);
    locked = false;
  }, SPOT_MS);
}

function initChrome() {
  if (!window.Kids) return;
  const bar = document.getElementById("kids-topbar");
  if (bar) {
    bar.appendChild(window.Kids.homeButton("../"));
    const spacer = document.createElement("span");
    spacer.className = "kids-topbar-spacer";
    bar.appendChild(spacer);
    bar.appendChild(window.Kids.muteButton());
  }
  const text = howToEl.querySelector(".how-to-text");
  if (text) text.textContent = "Tap a picture to keep it. Tap a picture in your book to hear it again.";
  howToEl.appendChild(window.Kids.hearButton(howTo, { ariaLabel: "Hear how to play" }));
  window.Kids.speakInstructionOnce(howTo());
}

function start() {
  state = loadState();
  initChrome();
  for (let i = 0; i < FIELD_SIZE; i += 1) field.push(null);
  dealFresh();
  for (let i = 0; i < FIELD_SIZE; i += 1) makeFieldCard(i);
  renderSets();
  renderBook();
  cheerEl.textContent = current().name;
  if (allComplete()) cheerEl.textContent = "You found the whole story!";
  else if (isComplete(current())) cheerEl.textContent = `You found all of ${current().name}!`;

  hearStoryBtn.addEventListener("click", () => {
    cheerEl.textContent = current().name;
    playSavedStory();
  });

  resetBtn.addEventListener("click", () => {
    const set = current();
    if (!foundIds(set).length) return;
    if (!window.confirm("Start over and clear this set?")) return;
    state.found[set.id] = [];
    saveState();
    stopPlayback();
    cheerEl.textContent = set.name;
    spokenEl.textContent = "";
    dealFresh();
    renderSets();
    renderBook();
  });
}

start();
