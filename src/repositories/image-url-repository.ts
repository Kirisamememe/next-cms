import 'server-only'
import { DB, prisma } from '@/lib/prisma'
import { z } from 'zod'
import { imageUrlSchema, multipleImageUrlSchema } from '@/types/image-url-schema'
import { createId } from '@paralleldrive/cuid2'

class ImageUrlRepository {

  async findByPath(path: string) {
    return await prisma.imageUrl.findMany({
      where: {
        folderPath: path
      },
      orderBy: [
        { updatedAt: "desc" },
        { url: "asc" }
      ]
    })
  }


  async findUniqueByUrl(url: string, db: DB = prisma) {
    return await db.imageUrl.findUnique({
      where: {
        url: url
      }
    })
  }


  async findUnique(imageId: number, db: DB = prisma) {
    return await db.imageUrl.findUnique({
      where: {
        id: imageId
      }
    })
  }


  async findAllUrls() {
    return await prisma.imageUrl.findMany({
      select: {
        url: true
      }
    })
  }


  async create(
    operatorId: number,
    values: z.infer<typeof imageUrlSchema>,
    db: DB = prisma
  ) {
    return await db.imageUrl.create({
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


  async createMany(
    operatorId: number,
    values: z.infer<typeof multipleImageUrlSchema>
  ) {
    return await prisma.imageUrl.createMany({
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


  async update(
    imageId: number,
    operatorId: number,
    values: z.infer<typeof imageUrlSchema>,
    db: DB = prisma
  ) {
    return await db.imageUrl.update({
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


  async move(
    imageId: number,
    operatorId: number,
    folderPath: string
  ) {
    return await prisma.imageUrl.update({
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


  async delete(imageId: number) {
    return await prisma.imageUrl.delete({
      where: {
        id: imageId
      }
    })
  }

}

export const imageUrlRepository = new ImageUrlRepository()