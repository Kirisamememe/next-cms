import { z } from "zod";

export const mediaFolderSchema = z.object({
  name: z.string(),
  parentPath: z.string().nullable(),
  archivedAt: z.date().nullish(),
})

export type MediaFolder = {
  path: string
  name: string
  parentPath: string | null

  createdAt: Date
  updatedAt: Date

  children?: MediaFolder[]
}