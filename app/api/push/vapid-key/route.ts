import { NextResponse } from 'next/server';

/**
 * VAPID 공개 키를 제공하는 API
 * 
 * 참고: 실제 프로덕션에서는 환경변수에서 VAPID 키를 가져와야 합니다.
 * VAPID 키 생성 방법:
 * 1. npm install web-push
 * 2. node -e "console.log(require('web-push').generateVAPIDKeys())"
 * 
 * 생성된 키를 .env.local에 저장:
 * NEXT_PUBLIC_VAPID_PUBLIC_KEY=your_public_key_here
 */
export async function GET() {
  try {
    // 환경변수에서 VAPID 공개 키 가져오기 (프로덕션)
    // const vapidPublicKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
    
    // 테스트용 VAPID 공개 키 (실제 프로덕션에서는 환경변수 사용)
    // 이 키는 테스트용이며, 실제 서비스에서는 새로 생성해야 합니다
    // VAPID 키 생성: npm install web-push && node -e "console.log(require('web-push').generateVAPIDKeys().publicKey)"
    const vapidPublicKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY || 
      'BInOYkcGxSBwFjp_FwdT7Oy-ppJkAb6Jn_oVV4uyRBIiTRRxCcelCd0dq94UDwUtsCv8GHpfjC8zrBXA4YAeS6I';
    
    if (!vapidPublicKey) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'VAPID 공개 키가 설정되지 않았습니다. 환경변수 NEXT_PUBLIC_VAPID_PUBLIC_KEY를 설정해주세요.' 
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      publicKey: vapidPublicKey,
      message: 'VAPID 공개 키를 성공적으로 가져왔습니다.',
    });
  } catch (error) {
    return NextResponse.json(
      { 
        success: false, 
        error: 'VAPID 키를 가져오는 중 오류가 발생했습니다.',
        details: error instanceof Error ? error.message : '알 수 없는 오류'
      },
      { status: 500 }
    );
  }
}

