# STRIKER FC 26 · Release notes

## Version 1.3.0 · ANIMATION UPGRADE (15 October 2026)

Player bodies are now more expressive without losing the game's lightweight single-file structure.

- New elbow, knee, ankle and head pivots on all 22 players; jersey numbers follow torso rotation.
- Speed-dependent running, sprinting, idle blending, stride offsets, acceleration/turning poses, and reactive upper-body motion.
- Separate animated kicks for passing, through balls, shooting and crossing; anticipation and follow-through.
- Low-reaching tackle animation and first-touch ball-control stance.
- Goalkeeper diving/catching/parrying/kicking now use jointed arms and legs.
- Replays record and interpolate all new joint rotations in addition to the existing player and ball positions.
- Reset new animation states at kickoff to prevent stuck limbs and stop all players running in sync.

**Verification:** 34 targeted animation and gameplay checks passed, including replay frame reconstruction, active shots, stamina-independent motion, and stable articulated poses. WebGL browser visual testing remains recommended.

---

## Version 1.2.0 · MOUSE CONTROLS (15 October 2026)

Optional mouse support alongside existing keyboard and gamepad controls.

- Left-click hold/release: charged shooting; left-click while defending: tackle.
- Right-click: pass. Middle mouse: through ball.
- Mouse back (M4): switch player. Mouse forward (M5): cross.
- Scroll wheel: zoom the camera in/out.
- Mouse controls on/off checkbox in match setup and pause menu.
- Mouse actions activate only on the playable pitch, and the right-click menu is suppressed only during live play.
- All earlier V1.1 features, including the referee, goal replays and Matchday setup, are preserved.

Verification: 15 targeted input tests passed. Real browser/hardware testing remains advisable for M4/M5, which some browsers or mouse drivers may intercept.

---

## Version 1.1.0 · THE REFEREE UPDATE (15 October 2026)

Reviewed and merged Claude's V1.1 referee system. The existing V1.0 Matchday game remains intact.

### New features
- Contact-based fouls, free kicks and penalty kicks.
- Yellow cards, second-yellow red cards, and sent-off players removed from active play.
- Opposing defensive walls/position freezes during set pieces.
- Match Centre: fouls and card totals.
- Free Training remains without referee calls.

### Review fixes
- Prevented a penalty taker from running off with the ball.
- Blocked passes/crosses while taking a penalty, while preserving charged shots.
- Kept the ball stationary at the penalty/free-kick location until kicked.
- Prevented sent-off players from being reselected or tackling.
- Made players' set-piece controls clearer without changing the game's default Beginner difficulty.

### Verification
- JavaScript syntax and file/DOM structure checked.
- 12 targeted checks passed, including three completed full-match simulations.
- Verified goalkeeper, halftime, replay, match statistics, training, and difficulty features remain in the merged build.
- Real-browser WebGL visual testing is still pending.

---

## Version 1.0.0 · MATCHDAY (15 October 2026)

**Major gameplay and presentation upgrade** to the standalone browser football game.

### NEW: Custom Match Hub
- Choose six fictional clubs with colour-matched player kits, scoreboard names and replay labels.
- Pick the match length: 4, 8 or 12 minutes.
- Four stadium conditions: Daylight, Golden Hour, Night Game and Rainy Night. Rain has animated effects; G enables lower-graphics mode.
- Three tactics: Balanced, All-Out Attack and Park The Bus. Switch with 1/2/3 during play or use the tactic selector at halftime.
- Retain all four AI difficulty levels, Beginner through Legend.

### NEW: Match presentation & modes
- Half-time break with scores and match statistics, followed by a second-half kickoff.
- Animated goal celebration sequence before goal replays.
- Detailed live/post-match match centre including possession, shots, saves, passing accuracy, and successful tackles.
- Free Training mode without opponent players or a time limit. It uses the game's dribbling, passing, shooting, goal celebrations and replays, and does not affect season records.
- Locally saved club win/draw/loss records in browser storage.
- Quit to match setup through the pause menu to choose a different fixture.

### Existing features carried forward
- FIFA-inspired close broadcast tracking camera, full 105x68m equivalent pitch, 22 animated footballers, goalkeeper kits and diving animations.
- Shot and pass mechanics, crosses, jockeying and tackles.
- Replays automatically after goals, with a post-match goal/save highlights reel.

### Verification
- JavaScript module syntax checked.
- 21 simulated integration checks passed for match configuration, live match, halftime, celebration/replay flow, statistics and persistent records.
- 10 simulated Free Training checks passed for no-opponent gameplay, unlimited play, goal-to-replay-to-kickoff, and return to menu.
- Final HTML audit: 60 unique DOM IDs, no duplicate IDs and no missing IDs referenced by game code.
- Real browser GPU/WebGL playtesting remains necessary.

**Deployment:** The project is a static `index.html`. It is designed to deploy from GitHub to Vercel with Framework: Other and no build command. A Vercel deployment is not guaranteed to exist solely because this release is committed.

---

## Earlier versions
- **0.9:** Goal replays and highlight reels
- **0.8:** Animated goalkeepers
- **0.7:** Adjustable AI difficulty
- **0.6:** Broadcast follow-camera
- **0.5:** Full-size pitch and improved formations
- **0.4:** Matchday presentation, controller support and restarts
- **0.3:** Dribbling, passing, tackling and shot controls

Independent, original project. Not affiliated with FIFA or EA SPORTS.
