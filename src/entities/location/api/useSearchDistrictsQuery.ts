import type { UseQueryOptions } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { useLocationRepository } from "../model/LocationRepositoryProvider";
import { locationKey } from "./location.queryKey";

export function useSearchDistrictsQuery(
  keyword: string,
  options?: UseQueryOptions,
) {
  const { searchDistricts } = useLocationRepository();

  return useQuery({
    queryKey: locationKey.searchDistricts(keyword),
    queryFn: () => searchDistricts(keyword),
    ...options,
  });
}
