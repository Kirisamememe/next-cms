import 'server-only'
import { inject, injectable } from 'inversify'
import type { IImageUrlRepository } from '@/repositories'
import { ImageUrl } from '@/types/image'
import { imageUrlSchema, multipleImageUrlSchema } from '@/types/image-url-schema'
import { z } from 'zod'
import { TYPES } from '@/di/types'
import { prisma } from '@/prisma'

export interface IImageUrlService {
  create(operatorId: number, values: z.infer<typeof imageUrlSchema>): Promise<{ data?: ImageUrl, error?: { message: string } }>
  createMany(operatorId: number, values: z.infer<typeof multipleImageUrlSchema>): Promise<{ count: number }>
  update(imageId: number, operatorId: number, values: z.infer<typeof imageUrlSchema>): Promise<{ data?: ImageUrl, error?: { message: string } }>
  move(imageId: number, operatorId: number, folderPath: string): Promise<ImageUrl>
  fetchByFolder(path: string): Promise<ImageUrl[]>
  fetchAllUrls(): Promise<string[]>
  fetchById(imageId: number): Promise<{ data: ImageUrl, noData?: undefined } | { noData: 'Not Found', data?: undefined; }>
  delete(id: number): Promise<ImageUrl>
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


  create(
    operatorId: number,
    values: z.infer<typeof imageUrlSchema>
  ): Promise<{ data?: ImageUrl, error?: { message: string } }> {
    return prisma.$transaction(async (trx) => {
      const url = await this._imageUrlRepository.findUniqueByUrl(values.url, trx)
      if (url) {
        return {
          error: {
            message: "URL already exists."
          }
        }
      }

      return { data: await this._imageUrlRepository.create(operatorId, values, trx) }
    })
  }


  createMany(
    operatorId: number,
    values: z.infer<typeof multipleImageUrlSchema>
  ) {
    return this._imageUrlRepository.createMany(operatorId, values)
  }


  update(
    imageId: number,
    operatorId: number,
    values: z.infer<typeof imageUrlSchema>
  ): Promise<{ data?: ImageUrl, error?: { message: string } }> {
    return prisma.$transaction(async (trx) => {
      const url = await this._imageUrlRepository.findUniqueByUrl(values.url, trx)
      if (url && url.id !== imageId) {
        return {
          error: {
            message: "URL already exists."
          }
        }
      }
      return { data: await this._imageUrlRepository.update(imageId, operatorId, values, trx) }
    })
  }

  move(
    imageId: number,
    operatorId: number,
    folderPath: string
  ) {
    return this._imageUrlRepository.move(imageId, operatorId, folderPath)
  }


  fetchByFolder(path: string) {
    return this._imageUrlRepository.findByPath(path)
  }


  async fetchAllUrls() {
    const res = await this._imageUrlRepository.findAllUrls()
    return res.map((url) => url.url)
  }

  async fetchById(imageId: number) {
    const data = await this._imageUrlRepository.findUnique(imageId)
    if (!data) {
      return {
        noData: 'Not Found' as const
      }
    }
    return { data }
  }

  delete(id: number) {
    return this._imageUrlRepository.delete(id)
  }

}