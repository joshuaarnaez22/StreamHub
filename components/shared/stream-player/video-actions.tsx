"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { auth, useAuth } from "@clerk/nextjs";
import axios from "axios";
import toast from "react-hot-toast";

interface VideoActionsProps {
  isFollowing: boolean;
  isHost: boolean;
  hostIdentity: string;
}
export const VideoActions = ({
  isFollowing,
  isHost,
  hostIdentity,
}: VideoActionsProps) => {
  const { userId } = useAuth();
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);

  const toogleFollow = () => {
    if (!userId) {
      return router.push("/sign-in");
    }
    if (isHost) return;

    if (isFollowing) handleUnFollow();
    else handleFollow();
  };

  const handleFollow = async () => {
    try {
      setIsPending(true);
      const { data } = await axios.post("/api/user-actions/follow", {
        id: hostIdentity,
      });
      toast.success(data.message, {
        icon: "👍",
      });
      router.refresh();
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong", {
        icon: "❌",
      });
    } finally {
      setIsPending(false);
    }
  };
  const handleUnFollow = async () => {
    try {
      setIsPending(true);
      const { data } = await axios.post("/api/user-actions/unfollow", {
        id: hostIdentity,
      });
      toast.success(data.message, {
        icon: "👍",
      });
      router.refresh();
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong", {
        icon: "❌",
      });
    } finally {
      setIsPending(false);
    }
  };

  return (
    <Button
      disabled={isPending || isHost}
      onClick={toogleFollow}
      size="sm"
      variant="primary"
      className="w-full lg:w-auto"
    >
      <Heart
        className={cn("w-4 h-4 mr-2", isFollowing ? "fill-white" : "fill-none")}
      />
      {isFollowing ? "Unfollow" : "Follow"}
    </Button>
  );
};
