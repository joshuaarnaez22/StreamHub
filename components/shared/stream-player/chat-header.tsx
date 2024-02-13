import React from "react";
import { ChatToogle } from "./chat-toogle";
import { VariantToogle } from "./variant-toogle";

export const ChatHeader = () => {
  return (
    <div className="flex items-center justify-between p-3 border-b">
      <div>
        <ChatToogle />
      </div>
      <p className=" font-semibold text-primary text-center">Stream Chat</p>
      <div>
        <VariantToogle />
      </div>
    </div>
  );
};
