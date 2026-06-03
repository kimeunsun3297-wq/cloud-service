import { useState, useEffect } from 'react'

const imgNotch = "https://www.figma.com/api/mcp/asset/aa5d9dbe-9392-47e8-813e-a3c8404a1745"
const imgOutline = "https://www.figma.com/api/mcp/asset/ce63cd92-bbfe-4f43-819c-84403d665f76"
const imgBatteryEnd = "https://www.figma.com/api/mcp/asset/9560e401-14d6-4b17-8fbb-357555b7616a"
const imgFill = "https://www.figma.com/api/mcp/asset/cbc01f4d-8359-469c-a30d-34fc3d355e7a"
const imgWifi = "https://www.figma.com/api/mcp/asset/e8091da2-d876-4d33-b1ea-37854e449444"
const imgIconMobileSignal = "https://www.figma.com/api/mcp/asset/6e6e7695-113c-45bf-a1c4-5564bd96abaa"
const imgEllipse3 = "https://www.figma.com/api/mcp/asset/af6c2304-e420-4ee6-9010-dac27343f1a7"
const imgGroup = "https://www.figma.com/api/mcp/asset/8c0a5e74-0051-4b14-a8ee-46135cc38ca3"
const imgSubwayCoin = "https://www.figma.com/api/mcp/asset/a92db021-e203-4767-9b7f-26e4ed2705ac"
const imgMaterialSymbolsMoneyBagRounded = "https://www.figma.com/api/mcp/asset/88fd8326-ac5f-4ebe-8c6f-34119fa10e14"
const imgIonCalendar = "https://www.figma.com/api/mcp/asset/d7f00dce-9de7-4682-acd0-a977bc80afaf"
const imgCheckMark = "https://www.figma.com/api/mcp/asset/509d2f9f-2d66-4ba5-b095-c059e0499daa"

const steps = [
  { id: 1, label: '우선 순위 확인중...', completedLabel: '확인 완료', delay: 0 },
  { id: 2, label: '카테고리별 소비 패턴 분석중...', completedLabel: '분석 완료', delay: 2000 },
  { id: 3, label: '남은 일정 예상 지출 계산중...', completedLabel: '계산 완료', delay: 4000 },
  { id: 4, label: '예산 초과 위험도 계산중...', completedLabel: '계산 완료', delay: 6000 }
]

export default function PriorityAnalysisScreen({ onComplete, selectedPriorities }) {
  const [progress, setProgress] = useState(0)
  const [completedSteps, setCompletedSteps] = useState(new Set())
  const [isAnalysisComplete, setIsAnalysisComplete] = useState(false)

  const circumference = 2 * Math.PI * 50
  const dashOffset = circumference * (1 - progress / 100)

  const topCategory = selectedPriorities?.[0]?.name || '예산'
  const lastCategory = selectedPriorities?.[selectedPriorities.length - 1]?.name || '지출'

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev < 80) {
          return prev + Math.random() * 15 + 5
        }
        return prev
      })
    }, 600)

    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const timers = steps.map(step =>
      setTimeout(() => {
        setCompletedSteps(prev => new Set([...prev, step.id]))
      }, step.delay)
    )

    // 마지막 단계 완료 후 프로그레스를 100으로 설정
    const finalTimer = setTimeout(() => {
      setProgress(100)
      setIsAnalysisComplete(true)
    }, 6000)

    return () => {
      timers.forEach(timer => clearTimeout(timer))
      clearTimeout(finalTimer)
    }
  }, [])

  useEffect(() => {
    if (isAnalysisComplete) {
      const timer = setTimeout(() => {
        onComplete?.()
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [isAnalysisComplete, onComplete])

  return (
    <div className="absolute inset-0 flex flex-col bg-[#f9f9fb]">
      {/* Status Bar */}
      <div className="absolute top-0 left-0 right-0 w-full h-[32px] bg-transparent flex items-center justify-between px-[16px]">
        <p className="text-[11px] font-semibold text-black leading-[14px] tracking-[-0.23px]">9:41</p>
        <div className="flex gap-[3px] items-center">
          <div className="w-[12px] h-[9px]">
            <img src={imgIconMobileSignal} alt="signal" className="w-full h-full" />
          </div>
          <div className="w-[11px] h-[8px]">
            <img src={imgWifi} alt="wifi" className="w-full h-full" />
          </div>
          <div className="w-[19px] h-[9px] flex items-center gap-[1px]">
            <div className="flex-1 h-full relative">
              <img src={imgOutline} alt="battery-outline" className="absolute inset-0 w-full h-full" />
              <img src={imgFill} alt="battery-fill" className="absolute inset-0 w-[calc(100%-3px)] h-[calc(100%-2px)] left-[1.5px] top-[1px]" />
            </div>
            <img src={imgBatteryEnd} alt="battery-end" className="w-[1px] h-[3px]" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto flex flex-col gap-[24px] px-[11px] pt-[32px] pb-[24px] mt-[32px]">
        {/* Header */}
        <div className="flex flex-col gap-[12px] items-center animate-slide-in-section-1">
          <div className="flex flex-col gap-[6px] items-center text-center">
            <h1 className="text-[17px] font-['Pretendard'] font-bold leading-[1.4]">
              <span className="bg-gradient-to-r from-[#007aff] via-[#5856d6] to-[#007aff] bg-clip-text text-transparent animate-gradient-flow">
                {topCategory}
              </span>
              를 우선으로<br />
              <span className="bg-gradient-to-r from-[#007aff] via-[#5856d6] to-[#007aff] bg-clip-text text-transparent animate-gradient-flow">
                {lastCategory}
              </span>
              {' '}조정을 점검하고 있어요
            </h1>
            <p className="text-[12px] font-['Pretendard'] font-medium text-[#7a7a7a]">
              잠시만 기다려 주세요
            </p>
          </div>

          {/* Circular Progress */}
          <div className="relative w-[140px] h-[140px] flex items-center justify-center animate-slide-in-section-2">
            <svg className="w-full h-full" viewBox="0 0 140 140">
              {/* 배경 원 */}
              <circle cx="70" cy="70" r="50" fill="none" stroke="#f0f0f5" strokeWidth="8" />
              {/* 파란색 게이지 */}
              <circle
                cx="70"
                cy="70"
                r="50"
                fill="none"
                stroke="#007aff"
                strokeWidth="8"
                strokeDasharray={circumference}
                strokeDashoffset={dashOffset}
                strokeLinecap="round"
                transform="rotate(-90 70 70)"
                style={{
                  transition: 'stroke-dashoffset 0.5s ease-out'
                }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <p className="text-[28px] font-['Pretendard'] font-semibold text-[#1d1d1f]">
                {Math.round(progress)}%
              </p>
            </div>
          </div>
        </div>

        {/* Loading Steps */}
        <div className="flex flex-col gap-[8px] animate-slide-in-section-3">
          <div className="bg-white rounded-[8px] shadow-[2px_4px_6px_rgba(0,0,0,0.04)] p-[11px] flex flex-col gap-[8px]">
            {steps.map((step, index) => {
              const isCompleted = completedSteps.has(step.id)
              const isFirst = index === 0

              return (
                <div key={step.id} className="flex gap-[8px] items-center">
                  <div className="w-[20px] h-[20px] flex-shrink-0">
                    {isCompleted ? (
                      <img src={imgCheckMark} alt="completed" className="w-full h-full" />
                    ) : (
                      <img src={imgGroup} alt="loading" className="w-full h-full animate-spin" />
                    )}
                  </div>
                  <p className={`text-[12px] font-['Pretendard'] ${isCompleted || isFirst ? 'font-semibold' : 'font-medium'} ${isCompleted ? 'text-[#1d1d1f]' : isFirst ? 'text-[#1d1d1f]' : 'text-[#cdcdcd]'}`}>
                    {isCompleted ? step.completedLabel : step.label}
                  </p>
                </div>
              )
            })}
          </div>

          {/* Budget Info Cards */}
          <div className="bg-white rounded-[8px] shadow-[2px_4px_6px_rgba(0,0,0,0.04)] p-[11px] flex justify-between gap-[8px] animate-slide-in-section-4">
            {/* Current Usage */}
            <div className="flex flex-col gap-[1px] items-center flex-1">
              <p className="text-[9px] font-['Pretendard'] font-medium text-[#007aff]">
                현재 사용
              </p>
              <p className="text-[11px] font-['Pretendard'] font-semibold text-[#1d1d1f]">
                ￥360,000
              </p>
            </div>

            {/* Remaining */}
            <div className="flex flex-col gap-[1px] items-center flex-1">
              <p className="text-[9px] font-['Pretendard'] font-medium text-[#007aff]">
                남은 금액
              </p>
              <p className="text-[11px] font-['Pretendard'] font-semibold text-[#1d1d1f]">
                ￥140,000
              </p>
            </div>

            {/* Days */}
            <div className="flex flex-col gap-[1px] items-center flex-1">
              <p className="text-[9px] font-['Pretendard'] font-medium text-[#007aff]">
                남은 일정
              </p>
              <p className="text-[11px] font-['Pretendard'] font-semibold text-[#1d1d1f]">
                2일
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
