import { useDebounce } from "@uidotdev/usehooks";
import { useSearchDistrictsQuery } from "@/entities/location";

const EMPTY_MESSAGE = "해당 장소의 정보가 제공되지 않습니다.";

export function useSearchDistricts(keyword: string) {
  const debouncedKeyword = useDebounce(keyword, 300);
  const normalizedKeyword = debouncedKeyword.trim();
  const isValidKeyword = normalizedKeyword.length > 0;

  const {
    data: districts = [],
    isLoading,
    isError,
  } = useSearchDistrictsQuery(normalizedKeyword, {
    enabled: isValidKeyword,
  });

  const isEmpty =
    isValidKeyword && !isLoading && !isError && districts.length === 0;

  return {
    districts,
    isLoading,
    isEmpty,
    isError,
    emptyMessage: EMPTY_MESSAGE,
  };
}
