import clsx from "clsx";
import {
  Cloud,
  CloudDrizzle,
  CloudLightning,
  CloudRain,
  CloudSnow,
  Sun,
} from "lucide-react";
import { twMerge } from "tailwind-merge";
import type { MainWeather } from "../model/MainWeather.type";

interface WeatherIconProps {
  weather: MainWeather;
  color?: string;
  size?: number;
  className?: string;
}

export function WeatherIcon({
  weather,
  color,
  size,
  className,
}: WeatherIconProps) {
  // 아이콘별 기본 Tailwind 색
  const defaultColorClass = (() => {
    switch (weather) {
      case "Clear":
        return "text-yellow-500";
      case "Clouds":
        return "text-gray-400";
      case "Rain":
        return "text-blue-500";
      case "Snow":
        return "text-blue-200";
      case "Thunderstorm":
        return "text-purple-600";
      case "Drizzle":
        return "text-blue-300";
      default:
        return "text-yellow-500";
    }
  })();

  // clsx + twMerge로 class 합치기
  const combinedClassName = twMerge(clsx(defaultColorClass, className));

  switch (weather) {
    case "Clear":
      return <Sun color={color} size={size} className={combinedClassName} />;
    case "Clouds":
      return <Cloud color={color} size={size} className={combinedClassName} />;
    case "Rain":
      return (
        <CloudRain color={color} size={size} className={combinedClassName} />
      );
    case "Snow":
      return (
        <CloudSnow color={color} size={size} className={combinedClassName} />
      );
    case "Thunderstorm":
      return (
        <CloudLightning
          color={color}
          size={size}
          className={combinedClassName}
        />
      );
    case "Drizzle":
      return (
        <CloudDrizzle color={color} size={size} className={combinedClassName} />
      );
    default:
      return <Sun color={color} size={size} className={combinedClassName} />;
  }
}
