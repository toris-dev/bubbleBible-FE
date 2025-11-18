'use client';

import { useState, useEffect, useRef } from 'react';
import { usePushNotification } from '@/hooks/usePushNotification';

export default function PushNotificationTest() {
  const [notificationTitle, setNotificationTitle] = useState('오늘의 성경 말씀');
  const [notificationBody, setNotificationBody] = useState('요한복음 3:16 - 하나님이 세상을 이처럼 사랑하사 독생자를 주셨으니...');
  const [activeTab, setActiveTab] = useState<'home' | 'notification' | 'bible' | 'settings'>('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  const {
    isSupported,
    permission,
    subscription,
    swStatus,
    debugInfo,
    browserInfo,
    requestPermission,
    subscribe,
    unsubscribe,
    sendTestNotification,
    sendScheduledNotification,
    clearDebugInfo,
  } = usePushNotification();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSendTestNotification = async () => {
    await sendTestNotification({
      title: notificationTitle,
      body: notificationBody,
      icon: '/placeholder-logo.png',
      badge: '/placeholder-logo.png',
      tag: 'bible-daily',
      vibrate: [200, 100, 200],
    });
  };

  const handleSendScheduledNotification = async () => {
    await sendScheduledNotification({
      title: '예약된 성경 말씀',
      body: '창세기 1:1 - 태초에 하나님이 천지를 창조하시니라',
      icon: '/placeholder-logo.png',
      badge: '/placeholder-logo.png',
      tag: 'bible-scheduled',
      vibrate: [200, 100, 200],
    }, 5000);
  };

  if (!isSupported) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-gray-900 dark:to-gray-800">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">브라우저가 알림을 지원하지 않습니다</h1>
          <p className="text-gray-600 dark:text-gray-400">최신 브라우저를 사용해주세요.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pb-20">
      {/* 상단 헤더 - 스크롤 시 고정 */}
      <header 
        className={`sticky top-0 z-50 backdrop-blur-lg bg-white/80 dark:bg-gray-900/80 border-b transition-all duration-300 ${
          isScrolled ? 'shadow-md' : 'shadow-sm'
        }`}
      >
        <div className="max-w-md mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                성경 포털
              </h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">오늘의 말씀</p>
            </div>
            <div className="flex items-center gap-2">
              {permission === 'granted' && (
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* 메인 컨텐츠 */}
      <main className="max-w-md mx-auto px-4 py-6 space-y-4" ref={scrollContainerRef}>
        {/* 오늘의 성경 말씀 카드 - 첫 번째 */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30 shadow-lg transform transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]">
          <div className="p-6">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-amber-700 dark:text-amber-300 uppercase tracking-wide">
                오늘의 말씀
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400">요한복음 3:16</span>
            </div>
            <p className="text-gray-800 dark:text-gray-100 text-lg leading-relaxed font-medium">
              하나님이 세상을 이처럼 사랑하사 독생자를 주셨으니 이는 그를 믿는 자마다 멸망하지 않고 영생을 얻게 하려 하심이라
            </p>
            <div className="mt-4 flex gap-2">
              <button className="flex-1 bg-white/80 dark:bg-gray-800/80 text-amber-700 dark:text-amber-300 py-2 px-4 rounded-xl text-sm font-medium transition-all duration-200 active:scale-95">
                공유하기
              </button>
              <button className="flex-1 bg-white/80 dark:bg-gray-800/80 text-amber-700 dark:text-amber-300 py-2 px-4 rounded-xl text-sm font-medium transition-all duration-200 active:scale-95">
                북마크
              </button>
            </div>
          </div>
        </div>

        {/* 알림 상태 카드 */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-5 transform transition-all duration-300">
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
            <span className="w-1 h-5 bg-gradient-to-b from-amber-500 to-orange-500 rounded-full"></span>
            알림 설정
          </h2>
          
          <div className="space-y-3">
            {/* 상태 배지들 */}
            <div className="flex flex-wrap gap-2">
              {browserInfo && (
                <span className={`px-3 py-1.5 rounded-full text-xs font-medium ${
                  browserInfo.toLowerCase().includes('brave') 
                    ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300' 
                    : 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300'
                }`}>
                  {browserInfo}
                </span>
              )}
              <span className={`px-3 py-1.5 rounded-full text-xs font-medium ${
                permission === 'granted' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300' :
                permission === 'denied' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300' :
                'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300'
              }`}>
                {permission === 'granted' ? '✓ 허용됨' : permission === 'denied' ? '✗ 거부됨' : '⚠ 요청 필요'}
              </span>
              <span className={`px-3 py-1.5 rounded-full text-xs font-medium ${
                subscription ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300' :
                'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
              }`}>
                {subscription ? '🔔 구독 중' : '구독 안 함'}
              </span>
            </div>

            {/* 액션 버튼들 */}
            <div className="space-y-2 pt-2">
              {permission !== 'granted' && (
                <button
                  onClick={requestPermission}
                  className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium py-3.5 px-4 rounded-xl transition-all duration-200 active:scale-[0.98] shadow-lg shadow-blue-500/30"
                >
                  알림 권한 요청
                </button>
              )}
              {permission === 'granted' && !subscription && (
                <button
                  onClick={subscribe}
                  className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-medium py-3.5 px-4 rounded-xl transition-all duration-200 active:scale-[0.98] shadow-lg shadow-purple-500/30"
                >
                  푸시 구독 활성화
                </button>
              )}
              {permission === 'granted' && subscription && (
                <button
                  onClick={unsubscribe}
                  className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-medium py-3.5 px-4 rounded-xl transition-all duration-200 active:scale-[0.98] shadow-lg shadow-red-500/30"
                >
                  푸시 구독 취소
                </button>
              )}
            </div>
          </div>
        </div>

        {/* 알림 테스트 카드 */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-5 transform transition-all duration-300">
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
            <span className="w-1 h-5 bg-gradient-to-b from-green-500 to-emerald-500 rounded-full"></span>
            알림 테스트
          </h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">알림 제목</label>
              <input
                type="text"
                value={notificationTitle}
                onChange={(e) => setNotificationTitle(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200"
                placeholder="알림 제목을 입력하세요"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">알림 내용</label>
              <textarea
                value={notificationBody}
                onChange={(e) => setNotificationBody(e.target.value)}
                rows={3}
                className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200 resize-none"
                placeholder="알림 내용을 입력하세요"
              />
            </div>
            <div className="flex gap-2 pt-2">
              <button
                onClick={handleSendTestNotification}
                disabled={permission !== 'granted'}
                className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed text-white font-medium py-3.5 px-4 rounded-xl transition-all duration-200 active:scale-[0.98] shadow-lg shadow-green-500/30 disabled:shadow-none"
              >
                즉시 전송
              </button>
              <button
                onClick={handleSendScheduledNotification}
                disabled={permission !== 'granted'}
                className="flex-1 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed text-white font-medium py-3.5 px-4 rounded-xl transition-all duration-200 active:scale-[0.98] shadow-lg shadow-purple-500/30 disabled:shadow-none"
              >
                5초 후
              </button>
            </div>
          </div>
        </div>

        {/* 추가 성경 말씀 카드들 */}
        <div className="space-y-3">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-5 transform transition-all duration-300 active:scale-[0.98]">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">시편 23:1</span>
              <span className="text-xs text-gray-400">구약</span>
            </div>
            <p className="text-gray-800 dark:text-gray-100 leading-relaxed">
              여호와는 나의 목자시니 내게 부족함이 없으리로다
            </p>
          </div>
        </div>

        {/* 디버그 정보 (접을 수 있게) */}
        {debugInfo.length > 0 && (
          <div className="bg-gray-900 dark:bg-gray-950 rounded-2xl shadow-lg overflow-hidden">
            <div className="p-4 border-b border-gray-800 flex items-center justify-between">
              <h3 className="text-sm font-semibold text-gray-300">디버그 로그</h3>
              <button
                onClick={clearDebugInfo}
                className="text-xs text-gray-400 hover:text-gray-200 transition-colors"
              >
                지우기
              </button>
            </div>
            <div className="p-4 max-h-48 overflow-y-auto">
              <div className="space-y-1 font-mono text-xs text-green-400">
                {debugInfo.slice(-10).map((info, index) => (
                  <div key={index} className="opacity-80">{info}</div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* 하단 네비게이션 바 */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-lg border-t border-gray-200 dark:border-gray-800">
        <div className="max-w-md mx-auto px-4">
          <div className="flex items-center justify-around h-16">
            <button
              onClick={() => setActiveTab('home')}
              className={`flex flex-col items-center justify-center gap-1 px-4 py-2 rounded-xl transition-all duration-200 ${
                activeTab === 'home'
                  ? 'text-amber-600 dark:text-amber-400'
                  : 'text-gray-400 dark:text-gray-500'
              }`}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span className="text-xs font-medium">홈</span>
            </button>
            <button
              onClick={() => setActiveTab('notification')}
              className={`flex flex-col items-center justify-center gap-1 px-4 py-2 rounded-xl transition-all duration-200 relative ${
                activeTab === 'notification'
                  ? 'text-amber-600 dark:text-amber-400'
                  : 'text-gray-400 dark:text-gray-500'
              }`}
            >
              {permission === 'granted' && (
                <span className="absolute top-0 right-2 w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              )}
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <span className="text-xs font-medium">알림</span>
            </button>
            <button
              onClick={() => setActiveTab('bible')}
              className={`flex flex-col items-center justify-center gap-1 px-4 py-2 rounded-xl transition-all duration-200 ${
                activeTab === 'bible'
                  ? 'text-amber-600 dark:text-amber-400'
                  : 'text-gray-400 dark:text-gray-500'
              }`}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              <span className="text-xs font-medium">성경</span>
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`flex flex-col items-center justify-center gap-1 px-4 py-2 rounded-xl transition-all duration-200 ${
                activeTab === 'settings'
                  ? 'text-amber-600 dark:text-amber-400'
                  : 'text-gray-400 dark:text-gray-500'
              }`}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="text-xs font-medium">설정</span>
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
}
