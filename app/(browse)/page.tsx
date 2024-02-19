import { Suspense } from "react";
import { Result } from "./_components/results";
import { ResultSkeleton } from "@/components/shared/skeleton-loader";

export const dynamic = "force-dynamic";
export default async function Home() {
  return (
    <div className="h-full p-8 max-w-screen-2xl mx-auto">
      <Suspense fallback={<ResultSkeleton />}>
        <Result />
      </Suspense>
    </div>
  );
}
