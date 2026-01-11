// 사이트 기본 정보 (하드코딩 방지)
export const siteConfig = {
  name: "Claude Code 스타터킷",
  description: "토큰 절약형 Next.js 스타터킷 - 팀 공유용 템플릿",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://example.com",
};

// 스타터킷 기능 목록
export const features = [
  {
    title: "Next.js + TypeScript",
    description: "App Router, Tailwind CSS, shadcn/ui 기반 모던 스택",
  },
  {
    title: "Claude Code 확장",
    description: "커스텀 Commands, Skills, Agents 생성 도우미 포함",
  },
  {
    title: "PRD 자동화",
    description: "아이디어를 PRD 문서로 변환하는 워크플로우 내장",
  },
  {
    title: "토큰 최적화",
    description: "CLAUDE.md 최적화로 불필요한 토큰 소비 절약",
  },
];

// 사용 가능한 커맨드 목록
export const commands = [
  { name: "/create-skill", description: "새로운 스킬 생성" },
  { name: "/create-agent", description: "새로운 에이전트 생성" },
  { name: "/create-prd", description: "PRD 문서 생성" },
  { name: "/prd-prompt", description: "PRD 작성용 질문 생성" },
];
