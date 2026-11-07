# Jovenra Ludo V6 — Offline browser game

This is an original responsive Ludo game built for JovenraLabs, not affiliated with Ludo King. The user-provided reference recording guided common offline layout and gameplay conventions; no Ludo King-owned artwork, music or code is included.

## Fixed in V6
- **Pawn visibility:** The original browser button padding shrank inactive pawns. All pawns now use full-size shaded SVG models before, during and after movement.
- **Music:** Original 48-second looping instrumental track embedded in the game, starting after the first tap/click as browser autoplay policies require. Music on/off and volume slider work; dice and pawn effects remain independent.
- **Game flow:** Common offline modes Classic, Quick, 1 Kill Win and original offline Popular and Mask variants; two- and four-player play; computer and pass-and-play.
- **Challenges:** First Capture, Speed Finish, Double Finish, a three-round offline Trophy Cup, Daily Star claim, and local achievement badges.
- **Preserved:** The existing board orientation, dice animation, fixed dice results, and square-by-square pawn hops.

## Run and build
Run `npm run dev` (Node 18+) and visit `http://localhost:8080`. No npm dependencies.
Run `npm test` for engine tests and `npm run build` to regenerate `index.html` and `public/index.html`. The source files are in `src/`; `source.html` is the development entry page. The embedded original soundtrack works offline and does not require external asset hosting.

## Modes
- Classic: four tokens home.
- Quick: one token home.
- 1 Kill Win: first capture wins.
- Popular: two tokens home (original offline variant).
- Mask: capture, then finish one token (original offline variant).

## Deployment and AdSense
The current Cloudflare Worker `jovenra-ludo-royale` serves `public/index.html` on `play.jovenralabs.in`. The existing `wrangler.jsonc` remains unchanged. The AdSense publisher verification script remains in `<head>`, but no gameplay ad units are included.

## Test coverage
Nine game-engine tests, responsive Chromium at 320/390/820/1440 px, six dice faces, phone pawn sizing, soundtrack playback/mute/volume, challenges, local cup progression and mode victories were exercised locally. This is not a guarantee of compatibility with every physical device. The reference video did not contain every end-game or online path, so unseen commercial functionality cannot be claimed to match.
