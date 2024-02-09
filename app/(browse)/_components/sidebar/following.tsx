"use client";
import React from "react";
import { Follow, User } from "@prisma/client";
import { useSidebarStore } from "@/store/use-sidebar";
import { RecommendedItem } from "./recommended-item";

interface FollowingProps {
  data: (Follow & {
    following: User & {
      stream: {
        isLive: boolean;
      } | null;
    };
  })[];
}
export const Following = ({ data }: FollowingProps) => {
  const { collapsed } = useSidebarStore();
  if (!data.length) return null;

  return (
    <div>
      {!collapsed && (
        <div className="pl-6 mb-4">
          <p className="text-sm text-muted-foreground font-medium">Following</p>
        </div>
      )}
      <div className="space-y-2 px-2">
        {data.map((user) => (
          <div key={user.id}>
            <RecommendedItem
              username={user.following.username}
              imageUrl={user.following.imageUrl!}
              isLive={user.following.stream?.isLive}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
