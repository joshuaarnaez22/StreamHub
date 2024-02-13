"use client";
import React from "react";
import { useUser } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { Fullscreen, KeyRound, MessageSquare, Users } from "lucide-react";
import { NavigationItem } from "./navigation-item";
import { DashboardSkeleton } from "@/components/shared/skeleton-loader";

export const Navigation = () => {
  const pathName = usePathname();
  const { user } = useUser();
  const routes = [
    {
      label: "Stream",
      href: `/u/${user?.username}`,
      icon: Fullscreen,
    },
    {
      label: "Keys",
      href: `/u/${user?.username}/keys`,
      icon: KeyRound,
    },
    {
      label: "Chat",
      href: `/u/${user?.username}/chat`,
      icon: MessageSquare,
    },
    {
      label: "Community",
      href: `/u/${user?.username}/community`,
      icon: Users,
    },
  ];

  if (!user?.username) {
    return <DashboardSkeleton />;
  }
  return (
    <div className="flex flex-col space-y-2 px-2 pt-4 lg:pt-0">
      {routes.map((route) => (
        // <div key={route.href}>{route.label}</div>
        <NavigationItem
          key={route.href}
          isActive={pathName === route.href}
          label={route.label}
          icon={route.icon}
          href={route.href}
        />
      ))}
    </div>
  );
};
