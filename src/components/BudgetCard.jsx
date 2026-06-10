import { useState, useEffect, useRef } from 'react'
import Lottie from 'lottie-react'
import aiStarsAnimation from '../assets/animations/ai-stars.json'
import { moneyIcon, calendarIcon, refreshIcon, bellIcon } from '../utils/icons'
import { imgRightSide } from '../utils/statusBarIcons'

const imgIxAlarmBellFilled = bellIcon
const imgMaterialSymbolsMoneyBagRounded = moneyIcon
const imgVector47 = "https://www.figma.com/api/mcp/asset/9d5818bb-fafe-4faf-878f-bec52a4643b1"
const imgIonCalendar = calendarIcon
const imgMaterialSymbolsRefreshRounded = refreshIcon
const img1 = `data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='40' height='40' rx='20' fill='%23007AFF' fill-opacity='0.15'/%3E%3Cpath d='M20 21C18.6739 21 17.4021 20.4732 16.4645 19.5355C15.5268 18.5979 15 17.3261 15 16H17C17 16.7956 17.3161 17.5587 17.8787 18.1213C18.4413 18.6839 19.2044 19 20 19C20.7956 19 21.5587 18.6839 22.1213 18.1213C22.6839 17.5587 23 16.7956 23 16H25C25 17.3261 24.4732 18.5979 23.5355 19.5355C22.5979 20.4732 21.3261 21 20 21ZM20 11C20.7956 11 21.5587 11.3161 22.1213 11.8787C22.6839 12.4413 23 13.2044 23 14H17C17 13.2044 17.3161 12.4413 17.8787 11.8787C18.4413 11.3161 19.2044 11 20 11ZM27 14H25C25 13.3434 24.8707 12.6932 24.6194 12.0866C24.3681 11.48 23.9998 10.9288 23.5355 10.4645C23.0712 10.0002 22.52 9.63188 21.9134 9.3806C21.3068 9.12933 20.6566 9 20 9C18.6739 9 17.4021 9.52678 16.4645 10.4645C15.5268 11.4021 15 12.6739 15 14H13C11.89 14 11 14.89 11 16V28C11 28.5304 11.2107 29.0391 11.5858 29.4142C11.9609 29.7893 12.4696 30 13 30H27C27.5304 30 28.0391 29.7893 28.4142 29.4142C28.7893 29.0391 29 28.5304 29 28V16C29 15.4696 28.7893 14.9609 28.4142 14.5858C28.0391 14.2107 27.5304 14 27 14Z' fill='%23007AFF'/%3E%3C/svg%3E`
const imgVector = "https://www.figma.com/api/mcp/asset/4a6a0697-c5de-48ff-88cc-99f97b2b5fea"
const imgVector46 = "https://www.figma.com/api/mcp/asset/4eea9b4c-9e36-470c-85fe-ebc328e1a668"
const img2 = `data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='40' height='40' rx='20' fill='%23007AFF' fill-opacity='0.15'/%3E%3Cpath d='M13.6596 10.269H13.6446C13.575 10.2705 13.5062 10.2846 13.4415 10.3106C13.3481 10.3476 13.2659 10.4084 13.2032 10.4869C13.1404 10.5654 13.0993 10.659 13.0838 10.7583C13.0654 10.8667 12.5 14.4171 12.5 16.0383C12.5 17.1344 13.01 18.1117 13.8038 18.744C14.0923 18.976 14.2308 19.2275 14.2308 19.4375V20.0144C14.2308 20.0352 14.2296 20.056 14.2273 20.0767C14.1962 20.3767 14.0531 21.7256 13.9181 23.1125C13.7854 24.4798 13.6538 25.9394 13.6538 26.4229C13.6538 27.0349 13.897 27.6219 14.3298 28.0547C14.7625 28.4875 15.3495 28.7306 15.9615 28.7306C16.5736 28.7306 17.1605 28.4875 17.5933 28.0547C18.0261 27.6219 18.2692 27.0349 18.2692 26.4229C18.2692 25.9383 18.1377 24.4798 18.005 23.1125C17.9064 22.1005 17.8033 21.089 17.6958 20.0779L17.6923 20.0144V19.4375C17.6923 19.2264 17.8308 18.976 18.1192 18.744C18.5258 18.4199 18.8542 18.0084 19.0799 17.5399C19.3056 17.0715 19.4229 16.5583 19.4231 16.0383C19.4231 14.4137 18.8542 10.8471 18.8392 10.7571C18.8223 10.6487 18.7747 10.5473 18.7022 10.465C18.6296 10.3826 18.5351 10.3226 18.4296 10.2921C18.3812 10.278 18.3312 10.2702 18.2808 10.269H18.2577H18.2588C18.1051 10.2703 17.9581 10.3322 17.8498 10.4413C17.7415 10.5505 17.6808 10.698 17.6808 10.8517V15.4671C17.6824 15.5421 17.6692 15.6167 17.6419 15.6866C17.6147 15.7565 17.574 15.8204 17.522 15.8745C17.4701 15.9287 17.4081 15.9721 17.3394 16.0023C17.2707 16.0324 17.1967 16.0488 17.1217 16.0504C17.0467 16.052 16.9721 16.0388 16.9022 16.0115C16.8323 15.9843 16.7685 15.9436 16.7143 15.8917C16.6602 15.8398 16.6167 15.7777 16.5866 15.709C16.5564 15.6403 16.5401 15.5664 16.5385 15.4914V10.846C16.5385 10.693 16.4777 10.5462 16.3695 10.438C16.2613 10.3298 16.1145 10.269 15.9615 10.269C15.8085 10.269 15.6618 10.3298 15.5536 10.438C15.4454 10.5462 15.3846 10.693 15.3846 10.846V15.4614L15.3858 15.4983C15.3816 15.6498 15.3175 15.7934 15.2075 15.8976C15.0974 16.0018 14.9505 16.058 14.799 16.0539C14.6476 16.0497 14.5039 15.9856 14.3997 15.8755C14.2955 15.7655 14.2393 15.6186 14.2435 15.4671V10.8529C14.2435 10.6982 14.1821 10.5499 14.0729 10.4405C13.9636 10.331 13.8143 10.2693 13.6596 10.269ZM21.1538 15.4614C21.1538 14.0843 21.7009 12.7636 22.6746 11.7898C23.6484 10.8161 24.9691 10.269 26.3462 10.269C26.4992 10.269 26.6459 10.3298 26.7541 10.438C26.8623 10.5462 26.9231 10.693 26.9231 10.846V18.8975L26.9462 19.156C27.0361 20.1927 27.1238 21.2296 27.2092 22.2667C27.3523 24.0056 27.5 25.914 27.5 26.4229C27.5 27.0349 27.2569 27.6219 26.8241 28.0547C26.3913 28.4875 25.8043 28.7306 25.1923 28.7306C24.5803 28.7306 23.9933 28.4875 23.5605 28.0547C23.1277 27.6219 22.8846 27.0349 22.8846 26.4229C22.8846 25.9152 23.0323 24.0056 23.1754 22.2667C23.2469 21.3887 23.3196 20.5394 23.3738 19.9106L23.4085 19.4998H22.8846C22.4256 19.4998 21.9854 19.3175 21.6608 18.9929C21.3362 18.6683 21.1538 18.2281 21.1538 17.769V15.4614Z' fill='%23007AFF'/%3E%3C/svg%3E`
const img3 = `data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='40' height='40' rx='20' fill='%23007AFF' fill-opacity='0.15'/%3E%3Cpath d='M26 19H14V14H26M24.5 25C24.1022 25 23.7206 24.842 23.4393 24.5607C23.158 24.2794 23 23.8978 23 23.5C23 23.1022 23.158 22.7206 23.4393 22.4393C23.7206 22.158 24.1022 22 24.5 22C24.8978 22 25.2794 22.158 25.5607 22.4393C25.842 22.7206 26 23.1022 26 23.5C26 23.8978 25.842 24.2794 25.5607 24.5607C25.2794 24.842 24.8978 25 24.5 25ZM15.5 25C15.1022 25 14.7206 24.842 14.4393 24.5607C14.158 24.2794 14 23.8978 14 23.5C14 23.1022 14.158 22.7206 14.4393 22.4393C14.7206 22.158 15.1022 22 15.5 22C15.8978 22 16.2794 22.158 16.5607 22.4393C16.842 22.7206 17 23.1022 17 23.5C17 23.8978 16.842 24.2794 16.5607 24.5607C16.2794 24.842 15.8978 25 15.5 25ZM12 24C12 24.88 12.39 25.67 13 26.22V28C13 28.2652 13.1054 28.5196 13.2929 28.7071C13.4804 28.8946 13.7348 29 14 29H15C15.2652 29 15.5196 28.8946 15.7071 28.7071C15.8946 28.5196 16 28.2652 16 28V27H24V28C24 28.2652 24.1054 28.5196 24.2929 28.7071C24.4804 28.8946 24.7348 29 25 29H26C26.2652 29 26.5196 28.8946 26.7071 28.7071C26.8946 28.5196 27 28.2652 27 28V26.22C27.61 25.67 28 24.88 28 24V14C28 10.5 24.42 10 20 10C15.58 10 12 10.5 12 14V24Z' fill='%23007AFF'/%3E%3C/svg%3E`
const img4 = `data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='40' height='40' rx='20' fill='%23007AFF' fill-opacity='0.15'/%3E%3Cpath d='M20 25C21.25 25 22.3127 24.5627 23.188 23.688C24.0633 22.8133 24.5007 21.7507 24.5 20.5C24.4993 19.2493 24.062 18.187 23.188 17.313C22.314 16.439 21.2513 16.0013 20 16C18.7487 15.9987 17.6863 16.4363 16.813 17.313C15.9397 18.1897 15.502 19.252 15.5 20.5C15.498 21.748 15.9357 22.8107 16.813 23.688C17.6903 24.5653 18.7527 25.0027 20 25ZM20 23C19.3 23 18.7083 22.7583 18.225 22.275C17.7417 21.7917 17.5 21.2 17.5 20.5C17.5 19.8 17.7417 19.2083 18.225 18.725C18.7083 18.2417 19.3 18 20 18C20.7 18 21.2917 18.2417 21.775 18.725C22.2583 19.2083 22.5 19.8 22.5 20.5C22.5 21.2 22.2583 21.7917 21.775 22.275C21.2917 22.7583 20.7 23 20 23ZM12 28.5C11.45 28.5 10.9793 28.3043 10.588 27.913C10.1967 27.5217 10.0007 27.0507 10 26.5V14.5C10 13.95 10.196 13.4793 10.588 13.088C10.98 12.6967 11.4507 12.5007 12 12.5H15.15L17 10.5H23L24.85 12.5H28C28.55 12.5 29.021 12.696 29.413 13.088C29.805 13.48 30.0007 13.9507 30 14.5V26.5C30 27.05 29.8043 27.521 29.413 27.913C29.0217 28.305 28.5507 28.5007 28 28.5H12Z' fill='%23007AFF'/%3E%3C/svg%3E`
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

        {/* Right - Status Icons */}
        <div className="w-[50px] h-[9px]">
          <img src={imgRightSide} alt="status-icons" className="w-full h-full" />
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
          <p className="text-[14px] font-['Pretendard'] font-semibold text-[#7a7a7a]">나가기</p>
        </button>
        <button
          onClick={onCheckBudget}
          className="flex-1 h-[40px] bg-[#007aff] rounded-full flex items-center justify-center gap-[3px] hover:bg-[#0056cc] transition-all"
        >
          <p className="text-[14px] font-['Pretendard'] font-semibold text-white">예산 점검 받기</p>
        </button>
      </div>
    </div>
  )
}
