"use client";
import React from "react";
import { useViewerToken } from "@/hooks/use-viewer-token";
import { Stream, User } from "@prisma/client";
import { LiveKitRoom } from "@livekit/components-react";
import { Video } from "./video";
import { useChatSidebarStore } from "@/store/use-chat-sidebar";
import { cn } from "@/lib/utils";
import { Chat } from "./chat";
import { ChatToogle } from "./chat-toogle";
import { StreamPlayerSkeleton } from "../skeleton-loader";
import { VidoeInfo } from "./video-info";
import { InfoCard } from "./info-card";

interface StreamPlayerProps {
  user: User & { stream: Stream | null };
  isFollowing: boolean;
}
export const StreamPlayer = ({ user, isFollowing }: StreamPlayerProps) => {
  const { token, name, identity } = useViewerToken(user.id);
  const { collapsed } = useChatSidebarStore();

  if (!token || !name || !identity) {
    return <StreamPlayerSkeleton />;
  }
  return (
    <>
      {collapsed && (
        <div className="hidden lg:block fixed top-[100px] right-2 z-50">
          <ChatToogle />
        </div>
      )}
      <LiveKitRoom
        token={token}
        serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_WS_URL}
        video={true}
        audio={true}
        className={cn(
          "grid grid-cols-1 lg:gap-y-0 lg:grid-cols-4 2xl:grid-cols-6 h-full",
          collapsed && "lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2"
        )}
      >
        <div className=" space-y-4 col-span-1 lg:col-span-3 2xl:col-span-5 lg:overflow-y-auto hidden-scrollbar mb-4">
          <Video hostName={user.username} hostIdentity={user.id} />
          <VidoeInfo
            hostName={user.username}
            hostIdentity={user.id}
            viewerIdentity={identity}
            imageUrl={user.imageUrl!}
            isFollowing={isFollowing}
            name={user.stream?.name}
          />
          <InfoCard
            name={user.stream?.name!}
            thumbnailUrl={user.stream?.thumbnailUrl ?? null}
            viewerIdentity={identity}
            hostIdentity={user.id}
          />
        </div>
        <div className={cn("col-span-1", collapsed && "hidden")}>
          <Chat
            isFollowing={isFollowing}
            isChatEnabled={user.stream?.isChatEnabled!}
            viewerName={name}
            hostIdentity={user.id}
            hostName={user.username}
            isChatDelayed={user.stream?.isChatDelayed!}
            isChatFollowersOnly={user.stream?.isChatFollowersOnly!}
          />
        </div>
      </LiveKitRoom>
    </>
  );
};
