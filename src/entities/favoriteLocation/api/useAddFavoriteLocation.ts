import { useMutation, useQueryClient } from "@tanstack/react-query";
import { canAddFavoriteLocation } from "../model/canAddFavoriteLocation";
import type { FavoriteLocation } from "../model/FavoriteLocation.type";
import { useFavoriteLocationRepository } from "../model/FavoriteLocationRepositoryProvider";
import { favoriteLocationKey } from "./favoriteLocation.queryKey";
import { useGetFavoriteLocations } from "./useGetFavoriteLocations";

export function useAddFavoriteLocation() {
  const queryClient = useQueryClient();
  const repo = useFavoriteLocationRepository();
  const { data: favoriteLocations = [] } = useGetFavoriteLocations();

  const addFavoriteLocation = async (location: FavoriteLocation) => {
    const canAdd = canAddFavoriteLocation(favoriteLocations.length);

    if (!canAdd) {
      throw new Error("즐겨찾기는 최대 6개까지 추가할 수 있습니다.");
    }

    await repo.addFavoriteLocation(location);
  };

  return useMutation({
    mutationFn: addFavoriteLocation,
    onMutate: (variable) => {
      const prevFavoriteLocations =
        queryClient.getQueryData<FavoriteLocation[]>(
          favoriteLocationKey.getFavoriteLocations(),
        ) ?? [];

      const newFavoriteLocations = [...prevFavoriteLocations, variable];

      queryClient.setQueryData(
        favoriteLocationKey.getFavoriteLocations(),
        newFavoriteLocations,
      );

      return { prevFavoriteLocations };
    },
    onError: (_error, _variable, onMutateResult) => {
      queryClient.setQueryData(
        favoriteLocationKey.getFavoriteLocations(),
        onMutateResult?.prevFavoriteLocations,
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: favoriteLocationKey.getFavoriteLocations(),
      });
    },
  });
}
