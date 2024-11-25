import { mediaFolderRepository } from '@/repositories/media-folder-repository'
import { mediaFolderSchema } from '@/types/media-folder-schema'
import 'server-only'
import { z } from 'zod'

class MediaFolderService {

  fetchMany() {
    return mediaFolderRepository.findMany()
  }

  async getCurrentPathFolders(path: string) {
    const data = await mediaFolderRepository.findManyByParentPath(path)
    if (!data) {
      throw new Error('DB Error')
    }
    return data
  }


  create(values: z.infer<typeof mediaFolderSchema>) {
    return mediaFolderRepository.create(values.name, values.parentPath)
  }


  update(path: string, values: z.infer<typeof mediaFolderSchema>) {
    return mediaFolderRepository.update(path, values)
  }

  move(path: string, name: string, parentPath: string) {
    return mediaFolderRepository.move(path, name, parentPath)
  }


  delete(path: string) {
    return mediaFolderRepository.delete(path)
  }

}

export const mediaFolderService = new MediaFolderService()