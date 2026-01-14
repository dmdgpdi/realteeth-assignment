"use client";

import { CurrentLocationWeatherCard } from "@/features/weather";
import { FavoriteLocationWeatherCardList } from "@/widgets/FavoriteLocationWeatherCardList";

export function HomePage() {
  return (
    <main className="container max-w-4xl mx-auto px-2 py-8 space-y-12 ">
      <section>
        <CurrentLocationWeatherCard />
      </section>

      <section>
        <FavoriteLocationWeatherCardList />
      </section>
    </main>
  );
}
