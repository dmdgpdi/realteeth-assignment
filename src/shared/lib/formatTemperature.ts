import type { Temperature } from "@/entities/weather/model/Temperature.type";

export interface FormattedTemperature {
  value: string;
  unit: string;
  isNegative: boolean;
}

/**
 * @description 온도를 UI용으로 포맷해서 숫자, 단위, 음수 여부를 분리해서 반환합니다.
 */
export function formatTemperature(
  temperature: Temperature,
): FormattedTemperature {
  if (!temperature || temperature.value === undefined) {
    return {
      value: "--",
      unit: "°",
      isNegative: false,
    };
  }

  const unitSuffix =
    temperature.unit === "C" ? "°" : temperature.unit === "F" ? "°F" : "K";
  const isNegative = Math.round(temperature.value) < 0;

  return {
    value: Math.abs(Math.round(temperature.value)).toString(),
    unit: unitSuffix,
    isNegative,
  };
}
