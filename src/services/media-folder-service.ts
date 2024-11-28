import 'server-only'
import { inject, injectable } from 'inversify'
import type { IMediaFolderRepository } from '@/repositories'
import { MediaFolder, mediaFolderSchema } from '@/types/media-folder-schema'
import { z } from 'zod'
import { TYPES } from '@/di/types'

export interface IMediaFolderService {
  fetchMany(): Promise<MediaFolder[]>
  getCurrentPathFolders(path: string): Promise<MediaFolder[]>
  create(values: z.infer<typeof mediaFolderSchema>): Promise<MediaFolder>
  update(path: string, values: z.infer<typeof mediaFolderSchema>): Promise<MediaFolder>
  move(path: string, name: string, parentPath: string): Promise<MediaFolder>
  delete(path: string): Promise<MediaFolder>
}

@injectable()
export class MediaFolderService implements IMediaFolderService {

  private _mediaFolderRepository: IMediaFolderRepository

  constructor(
    @inject(TYPES.MediaFolderRepository) private mediaFolderRepository: IMediaFolderRepository
  ) {
    this._mediaFolderRepository = mediaFolderRepository
  }

  fetchMany() {
    return this._mediaFolderRepository.findMany()
  }

  async getCurrentPathFolders(path: string) {
    const data = await this._mediaFolderRepository.findManyByParentPath(path)
    if (!data) {
      throw new Error('DB Error')
    }
    return data
  }


  create(values: z.infer<typeof mediaFolderSchema>) {
    return this._mediaFolderRepository.create(values.name, values.parentPath)
  }


  update(path: string, values: z.infer<typeof mediaFolderSchema>) {
    return this._mediaFolderRepository.update(path, values)
  }

  move(path: string, name: string, parentPath: string) {
    return this._mediaFolderRepository.move(path, name, parentPath)
  }


  delete(path: string) {
    return this._mediaFolderRepository.delete(path)
  }

}
