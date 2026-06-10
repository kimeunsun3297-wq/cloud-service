import { useState, useEffect, useRef } from 'react'
import { imgRightSide } from '../utils/statusBarIcons'
import { backIcon, moreIcon, plusIcon, sendIcon } from '../utils/icons'
const imgVector48 = "https://www.figma.com/api/mcp/asset/89f31a4d-7072-4c8a-951e-3d2f2bd525ec"
const imgBoxiconsLocation = "https://www.figma.com/api/mcp/asset/dfc492f6-60ad-4456-8742-c32936a7b1c8"
const imgMaterialSymbolsMoneyOutlineRounded = "https://www.figma.com/api/mcp/asset/b0eacd9e-6db6-4320-becd-0d5b9a889589"
const imgGroup = "/tabler_clock.png"

export default function FlightCrisisScreen({ onComplete }) {
  const chatContentRef = useRef(null)

  const [showMessages, setShowMessages] = useState({
    initial: false,
    chatBubble: false,
    userMessage: false,
    taxiBooked: false,
    onTheWay: false,
  })

  const [timestamps, setTimestamps] = useState({
    initial: '',
    userMessage: '',
    taxiBooked: '',
    onTheWay: '',
  })

  // 현재 시간을 한국어 포맷으로 변환
  const formatTimeKorean = (date) => {
    const hours = date.getHours()
    const minutes = date.getMinutes()
    const period = hours >= 12 ? '오후' : '오전'
    const displayHours = hours % 12 || 12
    const displayMinutes = minutes.toString().padStart(2, '0')
    return `${period} ${displayHours}:${displayMinutes}`
  }

  const [displayedTitle, setDisplayedTitle] = useState('')
  const [displayedSubtitle, setDisplayedSubtitle] = useState('')
  const [showChatMessage, setShowChatMessage] = useState(false)
  const [showInfoBox, setShowInfoBox] = useState(false)
  const [showChatButtons, setShowChatButtons] = useState(false)

  useEffect(() => {
    let titleIndex = 0
    let subtitleIndex = 0
    let titleTimer
    let subtitleTimer

    // Show initial message immediately and start typing animation
    setShowMessages(prev => ({ ...prev, initial: true }))
    setTimestamps(prev => ({ ...prev, initial: formatTimeKorean(new Date()) }))

    // Typing animation for title
    titleTimer = setInterval(() => {
      const fullTitle = '공항행 지하철\n운행 중단을 감지했어요'
      if (titleIndex < fullTitle.length) {
        setDisplayedTitle(fullTitle.slice(0, titleIndex + 1))
        titleIndex++
      } else {
        clearInterval(titleTimer)
        // Start subtitle typing after title is done
        subtitleTimer = setInterval(() => {
          const fullSubtitle = '체크인 마감까지 약 50분 남았어요'
          if (subtitleIndex < fullSubtitle.length) {
            setDisplayedSubtitle(fullSubtitle.slice(0, subtitleIndex + 1))
            subtitleIndex++
          } else {
            clearInterval(subtitleTimer)
          }
        }, 60)
      }
    }, 60)

    // Show chat bubble after typing animation completes (approximately 2.5 seconds)
    const timer1 = setTimeout(() => {
      setShowMessages(prev => ({ ...prev, chatBubble: true }))
      // Show info box after bubble
      setTimeout(() => setShowInfoBox(true), 700)
      // Show buttons after info box
      setTimeout(() => setShowChatButtons(true), 1400)
      // Show chat message (taxi recommendation) last
      setTimeout(() => setShowChatMessage(true), 2100)
    }, 2500)

    return () => {
      clearInterval(titleTimer)
      clearInterval(subtitleTimer)
      clearTimeout(timer1)
    }
  }, [])

  // Auto-scroll to bottom when new messages appear
  useEffect(() => {
    if (chatContentRef.current) {
      setTimeout(() => {
        chatContentRef.current.scrollTop = chatContentRef.current.scrollHeight
      }, 100)
    }
  }, [showMessages.userMessage, showMessages.taxiBooked, showMessages.onTheWay])

  // Handle taxi button click - show user message
  const handleTaxiClick = () => {
    setShowChatMessage(true)
    setShowMessages(prev => ({ ...prev, userMessage: true }))
    setTimestamps(prev => ({ ...prev, userMessage: formatTimeKorean(new Date()) }))
    // Auto show taxi booked after 1.5 seconds
    setTimeout(() => {
      setShowMessages(prev => ({ ...prev, taxiBooked: true }))
      setTimestamps(prev => ({ ...prev, taxiBooked: formatTimeKorean(new Date()) }))
    }, 1500)
  }

  // Auto-show on the way message 1 second after taxi booked
  useEffect(() => {
    if (showMessages.taxiBooked && !showMessages.onTheWay) {
      const timer = setTimeout(() => {
        setShowMessages(prev => ({ ...prev, onTheWay: true }))
        setTimestamps(prev => ({ ...prev, onTheWay: formatTimeKorean(new Date()) }))
      }, 1000)

      return () => clearTimeout(timer)
    }
  }, [showMessages.taxiBooked, showMessages.onTheWay, formatTimeKorean])

  // Call onComplete callback 5 seconds after on the way message appears
  useEffect(() => {
    if (showMessages.onTheWay) {
      const completeTimer = setTimeout(() => {
        if (onComplete) {
          onComplete()
        }
      }, 1000)
      return () => clearTimeout(completeTimer)
    }
  }, [showMessages.onTheWay])

  // Auto-trigger taxi flow after initial message completes
  useEffect(() => {
    // After 3 seconds (when chat bubble is ready), auto-show user message
    const autoTaxiTimer = setTimeout(() => {
      setShowMessages(prev => ({ ...prev, userMessage: true }))
      setTimestamps(prev => ({ ...prev, userMessage: formatTimeKorean(new Date()) }))
      // Auto show taxi booked after 1.5 seconds
      setTimeout(() => {
        setShowMessages(prev => ({ ...prev, taxiBooked: true }))
        setTimestamps(prev => ({ ...prev, taxiBooked: formatTimeKorean(new Date()) }))
      }, 1500)
    }, 5000)

    return () => clearTimeout(autoTaxiTimer)
  }, [formatTimeKorean])

  // Handle second action - show on the way message
  const handleNextAction = () => {
    setShowMessages(prev => ({ ...prev, onTheWay: true }))
  }

  return (
    <div className="absolute inset-0 flex flex-col" style={{ backgroundColor: 'red' }}>
      {/* Status Bar */}
      <div className="absolute top-0 left-0 right-0 w-full h-[32px] bg-white flex items-center justify-between px-[16px]">
        <p className="text-[10px] font-semibold text-black leading-[14px] tracking-[-0.23px]">9:41</p>
        <div className="w-[50px] h-[9px]">
          <img src={imgRightSide} alt="status-bar" className="w-full h-full" />
        </div>
      </div>

      {/* Header */}
      <div className="absolute top-[32px] left-0 right-0 w-full h-[56px] flex items-center justify-between px-[16px] border-b border-[#ececec] bg-white">
        <div className="w-[24px] h-[24px]">
          <img src={backIcon} alt="back" className="w-full h-full" />
        </div>
        <p className="text-[12px] font-['Pretendard'] font-semibold text-[#1d1d1f] tracking-[-0.05px]">
          AI 어시스턴트와 대화중
        </p>
        <div className="w-[24px] h-[24px]">
          <img src={moreIcon} alt="more" className="w-full h-full" />
        </div>
      </div>

      {/* Chat Content */}
      <div ref={chatContentRef} className="flex-1 overflow-y-auto flex flex-col gap-[12px] pt-[24px] pb-[80px] mt-[88px]" style={{ backgroundColor: '#F9F9FB' }}>
        {/* Date Divider */}
        <div className="flex gap-[8px] items-center justify-center px-[16px]">
          <div className="flex-1 h-[0.5px] bg-[#d0d0d0]" />
          <p className="text-[10px] font-['Pretendard'] font-normal text-[#999999] tracking-[-0.05px] whitespace-nowrap">
            2026.06.03
          </p>
          <div className="flex-1 h-[0.5px] bg-[#d0d0d0]" />
        </div>

        {/* AI Message */}
        {showMessages.initial && (
        <div className="animate-fadeIn px-[16px]">
          {/* Message */}
          <div className="flex flex-col gap-[10px]">
            <div className="flex flex-col gap-[2px]">
              <p className="text-[15px] font-['Pretendard'] font-bold leading-[1.3] min-h-[40px]">
                <span className="gradient-text inline-block">
                  {displayedTitle.split('\n').map((line, idx) => (
                    <span key={idx}>
                      {line}
                      {idx < displayedTitle.split('\n').length - 1 && <br />}
                    </span>
                  ))}
                </span>
              </p>
              <p className="text-[12px] font-['Pretendard'] font-medium text-[#1d1d1f] tracking-[-0.05px]">
                {displayedSubtitle}
              </p>
            </div>

            {/* Chat Bubble with Recommendation */}
            {showChatMessage && (
            <div className="bg-white rounded-[14px] shadow-[2px_4px_6px_rgba(0,0,0,0.05)] p-[12px] flex flex-col gap-[12px] w-[90%] animate-fadeIn w-[70%]">
              <p className="text-[12px] font-['Pretendard'] font-semibold text-[#1d1d1f] leading-[1.4]">
                택시로 이동하시는게 가장 안전해요<br />지금 바로 호출 할까요?
              </p>

              {/* Options */}
              {showInfoBox && (
              <div className="flex flex-col gap-[1px] animate-fadeIn">
                {/* Info Box */}
                <div className="bg-[#f9f9fb] rounded-[10px] p-[10px] flex flex-col gap-[6px]">
                  <div className="flex gap-[12px] items-center justify-between">
                    <p className="text-[10px] font-['Pretendard'] font-medium text-[#888888] tracking-[-0.05px]">
                      차량 도착
                    </p>
                    <p className="text-[10px] font-['Pretendard'] font-semibold text-[#007aff] tracking-[-0.05px] flex-shrink-0">
                      약 2분 후
                    </p>
                  </div>

                  {/* Fare */}
                  <div className="flex gap-[12px] items-center justify-between">
                    <p className="text-[10px] font-['Pretendard'] font-medium text-[#888888] tracking-[-0.05px]">
                      예상 요금
                    </p>
                    <p className="text-[10px] font-['Pretendard'] font-semibold text-[#888888] tracking-[-0.05px] flex-shrink-0">
                      ￥65,000
                    </p>
                  </div>

                  {/* Airport Arrival */}
                  <div className="flex gap-[12px] items-center justify-between">
                    <p className="text-[10px] font-['Pretendard'] font-medium text-[#888888] tracking-[-0.05px]">
                      공항 도착 예상
                    </p>
                    <p className="text-[10px] font-['Pretendard'] font-semibold text-[#888888] tracking-[-0.05px] flex-shrink-0">
                      약 35분 후
                    </p>
                  </div>
                </div>
                <p className="text-[10px] font-['Pretendard'] font-medium text-[#d0d0d0] tracking-[-0.05px] px-[2px]">
                  리무진 버스는 마감 내 도착 어려움
                </p>

                {/* Buttons */}
                <div className="flex gap-[6px] animate-fadeIn pt-[12px]">
                  <button className="flex-1 h-[34px] bg-white border border-[#e8e8e8] rounded-[999px] flex items-center justify-center hover:bg-[#fafafa] transition-all">
                    <p className="text-[11px] font-['Pretendard'] font-semibold text-[#888888] tracking-[-0.05px]">
                      다른 방법 찾기
                    </p>
                  </button>
                  <button onClick={handleTaxiClick} className="flex-1 h-[34px] bg-[#007aff] rounded-[999px] flex items-center justify-center hover:bg-[#0051d5] transition-all">
                    <p className="text-[11px] font-['Pretendard'] font-semibold text-white tracking-[-0.05px]">
                      택시 호출하기
                    </p>
                  </button>
                </div>
              </div>
              )}
            </div>
            )}

            {/* Timestamp */}
            <p className="text-[10px] font-['Pretendard'] font-normal text-[#999999] tracking-[-0.05px]">
              {timestamps.initial}
            </p>
          </div>
        </div>
        )}

        {/* User Message */}
        {showMessages.userMessage && (
        <div className="flex flex-col gap-[6px] items-end animate-fadeIn px-[16px]">
            <div className="bg-[#007aff] rounded-l-[14px] rounded-br-[14px] px-[16px] py-[8px] flex items-center justify-center max-w-[200px]">
              <p className="text-[12px] font-['Pretendard'] font-semibold text-white leading-[1.4]">
                택시 호출 해줘
              </p>
            </div>
            <p className="text-[10px] font-['Pretendard'] font-normal text-[#999999] tracking-[-0.05px]">
              {timestamps.userMessage}
            </p>
          </div>
        )}

        {/* AI Response - Taxi Booked */}
        {showMessages.taxiBooked && (
        <div className="animate-fadeIn px-[16px]">
            <div className="flex flex-col gap-[10px]">
              <div className="bg-white rounded-[14px] shadow-[2px_4px_6px_rgba(0,0,0,0.05)] p-[12px] flex flex-col gap-[12px] w-[90%]">
                <p className="text-[12px] font-['Pretendard'] font-semibold text-[#1d1d1f] leading-[1.4]">
                  택시 호출 완료 했어요
                </p>

                {/* Vehicle Info */}
                <div className="flex flex-col gap-[12px]">
                  <div className="flex flex-col gap-[2px]">
                    <p className="text-[12px] font-['Pretendard'] font-semibold text-[#1d1d1f]">
                      차량 정보
                    </p>
                    <p className="text-[10px] font-['Pretendard'] font-medium text-[#888888]">
                      도요타 크라운 · 백색 · 品川 123 さ 45-67
                    </p>
                  </div>

                  {/* Info Box */}
                  <div className="bg-[#f9f9fb] rounded-[10px] p-[10px] flex flex-col gap-[6px]">
                    <div className="flex gap-[12px] items-center justify-between">
                      <p className="text-[10px] font-['Pretendard'] font-medium text-[#888888] tracking-[-0.05px]">
                        차량 도착
                      </p>
                      <p className="text-[10px] font-['Pretendard'] font-semibold text-[#007aff] tracking-[-0.05px] flex-shrink-0">
                        약 2분 후
                      </p>
                    </div>
                    <div className="flex gap-[12px] items-center justify-between">
                      <p className="text-[10px] font-['Pretendard'] font-medium text-[#888888] tracking-[-0.05px]">
                        공항 도착 예상
                      </p>
                      <p className="text-[10px] font-['Pretendard'] font-semibold text-[#888888] tracking-[-0.05px] flex-shrink-0">
                        약 35분 후
                      </p>
                    </div>
                    <div className="flex gap-[12px] items-center justify-between">
                      <p className="text-[10px] font-['Pretendard'] font-medium text-[#888888] tracking-[-0.05px]">
                        예상 요금
                      </p>
                      <p className="text-[10px] font-['Pretendard'] font-semibold text-[#888888] tracking-[-0.05px] flex-shrink-0">
                        ￥65,000
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-[10px] font-['Pretendard'] font-normal text-[#999999] tracking-[-0.05px]">
                {timestamps.taxiBooked}
              </p>
            </div>
          </div>
        )}

        {/* AI Response - On the way */}
        {showMessages.onTheWay && (
        <div className="animate-fadeIn px-[16px]">
            <div className="flex flex-col gap-[6px]">
              <div className="bg-white rounded-[14px] shadow-[2px_4px_6px_rgba(0,0,0,0.05)] p-[12px] flex flex-col gap-[12px] w-[90%]">
                <p className="text-[12px] font-['Pretendard'] font-semibold text-[#1d1d1f] leading-[1.4]">
                  나리타 공항으로 이동 중<br />도착 5분 전에 다시 안내 드릴께요
                </p>

                {/* Info Box */}
                <div className="bg-[#f9f9fb] rounded-[10px] p-[10px] flex flex-col gap-[6px]">
                  <div className="flex gap-[12px] items-center justify-between">
                    <p className="text-[10px] font-['Pretendard'] font-medium text-[#888888] tracking-[-0.05px]">
                      공항 도착 예상
                    </p>
                    <p className="text-[10px] font-['Pretendard'] font-semibold text-[#007aff] tracking-[-0.05px] flex-shrink-0">
                      약 32분 후
                    </p>
                  </div>
                  <div className="flex gap-[12px] items-center justify-between">
                    <p className="text-[10px] font-['Pretendard'] font-medium text-[#888888] tracking-[-0.05px]">
                      체크인 마감까지
                    </p>
                    <p className="text-[10px] font-['Pretendard'] font-semibold text-[#888888] tracking-[-0.05px] flex-shrink-0">
                      약 15분 여유
                    </p>
                  </div>
                </div>
              </div>
              <p className="text-[10px] font-['Pretendard'] font-normal text-[#999999] tracking-[-0.05px]">
                {timestamps.onTheWay}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Chat Input */}
      <div className="absolute bottom-0 left-0 right-0 w-full bg-white border-t border-[#ececec] flex gap-[8px] items-center px-[16px] py-[10px]">
        <div className="w-[24px] h-[24px] flex-shrink-0">
          <img src={plusIcon} alt="plus" className="w-full h-full" />
        </div>
        <div className="flex-1 h-[40px] bg-[#f5f5f5] border border-[#e8e8e8] rounded-[999px] flex items-center px-[14px]">
          <p className="text-[12px] font-['Pretendard'] font-medium text-[#d0d0d0] tracking-[-0.05px]">
            메시지를 입력하세요
          </p>
        </div>
        <div className="w-[40px] h-[40px] bg-[#007aff] rounded-[20px] flex items-center justify-center flex-shrink-0">
          <img src={sendIcon} alt="send" className="w-[20px] h-[20px]" />
        </div>
      </div>
    </div>
  )
}
