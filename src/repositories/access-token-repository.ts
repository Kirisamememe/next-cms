import 'server-only'
import { prisma } from '@/prisma'

class AccessTokenRepository {

  /**
   * 
   * @param operatorId 
   * @param token 
   * @param expiresAt 
   * @returns 
   */
  async create(operatorId: number, token: string, name: string, expiresAt: Date) {
    return prisma.accessToken.create({
      data: {
        token: token,
        name: name,
        expiresAt: expiresAt,
        author: {
          connect: { id: operatorId }
        }
      }
    })
  }


  /**
   * 
   * @param token 
   * @param name 
   * @returns 
   */
  async update(token: string, name: string) {
    return prisma.accessToken.update({
      where: {
        token: token
      },
      data: {
        name: name
      }
    })
  }


  async findUnique(token: string) {
    return prisma.accessToken.findUnique({
      where: {
        token: token
      }
    })
  }


  async findMany() {
    return prisma.accessToken.findMany()
  }

  async findManyWithAuthor() {
    return prisma.accessToken.findMany({
      include: {
        author: true
      }
    })
  }


  async delete(token: string) {
    return prisma.accessToken.delete({
      where: {
        token: token
      }
    })
  }

}

export const accessTokenRepository = new AccessTokenRepository()
