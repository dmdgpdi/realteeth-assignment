import { Suspense } from "react";
import { DetailPage } from "@/pages";
import { Skeleton } from "@/shared/ui/skeleton";

export default function Page() {
  return (
    <Suspense fallback={<Skeleton className="h-dvh w-dvw" />}>
      <DetailPage />
    </Suspense>
  );
}
