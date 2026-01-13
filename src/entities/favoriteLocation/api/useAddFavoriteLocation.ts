import { useMutation } from "@tanstack/react-query";
import type { Location } from "@/entities/location/@x/FavoriteLocation";
import { canAddFavoriteLocation } from "../model/canAddFavoriteLocation";
import { createFavoriteLocation } from "../model/createFavoriteLocation";
import { useFavoriteLocationRepository } from "../model/FavoriteLocationRepositoryProvider";
import { favoriteLocationKey } from "./favoriteLocation.queryKey";

export function useAddFavoriteLocation() {
  const repo = useFavoriteLocationRepository();

  const addFavoriteLocation = async ({
    location,
    displayName,
  }: {
    location: Location;
    displayName: string;
  }) => {
    const canAdd = await canAddFavoriteLocation(repo);

    if (!canAdd) {
      throw new Error("즐겨찾기는 최대 6개까지 추가할 수 있습니다.");
    }

    const favoriteLocation = createFavoriteLocation({
      location,
      displayName,
    });

    await repo.addFavoriteLocation(favoriteLocation);
  };

  return useMutation({
    mutationFn: addFavoriteLocation,
    onMutate: () => {},
    onSettled: (_data, _error, _params, _onMutateResult, { client }) => {
      client.invalidateQueries({
        queryKey: favoriteLocationKey.getFavoriteLocations(),
      });
    },
  });
}
