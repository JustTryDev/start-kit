"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MessageCircle, X, Send, Bot, User } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface Message {
  id: number
  type: 'bot' | 'user'
  text: string
}

interface ChatbotProps {
  onApplyClick: () => void
}

// 챗봇 플로팅 버튼 및 채팅창
export function Chatbot({ onApplyClick }: ChatbotProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      type: 'bot',
      text: '안녕하세요! 에코픽입니다.\n헌옷 수거 관련 문의사항이 있으시면 편하게 연락주세요!'
    }
  ])
  const [input, setInput] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // 메시지 스크롤
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages])

  // 메시지 전송
  const handleSend = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    // 사용자 메시지 추가
    const userMessage: Message = {
      id: Date.now(),
      type: 'user',
      text: input
    }
    setMessages(prev => [...prev, userMessage])
    setInput('')

    // 봇 응답 (500ms 딜레이)
    setTimeout(() => {
      const botResponse: Message = {
        id: Date.now() + 1,
        type: 'bot',
        text: '현재 AI 챗봇 상담 서비스는 준비 중입니다. 최대한 빠른 시일 내에 준비하겠습니다.\n\n아래 "수거 신청하기" 버튼을 눌러 바로 신청하시거나, 전화/이메일로 문의해주세요!'
      }
      setMessages(prev => [...prev, botResponse])
    }, 500)
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* 플로팅 버튼 */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={cn(
          "w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-colors",
          isOpen ? "bg-gray-700" : "bg-primary hover:bg-[var(--color-primary-light)]"
        )}
      >
        {isOpen ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <MessageCircle className="w-6 h-6 text-white" />
        )}
      </motion.button>

      {/* 채팅창 */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-20 right-0 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl overflow-hidden"
          >
            {/* 헤더 */}
            <div className="bg-primary p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-white">에코픽 상담</h3>
                  <span className="text-xs text-green-200">상담 가능</span>
                </div>
                <button onClick={() => setIsOpen(false)} className="text-white/80 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* 메시지 영역 */}
            <div className="h-80 overflow-y-auto p-4 space-y-4 bg-gray-50">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    "flex gap-2",
                    message.type === 'user' && "flex-row-reverse"
                  )}
                >
                  {/* 아바타 */}
                  <div
                    className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0",
                      message.type === 'bot' ? "bg-green-100" : "bg-gray-200"
                    )}
                  >
                    {message.type === 'bot' ? (
                      <Bot className="w-4 h-4 text-primary" />
                    ) : (
                      <User className="w-4 h-4 text-gray-600" />
                    )}
                  </div>

                  {/* 메시지 버블 */}
                  <div
                    className={cn(
                      "max-w-[70%] px-4 py-2.5 rounded-2xl text-sm whitespace-pre-line",
                      message.type === 'bot'
                        ? "bg-white shadow-sm rounded-tl-none"
                        : "bg-primary text-white rounded-tr-none"
                    )}
                  >
                    {message.text}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* 입력 영역 */}
            <form onSubmit={handleSend} className="p-3 border-t border-gray-100">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="메시지를 입력하세요..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="flex-1 px-4 py-2.5 bg-gray-100 rounded-full text-sm outline-none focus:ring-2 focus:ring-primary/20"
                />
                <button
                  type="submit"
                  disabled={!input.trim()}
                  className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[var(--color-primary-light)] transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </form>

            {/* 수거 신청 버튼 */}
            <div className="p-3 pt-0">
              <Button
                onClick={() => {
                  setIsOpen(false)
                  onApplyClick()
                }}
                className="w-full"
              >
                수거 신청하기
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
