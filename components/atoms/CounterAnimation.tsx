"use client"

import { useEffect, useState } from "react"

interface CounterAnimationProps {
  value: number
  duration?: number
  className?: string
  prefix?: string
  suffix?: string
}

export function CounterAnimation({
  value,
  duration = 1000,
  className = "",
  prefix = "",
  suffix = "",
}: CounterAnimationProps) {
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    let startTime: number
    let animationFrame: number

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)

      // easeOutCubic 이징 함수
      const easeOutCubic = 1 - Math.pow(1 - progress, 3)
      setDisplayValue(Math.floor(value * easeOutCubic))

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    animationFrame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationFrame)
  }, [value, duration])

  return (
    <span className={className}>
      {prefix}
      {displayValue.toLocaleString()}
      {suffix}
    </span>
  )
}
