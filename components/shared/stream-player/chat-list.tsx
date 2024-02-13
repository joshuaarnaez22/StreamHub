"use client";
import React from "react";
import { ReceivedChatMessage } from "@livekit/components-react";
import { ChatMessage } from "./chat-message";

interface ChatListProps {
  isHidden: boolean;
  messages: ReceivedChatMessage[];
}
export const ChatList = ({ isHidden, messages }: ChatListProps) => {
  if (isHidden || !messages || !messages.length) {
    return (
      <div className=" flex flex-1 justify-center items-center">
        <p className="text-sm text-muted-foreground">
          {isHidden ? "Chat is disabled" : "Welcome to the chat"}
        </p>
      </div>
    );
  }
  return (
    <div className="flex flex-1 flex-col-reverse overflow-y-auto p-3 h-full ">
      {messages.map((message) => (
        <ChatMessage key={message.timestamp} data={message} />
      ))}
    </div>
  );
};
