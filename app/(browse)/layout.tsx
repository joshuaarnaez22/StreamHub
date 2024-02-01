import React, { Suspense } from "react";
import { Navbar } from "./_components/navbar";
import Sidebar, { SidebarSkeleton } from "./_components/sidebar";
import { ContainerProvider } from "@/app/(browse)/_components/container-provider";

const BrowseLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      <div className="flex h-full pt-20">
        <Suspense fallback={<SidebarSkeleton />}>
          <Sidebar />
        </Suspense>
        <ContainerProvider>{children}</ContainerProvider>
      </div>
    </>
  );
};

export default BrowseLayout;
