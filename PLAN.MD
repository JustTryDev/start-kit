# Claude Code 토큰 절약형 스타터 킷 최적화 계획

## 목표
- CLAUDE.md 소폭 최적화 (20% 토큰 절약, 가독성 유지)
- Next.js 초기 프로젝트 구조 포함
- 팀 공유용 템플릿으로 완성

---

## 1. CLAUDE.md 최적화

### 수정할 파일
`CLAUDE.md`

### 수정 내용

| 위치 | 현재 | 수정 |
|------|------|------|
| 124줄 | "설계계" | "설계" (오타) |
| 72-74줄 | 네이밍 예시 중복 | 49-53줄과 통합 후 삭제 |
| 30-33줄 | 자주 쓰는 명령어 | 삭제 (npm 기본 명령어, Claude가 알고 있음) |
| 26-28줄 | Context7 MCP 표현 | "최신 문서 확인 후 설치 (Context7 MCP 활용 권장)"으로 변경 |

### 통합할 섹션
- "코딩 규칙" + "코드 관리 원칙 > 네이밍 규칙" 통합
- "SEO 필수 항목" + "이미지 규칙" → "웹 최적화" 통합

### CLAUDE.md에 새로 추가할 섹션

**## Claude Code 확장 규칙** (신규 섹션)
```markdown
## Claude Code 확장 규칙

### 공식 문서 참고 필수
스킬, 에이전트, 커맨드, 프롬프트 등 Claude Code 확장 기능 생성 시:
- Claude 및 Claude Code 공식 문서 형식 반드시 준수
- YAML frontmatter 속성은 공식 스펙에 맞게 작성
- 비표준 속성 사용 금지

### 파일 위치
- 커맨드: .claude/commands/{command-name}.md
- 스킬: .claude/skills/{skill-name}/SKILL.md
- 에이전트: .claude/agents/{agent-name}.md

### 네이밍 규칙
- 소문자, 숫자, 하이픈만 사용
- 역할을 명확히 알 수 있는 이름 사용
- 예: prd-writer, code-reviewer, bug-fixer

### 한국어 작성
- description은 한국어로 작성 가능
- 시스템 프롬프트/가이드 내용은 한국어로 작성
```

---

## 2. 설정 파일 추가

### 2.1 `.editorconfig` (신규 생성)
```ini
root = true

[*]
indent_style = space
indent_size = 2
end_of_line = crlf
charset = utf-8
trim_trailing_whitespace = true
insert_final_newline = true

[*.md]
trim_trailing_whitespace = false
```

### 2.2 `.gitignore` (신규 생성)
Next.js 표준 gitignore (node_modules, .next, .env.local 등)

### 2.3 `.env.example` (신규 생성)
환경변수 템플릿 (키만 정의, 값은 비워둠)

---

## 3. Next.js 초기 프로젝트 구조

### 생성할 폴더/파일
```
src/
├── app/
│   ├── layout.tsx      # 루트 레이아웃 (Pretendard 폰트, 메타데이터)
│   ├── page.tsx        # 홈페이지 기본 템플릿
│   └── globals.css     # Tailwind 설정 + CSS 변수 (--color-primary)
├── components/
│   └── ui/             # shadcn/ui 컴포넌트 폴더 (빈 폴더)
├── lib/
│   └── utils.ts        # cn() 유틸리티 (tailwind-merge)
├── config/
│   └── site.ts         # 사이트 정보 상수 (하드코딩 방지용)
└── hooks/              # 커스텀 훅 폴더 (빈 폴더)

public/                 # 정적 파일 폴더 (빈 폴더)
```

### 핵심 파일 내용

**src/config/site.ts**
```typescript
// 사이트 기본 정보 (하드코딩 방지)
export const siteConfig = {
  name: "사이트명",
  description: "사이트 설명",
  url: "https://example.com",
};
```

**src/app/globals.css**
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --color-primary: #3182F6; /* 토스 블루 */
}
```

---

## 4. 커스텀 기능 (Commands/Skills/Agents)

### 접근 방식
프로젝트마다 skills/agents가 다르므로, **생성 도우미**를 스타터킷에 포함

### 4.1 커맨드 (Commands)

**`.claude/commands/create-skill.md`** - Skill 생성 명령어
```markdown
---
description: 새로운 skill을 생성합니다
---
프로젝트에 맞는 새로운 skill을 생성해줘.
- 위치: .claude/skills/{skill-name}/SKILL.md
- CLAUDE.md의 코딩 규칙과 디자인 가이드를 참고해서 작성
- 사용자 입력: $ARGUMENTS
```

**`.claude/commands/create-agent.md`** - Agent 생성 명령어
```markdown
---
description: 새로운 agent를 생성합니다
---
프로젝트에 맞는 새로운 agent를 생성해줘.
- 위치: .claude/agents/{agent-name}.md
- CLAUDE.md의 코딩 규칙을 준수하도록 설정
- 사용자 입력: $ARGUMENTS
```

**`.claude/commands/create-prd.md`** - PRD 생성 명령어
```markdown
---
description: 새로운 기능의 PRD(제품 요구사항 문서)를 생성합니다
---
사용자의 아이디어를 바탕으로 PRD를 작성해줘.

## PRD 구조
1. 개요 (무엇을, 왜)
2. 목표 사용자
3. 핵심 기능 목록
4. 성공 지표
5. 기술 요구사항 (CLAUDE.md 기술 스택 참고)
6. 제외 범위 (이번에 안 할 것)

## 입력
$ARGUMENTS

## 출력 위치
docs/prd/{feature-name}.md
```

**`.claude/commands/prd-prompt.md`** - PRD 프롬프트 생성 명령어
```markdown
---
description: 기능 아이디어를 PRD 작성용 질문으로 변환합니다
---
사용자의 아이디어를 구체화하기 위한 질문 목록을 생성해줘.

## 질문 카테고리
1. 사용자/타겟 관련 질문
2. 기능 범위 관련 질문
3. 디자인/UX 관련 질문
4. 기술적 제약 관련 질문
5. 우선순위 관련 질문

## 입력
$ARGUMENTS

## 출력 형식
번호가 매겨진 질문 목록 (답변 가이드 포함)
```

### 4.2 스킬 (Skills)

**`.claude/skills/skill-creator/SKILL.md`** - Skill 작성 가이드 (정석 형식)
```markdown
---
name: skill-creator
description: 새로운 skill을 정석적인 형식으로 작성할 때 참고하는 가이드
allowed-tools: Read, Write, Glob
---
# Skill 작성 가이드

## 파일 위치
.claude/skills/{skill-name}/SKILL.md

## YAML Frontmatter 속성
| 속성 | 필수 | 설명 |
|------|------|------|
| name | 필수 | 소문자, 숫자, 하이픈만 (64자 이하) |
| description | 필수 | 스킬 용도 (1024자 이하) |
| allowed-tools | 선택 | Read, Write, Bash 등 |
| model | 선택 | sonnet, opus, haiku |
| context | 선택 | fork (격리 실행) |
| user-invocable | 선택 | true/false |

## 예시
---
name: my-skill
description: 이 스킬의 용도 설명
allowed-tools: Read, Grep, Glob
---
```

**`.claude/skills/agent-creator/SKILL.md`** - Agent 작성 가이드 (정석 형식)
```markdown
---
name: agent-creator
description: 새로운 agent를 정석적인 형식으로 작성할 때 참고하는 가이드
allowed-tools: Read, Write, Glob
---
# Agent 작성 가이드

## 파일 위치
.claude/agents/{agent-name}.md

## YAML Frontmatter 속성
| 속성 | 필수 | 설명 |
|------|------|------|
| name | 필수 | 소문자, 하이픈만 |
| description | 필수 | 언제 사용할지 설명 |
| tools | 선택 | Read, Write, Bash 등 |
| model | 선택 | sonnet, opus, haiku, inherit |
| permissionMode | 선택 | default, acceptEdits, bypassPermissions |
| skills | 선택 | 로드할 스킬 (쉼표 구분) |

## 예시
---
name: my-agent
description: 이 에이전트가 언제 호출되어야 하는지 설명
tools: Read, Grep, Glob, Write
model: sonnet
---
```

**`.claude/skills/prd-writer/SKILL.md`** - PRD 작성 전문가 스킬
```markdown
---
name: prd-writer
description: 비개발자의 아이디어를 체계적인 PRD로 변환하는 전문가
---
# PRD 작성 가이드

## 핵심 원칙
- 비개발자가 이해할 수 있는 쉬운 용어 사용
- 모호한 표현 대신 구체적인 시나리오 작성
- CLAUDE.md의 기술 스택과 디자인 가이드 참고

## PRD 템플릿
### 1. 개요
- 한 문장 요약
- 배경/문제점
- 해결 방안

### 2. 사용자 스토리
- "~로서, ~를 하고 싶다, ~하기 위해" 형식

### 3. 기능 명세
- 필수 기능 (MVP)
- 선택 기능 (Nice-to-have)

### 4. 화면 설계
- 주요 화면 목록
- 각 화면의 핵심 요소

### 5. 기술 고려사항
- 데이터 구조
- API 필요 여부
- 외부 서비스 연동
```

### 4.3 에이전트 (Agents)

**`.claude/agents/agent-creator.md`** - 에이전트 생성 에이전트 (정석 형식)
```markdown
---
name: agent-creator
description: 새로운 에이전트를 생성할 때 호출. Claude Code 공식 형식을 따름
tools: Read, Write, Glob, WebFetch
model: sonnet
skills: agent-creator
---
당신은 Claude Code 에이전트 생성 전문가입니다.

## 역할
사용자의 요구사항을 듣고 .claude/agents/ 폴더에 정석적인 에이전트 파일을 생성합니다.

## 작업 흐름
1. 에이전트 목적 파악
2. 필요한 tools, model, permissionMode 결정
3. YAML frontmatter + 시스템 프롬프트 작성
4. .claude/agents/{agent-name}.md에 저장

## 규칙
- Claude Code 공식 문서 형식 준수
- CLAUDE.md의 코딩 규칙 반영
- 한국어 주석/설명 사용
```

**`.claude/agents/skill-creator.md`** - 스킬 생성 에이전트 (정석 형식)
```markdown
---
name: skill-creator
description: 새로운 스킬을 생성할 때 호출. Claude Code 공식 형식을 따름
tools: Read, Write, Glob, WebFetch
model: sonnet
skills: skill-creator
---
당신은 Claude Code 스킬 생성 전문가입니다.

## 역할
사용자의 요구사항을 듣고 .claude/skills/ 폴더에 정석적인 스킬을 생성합니다.

## 작업 흐름
1. 스킬 목적 파악
2. 필요한 allowed-tools, model 결정
3. YAML frontmatter + 가이드 내용 작성
4. .claude/skills/{skill-name}/SKILL.md에 저장

## 규칙
- Claude Code 공식 문서 형식 준수
- CLAUDE.md의 코딩 규칙 반영
- 한국어 주석/설명 사용
```

**`.claude/agents/prd-assistant.md`** - PRD 대화형 어시스턴트
```markdown
---
name: prd-assistant
description: 대화를 통해 PRD를 함께 작성하는 어시스턴트
tools: Read, Write, Glob
model: sonnet
---
당신은 PRD 작성을 도와주는 어시스턴트입니다.

## 역할
- 사용자의 아이디어를 질문을 통해 구체화
- 모호한 요구사항을 명확하게 정리
- 기술적 실현 가능성 검토 (CLAUDE.md 참고)

## 대화 흐름
1. 아이디어 파악: "어떤 기능을 만들고 싶으세요?"
2. 사용자 정의: "이 기능을 누가 사용하나요?"
3. 핵심 가치: "이 기능으로 어떤 문제를 해결하나요?"
4. 범위 정의: "꼭 필요한 기능과 나중에 해도 될 기능을 구분해볼까요?"
5. 정리: PRD 초안 작성 후 피드백 요청

## 출력
최종 PRD를 docs/prd/{feature-name}.md에 저장
```

---

## 5. 프로젝트 초기화 방식

**선택됨: `npx create-next-app` 사용**

구현 시 다음 명령어로 초기화 후, 스타터 킷 파일들을 덮어씌움:
```bash
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
```

### 선택 사항
- [ ] README.md 생성 (스타터 킷 사용 가이드)
- [ ] Git 초기화 및 초기 커밋

---

## 6. 구현 순서

1. CLAUDE.md 오타 및 중복 수정 (설계계→설계, 중복 섹션 통합)
2. `npx create-next-app` 실행으로 기본 구조 생성
3. .editorconfig 생성
4. .env.example 생성
5. src/config/site.ts 추가 (하드코딩 방지용 상수)
6. src/app/globals.css에 --color-primary 변수 추가
7. src/lib/utils.ts에 cn() 유틸리티 추가 (shadcn/ui 호환)
8. .claude/commands/ 생성
   - create-skill.md, create-agent.md (메타 생성기)
   - create-prd.md, prd-prompt.md (PRD 관련)
9. .claude/skills/ 생성
   - skill-creator, agent-creator (메타 가이드)
   - prd-writer (PRD 작성 가이드)
10. .claude/agents/ 생성
    - agent-creator.md (에이전트 생성 에이전트)
    - skill-creator.md (스킬 생성 에이전트)
    - prd-assistant.md (PRD 대화형 어시스턴트)
11. docs/prd/ 폴더 생성 (PRD 저장 위치)
12. CLAUDE.md에 "Claude Code 확장 규칙" 섹션 추가

---

## 7. 검증 방법

1. CLAUDE.md 줄 수 확인 (141줄 → 약 110줄 목표)
2. 폴더 구조가 CLAUDE.md에 명시된 대로 생성되었는지 확인
3. .editorconfig가 VS Code에서 인식되는지 확인
4. globals.css의 --color-primary 변수가 적용되는지 확인
5. /create-skill, /create-agent, /create-prd 명령어 테스트

---

## 8. 최종 파일 구조

```
Start-Kit/
├── .claude/
│   ├── mcp.json
│   ├── settings.json
│   ├── settings.local.json
│   ├── statusline.js
│   ├── commands/                    # 커스텀 명령어
│   │   ├── create-skill.md          # /create-skill
│   │   ├── create-agent.md          # /create-agent
│   │   ├── create-prd.md            # /create-prd (PRD 생성)
│   │   └── prd-prompt.md            # /prd-prompt (질문 생성)
│   ├── skills/                      # 스킬 가이드
│   │   ├── skill-creator/
│   │   │   └── SKILL.md
│   │   ├── agent-creator/
│   │   │   └── SKILL.md
│   │   └── prd-writer/              # PRD 작성 전문가
│   │       └── SKILL.md
│   └── agents/                      # 커스텀 에이전트
│       ├── agent-creator.md         # 에이전트 생성 에이전트
│       ├── skill-creator.md         # 스킬 생성 에이전트
│       └── prd-assistant.md         # PRD 대화형 어시스턴트
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── globals.css              # --color-primary 포함
│   ├── components/ui/
│   ├── lib/utils.ts                 # cn() 유틸리티
│   ├── config/site.ts               # 사이트 상수
│   └── hooks/
├── docs/
│   └── prd/                         # PRD 저장 위치
├── public/
├── .editorconfig
├── .env.example
├── .gitignore
├── CLAUDE.md (최적화됨)
├── GUIDE.TXT
└── PLAN.MD (이 파일)
```
