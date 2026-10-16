import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {spawnSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
import {dirname,resolve} from 'node:path';
const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
function cacheVersion(worker){
 const value=worker.match(/const CACHE='striker-fc-v(\d+\.\d+\.\d+)'/)?.[1];
 assert.ok(value,'service worker should have a semantic version');
 return value;
}

for(const file of ['index.html','offline.html']){
 const html=readFileSync(resolve(root,file),'utf8');
 test(file+' game hooks and navigation preserved',()=>{
  const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);
  for(const id of ['start','home-select','away-select','difficulty','duration-select','stadium-select','tactic-select','formation-select','mouse-enabled','settings-mouse','pause-sub-panel','offline-status','hud-help','match-controls','close-hud-help','menu-play','menu-controls','menu-settings','controls-go-play','match-advanced','input-options']){
   assert.equal(ids.filter(x=>x===id).length,1,'Missing/duplicate '+id);
  }
  assert.match(html,/data-menu="controls"/);
  assert.match(html,/e.code==='F1'/);
  assert.match(html,/function setHudHelp\(open\)/);
  assert.match(html,/id="match-controls"[^>]*hidden/);
  assert.match(html,/<details class="ui-disclosure" id="match-advanced">/);
  assert.match(html,/<details class="ui-disclosure" id="input-options">/);
  assert.match(html,/<details class="ui-disclosure" id="offline-options">/);
 });
 test(file+' script syntax',()=>{
  const scripts=[...html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)].map(x=>x[1]).filter(Boolean);
  assert.ok(scripts.length>0);
  for(const script of scripts){const r=spawnSync(process.execPath,['--input-type=module','--check'],{input:script,encoding:'utf8',maxBuffer:1024*1024});assert.equal(r.status,0,r.stderr||'syntax check failed')}
 });
}
test('offline and web build versions match service worker',()=>{
 const worker=readFileSync(resolve(root,'sw.js'),'utf8');
 const v=cacheVersion(worker);
 for(const file of ['index.html','offline.html']){
  assert.ok(readFileSync(resolve(root,file),'utf8').includes('VERSION '+v));
 }
});
