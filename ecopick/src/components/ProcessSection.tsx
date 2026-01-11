"use client"

import { motion } from "framer-motion"
import { PROCESS_STEPS } from "@/lib/constants"

// 프로세스 단계 섹션
export function ProcessSection() {
  return (
    <section id="process" className="py-24 bg-gray-100">
      <div className="max-w-[1100px] mx-auto px-6">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-sm font-bold text-primary text-center mb-3 uppercase tracking-wider"
        >
          수거 과정
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-[30px] md:text-[36px] lg:text-[44px] font-extrabold text-gray-900 text-center mb-10 md:mb-16 tracking-[-1px] md:tracking-[-1.5px]"
        >
          3단계면 충분해요
        </motion.h2>

        <div className="flex flex-col md:flex-row items-start justify-center">
          {PROCESS_STEPS.map((step, index) => (
            <div key={index} className="flex flex-col md:flex-row items-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 + 0.2 }}
                className="flex flex-col items-center text-center w-[280px]"
              >
                {/* 숫자 원 - pulse 애니메이션 적용 */}
                <div className="step-number-enhanced w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center text-2xl font-extrabold mb-7">
                  {step.num}
                </div>
                <h3 className="text-[22px] font-bold text-gray-900 mb-3 tracking-[-0.5px]">{step.title}</h3>
                <p className="text-[15px] text-gray-600 whitespace-pre-line leading-relaxed">{step.desc}</p>
              </motion.div>

              {/* 연결선 (마지막 제외) */}
              {index < PROCESS_STEPS.length - 1 && (
                <motion.div
                  initial={{ opacity: 0, scaleX: 0 }}
                  whileInView={{ opacity: 1, scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15 + 0.3 }}
                  className="hidden md:block w-[60px] h-0.5 bg-gradient-to-r from-primary to-gray-300 mt-8 -mx-2.5"
                />
              )}

              {/* 모바일 연결선 */}
              {index < PROCESS_STEPS.length - 1 && (
                <motion.div
                  initial={{ opacity: 0, scaleY: 0 }}
                  whileInView={{ opacity: 1, scaleY: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15 + 0.3 }}
                  className="md:hidden w-0.5 h-10 bg-gradient-to-b from-primary to-gray-300 my-4"
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
