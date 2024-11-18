import 'server-only'
import { articleRepository } from '@/repositories/article-repository'
import { articlePublicationForm, articleSubmitFormSchema, filter } from '@/types/article-schema'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { articleAtomsRepository } from '@/repositories/article-atoms-repository'

class ArticleService {

  /**
   * 
   * @param id 
   * @returns 
   */
  async getById(id: number, publishedOnly: boolean = false) {
    const article = await articleRepository.findById(id, publishedOnly)
    if (!article || !article?.atoms.length) {
      return {
        noData: 'Not Found' as const
      }
    }

    return {
      data: {
        ...article,
        atom: article?.atoms[0],
        atoms: undefined
      }
    }
  }


  /**
   * 
   * @param filter 
   * @returns 
   */
  async getMany(filter?: filter) {
    const articles = await articleRepository.findManyOrderByUpdatedAt(filter)

    return articles.map((article) => ({
      ...article,
      atom: article.atoms[0],
      atoms: undefined
    }))
  }


  /**
   * 
   * @param operatorId 
   * @param values 
   * @returns 
   */
  createWithAtom(
    operatorId: number,
    values: z.infer<typeof articleSubmitFormSchema>,
  ) {
    return prisma.$transaction(async (trx) => {
      const article = await articleRepository.create(operatorId, values, trx)
      return await articleAtomsRepository.create(article.id, operatorId, values, trx)
    })
  }


  /**
   * atomを新規作成して、articleを更新する
   * @param articleId
   * @param operatorId
   * @param values 
   * @returns 
   */
  updateArticleCreateAtom(
    articleId: number,
    operatorId: number,
    values: z.infer<typeof articleSubmitFormSchema>,
  ) {
    return prisma.$transaction(async (trx) => {
      await articleAtomsRepository.create(articleId, operatorId, values, trx)
      return await articleRepository.update(articleId, operatorId, values, trx)
    })
  }


  /**
   * articleを更新する。atomは公開日だけ更新する
   * @param articleId
   * @param operatorId
   * @param values 
   * @returns 
   */
  updateArticle(
    articleId: number,
    operatorId: number,
    values: z.infer<typeof articleSubmitFormSchema>,
  ) {
    return articleRepository.update(articleId, operatorId, values)
  }

  /**
   * articleとatom、両方ともpublishedAtのみ更新する
   * @param articleId 
   * @param operatorId 
   * @param values 
   * @returns 
   */
  updatePublishAt(
    articleId: number,
    operatorId: number,
    values: z.infer<typeof articlePublicationForm>,
  ) {
    return articleRepository.updateDate(articleId, operatorId, values)
  }


  /**
   * 
   * @param articleId 
   * @param operatorId 
   * @returns 
   */
  updateArchivedAt(
    articleId: number,
    operatorId: number,
  ) {
    return articleRepository.updateDate(articleId, operatorId, { archivedAt: new Date() })
  }


  /**
   * 
   * @param articleId 
   * @param operatorId 
   * @returns 
   */
  restore(
    articleId: number,
    operatorId: number,
  ) {
    return articleRepository.updateDate(articleId, operatorId, { archivedAt: null })
  }
}

export const articleService = new ArticleService()