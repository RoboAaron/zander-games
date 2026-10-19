const FIELD_SIZE = 3;
const SPOT_MS = 1100;
const STORE_KEY = "promise-bridge-v1";
const BURST_COLORS = ["#ffd166", "#ff8fab", "#8ecae6", "#c8f76b", "#ffffff", "#f6a04d"];
const HOW_TO = "Tap the Jesus picture that keeps God’s promise.";

// Promise and Jesus lines are the preschool lines from Story spotter. Do not paraphrase them.
const PAIRS = [
  {
    id: "ram-cross",
    promise: {
      id: "god-provides",
      name: "God provides",
      line: "God gave a ram instead of Isaac. Later he gave his own Son for us.",
    },
    jesus: {
      id: "jesus-died",
      name: "Jesus died for us",
      line: "Jesus died on the cross to take our sin, while we were still sinners.",
    },
  },
  {
    id: "promised-child-born",
    promise: {
      id: "promised-child",
      name: "A promised child",
      line: "God promised a child who would be God and King. Jesus is that child.",
    },
    jesus: {
      id: "jesus-born",
      name: "Jesus was born",
      line: "Jesus came to earth and was born, just as God promised.",
    },
  },
  {
    id: "forever-king-return",
    promise: {
      id: "forever-king",
      name: "A forever King",
      line: "God promised David a King whose throne would last forever.",
    },
    jesus: {
      id: "jesus-comes-back",
      name: "Jesus will come back",
      line: "Jesus will come back and set up his kingdom.",
    },
  },
  {
    id: "egypt-trust",
    promise: {
      id: "out-of-egypt",
      name: "Out of Egypt",
      line: "God opened the sea and led his people out of slavery. He saves.",
    },
    jesus: {
      id: "trust-jesus",
      name: "Trust Jesus",
      line: "God saves everyone who trusts Jesus. We cannot earn it.",
    },
  },
  {
    id: "abraham-go",
    promise: {
      id: "abraham",
      name: "Abraham",
      line: "God promised Abraham a family, and a blessing for every people.",
    },
    jesus: {
      id: "go-and-tell",
      name: "Go and tell",
      line: "Jesus sends his people to tell his good news to everyone.",
    },
  },
  {
    id: "noah-rose",
    promise: {
      id: "noah",
      name: "Noah",
      line: "People were cruel, and God sent a flood. He saved Noah’s family in the ark, then promised mercy.",
    },
    jesus: {
      id: "jesus-rose",
      name: "Jesus rose",
      line: "Jesus rose. He is alive, and he beat death.",
    },
  },
];

const cheerEl = document.getElementById("cheer");
const spokenEl = document.getElementById("spoken");
const promptEl = document.getElementById("prompt");
const fieldEl = document.getElementById("field");
const progressEl = document.getElementById("progress");
const matchedListEl = document.getElementById("matched-list");
const hearStoryBtn = document.getElementById("hear-story");
const resetBtn = document.getElementById("reset-btn");
const howToEl = document.getElementById("how-to");

const field = [];
const slotButtons = [];
let state = null;
let currentPair = null;
let locked = false;
let dealGen = 0;
let playToken = 0;
let audioCtx = null;

function artUrl(id) {
  return `../stories/art/${id}.svg`;
}

function soundOn() {
  return !window.Kids || window.Kids.sound.enabled;
}

function pairById(id) {
  return PAIRS.find((pair) => pair.id === id);
}

function matchedIds() {
  return state.matched;
}

function isMatched(id) {
  return matchedIds().includes(id);
}

function isComplete() {
  return matchedIds().length >= PAIRS.length;
}

function unmatchedPairs() {
  return PAIRS.filter((pair) => !isMatched(pair.id));
}

function howTo() {
  return HOW_TO;
}

function loadState() {
  const fresh = { matched: [] };
  const raw = window.Kids ? window.Kids.store.get(STORE_KEY, null) : null;
  if (!raw || typeof raw !== "object") return fresh;
  const ids = Array.isArray(raw.matched) ? raw.matched : [];
  ids.forEach((id) => {
    if (pairById(id) && !fresh.matched.includes(id)) fresh.matched.push(id);
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

function bridgeSteps(intro) {
  const steps = [];
  if (intro) steps.push({ say: intro, show: intro });
  matchedIds().forEach((id) => {
    const pair = pairById(id);
    if (!pair) return;
    steps.push({
      id: pair.id,
      say: `${pair.promise.name}. ${pair.promise.line}`,
      show: pair.promise.line,
    });
    steps.push({
      id: pair.id,
      say: `${pair.jesus.name}. ${pair.jesus.line}`,
      show: pair.jesus.line,
    });
  });
  return steps;
}

function playFinishedBridge() {
  runSteps(bridgeSteps("New! You found every promise bridge!"));
}

function playSavedBridge() {
  runSteps(bridgeSteps(null));
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
  } else if (kind === "soft") {
    [392, 349.23].forEach((freq, i) => playTone(freq, i * 0.08, 0.2, 0.08, "sine"));
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

function celebrate() {
  playChime("complete");
  const w = window.innerWidth;
  const h = window.innerHeight;
  for (let i = 0; i < 8; i += 1) {
    window.setTimeout(() => burstAt(Math.random() * w, h * 0.08 + Math.random() * h * 0.45, true), i * 160);
  }
}

function clearHighlights() {
  matchedListEl.querySelectorAll(".is-speaking").forEach((el) => el.classList.remove("is-speaking"));
}

function highlight(id) {
  clearHighlights();
  if (!id) return;
  const card = matchedListEl.querySelector(`[data-id="${id}"]`);
  if (!card) return;
  card.classList.add("is-speaking");
  const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  card.scrollIntoView({ block: "nearest", behavior: reduce ? "auto" : "smooth" });
}

function shuffle(list) {
  const out = list.slice();
  for (let i = out.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    const tmp = out[i];
    out[i] = out[j];
    out[j] = tmp;
  }
  return out;
}

function jesusPool() {
  return PAIRS.map((pair) => pair.jesus);
}

function pickChoices(pair) {
  const correct = pair.jesus;
  const others = jesusPool().filter((card) => card.id !== correct.id);
  const distractors = shuffle(others).slice(0, FIELD_SIZE - 1);
  return shuffle([correct].concat(distractors));
}

function fillCard(index) {
  const card = field[index];
  const btn = slotButtons[index];
  if (!card || !btn) return;
  btn.dataset.index = String(index);
  btn.classList.remove("spotting", "wrong");
  btn.disabled = false;
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
  btn.addEventListener("click", () => onPick(Number(btn.dataset.index)));
  slotButtons[index] = btn;
  fieldEl.appendChild(btn);
  return btn;
}

function renderPrompt() {
  promptEl.replaceChildren();
  if (!currentPair) {
    const done = document.createElement("p");
    done.className = "spoken";
    done.textContent = "You matched every promise. Tap Hear the bridges, or Start over.";
    promptEl.appendChild(done);
    return;
  }
  const card = document.createElement("div");
  card.className = "prompt-card";
  const img = document.createElement("img");
  img.src = artUrl(currentPair.promise.id);
  img.alt = "";
  img.draggable = false;
  const copy = document.createElement("div");
  copy.className = "prompt-copy";
  const kicker = document.createElement("p");
  kicker.className = "prompt-kicker";
  kicker.textContent = "God’s promise";
  const name = document.createElement("p");
  name.className = "prompt-name";
  name.textContent = currentPair.promise.name;
  const line = document.createElement("p");
  line.className = "prompt-line";
  line.textContent = currentPair.promise.line;
  copy.append(kicker, name, line);
  card.append(img, copy);
  promptEl.appendChild(card);
}

function renderMatched() {
  progressEl.textContent = `Matched ${matchedIds().length} of ${PAIRS.length}`;
  hearStoryBtn.hidden = !isComplete();
  matchedListEl.replaceChildren();
  if (!matchedIds().length) {
    const empty = document.createElement("p");
    empty.className = "bridge-empty";
    empty.textContent = "No bridges yet. Match a promise above!";
    matchedListEl.appendChild(empty);
    return;
  }
  matchedIds().forEach((id) => {
    const pair = pairById(id);
    if (!pair) return;
    const li = document.createElement("li");
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "pair-card";
    btn.dataset.id = pair.id;
    btn.setAttribute("aria-label", `${pair.promise.name} to ${pair.jesus.name}`);
    const row = document.createElement("div");
    row.className = "pair-row";
    function side(card) {
      const wrap = document.createElement("span");
      wrap.className = "pair-side";
      const img = document.createElement("img");
      img.src = artUrl(card.id);
      img.alt = "";
      img.draggable = false;
      const label = document.createElement("span");
      label.className = "pair-label";
      label.textContent = card.name;
      wrap.append(img, label);
      return wrap;
    }
    const arrow = document.createElement("span");
    arrow.className = "pair-arrow";
    arrow.setAttribute("aria-hidden", "true");
    arrow.textContent = "→";
    row.append(side(pair.promise), arrow, side(pair.jesus));
    btn.appendChild(row);
    btn.addEventListener("click", () => {
      cheerEl.textContent = `${pair.promise.name} → ${pair.jesus.name}`;
      spokenEl.textContent = pair.jesus.line;
      speakLines([pair.promise.name, pair.promise.line, pair.jesus.name, pair.jesus.line]);
    });
    li.appendChild(btn);
    matchedListEl.appendChild(li);
  });
}

function chooseCurrentPair() {
  const open = unmatchedPairs();
  if (!open.length) {
    currentPair = null;
    return;
  }
  currentPair = shuffle(open)[0];
}

function dealFresh(opts) {
  const announce = !opts || opts.announce !== false;
  dealGen += 1;
  locked = false;
  chooseCurrentPair();
  renderPrompt();
  renderMatched();

  if (!currentPair) {
    fieldEl.replaceChildren();
    slotButtons.length = 0;
    field.length = 0;
    cheerEl.textContent = "You found every promise bridge!";
    return;
  }

  if (!slotButtons.length) {
    for (let i = 0; i < FIELD_SIZE; i += 1) makeFieldCard(i);
  }
  const choices = pickChoices(currentPair);
  for (let i = 0; i < FIELD_SIZE; i += 1) {
    field[i] = choices[i];
    fillCard(i);
  }
  cheerEl.textContent = "Which picture keeps this promise?";
  spokenEl.textContent = currentPair.promise.line;
  if (announce) {
    speakLines([currentPair.promise.name, currentPair.promise.line, "Which picture keeps this promise?"]);
  }
}

function onPick(index) {
  if (locked || !currentPair) return;
  const card = field[index];
  if (!card) return;
  const btn = slotButtons[index];
  if (card.id !== currentPair.jesus.id) {
    btn.classList.remove("wrong");
    void btn.offsetWidth;
    btn.classList.add("wrong");
    playChime("soft");
    cheerEl.textContent = "Not this one.";
    spokenEl.textContent = "Try another picture.";
    speakLines(["Not this one.", "Try another picture."]);
    return;
  }

  locked = true;
  const gen = dealGen;
  const pair = currentPair;
  btn.classList.add("spotting");
  matchedIds().push(pair.id);
  saveState();
  const finished = isComplete();
  const rect = btn.getBoundingClientRect();
  burstAt(rect.left + rect.width / 2, rect.top + rect.height / 2, finished);
  renderMatched();

  spokenEl.textContent = pair.jesus.line;
  if (finished) {
    cheerEl.textContent = "New! You found every promise bridge!";
    celebrate();
    playFinishedBridge();
    window.setTimeout(() => {
      if (gen !== dealGen) return;
      dealFresh({ announce: false });
      locked = false;
    }, SPOT_MS);
    return;
  }

  cheerEl.textContent = `Yes! ${pair.promise.name} → ${pair.jesus.name}`;
  playChime("new");
  speakLines(["Yes!", pair.promise.name, pair.promise.line, pair.jesus.name, pair.jesus.line]);

  // Wait for the praise lines before announcing the next promise.
  window.setTimeout(() => {
    if (gen !== dealGen) return;
    dealFresh({ announce: true });
    locked = false;
  }, 4200);
}

function initChrome() {
  if (!window.Kids) return;
  const bar = document.getElementById("kids-topbar");
  if (bar) {
    bar.appendChild(window.Kids.homeButton("../"));
    const spacer = document.createElement("span");
    spacer.className = "kids-topbar-spacer";
    bar.appendChild(spacer);
    bar.appendChild(window.Kids.fullscreenButton());
    bar.appendChild(window.Kids.muteButton());
  }
  const text = howToEl.querySelector(".how-to-text");
  if (text) text.textContent = HOW_TO;
  howToEl.appendChild(window.Kids.hearButton(howTo, { ariaLabel: "Hear how to play" }));
  window.Kids.speakInstructionOnce(howTo());
}

function start() {
  state = loadState();
  initChrome();
  // How-to speaks first; show the promise on screen without overlapping speech.
  dealFresh({ announce: false });

  hearStoryBtn.addEventListener("click", () => {
    cheerEl.textContent = "Promise bridges";
    playSavedBridge();
  });

  resetBtn.addEventListener("click", () => {
    if (!matchedIds().length) return;
    if (!window.confirm("Start over and clear the promise bridges?")) return;
    state.matched = [];
    saveState();
    stopPlayback();
    spokenEl.textContent = "";
    dealFresh();
  });
}

start();
