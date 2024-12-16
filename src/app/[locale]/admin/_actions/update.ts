'use server'

import { articleService, jsonContentService } from "@/di/services"
import { getSession } from "@/lib-server-only"
import { publicationDateTimeForm } from "@/types"
import { revalidatePath } from "next/cache"
import { z } from "zod"

/**
 * atomを新規作成せず、公開日のみ更新
 * @param articleId
 * @param values 
 * @returns 
 */
export async function updateArticlePublishedAt(
  articleId: number,
  values: z.infer<typeof publicationDateTimeForm>
) {
  const { operatorId } = await getSession()
  const res = await articleService.updatePublishAt(articleId, operatorId, values)
  if (!res) {
    return {
      isSuccess: false,
      error: {
        message: "Update article failed"
      }
    }
  }
  revalidatePath('/admin/articles')
  return {
    isSuccess: true
  }
}


export async function updateJsonContentPublishedAt(
  jsonContentId: number,
  values: z.infer<typeof publicationDateTimeForm>
) {
  const { operatorId } = await getSession()
  const res = await jsonContentService.update(jsonContentId, operatorId, values)
  if (!res) {
    return {
      isSuccess: false,
      error: {
        message: "Update json content failed"
      }
    }
  }
  revalidatePath('/admin/json-content')
  return {
    isSuccess: true
  }
}



/**
 * 記事をアーカイブする
 * @param articleId
 * @returns 
 */
export async function archiveArticle(articleId: number) {
  const { operatorId } = await getSession()
  const res = await articleService.updateArchivedAt(articleId, operatorId)
  if (!res) {
    return {
      isSuccess: false,
      error: {
        message: "Update article failed"
      }
    }
  }
  revalidatePath('/admin/articles')
  return {
    isSuccess: true
  }
}


/**
 * 記事のアーカイブ状態を解除する
 * @param articleId
 * @returns 
 */
export async function restoreArticle(articleId: number) {
  const { operatorId } = await getSession()
  const res = await articleService.restore(articleId, operatorId)
  if (!res) {
    return {
      isSuccess: false,
      error: {
        message: "Restore article failed"
      }
    }
  }
  revalidatePath('/admin/articles')
  return {
    isSuccess: true
  }
}


export async function archiveJsonContent(jsonContentId: number) {
  const { operatorId } = await getSession()
  const res = await jsonContentService.update(jsonContentId, operatorId, { archivedAt: new Date() })
  if (!res) {
    return {
      isSuccess: false,
      error: {
        message: "Update json content failed"
      }
    }
  }
  revalidatePath('/admin/json-content')
  return {
    isSuccess: true
  }
}

export async function restoreJsonContent(jsonContentId: number) {
  const { operatorId } = await getSession()
  const res = await jsonContentService.update(jsonContentId, operatorId, { archivedAt: null })
  if (!res) {
    return {
      isSuccess: false,
      error: {
        message: "Restore json content failed"
      }
    }
  }
  revalidatePath('/admin/json-content')
  return {
    isSuccess: true
  }
}

