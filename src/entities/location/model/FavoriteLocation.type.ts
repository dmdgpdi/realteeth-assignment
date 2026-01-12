import type { Location } from "./Location.type";

export interface FavoriteLocation extends Location {
  id: string;
  displayName: string;
}
