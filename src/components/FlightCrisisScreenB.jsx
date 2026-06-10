import { useState, useEffect, useRef } from 'react'
import { imgRightSide } from '../utils/statusBarIcons'
import { backIcon, moreIcon, plusIcon, sendIcon } from '../utils/icons'
const imgVector48 = "https://www.figma.com/api/mcp/asset/89f31a4d-7072-4c8a-951e-3d2f2bd525ec"
const imgBoxiconsLocation = "https://www.figma.com/api/mcp/asset/dfc492f6-60ad-4456-8742-c32936a7b1c8"
const imgMaterialSymbolsMoneyOutlineRounded = "https://www.figma.com/api/mcp/asset/b0eacd9e-6db6-4320-becd-0d5b9a889589"
const imgGroup = "/tabler_clock.png"
const imgLoadingIcon = "https://www.figma.com/api/mcp/asset/36b0799b-e12e-4dd4-9f1b-e24260df09b3"
const imgCheckIcon = "https://www.figma.com/api/mcp/asset/317cf41c-1045-4c9a-a00d-ca9f8d7be64e"

export default function FlightCrisisScreenB({ onComplete }) {
  const chatContentRef = useRef(null)

  const [showMessages, setShowMessages] = useState({
    initial: false,
    chatBubble: false,
    userMessage: false,
    taxiBooked: false,
    onTheWay: false,
    taxiComplete: false,
    taxiMoving: false,
  })

  const [timestamps, setTimestamps] = useState({
    initial: '',
    userMessage: '',
    taxiBooked: '',
    onTheWay: '',
    taxiComplete: '',
    taxiMoving: '',
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
  const [showTaxiLoading, setShowTaxiLoading] = useState(false)
  const [taxiLoadingTime, setTaxiLoadingTime] = useState('')
  const [completedSteps, setCompletedSteps] = useState(0) // 0-4: 진행 중, 4: 완료

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

  // Auto-scroll to center when new messages appear
  useEffect(() => {
    if (chatContentRef.current) {
      setTimeout(() => {
        const scrollHeight = chatContentRef.current.scrollHeight
        const clientHeight = chatContentRef.current.clientHeight
        // Scroll to center: scrollHeight - (clientHeight / 2)
        chatContentRef.current.scrollTop = scrollHeight - clientHeight / 2
      }, 0)
    }
  }, [showMessages.userMessage, showMessages.taxiBooked, showMessages.onTheWay, showMessages.taxiComplete, showMessages.taxiMoving, showTaxiLoading])

  // Handle taxi button click - show user message and loading
  const handleTaxiClick = () => {
    setShowMessages(prev => ({ ...prev, userMessage: true }))
    setTimestamps(prev => ({ ...prev, userMessage: formatTimeKorean(new Date()) }))
    // Show taxi loading after a short delay
    setTimeout(() => {
      setShowTaxiLoading(true)
      setTaxiLoadingTime(formatTimeKorean(new Date()))
    }, 1000)
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

  // Sequential step completion animation
  useEffect(() => {
    if (showTaxiLoading && completedSteps < 4) {
      const timer = setTimeout(() => {
        setCompletedSteps(prev => prev + 1)
      }, 1200)
      return () => clearTimeout(timer)
    }
  }, [showTaxiLoading, completedSteps])

  // Show taxi complete and moving messages after loading completes
  useEffect(() => {
    if (completedSteps === 4 && !showMessages.taxiMoving) {
      // Show taxi complete message after 0.8 seconds
      const taxiCompleteTimer = setTimeout(() => {
        setShowMessages(prev => ({ ...prev, taxiComplete: true }))
        setTimestamps(prev => ({ ...prev, taxiComplete: formatTimeKorean(new Date()) }))
      }, 800)

      // Show taxi moving message after 2 seconds total
      const taxiMovingTimer = setTimeout(() => {
        setShowMessages(prev => ({ ...prev, taxiMoving: true }))
        setTimestamps(prev => ({ ...prev, taxiMoving: formatTimeKorean(new Date()) }))
      }, 2000)

      return () => {
        clearTimeout(taxiCompleteTimer)
        clearTimeout(taxiMovingTimer)
      }
    }
  }, [completedSteps, showMessages.taxiMoving])

  // Call onComplete callback 5 seconds after taxi moving message appears
  useEffect(() => {
    if (showMessages.taxiMoving) {
      const completeTimer = setTimeout(() => {
        if (onComplete) {
          onComplete()
        }
      }, 1000)
      return () => clearTimeout(completeTimer)
    }
  }, [showMessages.taxiMoving])


  // Handle second action - show on the way message
  const handleNextAction = () => {
    setShowMessages(prev => ({ ...prev, onTheWay: true }))
  }

  return (
    <div className="absolute inset-0 flex flex-col" style={{ backgroundColor: '#F9F9FB' }}>
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
      <div ref={chatContentRef} className="flex-1 overflow-y-auto flex flex-col gap-[12px] pt-[24px] pb-[128px] mt-[88px]" style={{ backgroundColor: '#F9F9FB' }}>
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
              <p className="text[15px] font-['Pretendard'] font-bold leading-[1.3] min-h-[40px]">
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
            <div className="bg-white rounded-[14px] shadow-[2px_4px_6px_rgba(0,0,0,0.05)] p-[12px] flex flex-col gap-[12px] animate-fadeIn w-[90%]">
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

        {/* Taxi Loading Message */}
        {showTaxiLoading && (
        <div className="animate-fadeIn px-[16px]">
          <div className="flex flex-col gap-[10px]">
            <div className="bg-white rounded-[14px] shadow-[2px_4px_6px_rgba(0,0,0,0.05)] p-[12px] flex flex-col gap-[12px] w-[90%]">
              <p className="text-[12px] font-['Pretendard'] font-semibold text-[#1d1d1f] leading-[1.4]">
                {completedSteps === 4 ? '택시 호출 완료' : '택시 호출 진행중...'}
              </p>
              <div className="flex flex-col gap-[6px]">
                <div className="flex gap-[8px] items-center">
                  <div className="relative shrink-0 size-[16px] flex-shrink-0">
                    {completedSteps > 0 ? (
                      <img src={imgCheckIcon} alt="check" className="w-full h-full" />
                    ) : (
                      <img src={imgLoadingIcon} alt="loading" className="w-full h-full animate-spin" />
                    )}
                  </div>
                  <p className={`text-[12px] font-['Pretendard'] font-medium ${completedSteps > 0 ? 'text-[#1d1d1f]' : 'text-[#888888]'}`}>
                    {completedSteps > 0 ? '현재 위치 GPS 완료' : '현재 위치 GPS 확인중..'}
                  </p>
                </div>
                <div className="flex gap-[8px] items-center">
                  <div className="relative shrink-0 size-[16px] flex-shrink-0">
                    {completedSteps > 1 ? (
                      <img src={imgCheckIcon} alt="check" className="w-full h-full" />
                    ) : (
                      <img src={imgLoadingIcon} alt="loading" className="w-full h-full animate-spin" />
                    )}
                  </div>
                  <p className={`text-[12px] font-['Pretendard'] font-medium ${completedSteps > 1 ? 'text-[#1d1d1f]' : 'text-[#888888]'}`}>
                    {completedSteps > 1 ? '인근 택시 검색중 완료' : '인근 택시 검색중...'}
                  </p>
                </div>
                <div className="flex gap-[8px] items-center">
                  <div className="relative shrink-0 size-[16px] flex-shrink-0">
                    {completedSteps > 2 ? (
                      <img src={imgCheckIcon} alt="check" className="w-full h-full" />
                    ) : (
                      <img src={imgLoadingIcon} alt="loading" className="w-full h-full animate-spin" />
                    )}
                  </div>
                  <p className={`text-[12px] font-['Pretendard'] font-medium ${completedSteps > 2 ? 'text-[#1d1d1f]' : 'text-[#888888]'}`}>
                    {completedSteps > 2 ? '최단 경로 차량 배정 완료' : '최단 경로 차량 배정중...'}
                  </p>
                </div>
                <div className="flex gap-[8px] items-center">
                  <div className="relative shrink-0 size-[16px] flex-shrink-0">
                    {completedSteps > 3 ? (
                      <img src={imgCheckIcon} alt="check" className="w-full h-full" />
                    ) : (
                      <img src={imgLoadingIcon} alt="loading" className="w-full h-full animate-spin" />
                    )}
                  </div>
                  <p className={`text-[12px] font-['Pretendard'] font-medium ${completedSteps > 3 ? 'text-[#1d1d1f]' : 'text-[#888888]'}`}>
                    {completedSteps > 3 ? '호출 요청 전송 완료' : '호출 요청 전송중...'}
                  </p>
                </div>
              </div>
            </div>
            <p className="text-[10px] font-['Pretendard'] font-normal text-[#999999] tracking-[-0.05px]">
              {taxiLoadingTime}
            </p>
          </div>
        </div>
        )}

        {/* Taxi Complete Message */}
        {showMessages.taxiComplete && (
        <div className="animate-fadeIn px-[16px]">
          <div className="flex flex-col gap-[10px]">
            <div className="bg-white rounded-[14px] shadow-[2px_4px_6px_rgba(0,0,0,0.05)] p-[12px] flex flex-col gap-[12px] w-[90%]">
              <p className="text-[12px] font-['Pretendard'] font-semibold text-[#1d1d1f] leading-[1.4]">
                택시 호출 완료
              </p>
              <div className="flex flex-col gap-[8px]">
                <div className="flex flex-col gap-[2px]">
                  <p className="text-[12px] font-['Pretendard'] font-semibold text-[#1d1d1f]">
                    차량 정보
                  </p>
                  <p className="text-[10px] font-['Pretendard'] font-medium text-[#888888]">
                    도요타 크라운 · 백색 · 品川 123 さ 45-67
                  </p>
                </div>
                <div className="bg-[#f9f9fb] rounded-[10px] p-[10px] flex flex-col gap-[6px]">
                  <div className="flex gap-[8px] items-center justify-between">
                    <p className="text-[11px] font-['Pretendard'] font-medium text-[#888888]">
                      차량 도착
                    </p>
                    <p className="text-[11px] font-['Pretendard'] font-semibold text-[#007aff]">
                      약 2분 후
                    </p>
                  </div>
                  <div className="flex gap-[8px] items-center justify-between">
                    <p className="text-[11px] font-['Pretendard'] font-medium text-[#888888]">
                      공항 도착 예상
                    </p>
                    <p className="text-[11px] font-['Pretendard'] font-semibold text-[#888888]">
                      약 35분 후
                    </p>
                  </div>
                  <div className="flex gap-[8px] items-center justify-between">
                    <p className="text-[11px] font-['Pretendard'] font-medium text-[#888888]">
                      예상 요금
                    </p>
                    <p className="text-[11px] font-['Pretendard'] font-semibold text-[#888888]">
                      ￥65,000
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <p className="text-[10px] font-['Pretendard'] font-normal text-[#999999] tracking-[-0.05px]">
              {timestamps.taxiComplete}
            </p>
          </div>
        </div>
        )}

        {/* Taxi Moving Message */}
        {showMessages.taxiMoving && (
        <div className="animate-fadeIn px-[16px]">
          <div className="flex flex-col gap-[6px]">
            <div className="bg-white rounded-[14px] shadow-[2px_4px_6px_rgba(0,0,0,0.05)] p-[12px] flex flex-col gap-[12px] w-[90%]">
              <p className="text-[12px] font-['Pretendard'] font-semibold text-[#1d1d1f] leading-[1.4]">
                나리타 공항으로 이동 중<br />도착 5분 전에 다시 안내 드릴께요
              </p>
              <div className="bg-[#f9f9fb] rounded-[10px] p-[10px] flex flex-col gap-[6px]">
                <div className="flex gap-[8px] items-center justify-between">
                  <p className="text-[11px] font-['Pretendard'] font-medium text-[#888888]">
                    공항 도착 예상
                  </p>
                  <p className="text-[11px] font-['Pretendard'] font-semibold text-[#007aff]">
                    약 32분 후
                  </p>
                </div>
                <div className="flex gap-[8px] items-center justify-between">
                  <p className="text-[11px] font-['Pretendard'] font-medium text-[#888888]">
                    체크인 마감까지
                  </p>
                  <p className="text-[11px] font-['Pretendard'] font-semibold text-[#888888]">
                    약 15분 여유
                  </p>
                </div>
              </div>
            </div>
            <p className="text-[10px] font-['Pretendard'] font-normal text-[#999999] tracking-[-0.05px]">
              {timestamps.taxiMoving}
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
