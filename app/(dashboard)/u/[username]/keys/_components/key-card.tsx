"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { CopyButton } from "./copy-button";
import { Button } from "@/components/ui/button";

interface KeyCardProps {
  value: string | null;
}
export const KeyCard = ({ value }: KeyCardProps) => {
  const [show, setShow] = useState(false);

  return (
    <div className="p-6 rounded-xl bg-muted">
      <div className="flex gap-x-10">
        <p className="font-semibold shrink-0">Stream Key</p>
        <div className="w-full">
          <div className="flex items-center gap-x-2">
            <Input
              disabled
              value={value || ""}
              placeholder="Stream Key"
              type={show ? "text" : "password"}
            />
            <CopyButton value={value || ""} />
          </div>
          <Button variant="link" size="sm" onClick={() => setShow(!show)}>
            {show ? "Hide" : "Show"}
          </Button>
        </div>
      </div>
    </div>
  );
};
