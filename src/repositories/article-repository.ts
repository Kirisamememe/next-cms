import 'server-only'
import { injectable } from 'inversify'
import { DB, prisma } from '@/prisma'
import { createId } from '@paralleldrive/cuid2'
import { Article, articleSubmitFormSchema, Filter, FindManyOptions, ArticleWithAllFields } from '@/types'
import { z } from 'zod'

export interface IArticleRepository {
  findById(id: number, publishedOnly: boolean): Promise<ArticleWithAllFields | null>
  findMany(filter?: Filter, options?: FindManyOptions): Promise<ArticleWithAllFields[]>
  findManyOrderByUpdatedAt(filter?: Filter): Promise<ArticleWithAllFields[]>
  create(operatorId: number, values: z.infer<typeof articleSubmitFormSchema>, db?: DB): Promise<Article>
  update(articleId: number, operatorId: number, values: z.infer<typeof articleSubmitFormSchema>, db?: DB): Promise<Article>
  updateDate(articleId: number, operatorId: number, values: { publishedAt?: Date | null, archivedAt?: Date | null }, db?: DB): Promise<Article>
}


@injectable()
export class ArticleRepository implements IArticleRepository {

  private orderBy = (
    column: string,
    options?: {
      order?: 'desc' | 'asc',
      nullable?: boolean
    }
  ) => {
    const {
      order = 'desc',
      nullable = false
    } = options || {}

    return (
      nullable
        ? ({ [column]: { sort: order, nulls: "last" } })
        : ({ [column]: order })
    )
  }



  private noFilter = {
    where: {
      archivedAt: null
    }
  }

  private draftFilter = {
    where: {
      OR: [
        { publishedAt: null },
        { publishedAt: { gt: new Date() } }
      ],
      archivedAt: null
    }
  }

  private publishFilter = {
    where: {
      publishedAt: {
        lt: new Date()
      },
      archivedAt: null
    }
  }

  private archivedFilter = {
    where: {
      archivedAt: { not: null }
    }
  }

  private authorProperties = {
    select: {
      id: true,
      email: true,
      name: true,
      nickname: true,
      role: true,
      image: true
    }
  }

  private atomsProperties = {
    include: {
      author: this.authorProperties
    },
    orderBy: [
      this.orderBy('selectedAt', { nullable: true }),
      this.orderBy('createdAt')
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
      orderBy = ['updatedAt', 'createdAt'],
      order = 'desc',
      take,
    } = options || {}

    return prisma.article.findMany({
      ...(filter === 'all' && this.noFilter),
      ...(filter === 'draft' && this.draftFilter),
      ...(filter === 'publish' && this.publishFilter),
      ...(filter === 'archive' && this.archivedFilter),
      include: {
        atoms: this.atomsProperties,
        author: this.authorProperties,
        lastEdited: this.authorProperties
      },
      orderBy: [...orderBy.map((o) => this.orderBy(o, { order }))],
      ...(take && {
        take: take
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


  /**
   * 全記事と、各記事の最新版のatomを取得
   * 最新版atomの判断基準：
   * 1、publishedAtが最新である
   * 2、publishedAtが全部nullの場合、created_atが最新である
   * @returns 
   */
  findManyOrderByUpdatedAt(filter?: Filter) {
    return prisma.article.findMany({
      ...(!filter && this.noFilter),
      ...(filter === 'draft' && this.draftFilter),
      ...(filter === 'publish' && this.publishFilter),
      ...(filter === 'archive' && this.archivedFilter),
      include: {
        atoms: this.atomsProperties,
        author: this.authorProperties,
        lastEdited: this.authorProperties
      },
      orderBy: {
        updatedAt: "desc"
      }
    })
  }



  async create(
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
  async update(
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
  async updateDate(
    articleId: number,
    operatorId: number,
    values: {
      publishedAt?: Date | null
      archivedAt?: Date | null
    },
    db: DB = prisma
  ) {
    return await db.article.update({
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


}