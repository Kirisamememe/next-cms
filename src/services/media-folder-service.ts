import 'server-only'
import { inject, injectable } from 'inversify'
import type { IMediaFolderRepository } from '@/repositories'
import { MediaFolder, mediaFolderSchema } from '@/types'
import { z } from 'zod'
import { TYPES } from '@/di/types'
import { dbExceptionHandler } from '@/exception-handling/exception-handler-db'

export interface IMediaFolderService {
  fetchMany(): Promise<MediaFolder[]>
  getCurrentPathFolders(path: string): Promise<MediaFolder[]>
  create(values: z.infer<typeof mediaFolderSchema>): Promise<MediaFolder | null>
  update(path: string, values: z.infer<typeof mediaFolderSchema>): Promise<MediaFolder | null>
  move(path: string, name: string, parentPath: string): Promise<MediaFolder | null>
  delete(path: string): Promise<MediaFolder | null>
}

@injectable()
export class MediaFolderService implements IMediaFolderService {

  private _mediaFolderRepository: IMediaFolderRepository

  constructor(
    @inject(TYPES.MediaFolderRepository) private mediaFolderRepository: IMediaFolderRepository
  ) {
    this._mediaFolderRepository = mediaFolderRepository
  }

  async fetchMany() {
    const res = await this._mediaFolderRepository.findMany().catch(dbExceptionHandler)
    if (!res) {
      return []
    }
    return res
  }

  async getCurrentPathFolders(path: string) {
    const data = await this._mediaFolderRepository.findManyByParentPath(path).catch(dbExceptionHandler)
    if (!data) {
      return []
    }
    return data
  }


  async create(values: z.infer<typeof mediaFolderSchema>) {
    return await this._mediaFolderRepository.create(values.name, values.parentPath).catch(dbExceptionHandler)
  }


  async update(path: string, values: z.infer<typeof mediaFolderSchema>) {
    return await this._mediaFolderRepository.update(path, values).catch(dbExceptionHandler)
  }

  async move(path: string, name: string, parentPath: string) {
    return await this._mediaFolderRepository.move(path, name, parentPath).catch(dbExceptionHandler)
  }


  async delete(path: string) {
    return await this._mediaFolderRepository.delete(path).catch(dbExceptionHandler)
  }

}
