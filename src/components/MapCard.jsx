import { useEffect, useRef, useState } from 'react'
import Lottie from 'lottie-react';
import aiStarsAnimation from '../assets/animations/ai-stars.json';
import { starIcon } from '../utils/icons'
const imgGyukatsu1 = `${import.meta.env.BASE_URL}gyukatsu1.png`
const imgGyukatsu2 = `${import.meta.env.BASE_URL}gyukatsu2.png`
const imgGyukatsu3 = `${import.meta.env.BASE_URL}gyukatsu3.png`
const imgMapImage = `${import.meta.env.BASE_URL}map-image.svg`

export default function MapCard({
  title = "30분 뒤 강한 비 예보가 있어요",
  description = "대신 시간을 보낼 수 있는\n근처 실내 장소를 안내해 드릴게요.",
  placeName = "도큐핸즈",
  category = "대형 잡화점",
  distance = "도보 4분  · 280m",
  rating = "3.9",
  image1 = imgGyukatsu1,
  image2 = imgGyukatsu2,
  image3 = imgGyukatsu3
}) {
  const mapRef = useRef(null)
  const routingControlRef = useRef(null)
  const [displayedTitle, setDisplayedTitle] = useState('')
  const [displayedDescription, setDisplayedDescription] = useState('')
  const [showPlaceInfo, setShowPlaceInfo] = useState(false)
  const [showTags, setShowTags] = useState(false)
  const [showButtons, setShowButtons] = useState(false)
  const [mapExpanded, setMapExpanded] = useState(false)

  // 타이핑 애니메이션 effect
  useEffect(() => {
    let titleIndex = 0;
    let descIndex = 0;
    let titleTimer;
    let descTimer;

    titleTimer = setInterval(() => {
      if (titleIndex < title.length) {
        setDisplayedTitle(title.slice(0, titleIndex + 1));
        titleIndex++;
      } else {
        clearInterval(titleTimer);
        // 제목이 완성되면 설명 타이핑 시작
        descTimer = setInterval(() => {
          if (descIndex < description.length) {
            setDisplayedDescription(description.slice(0, descIndex + 1));
            descIndex++;
          } else {
            clearInterval(descTimer);
            // 설명 완료 후 순차적으로 요소들 표시
            setTimeout(() => {
              setShowPlaceInfo(true);
              setShowTags(true);
            }, 800);
            setTimeout(() => setMapExpanded(true), 1800);
          }
        }, 40);
      }
    }, 60);

    return () => {
      clearInterval(titleTimer);
      clearInterval(descTimer);
    };
  }, [title, description]);


  return (
    <div className="notification-enter backdrop-blur-[40px] rounded-[20px] overflow-clip flex flex-col items-start w-full" style={{ backgroundColor: 'rgba(255,255,255,0.75)' }}>
      {/* Top Section - Info with Icon, Photos, and Tags */}
      <div className="bg-white w-full flex flex-col items-end px-[10px] py-[10px]">
        <div className="w-full flex flex-col gap-[8px] items-start">
          {/* Title and Icon */}
          <div className="flex gap-[6px] w-full items-start">
            <div className="shrink-0 rounded-[6px] overflow-hidden size-[22px]">
              <Lottie
                animationData={aiStarsAnimation}
                loop={true}
                autoplay={true}
                style={{ width: '100%', height: '100%' }}
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[11px] font-['Pretendard'] font-semibold leading-[1.4] tracking-[-0.4px] min-h-[28px]">
                <span className="gradient-text">{displayedTitle}</span><br />
                <span className="text-black">{displayedDescription}</span>
              </p>
            </div>
          </div>

          {/* Place Info, Photos, and Tags */}
          {showPlaceInfo && (
            <div className="flex flex-col gap-[2px] w-full pl-[28px] items-start fade-in-up">
              {/* Photo Gallery */}
              {showTags && (
                <div className="flex gap-[1px] fade-in-up">
                  <div className="rounded-tl-[4px] rounded-bl-[4px] border-0 border-white size-[32px] overflow-clip shrink-0 relative">
                    <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-tl-[4px] rounded-bl-[4px]">
                      <img alt="store1" src={image1} className="absolute w-full h-[107.21%] left-0 top-[-4.14%]" />
                    </div>
                  </div>
                  <div className="border-0 border-white size-[32px] overflow-clip shrink-0 relative">
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                      <img alt="store2" src={image2} className="absolute w-full h-[107.21%] left-0 top-[-4.14%]" />
                    </div>
                  </div>
                  <div className="rounded-tr-[4px] rounded-br-[4px] border-0 border-white size-[32px] overflow-clip shrink-0 relative">
                    <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-tr-[4px] rounded-br-[4px]">
                      <img alt="store3" src={image3} className="absolute w-full h-[107.21%] left-0 top-[-4.14%]" />
                    </div>
                  </div>
                </div>
              )}

              {/* Place Name */}
              <div className="w-full">
                <p className="text-[10px] font-['Pretendard'] font-semibold text-[#1d1d1f]">
                  {placeName}
                </p>
              </div>

              {/* Tags Row */}
              {showTags && (
                <div className="flex gap-[2px] items-center w-full text-[9px] fade-in-up">
                  <p className="font-['Pretendard'] font-medium text-[#a0a0a0] whitespace-nowrap text-ellipsis overflow-hidden">{distance}</p>
                  <span className="text-[#a0a0a0]">·</span>
                  <p className="font-['Pretendard'] font-medium text-[#a0a0a0] whitespace-nowrap text-ellipsis overflow-hidden">{category}</p>
                  <div className="relative shrink-0 size-[10px]">
                    <img alt="star" src={starIcon} className="absolute inset-0 block max-w-none w-full h-full" />
                  </div>
                  <p className="font-['Pretendard'] font-medium text-[#a0a0a0] whitespace-nowrap text-ellipsis overflow-hidden">{rating}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Map Section */}
      <div className={`${mapExpanded ? 'h-[157px]' : 'h-0'} overflow-clip relative shrink-0 w-full bg-[#f0f0f0] transition-all duration-1000 ease-out`}>
        <img alt="map" className="absolute inset-0 w-full h-full object-cover" src={imgMapImage} />
      </div>

      {/* Bottom Section - Buttons */}
      <div className="bg-white w-full flex flex-col items-start p-[12px] relative shrink-0">
        <div className="flex gap-[6px] w-full items-start fade-in-up">
          <button className="flex-1 border border-[#f2f2f7] border-solid rounded-[100px] px-[8px] py-[6px] text-[9px] font-['Pretendard'] font-semibold text-[#7a7a7a] text-center tracking-[-0.4px] whitespace-nowrap">
            다른 장소 찾기
          </button>
          <button className="flex-1 bg-[#007aff] rounded-[100px] px-[8px] py-[6px] text-[9px] font-['Pretendard'] font-semibold text-white text-center tracking-[-0.4px] whitespace-nowrap">
            길 안내 시작하기
          </button>
        </div>
      </div>
    </div>
  )
}
