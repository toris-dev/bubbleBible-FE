import { NextRequest, NextResponse } from 'next/server';

/**
 * 푸시 구독 정보를 서버에 저장하는 API
 * 
 * 실제 프로덕션에서는 데이터베이스에 구독 정보를 저장해야 합니다.
 */
export async function POST(request: NextRequest) {
  try {
    const { subscription } = await request.json();

    if (!subscription) {
      return NextResponse.json(
        { success: false, error: '구독 정보가 제공되지 않았습니다.' },
        { status: 400 }
      );
    }

    // 실제 프로덕션에서는 여기서 데이터베이스에 구독 정보를 저장합니다
    // 예: MongoDB, PostgreSQL 등에 저장
    // await db.pushSubscriptions.create({
    //   endpoint: subscription.endpoint,
    //   keys: subscription.keys,
    //   userId: user.id,
    //   createdAt: new Date(),
    // });

    console.log('푸시 구독 정보 수신:', {
      endpoint: subscription.endpoint,
      keys: subscription.keys ? '있음' : '없음',
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      message: '구독 정보가 성공적으로 저장되었습니다.',
      data: {
        endpoint: subscription.endpoint,
        timestamp: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error('구독 정보 저장 실패:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: '구독 정보 저장 실패',
        details: error instanceof Error ? error.message : '알 수 없는 오류'
      },
      { status: 500 }
    );
  }
}

