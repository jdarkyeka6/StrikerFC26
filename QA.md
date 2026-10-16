# Striker FC 26 · V1.8.0 QA Checklist

The regression tests cover static JavaScript parsing, restart calculations, state cleanup and UI wiring. Complete these real gameplay checks in Chrome or Edge before merging.

## Match lifecycle
- [ ] Start a 4-minute match on Beginner, finish both halves, review full-time score and match report.
- [ ] Pause during play and check **home club**, **opponent**, and **duration** selectors are disabled.
- [ ] While paused, adjust **tactics**, **formation**, **difficulty**, and make a substitution.
- [ ] Visit Club Hub during a paused match: clicking a different club must not change the fixture.
- [ ] Visit Home during pause and press Free Training: the active match must remain intact.
- [ ] Resume and finish without score resets, missing players or camera jumps.
- [ ] Quit a match, return to Play Match and confirm the page does not show the previous match's full-time summary.

## Rules and ball handling
- [ ] Shoot, finesse, chip and low-driven shots from multiple angles.
- [ ] Test E pass, R through ball, F target lock, Shift+F clear, and goalkeeper distribution.
- [ ] Try Shoot/Tackle beside an opponent goalkeeper holding the ball: it must not create a cheap goal.
- [ ] Run a defender out over each end line on either wing: give the opponent a corner at the correct corner.
- [ ] Pass out for throw-in, and confirm the restart has no stale pass receiver or offside alert.
- [ ] Take corners and free kicks, complete a penalty and watch replays.
- [ ] Try different skill moves and substitutions mid-match.

## Readability and accessibility
- [ ] Navigate menus with Tab, Shift+Tab, Enter and Space.
- [ ] Use Up/Down arrows on team, match length and difficulty selectors.
- [ ] Open/close F1 quick help during play; Escape closes help before pausing.
- [ ] Test layout at ~375px, ~768px and ~1440px viewport widths.
- [ ] Verify text remains legible without covering the scoreboard or match controls.

## Offline and performance
- [ ] Save offline.html and run with internet disconnected.
- [ ] Test service-worker installation on the website and reload without internet.
- [ ] Test low graphics on a modest Windows laptop.
- [ ] Test keyboard and Xbox/PlayStation compatible gamepad if available.

Automated test command: `node --test tests/*.test.mjs`

## v1.9.0 HUD and AI
- [ ] Play Broadcast and Classic with Compact HUD: bottom is clear and player card stays small.
- [ ] Settings → Match HUD → Full: the detailed guide and stats reappear.
- [ ] Settings → Match HUD → Off: bottom widgets disappear while the shot gauge and scoreboard remain.
- [ ] Reload and open offline.html to verify local HUD preference and camera parity.
- [ ] Opponent defenders should track nearby attackers instead of drifting away.
- [ ] Watch CPU passing under pressure and verify clear outlets get used.
- [ ] Look for midfield triangles, forward runs and intelligent dribbling near the touchline.
- [ ] Confirm beginner remains forgiving and legend remains challenging.
- [ ] Check free kicks, offside and goalkeepers after the tactical changes.


## AI 2.0 Playtest checklist

- [ ] Beginner opponent shoots mostly from its configured shorter range.
- [ ] Professional and Legend opponents create passes and press without becoming impossibly fast.
- [ ] Watch defensive team: closest AI pressures, second shades passing lane, third holds shape.
- [ ] Check human defender does not cause two other CPU defenders to abandon the press.
- [ ] Attack down left/right wing to observe only the matching fullback overlap.
- [ ] Confirm striker runs remain onside when a through ball is prepared.
- [ ] In midfield, watch one option advance and another drop for an outlet.
- [ ] When down late, opponent presses and risks forward passes more often.
- [ ] When leading late, team prioritises covering and controlled possession.
- [ ] Ensure set pieces, passing locks, keeper possession, offsides and replays still function.
- [ ] Check both Broadcast and Classic cameras with all HUD display settings.
- [ ] Verify standalone offline.html with network disconnected.

