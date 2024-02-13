"use client";

import {
  useParticipants,
  useRemoteParticipant,
} from "@livekit/components-react";
import { UserAvatar } from "../userAvatar";
import { VerifiedMark } from "./verified-mark";
import { UserIcon } from "lucide-react";
import { VideoActions } from "./video-actions";

interface VidoeInfoProps {
  hostName: string;
  hostIdentity: string;
  viewerIdentity: string;
  imageUrl: string;
  isFollowing: boolean;
  name?: string;
}
export const VidoeInfo = ({
  hostIdentity,
  hostName,
  viewerIdentity,
  imageUrl,
  isFollowing,
  name,
}: VidoeInfoProps) => {
  const participants = useParticipants();

  const participant = useRemoteParticipant(hostIdentity);

  const isLive = !!participant;
  const participantCount = participants.length - 1;

  const hostAsViewer = `host-${hostIdentity}`;
  const isHost = hostAsViewer === viewerIdentity;

  return (
    <div className="flex flex-col lg:flex-row gap-y-4 lg:gap-y-0 items-start justify-between p-4 ">
      <div className="flex items-center gap-x-3">
        <UserAvatar
          imageUrl={imageUrl}
          username={hostName}
          size="lg"
          isLive={isLive}
          showBadge
        />
        <div className="space-y-1">
          <div className="flex items-center gap-x-2">
            <h2 className=" text-lg font-semibold">{hostName}</h2>
            <VerifiedMark />
          </div>
          <p className="text-sm font-semibold">{name}</p>
          {isLive ? (
            <div className="flex items-center gap-x-1 font-semibold text-xs text-rose-500">
              <UserIcon className="h-4 w-4" />
              <p>
                {participantCount}{" "}
                {participantCount === 1 ? "viewer" : "viewers"}
              </p>
            </div>
          ) : (
            <p className="text-xs text-muted-foreground font-semibold">
              Offline
            </p>
          )}
        </div>
      </div>
      <VideoActions
        isFollowing={isFollowing}
        isHost={isHost}
        hostIdentity={hostIdentity}
      />
    </div>
  );
};
