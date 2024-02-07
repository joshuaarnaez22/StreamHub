"use client";

import { cn } from "@/lib/utils";
import { useCreatorSidebarStore } from "@/store/use-creator-sidebar";
import React from "react";

interface WrapperProps {
  children: React.ReactNode;
}
export const Wrapper = ({ children }: WrapperProps) => {
  const { collapsed } = useCreatorSidebarStore();
  return (
    <aside
      className={cn(
        "fixed w-[70px] lg:w-60 h-full bg-gray-700 flex flex-col border-r-2 border-[#2D2E35] z-50",
        collapsed && "lg:w-[70px]"
      )}
    >
      {children}
    </aside>
  );
};
