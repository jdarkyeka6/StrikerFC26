# ⚽ STRIKER FC 26 | VERSION 1.3

**Original browser-first 3D football game** built for keyboard or controller, with no local Node.js installation needed. Version 1.3 upgrades player and goalkeeper animation while keeping mouse/keyboard/controller controls, the referee and the entire Matchday feature set.

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
