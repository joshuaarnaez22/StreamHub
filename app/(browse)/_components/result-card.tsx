import { Stream, User } from "@prisma/client";
import Link from "next/link";
import { Thumbnail } from "./thumbnail";
import { UserAvatar } from "@/components/shared/userAvatar";

interface ResultCardProps {
  data: {
    user: User;
    id: string;
    isLive: boolean;
    thumbnailUrl: string | null;
    name: string;
  };
}
export const ResultCard = ({ data }: ResultCardProps) => {
  return (
    <Link href={`/${data.user.username}`}>
      <div className="h-full w-full space-y-4">
        <Thumbnail
          src={data.thumbnailUrl}
          fallback={data.user.imageUrl!}
          isLive={data.isLive}
          username={data.user.username}
        />
        <div className="flex gap-x-3">
          <UserAvatar
            username={data.user.username}
            imageUrl={data.user.imageUrl!}
            isLive={data.isLive}
          />
          <div className="flex flex-col text-sm overflow-hidden">
            <p className=" font-semibold truncate hover:text-blue-500">
              {data.name}
            </p>
            <p className=" text-muted-foreground text-sm">
              {data.user.username}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};
