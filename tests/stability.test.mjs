import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {spawnSync} from 'node:child_process';
import {dirname,resolve} from 'node:path';
import {fileURLToPath} from 'node:url';

const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const read=name=>readFileSync(resolve(root,name),'utf8');
const builds=['index.html','offline.html'].map(file=>({file,html:read(file)}));
function getFn(html,name){
 const start=html.indexOf('function '+name+'(');
 assert.ok(start>=0,'Function '+name+' exists');
 let open=html.indexOf('{',start),depth=0;
 for(let i=open;i<html.length;i++){
  if(html[i]==='{')depth++;
  if(html[i]==='}'&&--depth===0)return html.slice(start,i+1);
 }
 throw Error('Unbalanced function '+name);
}
for(const {file,html} of builds){
 test(file+' parses as JavaScript and uses unique element IDs',()=>{
  const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(x=>x[1]);
  assert.equal(ids.length,new Set(ids).size);
  const scripts=[...html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)].map(x=>x[1]).filter(Boolean);
  assert.equal(scripts.length,1);
  const p=spawnSync(process.execPath,['--input-type=module','--check'],{input:scripts[0],encoding:'utf8',maxBuffer:1024*1024});
  assert.equal(p.status,0,p.stderr||'Unable to parse game');
 });
 test(file+' awards correct corners and goal kicks',()=>{
  const fn=Function('HW','HL',getFn(html,'endLineRestartInfo')+'\nreturn endLineRestartInfo')(68,105);
  assert.deepEqual(fn(-17,-108,1),{kind:'CORNER KICK',team:0,x:-64,z:-101});
  assert.deepEqual(fn(17,-108,0),{kind:'GOAL KICK',team:1,x:0,z:-93});
  assert.deepEqual(fn(17,108,0),{kind:'CORNER KICK',team:1,x:64,z:101});
  assert.deepEqual(fn(-17,108,1),{kind:'GOAL KICK',team:0,x:0,z:93});
  assert.equal((html.match(/awardEndLineRestart\(ball\.x,ball\.z/g)||[]).length,2,
   'both carried-ball and loose-ball end lines share restart decisions');
 });
 test(file+' clears dead-ball state reliably',()=>{
  const code=getFn(html,'clearDeadBallHistory');
  for(const token of ['manualPassTarget=null','lastPass=null','pendingOffside=null',
   'ball.passTarget=null','ball.passTime=0','ball.passStarted=0',
   'ball.releasedBy=null','ball.spin=0'])assert.ok(code.includes(token),token);
  assert.match(getFn(html,'restartPlay'),/clearDeadBallHistory\(\)/);
  assert.match(getFn(html,'resetPositions'),/clearDeadBallHistory\(\)/);
 });
 test(file+' prevents fixture edits and training while paused',()=>{
  assert.match(getFn(html,'togglePause'),/setMatchSetupLocked\(true\)/);
  assert.match(getFn(html,'togglePause'),/setMatchSetupLocked\(false\)/);
  assert.match(getFn(html,'startTraining'),/if\(state==='paused'\)return/);
  assert.match(getFn(html,'setMatchSetupLocked'),/home-select/);
  assert.match(getFn(html,'setMatchSetupLocked'),/away-select/);
  assert.match(getFn(html,'setMatchSetupLocked'),/duration-select/);
  assert.match(html,/state==='paused'\)\{say\('CLUBS ARE LOCKED/);
 });
 test(file+' preserves menu keys while keeping gameplay shortcuts',()=>{
  assert.match(html,/e\.code==='Tab'&&!\['playing','stats'\]\.includes\(state\)/);
  assert.match(html,/e\.target\?\.closest\?\.\('input,select,textarea,\[contenteditable\]'\)/);
  assert.match(html,/if\(state!=='playing'\)return;\s*if\(e\.code==='KeyC'\)/);
 });
 test(file+' has the refreshed setup copy and offline support',()=>{
  assert.match(html,/VERSION 1\.8\.0/);
  assert.match(html,/class="play-intro"/);
  assert.match(html,/function endLineRestartInfo\(/);
 });
}
test('service-worker cache version stays current',()=>{
 assert.match(read('sw.js'),/striker-fc-v1\.8\.0/);
});
