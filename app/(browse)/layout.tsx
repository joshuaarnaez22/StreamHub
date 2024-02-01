import React from "react";
import { Navbar } from "./_components/navbar";
import Sidebar from "./_components/sidebar";
import { ContainerProvider } from "@/app/(browse)/_components/container-provider";

const BrowseLayout = ({ children }: { children: React.ReactNode }) => {
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

export default BrowseLayout;
