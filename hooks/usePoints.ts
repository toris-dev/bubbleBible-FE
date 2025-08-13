"use client"

import { useEffect, useMemo, useState } from "react"
import { toast } from "sonner"

export type ActionType = "read" | "like" | "comment" | "like_received"

const POINTS: Record<ActionType, number> = {
  read: 200,
  like: 100,
  comment: 300,
  like_received: 100,
}

type Store = {
  points: number
  xp: number
  history: { ts: number; type: ActionType; points: number }[]
  daily: { date: string; readCount: number; readPoints: number }
}

const KEY = "bb.points.v1"

const todayKey = () => new Date().toISOString().slice(0, 10)

// XP 계산 유틸
const xpForLevelStep = (level: number) => level * level * 1000
const cumulativeXpForLevel = (level: number) => {
  let xp = 0
  for (let i = 1; i < level; i++) xp += xpForLevelStep(i)
  return xp
}
const levelFromXp = (xp: number, maxLevel = 99) => {
  let level = 1
  while (level < maxLevel && xp >= cumulativeXpForLevel(level + 1)) {
    level++
  }
  const currentLevelXp = xp - cumulativeXpForLevel(level)
  const neededForNext = level < maxLevel ? xpForLevelStep(level) : 0
  return { level, currentLevelXp, neededForNext }
}

export function usePoints() {
  const [store, setStore] = useState<Store>({
    points: 0,
    xp: 0,
    history: [],
    daily: { date: todayKey(), readCount: 0, readPoints: 0 },
  })

  useEffect(() => {
    const raw = localStorage.getItem(KEY)
    if (raw) {
      try {
        const parsed: Store = JSON.parse(raw)
        if (parsed.daily.date !== todayKey()) {
          parsed.daily = { date: todayKey(), readCount: 0, readPoints: 0 }
        }
        setStore(parsed)
      } catch {}
    }
  }, [])

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(store))
  }, [store])

  const { level, currentLevelXp, neededForNext } = useMemo(
    () => levelFromXp(store.xp),
    [store.xp]
  )

  const award = (type: ActionType) => {
    let gain = POINTS[type]
    if (type === "read") {
      const remaining = Math.max(0, 1000 - store.daily.readPoints)
      gain = Math.min(remaining, gain)
      if (gain <= 0) {
        toast("오늘의 읽기 포인트 한도 도달", { description: "내일 다시 도전해주세요!" })
        return { gained: 0, points: store.points, level, xp: store.xp }
      }
    }

    const next = { ...store }
    next.points += gain
    next.xp += gain
    next.history.unshift({ ts: Date.now(), type, points: gain })
    if (type === "read") {
      next.daily.readCount += 1
      next.daily.readPoints += gain
    }
    setStore(next)

    const after = levelFromXp(next.xp)
    toast.success(`+${gain}P 적립`, {
      description: type === "read" ? `말씀 읽기 보상 • 오늘 ${next.daily.readPoints}/1000P` : `커뮤니티 활동 보상`,
    })
    if (after.level > level) {
      toast(`레벨업! Lv.${after.level}`, { description: `다음 레벨까지 ${after.neededForNext} XP` })
    }
    return { gained: gain, points: next.points, level: after.level, xp: next.xp }
  }

  return { points: store.points, xp: store.xp, level, currentLevelXp, neededForNext, daily: store.daily, award }
}


