import 'server-only'
import { TYPES } from "@/di/types";
import { dbExceptionHandler } from "@/exception-handling/exception-handler-db";
import type { IJsonAtomRepository, IJsonContentRepository } from "@/repositories";
import { ContentListItem, Filter, FindManyOptions, JsonAtom, JsonContent, JsonContentForClient, jsonContentSchema } from "@/types";
import { inject, injectable } from "inversify";
import { z } from "zod";

export interface IJsonContentService {
  getById: (id: number, options?: { publishedOnly: boolean }) => Promise<JsonContentForClient | null>
  getSimpleList(search?: string): Promise<ContentListItem[]>
  getMany: (filter?: Filter, options?: FindManyOptions) => Promise<JsonContentForClient[]>
  update: (jsonContentId: number, operatorId: number, values: z.infer<typeof jsonContentSchema>) => Promise<JsonContent | null>
  updateAndCreateAtom: (jsonContentId: number, operatorId: number, values: z.infer<typeof jsonContentSchema>) => Promise<JsonContent | null>
  updateSelectAt: (atomId: number) => Promise<JsonAtom | null>
  create: (operatorId: number, values: z.infer<typeof jsonContentSchema>) => Promise<JsonContent | null>
  getCount(filter?: Filter, categoryId?: number): Promise<number | null>
}

@injectable()
export class JsonContentService implements IJsonContentService {
  private _jsonContentRepository: IJsonContentRepository
  private _jsonAtomRepository: IJsonAtomRepository

  constructor(
    @inject(TYPES.JsonContentRepository) jsonContentRepository: IJsonContentRepository,
    @inject(TYPES.JsonAtomRepository) jsonAtomRepository: IJsonAtomRepository
  ) {
    this._jsonContentRepository = jsonContentRepository
    this._jsonAtomRepository = jsonAtomRepository
  }

  async getById(id: number, options?: { publishedOnly: boolean }) {
    const { publishedOnly } = options ?? { publishedOnly: false }
    const jsonContent = await this._jsonContentRepository.findById(id, publishedOnly).catch(dbExceptionHandler)
    if (!jsonContent || !jsonContent?.jsonAtoms?.length) {
      return null
    }

    return {
      ...jsonContent,
      jsonAtom: jsonContent.jsonAtoms[0],
      jsonAtoms: undefined
    }
  }


  async getSimpleList(search?: string) {
    const data = await this._jsonContentRepository.getSimpleList()
      .then((res) => {
        if (!search) return res

        const searchArr = search.toLowerCase().split(/[\s\u3000]+/)
        return res.filter((item) => (
          item.id.toString() === search ||
          searchArr.some((word) => (
            !!word.trim() && (
              item.jsonAtoms[0].title?.toLowerCase().includes(word) ||
              JSON.stringify(item.jsonAtoms[0].content)?.toLowerCase().includes(word)
            )
          ))
        ))
      })
      .catch(dbExceptionHandler)

    if (!data) {
      return []
    }

    return data.map(jsonContent => ({
      id: jsonContent.id.toString(),
      title: jsonContent.jsonAtoms[0].title || 'Untitled',
    }))
  }


  async getMany(filter: Filter = 'all', options?: FindManyOptions) {
    const data = await this._jsonContentRepository.findMany(filter, options).catch(dbExceptionHandler)
    if (!data?.length || !data[0]?.jsonAtoms?.length) {
      return []
    }

    return data.map(jsonContent => {
      return {
        ...jsonContent,
        jsonAtom: jsonContent.jsonAtoms[0],
        jsonAtoms: undefined,
        ...(filter === 'draft' && {
          archivedAt: jsonContent.archivedAt as null
        }),
        ...(filter === 'published' && {
          publishedAt: jsonContent.publishedAt as Date,
          archivedAt: jsonContent.archivedAt as null
        }),
        ...(filter === 'archive' && {
          archivedAt: jsonContent.archivedAt as Date
        }),
      }
    })
  }


  async update(jsonContentId: number, operatorId: number, values: z.infer<typeof jsonContentSchema>) {
    return await this._jsonContentRepository.update(jsonContentId, operatorId, values).catch(dbExceptionHandler)
  }


  async updateAndCreateAtom(jsonContentId: number, operatorId: number, values: z.infer<typeof jsonContentSchema>) {
    return await this._jsonContentRepository.updateAndCreateAtom(jsonContentId, operatorId, values).catch(dbExceptionHandler)
  }


  async updateSelectAt(atomId: number) {
    return await this._jsonAtomRepository.updateSelectedAt(atomId).catch(dbExceptionHandler)
  }


  async create(operatorId: number, values: z.infer<typeof jsonContentSchema>) {
    return await this._jsonContentRepository.createWithAtom(operatorId, values).catch(dbExceptionHandler)
  }


  async getCount(filter?: Filter, categoryId?: number) {
    return await this._jsonContentRepository.getCount(filter, categoryId).catch(dbExceptionHandler)
  }
}