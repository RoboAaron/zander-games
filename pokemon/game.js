const FIELD_SIZE = 3;
const CATCH_MS = 1000;
const SPRITE_PAD = 3;

const TCG_TYPES = {
  grass: { name: "Grass", bg: "#3d9b3d", text: "#fff" },
  fire: { name: "Fire", bg: "#e85d2a", text: "#fff" },
  water: { name: "Water", bg: "#3b7dd8", text: "#fff" },
  lightning: { name: "Lightning", bg: "#f3d23b", text: "#1a1a1a" },
  psychic: { name: "Psychic", bg: "#b56bc7", text: "#fff" },
  fighting: { name: "Fighting", bg: "#c45c3a", text: "#fff" },
  darkness: { name: "Darkness", bg: "#2f2f3a", text: "#fff" },
  metal: { name: "Metal", bg: "#9aa4b5", text: "#1a1a1a" },
  dragon: { name: "Dragon", bg: "#7b5ec8", text: "#fff" },
  colorless: { name: "Colorless", bg: "#c5c0b0", text: "#1a1a1a" },
};

const ROSTER = [
  { id: 1, name: "Bulbasaur", slug: "bulbasaur", tcg: "grass" },
  { id: 2, name: "Ivysaur", slug: "ivysaur", tcg: "grass" },
  { id: 3, name: "Venusaur", slug: "venusaur", tcg: "grass" },
  { id: 4, name: "Charmander", slug: "charmander", tcg: "fire" },
  { id: 5, name: "Charmeleon", slug: "charmeleon", tcg: "fire" },
  { id: 6, name: "Charizard", slug: "charizard", tcg: "fire" },
  { id: 7, name: "Squirtle", slug: "squirtle", tcg: "water" },
  { id: 8, name: "Wartortle", slug: "wartortle", tcg: "water" },
  { id: 9, name: "Blastoise", slug: "blastoise", tcg: "water" },
  { id: 12, name: "Butterfree", slug: "butterfree", tcg: "grass" },
  { id: 25, name: "Pikachu", slug: "pikachu", tcg: "lightning" },
  { id: 26, name: "Raichu", slug: "raichu", tcg: "lightning" },
  { id: 37, name: "Vulpix", slug: "vulpix", tcg: "fire" },
  { id: 39, name: "Jigglypuff", slug: "jigglypuff", tcg: "colorless" },
  { id: 52, name: "Meowth", slug: "meowth", tcg: "colorless" },
  { id: 54, name: "Psyduck", slug: "psyduck", tcg: "water" },
  { id: 58, name: "Growlithe", slug: "growlithe", tcg: "fire" },
  { id: 94, name: "Gengar", slug: "gengar", tcg: "psychic" },
  { id: 95, name: "Onix", slug: "onix", tcg: "fighting" },
  { id: 104, name: "Cubone", slug: "cubone", tcg: "fighting" },
  { id: 129, name: "Magikarp", slug: "magikarp", tcg: "water" },
  { id: 130, name: "Gyarados", slug: "gyarados", tcg: "water" },
  { id: 131, name: "Lapras", slug: "lapras", tcg: "water" },
  { id: 133, name: "Eevee", slug: "eevee", tcg: "colorless" },
  { id: 134, name: "Vaporeon", slug: "vaporeon", tcg: "water" },
  { id: 135, name: "Jolteon", slug: "jolteon", tcg: "lightning" },
  { id: 136, name: "Flareon", slug: "flareon", tcg: "fire" },
  { id: 143, name: "Snorlax", slug: "snorlax", tcg: "colorless" },
  { id: 144, name: "Articuno", slug: "articuno", tcg: "water" },
  { id: 145, name: "Zapdos", slug: "zapdos", tcg: "lightning" },
  { id: 146, name: "Moltres", slug: "moltres", tcg: "fire" },
  { id: 147, name: "Dratini", slug: "dratini", tcg: "dragon" },
  { id: 148, name: "Dragonair", slug: "dragonair", tcg: "dragon" },
  { id: 149, name: "Dragonite", slug: "dragonite", tcg: "dragon" },
  { id: 150, name: "Mewtwo", slug: "mewtwo", tcg: "psychic" },
  { id: 151, name: "Mew", slug: "mew", tcg: "psychic" },
  { id: 172, name: "Pichu", slug: "pichu", tcg: "lightning" },
  { id: 175, name: "Togepi", slug: "togepi", tcg: "psychic" },
  { id: 196, name: "Espeon", slug: "espeon", tcg: "psychic" },
  { id: 197, name: "Umbreon", slug: "umbreon", tcg: "darkness" },
  { id: 208, name: "Steelix", slug: "steelix", tcg: "metal" },
  { id: 230, name: "Kingdra", slug: "kingdra", tcg: "dragon" },
  { id: 252, name: "Treecko", slug: "treecko", tcg: "grass" },
  { id: 255, name: "Torchic", slug: "torchic", tcg: "fire" },
  { id: 258, name: "Mudkip", slug: "mudkip", tcg: "water" },
  { id: 329, name: "Vibrava", slug: "vibrava", tcg: "dragon" },
  { id: 330, name: "Flygon", slug: "flygon", tcg: "dragon" },
  { id: 334, name: "Altaria", slug: "altaria", tcg: "dragon" },
  { id: 359, name: "Absol", slug: "absol", tcg: "darkness" },
  { id: 371, name: "Bagon", slug: "bagon", tcg: "dragon" },
  { id: 372, name: "Shelgon", slug: "shelgon", tcg: "dragon" },
  { id: 373, name: "Salamence", slug: "salamence", tcg: "dragon" },
  { id: 380, name: "Latias", slug: "latias", tcg: "dragon" },
  { id: 381, name: "Latios", slug: "latios", tcg: "dragon" },
  { id: 384, name: "Rayquaza", slug: "rayquaza", tcg: "dragon" },
  { id: 393, name: "Piplup", slug: "piplup", tcg: "water" },
  { id: 443, name: "Gible", slug: "gible", tcg: "dragon" },
  { id: 444, name: "Gabite", slug: "gabite", tcg: "dragon" },
  { id: 445, name: "Garchomp", slug: "garchomp", tcg: "dragon" },
  { id: 448, name: "Lucario", slug: "lucario", tcg: "fighting" },
  { id: 483, name: "Dialga", slug: "dialga", tcg: "dragon" },
  { id: 484, name: "Palkia", slug: "palkia", tcg: "dragon" },
  { id: 487, name: "Giratina", slug: "giratina", tcg: "dragon" },
  { id: 610, name: "Axew", slug: "axew", tcg: "dragon" },
  { id: 611, name: "Fraxure", slug: "fraxure", tcg: "dragon" },
  { id: 612, name: "Haxorus", slug: "haxorus", tcg: "dragon" },
  { id: 621, name: "Druddigon", slug: "druddigon", tcg: "dragon" },
  { id: 633, name: "Deino", slug: "deino", tcg: "dragon" },
  { id: 634, name: "Zweilous", slug: "zweilous", tcg: "dragon" },
  { id: 635, name: "Hydreigon", slug: "hydreigon", tcg: "dragon" },
  { id: 643, name: "Reshiram", slug: "reshiram", tcg: "dragon" },
  { id: 644, name: "Zekrom", slug: "zekrom", tcg: "dragon" },
  { id: 646, name: "Kyurem", slug: "kyurem", tcg: "dragon" },
  { id: 658, name: "Greninja", slug: "greninja", tcg: "water" },
  { id: 700, name: "Sylveon", slug: "sylveon", tcg: "psychic" },
  { id: 704, name: "Goomy", slug: "goomy", tcg: "dragon" },
  { id: 705, name: "Sliggoo", slug: "sliggoo", tcg: "dragon" },
  { id: 706, name: "Goodra", slug: "goodra", tcg: "dragon" },
  { id: 714, name: "Noibat", slug: "noibat", tcg: "dragon" },
  { id: 715, name: "Noivern", slug: "noivern", tcg: "dragon" },
  { id: 718, name: "Zygarde", slug: "zygarde", tcg: "dragon" },
  { id: 776, name: "Turtonator", slug: "turtonator", tcg: "dragon" },
  { id: 778, name: "Mimikyu", slug: "mimikyu", tcg: "psychic" },
  { id: 780, name: "Drampa", slug: "drampa", tcg: "dragon" },
  { id: 782, name: "Jangmo-o", slug: "jangmoo", tcg: "dragon" },
  { id: 783, name: "Hakamo-o", slug: "hakamoo", tcg: "dragon" },
  { id: 784, name: "Kommo-o", slug: "kommoo", tcg: "dragon" },
  { id: 840, name: "Applin", slug: "applin", tcg: "dragon" },
  { id: 841, name: "Flapple", slug: "flapple", tcg: "dragon" },
  { id: 842, name: "Appletun", slug: "appletun", tcg: "dragon" },
  { id: 884, name: "Duraludon", slug: "duraludon", tcg: "dragon" },
  { id: 885, name: "Dreepy", slug: "dreepy", tcg: "dragon" },
  { id: 886, name: "Drakloak", slug: "drakloak", tcg: "dragon" },
  { id: 887, name: "Dragapult", slug: "dragapult", tcg: "dragon" },
  { id: 895, name: "Regidrago", slug: "regidrago", tcg: "dragon" },
  { id: 967, name: "Cyclizar", slug: "cyclizar", tcg: "dragon" },
  { id: 978, name: "Tatsugiri", slug: "tatsugiri", tcg: "dragon" },
  { id: 996, name: "Frigibax", slug: "frigibax", tcg: "dragon" },
  { id: 997, name: "Arctibax", slug: "arctibax", tcg: "dragon" },
  { id: 998, name: "Baxcalibur", slug: "baxcalibur", tcg: "dragon" },
  { id: 1007, name: "Koraidon", slug: "koraidon", tcg: "dragon" },
  { id: 1008, name: "Miraidon", slug: "miraidon", tcg: "dragon" },
];

const fieldEl = document.getElementById("field");
const cheerEl = document.getElementById("cheer");
const caughtListEl = document.getElementById("caught-list");
const cryPlayer = new Audio();

const field = [];
const caught = [];
const slotButtons = [];
let locked = false;

function randomInt(min, max) {
  return min + Math.floor(Math.random() * (max - min + 1));
}

function spriteUrl(id) {
  const padded = String(id).padStart(SPRITE_PAD, "0");
  return `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${padded}.png`;
}

function cryUrl(slug) {
  return `https://play.pokemonshowdown.com/audio/cries/${slug}.mp3`;
}

function typeSymbolUrl(tcg) {
  return `energy/${tcg}.png`;
}

function speak(text) {
  if (!window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.rate = 0.9;
  u.pitch = 1.05;
  window.speechSynthesis.speak(u);
}

function playOfficialCry(slug) {
  cryPlayer.pause();
  cryPlayer.src = cryUrl(slug);
  cryPlayer.play().catch(() => {});
}

function hearName(poke) {
  speak(poke.name);
  playOfficialCry(poke.slug);
}

function pickSpawn(excludeIds) {
  const pool = ROSTER.filter((p) => !excludeIds.includes(p.id));
  const source = pool.length ? pool : ROSTER;
  return source[randomInt(0, source.length - 1)];
}

function applyTypeStyle(el, tcg) {
  const type = TCG_TYPES[tcg];
  el.style.setProperty("--tile", type.bg);
  el.style.setProperty("--tile-text", type.text);
}

function fillTypeRow(el, poke) {
  const type = TCG_TYPES[poke.tcg];
  el.querySelector(".type-symbol").src = typeSymbolUrl(poke.tcg);
  el.querySelector(".type-symbol").alt = "";
  el.querySelector(".type-name").textContent = type.name;
}

function fillCard(btn, poke, index) {
  btn.dataset.index = String(index);
  btn.classList.remove("catching");
  btn.setAttribute("aria-label", `Catch ${poke.name}`);
  applyTypeStyle(btn, poke.tcg);
  btn.querySelector(".poke-sprite").src = spriteUrl(poke.id);
  btn.querySelector(".poke-sprite").alt = poke.name;
  btn.querySelector(".poke-name").textContent = poke.name;
  fillTypeRow(btn, poke);
}

function makeTypeRow() {
  const row = document.createElement("span");
  row.className = "type-row";
  const symbol = document.createElement("img");
  symbol.className = "type-symbol";
  symbol.alt = "";
  const name = document.createElement("span");
  name.className = "type-name";
  row.append(symbol, name);
  return row;
}

function makeFieldCard(index) {
  const btn = document.createElement("button");
  btn.type = "button";
  btn.className = "poke-card";

  const img = document.createElement("img");
  img.className = "poke-sprite";
  img.alt = "";
  const name = document.createElement("span");
  name.className = "poke-name";
  const ball = document.createElement("span");
  ball.className = "ball";
  ball.setAttribute("aria-hidden", "true");

  btn.append(img, name, makeTypeRow(), ball);
  btn.addEventListener("click", () => onCatch(Number(btn.dataset.index)));
  fillCard(btn, field[index], index);
  return btn;
}

function renderCaught() {
  caughtListEl.replaceChildren();
  if (!caught.length) {
    const empty = document.createElement("p");
    empty.className = "caught-empty";
    empty.textContent = "No Pokémon yet";
    caughtListEl.appendChild(empty);
    return;
  }

  caught.forEach((poke) => {
    const li = document.createElement("li");
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "caught-card";
    btn.setAttribute("aria-label", `Hear ${poke.name}`);
    applyTypeStyle(btn, poke.tcg);

    const img = document.createElement("img");
    img.className = "poke-sprite";
    img.src = spriteUrl(poke.id);
    img.alt = "";
    const name = document.createElement("span");
    name.className = "caught-name";
    name.textContent = poke.name;
    const hear = document.createElement("span");
    hear.className = "hear-name";
    hear.textContent = "Hear name";

    btn.append(img, name, makeTypeRow(), hear);
    fillTypeRow(btn, poke);
    btn.addEventListener("click", () => hearName(poke));
    li.appendChild(btn);
    caughtListEl.appendChild(li);
  });
}

function addToCaught(poke) {
  if (caught.some((p) => p.id === poke.id)) return;
  caught.push(poke);
  renderCaught();
}

function onCatch(index) {
  if (locked) return;
  const poke = field[index];
  if (!poke) return;

  locked = true;
  const btn = slotButtons[index];
  btn.classList.add("catching");
  cheerEl.textContent = `You caught ${poke.name}!`;
  hearName(poke);
  addToCaught(poke);

  window.setTimeout(() => {
    field[index] = pickSpawn(field.map((p) => p.id));
    fillCard(btn, field[index], index);
    locked = false;
  }, CATCH_MS);
}

function start() {
  const exclude = [];
  for (let i = 0; i < FIELD_SIZE; i += 1) {
    const poke = pickSpawn(exclude);
    exclude.push(poke.id);
    field.push(poke);
    const btn = makeFieldCard(i);
    slotButtons.push(btn);
    fieldEl.appendChild(btn);
  }
  renderCaught();
}

start();
