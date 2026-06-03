import { useState } from 'react'

const imgMaterialSymbolsDragHandleRounded = "https://www.figma.com/api/mcp/asset/a2b2fac1-6aa6-4e4a-a0ce-068b449e9006"
const img1 = "https://www.figma.com/api/mcp/asset/be1d2590-5c17-4a73-bc78-b2585fe0d098"
const img2 = "https://www.figma.com/api/mcp/asset/3ed68f61-ddff-48f8-8324-5caead2d12e9"
const img3 = "https://www.figma.com/api/mcp/asset/02f6fe91-4709-4603-a9c1-80bfc34e394f"
const img4 = "https://www.figma.com/api/mcp/asset/40945f57-0c1d-495e-8790-a9e5551990ad"
const img5 = "https://www.figma.com/api/mcp/asset/8d1cd710-72d7-4ec8-9835-2b2bd1f3b5ff"
const imgGroup = "https://www.figma.com/api/mcp/asset/d88d2cfb-be0d-4258-bdc1-e8ec9360453a"
const imgOutline = "https://www.figma.com/api/mcp/asset/df2195e4-4e2d-443a-9171-7a8cb57a1af6"
const imgBatteryEnd = "https://www.figma.com/api/mcp/asset/b3ce63b1-443a-4610-b3ff-6528e724bf70"
const imgFill = "https://www.figma.com/api/mcp/asset/b84a863d-ac1c-4be8-aee2-a072099645ca"
const imgWifi = "https://www.figma.com/api/mcp/asset/5d200af6-ee83-4e8f-b7cc-de8d4b0afaa1"
const imgIconMobileSignal = "https://www.figma.com/api/mcp/asset/6ae5dd63-7ad9-4d0d-b3c9-ba6982c97c25"
const imgNotch = "https://www.figma.com/api/mcp/asset/0f33c622-7ba3-4b69-b709-df12c75ab90d"

const categories = [
  { id: 1, name: '식비', description: '맛있는 음식과 현지 식도락', icon: img2, priority: 1 },
  { id: 2, name: '교통비', description: '이동 편의와 효율적인 동선', icon: img3, priority: 2 },
  { id: 3, name: '쇼핑', description: '기념품과 쇼핑 즐기기', icon: img1, priority: 3 },
  { id: 4, name: '체험비', description: '관광 · 투어 · 액티비티 등', icon: img4, priority: 4 },
  { id: 5, name: '기타', description: '유심 · 보험 · 간식 등 기타제출', icon: img5, priority: 5 }
]

export default function PriorityScreen({ onBack, onComplete }) {
  const [priorities, setPriorities] = useState(categories)
  const [draggedIndex, setDraggedIndex] = useState(null)

  const handleDragStart = (e, index) => {
    setDraggedIndex(index)
    e.dataTransfer.effectAllowed = 'move'
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
  }

  const handleDrop = (e, targetIndex) => {
    e.preventDefault()
    if (draggedIndex !== null && draggedIndex !== targetIndex) {
      const newPriorities = [...priorities]
      const draggedItem = newPriorities[draggedIndex]
      newPriorities.splice(draggedIndex, 1)
      newPriorities.splice(targetIndex, 0, draggedItem)
      setPriorities(newPriorities)
    }
    setDraggedIndex(null)
  }

  const handleDragEnd = () => {
    setDraggedIndex(null)
  }

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

      {/* Header */}
      <div className="px-[11px] py-[24px] mt-[32px] text-center">
        <h1 className="text-[17px] font-['Pretendard'] font-bold text-[#1d1d1f] mb-[6px]">
          우선 순위를 정해 주세요
        </h1>
        <p className="text-[12px] font-['Pretendard'] font-medium text-[#7a7a7a] leading-[1.4]">
          남은 일정을 더 만족스럽게 보내기 위해<br />어떤 항목에 예산을 더 집중할지 알려주세요
        </p>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto flex flex-col gap-[8px] px-[11px] pb-[100px]">
        {priorities.map((category, index) => {
          const shakeClasses = [
            'animate-shake',
            'animate-shake-delay-1',
            'animate-shake-delay-2',
            'animate-shake-delay-3',
            'animate-shake-delay-4'
          ]
          return (
          <div
            key={category.id}
            draggable
            onDragStart={(e) => handleDragStart(e, index)}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, index)}
            onDragEnd={handleDragEnd}
            className={`bg-white hover:bg-[#f5f5f5] rounded-[8px] p-[11px] shadow-[2px_4px_6px_rgba(0,0,0,0.04)] flex gap-[8px] items-center cursor-move transition-all ${shakeClasses[index]} ${draggedIndex === index ? 'opacity-50' : 'opacity-100'}`}>
            <div className="w-[24px] h-[24px] flex-shrink-0">
              <img src={imgMaterialSymbolsDragHandleRounded} alt="drag" className="w-full h-full" />
            </div>
            <div className="flex-1 flex gap-[8px] items-center min-w-0">
              <div className="w-[28px] h-[28px] flex-shrink-0 rounded-[6px] overflow-hidden">
                <img src={category.icon} alt={category.name} className="w-full h-full" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[12px] font-['Pretendard'] font-semibold text-[#1d1d1f]">
                  {category.name}
                </p>
                <p className="text-[10px] font-['Pretendard'] font-medium text-[#7a7a7a]">
                  {category.description}
                </p>
              </div>
            </div>
            <div className="bg-[rgba(205,205,205,0.15)] px-[8px] py-[6px] rounded-[3px] flex-shrink-0">
              <p className="text-[10px] font-['Pretendard'] font-semibold text-[#7a7a7a]">
                {index + 1}순위
              </p>
            </div>
          </div>
          )
        })}
      </div>

      {/* Bottom Buttons */}
      <div className="absolute bottom-0 left-0 right-0 w-full flex gap-[6px] px-[11px] py-[12px] bg-gradient-to-b from-transparent via-[#f9f9fb] to-[#f9f9fb]">
        <button
          onClick={onBack}
          className="w-[80px] h-[40px] bg-white border border-[#007aff] rounded-full flex items-center justify-center gap-[3px] hover:bg-[#f9f9fb] transition-all"
        >
          <p className="text-[12px] font-['Pretendard'] font-semibold text-[#007aff]">이전</p>
        </button>
        <button
          onClick={() => onComplete?.(priorities)}
          className="flex-1 h-[40px] bg-[#007aff] rounded-full flex items-center justify-center gap-[3px] hover:bg-[#0056cc] transition-all"
        >
          <div className="w-[17px] h-[17px] flex-shrink-0">
            <img src={imgGroup} alt="ai" className="w-full h-full" />
          </div>
          <p className="text-[12px] font-['Pretendard'] font-semibold text-white">선택 완료</p>
        </button>
      </div>
    </div>
  )
}
