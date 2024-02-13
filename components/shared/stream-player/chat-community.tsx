"use client";
import { ChangeEvent, useMemo, useState } from "react";
import { useParticipants } from "@livekit/components-react";
import { useDebounce } from "usehooks-ts";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CommunityItem } from "./community-item";
interface ChatCommunityProps {
  viewerName: string;
  hostName: string;
  isHidden: boolean;
}
export const ChatCommunity = ({
  viewerName,
  hostName,
  isHidden,
}: ChatCommunityProps) => {
  const [value, setValue] = useState("");
  const debouncedValue = useDebounce<string>(value, 500);
  const participants = useParticipants();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const filterParticipants = useMemo(() => {
    const removedHostAsViewer = participants.filter((participant) => {
      const hostIdentity = `host-${participant.identity}`;
      return !participants.some((p) => p.identity === hostIdentity);
    });

    return removedHostAsViewer.filter((participant) =>
      participant.name?.toLowerCase().includes(debouncedValue.toLowerCase())
    );
  }, [debouncedValue, participants]);

  if (isHidden) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <p className="text-sm text-muted-foreground">Community is disabled</p>
      </div>
    );
  }
  return (
    <div className="p-4">
      <Input onChange={handleChange} />

      <ScrollArea className="mt-4 gap-y-2">
        <p className="text-center text-sm text-muted-foreground hidden last:block p-2">
          No results
        </p>
        {filterParticipants.map((participant) => (
          <CommunityItem
            key={participant.identity}
            hostName={hostName}
            viewerName={viewerName}
            participantName={participant.name}
            participantIdentity={participant.identity}
          />
        ))}
      </ScrollArea>
    </div>
  );
};
