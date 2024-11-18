import 'server-only'
import { DB, prisma } from '@/lib/prisma'
import { articleSubmitFormSchema, filter } from '@/types/article-schema'
import { z } from 'zod'
import { createId } from '@paralleldrive/cuid2'


class ArticleRepository {

  private authorProperties = {
    select: {
      id: true,
      name: true,
      nickname: true,
      role: true,
      image: true
    }
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
        atoms: {
          include: {
            author: this.authorProperties
          },
          orderBy: [{
            selectedAt: {
              sort: "desc",
              nulls: "last"
            }
          }, {
            createdAt: "desc"
          }],
          take: 1,
        },
        author: this.authorProperties,
        lastEdited: this.authorProperties
      }
    })
  }


  /**
   * 全記事と、各記事の最新版のatomを取得
   * 最新版atomの判断基準：
   * 1、publishedAtが最新である
   * 2、publishedAtが全部nullの場合、created_atが最新である
   * @returns 
   */
  findManyOrderByUpdatedAt(filter?: filter) {
    return prisma.article.findMany({
      ...(!filter && {
        where: {
          archivedAt: null
        }
      }),
      ...(filter === 'draft' && {
        where: {
          OR: [
            { publishedAt: null },
            { publishedAt: { gt: new Date() } }
          ],
          archivedAt: null
        }
      }),
      ...(filter === 'publish' && {
        where: {
          publishedAt: {
            lt: new Date()
          },
          archivedAt: null
        }
      }),
      ...(filter === 'archive' && {
        where: {
          archivedAt: { not: null }
        }
      }),
      include: {
        atoms: {
          include: {
            author: this.authorProperties
          },
          orderBy: [{
            selectedAt: {
              sort: "desc",
              nulls: "last"
            }
          }, {
            createdAt: "desc"
          }],
          take: 1
        },
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

export const articleRepository = new ArticleRepository()