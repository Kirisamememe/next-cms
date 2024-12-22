import { Locale, locales } from "@/i18n"
import { z } from "zod"

export const modelListTuple = [
  'claude-3-5-sonnet-latest',
  'claude-3-5-haiku-latest',
  'gpt-4o',
  'gpt-4o-mini',
  'gpt-4-turbo',
  'o1-preview',
  'gemini-1.5-pro-latest',
  'gemini-1.5-flash-latest',
  'gemini-2.0-flash-exp'
] as const

export type AIModel = typeof modelListTuple[number]

export const aiArticleRequestSchema = z.object({
  model: z.enum(modelListTuple),
  language: z.enum(locales as readonly [Locale]),
  context: z.string().optional(),
  prompt: z.string()
})

export const aiArticleResponseSchema = z.object({
  slug: z.string().describe('Slug of the article').default(''),
  title: z.string().describe('Title of the article').default(''),
  summary: z.string().describe('Summary of the article').default(''),
  body: z.string().describe('Body of the article. Please write in Markdown.').default(''),
})

