"use client";
import React, { useTransition } from "react";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { onFollow, onUnfollowUser } from "@/actions/server-actions/follow";

interface ActionsProps {
  id: string;
  isFollowing: boolean;
}
export const Actions = ({ id, isFollowing }: ActionsProps) => {
  const [isPending, startTransition] = useTransition();

  const handleFollow = () => {
    startTransition(() => {
      onFollow(id)
        .then((response) => {
          console.log(response);
          toast.success(`You are now following ${response.username}`, {
            icon: "👍",
          });
        })
        .catch((error) => {
          toast("Failed to follow", {
            icon: "❌",
          });
        });
    });
  };

  const handleUnFollow = () => {
    startTransition(() => {
      onUnfollowUser(id)
        .then((response) => {
          toast.success(`You are now unfollowing ${response.username}`, {
            icon: "👍",
          });
        })
        .catch((error) => {
          console.log(error);
          toast("Failed to unfollow", {
            icon: "❌",
          });
        });
    });
  };
  return (
    <Button
      variant="primary"
      onClick={() => (isFollowing ? handleUnFollow() : handleFollow())}
      disabled={isPending}
    >
      {isFollowing ? "Unfollow" : "Follow"}
    </Button>
  );
};
