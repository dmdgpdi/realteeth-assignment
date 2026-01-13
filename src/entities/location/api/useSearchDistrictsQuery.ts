import type { UseQueryOptions } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import type { District } from "../model/District.type";
import { useLocationRepository } from "../model/LocationRepositoryProvider";
import { locationKey } from "./location.queryKey";

export function useSearchDistrictsQuery(
  keyword: string,
  options?: Partial<
    Omit<UseQueryOptions<District[], Error>, "queryKey" | "queryFn">
  >,
) {
  const { searchDistricts } = useLocationRepository();

  return useQuery({
    queryKey: locationKey.searchDistricts(keyword),
    queryFn: () => searchDistricts(keyword),
    ...options,
  });
}
