'use server'

import { prisma } from "@/prisma"
import { articleSubmitFormSchema } from "@/types/article-schema"
import { z } from "zod"

export async function createArticle(values: z.infer<typeof articleSubmitFormSchema>) {
  return await prisma.articleAtom.create({
    data: {
      body: values.body,
      author: { connect: { id: values.author_id } },
      article: {
        create: {
          slug: values.slug,
          author: { connect: { id: values.author_id } },
        }
      }
    },
    include: {
      article: true
    }
  })
}

export async function updateArticle(id: number, values: z.infer<typeof articleSubmitFormSchema>) {
  return await prisma.articleAtom.update({
    where: {
      id: id
    },
    data: {
      body: values.body,
    },
    include: {
      article: true
    }
  })
}

