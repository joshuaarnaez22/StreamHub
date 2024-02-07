import React from "react";
import { Wrapper } from "./wrapper";
import Toogle from "./toogle";
import { Navigation } from "./navigation";

export const Sidebar = () => {
  return (
    <Wrapper>
      <Toogle />
      <Navigation />
    </Wrapper>
  );
};
