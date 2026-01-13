import { KakaoLocationRepository } from "./api/KakaoLocationRepository/KakaoLocationRepository";
import { locationKey } from "./api/location.queryKey";
import { useGetCurrentLocationQuery } from "./api/useGetCurrentLocationQuery";
import type { District } from "./model/District.type";
import type { Location } from "./model/Location.type";
import type { LocationRepository } from "./model/LocationRepository.interface";
import { useLocationRepository } from "./model/LocationRepositoryProvider";

export type { LocationRepository, District, Location };

export {
  KakaoLocationRepository,
  locationKey,
  useLocationRepository,
  useGetCurrentLocationQuery,
};
