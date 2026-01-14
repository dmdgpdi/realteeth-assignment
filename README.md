# REALTEETH Assignment 날씨 앱 구현 과제
## 프로젝트 실행 방법
```
set .env file
//.env.example을 보고 .env 파일을 생성해주세요

pnpm install

pnpm run dev
```
## 구현한 기능에 대한 설명
측정한 시간부터 오늘 하루까지의 날씨를 나타내는 기능을 구현했습니다.
- 현재 위치의 날씨를 나타내는 기능
- 즐겨찾기로 추가한 위치의 날씨를 나타내는 기능
- 키워드를 기반으로 지역과 해당 지역의 날씨를 나타내는 기능

## 기술적 의사결정 및 이유
### repository pattern
api를 호출할 때, repository 계층을 두어 추상화했습니다. 이는 외부 api가 변경되어도 내부 코드를 변경할 필요가 없도록 하기 위함입니다. 또한 API의존 없이 인터페이스만 맞춘다면 테스트할 수 있도록 했습니다.

### 도메인 설계

도메인의 경우 양방향 의존성이 생기지 않게 설계했습니다.

위치(location)은 다른 도메인에 의존성이 없고,
favoriteLocation은 location에 의존하며
weather는 location과 favoriteLocation에 의존합니다.

### 서버 상태(Server State) 관리
서버 상태의 경우, Optimistic Update를 사용하여 클라이언트의 상태를 변경했습니다.

## 사용한 기술 스택
nextjs, typescript, tailwindcss, react-query