"use client";
import React from "react";
import { Hint } from "../hint";
import { ArrowLeftFromLine, ArrowRightFromLine } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useChatSidebarStore } from "@/store/use-chat-sidebar";

export const ChatToogle = () => {
  const { onExpand, collapsed, onCollapse } = useChatSidebarStore();

  const Icon = collapsed ? ArrowLeftFromLine : ArrowRightFromLine;

  const onToogle = () => {
    if (collapsed) onExpand();
    else onCollapse();
  };

  const label = collapsed ? "Expand" : "Collapse";
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
