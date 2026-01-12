/**
 * @description 온도를 나타냅니다. 화씨는 C, 섭씨는 F, 켈빈은 K로 나타냅니다.
 */
export interface Temperature {
  value: number;
  unit: "C" | "F" | "K";
}
