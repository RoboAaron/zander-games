const FIELD_SIZE = 3;
const CATCH_MS = 1000;
const SPRITE_PAD = 3;

const TYPES = {
  grass: { name: "Grass", bg: "#3d9b3d", text: "#fff", symbol: "grass" },
  fire: { name: "Fire", bg: "#e85d2a", text: "#fff", symbol: "fire" },
  water: { name: "Water", bg: "#3b7dd8", text: "#fff", symbol: "water" },
  electric: { name: "Electric", bg: "#f3d23b", text: "#1a1a1a", symbol: "lightning" },
  ice: { name: "Ice", bg: "#7ec8d4", text: "#1a1a1a", symbol: "water" },
  fighting: { name: "Fighting", bg: "#c45c3a", text: "#fff", symbol: "fighting" },
  ground: { name: "Ground", bg: "#d4a657", text: "#1a1a1a", symbol: "fighting" },
  rock: { name: "Rock", bg: "#b89b3e", text: "#1a1a1a", symbol: "fighting" },
  bug: { name: "Bug", bg: "#9aaa28", text: "#1a1a1a", symbol: "grass" },
  ghost: { name: "Ghost", bg: "#6b4e96", text: "#fff", symbol: "psychic" },
  psychic: { name: "Psychic", bg: "#b56bc7", text: "#fff", symbol: "psychic" },
  dark: { name: "Dark", bg: "#2f2f3a", text: "#fff", symbol: "darkness" },
  steel: { name: "Steel", bg: "#9aa4b5", text: "#1a1a1a", symbol: "metal" },
  dragon: { name: "Dragon", bg: "#7b5ec8", text: "#fff", symbol: "dragon" },
  fairy: { name: "Fairy", bg: "#e889b0", text: "#1a1a1a", symbol: "fairy" },
  normal: { name: "Normal", bg: "#c5c0b0", text: "#1a1a1a", symbol: "colorless" },
};

const ROSTER = [
  { id: 1, name: "Bulbasaur", slug: "bulbasaur", type: "grass" },
  { id: 2, name: "Ivysaur", slug: "ivysaur", type: "grass" },
  { id: 3, name: "Venusaur", slug: "venusaur", type: "grass" },
  { id: 4, name: "Charmander", slug: "charmander", type: "fire" },
  { id: 5, name: "Charmeleon", slug: "charmeleon", type: "fire" },
  { id: 6, name: "Charizard", slug: "charizard", type: "fire" },
  { id: 7, name: "Squirtle", slug: "squirtle", type: "water" },
  { id: 8, name: "Wartortle", slug: "wartortle", type: "water" },
  { id: 9, name: "Blastoise", slug: "blastoise", type: "water" },
  { id: 12, name: "Butterfree", slug: "butterfree", type: "bug" },
  { id: 25, name: "Pikachu", slug: "pikachu", type: "electric" },
  { id: 26, name: "Raichu", slug: "raichu", type: "electric" },
  { id: 37, name: "Vulpix", slug: "vulpix", type: "fire" },
  { id: 39, name: "Jigglypuff", slug: "jigglypuff", type: "normal" },
  { id: 52, name: "Meowth", slug: "meowth", type: "normal" },
  { id: 54, name: "Psyduck", slug: "psyduck", type: "water" },
  { id: 58, name: "Growlithe", slug: "growlithe", type: "fire" },
  { id: 94, name: "Gengar", slug: "gengar", type: "ghost" },
  { id: 95, name: "Onix", slug: "onix", type: "rock" },
  { id: 104, name: "Cubone", slug: "cubone", type: "ground" },
  { id: 129, name: "Magikarp", slug: "magikarp", type: "water" },
  { id: 130, name: "Gyarados", slug: "gyarados", type: "water" },
  { id: 131, name: "Lapras", slug: "lapras", type: "water" },
  { id: 133, name: "Eevee", slug: "eevee", type: "normal" },
  { id: 134, name: "Vaporeon", slug: "vaporeon", type: "water" },
  { id: 135, name: "Jolteon", slug: "jolteon", type: "electric" },
  { id: 136, name: "Flareon", slug: "flareon", type: "fire" },
  { id: 143, name: "Snorlax", slug: "snorlax", type: "normal" },
  { id: 144, name: "Articuno", slug: "articuno", type: "ice" },
  { id: 145, name: "Zapdos", slug: "zapdos", type: "electric" },
  { id: 146, name: "Moltres", slug: "moltres", type: "fire" },
  { id: 147, name: "Dratini", slug: "dratini", type: "dragon" },
  { id: 148, name: "Dragonair", slug: "dragonair", type: "dragon" },
  { id: 149, name: "Dragonite", slug: "dragonite", type: "dragon" },
  { id: 150, name: "Mewtwo", slug: "mewtwo", type: "psychic" },
  { id: 151, name: "Mew", slug: "mew", type: "psychic" },
  { id: 172, name: "Pichu", slug: "pichu", type: "electric" },
  { id: 175, name: "Togepi", slug: "togepi", type: "fairy" },
  { id: 196, name: "Espeon", slug: "espeon", type: "psychic" },
  { id: 197, name: "Umbreon", slug: "umbreon", type: "dark" },
  { id: 208, name: "Steelix", slug: "steelix", type: "steel" },
  { id: 230, name: "Kingdra", slug: "kingdra", type: "dragon" },
  { id: 252, name: "Treecko", slug: "treecko", type: "grass" },
  { id: 255, name: "Torchic", slug: "torchic", type: "fire" },
  { id: 258, name: "Mudkip", slug: "mudkip", type: "water" },
  { id: 329, name: "Vibrava", slug: "vibrava", type: "dragon" },
  { id: 330, name: "Flygon", slug: "flygon", type: "dragon" },
  { id: 334, name: "Altaria", slug: "altaria", type: "dragon" },
  { id: 359, name: "Absol", slug: "absol", type: "dark" },
  { id: 371, name: "Bagon", slug: "bagon", type: "dragon" },
  { id: 372, name: "Shelgon", slug: "shelgon", type: "dragon" },
  { id: 373, name: "Salamence", slug: "salamence", type: "dragon" },
  { id: 380, name: "Latias", slug: "latias", type: "dragon" },
  { id: 381, name: "Latios", slug: "latios", type: "dragon" },
  { id: 384, name: "Rayquaza", slug: "rayquaza", type: "dragon" },
  { id: 393, name: "Piplup", slug: "piplup", type: "water" },
  { id: 443, name: "Gible", slug: "gible", type: "dragon" },
  { id: 444, name: "Gabite", slug: "gabite", type: "dragon" },
  { id: 445, name: "Garchomp", slug: "garchomp", type: "dragon" },
  { id: 448, name: "Lucario", slug: "lucario", type: "fighting" },
  { id: 483, name: "Dialga", slug: "dialga", type: "dragon" },
  { id: 484, name: "Palkia", slug: "palkia", type: "dragon" },
  { id: 487, name: "Giratina", slug: "giratina", type: "dragon" },
  { id: 610, name: "Axew", slug: "axew", type: "dragon" },
  { id: 611, name: "Fraxure", slug: "fraxure", type: "dragon" },
  { id: 612, name: "Haxorus", slug: "haxorus", type: "dragon" },
  { id: 621, name: "Druddigon", slug: "druddigon", type: "dragon" },
  { id: 633, name: "Deino", slug: "deino", type: "dragon" },
  { id: 634, name: "Zweilous", slug: "zweilous", type: "dragon" },
  { id: 635, name: "Hydreigon", slug: "hydreigon", type: "dragon" },
  { id: 643, name: "Reshiram", slug: "reshiram", type: "dragon" },
  { id: 644, name: "Zekrom", slug: "zekrom", type: "dragon" },
  { id: 646, name: "Kyurem", slug: "kyurem", type: "dragon" },
  { id: 658, name: "Greninja", slug: "greninja", type: "water" },
  { id: 700, name: "Sylveon", slug: "sylveon", type: "fairy" },
  { id: 704, name: "Goomy", slug: "goomy", type: "dragon" },
  { id: 705, name: "Sliggoo", slug: "sliggoo", type: "dragon" },
  { id: 706, name: "Goodra", slug: "goodra", type: "dragon" },
  { id: 714, name: "Noibat", slug: "noibat", type: "dragon" },
  { id: 715, name: "Noivern", slug: "noivern", type: "dragon" },
  { id: 718, name: "Zygarde", slug: "zygarde", type: "dragon" },
  { id: 776, name: "Turtonator", slug: "turtonator", type: "dragon" },
  { id: 778, name: "Mimikyu", slug: "mimikyu", type: "ghost" },
  { id: 780, name: "Drampa", slug: "drampa", type: "dragon" },
  { id: 782, name: "Jangmo-o", slug: "jangmoo", type: "dragon" },
  { id: 783, name: "Hakamo-o", slug: "hakamoo", type: "dragon" },
  { id: 784, name: "Kommo-o", slug: "kommoo", type: "dragon" },
  { id: 840, name: "Applin", slug: "applin", type: "dragon" },
  { id: 841, name: "Flapple", slug: "flapple", type: "dragon" },
  { id: 842, name: "Appletun", slug: "appletun", type: "dragon" },
  { id: 884, name: "Duraludon", slug: "duraludon", type: "dragon" },
  { id: 885, name: "Dreepy", slug: "dreepy", type: "dragon" },
  { id: 886, name: "Drakloak", slug: "drakloak", type: "dragon" },
  { id: 887, name: "Dragapult", slug: "dragapult", type: "dragon" },
  { id: 895, name: "Regidrago", slug: "regidrago", type: "dragon" },
  { id: 967, name: "Cyclizar", slug: "cyclizar", type: "dragon" },
  { id: 978, name: "Tatsugiri", slug: "tatsugiri", type: "dragon" },
  { id: 996, name: "Frigibax", slug: "frigibax", type: "dragon" },
  { id: 997, name: "Arctibax", slug: "arctibax", type: "dragon" },
  { id: 998, name: "Baxcalibur", slug: "baxcalibur", type: "dragon" },
  { id: 1007, name: "Koraidon", slug: "koraidon", type: "dragon" },
  { id: 1008, name: "Miraidon", slug: "miraidon", type: "dragon" },
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

function typeSymbolUrl(typeId) {
  return `energy/${TYPES[typeId].symbol}.png`;
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

function applyTypeStyle(el, typeId) {
  const type = TYPES[typeId];
  el.style.setProperty("--tile", type.bg);
  el.style.setProperty("--tile-text", type.text);
}

function fillTypeRow(el, poke) {
  const type = TYPES[poke.type];
  el.querySelector(".type-symbol").src = typeSymbolUrl(poke.type);
  el.querySelector(".type-symbol").alt = "";
  el.querySelector(".type-name").textContent = type.name;
}

function fillCard(btn, poke, index) {
  btn.dataset.index = String(index);
  btn.classList.remove("catching");
  btn.setAttribute("aria-label", `Catch ${poke.name}`);
  applyTypeStyle(btn, poke.type);
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
    applyTypeStyle(btn, poke.type);

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
