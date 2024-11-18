import 'server-only'
import { prisma } from '@/lib/prisma'
import { apiSchema, updateApiSchema } from '@/types/api-schema'
import { z } from 'zod'

class ApiRepository {

  /**
   * 
   * @param name 
   */
  async findByName(name: string) {
    return prisma.api.findUnique({
      where: {
        name: name
      },
      include: {
        contents: true,
        collections: true
      }
    })
  }


  async findMany() {
    return await prisma.api.findMany()
  }

  async findManyForCache() {
    return await prisma.api.findMany({
      select: {
        path: true,
        activatedAt: true,
      }
    })
  }


  /**
   * 
   * @param operatorId 
   * @param values 
   */
  async create(
    operatorId: number,
    values: z.infer<typeof apiSchema>
  ) {
    return prisma.api.create({
      data: {
        name: values.name,
        path: values.path,
        key: values.key,
        activatedAt: values.activatedAt,
        allowedOrigins: values.allowedOrigins?.join(','),
        author: {
          connect: { id: operatorId }
        },
        lastEditor: {
          connect: { id: operatorId }
        }
      }
    })
  }


  /**
   * 
   * @param apiId 
   * @param operatorId 
   * @param values 
   */
  async update(
    apiId: number,
    operatorId: number,
    values: z.infer<typeof updateApiSchema>
  ) {
    return prisma.api.update({
      where: {
        id: apiId
      },
      data: {
        name: values.name,
        path: values.path,
        key: values.key,
        activatedAt: values.activatedAt,
        allowedOrigins: values.allowedOrigins?.join(','),
        author: {
          connect: { id: operatorId }
        },
        lastEditor: {
          connect: { id: operatorId }
        }
      }
    })
  }
}

export const apiRepository = new ApiRepository()