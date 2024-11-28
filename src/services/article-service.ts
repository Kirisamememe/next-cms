import 'server-only'
import { inject, injectable } from 'inversify'
import { ArticleForClient, articlePublicationForm, articleSubmitFormSchema, filter } from '@/types/article-schema'
import { TYPES } from '@/di/types'
import type { IArticleAtomsRepository, IArticleRepository } from '@/repositories'
import { z } from 'zod'
import { prisma } from '@/prisma'


export interface IArticleService {
  getById(id: number, publishedOnly?: boolean): Promise<{ data: ArticleForClient, noData: undefined } | { data: undefined, noData: string }>
  getMany(filter?: filter): Promise<ArticleForClient[]>
  createWithAtom(operatorId: number, values: z.infer<typeof articleSubmitFormSchema>): Promise<any>
  updateArticleCreateAtom(articleId: number, operatorId: number, values: z.infer<typeof articleSubmitFormSchema>): Promise<any>
  updateArticle(articleId: number, operatorId: number, values: z.infer<typeof articleSubmitFormSchema>): Promise<any>
  updatePublishAt(articleId: number, operatorId: number, values: z.infer<typeof articlePublicationForm>): Promise<any>
  updateArchivedAt(articleId: number, operatorId: number): Promise<any>
  restore(articleId: number, operatorId: number): Promise<any>
}


@injectable()
export class ArticleService implements IArticleService {
  private _articleRepository: IArticleRepository
  private _articleAtomsRepository: IArticleAtomsRepository

  constructor(
    @inject(TYPES.ArticleRepository) private articleRepository: IArticleRepository,
    @inject(TYPES.ArticleAtomsRepository) private articleAtomsRepository: IArticleAtomsRepository
  ) {
    this._articleRepository = articleRepository
    this._articleAtomsRepository = articleAtomsRepository
  }


  /**
   * 
   * @param id 
   * @returns 
   */
  async getById(id: number, publishedOnly: boolean = false) {
    const article = await this._articleRepository.findById(id, publishedOnly)
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
    const articles = await this._articleRepository.findManyOrderByUpdatedAt(filter)

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
      const article = await this._articleRepository.create(operatorId, values, trx)
      return await this._articleAtomsRepository.create(article.id, operatorId, values, trx)
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
      await this._articleAtomsRepository.create(articleId, operatorId, values, trx)
      return await this._articleRepository.update(articleId, operatorId, values, trx)
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
    return this._articleRepository.update(articleId, operatorId, values)
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
    return this._articleRepository.updateDate(articleId, operatorId, values)
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
    return this._articleRepository.updateDate(articleId, operatorId, { archivedAt: new Date() })
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
    return this._articleRepository.updateDate(articleId, operatorId, { archivedAt: null })
  }
}