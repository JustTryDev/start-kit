"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Search, Recycle } from "lucide-react"
import { cn } from "@/lib/utils"
import { Footer } from "@/components/Footer"

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
    isNew: true
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
    isNew: false
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
    isNew: true
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
    isNew: false
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
    isNew: true
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
    isNew: false
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
    isNew: false
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
    isNew: true
  }
]

// 카테고리 목록
const categories = [
  { id: 'all', name: '전체' },
  { id: 'outer', name: '아우터' },
  { id: 'top', name: '상의' },
  { id: 'bottom', name: '하의' },
  { id: 'dress', name: '원피스' }
]

// 정렬 옵션
const sortOptions = [
  { id: 'newest', name: '최신순' },
  { id: 'price-low', name: '낮은 가격순' },
  { id: 'price-high', name: '높은 가격순' },
  { id: 'discount', name: '할인율순' }
]

// 스토어 페이지
export default function StorePage() {
  const [category, setCategory] = useState('all')
  const [sortBy, setSortBy] = useState('newest')
  const [search, setSearch] = useState('')

  // 상품 필터링 및 정렬
  const filteredProducts = products
    .filter(product => category === 'all' || product.category === category)
    .filter(product =>
      product.name.toLowerCase().includes(search.toLowerCase()) ||
      product.brand.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price
        case 'price-high':
          return b.price - a.price
        case 'discount':
          const discountA = (a.originalPrice - a.price) / a.originalPrice
          const discountB = (b.originalPrice - b.price) / b.originalPrice
          return discountB - discountA
        default:
          return b.id - a.id
      }
    })

  // 할인율 계산
  const getDiscountRate = (original: number, current: number) => {
    return Math.round((1 - current / original) * 100)
  }

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
            <Link href="/store" className="text-[15px] font-medium text-primary">스토어</Link>
            <Link href="/guide" className="text-[15px] font-medium text-gray-600 hover:text-gray-900">수거 가이드</Link>
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
            에코픽 스토어
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-600"
          >
            새 주인을 기다리는 옷들을 만나보세요.<br />
            모든 수익금은 환경 보호 활동에 사용됩니다.
          </motion.p>
        </div>
      </section>

      {/* 콘텐츠 */}
      <section className="py-12">
        <div className="max-w-[1100px] mx-auto px-6">
          {/* 필터 */}
          <div className="flex flex-col md:flex-row justify-between gap-6 mb-8">
            {/* 카테고리 탭 */}
            <div className="flex flex-wrap gap-2">
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setCategory(cat.id)}
                  className={cn(
                    "px-4 py-2 rounded-full text-sm font-medium transition-all",
                    category === cat.id
                      ? "bg-primary text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  )}
                >
                  {cat.name}
                </button>
              ))}
            </div>

            {/* 검색 및 정렬 */}
            <div className="flex gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="상품명, 브랜드 검색"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none w-full md:w-64"
                />
              </div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2.5 rounded-xl border border-gray-200 focus:border-primary outline-none"
              >
                {sortOptions.map(opt => (
                  <option key={opt.id} value={opt.id}>{opt.name}</option>
                ))}
              </select>
            </div>
          </div>

          {/* 상품 그리드 */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link href={`/product/${product.id}`} className="group block">
                    <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-gray-100 mb-3">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {product.isNew && (
                        <span className="absolute top-3 left-3 px-2.5 py-1 bg-primary text-white text-xs font-medium rounded-full">
                          NEW
                        </span>
                      )}
                      <span className="absolute top-3 right-3 px-2.5 py-1 bg-red-500 text-white text-xs font-medium rounded-full">
                        -{getDiscountRate(product.originalPrice, product.price)}%
                      </span>
                    </div>
                    <div>
                      <span className="text-xs text-gray-400 font-medium">{product.brand}</span>
                      <h3 className="font-medium text-gray-900 mt-1 group-hover:text-primary transition-colors">
                        {product.name}
                      </h3>
                      <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                        <span>{product.size}</span>
                        <span>·</span>
                        <span>상태 {product.condition}</span>
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="font-bold text-gray-900">{product.price.toLocaleString()}원</span>
                        <span className="text-sm text-gray-400 line-through">{product.originalPrice.toLocaleString()}원</span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="py-20 text-center">
              <Search className="w-16 h-16 mx-auto text-gray-300 mb-4" />
              <p className="text-gray-600 mb-2">검색 결과가 없습니다</p>
              <span className="text-sm text-gray-400">다른 검색어나 카테고리를 선택해 보세요</span>
            </div>
          )}

          {/* 결과 수 */}
          <div className="mt-8 text-center text-sm text-gray-500">
            총 <strong className="text-gray-900">{filteredProducts.length}</strong>개의 상품
          </div>
        </div>
      </section>

      {/* 푸터 */}
      <Footer />
    </>
  )
}
