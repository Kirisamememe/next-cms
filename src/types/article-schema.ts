import { z } from "zod";
import { Editor } from "./editor-schema";


export const articleSubmitFormSchema = z.object({
  title: z.string().optional(),
  summary: z.string().optional(),
  slug: z.string().min(1, "slugは必須です"),
  image: z.string().optional(),
  body: z.string().min(1, "本文は必須です"),
  commit_msg: z.string().optional(),
  author_note: z.string().optional(),
  author_id: z.number()
})

export type ArticleAtom = {
  id: number
  title: string | null
  summary: string | null
  image: string | null
  body: string
  commit_msg: string | null

  created_at: Date
  published_at: Date | null
  
  author_id: number
  article_id: number
}

export type Article = {
  id: number
  slug: string
  author_note: string | null
  admin_only: boolean

  created_at: Date
  updated_at: Date
  published_at: Date | null
  archived_at: Date | null

  category_id: number | null
  author_id: number

  article_atoms: ArticleAtom[]
}

export type ArticleWithAuthor = {
  id: number
  slug: string
  author_note: string | null
  admin_only: boolean

  created_at: Date
  updated_at: Date
  published_at: Date | null
  archived_at: Date | null

  category_id: number | null
  author_id: number
  author: Editor

  article_atoms: ArticleAtom[]
}



