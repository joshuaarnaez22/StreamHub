"use client";
import { cn } from "@/lib/utils";
import { useSidebarStore } from "@/store/use-sidebar";

interface WrapperProps {
  children: React.ReactNode;
}

export const Wrapper = ({ children }: WrapperProps) => {
  const { collapsed } = useSidebarStore();
  return (
    <aside
      className={cn(
        "fixed w-60 h-full bg-gray-700 flex flex-col border-r-2 border-[#2D2E35] z-50",
        collapsed && "w-[70px]"
      )}
    >
      {children}
    </aside>
  );
};
