import { Button } from "@/components/ui/button";
import { UserButton, currentUser, SignInButton } from "@clerk/nextjs";
import { Clapperboard } from "lucide-react";
import Link from "next/link";
import React from "react";

export const Actions = async () => {
  const user = await currentUser();

  return (
    <div>
      {!user && (
        <SignInButton>
          <Button variant="primary" className="h-10">
            Login
          </Button>
        </SignInButton>
      )}
      {!!user && (
        <div className="flex items-center gap-x-2">
          <Button
            asChild
            className=" h-10 text-muted-foreground hover:text-primary"
            variant="ghost"
          >
            <Link href={`/u/${user.username}`}>
              <Clapperboard className="h-5 w-5 lg:mr-2" />
              <span className="hidden lg:block">Dashboard</span>
            </Link>
          </Button>

          <UserButton afterSignOutUrl="/" />
        </div>
      )}
    </div>
  );
};
