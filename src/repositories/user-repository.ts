import 'server-only'
import { DB, prisma } from '@/prisma'
import { injectable } from 'inversify'
import { EditorConcise, Role } from '@/types'


export interface IUserRepository {
  findById(id: number): Promise<EditorConcise | null>
  findByEmail(email: string, db?: DB): Promise<EditorConcise | null>
  findManyOrderById(sort?: 'asc' | 'desc'): Promise<EditorConcise[]>
  updateByEmail(
    email: string,
    values: {
      role?: Role
      nickname?: string
      image?: string
    },
    db?: DB
  ): Promise<EditorConcise>
  userExist(): Promise<boolean>
  noSuperAdmin(): Promise<boolean>
  setSuperAdmin(email: string): Promise<EditorConcise>
}

@injectable()
export class UserRepository implements IUserRepository {

  /**
   * 
   * @param id 
   * @returns 
   */
  async findById(id: number) {
    return await prisma.user.findUnique({
      where: {
        id: id
      },
      select: {
        id: true,
        role: true,
        nickname: true,
        image: true,
        name: true,
        email: true
      }
    })
  }


  /**
   * 
   * @param email 
   * @param db 
   * @returns 
   */
  async findByEmail(email: string, db: DB = prisma) {
    return await db.user.findUnique({
      where: {
        email: email
      },
      select: {
        id: true,
        role: true,
        nickname: true,
        image: true,
        name: true,
        email: true
      }
    })
  }


  /**
   * 
   * @param sort 
   * @returns 
   */
  async findManyOrderById(sort: 'asc' | 'desc' = 'asc') {
    return await prisma.user.findMany({
      orderBy: {
        id: sort
      },
      select: {
        id: true,
        role: true,
        nickname: true,
        image: true,
        name: true,
        email: true
      }
    })
  }


  /**
   * 
   * @param email 
   * @param values 
   * @param db 
   * @returns 
   */
  async updateByEmail(
    email: string,
    values: {
      role?: Role
      nickname?: string
      image?: string
    },
    db: DB = prisma
  ) {
    return await db.user.update({
      where: {
        email: email
      },
      data: {
        role: values.role,
        nickname: values.nickname,
        image: values.image
      },
      select: {
        id: true,
        role: true,
        nickname: true,
        image: true,
        name: true,
        email: true
      }
    })
  }



  /**
   * 
   * @returns 
   */
  async userExist() {
    const usersCount = await prisma.user.count()
    return usersCount > 0
  }


  /**
   * 
   * @returns 
   */
  async noSuperAdmin() {
    const superAdmin = await prisma.user.findMany({
      where: {
        role: "SUPER_ADMIN"
      }
    })
    return superAdmin.length === 0;
  }


  /**
   * 
   * @param email 
   * @returns 
   */
  async setSuperAdmin(email: string) {
    return await prisma.user.update({
      where: {
        email: email
      },
      data: {
        role: "SUPER_ADMIN",
        allowed_email: {
          create: {
            email: email
          }
        }
      },
      select: {
        id: true,
        role: true,
        nickname: true,
        image: true,
        name: true,
        email: true
      }
    })
  }

}