"use client";

import type { District } from "@/entities/location";

import { DistrictCard } from "./DistrictCard";

interface DistrictListProps {
  districts: District[];
  onSelect?: (district: District) => void;
}

export function DistrictList({ districts, onSelect }: DistrictListProps) {
  return (
    <div className="space-y-3">
      {districts.map((district) => (
        <DistrictCard
          key={district.full}
          district={district}
          onClick={() => onSelect?.(district)}
        />
      ))}
    </div>
  );
}
