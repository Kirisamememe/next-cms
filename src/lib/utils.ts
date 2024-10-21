import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { hashSync, genSaltSync } from 'bcrypt-ts';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function saltAndHashPassword(password: string): string {
  const salt = genSaltSync(12);
  const hashedPassword = hashSync(password, salt);

  return hashedPassword;
}