const MIN_COUNT = 1;
const MAX_COUNT = 8;
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
];

const stageEl = document.getElementById("dino-stage");
const questionEl = document.getElementById("question");
const hearHintBtn = document.getElementById("hear-hint");
const numpadEl = document.getElementById("numpad");
const cheerEl = document.getElementById("cheer");

let count = 0;
let locked = false;
let speechReady = false;

function randomInt(min, max) {
  return min + Math.floor(Math.random() * (max - min + 1));
}

function pickDinoEmoji() {
  return DINO_EMOJIS[randomInt(0, DINO_EMOJIS.length - 1)];
}

function speak(text) {
  if (!window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.rate = 0.9;
  u.pitch = 1.05;
  window.speechSynthesis.speak(u);
}

function renderDinos() {
  stageEl.replaceChildren();
  for (let i = 0; i < count; i += 1) {
    const span = document.createElement("span");
    span.className = "dino";
    span.textContent = pickDinoEmoji();
    span.setAttribute("aria-hidden", "true");
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

buildNumpad();
newRound();
