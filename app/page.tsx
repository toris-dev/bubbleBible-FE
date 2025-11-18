import type { Metadata } from 'next';
import PushNotificationTest from '@/components/organisms/PushNotificationTest';

export const metadata: Metadata = {
  title: '성경 포털 - 인터랙티브 성경 읽기',
  description: '레벨업과 커뮤니티가 있는 인터랙티브 성경 웹앱. 매일 성경을 읽고, 묵상하고, 공유하세요.',
  keywords: ['성경', 'Bible', '성경 읽기', '묵상', '기독교', '신앙', '말씀'],
  authors: [{ name: 'Bubble Bible' }],
  openGraph: {
    title: '성경 포털 - 인터랙티브 성경 읽기',
    description: '레벨업과 커뮤니티가 있는 인터랙티브 성경 웹앱',
    url: 'https://bubblebible.com',
    siteName: '성경 포털',
    images: [
      {
        url: '/placeholder.jpg',
        width: 1200,
        height: 630,
        alt: '성경 포털',
      },
    ],
    locale: 'ko_KR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '성경 포털 - 인터랙티브 성경 읽기',
    description: '레벨업과 커뮤니티가 있는 인터랙티브 성경 웹앱',
    images: ['/placeholder.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://bubblebible.com',
  },
};

export default function HomePage() {
  return <PushNotificationTest />;
}
