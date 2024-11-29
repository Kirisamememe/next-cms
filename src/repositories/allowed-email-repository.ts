import 'server-only'
import { DB, prisma } from '@/prisma'
import { AllowedEmail } from '@/types'
import { injectable } from 'inversify'

export interface IAllowedEmailRepository {
  findMany(): Promise<AllowedEmail[]>
  add(email: string, db: DB): Promise<AllowedEmail | null>
  update(email: string, userId: number, db: DB): Promise<AllowedEmail | null>
}


@injectable()
export class AllowedEmailRepository implements IAllowedEmailRepository {

  async findMany() {
    return await prisma.allowedEmail.findMany()
  }

  async add(email: string, db: DB = prisma) {
    return await db.allowedEmail.create({
      data: {
        email: email
      }
    })
  }

  async update(
    email: string,
    userId: number,
    db: DB = prisma
  ) {
    return await db.allowedEmail.update({
      where: {
        email: email
      },
      data: {
        user: { connect: { id: userId } }
      }
    })
  }

}