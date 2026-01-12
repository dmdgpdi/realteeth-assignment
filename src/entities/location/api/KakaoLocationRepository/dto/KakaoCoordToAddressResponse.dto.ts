import type { KakaoAddress } from "./KakaoAddress.type";
import type { KakaoRoadAddress } from "./KakaoRoadAddress.type";

/**
 * @description /v2/local/geo/coord2address.json 응답 DTO
 */
export interface KakaoCoordToAddressResponse {
  meta: {
    total_count: number;
  };
  documents: Array<{
    address: KakaoAddress;
    road_address: KakaoRoadAddress | null;
  }>;
}
