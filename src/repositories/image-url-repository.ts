import 'server-only'
import { DB, prisma } from '@/prisma'
import { injectable } from 'inversify'
import { z } from 'zod'
import { imageUrlSchema, multipleImageUrlSchema } from '@/types'
import { createId } from '@paralleldrive/cuid2'
import { ImageUrl } from '@/types'

export interface IImageUrlRepository {
  findByPath(path: string): Promise<ImageUrl[]>
  findUniqueByUrl(url: string, db?: DB): Promise<ImageUrl | null>
  findUnique(imageId: number, db?: DB): Promise<ImageUrl | null>
  findAllUrls(): Promise<{ url: string }[]>
  create(operatorId: number, values: z.infer<typeof imageUrlSchema>, db?: DB): Promise<ImageUrl>
  createMany(operatorId: number, values: z.infer<typeof multipleImageUrlSchema>): Promise<{ count: number }>
  update(imageId: number, operatorId: number, values: z.infer<typeof imageUrlSchema>, db?: DB): Promise<ImageUrl>
  move(imageId: number, operatorId: number, folderPath: string): Promise<ImageUrl>
  delete(imageId: number): Promise<ImageUrl>
  getCount(): Promise<number>
}


@injectable()
export class ImageUrlRepository implements IImageUrlRepository {

  findByPath(path: string) {
    return prisma.imageUrl.findMany({
      where: {
        folderPath: path
      },
      orderBy: [
        { updatedAt: "desc" },
        { url: "asc" }
      ],
      include: {
        author: {
          select: {
            id: true,
            name: true,
            nickname: true,
            image: true,
            role: true,
            email: true
          }
        }
      }
    })
  }


  findUniqueByUrl(url: string, db: DB = prisma) {
    return db.imageUrl.findUnique({
      where: {
        url: url
      }
    })
  }


  findUnique(imageId: number, db: DB = prisma) {
    return db.imageUrl.findUnique({
      where: {
        id: imageId
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            nickname: true,
            image: true,
            role: true,
            email: true
          }
        }
      }
    })
  }


  findAllUrls() {
    return prisma.imageUrl.findMany({
      select: {
        url: true
      }
    })
  }


  create(
    operatorId: number,
    values: z.infer<typeof imageUrlSchema>,
    db: DB = prisma
  ) {
    return db.imageUrl.create({
      data: {
        name: values.name || createId(),
        url: values.url,
        archivedAt: values.archivedAt,
        author: {
          connect: { id: operatorId }
        },
        lastEdited: {
          connect: { id: operatorId }
        },
        ...(values.folderPath === '.' ? {
          folder: {
            connectOrCreate: {
              where: {
                path: values.folderPath
              },
              create: {
                path: values.folderPath,
                name: '.'
              }
            }
          }
        } : {
          folder: {
            connect: { path: values.folderPath }
          }
        })
      }
    })
  }


  createMany(
    operatorId: number,
    values: z.infer<typeof multipleImageUrlSchema>
  ) {
    return prisma.imageUrl.createMany({
      data: values.urls.map((url) => ({
        name: createId(),
        url: url,
        authorId: operatorId,
        lastEditedBy: operatorId,
        ...(values.folderPath && {
          folderPath: values.folderPath
        })
      })),
      skipDuplicates: true,
    })
  }


  update(
    imageId: number,
    operatorId: number,
    values: z.infer<typeof imageUrlSchema>,
    db: DB = prisma
  ) {
    return db.imageUrl.update({
      where: {
        id: imageId
      },
      data: {
        name: values.name,
        url: values.url,
        archivedAt: values.archivedAt,
        author: {
          connect: { id: operatorId }
        },
        lastEdited: {
          connect: { id: operatorId }
        },
        folder: { connect: { path: values.folderPath } }
      }
    })
  }


  move(
    imageId: number,
    operatorId: number,
    folderPath: string
  ) {
    return prisma.imageUrl.update({
      where: {
        id: imageId
      },
      data: {
        folder: { connect: { path: folderPath } },
        lastEdited: {
          connect: { id: operatorId }
        },
      }
    })
  }


  delete(imageId: number) {
    return prisma.imageUrl.delete({
      where: {
        id: imageId
      }
    })
  }

  getCount() {
    return prisma.imageUrl.count()
  }

}