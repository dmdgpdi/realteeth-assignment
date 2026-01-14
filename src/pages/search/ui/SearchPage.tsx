"use client";

import { Search, X } from "lucide-react";
import { type ChangeEvent, useDeferredValue, useState } from "react";
import { useSearchDistricts } from "@/features/location";
import { Input } from "@/shared/ui/input";
import { DistrictList } from "./DistrictList";

/**
 * @private
 */
export function SearchPage() {
  const [keyword, setKeyword] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const deferredKeyword = useDeferredValue(keyword);
  const { districts, isEmpty, emptyMessage } =
    useSearchDistricts(deferredKeyword);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.target.value);
    setIsSubmitted(false);
  };

  const clearInput = () => {
    setKeyword("");
    setIsSubmitted(false);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <main className="container max-w-4xl mx-auto px-4 py-8 space-y-8">
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">장소 검색</h2>
        <form className="relative w-full" onSubmit={handleSearch}>
          {/* input: 오른쪽 padding을 X+Search 아이콘만큼 줌 */}
          <Input
            type="text"
            placeholder="지역명 또는 초성으로 검색 (예: 청운동, ㅊㅇㄷ)"
            value={keyword}
            onChange={handleInputChange}
            className="w-full pr-16 h-12 text-lg"
          />

          {/* X 버튼: 입력값이 있을 때만, 검색 아이콘 왼쪽에 */}
          {keyword && (
            <button
              type="button"
              onClick={clearInput}
              className="absolute inset-y-0 right-10 flex items-center pr-1 text-gray-400"
              title="Clear"
            >
              <X className="w-5 h-5" />
            </button>
          )}

          <button
            type="submit"
            className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700"
            title="Clear"
          >
            <Search className="w-5 h-5" />
          </button>
        </form>
      </section>
      <section className="space-y-4">
        {isSubmitted && (
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">검색 결과</h3>
            <span className="text-sm text-muted-foreground">
              {districts.length}개의 장소 발견
            </span>
          </div>
        )}

        {isEmpty ? (
          <div className="text-center py-10 text-muted-foreground">
            {emptyMessage}
          </div>
        ) : (
          <DistrictList districts={districts} />
        )}
      </section>
    </main>
  );
}
