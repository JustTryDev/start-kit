# Claude Code 스타터킷

토큰 절약형 Next.js 스타터킷 - 팀 공유용 템플릿

## 기술 스택

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui
- **Icons**: Lucide Icons
- **Animation**: Framer Motion
- **State Management**: Zustand
- **Form**: React Hook Form + Zod

## 시작하기

### 1. 의존성 설치

```bash
npm install
```

### 2. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인하세요.

### 3. 환경변수 설정

`.env.example`을 복사하여 `.env.local` 파일을 생성하세요.

```bash
copy .env.example .env.local
```

## 폴더 구조

```
src/
├── app/                    # 페이지 라우팅
│   ├── layout.tsx          # 루트 레이아웃
│   ├── page.tsx            # 홈페이지
│   ├── globals.css         # 전역 스타일
│   └── playground/         # 라이브러리 테스트 페이지
├── components/
│   └── ui/                 # shadcn/ui 컴포넌트
├── config/
│   └── site.ts             # 사이트 설정 상수
├── hooks/                  # 커스텀 훅
└── lib/
    ├── utils.ts            # 유틸리티 함수 (cn)
    └── store.ts            # Zustand 스토어

.claude/
├── commands/               # 커스텀 명령어
│   ├── create-skill.md     # /create-skill
│   ├── create-agent.md     # /create-agent
│   ├── create-prd.md       # /create-prd
│   └── prd-prompt.md       # /prd-prompt
├── skills/                 # 스킬 가이드
│   ├── skill-creator/
│   ├── agent-creator/
│   └── prd-writer/
└── agents/                 # 커스텀 에이전트
    ├── agent-creator.md
    ├── skill-creator.md
    └── prd-assistant.md

docs/
└── prd/                    # PRD 문서 저장 위치
```

## Claude Code 명령어

| 명령어 | 설명 |
|--------|------|
| `/create-skill` | 새로운 스킬 생성 |
| `/create-agent` | 새로운 에이전트 생성 |
| `/create-prd` | PRD 문서 생성 |
| `/prd-prompt` | PRD 작성용 질문 생성 |

## shadcn/ui 컴포넌트 추가

```bash
npx shadcn@latest add [component-name]
```

예시:
```bash
npx shadcn@latest add button
npx shadcn@latest add card
npx shadcn@latest add dialog
```

## 디자인 가이드

### 색상

- **Primary**: 토스 블루 (#3182F6)
- CSS 변수 `--color-primary`로 관리
- `globals.css`에서 변경 가능

### 아이콘

- Lucide Icons만 사용
- 이모지 사용 금지

## 라이브러리 테스트

`/playground` 페이지에서 설치된 라이브러리들을 테스트할 수 있습니다.

- shadcn/ui 컴포넌트
- Framer Motion 애니메이션
- Zustand 상태관리
- React Hook Form + Zod 폼 검증
- Lucide Icons
- 커스텀 애니메이션 효과

## 스크립트

```bash
npm run dev      # 개발 서버 실행
npm run build    # 프로덕션 빌드
npm run start    # 프로덕션 서버 실행
npm run lint     # ESLint 검사
```

## 참고 문서

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [shadcn/ui](https://ui.shadcn.com)
- [Framer Motion](https://www.framer.com/motion)
- [Zustand](https://zustand-demo.pmnd.rs)
