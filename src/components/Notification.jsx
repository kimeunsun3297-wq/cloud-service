import { useState, useEffect } from 'react';
import Lottie from 'lottie-react';
import aiStarsAnimation from '../assets/animations/ai-stars.json';

export default function Notification({
  subtitle = "여행 AI 서비스",
  title = "30분 뒤 강한 비 예보가 있어요",
  message = "근처 실내 장소를 찾아 드릴께요",
  children = null
}) {
  const [displayedTitle, setDisplayedTitle] = useState('');
  const [displayedMessage, setDisplayedMessage] = useState('');

  useEffect(() => {
    let titleIndex = 0;
    let messageIndex = 0;
    let titleTimer;
    let messageTimer;

    // 제목 타이핑 애니메이션
    titleTimer = setInterval(() => {
      if (titleIndex < title.length) {
        setDisplayedTitle(title.slice(0, titleIndex + 1));
        titleIndex++;
      } else {
        clearInterval(titleTimer);
        // 제목이 완성되면 메시지 타이핑 시작
        messageTimer = setInterval(() => {
          if (messageIndex < message.length) {
            setDisplayedMessage(message.slice(0, messageIndex + 1));
            messageIndex++;
          } else {
            clearInterval(messageTimer);
          }
        }, 50);
      }
    }, 60);

    return () => {
      clearInterval(titleTimer);
      clearInterval(messageTimer);
    };
  }, [title, message]);

  return (
    <div className="notification-enter backdrop-blur-[40px] rounded-[16px] py-[14px] px-[14px] flex gap-[10px] items-start cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-105 active:scale-95 w-full" style={{ backgroundColor: '#f5f5f5' }}>
      {/* Icon - Lottie Animation */}
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
        {/* Message */}
        {children ? (
          <div className="text-[12px] font-['Pretendard'] font-semibold text-black leading-[1.4] tracking-[-0.4px]">
            {children}
          </div>
        ) : (
          <p className="text-[12px] font-['Pretendard'] font-semibold leading-[1.4] tracking-[-0.4px] min-h-[40px]">
            <span className="gradient-text">{displayedTitle}</span><br />
            <span className="text-black">
              {displayedMessage.split('\n').map((line, idx) => (
                <span key={idx}>
                  {line}
                  {idx < displayedMessage.split('\n').length - 1 && <br />}
                </span>
              ))}
            </span>
          </p>
        )}
      </div>
    </div>
  )
}
