"use client"

import { useEffect, useState } from "react"
import { PlanRewardModal } from "./PlanRewardModal"
import { AnimatedButton } from "@/components/atoms/AnimatedButton"
import { Trophy } from "lucide-react"

type RewardPayload = {
  planTitle: string
  pointsGained: number
  streakDays?: number
}

/**
 * 항상 노출되는 보상 도크. 닫아도 오른쪽 하단의 작은 아이콘이 남습니다.
 * 페이지 어디서든 다음 이벤트로 모달을 띄울 수 있습니다:
 * window.dispatchEvent(new CustomEvent('bb:open-plan-reward', { detail: { planTitle, pointsGained, streakDays } }))
 */
export function PlanRewardDock() {
  const [open, setOpen] = useState(false)
  const [data, setData] = useState<RewardPayload>({ planTitle: "읽기 계획", pointsGained: 200 })
  const [pulse, setPulse] = useState(false)

  useEffect(() => {
    const handler = (e: Event) => {
      const ce = e as CustomEvent<RewardPayload>
      if (ce.detail) {
        setData(ce.detail)
        setOpen(true)
        setPulse(true)
        // 몇 초간 강조 효과
        setTimeout(() => setPulse(false), 4000)
      }
    }
    window.addEventListener("bb:open-plan-reward", handler as EventListener)
    return () => window.removeEventListener("bb:open-plan-reward", handler as EventListener)
  }, [])

  return (
    <>
      {/* 항상 노출되는 작은 아이콘 버튼 */}
      <div className="fixed bottom-5 right-5 z-40">
        <AnimatedButton
          size="icon"
          className={`rounded-full shadow-lg bg-gradient-to-br from-orange-500 to-yellow-500 text-white ${pulse ? "animate-pulse" : ""}`}
          onClick={() => setOpen(true)}
          ripple
          glow
          aria-label="보상 열기"
        >
          <Trophy className="h-5 w-5" />
        </AnimatedButton>
      </div>

      {/* 보상 모달 */}
      <PlanRewardModal
        isOpen={open}
        onClose={() => setOpen(false)}
        planTitle={data.planTitle}
        pointsGained={data.pointsGained}
        streakDays={data.streakDays}
      />
    </>
  )
}


