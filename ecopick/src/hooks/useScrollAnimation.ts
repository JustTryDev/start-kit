"use client"

import { useRef, useState, useEffect } from "react"

// 스크롤 애니메이션 훅
// 요소가 화면에 보이면 isVisible을 true로 변경
export function useScrollAnimation(threshold: number = 0.1) {
  const ref = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // 요소가 화면에 보이면 isVisible을 true로 (한 번만)
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      {
        threshold,
        rootMargin: "0px 0px -50px 0px" // 하단 50px 여유
      }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [threshold])

  return { ref, isVisible }
}
