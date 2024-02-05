import { isFollowingUser } from "@/actions/follow-service";
import { getUserByUsername } from "@/actions/user-service";
import { notFound } from "next/navigation";
import React from "react";
import { Actions } from "./_components/actions";
import { isBlockedByUser } from "@/actions/block-service";

interface UserPageProps {
  params: {
    username: string;
  };
}
export default async function UserPage({ params }: UserPageProps) {
  const user = await getUserByUsername(params.username);

  if (!user) {
    return notFound();
  }

  const [isFollowing, isBlocked] = await Promise.all([
    isFollowingUser(user.id),
    isBlockedByUser(user.id),
  ]);

  if (isBlocked) {
    return notFound();
  }
  return (
    <div className="flex flex-col gap-y-4">
      <Actions id={user.id} isFollowing={isFollowing} />
    </div>
  );
}
