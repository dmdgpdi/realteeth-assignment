import type { Location } from "@/entities/location/@x/FavoriteLocation";

export interface FavoriteLocation extends Location {
  id: string;
  displayName: string;
}
