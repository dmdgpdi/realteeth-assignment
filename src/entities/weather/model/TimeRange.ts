/**
 * @description TimeRange는 "어떤 기간의 날씨를 조회할 것인가"를 나타내는 값 객체이다.
 * - Weather 조회의 시간 축 입력값이다.
 * - 저장 대상이 아니라 조회 조건이다.
 */
export type TimeRange = {
  from: Date; // UTC
  to: Date; // UTC
};
