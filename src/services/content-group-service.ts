import 'server-only'
import { inject, injectable } from 'inversify'
import { ContentGroup, contentGroupSchema } from "@/types"
import { z } from "zod"
import { ContentGroupRepository } from '@/repositories'
import { TYPES } from '@/di/types'
import { dbExceptionHandler } from '@/exception-handling/exception-handler-db'

export interface IContentGroupService {
  create: (operatorId: number, values: z.infer<typeof contentGroupSchema>) => Promise<ContentGroup | null>
  update: (groupId: number, operatorId: number, values: z.infer<typeof contentGroupSchema>) => Promise<ContentGroup | null>
}

@injectable()
export class ContentGroupService implements IContentGroupService {

  private _contentGroupRepository: ContentGroupRepository

  constructor(
    @inject(TYPES.ContentGroupRepository) contentGroupRepository: ContentGroupRepository
  ) {
    this._contentGroupRepository = contentGroupRepository
  }

  async create(operatorId: number, values: z.infer<typeof contentGroupSchema>) {
    return this._contentGroupRepository.create(operatorId, values).catch(dbExceptionHandler)
  }

  async update(groupId: number, operatorId: number, values: z.infer<typeof contentGroupSchema>) {
    return this._contentGroupRepository.update(groupId, operatorId, values).catch(dbExceptionHandler)
  }
}

