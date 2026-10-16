/* Striker FC 26 v2.0.0: same-origin offline gameplay cache. */
const CACHE='striker-fc-v2.0.0';
const PREFIX='striker-fc-v';
const CORE=[
 './',
 './index.html',
 './vendor/three.module.js',
 './vendor/three.core.js',
 './manifest.webmanifest',
 './icon.svg'
];
self.addEventListener('install',event=>{
 event.waitUntil(
  caches.open(CACHE).then(cache=>cache.addAll(CORE))
   .then(()=>self.skipWaiting())
 );
});
self.addEventListener('activate',event=>{
 event.waitUntil(
  caches.keys().then(keys=>Promise.all(keys.filter(key=>key.startsWith(PREFIX)&&key!==CACHE).map(key=>caches.delete(key))))
   .then(()=>self.clients.claim())
 );
});
self.addEventListener('fetch',event=>{
 const request=event.request;
 if(request.method!=='GET')return;
 const url=new URL(request.url);
 if(url.origin!==self.location.origin)return;
 if(request.mode==='navigate'){
  event.respondWith(
   fetch(request).then(response=>{
    if(response.ok){const copy=response.clone();event.waitUntil(caches.open(CACHE).then(cache=>cache.put(request,copy)));}
    return response;
   }).catch(async()=>{
    const cache=await caches.open(CACHE);
    return (await cache.match(request,{ignoreSearch:true}))||
      (await cache.match('./index.html'))||
      Response.error();
   })
  );
  return;
 }
 event.respondWith(
  caches.match(request,{ignoreSearch:true}).then(cached=>cached||
   fetch(request).then(response=>{
    if(response.ok){const copy=response.clone();event.waitUntil(caches.open(CACHE).then(cache=>cache.put(request,copy)));}
    return response;
   })
  )
 );
});
