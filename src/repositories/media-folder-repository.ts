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
  getCount(): Promise<number>
}

@injectable()
export class MediaFolderRepository implements IMediaFolderRepository {

  findRootFolders() {
    return prisma.mediaFolder.findMany({
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


  findManyByParentPath(path: string) {
    return prisma.mediaFolder.findMany({
      where: {
        parentPath: path
      },
      orderBy: {
        updatedAt: 'desc'
      }
    })
  }


  findUnique(path: string) {
    return prisma.mediaFolder.findUnique({
      where: {
        path: path
      },
      include: {
        children: true
      }
    })
  }


  findMany() {
    return prisma.mediaFolder.findMany()
  }

  /**
   * 
   * 
   * @param name 
   * @param parentPath 
   * @returns 
   */
  create(name: string, parentPath: string) {
    return prisma.mediaFolder.create({
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


  update(path: string, values: z.infer<typeof mediaFolderSchema>) {
    return prisma.mediaFolder.update({
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


  move(path: string, name: string, parentPath: string) {
    return prisma.mediaFolder.update({
      where: {
        path: path
      },
      data: {
        path: `${parentPath}/${name}`,
        parent: { connect: { path: parentPath } },
      }
    })
  }


  delete(path: string) {
    return prisma.mediaFolder.delete({
      where: {
        path: path
      }
    })
  }

  getCount() {
    return prisma.mediaFolder.count()
  }
}