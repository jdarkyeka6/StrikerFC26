# STRIKER FC 26 · Release notes

## Version 1.8.0 · MATCHDAY STABILITY (16 October 2026)

- Fixed corner kick positions after a defender dribbles the ball over their own goal line.
- Unified loose-ball and carried-ball end-line restart calculations.
- Cleared stale pass, offside, manual-target, spin, and release tracking on restarts and kickoffs.
- Locked team selection and match duration during pause while preserving tactical adjustments.
- Blocked paused-match replacement through the Club Hub or Free Training entry point.
- Restored normal Tab, arrow and Space keyboard behaviour in menus and dropdowns.
- Fixed old introduction and full-time text sticking around when beginning or quitting a match.
- Advanced the offline cache version to v1.8.0 in both playable builds.
- Added repeatable offline/web regression tests and a manual QA plan.



## Version 1.7.2 · PASSING & KEEPER POSSESSION FIX (15 October 2026)

- Blocked free possession steals caused by pressing Shoot/Tackle beside a goalkeeper holding the ball. Standing, sliding and in-progress tackles cannot dispossess a holding goalkeeper; normal goalkeeper passing remains enabled.
- Rebalanced passes with realistic distance-dependent ground-ball speed, reduced aim errors, fewer overshot through balls and more accurate safe landing points.
- Fixed auto-receiving while the user continues holding a movement direction from the passer. Manual steering can still intentionally override the run.
- Verified targeted home/AI ground passes, through balls and touchline receptions.
- Updated the standalone offline.html to contain the same corrected gameplay engine as index.html, and advanced the offline browser cache to v1.7.2.
- Preserved all V1.7 Total Football features and deferred player packs.

**Verification:** 37 automated checks passed including a complete 240-second simulated match with halftime, goals and replays. Real browser/WebGL playtesting remains outstanding.

---

## Version 1.7.1 · FULL OFFLINE PLAY (15 October 2026)

Striker FC 26 can now play **completely without internet after the game has been downloaded**.

- Changed the 3D engine import to the **local Three.js r180** modules (`vendor/three.module.js` and `vendor/three.core.js`), removing the jsDelivr and esm.sh CDN requirement.
- Removed the Google Fonts network import and replaced it with locally available system fonts.
- Added `offline.html`, a standalone approximately 2.2 MB single-file version with the entire 3D renderer and game embedded. This works by opening the downloaded HTML file directly, with no server or connectivity.
- Added a versioned `sw.js` service worker that pre-caches the game's HTML, engine modules, manifest and icon on HTTPS/localhost and handles offline navigation.
- Added `manifest.webmanifest` and `icon.svg` for installable browser-app presentation.
- Added an in-game offline readiness indicator, accurate loading failure messages and an MIT-license copy at `vendor/THREE_LICENSE.txt`.
- Preserved all V1.7.0 Total Football features, original players, gameplay controls, free training, substitutions, stadiums, goals and replays.
- Packs remain deferred.

**How to play:** Download and open `offline.html` for immediate offline play; or visit the deployed site online once, confirm **OFFLINE READY**, then reload it later without internet. Browser offline caching depends on service worker support and storage not being cleared. To run `index.html` from a downloaded repository, use a local HTTP server instead of a `file://` URL.

**Validation:** JavaScript syntax, bundled engine presence, the absence of external runtime dependencies, local references and service worker install/fetch logic were checked. A real-browser air-gapped playtest is still advisable.

---

## Version 1.7.0 · TOTAL FOOTBALL (15 October 2026)

Major gameplay expansion delivering all seven requested improvements:

1. **Advanced shots:** Finesse shots have a curving flight, chips are lofted, and low-driven finishes fly flatter and faster. Separate player follow-through actions and keyboard/gamepad modifiers are available.
2. **Headers and aerial battles:** Jumping contact on crosses, defensive header clearances, manual volleys and bicycle kicks. Airborne balls cannot be collected automatically by the normal ground-touch logic.
3. **Five skill moves:** Stepovers, lateral ball rolls, fake shots, roulette turns and drag-backs with a real burst of directional movement, animation, stamina cost, short shielding and anti-spam cooldowns.
4. **Smarter defensive control:** Jockeying toward goal-side space, extra teammate contain to close inside passing lanes, and directional Q switching.
5. **First-touch animations:** Ordinary, trapped and stretched receptions plus body rotation and ball cushioning in the receiver's running direction.
6. **Manual goalkeeper rushing:** Hold U (or controller View/Back) to advance your goalkeeper when threatened by a carrier. Existing difficulty-dependent save chances remain.
7. **Set pieces:** Horizontal aiming, vertical elevation, runner cycling, selectable corner deliveries, organised three-player free-kick walls and away-team AI corner delivery.

**Controls:** Z finesse, X chip, B driven; H header, Slash volley, N bicycle; keys 4–8 for skills; F jockey, Y teammate contain, U goalkeeper rush; J/L and I/K aim/elevation and O cycle runner on dead balls. Camera zoom moved from Z/X to bracket keys **[ / ]**. Existing Space shoot, E pass, R through ball, T cross, V slide, Q switch, formations, pause and mouse controls remain.

**State fixes:** Starting a new match or kicking off resets skill cooldowns, aerial cooldowns and ball spin; corner elevation affects real ball flight. Older saved game data is unaffected.

**Testing:** 41 mocked Three.js/gameplay checks passed across two rounds, including distinct shot paths, five skill moves, three aerial contacts, keyboard shots, free kicks, corner crosses, goalkeeper rush and a complete 240-second simulated match with halftime, goals and instant replays. Real browser/WebGL feel and performance testing are still recommended.

**Packs:** Remain postponed; no pack probabilities, opening, ownership or monetisation added.

---

## Version 1.6.3 · GOALKEEPER DIFFICULTY BALANCE (15 October 2026)

- Significantly reduced the opposing goalkeeper's save rate on Beginner, with clear progression through Amateur, Professional and Legend.
- Keeper anticipation, positioning speed, dive width and one-on-one rushing are now explicitly linked to difficulty.
- One-on-one smothers are genuine skill-based contests instead of guaranteed catches. Failed attempts trigger recovery to prevent repeated instant saves.
- Shot stopping now accounts for goalkeeper ratings, difficulty, shot height and pace, angle and distance to impact.
- Reduced guaranteed catches and physical dive reach. Even Legend goalkeepers can be beaten by properly placed shots.
- Home goalkeeper performance also scales moderately with difficulty. Existing pass assists, sliding tackles, cards, teams and replays retained.

**Verification:** Four real game-engine simulation cases resolved shots across every difficulty, all keeper probability progression checks passed, and a 240-second simulated match with halftime completed. Real WebGL browser testing remains pending.

---

## Version 1.6.2 · ASSISTED PASS RECEIVING (15 October 2026)

- Players automatically run to intercept passes and through balls using a predicted ball-flight path and their own movement speed, rather than aiming only 0.2 seconds ahead.
- Immediate home-team control switching to the intended recipient is retained. Auto-reception works with no movement input, while manual steering overrides assistance when deliberately moving away.
- Both home and away AI receivers prioritize the pass over formation movement until they meet the ball or the assist expires.
- More forgiving but bounded first-touch radius, dynamic pass lifetime for longer flights, and intended pass targets away from touchlines.
- Crosses and set pieces correctly start and clear receiver-tracking timers; ordinary tackles, offsides, interceptions, slide tackles, clubs and replays remain active.

**Testing:** Simulated home and away passes, through balls and sideline receptions all succeeded. Manual-input override worked. A complete 240-second match finished with halftime and stable game state. A real-browser WebGL playtest is still recommended.

---

## Version 1.6.1 · SLIDING TACKLES (15 October 2026)

New defensive skill move with meaningful timing and consequences.

- **V** on keyboard, **Shift + left-click** over the pitch, or **R3** on a standard gamepad (button 11) starts a manual slide tackle. The regular Space/left-click standing tackle is unchanged.
- Separate grounded, full-body slide animation with an extended boot, hip drop, bracing arms and recovery, including when winning possession.
- Slide direction locks at initiation. Momentum lasts about 0.70 seconds, with a 0.45-second active ball-contact window.
- Clean ball-first contact can win the football and keep the prior short first-touch grace period.
- Sliding costs 15 stamina, and the 2.15-second cooldown prevents spam. Misses take time to recover from.
- Player-first rear contact at speed can award an actual foul or yellow card. No random foul dice rolls; a whistle stops the slide.
- Slide state is cleared on new kickoffs. Preserved all earlier tactical AI, player identities, Clubhouse, animations, goalkeeper logic and replays.

**Testing:** Grounded live-slide animation/possession and passing tests passed; intentionally missed sideways sliding caused no tackle or phantom foul; seven isolated contact-decision and foul checks passed; a complete 240-second match after an active slide reached full-time with halftime, goals and replay transitions. Actual WebGL browser/hardware testing remains pending.

---

## Version 1.6.0 · GAMEPLAY REVOLUTION (15 October 2026)

Implemented **all five critical systems** identified in the V1.5.2 gameplay review.

1. **Tackling and possession:** Defensive-attribute-based reach, ball-contact checks and orientation-aware wins; short recoveries after clean tackles retained so players cannot be instantly retackled.
2. **Dribbling and physics:** New per-player dribbling attribute, inertia-based foot control, skill-dependent dribble gaps, fast-touch pressure mistakes, genuine released loose balls and distinct drag for travelling shots.
3. **Passing mechanics:** More directional control, timed receiver leads, better through balls, pressure/skill pass error, stronger preference for open passing lanes, and new **Shift+E / Shift+right-click driven passes**.
4. **Opponent AI:** Goal- and time-aware pressing, predicted defensive pressure, central lane coverage, offside-conscious attacking runs, progressive passing and shooting decisions, and more assertive forward carries.
5. **Goalkeeper intelligence:** Anticipatory position adjustment, one-on-one rushing and smothers, goalkeeper-rating-based shot saves, improved catches and parries away from danger.

Kept the six original clubs, 96 permanent profiles, full Clubhouse UI, pause/substitution menus, referee, formations, stadiums, celebration/replay pipeline, training, all difficulties and controller/mouse support.

**Testing:** JavaScript syntax and DOM references passed; targeted simulated tests covered tackle outcomes, dribbling loose-ball velocity, passing options, AI shooting, goalkeeper shot reaction, scored-goal transitions and replay recovery. One full 240-second simulated match completed with halftime and stable player/ball positions. A real browser/WebGL visual/performance playtest remains to be completed.

---

## Version 1.5.2 · BALL-WINNING TACKLES (15 October 2026)

- Successful tackles now provide a brief 0.64-second secure first touch, preventing immediate counter-tackles by the dispossessed player or another defender.
- The beaten ball carrier has a 0.68-second stumble/recovery animation and temporary tackling cooldown.
- The winning tackler can accelerate and pass/shoot right away.
- Ball releases, ordinary interceptions, new matches and restarts clear stale protection. Normal defending resumes afterward.
- Kept all V1.5 Clubhouse, previous V1.5.1 refereeing, squads and replay systems.

**Verification:** 16 targeted and integration checks, including one full simulated four-minute match and halftime, all passed. Real browser visual testing remains outstanding.

---

## Version 1.5.1 · REFEREE FAIRNESS HOTFIX (15 October 2026)

- Replaced random 45–80% foul decisions on some tackles from behind with contact-based checks.
- Replaced random yellow-card rolls with deterministic checks for unusually forceful rear tackles that miss the ball.
- CPU teams now avoid initiating clear tackles from behind, reducing arbitrary stoppages.
- Clearer explanations appear on-screen for fouls and cautions.
- Clean front tackles, side challenges, slight contact and ball-first tackles remain legal. A second yellow still triggers dismissal.
- All previous Clubhouse, player identities, substitutions, AI difficulty, penalties, offsides and replays remain intact.

Verification: 15 targeted checks passed, including a complete four-minute simulated match. Real-browser visual testing is still recommended.

---

## Version 1.5.0 · CLUBHOUSE & PLAYERS (15 October 2026)

Major UI and character-identity update.

- **Full main menu:** Home dashboard, Play Match, My Squad, Club Hub, Settings, and reserved Packs screen.
- **96 permanent original footballers:** Six original clubs, with 16 named players each, stable IDs, shirt numbers, ages, positions, nationalities, heights and football ratings.
- **Squad cards:** Identifiable illustrated portraits, 11-starter/5-bench roster browsing, position filters, expanded player details and six attribute ratings.
- **True roster selection:** Club selection updates the actual 3D players, not only their shirt colours. Hair, skin, height and shirt numbers reflect the corresponding card.
- **Persistent substitutions:** Each club has its own five substitutes with stable identities. Joining the pitch updates a footballer's appearance, name and attributes together.
- **Player ability differentiation:** Player pace, passing and finishing influence the game slightly while retaining all existing difficulty settings.
- **Historical replay identities:** Replay frames store who was playing, so watching an older goal after a substitution does not display the wrong character.
- **Packs deferred:** A noninteractive, coming-soon destination appears in the menu. No pack inventory, ownership, opening system, rarity mechanics, probability tables or purchasing features have been built.
- All V1.4 match systems, referee, AI, weather, free training, animation and gamepad/mouse/keyboard controls retained.

**Testing:** 26 targeted Clubhouse/player tests and 12 replay/match regression tests passed. Real browser rendering and performance remain to be assessed.

---

## Version 1.4.0 · FOOTBALL IQ (15 October 2026)

A major tactical and match-management update for Striker FC 26.

- **Three real formations:** 4-3-3 Wide, 4-4-2 Two Strikers and 4-2-3-1 Control. AI and teammate roles adapt to the shape. Switch in match setup or at halftime.
- **Five substitutes:** A named five-player bench with unique shirt numbers and player attributes. Make substitutions while paused or at halftime. Each player/bench slot can only be used once, and the game allows five total.
- **Fatigue that matters:** Stamina no longer resets after every goal or kickoff. Running and sprinting affect match energy and speed. Half-time restores some energy, while substitutes arrive fresh and slightly faster.
- **Visible stamina:** Live energy percentage and a color-changing stamina bar in the controlled-player HUD. Match Centre includes substitutions and average energy.
- **Simplified offsides:** Pass-time second-last-defender checks on directed passes and crosses, with offside awarded on receipt, an ensuing free kick, basic restart exemptions, and AI receiver selection that avoids offside runs.
- **Continuity:** Existing goalkeepers, fouls and cards, penalties, controls, difficulty, custom clubs, animations and instant replays remain.

**Verification:** 25 targeted logic and match-management checks passed, plus complete 240-second simulated matches with each formation. All three finished and reached halftime normally. No NaN player positions or invalid stamina states. Full browser/WebGL visual tests remain outstanding.

---

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
