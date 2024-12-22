import 'server-only'
import { injectable } from 'inversify'
import { prisma } from '@/prisma'
import { AccessToken, EditorConcise } from '@/types'


export interface IAccessTokenRepository {
  create(
    operatorId: number,
    token: string,
    name: string,
    expiresAt: Date
  ): Promise<AccessToken>
  update(token: string, name: string): Promise<AccessToken>
  findUnique(token: string): Promise<AccessToken | null>
  findManyWithAuthor(): Promise<(AccessToken & { author: EditorConcise })[]>
  delete(token: string): Promise<AccessToken>
}

@injectable()
export class AccessTokenRepository implements IAccessTokenRepository {

  /**
   * 
   * @param operatorId 
   * @param token 
   * @param expiresAt 
   * @returns 
   */
  create(operatorId: number, token: string, name: string, expiresAt: Date) {
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
  update(token: string, name: string) {
    return prisma.accessToken.update({
      where: {
        token: token
      },
      data: {
        name: name
      }
    })
  }


  findUnique(token: string) {
    return prisma.accessToken.findUnique({
      where: {
        token: token
      }
    })
  }


  findManyWithAuthor() {
    return prisma.accessToken.findMany({
      include: {
        author: {
          select: {
            id: true,
            role: true,
            nickname: true,
            image: true,
            name: true,
            email: true
          }
        }
      }
    })
  }


  delete(token: string) {
    return prisma.accessToken.delete({
      where: {
        token: token
      }
    })
  }

}
