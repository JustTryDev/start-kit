"use client"

import { Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { Recycle, Printer, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"

// 명세서 내용 컴포넌트 (useSearchParams 사용)
function StatementContent() {
  const searchParams = useSearchParams()

  // URL 파라미터에서 데이터 가져오기
  const customerName = searchParams.get('name') || '홍길동'
  const customerPhone = searchParams.get('phone') || '010-1234-5678'
  const customerAddress = searchParams.get('address') || '서울시 강남구 테헤란로 123'
  const pickupDate = searchParams.get('date') || new Date().toLocaleDateString('ko-KR')
  const totalWeight = searchParams.get('weight') || '15.5'
  const pricePerKg = searchParams.get('price') || '500'
  const totalAmount = searchParams.get('amount') || (parseFloat(totalWeight) * parseFloat(pricePerKg)).toLocaleString()
  const statementNo = searchParams.get('no') || `EP${Date.now().toString().slice(-8)}`

  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-8 print:shadow-none print:rounded-none">
      {/* 헤더 */}
      <header className="flex items-center justify-between border-b border-gray-200 pb-6 mb-6">
        <div className="flex items-center gap-2">
          <Recycle className="w-8 h-8 text-primary" />
          <span className="text-2xl font-bold text-gray-900">에코픽</span>
        </div>
        <div className="text-right">
          <h1 className="text-xl font-bold text-gray-900">헌옷 수거 명세서</h1>
          <p className="text-sm text-gray-500">No. {statementNo}</p>
        </div>
      </header>

      {/* 고객 정보 */}
      <section className="mb-8">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">고객 정보</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <span className="text-sm text-gray-500">고객명</span>
            <p className="font-medium text-gray-900">{customerName}</p>
          </div>
          <div>
            <span className="text-sm text-gray-500">연락처</span>
            <p className="font-medium text-gray-900">{customerPhone}</p>
          </div>
          <div className="col-span-2">
            <span className="text-sm text-gray-500">주소</span>
            <p className="font-medium text-gray-900">{customerAddress}</p>
          </div>
        </div>
      </section>

      {/* 수거 정보 */}
      <section className="mb-8">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">수거 정보</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <span className="text-sm text-gray-500">수거일</span>
            <p className="font-medium text-gray-900">{pickupDate}</p>
          </div>
          <div>
            <span className="text-sm text-gray-500">총 무게</span>
            <p className="font-bold text-primary text-lg">{totalWeight} kg</p>
          </div>
        </div>
      </section>

      {/* 정산 내역 */}
      <section className="mb-8">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">정산 내역</h2>
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 text-sm font-medium text-gray-500">항목</th>
              <th className="text-right py-3 text-sm font-medium text-gray-500">무게</th>
              <th className="text-right py-3 text-sm font-medium text-gray-500">단가</th>
              <th className="text-right py-3 text-sm font-medium text-gray-500">금액</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-gray-100">
              <td className="py-4 text-gray-900">헌옷 수거</td>
              <td className="py-4 text-right text-gray-900">{totalWeight} kg</td>
              <td className="py-4 text-right text-gray-900">{parseInt(pricePerKg).toLocaleString()}원/kg</td>
              <td className="py-4 text-right text-gray-900">{parseInt(totalAmount).toLocaleString()}원</td>
            </tr>
          </tbody>
          <tfoot>
            <tr className="bg-gray-50">
              <td colSpan={3} className="py-4 px-4 font-semibold text-gray-900">총 정산 금액</td>
              <td className="py-4 px-4 text-right font-bold text-xl text-primary">{parseInt(totalAmount).toLocaleString()}원</td>
            </tr>
          </tfoot>
        </table>
      </section>

      {/* 안내 문구 */}
      <section className="mb-8 p-4 bg-gray-50 rounded-xl text-sm text-gray-600 space-y-1">
        <p>• 정산 금액은 영업일 기준 3일 이내에 입금됩니다.</p>
        <p>• 수거된 의류는 상태에 따라 기부 또는 재활용됩니다.</p>
        <p>• 문의사항은 고객센터(010-8186-7982)로 연락해 주세요.</p>
      </section>

      {/* 푸터 */}
      <footer className="flex items-center justify-between pt-6 border-t border-gray-200">
        <div className="text-xs text-gray-400 space-y-1">
          <p>헌옷마을 (에코픽) | 사업자등록번호: 316-19-00023</p>
          <p>경기도 부천시 원미구 부흥로296번길 25, 지층(중동)</p>
          <p>고객센터: 010-8186-7982 | scissorsin@naver.com</p>
        </div>
        <div className="w-20 h-20 rounded-full border-2 border-primary flex flex-col items-center justify-center text-center">
          <span className="text-xs font-bold text-primary">에코픽</span>
          <span className="text-[10px] text-gray-500">{pickupDate}</span>
        </div>
      </footer>

      {/* 인쇄 버튼 (인쇄시 숨김) */}
      <Button
        onClick={handlePrint}
        className="mt-8 w-full print:hidden"
        variant="outline"
      >
        <Printer className="w-5 h-5 mr-2" />
        인쇄하기
      </Button>
    </div>
  )
}

// 로딩 컴포넌트
function StatementLoading() {
  return (
    <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-8 flex items-center justify-center min-h-[400px]">
      <div className="text-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto mb-4" />
        <p className="text-gray-500">명세서를 불러오는 중...</p>
      </div>
    </div>
  )
}

// 명세서 페이지 (Suspense 경계로 감싸기)
export default function StatementPage() {
  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 print:bg-white print:py-0">
      <Suspense fallback={<StatementLoading />}>
        <StatementContent />
      </Suspense>
    </div>
  )
}
