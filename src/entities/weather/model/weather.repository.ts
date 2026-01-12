import type { Location } from "./Location";
import type { TimeRange } from "./TimeRange";
import type { WeatherSeries } from "./WeatherSeries";

export interface WeatherRepository {
  getSeries(
    location: Location,
    range: TimeRange,
    interval: "hourly" | "daily",
  ): Promise<WeatherSeries>;
}
