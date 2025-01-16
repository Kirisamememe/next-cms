import 'server-only'
import { inject, injectable } from 'inversify'
import { ContentGroup, contentGroupSchema } from "@/types"
import { z } from "zod"
import { ContentGroupRepository } from '@/repositories'
import { TYPES } from '@/di/types'
import { dbExceptionHandler } from '@/exception-handling/exception-handler-db'
import { ContentGroupListItem, ContentGroupSingleItemForClient } from '@/types/schema-content-group'
import { extractTitleFromMarkdown } from '@/lib'

export interface IContentGroupService {
  create: (operatorId: number, values: z.infer<typeof contentGroupSchema>) => Promise<ContentGroup | null>
  update: (groupId: number, operatorId: number, values: z.infer<typeof contentGroupSchema>) => Promise<ContentGroup | null>
  findMany: () => Promise<ContentGroupListItem[]>
  findUnique: (id: number) => Promise<ContentGroupSingleItemForClient | null>
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

  async findMany() {
    const data = await this._contentGroupRepository.findMany().catch(dbExceptionHandler)
    if (!data) {
      return []
    }
    return data
  }

  async findUnique(id: number) {
    const data = await this._contentGroupRepository.findUnique(id).catch(dbExceptionHandler)
    if (!data) {
      return null
    }

    return {
      ...data,
      articles: data.articles.map((article) => ({
        id: article.id.toString(),
        title: article.atoms[0]?.title || extractTitleFromMarkdown(article.atoms[0].body)
      })),
      jsonContents: data.jsonContents.map((jsonContent) => ({
        id: jsonContent.id.toString(),
        title: jsonContent.jsonAtoms[0].title || 'Untitled'
      })),
      mediaFolders: data.mediaFolders.map((mediaFolder) => ({
        id: mediaFolder.path,
        title: mediaFolder.name
      }))
    }
  }
}

