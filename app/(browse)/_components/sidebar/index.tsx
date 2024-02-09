import React from "react";
import { Wrapper } from "./wrapper";
import Toogle from "./toogle";
import { Recommended } from "./recommended";
import { getRecommended } from "@/actions/recommended-service";
import { getAllFollowUsers } from "@/actions/follow-service";
import { Following } from "./following";

const Sidebar = async () => {
  const [users, followedUsers] = await Promise.all([
    getRecommended(),
    getAllFollowUsers(),
  ]);

  return (
    <Wrapper>
      <Toogle />
      <div className="space-y-4 pt-4 lg:pt-0">
        <Following data={followedUsers} />
        <Recommended data={users} />
      </div>
    </Wrapper>
  );
};

export default Sidebar;
