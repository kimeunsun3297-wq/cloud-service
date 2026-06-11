// Figma API 이미지 로드 실패 시 사용할 플레이스홀더
export const transparentPixel = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 1'%3E%3Crect fill='%23f0f0f0' width='1' height='1'/%3E%3C/svg%3E`

// img 태그에 오류 처리 추가
export function setupImageFallback(imgElement, fallbackSrc = transparentPixel) {
  if (imgElement) {
    imgElement.onerror = () => {
      imgElement.src = fallbackSrc
      imgElement.style.opacity = '0.3'
    }
  }
}

// 모든 Figma 이미지에 자동 폴백 적용
export function setupAllImageFallbacks() {
  const images = document.querySelectorAll('img[src*="figma.com/api"]')
  images.forEach(img => setupImageFallback(img))
}

// 페이지 로드 후 자동 실행
if (typeof window !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupAllImageFallbacks)
  } else {
    setupAllImageFallbacks()
  }
}
