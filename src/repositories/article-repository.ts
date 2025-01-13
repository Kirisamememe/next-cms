import 'server-only'
import { injectable } from 'inversify'
import { DB, prisma } from '@/prisma'
import { createId } from '@paralleldrive/cuid2'
import { Article, articleSubmitFormSchema, Filter, FindManyOptions, ArticleWithAllFields } from '@/types'
import { z } from 'zod'
import { ContentRepository } from './content-repository'

export interface IArticleRepository {
  findById(id: number, publishedOnly: boolean): Promise<ArticleWithAllFields | null>
  findMany(filter?: Filter, options?: FindManyOptions): Promise<ArticleWithAllFields[]>
  create(operatorId: number, values: z.infer<typeof articleSubmitFormSchema>, db?: DB): Promise<Article>
  update(articleId: number, operatorId: number, values: z.infer<typeof articleSubmitFormSchema>, db?: DB): Promise<Article>
  updateDate(articleId: number, operatorId: number, values: { publishedAt?: Date | null, archivedAt?: Date | null }, db?: DB): Promise<Article>
  getCount(filter?: Filter, categoryId?: number): Promise<number>
}


@injectable()
export class ArticleRepository extends ContentRepository implements IArticleRepository {

  private atomsProperties = {
    orderBy: [
      this.orderBy({ column: 'selectedAt', nullable: true }),
      this.orderBy({ column: 'createdAt' })
    ],
    take: 1
  }


  /**
   * 全記事と、各記事の最新版のatomを取得
   * 最新版atomの判断基準：
   * 1、publishedAtが最新である
   * 2、publishedAtが全部nullの場合、created_atが最新である
   * @returns 
   */
  findMany(
    filter: Filter = 'all',
    options?: FindManyOptions,
  ) {
    const {
      orderby = 'updatedAt',
      nullable = false,
      sort = 'desc',
      take,
      skip,
      searchStr,
      editorsInfo = true,
    } = options || {}

    const orderBy = [
      { column: orderby, nullable, order: sort },
      { column: orderby === 'createdAt' ? 'updatedAt' : 'createdAt', nullable, order: sort }
    ]

    return prisma.article.findMany({
      where: {
        ...this.getFilter(filter),
      },
      include: {
        atoms: {
          ...this.atomsProperties,
          ...(searchStr && {
            where: {
              OR: [
                { title: { contains: searchStr } },
                { summary: { contains: searchStr } },
                { body: { contains: searchStr } },
              ]
            }
          })
        },
        ...(editorsInfo && {
          author: this.authorProperties,
          lastEdited: this.authorProperties
        })
      },
      orderBy: [...orderBy.map((o) => this.orderBy(o))],
      ...(take && {
        take: take
      }),
      ...(skip && {
        skip: skip
      })
    })
  }

  /**
   * 特定の記事を取得、JOIN無し
   * @param id 
   * @returns 
   */
  findById(id: number, publishedOnly: boolean = false) {
    return prisma.article.findUnique({
      where: {
        id: id,
        ...(publishedOnly && {
          publishedAt: {
            lt: new Date()
          },
          archivedAt: null
        })
      },
      include: {
        atoms: this.atomsProperties,
        author: this.authorProperties,
        lastEdited: this.authorProperties
      }
    })
  }


  findPublishedById(id: number) {
    return prisma.article.findUnique({
      where: {
        id: id,
        publishedAt: {
          lt: new Date()
        },
        archivedAt: null
      },
    })
  }



  create(
    operatorId: number,
    values: z.infer<typeof articleSubmitFormSchema>,
    db: DB = prisma
  ) {
    return db.article.create({
      data: {
        slug: values.slug || createId(),
        authorNote: values.authorNote,
        publishedAt: values.publishedAt,
        author: {
          connect: { id: operatorId }
        },
        lastEdited: {
          connect: { id: operatorId }
        },
        ...(values.categoryId && {
          category: {
            connect: { id: values.categoryId }
          }
        })
      }
    })
  }


  /**
   * 
   * @param articleId 
   * @param operatorId 
   * @param values 
   * @param db 
   * @returns 
   */
  update(
    articleId: number,
    operatorId: number,
    values: z.infer<typeof articleSubmitFormSchema>,
    db: DB = prisma
  ) {
    return db.article.update({
      where: {
        id: articleId
      },
      data: {
        slug: values.slug || createId(),
        authorNote: values.authorNote,
        publishedAt: values.publishedAt,
        lastEdited: {
          connect: { id: operatorId }
        },
        ...(values.categoryId && {
          category: {
            connect: { id: values.categoryId }
          }
        })
      }
    })
  }


  /**
   * 
   * @param articleId 
   * @param operatorId 
   * @param values 
   * @param db 
   * @returns 
   */
  updateDate(
    articleId: number,
    operatorId: number,
    values: {
      publishedAt?: Date | null
      archivedAt?: Date | null
    },
    db: DB = prisma
  ) {
    return db.article.update({
      where: {
        id: articleId
      },
      data: {
        publishedAt: values.publishedAt,
        archivedAt: values.archivedAt,
        lastEdited: {
          connect: { id: operatorId }
        }
      }
    })
  }


  getCount(filter: Filter = 'all', categoryId?: number) {
    return prisma.article.count({
      where: {
        ...this.getFilter(filter),
        categoryId
      }
    })
  }

}