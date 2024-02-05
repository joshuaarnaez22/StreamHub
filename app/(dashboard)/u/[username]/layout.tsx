import { getSelfByUsername } from "@/actions/auth-service";
import { Navbar } from "@/app/(browse)/_components/navbar";
import { notFound } from "next/navigation";
import React from "react";
interface CreatorLayoutProps {
  children: React.ReactNode;
  params: { username: string };
}
const CreatorLayout = async ({ children, params }: CreatorLayoutProps) => {
  const self = await getSelfByUsername(params.username);

  if (self.error) {
    return notFound();
  }

  return (
    <>
      <Navbar />
      <div className="flex h-full pt-20">{children}</div>
    </>
  );
};

export default CreatorLayout;
