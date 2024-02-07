import { getStreamUser } from "@/actions/stream-service";
import { notFound } from "next/navigation";
import React from "react";
import { ToogleCard } from "./_components/toogle-card";

export default async function ChatPage() {
  const stream = await getStreamUser();

  if (!stream) {
    return notFound();
  }

  return (
    <div className="p-5">
      <div className="mb-6">
        <h1 className=" text-2xl font-bold">Chat settings</h1>
      </div>
      <div className="space-y-6">
        <ToogleCard
          field="isChatEnabled"
          label="Enable chat"
          value={stream.isChatEnabled}
        />
        <ToogleCard
          field="isChatDelayed"
          label="Delayed chat"
          value={stream.isChatDelayed}
        />
        <ToogleCard
          field="isChatFollowersOnly"
          label="Must be following to chat"
          value={stream.isChatFollowersOnly}
        />
      </div>
    </div>
  );
}
