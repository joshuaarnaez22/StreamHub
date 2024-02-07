import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import { LogOut } from "lucide-react";
import Link from "next/link";
import React from "react";

export const Actions = async () => {
  return (
    <div className="flex items-center gap-x-2">
      <Button
        asChild
        className=" h-10 text-muted-foreground hover:text-primary"
        variant="ghost"
      >
        <Link href="/">
          <LogOut className="h-5 w-5 lg:mr-2" />
          <span className="hidden lg:block">Exit</span>
        </Link>
      </Button>
      <UserButton afterSignOutUrl="/" />
    </div>
  );
};
