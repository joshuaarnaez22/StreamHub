import { SearchResultSkeleton } from "@/components/shared/skeleton-loader";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { Result } from "./_components/results";

interface SearchPageProps {
  searchParams: {
    term?: string;
  };
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  if (!searchParams.term) {
    return redirect("/");
  }

  return (
    <div className="h-full p-8 max-w-screen-2xl mx-auto ">
      <Suspense fallback={<SearchResultSkeleton />}>
        <Result term={searchParams.term} />
      </Suspense>
    </div>
  );
}
