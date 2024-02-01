import React from "react";
import { Wrapper } from "./wrapper";
import Toogle from "./toogle";
import { Recommended } from "./recommended";
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
