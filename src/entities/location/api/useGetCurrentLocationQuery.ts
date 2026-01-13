import { useQuery } from "@tanstack/react-query";
import { useLocationRepository } from "../model/LocationRepositoryProvider";
import { locationKey } from "./location.queryKey";

export function useGetCurrentLocationQuery() {
  const { getCurrentLocation } = useLocationRepository();

  return useQuery({
    queryKey: locationKey.current(),
    queryFn: () => getCurrentLocation(),
  });
}
