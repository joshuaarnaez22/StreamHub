"use client";

import { Button } from "@/components/ui/button";
import { CheckCheck, Copy } from "lucide-react";
import { useState } from "react";

interface CopyButtonProps {
  value?: string;
}

export const CopyButton = ({ value }: CopyButtonProps) => {
  const [copied, setCopied] = useState(false);

  const onCopy = () => {
    if (!value) return;

    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  const Icon = copied ? CheckCheck : Copy;
  return (
    <div>
      <Button
        onClick={onCopy}
        disabled={!value || copied}
        variant="ghost"
        size="sm"
      >
        <Icon className="w-5 h-5" />
      </Button>
    </div>
  );
};
