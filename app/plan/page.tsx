"use client"

import { useEffect, useMemo, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { AnimatedButton } from "@/components/atoms/AnimatedButton"
import { CalendarCheck, CheckCircle, Calendar as CalIcon, Trash } from "lucide-react"
import { usePoints } from "@/hooks/usePoints"
import { PlanRewardModal } from "@/components/molecules/PlanRewardModal"
import { Calendar } from "@/components/ui/calendar"

type Task = { id: string; title: string; done: boolean; reward: number; date: string }

const KEY = "bb.plan.v1"

const DEFAULT: Task[] = []

export default function PlanPage() {
  const [tasks, setTasks] = useState<Task[]>(DEFAULT)
  const [open, setOpen] = useState(false)
  const [lastCompleted, setLastCompleted] = useState<Task | null>(null)
  const { award } = usePoints()
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [newTitle, setNewTitle] = useState("")

  useEffect(() => {
    const raw = localStorage.getItem(KEY)
    if (raw) {
      try { setTasks(JSON.parse(raw)) } catch {}
    }
  }, [])
  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(tasks))
  }, [tasks])

  const toggle = (id: string) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, done: !t.done } : t))
  }

  const completeAndReward = (t: Task) => {
    if (!t.done) {
      toggle(t.id)
      award("read")
      setLastCompleted(t)
      setOpen(true)
    }
  }

  const addPlan = () => {
    if (!selectedDate || !newTitle.trim()) return
    const id = `${selectedDate.toISOString().slice(0,10)}-${newTitle}`
    const date = selectedDate.toISOString().slice(0,10)
    setTasks(prev => [{ id, title: newTitle.trim(), done: false, reward: 200, date }, ...prev])
    setNewTitle("")
  }

  const removePlan = (id: string) => setTasks(prev => prev.filter(t => t.id !== id))

  const tasksByDate = useMemo(() => {
    const map: Record<string, Task[]> = {}
    for (const t of tasks) {
      if (!map[t.date]) map[t.date] = []
      map[t.date].push(t)
    }
    return map
  }, [tasks])

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-orange-600 to-yellow-600 bg-clip-text text-transparent">
          성경 읽기 플랜
        </h1>
        <p className="text-gray-600">계획을 체크하며 진행도를 관리하세요. 완료 시 보상이 지급됩니다.</p>
      </div>

      <Card className="bg-white/80 backdrop-blur-sm border-orange-200">
        <CardHeader>
          <CardTitle className="text-orange-900 flex items-center">
            <CalIcon className="h-5 w-5 mr-2" />
            읽기 일정 등록
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-lg border border-orange-200 p-2">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="rounded-md"
              />
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <input
                  className="flex-1 border border-orange-300 rounded-md px-3 h-10 focus:outline-none focus:ring-2 focus:ring-orange-400"
                  placeholder="읽을 본문(예: 요한복음 3:16)"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                />
                <AnimatedButton
                  onClick={addPlan}
                  className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white"
                  ripple
                  glow
                >
                  일정 추가
                </AnimatedButton>
              </div>

              <div className="space-y-2">
                <p className="text-sm text-orange-700">
                  {selectedDate ? selectedDate.toLocaleDateString() : "날짜를 선택하세요"}
                </p>
                {(selectedDate && tasksByDate[selectedDate.toISOString().slice(0,10)]) ? (
                  tasksByDate[selectedDate.toISOString().slice(0,10)].map(t => (
                    <div key={t.id} className="flex items-center justify-between p-3 rounded-lg border border-orange-200 bg-gradient-to-r from-orange-50 to-yellow-50">
                      <label className="flex items-center gap-3">
                        <Checkbox checked={t.done} onCheckedChange={() => toggle(t.id)} />
                        <span className={`text-gray-900 ${t.done ? "line-through text-gray-500" : ""}`}>{t.title}</span>
                      </label>
                      <div className="flex items-center gap-2">
                        <AnimatedButton
                          size="sm"
                          className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white"
                          onClick={() => completeAndReward(t)}
                          ripple
                          glow
                        >
                          <CheckCircle className="h-4 w-4 mr-2" />
                          완료(+{t.reward}P)
                        </AnimatedButton>
                        <AnimatedButton variant="outline" size="icon" className="border-orange-300" onClick={() => removePlan(t.id)}>
                          <Trash className="h-4 w-4" />
                        </AnimatedButton>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-gray-500">해당 날짜에 등록된 일정이 없습니다.</p>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <PlanRewardModal
        isOpen={open}
        onClose={() => setOpen(false)}
        planTitle={lastCompleted?.title || "읽기 계획"}
        pointsGained={lastCompleted?.reward || 200}
      />
    </div>
  )
}


