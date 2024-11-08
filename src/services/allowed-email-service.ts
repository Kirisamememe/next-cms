import 'server-only'
import { allowedEmailRepository } from '@/repositories/allowed-email-repository'

class AllowedEmailService {

  /**
   * 
   * @returns 
   */
  async getAll() {
    const data = await allowedEmailRepository.findMany()
    if (!data.length) {
      return {
        noData: 'Not Found' as const
      }
    }
    return { data }
  }

}

export const allowedEmailService = new AllowedEmailService()