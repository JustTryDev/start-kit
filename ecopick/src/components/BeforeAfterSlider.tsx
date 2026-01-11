"use client"

import { useState, useEffect, useRef } from "react"

// Before/After 비교 슬라이더 컴포넌트
export function BeforeAfterSlider() {
  const [sliderPosition, setSliderPosition] = useState(50)
  const sliderRef = useRef<HTMLDivElement>(null)
  const isDragging = useRef(false)

  // 슬라이더 드래그 핸들러
  const handleSliderMove = (e: MouseEvent | TouchEvent) => {
    if (!isDragging.current || !sliderRef.current) return
    const rect = sliderRef.current.getBoundingClientRect()
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX
    const position = ((clientX - rect.left) / rect.width) * 100
    setSliderPosition(Math.max(0, Math.min(100, position)))
  }

  // 이벤트 리스너 설정
  useEffect(() => {
    const handleMouseUp = () => { isDragging.current = false }
    const handleMouseMove = (e: MouseEvent) => handleSliderMove(e)
    const handleTouchMove = (e: TouchEvent) => handleSliderMove(e)

    window.addEventListener('mouseup', handleMouseUp)
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('touchend', handleMouseUp)
    window.addEventListener('touchmove', handleTouchMove)

    return () => {
      window.removeEventListener('mouseup', handleMouseUp)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('touchend', handleMouseUp)
      window.removeEventListener('touchmove', handleTouchMove)
    }
  }, [])

  // 자동 시연 애니메이션 (페이지 로드 시 1회)
  useEffect(() => {
    const demonstrateSlider = async () => {
      await new Promise(resolve => setTimeout(resolve, 1500))

      const animateToPosition = (targetPosition: number, duration: number) => {
        return new Promise<void>(resolve => {
          const startPosition = sliderPosition
          const startTime = Date.now()

          const animate = () => {
            const elapsed = Date.now() - startTime
            const progress = Math.min(elapsed / duration, 1)
            const easeProgress = 1 - Math.pow(1 - progress, 3)
            const currentPosition = startPosition + (targetPosition - startPosition) * easeProgress
            setSliderPosition(currentPosition)

            if (progress < 1) {
              requestAnimationFrame(animate)
            } else {
              resolve()
            }
          }
          requestAnimationFrame(animate)
        })
      }

      await animateToPosition(25, 800)
      await new Promise(resolve => setTimeout(resolve, 300))
      await animateToPosition(75, 1200)
      await new Promise(resolve => setTimeout(resolve, 300))
      await animateToPosition(50, 800)
    }

    demonstrateSlider()
  }, [])

  return (
    <div
      ref={sliderRef}
      className="relative w-full aspect-square rounded-2xl overflow-hidden cursor-ew-resize select-none shadow-2xl"
      onMouseDown={() => { isDragging.current = true }}
      onTouchStart={() => { isDragging.current = true }}
    >
      {/* After 이미지 (깨끗한 상태) - 배경 */}
      <img
        src="https://img.kr.gcp-karroter.net/business-profile/bizPlatform/profile/100580618/1765944464723/RklMRV9LSVRfOTA5ODQ0OTY1ODY5NjEwNw==.jpeg?q=95&s=720x720&t=inside"
        alt="수거 후 깨끗한 공간"
        className="absolute inset-0 w-full h-full object-cover"
        draggable={false}
      />

      {/* Before 이미지 (더러운 상태) - 클립 */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ width: `${sliderPosition}%` }}
      >
        <img
          src="https://img.kr.gcp-karroter.net/business-profile/bizPlatform/profile/100580618/1765944464651/RklMRV9LSVRfNzc3ODM2NjE4NTQ2NzIyMQ==.jpeg?q=95&s=720x720&t=inside"
          alt="수거 전 어지러운 공간"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ width: sliderRef.current ? sliderRef.current.offsetWidth : '100%' }}
          draggable={false}
        />
      </div>

      {/* 슬라이더 핸들 */}
      <div
        className="absolute top-0 bottom-0 flex flex-col items-center justify-center -translate-x-1/2 z-10 pointer-events-none"
        style={{ left: `${sliderPosition}%` }}
      >
        <div className="w-0.5 h-full bg-white shadow-lg" />
        <div className="absolute w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-600 font-bold">
          &#x2194;
        </div>
      </div>

      {/* 라벨 */}
      <span
        className="absolute top-4 left-4 px-3 py-1.5 bg-black/60 text-white text-xs font-medium rounded-full transition-opacity"
        style={{ opacity: sliderPosition > 15 ? 1 : 0 }}
      >
        수거 전
      </span>
      <span
        className="absolute top-4 right-4 px-3 py-1.5 bg-white/90 text-gray-900 text-xs font-medium rounded-full transition-opacity"
        style={{ opacity: sliderPosition < 85 ? 1 : 0 }}
      >
        수거 후
      </span>
    </div>
  )
}
