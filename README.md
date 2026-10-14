# ⚽ Striker FC 26

An original browser-first, 3D football game in **pre-alpha 0.9: INSTANT REPLAYS & MATCH HIGHLIGHTS**.

## Replays and match highlights (NEW in 0.9)

- **Instant goal replays:** Every goal automatically triggers a closer, slower TV-style replay of the preceding action. The match clock pauses while it plays, and the next kickoff only starts after the replay or a skip.
- **Post-match highlight reel:** The full-time panel offers **WATCH MATCH HIGHLIGHTS** if any goals or saves were recorded. Watch a selection of the last six goals or notable saves.
- **Real recordings:** The game samples the positions and animated poses of all 22 players, plus the ball, at 12 frames per second using a rolling 8-second buffer. Replays interpolate the samples for smoother playback.
- **Big saves:** Significant goalkeeper catches and parries are saved for the final reel rather than automatically interrupting live play.
- **Replay controls:** Press **R**, **Escape**, **Space**, or **Enter** to skip, or click/tap **SKIP REPLAY**.
- **Replay status:** A visible replay banner, event label, and progress indicator appear during playback.
- Highlights are kept in memory for the current match. They are not exported as video files and are cleared when you start another match.

## Goalkeeper animations (NEW in 0.8)

- Goalkeepers wear contrasting kits with visible gloves and long sleeves.
- In the ready stance, they bend their knees, bounce slightly and hold their hands out for a shot.
- When a shot approaches, they anticipate it and dive left or right with full-body tilt, sideways movement, extended hands and legs.
- Clean low saves crouch into a two-handed catch, with the ball visually held near the gloves.
- Harder saves get parried back into play, and missed dives also have their own motion and recovery.
- Goalkeeper distribution has a kicking motion.
- Saves respect the selected difficulty. Shots no longer auto-stick to a goalkeeper through generic loose-ball pickup logic.

These are procedural arcade-style animations, not professional motion-capture animations.

## Match difficulty (NEW in 0.7)

Choose the difficulty before starting a game, or change it any time while **paused (P / Escape)**. The HUD displays your current difficulty. **Beginner is the default**.

| Difficulty | What it changes |
| --- | --- |
| Beginner 🟢 | Slower opponents, only one presser, rare tackles, forgiving shots/passes, weaker opposition keeper and stronger support from your teammates |
| Amateur 🔵 | Casual football with some pressure, more accurate opponents and modestly quicker decisions |
| Professional 🟠 | Faster press, two defenders closing the ball, sharper passing and more dangerous shots |
| Legend 🔴 | Maximum pressure, quick decisions, accurate passing, stronger opponent keeper and aggressive finishing |

The modes change real AI behaviour (speed, pressers, tackling, decision delay, shot/pass quality, keepers) rather than just changing labels. Results vary by player performance.

## What's playable now

- Full 11v11 football on a 105 × 68 metre equivalent pitch (136 × 210 world units)
- Smaller proportionate player and ball models, making the field feel genuinely full-sized
- Re-spaced 4-3-3 formations: wider wingers and full-backs; separated attacking, midfield and defensive lines
- Tactical players shifting forward with possession and dropping back without it, rather than gathering around the ball
- FIFA-inspired broadcast camera brought closer to the pitch: it smoothly tracks the ball and controlled player, with forward movement look-ahead
- Full-size pitch and spaced formations retained; zoom is still adjustable with Z / X
- Humanoid player models with shirts, numbered kits, animated running legs and arms, and on-pitch selection markers
- FIFA-style sideline broadcast camera with adjustable zoom; an optional classic camera
- Dribbling, sprinting, aim-assisted passes, through balls, lofted crosses, charged shooting, jockeying, timed tackling and player switching
- Goalkeepers that react to shots and can make saves (and can be beaten!)
- Throw-ins, corners, goal kicks, goal scoring, basic kickoffs and a four-minute match clock
- Scoreboard, 2D minimap, match messages, possession / shot / save statistics, basic audio cues, automatic goal replays, and post-match highlights
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
