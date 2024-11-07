import 'server-only'
import { articleRepository } from '@/repositories/article-repository'
import { articlePublicationForm, articleSubmitFormSchema, filter } from '@/types/article-schema'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { articleAtomsRepository } from '@/repositories/article-atoms-repository'

class ArticleService {

  async findById(id: number) {
    const article = await articleRepository.findById(id)

    if (!article) {
      return {
        isSuccess: false as const,
        error: "Not Found"
      }
    }

    return {
      isSuccess: true as const,
      data: {
        ...article,
        atom: article?.atoms[0]
      }
    }
  }


  async findArticles(filter?: filter) {
    const articles = await articleRepository.findManyOrderByUpdatedAt(filter)

    return articles.map((article) => ({
      ...article,
      atom: article.atoms[0]
    }))
  }


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
   * @param atomId \
   * @param articleId 
   * @param values 
   * @returns 
   */
  updateArticleUpdateAtom(
    atomId: number,
    articleId: number,
    operatorId: number,
    values: z.infer<typeof articleSubmitFormSchema>,
  ) {
    return prisma.$transaction(async (trx) => {
      await articleAtomsRepository.updatePublishedAt(atomId, { publishedAt: values.publishedAt || null }, trx)
      return await articleRepository.update(articleId, operatorId, values, trx)
    })
  }

  /**
   * articleとatom、両方ともpublishedAtのみ更新する
   * @param atomId 
   * @param articleId 
   * @param operatorId 
   * @param values 
   * @returns 
   */
  updatePublishAt(
    atomId: number,
    articleId: number,
    operatorId: number,
    values: z.infer<typeof articlePublicationForm>,
  ) {
    return prisma.$transaction(async (trx) => {
      await articleAtomsRepository.updatePublishedAt(atomId, { publishedAt: values.publishedAt || null }, trx)
      return await articleRepository.updateDate(articleId, operatorId, values, trx)
    })
  }


  updateArchivedAt(
    articleId: number,
    operatorId: number,
  ) {
    return articleRepository.updateDate(articleId, operatorId, { archivedAt: new Date() })
  }

  restore(
    articleId: number,
    operatorId: number,
  ) {
    return articleRepository.updateDate(articleId, operatorId, { archivedAt: null })
  }
}

export const articleService = new ArticleService()