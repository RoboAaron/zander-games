// Offline pack for the whole site. Scope is the folder this file lives in
// (/zander-games/ on GitHub Pages, / on a local server).
// Keep this name identical to PLANE_CACHE in plane.js. Bump both together
// so a new save drops a stale pack.
var PLANE_CACHE = "zander-plane-v3";
var NETWORK_WAIT_MS = 8000;

self.addEventListener("install", function () {
  self.skipWaiting();
});

self.addEventListener("activate", function (event) {
  event.waitUntil(
    caches
      .keys()
      .then(function (keys) {
        return Promise.all(
          keys.map(function (key) {
            if (key !== PLANE_CACHE && key.indexOf("zander-plane-") === 0) return caches.delete(key);
            return null;
          })
        );
      })
      .then(function () {
        return self.clients.claim();
      })
  );
});

self.addEventListener("fetch", function (event) {
  var request = event.request;
  if (request.method !== "GET") return;
  if (request.url.indexOf("http") !== 0) return;
  event.respondWith(fromPack(request));
});

function fromPack(request) {
  return caches.open(PLANE_CACHE).then(function (cache) {
    return matchSaved(cache, request).then(function (cached) {
      // A save asks the network directly so it can replace what is stored.
      if (request.cache === "reload") return fetch(networkRequest(request));

      var cross = new URL(request.url).origin !== self.location.origin;
      // Saved pictures and cries answer from the device. No network call.
      if (cached && (cross || (self.navigator && self.navigator.onLine === false))) {
        return maybeRange(request, cached);
      }

      var network;
      try {
        network = fetch(networkRequest(request));
      } catch (err) {
        if (cached) return maybeRange(request, cached);
        throw err;
      }
      if (!cached) return network;
      return withTimeout(network, NETWORK_WAIT_MS).catch(function () {
        return maybeRange(request, cached);
      });
    });
  });
}

// Navigation requests cannot be re-fetched as-is. Ask for the same URL normally.
function networkRequest(request) {
  if (request.mode !== "navigate") return request;
  return new Request(request.url, {
    credentials: "same-origin",
    redirect: "follow",
    cache: request.cache === "reload" ? "reload" : "default",
  });
}

function withTimeout(promise, ms) {
  return new Promise(function (resolve, reject) {
    var timer = setTimeout(function () {
      reject(new Error("timeout"));
    }, ms);
    promise.then(
      function (value) {
        clearTimeout(timer);
        resolve(value);
      },
      function (err) {
        clearTimeout(timer);
        reject(err);
      }
    );
  });
}

function matchSaved(cache, request) {
  var url = new URL(request.url);
  var exact = url.origin + url.pathname + url.search;
  return cache
    .match(exact)
    .then(function (hit) {
      if (hit) return hit;
      return cache.match(exact, { ignoreSearch: true });
    })
    .then(function (hit) {
      if (hit) return hit;
      return cache.match(request, { ignoreSearch: true });
    })
    .then(function (hit) {
      if (hit) return hit;
      if (url.origin !== self.location.origin || !url.pathname.endsWith("/")) return null;
      return cache.match(url.origin + url.pathname + "index.html");
    });
}

// Media elements ask for a byte range. Readable responses can be sliced.
// Opaque responses (hosts that don't send CORS) are returned whole; Chrome
// plays those short cries, and the body cannot be read to build a 206.
function maybeRange(request, response) {
  var header = request.headers.get("range");
  if (!header || response.type === "opaque" || response.status === 206) return Promise.resolve(response);
  return response
    .clone()
    .arrayBuffer()
    .then(function (buf) {
      var match = /bytes=(\d+)-(\d*)/.exec(header);
      if (!match) return response;
      var start = parseInt(match[1], 10);
      var end = match[2] ? parseInt(match[2], 10) : buf.byteLength - 1;
      if (start >= buf.byteLength || start > end) {
        return new Response(null, {
          status: 416,
          headers: { "Content-Range": "bytes */" + buf.byteLength },
        });
      }
      end = Math.min(end, buf.byteLength - 1);
      var slice = buf.slice(start, end + 1);
      var headers = new Headers(response.headers);
      headers.set("Content-Range", "bytes " + start + "-" + end + "/" + buf.byteLength);
      headers.set("Content-Length", String(slice.byteLength));
      headers.set("Accept-Ranges", "bytes");
      return new Response(slice, { status: 206, statusText: "Partial Content", headers: headers });
    })
    .catch(function () {
      return response;
    });
}
