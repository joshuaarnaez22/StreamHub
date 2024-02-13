import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const generateHexColorFromString = (str: string) => {
  let numericalValue = 0;
  for (let i = 0; i < str.length; i++) {
    numericalValue += str.charCodeAt(i);
  }

  // Use the numerical representation to generate a hex color code
  const hexColor =
    "#" + (numericalValue % 0xffffff).toString(16).padStart(6, "0");
  return hexColor;
};
