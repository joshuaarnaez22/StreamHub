"use client";
import React, { useEffect, useMemo, useState } from "react";
import { ChatType, useChatSidebarStore } from "@/store/use-chat-sidebar";
import { useMediaQuery } from "usehooks-ts";

import {
  useChat,
  useConnectionState,
  useRemoteParticipant,
} from "@livekit/components-react";
import { ConnectionState } from "livekit-client";
import { ChatHeader } from "./chat-header";
import { ChatForm } from "./chat-form";
import { ChatList } from "./chat-list";
import { ChatCommunity } from "./chat-community";

interface ChatProps {
  isFollowing: boolean;
  isChatEnabled: boolean;
  viewerName: string;
  hostIdentity: string;
  hostName: string;
  isChatDelayed: boolean;
  isChatFollowersOnly: boolean;
}
export const Chat = ({
  isChatEnabled,
  isFollowing,
  viewerName,
  hostIdentity,
  hostName,
  isChatFollowersOnly,
  isChatDelayed,
}: ChatProps) => {
  const { onExpand, type } = useChatSidebarStore();

  const matches = useMediaQuery("(max-width: 1024px)");
  const connectionState = useConnectionState();
  const participant = useRemoteParticipant(hostIdentity);
  const { chatMessages: messages, send } = useChat();
  const isOnline = participant && connectionState === ConnectionState.Connected;

  const isHidden = !isOnline || !isChatEnabled;
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (matches) onExpand();
  }, [matches, onExpand]);

  const reverseMessages = useMemo(() => {
    return messages.sort((a, b) => b.timestamp - a.timestamp);
  }, [messages]);

  const sendMessage = () => {
    if (!send) return;
    send(message);
    setMessage("");
  };

  const messageOnChange = (value: string) => setMessage(value);

  return (
    <div className=" flex flex-col bg-background border-l border-b pt-0 h-[calc(100vh-80px)]">
      <ChatHeader />
      {type === ChatType.Chat && (
        <>
          <ChatList isHidden={isHidden} messages={reverseMessages} />
          <ChatForm
            onSubmit={sendMessage}
            value={message}
            onChange={messageOnChange}
            isHidden={isHidden}
            isChatFollowersOnly={isChatFollowersOnly}
            isChatDelayed={isChatDelayed}
            isFollowing={isFollowing}
          />
        </>
      )}
      {type === ChatType.Community && (
        <>
          <ChatCommunity
            isHidden={isHidden}
            hostName={hostName}
            viewerName={viewerName}
          />
        </>
      )}
    </div>
  );
};
