import 'server-only'
import { JsonContentCategory } from "@/types"
import { inject, injectable } from 'inversify'
import type { IJsonContentCategoryRepository } from '@/repositories'
import { TYPES } from '@/di/types'
import { dbExceptionHandler } from '@/exception-handling/exception-handler-db'
import { categorySchema } from '@/types/schema-category'
import { z } from 'zod'

export interface IJsonContentCategoryService {
  fetchMany(): Promise<JsonContentCategory[]>
  fetchById(id: number): Promise<JsonContentCategory | null>
  create(values: z.infer<typeof categorySchema>): Promise<JsonContentCategory | null>
  update(categoryId: number, values: z.infer<typeof categorySchema>): Promise<JsonContentCategory | null>
}

@injectable()
export class JsonContentCategoryService implements IJsonContentCategoryService {

  private _jsonContentCategoryRepository: IJsonContentCategoryRepository

  constructor(
    @inject(TYPES.JsonContentCategoryRepository)
    jsonContentCategoryRepository: IJsonContentCategoryRepository
  ) {
    this._jsonContentCategoryRepository = jsonContentCategoryRepository
  }

  async fetchMany() {
    const data = await this._jsonContentCategoryRepository.findMany().catch(dbExceptionHandler)
    if (!data) {
      return []
    }
    return data
  }

  async fetchById(id: number) {
    return await this._jsonContentCategoryRepository.findById(id).catch(dbExceptionHandler)
  }

  async create(values: z.infer<typeof categorySchema>) {
    return await this._jsonContentCategoryRepository.create(values).catch(dbExceptionHandler)
  }

  async update(categoryId: number, values: z.infer<typeof categorySchema>) {
    return await this._jsonContentCategoryRepository.update(categoryId, values).catch(dbExceptionHandler)
  }


}