# ⚽ STRIKER FC 26 | VERSION 1.7.2

**Original browser-first 3D football game** built for keyboard or controller, with no local Node.js installation needed. Version 1.7.2 fixes passing and the held-ball goalkeeper exploit while preserving complete offline support, the standalone HTML and browser caching from V1.7.1. The existing six-club Clubhouse and all earlier systems remain.

## ⚽ Version 1.7.2: Passing and goalkeeper possession fixes

### Passing
- More accurate **intended targets**, with a stronger directional preference and onside recipient selection.
- A **distance- and friction-based launch speed** so medium-range passes no longer overshoot players as frequently. Through balls keep a useful lead without blasting into the stands.
- Reduced passing error and clamped aiming locations well inside touchlines.
- Faster interception forecasts, more time to chase difficult through balls and automatic movement for both AI and player-controlled receivers.
- Holding the passer's old movement key no longer pulls the newly selected receiver away from the ball. Deliberately change direction, or release and repress a movement key, to take manual control.

### Held-ball goalkeeper exploit
Previously, pressing Shoot/Tackle near a goalkeeper holding possession could trigger an ordinary tackle that stole the ball even though keeper-contact fouls were disabled. That loophole is closed for standing tackles, sliding tackles and tackles already in progress. Keepers can still distribute the ball and opponents can intercept after the release.

### Testing and offline parity
**37 checks passed**, covering goalkeeper possession, distribution, home/AI passes, through balls, wing passes, manual reception overrides and a full 240-second match including halftime, goals and replays.

Both the website game (index.html) and the downloadable one-file offline game (offline.html) contain this version. Browser offline caches are refreshed by service-worker version v1.7.2. Download offline.html and open it directly for play without a network connection. A real Chrome/Edge WebGL playtest with Wi-Fi disabled is still recommended.

## 📡 Version 1.7.1: Completely offline playable

**Internet is not required to play after you have downloaded the game.** There are two ways to do it.

### Easiest: Download just one offline HTML file

1. In this repo, open [offline.html](./offline.html) and select **Download raw file** (or download it from GitHub with internet once).
2. Save the complete `offline.html` file to your PC.
3. **Double-click `offline.html`** in Chrome, Edge or another desktop browser.
4. Play without Wi-Fi, a local server, npm or any internet connection. The file contains the entire game and the full official Three.js r180 engine. Its size is approximately 2.2 MB.

**Do not double-click `index.html` alone.** That file uses a local JavaScript module in the `vendor/` directory. Browser security restrictions often prevent loading such modules from a `file://` URL. Use `offline.html` for the simple double-click option.

### Website / installable offline version

1. Open the **deployed** Striker FC website once while online, using a secure HTTPS address (or localhost).
2. Keep the page open until the game displays **OFFLINE READY · GAME CACHED ON THIS DEVICE** in the Play Match menu. The service worker downloads and stores the entire engine, page, icon and app manifest.
3. You can now disconnect the internet and reload the **same website address** in that browser on that device to play. If supported, use your browser's **Install App** command to give it its own app window.

A new device, different browser, cleared website storage or private browsing mode may require the initial online visit again. Offline cache installation requires the site to be deployed with `sw.js`, `vendor/`, `icon.svg` and `manifest.webmanifest` from this repository.

### Develop locally without internet

You can also download the complete repository as a ZIP, extract it and serve the folder from a local machine:

```bash
python -m http.server 8765
```

Then open `http://localhost:8765/index.html`. This uses only files in the repository; no remote dependencies or package installs are required (other than having a local Python installation). Alternatively, open `offline.html` directly with no server.

### What's packaged

- Original full **V1.7 Total Football** game, six teams, 96 consistent characters, match modes, goals, replays, skills and goalkeeper balancing
- Official **Three.js r180** engine in `vendor/three.module.js` and `vendor/three.core.js`, with its MIT license
- The standalone `offline.html` file with the engine bundled into the page
- Same-origin service worker `sw.js` for HTTPS/localhost browser caching
- Local/system fonts in place of remote Google Fonts
- Web app manifest and offline SVG icon

**Packs are still reserved for a future update**, with no pack-opening functionality. The site version and the standalone HTML do not need Google Fonts, jsDelivr, esm.sh or any network requests to run a match.

**Testing:** Code syntax, local asset resolution and service worker cache configuration were checked. A real visual offline browser test across every browser has not been completed. `offline.html` is built as an inline script with no remote dependencies.

## ⚽ Version 1.7.0: TOTAL FOOTBALL

Seven upgrades have been integrated into the original browser game. The existing 96 permanent players, six clubs, four difficulties, fatigue, referee, goals, substitutions, assisted passing, replays, controller and mouse support remain. **Packs remain a placeholder and are not implemented.**

### 1. Advanced shot types

Besides charging a standard shot with **Space / left-click**, players can use:
- **Z: Finesse shot**, less power and controlled lateral curve
- **X: Chip shot**, reduced pace and a high trajectory to lift over a keeper
- **B: Low-driven shot**, more speed and a much flatter trajectory

Shot type affects real ball velocity, loft and (for finesse) spin through flight, with matching player movement. Holding the gamepad's L2 / LT, R2 / RT, or R1 / RB modifier when releasing a charged shot can also select finesse, chip or driven, respectively, depending on standard controller button mapping.

**Changed control:** Camera zoom has moved from **Z/X** to **[ / ]** to avoid overlapping with new shot types.

### 2. Headers and aerial battles

- Players jump to meet airborne crosses and clear high balls defensively, rather than catching them at chest height as a ground reception.
- The aerial-contact system judges real ball height and proximity, with a brief re-contact cooldown to prevent unrealistic repeated hits.
- **H** manually attempts a header; **/** attempts a volley; **N** attempts a bicycle kick while near a reachable airborne ball.
- In attacking positions, well-timed aerial contacts become shots; near their own goal, automatic headers clear danger.
- Player poses include leaping, extended legs, upper-body rotation and first-touch follow-through.

### 3. Five skill moves

These moves require possession and consume stamina. They apply a real player momentum change and have a per-player cooldown. They are not guaranteed to evade defenders.

| Key | Skill | Effect |
|---|---|---|
| **4** | Stepover | Forward movement with a sideways feint |
| **5** | Ball roll | Quick lateral movement |
| **6** | Fake shot | Shoulder and foot feint with a change of lane, **without actually kicking** |
| **7** | Roulette | Spinning escape move with lateral momentum |
| **8** | Drag-back | Pull away from the forward direction |

A nearby defender's tackle may be slightly harder for a short moment after a well-executed skill, but opponents can still win the ball.

### 4. Smarter defensive controls

- **Hold F** (or controller left trigger) to jockey with improved goal-side positioning when not manually moving.
- **Hold Y** (or controller right trigger, when out of possession) for teammate contain. The nearest other teammate covers the carrier's inside lane rather than blindly doubling the ball.
- **Q + a held movement direction** attempts to switch to a defender in that direction, while plain Q retains the closest-player cycle.
- Defenders keep their existing pressure, clean-tackle and slide-tackle logic.

### 5. First touches

Incoming ground and lofted passes trigger different procedural receiving poses: ordinary control, high-ball trap or stretched reception for fast passes. Players can turn their upper body and cushion the ball toward their own running path. The V1.6.2 predictive receiving-run assistance still operates; deliberate player steering can override it.

### 6. Manual goalkeeper rushing

Hold **U** while defending to command your own goalkeeper out toward the attacking ball carrier, bounded to a sensible range from the goal. Release U to return to normal positional decisions. On a standard controller, **hold View / Back (button 8)**. This does **not** guarantee a save: dive reach, smother probabilities, reaction and recovery still obey the difficulty system.

### 7. Advanced set pieces

- When taking a free kick, penalty or corner, **J / L** adjust horizontal aim and **I / K** raise or lower kick height.
- **O** cycles a target runner. Normal **E** passes, **Space** shots and **T** crosses still take the restart.
- Free kicks form a three-player wall for the defending side, with other players backing away from the dead-ball spot.
- Corners let you select a runner before crossing, and the chosen elevation modifies actual ball flight.
- Player movement pauses for the dead-ball restart where appropriate, and the AI can take away-team free kicks and corners.

### Verification and caveats

A mocked Three.js/game-engine regression suite passed **41 checks in two test rounds**, including separate shot trajectories, all five skill-move impulses, headers/volleys/bicycle kicks, actual keyboard shot control, free-kick aiming, corner delivery, goalkeeper rush and a complete simulated four-minute match with halftime, goals, celebrations and replays. Syntax and UI ID references were also validated.

These are browser-first procedural arcade systems, not motion-captured FIFA gameplay. **Real hardware/browser WebGL testing and balance tuning remain outstanding.** In particular, touch timing on aerial balls and player control feel are best evaluated through actual play.

## 🥅 Version 1.6.3: Goalkeeper balancing and difficulty scaling

The keepers are no longer superhuman, especially on lower difficulties. The **opposing goalkeeper** gets significantly better on each difficulty level; the **home goalkeeper** becomes a little weaker at higher levels, but still has real saving ability.

- **Beginner:** The opposing goalkeeper covers less of the goal, reacts more slowly, makes significantly fewer saves and is less successful at rushing out to smother a striker.
- **Amateur:** A forgiving keeper with somewhat better positioning, saves and one-on-one timing.
- **Professional:** Balanced goalkeeper reflexes, movement speed, shot-stopping and catches.
- **Legend:** Quicker positioning, greater diving reach and better goalkeeping, but never an automatic save. Well-placed corners and hard shots can beat them.
- **One-on-ones:** Previously, a close goalkeeper automatically smothered many attackers based on a fixed rating check. Now the goalkeeper gets one difficulty- and skill-adjusted contested attempt, and a failed smother triggers a recovery cooldown instead of another immediate grab.
- **Shot stopping:** Save odds scale with actual goalkeeper rating, relative difficulty, shot speed, shot height, impact location and physical distance from the goalkeeper. The goalkeeper cannot make a long-distance catch from the other side of the goal.
- **Handling:** Fewer shots are caught cleanly; difficult saves can be parried instead.

### Example probabilities, not match-wide statistics

The following are calculated save chances for a representative 80-GK-rating goalkeeper, low central shot, speed 82 game units and a well-positioned keeper:

| Difficulty | Opposing goalkeeper saves |
|---|---:|
| Beginner | 9% |
| Amateur | 16% |
| Professional | 24% |
| Legend | 31% |

These are *per-shot model probabilities*, not claims about actual observed match save percentages. Shot placement, keeper movement, shot pace and height alter the outcome.

### Tests

- Four difficulty-scoped in-game shot simulations confirmed goalkeeper dive animations and shots ending in saves or goals.
- A complete simulated 240-second match with halftime finished without invalid state.
- Keeper probability, diving reach, opponent smother ability and user keeper difficulty all followed the intended monotonic difficulty curve.
- Real browser/WebGL visual testing and live gameplay balancing are still recommended.

## ⚽ Version 1.6.2: Assisted passing and first touches

This update improves the pass receiver's movement, inspired by the smooth automatic receptions of modern football games. **When you make a pass, the recipient runs to meet the ball without needing to be steered into its path manually.** Player switching and manual control still work.

- **Predictive interception:** Each frame, the receiving player calculates candidate interception points along the *actual moving ball trajectory*, taking ball friction, ball velocity, remaining pass time and player pace into account. It chooses an early reachable position and moves to meet the ball.
- **Faster reactions:** Intended receivers temporarily prioritise the pass over their usual formation positions, press runs and tactic-speed limits. Animation and acceleration remain physical rather than teleporting the character.
- **Automatic player switching:** When a home-team player passes to a teammate, the selected footballer changes to the intended receiver. The receiving player runs automatically with no input.
- **Manual movement stays available:** Holding a direction steers the receiver normally; deliberately moving away from the interception path overrides the assistance immediately. Assistance smoothly blends when steering toward the pass.
- **First-touch collection:** The intended recipient has a modestly more forgiving, realistic reception zone (3.75 instead of 3.5 game-world units), but defenders can still intercept and offsides still count.
- **Pass timing and touchline safety:** Receiving runs remain active longer for long passes, and normal/through pass aiming keeps intended touch points a bit farther inside the field.
- **Crosses, kickoffs and restarts:** Crosses also start assisted receiving movement. Kickoffs, set pieces, loose heavy touches, and possession changes clear old pass targets and timers.

### Verification

- A live simulated home pass found its automatically controlled receiver and registered completion **0.45 seconds after the kick**, with no user movement input.
- Four isolated game-flow checks completed **home normal passes, AI-to-AI passes, through balls and passes near the sideline** with the intended receiver collecting the ball; the offside system was left active.
- An opposite-direction movement test confirmed **manual steering overrides the receiving run**.
- A complete four-minute simulated match finished with halftime and valid player/ball coordinates after starting with an open-play pass.
- As with previous versions, this was tested in a mocked Three.js runtime, not visually playtested in a real WebGL browser. Timing and competitive balance may need further on-device tuning.

## 🛝 Version 1.6.1: Slide tackles

**Slide tackling is a new, separate defensive move**, not a replacement for the original standing tackle. It is manually triggered; the AI continues using standing tackles to prevent a flood of random slide fouls.

### Controls

| Input | Action |
|---|---|
| **V** | Slide tackle (keyboard) |
| **Shift + left-click** over the 3D pitch | Slide tackle (mouse controls enabled) |
| **R3** (press the right thumbstick, gamepad button 11) | Slide tackle (standard controller) |
| **Space / ordinary left-click** | Existing standing tackle or shot |

Slide tackles are only available while the match is live, with enough stamina and within range of the opponent or loose ball.

### Gameplay

- An aimed slide commits the defender to a roughly **0.7-second sliding movement**. The ball-winning window is about **0.45 seconds**.
- Dedicated grounded animation: hips lower, one boot extends toward the football, the other leg drags and arms balance. Winning the ball keeps the sliding pose until recovery.
- A slide costs **15 stamina** and has a **2.15-second tackle cooldown**, so it cannot be spammed.
- A genuinely ball-first challenge can win possession. The short V1.5.2 first-touch protection still applies, and the winner can pass immediately.
- An attempted slide that misses the ball does not automatically win possession, and the defender must recover.
- Reckless body-first collisions from behind can trigger a free kick and a yellow card. The foul assessment checks contact geometry and closing speed, not a random chance.
- A referee whistle stops the slide movement. The referee's existing penalty-area and second-yellow-card systems still apply.
- Restarting a match clears active slide and recovery timers.

### Validation and limitations

Tests covered live clean slides, animations, possession and immediate passes; sideways misses; distant contacts; reckless rear player-first slide decisions and cards; and a full simulated 240-second match with a manually started slide, halftime, goals, celebrations and replay transitions.

The game was exercised in a mocked Three.js engine and syntax-checked. A real-browser/WebGL playtest remains necessary to confirm gameplay feel, controller R3 support, presentation and timing on physical devices.

## 🚀 Version 1.6.0: Gameplay Revolution

All five critical gameplay systems were upgraded while retaining Clubhouse, all 96 permanent players, mouse/keyboard/controller support, substitutions, referee decisions, weather, replays and saved records.

### 1. Ball-winning tackles and possession

- Tackles use defender ratings, orientation and **actual proximity to the ball**, not just a large radius around a carrier.
- Clean ball-winning challenges preserve the prior short first-touch recovery protection, with a brief stumble for the player who lost possession.
- Tackles from behind remain eligible for the deterministic foul referee. Players can pass or shoot straight after winning the ball.
- Tackling reach varies by difficulty and defensive attributes.

### 2. Dribbling and ball physics

- Every permanent player profile now has a **dribbling attribute** in addition to the previous six ratings.
- Ball position follows each dribbler with momentum-dependent lag, rather than staying perfectly attached to a fixed spot.
- Faster sprinting pushes the ball farther ahead; high-rated dribblers maintain closer control.
- Poor dribblers sprinting under close defensive pressure can take a **heavy touch** that releases a moving loose ball. Normal walking does not randomly lose possession.
- Loose balls retain velocity and ground friction, while faster shots have separate flight drag. Old restart and offside state is cleared on possession changes.

### 3. Passing and through balls

- Directional input weighs the receiving options much more heavily when moving the stick or using WASD; passes are less auto-targeted against the player's intended direction.
- Passing looks ahead to a teammate's likely position, especially when launching through balls.
- Passing ratings and defensive pressure influence accuracy, and marked passing lanes reduce selection priority.
- **Hold Shift while pressing E or right-clicking** for a driven ground pass. Standard E/right-click passes and R/middle-click through balls remain available.

### 4. Improved teammate and opponent AI

- Off-ball forwards anticipate the offside line and try not to run beyond the second-last defender.
- Defenders pursue predicted ball locations while covering dangerous central passing lanes.
- The opponent changes intensity based on the score and remaining time, pressing harder late when chasing a goal.
- Ball carriers evaluate shooting distance, defensive pressure, forward passing options, and how long they've carried the ball.
- AI passing and running are tuned to advance play rather than repeatedly switching the ball sideways.

### 5. Goalkeeper intelligence

- Goalkeepers use the ball's location and incoming shot trajectory to position themselves.
- They come farther off their goal line to narrow the angle in close one-on-ones and can smother a ball that comes within realistic reach.
- Save probability depends on the keeper's **goalkeeping attribute**, ball speed, height, shot placement, positioning and chosen difficulty.
- Keepers decide whether to catch or parry, with parries pushed away from central danger.

### Tests and limitations

- JavaScript syntax and all referenced UI element IDs passed checks.
- Targeted gameplay tests covered dribbling heavy touches, passing choices, clean tackles, protected possession, AI shots from viable positions, keeper rushes, keeper save animations and goal/replay recovery.
- A complete four-minute simulated match passed with halftime, stable player/ball coordinates and no runtime failures. Additional goal-and-save sequences were simulated.
- Testing uses a lightweight mocked Three.js runtime, **not a real hardware/browser WebGL playtest**. On-device balancing and visual checks remain necessary.
- This remains an arcade football simulation, not a motion-captured professional football game or full refereeing-rule simulator.

## ⚽ Version 1.5.2: Tackle possession hotfix

A clean, won tackle no longer results in the same opponent immediately winning the ball back while the tackle animation is still playing.

- A successful tackle grants the winner about **0.64 seconds** of first-touch breathing room. Opponents can still press and track runs, but can't instantly tackle the ball away in that brief period.
- The player dispossessed by a successful challenge enters about **0.68 seconds** of recovery, briefly stumbles, and cannot immediately reuse an active tackle.
- The tackler's movement recovery is shortened, allowing the winner to dribble away quickly.
- You can **pass, shoot or cross immediately**. Once the ball is released, the short tackle protection is removed, so passing and interceptions remain normal.
- Normal tackling resumes after the recovery period. Kickoffs, free kicks, match restarts and a new match clear any old protection.
- Does not affect foul, red-card, offside, pack-placeholder or roster mechanics.

**Verification:** 16 targeted checks passed, including a clean ball-winning challenge, protection against two nearby defenders, animation, expiry, immediate passing and a complete simulated match with halftime. Real browser playtesting is still needed.

## 🟨 Version 1.5.1: Referee fairness hotfix

Fouls and yellow cards are **no longer based on random probability**. The original referee was giving certain challenges from behind up to an 80% random chance of a foul. The fix awards a foul only for a clear, late tackle involving physical contact directly from behind, meaningful closing speed and an attempt that misses the ball. Cards are reserved for especially reckless rear challenges, and a second yellow still means a red card.

CPU players now avoid launching tackles directly from behind the ball carrier, and AI teammates have longer cooldowns. On-screen referee commentary identifies the reason for a foul instead of only saying “FREE KICK.” Clean frontal and side tackles, light contact and ball-first challenges are not penalised by the foul detector.

**Validation:** 15 targeted checks passed, including frontal challenges, legal side tackles, ball-first contact, reckless fouls with cards, less-serious fouls without cards, and a complete simulated match with halftime. The referee remains a simplified arcade model, not a full football-law simulation. Offside-related free kicks remain a separate rule.

## 🏟️ Version 1.5: Clubhouse and permanent players

The game now opens in a **full-screen club-themed menu**, not the original single kickoff panel. It includes these connected pages:

- **Home:** Featured matchday dashboard, currently selected club, starting XI average rating, and locally saved results.
- **Play Match:** Club selection, opponent, formation, tactic, difficulty, stadium conditions and match length. Quick Match and Free Training remain.
- **My Squad:** Player-card grid with filtering for forwards, midfielders, defenders and keepers. Each profile shows a consistent illustration, name, club, number, position, age, nationality, height, overall rating and six football attributes.
- **Club Hub:** Browse all six original clubs, their squads and average team ratings. Click a club to inspect its footballers or select it for your next match.
- **Settings:** A proper menu for mouse input and links to match/camera options.
- **Packs:** A **coming-soon placeholder only**. No packs, odds, card ownership or pack-opening functionality has been implemented yet.

### Permanent original characters

There are **96 distinct fictional player identities**, with 16 on every club (11 starters + five substitutes). Every profile has an immutable identifier such as `striker:0` or `polar:12`. The generation of ratings and physical details is deterministic, not random each match: the same player always has the same name, player-card portrait colours, age, position, number, height, rating and technical stats.

The 3D footballer now reads its **skin colour, hair colour, proportions and jersey number from the same profile used by the squad card**. The full bench comes from the selected club's roster; it is no longer a universal group of strangers. Substitute players carry their permanent identities and appearances onto the pitch. Current passing, pace and shooting gameplay use player attributes as lightweight modifiers.

### Replays and consistency

Highlights record each on-field player's ID and visibility in addition to the existing motion and ball data. This allows older goals to show the **original footballer before a substitution**, rather than visually rewriting history.

### Implementation note for the future packs feature

Packs have intentionally **not** been implemented. When built, use the stable footballer IDs from `PLAYER_DATABASE` rather than generating new identity records on each opening. Ownership, duplicates, rewards, rarities, pack odds, currencies, and any monetisation are undecided.

### Tests

26 Clubhouse/squad integration checks and 12 match/replay regression checks passed. The tests cover roster sizes, uniqueness, permanent attributes, menu navigation, filtering, player appearance, substitutions, historical highlights, halftime and full-time. Real browser/WebGL visual playtesting is still recommended.

## 🧠 Version 1.4: Football IQ

This is a gameplay and coaching update. It preserves all earlier controls, match animations, referee rules, replays, and custom clubs.

### Match formations
Select from **4-3-3 Wide**, **4-4-2 Two Strikers**, and **4-2-3-1 Control** in the match setup. The formation changes real player positions, offensive roles, team support runs and defensive spacing. The opponent keeps its existing 4-3-3 shape. You can switch at halftime or in the setup menu while paused, and the players adjust their positions during play.

### The substitutions bench
Five bench players are available per match. Pause the game (P or Esc) to see **Matchday Bench**, or use the halftime substitutions section. Choose the player leaving and the substitute coming on, then confirm. The replacement gets a new name, number and full energy. Once a player has been replaced, you cannot reuse that player's slot, and each bench player can enter only once. Matches allow at most five substitutions. The referee's red-card rules remain in force.

### Fatigue & recovery
Stamina **does not reset after goals or kickoffs**. Players slow moderately as energy drains. Pressing and sprinting use energy; halftime restores a little, not all. Fresh substitutions have a slight pace bonus. The selected player's energy bar changes colour as stamina drops and displays a numerical percentage. Match Centre now shows substitutions and average home-team energy.

### Simplified offside rule
The game checks whether an intended pass/cross recipient is ahead of the ball and the second-last opponent in the attacking half at the moment of the kick. AI passing prefers onside receivers, and an offside intended receiver is penalised only upon receiving the ball, producing a free kick for the defending team. Direct throw-ins, corners and goal kicks are exempt. Offsides are tracked in match statistics. This is an **arcade implementation**, not a complete professional laws-of-the-game simulator, and does not detect every type of offside interference.

### Tests and limitations
- 25 targeted checks passed for changing formations, five-player bench rules, substitutions while paused and at halftime, shirt numbers, fatigue through halftime, onside/offside logic and resulting free kicks.
- The game's JS syntax and UI ID references were checked.
- Browser GPU playtesting is still recommended, especially for on-pitch formation balance and offside edge cases.

## 🏃 Version 1.3: Player animation upgrade

**New articulated 3D rigs and procedural animations** are built directly into the existing Three.js scene, with no animation library or external motion files.

- **More realistic running and sprinting:** Speed-dependent gait, knees and elbows that bend through each stride, ankle movement, arm counter-swing, gentle body bob and torso lean. Stride cycles vary across players, so teammates do not run in lockstep.
- **Ball control / first touch:** Foot cushioning and a glance toward the ball when taking possession.
- **Passing and through balls:** Deliberate leg windup, swing and planted support foot.
- **Charged shooting:** A stronger follow-through with shoulder rotation, raised kicking leg and a recovery.
- **Lofted crossing:** Distinct wider kicking motion.
- **Tackling:** A low-reaching tackle stance with controlled recovery.
- **Goalkeeping:** Sharper ready stance and articulated elbow/knee movement when catching, diving, parrying and distributing.
- **Replays:** Every captured player pose now includes the head, torso, knee, elbow and ankle joints, so goals and highlights replay the improved animations.
- Existing controls, match setup, referee, penalties, difficulty, camera, weather and Free Training remain.

**Testing:** 34 targeted simulation checks passed, including live kicking, keeper dives, full-body motion, action recovery and joint-preserving replay frames. These are lightweight procedural animations, not motion-captured football or full inverse-kinematics foot-to-ball contact. A real browser visual/performance playtest is still recommended.

## 🖱️ Version 1.2: Mouse controls

Mouse controls are **enabled by default** and can be turned off using the **Enabled** checkbox in the match setup or pause menu. Mouse gameplay clicks work **only over the 3D pitch while a match is live**, so interacting with menus or match reports stays normal.

| Mouse input | Gameplay action |
| --- | --- |
| **Left click (hold, then release)** | Charge and take a shot; tackle when defending |
| **Right click** | Ground pass |
| **Middle click / wheel button** | Through ball |
| **Mouse back button (M4)** | Switch controlled player |
| **Mouse forward button (M5)** | Lofted cross |
| **Scroll up** | Camera zoom in |
| **Scroll down** | Camera zoom out |

The left mouse button automatically releases a full-power shot just like the Space key. Right-click does not open the browser context menu over the pitch during live play. The mouse can be combined with WASD for movement and aiming. Side mouse buttons depend on your mouse and browser; some system/browser mappings may intercept M4/M5. Keyboard and controller bindings have not changed.

### Testing

15 targeted mouse-control checks passed, including left-click charge/release, tackle, right-click pass, middle-click through ball, side-button actions, wheel zoom, menu-click isolation, pause state, and the on/off switch. Real-device browser testing is still recommended.

## 🟨 Version 1.1: Referee Update

Claude's referee implementation has been reviewed, tested and merged with fixes.

- **Fouls:** Tackles from behind have a high risk of being called a foul. Side challenges can also be penalised; clean challenges from the front are safer.
- **Free kicks:** The fouled team restarts from the spot. Opponents retreat, and the ball and taker remain stationary until the kick.
- **Penalty kicks:** Fouls inside the penalty area lead to a penalty. The goalkeeper waits on the line. On your penalties, hold and release **Space** to shoot. Dribbling, passing and crossing before taking it are blocked.
- **Yellow and red cards:** A second yellow becomes a red card. Sent-off players leave the pitch and cannot be selected or tackle; they remain off after kickoffs and halftime.
- **Match Centre:** Fouls, yellow cards and red cards are tracked alongside shots, possession and passing statistics.
- **Free Training:** Practice remains referee-free.

**Verification:** 12 targeted tests passed, including three complete simulated matches. Browser WebGL gameplay still needs a real-device playtest.

## 🏟️ Version 1.0: The Matchday Update

### Choose your club
Six original clubs with individual primary/secondary kit colours:

| Club | Home colour |
| --- | --- |
| STRIKER FC | Mint green |
| TIDE CITY | Sky blue |
| AURORA ATHLETIC | Violet |
| VOLT UNITED | Yellow |
| EMBER ROVERS | Red-orange |
| POLAR FC | White/teal |

Choose both home and away clubs in Match Setup. Shirt, shorts, match scoreboard and replay club labels update.

### Match setup
- **Difficulty:** Beginner (default), Amateur, Professional or Legend. The AI changes its pace, tackling, pressing, passing and shooting accuracy, and goalkeeper performance. Change difficulty while paused.
- **Match length:** 4, 8, or 12 minutes, with an actual **halftime** break. Choose second-half tactics at the break.
- **Stadium:** Daylight, golden hour, night game, or rainy night with animated rain and lighting.
- **Tactics:** Balanced 4-3-3, All-out Attack, or Park the Bus. Tactics affect teammate positioning, speed, and defensive pressure. Switch on the pitch with **1 / 2 / 3**.
- **Quit and restart:** Return to the main menu from the pause screen to configure another match.

### Modes
- **11v11 Quick Match:** Full-size 105 × 68m equivalent pitch, positioned teammates, tracking broadcast camera, match clock, half-time, goal celebrations, result screen.
- **Free Training:** Practice dribbling, passing and shooting **without opposing players** or a match timer. Goals still trigger celebrations and replays. Free Training results are never added to your record.

### Matchday presentation
- TV-style follow camera, with zoom and a classic camera toggle
- Animated outfield players and animated goalkeepers with gloves, diving, catching, parries and recoveries
- Celebrations after goals, followed by automatic real-position instant replays
- Post-match highlights reel with real recorded ball/player poses and a skip control
- Match-centre statistics: shots, saves, possession, completed/attempted passes, pass accuracy and tackles won
- Stadium stands, crowd, LED advertisements, floodlights, scoreboard, minimap, dynamic atmosphere and basic sound effects
- A per-club **local season record** (wins/draws/losses) saved in the current browser using local storage

### Keyboard controls

| Key | Action |
| --- | --- |
| WASD / Arrow keys | Move player / directional aiming |
| Shift | Sprint |
| E | Ground pass |
| R | Through ball |
| T | Lofted cross |
| Hold and release Space | Shoot; full power auto-shoots |
| Space without possession | Tackle |
| Hold F | Jockey |
| Q | Switch player |
| 1 / 2 / 3 | Balanced / Attacking / Defensive tactic |
| Tab | Open / close live Match Centre |
| C | Toggle broadcast / classic camera |
| Z / X | Camera zoom |
| G | Graphics/performance toggle |
| M | Mute/unmute match sounds |
| P / Escape | Pause |
| R / Escape / Space / Enter during replay | Skip instant replay |

At halftime, use the on-screen **Second-half Tactic** control then click **Start Second Half**.

### Controller support

Standard Gamepad API: left stick move, A/Cross pass, B/Circle shoot/tackle, X/Square cross, Y/Triangle through ball, LB/L1 switch, RB/R1 sprint, LT/L2 jockey. Keep the browser window focused.

## Deploy with GitHub + Vercel

1. Go to https://vercel.com/new and import `jdarkyeka6/StrikerFC26`.
2. Framework Preset: **Other**.
3. Root directory `./`; no custom build command or output directory.
4. Deploy. Updates to `main` deploy automatically once the Git integration is active.

This prototype currently runs from a single root `index.html`. It imports Three.js from jsDelivr or esm.sh, so an internet connection is necessary. Network filtering that blocks both CDNs will prevent the 3D engine from loading.

## Testing & limitations

Game logic and mock 3D-runtime tests cover match setup, kit updates, weather, tactics, match clocks, halftime, scores, celebrations, replays, training, results and record storage. A real visual WebGL playtest is still needed, especially for performance and camera feel on different devices.

**This is still an original arcade-style football game, not a production recreation of EA SPORTS FC.** It does not yet include official/licensed teams, full league career mode, online multiplayer, motion-captured football animation, fully simulated fouls/offsides, or realistic professional-grade match commentary.

### Development
- V1.0: Matchday, clubs, tactics, stadiums, halftime, celebrations, training, statistics, club records
- V0.9: Goal replays and highlight reel
- V0.8: Animated goalkeepers
- V0.7: Four AI difficulty levels
- V0.6: Following broadcast camera
- V0.5: Full-size 11v11 field and spaced formations
- V0.4–V0.3: Gameplay controls, player visuals, rules, goalkeeper saves

Independent original project by Jake. Not affiliated with FIFA or EA SPORTS.
