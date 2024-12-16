'use server'

import { articleSubmitFormSchema } from "@/types"
import { getSession } from "@/lib-server-only"
import { z } from "zod"
import { articleService } from "@/di/services"




/**
 * 
 * @param articleId 
 * @param values 
 * @returns 
 */
async function updateArticleCreateNewAtom(
  articleId: number,
  values: z.infer<typeof articleSubmitFormSchema>
) {
  const { operatorId } = await getSession()
  return articleService.updateArticleCreateAtom(articleId, operatorId, values)
}


/**
 * 
 * @param articleId 
 * @param values 
 * @returns 
 */
async function updateArticle(
  articleId: number,
  values: z.infer<typeof articleSubmitFormSchema>
) {
  const { operatorId } = await getSession()
  return articleService.updateArticle(articleId, operatorId, values)
}





export {
  updateArticleCreateNewAtom,
  updateArticle,
}