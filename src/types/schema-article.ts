import { z } from "zod";
import { EditorConcise } from "./schema-editor";
import { createId } from '@paralleldrive/cuid2';


export const articleSubmitFormSchema = z.object({
  title: z.string().optional(),
  summary: z.string().optional(),
  slug: z.string().default(createId()),
  image: z.string().optional(),
  body: z.string().min(1, "本文は必須です"),
  categoryId: z.number().nullish(),
  commitMsg: z.string().optional(),
  authorNote: z.string().optional(),
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
}

export type ArticleWithAllFields = Article & {
  author: EditorConcise
  lastEdited: EditorConcise
  atoms: ArticleAtom[]
}

export type ArticleForClient = Omit<ArticleWithAllFields, 'atoms'> & {
  atom: ArticleAtom
}

export type ArticleDraftForClient = Omit<ArticleForClient, 'publishedAt' | 'archivedAt'> & {
  publishedAt: Date | null;
  archivedAt: null;
}

export type ArticlePublishedForClient = Omit<ArticleForClient, 'publishedAt' | 'archivedAt'> & {
  publishedAt: Date;
  archivedAt: null;
}

export type ArticleArchivedForClient = Omit<ArticleForClient, 'publishedAt' | 'archivedAt'> & {
  publishedAt: Date | null;
  archivedAt: Date;
}


export type ArticleCategory = {
  id: number
  name: string

  createdAt: Date
  updatedAt: Date
}

