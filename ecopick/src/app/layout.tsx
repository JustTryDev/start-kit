import type { Metadata } from "next"
import "./globals.css"

// 메타데이터
export const metadata: Metadata = {
  title: "에코픽 - 헌옷 수거 서비스",
  description: "안 입는 옷, 에코픽이 가져갈게요. 옷장 정리하면서 용돈까지! 옷이 많을수록 더 많이 받아가세요.",
  keywords: ["헌옷 수거", "에코픽", "의류 재활용", "옷 정리", "현금 정산"],
  openGraph: {
    title: "에코픽 - 헌옷 수거 서비스",
    description: "안 입는 옷, 에코픽이 가져갈게요. 옷장 정리하면서 용돈까지!",
    type: "website",
  },
}

// 루트 레이아웃
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko">
      <head>
        {/* Wanted Sans Variable 폰트 CDN */}
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/wanteddev/wanted-sans@v1.0.3/packages/wanted-sans/fonts/webfonts/variable/split/WantedSansVariable.min.css"
        />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}
