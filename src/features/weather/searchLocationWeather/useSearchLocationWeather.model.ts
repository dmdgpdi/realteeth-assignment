import { useSearchLocationQuery } from "@/entities/location";
import { useGetTodayWeatherSeriesQuery } from "@/entities/weather";

export function useSearchLocationWeather(keyword: string) {
  const { data: locations = [] } = useSearchLocationQuery(keyword);

  // biome-ignore lint/style/noNonNullAssertion: enabled로 런타임 에러를 방지.
  return useGetTodayWeatherSeriesQuery(locations?.[0]!, {
    enabled: !!locations?.[0],
  });
}
