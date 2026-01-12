import { describe, expect, it } from "vitest";
import { MockWeatherRepository } from "../api/MockWeatherRepository";
import type { Location } from "../model/Location";
import type { WeatherObservation } from "../model/WeatherObservation";
import { GetWeatherSeriesQuery } from "./GetWeatherSeriesQuery";

describe("GetWeatherSeriesQuery (날씨 조회)", () => {
  // 공통으로 사용할 위치 정보 Fixture
  const seoulLocation: Location = {
    lat: 37.5665,
    lon: 126.978,
    name: "Seoul",
    timezone: "Asia/Seoul",
  };

  /**
   * 테스트 데이터 생성을 돕는 헬퍼 함수
   * 지정된 시작 시간부터 1시간 간격으로 n개의 데이터를 생성합니다.
   */
  function createHourlyFixture(
    startHour: Date,
    count: number,
  ): WeatherObservation[] {
    const observations: WeatherObservation[] = [];
    for (let i = 0; i < count; i++) {
      const time = new Date(startHour);
      time.setHours(startHour.getHours() + i);

      observations.push({
        location: seoulLocation,
        time,
        temperature: { value: 20 + i, unit: "C" },
        minTemperature: { value: 20 + i, unit: "C" }, // 시간별 예보는 보통 min/max가 현재 기온과 같음
        maxTemperature: { value: 20 + i, unit: "C" },
        type: "observed",
        condition: "sunny",
        rainfallProbability: 0,
      });
    }
    return observations;
  }

  /**
   * 테스트 데이터 생성을 돕는 헬퍼 함수
   * 지정된 시작일부터 매일 1개의 데이터를 생성합니다 (일별 예보).
   */
  function createDailyFixture(
    startDate: Date,
    count: number,
  ): WeatherObservation[] {
    const observations: WeatherObservation[] = [];
    for (let i = 0; i < count; i++) {
      const time = new Date(startDate);
      time.setDate(startDate.getDate() + i);

      observations.push({
        location: seoulLocation,
        time,
        temperature: { value: 25, unit: "C" }, // 대표 기온
        minTemperature: { value: 15, unit: "C" }, // 최저
        maxTemperature: { value: 30, unit: "C" }, // 최고
        type: "forecast",
        condition: "cloudy",
      });
    }
    return observations;
  }

  it("특정 기간의 시간별(Hourly) 날씨 데이터를 1시간 간격으로 정확히 반환해야 한다", async () => {
    // Arrange (준비)
    const repository = new MockWeatherRepository();
    const query = new GetWeatherSeriesQuery(repository);

    const start = new Date("2024-01-01T00:00:00Z");
    const end = new Date("2024-01-01T02:00:00Z"); // 00, 01, 02시 (총 3개 상점)

    // 테스트 환경 설정 (SetScenario)
    const fixtureData = createHourlyFixture(start, 5);
    repository.setScenario(fixtureData);

    const range = { from: start, to: end };

    // Act (실행)
    const result = await query.execute(seoulLocation, range, "hourly");

    // Assert (검증)
    expect(result.interval).toBe("hourly");
    expect(result.observations).toEqual([
      {
        location: seoulLocation,
        time: new Date("2024-01-01T00:00:00Z"),
        temperature: { value: 20, unit: "C" },
        minTemperature: { value: 20, unit: "C" },
        maxTemperature: { value: 20, unit: "C" },
        type: "observed",
        condition: "sunny",
        rainfallProbability: 0,
      },
      {
        location: seoulLocation,
        time: new Date("2024-01-01T01:00:00Z"),
        temperature: { value: 21, unit: "C" },
        minTemperature: { value: 21, unit: "C" },
        maxTemperature: { value: 21, unit: "C" },
        type: "observed",
        condition: "sunny",
        rainfallProbability: 0,
      },
      {
        location: seoulLocation,
        time: new Date("2024-01-01T02:00:00Z"),
        temperature: { value: 22, unit: "C" },
        minTemperature: { value: 22, unit: "C" },
        maxTemperature: { value: 22, unit: "C" },
        type: "observed",
        condition: "sunny",
        rainfallProbability: 0,
      },
    ]);
  });

  it("일별(Daily) 조회 시 최저/최고 기온이 포함된 데이터를 반환해야 한다", async () => {
    // Arrange (준비)
    const repository = new MockWeatherRepository();
    const query = new GetWeatherSeriesQuery(repository);

    const start = new Date("2024-01-01T00:00:00Z");
    const end = new Date("2024-01-02T00:00:00Z"); // 1일 ~ 2일 (총 2개)

    const fixtureData = createDailyFixture(start, 3);
    repository.setScenario(fixtureData);

    const range = { from: start, to: end };

    // Act (실행)
    const result = await query.execute(seoulLocation, range, "daily");

    // Assert (검증)
    expect(result.interval).toBe("daily");
    // 기댓값을 리터럴 객체로 정의하여 데이터 정합성 확인
    expect(result.observations).toEqual([
      {
        location: seoulLocation,
        time: new Date("2024-01-01T00:00:00Z"),
        temperature: { value: 25, unit: "C" },
        minTemperature: { value: 15, unit: "C" },
        maxTemperature: { value: 30, unit: "C" },
        type: "forecast",
        condition: "cloudy",
      },
      {
        location: seoulLocation,
        time: new Date("2024-01-02T00:00:00Z"),
        temperature: { value: 25, unit: "C" },
        minTemperature: { value: 15, unit: "C" },
        maxTemperature: { value: 30, unit: "C" },
        type: "forecast",
        condition: "cloudy",
      },
    ]);
  });
});
