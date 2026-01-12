import { KakaoLocationRepository } from "./api/KakaoLocationRepository/KakaoLocationRepository";
import { LocalStorageFavoriteLocationRepository } from "./api/LocalStorageFavoriteLocationRepository";
import { locationKey } from "./api/locationKey";
import { canAddFavoriteLocation } from "./model/canAddFavoriteLocation";
import type { District } from "./model/District.type";
import type { FavoriteLocationRepository } from "./model/FavoriteLocationRepository.interface";
import type { LocationRepository } from "./model/LocationRepository.interface";

export type { LocationRepository, FavoriteLocationRepository, District };

export {
  canAddFavoriteLocation,
  KakaoLocationRepository,
  locationKey,
  LocalStorageFavoriteLocationRepository,
};
