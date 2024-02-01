import { cn } from "@/lib/utils";
import React from "react";

interface LiveBadgeProps {
  className?: string;
}
export const LiveBadge = ({ className }: LiveBadgeProps) => {
  return (
    <div
      className={cn(
        " bg-red-500 text-center px-[8px] py-[2px] rounded-md uppercase text-[10px]  font-semibold tracking-wide",
        className
      )}
    >
      Live
    </div>
  );
};
