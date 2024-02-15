import { Skeleton } from "@/components/ui/skeleton";
import { UserAvatar, UserAvatarSkeleton } from "./userAvatar";

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

export const DashboardSkeleton = () => {
  return (
    <div className="flex flex-col  justify-center">
      {[...Array(4)].map((_, i) => (
        <div className="flex justify-center items-center gap-x-4 p-2" key={i}>
          <Skeleton className="min-h-10 w-12 rounded-md" />
          <div className="flex-1 hidden lg:block">
            <Skeleton className="h-10" />
          </div>
        </div>
      ))}
    </div>
  );
};

export const ChatSkeleton = () => {
  return (
    <div className="flex flex-col space-y-6 justify-center m-6">
      <Skeleton className="h-12 w-40 rounded-md" />

      {[...Array(3)].map((_, i) => (
        <Skeleton className="h-16 w-full rounded-md" key={i} />
      ))}
    </div>
  );
};

export const VideoSkeleton = () => {
  return (
    <div className=" aspect-video border-x border-background">
      <Skeleton className="h-full w-full rounded-none" />
    </div>
  );
};

export const HeaderSkeleton = () => {
  return (
    <div className="flex items-center justify-between p-3 border-b">
      <Skeleton className="h-6 w-10 rounded-md" />
      <Skeleton className="h-6 w-20 rounded-md" />
      <Skeleton className="h-6 w-10 rounded-md" />
    </div>
  );
};
export const ChatFormSkeleton = () => {
  return (
    <div className="flex flex-col items-center gap-y-4 p-3">
      <Skeleton className="w-full h-10" />
      <div className="flex items-center gap-x-2 ml-auto">
        <Skeleton className="h-7 w-12" />
      </div>
    </div>
  );
};

export const StreamPlayerSkeleton = () => {
  return (
    <div className="grid grid-cols-1 lg:gap-y-0 lg:grid-cols-4 2xl:grid-cols-6 h-full">
      <div className=" space-y-4 col-span-1 lg:col-span-3 2xl:col-span-5 lg:overflow-y-auto hidden-scrollbar">
        <VideoSkeleton />
        <VideoInfoSkeleton />
      </div>
      <div className="col-span-1 bg-background">
        <div className="flex flex-col justify-between bg-background border-l border-b pt-0 h-[calc(100vh-80px)]">
          <HeaderSkeleton />
          <ChatFormSkeleton />
        </div>
      </div>
    </div>
  );
};

export const VideoInfoSkeleton = () => {
  return (
    <div className="flex flex-col lg:flex-row gap-y-4 lg:gap-y-0 items-start justify-between p-4 ">
      <div className="flex items-center gap-x-2">
        <UserAvatarSkeleton size="lg" />
        <div className="space-y-1">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-14" />
        </div>
      </div>
      <Skeleton className="h-10 w-32" />
    </div>
  );
};

export const ResultSkeleton = () => {
  return (
    <div className="h-full p-8 max-w-screen-2xl mx-auto">
      <Skeleton className="h-12 w-[290px] mb-4" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
        {[...Array(10)].map((_, index) => (
          <div
            className="group aspect-video relative cursor-pointer rounded-md"
            key={index}
          >
            <Skeleton className="h-full w-full" />
            <div className="flex gap-x-3 mt-4">
              <Skeleton className=" min-w-8 min-h-8 rounded-full" />
              <div className="flex flex-col gap-y-2 ">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-24" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
