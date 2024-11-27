import { prisma } from '@/lib/prisma'
import { imageUrlRepository } from '@/repositories/image-url-repository'
import { ImageUrl } from '@/types/image'
import { imageUrlSchema, multipleImageUrlSchema } from '@/types/image-url-schema'
import 'server-only'
import { z } from 'zod'

class ImageUrlService {

  create(
    operatorId: number,
    values: z.infer<typeof imageUrlSchema>
  ): Promise<{ data?: ImageUrl, error?: { message: string } }> {
    return prisma.$transaction(async (trx) => {
      const url = await imageUrlRepository.findUniqueByUrl(values.url, trx)
      if (url) {
        return {
          error: {
            message: "URL already exists."
          }
        }
      }

      return { data: await imageUrlRepository.create(operatorId, values, trx) }
    })
  }


  createMany(
    operatorId: number,
    values: z.infer<typeof multipleImageUrlSchema>
  ) {
    return imageUrlRepository.createMany(operatorId, values)
  }


  update(
    imageId: number,
    operatorId: number,
    values: z.infer<typeof imageUrlSchema>
  ): Promise<{ data?: ImageUrl, error?: { message: string } }> {
    return prisma.$transaction(async (trx) => {
      const url = await imageUrlRepository.findUniqueByUrl(values.url, trx)
      if (url && url.id !== imageId) {
        return {
          error: {
            message: "URL already exists."
          }
        }
      }
      return { data: await imageUrlRepository.update(imageId, operatorId, values, trx) }
    })
  }

  move(
    imageId: number,
    operatorId: number,
    folderPath: string
  ) {
    return imageUrlRepository.move(imageId, operatorId, folderPath)
  }


  fetchByFolder(path: string) {
    return imageUrlRepository.findByPath(path)
  }


  async fetchAllUrls() {
    const res = await imageUrlRepository.findAllUrls()
    return res.map((url) => url.url)
  }

  async fetchById(imageId: number) {
    const data = await imageUrlRepository.findUnique(imageId)
    if (!data) {
      return {
        noData: 'Not Found' as const
      }
    }
    return { data }
  }

  delete(id: number) {
    return imageUrlRepository.delete(id)
  }

}

export const imageUrlService = new ImageUrlService()