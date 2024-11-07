'use server'

import { getSession } from "@/lib/getSession"
import { articleService } from "@/services/article-service"
import { articleSubmitFormSchema } from "@/types/article-schema"
import { z } from "zod"

async function createArticle(values: z.infer<typeof articleSubmitFormSchema>) {
  const { operatorId } = await getSession()
  return articleService.createWithAtom(operatorId, values)
}

export {
  createArticle
}