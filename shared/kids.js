// Shared kid-friendly helpers for the Zander games.
// Framework-free. Exposes a single global: window.Kids
// - one shared mute state (localStorage key "zander-sound") across the hub + every game
// - speak() gated by that mute state
// - tiny localStorage JSON wrappers
// - reusable Home / Mute / Full screen / "read this out loud" buttons
// - pinch-zoom blocked so little fingers stay on the game, not the browser chrome
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

  var EXPAND_SVG =
    '<svg class="kids-icon" viewBox="0 0 24 24" width="24" height="24" aria-hidden="true" focusable="false">' +
    '<path fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" d="M8 3H3v5M16 3h5v5M8 21H3v-5M16 21h5v-5"/>' +
    "</svg>";

  var SHRINK_SVG =
    '<svg class="kids-icon" viewBox="0 0 24 24" width="24" height="24" aria-hidden="true" focusable="false">' +
    '<path fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" d="M3 8h5V3M16 3v5h5M3 16h5v5M16 21v-5h5"/>' +
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
  var speakTimer = null;
  var unlocked = false;

  // Chrome often drops speak() when it runs in the same turn as cancel(),
  // and can leave speechSynthesis stuck in a paused state. These helpers
  // work around both bugs so kid speech is reliable.
  var CANCEL_SPEAK_GAP_MS = 70;

  function synth() {
    return window.speechSynthesis || null;
  }

  function clearSpeakTimer() {
    if (speakTimer != null) {
      clearTimeout(speakTimer);
      speakTimer = null;
    }
  }

  function resumeIfNeeded() {
    var s = synth();
    if (!s) return;
    try {
      if (s.paused) s.resume();
    } catch (e) {
      /* ignore */
    }
  }

  function unlockSpeech() {
    if (unlocked) return;
    unlocked = true;
    var s = synth();
    if (!s) return;
    try {
      // Warm the voice list; Chrome loads voices asynchronously.
      s.getVoices();
      resumeIfNeeded();
    } catch (e) {
      /* ignore */
    }
  }

  function makeUtterance(text, opts) {
    var u = new SpeechSynthesisUtterance(text);
    u.rate = (opts && opts.rate) || 0.92;
    u.pitch = (opts && opts.pitch) || 1.05;
    return u;
  }

  function speakNow(text, opts) {
    var s = synth();
    if (!s || !KidSound.enabled || !text) return;
    resumeIfNeeded();
    try {
      s.speak(makeUtterance(text, opts));
    } catch (e) {
      /* speech not available */
    }
  }

  function speakListNow(texts, opts) {
    var s = synth();
    if (!s || !KidSound.enabled) return;
    resumeIfNeeded();
    for (var i = 0; i < texts.length; i += 1) {
      if (texts[i]) {
        try {
          s.speak(makeUtterance(texts[i], opts));
        } catch (e) {
          /* ignore */
        }
      }
    }
  }

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
    // Speak text, interrupting anything currently playing.
    // Never call cancel()+speak() in the same turn — Chrome silently drops it.
    speak: function (text, opts) {
      if (!this.enabled || !text || !synth()) return;
      unlockSpeech();
      opts = opts || {};
      var s = synth();
      clearSpeakTimer();
      try {
        if (s.speaking || s.pending) {
          s.cancel();
          speakTimer = setTimeout(function () {
            speakTimer = null;
            speakNow(text, opts);
          }, CANCEL_SPEAK_GAP_MS);
        } else {
          speakNow(text, opts);
        }
      } catch (e) {
        /* speech not available */
      }
    },
    // Queue several phrases in order (used by info cards).
    speakQueue: function (texts, opts) {
      if (!this.enabled || !synth()) return;
      unlockSpeech();
      opts = opts || {};
      var list = (texts || []).filter(Boolean);
      if (!list.length) return;
      var s = synth();
      clearSpeakTimer();
      try {
        if (s.speaking || s.pending) {
          s.cancel();
          speakTimer = setTimeout(function () {
            speakTimer = null;
            speakListNow(list, opts);
          }, CANCEL_SPEAK_GAP_MS);
        } else {
          speakListNow(list, opts);
        }
      } catch (e) {
        /* ignore */
      }
    },
    cancel: function () {
      clearSpeakTimer();
      try {
        var s = synth();
        if (s) s.cancel();
      } catch (e) {
        /* ignore */
      }
    },
    unlock: unlockSpeech,
  };

  // Keep Chrome from getting stuck paused mid-sentence.
  if (typeof window !== "undefined") {
    setInterval(resumeIfNeeded, 8000);
    document.addEventListener(
      "pointerdown",
      function () {
        unlockSpeech();
      },
      true
    );
  }

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

  // --- Full screen (API when the browser has it; CSS fill on iOS / older tablets) ---

  var fullscreenListeners = [];
  var immersiveFallback = false;

  function apiFullscreenElement() {
    return document.fullscreenElement || document.webkitFullscreenElement || null;
  }

  function canUseFullscreenApi() {
    var el = document.documentElement;
    return !!(el.requestFullscreen || el.webkitRequestFullscreen);
  }

  function isFullscreen() {
    return !!apiFullscreenElement() || immersiveFallback;
  }

  function syncFullscreenClass() {
    var on = isFullscreen();
    var fallback = immersiveFallback && !apiFullscreenElement();
    if (document.documentElement) {
      document.documentElement.classList.toggle("kids-fullscreen", on);
      document.documentElement.classList.toggle("kids-immersive", fallback);
    }
    if (document.body) {
      document.body.classList.toggle("kids-fullscreen", on);
      document.body.classList.toggle("kids-immersive", fallback);
    }
    if (on) {
      try {
        window.scrollTo(0, 0);
        if (document.scrollingElement) document.scrollingElement.scrollTop = 0;
      } catch (e) {
        /* ignore */
      }
    }
    fullscreenListeners.forEach(function (fn) {
      try {
        fn(on);
      } catch (e) {
        /* ignore listener errors */
      }
    });
  }

  function enterFullscreen() {
    immersiveFallback = false;
    var el = document.documentElement;
    var req = el.requestFullscreen || el.webkitRequestFullscreen;
    if (req) {
      try {
        var result = req.call(el);
        if (result && typeof result.then === "function") {
          return result.catch(function () {
            immersiveFallback = true;
            syncFullscreenClass();
          });
        }
        return Promise.resolve();
      } catch (e) {
        immersiveFallback = true;
        syncFullscreenClass();
        return Promise.resolve();
      }
    }
    immersiveFallback = true;
    syncFullscreenClass();
    return Promise.resolve();
  }

  function exitFullscreen() {
    var apiEl = apiFullscreenElement();
    if (apiEl) {
      var exit = document.exitFullscreen || document.webkitExitFullscreen;
      if (exit) {
        try {
          var result = exit.call(document);
          if (result && typeof result.then === "function") {
            return result.catch(function () {
              /* ignore */
            });
          }
        } catch (e) {
          /* ignore */
        }
      }
    }
    immersiveFallback = false;
    syncFullscreenClass();
    return Promise.resolve();
  }

  function toggleFullscreen() {
    if (isFullscreen()) return exitFullscreen();
    return enterFullscreen();
  }

  function onFullscreenChange(fn) {
    fullscreenListeners.push(fn);
  }

  function fullscreenButton() {
    var btn = document.createElement("button");
    btn.type = "button";
    btn.className = "kids-btn kids-fullscreen-btn";
    function render() {
      var on = isFullscreen();
      btn.classList.toggle("is-on", on);
      btn.setAttribute("aria-pressed", String(on));
      btn.setAttribute(
        "aria-label",
        on ? "Exit full screen. Tap to show the browser again." : "Full screen. Tap to fill the tablet."
      );
      btn.innerHTML =
        (on ? SHRINK_SVG : EXPAND_SVG) +
        '<span class="kids-btn-label">' +
        (on ? "Exit" : "Full screen") +
        "</span>";
    }
    btn.addEventListener("click", function () {
      var wasOn = isFullscreen();
      toggleFullscreen();
      // Speak after the toggle settles; chrome may reject the API without a gesture.
      setTimeout(function () {
        render();
        KidSound.speak(isFullscreen() ? "Full screen" : wasOn ? "Done" : "Full screen");
      }, 80);
    });
    onFullscreenChange(render);
    render();
    return btn;
  }

  if (typeof document !== "undefined") {
    document.addEventListener("fullscreenchange", syncFullscreenClass);
    document.addEventListener("webkitfullscreenchange", syncFullscreenClass);
  }

  // --- Zoom lock: stop pinch / ctrl-wheel zoom so taps stay on the game ---

  function lockZoom() {
    if (typeof document === "undefined") return;

    function blockMultiTouch(e) {
      if (e.touches && e.touches.length > 1) e.preventDefault();
    }

    document.addEventListener("touchmove", blockMultiTouch, { passive: false, capture: true });
    document.addEventListener(
      "gesturestart",
      function (e) {
        e.preventDefault();
      },
      { passive: false, capture: true }
    );
    document.addEventListener(
      "gesturechange",
      function (e) {
        e.preventDefault();
      },
      { passive: false, capture: true }
    );
    document.addEventListener(
      "wheel",
      function (e) {
        if (e.ctrlKey) e.preventDefault();
      },
      { passive: false, capture: true }
    );

    // Keep a zoomed-in viewport from sticking after a prior visit.
    try {
      if (document.documentElement) {
        document.documentElement.style.touchAction = "manipulation";
      }
      if (document.body) {
        document.body.style.touchAction = "manipulation";
      } else {
        document.addEventListener(
          "DOMContentLoaded",
          function () {
            if (document.body) document.body.style.touchAction = "manipulation";
            syncFullscreenClass();
          },
          { once: true }
        );
      }
    } catch (e) {
      /* ignore */
    }
  }

  lockZoom();

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
  // Deferred slightly so a same-tap game sound (spot a creature, etc.) wins;
  // if something is already talking we skip — the hear button still works.
  function speakInstructionOnce(text) {
    var done = false;
    function go() {
      if (done) return;
      done = true;
      remove();
      setTimeout(function () {
        var s = synth();
        if (s && (s.speaking || s.pending)) return;
        KidSound.speak(text);
      }, 450);
    }
    function remove() {
      document.removeEventListener("pointerdown", go, true);
      document.removeEventListener("keydown", go, true);
    }
    document.addEventListener("pointerdown", go, true);
    document.addEventListener("keydown", go, true);
  }

  // Convenience: Home (left) + Full screen + Mute (right).
  function topBar(opts) {
    opts = opts || {};
    var bar = document.createElement("div");
    bar.className = "kids-topbar";
    if (opts.home !== false) bar.appendChild(homeButton(opts.homeHref));
    var spacer = document.createElement("span");
    spacer.className = "kids-topbar-spacer";
    bar.appendChild(spacer);
    if (opts.fullscreen !== false) bar.appendChild(fullscreenButton());
    if (opts.mute !== false) bar.appendChild(muteButton());
    return bar;
  }

  window.Kids = {
    SOUND_KEY: SOUND_KEY,
    store: KidStore,
    sound: KidSound,
    muteButton: muteButton,
    homeButton: homeButton,
    fullscreenButton: fullscreenButton,
    hearButton: hearButton,
    speakInstructionOnce: speakInstructionOnce,
    topBar: topBar,
    isFullscreen: isFullscreen,
    enterFullscreen: enterFullscreen,
    exitFullscreen: exitFullscreen,
    toggleFullscreen: toggleFullscreen,
    onFullscreenChange: onFullscreenChange,
    canUseFullscreenApi: canUseFullscreenApi,
  };
})();
