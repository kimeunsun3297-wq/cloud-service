import { useState, useEffect, useRef } from 'react'
import Lottie from 'lottie-react'
import aiStarsAnimation from '../assets/animations/ai-stars.json'

const imgIxAlarmBellFilled = "https://www.figma.com/api/mcp/asset/3ff5961e-20c6-41e1-9483-cb76f1fe69bc"
const imgMaterialSymbolsMoneyBagRounded = "https://www.figma.com/api/mcp/asset/e99510c6-9cf2-4480-82fb-364db933e01f"
const imgVector47 = "https://www.figma.com/api/mcp/asset/9d5818bb-fafe-4faf-878f-bec52a4643b1"
const imgIonCalendar = "https://www.figma.com/api/mcp/asset/a6d29960-dc5a-4cc8-a085-0cce19c666d1"
const imgMaterialSymbolsRefreshRounded = "https://www.figma.com/api/mcp/asset/763e3815-0ff2-415d-aa44-dd949e4d6a04"
const img1 = "https://www.figma.com/api/mcp/asset/0244c6e2-227c-4550-bfa2-89d5ccda2521"
const imgVector = "https://www.figma.com/api/mcp/asset/4a6a0697-c5de-48ff-88cc-99f97b2b5fea"
const imgVector46 = "https://www.figma.com/api/mcp/asset/4eea9b4c-9e36-470c-85fe-ebc328e1a668"
const img2 = "https://www.figma.com/api/mcp/asset/825ceff2-1f18-481a-82f3-68db57e7ea19"
const img3 = "https://www.figma.com/api/mcp/asset/e849746c-339a-4769-b981-e520378c87d7"
const img4 = "https://www.figma.com/api/mcp/asset/38b47385-c9ff-4eee-80da-1e331b2e76c8"
const imgIonLogOut = "https://www.figma.com/api/mcp/asset/24801a56-b4da-4b4c-95b1-780df450010e"
const imgGroup = "https://www.figma.com/api/mcp/asset/b9422d59-504a-4bbd-8ad1-fba6bc24f134"
const imgAiFill = "https://www.figma.com/api/mcp/asset/fd56ea25-d604-43f9-8162-89ca7141a465"
const imgOutline = "https://www.figma.com/api/mcp/asset/eef0763a-0ab4-41c2-bffc-e89241f3bc70"
const imgBatteryEnd = "https://www.figma.com/api/mcp/asset/0d5ed089-c4ce-4fbc-b98d-fef875bef153"
const imgFill = "https://www.figma.com/api/mcp/asset/0e9fcc68-e8ea-4c8b-8b3a-11fede8ca729"
const imgWifi = "https://www.figma.com/api/mcp/asset/2247854e-31a8-4301-af27-f17ef50c87dc"
const imgIconMobileSignal = "https://www.figma.com/api/mcp/asset/df832024-e465-458a-96aa-fc448aabff3e"

export default function BudgetCard({ onCheckBudget }) {
  const [hasScroll, setHasScroll] = useState(false)
  const [animateProgress, setAnimateProgress] = useState(false)
  const contentRef = useRef(null)

  const handleScroll = (e) => {
    setHasScroll(e.target.scrollTop > 0)
  }

  useEffect(() => {
    // 컴포넌트 마운트 시 프로그레스 바 애니메이션 트리거
    const timer = setTimeout(() => {
      setAnimateProgress(true)
    }, 400) // 현황 섹션이 나타나는 시점 (0.4s)

    return () => clearTimeout(timer)
  }, [])

  const categories = [
    { name: '쇼핑', amount: 118000, icon: img1, percentage: 77.61 },
    { name: '식비', amount: 142000, icon: img2, percentage: 58.84 },
    { name: '교통', amount: 64000, icon: img3, percentage: 48.23 },
    { name: '체험', amount: 36000, icon: img4, percentage: 29.9 }
  ]

  const budgetPercentage = 72.61

  return (
    <div className="absolute inset-0 flex flex-col bg-[#f9f9fb]">
      {/* Status Bar */}
      <div className={`absolute top-0 left-0 right-0 w-full h-[32px] flex items-center justify-between px-[16px] transition-colors duration-300 ${
        hasScroll ? 'bg-white' : 'bg-transparent'
      }`}>
        {/* Left - Time */}
        <p className="text-[11px] font-semibold text-black leading-[14px] tracking-[-0.23px]">9:41</p>

        {/* Right - Signal, WiFi, Battery */}
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

      {/* Main Content */}
      <div
        ref={contentRef}
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto flex flex-col gap-[17px] pt-[11px] px-[11px] pb-[90px] mt-[32px]"
      >

        {/* Header with Title */}
        <div className="flex flex-col gap-0 animate-slide-in-section-1">
          <div className="flex gap-[6px] items-start w-full">
            <div className="w-[35px] h-[34px] rounded flex-shrink-0 overflow-hidden">
              <Lottie
                animationData={aiStarsAnimation}
                loop={true}
                autoplay={true}
                style={{ width: '100%', height: '100%' }}
              />
            </div>
            <div className="flex-1 flex flex-col gap-[6px]">
              <p className="text-[17px] font-['Pretendard'] font-bold bg-gradient-to-r from-[#007aff] via-[#5856d6] to-[#007aff] bg-clip-text text-transparent animate-gradient-flow whitespace-pre-line leading-[1.3]">
                AI 어시스턴트가<br />예산 상황을 점검했어요
              </p>
            </div>
            <img src={imgIxAlarmBellFilled} alt="alarm" className="w-[17px] h-[17px] flex-shrink-0" />
          </div>
        </div>

        {/* 현황 (Status) Section */}
        <div className="flex flex-col gap-[8px] animate-slide-in-section-2">
          <p className="text-[14px] font-['Pretendard'] font-semibold text-black">현황</p>

          {/* Status Cards */}
          <div className="bg-[rgba(217,235,255,0.6)] rounded-[8px] p-[11px] flex items-center justify-center gap-[17px] w-full">
            {/* Balance */}
            <div className="flex gap-[8px] items-center min-w-0">
              <img src={imgMaterialSymbolsMoneyBagRounded} alt="money" className="w-[23px] h-[23px] flex-shrink-0" />
              <div className="flex flex-col gap-[1px] min-w-0">
                <p className="text-[10px] font-['Pretendard'] font-medium text-[#7a7a7a] whitespace-nowrap">잔액</p>
                <p className="text-[14px] font-['Pretendard'] font-semibold text-black whitespace-nowrap">140,000</p>
              </div>
            </div>

            {/* Divider */}
            <div className="w-px h-[25px] bg-[rgba(0,0,0,0.1)]" />

            {/* Remaining Days */}
            <div className="flex gap-[8px] items-center min-w-0">
              <img src={imgIonCalendar} alt="calendar" className="w-[23px] h-[23px] flex-shrink-0" />
              <div className="flex flex-col gap-[1px] min-w-0">
                <p className="text-[10px] font-['Pretendard'] font-medium text-[#7a7a7a] whitespace-nowrap">남은 일정</p>
                <p className="text-[14px] font-['Pretendard'] font-semibold text-black whitespace-nowrap">2일</p>
              </div>
            </div>
          </div>

          {/* Budget Card */}
          <div className="bg-white rounded-[8px] p-[11px] shadow-[2px_4px_6px_rgba(0,0,0,0.04)]">
            <div className="flex gap-[3px] items-center mb-[8px]">
              <p className="text-[10px] font-['Pretendard'] font-medium text-[#cdcdcd]">26.06.03 14:51</p>
              <img src={imgMaterialSymbolsRefreshRounded} alt="refresh" className="w-[11px] h-[11px]" />
            </div>

            <div className="flex flex-col gap-[8px]">
              <p className="text-[10px] font-['Pretendard'] font-medium text-[#7a7a7a]">여행 예산</p>

              <div className="flex gap-[3px] items-baseline">
                <p className="text-[17px] font-['Pretendard'] font-semibold text-black">360,000</p>
                <p className="text-[14px] font-['Pretendard'] font-medium text-black">JPY</p>
              </div>

              <p className="text-[10px] font-['Pretendard'] font-medium text-[#7a7a7a] leading-[1.3]">
                <span>설정한 예산중 </span>
                <span className="font-semibold text-[#007aff]">{budgetPercentage.toFixed(1)}%</span>
                <span>를 사용 했어요</span>
              </p>

              {/* Progress Bar */}
              <div className="relative w-full h-[11px] bg-[rgba(218,218,231,0.4)] rounded-[6px] overflow-hidden">
                <div
                  className="absolute h-full bg-[#007aff] rounded-l-[6px]"
                  style={{
                    width: animateProgress ? `${budgetPercentage}%` : '0%',
                    transition: 'width 1.2s ease-out'
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Categories Section */}
        <div className="flex flex-col gap-[8px] animate-slide-in-section-3">
          <div className="flex items-center justify-between px-[2px]">
            <p className="text-[14px] font-['Pretendard'] font-semibold text-black">카테고리별 사용액</p>
            <p className="text-[10px] font-['Pretendard'] font-semibold text-[#7a7a7a]">높은순</p>
          </div>

          <div className="bg-white rounded-[8px] p-[11px] shadow-[2px_4px_6px_rgba(0,0,0,0.04)] flex flex-col gap-[8px]">
            {categories.map((cat, idx) => (
              <div key={idx}>
                <div className="flex items-center justify-between">
                  <div className="flex gap-[8px] items-center min-w-0">
                    <img src={cat.icon} alt={cat.name} className="w-[28px] h-[28px] rounded-[6px] flex-shrink-0" />
                    <p className="text-[11px] font-['Pretendard'] font-semibold text-[#1d1d1f]">{cat.name}</p>
                  </div>
                  <div className="flex gap-[2px] items-baseline flex-shrink-0">
                    <p className="text-[11px] font-['Pretendard'] font-semibold text-[#1d1d1f]">{(cat.amount).toLocaleString()}</p>
                    <p className="text-[11px] font-['Pretendard'] font-medium text-[#1d1d1f]">JPY</p>
                  </div>
                </div>
                {/* Category Progress Bar */}
                <div className="relative w-full h-[6px] bg-[rgba(218,218,231,0.4)] rounded-[3px] overflow-hidden mt-[4px]">
                  <div
                    className="absolute h-full bg-[#007aff] rounded-l-[3px]"
                    style={{
                      width: animateProgress ? `${cat.percentage}%` : '0%',
                      transition: 'width 1.2s ease-out'
                    }}
                  />
                </div>
                {idx !== categories.length - 1 && (
                  <div className="h-0 border-t border-[rgba(0,0,0,0.08)] mt-[8px]" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Buttons */}
      <div className="absolute bottom-0 left-0 right-0 w-full flex gap-[6px] px-[11px] py-[17px] bg-gradient-to-b from-transparent via-white to-white animate-slide-in-section-4">
        <button className="flex-1 h-[40px] bg-white border border-[#ececec] rounded-full flex items-center justify-center gap-[3px] hover:bg-[#f9f9fb] transition-all">
          <img src={imgIonLogOut} alt="logout" className="w-[17px] h-[17px]" />
          <p className="text-[14px] font-['Pretendard'] font-semibold text-[#7a7a7a]">나가기</p>
        </button>
        <button
          onClick={onCheckBudget}
          className="flex-1 h-[40px] bg-[#007aff] rounded-full flex items-center justify-center gap-[3px] hover:bg-[#0056cc] transition-all"
        >
          <img src={imgAiFill} alt="ai" className="w-[17px] h-[17px]" />
          <p className="text-[14px] font-['Pretendard'] font-semibold text-white">예산 점검 받기</p>
        </button>
      </div>
    </div>
  )
}
