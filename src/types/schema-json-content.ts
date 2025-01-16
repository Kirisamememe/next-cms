import { z } from "zod";
import { EditorConcise } from "./schema-editor";

export type JsonNodeData = {
  id: string;
  keyName?: string;
  index?: number;
  valueType: ValueType;
  value?: string | number | boolean | Date;
  children?: JsonNodeData[];
}

export type JsonSimpleItem = {
  id: number
  jsonAtoms: {
    title: string | null
    content: any
  }[]
}

export type JsonSimpleItemForClient = {
  id: number
  title: string
  content: any
}

export type ValueType = "string" | "number" | "boolean" | "date" | "array" | "object";

export type JsonContentForClient = JsonContent & {
  jsonAtom: JsonAtom
  author: EditorConcise
  lastEditor: EditorConcise
}

export type JsonContentWithAllFields = JsonContent & {
  jsonAtoms: JsonAtom[]
  author: EditorConcise
  lastEditor: EditorConcise
}

export type JsonContent = {
  id: number
  slug: string | null
  authorNote: string | null
  adminOnly: boolean
  permissionLevel: number

  createdAt: Date
  updatedAt: Date
  publishedAt: Date | null
  archivedAt: Date | null

  categoryId: number | null
  category?: JsonContentCategory

  authorId: number
  lastEditorId: number
}

export type JsonAtom = {
  id: number
  title: string | null
  description: string | null
  content: any
  version: number
  createdAt: Date
  selectedAt: Date | null

  jsonContentId?: number

  authorId: number
  author?: EditorConcise
}

export type JsonContentCategory = {
  id: number
  name: string

  createdAt: Date
  updatedAt: Date
}


export const jsonContentSchema = z.object({
  slug: z.string().optional(),
  authorNote: z.string().optional(),
  adminOnly: z.boolean().optional(),
  permissionLevel: z.number().optional(),
  title: z.string().optional(),
  description: z.string().optional(),
  categoryId: z.number().nullish(),
  publishedAt: z.date().nullish(),
  archivedAt: z.date().nullish(),
  json: z.any().optional(),
})