# Striker FC 26 ⚽

An original 3D football game in browser-first pre-alpha development.

## Pre-alpha 0.2

- **11v11**: Two full teams in 4-3-3 with named players, attackers, midfielders, defenders and a goalkeeper.
- **Larger pitch**: 96 × 156 world-unit pitch, new scaled field markings, expanded stadium.
- **Broadcast camera**: A sideline FIFA-style view as the default; press **C** to toggle the original camera.
- **Positional AI**: At most two defenders per side press/cover the ball while the rest hold positions. Attackers make runs, midfielders support, and defenders hold a line.
- **Gameplay**: Passing, shooting, tackling, player switching, scoreboard, match clock and four-minute matches.

## Play

Open the deployed website, or save `index.html` and open it in an up-to-date browser. No local Node.js installation is needed. The Three.js library is loaded from a public CDN, so an internet connection and access to jsDelivr are required.

## Controls

| Key | Action |
| --- | --- |
| WASD / Arrow keys | Move relative to active camera |
| Shift | Sprint |
| Space | Shoot / Tackle |
| E | Pass to best available teammate |
| Q | Switch player |
| C | Switch between broadcast and classic camera |
| P / Escape | Pause |

## Deploy from GitHub to Vercel

1. Go to https://vercel.com/new and import `jdarkyeka6/StrikerFC26`.
2. Use framework preset **Other**, with repository root `./`.
3. Leave the Build Command and Output Directory blank (static HTML).
4. Deploy. Any subsequent commit to `main` automatically updates the site once Git integration is connected.

## Future

Better keeper reactions, offsides, fouls, gamepad support, tactical formations, career mode, clubs, animations and online multiplayer.

Original independent project, not affiliated with FIFA or EA SPORTS.
