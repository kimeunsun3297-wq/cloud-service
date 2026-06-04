import { useEffect, useRef, useState } from 'react'
import Lottie from 'lottie-react'
import aiStarsAnimation from '../assets/animations/ai-stars.json'

export default function PushNotificationScreen({ onTap, urgency = 'high' }) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // 화면 진입 애니메이션
    setTimeout(() => setIsVisible(true), 100)

    // 2초 후 자동 전환
    const autoTransitionTimer = setTimeout(() => {
      onTap()
    }, 2000)

    return () => clearTimeout(autoTransitionTimer)
  }, [onTap])

  const getContent = () => {
    if (urgency === 'high') {
      return {
        title: '나리타 공항까지 가는\n지하철 운행 중단을 감지 했어요',
        description: '지금 바로 확인해 드릴게요'
      }
    }
    return {
      title: '30분 뒤 강한 비 예보가 있어요',
      description: '근처 실내 장소를 찾아 드릴께요'
    }
  }

  const content = getContent()

  return (
    <div
      onClick={onTap}
      className={`absolute inset-0 flex items-center justify-center cursor-pointer transition-all duration-500 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {/* Push Notification Card */}
      <div className="w-[calc(100%-32px)] rounded-[16px] overflow-hidden transform transition-transform duration-500"
        style={{
          backgroundColor: '#f5f5f5',
          transform: isVisible ? 'translateY(0)' : 'translateY(100px)'
        }}
      >
        <div className="px-[14px] py-[14px] flex gap-[10px]">
          {/* Icon */}
          <div className="w-[38px] h-[38px] flex-shrink-0 rounded-[8px] overflow-hidden">
            <Lottie
              animationData={aiStarsAnimation}
              loop={true}
              autoplay={true}
              style={{ width: '100%', height: '100%' }}
            />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <p className="text-[12px] font-['Pretendard'] font-semibold text-[#1d1d1f] leading-[1.4] tracking-[-0.4px]">
              <span className="gradient-text">
                {content.title.split('\n').map((line, idx) => (
                  <span key={idx}>
                    {line}
                    {idx < content.title.split('\n').length - 1 && <br />}
                  </span>
                ))}
              </span><br />
              <span className="text-black">{content.description}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
