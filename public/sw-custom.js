// 커스텀 Service Worker - next-pwa와 함께 사용
// next-pwa가 생성한 workbox Service Worker에 푸시 알림 기능 추가

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
  // 알림이 닫혔을 때 필요한 로직이 있다면 여기에 추가
  console.log("알림이 닫혔습니다:", event.notification.tag);
});

