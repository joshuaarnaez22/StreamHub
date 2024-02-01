import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { LiveBadge } from "./live-badge";

const avatarSizes = cva("", {
  variants: {
    variant: {
      default: "bg-green-200 hover:bg-green-100",
      hover: ["hover:bg-green-200"],
      dark: ["bg-green-900", "hover:bg-slate-800", "text-white"],
      gradient: [
        "bg-gradient-to-br from-cyan-500 to-blue-500 hover:from-blue-500 hover:to-cyan-500",
      ],
      hoverBorder: ["hover:border-4", "rounded-full", "p-2", "border-black"],
      border: [
        "border-4",
        "rounded-full",
        "p-2",
        "border-black",
        "hover:bg-gradient-to-br",
        "hover:from-indigo-500",
        "hover:via-purple-500",
        "hover:to-pink-500",
      ],
    },
    size: {
      default: "h-8 w-8",
      lg: "h-14 w-14",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

interface UserAvatarProps extends VariantProps<typeof avatarSizes> {
  isLive: boolean;
  imageUrl: string;
  username: string;
  showBadge?: boolean;
}

export const UserAvatar = ({
  isLive,
  imageUrl,
  username,
  showBadge,
  size,
  variant,
}: UserAvatarProps) => {
  const canShowBadge = showBadge && isLive;
  return (
    <div className="relative">
      <Avatar
        className={cn(
          isLive && "ring-2 ring-green-600 border border-background",
          avatarSizes({ size })
        )}
      >
        <AvatarImage src={imageUrl} className=" object-cover" />
        <AvatarFallback>
          {username[0]}
          {username[username.length - 1]}
        </AvatarFallback>
      </Avatar>
      {canShowBadge && (
        <div className=" absolute -bottom-3 left-1/2 transform -translate-x-1/2">
          <LiveBadge />
        </div>
      )}
    </div>
  );
};

interface UserSkeletonsProps extends VariantProps<typeof avatarSizes> {}

export const UserAvatarSkeleton = ({ size }: UserSkeletonsProps) => {
  return (
    <Skeleton className={cn("rounded-full", avatarSizes({ size }))}></Skeleton>
  );
};
