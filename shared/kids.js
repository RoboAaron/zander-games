// Shared kid-friendly helpers for the Zander games.
// Framework-free. Exposes a single global: window.Kids
// - one shared mute state (localStorage key "zander-sound") across the hub + every game
// - speak() gated by that mute state
// - tiny localStorage JSON wrappers
// - reusable Home / Mute / "read this out loud" buttons
(function () {
  "use strict";

  var SOUND_KEY = "zander-sound";

  var SPEAKER_SVG =
    '<svg class="kids-icon" viewBox="0 0 24 24" width="24" height="24" aria-hidden="true" focusable="false">' +
    '<path fill="currentColor" d="M4 9v6h4l5 5V4L8 9H4z"/>' +
    '<path class="kids-icon-wave" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" d="M16 8.5a4.5 4.5 0 0 1 0 7M18.5 6a8 8 0 0 1 0 12"/>' +
    '<path class="kids-icon-slash" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" d="M4 4l16 16"/>' +
    "</svg>";

  var HOME_SVG =
    '<svg class="kids-icon" viewBox="0 0 24 24" width="24" height="24" aria-hidden="true" focusable="false">' +
    '<path fill="currentColor" d="M12 3l9 8h-3v9h-4v-6H10v6H6v-9H3l9-8z"/>' +
    "</svg>";

  var KidStore = {
    get: function (key, fallback) {
      try {
        var raw = localStorage.getItem(key);
        return raw == null ? fallback : JSON.parse(raw);
      } catch (e) {
        return fallback;
      }
    },
    set: function (key, value) {
      try {
        localStorage.setItem(key, JSON.stringify(value));
      } catch (e) {
        /* storage may be unavailable (private mode) — games still work */
      }
    },
  };

  var listeners = [];

  var KidSound = {
    get enabled() {
      try {
        return localStorage.getItem(SOUND_KEY) !== "off";
      } catch (e) {
        return true;
      }
    },
    set: function (on) {
      try {
        localStorage.setItem(SOUND_KEY, on ? "on" : "off");
      } catch (e) {
        /* ignore */
      }
      if (!on) this.cancel();
      listeners.forEach(function (fn) {
        try {
          fn(on);
        } catch (e) {
          /* ignore listener errors */
        }
      });
    },
    toggle: function () {
      this.set(!this.enabled);
      return this.enabled;
    },
    onChange: function (fn) {
      listeners.push(fn);
    },
    speak: function (text, opts) {
      if (!this.enabled || !text || !window.speechSynthesis) return;
      opts = opts || {};
      try {
        window.speechSynthesis.cancel();
        var u = new SpeechSynthesisUtterance(text);
        u.rate = opts.rate || 0.92;
        u.pitch = opts.pitch || 1.05;
        window.speechSynthesis.speak(u);
      } catch (e) {
        /* speech not available */
      }
    },
    cancel: function () {
      try {
        if (window.speechSynthesis) window.speechSynthesis.cancel();
      } catch (e) {
        /* ignore */
      }
    },
  };

  function muteButton() {
    var btn = document.createElement("button");
    btn.type = "button";
    btn.className = "kids-btn kids-mute";
    function render() {
      var on = KidSound.enabled;
      btn.classList.toggle("is-off", !on);
      btn.setAttribute("aria-pressed", String(on));
      btn.setAttribute("aria-label", on ? "Sound is on. Tap to mute." : "Sound is off. Tap to turn on.");
      btn.innerHTML = SPEAKER_SVG + '<span class="kids-btn-label">' + (on ? "Sound on" : "Sound off") + "</span>";
    }
    btn.addEventListener("click", function () {
      var on = KidSound.toggle();
      render();
      if (on) KidSound.speak("Sound on");
    });
    KidSound.onChange(render);
    render();
    return btn;
  }

  function homeButton(href) {
    var a = document.createElement("a");
    a.className = "kids-btn kids-home";
    a.href = href || "../";
    a.setAttribute("aria-label", "Back to the games menu");
    a.innerHTML = HOME_SVG + '<span class="kids-btn-label">Games</span>';
    return a;
  }

  // A big round speaker that reads the given text (string or a function returning one) out loud.
  function hearButton(text, opts) {
    opts = opts || {};
    var btn = document.createElement("button");
    btn.type = "button";
    btn.className = "kids-btn kids-hear" + (opts.className ? " " + opts.className : "");
    btn.setAttribute("aria-label", opts.ariaLabel || "Read this out loud");
    btn.innerHTML = SPEAKER_SVG + (opts.label ? '<span class="kids-btn-label">' + opts.label + "</span>" : "");
    btn.addEventListener("click", function () {
      var t = typeof text === "function" ? text() : text;
      KidSound.speak(t);
    });
    return btn;
  }

  // Speak a one-line instruction once, after the very first user gesture
  // (browsers block speech before a gesture).
  function speakInstructionOnce(text) {
    var done = false;
    function go() {
      if (done) return;
      done = true;
      remove();
      KidSound.speak(text);
    }
    function remove() {
      document.removeEventListener("pointerdown", go, true);
      document.removeEventListener("keydown", go, true);
    }
    document.addEventListener("pointerdown", go, true);
    document.addEventListener("keydown", go, true);
  }

  // Convenience: build a top bar with Home (left) + Mute (right) and prepend it to a container.
  function topBar(opts) {
    opts = opts || {};
    var bar = document.createElement("div");
    bar.className = "kids-topbar";
    if (opts.home !== false) bar.appendChild(homeButton(opts.homeHref));
    var spacer = document.createElement("span");
    spacer.className = "kids-topbar-spacer";
    bar.appendChild(spacer);
    if (opts.mute !== false) bar.appendChild(muteButton());
    return bar;
  }

  window.Kids = {
    SOUND_KEY: SOUND_KEY,
    store: KidStore,
    sound: KidSound,
    muteButton: muteButton,
    homeButton: homeButton,
    hearButton: hearButton,
    speakInstructionOnce: speakInstructionOnce,
    topBar: topBar,
  };
})();
