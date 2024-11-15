import { z } from "zod";

export const apiSchema = z.object({
  name: z.string(),
  path: z.string(),
  key: z.string().optional(),
  activatedAt: z.date().nullish(),
  allowedOrigins: z.array(z.string()).optional(),
})

export const updateApiSchema = z.object({
  name: z.string().optional(),
  path: z.string().optional(),
  key: z.string().optional(),
  activatedAt: z.date().nullish(),
  allowedOrigins: z.array(z.string()).optional(),
})


export type Api = {
  id: number
  name: string
  path: string
  key: string | null

  createdAt: Date | null
  updatedAt: Date | null
  lastAccessedAt: Date | null
  activatedAt: Date | null

  allowedOrigins: string | null
  authorId: number
  lastEditorId: number


}