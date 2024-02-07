"use client";
import { Hint } from "@/components/shared/hint";
import { Button } from "@/components/ui/button";
import { useCreatorSidebarStore } from "@/store/use-creator-sidebar";
import { ArrowLeftFromLine, ArrowRightFromLine } from "lucide-react";
import React from "react";

const Toogle = () => {
  const { collapsed, onExpand, onCollapse } = useCreatorSidebarStore();

  const label = collapsed ? "Expand" : "Collapse";
  return (
    <>
      {collapsed && (
        <div className="hidden lg:flex p-3 mb-2 pt-4 items-center justify-between">
          <Hint label={label} asChild>
            <Button onClick={onExpand} className="p-2" variant="ghost">
              <ArrowRightFromLine className="w-5 h-5" />
            </Button>
          </Hint>
        </div>
      )}
      {!collapsed && (
        <div className="hidden lg:flex p-3 pl-6 mb-2 items-center justify-between">
          <p className="font-semibold text-primary">Dashboard</p>
          <Hint label={label} asChild>
            <Button onClick={onCollapse} className="p-2" variant="ghost">
              <ArrowLeftFromLine className="w-5 h-5" />
            </Button>
          </Hint>
        </div>
      )}
    </>
  );
};

export default Toogle;
