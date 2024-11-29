import 'server-only'
import { injectable } from 'inversify'
import { prisma } from '@/prisma'
import { z } from 'zod'
import { MediaFolder, mediaFolderSchema } from '@/types'


export interface IMediaFolderRepository {
  findRootFolders(): Promise<MediaFolder[]>
  findManyByParentPath(path: string): Promise<MediaFolder[]>
  findUnique(path: string): Promise<(MediaFolder & { children: MediaFolder[] }) | null>
  findMany(): Promise<MediaFolder[]>
  create(name: string, parentPath: string): Promise<MediaFolder>
  update(path: string, values: z.infer<typeof mediaFolderSchema>): Promise<MediaFolder>
  move(path: string, name: string, parentPath: string): Promise<MediaFolder>
  delete(path: string): Promise<MediaFolder>
}

@injectable()
export class MediaFolderRepository implements IMediaFolderRepository {

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

  /**
   * 
   * 
   * @param name 
   * @param parentPath 
   * @returns 
   */
  async create(name: string, parentPath: string) {
    return await prisma.mediaFolder.create({
      data: {
        path: `${parentPath}/${name}`,
        name: name,
        ...(parentPath === '.' ? {
          parent: {
            connectOrCreate: {
              where: {
                path: parentPath
              },
              create: {
                path: parentPath,
                name: '.'
              }
            }
          }
        } : {
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
        path: `${values.parentPath}/${values.name}`,
        name: values.name,
        parent: { connect: { path: values.parentPath } }
      }
    })
  }


  async move(path: string, name: string, parentPath: string) {
    return await prisma.mediaFolder.update({
      where: {
        path: path
      },
      data: {
        path: `${parentPath}/${name}`,
        parent: { connect: { path: parentPath } },
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