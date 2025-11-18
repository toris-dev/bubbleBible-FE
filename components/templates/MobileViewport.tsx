'use client';

import { ReactNode } from 'react';

interface MobileViewportProps {
  children: ReactNode;
  maxWidth?: string;
}

/**
 * 모바일 뷰포트를 시뮬레이션하는 래퍼 컴포넌트
 * 데스크톱에서도 모바일 화면 크기로 제한하고 중앙에 배치
 */
export default function MobileViewport({ 
  children, 
  maxWidth = '428px' // iPhone 14 Pro Max 기준
}: MobileViewportProps) {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-100 dark:bg-gray-950">
      {/* 모바일 화면 시뮬레이션 */}
      <div 
        className="relative w-full h-screen overflow-hidden bg-white dark:bg-gray-900 shadow-2xl"
        style={{ 
          maxWidth,
          maxHeight: '100vh'
        }}
      >
        {/* 실제 모바일 기기일 때는 전체 화면 사용 */}
        <div className="w-full h-full md:max-h-screen overflow-y-auto">
          {children}
        </div>
        
        {/* 데스크톱에서만 보이는 프레임 효과 */}
        <div className="hidden md:block absolute inset-0 pointer-events-none">
          {/* 상단 노치 시뮬레이션 (선택사항) */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-black rounded-b-3xl opacity-20"></div>
        </div>
      </div>
    </div>
  );
}

