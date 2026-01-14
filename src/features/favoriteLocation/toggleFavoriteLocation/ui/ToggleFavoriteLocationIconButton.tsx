import { Star } from "lucide-react";
import type { ComponentPropsWithoutRef } from "react";
import { twMerge } from "tailwind-merge";
import type { Location } from "@/entities/location";
import { useToggleFavoriteLocation } from "../useToggleFavoriteLocation.model";

interface ToggleFavoriteLocationIconButtonProps
  extends ComponentPropsWithoutRef<"button"> {
  location: Location;
}

export function ToggleFavoriteLocationIconButton({
  location,
  className,
  ...props
}: ToggleFavoriteLocationIconButtonProps) {
  const { toggle, isFavorited } = useToggleFavoriteLocation(location);

  return (
    <button
      type="button"
      onClick={toggle}
      className={twMerge(
        "space-x-2 p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors cursor-pointer",
        className,
      )}
      {...props}
    >
      <Star
        className={`h-5 w-5 transition text-yellow-400 ${
          isFavorited ? "fill-yellow-400" : ""
        }`}
      />
    </button>
  );
}
