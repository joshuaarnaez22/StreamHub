import { isFollowingUser } from "@/actions/follow-service";
import { getUserByUsername } from "@/actions/user-service";
import { notFound } from "next/navigation";
import React from "react";
import { isBlockedByUser } from "@/actions/block-service";
import { StreamPlayer } from "@/components/shared/stream-player";

interface UserPageProps {
  params: {
    username: string;
  };
}
export default async function UserPage({ params }: UserPageProps) {
  const user = await getUserByUsername(params.username);

  if (!user || !user.stream) {
    notFound();
  }

  const [isFollowing, isBlocked] = await Promise.all([
    isFollowingUser(user.id),
    isBlockedByUser(user.id),
  ]);

  if (isBlocked) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-y-4">
      <StreamPlayer user={user} isFollowing={isFollowing} />
    </div>
  );
}
