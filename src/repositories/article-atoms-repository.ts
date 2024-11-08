import 'server-only'
import { prisma, DB } from '@/lib/prisma'
import { z } from 'zod'
import { articleSubmitFormSchema } from '@/types/article-schema'

class ArticleAtomsRepository {

  /**
   * 
   * @param articleId 
   * @param operatorId 
   * @param values 
   * @param db 
   * @returns 
   */
  async create(
    articleId: number,
    operatorId: number,
    values: z.infer<typeof articleSubmitFormSchema>,
    db: DB = prisma
  ) {
    return db.articleAtom.create({
      data: {
        title: values.title,
        summary: values.summary,
        image: values.image,
        body: values.body,
        commitMsg: values.commitMsg,
        publishedAt: values.publishedAt,
        article: {
          connect: { id: articleId }
        },
        author: {
          connect: { id: operatorId }
        }
      }
    })
  }


  /**
   * 
   * @param atomId 
   * @param values 
   * @param db 
   * @returns 
   */
  async updatePublishedAt(
    atomId: number,
    values: { publishedAt: Date | null },
    db: DB = prisma
  ) {
    return db.articleAtom.update({
      where: {
        id: atomId
      },
      data: {
        publishedAt: values.publishedAt,
      }
    })
  }


}

export const articleAtomsRepository = new ArticleAtomsRepository()