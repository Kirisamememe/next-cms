import { z } from "zod";
import { EditorConcise } from "./schema-editor";

export const contentGroupSchema = z.object({
  name: z.string().min(1, 'contentGroup.form.name.validation').max(32, 'contentGroup.form.name.validation'),
  description: z.string().min(1, 'contentGroup.form.description.validation').max(2000, 'contentGroup.form.description.validation'),
  permissionLevel: z.number(),
  imageId: z.number().nullable(),
  articles: z.array(z.number()).default([]),
  jsonContents: z.array(z.number()).default([]),
  mediaFolders: z.array(z.string()).default([]),
})

export type ContentType = 'articles' | 'jsonContents' | 'mediaFolders'

export type ContentGroup = {
  id: number
  name: string
  description: string
  permissionLevel: number
  imageId: number | null

  createdAt: Date
  updatedAt: Date

  authorId: number
  lastEditorId: number
}

export type ContentGroupListItem = ContentGroup & {
  articles: {
    id: number
  }[]
  jsonContents: {
    id: number
  }[]
  mediaFolders: {
    path: string
  }[],
  author: EditorConcise,
  lastEditor: EditorConcise
}

export type ContentGroupSingleItem = ContentGroup & {
  articles: {
    id: number,
    atoms: {
      title: string | null
      body: string
    }[]
  }[]
  jsonContents: {
    id: number
    jsonAtoms: {
      title: string | null
    }[]
  }[]
  mediaFolders: {
    path: string
    name: string
  }[],
  author: EditorConcise,
  lastEditor: EditorConcise
}

export type ContentGroupSingleItemForClient = ContentGroup & {
  articles: ContentListItem[]
  jsonContents: ContentListItem[]
  mediaFolders: ContentListItem[],
  author: EditorConcise,
  lastEditor: EditorConcise
}

export type ContentListItem = {
  id: string
  title: string
}