import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
import {dirname,resolve} from 'node:path';

const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const site=readFileSync(resolve(root,'index.html'),'utf8');
const offline=readFileSync(resolve(root,'offline.html'),'utf8');
const worker=readFileSync(resolve(root,'sw.js'),'utf8');
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
test('both builds and service-worker cache have v1.7.3',()=>{
 assert.match(site,/VERSION 1\.7\.3/);
 assert.match(offline,/VERSION 1\.7\.3/);
 assert.match(worker,/const CACHE='striker-fc-v1\.7\.3'/);
});
