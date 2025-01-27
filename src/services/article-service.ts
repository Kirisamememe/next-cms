import 'server-only'
import { inject, injectable } from 'inversify'
import { Article, ArticleAtom, ArticleForClient, ArticleListItemForClient, articleSubmitFormSchema, Filter, FindManyOptions, publicationDateTimeForm } from '@/types'
import { TYPES } from '@/di/types'
import type { IArticleAtomsRepository, IArticleRepository } from '@/repositories'
import { z } from 'zod'
import { prisma } from '@/prisma'
import { dbExceptionHandler } from '@/exception-handling/exception-handler-db'
import { extractTitleFromMarkdown } from '@/lib'
import { ContentListItem } from '@/types/schema-content-group'


export interface IArticleService {
  getById(id: number, options?: { publishedOnly: boolean }): Promise<ArticleForClient | null>
  getMany(filter: Filter, options?: FindManyOptions): Promise<ArticleListItemForClient[]>
  getSimpleList(search?: string): Promise<ContentListItem[]>
  getSimpleItem(id: number): Promise<ContentListItem | null>
  createWithAtom(operatorId: number, values: z.infer<typeof articleSubmitFormSchema>): Promise<ArticleAtom | null>
  updateArticleCreateAtom(articleId: number, operatorId: number, values: z.infer<typeof articleSubmitFormSchema>): Promise<Article | null>
  updateArticle(articleId: number, operatorId: number, values: z.infer<typeof articleSubmitFormSchema>): Promise<Article | null>
  updatePublishAt(articleId: number, operatorId: number, values: z.infer<typeof publicationDateTimeForm>): Promise<Article | null>
  updateArchivedAt(articleId: number, operatorId: number): Promise<Article | null>
  restore(articleId: number, operatorId: number): Promise<Article | null>
  getCount(filter?: Filter, categoryId?: number): Promise<number | null>
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


  async getSimpleList(search?: string) {
    const data = await this._articleRepository.getSimpleList()
      .then((res) => {
        if (!search) return res

        const searchArr = search.toLowerCase().split(/[\s\u3000]+/)
        return res.filter((item) => (
          item.id.toString() === search ||
          searchArr.some((word) => (
            !!word.trim() && (
              item.atoms[0].title?.toLowerCase().includes(word) ||
              item.atoms[0].body.toLowerCase().includes(word)
            )
          ))
        ))
      })
      .catch(dbExceptionHandler)

    if (!data) {
      return []
    }

    return data.map((article) => ({
      id: article.id.toString(),
      title: article.atoms[0]?.title || extractTitleFromMarkdown(article.atoms[0].body),
    }))
  }

  async getSimpleItem(id: number) {
    const data = await this._articleRepository.getSimpleItem(id).catch(dbExceptionHandler)
    if (!data) return null

    return {
      id: data.id.toString(),
      title: data.atoms[0]?.title || extractTitleFromMarkdown(data.atoms[0].body),
    }
  }


  /**
   * 
   * @param filter 
   * @returns 
   */
  async getMany(filter: Filter, options?: FindManyOptions) {
    const data = await this._articleRepository.findMany(filter, options)
      .then((res) => res.filter((article) => article.atoms.length > 0).map((article) => ({
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


  async getCount(filter?: Filter, categoryId?: number) {
    return await this._articleRepository.getCount(filter, categoryId).catch(dbExceptionHandler)
  }
}