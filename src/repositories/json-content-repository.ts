import 'server-only'
import { Filter, FindManyOptions } from "@/types"
import { JsonContent, JsonContentWithAllFields, jsonContentSchema } from "@/types"
import { injectable } from "inversify"
import { prisma } from '@/prisma'
import { ContentRepository } from './content-repository'
import { z } from 'zod'


export interface IJsonContentRepository {
  findMany(filter: Filter, options?: FindManyOptions): Promise<JsonContentWithAllFields[]>
  findById(id: number, publishedOnly: boolean): Promise<JsonContentWithAllFields | null>
  update(jsonContentId: number, operatorId: number, values: z.infer<typeof jsonContentSchema>): Promise<JsonContent>
  updateAndCreateAtom(jsonContentId: number, operatorId: number, values: z.infer<typeof jsonContentSchema>): Promise<JsonContent>
  createWithAtom(operatorId: number, values: z.infer<typeof jsonContentSchema>): Promise<JsonContent>
}

@injectable()
export class JsonContentRepository extends ContentRepository implements IJsonContentRepository {
  private atomsProperties = {
    include: {
      author: this.authorProperties
    },
    orderBy: [
      this.orderBy({ column: 'selectedAt', nullable: true }),
      this.orderBy({ column: 'version' })
    ],
    take: 1
  }


  findMany(filter: Filter = 'all', options?: FindManyOptions) {
    const {
      orderBy = [
        { column: 'updatedAt', nullable: false, order: 'desc', },
        { column: 'createdAt', nullable: false, order: 'desc', }
      ],
      take,
    } = options || {}

    return prisma.jsonContent.findMany({
      ...this.getFilter(filter),
      include: {
        jsonAtoms: this.atomsProperties,
        author: this.authorProperties,
        lastEditor: this.authorProperties
      },
      orderBy: [...orderBy.map((o) => this.orderBy(o))],
      ...(take && {
        take: take
      })
    })
  }

  findById(id: number, publishedOnly: boolean = false) {
    return prisma.jsonContent.findUnique({
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
        jsonAtoms: this.atomsProperties,
        author: this.authorProperties,
        lastEditor: this.authorProperties
      }
    })
  }

  update(
    jsonContentId: number,
    operatorId: number,
    values: z.infer<typeof jsonContentSchema>
  ) {
    return prisma.jsonContent.update({
      where: {
        id: jsonContentId
      },
      data: {
        slug: values.slug,
        authorNote: values.authorNote,
        adminOnly: values.adminOnly,
        permissionLevel: values.permissionLevel,
        publishedAt: values.publishedAt,
        archivedAt: values.archivedAt,
        lastEditor: {
          connect: { id: operatorId }
        }
      }
    })
  }

  updateAndCreateAtom(jsonContentId: number, operatorId: number, values: z.infer<typeof jsonContentSchema>): Promise<JsonContent> {
    return prisma.jsonContent.update({
      where: {
        id: jsonContentId
      },
      data: {
        slug: values.slug,
        authorNote: values.authorNote,
        adminOnly: values.adminOnly,
        permissionLevel: values.permissionLevel,
        publishedAt: values.publishedAt,
        archivedAt: values.archivedAt,
        lastEditor: {
          connect: { id: operatorId }
        },
        ...(values.categoryId && {
          category: {
            connect: { id: values.categoryId }
          }
        }),
        jsonAtoms: {
          create: {
            content: values.json,
            title: values.title,
            description: values.description,
            author: {
              connect: { id: operatorId }
            }
          }
        }
      }
    })
  }


  createWithAtom(
    operatorId: number,
    values: z.infer<typeof jsonContentSchema>
  ) {
    return prisma.jsonContent.create({
      data: {
        slug: values.slug,
        authorNote: values.authorNote,
        ...(values.categoryId && {
          category: {
            connect: { id: values.categoryId }
          }
        }),
        ...(values.publishedAt && {
          publishedAt: values.publishedAt
        }),
        author: {
          connect: { id: operatorId }
        },
        lastEditor: {
          connect: { id: operatorId }
        },
        jsonAtoms: {
          create: {
            title: values.title,
            description: values.description,
            content: values.json,
            author: {
              connect: { id: operatorId }
            }
          }
        }
      }
    })
  }

}