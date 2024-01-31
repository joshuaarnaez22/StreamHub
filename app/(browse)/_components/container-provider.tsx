"use client";
import React from "react";
import { cn } from "@/lib/utils";
import { useSidebarStore } from "@/store/use-sidebar";
import { useMediaQuery } from "usehooks-ts";
interface ContainerProviderProps {
  children: React.ReactNode;
}
export const ContainerProvider = ({ children }: ContainerProviderProps) => {
  const { collapsed, onExpand, onCollapse } = useSidebarStore((state) => state);

  const matches = useMediaQuery("(max-width: 1024px)");

  React.useEffect(() => {
    if (matches) onCollapse();
    else onExpand();
  }, [matches, onCollapse, onExpand]);

  return (
    <div className={cn(collapsed ? "ml-20" : "ml-20 lg:ml-60")}>{children}</div>
  );
};
