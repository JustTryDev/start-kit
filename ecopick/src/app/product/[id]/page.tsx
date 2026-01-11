"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { motion } from "framer-motion"
import { Recycle, Heart, Info, ChevronLeft } from "lucide-react"
import { cn } from "@/lib/utils"
import { Footer } from "@/components/Footer"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// 샘플 상품 데이터
const products = [
  {
    id: 1,
    name: '빈티지 데님 자켓',
    price: 25000,
    originalPrice: 89000,
    category: 'outer',
    size: 'M',
    condition: 'A',
    image: 'https://images.unsplash.com/photo-1551537482-f2075a1d41f2?w=400&h=500&fit=crop&q=80',
    brand: 'ZARA',
    isNew: true,
    description: '클래식한 디자인의 빈티지 데님 자켓입니다. 약간의 워싱 처리로 자연스러운 빈티지 느낌을 연출합니다. 봄, 가을에 가볍게 걸치기 좋은 아이템입니다.',
    material: '면 100%',
    color: '인디고 블루',
    measurements: { shoulder: '44cm', chest: '108cm', length: '62cm', sleeve: '60cm' }
  },
  {
    id: 2,
    name: '화이트 코튼 셔츠',
    price: 15000,
    originalPrice: 45000,
    category: 'top',
    size: 'S',
    condition: 'A+',
    image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=500&fit=crop&q=80',
    brand: 'UNIQLO',
    isNew: false,
    description: '깔끔한 화이트 코튼 셔츠입니다. 기본에 충실한 디자인으로 다양한 스타일링이 가능합니다.',
    material: '면 100%',
    color: '화이트',
    measurements: { shoulder: '38cm', chest: '96cm', length: '68cm', sleeve: '58cm' }
  },
  {
    id: 3,
    name: '블랙 슬랙스',
    price: 18000,
    originalPrice: 65000,
    category: 'bottom',
    size: 'L',
    condition: 'A',
    image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=400&h=500&fit=crop&q=80',
    brand: '8SECONDS',
    isNew: true,
    description: '슬림핏 블랙 슬랙스입니다. 구김이 적고 편안한 착용감을 제공합니다.',
    material: '폴리에스터 65%, 레이온 30%, 스판덱스 5%',
    color: '블랙',
    measurements: { waist: '84cm', hip: '102cm', length: '103cm', thigh: '58cm' }
  },
  {
    id: 4,
    name: '캐시미어 니트',
    price: 35000,
    originalPrice: 120000,
    category: 'top',
    size: 'M',
    condition: 'A+',
    image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400&h=500&fit=crop&q=80',
    brand: 'COS',
    isNew: false,
    description: '부드러운 캐시미어 블렌드 니트입니다.',
    material: '캐시미어 30%, 울 70%',
    color: '베이지',
    measurements: { shoulder: '42cm', chest: '104cm', length: '64cm', sleeve: '59cm' }
  },
  {
    id: 5,
    name: '롱 트렌치코트',
    price: 45000,
    originalPrice: 180000,
    category: 'outer',
    size: 'M',
    condition: 'A',
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400&h=500&fit=crop&q=80',
    brand: 'MANGO',
    isNew: true,
    description: '클래식한 롱 트렌치코트입니다.',
    material: '면 65%, 폴리에스터 35%',
    color: '카멜',
    measurements: { shoulder: '40cm', chest: '100cm', length: '110cm', sleeve: '60cm' }
  },
  {
    id: 6,
    name: '플리츠 미디스커트',
    price: 12000,
    originalPrice: 49000,
    category: 'bottom',
    size: 'S',
    condition: 'B+',
    image: 'https://images.unsplash.com/photo-1583496661160-fb5886a0uj5a?w=400&h=500&fit=crop&q=80',
    brand: 'H&M',
    isNew: false,
    description: '여성스러운 플리츠 미디스커트입니다.',
    material: '폴리에스터 100%',
    color: '네이비',
    measurements: { waist: '66cm', hip: '90cm', length: '68cm' }
  },
  {
    id: 7,
    name: '스트라이프 원피스',
    price: 22000,
    originalPrice: 79000,
    category: 'dress',
    size: 'M',
    condition: 'A',
    image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400&h=500&fit=crop&q=80',
    brand: 'ZARA',
    isNew: false,
    description: '세로 스트라이프 패턴의 원피스입니다.',
    material: '비스코스 100%',
    color: '네이비/화이트',
    measurements: { shoulder: '36cm', chest: '92cm', length: '118cm', sleeve: '소매 없음' }
  },
  {
    id: 8,
    name: '울 블렌드 코트',
    price: 55000,
    originalPrice: 250000,
    category: 'outer',
    size: 'L',
    condition: 'A+',
    image: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=400&h=500&fit=crop&q=80',
    brand: 'MASSIMO DUTTI',
    isNew: true,
    description: '고급스러운 울 블렌드 코트입니다.',
    material: '울 60%, 폴리에스터 30%, 기타 10%',
    color: '차콜 그레이',
    measurements: { shoulder: '46cm', chest: '112cm', length: '105cm', sleeve: '62cm' }
  }
]

// 상태 설명
const conditionDescriptions: Record<string, string> = {
  'A+': '새 상품에 가까운 최상급 상태',
  'A': '약간의 착용감만 있는 우수한 상태',
  'B+': '눈에 띄지 않는 작은 사용감이 있는 양호한 상태',
  'B': '착용에 문제 없는 보통 상태'
}

// 측정 항목 한글화
const measurementLabels: Record<string, string> = {
  shoulder: '어깨',
  chest: '가슴',
  length: '총장',
  sleeve: '소매',
  waist: '허리',
  hip: '엉덩이',
  thigh: '허벅지'
}

// 상품 상세 페이지
export default function ProductDetailPage() {
  const params = useParams()
  const productId = Number(params.id)
  const [isWishlisted, setIsWishlisted] = useState(false)

  const product = products.find(p => p.id === productId)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [productId])

  // 할인율 계산
  const getDiscountRate = (original: number, current: number) => {
    return Math.round((1 - current / original) * 100)
  }

  // 구매하기 핸들러
  const handlePurchase = () => {
    alert('구매 기능은 준비 중입니다.\n빠른 시일 내에 서비스를 제공하겠습니다!')
  }

  // 상품을 찾지 못한 경우
  if (!product) {
    return (
      <>
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl shadow-[0_1px_20px_rgba(0,0,0,0.08)]">
          <div className="max-w-[1100px] mx-auto px-6 h-16 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <Recycle className="w-6 h-6 text-primary" />
              <span className="text-xl font-bold text-gray-900">에코픽</span>
            </Link>
          </div>
        </nav>
        <div className="min-h-screen pt-32 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">상품을 찾을 수 없습니다</h2>
          <p className="text-gray-600 mb-8">요청하신 상품이 존재하지 않거나 판매가 종료되었습니다.</p>
          <Link href="/store" className="inline-block px-6 py-3 bg-primary text-white rounded-xl font-medium">
            스토어로 돌아가기
          </Link>
        </div>
      </>
    )
  }

  // 추천 상품
  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4)

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
            <Link href="/store" className="text-[15px] font-medium text-primary">스토어</Link>
            <Link href="/guide" className="text-[15px] font-medium text-gray-600 hover:text-gray-900">수거 가이드</Link>
          </div>
          <Link href="/" className="px-5 py-2.5 rounded-lg text-sm font-semibold bg-primary text-white hover:bg-[var(--color-primary-light)]">
            수거 신청
          </Link>
        </div>
      </nav>

      {/* Breadcrumb */}
      <div className="pt-20 pb-4 bg-gray-50">
        <div className="max-w-[1100px] mx-auto px-6">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-gray-900">홈</Link>
            <span>/</span>
            <Link href="/store" className="hover:text-gray-900">스토어</Link>
            <span>/</span>
            <span className="text-gray-900">{product.name}</span>
          </div>
        </div>
      </div>

      {/* 상품 상세 */}
      <section className="py-8">
        <div className="max-w-[1100px] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid md:grid-cols-2 gap-12"
          >
            {/* 이미지 */}
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-gray-100">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {product.isNew && (
                <span className="absolute top-4 left-4 px-3 py-1.5 bg-primary text-white text-xs font-medium rounded-full">
                  NEW
                </span>
              )}
              <span className="absolute top-4 right-4 px-3 py-1.5 bg-red-500 text-white text-xs font-medium rounded-full">
                -{getDiscountRate(product.originalPrice, product.price)}%
              </span>
            </div>

            {/* 정보 */}
            <div>
              <span className="text-sm text-gray-400 font-medium">{product.brand}</span>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-2 mb-4">{product.name}</h1>

              {/* 가격 */}
              <div className="flex items-baseline gap-3 mb-6">
                <span className="text-3xl font-bold text-gray-900">{product.price.toLocaleString()}원</span>
                <span className="text-lg text-gray-400 line-through">{product.originalPrice.toLocaleString()}원</span>
                <span className="px-2 py-1 bg-red-100 text-red-600 text-sm font-medium rounded">
                  -{getDiscountRate(product.originalPrice, product.price)}%
                </span>
              </div>

              {/* 메타 정보 */}
              <div className="space-y-3 py-6 border-y border-gray-100">
                <div className="flex">
                  <span className="w-20 text-gray-500 text-sm">사이즈</span>
                  <span className="font-medium text-gray-900">{product.size}</span>
                </div>
                <div className="flex">
                  <span className="w-20 text-gray-500 text-sm">상태</span>
                  <span className="font-medium text-gray-900">
                    {product.condition}
                    <span className="ml-2 text-sm text-gray-500">({conditionDescriptions[product.condition]})</span>
                  </span>
                </div>
                <div className="flex">
                  <span className="w-20 text-gray-500 text-sm">컬러</span>
                  <span className="font-medium text-gray-900">{product.color}</span>
                </div>
                <div className="flex">
                  <span className="w-20 text-gray-500 text-sm">소재</span>
                  <span className="font-medium text-gray-900">{product.material}</span>
                </div>
              </div>

              {/* 액션 버튼 */}
              <div className="flex gap-3 mt-6">
                <Button onClick={handlePurchase} className="flex-1 py-6 text-base font-semibold">
                  구매하기
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className={cn("w-14 h-14", isWishlisted && "text-red-500 border-red-500")}
                >
                  <Heart className={cn("w-6 h-6", isWishlisted && "fill-current")} />
                </Button>
              </div>

              {/* 안내 */}
              <div className="mt-6 p-4 bg-green-50 rounded-xl flex items-center gap-3 text-sm text-primary">
                <Info className="w-5 h-5 flex-shrink-0" />
                <span>모든 판매 수익금은 환경 보호 활동에 사용됩니다</span>
              </div>
            </div>
          </motion.div>

          {/* 탭 */}
          <Tabs defaultValue="description" className="mt-16">
            <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent">
              <TabsTrigger value="description" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-6 py-4">
                상품 설명
              </TabsTrigger>
              <TabsTrigger value="measurements" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-6 py-4">
                사이즈 정보
              </TabsTrigger>
              <TabsTrigger value="shipping" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-6 py-4">
                배송 안내
              </TabsTrigger>
            </TabsList>
            <TabsContent value="description" className="py-8">
              <p className="text-gray-700 leading-relaxed">{product.description}</p>
            </TabsContent>
            <TabsContent value="measurements" className="py-8">
              <div className="max-w-md">
                <table className="w-full">
                  <tbody className="divide-y divide-gray-100">
                    {Object.entries(product.measurements).map(([key, value]) => (
                      <tr key={key}>
                        <td className="py-3 text-gray-500">{measurementLabels[key] || key}</td>
                        <td className="py-3 font-medium text-gray-900">{value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <p className="mt-4 text-sm text-gray-400">* 측정 방법에 따라 1-3cm 오차가 있을 수 있습니다</p>
              </div>
            </TabsContent>
            <TabsContent value="shipping" className="py-8">
              <ul className="space-y-2 text-gray-700">
                <li>배송비: 3,000원 (50,000원 이상 무료배송)</li>
                <li>배송 기간: 결제 후 2-3일 이내 출고</li>
                <li>교환/반품: 수령 후 7일 이내 가능</li>
                <li>중고 상품 특성상 단순 변심 반품 시 왕복 배송비가 부과됩니다</li>
              </ul>
            </TabsContent>
          </Tabs>

          {/* 추천 상품 */}
          {relatedProducts.length > 0 && (
            <div className="mt-20">
              <h2 className="text-xl font-bold text-gray-900 mb-8">이런 상품은 어떠세요?</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {relatedProducts.map((item) => (
                  <Link key={item.id} href={`/product/${item.id}`} className="group">
                    <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-gray-100 mb-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {item.isNew && (
                        <span className="absolute top-2 left-2 px-2 py-1 bg-primary text-white text-xs font-medium rounded-full">
                          NEW
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-gray-400">{item.brand}</span>
                    <h3 className="font-medium text-gray-900 group-hover:text-primary transition-colors">{item.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="font-bold">{item.price.toLocaleString()}원</span>
                      <span className="text-sm text-gray-400 line-through">{item.originalPrice.toLocaleString()}원</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </>
  )
}
