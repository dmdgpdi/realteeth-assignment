# 테스트 가이드 (Testing Strategy)

이 프로젝트는 **Classist (Detroit School / Classic)** 테스트 철학을 따릅니다.
테스트의 목적은 **"코드가 어떻게 구현되었는가"**가 아니라 **"코드가 무엇을 수행하는가"**를 검증하는 것입니다.

---

## 🏛 핵심 철학: Classist

### 1. 상태와 행위 검증 (Verify State & Behavior)
우리는 객체나 함수가 내부적으로 누구와 협력하는지(Interaction)에는 관심이 없습니다. 오직 **입력(Input)**에 대해 어떤 **결과(Output)**가 나오는지, 또는 시스템의 **상태(State)**가 어떻게 변했는지만을 검증합니다.

### 2. 실제 협력 객체 사용 (Real Collaborators)
가능하다면 실제 객체를 그대로 사용하세요.
- `User` 객체를 테스트하기 위해 `User`를 Mocking 하지 마세요. `new User()`를 해서 진짜를 쓰세요.
- **모킹(Mocking)은 최후의 수단**입니다. 제어할 수 없는 외부 요소(네트워크, 데이터베이스, 시간 등)를 격리할 때만 사용합니다.

---

## 🚫 Mockist (London School) - 지양하는 방식
구현 디테일을 테스트하지 마세요. 이는 리팩토링을 방해합니다.

### ❌ 나쁜 예: 내부 구현 감시
```typescript
it("회원가입 시 저장 함수가 호출되어야 한다", () => {
  const mockRepo = { save: jest.fn() }; // 가짜 객체에 스파이를 심음
  const service = new AuthService(mockRepo);

  service.signup("test@email.com");

  // "저장 함수가 호출되었는가?"를 검사함.
  // 만약 구현이 save()가 아니라 create()를 쓰도록 바뀌면, 동작은 같아도 테스트는 깨짐.
  expect(mockRepo.save).toHaveBeenCalledWith("test@email.com"); 
});
```

---

## ✅ Classist (Detroit School) - 지향하는 방식
시스템의 최종 상태를 검증하세요. 이는 리팩토링에 강합니다.

### ⭕ 좋은 예: 결과 상태 검증
```typescript
it("회원가입 시 유저가 조회 가능해야 한다", async () => {
  // Fake(인메모리 등)는 '기술'일 뿐입니다. 핵심은 '상태 검증'입니다.
  const userRepo = new InMemoryUserRepository(); 
  const service = new AuthService(userRepo);

  await service.signup("test@email.com");

  // "저장이 실제로 되었는가?"를 검사함.
  // 내부 구현이 바뀌어도 결과가 같다면 테스트는 통과함.
  const user = await userRepo.findByEmail("test@email.com");
  expect(user).not.toBeNull();
  expect(user.email).toBe("test@email.com");
});
```

---

## 💡 실천 가이드

1.  **블랙박스 테스트**: 테스트 대상의 내부(`private` 메서드, 내부 변수)를 들여다보지 마세요. 공개된 인터페이스(`public` method)만 사용하세요.
2.  **모킹 최소화**: `jest.mock()`이나 `spyOn`이 코드에 많다면 의심해보세요. "이게 정말 외부 I/O라서 모킹하는 건가? 아니면 그냥 편하려고 모킹하는 건가?"
3.  **사회적인 단위 테스트 (Sociable Unit Tests)**: 클래스 하나만 고립시키지 말고, 연관된 클래스들이 함께 잘 동작하는지 묶어서 테스트하세요.
