import { TYPES } from "@/di/types"
import { dbExceptionHandler } from "@/exception-handling/exception-handler-db"
import type { IArticleCategoryRepository } from "@/repositories"
import { ArticleCategory } from "@/types"
import { categorySchema } from "@/types/schema-category"
import { inject, injectable } from "inversify"
import { z } from "zod"

export interface IArticleCategoryService {
  fetchMany(): Promise<ArticleCategory[]>
  fetchById(id: number): Promise<ArticleCategory | null>
  create(values: z.infer<typeof categorySchema>): Promise<ArticleCategory | null>
  update(categoryId: number, values: z.infer<typeof categorySchema>): Promise<ArticleCategory | null>
}

@injectable()
export class ArticleCategoryService implements IArticleCategoryService {
  private _articleCategoryRepository: IArticleCategoryRepository

  constructor(
    @inject(TYPES.ArticleCategoryRepository)
    articleCategoryRepository: IArticleCategoryRepository
  ) {
    this._articleCategoryRepository = articleCategoryRepository
  }

  async fetchMany() {
    const data = await this._articleCategoryRepository.findMany().catch(dbExceptionHandler)
    if (!data) {
      return []
    }
    return data
  }

  async fetchById(id: number) {
    return await this._articleCategoryRepository.findById(id).catch(dbExceptionHandler)
  }

  async create(values: z.infer<typeof categorySchema>) {
    return await this._articleCategoryRepository.create(values).catch(dbExceptionHandler)
  }

  async update(categoryId: number, values: z.infer<typeof categorySchema>) {
    return await this._articleCategoryRepository.update(categoryId, values).catch(dbExceptionHandler)
  }
}