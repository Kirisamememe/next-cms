'use server'

import { articleService } from "@/di/services"
import { getSession } from "@/lib-server-only"
import { articleSubmitFormSchema } from "@/types"
import { z } from "zod"
// import { getArticleService } from "@/di/hook"

async function createArticle(values: z.infer<typeof articleSubmitFormSchema>) {
  const { operatorId } = await getSession()
  return articleService.createWithAtom(operatorId, values)
}

export {
  createArticle
}