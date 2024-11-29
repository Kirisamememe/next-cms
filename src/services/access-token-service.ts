import 'server-only'
import crypto from 'crypto'
import { inject, injectable } from 'inversify'
import type { IAccessTokenRepository } from '@/repositories/access-token-repository'
import { dbExceptionHandler } from '@/exception-handling/exception-handler-db'
import { AccessToken, EditorConcise } from '@/types'
import { TYPES } from '@/di/types'


export interface IAccessTokenService {
  isTokenAvailable(token: string): Promise<boolean>
  findUnique(token: string): Promise<AccessToken | null>
  create(operatorId: number, name: string): Promise<AccessToken | null>
  getManyWithAuthor(): Promise<(AccessToken & { author: EditorConcise })[]>
  delete(token: string): Promise<AccessToken | null>
}

@injectable()
export class AccessTokenService implements IAccessTokenService {

  private _accessTokenRepository: IAccessTokenRepository

  constructor(
    @inject(TYPES.AccessTokenRepository)
    private accessTokenRepository: IAccessTokenRepository
  ) {
    this._accessTokenRepository = accessTokenRepository
  }

  private generateToken(): string {
    return crypto.randomBytes(32).toString('base64url')
  }

  async isTokenAvailable(token: string) {
    const data = await this._accessTokenRepository.findUnique(token).catch(dbExceptionHandler)
    if (!data) {
      return false
    }
    if (data.expiresAt <= new Date()) {
      return false
    }
    return true
  }

  async findUnique(token: string) {
    return await this._accessTokenRepository.findUnique(token).catch(dbExceptionHandler)
  }

  async create(operatorId: number, name: string) {
    const token = this.generateToken()
    const expiresAt = new Date()
    expiresAt.setFullYear(expiresAt.getFullYear() + 1)

    return await this._accessTokenRepository.create(operatorId, token, name, expiresAt).catch(dbExceptionHandler)
  }

  async getManyWithAuthor() {
    const data = await this._accessTokenRepository.findManyWithAuthor().catch(dbExceptionHandler)
    if (!data) {
      return []
    }
    return data
  }

  async delete(token: string) {
    return await this._accessTokenRepository.delete(token).catch(dbExceptionHandler)
  }

}

