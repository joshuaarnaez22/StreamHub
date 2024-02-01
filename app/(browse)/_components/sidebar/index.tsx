import React from "react";
import { Wrapper } from "./wrapper";
import Toogle from "./toogle";
import { Recommended, RecommendedSkeleton } from "./recommended";
import { getRecommended } from "@/actions/server-actions/recommended";

const Sidebar = async () => {
  const users = await getRecommended();
  return (
    <Wrapper>
      <Toogle />
      <div className="space-y-4 pt-4 lg:pt-0">
        <Recommended data={users} />
      </div>
    </Wrapper>
  );
};

export default Sidebar;

export const SidebarSkeleton = () => {
  return (
    <aside className="fixed left-0 flex-col w-[70px] lg:w-60 h-full border-r-2 bg-gray-700 z-50">
      <RecommendedSkeleton />
    </aside>
  );
};
