"use client"

import Link from "next/link"
import { Book, Users, Flame, User, Home } from "lucide-react"

interface MobileNavigationProps {
  currentPage: string
}

export function MobileNavigation({ currentPage }: MobileNavigationProps) {
  const navItems = [
    { id: "home", label: "홈", icon: Home, href: "/" },
    { id: "bible", label: "성경", icon: Book, href: "/bible" },
    { id: "community", label: "커뮤니티", icon: Users, href: "/community" },
    { id: "prayer", label: "기도방", icon: Flame, href: "/prayer" },
    { id: "profile", label: "프로필", icon: User, href: "/profile" },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t border-orange-200 z-30">
      <div className="flex justify-around items-center py-2">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = currentPage === item.id

          return (
            <Link
              key={item.id}
              href={item.href}
              className={`flex flex-col items-center py-2 px-3 rounded-lg transition-all duration-200 min-w-[60px] ${
                isActive ? "text-orange-600 bg-orange-100" : "text-gray-600 hover:text-orange-600 hover:bg-orange-50"
              }`}
            >
              <Icon className={`h-5 w-5 mb-1 ${isActive ? "scale-110" : ""} transition-transform`} />
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
