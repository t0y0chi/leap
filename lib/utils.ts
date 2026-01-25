import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export type NameParts = {
  givenName?: string
  middleName?: string
  familyName?: string
}

export function formatFullName({ givenName, middleName, familyName }: NameParts) {
  return [givenName, middleName, familyName].filter(Boolean).join(" ")
}

export function getInitials(nameParts: NameParts) {
  const fullName = formatFullName(nameParts).trim()
  if (!fullName) return ""
  return fullName
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("")
}
