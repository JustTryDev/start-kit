"use client"

import { motion } from "framer-motion"
import { REVIEWS_ROW1, REVIEWS_ROW2, type Review } from "@/lib/constants"
import { Star } from "lucide-react"

// 리뷰 카드 컴포넌트
function ReviewCard({ review }: { review: Review }) {
  return (
    <div className="flex-shrink-0 w-80 bg-white rounded-2xl p-6 shadow-sm mx-3">
      <div className="flex justify-between items-start mb-4">
        <div>
          <span className="font-semibold text-gray-900">{review.name}</span>
          <span className="ml-2 text-sm text-gray-500">{review.location}</span>
        </div>
        <div className="flex text-yellow-400">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${i < review.rating ? 'fill-current' : 'fill-none stroke-current'}`}
            />
          ))}
        </div>
      </div>
      <p className="text-gray-700 leading-relaxed mb-3">&ldquo;{review.text}&rdquo;</p>
      <span className="text-sm text-gray-400">{review.date}</span>
    </div>
  )
}

// 마키 슬라이더 컴포넌트
function MarqueeRow({ reviews, direction }: { reviews: Review[]; direction: 'left' | 'right' }) {
  // 무한 스크롤을 위해 리뷰 복제
  const duplicatedReviews = [...reviews, ...reviews]

  return (
    <div className="overflow-hidden py-2">
      <motion.div
        className="flex"
        animate={{
          x: direction === 'left' ? ['0%', '-50%'] : ['-50%', '0%']
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: 'loop',
            duration: 30,
            ease: 'linear'
          }
        }}
      >
        {duplicatedReviews.map((review, index) => (
          <ReviewCard key={index} review={review} />
        ))}
      </motion.div>
    </div>
  )
}

// 리뷰 섹션
export function ReviewSection() {
  return (
    <section id="review" className="py-24 overflow-hidden">
      <div className="max-w-[1100px] mx-auto px-6 mb-12">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-sm font-medium text-primary text-center mb-3"
        >
          고객 후기
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl sm:text-4xl font-bold text-gray-900 text-center"
        >
          에코픽을 이용한<br />
          고객님들의 이야기
        </motion.h2>
      </div>

      {/* 마키 슬라이더 영역 */}
      <div className="relative">
        {/* 좌우 페이드 효과 */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        {/* 첫 번째 줄 (왼쪽으로) */}
        <MarqueeRow reviews={REVIEWS_ROW1} direction="left" />

        {/* 두 번째 줄 (오른쪽으로) */}
        <MarqueeRow reviews={REVIEWS_ROW2} direction="right" />
      </div>
    </section>
  )
}
