import 'server-only'
import { prisma } from '@/lib/prisma'
import { allowedEmailRepository } from '@/repositories/allowed-email-repository'
import { userRepository } from '@/repositories/user-repository'

class UserService {

  /**
   * 
   * @param id 
   * @returns 
   */
  async getById(id: number) {
    const data = await userRepository.findById(id)
    if (!data) {
      return {
        error: 'Not Found' as const
      }
    }
    return { data }
  }


  /**
   * 
   * @param email 
   * @returns 
   */
  async getByEmail(email: string) {
    const data = await userRepository.findByEmail(email)
    if (!data) {
      return {
        error: 'Not Found' as const
      }
    }
    return { data }
  }


  /**
   * 
   * @returns 
   */
  async noSuperAdmin() {
    return await userRepository.noSuperAdmin()
  }


  /**
   * 
   * @param email 
   * @returns 
   */
  setSuperAdmin(email: string) {
    const data = prisma.$transaction(async (trx) => {
      await userRepository.updateByEmail(email, { role: 'SUPER_ADMIN' }, trx)
      return allowedEmailRepository.add(email, trx)
    })
    if (!data) {
      return {
        error: 'Database error has occurred: setSuperAdmin' as const
      }
    }
    return { data }
  }


  /**
   * 
   * @param email 
   * @returns 
   */
  authenticateEmail(email: string) {
    const data = prisma.$transaction(async (trx) => {
      const user = await userRepository.findByEmail(email, trx)
      if (!user) return
      return await allowedEmailRepository.update(email, user.id, trx)
    })
    if (!data) {
      return {
        error: 'Database error has occurred: authenticateEmail' as const
      }
    }
    return { data }
  }


}

export const userService = new UserService()