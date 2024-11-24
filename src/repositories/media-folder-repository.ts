import 'server-only'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'
import { mediaFolderSchema } from '@/types/media-folder-schema'

class MediaFolderRepository {

  async findRootFolders() {
    return await prisma.mediaFolder.findMany({
      where: {
        parentPath: null
      },
      include: {
        children: true
      },
      orderBy: {
        updatedAt: 'desc'
      }
    })
  }


  async findManyByParentPath(path: string) {
    return await prisma.mediaFolder.findMany({
      where: {
        parentPath: path
      },
      orderBy: {
        updatedAt: 'desc'
      }
    })
  }


  async findUnique(path: string) {
    return await prisma.mediaFolder.findUnique({
      where: {
        path: path
      },
      include: {
        children: true
      }
    })
  }


  async findMany() {
    return await prisma.mediaFolder.findMany()
  }


  async create(name: string, parentPath: string | null) {
    return await prisma.mediaFolder.create({
      data: {
        path: `${parentPath ? `${parentPath}/` : ''}${name}`,
        name: name,
        ...(parentPath && {
          parent: {
            connect: {
              path: parentPath
            }
          }
        })
      }
    })
  }


  async update(path: string, values: z.infer<typeof mediaFolderSchema>) {
    return await prisma.mediaFolder.update({
      where: {
        path: path
      },
      data: {
        path: `${values.parentPath ? `${values.parentPath}/` : ''}${values.name}`,
        name: values.name,
        parent: values.parentPath
          ? { connect: { path: values.parentPath } }
          : { disconnect: true }
      }
    })
  }


  async move(path: string, name: string, parentPath: string | null) {
    return await prisma.mediaFolder.update({
      where: {
        path: path
      },
      data: {
        path: `${parentPath ? `${parentPath}/` : ''}${name}`,
        parent: parentPath
          ? { connect: { path: parentPath } }
          : { disconnect: true }
      }
    })
  }


  async delete(path: string) {
    return await prisma.mediaFolder.delete({
      where: {
        path: path
      }
    })
  }


}


export const mediaFolderRepository = new MediaFolderRepository()