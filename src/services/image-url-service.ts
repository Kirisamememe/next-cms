import { imageUrlRepository } from '@/repositories/image-url-repository'
import { imageUrlSchema, multipleImageUrlSchema } from '@/types/image-url-schema'
import 'server-only'
import { z } from 'zod'

class ImageUrlService {

  create(
    operatorId: number,
    values: z.infer<typeof imageUrlSchema>
  ) {
    return imageUrlRepository.create(operatorId, values)
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
  ) {
    return imageUrlRepository.update(imageId, operatorId, values)
  }

  move(
    imageId: number,
    operatorId: number,
    folderPath: string | null
  ) {
    return imageUrlRepository.move(imageId, operatorId, folderPath)
  }


  fetchByFolder(path: string | null) {
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