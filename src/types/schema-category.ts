import { z } from "zod"

export const categorySchema = z.object({
  name: z.string().min(1, '1文字以上32文字以下で入力してください').max(32, '1文字以上32文字以下で入力してください'),
})


export type ContentCategory = {
  id: number
  name: string

  createdAt: Date
  updatedAt: Date
}

export type CategoryType = 'article' | 'json'
