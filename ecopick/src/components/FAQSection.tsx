"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, X, ChevronDown } from "lucide-react"
import { FAQS, FAQ_CATEGORIES, type FaqCategory } from "@/lib/constants"
import { cn } from "@/lib/utils"

// FAQ 섹션
export function FaqSection() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [category, setCategory] = useState<FaqCategory>('all')
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const perPage = 5

  // 필터링된 FAQ
  const filteredFaqs = FAQS.filter(faq => {
    const matchCategory = category === 'all' || faq.category === category
    const searchLower = search.toLowerCase().trim()
    const matchSearch = !searchLower ||
      faq.question.toLowerCase().includes(searchLower) ||
      faq.answer.toLowerCase().includes(searchLower)
    return matchCategory && matchSearch
  })

  // 페이지네이션
  const totalPages = Math.ceil(filteredFaqs.length / perPage)
  const paginatedFaqs = filteredFaqs.slice((page - 1) * perPage, page * perPage)

  // 카테고리 변경 핸들러
  const handleCategoryChange = (cat: FaqCategory) => {
    setCategory(cat)
    setPage(1)
    setOpenFaq(null)
  }

  // 검색어 변경 핸들러
  const handleSearchChange = (value: string) => {
    setSearch(value)
    setPage(1)
    setOpenFaq(null)
  }

  return (
    <section id="faq" className="py-24 bg-gray-50">
      <div className="max-w-[800px] mx-auto px-6">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-sm font-medium text-primary text-center mb-3"
        >
          자주 묻는 질문
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-[30px] md:text-[36px] lg:text-[44px] font-extrabold text-gray-900 text-center mb-8 md:mb-10 tracking-[-1px] md:tracking-[-1.5px]"
        >
          궁금한 점이 있으신가요?
        </motion.h2>

        {/* 검색 입력 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="relative mb-6"
        >
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="궁금한 내용을 검색해보세요"
            value={search}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="w-full pl-12 pr-10 py-4 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
          />
          {search && (
            <button
              onClick={() => handleSearchChange('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </motion.div>

        {/* 카테고리 탭 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap gap-2 mb-8 justify-center"
        >
          {FAQ_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategoryChange(cat.id as FaqCategory)}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-all",
                category === cat.id
                  ? "bg-primary text-white"
                  : "bg-white text-gray-600 hover:bg-gray-100"
              )}
            >
              {cat.name}
            </button>
          ))}
        </motion.div>

        {/* 검색 결과 없음 */}
        {filteredFaqs.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 mb-2">검색 결과가 없습니다.</p>
            <span className="text-sm text-gray-400">다른 검색어로 시도해보세요.</span>
          </div>
        )}

        {/* FAQ 목록 */}
        <div className="space-y-3">
          {paginatedFaqs.map((faq, index) => (
            <motion.div
              key={`${category}-${page}-${index}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className={cn(
                "faq-item-enhanced bg-white rounded-2xl overflow-hidden",
                openFaq === index && "open"
              )}
            >
              <button
                onClick={() => setOpenFaq(openFaq === index ? null : index)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors"
              >
                <span className="text-[17px] font-semibold text-gray-900 pr-4">{faq.question}</span>
                <span className={cn(
                  "faq-toggle-enhanced w-7 h-7 flex items-center justify-center text-gray-400 text-2xl",
                  openFaq === index && "text-primary"
                )}>
                  +
                </span>
              </button>
              <AnimatePresence>
                {openFaq === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="px-7 pb-6 text-[15px] text-gray-600 leading-relaxed">{faq.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* 페이지네이션 */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-8">
            <button
              onClick={() => setPage(prev => Math.max(prev - 1, 1))}
              disabled={page === 1}
              className="w-10 h-10 rounded-lg bg-white border border-gray-200 text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
            >
              &lsaquo;
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => { setPage(p); setOpenFaq(null); }}
                className={cn(
                  "w-10 h-10 rounded-lg transition-colors",
                  page === p
                    ? "bg-primary text-white"
                    : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
                )}
              >
                {p}
              </button>
            ))}
            <button
              onClick={() => setPage(prev => Math.min(prev + 1, totalPages))}
              disabled={page === totalPages}
              className="w-10 h-10 rounded-lg bg-white border border-gray-200 text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
            >
              &rsaquo;
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
