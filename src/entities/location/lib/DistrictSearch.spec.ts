import { describe, expect, it } from "vitest";
import { districtSearchService } from "./DistrictSearch";

describe("DistrictSearchService", () => {
  it("should find districts by full name", () => {
    const results = districtSearchService.search("청운동");
    expect(results.map((r) => r.full)).toContain("서울특별시-종로구-청운동");
  });

  it("should find districts by initial consonants (초성)", () => {
    // "청운동" -> "ㅊㅇㄷ"
    const results = districtSearchService.search("ㅊㅇㄷ");
    expect(results.map((r) => r.full)).toContain("서울특별시-종로구-청운동");
  });

  it("should return up to 20 results", () => {
    const results = districtSearchService.search("서울");
    expect(results.length).toBeLessThanOrEqual(20);
  });
});
