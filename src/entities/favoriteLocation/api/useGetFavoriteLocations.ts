import type { UseQueryOptions } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import type { FavoriteLocation } from "../model/FavoriteLocation.type";
import { useFavoriteLocationRepository } from "../model/FavoriteLocationRepositoryProvider";
import { favoriteLocationKey } from "./favoriteLocation.queryKey";

export function useGetFavoriteLocations(
  options?: Partial<UseQueryOptions<FavoriteLocation[], Error>>,
) {
  const { getFavoriteLocations } = useFavoriteLocationRepository();

  return useQuery<FavoriteLocation[], Error>({
    queryKey: favoriteLocationKey.getFavoriteLocations(),
    queryFn: getFavoriteLocations,
    ...options,
  });
}
