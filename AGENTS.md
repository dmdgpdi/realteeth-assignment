# 🧭 AGENTS.md: Agent Navigation Hub

이 파일은 에이전트가 어떤 상황에서 어떤 규칙 파일을 참고해야 하는지 안내하는 **네비게이션 가이드**입니다.
모든 에이전트는 작업을 시작하기 전에 이 파일의 경로 안내를 따르세요.

---

## 1. 🗣️ 언어 규칙 (Language)
- **모든 대화, 답변, 그리고 Artifact(계획서, 문서 등), 주석은 반드시 한국어로 작성합니다.**

---

## 2. 🗺️ 가이드 탐색 (Navigation)

작업의 성격에 따라 아래의 경로(상대 경로)를 참조하세요.

### 🏗 아키텍처 및 구조 설계 (Architecture & FSD)
- **참조 파일**: [`agents/architecture.md`](./agents/architecture.md)
- **언제 읽어야 하나요?**
    - 새로운 파일이나 폴더를 생성할 때
    - 비즈니스 로직(Model)을 어디에 둘지 고민될 때
    - FSD 레이어 규칙이나 `Cross-import`(`@x`) 처리 방법이 필요할 때
    - `index.ts` (Public API)를 구성할 때

### 🧪 테스트 작성 (Testing)
- **참조 파일**: [`agents/testing.md`](./agents/testing.md)
- **언제 읽어야 하나요?**
    - 테스트 코드를 새로 작성하거나 수정할 때
    - Mocking을 해야 할지 실제 객체를 써야 할지 판단이 안 설 때
    - **Classist (Detroit School)** 철학에 대한 이해가 필요할 때

### 🎨 코드 스타일 및 리뷰 (Style & Review)
- **참조 파일**: [`.gemini/styleguide.md`](./.gemini/styleguide.md)
- **언제 읽어야 하나요?**
    - 작성한 코드를 자가 점검(Self-Review) 할 때
    - React, TypeScript, Tailwind CSS 등의 구체적인 코딩 컨벤션이 궁금할 때
    - TanStack Query 등 기술 스택의 Best Practice를 확인할 때

---

## 3. 🚀 작업 프로세스 (Workflow)

1.  **주제 파악**: 사용자 요청이 아키텍처 변경인지, 기능 구현인지, 테스트 작성인지 파악합니다.
2.  **가이드 참조**: 위 네비게이션을 통해 관련된 `.md` 파일을 먼저 읽습니다.
3.  **설계 및 계획 (Planning)**:
    - 작업을 바로 시작하지 마세요.
    - 먼저 `implementation_plan.md` 파일을 생성하여 구현 계획, 변경 범위, 검증 방법을 서술하세요. 단, 한국어로 작성해주세요.
    - 사용자에게 계획을 승인받은 후 다음 단계로 넘어갑니다.
4.  **작업 수행 (Execution)**: 확정된 계획과 가이드 원칙에 따라 코드를 구현합니다. 구현한 코드엔 jsdoc을 추가해주세요.
5.  **검증 (Verification)**: 구현된 코드가 동작하는지 테스트하고, 결과를 보고합니다.
