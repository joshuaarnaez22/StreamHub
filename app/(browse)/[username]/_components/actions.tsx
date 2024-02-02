"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import axios from "axios";
import { Button } from "@/components/ui/button";

interface ActionsProps {
  id: string;
  isFollowing: boolean;
}
export const Actions = ({ id, isFollowing }: ActionsProps) => {
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();
  const [following, setFollowing] = useState(isFollowing);
  const handleFollow = async () => {
    try {
      setIsPending(true);
      const { data } = await axios.post("/api/user-actions/follow", { id });
      toast.success(data.message, {
        icon: "👍",
      });
      setFollowing(!following);
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
      const { data } = await axios.post("/api/user-actions/unfollow", { id });
      toast.success(data.message, {
        icon: "👍",
      });
      setFollowing(!following);
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
      variant="primary"
      onClick={() => (isFollowing ? handleUnFollow() : handleFollow())}
      disabled={isPending}
    >
      {following ? "Unfollow" : "Follow"}
    </Button>
  );
};
