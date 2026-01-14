import { CurrentLocationWeatherCard } from "@/features/weather";
import { Button } from "@/shared/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";
import { Input } from "@/shared/ui/input";
import { FavoriteList } from "@/widgets/favorite-list";

/**
 * @private
 */
export function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground pb-20">
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
        <div className="container flex h-14 items-center max-w-4xl mx-auto px-4">
          <h1 className="text-xl font-bold tracking-tight">Weather AI</h1>
        </div>
      </header>

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
    </div>
  );
}
