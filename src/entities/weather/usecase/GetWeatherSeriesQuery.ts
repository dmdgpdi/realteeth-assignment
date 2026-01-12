import type { Location as WeatherLocation } from "../model/Location";
import type { TimeRange } from "../model/TimeRange";
import type { WeatherSeries } from "../model/WeatherSeries";
import type { WeatherRepository } from "../model/weather.repository";

export class GetWeatherSeriesQuery {
  constructor(private repository: WeatherRepository) {}

  async execute(
    location: WeatherLocation,
    range: TimeRange,
    interval: "hourly" | "daily",
  ): Promise<WeatherSeries> {
    return this.repository.getSeries(location, range, interval);
  }
}
