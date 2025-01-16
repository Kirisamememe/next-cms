import 'server-only'
import { injectable } from 'inversify'
import { prisma } from '@/prisma'
import { ContentGroup, ContentGroupListItem, contentGroupSchema, ContentGroupSingleItem } from '@/types'
import { z } from 'zod'
import { ContentRepository } from './content-repository'

export interface IContentGroupRepository {
  create: (operatorId: number, values: z.infer<typeof contentGroupSchema>) => Promise<ContentGroup>
  update: (groupId: number, operatorId: number, values: z.infer<typeof contentGroupSchema>) => Promise<ContentGroup>
  findMany: () => Promise<ContentGroupListItem[]>
  findUnique: (id: number) => Promise<ContentGroupSingleItem | null>
}

@injectable()
export class ContentGroupRepository extends ContentRepository implements IContentGroupRepository {

  create(operatorId: number, values: z.infer<typeof contentGroupSchema>): Promise<ContentGroup> {
    return prisma.contentGroup.create({
      data: {
        name: values.name,
        description: values.description,
        permissionLevel: values.permissionLevel,
        ...(values.imageId && {
          image: {
            connect: { id: values.imageId }
          }
        }),
        author: {
          connect: { id: operatorId }
        },
        lastEditor: {
          connect: { id: operatorId }
        },
        articles: {
          connect: values.articles.map((id) => ({ id }))
        },
        jsonContents: {
          connect: values.jsonContents.map((id) => ({ id }))
        },
        mediaFolders: {
          connect: values.mediaFolders.map((path) => ({ path }))
        }
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
        name: values.name,
        description: values.description,
        permissionLevel: values.permissionLevel,
        ...(values.imageId ? {
          image: {
            connect: { id: values.imageId }
          }
        } : {
          image: {
            disconnect: true
          }
        }),
        lastEditor: {
          connect: { id: operatorId }
        },
        articles: {
          connect: values.articles.map((id) => ({ id }))
        },
        jsonContents: {
          connect: values.jsonContents.map((id) => ({ id }))
        },
        mediaFolders: {
          connect: values.mediaFolders.map((path) => ({ path }))
        }
      }
    })
  }

  findMany() {
    return prisma.contentGroup.findMany({
      include: {
        articles: {
          select: {
            id: true
          }
        },
        jsonContents: {
          select: {
            id: true
          }
        },
        mediaFolders: {
          select: {
            path: true
          }
        },
        author: this.authorProperties,
        lastEditor: this.authorProperties
      },
      orderBy: {
        updatedAt: 'desc'
      }
    })
  }


  findUnique(id: number) {
    return prisma.contentGroup.findUnique({
      where: {
        id: id
      },
      include: {
        articles: {
          select: {
            id: true,
            atoms: {
              select: {
                title: true,
                body: true
              },
              take: 1,
              orderBy: {
                selectedAt: 'desc'
              }
            }
          },
        },
        jsonContents: {
          select: {
            id: true,
            jsonAtoms: {
              select: {
                title: true,
              },
              take: 1,
              orderBy: {
                selectedAt: 'desc'
              }
            }
          },
        },
        mediaFolders: {
          select: {
            path: true,
            name: true
          }
        },
        author: this.authorProperties,
        lastEditor: this.authorProperties
      }
    })
  }
}