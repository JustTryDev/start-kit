"use client"

import { motion } from "framer-motion"
import { Shield, Droplets, Package, Smile } from "lucide-react"
import { ENVIRONMENT_STATS } from "@/lib/constants"

const icons = [Shield, Droplets, Package, Smile]

// 환경 영향 섹션
export function EnvironmentSection() {
  return (
    <section id="environment" className="py-24 bg-gradient-to-b from-green-50 to-white">
      <div className="max-w-[1100px] mx-auto px-6">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-sm font-medium text-primary text-center mb-3"
        >
          환경 영향
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl sm:text-4xl font-bold text-gray-900 text-center mb-16"
        >
          에코픽과 함께한<br />
          환경 보호 성과
        </motion.h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {ENVIRONMENT_STATS.map((item, index) => {
            const Icon = icons[index]
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 + 0.2 }}
                className="bg-white rounded-2xl p-6 text-center shadow-sm hover:shadow-lg transition-all hover:-translate-y-1"
              >
                <div className="w-14 h-14 mx-auto mb-4 bg-green-50 rounded-xl flex items-center justify-center">
                  <Icon className="w-7 h-7 text-primary" />
                </div>
                <div className="text-2xl font-bold text-primary mb-1">{item.value}</div>
                <div className="text-gray-900 font-medium mb-2">{item.label}</div>
                <p className="text-sm text-gray-500">{item.detail}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
