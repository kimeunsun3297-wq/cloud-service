import { useState, useEffect } from 'react'
import Lottie from 'lottie-react'
import aiStarsAnimation from '../assets/animations/ai-stars.json'

const title = "지출 데이터 분석 및 예산 조정 중"
const description = "잠시만 기다려 주세요"

const imgNotch = "https://www.figma.com/api/mcp/asset/c5f98a3f-f116-4789-9859-4de4b684e7be"
const imgOutline = "https://www.figma.com/api/mcp/asset/1a667a2c-3974-43f9-bf83-97e748251fc0"
const imgBatteryEnd = "https://www.figma.com/api/mcp/asset/7052a3a5-451b-47ef-a9ba-a92a05a28b9c"
const imgFill = "https://www.figma.com/api/mcp/asset/01078b3d-ea30-429c-8408-b24409b19bea"
const imgWifi = "https://www.figma.com/api/mcp/asset/44069fdc-9066-4108-9da1-2f7ef2399ac7"
const imgIconMobileSignal = "https://www.figma.com/api/mcp/asset/d97113f8-b82e-4d7f-b5dc-8a9ab23a8081"

export default function LoadingScreen({ onLoadingComplete }) {
  const [displayedTitle, setDisplayedTitle] = useState('')
  const [displayedDescription, setDisplayedDescription] = useState('')

  useEffect(() => {
    let titleIndex = 0
    let descIndex = 0
    let titleTimer
    let descTimer

    // 제목 타이핑 애니메이션
    titleTimer = setInterval(() => {
      if (titleIndex < title.length) {
        setDisplayedTitle(title.slice(0, titleIndex + 1))
        titleIndex++
      } else {
        clearInterval(titleTimer)
        // 제목이 완성되면 설명 타이핑 시작
        descTimer = setInterval(() => {
          if (descIndex < description.length) {
            setDisplayedDescription(description.slice(0, descIndex + 1))
            descIndex++
          } else {
            clearInterval(descTimer)
            // 설명 완료 후 2초 뒤에 다음 화면으로 전환
            const transitionTimer = setTimeout(() => {
              if (onLoadingComplete) {
                onLoadingComplete()
              }
            }, 2000)
            return () => clearTimeout(transitionTimer)
          }
        }, 40)
      }
    }, 60)

    return () => {
      clearInterval(titleTimer)
      clearInterval(descTimer)
    }
  }, [onLoadingComplete])

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

      {/* Loading Content */}
      <div className="flex-1 flex flex-col items-center justify-center gap-[12px] mt-[32px]">
        {/* Lottie Animation */}
        <div className="w-[87px] h-[87px] rounded-[8px] overflow-hidden flex-shrink-0">
          <Lottie
            animationData={aiStarsAnimation}
            loop={true}
            autoplay={true}
            style={{ width: '100%', height: '100%' }}
          />
        </div>

        {/* Title */}
        <p className="text-[17px] font-['Pretendard'] font-bold text-[#1d1d1f] text-center leading-[1.5] tracking-[-0.05px] min-h-[26px]">
          {displayedTitle}
        </p>

        {/* Description */}
        <p className="text-[14px] font-['Pretendard'] font-medium text-[#7a7a7a] text-center leading-[1.5] tracking-[-0.05px] max-w-[280px] min-h-[42px] whitespace-pre-line">
          {displayedDescription.split('\n').map((line, idx) => (
            <span key={idx}>
              {line}
              {idx < displayedDescription.split('\n').length - 1 && <br />}
            </span>
          ))}
        </p>
      </div>
    </div>
  )
}
