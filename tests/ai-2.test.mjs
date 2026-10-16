import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {resolve,dirname} from 'node:path';
import {fileURLToPath} from 'node:url';

const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const clamp=(x,min,max)=>Math.max(min,Math.min(max,x));
const distance=(a,b)=>Math.hypot(a.x-b.x,a.z-b.z);
function extract(html,name){
 const start=html.indexOf('function '+name+'(');
 assert.ok(start>=0,'Missing AI function '+name);
 const brace=html.indexOf('{',start);
 let depth=0;
 for(let i=brace;i<html.length;i++){
  if(html[i]==='{')depth++;
  if(html[i]==='}'&&!--depth)return html.slice(start,i+1);
 }
 throw Error('Unbalanced function '+name);
}
for(const file of ['index.html','offline.html']){
 const html=readFileSync(resolve(root,file),'utf8');
 const get=(name,args,values)=>Function(...args,extract(html,name)+'\nreturn '+name)(...values);
 const style=get('aiPlayerStyle',['clamp'],[clamp]);
 const plan=(score,matchTime,homeTactic='balanced')=>
  get('aiPlan',['clamp','score','matchTime','MATCH_SECONDS','homeTactic'],
   [clamp,score,matchTime,100,homeTactic]);
 test(file+' adapts risk, tempo and pressure when behind/leading',()=>{
  const chase=plan([0,2],88)(0),defend=plan([2,0],88)(0),tie=plan([0,0],88)(0);
  assert.ok(chase.urgency>tie.urgency);
  assert.ok(chase.risk>tie.risk);
  assert.equal(chase.pressBonus,1);
  assert.equal(defend.protect,true);
  assert.ok(defend.risk<tie.risk);
  assert.ok(plan([0,0],20,'attacking')(0).width>plan([0,0],20,'defensive')(0).width);
 });
 test(file+' distinguishes footballers by actual ratings',()=>{
  const dribbler=style({profile:{stats:{dribbling:94,passing:45,pace:91,shooting:88}}});
  const playmaker=style({profile:{stats:{dribbling:60,passing:94,pace:68,shooting:50}}});
  assert.ok(dribbler.dribble>playmaker.dribble);
  assert.ok(playmaker.vision>dribbler.vision);
  assert.ok(dribbler.pace>playmaker.pace);
  assert.ok(dribbler.shooting>playmaker.shooting);
 });
 test(file+' overlaps exactly the fullback on the ball flank',()=>{
  const runner=get('aiSupportRun',['clamp','HW','HL','aiPlan','aiPlayerStyle'],
   [clamp,68,105,()=>({risk:.47,width:1,protect:false}),style]);
  const ball={x:41,z:-34},fast={team:0,index:6,profile:{stats:{pace:90}}};
  const same=runner(fast,ball,{x:51,z:80},-1,'defence');
  const far=runner({...fast,index:9},ball,{x:-51,z:80},-1,'defence');
  assert.ok(same.z<ball.z-10,'ball-side fullback overlaps');
  assert.ok(far.z>ball.z,'opposite fullback stays behind');
  assert.ok(Math.abs(same.x)<=60&&Math.abs(far.x)<=60);
 });
 test(file+' assigns an available runner instead of duplicating tight marking',()=>{
  const assign=get('aiMarkTarget',['distance'],[distance]);
  const defender={x:-20,z:10},covering={x:-17,z:10};
  const covered={x:-17,z:11},available={x:-11,z:16};
  const picked=assign(defender,[covered,available],[defender,covering],-1);
  assert.equal(picked,available);
  assert.equal(assign(defender,[],[defender],-1),null);
 });
 test(file+' assigns secondary defender to pass lane rather than carrier',()=>{
  const cover=get('aiCoverLane',['HL','distance'],[105,distance]);
  const carrier={x:20,z:-20,index:0},outlet={x:44,z:-31,index:3};
  const point=cover(carrier,[carrier,outlet],-1);
  assert.ok(point.x>20&&point.x<44);
  assert.ok(point.z<carrier.z);
  assert.ok(Number.isFinite(cover(carrier,[],1).z));
 });
 test(file+' decision policy uses pressure, rating and difficulty',()=>{
  let shotAllowed=false;
  const choice=get('aiChooseAction',['aiPlayerStyle','distance','clamp','aiShouldShoot'],
   [style,distance,clamp,()=>shotAllowed]);
  const p={team:1,carryTime:1.9,profile:{stats:{passing:84,shooting:75}}};
  const opponent={x:0,z:0},actor={...p,x:1,z:1};
  const pass={lane:.8,forward:12};
  const settings={opponentCarry:2.7,opponentShootChance:.13};
  assert.equal(choice(actor,opponent,pass,{risk:.45,protect:false,urgency:1},settings,.8),'pass');
  assert.equal(choice({...actor,carryTime:0},opponent,null,{risk:.45,protect:false,urgency:1},settings,.8),'carry');
  shotAllowed=true;
  assert.equal(choice(actor,opponent,pass,{risk:.45,protect:false,urgency:1},
   {...settings,opponentShootChance:.8},0),'shoot');
  assert.notEqual(choice(actor,opponent,null,{risk:.45,protect:false,urgency:1},settings,.9),'shoot');
 });
 test(file+' excludes controlled footballer from AI pressing assignments',()=>{
  assert.match(html,/team!==0\|\|p!==cp/);
  assert.match(html,/roleTarget\(p,ranked\[0\],ranked\[1\],ranked\[2\]\)/);
  assert.match(html,/aiCoverLane\(source/);
  assert.match(html,/aiMarkTarget\(p,threats,markers,side\)/);
  assert.match(html,/aiChooseAction\(p,opposition,chosen,plan,cfg,Math.random\(\)\)/);
  assert.match(html,/p\.team===1\?difficultySettings\(\)\.opponentShotRange:43/);
 });
}
