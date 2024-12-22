import 'server-only'
import { injectable } from 'inversify'
import { DB, prisma } from '@/prisma'
import { z } from 'zod'
import { ArticleAtom, articleSubmitFormSchema } from '@/types'

export interface IArticleAtomsRepository {
  create(
    articleId: number,
    operatorId: number,
    values: z.infer<typeof articleSubmitFormSchema>,
    db?: DB
  ): Promise<ArticleAtom>

  updateSelectedAt(
    atomId: number,
    db?: DB
  ): Promise<ArticleAtom>
}

@injectable()
export class ArticleAtomsRepository implements IArticleAtomsRepository {

  /**
   * 
   * @param articleId 
   * @param operatorId 
   * @param values 
   * @param db 
   * @returns 
   */
  create(
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
  updateSelectedAt(
    atomId: number,
    db: DB = prisma
  ) {
    return db.articleAtom.update({
      where: {
        id: atomId
      },
      data: {
        selectedAt: new Date(),
      }
    })
  }


}