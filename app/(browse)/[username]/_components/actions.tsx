"use client";
import React, { useTransition } from "react";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { onFollow, onUnFollow } from "@/actions/server-actions/follow";

interface ActionsProps {
  id: string;
  isFollowing: boolean;
}
export const Actions = ({ id, isFollowing }: ActionsProps) => {
  const [isPending, startTransition] = useTransition();

  const handleFollow = () => {
    startTransition(() => {
      onFollow(id)
        .then(({ error, follow }) => {
          if (follow) {
            toast.success(
              `You are now following ${follow.following.username}`,
              {
                icon: "👍",
              }
            );
          }
          if (error) {
            toast.error(error, {
              icon: "❌",
            });
          }
        })
        .catch((e: any) => {
          console.log(e);

          toast("Something went wrong", {
            icon: "❌",
          });
        });
    });
  };

  const handleUnFollow = () => {
    startTransition(() => {
      onUnFollow(id)
        .then(({ error, follow }) => {
          if (follow) {
            toast.success(`You have unfollow ${follow.following.username}`, {
              icon: "👍",
            });
          }
          if (error) {
            toast.error(error, {
              icon: "❌",
            });
          }
        })
        .catch((e: any) => {
          console.log(e);

          toast("Something went wrong", {
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
