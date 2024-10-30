'use server'

import { prisma } from "@/lib/prisma"
import { articleSubmitFormSchema } from "@/types/article-schema"
import { z } from "zod"

export async function createArticle(values: z.infer<typeof articleSubmitFormSchema>) {
  return await prisma.articleAtom.create({
    data: {
      title: values.title,
      body: values.body,
      summary: values.summary,
      image: values.image,
      commit_msg: values.commit_msg,
      author: { connect: { id: values.author_id } },
      article: {
        create: {
          slug: values.slug,
          author_note: values.author_note,
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
  const atomRes = await prisma.articleAtom.create({
    data: {
      title: values.title,
      body: values.body,
      summary: values.summary,
      image: values.image,
      commit_msg: values.commit_msg,
      author: { connect: { id: values.author_id } },
      article: {
        connect: { id: id }
      }
    }
  })

  if (!atomRes.id) {
    throw new Error('DB Error')
  }

  return await prisma.article.update({
    where: {
      id: id
    },
    data: {
      slug: values.slug,
      author_note: values.author_note
    }
  })
}

