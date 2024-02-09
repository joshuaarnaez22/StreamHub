import React from "react";
import { Hint } from "../hint";

import { Maximize, Minimize } from "lucide-react";

interface FullScreenControlProps {
  onToogle: () => void;
  isFullScreen: boolean;
}
export const FullScreenControl = ({
  onToogle,
  isFullScreen,
}: FullScreenControlProps) => {
  const Icon = isFullScreen ? Minimize : Maximize;
  const label = isFullScreen ? "Exit Full Screen" : "Enter Full Screen";
  return (
    <div className="flex items-center justify-center gap-4">
      <Hint label={label}>
        <button
          onClick={onToogle}
          className=" text-white p-1.5 hover:bg-white/10 rounded-lg"
        >
          <Icon className="h-5 w-5" />
        </button>
      </Hint>
    </div>
  );
};
