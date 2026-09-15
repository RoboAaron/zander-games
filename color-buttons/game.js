const COLORS = [
  { id: "red", label: "Red", speak: "red", css: "#e53935" },
  { id: "blue", label: "Blue", speak: "blue", css: "#1e88e5" },
  { id: "yellow", label: "Yellow", speak: "yellow", css: "#fdd835", text: "#111" },
  { id: "green", label: "Green", speak: "green", css: "#43a047" },
  { id: "orange", label: "Orange", speak: "orange", css: "#fb8c00" },
  { id: "purple", label: "Purple", speak: "purple", css: "#8e24aa" },
];

const STARS_KEY = "color-buttons-stars-v1";
const HOW_TO_TEXT = "Tap the button that matches the big square.";

const promptLabel = document.getElementById("prompt-label");
const targetSwatch = document.getElementById("target-swatch");
const targetName = document.getElementById("target-name");
const sayAgainBtn = document.getElementById("say-again");
const buttonsEl = document.getElementById("buttons");
const cheerEl = document.getElementById("cheer");
const starsEl = document.getElementById("stars");

let target = null;
let locked = false;
let speechReady = false;
let stars = 0;

function soundOn() {
  return !window.Kids || window.Kids.sound.enabled;
}

function pickTarget() {
  return COLORS[Math.floor(Math.random() * COLORS.length)];
}

function speak(text) {
  if (!soundOn() || !text) return;
  if (window.Kids) {
    window.Kids.sound.speak(text, { rate: 0.92, pitch: 1.05 });
    return;
  }
  if (!window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.rate = 0.92;
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

function announceRound() {
  if (!target) return;
  targetSwatch.style.backgroundColor = target.css;
  targetName.textContent = target.label;
  targetName.style.color = target.css;
  targetSwatch.classList.remove("pop");
  void targetSwatch.offsetWidth;
  targetSwatch.classList.add("pop");
  if (speechReady) speak(`Tap the ${target.speak} button!`);
}

function newRound() {
  locked = false;
  cheerEl.textContent = "";
  target = pickTarget();
  announceRound();
  buttonsEl.querySelectorAll(".color-btn").forEach((btn) => {
    btn.disabled = false;
  });
}

function onCorrect() {
  locked = true;
  addStar();
  cheerEl.textContent = "You did it!";
  speak("Nice job!");
  buttonsEl.querySelectorAll(".color-btn").forEach((btn) => {
    btn.disabled = true;
  });
  window.setTimeout(newRound, 1600);
}

function onWrong(btn) {
  btn.classList.add("wrong");
  window.setTimeout(() => btn.classList.remove("wrong"), 500);
  speak("Try again!");
}

function buildButtons() {
  COLORS.forEach((c) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "color-btn";
    btn.dataset.color = c.id;
    btn.style.backgroundColor = c.css;
    if (c.text) {
      btn.style.color = c.text;
      btn.style.textShadow = "none";
    }
    btn.textContent = c.label;
    btn.addEventListener("click", () => {
      if (locked) return;
      if (c.id === target.id) onCorrect();
      else onWrong(btn);
    });
    buttonsEl.appendChild(btn);
  });
}

sayAgainBtn.addEventListener("click", () => {
  speechReady = true;
  if (target) speak(`Tap the ${target.speak} button!`);
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
  if (promptLabel) promptLabel.appendChild(window.Kids.hearButton(HOW_TO_TEXT, { ariaLabel: "Hear how to play" }));
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
buildButtons();
newRound();
