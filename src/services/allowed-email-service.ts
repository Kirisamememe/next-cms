import 'server-only'
import { inject, injectable } from 'inversify'
import { TYPES } from '@/di/types'
import type { IAllowedEmailRepository } from '@/repositories'
import { AllowedEmail } from '@/types'
import { dbExceptionHandler } from '@/exception-handling/exception-handler-db'


export interface IAllowedEmailService {
  getAll(): Promise<AllowedEmail[]>
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
    const data = await this._allowedEmailRepository.findMany().catch(dbExceptionHandler)
    if (!data) {
      return []
    }
    return data
  }

}