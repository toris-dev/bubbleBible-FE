import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import MobileViewport from "@/components/templates/MobileViewport"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "성경 포털 - 인터랙티브 성경 읽기",
  description: "레벨업과 커뮤니티가 있는 인터랙티브 성경 웹앱",
  manifest: "/manifest.json",
  themeColor: "#F59E0B",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "성경포털",
  },
  generator: 'v0.dev',
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "https://bubblebible.com",
    title: "성경 포털 - 인터랙티브 성경 읽기",
    description: "레벨업과 커뮤니티가 있는 인터랙티브 성경 웹앱",
    siteName: "성경포털",
    images: [
      {
        url: "/placeholder.jpg",
        width: 1200,
        height: 630,
        alt: "성경 포털",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "성경 포털 - 인터랙티브 성경 읽기",
    description: "레벨업과 커뮤니티가 있는 인터랙티브 성경 웹앱",
    images: ["/placeholder.jpg"],
  },
  icons: {
    icon: [
      { url: "/placeholder-logo.png", sizes: "32x32", type: "image/png" },
      { url: "/placeholder-logo.png", sizes: "192x192", type: "image/png" },
      { url: "/placeholder-logo.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/placeholder-logo.png", sizes: "180x180", type: "image/png" },
    ],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#F59E0B" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="성경포털" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="application-name" content="성경포털" />
        <meta name="msapplication-TileColor" content="#F59E0B" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        <link rel="apple-touch-icon" sizes="180x180" href="/placeholder-logo.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/placeholder-logo.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/placeholder-logo.png" />
      </head>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <MobileViewport>
            {children}
          </MobileViewport>
        </ThemeProvider>
      </body>
    </html>
  )
}
