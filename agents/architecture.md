# 아키텍처 가이드 (FSD & Domain)

이 가이드는 프로젝트의 구조적 일관성을 유지하기 위한 FSD(Feature-Sliced Design) 아키텍처와 도메인 로직 배치 원칙을 설명합니다.

---

## 🏗 FSD 계층 구조 (Layers)

프로젝트는 다음 6개의 계층으로 구성됩니다. 상위 계층은 하위 계층만 참조할 수 있습니다.

1.  **Shared**: 특정 비즈니스 로직이 없는 범용적인 조각들.
    - `ui`: 버튼, 입력창 등 (Shadcn UI 등)
    - `api`: Axios/Fetch 인스턴스, 공통 타입
    - `lib`: 유틸리티 함수
2.  **Entities**: 비즈니스 실체(Entity)와 관련된 데이터 및 로직.
    - 예: `user`, `post`, `order`
    - 코드 구성: 모델 정의, 상태 관리, 기본 UI
3.  **Features**: 사용자가 수행할 수 있는 구체적인 작업(Action).
    - 예: `auth-by-email`, `add-comment`, `search-product`
    - 특징: 비즈니스 가치를 만들어내는 작업 단위
4.  **Widgets**: 독립적이고 완성된 화면 조각. Feature와 Entity를 결합함.
    - 예: `header`, `product-list`, `comment-section`
5.  **Pages**: 전체 화면을 구성하는 단위.
6.  **App**: 애플리케이션의 설정, 전체 레이아웃, Provider 등.

---

## 🎯 도메인 가이드 (Domain Guide)

도메인 로직을 어디에 배치할지 결정하는 기준입니다.

-   **데이터 속성과 단순 가공**: `Entities`에 둡니다.
    - 예: 사용자의 이름을 형식화하는 함수 -> `entities/user/lib/formatName.ts`
-   **복합적인 사용자 행위**: `Features`에 둡니다.
    - 예: 사용자가 버튼을 눌러 로그인을 시도하는 행위 -> `features/auth-by-email`
-   **화면 중심의 결합**: `Widgets`에 둡니다.
    - 예: 사용자 프로필 정보와 로그아웃 버튼을 합친 헤더 섹션 -> `widgets/header`

---

## 🔌 Public API (index.ts) 규정

모든 슬라이스(Slice)는 반드시 `index.ts`를 가져야 하며, 이를 통해서만 내부 구성 요소를 외부로 노출합니다. 이는 리팩토링 시 내부 구조 변경으로부터 나머지 애플리케이션을 보호하는 **캡슐화(Encapsulation)** 역할을 합니다.

### 🚫 지양해야 할 패턴 (Bad Practice)
- **Wildcard Re-exports**: `export * from "./ui/Component"`와 같이 모든 것을 노출하지 마세요. 무엇이 공개 인터페이스인지 파악하기 어렵게 만듭니다.
- **내부 직접 참조**: 타 슬라이스의 `ui`나 `model` 폴더 내부 파일에 직접 접근하는 행위는 엄격히 금지됩니다.

### ✅ 권장 패턴 (Good Practice)
- 필요한 것만 명시적으로 보내기: `export { Component } from "./ui/Component"`
- 명확한 인터페이스 정의: 공개된 API의 변경은 슬라이스의 동작 변경을 의미해야 합니다.

---

## 🔄 슬라이스 간 참조 및 @x 표기법 (Cross-imports & @x Notation)

동일 계층의 슬라이스 간 참조(Cross-import)는 기본적으로 레이어 규칙에 의해 금지되지만, 비즈니스 도메인 간의 관계가 밀접한 경우(특히 `Entities` 계층) 예외적으로 허용됩니다. 이때 순환 참조를 방지하고 의존성을 명확히 하기 위해 **`@x` 표기법**을 사용합니다.

### 🏠 @x 표기법의 의미
`A/@x/B`는 **"A crossed with B"**로 읽으며, A 슬라이스가 오직 B 슬라이스만을 위해 노출한 전용 Public API임을 뜻합니다.

- **구조 예시**: `entities/A`를 `entities/B`에서 참조해야 하는 경우
  ```
  📂 entities
    📂 A
      📂 @x
        📄 B.ts      // A 슬라이스가 B를 위해 특별히 공개한 API (A/@x/B)
      📄 index.ts    // 모든 곳에서 사용하는 일반 Public API
  ```

- **참조 방법**:
  ```typescript
  // entities/B/ 인근 코드에서
  import { type EntityA } from "entities/A/@x/B"; // 일반 index.ts가 아닌 전용 API 사용
  ```

### 💡 주요 원칙
- **Entities 계층 전용**: 교차 참조는 가능한 `Entities` 계층에서만 최소한으로 사용하세요.
- **순환 참조 방지**: `@x`를 통해 필요한 타입이나 최소한의 로직만 공유함으로써 복잡한 순환 의존성 문제를 예방합니다.
- **상위 조합 우선**: `Features`나 `Widgets` 계층 간의 협력은 상위 계층(`Pages` 등)에서 조합하는 것이 원칙입니다.

---

## 💡 예시: 날씨 앱 (Weather App)

- `shared/ui`: 공통 카드 컴포넌트 (`Card`)
- `entities/weather`: 날씨 데이터 타입, 날씨 아이콘 컴포넌트
- `features/city-search`: 도시 이름을 입력받아 상태를 변경하는 로직
- `widgets/weather-board`: `entities/weather`의 데이터와 `features/city-search`를 결합하여 화면에 표시
