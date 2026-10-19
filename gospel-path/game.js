const FIELD_SIZE = 3;
const SPOT_MS = 1100;
const STORE_KEY = "gospel-path-v1";
const BURST_COLORS = ["#ffd166", "#ff8fab", "#8ecae6", "#c8f76b", "#ffffff", "#f6a04d"];
const HOW_TO = "Tap the next picture in the gospel story.";

// Spoken lines are the preschool gospel lines from Story spotter. Do not paraphrase them.
const STEPS = [
  { id: "god-made-world", name: "God made the world", line: "God made the heavens and the earth." },
  { id: "people-turned-away", name: "People turned away", line: "All people have turned away from God. The first people hid from him." },
  { id: "promised-rescuer", name: "God promised a Rescuer", line: "God promised a Savior who would beat the enemy." },
  { id: "jesus-born", name: "Jesus was born", line: "Jesus came to earth and was born, just as God promised." },
  { id: "jesus-gods-son", name: "Jesus is God\u2019s Son", line: "Jesus is God\u2019s Son forever. At his baptism the Father said so out loud." },
  { id: "jesus-died", name: "Jesus died for us", line: "Jesus died on the cross to take our sin, while we were still sinners." },
  { id: "jesus-rose", name: "Jesus rose", line: "Jesus rose. He is alive, and he beat death." },
  { id: "trust-jesus", name: "Trust Jesus", line: "God saves everyone who trusts Jesus. We cannot earn it." },
];

const cheerEl = document.getElementById("cheer");
const spokenEl = document.getElementById("spoken");
const pathEl = document.getElementById("path");
const fieldEl = document.getElementById("field");
const progressEl = document.getElementById("progress");
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

function artUrl(id) {
  return `../stories/art/${id}.svg`;
}

function soundOn() {
  return !window.Kids || window.Kids.sound.enabled;
}

function nextIndex() {
  return state.done;
}

function isComplete() {
  return state.done >= STEPS.length;
}

function nextCard() {
  return STEPS[nextIndex()] || null;
}

function howTo() {
  return HOW_TO;
}

function loadState() {
  const fresh = { done: 0 };
  const raw = window.Kids ? window.Kids.store.get(STORE_KEY, null) : null;
  if (!raw || typeof raw !== "object") return fresh;
  const done = Number(raw.done);
  if (Number.isFinite(done) && done >= 0 && done <= STEPS.length) fresh.done = done;
  return fresh;
}

function saveState() {
  if (window.Kids) window.Kids.store.set(STORE_KEY, state);
}

function stopPlayback() {
  playToken += 1;
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
    if (index >= steps.length) return;
    const step = steps[index];
    index += 1;
    if (step.show) spokenEl.textContent = step.show;
    speakThen(step.say, run, token);
  }
  window.setTimeout(run, 90);
}

function playFinishedStory() {
  const steps = [{ say: "New! You found the whole gospel story!", show: "You found the whole gospel story!" }];
  STEPS.forEach((card) => {
    steps.push({ say: `${card.name}. ${card.line}`, show: card.line });
  });
  runSteps(steps);
}

function playSavedStory() {
  const steps = STEPS.map((card) => ({ say: `${card.name}. ${card.line}`, show: card.line }));
  runSteps(steps);
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

function randomItem(list) {
  return list[Math.floor(Math.random() * list.length)];
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

function pickChoices() {
  const next = nextCard();
  if (!next) return [];
  const others = STEPS.filter((card) => card.id !== next.id);
  const distractors = shuffle(others).slice(0, FIELD_SIZE - 1);
  return shuffle([next].concat(distractors));
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

function renderPath() {
  pathEl.replaceChildren();
  STEPS.forEach((card, index) => {
    const li = document.createElement("li");
    li.className = "path-step";
    if (index < state.done) li.classList.add("is-done");
    if (index === state.done) li.classList.add("is-next");
    const img = document.createElement("img");
    img.src = artUrl(card.id);
    img.alt = "";
    img.draggable = false;
    const label = document.createElement("span");
    label.textContent = index < state.done ? card.name : String(index + 1);
    li.append(img, label);
    pathEl.appendChild(li);
  });
}

function renderProgress() {
  if (isComplete()) {
    progressEl.textContent = `Done! ${STEPS.length} of ${STEPS.length}`;
    hearStoryBtn.hidden = false;
    cheerEl.textContent = "You found the whole gospel story!";
  } else {
    progressEl.textContent = `Step ${state.done + 1} of ${STEPS.length}`;
    hearStoryBtn.hidden = true;
    const next = nextCard();
    cheerEl.textContent = next ? `What comes next?` : "The gospel story";
  }
}

function dealFresh() {
  dealGen += 1;
  locked = false;
  if (isComplete()) {
    fieldEl.replaceChildren();
    slotButtons.length = 0;
    field.length = 0;
    const done = document.createElement("p");
    done.className = "spoken";
    done.textContent = "Tap Hear the story, or Start over.";
    fieldEl.appendChild(done);
    return;
  }
  if (!slotButtons.length) {
    for (let i = 0; i < FIELD_SIZE; i += 1) makeFieldCard(i);
  }
  const choices = pickChoices();
  for (let i = 0; i < FIELD_SIZE; i += 1) {
    field[i] = choices[i];
    fillCard(i);
  }
}

function onPick(index) {
  if (locked || isComplete()) return;
  const card = field[index];
  const next = nextCard();
  if (!card || !next) return;
  const btn = slotButtons[index];
  if (card.id !== next.id) {
    btn.classList.remove("wrong");
    void btn.offsetWidth;
    btn.classList.add("wrong");
    playChime("soft");
    cheerEl.textContent = "Not yet.";
    spokenEl.textContent = "Try another picture.";
    speakLines(["Not yet.", "Try another picture."]);
    return;
  }

  locked = true;
  const gen = dealGen;
  btn.classList.add("spotting");
  state.done += 1;
  saveState();
  const finished = isComplete();
  const rect = btn.getBoundingClientRect();
  burstAt(rect.left + rect.width / 2, rect.top + rect.height / 2, finished);

  renderPath();
  renderProgress();
  spokenEl.textContent = card.line;

  if (finished) {
    celebrate();
    playFinishedStory();
  } else {
    playChime("new");
    speakLines(["Yes!", card.name, card.line]);
    cheerEl.textContent = `Yes! ${card.name}`;
  }

  window.setTimeout(() => {
    if (gen !== dealGen) return;
    dealFresh();
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
  renderPath();
  renderProgress();
  dealFresh();

  hearStoryBtn.addEventListener("click", () => {
    cheerEl.textContent = "The gospel story";
    playSavedStory();
  });

  resetBtn.addEventListener("click", () => {
    if (!state.done) return;
    if (!window.confirm("Start over and clear the gospel path?")) return;
    state.done = 0;
    saveState();
    stopPlayback();
    spokenEl.textContent = "";
    renderPath();
    renderProgress();
    dealFresh();
  });
}

start();
