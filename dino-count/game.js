const MIN_COUNT = 1;
const MAX_COUNT = 20;
const DINO_EMOJIS = ["🦖", "🦕"];

const WORDS = [
  "",
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
  "ten",
  "eleven",
  "twelve",
  "thirteen",
  "fourteen",
  "fifteen",
  "sixteen",
  "seventeen",
  "eighteen",
  "nineteen",
  "twenty",
];

const STARS_KEY = "dino-count-stars-v1";
const HOW_TO_TEXT = "How many dinosaurs? Count them and tap the number.";

const stageEl = document.getElementById("dino-stage");
const questionEl = document.getElementById("question");
const hearHintBtn = document.getElementById("hear-hint");
const numpadEl = document.getElementById("numpad");
const cheerEl = document.getElementById("cheer");
const starsEl = document.getElementById("stars");

let count = 0;
let locked = false;
let speechReady = false;
let stars = 0;

function soundOn() {
  return !window.Kids || window.Kids.sound.enabled;
}

function randomInt(min, max) {
  return min + Math.floor(Math.random() * (max - min + 1));
}

function pickDinoEmoji() {
  return DINO_EMOJIS[randomInt(0, DINO_EMOJIS.length - 1)];
}

function speak(text) {
  if (!soundOn() || !text) return;
  if (window.Kids) {
    window.Kids.sound.speak(text, { rate: 0.9, pitch: 1.05 });
    return;
  }
  if (!window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.rate = 0.9;
  u.pitch = 1.05;
  window.setTimeout(() => window.speechSynthesis.speak(u), 70);
}

function renderStars() {
  if (!starsEl) return;
  starsEl.textContent = stars > 0 ? `⭐ ${stars} stars earned` : "";
}

function addStar() {
  stars += 1;
  if (window.Kids) window.Kids.store.set(STARS_KEY, stars);
  renderStars();
}

function renderDinos() {
  stageEl.replaceChildren();
  stageEl.classList.toggle("many", count > 10);
  for (let i = 0; i < count; i += 1) {
    const span = document.createElement("span");
    span.className = "dino";
    span.textContent = pickDinoEmoji();
    span.setAttribute("aria-hidden", "true");
    span.style.animationDelay = `${i * 0.025}s`;
    stageEl.appendChild(span);
  }
}

function announceQuestion() {
  questionEl.textContent = "How many?";
  if (speechReady) speak("How many dinosaurs do you see?");
}

function newRound() {
  locked = false;
  cheerEl.textContent = "";
  count = randomInt(MIN_COUNT, MAX_COUNT);
  renderDinos();
  announceQuestion();
  numpadEl.querySelectorAll(".num-btn").forEach((btn) => {
    btn.disabled = false;
  });
}

function onCorrect() {
  locked = true;
  addStar();
  const w = WORDS[count] || String(count);
  cheerEl.textContent = `Yes! ${count}!`;
  speak(`Yes! There are ${w}!`);
  numpadEl.querySelectorAll(".num-btn").forEach((btn) => {
    btn.disabled = true;
  });
  window.setTimeout(newRound, 2000);
}

function onWrong(btn) {
  btn.classList.add("wrong");
  window.setTimeout(() => btn.classList.remove("wrong"), 500);
  speak("Try again!");
}

function buildNumpad() {
  for (let n = MIN_COUNT; n <= MAX_COUNT; n += 1) {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "num-btn";
    btn.textContent = String(n);
    btn.dataset.n = String(n);
    btn.addEventListener("click", () => {
      if (locked) return;
      const picked = n;
      if (picked === count) onCorrect();
      else onWrong(btn);
    });
    numpadEl.appendChild(btn);
  }
}

hearHintBtn.addEventListener("click", () => {
  speechReady = true;
  speak("How many dinosaurs do you see?");
});

function initReadToMe() {
  if (!window.Kids) return;
  const bar = document.getElementById("kids-topbar");
  if (bar) {
    bar.appendChild(window.Kids.homeButton("../"));
    const spacer = document.createElement("span");
    spacer.className = "kids-topbar-spacer";
    bar.appendChild(spacer);
    bar.appendChild(window.Kids.muteButton());
  }
  const label = document.getElementById("how-to");
  if (label) label.appendChild(window.Kids.hearButton(HOW_TO_TEXT, { ariaLabel: "Hear how to play" }));
  window.Kids.speakInstructionOnce(HOW_TO_TEXT);
}

function restoreStars() {
  if (!window.Kids) return;
  const saved = window.Kids.store.get(STARS_KEY, 0);
  stars = typeof saved === "number" && saved >= 0 ? saved : 0;
  renderStars();
}

initReadToMe();
restoreStars();
buildNumpad();
newRound();
