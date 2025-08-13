"use client"

import { Modal } from "@/components/atoms/Modal"
import { AnimatedButton } from "@/components/atoms/AnimatedButton"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Sparkles, CheckCircle, Trophy } from "lucide-react"

interface PlanRewardModalProps {
  isOpen: boolean
  onClose: () => void
  planTitle: string
  pointsGained: number
  streakDays?: number
}

export function PlanRewardModal({ isOpen, onClose, planTitle, pointsGained, streakDays }: PlanRewardModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="읽기 플랜 완료!" size="lg">
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-orange-500 to-yellow-500 text-white shadow-lg">
            <CheckCircle className="h-8 w-8" />
          </div>
          <h3 className="text-2xl font-bold text-orange-900">축하합니다!</h3>
          <p className="text-orange-700">"{planTitle}" 계획을 완료했어요.</p>
        </div>

        <Card className="bg-white/80 backdrop-blur-sm border-orange-200">
          <CardContent className="p-6 text-center space-y-3">
            <div className="flex items-center justify-center gap-2">
              <Trophy className="h-5 w-5 text-yellow-600" />
              <span className="text-lg font-semibold text-orange-900">보상</span>
            </div>
            <Badge className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white text-base px-4 py-1 border-0">
              +{pointsGained}P 획득
            </Badge>
            {typeof streakDays === "number" && streakDays > 1 && (
              <p className="text-sm text-orange-700">연속 {streakDays}일 달성! 추가 보너스가 적용되었습니다.</p>
            )}
          </CardContent>
        </Card>

        <div className="text-center">
          <AnimatedButton
            className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white px-6"
            onClick={onClose}
            ripple
            glow
            bounce
          >
            <Sparkles className="h-4 w-4 mr-2" />
            계속하기
          </AnimatedButton>
        </div>
      </div>
    </Modal>
  )
}


