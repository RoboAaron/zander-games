# Zander games

Small, kid-friendly browser games (ages 4–5). Every game reads its instructions out loud, saves progress, has one shared **Sound on/off** button, and a **Games** button to hop back to the menu.

**▶️ Play online (menu):** https://roboaaron.github.io/zander-games/

Or open `index.html` locally, or serve the folder (`python3 -m http.server`) and open a game.

## Games

- **[🦈 Shark spotter](sharks/)** — tap real shark species to spot them; open an info card with facts and real photos for each one in your logbook.
- **[🌊 Sea life spotter](marine/)** — tap real marine creatures (eels, shrimp, crabs, lobsters, and more) to spot them; open an info card with facts and real photos for each one in your logbook.
- **[👾 Catch them](pokemon/)** — tap Pokémon to catch them; your collection is saved and you can hear each name.
- **[🎨 Color buttons](color-buttons/)** — match the big color square; earns stars as you go.
- **[🦖 Dino count](dino-count/)** — count the T-rex and long-neck dinos, tap the number (1–20); earns stars.

## For grown-ups

- **Read-to-me everywhere:** a one-line "how to play" is spoken after the first tap, and every game has a speaker button to hear it again.
- **Saved progress:** the shark and sea life logbooks and caught Pokémon persist; Color buttons and Dino count keep a running star count.
- **One sound switch:** muting in any game (key `zander-sound`) mutes them all.
- **Healthy by design:** no timers, no ads, no sign-up, no urgency; big tap targets and reduced-motion support.

Shared helpers live in [`shared/kids.js`](shared/kids.js) and [`shared/kids.css`](shared/kids.css).
