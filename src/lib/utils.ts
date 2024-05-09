import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * to merge tailwind class
 * @param {ClassValue[]} inputs
 * @returns {string}
 */
export const cn = (...inputs: ClassValue[]): string => {
  return twMerge(clsx(inputs));
};

/**
 * Converts file to object url
 * @param {File} value
 * @returns {string}
 */
export const getObjecturl = (value: File): string => {
  let binaryData = [];
  binaryData.push(value);
  return window.URL.createObjectURL(
    new Blob(binaryData, { type: "application/zip" })
  );
};

/**
 * returns the Initials of a name
 * @example ("First" , "Last") => "FL"
 * @param {string} firstName
 * @param {string} lastName
 * @returns {string}
 */
export const getNameInitials = (
  firstName: string,
  lastName: string
): string => {
  const firstInitial = firstName.slice(0, 1).toUpperCase();
  const lastInitial = lastName.slice(0, 1).toUpperCase();
  return `${firstInitial}${lastInitial}`;
};
