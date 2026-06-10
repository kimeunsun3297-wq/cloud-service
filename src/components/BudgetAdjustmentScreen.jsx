import { useState, useEffect } from 'react'
import { imgRightSide } from '../utils/statusBarIcons'
import { aiIcon } from '../utils/icons'

const imgMakiArrow = "https://www.figma.com/api/mcp/asset/45d2fa41-198a-4cab-991a-37283ae0985a"
const imgRemainingBudget = `data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='40' height='40' rx='20' fill='%23007AFF' fill-opacity='0.15'/%3E%3Cpath d='M20 21C18.6739 21 17.4021 20.4732 16.4645 19.5355C15.5268 18.5979 15 17.3261 15 16H17C17 16.7956 17.3161 17.5587 17.8787 18.1213C18.4413 18.6839 19.2044 19 20 19C20.7956 19 21.5587 18.6839 22.1213 18.1213C22.6839 17.5587 23 16.7956 23 16H25C25 17.3261 24.4732 18.5979 23.5355 19.5355C22.5979 20.4732 21.3261 21 20 21ZM20 11C20.7956 11 21.5587 11.3161 22.1213 11.8787C22.6839 12.4413 23 13.2044 23 14H17C17 13.2044 17.3161 12.4413 17.8787 11.8787C18.4413 11.3161 19.2044 11 20 11ZM27 14H25C25 13.3434 24.8707 12.6932 24.6194 12.0866C24.3681 11.48 23.9998 10.9288 23.5355 10.4645C23.0712 10.0002 22.52 9.63188 21.9134 9.3806C21.3068 9.12933 20.6566 9 20 9C18.6739 9 17.4021 9.52678 16.4645 10.4645C15.5268 11.4021 15 12.6739 15 14H13C11.89 14 11 14.89 11 16V28C11 28.5304 11.2107 29.0391 11.5858 29.4142C11.9609 29.7893 12.4696 30 13 30H27C27.5304 30 28.0391 29.7893 28.4142 29.4142C28.7893 29.0391 29 28.5304 29 28V16C29 15.4696 28.7893 14.9609 28.4142 14.5858C28.0391 14.2107 27.5304 14 27 14Z' fill='%23007AFF'/%3E%3C/svg%3E`
const imgDailyAverage = `data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='40' height='40' rx='20' fill='%23007AFF' fill-opacity='0.15'/%3E%3Cpath d='M26 19H14V14H26M24.5 25C24.1022 25 23.7206 24.842 23.4393 24.5607C23.158 24.2794 23 23.8978 23 23.5C23 23.1022 23.158 22.7206 23.4393 22.4393C23.7206 22.158 24.1022 22 24.5 22C24.8978 22 25.2794 22.158 25.5607 22.4393C25.842 22.7206 26 23.1022 26 23.5C26 23.8978 25.842 24.2794 25.5607 24.5607C25.2794 24.842 24.8978 25 24.5 25ZM15.5 25C15.1022 25 14.7206 24.842 14.4393 24.5607C14.158 24.2794 14 23.8978 14 23.5C14 23.1022 14.158 22.7206 14.4393 22.4393C14.7206 22.158 15.1022 22 15.5 22C15.8978 22 16.2794 22.158 16.5607 22.4393C16.842 22.7206 17 23.1022 17 23.5C17 23.8978 16.842 24.2794 16.5607 24.5607C16.2794 24.842 15.8978 25 15.5 25ZM12 24C12 24.88 12.39 25.67 13 26.22V28C13 28.2652 13.1054 28.5196 13.2929 28.7071C13.4804 28.8946 13.7348 29 14 29H15C15.2652 29 15.5196 28.8946 15.7071 28.7071C15.8946 28.5196 16 28.2652 16 28V27H24V28C24 28.2652 24.1054 28.5196 24.2929 28.7071C24.4804 28.8946 24.7348 29 25 29H26C26.2652 29 26.5196 28.8946 26.7071 28.7071C26.8946 28.5196 27 28.2652 27 28V26.22C27.61 25.67 28 24.88 28 24V14C28 10.5 24.42 10 20 10C15.58 10 12 10.5 12 14V24Z' fill='%23007AFF'/%3E%3C/svg%3E`
const imgBudgetStability = `data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='40' height='40' rx='20' fill='%23007AFF' fill-opacity='0.15'/%3E%3Cpath d='M13 17.5C11.9 17.5 11 18.4 11 19.5C11 20.6 11.9 21.5 13 21.5C14.1 21.5 15 20.6 15 19.5C15 18.4 14.1 17.5 13 17.5ZM27 17.5C25.9 17.5 25 18.4 25 19.5C25 20.6 25.9 21.5 27 21.5C28.1 21.5 29 20.6 29 19.5C29 18.4 28.1 17.5 27 17.5ZM20 17.5C18.9 17.5 18 18.4 18 19.5C18 20.6 18.9 21.5 20 21.5C21.1 21.5 22 20.6 22 19.5C22 18.4 21.1 17.5 20 17.5Z' fill='%23007AFF'/%3E%3C/svg%3E`

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
        <div className="w-[50px] h-[9px]">
          <img src={imgRightSide} alt="status-bar" className="w-full h-full" />
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
                <img src={aiIcon} alt="ai" className="w-full h-full" />
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
