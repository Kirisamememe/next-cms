import { i18n } from "@/i18n";
import { AI } from "@/lib-server-only";
import { aiArticleRequestSchema, aiArticleResponseSchema } from "@/types/schema-ai";
import { NextRequest } from "next/server";
import { z } from "zod";

export const maxDuration = 50

export const POST = async (req: NextRequest) => {
  const { model, language, prompt, context }: z.infer<typeof aiArticleRequestSchema> = await req.json()
  const system = `
    You are a great writer. Please generate an appropriate article object in ${i18n.locales[language]}, following the prompt, the schema, and the context. When you write the body, please write in Markdown format as much as possible. ${context ? `The context is as follows: ${context}` : ''}.
  `
  return AI.getInstance().generate(model, prompt, system, aiArticleResponseSchema).toTextStreamResponse()
}