# Jovenra Ludo · V5 browser edition

Original responsive Ludo game with reference-led classic gameplay. This project is **not** affiliated with Ludo King and does not copy its trademarks, artwork, code or sound assets.

## Available screens
1. Launch screen and lobby.
2. VS Computer or Pass & Play selection (offline only).
3. Two-player / four-player setup.
4. Classic, Quick, and 1 Kill Win mode selection.
5. Token color selection.
6. Match board, dice, player panels, tutorial, move and capture animations.
7. Settings, pause, quit confirmation, winner screen and local match resume.

The user-supplied recording was used to study the generic flow and board conventions. All assets and sounds in this game are original. No advertisements, online opponents, login, purchases or rewarded ad flows are shown.

## Run
The top-level `index.html` is self-contained. Open it directly in a modern browser or serve it locally via `python -m http.server 8080`. All local gameplay works without an account or backend.

## Cloudflare
`public/index.html` is a self-contained production bundle used by `wrangler.jsonc` for Workers Static Assets. Main branch commits trigger connected Cloudflare builds. Custom domain: `play.jovenralabs.in`. The AdSense publisher verification script remains in `<head>`; this is **not** an ad unit or approval.

## Verified in development
- Nine game-rule unit tests passed, including exact home, captures and three sixes.
- Chromium browser checks: 320px, 390px, 820px, 1440px (no horizontal overflow or JavaScript errors).
- Dice orientation checks: actual visible pips match values 1–6, without a last-frame texture change.
- Pawn enters and hops three consecutive cells; settings, pass-and-play and quit confirmation passed.

## Notes
- Music starts only after a user click/tap because of browser autoplay policies.
- This upload is a standalone production artifact; modular editable source and test bundle can be maintained separately.
- It has not been verified on every physical phone or browser.
