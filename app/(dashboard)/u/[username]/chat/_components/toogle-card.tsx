"use client";
import { Switch } from "@/components/ui/switch";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

type fieldTypes = "isChatEnabled" | "isChatDelayed" | "isChatFollowersOnly";

interface ToogleCardProps {
  field: fieldTypes;
  label: string;
  value: boolean;
}
export const ToogleCard = ({
  field,
  label,
  value = false,
}: ToogleCardProps) => {
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();
  const handleChange = async () => {
    try {
      setIsPending(true);
      await axios.put("/api/user-actions/chat/toogle", {
        [field]: !value,
      });
      toast.success("Chat settings updated");
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="rounded-xl p-6 bg-muted">
      <div className="flex items-center justify-between">
        <p className=" font-bold shrink-0">{label}</p>
        <div className="space-y-2">
          <Switch
            checked={value}
            onCheckedChange={handleChange}
            disabled={isPending}
          >
            {value ? "On" : "Off"}
          </Switch>
        </div>
      </div>
    </div>
  );
};
