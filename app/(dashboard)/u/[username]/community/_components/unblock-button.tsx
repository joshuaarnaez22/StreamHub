"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import axios from "axios";
interface UnblockButtonProps {
  userId: string;
}
export const UnblockButton = ({ userId }: UnblockButtonProps) => {
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  const handleUnBlock = async () => {
    try {
      setIsPending(true);
      const { data } = await axios.post("/api/user-actions/unblock", {
        id: userId,
      });
      toast.success(data.message, {
        icon: "👍",
      });
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsPending(false);
    }
  };
  return (
    <Button
      onClick={handleUnBlock}
      disabled={isPending}
      variant="link"
      size="sm"
      className="text-blue-500 w-full"
    >
      Unblock
    </Button>
  );
};
