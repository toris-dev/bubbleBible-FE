// next-pwa가 생성한 Service Worker에 푸시 알림 기능 추가
const fs = require('fs');
const path = require('path');

const swPath = path.join(__dirname, '../public/sw.js');

if (fs.existsSync(swPath)) {
  let swContent = fs.readFileSync(swPath, 'utf8');
  
  // 이미 푸시 알림 코드가 있는지 확인
  if (!swContent.includes('push notification')) {
    const pushCode = `
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
`;

    // Service Worker 파일 끝에 푸시 알림 코드 추가
    swContent += pushCode;
    fs.writeFileSync(swPath, swContent, 'utf8');
    console.log('✅ 푸시 알림 기능이 Service Worker에 추가되었습니다.');
  } else {
    console.log('ℹ️  푸시 알림 기능이 이미 포함되어 있습니다.');
  }
} else {
  console.log('⚠️  Service Worker 파일을 찾을 수 없습니다:', swPath);
}

