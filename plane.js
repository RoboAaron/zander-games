// Save every game onto this tablet so it still plays with wifi off.
// PLANE_CACHE must match sw.js. Bump both together so a new save replaces a stale pack.
(function (exports) {
  "use strict";

  var PLANE_CACHE = "zander-plane-v2";
  var SAVED_KEY = "zander-plane-saved";
  var AUTOSTART_KEY = "zander-plane-autostart";
  var GAMES = ["sharks/", "marine/", "stories/", "pokemon/", "dino-count/", "color-buttons/"];
  var HTML_PATHS = [
    "index.html",
    "sharks/index.html",
    "marine/index.html",
    "stories/index.html",
    "pokemon/index.html",
    "dino-count/index.html",
    "color-buttons/index.html",
  ];
  var SCRIPT_NAMES = ["sharks/game.js", "marine/game.js", "stories/game.js", "pokemon/game.js"];
  var SHOWDOWN_SPRITES = "https://play.pokemonshowdown.com/sprites";
  var GALLERY_GENS = [1, 2, 3, 4, 5, 6];
  var GALLERY_MAX = 5;
  var SAVE_POOL = 6;
  var API_POOL = 3;
  var PROBE_MS = 20000;
  var OPEN_LICENSES = {
    cc0: true,
    "cc-by": true,
    "cc-by-nc": true,
    "cc-by-sa": true,
    "cc-by-nd": true,
    "cc-by-nc-sa": true,
    "cc-by-nc-nd": true,
    pd: true,
  };

  function dedupe(list) {
    var seen = Object.create(null);
    var out = [];
    for (var i = 0; i < list.length; i += 1) {
      if (!list[i] || seen[list[i]]) continue;
      seen[list[i]] = true;
      out.push(list[i]);
    }
    return out;
  }

  function resolvePath(fromFile, rel) {
    var base = fromFile.replace(/[^/]*$/, "");
    var parts = (base + rel).split("/");
    var out = [];
    for (var i = 0; i < parts.length; i += 1) {
      var part = parts[i];
      if (part === "" || part === ".") continue;
      if (part === "..") out.pop();
      else out.push(part);
    }
    return out.join("/");
  }

  function htmlAssets(html, fromFile) {
    var out = [];
    var re = /(?:src|href)\s*=\s*["']([^"']+)["']/gi;
    var match;
    while ((match = re.exec(html))) {
      var rel = match[1];
      if (!rel || rel.charAt(0) === "#" || rel.indexOf("mailto:") === 0 || rel.indexOf("javascript:") === 0) continue;
      if (/^[a-z]+:/i.test(rel) || rel.indexOf("//") === 0) continue;
      out.push(resolvePath(fromFile, rel));
    }
    return out;
  }

  function rosterFromSource(text) {
    var out = [];
    var re = /\{\s*id:\s*(\d+),\s*name:\s*"([^"]*)",\s*slug:\s*"([^"]+)"/g;
    var match;
    while ((match = re.exec(text))) out.push({ id: Number(match[1]), slug: match[3] });
    return out;
  }

  function slugsFromSource(text) {
    var out = [];
    var re = /slug:\s*"([^"]+)"/g;
    var match;
    while ((match = re.exec(text))) out.push(match[1]);
    return out;
  }

  function storyArtIds(text) {
    var out = [];
    var card = /id:\s*"([^"]+)",\s*name:\s*"[^"]*",\s*line:/g;
    var icon = /icon:\s*"([^"]+)"/g;
    var match;
    while ((match = card.exec(text))) out.push(match[1]);
    while ((match = icon.exec(text))) out.push(match[1]);
    return out;
  }

  function energySymbols(text) {
    var out = [];
    var re = /symbol:\s*"([^"]+)"/g;
    var match;
    while ((match = re.exec(text))) out.push(match[1]);
    return out;
  }

  function inatIds(text) {
    var out = [];
    var re = /inat:\s*(\d+)/g;
    var match;
    while ((match = re.exec(text))) out.push(match[1]);
    return out;
  }

  function spriteUrl(id) {
    var padded = String(id).padStart(3, "0");
    return "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/" + padded + ".png";
  }

  // Large picture the PokéCatch card opens on. Same path as fullArtUrl in pokemon/game.js.
  function fullArtUrl(id) {
    var padded = String(id).padStart(3, "0");
    return "https://assets.pokemon.com/assets/cms2/img/pokedex/full/" + padded + ".png";
  }

  function cryUrl(slug) {
    return "https://play.pokemonshowdown.com/audio/cries/" + slug + ".mp3";
  }

  function pokemonAssetUrls(entry) {
    var urls = [spriteUrl(entry.id), fullArtUrl(entry.id), cryUrl(entry.slug)];
    for (var i = 0; i < GALLERY_GENS.length; i += 1) {
      urls.push(SHOWDOWN_SPRITES + "/gen" + GALLERY_GENS[i] + "/" + entry.slug + ".png");
    }
    urls.push(SHOWDOWN_SPRITES + "/ani/" + entry.slug + ".gif");
    urls.push(SHOWDOWN_SPRITES + "/home/" + entry.slug + ".png");
    return urls;
  }

  function inatApiUrl(id) {
    return "https://api.inaturalist.org/v1/taxa/" + id;
  }

  // Same shape as the shark and sea-life galleries.
  function photoSizes(photo) {
    var base = photo.url || photo.medium_url || "";
    var hasSquare = base.indexOf("/square.") !== -1;
    var medium = hasSquare ? base.replace("/square.", "/medium.") : photo.medium_url || base;
    var large = hasSquare ? base.replace("/square.", "/large.") : photo.large_url || photo.medium_url || base;
    return { medium: medium, large: large };
  }

  function photosFromTaxon(data) {
    var taxon = data && data.results && data.results[0];
    var list = taxon && taxon.taxon_photos ? taxon.taxon_photos : [];
    var urls = [];
    var kept = 0;
    for (var i = 0; i < list.length && kept < GALLERY_MAX; i += 1) {
      var photo = list[i].photo;
      if (!photo || !OPEN_LICENSES[photo.license_code] || !(photo.medium_url || photo.url)) continue;
      var sizes = photoSizes(photo);
      if (sizes.medium) urls.push(sizes.medium);
      if (sizes.large && sizes.large !== sizes.medium) urls.push(sizes.large);
      kept += 1;
    }
    return urls;
  }

  function buildLocalPack(htmlByPath, scriptByName) {
    var urls = ["./","index.html", "sw.js", "manifest.webmanifest", "icon-180.png", "icon-192.png", "icon-512.png", "plane.js"];
    var game;
    for (game = 0; game < GAMES.length; game += 1) {
      urls.push(GAMES[game]);
      urls.push(GAMES[game] + "index.html");
    }
    var htmlPath;
    for (htmlPath in htmlByPath) {
      if (Object.prototype.hasOwnProperty.call(htmlByPath, htmlPath)) {
        urls = urls.concat(htmlAssets(htmlByPath[htmlPath], htmlPath));
      }
    }
    var scripts = scriptByName || {};
    slugsFromSource(scripts["sharks/game.js"] || "").forEach(function (slug) {
      urls.push("sharks/art/" + slug + ".webp");
    });
    slugsFromSource(scripts["marine/game.js"] || "").forEach(function (slug) {
      urls.push("marine/art/" + slug + ".webp");
    });
    storyArtIds(scripts["stories/game.js"] || "").forEach(function (id) {
      urls.push("stories/art/" + id + ".svg");
    });
    energySymbols(scripts["pokemon/game.js"] || "").forEach(function (symbol) {
      urls.push("pokemon/energy/" + symbol + ".png");
    });
    rosterFromSource(scripts["pokemon/game.js"] || "").forEach(function (entry) {
      urls = urls.concat(pokemonAssetUrls(entry));
    });
    inatIds((scripts["sharks/game.js"] || "") + "\n" + (scripts["marine/game.js"] || "")).forEach(function (id) {
      urls.push(inatApiUrl(id));
    });
    return dedupe(urls);
  }

  exports.PLANE_CACHE = PLANE_CACHE;
  exports.GAMES = GAMES;
  exports.HTML_PATHS = HTML_PATHS;
  exports.SCRIPT_NAMES = SCRIPT_NAMES;
  exports.buildLocalPack = buildLocalPack;
  exports.rosterFromSource = rosterFromSource;
  exports.spriteUrl = spriteUrl;
  exports.fullArtUrl = fullArtUrl;
  exports.cryUrl = cryUrl;
  exports.pokemonAssetUrls = pokemonAssetUrls;
  exports.inatApiUrl = inatApiUrl;
  exports.photoSizes = photoSizes;
  exports.photosFromTaxon = photosFromTaxon;
  exports.GALLERY_MAX = GALLERY_MAX;

  if (typeof document === "undefined") return;

  var button = document.getElementById("plane-save");
  var labelEl = document.getElementById("plane-label");
  var statusEl = document.getElementById("plane-status");
  var saving = false;

  function absUrl(path) {
    return new URL(path, window.location.href).href;
  }

  function scopeUrl() {
    return new URL("./", window.location.href).href;
  }

  function speak(text) {
    if (window.Kids) window.Kids.sound.speak(text);
  }

  function setStatus(text) {
    if (statusEl) statusEl.textContent = text || "";
  }

  function setLabel(text) {
    if (labelEl) labelEl.textContent = text;
  }

  function showDone(failed) {
    if (!button) return;
    button.classList.add("is-done");
    button.classList.remove("is-saving");
    setLabel("Ready for the plane");
    setStatus(failed ? failed + " could not be saved" : "Saved on this tablet");
  }

  function readSaved() {
    try {
      if (window.Kids) return window.Kids.store.get(SAVED_KEY, null);
      var raw = localStorage.getItem(SAVED_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      return null;
    }
  }

  function writeSaved(data) {
    try {
      if (window.Kids) window.Kids.store.set(SAVED_KEY, data);
      else localStorage.setItem(SAVED_KEY, JSON.stringify(data));
    } catch (e) {
      /* the pack itself is in the Cache API */
    }
  }

  function sessionGet(key) {
    try {
      return sessionStorage.getItem(key);
    } catch (e) {
      return null;
    }
  }

  function sessionSet(key, value) {
    try {
      if (value == null) sessionStorage.removeItem(key);
      else sessionStorage.setItem(key, value);
    } catch (e) {
      /* ignore */
    }
  }

  function wait(ms) {
    return new Promise(function (resolve) {
      setTimeout(resolve, ms);
    });
  }

  function pool(items, limit, worker) {
    var index = 0;
    var runners = [];
    var width = Math.min(limit, items.length) || 1;
    function next() {
      if (index >= items.length) return Promise.resolve();
      var current = items[index];
      index += 1;
      return worker(current).then(next);
    }
    for (var i = 0; i < width; i += 1) runners.push(next());
    return Promise.all(runners);
  }

  function ensureSw() {
    if (!("serviceWorker" in navigator) || !("caches" in window)) {
      return Promise.reject(new Error("This browser can't save for the plane."));
    }
    var sw = new URL("sw.js", window.location.href).href;
    return navigator.serviceWorker.register(sw, { scope: scopeUrl() }).then(function () {
      return navigator.serviceWorker.ready;
    });
  }

  function putClean(cache, url, res) {
    if (res.type === "opaque" || !res.redirected) return cache.put(url, res);
    return res.blob().then(function (blob) {
      return cache.put(
        url,
        new Response(blob, { status: res.status, statusText: res.statusText, headers: new Headers(res.headers) })
      );
    });
  }

  function probeImage(url) {
    return new Promise(function (resolve) {
      var img = new Image();
      var timer = setTimeout(function () {
        resolve(false);
      }, PROBE_MS);
      img.onload = function () {
        clearTimeout(timer);
        resolve(img.naturalWidth > 0);
      };
      img.onerror = function () {
        clearTimeout(timer);
        resolve(false);
      };
      img.src = url;
    });
  }

  function probeAudio(url) {
    return new Promise(function (resolve) {
      var audio = new Audio();
      audio.preload = "auto";
      var timer = setTimeout(function () {
        resolve(false);
      }, PROBE_MS);
      audio.onloadeddata = function () {
        clearTimeout(timer);
        resolve(true);
      };
      audio.onerror = function () {
        clearTimeout(timer);
        resolve(false);
      };
      audio.src = url;
    });
  }

  function isAudio(url) {
    return /\.mp3($|\?)/i.test(url);
  }

  function saveOpaque(cache, url) {
    return fetch(url, { mode: "no-cors", credentials: "omit", cache: "reload" })
      .then(function (res) {
        if (res.type !== "opaque") return false;
        return putClean(cache, url, res).then(function () {
          var probe = isAudio(url) ? probeAudio(url) : probeImage(url);
          return probe.then(function (ok) {
            if (ok) return true;
            return cache.delete(url).then(function () {
              return false;
            });
          });
        });
      })
      .catch(function () {
        return false;
      });
  }

  function saveCors(cache, url) {
    return fetch(url, { mode: "cors", credentials: "omit", cache: "reload" }).then(function (res) {
      if (res.status === 429 || res.status >= 500) {
        return wait(800).then(function () {
          return fetch(url, { mode: "cors", credentials: "omit", cache: "reload" });
        });
      }
      return res;
    }).then(function (res) {
      if (!res || !res.ok) return false;
      return putClean(cache, url, res).then(function () {
        return true;
      });
    });
  }

  function saveSameOrigin(cache, url) {
    return fetch(url, { credentials: "same-origin", cache: "reload" }).then(function (res) {
      if (!res.ok) return [];
      var bare = url.split("#")[0];
      var query = bare.indexOf("?");
      var copy = query === -1 ? null : res.clone();
      return putClean(cache, url, res).then(function () {
        var stored = [url];
        if (copy && query !== -1) {
          var plain = bare.slice(0, query);
          return putClean(cache, plain, copy).then(function () {
            stored.push(plain);
            return stored;
          });
        }
        return stored;
      });
    });
  }

  // One request: store the taxon JSON and hand it back so photo URLs can be collected.
  function saveApi(cache, url) {
    var abs = absUrl(url);
    function pull(attempt) {
      return fetch(abs, { mode: "cors", credentials: "omit", cache: "reload" }).then(function (res) {
        if ((res.status === 429 || res.status >= 500) && attempt < 1) {
          return wait(800).then(function () {
            return pull(attempt + 1);
          });
        }
        if (!res.ok) return null;
        return res.text().then(function (text) {
          var data;
          try {
            data = JSON.parse(text);
          } catch (e) {
            return null;
          }
          return putClean(
            cache,
            abs,
            new Response(text, { status: 200, headers: { "Content-Type": "application/json" } })
          ).then(function () {
            return data;
          });
        });
      });
    }
    return pull(0).catch(function () {
      return null;
    });
  }

  // Returns the cache keys written, or an empty list when the file is skipped.
  function saveUrl(cache, url) {
    var abs = absUrl(url);
    if (new URL(abs).origin === window.location.origin) {
      return saveSameOrigin(cache, abs).catch(function () {
        return [];
      });
    }
    return saveCors(cache, abs)
      .catch(function () {
        return saveOpaque(cache, abs);
      })
      .then(function (ok) {
        return ok ? [abs] : [];
      })
      .catch(function () {
        return [];
      });
  }

  function fetchText(path) {
    return fetch(absUrl(path), { cache: "reload" })
      .then(function (res) {
        if (!res.ok) return "";
        return res.text();
      })
      .catch(function () {
        return "";
      });
  }

  function loadSources() {
    var htmlByPath = {};
    var scriptByName = {};
    return pool(HTML_PATHS, SAVE_POOL, function (path) {
      return fetchText(path).then(function (text) {
        htmlByPath[path] = text;
      });
    })
      .then(function () {
        return pool(SCRIPT_NAMES, SAVE_POOL, function (name) {
          var versioned = name;
          HTML_PATHS.forEach(function (htmlPath) {
            htmlAssets(htmlByPath[htmlPath] || "", htmlPath).forEach(function (asset) {
              if (asset.split("?")[0] === name) versioned = asset;
            });
          });
          return fetchText(versioned).then(function (text) {
            scriptByName[name] = text;
          });
        });
      })
      .then(function () {
        return { htmlByPath: htmlByPath, scriptByName: scriptByName };
      });
  }

  function dropStaleCaches() {
    return caches.keys().then(function (keys) {
      return Promise.all(
        keys.map(function (key) {
          if (key !== PLANE_CACHE && key.indexOf("zander-plane-") === 0) return caches.delete(key);
          return null;
        })
      );
    });
  }

  function pruneCache(cache, keep) {
    return cache.keys().then(function (requests) {
      var jobs = [];
      requests.forEach(function (request) {
        if (!keep[request.url]) jobs.push(cache.delete(request));
      });
      return Promise.all(jobs);
    });
  }

  function remember(keep, urls) {
    for (var i = 0; i < urls.length; i += 1) keep[urls[i]] = true;
  }

  function startSave() {
    if (saving) return;
    if (navigator.onLine === false) {
      var prior = readSaved();
      if (prior && prior.cache === PLANE_CACHE) {
        showDone(prior.failed);
        speak("Ready for the plane");
      } else {
        setStatus("Connect to the internet first");
        speak("Connect to the internet first");
      }
      return;
    }
    if (!navigator.serviceWorker.controller) {
      sessionSet(AUTOSTART_KEY, "1");
      window.location.reload();
      return;
    }
    saving = true;
    button.classList.remove("is-done");
    button.classList.add("is-saving");
    button.setAttribute("aria-busy", "true");
    setLabel("Save for the plane");
    setStatus("Finding pictures…");
    speak("Saving for the plane");
    if (navigator.storage && navigator.storage.persist) navigator.storage.persist();

    var failed = 0;
    var savedCount = 0;
    var keep = Object.create(null);

    ensureSw()
      .then(dropStaleCaches)
      .then(function () {
        return caches.open(PLANE_CACHE);
      })
      .then(function (cache) {
        return loadSources().then(function (sources) {
          var pack = buildLocalPack(sources.htmlByPath, sources.scriptByName);
          var apiUrls = [];
          var assetUrls = [];
          pack.forEach(function (url) {
            if (url.indexOf("https://api.inaturalist.org/") === 0) apiUrls.push(url);
            else assetUrls.push(url);
          });
          var findLeft = apiUrls.length;
          setStatus(findLeft ? "Finding pictures… " + findLeft + " left" : "Finding pictures…");
          return pool(apiUrls, API_POOL, function (url) {
            return saveApi(cache, url).then(function (data) {
              findLeft -= 1;
              setStatus("Finding pictures… " + Math.max(findLeft, 0) + " left");
              if (!data) {
                failed += 1;
                return;
              }
              remember(keep, [absUrl(url)]);
              savedCount += 1;
              photosFromTaxon(data).forEach(function (photo) {
                assetUrls.push(photo);
              });
            });
          }).then(function () {
            assetUrls = dedupe(assetUrls);
            var left = assetUrls.length;
            setStatus(left + " left");
            return pool(assetUrls, SAVE_POOL, function (url) {
              return saveUrl(cache, url).then(function (stored) {
                left -= 1;
                setStatus(left + " left");
                if (stored.length) {
                  remember(keep, stored);
                  savedCount += 1;
                } else {
                  failed += 1;
                }
              });
            }).then(function () {
              var rosterCount = rosterFromSource(sources.scriptByName["pokemon/game.js"] || "").length;
              if (!rosterCount) return null;
              return pruneCache(cache, keep);
            });
          });
        });
      })
      .then(function () {
        writeSaved({ cache: PLANE_CACHE, saved: savedCount, failed: failed });
        showDone(failed);
        speak("Ready for the plane");
      })
      .catch(function () {
        setLabel("Save for the plane");
        setStatus("Couldn't save. Try again while online.");
        speak("Couldn't save");
      })
      .then(function () {
        saving = false;
        button.classList.remove("is-saving");
        button.removeAttribute("aria-busy");
      });
  }

  function restoreDone() {
    var prior = readSaved();
    if (!prior || prior.cache !== PLANE_CACHE || !("caches" in window)) return;
    caches.open(PLANE_CACHE).then(function (cache) {
      return cache.match(absUrl("index.html"), { ignoreSearch: true });
    }).then(function (hit) {
      if (hit) showDone(prior.failed);
    }).catch(function () {
      /* leave the save button up */
    });
  }

  exports.saveUrl = saveUrl;
  exports.absUrl = absUrl;
  exports.scopeUrl = scopeUrl;

  if (!button) return;

  button.addEventListener("click", function () {
    startSave();
  });

  ensureSw().catch(function () {
    setStatus("This browser can't save for the plane.");
  });
  restoreDone();

  if (sessionGet(AUTOSTART_KEY) === "1") {
    sessionSet(AUTOSTART_KEY, null);
    if (navigator.serviceWorker && navigator.serviceWorker.controller) startSave();
  }
})(typeof module !== "undefined" && module.exports ? module.exports : (window.ZanderPlane = window.ZanderPlane || {}));
