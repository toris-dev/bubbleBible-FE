"use client"

import type React from "react"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Modal } from "../atoms/Modal"
import { ProgressRing } from "../atoms/ProgressRing"
import { CounterAnimation } from "../atoms/CounterAnimation"
import { AnimatedButton } from "../atoms/AnimatedButton"
import { Trophy, Target, Flame, CheckCircle, Lock, Sparkles, Crown } from "lucide-react"

interface LevelDetailModalProps {
  isOpen: boolean
  onClose: () => void
  levelData: {
    level: number
    title: string
    subtitle: string
    icon: string
    color: string
    description: string
    requiredExp: number
    currentExp: number
    isAchieved: boolean
    isCurrent: boolean
    conditions: Array<{
      type: string
      description: string
      current: number
      required: number
      icon: React.ReactNode
    }>
    rewards: string[]
    biblicalMeaning: string
    tips: string[]
  }
}

export function LevelDetailModal({ isOpen, onClose, levelData }: LevelDetailModalProps) {
  const progressPercentage = levelData.isAchieved
    ? 100
    : Math.min((levelData.currentExp / levelData.requiredExp) * 100, 100)

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg" title={`레벨 ${levelData.level} 가이드`}>
      <div className="space-y-6">
        {/* 레벨 헤더 */}
        <div className="text-center">
          <div className="relative inline-block">
            <ProgressRing progress={progressPercentage} size={140} className="mb-4">
              <div className="text-center">
                <div className="text-4xl mb-1">{levelData.icon}</div>
                <div className="text-sm font-semibold text-orange-900">레벨 {levelData.level}</div>
              </div>
            </ProgressRing>

            {levelData.isAchieved && (
              <div className="absolute -top-2 -right-2">
                <CheckCircle className="h-8 w-8 text-green-500 bg-white rounded-full" />
              </div>
            )}

            {!levelData.isAchieved && levelData.level > levelData.currentExp / 10000 && (
              <div className="absolute -top-2 -right-2">
                <Lock className="h-8 w-8 text-gray-400 bg-white rounded-full p-1" />
              </div>
            )}
          </div>

          <Badge className={`${levelData.color} border-0 text-lg px-4 py-2 mb-2`}>
            {levelData.title} ({levelData.subtitle})
          </Badge>

          <p className="text-gray-700 text-lg leading-relaxed max-w-md mx-auto">{levelData.description}</p>

          {/* 진행률 */}
          <div className="mt-4 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-lg p-4">
            <div className="flex justify-between text-sm text-orange-700 mb-2">
              <span>진행률</span>
              <span>
                <CounterAnimation value={levelData.currentExp} /> / <CounterAnimation value={levelData.requiredExp} />
              </span>
            </div>
            <div className="w-full bg-orange-200 rounded-full h-3 overflow-hidden">
              <div
                className="bg-gradient-to-r from-orange-500 to-yellow-500 h-full rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
            <p className="text-xs text-orange-600 mt-1 text-center">
              {levelData.isAchieved ? "달성 완료!" : `${(100 - progressPercentage).toFixed(1)}% 남음`}
            </p>
          </div>
        </div>

        {/* 달성 조건 */}
        <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
          <CardContent className="p-4">
            <h3 className="font-bold text-blue-900 mb-3 flex items-center">
              <Target className="h-5 w-5 mr-2" />
              달성 조건
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {levelData.conditions.map((condition, index) => (
                <div
                  key={index}
                  className={`flex items-center justify-between p-3 rounded-lg ${
                    condition.current >= condition.required
                      ? "bg-green-100 border border-green-300"
                      : "bg-white border border-blue-200"
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    {condition.icon}
                    <span className="text-sm font-medium">{condition.description}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span
                      className={`text-sm font-bold ${
                        condition.current >= condition.required ? "text-green-700" : "text-blue-700"
                      }`}
                    >
                      <CounterAnimation value={condition.current} /> / {condition.required}
                    </span>
                    {condition.current >= condition.required && <CheckCircle className="h-4 w-4 text-green-600" />}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 보상 */}
        <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200">
          <CardContent className="p-4">
            <h3 className="font-bold text-yellow-900 mb-3 flex items-center">
              <Trophy className="h-5 w-5 mr-2" />
              레벨 달성 보상
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {levelData.rewards.map((reward, index) => (
                <div key={index} className="flex items-center space-x-2 p-2 bg-white rounded-lg">
                  <Sparkles className="h-4 w-4 text-yellow-600" />
                  <span className="text-sm text-yellow-800">{reward}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 성경적 의미 */}
        <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
          <CardContent className="p-4">
            <h3 className="font-bold text-purple-900 mb-3 flex items-center">
              <Crown className="h-5 w-5 mr-2" />
              성경적 의미
            </h3>
            <p className="text-purple-800 leading-relaxed italic">"{levelData.biblicalMeaning}"</p>
          </CardContent>
        </Card>

        {/* 달성 팁 */}
        <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
          <CardContent className="p-4">
            <h3 className="font-bold text-green-900 mb-3 flex items-center">
              <Flame className="h-5 w-5 mr-2" />
              달성 팁
            </h3>
            <div className="space-y-2">
              {levelData.tips.map((tip, index) => (
                <div key={index} className="flex items-start space-x-2 p-2 bg-white rounded-lg">
                  <div className="w-6 h-6 bg-green-200 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-green-800">{index + 1}</span>
                  </div>
                  <span className="text-sm text-green-800">{tip}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 액션 버튼 */}
        <div className="flex justify-center space-x-4 pt-4">
          {!levelData.isAchieved && (
            <AnimatedButton
              className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white px-6"
              ripple
              glow
              bounce
            >
              <Target className="h-4 w-4 mr-2" />
              목표 달성하기
            </AnimatedButton>
          )}

          <AnimatedButton
            variant="outline"
            onClick={onClose}
            className="border-orange-300 text-orange-700 hover:bg-orange-100 px-6"
            ripple
          >
            닫기
          </AnimatedButton>
        </div>
      </div>
    </Modal>
  )
}
