import 'server-only'
import { inject, injectable } from 'inversify'
import { TYPES } from '@/di/types'
import type { IAllowedEmailRepository } from '@/repositories'
import { AllowedEmail } from '@/types/editor-schema'


export interface IAllowedEmailService {
  getAll(): Promise<{ data: AllowedEmail[], noData: undefined } | { data: undefined, noData: string }>
}

@injectable()
export class AllowedEmailService implements IAllowedEmailService {

  private _allowedEmailRepository: IAllowedEmailRepository

  constructor(
    @inject(TYPES.AllowedEmailRepository)
    private allowedEmailRepository: IAllowedEmailRepository,
  ) {
    this._allowedEmailRepository = allowedEmailRepository
  }

  /**
   * 
   * @returns 
   */
  async getAll() {
    const data = await this._allowedEmailRepository.findMany()
    if (!data.length) {
      return {
        noData: 'Not Found' as const
      }
    }
    return { data }
  }

}