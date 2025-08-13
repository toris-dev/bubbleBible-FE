"use client"

import type React from "react"
import { useEffect } from "react"
import { createPortal } from "react-dom"
import { X } from "lucide-react"
import { AnimatedButton } from "./AnimatedButton"

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
  title?: string
  size?: "sm" | "md" | "lg" | "xl"
}

export function Modal({ isOpen, onClose, children, title, size = "md" }: ModalProps) {
  // Body scroll lock using position: fixed (keeps layout stable, no overflow toggling)
  useEffect(() => {
    if (!isOpen) return
    const { body, documentElement } = document
    const scrollY = window.scrollY
    const originalPosition = body.style.position
    const originalTop = body.style.top
    const originalWidth = body.style.width
    const originalPaddingRight = body.style.paddingRight

    // Prevent layout shift by compensating for scrollbar width
    const scrollbarWidth = window.innerWidth - documentElement.clientWidth
    if (scrollbarWidth > 0) {
      body.style.paddingRight = `${scrollbarWidth}px`
    }

    body.style.position = "fixed"
    body.style.top = `-${scrollY}px`
    body.style.width = "100%"

    return () => {
      body.style.position = originalPosition
      body.style.top = originalTop
      body.style.width = originalWidth
      body.style.paddingRight = originalPaddingRight
      window.scrollTo(0, scrollY)
    }
  }, [isOpen])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEscape)
    }

    return () => {
      document.removeEventListener("keydown", handleEscape)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  const sizeClasses = {
    sm: "max-w-md",
    md: "max-w-lg",
    lg: "max-w-2xl",
    xl: "max-w-4xl",
  }

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label={title || "modal"}
    >
      {/* 배경 오버레이 */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-in fade-in-0"
        onClick={onClose}
      />

      {/* 모달 컨텐츠 */}
      <div
        className={`relative w-full ${sizeClasses[size]} bg-white rounded-2xl shadow-2xl animate-in zoom-in-95 slide-in-from-bottom-2 duration-200 focus:outline-none`}
        tabIndex={-1}
      >
        {/* 헤더 */}
        {title && (
          <div className="flex items-center justify-between p-6 border-b border-orange-200 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-t-2xl">
            <h2 className="text-xl font-bold text-orange-900">{title}</h2>
            <AnimatedButton
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="text-orange-600 hover:text-orange-800 hover:bg-orange-100"
              ripple
              aria-label="닫기"
            >
              <X className="h-5 w-5" />
            </AnimatedButton>
          </div>
        )}

        {/* 컨텐츠 */}
        <div className="p-6 max-h-[70vh] overflow-y-auto">{children}</div>
      </div>
    </div>,
    document.body
  )
}
