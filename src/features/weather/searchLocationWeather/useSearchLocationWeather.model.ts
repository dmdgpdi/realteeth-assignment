import { useSearchLocationQuery } from "@/entities/location";
import { useGetTodayWeatherSeriesQuery } from "@/entities/weather";

export function useSearchLocationWeather(keyword: string) {
  const { data: locations = [] } = useSearchLocationQuery(keyword);

  return useGetTodayWeatherSeriesQuery({
    location: locations?.[0]!,
    options: { enabled: !!locations?.[0] },
  });
}
