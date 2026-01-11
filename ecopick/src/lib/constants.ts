// 에코픽 상수 정의

// 가능 지역 목록
export const AVAILABLE_REGIONS = [
  '부천', '안산', '오류동', '개봉동', '고척동', '항동', '궁동', '수궁동',
  '부개동', '삼산동', '은계'
]

// 제외 지역 목록
export const EXCLUDED_REGIONS = ['거북섬', '대부도']

// FAQ 카테고리
export const FAQ_CATEGORIES = [
  { id: 'all', name: '전체' },
  { id: 'reservation', name: '예약/상담' },
  { id: 'region', name: '수거 지역/기준' },
  { id: 'possible', name: '수거 가능 품목' },
  { id: 'impossible', name: '수거 불가 품목' }
] as const

export type FaqCategory = typeof FAQ_CATEGORIES[number]['id']

// FAQ 데이터
export interface FaqItem {
  category: FaqCategory
  question: string
  answer: string
}

export const FAQS: FaqItem[] = [
  // 예약/상담
  {
    category: 'reservation',
    question: "전화 상담이 가능한가요?",
    answer: "네, 가능합니다. 예약 문의 외 일반 전화 상담은 오전 7시부터 오후 7시까지 운영됩니다."
  },
  {
    category: 'reservation',
    question: "당일 방문 수거가 가능한가요?",
    answer: "에코픽은 예약제로 운영되며, 최소 하루 전 예약이 필요합니다."
  },
  {
    category: 'reservation',
    question: "방문 수거 가능 시간은 어떻게 되나요?",
    answer: "방문 수거는 오전 7시부터 오후 4시까지 가능합니다."
  },
  {
    category: 'reservation',
    question: "비대면 수거 신청이 가능한가요?",
    answer: "네, 가능합니다. 전날 저녁에 문 앞에 놓아주시고, 사진을 찍어 전송해 주세요. 수거 후 저울로 계량한 사진을 보내드리고, 정산 금액을 계좌로 송금해 드립니다."
  },
  // 수거 지역/기준
  {
    category: 'region',
    question: "서비스 가능 지역은 어디인가요?",
    answer: "현재 방문 수거 가능 지역은 부천 전지역, 안산 전지역(거북섬·대부도 제외), 서울(오류동, 개봉동, 고척동, 항동, 궁동, 수궁동), 인천 부평구(부개동, 삼산동), 시흥 은계지구입니다."
  },
  {
    category: 'region',
    question: "방문 수거 신청 기준이 있나요?",
    answer: "네, 기본 품목(헌옷, 신발, 가방) 기준 20KG 이상부터 방문 수거가 가능합니다."
  },
  {
    category: 'region',
    question: "헌옷 20KG은 대략 어느 정도의 양인가요?",
    answer: "50L 종량제 봉투 약 4개, 또는 75L 봉투 2~3개 분량이 대략 20KG 전후입니다."
  },
  {
    category: 'region',
    question: "엘리베이터가 없는 곳도 수거가 가능한가요?",
    answer: "네, 가능합니다. 다만 양이 많을 경우 1층에 미리 내려주시거나, 수거 시 함께 내려주셔야 합니다."
  },
  // 수거 가능 품목
  {
    category: 'possible',
    question: "기본 수거 품목은 무엇인가요?",
    answer: "헌옷, 신발, 가방이 기본 수거 품목입니다."
  },
  {
    category: 'possible',
    question: "모자, 스카프, 벨트 등 잡화류도 수거되나요?",
    answer: "네, 가능합니다. 모자, 목도리, 스카프, 벨트, 선글라스, 장갑, 양말, 속옷 등 착용 가능한 모든 잡화 품목을 수거합니다."
  },
  {
    category: 'possible',
    question: "기본 품목 외에 추가로 수거 가능한 품목이 있나요?",
    answer: "네, 기본 품목 20KG 이상일 때 함께 수거 가능합니다: 얇은 이불, 커튼, 카펫, 소형 인형(30cm 이하), 여행용 캐리어(바퀴 정상), 소형 가전류(프린터/안마기 제외), 컴퓨터 본체/노트북/모니터, 헌책, 만화책, CD, LP판, 냄비, 후라이팬, 스텐 제품, 음료수캔, 전선류"
  },
  {
    category: 'possible',
    question: "이불도 수거되나요?",
    answer: "얇은 이불만 무상 수거 가능하며, 솜이 들어간 이불은 수거 불가합니다."
  },
  {
    category: 'possible',
    question: "인형도 수거되나요?",
    answer: "30cm 이하 소형 인형에 한해 무상 수거 가능합니다."
  },
  {
    category: 'possible',
    question: "헌책만 수거 신청이 가능한가요?",
    answer: "아니요, 기본 품목(헌옷, 신발, 가방)이 20KG 이상 있어야 헌책도 함께 수거 가능합니다. 헌책은 노끈으로 묶거나 라면박스 크기 박스에 포장해 주세요. 박스당 20KG 초과 시 수거 거부될 수 있으며, 엘리베이터 없는 경우 1층으로 내려주셔야 합니다."
  },
  // 수거 불가 품목
  {
    category: 'impossible',
    question: "방문 수거가 불가한 품목은 무엇인가요?",
    answer: "솜이불, 솜베개, 목쿠션, 라텍스, 토퍼, 바닥패드, 전기장판, 바퀴 달린 신발, 겨울 털신발, 패딩부츠, 기모신발, 곰팡이가 핀 의류/신발/가방, 심한 얼룩/찢어진 의류, 동물 털이 심하게 묻은 의류, 경화되어 가루가 떨어지는 레자 제품은 수거 불가합니다."
  },
  {
    category: 'impossible',
    question: "카시트도 수거되나요?",
    answer: "아니요, 카시트는 수거 불가 품목입니다."
  },
  {
    category: 'impossible',
    question: "아이들 장난감도 수거되나요?",
    answer: "아니요, 장난감은 수거 불가 품목입니다."
  }
]

// 리뷰 데이터
export interface Review {
  name: string
  location: string
  rating: number
  text: string
  date: string
}

export const REVIEWS_ROW1: Review[] = [
  {
    name: '김지은',
    location: '서울 강남구',
    rating: 5,
    text: '이사하면서 안 입는 옷들이 많았는데, 에코픽 덕분에 깔끔하게 정리하고 용돈까지 받았어요!',
    date: '2024.12.15'
  },
  {
    name: '박민수',
    location: '경기 성남시',
    rating: 5,
    text: '환경도 지키고 돈도 벌 수 있어서 일석이조예요. 수거 기사님도 친절하시고, 정산도 빨라서 만족합니다.',
    date: '2024.12.10'
  },
  {
    name: '이수진',
    location: '인천 연수구',
    rating: 5,
    text: '옷장에 쌓여있던 옷들 정리하니 너무 시원해요. 다음에도 또 이용할게요!',
    date: '2024.12.08'
  },
  {
    name: '최영호',
    location: '서울 마포구',
    rating: 4,
    text: '아이 옷이 계속 작아져서 고민이었는데, 에코픽으로 한번에 해결했어요.',
    date: '2024.12.05'
  }
]

export const REVIEWS_ROW2: Review[] = [
  {
    name: '정미영',
    location: '경기 수원시',
    rating: 5,
    text: '카카오톡으로 진행 상황 알려주셔서 안심이 됐어요. 정산 금액도 생각보다 많이 나왔습니다!',
    date: '2024.11.28'
  },
  {
    name: '한상우',
    location: '서울 송파구',
    rating: 5,
    text: '버리기엔 아깝고 팔기엔 귀찮았던 옷들, 에코픽이 다 가져가니 속 시원해요.',
    date: '2024.11.25'
  },
  {
    name: '윤서연',
    location: '경기 고양시',
    rating: 5,
    text: '시간 약속도 잘 지켜주시고 친절하게 응대해주셔서 좋았어요. 강력 추천합니다!',
    date: '2024.11.20'
  },
  {
    name: '장현우',
    location: '서울 영등포구',
    rating: 5,
    text: '묵혀둔 옷들 정리하고 환경도 지키고 돈도 받고! 완전 좋아요.',
    date: '2024.11.15'
  }
]

// 서비스 정보
export const SERVICES = [
  {
    title: "간편 수거",
    desc: "원하는 날짜에 문 앞에서\n편리하게 수거해 가요"
  },
  {
    title: "책임 재활용",
    desc: "수거된 의류는 상태에 따라\n기부, 업사이클링, 재활용됩니다"
  },
  {
    title: "현금 정산",
    desc: "수거된 의류에 따라\n현금으로 정산해 드려요"
  }
]

// 프로세스 단계
export const PROCESS_STEPS = [
  { num: 1, title: "수거 신청", desc: "원하는 날짜와 시간을 선택하고\n주소를 입력해 주세요" },
  { num: 2, title: "옷 준비", desc: "안 입는 옷을 봉투에 담아\n문 앞에 두세요" },
  { num: 3, title: "수거 완료", desc: "에코픽이 수거 후\n재활용 리포트를 보내드려요" }
]

// 환경 영향 데이터
export const ENVIRONMENT_STATS = [
  {
    value: '64톤',
    label: '탄소 절감량',
    detail: '승용차 약 27대가 1년간 배출하는 CO2와 동일'
  },
  {
    value: '2,560만L',
    label: '물 절약량',
    detail: '수영장 약 10개를 채울 수 있는 양'
  },
  {
    value: '127,849벌',
    label: '수거된 의류',
    detail: '매립되었을 옷들이 새 생명을 얻었습니다'
  },
  {
    value: '32,451명',
    label: '참여 고객',
    detail: '함께 환경을 지키는 에코픽 가족'
  }
]

// 시간대 옵션
export const TIME_OPTIONS = [
  { value: '', label: '시간대 선택' },
  { value: '오전 (07:00-10:00)', label: '오전 (07:00-10:00)' },
  { value: '오전 (10:00-12:00)', label: '오전 (10:00-12:00)' },
  { value: '오후 (12:00-14:00)', label: '오후 (12:00-14:00)' },
  { value: '오후 (14:00-16:00)', label: '오후 (14:00-16:00)' }
]

// Google Apps Script URL (폼 제출용)
export const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwe0kebW-bhj-VksubN6YZ2oc14UFNb5a82yxr_RV6QyUCZ2jBd6tYErbpPDXXFPkfv/exec'
