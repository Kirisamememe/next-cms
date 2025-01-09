import { z } from "zod";

export const contentGroupSchema = z.object({
  name: z.string().max(32, '32文字以下で入力してください'),
  description: z.string().max(256, '256文字以下で入力してください'),
})

export type ContentGroup = {
  id: number
  name: string
  description: string
  permissionLevel: number

  createdAt: Date
  updatedAt: Date

  authorId: number
  lastEditorId: number
}