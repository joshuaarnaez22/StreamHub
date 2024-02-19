import { Button } from "@/components/ui/button";
import React from "react";
import { UrlCard } from "./_components/url-card";
import { notFound } from "next/navigation";
import { getStreamUser } from "@/actions/stream-service";
import { KeyCard } from "./_components/key-card";
import { ConnectModal } from "./_components/connect-modal";

export const dynamic = "force-dynamic";

export default async function KeysPage() {
  const stream = await getStreamUser();

  if (!stream) {
    notFound();
  }
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className=" text-2xl font-bold">Keys & URLs</h1>
        <ConnectModal />
      </div>
      <div className="space-y-4">
        <UrlCard value={stream.serverUrl} />
        <KeyCard value={stream.streamKey} />
      </div>
    </div>
  );
}
