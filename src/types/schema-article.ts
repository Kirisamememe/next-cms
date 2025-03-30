import { z } from "zod";
import { EditorConcise, EditorSimpleListItem } from "./schema-editor";
import { createId } from '@paralleldrive/cuid2';

export const TAKE = 18

export const articleSubmitFormSchema = z.object({
  title: z.string().optional(),
  summary: z.string().optional(),
  slug: z.string().default(createId()),
  imageId: z.number().nullable(),
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
  imageId: number | null
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

export type ArticleSimpleItem = {
  id: number
  atoms: {
    title: string | null
    body: string
  }[]
}

export type ArticleSimpleItemForClient = {
  id: number
  title: string
  body: string
}

export type ArticleSimpleAtom = Omit<ArticleAtom, 'articleId' | 'author' | 'authorId' | 'selectedAt' | 'version' | 'createdAt' | 'commitMsg' | 'id' | 'imageId'>

export type ArticleListItem = Omit<Article, 'authorNote'>
  & {
    atoms: ArticleSimpleAtom[]
    author: EditorSimpleListItem
    lastEdited: EditorSimpleListItem
  }

export type ArticleListItemForClient = Omit<ArticleListItem, 'atoms'> & {
  atom: ArticleSimpleAtom
}

export type ArticleWithAllFields = Article & {
  author: EditorConcise
  lastEdited: EditorConcise
  atoms: (ArticleAtom & { image: { url: string } | null })[]
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
