import { CurrentLocationWeatherCard } from "@/features/weather";

/**
 * @private
 */
export function HomePage() {
  return (
    <main className="container max-w-4xl mx-auto px-2 py-8 space-y-12 ">
      <section>
        <CurrentLocationWeatherCard />
      </section>

      {/* <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold tracking-tight">나의 즐겨찾기</h2>
            <span className="text-xs text-muted-foreground">(최대 6개)</span>
          </div>
          <FavoriteList />
        </section> */}
    </main>
  );
}
