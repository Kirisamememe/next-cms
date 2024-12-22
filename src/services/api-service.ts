import 'server-only'
import { inject, injectable } from 'inversify'
import type { IApiRepository } from "@/repositories/api-repository"
import { Api, apiSchema } from '@/types'
import { z } from 'zod'
import { dbExceptionHandler } from '@/exception-handling/exception-handler-db'
import { TYPES } from '@/di/types'


export interface IApiService {
  getByName(name: string): Promise<Api | null>
  toggleActive(apiId: number, operatorId: number, state: boolean): Promise<Api | null>
  createMainApi(operatorId: number, values: z.infer<typeof apiSchema>): Promise<Api | null>
  getMany(): Promise<Api[]>
}


@injectable()
export class ApiService implements IApiService {

  private _apiRepository: IApiRepository

  constructor(
    @inject(TYPES.ApiRepository)
    private apiRepository: IApiRepository
  ) {
    this._apiRepository = apiRepository
  }


  async getByName(name: string) {
    return await this._apiRepository.findByName(name).catch(dbExceptionHandler)
  }


  async toggleActive(apiId: number, operatorId: number, state: boolean) {
    return await this._apiRepository.update(apiId, operatorId, { activatedAt: state ? new Date() : null }).catch(dbExceptionHandler)
  }


  async createMainApi(
    operatorId: number,
    values: z.infer<typeof apiSchema>
  ) {
    return await this._apiRepository.create(operatorId, values).catch(dbExceptionHandler)
  }


  async getMany() {
    const data = await this._apiRepository.findMany().catch(dbExceptionHandler)
    if (!data) {
      return []
    }
    return data
  }
}