"use client";
import React from "react";
import { useSidebarStore } from "@/store/use-sidebar";
import { User } from "@prisma/client";
import { RecommendedItem } from "./recommended-item";

interface RecommendedProps {
  data: (User & {
    stream: {
      isLive: boolean;
    } | null;
  })[];
}

export const Recommended = ({ data }: RecommendedProps) => {
  const { collapsed } = useSidebarStore((state) => state);
  const showLabel = !collapsed && data.length > 0;
  return (
    <div>
      {showLabel && (
        <div className="pl-6 mb-4">
          <p className="text-sm text-muted-foreground font-medium">
            Recommended
          </p>
        </div>
      )}
      <div className="space-y-2 px-2 ">
        {data.map((user) => (
          <RecommendedItem
            key={user.id}
            username={user.username}
            isLive={user.stream?.isLive}
            imageUrl={user.imageUrl!}
          />
        ))}
      </div>
    </div>
  );
};
