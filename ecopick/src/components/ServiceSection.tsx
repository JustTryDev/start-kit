"use client"

import { motion } from "framer-motion"
import { Package, RefreshCcw, DollarSign } from "lucide-react"

const services = [
  {
    icon: Package,
    title: "간편 수거",
    desc: "원하는 날짜에 문 앞에서\n편리하게 수거해 가요"
  },
  {
    icon: RefreshCcw,
    title: "책임 재활용",
    desc: "수거된 의류는 상태에 따라\n기부, 업사이클링, 재활용됩니다"
  },
  {
    icon: DollarSign,
    title: "현금 정산",
    desc: "수거된 의류에 따라\n현금으로 정산해 드려요"
  }
]

// 서비스 소개 섹션
export function ServiceSection() {
  return (
    <section id="service" className="py-24 bg-gray-50">
      <div className="max-w-[1100px] mx-auto px-6">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-sm font-medium text-primary text-center mb-3"
        >
          서비스 소개
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-[30px] md:text-[36px] lg:text-[44px] font-extrabold text-gray-900 text-center mb-10 md:mb-16 tracking-[-1px] md:tracking-[-1.5px] leading-tight"
        >
          버려지는 옷에<br />
          새로운 가치를 더합니다
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 + 0.2 }}
              className="service-card-enhanced bg-gray-100 rounded-3xl p-12 text-center"
            >
              <div className="service-icon-enhanced w-[72px] h-[72px] mx-auto mb-6 bg-white rounded-[20px] flex items-center justify-center">
                <service.icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-[22px] font-bold text-gray-900 mb-3 tracking-[-0.5px]">{service.title}</h3>
              <p className="text-[15px] text-gray-600 whitespace-pre-line leading-relaxed">{service.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
