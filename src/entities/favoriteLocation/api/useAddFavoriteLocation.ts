import { useMutation } from "@tanstack/react-query";
import { canAddFavoriteLocation } from "../model/canAddFavoriteLocation";
import type { FavoriteLocation } from "../model/FavoriteLocation.type";
import { useFavoriteLocationRepository } from "../model/FavoriteLocationRepositoryProvider";

export function useAddFavoriteLocation() {
  const repo = useFavoriteLocationRepository();

  const addFavoriteLocation = async (location: FavoriteLocation) => {
    const canAdd = await canAddFavoriteLocation(repo);

    if (!canAdd) {
      throw new Error("즐겨찾기는 최대 6개까지 추가할 수 있습니다.");
    }

    await repo.addFavoriteLocation(location);
  };

  return useMutation({
    mutationFn: addFavoriteLocation,
  });
}
