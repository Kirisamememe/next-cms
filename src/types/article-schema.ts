import { z } from "zod";
import { EditorConcise } from "./editor-schema";
import { createId } from '@paralleldrive/cuid2';


export const articleSubmitFormSchema = z.object({
  title: z.string().optional(),
  summary: z.string().optional(),
  slug: z.string().default(createId()),
  image: z.string().optional(),
  body: z.string().min(1, "本文は必須です"),
  categoryId: z.number().optional(),
  commitMsg: z.string().optional(),
  authorNote: z.string().optional(),
  publishedAt: z.date().nullish()
})

export const articlePublicationForm = z.object({
  publishedAt: z.date().nullish()
})

export type ArticleAtom = {
  id: number
  title: string | null
  summary: string | null
  image: string | null
  body: string
  commitMsg: string | null
  version: number

  createdAt: Date
  selectedAt: Date | null

  authorId: number
  author?: EditorConcise
  articleId: number
}


export type Article = {
  id: number
  slug: string
  authorNote: string | null
  adminOnly: boolean
  categoryId: number | null

  createdAt: Date
  updatedAt: Date
  publishedAt: Date | null
  archivedAt: Date | null

  author: EditorConcise
  lastEdited: EditorConcise

  atom: ArticleAtom
}


export type filter = 'draft' | 'publish' | 'archive'


