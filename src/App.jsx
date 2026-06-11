import { useState, useEffect } from 'react'
import Notification from './components/Notification'
import MapCard from './components/MapCard'
import BudgetCard from './components/BudgetCard'
import LoadingScreen from './components/LoadingScreen'
import BudgetAdjustmentScreen from './components/BudgetAdjustmentScreen'
import PriorityScreen from './components/PriorityScreen'
import PriorityAnalysisScreen from './components/PriorityAnalysisScreen'
import FlightCrisisScreen from './components/FlightCrisisScreen'
import FlightCrisisScreenB from './components/FlightCrisisScreenB'
import PushNotificationScreen from './components/PushNotificationScreen'
import './utils/imageFallback'

const img20260531332022 = "https://www.figma.com/api/mcp/asset/6db77f7d-e5bb-40f6-8075-b7bb53efc517"
const img20260531345061 = "/store-image.png"
const imgMaterialSymbolsStarRounded = "https://www.figma.com/api/mcp/asset/d66ddd7e-acbd-45ef-8c8b-ff7cb5dcbaa9"
const imgNotificationIconType = "https://www.figma.com/api/mcp/asset/54838c3b-2e4a-46b5-a44e-c0f1528d97be"

export default function App() {
  const [urgency, setUrgency] = useState('low')
  const [activeTab, setActiveTab] = useState('rain')
  const [highUrgencyTab, setHighUrgencyTab] = useState('flight')
  const [selectedOption, setSelectedOption] = useState('A')
  const [showBudgetCard, setShowBudgetCard] = useState(false)
  const [showLoading, setShowLoading] = useState(false)
  const [showBudgetAdjustment, setShowBudgetAdjustment] = useState(false)
  const [showPriorityScreen, setShowPriorityScreen] = useState(false)
  const [showPriorityAnalysis, setShowPriorityAnalysis] = useState(false)
  const [showPushNotification, setShowPushNotification] = useState(false)
  const [showFlightCrisisScreen, setShowFlightCrisisScreen] = useState(false)
  const [showPushNotificationB, setShowPushNotificationB] = useState(false)
  const [showFlightCrisisScreenB, setShowFlightCrisisScreenB] = useState(false)
  const [selectedPriorities, setSelectedPriorities] = useState(null)
  const [showEmptyScreen, setShowEmptyScreen] = useState(false)
  const [showNotification, setShowNotification] = useState(false)
  const [showNotificationText, setShowNotificationText] = useState(false)
  const [showCompletionText, setShowCompletionText] = useState(false)
  const [showLowUrgencyComplete, setShowLowUrgencyComplete] = useState(false)
  const [showMediumUrgencyComplete, setShowMediumUrgencyComplete] = useState(false)
  const [showHighUrgencyComplete, setShowHighUrgencyComplete] = useState(false)

  // urgency 변경 시 모든 상태 초기화
  useEffect(() => {
    setShowEmptyScreen(false)
    setShowBudgetCard(false)
    setShowLoading(false)
    setShowBudgetAdjustment(false)
    setShowPriorityScreen(false)
    setShowPriorityAnalysis(false)
    setShowPushNotification(false)
    setShowFlightCrisisScreen(false)
    setShowPushNotificationB(false)
    setShowFlightCrisisScreenB(false)
    setShowLowUrgencyComplete(false)
    setShowMediumUrgencyComplete(false)
    setShowHighUrgencyComplete(false)
    setSelectedPriorities(null)
    setShowNotification(false)
    setShowNotificationText(false)
    setShowCompletionText(false)
    setShowLowUrgencyComplete(false)
  }, [urgency])

  // 저긴박 시나리오
  useEffect(() => {
    if (urgency === 'low' && activeTab === 'rain' && (selectedOption === 'A' || selectedOption === 'B')) {
      const timer1 = setTimeout(() => {
        setShowNotification(true)
      }, 2000)
      const timer2 = setTimeout(() => {
        setShowNotificationText(true)
      }, 5000)
      const timer3 = setTimeout(() => {
        setShowLowUrgencyComplete(true)
      }, 10000)
      return () => {
        clearTimeout(timer1)
        clearTimeout(timer2)
        clearTimeout(timer3)
      }
    }
  }, [urgency, activeTab, selectedOption])

  // 중긴박 시나리오
  useEffect(() => {
    if (urgency === 'medium' && activeTab === 'rain' && (selectedOption === 'A' || selectedOption === 'B')) {
      const timer = setTimeout(() => {
        setShowBudgetCard(true)
      }, 2000)
      return () => {
        clearTimeout(timer)
      }
    }
  }, [urgency, activeTab, selectedOption])

  useEffect(() => {
    if (urgency === 'high' && highUrgencyTab === 'flight' && selectedOption === 'A') {
      setShowPushNotification(true)
      setShowFlightCrisisScreen(false)
    } else {
      setShowPushNotification(false)
    }
  }, [urgency, highUrgencyTab, selectedOption])

  useEffect(() => {
    if (urgency === 'high' && highUrgencyTab === 'flight' && selectedOption === 'B') {
      setShowPushNotificationB(true)
      setShowFlightCrisisScreenB(false)
    } else {
      setShowPushNotificationB(false)
    }
  }, [urgency, highUrgencyTab, selectedOption])

  useEffect(() => {
    // 저긴박에서 선택지가 변경될 때 마다 상태 초기화
    if (urgency === 'low') {
      setShowNotification(false)
      setShowNotificationText(false)
      setShowLowUrgencyComplete(false)
    }
  }, [urgency, selectedOption])

  useEffect(() => {
    // 중긴박에서 선택지가 변경될 때 마다 상태 초기화
    if (urgency === 'medium') {
      setShowLoading(false)
      setShowBudgetAdjustment(false)
      setShowPriorityScreen(false)
      setShowPriorityAnalysis(false)
      setSelectedPriorities(null)
      setShowBudgetCard(false)
      setShowCompletionText(false)
      setShowMediumUrgencyComplete(false)
    }
  }, [urgency, selectedOption])

  // 고긴박 선택지 변경 시 상태 초기화는 urgency 변경 useEffect에서 이미 처리됨
  // selectedOption 의존성을 제거하여 충돌 방지

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-1 gap-1 overflow-hidden">
      {/* Urgency Tabs */}
      <div className="flex gap-1.5 w-full max-w-md bg-gray-200 p-1.5 rounded-[20px]">
        <button
          onClick={() => {
            setUrgency('low')
            setSelectedOption('A')
          }}
          className={`flex-1 py-2 px-4 rounded-[16px] font-['Pretendard'] text-xs font-medium transition-all ${
            urgency === 'low'
              ? 'bg-white text-black shadow-md'
              : 'bg-gray-200 text-gray-600'
          }`}
        >
          저긴박
        </button>
        <button
          onClick={() => {
            setUrgency('medium')
            setSelectedOption('A')
          }}
          className={`flex-1 py-2 px-4 rounded-[16px] font-['Pretendard'] text-xs font-medium transition-all ${
            urgency === 'medium'
              ? 'bg-white text-black shadow-md'
              : 'bg-gray-200 text-gray-600'
          }`}
        >
          중긴박
        </button>
        <button
          onClick={() => {
            setUrgency('high')
            setSelectedOption('A')
          }}
          className={`flex-1 py-2 px-4 rounded-[16px] font-['Pretendard'] text-xs font-medium transition-all ${
            urgency === 'high'
              ? 'bg-white text-black shadow-md'
              : 'bg-gray-200 text-gray-600'
          }`}
        >
          고긴박
        </button>
      </div>

      {/* Tabs */}
      {urgency === 'medium' ? (
        <div className="flex gap-1.5 w-full max-w-md bg-gray-200 p-1.5 rounded-[20px]">
          <button className="flex-1 py-2 px-4 rounded-[16px] font-['Pretendard'] text-xs font-medium bg-white text-black shadow-md">
            예산 지출 초과
          </button>
        </div>
      ) : urgency === 'high' ? (
        <div className="flex gap-1.5 w-full max-w-md bg-gray-200 p-1.5 rounded-[20px]">
          <button className="flex-1 py-2 px-4 rounded-[16px] font-['Pretendard'] text-xs font-medium bg-white text-black shadow-md">
            ✈️ 항공편 놓칠 위기
          </button>
        </div>
      ) : (
        <div className="flex gap-1.5 w-full max-w-md bg-gray-200 p-1.5 rounded-[20px]">
          <button
            onClick={() => {
              setActiveTab('rain')
              setSelectedOption('A')
            }}
            className={`flex-1 py-2 px-4 rounded-[16px] font-['Pretendard'] text-xs font-medium transition-all ${
              activeTab === 'rain'
                ? 'bg-white text-black shadow-md'
                : 'bg-gray-200 text-gray-600'
            }`}
          >
            ☔ 비 예보
          </button>
        </div>
      )}

      {/* Option Buttons */}
      <div className="flex gap-1.5 w-full max-w-md bg-gray-200 p-1.5 rounded-[20px]">
        <button
          onClick={() => setSelectedOption('A')}
          className={`flex-1 py-2 px-4 rounded-[16px] font-['Pretendard'] text-xs font-semibold transition-all ${
            selectedOption === 'A'
              ? 'bg-blue-500 text-white shadow-md'
              : 'bg-gray-200 text-gray-500'
          }`}
        >
          A안
        </button>
        <button
          onClick={() => setSelectedOption('B')}
          className={`flex-1 py-2 px-4 rounded-[16px] font-['Pretendard'] text-xs font-semibold transition-all ${
            selectedOption === 'B'
              ? 'bg-blue-500 text-white shadow-md'
              : 'bg-gray-200 text-gray-500'
          }`}
        >
          B안
        </button>
      </div>

      {/* iPhone Mockup */}
      <div className="relative w-[280px]" style={{ aspectRatio: '375/812' }}>
        {/* iPhone Frame */}
        <div className="absolute inset-0 bg-black rounded-[30px] p-1 shadow-2xl">

          {/* Screen */}
          <div className="w-full h-full rounded-[26px] overflow-hidden relative bg-white" style={{
            backgroundImage: `url(${import.meta.env.BASE_URL}background.png)`,
            backgroundSize: '100% 100%',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}>
            {/* Content */}
            <div className={`absolute inset-y-0 ${showEmptyScreen ? 'inset-x-0 flex items-center justify-center' : (showBudgetCard || (urgency === 'high' && (selectedOption === 'A' || selectedOption === 'B'))) ? 'inset-x-0 flex items-start justify-start' : 'flex items-center justify-center inset-x-[16px]'}`}>
              {!showEmptyScreen && ((activeTab === 'rain' && selectedOption === 'A' && urgency === 'low' && showNotification) || (urgency === 'medium' && (selectedOption === 'A' || selectedOption === 'B'))) && !showPushNotification && (
                <>
                  {!showBudgetCard && (
                    <div className="flex flex-col gap-[12px] items-center w-full">
                      <Notification
                        title={urgency === 'medium' ? "예산 상황을 점검해 드릴게요" : "30분 뒤 강한 비 예보가 있어요"}
                        message={urgency === 'medium' ? "잠시만요..." : "근처 실내 장소를 찾아 드릴께요"}
                      />
                    </div>
                  )}
                  {showBudgetCard && !showLoading && !showBudgetAdjustment && !showPriorityScreen && (
                    <BudgetCard
                      onCheckBudget={() => {
                        if (urgency === 'medium' && selectedOption === 'B') {
                          setShowPriorityScreen(true)
                        } else {
                          setShowLoading(true)
                        }
                      }}
                    />
                  )}
                  {showLoading && !showBudgetAdjustment && <LoadingScreen onLoadingComplete={() => setShowBudgetAdjustment(true)} />}
                  {showBudgetAdjustment && !showPriorityAnalysis && <BudgetAdjustmentScreen selectedPriorities={selectedPriorities} onBack={() => { setShowBudgetAdjustment(false); setShowBudgetCard(false); setShowLoading(false); setShowMediumUrgencyComplete(true); }} />}
                  {showPriorityScreen && !showPriorityAnalysis && <PriorityScreen onBack={() => setShowPriorityScreen(false)} onComplete={(priorities) => { setSelectedPriorities(priorities); setShowPriorityAnalysis(true); }} />}
                  {showPriorityAnalysis && <PriorityAnalysisScreen selectedPriorities={selectedPriorities} onComplete={() => { setShowPriorityScreen(false); setShowPriorityAnalysis(false); setShowBudgetAdjustment(true); setTimeout(() => { setShowCompletionText(true); }, 1500); }} />}
                </>
              )}
              {activeTab === 'rain' && selectedOption === 'B' && urgency === 'low' && !showLowUrgencyComplete && (
                <div className="absolute bottom-[80px] w-full flex justify-center">
                  <MapCard
                    title="30분 뒤 강한 비 예보가 있어요"
                    description="근처 실내 장소를 찾아 드릴게요."
                    placeName="도큐핸즈"
                    category="대형 잡화점"
                    distance="도보 4분  · 280m"
                    rating="4.2"
                    image1={`${import.meta.env.BASE_URL}tokyu-hands-1.jpg`}
                    image2={`${import.meta.env.BASE_URL}tokyu-hands-2.jpg`}
                    image3={`${import.meta.env.BASE_URL}tokyu-hands-3.jpg`}
                  />
                </div>
              )}
              {activeTab === 'restaurant' && selectedOption === 'A' && (
                <Notification
                  subtitle="여행 AI 서비스"
                  title="식당 웨이팅이 1시간 30분 예상돼요"
                  message="대신 갈 수 있는 근처 식당을 찾아 드릴께요"
                />
              )}
              {activeTab === 'restaurant' && selectedOption === 'B' && (
                <div className="absolute bottom-[80px]">
                  <MapCard
                    title="식당 웨이팅이 1시간 30분 예상돼요"
                    description="대신 갈 수 있는 근처 식당을 안내해 드릴게요."
                    placeName="규카츠 모토무라"
                    category="일반 음식점"
                    distance="도보 4분  · 280m"
                    rating="4.0"
                  />
                </div>
              )}
              {showFlightCrisisScreen && urgency === 'high' && highUrgencyTab === 'flight' && selectedOption === 'A' && (
                <FlightCrisisScreen onComplete={() => {
                  setShowCompletionText(true);
                  setTimeout(() => {
                    setShowHighUrgencyComplete(true);
                  }, 2000);
                }} />
              )}
              {showFlightCrisisScreenB && urgency === 'high' && highUrgencyTab === 'flight' && selectedOption === 'B' && (
                <FlightCrisisScreenB onComplete={() => {
                  setShowCompletionText(true);
                  setTimeout(() => {
                    setShowHighUrgencyComplete(true);
                  }, 2000);
                }} />
              )}
            </div>

            {/* Low Urgency Complete Screen - Full Width */}
            {urgency === 'low' && (
              <div className={`absolute inset-0 flex flex-col items-center justify-center transition-all duration-700 ${showLowUrgencyComplete ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`} style={{ backgroundColor: '#F9F9FB' }}>
                <div className="text-center px-[16px]">
                  <p className="text-[20px] font-['Pretendard'] font-semibold text-[#1d1d1f] mb-[12px]">
                    수고 하셨습니다.
                  </p>
                  <p className="text-[15px] font-['Pretendard'] font-normal text-[#666666] mb-[40px] leading-[1.5]">
                    다음 프로토타입을 진행해 주세요.
                  </p>
                  <button
                    onClick={() => {
                      setShowLowUrgencyComplete(false)
                      setShowNotification(false)
                      setShowNotificationText(false)
                      // 타이머 직접 시작 (자동 재시작)
                      setTimeout(() => {
                        setShowNotification(true)
                      }, 2000)
                      setTimeout(() => {
                        setShowNotificationText(true)
                      }, 5000)
                      setTimeout(() => {
                        setShowLowUrgencyComplete(true)
                      }, 10000)
                    }}
                    className="border border-[#d0d0d0] rounded-[24px] px-[32px] py-[12px] text-[15px] font-['Pretendard'] font-medium text-[#666666] hover:bg-[#f5f5f5] transition-all"
                  >
                    다시하기
                  </button>
                </div>
              </div>
            )}

            {/* High Urgency Push Notification - A option */}
            {showPushNotification && !showFlightCrisisScreen && (
              <PushNotificationScreen
                onTap={() => setShowFlightCrisisScreen(true)}
                urgency="high"
              />
            )}

            {/* High Urgency Push Notification - B option */}
            {showPushNotificationB && !showFlightCrisisScreenB && (
              <PushNotificationScreen
                onTap={() => setShowFlightCrisisScreenB(true)}
                urgency="high"
              />
            )}

            {/* Medium Urgency Complete Screen - Full Width */}
            {urgency === 'medium' && (
              <div className={`absolute inset-0 flex flex-col items-center justify-center transition-all duration-700 ${showMediumUrgencyComplete ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`} style={{ backgroundColor: '#F9F9FB' }}>
                <div className="text-center px-[16px]">
                  <p className="text-[20px] font-['Pretendard'] font-semibold text-[#1d1d1f] mb-[12px]">
                    수고 하셨습니다.
                  </p>
                  <p className="text-[15px] font-['Pretendard'] font-normal text-[#666666] mb-[40px] leading-[1.5]">
                    다음 프로토타입을 진행해 주세요.
                  </p>
                  <button
                    onClick={() => {
                      setShowMediumUrgencyComplete(false)
                      setShowBudgetCard(false)
                      setShowLoading(false)
                      setShowBudgetAdjustment(false)
                      setShowPriorityScreen(false)
                      setShowPriorityAnalysis(false)
                      setShowCompletionText(false)
                      setSelectedPriorities(null)
                      // 타이머 직접 시작 (자동 재시작)
                      setTimeout(() => {
                        setShowBudgetCard(true)
                      }, 2000)
                      // 중긴박은 "나가기" 버튼을 눌러야만 완료 화면이 나옴 (자동 타이머 없음)
                    }}
                    className="border border-[#d0d0d0] rounded-[24px] px-[32px] py-[12px] text-[15px] font-['Pretendard'] font-medium text-[#666666] hover:bg-[#f5f5f5] transition-all"
                  >
                    다시하기
                  </button>
                </div>
              </div>
            )}

            {/* High Urgency Complete Screen - Full Width */}
            {urgency === 'high' && (
              <div className={`absolute inset-0 flex flex-col items-center justify-center transition-all duration-700 ${showHighUrgencyComplete ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`} style={{ backgroundColor: '#F9F9FB' }}>
                <div className="text-center px-[16px]">
                  <p className="text-[20px] font-['Pretendard'] font-semibold text-[#1d1d1f] mb-[12px]">
                    수고 하셨습니다.
                  </p>
                  <p className="text-[15px] font-['Pretendard'] font-normal text-[#666666] mb-[40px] leading-[1.5]">
                    {selectedOption === 'B' ? '모든 프로토타입이 완료 되었습니다.' : 'B안을 탭해 이어서 진행해 주세요.'}
                  </p>
                  <button
                    onClick={() => {
                      setShowHighUrgencyComplete(false)
                      setShowPushNotification(false)
                      setShowFlightCrisisScreen(false)
                      setShowPushNotificationB(false)
                      setShowFlightCrisisScreenB(false)
                      setShowCompletionText(false)
                      // 타이머 직접 시작 (자동 재시작)
                      if (selectedOption === 'A') {
                        setTimeout(() => {
                          setShowPushNotification(true)
                        }, 100)
                      } else if (selectedOption === 'B') {
                        setTimeout(() => {
                          setShowPushNotificationB(true)
                        }, 100)
                      }
                    }}
                    className="border border-[#d0d0d0] rounded-[24px] px-[32px] py-[12px] text-[15px] font-['Pretendard'] font-medium text-[#666666] hover:bg-[#f5f5f5] transition-all"
                  >
                    다시하기
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
