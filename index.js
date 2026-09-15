// Zander's games — child-facing launcher. Big picture tiles that speak their name.
(function () {
  "use strict";

  var HUB_INTRO = "Pick a game to play!";

  var GAMES = [
    { href: "sharks/", name: "Shark spotter", emoji: "🦈", tile: "#0c3c5a" },
    { href: "pokemon/", name: "Catch them", emoji: "👾", tile: "#3b2f6b" },
    { href: "color-buttons/", name: "Color buttons", emoji: "🎨", tile: "#5a2f4a" },
    { href: "dino-count/", name: "Dino count", emoji: "🦕", tile: "#2f5a37" },
  ];

  function earSvg() {
    return (
      '<svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true" focusable="false">' +
      '<path fill="currentColor" d="M4 9v6h4l5 5V4L8 9H4z"/>' +
      '<path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" d="M16 8.5a4.5 4.5 0 0 1 0 7M18.5 6a8 8 0 0 1 0 12"/>' +
      "</svg>"
    );
  }

  function buildTile(game) {
    var a = document.createElement("a");
    a.className = "tile";
    a.href = game.href;
    a.style.setProperty("--tile", game.tile);
    a.setAttribute("aria-label", "Play " + game.name);

    var emoji = document.createElement("span");
    emoji.className = "tile-emoji";
    emoji.textContent = game.emoji;
    emoji.setAttribute("aria-hidden", "true");

    var name = document.createElement("span");
    name.className = "tile-name";
    name.textContent = game.name;

    var hear = document.createElement("button");
    hear.type = "button";
    hear.className = "tile-hear";
    hear.setAttribute("aria-label", "Hear " + game.name);
    hear.innerHTML = earSvg();
    hear.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      if (window.Kids) window.Kids.sound.speak(game.name);
    });

    a.append(emoji, name, hear);
    return a;
  }

  function init() {
    var bar = document.getElementById("kids-topbar");
    if (bar && window.Kids) {
      var spacer = document.createElement("span");
      spacer.className = "kids-topbar-spacer";
      bar.appendChild(spacer);
      bar.appendChild(window.Kids.muteButton());
    }

    var sub = document.getElementById("hub-sub");
    if (sub && window.Kids) {
      sub.appendChild(window.Kids.hearButton(HUB_INTRO, { ariaLabel: "Hear the menu" }));
    }

    var tiles = document.getElementById("tiles");
    GAMES.forEach(function (g) {
      tiles.appendChild(buildTile(g));
    });

    if (window.Kids) window.Kids.speakInstructionOnce(HUB_INTRO);
  }

  init();
})();
