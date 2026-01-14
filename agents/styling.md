🎨 Tailwind CSS (v4)

Utility Classes

관련 속성끼리 그룹핑하여 가독성을 높입니다.

긴 클래스 문자열은 clsx
 또는 tailwind-merge (twMerge)
를 사용하여 관리합니다.

import { twMerge } from "tailwind-merge";

const buttonClass = twMerge(
  "px-4 py-2 rounded-md bg-blue-500 text-white",
  isActive && "bg-blue-700"
);


Responsive

Mobile First 디자인 원칙 준수 (sm:, md:, lg: 등).

필요시 container, max-w-*, flex, grid 등을 활용하여 레이아웃을 반응형으로 구성합니다.

Colors & Typography

Tailwind의 theme.colors를 사용하고, 커스텀 색상은 tailwind.config.js에서 정의합니다.

텍스트 스타일도 일관되게 text-sm, text-base, font-medium 등을 사용합니다.

🧩 Shadcn/UI Components

Purpose: 재사용 가능한 UI 컴포넌트를 위해 shadcn 사용.

Usage:

기본 컴포넌트(Button, Card, Dialog 등)를 가져와서 프로젝트 기준으로 스타일을 커스터마이징.

Tailwind와 자연스럽게 통합되므로, 추가 스타일링이 필요하면 className과 twMerge를 활용.

import { Button } from "@/components/ui/button";
import { twMerge } from "tailwind-merge";

<Button className={twMerge("w-full sm:w-auto", isPrimary && "bg-blue-500")}>
  Click me
</Button>


Variants

shadcn 컴포넌트는 variant와 size props를 지원하므로 직접 클래스 문자열을 작성하는 대신 props 활용 권장.

<Button variant="destructive" size="sm">Delete</Button>

🖋️ Lucide Icons

Purpose: 프로젝트 내 아이콘 통일성과 접근성을 위해 Lucide Icons
 사용.

Usage:

React 컴포넌트 형태로 사용하며, Tailwind 클래스(className)를 적용하여 크기, 색상, 여백을 제어.

import { Search, X } from "lucide-react";

<Search className="w-5 h-5 text-gray-500" />
<X className="w-4 h-4 text-red-500 ml-2 cursor-pointer" />


Best Practices:

버튼, 입력창, 상태 표시 등 UI 요소와 결합할 때 일관된 크기와 색상을 사용합니다.

필요한 경우 twMerge로 Tailwind 클래스 동적 적용 가능.

📝 General Rules

Consistency: 클래스 이름, 색상, spacing, border-radius 등 통일성 유지.

Avoid Inline Styles: Tailwind/Utility-first 스타일만 사용, 인라인 style 최소화.

Readability: 긴 Tailwind 클래스는 줄바꿈 또는 twMerge로 관리.

Dark Mode: Tailwind dark: 활용.

<div class="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
  ...
</div>
