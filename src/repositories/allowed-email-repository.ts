import 'server-only'
import { DB, prisma } from '@/lib/prisma'

class AllowedEmailRepository {

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

export const allowedEmailRepository = new AllowedEmailRepository()