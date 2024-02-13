import React, { useMemo } from "react";
import { Hint } from "../hint";
import { Info } from "lucide-react";

interface ChatInfoProps {
  isChatFollowersOnly: boolean;
  isChatDelayed: boolean;
}
export const ChatInfo = ({
  isChatDelayed,
  isChatFollowersOnly,
}: ChatInfoProps) => {
  const hint = useMemo(() => {
    if (isChatFollowersOnly && !isChatDelayed) {
      return "Only followers can chat";
    }
    if (!isChatFollowersOnly && isChatDelayed) {
      return "Messages are delayed for 3 seconds";
    }
    if (isChatFollowersOnly && isChatDelayed) {
      return "Only followers can chat and Messages are delayed for 3 seconds";
    }
    return "";
  }, [isChatDelayed, isChatFollowersOnly]);

  const label = useMemo(() => {
    if (isChatFollowersOnly && !isChatDelayed) {
      return "Followers only";
    }
    if (!isChatFollowersOnly && isChatDelayed) {
      return "Slow mode";
    }
    if (isChatFollowersOnly && isChatDelayed) {
      return "Followers only and Slow mode";
    }
    return "";
  }, [isChatDelayed, isChatFollowersOnly]);

  if (!isChatFollowersOnly && !isChatDelayed) {
    return null;
  }
  return (
    <div className="p-2 text-muted-foreground bg-white/5 border border-white/10 w-full rounded-t-md flex items-center gap-x-2">
      <Hint label={hint} asChild>
        <Info className="h-4 w-4" />
      </Hint>
      <p className=" font-semibold text-xs">{label}</p>
    </div>
  );
};
