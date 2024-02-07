import React from "react";
import { Logo } from "./logo";
import { Actions } from "./actions";

export const Navbar = () => {
  return (
    <nav className="fixed  w-full flex justify-between top-0 h-20 z-40 bg-gray-700  px-2 lg:px-4 items-center shadow-md border-b-2 border-[#383941]">
      <Logo />
      <Actions />
    </nav>
  );
};
