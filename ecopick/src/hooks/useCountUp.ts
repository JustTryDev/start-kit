"use client"

import { useState, useEffect, useRef } from "react"

// 숫자 카운터 애니메이션 훅
// 요소가 화면에 보이면 숫자가 0에서 목표값까지 증가하는 애니메이션
export function useCountUp(end: number, duration: number = 2000, start: number = 0) {
  const [count, setCount] = useState(start)
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  // Intersection Observer로 요소가 화면에 보이는지 감지
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true)
        }
      },
      { threshold: 0.3 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [isVisible])

  // 카운트업 애니메이션
  useEffect(() => {
    if (!isVisible) return

    let startTime: number | null = null

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / duration, 1)

      // easeOutExpo 이징 함수 - 처음에 빠르고 끝에 느려짐
      const easeProgress = 1 - Math.pow(2, -10 * progress)
      setCount(Math.floor(easeProgress * (end - start) + start))

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    requestAnimationFrame(animate)
  }, [isVisible, end, start, duration])

  return { count, ref }
}
