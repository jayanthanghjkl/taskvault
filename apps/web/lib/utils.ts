import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function isValidUrl(url: string | undefined): url is string {
    if (!url) return false;
    try {
        new URL(url);
        return true;
    } catch {
        return false;
    }
}
