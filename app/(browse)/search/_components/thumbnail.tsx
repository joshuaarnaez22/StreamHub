import { LiveBadge } from "@/components/shared/live-badge";
import { UserAvatar } from "@/components/shared/userAvatar";
import Image from "next/image";
interface ThumbnailProps {
  src: string | null;
  fallback: string;
  isLive: boolean;
  username: string;
}
export const Thumbnail = ({
  src,
  fallback,
  isLive,
  username,
}: ThumbnailProps) => {
  let content;
  if (!src) {
    content = (
      <div className="bg-background flex flex-col items-center justify-center gap-y-4 h-full w-full transition-transform group-hover:translate-x-2 group-hover:-translate-y-2  rounded-md">
        <UserAvatar
          imageUrl={fallback}
          isLive={isLive}
          size="lg"
          showBadge
          username={username}
        />
      </div>
    );
  } else {
    content = (
      <div>
        <Image
          src={src}
          fill
          alt="thumbnail"
          className=" absolute object-cover bg-background transition-transform group-hover:translate-x-2 group-hover:-translate-y-2  rounded-md"
        />
        {isLive && (
          <>
            <div className=" z-50 absolute top-2 left-2 group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform">
              <LiveBadge />
            </div>
          </>
        )}
      </div>
    );
  }
  return (
    <div className="group aspect-video relative cursor-pointer rounded-md">
      <div className=" rounded-md absolute inset-0 bg-blue-600  opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center" />
      {content}
    </div>
  );
};
