import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Safely generate a URL-friendly slug from any string.
 * - Lowercases the text
 * - Removes special characters and accents
 * - Replaces whitespace with hyphens
 * - Collapses multiple hyphens
 * - Trims trailing/leading hyphens
 *
 * Examples:
 *   "Pashupatinath Temple"   → "pashupatinath-temple"
 *   "Muktinath Temple"       → "muktinath-temple"
 *   "Swayambhunath (Monkey)" → "swayambhunath-monkey"
 */
export function slugify(text: string): string {
  if (!text) return "";

  return text
    .toString()
    .normalize("NFKD")
    // Remove diacritics (accents): é → e, ñ → n, etc.
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    // Replace non-alphanumeric characters (except spaces and hyphens) with nothing
    .replace(/[^a-z0-9\s-]/g, "")
    // Replace whitespace with hyphens
    .replace(/\s+/g, "-")
    // Collapse multiple consecutive hyphens
    .replace(/--+/g, "-")
    // Trim leading/trailing hyphens
    .replace(/^-+|-+$/g, "");
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-NP", {
    style: "currency",
    currency: "NPR",
  }).format(price);
}