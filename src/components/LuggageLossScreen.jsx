import { useState, useEffect } from 'react'

const imgOutline = "https://www.figma.com/api/mcp/asset/29941b40-dfd3-42c1-a271-a3ca79579399"
const imgBatteryEnd = "https://www.figma.com/api/mcp/asset/1bc54fb1-35dd-4f72-8d94-451a7ffd3c8e"
const imgFill = "https://www.figma.com/api/mcp/asset/46326636-0756-458f-bc89-aacd50b1c74e"
const imgWifi = "https://www.figma.com/api/mcp/asset/9b865ea0-0558-4020-8704-4b79e088b29d"
const imgIconMobileSignal = "https://www.figma.com/api/mcp/asset/7d58070c-759f-4edd-b19f-d5c8bf6ed58c"
const imgEpBack = "https://www.figma.com/api/mcp/asset/72ed14e3-e8c5-46df-9afc-1bc88efa8608"
const imgNrkMore = "https://www.figma.com/api/mcp/asset/27d46770-c6e6-405c-add6-ae68f571c311"
const imgTablerPlus = "https://www.figma.com/api/mcp/asset/46ab3d16-0e42-4b22-abf8-da21c35fa5d3"
const imgUilMessage = "https://www.figma.com/api/mcp/asset/d89f48b0-595a-4b9f-8587-e940e2bf64f9"
const imgAlertCircle = "https://www.figma.com/api/mcp/asset/dfc492f6-60ad-4456-8742-c32936a7b1c8"
const imgPhone = "https://www.figma.com/api/mcp/asset/b0eacd9e-6db6-4320-becd-0d5b9a889589"
const imgClock = "https://www.figma.com/api/mcp/asset/62937707-e6cb-4d62-8a64-fc41f4f56b2b"

export default function LuggageLossScreen() {
  const [showMessage, setShowMessage] = useState(false)
  const [showChatBubble, setShowChatBubble] = useState(false)
  const [showInfoBox, setShowInfoBox] = useState(false)
  const [showButtons, setShowButtons] = useState(false)

  useEffect(() => {
    // Show message immediately
    setShowMessage(true)

    // Sequential animation timing (adjusted for 1.0s animation duration)
    const timer1 = setTimeout(() => {
      setShowChatBubble(true)
    }, 400)

    const timer2 = setTimeout(() => {
      setShowInfoBox(true)
    }, 1000)

    const timer3 = setTimeout(() => {
      setShowButtons(true)
    }, 1600)

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
      clearTimeout(timer3)
    }
  }, [])

  return (
    <div className="absolute inset-0 flex flex-col bg-white">
      {/* Status Bar */}
      <div className="absolute top-0 left-0 right-0 w-full h-[32px] bg-transparent flex items-center justify-between px-[16px]">
        <p className="text-[10px] font-semibold text-black leading-[14px] tracking-[-0.23px]">9:41</p>
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

      {/* Header */}
      <div className="absolute top-[32px] left-0 right-0 w-full h-[56px] flex items-center justify-between px-[16px] border-b border-[#ececec] bg-white">
        <div className="w-[24px] h-[24px]">
          <img src={imgEpBack} alt="back" className="w-full h-full" />
        </div>
        <p className="text-[16px] font-['Pretendard'] font-semibold text-[#1d1d1f] tracking-[-0.05px]">
          AI 어시스턴트와 대화중
        </p>
        <div className="w-[24px] h-[24px]">
          <img src={imgNrkMore} alt="more" className="w-full h-full" />
        </div>
      </div>

      {/* Chat Content */}
      <div className="flex-1 overflow-y-auto flex flex-col gap-[12px] px-[16px] pt-[24px] pb-[80px] mt-[88px]">
        {/* Date Divider */}
        <div className="flex gap-[8px] items-center justify-center">
          <div className="flex-1 h-[0.5px] bg-[#d0d0d0]" />
          <p className="text-[10px] font-['Pretendard'] font-medium text-[#999999] tracking-[-0.05px] whitespace-nowrap">
            2026.06.03
          </p>
          <div className="flex-1 h-[0.5px] bg-[#d0d0d0]" />
        </div>

        {/* AI Message */}
        {showMessage && (
        <div className="flex gap-[12px] animate-smooth-fade">
          {/* Avatar */}
          <div className="w-[32px] h-[32px] bg-[#e20000] flex-shrink-0 rounded-[6px]" />

          {/* Message */}
          <div className="flex flex-col gap-[10px] flex-1">
            <div className="flex flex-col gap-[2px]">
              <p className="text-[15px] font-['Pretendard'] font-bold text-[#1d1d1f] leading-[1.3]">
                수하물이 현재<br />위치 추적 중단됐어요
              </p>
              <p className="text-[10px] font-['Pretendard'] font-medium text-[#888888] tracking-[-0.05px]">
                항공사 고객센터 연락을 추천합니다
              </p>
            </div>

            {/* Chat Bubble with Recommendation */}
            <div className="bg-white rounded-[14px] shadow-[2px_4px_6px_rgba(0,0,0,0.05)] p-[12px] flex flex-col gap-[12px]">
              {showChatBubble && (
              <p className="text-[13px] font-['Pretendard'] font-semibold text-[#1d1d1f] leading-[1.4] animate-smooth-fade">
                지금 항공사에<br />연락할까요?<br />신속한 대응이 중요해요
              </p>
              )}

              {/* Options */}
              {showInfoBox && (
              <div className="flex flex-col gap-[1px] animate-smooth-fade">
                {/* Info Box */}
                <div className="bg-[#f9f9fb] rounded-[10px] p-[10px] flex flex-col gap-[6px]">
                  <div className="flex gap-[12px] items-center justify-between">
                    <div className="flex gap-[8px] items-center min-w-0">
                      <div className="w-[18px] h-[18px] flex-shrink-0">
                        <img src={imgPhone} alt="phone" className="w-full h-full" />
                      </div>
                      <p className="text-[10px] font-['Pretendard'] font-medium text-[#888888] tracking-[-0.05px]">
                        항공사 연락처
                      </p>
                    </div>
                    <p className="text-[10px] font-['Pretendard'] font-semibold text-[#007aff] tracking-[-0.05px] flex-shrink-0">
                      +81-3-XXXX-XXXX
                    </p>
                  </div>

                  {/* Report Status */}
                  <div className="flex gap-[12px] items-center justify-between">
                    <div className="flex gap-[8px] items-center min-w-0">
                      <div className="w-[18px] h-[18px] flex-shrink-0">
                        <img src={imgAlertCircle} alt="alert" className="w-full h-full" />
                      </div>
                      <p className="text-[10px] font-['Pretendard'] font-medium text-[#888888] tracking-[-0.05px]">
                        신고 접수 현황
                      </p>
                    </div>
                    <p className="text-[10px] font-['Pretendard'] font-semibold text-[#888888] tracking-[-0.05px] flex-shrink-0">
                      진행 중
                    </p>
                  </div>

                  {/* Estimated Recovery Time */}
                  <div className="flex gap-[12px] items-center justify-between">
                    <div className="flex gap-[8px] items-center min-w-0">
                      <div className="w-[18px] h-[18px] flex-shrink-0">
                        <img src={imgClock} alt="clock" className="w-full h-full" />
                      </div>
                      <p className="text-[10px] font-['Pretendard'] font-medium text-[#888888] tracking-[-0.05px]">
                        회수 예상 시간
                      </p>
                    </div>
                    <p className="text-[10px] font-['Pretendard'] font-semibold text-[#888888] tracking-[-0.05px] flex-shrink-0">
                      1~3일 소요
                    </p>
                  </div>
                </div>
                <p className="text-[10px] font-['Pretendard'] font-medium text-[#d0d0d0] tracking-[-0.05px] px-[2px]">
                  신고 후 성공률: 87%
                </p>
              </div>
              )}

              {/* Buttons */}
              {showButtons && (
              <div className="flex gap-[6px] animate-smooth-fade">
                <button className="flex-1 h-[34px] bg-white border border-[#e8e8e8] rounded-[999px] flex items-center justify-center hover:bg-[#fafafa] transition-all">
                  <p className="text-[11px] font-['Pretendard'] font-semibold text-[#888888] tracking-[-0.05px]">
                    나중에 연락하기
                  </p>
                </button>
                <button className="flex-1 h-[34px] bg-[#007aff] rounded-[999px] flex items-center justify-center hover:bg-[#0051d5] transition-all">
                  <p className="text-[11px] font-['Pretendard'] font-semibold text-white tracking-[-0.05px]">
                    지금 전화하기
                  </p>
                </button>
              </div>
              )}
            </div>

            {/* Timestamp */}
            <p className="text-[10px] font-['Pretendard'] font-medium text-[#999999] tracking-[-0.05px]">
              오후 6:18
            </p>
          </div>
        </div>
        )}
      </div>

      {/* Bottom Chat Input */}
      <div className="absolute bottom-0 left-0 right-0 w-full bg-white border-t border-[#ececec] flex gap-[8px] items-center px-[16px] py-[10px]">
        <div className="w-[24px] h-[24px] flex-shrink-0">
          <img src={imgTablerPlus} alt="plus" className="w-full h-full" />
        </div>
        <div className="flex-1 h-[40px] bg-[#f5f5f5] border border-[#e8e8e8] rounded-[999px] flex items-center px-[14px]">
          <p className="text-[14px] font-['Pretendard'] font-medium text-[#d0d0d0] tracking-[-0.05px]">
            메시지를 입력하세요
          </p>
        </div>
        <div className="w-[40px] h-[40px] bg-[#007aff] rounded-[20px] flex items-center justify-center flex-shrink-0">
          <img src={imgUilMessage} alt="send" className="w-[20px] h-[20px]" />
        </div>
      </div>
    </div>
  )
}
