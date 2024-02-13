import React from "react";
import { Volume1, Volume2, VolumeX } from "lucide-react";
import { Hint } from "../hint";
import { Slider } from "@/components/ui/slider";
interface VolumeControlProps {
  value: number;
  onToggle: () => void;
  onChange: (value: number) => void;
}
export const VolumeControl = ({
  value,
  onChange,
  onToggle,
}: VolumeControlProps) => {
  const isMuted = value === 0;
  const isAboveHalf = value > 50;

  let Icon = isMuted ? VolumeX : isAboveHalf ? Volume2 : Volume1;

  const label = isMuted ? "Unmute" : "Mute";

  const handleChange = (value: number[]) => {
    onChange(value[0]);
  };

  return (
    <div className="flex gap-2 items-center">
      <Hint label={label} asChild>
        <button
          onClick={onToggle}
          className="tex-white hover:bg-white/10 p-1.5 rounded-lg"
        >
          <Icon className="h-6 w-6" />
        </button>
      </Hint>
      <Slider
        value={[value]}
        onValueChange={handleChange}
        className="w-[8rem] cursor-pointer"
        max={100}
        step={1}
      />
    </div>
  );
};
