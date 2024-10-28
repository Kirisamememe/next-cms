import { z } from "zod";

export type Editor = {
  name: string | null;
  id: number;
  role: Role;
  image: string | null;
  email: string;
  password: string | null;
  nickname: string | null;
  emailVerified: Date | null;
}

export const roles = [
  "ADMIN",
  "INSPECTOR",
  "EDITOR",
  "VIEWER",
  "BLOCKED"
] as const

export const editorProfileSchema = z.object({
  nickname: z.string().min(1, "").max(12, ""),
  role: z.enum(roles)
})

export type Role = typeof roles[number]