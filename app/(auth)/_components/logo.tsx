import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";
import Image from "next/image";
import React from "react";

const font = Poppins({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});
export const Logo = () => {
  return (
    <div className="flex flex-col items-center gay-4">
      <div className="bg-white p-4 rounded-full">
        <Image src="/logo.webp" height={80} width={80} alt="stream-hub-logo" />
      </div>
      <div className={cn("flex flex-col items-center", font.className)}>
        <p className="text-xl font-semibold">Stream-Hub</p>
        <p className="text-sm text-muted-foreground">Let&apos;s play</p>
      </div>
    </div>
  );
};
