import { useState, useEffect } from 'react'

const imgMakiArrow = "https://www.figma.com/api/mcp/asset/45d2fa41-198a-4cab-991a-37283ae0985a"
const imgRemainingBudget = "https://www.figma.com/api/mcp/asset/f39c088a-2156-4f4d-addf-af0400908d1c"
const imgDailyAverage = "https://www.figma.com/api/mcp/asset/134a2188-dad9-44c7-ab67-cedbcc73b8f0"
const imgBudgetStability = "https://www.figma.com/api/mcp/asset/9e2998c1-b97b-4913-918f-3aed9399f7cb"
const imgOutline = "https://www.figma.com/api/mcp/asset/b3d499bc-110a-4195-ba67-431723a65b15"
const imgBatteryEnd = "https://www.figma.com/api/mcp/asset/53955dd7-92d1-41b0-870b-f31078232286"
const imgFill = "https://www.figma.com/api/mcp/asset/7d1ea2ec-6295-4155-bb90-8ef46c3ca267"
const imgWifi = "https://www.figma.com/api/mcp/asset/cd3652d4-88a4-47c7-9fda-6e6eb4015e0a"
const imgIconMobileSignal = "https://www.figma.com/api/mcp/asset/344b0bab-311f-47a6-aa44-c9e9dcef2205"
const imgAiFillIcon = "https://www.figma.com/api/mcp/asset/8fcd2d4b-3f25-4c68-85dd-aa6539833633"

export default function BudgetAdjustmentScreen({ onBack, selectedPriorities }) {
  const [animateDonut, setAnimateDonut] = useState(false)
  const circumference = 2 * Math.PI * 26
  const dashOffset = circumference * (1 - 66 / 100)

  const lastCategory = selectedPriorities?.[selectedPriorities.length - 1]?.name || '쇼핑'

  const getCategoryMessages = (category) => {
    const messages = {
      '식비': { title: '식비를 약 3,000엔 줄이면', desc: '식비 지출을 조정하면 다른 카테고리에 더 많은 예산을 할당할 수 있어요. 남은 일정 동안 필요한 지출에 대비할 수 있습니다.' },
      '교통비': { title: '교통비를 약 3,000엔 줄이면', desc: '교통비 지출을 조정하면 다른 카테고리에 더 많은 예산을 할당할 수 있어요. 남은 일정 동안 필요한 지출에 대비할 수 있습니다.' },
      '쇼핑': { title: '쇼핑을 약 3,000엔 줄이면', desc: '쇼핑 지출을 조정하면 다른 카테고리에 더 많은 예산을 할당할 수 있어요. 남은 일정 동안 필요한 지출에 대비할 수 있습니다.' },
      '체험비': { title: '체험비를 약 3,000엔 줄이면', desc: '체험비 지출을 조정하면 다른 카테고리에 더 많은 예산을 할당할 수 있어요. 남은 일정 동안 필요한 지출에 대비할 수 있습니다.' },
      '기타': { title: '기타를 약 3,000엔 줄이면', desc: '기타 항목 지출을 조정하면 다른 카테고리에 더 많은 예산을 할당할 수 있어요. 남은 일정 동안 필요한 지출에 대비할 수 있습니다.' }
    }
    return messages[category] || messages['쇼핑']
  }

  const messages = getCategoryMessages(lastCategory)

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimateDonut(true)
    }, 600)

    return () => clearTimeout(timer)
  }, [])

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
      <div className="flex-1 overflow-y-auto flex flex-col gap-[12px] pt-[48px] px-[11px] pb-[90px] mt-[48px] justify-center items-center">
        {/* Header */}
        <div className="flex flex-col gap-[6px] items-center animate-slide-in-section-1">
          <p className="text-[17px] font-['Pretendard'] font-bold bg-gradient-to-r from-[#007aff] via-[#5856d6] to-[#007aff] bg-clip-text text-transparent animate-gradient-flow text-center leading-[1.3]">
            {messages.title}<br />남은 여행 일정이 더 여유로워져요
          </p>
        </div>

        {/* Adjustment Result Card */}
        <div className="bg-white rounded-[8px] p-[11px] shadow-[2px_4px_6px_rgba(0,0,0,0.04)] animate-slide-in-section-2 flex-1 w-full">
          <p className="text-[12px] font-['Pretendard'] font-semibold text-black mb-[8px]">
            조정 후 예상 결과
          </p>

          {/* Percentage Comparison - Linear Progress Bar */}
          <div className="flex flex-col gap-[12px] mb-[11px]">
            {/* Before */}
            <div className="flex flex-col gap-[6px]">
              <div className="flex items-center justify-between">
                <p className="text-[10px] font-['Pretendard'] font-medium text-[#7a7a7a]">
                  현재 예산 사용률
                </p>
                <p className="text-[12px] font-['Pretendard'] font-semibold text-[#cdcdcd]">72%</p>
              </div>
              <div className="w-full h-[8px] bg-[#f0f0f5] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#cdcdcd] rounded-full transition-all duration-500"
                  style={{ width: '72%' }}
                />
              </div>
            </div>

            {/* Arrow & Savings Badge */}
            <div className="flex items-center justify-center gap-[8px] py-[4px]">
              <div className="flex-1 h-[1px] bg-[#e0e0e0]" />
              <div className="bg-[rgba(0,122,255,0.1)] px-[8px] py-[4px] rounded-[4px] flex items-center gap-[4px]">
                <svg className="w-[12px] h-[12px]" viewBox="0 0 12 12" fill="none">
                  <path d="M6 1v10M1 7l5 4 5-4" stroke="#007aff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <p className="text-[10px] font-['Pretendard'] font-semibold text-[#007aff]">6% 절감</p>
              </div>
              <div className="flex-1 h-[1px] bg-[#e0e0e0]" />
            </div>

            {/* After */}
            <div className="flex flex-col gap-[6px]">
              <div className="flex items-center justify-between">
                <p className="text-[10px] font-['Pretendard'] font-medium text-[#1d1d1f] font-semibold">
                  조정 후 예상 사용률
                </p>
                <p className="text-[12px] font-['Pretendard'] font-semibold text-[#007aff]">66%</p>
              </div>
              <div className="w-full h-[8px] bg-[#f0f0f5] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#007aff] rounded-full transition-all duration-500"
                  style={{
                    width: animateDonut ? '66%' : '0%',
                    transitionDelay: '0.3s'
                  }}
                />
              </div>
            </div>
          </div>

          {/* Budget Details */}
          <div className="flex flex-col gap-[8px]">
            {/* Remaining Budget */}
            <div className="flex items-center justify-between">
              <div className="flex gap-[6px] items-center min-w-0">
                <img src={imgRemainingBudget} alt="remaining budget" className="w-[24px] h-[24px] rounded-[4px] flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] font-['Pretendard'] font-medium text-[#7a7a7a]">
                    남은 예산
                  </p>
                  <div className="flex gap-[2px] items-baseline">
                    <p className="text-[11px] font-['Pretendard'] font-semibold text-[#cdcdcd] line-through">
                      118,000
                    </p>
                    <p className="text-[11px] font-['Pretendard'] font-semibold text-[#1d1d1f]">
                      170,000
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-[rgba(0,122,255,0.08)] px-[8px] py-[6px] rounded-[3px] flex-shrink-0">
                <p className="text-[10px] font-['Pretendard'] font-semibold text-[#007aff]">
                  +30,000
                </p>
              </div>
            </div>

            {/* Daily Average */}
            <div className="h-0 border-t border-[rgba(0,0,0,0.08)]" />
            <div className="flex items-center justify-between">
              <div className="flex gap-[6px] items-center min-w-0">
                <img src={imgDailyAverage} alt="daily average" className="w-[24px] h-[24px] rounded-[4px] flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] font-['Pretendard'] font-medium text-[#7a7a7a]">
                    일 평균 가능 금액
                  </p>
                  <div className="flex gap-[2px] items-baseline">
                    <p className="text-[11px] font-['Pretendard'] font-semibold text-[#cdcdcd] line-through">
                      70,000
                    </p>
                    <p className="text-[11px] font-['Pretendard'] font-semibold text-[#1d1d1f]">
                      85,000
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-[rgba(0,122,255,0.08)] px-[8px] py-[6px] rounded-[3px] flex-shrink-0">
                <p className="text-[10px] font-['Pretendard'] font-semibold text-[#007aff]">
                  +15,000
                </p>
              </div>
            </div>

            {/* Budget Stability */}
            <div className="h-0 border-t border-[rgba(0,0,0,0.08)]" />
            <div className="flex items-center justify-between">
              <div className="flex gap-[6px] items-center min-w-0">
                <div className="w-[24px] h-[24px] rounded-[4px] flex-shrink-0 bg-[rgba(0,122,255,0.15)] flex items-center justify-center p-[3px]">
                  <img src={imgBudgetStability} alt="budget stability" className="w-full h-full" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] font-['Pretendard'] font-medium text-[#7a7a7a]">
                    예산 안정도
                  </p>
                  <div className="flex gap-[2px] items-baseline">
                    <p className="text-[11px] font-['Pretendard'] font-semibold text-[#cdcdcd] line-through">
                      위험
                    </p>
                    <p className="text-[11px] font-['Pretendard'] font-semibold text-[#1d1d1f]">
                      안정
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-[rgba(0,122,255,0.08)] px-[8px] py-[6px] rounded-[3px] flex-shrink-0">
                <p className="text-[10px] font-['Pretendard'] font-semibold text-[#007aff]">
                  개선
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* AI Recommendation Card */}
        <div className="bg-white border border-[#007aff] rounded-[8px] p-[11px] animate-slide-in-section-3 flex-1 w-full">
          <div className="flex gap-[4px] items-center mb-[8px]">
            <div className="bg-gradient-to-r from-[#007aff] to-[#fa6aff] px-[8px] py-[4px] rounded-[4px] flex items-center gap-[3px]">
              <div className="w-[12px] h-[12px] flex-shrink-0">
                <img src={imgAiFillIcon} alt="ai" className="w-full h-full" />
              </div>
              <p className="text-[10px] font-['Pretendard'] font-semibold text-white">
                AI 추천
              </p>
            </div>
          </div>
          <p className="text-[12px] font-['Pretendard'] font-semibold text-[#1d1d1f] mb-[6px]">
            {lastCategory} 지출 조정
          </p>
          <p className="text-[10px] font-['Pretendard'] font-medium text-[#7a7a7a] leading-[1.3]">
            {messages.desc}
          </p>
        </div>
      </div>

      {/* Bottom Buttons */}
      <div className="absolute bottom-0 left-0 right-0 w-full flex gap-[6px] px-[11px] py-[12px] bg-gradient-to-b from-transparent via-[#f9f9fb] to-[#f9f9fb] animate-slide-in-section-4">
        <button className="flex-1 h-[40px] bg-white border border-[#007aff] rounded-full flex items-center justify-center gap-[3px] hover:bg-[#f9f9fb] transition-all">
          <p className="text-[12px] font-['Pretendard'] font-semibold text-[#007aff]">조정안 자세히</p>
        </button>
        <button
          onClick={onBack}
          className="flex-1 h-[40px] bg-[#007aff] rounded-full flex items-center justify-center gap-[3px] hover:bg-[#0056cc] transition-all"
        >
          <p className="text-[12px] font-['Pretendard'] font-semibold text-white">나가기</p>
        </button>
      </div>
    </div>
  )
}
