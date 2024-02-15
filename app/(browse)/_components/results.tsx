import { getStreams } from "@/actions/feed-service";
import { ResultCard } from "./result-card";

export const Result = async () => {
  const data = await getStreams();

  return (
    <div>
      <h2 className=" font-semibold text-lg mb-4">
        Streams we think you&apos;ll like
      </h2>
      {data.length === 0 && (
        <div className=" text-muted-foreground text-sm">No streams found</div>
      )}
      <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-y-8 gap-x-6">
        {data.map((stream) => (
          <ResultCard key={stream.id} data={stream} />
        ))}
      </div>
    </div>
  );
};
