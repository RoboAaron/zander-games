const FIELD_SIZE = 3;
const CATCH_MS = 1000;
const SPRITE_PAD = 3;
const CAUGHT_KEY = "pokemon-caught-v1";
const HOW_TO_TEXT = "Tap a Pokémon to catch it. Tap a name in your list to hear it.";

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
  poison: { name: "Poison", bg: "#9b4d9b", text: "#fff", symbol: "grass" },
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
  { id: 10, name: "Caterpie", slug: "caterpie", type: "bug" },
  { id: 11, name: "Metapod", slug: "metapod", type: "bug" },
  { id: 12, name: "Butterfree", slug: "butterfree", type: "bug" },
  { id: 13, name: "Weedle", slug: "weedle", type: "bug" },
  { id: 14, name: "Kakuna", slug: "kakuna", type: "bug" },
  { id: 15, name: "Beedrill", slug: "beedrill", type: "bug" },
  { id: 16, name: "Pidgey", slug: "pidgey", type: "normal" },
  { id: 17, name: "Pidgeotto", slug: "pidgeotto", type: "normal" },
  { id: 18, name: "Pidgeot", slug: "pidgeot", type: "normal" },
  { id: 19, name: "Rattata", slug: "rattata", type: "normal" },
  { id: 20, name: "Raticate", slug: "raticate", type: "normal" },
  { id: 21, name: "Spearow", slug: "spearow", type: "normal" },
  { id: 22, name: "Fearow", slug: "fearow", type: "normal" },
  { id: 23, name: "Ekans", slug: "ekans", type: "poison" },
  { id: 24, name: "Arbok", slug: "arbok", type: "poison" },
  { id: 25, name: "Pikachu", slug: "pikachu", type: "electric" },
  { id: 26, name: "Raichu", slug: "raichu", type: "electric" },
  { id: 27, name: "Sandshrew", slug: "sandshrew", type: "ground" },
  { id: 28, name: "Sandslash", slug: "sandslash", type: "ground" },
  { id: 29, name: "Nidoran♀", slug: "nidoranf", type: "poison" },
  { id: 30, name: "Nidorina", slug: "nidorina", type: "poison" },
  { id: 31, name: "Nidoqueen", slug: "nidoqueen", type: "poison" },
  { id: 32, name: "Nidoran♂", slug: "nidoranm", type: "poison" },
  { id: 33, name: "Nidorino", slug: "nidorino", type: "poison" },
  { id: 34, name: "Nidoking", slug: "nidoking", type: "poison" },
  { id: 35, name: "Clefairy", slug: "clefairy", type: "fairy" },
  { id: 36, name: "Clefable", slug: "clefable", type: "fairy" },
  { id: 37, name: "Vulpix", slug: "vulpix", type: "fire" },
  { id: 38, name: "Ninetales", slug: "ninetales", type: "fire" },
  { id: 39, name: "Jigglypuff", slug: "jigglypuff", type: "normal" },
  { id: 40, name: "Wigglytuff", slug: "wigglytuff", type: "normal" },
  { id: 41, name: "Zubat", slug: "zubat", type: "poison" },
  { id: 42, name: "Golbat", slug: "golbat", type: "poison" },
  { id: 43, name: "Oddish", slug: "oddish", type: "grass" },
  { id: 44, name: "Gloom", slug: "gloom", type: "grass" },
  { id: 45, name: "Vileplume", slug: "vileplume", type: "grass" },
  { id: 46, name: "Paras", slug: "paras", type: "bug" },
  { id: 47, name: "Parasect", slug: "parasect", type: "bug" },
  { id: 48, name: "Venonat", slug: "venonat", type: "bug" },
  { id: 49, name: "Venomoth", slug: "venomoth", type: "bug" },
  { id: 50, name: "Diglett", slug: "diglett", type: "ground" },
  { id: 51, name: "Dugtrio", slug: "dugtrio", type: "ground" },
  { id: 52, name: "Meowth", slug: "meowth", type: "normal" },
  { id: 53, name: "Persian", slug: "persian", type: "normal" },
  { id: 54, name: "Psyduck", slug: "psyduck", type: "water" },
  { id: 55, name: "Golduck", slug: "golduck", type: "water" },
  { id: 56, name: "Mankey", slug: "mankey", type: "fighting" },
  { id: 57, name: "Primeape", slug: "primeape", type: "fighting" },
  { id: 58, name: "Growlithe", slug: "growlithe", type: "fire" },
  { id: 59, name: "Arcanine", slug: "arcanine", type: "fire" },
  { id: 60, name: "Poliwag", slug: "poliwag", type: "water" },
  { id: 61, name: "Poliwhirl", slug: "poliwhirl", type: "water" },
  { id: 62, name: "Poliwrath", slug: "poliwrath", type: "water" },
  { id: 63, name: "Abra", slug: "abra", type: "psychic" },
  { id: 64, name: "Kadabra", slug: "kadabra", type: "psychic" },
  { id: 65, name: "Alakazam", slug: "alakazam", type: "psychic" },
  { id: 66, name: "Machop", slug: "machop", type: "fighting" },
  { id: 67, name: "Machoke", slug: "machoke", type: "fighting" },
  { id: 68, name: "Machamp", slug: "machamp", type: "fighting" },
  { id: 69, name: "Bellsprout", slug: "bellsprout", type: "grass" },
  { id: 70, name: "Weepinbell", slug: "weepinbell", type: "grass" },
  { id: 71, name: "Victreebel", slug: "victreebel", type: "grass" },
  { id: 72, name: "Tentacool", slug: "tentacool", type: "water" },
  { id: 73, name: "Tentacruel", slug: "tentacruel", type: "water" },
  { id: 74, name: "Geodude", slug: "geodude", type: "rock" },
  { id: 75, name: "Graveler", slug: "graveler", type: "rock" },
  { id: 76, name: "Golem", slug: "golem", type: "rock" },
  { id: 77, name: "Ponyta", slug: "ponyta", type: "fire" },
  { id: 78, name: "Rapidash", slug: "rapidash", type: "fire" },
  { id: 79, name: "Slowpoke", slug: "slowpoke", type: "water" },
  { id: 80, name: "Slowbro", slug: "slowbro", type: "water" },
  { id: 81, name: "Magnemite", slug: "magnemite", type: "electric" },
  { id: 82, name: "Magneton", slug: "magneton", type: "electric" },
  { id: 83, name: "Farfetch’d", slug: "farfetchd", type: "normal" },
  { id: 84, name: "Doduo", slug: "doduo", type: "normal" },
  { id: 85, name: "Dodrio", slug: "dodrio", type: "normal" },
  { id: 86, name: "Seel", slug: "seel", type: "water" },
  { id: 87, name: "Dewgong", slug: "dewgong", type: "water" },
  { id: 88, name: "Grimer", slug: "grimer", type: "poison" },
  { id: 89, name: "Muk", slug: "muk", type: "poison" },
  { id: 90, name: "Shellder", slug: "shellder", type: "water" },
  { id: 91, name: "Cloyster", slug: "cloyster", type: "water" },
  { id: 92, name: "Gastly", slug: "gastly", type: "ghost" },
  { id: 93, name: "Haunter", slug: "haunter", type: "ghost" },
  { id: 94, name: "Gengar", slug: "gengar", type: "ghost" },
  { id: 95, name: "Onix", slug: "onix", type: "rock" },
  { id: 96, name: "Drowzee", slug: "drowzee", type: "psychic" },
  { id: 97, name: "Hypno", slug: "hypno", type: "psychic" },
  { id: 98, name: "Krabby", slug: "krabby", type: "water" },
  { id: 99, name: "Kingler", slug: "kingler", type: "water" },
  { id: 100, name: "Voltorb", slug: "voltorb", type: "electric" },
  { id: 101, name: "Electrode", slug: "electrode", type: "electric" },
  { id: 102, name: "Exeggcute", slug: "exeggcute", type: "grass" },
  { id: 103, name: "Exeggutor", slug: "exeggutor", type: "grass" },
  { id: 104, name: "Cubone", slug: "cubone", type: "ground" },
  { id: 105, name: "Marowak", slug: "marowak", type: "ground" },
  { id: 106, name: "Hitmonlee", slug: "hitmonlee", type: "fighting" },
  { id: 107, name: "Hitmonchan", slug: "hitmonchan", type: "fighting" },
  { id: 108, name: "Lickitung", slug: "lickitung", type: "normal" },
  { id: 109, name: "Koffing", slug: "koffing", type: "poison" },
  { id: 110, name: "Weezing", slug: "weezing", type: "poison" },
  { id: 111, name: "Rhyhorn", slug: "rhyhorn", type: "ground" },
  { id: 112, name: "Rhydon", slug: "rhydon", type: "ground" },
  { id: 113, name: "Chansey", slug: "chansey", type: "normal" },
  { id: 114, name: "Tangela", slug: "tangela", type: "grass" },
  { id: 115, name: "Kangaskhan", slug: "kangaskhan", type: "normal" },
  { id: 116, name: "Horsea", slug: "horsea", type: "water" },
  { id: 117, name: "Seadra", slug: "seadra", type: "water" },
  { id: 118, name: "Goldeen", slug: "goldeen", type: "water" },
  { id: 119, name: "Seaking", slug: "seaking", type: "water" },
  { id: 120, name: "Staryu", slug: "staryu", type: "water" },
  { id: 121, name: "Starmie", slug: "starmie", type: "water" },
  { id: 122, name: "Mr. Mime", slug: "mrmime", type: "psychic" },
  { id: 123, name: "Scyther", slug: "scyther", type: "bug" },
  { id: 124, name: "Jynx", slug: "jynx", type: "ice" },
  { id: 125, name: "Electabuzz", slug: "electabuzz", type: "electric" },
  { id: 126, name: "Magmar", slug: "magmar", type: "fire" },
  { id: 127, name: "Pinsir", slug: "pinsir", type: "bug" },
  { id: 128, name: "Tauros", slug: "tauros", type: "normal" },
  { id: 129, name: "Magikarp", slug: "magikarp", type: "water" },
  { id: 130, name: "Gyarados", slug: "gyarados", type: "water" },
  { id: 131, name: "Lapras", slug: "lapras", type: "water" },
  { id: 132, name: "Ditto", slug: "ditto", type: "normal" },
  { id: 133, name: "Eevee", slug: "eevee", type: "normal" },
  { id: 134, name: "Vaporeon", slug: "vaporeon", type: "water" },
  { id: 135, name: "Jolteon", slug: "jolteon", type: "electric" },
  { id: 136, name: "Flareon", slug: "flareon", type: "fire" },
  { id: 137, name: "Porygon", slug: "porygon", type: "normal" },
  { id: 138, name: "Omanyte", slug: "omanyte", type: "rock" },
  { id: 139, name: "Omastar", slug: "omastar", type: "rock" },
  { id: 140, name: "Kabuto", slug: "kabuto", type: "rock" },
  { id: 141, name: "Kabutops", slug: "kabutops", type: "rock" },
  { id: 142, name: "Aerodactyl", slug: "aerodactyl", type: "rock" },
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
const progressEl = document.getElementById("progress");
const resetBtn = document.getElementById("reset-btn");
const cryPlayer = new Audio();

function soundOn() {
  return !window.Kids || window.Kids.sound.enabled;
}

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

function playOfficialCry(slug) {
  if (!soundOn()) return;
  cryPlayer.pause();
  cryPlayer.src = cryUrl(slug);
  cryPlayer.play().catch(() => {});
}

function hearName(poke) {
  speak(poke.name);
  playOfficialCry(poke.slug);
}

let audioCtx = null;

function getAudioCtx() {
  if (audioCtx) return audioCtx;
  const AC = window.AudioContext || window.webkitAudioContext;
  if (!AC) return null;
  audioCtx = new AC();
  return audioCtx;
}

function playTone(freq, start, dur, gain, type) {
  const ctx = getAudioCtx();
  if (!ctx) return;
  const osc = ctx.createOscillator();
  const g = ctx.createGain();
  osc.type = type || "sine";
  osc.frequency.value = freq;
  const t0 = ctx.currentTime + start;
  g.gain.setValueAtTime(0.0001, t0);
  g.gain.exponentialRampToValueAtTime(gain, t0 + 0.02);
  g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
  osc.connect(g);
  g.connect(ctx.destination);
  osc.start(t0);
  osc.stop(t0 + dur + 0.03);
}

function playChime(kind) {
  if (!soundOn()) return;
  const ctx = getAudioCtx();
  if (!ctx) return;
  if (ctx.state === "suspended") ctx.resume();
  if (kind === "complete") {
    [523.25, 659.25, 783.99, 1046.5].forEach((f, i) => playTone(f, i * 0.14, 0.5, 0.18, "triangle"));
  }
}

const BURST_COLORS = ["#58e0d6", "#ffd166", "#ff8fab", "#8ecae6", "#c8f76b", "#ffffff"];

function burstAt(x, y, big) {
  const layer = document.createElement("div");
  layer.className = "burst";
  layer.style.left = `${x}px`;
  layer.style.top = `${y}px`;
  const n = big ? 22 : 12;
  for (let i = 0; i < n; i += 1) {
    const dot = document.createElement("span");
    dot.className = "burst-dot";
    const angle = (Math.PI * 2 * i) / n + Math.random() * 0.6;
    const dist = (big ? 90 : 60) + Math.random() * (big ? 80 : 40);
    dot.style.setProperty("--dx", `${Math.cos(angle) * dist}px`);
    dot.style.setProperty("--dy", `${Math.sin(angle) * dist - 20}px`);
    dot.style.background = BURST_COLORS[i % BURST_COLORS.length];
    dot.style.animationDelay = `${Math.random() * 0.05}s`;
    layer.appendChild(dot);
  }
  document.body.appendChild(layer);
  window.setTimeout(() => layer.remove(), 1100);
}

function celebrateAll() {
  cheerEl.textContent = "WOW! You caught ALL the Pokémon! You are a Pokémon expert!";
  playChime("complete");
  speak("Wow! You caught all the Pokémon! You are a Pokémon expert!");
  const w = window.innerWidth;
  const h = window.innerHeight;
  for (let i = 0; i < 5; i += 1) {
    window.setTimeout(() => burstAt(Math.random() * w, h * 0.1 + Math.random() * h * 0.5, true), i * 180);
  }
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

function saveCaught() {
  if (window.Kids) window.Kids.store.set(CAUGHT_KEY, caught.map((p) => p.id));
}

function updateProgress() {
  if (!progressEl) return;
  progressEl.textContent = `Caught ${caught.length} of ${ROSTER.length}`;
}

function addToCaught(poke) {
  if (caught.some((p) => p.id === poke.id)) return;
  caught.push(poke);
  saveCaught();
  renderCaught();
  updateProgress();
}

function restoreCaught() {
  if (!window.Kids) return;
  const ids = window.Kids.store.get(CAUGHT_KEY, []);
  if (!Array.isArray(ids)) return;
  const byId = new Map(ROSTER.map((p) => [p.id, p]));
  ids.forEach((id) => {
    const poke = byId.get(id);
    if (poke && !caught.some((p) => p.id === poke.id)) caught.push(poke);
  });
}

function onCatch(index) {
  if (locked) return;
  const poke = field[index];
  if (!poke) return;

  locked = true;
  const btn = slotButtons[index];
  btn.classList.add("catching");

  const isNew = !caught.some((p) => p.id === poke.id);
  const completes = isNew && caught.length + 1 === ROSTER.length;
  const rect = btn.getBoundingClientRect();
  addToCaught(poke);

  if (completes) {
    burstAt(rect.left + rect.width / 2, rect.top + rect.height / 2, true);
    celebrateAll();
  } else {
    cheerEl.textContent = `You caught ${poke.name}!`;
    hearName(poke);
  }

  window.setTimeout(() => {
    field[index] = pickSpawn(field.map((p) => p.id));
    fillCard(btn, field[index], index);
    locked = false;
  }, CATCH_MS);
}

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

function initReset() {
  if (!resetBtn) return;
  resetBtn.addEventListener("click", () => {
    if (!caught.length) return;
    if (!window.confirm("Start over and let all your Pokémon go?")) return;
    caught.length = 0;
    saveCaught();
    renderCaught();
    updateProgress();
    cheerEl.textContent = "All set — catch them again!";
  });
}

function start() {
  initReadToMe();
  initReset();
  restoreCaught();
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
  updateProgress();
}

start();
