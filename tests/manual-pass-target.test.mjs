import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
import {dirname,resolve} from 'node:path';

const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const site=readFileSync(resolve(root,'index.html'),'utf8');
const offline=readFileSync(resolve(root,'offline.html'),'utf8');
const worker=readFileSync(resolve(root,'sw.js'),'utf8');

function cacheVersion(worker){
 const value=worker.match(/const CACHE='striker-fc-v(\d+\.\d+\.\d+)'/)?.[1];
 assert.ok(value,'service worker should have a semantic version');
 return value;
}

function receiverPicker(content) {
 const code=content.match(/function selectPassReceiver\(options,manualTarget=null\)\{\s*[\s\S]*?\n\}/)?.[0];
 assert.ok(code,'pass selection helper must be present');
 return Function(code+'\nreturn selectPassReceiver;')();
}
for(const [build,content] of [['website',site],['offline',offline]]) {
 const pick=receiverPicker(content);
 test(build+': assisted target is default',()=>{
  const a={id:1},b={id:2};assert.equal(pick([{q:a},{q:b}]).q,a);
 });
 test(build+': locked eligible target overrides assistance',()=>{
  const a={id:1},b={id:2};assert.equal(pick([{q:a},{q:b}],b).q,b);
 });
 test(build+': missing or ineligible target falls back safely',()=>{
  const a={id:1},b={id:2};assert.equal(pick([{q:a}],b).q,a);
  assert.equal(pick([],b),null);
 });
 test(build+': controls and highlighting exist',()=>{
  assert.match(content,/edge\(12,\(\)=>cyclePassTarget\(\)\)/);
  assert.match(content,/e\.code==='KeyF'/);
  assert.match(content,/rig\.passMarker\.visible=manualPassTarget===p/);
  assert.match(content,/manualPassTarget=null;/);
 });
}
test('web and offline use the current cache version',()=>{
 const v=cacheVersion(worker);
 assert.ok(site.includes('VERSION '+v));
 assert.ok(offline.includes('VERSION '+v));
});
