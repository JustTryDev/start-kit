"use client"

import Link from "next/link"
import { Recycle } from "lucide-react"

interface FooterProps {
  onApplyClick?: () => void
}

// 푸터 컴포넌트
export function Footer({ onApplyClick }: FooterProps) {
  return (
    <footer className="py-20 pb-10 bg-gray-900 text-white">
      <div className="max-w-[1100px] mx-auto px-6">
        {/* 상단 영역 */}
        <div className="flex flex-col lg:flex-row justify-between pb-15 border-b border-white/10 gap-12">
          {/* 브랜드 정보 */}
          <div>
            <Link href="/" className="flex items-center gap-2">
              <Recycle className="w-6 h-6 text-primary" />
              <span className="text-xl font-bold text-white">에코픽</span>
            </Link>
            <p className="text-sm text-gray-500 mt-3">옷의 새로운 여정을 함께합니다</p>

            {/* 사업자 정보 */}
            <div className="flex flex-col gap-2 mt-6">
              <FooterInfoRow label="상호명" value="헌옷마을 (에코픽)" />
              <FooterInfoRow label="대표자명" value="신재영" />
              <FooterInfoRow label="사업자번호" value="316-19-00023" />
              <FooterInfoRow label="통신판매신고번호" value="2016-경기부천-1758" />
              <FooterInfoRow label="소재지" value="경기도 부천시 원미구 부흥로296번길 25, 지층(중동)" />
            </div>
          </div>

          {/* 링크 영역 */}
          <div className="flex flex-wrap gap-12 lg:gap-20">
            {/* 서비스 */}
            <FooterColumn title="서비스">
              <button
                onClick={onApplyClick}
                className="text-[15px] text-gray-300 hover:text-white hover:translate-x-1 transition-all text-left"
              >
                수거 신청
              </button>
              <FooterLink href="/guide">수거 가이드</FooterLink>
              <FooterLink href="/#process">이용 방법</FooterLink>
              <FooterLink href="/#faq">자주 묻는 질문</FooterLink>
            </FooterColumn>

            {/* 고객센터 */}
            <FooterColumn title="고객센터">
              <FooterLink href="tel:010-8186-7982">010-8186-7982</FooterLink>
              <FooterLink href="mailto:scissorsin@naver.com">scissorsin@naver.com</FooterLink>
            </FooterColumn>
          </div>
        </div>

        {/* 하단 영역 */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-10 gap-4 text-center md:text-left">
          <p className="text-sm text-gray-500">
            &copy; 2024 헌옷마을 (에코픽). All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="#" className="text-sm text-gray-500 hover:text-white transition-colors">
              이용약관
            </Link>
            <Link href="#" className="text-sm text-gray-500 hover:text-white transition-colors">
              개인정보처리방침
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

// 푸터 정보 행 컴포넌트
function FooterInfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex gap-3 text-[13px]">
      <span className="text-gray-500 min-w-[120px] flex-shrink-0">{label}</span>
      <span className="text-gray-300">{value}</span>
    </div>
  )
}

// 푸터 컬럼 컴포넌트
function FooterColumn({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-3">
      <h4 className="text-[13px] font-semibold text-gray-500 uppercase tracking-wider mb-2">
        {title}
      </h4>
      {children}
    </div>
  )
}

// 푸터 링크 컴포넌트
function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="footer-link-enhanced text-[15px] text-gray-300"
    >
      {children}
    </Link>
  )
}
