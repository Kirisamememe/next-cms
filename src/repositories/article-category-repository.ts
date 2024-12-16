import 'server-only'
import { prisma } from "@/prisma"
import { ContentCategory } from "@/types"
import { injectable } from "inversify"
import { z } from 'zod'
import { categorySchema } from '@/types/schema-category'


export interface IArticleCategoryRepository {
  findMany(): Promise<ContentCategory[]>
  findById(id: number): Promise<ContentCategory | null>
  create(values: z.infer<typeof categorySchema>): Promise<ContentCategory>
  update(categoryId: number, values: z.infer<typeof categorySchema>): Promise<ContentCategory>
}

@injectable()
export class ArticleCategoryRepository implements IArticleCategoryRepository {

  findMany(): Promise<ContentCategory[]> {
    return prisma.articleCategory.findMany()
  }

  findById(id: number): Promise<ContentCategory | null> {
    return prisma.articleCategory.findUnique({
      where: {
        id
      }
    })
  }

  create(values: z.infer<typeof categorySchema>) {
    return prisma.articleCategory.create({
      data: {
        name: values.name
      }
    })
  }

  update(categoryId: number, values: z.infer<typeof categorySchema>) {
    return prisma.articleCategory.update({
      where: {
        id: categoryId
      },
      data: {
        name: values.name
      }
    })
  }
}