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
  nickname: z.string().max(12, "editor.profile.nicknameValidationMax"),
  role: z.enum(roles)
})

export const newEditorSchema = z.object({
  email: z.string().email("editor.email.validation")
})

export type Role = typeof roles[number]