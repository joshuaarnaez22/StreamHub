"use client";
import React from "react";
import { cn } from "@/lib/utils";
import { useSidebarStore } from "@/store/use-sidebar";
import {
  FollowingSkeleton,
  MobileSidebarSkeleton,
  RecommendedSkeleton,
} from "@/components/shared/sidebar-skeleton";
import { useIsClient } from "usehooks-ts";
interface WrapperProps {
  children: React.ReactNode;
}

export const Wrapper = ({ children }: WrapperProps) => {
  const { collapsed } = useSidebarStore();
  const isClient = useIsClient();

  if (!isClient) {
    return (
      <aside className="fixed left-0 flex-col w-[70px] lg:w-60 h-full border-r-2 bg-gray-700 z-50">
        <MobileSidebarSkeleton />
        <FollowingSkeleton />
        <RecommendedSkeleton />
      </aside>
    );
  }
  return (
    <aside
      className={cn(
        "fixed w-60 h-full bg-gray-700 flex flex-col border-r-2 border-[#2D2E35] z-50 ",
        collapsed && "w-[70px]"
      )}
    >
      {children}
    </aside>
  );
};
