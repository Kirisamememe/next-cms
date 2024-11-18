import 'server-only'
import crypto from 'crypto'
import { accessTokenRepository } from '@/repositories/access-token-repository'

class AccessTokenService {

  private generateToken(): string {
    return crypto.randomBytes(32).toString('hex')
  }

  async isTokenAvailable(token: string) {
    const data = await accessTokenRepository.findUnique(token)
    if (!data) {
      return false
    }
    if (data.expiresAt <= new Date()) {
      return false
    }
    return true
  }

  async findUnique(token: string) {
    const data = await accessTokenRepository.findUnique(token)
    if (!data) {
      return {
        noData: 'Not Found' as const
      }
    }
    return { data }
  }

  async create(operatorId: number, name: string) {
    const token = this.generateToken()
    const expiresAt = new Date()
    expiresAt.setFullYear(expiresAt.getFullYear() + 1)

    const data = await accessTokenRepository.create(operatorId, token, name, expiresAt)
    if (!data) {
      return {
        error: 'Failed' as const
      }
    }
    return { data }
  }

  async getManyWithAuthor() {
    const data = await accessTokenRepository.findManyWithAuthor()
    if (!data.length) {
      return {
        noData: 'Not Found' as const
      }
    }
    return { data }
  }

  async delete(token: string) {
    const data = await accessTokenRepository.delete(token)
    if (!data) {
      return {
        error: 'Failed' as const
      }
    }
    return { data }
  }

}

export const accessTokenService = new AccessTokenService()

