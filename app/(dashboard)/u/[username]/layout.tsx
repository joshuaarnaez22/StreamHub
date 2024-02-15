import { getSelfByUsername } from "@/actions/auth-service";
import { notFound } from "next/navigation";
import React from "react";
import { Navbar } from "./_components/navbar";
import { Sidebar } from "./_components/sidebar";
import { ContainerProvider } from "./_components/container-provider";
interface CreatorLayoutProps {
  children: React.ReactNode;
  params: { username: string };
}
const CreatorLayout = async ({ children, params }: CreatorLayoutProps) => {
  const self = await getSelfByUsername(params.username);

  if (self.error) {
    notFound();
  }

  return (
    <>
      <Navbar />
      <div className="flex h-full pt-20">
        <Sidebar />
        <ContainerProvider>{children}</ContainerProvider>
      </div>
    </>
  );
};

export default CreatorLayout;
