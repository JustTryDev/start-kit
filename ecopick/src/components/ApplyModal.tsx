"use client"

import { useState, useRef } from "react"
import { X, Check, ChevronDown, AlertTriangle } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import {
  AVAILABLE_REGIONS,
  EXCLUDED_REGIONS,
  TIME_OPTIONS,
  GOOGLE_SCRIPT_URL
} from "@/lib/constants"

declare global {
  interface Window {
    daum: {
      Postcode: new (options: {
        oncomplete: (data: DaumPostcodeData) => void
        onclose?: () => void
        width?: string
        height?: string
      }) => {
        embed: (element: HTMLElement) => void
      }
    }
  }
}

interface DaumPostcodeData {
  address: string
  addressType: string
  bname: string
  buildingName: string
}

interface ApplyModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

// 수거 신청 모달
export function ApplyModal({ open, onOpenChange }: ApplyModalProps) {
  // 폼 상태
  const [pickupType, setPickupType] = useState('')
  const [address, setAddress] = useState('')
  const [addressDetail, setAddressDetail] = useState('')
  const [phone, setPhone] = useState('')
  const [preferredDate, setPreferredDate] = useState('')
  const [preferredTime, setPreferredTime] = useState('')
  const [entrancePassword, setEntrancePassword] = useState('')
  const [vehicleRegistration, setVehicleRegistration] = useState('')

  // 계산기 상태
  const [clothesKg, setClothesKg] = useState(0)
  const [shoesKg, setShoesKg] = useState(0)
  const [bagsKg, setBagsKg] = useState(0)
  const [panKg, setPanKg] = useState(0)
  const [computerCount, setComputerCount] = useState(0)
  const [monitorCount, setMonitorCount] = useState(0)
  const [phoneCount, setPhoneCount] = useState(0)
  const [duckdownKg, setDuckdownKg] = useState(0)

  // UI 상태
  const [isAddressOpen, setIsAddressOpen] = useState(false)
  const [isAdditionalOpen, setIsAdditionalOpen] = useState(false)
  const [isGuideOpen, setIsGuideOpen] = useState(false)
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false)
  const [regionStatus, setRegionStatus] = useState<'available' | 'unavailable' | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  // 에러 상태
  const [formErrors, setFormErrors] = useState({
    pickupType: '',
    address: '',
    phone: '',
    preferredDate: ''
  })

  const addressLayerRef = useRef<HTMLDivElement>(null)

  // 계산
  const basicTotalKg = clothesKg + shoesKg + bagsKg
  const basicPrice = (clothesKg * 350) + (shoesKg * 400) + (bagsKg * 700)
  const additionalPrice = (panKg * 200) + (computerCount * 3000) + (monitorCount * 1000) + (phoneCount * 500) + (duckdownKg * 1000)
  const isFreePickup = basicTotalKg > 0 && basicTotalKg <= 20
  const estimatedPrice = isFreePickup ? additionalPrice : basicPrice + additionalPrice
  const isMinimumMet = basicTotalKg > 0

  // 지역 검증
  const checkRegion = (addr: string) => {
    if (!addr) {
      setRegionStatus(null)
      return
    }
    const isExcluded = EXCLUDED_REGIONS.some(region => addr.includes(region))
    if (isExcluded) {
      setRegionStatus('unavailable')
      return
    }
    const isAvailable = AVAILABLE_REGIONS.some(region => addr.includes(region))
    setRegionStatus(isAvailable ? 'available' : 'unavailable')
  }

  // 일요일 체크
  const isSunday = (dateString: string) => {
    const date = new Date(dateString)
    return date.getDay() === 0
  }

  // 날짜 변경 핸들러
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = e.target.value
    if (isSunday(selectedDate)) {
      alert('일요일은 휴무일입니다. 다른 날짜를 선택해주세요.')
      return
    }
    setPreferredDate(selectedDate)
    if (formErrors.preferredDate) {
      setFormErrors(prev => ({ ...prev, preferredDate: '' }))
    }
  }

  // 연락처 검증
  const validatePhone = (value: string) => {
    const phoneRegex = /^01[0-9]-?[0-9]{3,4}-?[0-9]{4}$/
    return phoneRegex.test(value)
  }

  // 폼 검증
  const validateForm = () => {
    const errors = {
      pickupType: '',
      address: '',
      phone: '',
      preferredDate: ''
    }
    let isValid = true

    if (!pickupType) {
      errors.pickupType = '수거 유형을 선택해주세요.'
      isValid = false
    }
    if (!address) {
      errors.address = '방문지 주소를 입력해주세요.'
      isValid = false
    }
    if (!phone) {
      errors.phone = '연락처를 입력해주세요.'
      isValid = false
    } else if (!validatePhone(phone)) {
      errors.phone = '올바른 연락처 형식이 아닙니다.'
      isValid = false
    }
    if (!preferredDate) {
      errors.preferredDate = '희망 날짜를 선택해주세요.'
      isValid = false
    }

    setFormErrors(errors)
    return isValid
  }

  // 주소 검색
  const openAddressSearch = () => {
    setIsAddressOpen(true)
    setTimeout(() => {
      if (addressLayerRef.current && window.daum) {
        new window.daum.Postcode({
          oncomplete: function(data) {
            let fullAddress = data.address
            let extraAddress = ''

            if (data.addressType === 'R') {
              if (data.bname !== '') extraAddress += data.bname
              if (data.buildingName !== '') {
                extraAddress += (extraAddress !== '' ? ', ' + data.buildingName : data.buildingName)
              }
              fullAddress += (extraAddress !== '' ? ` (${extraAddress})` : '')
            }

            setAddress(fullAddress)
            checkRegion(fullAddress)
            setIsAddressOpen(false)
          },
          onclose: function() {
            setIsAddressOpen(false)
          },
          width: '100%',
          height: '100%'
        }).embed(addressLayerRef.current)
      }
    }, 100)
  }

  // 폼 제출
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    setIsSubmitting(true)

    const formData = {
      pickupType: pickupType === 'visit' ? '대면 수거' : '비대면 수거',
      address,
      addressDetail,
      phone,
      clothesKg: `${clothesKg}KG`,
      shoesKg: `${shoesKg}KG`,
      bagsKg: `${bagsKg}KG`,
      panKg: `${panKg}KG`,
      computerCount: `${computerCount}대`,
      monitorCount: `${monitorCount}대`,
      phoneCount: `${phoneCount}개`,
      duckdownKg: `${duckdownKg}KG`,
      basicTotalKg: `${basicTotalKg}KG`,
      pickupFeeType: isFreePickup ? '무상수거' : '유상수거',
      basicPrice: `${basicPrice.toLocaleString()}원`,
      additionalPrice: `${additionalPrice.toLocaleString()}원`,
      estimatedPrice: `${estimatedPrice.toLocaleString()}원`,
      preferredDate,
      preferredTime,
      entrancePassword,
      vehicleRegistration
    }

    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      setIsSubmitted(true)
    } catch (error) {
      console.error('제출 오류:', error)
      alert('신청 중 오류가 발생했습니다. 다시 시도해주세요.')
    } finally {
      setIsSubmitting(false)
    }
  }

  // 모달 닫기 시 초기화
  const handleClose = () => {
    onOpenChange(false)
    setTimeout(() => {
      setIsSubmitted(false)
      setPickupType('')
      setAddress('')
      setAddressDetail('')
      setPhone('')
      setPreferredDate('')
      setPreferredTime('')
      setEntrancePassword('')
      setVehicleRegistration('')
      setClothesKg(0)
      setShoesKg(0)
      setBagsKg(0)
      setPanKg(0)
      setComputerCount(0)
      setMonitorCount(0)
      setPhoneCount(0)
      setDuckdownKg(0)
      setIsAdditionalOpen(false)
      setIsGuideOpen(false)
      setIsCalculatorOpen(false)
      setRegionStatus(null)
      setFormErrors({ pickupType: '', address: '', phone: '', preferredDate: '' })
    }, 300)
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-[520px] max-h-[calc(100vh-48px)] overflow-y-auto p-12 rounded-3xl shadow-[0_24px_48px_rgba(0,0,0,0.2)]">
        {isSubmitted ? (
          // 신청 완료 화면
          <div className="py-8 text-center">
            <div className="w-20 h-20 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center">
              <Check className="w-10 h-10 text-primary" />
            </div>
            <DialogHeader className="space-y-3">
              <DialogTitle className="text-[32px] font-extrabold text-center tracking-tight">
                신청이 완료되었습니다!
              </DialogTitle>
              <DialogDescription className="text-base text-gray-700 text-center leading-relaxed">
                24시간 이내에 확인 연락을 드리겠습니다.<br />감사합니다.
              </DialogDescription>
            </DialogHeader>
            <div className="mt-8 p-4 bg-yellow-50 rounded-xl text-sm text-yellow-800">
              카카오톡으로 발송된 [담당 기사 배정] 버튼을 클릭해 주세요.
            </div>
            <Button onClick={handleClose} className="mt-8 w-full py-6 text-base font-semibold">
              확인
            </Button>
          </div>
        ) : (
          // 신청 폼
          <>
            <DialogHeader className="space-y-3 mb-8">
              <DialogTitle className="text-[32px] font-extrabold text-center tracking-tight">
                수거 신청
              </DialogTitle>
              <DialogDescription className="text-base text-gray-700 text-center leading-relaxed">
                옷장 정리하고 용돈도 벌어가세요
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* 유형 선택 */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-900">
                  유형 <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {['visit', 'contactless'].map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => {
                        setPickupType(type)
                        if (formErrors.pickupType) setFormErrors(prev => ({ ...prev, pickupType: '' }))
                      }}
                      className={cn(
                        "py-3.5 px-4 rounded-xl border-2 text-[15px] font-medium transition-all",
                        pickupType === type
                          ? "border-primary bg-[rgba(27,94,32,0.05)] text-primary font-semibold"
                          : "border-gray-200 text-gray-700 hover:border-gray-400"
                      )}
                    >
                      {type === 'visit' ? '대면 수거' : '비대면 수거'}
                    </button>
                  ))}
                </div>
                {formErrors.pickupType && (
                  <p className="mt-2 text-sm text-red-500 flex items-center gap-1">
                    <span className="font-bold">!</span> {formErrors.pickupType}
                  </p>
                )}
              </div>

              {/* 주소 */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-900">
                  방문지 주소 <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="주소 검색 (클릭)"
                    value={address}
                    onClick={() => {
                      openAddressSearch()
                      if (formErrors.address) setFormErrors(prev => ({ ...prev, address: '' }))
                    }}
                    readOnly
                    className={cn(
                      "w-full px-4 py-3.5 rounded-xl border-2 cursor-pointer text-[15px] transition-colors",
                      formErrors.address && !address ? "border-red-300" : "border-gray-200 hover:border-gray-300"
                    )}
                  />
                  {isAddressOpen && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-xl border-2 border-gray-200 z-50 overflow-hidden shadow-lg">
                      <div className="flex items-center justify-between px-4 py-3 border-b bg-gray-100">
                        <span className="text-sm font-semibold">주소 검색</span>
                        <button type="button" onClick={() => setIsAddressOpen(false)} className="text-gray-500 hover:text-gray-900">
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                      <div ref={addressLayerRef} className="h-[300px]" />
                    </div>
                  )}
                </div>
                <input
                  type="text"
                  placeholder="상세 주소 입력"
                  value={addressDetail}
                  onChange={(e) => setAddressDetail(e.target.value)}
                  className="w-full px-4 py-3.5 rounded-xl border-2 border-gray-200 text-[15px] hover:border-gray-300 transition-colors"
                />
                {regionStatus === 'available' && (
                  <div className="flex items-center gap-2 px-3.5 py-2.5 bg-green-50 rounded-lg text-sm font-medium text-green-700">
                    <span className="font-bold">✓</span> 수거 가능 지역입니다
                  </div>
                )}
                {regionStatus === 'unavailable' && (
                  <div className="flex items-center gap-2 px-3.5 py-2.5 bg-red-50 rounded-lg text-sm font-medium text-red-700">
                    <span className="font-bold">✕</span> 현재 수거 불가 지역입니다
                  </div>
                )}
                {formErrors.address && !address && (
                  <p className="text-sm text-red-500 flex items-center gap-1">
                    <span className="font-bold">!</span> {formErrors.address}
                  </p>
                )}
              </div>

              {/* 연락처 */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-900">
                  연락처 <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  placeholder="010-0000-0000"
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value)
                    if (formErrors.phone) setFormErrors(prev => ({ ...prev, phone: '' }))
                  }}
                  className={cn(
                    "w-full px-4 py-3.5 rounded-xl border-2 text-[15px] transition-colors",
                    formErrors.phone ? "border-red-300" : "border-gray-200 hover:border-gray-300"
                  )}
                />
                {formErrors.phone && (
                  <p className="text-sm text-red-500 flex items-center gap-1">
                    <span className="font-bold">!</span> {formErrors.phone}
                  </p>
                )}
              </div>

              {/* 희망 날짜/시간 */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-900">
                  희망 날짜 및 시간 <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="date"
                    value={preferredDate}
                    onChange={handleDateChange}
                    onKeyDown={(e) => e.preventDefault()}
                    className={cn(
                      "px-4 py-3.5 rounded-xl border-2 text-[15px] transition-colors",
                      formErrors.preferredDate && !preferredDate ? "border-red-300" : "border-gray-200 hover:border-gray-300"
                    )}
                  />
                  <select
                    value={preferredTime}
                    onChange={(e) => setPreferredTime(e.target.value)}
                    className="px-4 py-3.5 rounded-xl border-2 border-gray-200 text-[15px] hover:border-gray-300 transition-colors"
                  >
                    {TIME_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                </div>
                {formErrors.preferredDate && !preferredDate && (
                  <p className="text-sm text-red-500 flex items-center gap-1">
                    <span className="font-bold">!</span> {formErrors.preferredDate}
                  </p>
                )}
                <p className="text-[13px] text-gray-600 leading-relaxed">
                  당일 수거량과 교통 상황에 따라 희망 시간에 수거가 불가능할 수 있습니다.
                  비대면 수거가 가능하오니, 문 앞에 놓아주시면 최대한 빠르게 수거해드리겠습니다.
                </p>
              </div>

              {/* 기타 특이사항 */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-900">기타 특이사항</label>
                <input
                  type="text"
                  placeholder="공동현관 비밀번호 (비대면 수거시)"
                  value={entrancePassword}
                  onChange={(e) => setEntrancePassword(e.target.value)}
                  className="w-full px-4 py-3.5 rounded-xl border-2 border-gray-200 text-[15px] hover:border-gray-300 transition-colors"
                />
                <input
                  type="text"
                  placeholder="아파트 출입 차량 사전 등록 (필요시)"
                  value={vehicleRegistration}
                  onChange={(e) => setVehicleRegistration(e.target.value)}
                  className="w-full px-4 py-3.5 rounded-xl border-2 border-gray-200 text-[15px] hover:border-gray-300 transition-colors"
                />
              </div>

              {/* 계산기 아코디언 */}
              <div className="bg-gray-100 rounded-2xl overflow-hidden">
                <button
                  type="button"
                  onClick={() => setIsCalculatorOpen(!isCalculatorOpen)}
                  className="w-full flex items-center justify-between p-5 hover:bg-gray-150 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-lg">🧮</span>
                    <span className="font-semibold text-gray-900">예상 정산 금액 계산</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-primary text-lg">{estimatedPrice.toLocaleString()}원</span>
                    <span className="text-xl text-gray-500">{isCalculatorOpen ? '−' : '+'}</span>
                  </div>
                </button>

                {isCalculatorOpen && (
                  <div className="px-5 pb-5 space-y-4">
                    {/* 20kg 가이드 */}
                    <div>
                      <button
                        type="button"
                        onClick={() => setIsGuideOpen(!isGuideOpen)}
                        className="flex items-center gap-2 text-sm text-primary hover:underline"
                      >
                        <span>💡</span>
                        <span>20kg이 얼마나 될까요?</span>
                        <span className={cn("transition-transform", isGuideOpen && "rotate-180")}>▼</span>
                      </button>
                      {isGuideOpen && (
                        <div className="mt-3 p-4 bg-white rounded-xl space-y-3">
                          <img
                            src="https://img.kr.gcp-karroter.net/business-profile/bizPlatform/profile/100580618/1756421405553/YmM2MWRiNzBiZmQ2YTM0ZDhlYWNlNWFkMjZjMTFkNjRmODMzYWY1MzVkMjVkYThkNDliMjU4MmU2ZGRkNWNhMl8wLmpwZWc=.jpeg?q=95&s=1440x1440&t=inside"
                            alt="다이소 90L 재활용봉투"
                            className="w-full rounded-lg"
                          />
                          <div className="flex items-center gap-2 text-sm">
                            <span>🛍️</span>
                            <span>다이소 90L 재활용봉투 <strong>3~4개</strong> ≈ 20kg</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <span>📦</span>
                            <span>김장용 비닐 <strong>3~4개</strong> ≈ 20kg</span>
                          </div>
                          <p className="text-xs text-gray-500 pt-2">
                            무게가 정확히 안 맞아도 괜찮아요!<br/>
                            연락 주시면 최대한 맞춰드립니다
                          </p>
                        </div>
                      )}
                    </div>

                    <p className="text-xs font-semibold text-gray-500 uppercase">기본 수거 품목 (필수)</p>

                    {/* 기본 품목 슬라이더 */}
                    {[
                      { label: '헌옷', emoji: '👕', price: '350원/KG', value: clothesKg, setValue: setClothesKg, max: 500 },
                      { label: '신발', emoji: '👟', price: '400원/KG', value: shoesKg, setValue: setShoesKg, max: 500 },
                      { label: '가방', emoji: '👜', price: '700원/KG', value: bagsKg, setValue: setBagsKg, max: 500 }
                    ].map((item, idx) => (
                      <div key={item.label} className={cn("py-3", idx < 2 && "border-b border-gray-200")}>
                        <div className="flex items-center justify-between text-sm mb-2">
                          <div className="flex items-center gap-2">
                            <span className="text-lg">{item.emoji}</span>
                            <span className="font-semibold">{item.label}</span>
                            <span className="text-xs text-gray-500">{item.price}</span>
                          </div>
                          <div className="flex items-center gap-1 bg-white border border-gray-300 rounded-lg px-2.5 py-1.5">
                            <input
                              type="number"
                              min="0"
                              max={item.max}
                              value={item.value}
                              onChange={(e) => item.setValue(Math.max(0, Math.min(item.max, Number(e.target.value) || 0)))}
                              className="w-12 text-right font-semibold text-sm border-none outline-none bg-transparent"
                            />
                            <span className="text-xs text-gray-500">KG</span>
                          </div>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max={item.max}
                          value={item.value}
                          onChange={(e) => item.setValue(Number(e.target.value))}
                          className="w-full calc-slider"
                        />
                      </div>
                    ))}

                    {/* 신발/가방 분류 안내 */}
                    {(shoesKg > 0 || bagsKg > 0) && (
                      <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg text-sm text-blue-700">
                        <span>ℹ️</span>
                        <span>신발 또는 가방은 별도로 분리해주셔야 합니다.</span>
                      </div>
                    )}

                    {/* 추가 품목 */}
                    <div>
                      <button
                        type="button"
                        onClick={() => setIsAdditionalOpen(!isAdditionalOpen)}
                        className="w-full flex items-center justify-between py-3 text-sm"
                      >
                        <div>
                          <span className="font-medium text-gray-700">추가 수거 품목 (선택)</span>
                          <span className="block text-xs text-gray-400 mt-1">🍳 냄비/후라이팬 · 💻 컴퓨터 · 🖥️ 모니터 · 📱 폐휴대폰 · 🛏️ 덕다운이불</span>
                        </div>
                        <span className="text-lg text-gray-500">{isAdditionalOpen ? '−' : '+'}</span>
                      </button>

                      {isAdditionalOpen && (
                        <div className="space-y-3 pt-2">
                          {[
                            { label: '후라이팬/냄비', emoji: '🍳', price: '200원/KG', value: panKg, setValue: setPanKg, max: 500, unit: 'KG' },
                            { label: '컴퓨터/노트북', emoji: '💻', price: '3,000원/대', value: computerCount, setValue: setComputerCount, max: 100, unit: '대' },
                            { label: '모니터', emoji: '🖥️', price: '1,000원/대', value: monitorCount, setValue: setMonitorCount, max: 100, unit: '대' },
                            { label: '폐휴대폰', emoji: '📱', price: '500원/개', value: phoneCount, setValue: setPhoneCount, max: 100, unit: '개' },
                            { label: '덕다운 이불', emoji: '🛏️', price: '1,000원/KG', value: duckdownKg, setValue: setDuckdownKg, max: 300, unit: 'KG' }
                          ].map((item) => (
                            <div key={item.label} className="flex items-center justify-between py-2 border-b border-gray-200 last:border-b-0">
                              <div className="flex items-center gap-2 text-sm">
                                <span>{item.emoji}</span>
                                <span className="font-medium">{item.label}</span>
                                <span className="text-xs text-gray-500">{item.price}</span>
                              </div>
                              <div className="flex items-center gap-1 bg-white border border-gray-300 rounded-lg px-2.5 py-1.5">
                                <input
                                  type="number"
                                  min="0"
                                  max={item.max}
                                  value={item.value}
                                  onChange={(e) => item.setValue(Math.max(0, Math.min(item.max, Number(e.target.value) || 0)))}
                                  className="w-12 text-right font-semibold text-sm border-none outline-none bg-transparent"
                                />
                                <span className="text-xs text-gray-500 w-5">{item.unit}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* 요약 */}
                    <div className="pt-4 border-t border-gray-200 space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">기본 품목 무게</span>
                        <span className="font-semibold">{basicTotalKg} KG</span>
                      </div>
                      {isFreePickup && (
                        <div className="flex justify-between text-green-600">
                          <span>기본 품목 정산</span>
                          <span className="font-semibold">무상 수거</span>
                        </div>
                      )}
                      {additionalPrice > 0 && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">추가 품목 정산</span>
                          <span>{additionalPrice.toLocaleString()}원</span>
                        </div>
                      )}
                      <div className="flex justify-between text-lg font-bold pt-3">
                        <span>예상 정산 금액</span>
                        <span className="text-primary">{estimatedPrice.toLocaleString()}원</span>
                      </div>
                    </div>

                    {/* 안내 메시지 */}
                    {isFreePickup && (
                      <div className="p-3 bg-green-50 rounded-lg text-sm text-green-700 flex items-center gap-2">
                        <Check className="w-4 h-4" />기본 품목 20kg 이하 무상 수거 대상입니다
                      </div>
                    )}
                    {!isMinimumMet && (
                      <div className="p-3 bg-yellow-50 rounded-lg text-sm text-yellow-700 flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4" />기본 품목(헌옷+신발+가방)을 1kg 이상 입력해주세요
                      </div>
                    )}
                  </div>
                )}
              </div>

              <Button
                type="submit"
                disabled={isSubmitting || regionStatus === 'unavailable' || !isMinimumMet}
                className="w-full py-6 text-base font-semibold rounded-xl"
              >
                {isSubmitting ? '신청 중...' : '수거 신청하기'}
              </Button>
              <p className="text-center text-[13px] text-gray-500">신청 후 24시간 이내에 확인 연락을 드립니다</p>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
