import 'server-only'
import { inject, injectable } from 'inversify'
import type { IUserRepository, IAllowedEmailRepository } from '@/repositories'
import { EditorConcise } from '@/types'
import { AllowedEmail, Role } from '@/types/editor-schema'
import { TYPES } from '@/di/types'
import { prisma } from '@/prisma'

type ServiceResponse<T> = Promise<
  | { data: T; error?: never }
  | { data?: never; error: 'Not Found' | 'Database error has occurred: setSuperAdmin' | 'Database error has occurred: authenticateEmail' }
>

export interface IUserService {
  getById(id: number): ServiceResponse<EditorConcise>
  getByEmail(email: string): ServiceResponse<EditorConcise>
  noSuperAdmin(): Promise<boolean>
  setSuperAdmin(email: string): ServiceResponse<AllowedEmail>
  authenticateEmail(email: string): ServiceResponse<AllowedEmail>
  getMany(sort: 'asc' | 'desc'): Promise<EditorConcise[]>
  update(email: string, values: {
    role?: Role
    nickname?: string
    image?: string
  }): Promise<EditorConcise>
}


@injectable()
export class UserService implements IUserService {

  private _userRepository: IUserRepository
  private _allowedEmailRepository: IAllowedEmailRepository

  constructor(
    @inject(TYPES.UserRepository)
    private userRepository: IUserRepository,

    @inject(TYPES.AllowedEmailRepository)
    private allowedEmailRepository: IAllowedEmailRepository
  ) {
    this._userRepository = userRepository
    this._allowedEmailRepository = allowedEmailRepository
  }

  /**
   * 
   * @param id 
   * @returns 
   */
  async getById(id: number) {
    const data = await this._userRepository.findById(id)
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
    const data = await this._userRepository.findByEmail(email)
    if (!data) {
      return {
        error: 'Not Found' as const
      }
    }
    return { data }
  }


  getMany(sort: 'asc' | 'desc' = 'asc') {
    return this._userRepository.findManyOrderById(sort)
  }


  update(
    email: string,
    values: {
      role?: Role
      nickname?: string
      image?: string
    }
  ) {
    return this._userRepository.updateByEmail(email, values)
  }


  /**
   * 
   * @returns 
   */
  async noSuperAdmin() {
    return await this._userRepository.noSuperAdmin()
  }


  /**
   * 
   * @param email 
   * @returns 
   */
  async setSuperAdmin(email: string) {
    const data = await prisma.$transaction(async (trx) => {
      await this._userRepository.updateByEmail(email, { role: 'SUPER_ADMIN' }, trx)
      return this._allowedEmailRepository.add(email, trx)
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
  async authenticateEmail(email: string) {
    console.log('authenticateEmailに入った')
    const data = await prisma.$transaction(async (trx) => {
      console.log('トランザクションが開始したに入った')
      const user = await this._userRepository.findByEmail(email, trx)
      if (!user) return
      return await this._allowedEmailRepository.update(email, user.id, trx)
    })
    if (!data) {
      return {
        error: 'Database error has occurred: authenticateEmail' as const
      }
    }
    return { data }
  }


}