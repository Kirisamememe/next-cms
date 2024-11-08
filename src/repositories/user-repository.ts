import 'server-only'
import { DB, prisma } from '@/lib/prisma'
import { Role } from '@/types/editor-schema'

class UserRepository {

  /**
   * 
   * @param id 
   * @returns 
   */
  async findById(id: number) {
    return await prisma.user.findUnique({
      where: {
        id: id
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
        image: true
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
      }
    })
  }


  /**
   * 
   * @returns 
   */
  async userExist() {
    const users = await prisma.user.findMany()
    return users.length > 0
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
      }
    })
  }

}

export const userRepository = new UserRepository()