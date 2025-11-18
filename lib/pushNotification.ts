/**
 * 푸시 알림 관련 유틸리티 함수들
 * 서버 컴포넌트와 클라이언트 컴포넌트 모두에서 사용 가능
 */

/**
 * 브라우저 타입 감지
 */
export function detectBrowser(): string {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') {
    return 'Unknown';
  }

  const userAgent = navigator.userAgent.toLowerCase();
  let browser = 'Unknown';
  
  if (userAgent.includes('brave')) {
    browser = 'Brave';
    // Brave 브라우저 감지 (더 정확한 방법)
    if ((navigator as any).brave && (navigator as any).brave.isBrave) {
      browser = 'Brave (확인됨)';
    }
  } else if (userAgent.includes('chrome') && !userAgent.includes('edg')) {
    browser = 'Chrome';
  } else if (userAgent.includes('firefox')) {
    browser = 'Firefox';
  } else if (userAgent.includes('safari') && !userAgent.includes('chrome')) {
    browser = 'Safari';
  } else if (userAgent.includes('edg')) {
    browser = 'Edge';
  }
  
  return browser;
}

/**
 * Base64URL 문자열을 Uint8Array로 변환
 */
export function urlBase64ToUint8Array(base64String: string): Uint8Array {
  try {
    // Base64URL을 일반 Base64로 변환
    let base64 = base64String.replace(/-/g, '+').replace(/_/g, '/');
    
    // 패딩 추가
    while (base64.length % 4) {
      base64 += '=';
    }
    
    // Base64 디코딩
    if (typeof window === 'undefined') {
      throw new Error('window 객체가 없습니다. 클라이언트 환경에서만 사용 가능합니다.');
    }
    
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    
    return outputArray;
  } catch (error) {
    console.error('VAPID 키 변환 실패:', error);
    throw new Error(`VAPID 키 변환 실패: ${error instanceof Error ? error.message : '알 수 없는 오류'}`);
  }
}

/**
 * 알림 전송 옵션 타입
 */
export interface NotificationOptions {
  title: string;
  body: string;
  icon?: string;
  badge?: string;
  tag?: string;
  requireInteraction?: boolean;
  vibrate?: number[];
}

/**
 * Service Worker를 통한 알림 전송
 */
export async function sendNotification(options: NotificationOptions): Promise<void> {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') {
    throw new Error('브라우저 환경에서만 사용 가능합니다.');
  }

  if (!('serviceWorker' in navigator)) {
    throw new Error('Service Worker를 지원하지 않는 브라우저입니다.');
  }

  try {
    const registration = await navigator.serviceWorker.ready;
    
    if (registration) {
      await registration.showNotification(options.title, {
        body: options.body,
        icon: options.icon || '/placeholder-logo.png',
        badge: options.badge || '/placeholder-logo.png',
        tag: options.tag || 'bible-daily',
        requireInteraction: options.requireInteraction || false,
        ...('vibrate' in navigator && options.vibrate && { vibrate: options.vibrate }),
      } as NotificationOptions);
    } else {
      // Service Worker가 없으면 브라우저 알림 사용
      if (!('Notification' in window)) {
        throw new Error('알림을 지원하지 않는 브라우저입니다.');
      }
      
      new Notification(options.title, {
        body: options.body,
        icon: options.icon || '/placeholder-logo.png',
        badge: options.badge || '/placeholder-logo.png',
        tag: options.tag || 'bible-daily',
        requireInteraction: options.requireInteraction || false,
      });
    }
  } catch (error) {
    console.error('알림 전송 실패:', error);
    throw error;
  }
}

/**
 * Service Worker 등록
 */
export async function registerServiceWorker(swPath: string = '/sw.js', scope: string = '/'): Promise<ServiceWorkerRegistration> {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') {
    throw new Error('브라우저 환경에서만 사용 가능합니다.');
  }

  if (!('serviceWorker' in navigator)) {
    throw new Error('Service Worker를 지원하지 않는 브라우저입니다.');
  }

  try {
    // 이미 등록된 Service Worker 확인
    let registration = await navigator.serviceWorker.getRegistration();
    
    if (!registration) {
      registration = await navigator.serviceWorker.register(swPath, { scope });
    }
    
    // Service Worker가 활성화될 때까지 대기
    await navigator.serviceWorker.ready;
    
    return registration;
  } catch (error) {
    console.error('Service Worker 등록 실패:', error);
    throw error;
  }
}

/**
 * 푸시 구독 생성
 */
export async function subscribeToPush(
  onDebug?: (message: string) => void
): Promise<PushSubscription> {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') {
    throw new Error('브라우저 환경에서만 사용 가능합니다.');
  }

  if (!('serviceWorker' in navigator)) {
    throw new Error('Service Worker를 지원하지 않는 브라우저입니다.');
  }

  try {
    const registration = await navigator.serviceWorker.ready;
    
    onDebug?.('VAPID 키 가져오는 중...');
    
    // API에서 VAPID 공개 키 가져오기
    const vapidKeyResponse = await fetch('/api/push/vapid-key');
    const vapidKeyData = await vapidKeyResponse.json();
    
    if (!vapidKeyData.success || !vapidKeyData.publicKey) {
      throw new Error(vapidKeyData.error || 'VAPID 키를 가져올 수 없습니다');
    }
    
    const vapidPublicKey = vapidKeyData.publicKey;
    onDebug?.('VAPID 키 가져오기 성공');
    onDebug?.('푸시 구독 시도 중...');
    
    // VAPID 공개 키를 Uint8Array로 변환
    onDebug?.(`VAPID 키 변환 중... (키 길이: ${vapidPublicKey.length})`);
    onDebug?.(`VAPID 키 (처음 20자): ${vapidPublicKey.substring(0, 20)}...`);
    
    const applicationServerKey = urlBase64ToUint8Array(vapidPublicKey);
    onDebug?.(`VAPID 키 변환 완료 (배열 길이: ${applicationServerKey.length})`);
    
    // 브라우저 푸시 서비스 지원 확인
    if (!registration.pushManager) {
      throw new Error('브라우저가 푸시 서비스를 지원하지 않습니다');
    }
    
    onDebug?.('푸시 구독 생성 중...');
    
    // 타임아웃 설정 (10초)
    const subscribePromise = registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: applicationServerKey,
    });
    
    const timeoutPromise = new Promise<never>((_, reject) => 
      setTimeout(() => reject(new Error('푸시 구독 타임아웃 (10초)')), 10000)
    );
    
    const subscription = await Promise.race([subscribePromise, timeoutPromise]);
    
    onDebug?.('푸시 구독 성공!');
    onDebug?.(`구독 엔드포인트: ${subscription.endpoint.substring(0, 50)}...`);
    
    // 구독 정보를 서버에 전송 (선택사항)
    try {
      const subscribeResponse = await fetch('/api/push/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          subscription: subscription.toJSON(),
        }),
      });
      
      if (subscribeResponse.ok) {
        onDebug?.('구독 정보를 서버에 전송했습니다');
      } else {
        onDebug?.('서버에 구독 정보 전송 실패 (구독은 정상 작동)');
      }
    } catch (serverError) {
      onDebug?.('서버에 구독 정보 전송 실패 (구독은 정상 작동)');
    }
    
    return subscription;
  } catch (error) {
    console.error('푸시 구독 실패:', error);
    throw error;
  }
}

/**
 * 푸시 구독 취소
 */
export async function unsubscribeFromPush(
  onDebug?: (message: string) => void
): Promise<void> {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') {
    throw new Error('브라우저 환경에서만 사용 가능합니다.');
  }

  if (!('serviceWorker' in navigator)) {
    throw new Error('Service Worker를 지원하지 않는 브라우저입니다.');
  }

  try {
    const registration = await navigator.serviceWorker.ready;
    const subscription = await registration.pushManager.getSubscription();
    
    if (subscription) {
      await subscription.unsubscribe();
      onDebug?.('푸시 구독 취소됨');
    }
  } catch (error) {
    console.error('푸시 구독 취소 실패:', error);
    throw error;
  }
}

/**
 * 기존 푸시 구독 확인
 */
export async function getExistingSubscription(): Promise<PushSubscription | null> {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') {
    return null;
  }

  if (!('serviceWorker' in navigator)) {
    return null;
  }

  try {
    const registration = await navigator.serviceWorker.ready;
    const subscription = await registration.pushManager.getSubscription();
    return subscription;
  } catch (error) {
    console.error('푸시 구독 확인 실패:', error);
    return null;
  }
}

/**
 * 알림 권한 확인
 */
export function getNotificationPermission(): NotificationPermission | null {
  if (typeof window === 'undefined' || !('Notification' in window)) {
    return null;
  }
  
  return Notification.permission;
}

/**
 * 알림 권한 요청
 */
export async function requestNotificationPermission(): Promise<NotificationPermission> {
  if (typeof window === 'undefined' || !('Notification' in window)) {
    throw new Error('이 브라우저는 알림을 지원하지 않습니다.');
  }

  return await Notification.requestPermission();
}

/**
 * 알림 지원 여부 확인
 */
export function isNotificationSupported(): boolean {
  if (typeof window === 'undefined') {
    return false;
  }
  
  return 'Notification' in window && 'serviceWorker' in navigator;
}

