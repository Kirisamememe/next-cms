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

  findMany() {
    return prisma.allowedEmail.findMany()
  }

  add(email: string, db: DB = prisma) {
    return db.allowedEmail.create({
      data: {
        email: email
      }
    })
  }

  update(
    email: string,
    userId: number,
    db: DB = prisma
  ) {
    return db.allowedEmail.update({
      where: {
        email: email
      },
      data: {
        user: { connect: { id: userId } }
      }
    })
  }

}