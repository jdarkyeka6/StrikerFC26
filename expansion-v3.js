(function(){
const get=id=>document.getElementById(id), key='striker-v3-expansion';
const teams=Object.keys(CLUBS), pool=Object.values(PLAYER_DATABASE).flat();
let data;try{data=JSON.parse(localStorage.getItem(key))||{}}catch{data={}}
data=Object.assign({coins:500,cards:[],season:1,fixtures:[],zoom:1,mood:'day'},data);
const save=()=>{try{localStorage.setItem(key,JSON.stringify(data))}catch{}};
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const btn=(label,id)=>'<button class="exp-btn" id="'+id+'">'+label+'</button>';
const wrap=(tag,html)=>{get('exp-'+tag).innerHTML=html};
const heading=(a,b,desc)=>'<small class="exp-kicker">STRIKER FC 26 · V3.0</small><h2>'+a+' <em>'+b+'</em></h2><p>'+desc+'</p>';
const info=html=>'<div class="exp-card">'+html+'</div>';
const nav=get('menu-settings'),navRoot=document.querySelector('.menu-nav'),before=navRoot.querySelector('[data-menu="controls"]');
let root=nav.parentElement;
const names={dynasty:['🏆','STRIKER DYNASTY'],vault:['✦','SQUAD VAULT'],engine:['⚡','MATCH ENGINE PRO'],pulse:['◉','STADIUM PULSE']};
for(const id of Object.keys(names)){
 MENU_LABELS[id]=names[id][1];
 const b=document.createElement('button');b.className='menu-nav-btn';b.dataset.menu=id;b.innerHTML='<span>'+names[id][0]+'</span> '+names[id][1];navRoot.insertBefore(b,before);
 b.addEventListener('click',()=>openMenuTab(id));
 const s=document.createElement('section');s.id='menu-'+id;s.className='menu-screen';s.innerHTML='<div class="exp-page" id="exp-'+id+'"></div>';nav.before(s);
}
const css=document.createElement('style');css.textContent='.exp-page{padding:25px 6px 65px;max-width:1000px;color:#f4fff9}.exp-page h2{font:900 clamp(34px,5vw,65px) Arial;margin:12px 0}.exp-page h2 em{color:#71edb8;font-style:normal}.exp-page p{color:#afcfca;line-height:1.6}.exp-kicker{color:#71edb8;letter-spacing:2px;font-weight:900}.exp-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(210px,1fr));gap:12px;margin:20px 0}.exp-card{background:#0d2b36;border:1px solid #508c81;border-radius:12px;padding:18px}.exp-card strong{color:#fff;display:block;margin:7px 0;font-size:19px}.exp-card small{color:#a7c2bc}.exp-btn{padding:12px 16px;margin:8px 10px 8px 0;background:#72e8b4;border:0;border-radius:8px;color:#09231c;font-weight:900;cursor:pointer}.exp-btn:disabled{opacity:.45}.exp-table{width:100%;border-collapse:collapse}.exp-table th,.exp-table td{padding:9px;text-align:left;border-bottom:1px solid #42645f}.exp-table th{color:#79f0b6}.exp-select{padding:10px;background:#153942;color:#fff;border:1px solid #69a99a;border-radius:7px}';
document.head.append(css);
document.title='STRIKER FC 26 · VERSION 3.0';
const club=id=>CLUBS[id]?.name||id;
const fixtures=()=>{
 const all=[],a=teams.slice();
 for(let round=0;round<5;round++){
  for(let i=0;i<3;i++){
   const home=a[i],away=a[5-i];
   all.push({home,away,round:round+1});
  }
  a.splice(1,0,a.pop());
 }
 const first=all.slice();
 for(const f of first)all.push({home:f.away,away:f.home,round:f.round+5});
 return all;
};
const schedule=fixtures();
function standings(){
 const o=Object.fromEntries(teams.map(t=>[t,{team:t,p:0,w:0,d:0,l:0,for:0,against:0,points:0}]));
 for(const m of data.fixtures.filter(f=>f.season===data.season)){const a=o[m.home],b=o[m.away];if(!a||!b)continue;a.p++;b.p++;a.for+=m.a;a.against+=m.b;b.for+=m.b;b.against+=m.a;if(m.a>m.b){a.w++;b.l++;a.points+=3}else if(m.a<m.b){b.w++;a.l++;b.points+=3}else{a.d++;b.d++;a.points++;b.points++}}
 return Object.values(o).sort((a,b)=>b.points-a.points||((b.for-b.against)-(a.for-a.against)));
}
const matchDone=(index,a,b)=>{const f=schedule[index];if(!f||data.fixtures.some(x=>x.season===data.season&&x.index===index))return;data.fixtures.push({index,season:data.season,home:f.home,away:f.away,a,b});data.coins+=75;save()};
function dynasty(){
 const played=data.fixtures.filter(f=>f.season===data.season),index=schedule.findIndex((_,i)=>!played.some(x=>x.index===i)),f=schedule[index],rank=standings();
 wrap('dynasty',heading('STRIKER','DYNASTY','Compete across a full 30-fixture league season. Earn points, climb the table and win the title.')+
 '<div class="exp-grid">'+info('<small>SEASON</small><strong>'+data.season+'</strong>'+played.length+' / 30 matches')+info('<small>TABLE LEADER</small><strong>'+club(rank[0].team)+'</strong>'+rank[0].points+' points')+info('<small>NEXT MATCH</small><strong>'+(f?club(f.home)+' vs '+club(f.away):'SEASON COMPLETE')+'</strong>')+'</div>'+
 (f?btn('PLAY NEXT MATCH ↗','exp-next')+btn('SIMULATE FIXTURE','exp-sim'):btn('START NEW SEASON','exp-season'))+
 '<table class="exp-table"><thead><tr><th>#</th><th>CLUB</th><th>P</th><th>W</th><th>D</th><th>L</th><th>GD</th><th>PTS</th></tr></thead><tbody>'+rank.map((r,i)=>'<tr><td>'+(i+1)+'</td><td>'+esc(club(r.team))+'</td><td>'+r.p+'</td><td>'+r.w+'</td><td>'+r.d+'</td><td>'+r.l+'</td><td>'+(r.for-r.against)+'</td><td>'+r.points+'</td></tr>').join('')+'</tbody></table>');
 if(f){get('exp-next').onclick=()=>{get('home-select').value=f.home;get('away-select').value=f.away;get('home-select').dispatchEvent(new Event('change'));get('away-select').dispatchEvent(new Event('change'));sessionStorage.setItem('striker-fixture',index);openMenuTab('play')};
 get('exp-sim').onclick=()=>{matchDone(index,Math.floor(Math.random()*4),Math.floor(Math.random()*4));dynasty()}}
 else get('exp-season').onclick=()=>{data.season++;save();dynasty()};
}
function vault(){
 const owned=data.cards.map(x=>pool.find(p=>p.id===x)).filter(Boolean);
 wrap('vault',heading('SQUAD','VAULT','Open free-to-earn Scout Packs, collect original Striker footballers and build your permanent card collection. No real-money purchases.')+
 '<div class="exp-grid">'+info('<small>VAULT COINS</small><strong>◈ '+data.coins+'</strong>Win: 120 · Draw: 80 · Loss: 50')+info('<small>COLLECTION</small><strong>'+owned.length+' / '+pool.length+'</strong>')+info('<small>SCOUT PACK</small><strong>250 COINS</strong>3 random footballers · duplicate refunds')+'</div>'+btn('OPEN SCOUT PACK · 250','exp-open')+'<p id="exp-result"></p><div class="exp-grid">'+(owned.length?owned.map(p=>info('<small>'+esc(p.position)+' · '+esc(club(p.club))+'</small><strong>'+p.overall+' OVR · '+esc(p.name)+'</strong><small>PAC '+p.stats.pace+' / SHO '+p.stats.shooting+' / PAS '+p.stats.passing+'</small>')).join(''):info('No cards collected yet. Open a Scout Pack.'))+'</div>');
 get('exp-open').disabled=data.coins<250;get('exp-open').onclick=()=>{if(data.coins<250)return;data.coins-=250;const list=[];for(let i=0;i<3;i++){const p=pool[Math.floor(Math.random()*pool.length)];list.push(p.name);if(data.cards.includes(p.id))data.coins+=50;else data.cards.push(p.id)}save();vault();get('exp-result').textContent='PACK: '+list.join(' · ')};
}
function engine(){
 wrap('engine',heading('MATCH ENGINE','PRO','Fine-tune the match camera and performance while keeping the existing gameplay and goalkeeper systems intact.')+
 '<div class="exp-grid">'+info('<strong>TACTICAL CAMERA DISTANCE</strong><input id="exp-zoom" type="range" min=".75" max="1.5" step=".05" value="'+data.zoom+'"><p id="exp-zoom-label">'+Math.round(data.zoom*100)+'%</p>')+
 info('<strong>CAMERA ANGLE</strong>'+btn('SWITCH BROADCAST / CLASSIC','exp-angle'))+
 info('<strong>PERFORMANCE OPTIONS</strong>'+btn('OPEN GRAPHICS SETTINGS','exp-graphics'))+'</div>');
 get('exp-zoom').oninput=e=>{cameraZoom=data.zoom=Number(e.target.value);get('exp-zoom-label').textContent=Math.round(data.zoom*100)+'%';save()};
 get('exp-angle').onclick=()=>{cameraMode=cameraMode==='broadcast'?'classic':'broadcast';get('exp-angle').textContent='CAMERA: '+cameraMode.toUpperCase()};
 get('exp-graphics').onclick=()=>openMenuTab('settings');
}
function pulse(){
 wrap('pulse',heading('STADIUM','PULSE','Select matchday lighting and weather. The chosen atmosphere carries into match setup.')+
 '<div class="exp-grid">'+[['day','☀️ DAYLIGHT'],['sunset','🌇 GOLDEN HOUR'],['night','🌙 FLOODLIGHTS'],['rain','🌧️ RAINSTORM']].map(a=>'<button class="exp-card" data-weather="'+a[0]+'" style="text-align:left;cursor:pointer;'+(data.mood===a[0]?'border:2px solid #7affc3':'')+'"><strong>'+a[1]+'</strong><small>'+(data.mood===a[0]?'✓ SELECTED':'SELECT ATMOSPHERE')+'</small></button>').join('')+'</div>'+btn('SET UP MATCH ↗','exp-pulse-play'));
 document.querySelectorAll('[data-weather]').forEach(b=>b.onclick=()=>{data.mood=b.dataset.weather;get('stadium-select').value=data.mood;selectStadium(data.mood);save();pulse()});
 get('exp-pulse-play').onclick=()=>openMenuTab('play');
}
const oldTab=openMenuTab;
openMenuTab=function(tab){oldTab(tab);({dynasty,vault,engine,pulse})[tab]?.()};
const oldResult=writeResult;
writeResult=function(){const wasSaved=resultSaved;oldResult();if(wasSaved||practiceMode)return;const pending=sessionStorage.getItem('striker-fixture');if(pending!==null){const index=Number(pending),f=schedule[index];if(f&&f.home===get('home-select').value&&f.away===get('away-select').value)matchDone(index,score[0],score[1]);sessionStorage.removeItem('striker-fixture')}data.coins+=score[0]>score[1]?120:score[0]===score[1]?80:50;save()};
cameraZoom=data.zoom;get('stadium-select').value=data.mood;selectStadium(data.mood);
window.StrikerExpansion={version:'3.0',getData:()=>JSON.parse(JSON.stringify(data))};
})();
