import 'server-only'
import { ContentCategory } from "@/types";
import { injectable } from "inversify";
import { prisma } from '@/prisma';
import { categorySchema } from '@/types/schema-category';
import { z } from 'zod';

export interface IJsonContentCategoryRepository {
  findMany(): Promise<ContentCategory[]>
  findById(id: number): Promise<ContentCategory | null>
  create(values: z.infer<typeof categorySchema>): Promise<ContentCategory>
  update(categoryId: number, values: z.infer<typeof categorySchema>): Promise<ContentCategory>
}

@injectable()
export class JsonContentCategoryRepository implements IJsonContentCategoryRepository {

  findMany(): Promise<ContentCategory[]> {
    return prisma.jsonContentCategory.findMany()
  }

  findById(id: number): Promise<ContentCategory | null> {
    return prisma.jsonContentCategory.findUnique({
      where: {
        id
      }
    })
  }

  create(values: z.infer<typeof categorySchema>) {
    return prisma.jsonContentCategory.create({
      data: {
        name: values.name
      }
    })
  }

  update(categoryId: number, values: z.infer<typeof categorySchema>) {
    return prisma.jsonContentCategory.update({
      where: {
        id: categoryId
      },
      data: {
        name: values.name
      }
    })
  }

}