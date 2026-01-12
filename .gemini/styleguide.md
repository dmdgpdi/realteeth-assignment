# Gemini Code Review Style Guide

이 가이드는 제미나이(Gemini)가 프로젝트의 코드를 리뷰할 때 준수해야 할 기술적 기준과 아키텍처 원칙을 정의합니다. 리뷰 시 이 가이드를 우선적으로 참조하여 일관성 있고 고품질의 피드백을 제공하세요.

---

## 🏗 FSD (Feature-Sliced Design) 아키텍처

FSD 아키텍처의 핵심 원칙인 **계층 구조(Layers)**, **슬라이스(Slices)**, **세그먼트(Segments)** 및 **Public API** 규칙을 엄격히 적용합니다.

### 1. 계층(Layers) 이동 규칙
상위 레이어는 하위 레이어만 참조할 수 있습니다. 아래 순서를 준수하는지 확인하세요.
`app` > `pages` > `widgets` > `features` > `entities` > `shared`

- **Shared**: 특정 비즈니스 로직에 종속되지 않은 재사용 가능한 컴포넌트, 유틸리티, API 클라이언트 등.
- **Entities**: 비즈니스 도메인 엔티티 (예: User, Product). 데이터 모델 및 기본 UI.
- **Features**: 사용자의 가치 있는 액션 (예: AddToCart, Login).
- **Widgets**: 독립적인 화면 조각 (예: Header, Sidebar). Feature와 Entity를 결합함.
- **Pages**: 전체 화면 구성.
- **App**: 앱 설정, provider, 전역 스타일 등.

### 2. 슬라이스(Slices) 및 세그먼트(Segments)
- **동일 레이어 참조 금지 (Cross-import prohibited)**: 같은 레이어에 있는 다른 슬라이스를 직접 참조해서는 안 됩니다. (예: `features/A`는 `features/B`를 참조할 수 없음).
- **세그먼트 구성**: 슬라이스 내부는 `ui` (컴포넌트), `model` (로직/상태), `lib` (유틸리티), `api` (요청) 등으로 명확히 분리합니다.

### 3. Public API (index.ts)
- 모든 슬라이스는 반드시 `index.ts`를 통해 외부로 노출할 요소만 export 해야 합니다.
- **절대적 규칙**: 타 슬라이스에서 `src/features/login/ui/LoginForm.tsx`와 같이 내부 경로를 직접 참조하는 코드가 있다면 `index.ts`를 거치도록 수정 권장하세요.

---

## TypeScript

### 2. TypeScript 타입 정의
- `any` 사용은 극도로 지양하며, 명확한 인터페이스(`interface`)나 타입(`type`)을 정의합니다.
- Props 타입은 반드시 명시하며, 가능한 경우 `React.FC` 보다는 직접 타입을 주입하는 방식을 선호합니다.

---

## 📡 TanStack Query (v5)

- **Query Key Factory**: 키 관리를 위해 객체 형태의 팩토리 패턴을 사용하거나 중앙 집중식 관리를 권장합니다.
- **Hooks**: 커스텀 훅으로 래핑하여 비즈니스 로직을 분리했는지 확인합니다.
- **UX**: `isPending`, `isError` 상태에 대한 UI 처리가 적절히 포함되었는지 확인합니다.

---

## 🎨 Tailwind CSS (v4)

- **Utility Classes**: 가독성을 위해 관련 속성끼리 그룹핑하고, 긴 클래스 문자열은 `clsx` 또는 `tailwind-merge` (`twMerge`)를 사용하여 관리합니다.
- **Responsive**: Mobile First 디자인 원칙을 준수하는지 확인합니다 (`sm:`, `md:`, `lg:` 등).

---

## ✅ Code Review Checklist

1. [ ] **FSD 레이어 위반**: 상위 계층이 하위 계층을 잘 참조하고 있는가?
2. [ ] **Cross-import**: 동일 레이어 간 직접적인 참조가 발생하는가?
3. [ ] **Public API**: `index.ts`를 통하지 않고 내부 파일에 직접 접근하는가?
4. [ ] **세그먼트 분리**: 비즈니스 로직(model)과 UI(ui)가 적절히 분리되어 있는가?
5. [ ] **Query Key**: TanStack Query의 키가 예측 가능하게 관리되고 있는가?
6. [ ] **타입 안정성**: `any`가 남용되거나 타입 정의가 누락되지 않았는가?
7. [ ] **Tailwind**: 클래스 관리가 깨끗하며 `tailwind-merge`가 적절히 사용되었는가?
