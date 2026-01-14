import { KakaoLocationRepository } from "./api/KakaoLocationRepository/KakaoLocationRepository";
import { locationKey } from "./api/location.queryKey";
import { useGetCurrentLocationQuery } from "./api/useGetCurrentLocationQuery";
import { useGetLocationQuery } from "./api/useGetLocationQuery";
import { useSearchDistrictsQuery } from "./api/useSearchDistrictsQuery";
import { useSearchLocationQuery } from "./api/useSearchLocationQuery";
import type { District } from "./model/District.type";
import { isSameCoordinates } from "./model/isSameCoordinates";
import type { Location } from "./model/Location.type";
import type { LocationRepository } from "./model/LocationRepository.interface";
import { useLocationRepository } from "./model/LocationRepositoryProvider";
import { LocationBadge } from "./ui/LocationBadge";

export type { LocationRepository, District, Location };

export {
  KakaoLocationRepository,
  locationKey,
  useLocationRepository,
  useGetCurrentLocationQuery,
  useGetLocationQuery,
  useSearchDistrictsQuery,
  useSearchLocationQuery,
  isSameCoordinates,
  LocationBadge,
};
