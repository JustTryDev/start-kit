"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Recycle } from "lucide-react"
import { cn } from "@/lib/utils"

interface NavigationProps {
  onApplyClick?: () => void
}

// 네비게이션 컴포넌트
export function Navigation({ onApplyClick }: NavigationProps) {
  // 스크롤 상태 (스크롤 시 네비게이션 스타일 변경)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        "bg-white/80 backdrop-blur-xl",
        scrolled && "bg-white/95 shadow-[0_1px_20px_rgba(0,0,0,0.08)]"
      )}
    >
      <div className="max-w-[1100px] mx-auto px-6 h-16 flex items-center justify-between">
        {/* 로고 */}
        <Link href="/" className="flex items-center gap-2 hover:scale-[1.02] transition-transform">
          <Recycle className="w-6 h-6 text-primary animate-spin-slow" />
          <span className="text-xl font-bold text-gray-900">에코픽</span>
        </Link>

        {/* 네비게이션 링크 (데스크톱) */}
        <div className="hidden md:flex gap-8">
          <NavLink href="/#service">서비스 소개</NavLink>
          <NavLink href="/store">스토어</NavLink>
          <NavLink href="/guide">수거 가이드</NavLink>
          <NavLink href="/#faq">FAQ</NavLink>
        </div>

        {/* CTA 버튼 */}
        <button
          onClick={onApplyClick}
          className={cn(
            "btn-primary-enhanced px-5 py-2.5 rounded-lg text-sm font-semibold",
            "bg-primary text-white",
            "hover:bg-[var(--color-primary-light)]"
          )}
        >
          수거 신청
        </button>
      </div>
    </nav>
  )
}

// 네비게이션 링크 컴포넌트
function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className={cn(
        "text-[15px] font-medium text-gray-600 relative",
        "hover:text-gray-900 transition-colors",
        "after:content-[''] after:absolute after:bottom-[-4px] after:left-0",
        "after:w-0 after:h-0.5 after:bg-primary after:transition-all after:duration-300",
        "hover:after:w-full"
      )}
    >
      {children}
    </Link>
  )
}
