import { useGetCurrentLocationQuery } from "@/entities/location";
import { useGetTodayWeatherSeriesQuery } from "@/entities/weather";

export function useGetCurrentLocationWeather() {
  const { data: currentLocation } = useGetCurrentLocationQuery();

  return useGetTodayWeatherSeriesQuery(
    // biome-ignore lint/style/noNonNullAssertion: enabled할 때만 동작하게 로직 구성
    currentLocation!,
    { enabled: !!currentLocation },
  );
}
