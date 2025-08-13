"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { AnimatedButton } from "./AnimatedButton"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const isDark = theme === "dark"

  return (
    <AnimatedButton
      variant="ghost"
      size="icon"
      className="text-orange-600 hover:bg-orange-100"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      ripple
      bounce
      aria-label="테마 전환"
    >
      {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </AnimatedButton>
  )
}


