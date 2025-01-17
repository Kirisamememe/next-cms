import { z } from "zod"

export const categorySchema = z.object({
  name: z.string().min(1, 'common.category.form.validation').max(32, 'common.category.form.validation'),
})


export type ContentCategory = {
  id: number
  name: string

  createdAt: Date
  updatedAt: Date
}

export type CategoryType = 'article' | 'json'
