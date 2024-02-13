"use client";
import React from "react";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "usehooks-ts";
import { useCreatorSidebarStore } from "@/store/use-creator-sidebar";
interface ContainerProviderProps {
  children: React.ReactNode;
}
export const ContainerProvider = ({ children }: ContainerProviderProps) => {
  const { collapsed, onExpand, onCollapse } = useCreatorSidebarStore(
    (state) => state
  );

  const matches = useMediaQuery("(max-width: 1024px)");

  React.useEffect(() => {
    if (matches) onCollapse();
    else onExpand();
  }, [matches, onCollapse, onExpand]);

  return (
    <div
      className={cn("flex-1", collapsed ? "ml-[70px]" : "ml-[70px] lg:ml-60")}
    >
      {children}
    </div>
  );
};
