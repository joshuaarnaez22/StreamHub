import { Skeleton } from "@/components/ui/skeleton";

export const RecommendedItemSkeleton = () => {
  return (
    <div className="flex items-center gap-x-4 px-4 py-2 ">
      <Skeleton className=" min-w-8 min-h-8 rounded-full" />
      <div className="flex-1">
        <Skeleton className="h-6 " />
      </div>
    </div>
  );
};

export const RecommendedSkeleton = () => {
  return (
    <div className="">
      {[...Array(4)].map((_, i) => (
        <RecommendedItemSkeleton key={i} />
      ))}
    </div>
  );
};

export const SidebarSkeleton = () => {
  return (
    <aside className="fixed left-0 flex-col w-[70px] lg:w-60 h-full border-r-2 bg-gray-700 z-50">
      <MobileSidebarSkeleton />
      <RecommendedSkeleton />
    </aside>
  );
};

export const MobileSidebarSkeleton = () => {
  return (
    <div className="p-3 w-full mb-2 hidden lg:flex items-center justify-between">
      <Skeleton className="h-6 w-[100px]" />
      <Skeleton className="h-6 w-6" />
    </div>
  );
};

export const FollowingSkeleton = () => {
  return (
    <div className="mb-6">
      {[...Array(3)].map((_, i) => (
        <RecommendedItemSkeleton key={i} />
      ))}
    </div>
  );
};
