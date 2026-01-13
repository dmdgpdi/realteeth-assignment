import { ENV } from "@/shared/constants/env";
import { districtSearchService } from "../../lib/DistrictSearch";
import type { Coordinates } from "../../model/Coordinates.type";
import type { District } from "../../model/District.type";
import type { Location } from "../../model/Location.type";
import type { LocationRepository } from "../../model/LocationRepository.interface";
import type { KakaoAddressSearchResponse } from "./dto/KakaoAddressSearchResponse.dto";
import type { KakaoCoordToAddressResponse } from "./dto/KakaoCoordToAddressResponse.dto";

const KAKAO_API_URL = {
  BASE_URL: "https://dapi.kakao.com/v2/local",
  COORD_TO_ADDRESS: (coordinates: Coordinates) =>
    `${KAKAO_API_URL.BASE_URL}/geo/coord2address.json?x=${coordinates.lon}&y=${coordinates.lat}&input_coord=WGS84`,
  SEARCH_LOCATION: (keyword: string) =>
    `${KAKAO_API_URL.BASE_URL}/search/address.json?query=${encodeURIComponent(
      keyword,
    )}`,
};

/**
 * @description Kakao Local API를 사용하는 LocationRepository 구현체
 */
export class KakaoLocationRepository implements LocationRepository {
  /**
   * @description 좌표를 기반으로 상세 주소 정보를 가져옵니다.
   */
  async getLocation(coordinates: Coordinates): Promise<Location> {
    const response = await fetch(KAKAO_API_URL.COORD_TO_ADDRESS(coordinates), {
      headers: {
        Authorization: `KakaoAK ${ENV.KAKAO_REST_API_KEY}`,
      },
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch address from Kakao API: ${response.statusText}`,
      );
    }

    const data: KakaoCoordToAddressResponse = await response.json();
    const document = data.documents?.[0];

    // 지번 주소가 있으면 지번 주소의 주소명을, 없으면 도로명 주소의 주소명을 사용합니다.
    const name =
      document?.address?.address_name ||
      document?.road_address?.address_name ||
      "Unknown Location";

    return {
      coordinates,
      name,
      countryCode: "KR",
    };
  }

  /**
   * @description 주소 키워드에 맞는 장소 리스트를 반환합니다.
   */
  async searchLocation(keyword: string): Promise<Location[]> {
    if (!keyword.trim()) {
      return [];
    }

    const response = await fetch(KAKAO_API_URL.SEARCH_LOCATION(keyword), {
      headers: {
        Authorization: `KakaoAK ${ENV.KAKAO_REST_API_KEY}`,
      },
    });

    if (!response.ok) {
      throw new Error(
        `Failed to search location from Kakao API: ${response.statusText}`,
      );
    }

    const data: KakaoAddressSearchResponse = await response.json();

    if (!data.documents) {
      return [];
    }

    return data.documents.map((doc) => ({
      coordinates: {
        lat: parseFloat(doc.y),
        lon: parseFloat(doc.x),
      },
      name: doc.address_name,
      countryCode: "KR",
    }));
  }

  /**
   * @description 키워드에 맞는 행정구역 리스트를 반환합니다.
   * 로컬 인덱스(korea_districts.json)를 사용하여 API 호출 없이 즉시 결과를 반환합니다.
   */
  async searchDistricts(keyword: string): Promise<District[]> {
    return districtSearchService.search(keyword);
  }

  getCurrentLocation(): Promise<Location> {
    if (!navigator.geolocation) {
      return Promise.reject(new Error("Geolocation is not available"));
    }

    const { promise, resolve, reject } = Promise.withResolvers<Location>();

    const onSuccess = (position: GeolocationPosition) => {
      resolve({
        coordinates: {
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        },
      });
    };

    const onFail = () => {
      reject(new Error("Geolocation is not available"));
    };

    navigator.geolocation.getCurrentPosition(onSuccess, onFail);

    return promise;
  }
}
