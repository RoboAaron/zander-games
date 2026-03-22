const COLORS = [
  { id: "red", label: "Red", speak: "red", css: "#e53935" },
  { id: "blue", label: "Blue", speak: "blue", css: "#1e88e5" },
  { id: "yellow", label: "Yellow", speak: "yellow", css: "#fdd835", text: "#111" },
  { id: "green", label: "Green", speak: "green", css: "#43a047" },
  { id: "orange", label: "Orange", speak: "orange", css: "#fb8c00" },
  { id: "purple", label: "Purple", speak: "purple", css: "#8e24aa" },
];

const promptLabel = document.getElementById("prompt-label");
const targetSwatch = document.getElementById("target-swatch");
const targetName = document.getElementById("target-name");
const sayAgainBtn = document.getElementById("say-again");
const buttonsEl = document.getElementById("buttons");
const cheerEl = document.getElementById("cheer");

let target = null;
let locked = false;
let speechReady = false;

function pickTarget() {
  return COLORS[Math.floor(Math.random() * COLORS.length)];
}

function speak(text) {
  if (!window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.rate = 0.92;
  u.pitch = 1.05;
  window.speechSynthesis.speak(u);
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

buildButtons();
newRound();
