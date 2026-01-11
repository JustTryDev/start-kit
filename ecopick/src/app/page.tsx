"use client"

import { useState } from "react"
import Script from "next/script"
import { Navigation } from "@/components/Navigation"
import { Footer } from "@/components/Footer"
import { HeroSection } from "@/components/HeroSection"
import { ServiceSection } from "@/components/ServiceSection"
import { ProcessSection } from "@/components/ProcessSection"
import { EnvironmentSection } from "@/components/EnvironmentSection"
import { ReviewSection } from "@/components/ReviewSection"
import { FaqSection } from "@/components/FAQSection"
import { ApplyModal } from "@/components/ApplyModal"
import { Chatbot } from "@/components/Chatbot"

// 메인 페이지
export default function HomePage() {
  // 수거 신청 모달 상태
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      {/* 다음 주소 검색 API 스크립트 */}
      <Script
        src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"
        strategy="lazyOnload"
      />

      {/* 네비게이션 */}
      <Navigation onApplyClick={() => setIsModalOpen(true)} />

      {/* 메인 콘텐츠 */}
      <main>
        {/* 히어로 섹션 */}
        <HeroSection onApplyClick={() => setIsModalOpen(true)} />

        {/* 서비스 소개 */}
        <ServiceSection />

        {/* 프로세스 */}
        <ProcessSection />

        {/* 환경 영향 */}
        <EnvironmentSection />

        {/* 고객 후기 */}
        <ReviewSection />

        {/* FAQ */}
        <FaqSection />
      </main>

      {/* 푸터 */}
      <Footer onApplyClick={() => setIsModalOpen(true)} />

      {/* 수거 신청 모달 */}
      <ApplyModal open={isModalOpen} onOpenChange={setIsModalOpen} />

      {/* 챗봇 */}
      <Chatbot onApplyClick={() => setIsModalOpen(true)} />
    </>
  )
}
