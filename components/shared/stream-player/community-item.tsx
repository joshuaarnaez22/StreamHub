"use client";
import { cn, generateHexColorFromString } from "@/lib/utils";
import { Hint } from "../hint";
import { Button } from "@/components/ui/button";
import { MinusCircle } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface CommunityProps {
  hostName: string;
  viewerName: string;
  participantName?: string;
  participantIdentity: string;
}

export const CommunityItem = ({
  hostName,
  viewerName,
  participantName,
  participantIdentity,
}: CommunityProps) => {
  const router = useRouter();
  const [loadBlocking, setLoadBlocking] = useState(false);

  const isSelf = viewerName === participantName;
  const isHost = hostName === viewerName;

  const color = generateHexColorFromString(participantName);

  const handleBlock = async () => {
    try {
      if (!participantName || isSelf || !isHost) {
        toast.error("You are not allowed to block yourself");
        return;
      }
      setLoadBlocking(true);
      const { data } = await axios.post("/api/user-actions/block", {
        id: participantIdentity,
      });
      toast.success(data.message);
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoadBlocking(false);
    }
  };
  return (
    <div
      className={cn(
        "group flex items-center justify-between w-full p-2 rounded-md text-sm hover:bg-white/5",
        loadBlocking && "opacity-50 pointer-events-none"
      )}
    >
      <p style={{ color: color }}>{participantName}</p>
      {isHost && !isSelf && (
        <Hint label="Block" asChild>
          <Button
            disabled={loadBlocking}
            variant="ghost"
            className=" w-auto h-auto opacity-0 group-hover:opacity-100 p-1 transition"
            onClick={handleBlock}
          >
            <MinusCircle className="h-4 w-4 text-muted-foreground" />
          </Button>
        </Hint>
      )}
    </div>
  );
};
