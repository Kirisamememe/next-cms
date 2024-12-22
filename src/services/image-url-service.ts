import 'server-only'
import { inject, injectable } from 'inversify'
import type { IImageUrlRepository } from '@/repositories'
import { ImageUrl } from '@/types'
import { imageUrlSchema, multipleImageUrlSchema } from '@/types'
import { z } from 'zod'
import { TYPES } from '@/di/types'
import { prisma } from '@/prisma'
import { dbExceptionHandler } from '@/exception-handling/exception-handler-db'

export interface IImageUrlService {
  create(operatorId: number, values: z.infer<typeof imageUrlSchema>): Promise<{ data?: ImageUrl, error?: { message: string } } | null>
  createMany(operatorId: number, values: z.infer<typeof multipleImageUrlSchema>): Promise<{ count: number } | null>
  update(imageId: number, operatorId: number, values: z.infer<typeof imageUrlSchema>): Promise<{ data?: ImageUrl, error?: { message: string } } | null>
  move(imageId: number, operatorId: number, folderPath: string): Promise<ImageUrl | null>
  getByFolder(path: string): Promise<ImageUrl[]>
  getMany(): Promise<string[]>
  getById(imageId: number): Promise<ImageUrl | null>
  delete(id: number): Promise<ImageUrl | null>
  getCount(): Promise<number | null>
}


@injectable()
export class ImageUrlService implements IImageUrlService {

  private _imageUrlRepository: IImageUrlRepository

  constructor(
    @inject(TYPES.ImageUrlRepository)
    private imageUrlRepository: IImageUrlRepository
  ) {
    this._imageUrlRepository = imageUrlRepository
  }


  async create(
    operatorId: number,
    values: z.infer<typeof imageUrlSchema>
  ) {
    return await prisma.$transaction(async (trx) => {
      const url = await this._imageUrlRepository.findUniqueByUrl(values.url, trx)
      if (url) {
        return {
          error: {
            message: "URL already exists."
          }
        }
      }

      return { data: await this._imageUrlRepository.create(operatorId, values, trx) }
    }).catch(dbExceptionHandler)
  }


  async createMany(
    operatorId: number,
    values: z.infer<typeof multipleImageUrlSchema>
  ) {
    return await this._imageUrlRepository.createMany(operatorId, values)
      .catch(dbExceptionHandler)
  }


  async update(
    imageId: number,
    operatorId: number,
    values: z.infer<typeof imageUrlSchema>
  ) {
    return await prisma.$transaction(async (trx) => {
      const url = await this._imageUrlRepository.findUniqueByUrl(values.url, trx)
      if (url && url.id !== imageId) {
        return {
          error: {
            message: "URL already exists."
          }
        }
      }
      return { data: await this._imageUrlRepository.update(imageId, operatorId, values, trx) }
    }).catch(dbExceptionHandler)
  }

  async move(
    imageId: number,
    operatorId: number,
    folderPath: string
  ) {
    return await this._imageUrlRepository.move(imageId, operatorId, folderPath)
      .catch(dbExceptionHandler)
  }


  async getByFolder(path: string) {
    const res = await this._imageUrlRepository.findByPath(path).catch(dbExceptionHandler)
    if (!res) {
      return []
    }
    return res
  }


  async getMany() {
    const res = await this._imageUrlRepository.findAllUrls().catch(dbExceptionHandler)
    if (!res) {
      return []
    }
    return res.map((url) => url.url)
  }

  async getById(imageId: number) {
    return await this._imageUrlRepository.findUnique(imageId).catch(dbExceptionHandler)
  }

  async delete(id: number) {
    return await this._imageUrlRepository.delete(id).catch(dbExceptionHandler)
  }

  async getCount() {
    return await this._imageUrlRepository.getCount().catch(dbExceptionHandler)
  }

}