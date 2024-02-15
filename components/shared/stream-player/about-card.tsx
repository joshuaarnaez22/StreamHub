import { AboutCardModal } from "./about-card-modal";
import { VerifiedMark } from "./verified-mark";

interface AbouCardProps {
  hostName: string;
  hostIdentity: string;
  viewerIdentity: string;
  bio: string | null;
  followedCount: number;
}
export const AboutCard = ({
  hostIdentity,
  hostName,
  viewerIdentity,
  bio,
  followedCount,
}: AbouCardProps) => {
  const hostAsViewer = `host-${hostIdentity}`;
  const isHost = viewerIdentity === hostAsViewer;

  const followersLabel = followedCount === 1 ? "follower" : "followers";

  return (
    <div className="px-4">
      <div className=" ground rounded-xl bg-background p-6 lg:p-10 flex flex-col gap-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-x-2 font-semibold text-lg lg:text-xl">
            About {hostName}
            <VerifiedMark />
          </div>
          <div className="">
            {isHost && <AboutCardModal initialBio={bio} />}
          </div>
        </div>
        <div className="text-sm text-muted-foreground">
          <span className=" font-bold text-primary">{followedCount}</span>{" "}
          {followersLabel}
        </div>
        <p className="text-sm">
          {bio ||
            `👋 Welcome to ${hostName}'s Stream Hub – your destination for diverse content! 🎮 Join me for gaming, creativity 🎨, and music vibes 🎶. Hit follow to be part of the ${hostName} community! 🚀`}
        </p>
      </div>
    </div>
  );
};
