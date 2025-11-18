import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { title, body, icon, badge, tag } = await request.json();

    // 배포환경에서는 여기서 푸시 알림을 서버에서 전송
    // 프로덕션 환경에서는 backend에서 푸시 알림을 전송하도록 합니다
    
    return NextResponse.json({
      success: true,
      message: '푸시 알림이 전송되었습니다',
      data: {
        title,
        body,
        icon,
        badge,
        tag,
        timestamp: new Date().toISOString(),
      },
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: '푸시 알림 전송 실패' },
      { status: 500 }
    );
  }
}

