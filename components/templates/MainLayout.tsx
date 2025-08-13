"use client"

import type React from "react"
import { useState } from "react"
import { Header } from "../organisms/Header"
import { Sidebar } from "../organisms/Sidebar"
import { MobileNavigation } from "../organisms/MobileNavigation"
import { usePathname } from "next/navigation"

interface MainLayoutProps {
  children: React.ReactNode
}

export function MainLayout({ children }: MainLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const pathname = usePathname()

  const currentPage = (() => {
    if (!pathname) return "home"
    if (pathname === "/") return "home"
    if (pathname.startsWith("/bible")) return "bible"
    if (pathname.startsWith("/community")) return "community"
    if (pathname.startsWith("/prayer")) return "prayer"
    if (pathname.startsWith("/profile")) return "profile"
    if (pathname.startsWith("/bookmarks")) return "bible"
    if (pathname.startsWith("/plan")) return "bible"
    return "home"
  })()

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      <Header onMenuToggle={() => setIsSidebarOpen(!isSidebarOpen)} />

      <div className="flex">
        {/* 데스크톱 사이드바 */}
        <div className="hidden lg:block w-80 flex-shrink-0">
          <div className="sticky top-20 h-[calc(100vh-5rem)] overflow-y-auto">
            <Sidebar currentPage={currentPage} />
          </div>
        </div>

        {/* 모바일 사이드바 오버레이 */}
        {isSidebarOpen && (
          <div className="lg:hidden fixed inset-0 z-40 bg-black/50" onClick={() => setIsSidebarOpen(false)}>
            <div className="w-80 h-full bg-white shadow-xl" onClick={(e) => e.stopPropagation()}>
              <Sidebar currentPage={currentPage} onClose={() => setIsSidebarOpen(false)} />
            </div>
          </div>
        )}

        {/* 메인 콘텐츠 */}
        <main className="flex-1 min-w-0 p-4 lg:p-6">
          <div className="max-w-4xl mx-auto">{children}</div>
        </main>
      </div>

      {/* 모바일 하단 네비게이션 */}
      <div className="lg:hidden">
        <MobileNavigation currentPage={currentPage} />
      </div>
    </div>
  )
}
