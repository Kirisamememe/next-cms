import 'server-only'
import { injectable } from 'inversify'
import { prisma } from '@/prisma'
import { ContentGroup, contentGroupSchema } from '@/types'
import { z } from 'zod'

export interface IContentGroupRepository {
  create: (operatorId: number, values: z.infer<typeof contentGroupSchema>) => Promise<ContentGroup>
  update: (groupId: number, operatorId: number, values: z.infer<typeof contentGroupSchema>) => Promise<ContentGroup>
  addArticle: (groupId: number, articleId: number, operatorId: number) => Promise<ContentGroup>
}

@injectable()
export class ContentGroupRepository implements IContentGroupRepository {

  create(operatorId: number, values: z.infer<typeof contentGroupSchema>): Promise<ContentGroup> {
    return prisma.contentGroup.create({
      data: {
        author: {
          connect: { id: operatorId }
        },
        lastEditor: {
          connect: { id: operatorId }
        },
        ...values
      }
    })
  }

  update(
    groupId: number,
    operatorId: number,
    values: z.infer<typeof contentGroupSchema>
  ): Promise<ContentGroup> {
    return prisma.contentGroup.update({
      where: {
        id: groupId
      },
      data: {
        lastEditor: {
          connect: { id: operatorId }
        },
        ...values
      }
    })
  }

  addArticle(
    groupId: number,
    articleId: number,
    operatorId: number,
  ) {
    return prisma.contentGroup.update({
      where: {
        id: groupId
      },
      data: {
        articles: {
          connect: { id: articleId },
        },
        lastEditor: {
          connect: { id: operatorId }
        }
      }
    })
  }

}