"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCountUp } from "@/hooks/useCountUp"
import { BeforeAfterSlider } from "./BeforeAfterSlider"

interface HeroSectionProps {
  onApplyClick: () => void
}

// 히어로 섹션 - 메인 비주얼 영역
export function HeroSection({ onApplyClick }: HeroSectionProps) {
  // 카운터 애니메이션
  const stat1 = useCountUp(127849, 2500)
  const stat2 = useCountUp(32451, 2500)
  const stat3 = useCountUp(89, 2000)

  return (
    <section className="relative min-h-screen pt-24 pb-20 overflow-hidden">
      <div className="max-w-[1100px] mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* 텍스트 영역 */}
          <div className="flex-1 text-center lg:text-left">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-sm font-medium text-primary mb-4"
            >
              옷장 정리부터 환경 보호까지
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-[32px] md:text-[44px] lg:text-[52px] font-extrabold leading-tight text-gray-900 mb-6 tracking-[-1px] md:tracking-[-2px]"
            >
              안 입는 옷,<br />
              <span className="text-primary hero-highlight">에코픽</span>이 가져갈게요
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-gray-600 mb-8"
            >
              옷장 정리하면서 용돈까지!<br />
              옷이 많을수록 더 많이 받아가세요.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Button
                size="lg"
                onClick={onApplyClick}
                className="btn-primary-enhanced bg-primary hover:bg-[var(--color-primary-light)] text-white px-8 py-6 text-base font-semibold rounded-xl btn-animated"
              >
                수거 신청하기
                <ArrowRight className="ml-2 w-5 h-5 btn-arrow" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                asChild
                className="px-8 py-6 text-base font-semibold rounded-xl border-2"
              >
                <a href="#service">자세히 알아보기</a>
              </Button>
            </motion.div>

            {/* 통계 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex justify-center lg:justify-start items-center gap-8 mt-12"
            >
              <div ref={stat1.ref} className="text-center lg:text-left">
                <span className="block text-[28px] md:text-[36px] font-extrabold text-gray-900 tracking-[-1px] tabular-nums">
                  {stat1.count.toLocaleString()}
                </span>
                <span className="text-sm text-gray-500 mt-1">수거된 의류 (벌)</span>
              </div>
              <div className="hidden md:block w-px h-10 bg-gray-300" />
              <div ref={stat2.ref} className="text-center lg:text-left">
                <span className="block text-[28px] md:text-[36px] font-extrabold text-gray-900 tracking-[-1px] tabular-nums">
                  {stat2.count.toLocaleString()}
                </span>
                <span className="text-sm text-gray-500 mt-1">참여 고객</span>
              </div>
              <div className="hidden md:block w-px h-10 bg-gray-300" />
              <div ref={stat3.ref} className="text-center lg:text-left">
                <span className="block text-[28px] md:text-[36px] font-extrabold text-gray-900 tracking-[-1px] tabular-nums">
                  {stat3.count}%
                </span>
                <span className="text-sm text-gray-500 mt-1">재활용률</span>
              </div>
            </motion.div>
          </div>

          {/* 이미지 영역 (Before/After 슬라이더) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex-1 w-full max-w-lg"
          >
            <BeforeAfterSlider />
          </motion.div>
        </div>
      </div>

      {/* 배경 그라디언트 */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-green-50/50 to-white" />
    </section>
  )
}
