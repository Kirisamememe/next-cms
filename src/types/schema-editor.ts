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

export type EditorConcise = {
  id: number;
  email: string;
  name: string | null;
  role: Role;
  image: string | null;
  nickname: string | null;
}

export type EditorSimpleListItem = {
  name: string | null;
  nickname: string | null;
  image: string | null;
}

export type AllowedEmail = {
  id: number;
  email: string
  userId: number | null
}

const LEVEL_1 = 1 as const
const LEVEL_2 = 2 as const
const LEVEL_3 = 3 as const
const LEVEL_4 = 4 as const
const LEVEL_5 = 5 as const

export {
  LEVEL_1,
  LEVEL_2,
  LEVEL_3,
  LEVEL_4,
  LEVEL_5,
}

export const roleLevel = {
  "SUPER_ADMIN": LEVEL_1,
  "ADMIN": LEVEL_2,
  "INSPECTOR": LEVEL_2,
  "EDITOR": LEVEL_3,
  "VIEWER": LEVEL_4,
  "BLOCKED": LEVEL_5
} as const

export const roles = [
  "SUPER_ADMIN",
  "ADMIN",
  "INSPECTOR",
  "EDITOR",
  "VIEWER",
  "BLOCKED"
] as const


export const adminRole: Role[] = [
  "SUPER_ADMIN",
  "ADMIN",
  "INSPECTOR",
]

export const editorRole: Role[] = [
  "EDITOR",
]

export const normalGroup = [
  "EDITOR",
  "VIEWER",
  "BLOCKED"
] as const

export const normalRole: Role[] = [...normalGroup] as Role[]


export const editRoleFormSchema = z.object({
  role: z.enum(roles, { message: "role.error" })
})

export const editProfileFormSchema = z.object({
  nickname: z.string().max(12, "editor.profile.nicknameValidationMax"),
  image: z.string().max(1024, "editor.profile.imageValidationMax").url({ message: "editor.profile.imageValidationUrl" })
})


export const newEditorSchema = z.object({
  email: z.string().email("editor.email.validation")
})

export type Role = keyof typeof roleLevel