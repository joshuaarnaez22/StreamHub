import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const font = Poppins({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});
export const Logo = () => {
  return (
    <Link href="/">
      <div className="flex items-center gap-x-4 hover:opacity-80 lg:mr-0">
        <div className="bg-white rounded-full mr-4 lg:mr-0 h-14 w-14 flex items-center justify-center">
          <Image
            src="/logo.webp"
            height={40}
            width={40}
            alt="stream-hub-logo"
            className="bg-white"
          />
        </div>
        <div className={cn("hidden flex-col  lg:block", font.className)}>
          <p className="text-lg font-semibold">Stream-Hub</p>
          <p className="text-xs text-muted-foreground ">Creator dashboard</p>
        </div>
      </div>
    </Link>
  );
};
