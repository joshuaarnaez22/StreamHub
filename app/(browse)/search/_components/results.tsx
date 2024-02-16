import { getSearchStreams } from "@/actions/search-service";
import { ResultCard } from "./result-card";

interface ResultProps {
  term: string;
}
export const Result = async ({ term }: ResultProps) => {
  const data = await getSearchStreams(term);

  return (
    <div>
      <h2 className=" font-semibold text-lg mb-4">
        Result for term &quot;{term}&quot;
      </h2>
      {data.length === 0 && (
        <p className=" text-muted-foreground text-sm">
          No results found. Try searching for something else
        </p>
      )}
      <div className=" flex flex-col gap-y-4">
        {data.map((stream) => (
          <ResultCard key={stream.id} data={stream} />
        ))}
      </div>
    </div>
  );
};
