# Jovenra Ludo Royale V4

A premium, responsive, browser-based Ludo experience for JovenraLabs.

## Play locally

This first GitHub commit contains a **fully standalone** `index.html` (CSS, JavaScript, visuals and original audio embedded).

- Download the repository or clone it.
- Open `index.html` in a modern browser.
- Choose **Enter the Arena**, start a match and enjoy.

For local HTTP hosting:

```powershell
py -m http.server 8080
```

Visit `http://localhost:8080`.

## Features

- Four-color Ludo game with computer challengers and pass-and-play friends
- Three-dimensional dice animation with a result that stays consistent
- Dice rolling and landing effects, plus relaxing original music (starts after the first interaction due to browser audio policies)
- Pawns hop from square to square
- Responsive layout across phones, tablets and desktop devices

## Deploy with Cloudflare Pages

Create a dedicated Cloudflare Pages project with the **GitHub integration** connected to this repository:

- **Production branch:** `main`
- **Framework preset:** None
- **Build command:** Leave blank (no build necessary)
- **Build output directory:** `/` (repository root; Cloudflare's no-build root directory option)
- **Root directory:** Repository root

Then use **Pages → Custom domains** for the intended subdomain.

Do not replace the existing `jovenralabs.in` website project. If `play.jovenralabs.in` already serves the game portal, do not repoint its DNS record until the existing routing is reviewed; `ludo.jovenralabs.in` is a safer standalone option.

## Current scope

This is the single-device browser edition with bots and local players, **not yet** real-time multiplayer with private online rooms. The initial repository upload is a bundled standalone file; editable modular sources can be added separately.

## License

Copyright JovenraLabs. All rights reserved. The project is not affiliated with Ludo King.
