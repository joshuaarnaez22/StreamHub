import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useCreatorSidebarStore } from "@/store/use-creator-sidebar";
import { LucideIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

interface NavigationProps {
  isActive: boolean;
  label: string;
  icon: LucideIcon;
  href: string;
}
export const NavigationItem = ({
  isActive,
  label,
  icon: Icon,
  href,
}: NavigationProps) => {
  const { collapsed } = useCreatorSidebarStore();

  return (
    <Button
      asChild
      variant="ghost"
      className={cn(
        "w-full h-12 hover:bg-slate-600",
        isActive && "bg-slate-500",
        collapsed ? "justify-center" : "justify-start"
      )}
    >
      <Link href={href}>
        <div className="flex items-center gap-x-4">
          <Icon className={cn("h-4 w-4", collapsed ? "mr-0" : "mr-2")} />
          {!collapsed && <span className="">{label}</span>}
        </div>
      </Link>
    </Button>
  );
};
