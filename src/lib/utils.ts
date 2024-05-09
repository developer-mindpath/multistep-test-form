import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getObjecturl = (value: any) => {
  let binaryData = [];
  binaryData.push(value);
  return window.URL.createObjectURL(
    new Blob(binaryData, { type: "application/zip" })
  );
};

export const getNameInitials = (firstName: string, lastName: string) => {
  const firstInitial = firstName.slice(0, 1).toUpperCase();
  const lastInitial = lastName.slice(0, 1).toUpperCase();
  return `${firstInitial}${lastInitial}`;
};
