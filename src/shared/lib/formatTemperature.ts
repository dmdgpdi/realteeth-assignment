import type { Temperature } from "@/entities/weather/model/Temperature.type";

/**
 * @description 온도를 사람이 읽기 좋은 포맷으로 변환합니다.
 */
export function formatTemperature(temperature?: Temperature): string {
  if (!temperature || temperature.value === undefined) return "--°";

  const unitSuffix =
    temperature.unit === "C" ? "°" : temperature.unit === "F" ? "°F" : "K";
  return `${Math.round(temperature.value)}${unitSuffix}`;
}
