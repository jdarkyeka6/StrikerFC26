# Striker FC 26 ⚽

An original browser-first 3D football game. **Pre-alpha 0.3** has full 11v11 arcade matches.

## Gameplay in 0.3

- **Smoother dribbling**: improved acceleration, turning, momentum and ball touches.
- **Directional passing**: pass selection weighs your movement direction, open receivers and intercepted passing lanes.
- **Through balls**: lead a teammate into space.
- **Smart receiving**: pass recipients run toward the ball when not being manually steered.
- **Switching**: Q cycles nearby teammates; team possession returns control to the carrier.
- **Defending**: limited pressing players, timed tackles, recovery/cooldowns and jockey movement.
- **Charged shooting**: hold Space to build shot power, release to shoot toward the goal.
- **Full-field broadcast camera** with smoother tracking, plus a toggleable classic perspective.
- **11v11 formation AI** with attackers, midfielders, defenders and goalkeepers.
- 4-minute matches, scoreboard, minimap and restart.

## Controls

| Key | Action |
| --- | --- |
| WASD / arrow keys | Move (camera-relative in broadcast or classic view) |
| Shift | Sprint |
| E | Directional pass |
| R | Through ball |
| Hold and release Space | Charge and shoot while possessing the ball |
| Space | Timed tackle while defending |
| F (hold) | Jockey while defending |
| Q | Cycle nearby players / return to ball carrier |
| C | Broadcast/classic camera |
| P / Escape | Pause |

## Deploy to Vercel without installing Node.js

1. Open https://vercel.com/new.
2. Import the GitHub repository `jdarkyeka6/StrikerFC26`.
3. Framework preset **Other**; root directory `./`.
4. Leave Build Command and Output Directory empty/default for a static HTML deployment.
5. Deploy. Future pushes to `main` deploy automatically when Git integration is connected.

The entire current prototype lives in the root `index.html`. It requires an internet connection to load Three.js from jsDelivr; networks that block the CDN can prevent gameplay.

## Status and known limits

This is an arcade football prototype, **not** a complete FIFA/EA Sports FC replacement. It has no offside, fouls, substitutions, realistic character animations, multiplayer or full career mode yet. Directional passes and possession are simplified and will need real-device playtesting.

Independent original game project; not affiliated with FIFA or EA SPORTS.
