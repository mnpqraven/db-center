import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function sanitizeNewline(data?: string) {
  if (!data) return "";
  return data.replaceAll("\\n", "\n");
}
