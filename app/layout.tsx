import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/sonner"
import { MainLayout } from "@/components/templates/MainLayout"
import { PlanRewardDock } from "@/components/molecules/PlanRewardDock"

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
    generator: 'v0.dev'
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
        <link rel="apple-touch-icon" href="/placeholder.svg?height=192&width=192" />
      </head>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <MainLayout>
            {children}
          </MainLayout>
          <PlanRewardDock />
          <Toaster position="top-center" richColors />
        </ThemeProvider>
      </body>
    </html>
  )
}
