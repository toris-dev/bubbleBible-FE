if(!self.define){let e,s={};const a=(a,c)=>(a=new URL(a+".js",c).href,s[a]||new Promise(s=>{if("document"in self){const e=document.createElement("script");e.src=a,e.onload=s,document.head.appendChild(e)}else e=a,importScripts(a),s()}).then(()=>{let e=s[a];if(!e)throw new Error(`Module ${a} didn’t register its module`);return e}));self.define=(c,i)=>{const r=e||("document"in self?document.currentScript.src:"")||location.href;if(s[r])return;let t={};const n=e=>a(e,r),d={module:{uri:r},exports:t,require:n};s[r]=Promise.all(c.map(e=>d[e]||n(e))).then(e=>(i(...e),t))}}define(["./workbox-d71bdc52"],function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/app-build-manifest.json",revision:"32504bd35d692a98f7dc6063bf3d80b3"},{url:"/_next/static/chunks/204.220041658c6a4475.js",revision:"220041658c6a4475"},{url:"/_next/static/chunks/590.b63cd3f3806992dc.js",revision:"b63cd3f3806992dc"},{url:"/_next/static/chunks/744843f8-6cac392cc036c9bd.js",revision:"xL-AOZIRrYhPhXO2mWlAE"},{url:"/_next/static/chunks/879-2d9ea93916094c8d.js",revision:"xL-AOZIRrYhPhXO2mWlAE"},{url:"/_next/static/chunks/app/_not-found/page-a4bb322e6b6ee7d7.js",revision:"xL-AOZIRrYhPhXO2mWlAE"},{url:"/_next/static/chunks/app/api/push/route-8daf37a69b39a83d.js",revision:"xL-AOZIRrYhPhXO2mWlAE"},{url:"/_next/static/chunks/app/api/push/subscribe/route-11b66d1cf57771d5.js",revision:"xL-AOZIRrYhPhXO2mWlAE"},{url:"/_next/static/chunks/app/api/push/vapid-key/route-7f7110ac6eee6442.js",revision:"xL-AOZIRrYhPhXO2mWlAE"},{url:"/_next/static/chunks/app/layout-b4d9561e28df5d5c.js",revision:"xL-AOZIRrYhPhXO2mWlAE"},{url:"/_next/static/chunks/app/loading-363f2adae59feb7d.js",revision:"xL-AOZIRrYhPhXO2mWlAE"},{url:"/_next/static/chunks/app/page-f00488a10e7e58ed.js",revision:"xL-AOZIRrYhPhXO2mWlAE"},{url:"/_next/static/chunks/framework-c5868d49362304ac.js",revision:"xL-AOZIRrYhPhXO2mWlAE"},{url:"/_next/static/chunks/main-app-7befc4f367c60ad4.js",revision:"xL-AOZIRrYhPhXO2mWlAE"},{url:"/_next/static/chunks/main-b8f88e034f651a90.js",revision:"xL-AOZIRrYhPhXO2mWlAE"},{url:"/_next/static/chunks/pages/_app-f3441ab02f3e186f.js",revision:"xL-AOZIRrYhPhXO2mWlAE"},{url:"/_next/static/chunks/pages/_error-541a83355fe512c5.js",revision:"xL-AOZIRrYhPhXO2mWlAE"},{url:"/_next/static/chunks/polyfills-42372ed130431b0a.js",revision:"846118c33b2c0e922d7b3a7676f81f6f"},{url:"/_next/static/chunks/webpack-f8c4daf0abc01ad2.js",revision:"xL-AOZIRrYhPhXO2mWlAE"},{url:"/_next/static/css/daec11f037f21b91.css",revision:"daec11f037f21b91"},{url:"/_next/static/media/19cfc7226ec3afaa-s.woff2",revision:"9dda5cfc9a46f256d0e131bb535e46f8"},{url:"/_next/static/media/21350d82a1f187e9-s.woff2",revision:"4e2553027f1d60eff32898367dd4d541"},{url:"/_next/static/media/8e9860b6e62d6359-s.woff2",revision:"01ba6c2a184b8cba08b0d57167664d75"},{url:"/_next/static/media/ba9851c3c22cd980-s.woff2",revision:"9e494903d6b0ffec1a1e14d34427d44d"},{url:"/_next/static/media/c5fe6dc8356a8c31-s.woff2",revision:"027a89e9ab733a145db70f09b8a18b42"},{url:"/_next/static/media/df0a9ae256c0569c-s.woff2",revision:"d54db44de5ccb18886ece2fda72bdfe0"},{url:"/_next/static/media/e4af272ccee01ff0-s.p.woff2",revision:"65850a373e258f1c897a2b3d75eb74de"},{url:"/_next/static/xL-AOZIRrYhPhXO2mWlAE/_buildManifest.js",revision:"547be374ed2ce5cf7ba546976223b719"},{url:"/_next/static/xL-AOZIRrYhPhXO2mWlAE/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/browserconfig.xml",revision:"d1dc856188b06111a650550567f31f0c"},{url:"/manifest.json",revision:"a4dea0e0d69d7eaca6d8ddafb0701603"},{url:"/placeholder-logo.png",revision:"95d8d1a4a9bbcccc875e2c381e74064a"},{url:"/placeholder-logo.svg",revision:"1e16dc7df824652c5906a2ab44aef78c"},{url:"/placeholder-user.jpg",revision:"7ee6562646feae6d6d77e2c72e204591"},{url:"/placeholder.jpg",revision:"1e533b7b4545d1d605144ce893afc601"},{url:"/placeholder.svg",revision:"35707bd9960ba5281c72af927b79291f"},{url:"/sw-custom.js",revision:"8239d3cd56c5ecb3acd3d461d6518703"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:a,state:c})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https?.*/,new e.NetworkFirst({cacheName:"offlineCache",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:200})]}),"GET"),e.registerRoute(/\/api\/push\/.*/,new e.NetworkOnly({cacheName:"api-cache",plugins:[]}),"GET"),e.registerRoute(/\.(?:png|jpg|jpeg|svg|gif|webp|ico)$/,new e.CacheFirst({cacheName:"image-cache",plugins:[new e.ExpirationPlugin({maxEntries:100,maxAgeSeconds:2592e3})]}),"GET")});

// 푸시 알림 이벤트 리스너
self.addEventListener("push", (event) => {
  const data = event.data ? event.data.json() : {};
  const title = data.title || "성경 포털";
  const options = {
    body: data.body || "새로운 성경 말씀이 있습니다",
    icon: data.icon || "/placeholder-logo.png",
    badge: data.badge || "/placeholder-logo.png",
    tag: data.tag || "bible-notification",
    requireInteraction: data.requireInteraction || false,
    data: data.data || {},
    vibrate: data.vibrate || [200, 100, 200],
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

// 알림 클릭 이벤트 리스너
self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  const urlToOpen = event.notification.data?.url || "/";

  event.waitUntil(
    clients
      .matchAll({
        type: "window",
        includeUncontrolled: true,
      })
      .then((clientList) => {
        // 이미 열려있는 창이 있으면 포커스
        for (let i = 0; i < clientList.length; i++) {
          const client = clientList[i];
          if (client.url === urlToOpen && "focus" in client) {
            return client.focus();
          }
        }
        // 새 창 열기
        if (clients.openWindow) {
          return clients.openWindow(urlToOpen);
        }
      })
  );
});

// 알림 닫기 이벤트 리스너
self.addEventListener("notificationclose", (event) => {
  console.log("알림이 닫혔습니다:", event.notification.tag);
});

// 푸시 알림 이벤트 리스너
self.addEventListener("push", (event) => {
  const data = event.data ? event.data.json() : {};
  const title = data.title || "성경 포털";
  const options = {
    body: data.body || "새로운 성경 말씀이 있습니다",
    icon: data.icon || "/placeholder-logo.png",
    badge: data.badge || "/placeholder-logo.png",
    tag: data.tag || "bible-notification",
    requireInteraction: data.requireInteraction || false,
    data: data.data || {},
    vibrate: data.vibrate || [200, 100, 200],
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

// 알림 클릭 이벤트 리스너
self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  const urlToOpen = event.notification.data?.url || "/";

  event.waitUntil(
    clients
      .matchAll({
        type: "window",
        includeUncontrolled: true,
      })
      .then((clientList) => {
        // 이미 열려있는 창이 있으면 포커스
        for (let i = 0; i < clientList.length; i++) {
          const client = clientList[i];
          if (client.url === urlToOpen && "focus" in client) {
            return client.focus();
          }
        }
        // 새 창 열기
        if (clients.openWindow) {
          return clients.openWindow(urlToOpen);
        }
      })
  );
});

// 알림 닫기 이벤트 리스너
self.addEventListener("notificationclose", (event) => {
  console.log("알림이 닫혔습니다:", event.notification.tag);
});
