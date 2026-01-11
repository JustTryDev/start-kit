"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Recycle, Check, X, MapPin, Clock, Calendar, Ruler } from "lucide-react"
import { cn } from "@/lib/utils"
import { Footer } from "@/components/Footer"

// 수거 가능 품목
const possibleItems = [
  {
    category: '기본 품목',
    items: ['헌옷 (티셔츠, 바지, 원피스, 자켓 등)', '신발 (운동화, 구두, 샌들 등)', '가방 (백팩, 크로스백, 토트백 등)'],
    note: '기본 품목 20kg 이상부터 방문 수거 가능'
  },
  {
    category: '잡화류',
    items: ['모자, 목도리, 스카프', '벨트, 선글라스', '장갑, 양말, 속옷'],
    note: '착용 가능한 모든 잡화 품목 수거'
  },
  {
    category: '추가 품목',
    items: ['얇은 이불, 커튼, 카펫', '소형 인형 (30cm 이하)', '여행용 캐리어 (바퀴 정상)', '소형 가전류 (프린터/안마기 제외)'],
    note: '기본 품목 20kg 이상일 때 함께 수거 가능'
  },
  {
    category: '기타 수거 품목',
    items: ['컴퓨터 본체, 노트북, 모니터', '헌책, 만화책, CD, LP판', '냄비, 후라이팬, 스텐 제품', '폐휴대폰, 음료수캔, 전선류', '덕다운 이불'],
    note: '기본 품목 20kg 이상일 때 함께 수거 가능'
  }
]

// 수거 불가 품목
const impossibleItems = [
  {
    category: '침구류',
    items: ['솜이불, 솜베개', '목쿠션, 라텍스, 토퍼', '바닥패드, 전기장판']
  },
  {
    category: '신발류',
    items: ['바퀴 달린 신발 (롤러스케이트, 힐리스)', '겨울 털신발, 패딩부츠', '기모신발']
  },
  {
    category: '손상된 의류',
    items: ['곰팡이가 핀 의류/신발/가방', '심한 얼룩, 찢어진 의류', '동물 털이 심하게 묻은 의류', '경화되어 가루가 떨어지는 레자 제품']
  },
  {
    category: '기타 불가',
    items: ['카시트', '장난감', '대형 인형 (30cm 초과)']
  }
]

// 정산 기준
const priceInfo = [
  { category: '기본 품목', items: [
    { name: '헌옷', price: '350원/kg', icon: '👕' },
    { name: '신발', price: '400원/kg', icon: '👟' },
    { name: '가방', price: '700원/kg', icon: '👜' }
  ]},
  { category: '추가 품목', items: [
    { name: '냄비/후라이팬', price: '200원/kg', icon: '🍳' },
    { name: '컴퓨터/노트북', price: '3,000원/대', icon: '💻' },
    { name: '모니터', price: '1,000원/대', icon: '🖥️' },
    { name: '폐휴대폰', price: '500원/개', icon: '📱' },
    { name: '덕다운 이불', price: '1,000원/kg', icon: '🛏️' }
  ]}
]

// 포장 안내
const packingTips = [
  { icon: '📦', title: '20kg 기준', desc: '다이소 90L 재활용봉투 3~4개 = 약 20kg' },
  { icon: '👟', title: '신발/가방 분리', desc: '신발과 가방은 헌옷과 분리하여 따로 포장해 주세요' },
  { icon: '🚪', title: '비대면 수거', desc: '문 앞에 놓아주시면 수거 후 정산해드립니다' },
  { icon: '📞', title: '예약 필수', desc: '최소 하루 전 예약이 필요합니다' }
]

// 서비스 정보
const serviceInfo = [
  { icon: MapPin, title: '수거 가능 지역', desc: '부천 전지역, 안산 전지역(거북섬·대부도 제외), 서울(오류동, 개봉동, 고척동, 항동, 궁동, 수궁동), 인천 부평구(부개동, 삼산동), 시흥 은계지구' },
  { icon: Clock, title: '운영 시간', desc: '전화상담: 오전 7시~오후 7시 / 방문수거: 오전 7시~오후 4시' },
  { icon: Calendar, title: '휴무일', desc: '매주 일요일 휴무' },
  { icon: Ruler, title: '최소 수거량', desc: '기본 품목(헌옷+신발+가방) 20kg 이상' }
]

// 가이드 페이지
export default function GuidePage() {
  const [activeTab, setActiveTab] = useState<'possible' | 'impossible'>('possible')

  return (
    <>
      {/* 네비게이션 */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl shadow-[0_1px_20px_rgba(0,0,0,0.08)]">
        <div className="max-w-[1100px] mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Recycle className="w-6 h-6 text-primary" />
            <span className="text-xl font-bold text-gray-900">에코픽</span>
          </Link>
          <div className="hidden md:flex gap-8">
            <Link href="/#service" className="text-[15px] font-medium text-gray-600 hover:text-gray-900">서비스 소개</Link>
            <Link href="/store" className="text-[15px] font-medium text-gray-600 hover:text-gray-900">스토어</Link>
            <Link href="/guide" className="text-[15px] font-medium text-primary">수거 가이드</Link>
          </div>
          <Link href="/" className="px-5 py-2.5 rounded-lg text-sm font-semibold bg-primary text-white hover:bg-[var(--color-primary-light)]">
            수거 신청
          </Link>
        </div>
      </nav>

      {/* 헤더 */}
      <section className="pt-32 pb-12 bg-gradient-to-b from-green-50 to-white">
        <div className="max-w-[1100px] mx-auto px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[28px] md:text-[36px] font-bold text-gray-900 mb-4"
          >
            수거 가이드
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-600"
          >
            수거 가능 품목과 정산 기준을 확인하세요
          </motion.p>
        </div>
      </section>

      {/* 서비스 정보 */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-[1100px] mx-auto px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {serviceInfo.map((info, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-sm"
              >
                <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center mb-4">
                  <info.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{info.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{info.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 품목 탭 */}
      <section className="py-16">
        <div className="max-w-[1100px] mx-auto px-6">
          {/* 탭 버튼 */}
          <div className="flex justify-center gap-4 mb-12">
            <button
              onClick={() => setActiveTab('possible')}
              className={cn(
                "flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all",
                activeTab === 'possible'
                  ? "bg-primary text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              )}
            >
              <Check className="w-5 h-5" />
              수거 가능 품목
            </button>
            <button
              onClick={() => setActiveTab('impossible')}
              className={cn(
                "flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all",
                activeTab === 'impossible'
                  ? "bg-red-500 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              )}
            >
              <X className="w-5 h-5" />
              수거 불가 품목
            </button>
          </div>

          {/* 수거 가능 품목 */}
          {activeTab === 'possible' && (
            <div className="grid sm:grid-cols-2 gap-6">
              {possibleItems.map((category, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-2xl p-6 border border-green-200 shadow-sm"
                >
                  <h3 className="font-bold text-gray-900 mb-4">{category.category}</h3>
                  <ul className="space-y-2">
                    {category.items.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                        <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  {category.note && (
                    <p className="mt-4 text-xs text-primary bg-green-50 p-3 rounded-lg">{category.note}</p>
                  )}
                </motion.div>
              ))}
            </div>
          )}

          {/* 수거 불가 품목 */}
          {activeTab === 'impossible' && (
            <div className="grid sm:grid-cols-2 gap-6">
              {impossibleItems.map((category, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-2xl p-6 border border-red-200 shadow-sm"
                >
                  <h3 className="font-bold text-gray-900 mb-4">{category.category}</h3>
                  <ul className="space-y-2">
                    {category.items.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                        <X className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 정산 기준 */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-[800px] mx-auto px-6">
          <h2 className="text-[24px] md:text-[28px] font-bold text-gray-900 text-center mb-4">품목별 정산 기준</h2>
          <p className="text-gray-600 text-center mb-12">품목별로 정산 금액이 다르며, 기본 품목 20kg 이하는 무상 수거됩니다.</p>

          <div className="space-y-8">
            {priceInfo.map((section, index) => (
              <div key={index}>
                <h3 className="text-sm font-semibold text-gray-500 uppercase mb-4">{section.category}</h3>
                <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
                  {section.items.map((item, idx) => (
                    <div
                      key={idx}
                      className={cn(
                        "flex items-center justify-between p-4",
                        idx > 0 && "border-t border-gray-100"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{item.icon}</span>
                        <span className="font-medium text-gray-900">{item.name}</span>
                      </div>
                      <span className="font-bold text-primary">{item.price}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* 무상 수거 안내 */}
          <div className="mt-8 p-4 bg-green-50 rounded-xl text-center">
            <span className="text-2xl mb-2 block">🎁</span>
            <p className="text-primary font-medium">
              <strong>무상 수거:</strong> 기본 품목(헌옷+신발+가방) 합계 20kg 이하는 무상으로 수거해드립니다!
            </p>
          </div>
        </div>
      </section>

      {/* 포장 방법 */}
      <section className="py-16">
        <div className="max-w-[1100px] mx-auto px-6">
          <h2 className="text-[24px] md:text-[28px] font-bold text-gray-900 text-center mb-4">포장 방법 및 안내</h2>
          <p className="text-gray-600 text-center mb-12">간단한 포장으로 수거 준비를 완료하세요!</p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {packingTips.map((tip, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 text-center shadow-sm border border-gray-100"
              >
                <span className="text-4xl mb-4 block">{tip.icon}</span>
                <h3 className="font-bold text-gray-900 mb-2">{tip.title}</h3>
                <p className="text-sm text-gray-600">{tip.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary">
        <div className="max-w-[600px] mx-auto px-6 text-center">
          <h2 className="text-[24px] md:text-[30px] font-bold text-white mb-4">준비되셨나요?</h2>
          <p className="text-green-100 mb-8">지금 바로 수거 신청하고 옷장도 정리하고 용돈도 받아가세요!</p>
          <Link
            href="/"
            className="inline-block px-8 py-4 bg-white text-primary font-semibold rounded-xl hover:bg-gray-50 transition-colors"
          >
            수거 신청하기
          </Link>
        </div>
      </section>

      {/* 푸터 */}
      <Footer />
    </>
  )
}
