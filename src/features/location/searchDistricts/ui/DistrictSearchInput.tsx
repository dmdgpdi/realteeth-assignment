"use client";

import { Loader2, Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { type Location, useSearchLocationQuery } from "@/entities/location";
import { cn } from "@/shared/libs/utils";
import { Input } from "@/shared/ui/input";

interface DistrictSearchInputProps {
  onSelect: (location: Location) => void;
  className?: string;
}

/**
 * @description 행정구역 검색 입력창 및 결과 목록 컴포넌트입니다.
 */
export function DistrictSearchInput({
  onSelect,
  className,
}: DistrictSearchInputProps) {
  const [keyword, setKeyword] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const { data: results = [], isLoading } = useSearchLocationQuery(keyword, {
    enabled: keyword.length > 0,
  });

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (location: Location) => {
    onSelect(location);
    setKeyword("");
    setIsOpen(false);
  };

  return (
    <div ref={containerRef} className={cn("relative w-full", className)}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="지역 검색 (예: 서울특별시, 종로구...)"
          value={keyword}
          onChange={(e) => {
            setKeyword(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          className="pl-9"
        />
        {isLoading && (
          <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 animate-spin text-muted-foreground" />
        )}
      </div>

      {isOpen && keyword.length > 0 && (
        <div className="absolute top-full left-0 right-0 z-50 mt-2 max-h-60 overflow-y-auto rounded-md border bg-popover p-1 text-popover-foreground shadow-md">
          {results.length > 0
            ? results.map((location) => (
                <button
                  type="button"
                  key={`${location.coordinates.lat}-${location.coordinates.lon}`}
                  className="w-full text-left px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground rounded-sm transition-colors"
                  onClick={() => handleSelect(location)}
                >
                  {location.name}
                </button>
              ))
            : !isLoading && (
                <div className="p-3 text-sm text-center text-muted-foreground">
                  검색 결과가 없습니다.
                </div>
              )}
        </div>
      )}
    </div>
  );
}
