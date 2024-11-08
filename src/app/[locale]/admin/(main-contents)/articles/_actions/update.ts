'use server'

import { articlePublicationForm } from "@/types/article-schema"
import { revalidatePath } from "next/cache"
import { getSession } from "@/lib/getSession"
import { articleSubmitFormSchema } from "@/types/article-schema"
import { z } from "zod"
import { articleService } from "@/services/article-service"

/**
 * atomを新規作成せず、公開日のみ更新
 * @param articleId
 * @param atomId 
 * @param values 
 * @returns 
 */
async function updatePublishedAt(
  atomId: number,
  articleId: number,
  values: z.infer<typeof articlePublicationForm>
) {
  const { operatorId } = await getSession()
  const res = await articleService.updatePublishAt(atomId, articleId, operatorId, values)
  revalidatePath('/admin/articles')
  return res
}

/**
 * 記事をアーカイブする
 * @param articleId
 * @returns 
 */
async function archiveArticle(articleId: number) {
  const { operatorId } = await getSession()
  const res = articleService.updateArchivedAt(articleId, operatorId)
  revalidatePath('/admin/articles')
  return res
}


/**
 * 記事のアーカイブ状態を解除する
 * @param articleId
 * @returns 
 */
export async function restoreArticle(articleId: number) {
  const { operatorId } = await getSession()
  const res = await articleService.restore(articleId, operatorId)
  revalidatePath('/admin/articles')
  return res
}



async function updateArticleCreateNewAtom(
  articleId: number,
  values: z.infer<typeof articleSubmitFormSchema>
) {
  const { operatorId } = await getSession()
  return articleService.updateArticleCreateAtom(articleId, operatorId, values)
}



async function updateArticleUpdateAtom(
  atomId: number,
  articleId: number,
  values: z.infer<typeof articleSubmitFormSchema>
) {
  const { operatorId } = await getSession()
  return articleService.updateArticleUpdateAtom(atomId, articleId, operatorId, values)
}


export {
  updateArticleCreateNewAtom,
  updateArticleUpdateAtom,
  updatePublishedAt,
  archiveArticle
}