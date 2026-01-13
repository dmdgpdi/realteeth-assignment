import type { UseQueryOptions } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import type { Location } from "../model/Location.type";
import { useLocationRepository } from "../model/LocationRepositoryProvider";
import { locationKey } from "./location.queryKey";

export function useSearchLocationQuery(
  keyword: string,
  options?: Partial<UseQueryOptions<Location[], Error>>,
) {
  const { searchLocation } = useLocationRepository();

  return useQuery({
    queryKey: locationKey.searchLocation(keyword),
    queryFn: () => searchLocation(keyword),
    ...options,
  });
}
