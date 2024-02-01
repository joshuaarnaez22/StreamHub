import React from "react";
import { Button } from "@/components/ui/button";

import { Skeleton } from "@/components/ui/skeleton";

import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useSidebarStore } from "@/store/use-sidebar";
import Link from "next/link";
import { UserAvatar, UserAvatarSkeleton } from "@/components/shared/userAvatar";
import { LiveBadge } from "@/components/shared/live-badge";

interface RecommendedItemProps {
  username: string;
  isLive: boolean;
  imageUrl: string;
}
export const RecommendedItem = ({
  username,
  isLive,
  imageUrl,
}: RecommendedItemProps) => {
  const pathname = usePathname();
  const { collapsed } = useSidebarStore((state) => state);
  const href = `/${username}`;
  const isActive = pathname === href;

  return (
    <Button
      variant="ghost"
      asChild
      className={cn(collapsed ? "justify-center" : "justify-start")}
    >
      <div
        className={cn(
          "w-full h-12 p-2 items-center justify-start",
          isActive && "bg-accent"
        )}
      >
        <Link href={href}>
          <div
            className={cn(
              "flex items-center gap-x-4 ",
              collapsed && "justify-center"
            )}
          >
            <UserAvatar
              isLive={isLive}
              imageUrl={imageUrl}
              username={username}
            />
            {!collapsed && <div className=" truncate">{username}</div>}
            {!collapsed && isLive && <LiveBadge />}
          </div>
        </Link>
      </div>
    </Button>
  );
};
