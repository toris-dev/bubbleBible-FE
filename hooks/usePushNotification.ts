'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  detectBrowser,
  registerServiceWorker,
  subscribeToPush,
  unsubscribeFromPush,
  getExistingSubscription,
  getNotificationPermission,
  requestNotificationPermission,
  sendNotification,
  isNotificationSupported,
  NotificationOptions,
} from '@/lib/pushNotification';

export interface UsePushNotificationReturn {
  // 상태
  isSupported: boolean;
  permission: NotificationPermission | null;
  subscription: PushSubscription | null;
  swStatus: string;
  debugInfo: string[];
  browserInfo: string;
  
  // 함수
  requestPermission: () => Promise<void>;
  subscribe: () => Promise<void>;
  unsubscribe: () => Promise<void>;
  sendTestNotification: (options: NotificationOptions) => Promise<void>;
  sendScheduledNotification: (options: NotificationOptions, delay?: number) => Promise<void>;
  clearDebugInfo: () => void;
  addDebugInfo: (message: string) => void;
}

export function usePushNotification(): UsePushNotificationReturn {
  const [isSupported, setIsSupported] = useState(false);
  const [permission, setPermission] = useState<NotificationPermission | null>(null);
  const [subscription, setSubscription] = useState<PushSubscription | null>(null);
  const [swStatus, setSwStatus] = useState<string>('확인 중...');
  const [debugInfo, setDebugInfo] = useState<string[]>([]);
  const [browserInfo, setBrowserInfo] = useState<string>('');

  const addDebugInfo = useCallback((message: string) => {
    setDebugInfo(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
    console.log(message);
  }, []);

  const clearDebugInfo = useCallback(() => {
    setDebugInfo([]);
  }, []);

  // 초기화
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const supported = isNotificationSupported();
      setIsSupported(supported);
      
      if (supported) {
        const currentPermission = getNotificationPermission();
        setPermission(currentPermission);
        
        const browser = detectBrowser();
        setBrowserInfo(browser);
        addDebugInfo(`브라우저 감지: ${browser}`);
        
        initializeServiceWorker();
      }
    }
  }, [addDebugInfo]);

  const initializeServiceWorker = async () => {
    try {
      if ('serviceWorker' in navigator) {
        addDebugInfo('Service Worker 등록 시도 중...');
        
        const registration = await registerServiceWorker('/sw.js', '/');
        addDebugInfo('Service Worker 등록 완료');
        addDebugInfo('Service Worker 활성화 완료');
        setSwStatus('활성화됨');
        
        // 기존 구독 확인
        const sub = await getExistingSubscription();
        if (sub) {
          setSubscription(sub);
          addDebugInfo('기존 푸시 구독 발견');
        } else {
          addDebugInfo('푸시 구독 없음 (로컬 알림은 정상 작동)');
        }
      } else {
        setSwStatus('지원 안 함');
        addDebugInfo('Service Worker를 지원하지 않는 브라우저입니다');
      }
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : '알 수 없는 오류';
      console.error('Service Worker 초기화 실패:', error);
      setSwStatus(`오류: ${errorMsg}`);
      addDebugInfo(`Service Worker 초기화 실패: ${errorMsg}`);
    }
  };

  const requestPermission = useCallback(async () => {
    if (!('Notification' in window)) {
      alert('이 브라우저는 알림을 지원하지 않습니다.');
      return;
    }

    try {
      const newPermission = await requestNotificationPermission();
      setPermission(newPermission);

      if (newPermission === 'granted') {
        try {
          await registerServiceWorker('/sw.js', '/');
          addDebugInfo('Service Worker 등록 완료');
          
          const existingSub = await getExistingSubscription();
          if (existingSub) {
            setSubscription(existingSub);
            addDebugInfo('기존 푸시 구독 발견');
          } else {
            addDebugInfo('푸시 구독 없음 (로컬 알림은 정상 작동)');
          }
        } catch (error) {
          const errorMsg = error instanceof Error ? error.message : '알 수 없는 오류';
          addDebugInfo(`Service Worker 등록 실패: ${errorMsg}`);
          alert(`Service Worker 등록 실패: ${errorMsg}`);
        }
      }
    } catch (error) {
      console.error('알림 권한 요청 실패:', error);
      const errorMsg = error instanceof Error ? error.message : '알 수 없는 오류';
      addDebugInfo(`알림 권한 요청 실패: ${errorMsg}`);
    }
  }, [addDebugInfo]);

  const subscribe = useCallback(async () => {
    try {
      const sub = await subscribeToPush(addDebugInfo);
      setSubscription(sub);
      alert('푸시 구독이 활성화되었습니다!\n\n이제 서버에서 푸시 알림을 받을 수 있습니다.');
    } catch (subscribeError) {
      const errorMsg = subscribeError instanceof Error ? subscribeError.message : '알 수 없는 오류';
      const errorDetails = subscribeError instanceof Error ? subscribeError.stack : '';
      addDebugInfo(`푸시 구독 실패: ${errorMsg}`);
      
      if (errorDetails) {
        addDebugInfo(`에러 상세: ${errorDetails.substring(0, 200)}`);
      }
      console.error('푸시 구독 에러 상세:', subscribeError);
      
      // 에러 타입별 안내 메시지
      let userMessage = `푸시 구독에 실패했습니다: ${errorMsg}\n\n`;
      
      if (errorMsg.includes('push service error') || errorMsg.includes('Registration failed')) {
        userMessage += '⚠️ 푸시 서비스 오류가 발생했습니다.\n\n';
        
        // Brave 브라우저 특별 안내
        if (browserInfo.toLowerCase().includes('brave')) {
          userMessage += '🔒 Brave 브라우저 감지됨\n\n';
          userMessage += 'Brave는 프라이버시 보호 기능으로 인해 푸시 구독이 제한될 수 있습니다.\n\n';
          userMessage += '해결 방법:\n';
          userMessage += '1. Brave 설정 → Shields → 이 사이트에 대해 Shields 다운\n';
          userMessage += '2. 또는 주소창의 🦁 아이콘 클릭 → Shields 다운\n';
          userMessage += '3. 알림 권한이 허용되어 있는지 확인\n';
          userMessage += '4. 페이지 새로고침 후 다시 시도\n\n';
          userMessage += '💡 참고: 로컬 알림은 구독 없이도 정상 작동합니다!\n';
          userMessage += '"즉시 알림 전송" 버튼으로 테스트할 수 있습니다.';
        } else {
          userMessage += '가능한 원인:\n';
          userMessage += '1. 브라우저가 푸시 서비스를 지원하지 않음\n';
          userMessage += '2. 네트워크 연결 문제\n';
          userMessage += '3. 브라우저 설정에서 푸시 알림이 차단됨\n\n';
          userMessage += '💡 참고: 로컬 알림은 구독 없이도 정상 작동합니다!\n';
          userMessage += '"즉시 알림 전송" 버튼으로 테스트할 수 있습니다.';
        }
      } else {
        userMessage += '로컬 알림은 구독 없이도 정상 작동합니다.\n\n브라우저 콘솔을 확인해주세요.';
      }
      
      alert(userMessage);
    }
  }, [addDebugInfo, browserInfo]);

  const unsubscribe = useCallback(async () => {
    try {
      await unsubscribeFromPush(addDebugInfo);
      setSubscription(null);
      alert('푸시 구독이 취소되었습니다.\n로컬 알림은 계속 작동합니다.');
    } catch (error) {
      console.error('푸시 구독 취소 실패:', error);
      const errorMsg = error instanceof Error ? error.message : '알 수 없는 오류';
      addDebugInfo(`푸시 구독 취소 실패: ${errorMsg}`);
    }
  }, [addDebugInfo]);

  const sendTestNotification = useCallback(async (options: NotificationOptions) => {
    if (permission !== 'granted') {
      alert('알림 권한이 필요합니다. 먼저 알림 권한을 요청해주세요.');
      return;
    }

    try {
      await sendNotification(options);
      
      // 서버로 푸시 알림 요청 (실제 프로덕션에서는 사용)
      try {
        const response = await fetch('/api/push', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title: options.title,
            body: options.body,
            icon: options.icon || '/placeholder-logo.png',
            badge: options.badge || '/placeholder-logo.png',
            tag: options.tag || 'bible-daily',
          }),
        });
        
        if (response.ok) {
          console.log('서버 알림 요청 성공');
        }
      } catch (apiError) {
        console.warn('서버 알림 요청 실패 (로컬 알림은 정상 작동):', apiError);
      }
    } catch (error) {
      console.error('알림 전송 실패:', error);
      alert(`알림 전송에 실패했습니다: ${error instanceof Error ? error.message : '알 수 없는 오류'}`);
    }
  }, [permission]);

  const sendScheduledNotification = useCallback(async (
    options: NotificationOptions,
    delay: number = 5000
  ) => {
    if (permission !== 'granted') {
      alert('알림 권한이 필요합니다. 먼저 알림 권한을 요청해주세요.');
      return;
    }

    setTimeout(async () => {
      try {
        await sendNotification(options);
      } catch (error) {
        console.error('예약 알림 전송 실패:', error);
      }
    }, delay);

    alert(`${delay / 1000}초 후 알림이 전송됩니다.`);
  }, [permission]);

  return {
    // 상태
    isSupported,
    permission,
    subscription,
    swStatus,
    debugInfo,
    browserInfo,
    
    // 함수
    requestPermission,
    subscribe,
    unsubscribe,
    sendTestNotification,
    sendScheduledNotification,
    clearDebugInfo,
    addDebugInfo,
  };
}

