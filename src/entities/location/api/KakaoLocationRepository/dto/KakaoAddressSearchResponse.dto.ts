import type { KakaoAddress } from "./KakaoAddress.type";
import type { KakaoRoadAddress } from "./KakaoRoadAddress.type";

/**
 * @description /v2/local/search/address.json 응답 DTO
 */
export interface KakaoAddressSearchResponse {
  meta: {
    total_count: number;
    pageable_count: number;
    is_end: boolean;
  };
  documents: Array<{
    address_name: string;
    y: string;
    x: string;
    address_type: "REGION" | "ROAD" | "REGION_ADDR" | "ROAD_ADDR";
    address: KakaoAddress;
    road_address: KakaoRoadAddress | null;
  }>;
}
