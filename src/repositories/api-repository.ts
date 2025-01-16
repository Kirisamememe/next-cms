import 'server-only'
import { injectable } from 'inversify'
import { prisma } from '@/prisma'
import { Api, apiSchema, updateApiSchema } from '@/types'
import { z } from 'zod'


export interface IApiRepository {
  findByName(name: string): Promise<Api | null>
  findMany(): Promise<Api[]>
  create(
    operatorId: number,
    values: z.infer<typeof apiSchema>
  ): Promise<Api | null>
  update(
    apiId: number,
    operatorId: number,
    values: z.infer<typeof updateApiSchema>
  ): Promise<Api | null>
}

@injectable()
export class ApiRepository implements IApiRepository {

  /**
   * 
   * @param name 
   */
  findByName(name: string) {
    return prisma.api.findUnique({
      where: {
        name: name
      }
    })
  }


  findMany() {
    return prisma.api.findMany()
  }


  /**
   * 
   * @param operatorId 
   * @param values 
   */
  create(
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
  update(
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