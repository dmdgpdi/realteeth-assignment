import { getChoseong } from "es-hangul";
import MiniSearch from "minisearch";
import districts from "../api/korea_districts.json";
import type { District } from "../model/District.type";

type DistrictDoc = District;

/**
 * @description 대한민국 행정구역 데이터를 검색하기 위한 서비스
 * MiniSearch를 사용하여 인메모리 인덱싱을 수행하며, es-hangul을 통해 초성 검색을 지원합니다.
 */
class DistrictSearchService {
  private miniSearch: MiniSearch<DistrictDoc>;

  constructor() {
    this.miniSearch = new MiniSearch({
      fields: ["full", "choseong"], // 검색할 필드
      storeFields: ["id", "full", "choseong"], // 결과에 포함할 필드
      searchOptions: {
        boost: { full: 2, choseong: 1 },
        fuzzy: 0.2, // 오타 허용 범위
        prefix: true, // 접두사 검색 허용
      },
    });

    this.initializeIndex();
  }

  private initializeIndex() {
    const documents: DistrictDoc[] = districts.map((district, index) => ({
      id: index,
      full: district,
      // "서울특별시-종로구" -> "ㅅㅇㅌㅂㅅ-ㅈㄹㄱ" 형태로 변환하여 초성 검색 지원
      choseong: district
        .split("-")
        .map((part) => getChoseong(part))
        .join("-"),
    }));

    this.miniSearch.addAll(documents);
  }

  /**
   * @description 검색어에 매칭되는 행정구역 리스트를 반환합니다.
   * @param keyword 검색어 (한글 또는 초성)
   * @returns 매칭된 행정구역 객체 배열 (최대 20개)
   */
  public search(keyword: string) {
    if (!keyword) return [];

    const results = this.miniSearch.search(keyword);

    // 유저가 입력한 키워드가 검색 결과 중 정확히 일치하거나 매우 유사한 것을 상단으로
    return results.slice(0, 20).map((result) => ({
      id: result.id,
      full: result.full,
      choseong: result.choseong,
    }));
  }
}

export const districtSearchService = new DistrictSearchService();
