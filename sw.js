const CACHE="misa-v13";
const ARCHIVOS=["./","./index.html","./cap1.html","./juego.html","./repaso.html","./pausa.html","./gloria.html","./saludo.html","./procesion.html","./canto_entrada.html","./ofrenda.html","./intenciones.html","./tarjeta.html",
  "./cruz.html","./lampara.html","./postura.html","./canciones.html",
  "./manifest.webmanifest","./icon-192.png","./icon-512.png"];
self.addEventListener("install",e=>{
  self.skipWaiting();
  e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ARCHIVOS)).catch(()=>{}));
});
self.addEventListener("activate",e=>{
  e.waitUntil(caches.keys().then(k=>Promise.all(
    k.filter(n=>n!==CACHE).map(n=>caches.delete(n)))).then(()=>self.clients.claim()));
});
self.addEventListener("fetch",e=>{
  if(e.request.method!=="GET") return;
  e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).then(res=>{
    const copia=res.clone();
    caches.open(CACHE).then(c=>c.put(e.request,copia)).catch(()=>{});
    return res;
  }).catch(()=>caches.match("./index.html"))));
});
