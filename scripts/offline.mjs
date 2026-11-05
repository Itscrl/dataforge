import {readdir,writeFile,readFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
async function files(dir){const out=[];for(const f of await readdir(dir,{withFileTypes:true})){if(f.isDirectory())out.push(...await files(`${dir}/${f.name}`));else out.push(`${dir}/${f.name}`);}return out;}
const root='dist/client';
const all=(await files(root)).filter(f=>!f.endsWith('/sw.js'));const digest=createHash('sha256');for(const file of all)digest.update(await readFile(file));const version=digest.digest('hex').slice(0,12);const paths=all.filter(f=>!f.endsWith('.pdf')).map(f=>'/'+f.slice(root.length+1));
await writeFile(root+'/sw.js',`const CACHE='dataforge-${version}';const ASSETS=${JSON.stringify(['/',...paths])};
self.addEventListener('install',event=>{event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(ASSETS)));});
self.addEventListener('activate',event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('dataforge-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',event=>{const url=new URL(event.request.url);if(event.request.method!=='GET'||url.origin!==self.location.origin)return;if(event.request.mode==='navigate'){event.respondWith(fetch(event.request).catch(()=>caches.match('/index.html',{ignoreVary:true})));return;}event.respondWith(caches.match(event.request,{ignoreVary:true}).then(cached=>cached||fetch(event.request)));});`);
console.log(`Offline bundle: ${paths.length} assets, version ${version}`);

