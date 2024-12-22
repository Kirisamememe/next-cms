import 'server-only'
import { inject, injectable } from 'inversify'
import type { IUserRepository, IAllowedEmailRepository } from '@/repositories'
import { EditorConcise } from '@/types'
import { AllowedEmail, Role } from '@/types'
import { TYPES } from '@/di/types'
import { prisma } from '@/prisma'
import { dbExceptionHandler } from '@/exception-handling/exception-handler-db'


export interface IUserService {
  getById(id: number): Promise<EditorConcise | null>
  getByEmail(email: string): Promise<EditorConcise | null>
  authenticateEmail(email: string): Promise<AllowedEmail | null>
  getMany(sort?: 'asc' | 'desc'): Promise<EditorConcise[]>
  update(email: string, values: {
    role?: Role
    nickname?: string
    image?: string
  }): Promise<EditorConcise | null>
  noSuperAdmin(): Promise<boolean>
  setSuperAdmin(email: string): Promise<AllowedEmail | null>
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
    return await this._userRepository.findById(id)
      .catch(dbExceptionHandler)
  }


  /**
   * 
   * @param email 
   * @returns 
   */
  async getByEmail(email: string) {
    return await this._userRepository.findByEmail(email)
      .catch(dbExceptionHandler)
  }


  getMany(sort: 'asc' | 'desc' = 'asc') {
    return this._userRepository.findManyOrderById(sort)
  }


  async update(
    email: string,
    values: {
      role?: Role
      nickname?: string
      image?: string
    }
  ) {
    return await this._userRepository.updateByEmail(email, values)
      .catch(dbExceptionHandler)
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
    return await prisma.$transaction(async (trx) => {
      const res = await this._userRepository.updateByEmail(email, { role: 'SUPER_ADMIN' }, trx)
      if (!res) {
        return Promise.reject("Database Error")
      }
      return this._allowedEmailRepository.add(email, trx)
    }).catch(dbExceptionHandler)
  }


  /**
   * 
   * @param email 
   * @returns 
   */
  async authenticateEmail(email: string) {
    return await prisma.$transaction(async (trx) => {
      console.log('トランザクションが開始したに入った')
      const user = await this._userRepository.findByEmail(email, trx)
      if (!user) {
        return Promise.reject("Database Error")
      }
      return await this._allowedEmailRepository.update(email, user.id, trx)
    }).catch(dbExceptionHandler)
  }


}