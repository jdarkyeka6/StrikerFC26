import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {dirname,resolve} from 'node:path';
import {fileURLToPath} from 'node:url';
const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
for(const file of ['index.html','offline.html']){
 const html=readFileSync(resolve(root,file),'utf8');
 const fn=name=>{
  const match=html.match(new RegExp('function '+name+'\\([^]*?\\n\\}'));
  assert.ok(match,'missing '+name);
  return match[0];
 };
 const clamp=(n,lo,hi)=>Math.max(lo,Math.min(hi,n));
 test(file+' supports readable HUD in both camera modes',()=>{
  assert.match(html,/<body data-hud="compact">/);
  assert.match(html,/id="hud-mode"/);
  for(const value of ['compact','full','off'])assert.match(html,new RegExp('<option value="'+value+'"'));
  assert.match(html,/body\[data-hud="compact"\] \.action-hint/);
  assert.match(html,/body\[data-hud="off"\] \.player-card/);
  assert.match(html,/localStorage\.setItem\(HUD_KEY,value\)/);
  assert.match(html,/function loadHudMode\(/);
  assert.match(html,/cameraMode==='broadcast'\?'classic':'broadcast'/);
 });
 test(file+' support runs form passing lanes on both team orientations',()=>{
  const f=Function('clamp','HW','HL','aiPlan','aiPlayerStyle',
   fn('aiSupportRun')+'\nreturn aiSupportRun;')(clamp,68,105,
    ()=>({risk:.47,width:1,protect:false}),
    ()=>({vision:.75,pace:.76,dribble:.8}));
  const p={index:0},h={x:0,z:40};
  const a=f(p,{x:0,z:0},h,-1,'attack');
  const b=f(p,{x:0,z:0},h,1,'attack');
  assert.ok(a.z<0&&b.z>0,'forwards run toward opponent goal');
  const mid=f({index:4},{x:0,z:-20},h,-1,'mid');
  assert.ok(Math.abs(mid.x)>8,'midfielder provides width');
  for(const run of [a,b,mid])assert.ok(Number.isFinite(run.x)&&Number.isFinite(run.z));
 });
 test(file+' AI favours an open lane when under pressure',()=>{
  const pick=Function('clamp','aiPlayerStyle',
   fn('aiPickPass')+'\nreturn aiPickPass;')(clamp,()=>({vision:.70}));
  const a={q:'blocked',score:55,forward:20,lane:8,d:25};
  const b={q:'clear',score:35,forward:12,lane:0.6,d:23};
  assert.equal(pick([a,b],true).q,'clear');
  assert.equal(pick([],true),null);
  assert.ok(pick([a,b],false));
 });
 test(file+' dribble uses lateral escape and keeps ball in play',()=>{
  const f=Function('clamp','teams','HW','HL','distance','aiPlan','aiPlayerStyle',
   fn('aiDribbleTarget')+'\nreturn aiDribbleTarget;')
   (clamp,[{dir:-1},{dir:1}],68,105,(a,b)=>Math.hypot(a.x-b.x,a.z-b.z),
    ()=>({risk:.47}),()=>({dribble:.77}));
  const p={team:1,x:60,z:84};
  const spot=f(p,{x:62,z:85});
  assert.ok(spot.x<=59&&spot.x>=-59);
  assert.ok(spot.z<=94&&spot.z>=-94);
 });
 test(file+' CPU uses selected pass recipient instead of an unrelated candidate',()=>{
  assert.match(html,/preferredReceiver=null/);
  assert.match(html,/options\.find\(o=>o\.q===preferredReceiver\)/);
  assert.match(html,/kick\(p,false,through,\.45,'normal',chosen\.q\)/);
  assert.match(html,/chosen\.q\)/);
  assert.match(html,/function roleTarget\(/);
 });
}
