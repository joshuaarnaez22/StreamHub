"use client";
import React from "react";
import { Hint } from "../hint";
import { MessageSquare, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ChatType, useChatSidebarStore } from "@/store/use-chat-sidebar";

export const VariantToogle = () => {
  const { onChangeType, type } = useChatSidebarStore();

  const Icon = type === ChatType.Chat ? Users : MessageSquare;
  const isChat = type === ChatType.Chat;

  const onToogle = () => {
    const newType = isChat ? ChatType.Community : ChatType.Chat;
    onChangeType(newType);
  };

  const label = isChat ? "Community" : "Go back to chat";
  return (
    <Hint label={label} asChild>
      <Button
        variant="ghost"
        className="hover:bg-white/10 hover:text-primary bg-transparent"
        onClick={onToogle}
      >
        <Icon className="w-4 h-4" />
      </Button>
    </Hint>
  );
};
