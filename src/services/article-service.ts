import 'server-only'
import { inject, injectable } from 'inversify'
import { Article, ArticleArchivedForClient, ArticleAtom, ArticleDraftForClient, ArticleForClient, ArticlePublishedForClient, articleSubmitFormSchema, Filter, FindManyOptions, publicationDateTimeForm } from '@/types'
import { TYPES } from '@/di/types'
import type { IArticleAtomsRepository, IArticleRepository } from '@/repositories'
import { z } from 'zod'
import { prisma } from '@/prisma'
import { dbExceptionHandler } from '@/exception-handling/exception-handler-db'


export interface IArticleService {
  getById(id: number, options?: { publishedOnly: boolean }): Promise<ArticleForClient | null>
  getMany(filter: Filter, options?: FindManyOptions): Promise<ArticleForClient[]>
  getManyDraft(options?: FindManyOptions): Promise<ArticleDraftForClient[]>
  getManyPublished(options?: FindManyOptions): Promise<ArticlePublishedForClient[]>
  getManyArchived(options?: FindManyOptions): Promise<ArticleArchivedForClient[]>
  createWithAtom(operatorId: number, values: z.infer<typeof articleSubmitFormSchema>): Promise<ArticleAtom | null>
  updateArticleCreateAtom(articleId: number, operatorId: number, values: z.infer<typeof articleSubmitFormSchema>): Promise<Article | null>
  updateArticle(articleId: number, operatorId: number, values: z.infer<typeof articleSubmitFormSchema>): Promise<Article | null>
  updatePublishAt(articleId: number, operatorId: number, values: z.infer<typeof publicationDateTimeForm>): Promise<Article | null>
  updateArchivedAt(articleId: number, operatorId: number): Promise<Article | null>
  restore(articleId: number, operatorId: number): Promise<Article | null>
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
  async getById(
    id: number,
    options?: { publishedOnly: boolean }
  ) {
    const { publishedOnly } = options ?? { publishedOnly: false }
    const article = await this._articleRepository.findById(id, publishedOnly).catch(dbExceptionHandler)
    if (!article || !article?.atoms.length) {
      return null
    }

    return {
      ...article,
      atom: article?.atoms[0],
      atoms: undefined
    }
  }


  async getManyDraft(options?: FindManyOptions) {
    const data = await this._articleRepository.findMany('draft', options)
      .then((res) => res.map((article) => ({
        ...article,
        atom: article.atoms[0],
        atoms: undefined,
        archivedAt: article.archivedAt as null
      })))
      .catch(dbExceptionHandler)

    if (!data) {
      return []
    }
    return data
  }


  async getManyPublished(options?: FindManyOptions) {
    const data = await this._articleRepository.findMany('published', options)
      .then((res) => res.map((article) => ({
        ...article,
        atom: article.atoms[0],
        atoms: undefined,
        publishedAt: article.publishedAt as Date,
        archivedAt: article.archivedAt as null
      })))
      .catch(dbExceptionHandler)

    if (!data) {
      return []
    }
    return data
  }


  async getManyArchived(options?: FindManyOptions) {
    const data = await this._articleRepository.findMany('archive', options)
      .then((res) => res.map((article) => ({
        ...article,
        atom: article.atoms[0],
        atoms: undefined,
        archivedAt: article.archivedAt as Date
      })))
      .catch(dbExceptionHandler)

    if (!data) {
      return []
    }
    return data
  }


  /**
   * 
   * @param filter 
   * @returns 
   */
  async getMany(filter: Filter, options?: FindManyOptions) {
    const data = await this._articleRepository.findMany(filter, options)
      .then((res) => res.map((article) => ({
        ...article,
        atom: article.atoms[0],
        atoms: undefined,
        ...(filter === 'draft' && {
          archivedAt: article.archivedAt as null
        }),
        ...(filter === 'published' && {
          publishedAt: article.publishedAt as Date,
          archivedAt: article.archivedAt as null
        }),
        ...(filter === 'archive' && {
          archivedAt: article.archivedAt as Date
        }),
      })))
      .catch(dbExceptionHandler)

    if (!data) {
      return []
    }
    return data
  }




  /**
   * 
   * @param operatorId 
   * @param values 
   * @returns 
   */
  async createWithAtom(
    operatorId: number,
    values: z.infer<typeof articleSubmitFormSchema>,
  ) {
    return await prisma.$transaction(async (trx) => {
      const article = await this._articleRepository.create(operatorId, values, trx)
      return await this._articleAtomsRepository.create(article.id, operatorId, values, trx)
    }).catch(dbExceptionHandler)
  }


  /**
   * atomを新規作成して、articleを更新する
   * @param articleId
   * @param operatorId
   * @param values 
   * @returns 
   */
  async updateArticleCreateAtom(
    articleId: number,
    operatorId: number,
    values: z.infer<typeof articleSubmitFormSchema>,
  ) {
    return await prisma.$transaction(async (trx) => {
      await this._articleAtomsRepository.create(articleId, operatorId, values, trx)
      return await this._articleRepository.update(articleId, operatorId, values, trx)
    }).catch(dbExceptionHandler)
  }


  /**
   * articleを更新する。atomは公開日だけ更新する
   * @param articleId
   * @param operatorId
   * @param values 
   * @returns 
   */
  async updateArticle(
    articleId: number,
    operatorId: number,
    values: z.infer<typeof articleSubmitFormSchema>,
  ) {
    return await this._articleRepository.update(articleId, operatorId, values)
      .catch(dbExceptionHandler)
  }

  /**
   * articleとatom、両方ともpublishedAtのみ更新する
   * @param articleId 
   * @param operatorId 
   * @param values 
   * @returns 
   */
  async updatePublishAt(
    articleId: number,
    operatorId: number,
    values: z.infer<typeof publicationDateTimeForm>,
  ) {
    return await this._articleRepository.updateDate(articleId, operatorId, values)
      .catch(dbExceptionHandler)
  }


  /**
   * 
   * @param articleId 
   * @param operatorId 
   * @returns 
   */
  async updateArchivedAt(
    articleId: number,
    operatorId: number,
  ) {
    return await this._articleRepository.updateDate(articleId, operatorId, { archivedAt: new Date() })
      .catch(dbExceptionHandler)
  }


  /**
   * 
   * @param articleId 
   * @param operatorId 
   * @returns 
   */
  async restore(
    articleId: number,
    operatorId: number,
  ) {
    return await this._articleRepository.updateDate(articleId, operatorId, { archivedAt: null })
      .catch(dbExceptionHandler)
  }
}