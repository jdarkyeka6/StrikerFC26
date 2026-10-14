# ⚽ Striker FC 26

An original browser-first, 3D football game in **pre-alpha 0.4: MATCHDAY**.

## What's playable now

- 11v11 football on a full field, with 4-3-3 formations and positional team AI
- Humanoid player models with shirts, numbered kits, animated running legs and arms, and on-pitch selection markers
- FIFA-style sideline broadcast camera with adjustable zoom; an optional classic camera
- Dribbling, sprinting, aim-assisted passes, through balls, lofted crosses, charged shooting, jockeying, timed tackling and player switching
- Goalkeepers that react to shots and can make saves (and can be beaten!)
- Throw-ins, corners, goal kicks, goal scoring, basic kickoffs and a four-minute match clock
- Scoreboard, 2D minimap, match messages, possession / shot / save statistics and basic audio cues
- Optional Standard Gamepad support (e.g., Xbox-style controllers)
- Performance mode for slower school laptops

## Keyboard controls

| Key | Action |
| --- | --- |
| WASD / Arrows | Move, aim directional passes |
| Shift | Sprint |
| E | Ground pass |
| R | Through ball |
| T | Lofted cross |
| Hold and release Space | Shoot (auto-shoot at full charge) |
| Space (defending) | Timed tackle |
| F (hold) | Jockey |
| Q | Switch player |
| C | Change camera |
| Z / X | Zoom out / in |
| M | Toggle audio |
| G | Toggle normal / performance graphics |
| P or Escape | Pause |

## Controller

Browser Gamepad API, Standard layout:
- Left stick: move
- A / Cross (button 0): pass
- B / Circle (button 1): shoot or tackle
- X / Square (button 2): cross
- Y / Triangle (button 3): through ball
- LB / L1 (button 4): switch
- RB / R1 (button 5): sprint
- LT / L2 (button 6): jockey

Connect a controller before starting the match and keep the browser tab focused.

## Deploy to Vercel without Node.js

1. Go to https://vercel.com/new.
2. Import the GitHub repository `jdarkyeka6/StrikerFC26`.
3. Choose **Other** as the framework preset.
4. Keep the root directory as `./`, with no custom build or output commands.
5. Deploy. When Git integration is configured, subsequent pushes to `main` update the website.

The prototype is a self-contained `index.html`; it loads Three.js from jsDelivr, with esm.sh as fallback. Internet is still required.

## Reality check / next steps

This is an original **arcade football prototype**, not a clone of FIFA/EA Sports FC. Realistic player mocap, advanced physics, fouls/offsides, leagues, menus, career mode, multiplayer, commentary, goal celebrations and full controller rebinding are **not implemented yet**.

Upcoming priorities: more authentic football movement, better AI tactics, realistic crowd/lighting/assets, goal celebrations, goalkeeper animation and a full match flow.

This project is independent and is not affiliated with FIFA or EA SPORTS.
