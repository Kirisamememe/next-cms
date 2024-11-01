'use server'

import { prisma } from "@/lib/prisma"
import { articlePublicationForm, articleSubmitFormSchema } from "@/types/article-schema"
import { revalidatePath } from "next/cache"
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
      published_at: values.published_at,
      article: {
        create: {
          slug: values.slug,
          author_note: values.author_note,
          author: { connect: { id: values.author_id } },
          last_edited: { connect: { id: values.author_id } },
          published_at: values.published_at,
        }
      }
    },
    include: {
      article: true
    }
  })
}

export async function updateArticle(id: number, operatorId: number, values: z.infer<typeof articleSubmitFormSchema>) {
  return await prisma.$transaction(async (trx) => {
    const atomRes = await trx.articleAtom.create({
      data: {
        title: values.title,
        body: values.body,
        summary: values.summary,
        image: values.image,
        commit_msg: values.commit_msg,
        author: { connect: { id: values.author_id } },
        published_at: values.published_at,
        article: {
          connect: { id: id }
        }
      }
    })

    if (!atomRes.id) {
      throw new Error('DB Error')
    }

    return await trx.article.update({
      where: {
        id: id
      },
      data: {
        slug: values.slug,
        author_note: values.author_note,
        published_at: values.published_at,
        last_edited: {
          connect: { id: operatorId }
        }
      }
    })
  })

}


export async function updatePublishedAt(id: number, atomId: number, operatorId: number, values: z.infer<typeof articlePublicationForm>) {
  return await prisma.$transaction(async (trx) => {
    console.log(`published_at: ${values.published_at}`)
    const atom = await trx.articleAtom.update({
      where: {
        id: atomId
      },
      data: {
        published_at: values.published_at,
      }
    })

    if (!atom.id) {
      throw new Error('DB Error')
    }

    const res = await trx.article.update({
      where: {
        id: id
      },
      data: {
        published_at: values.published_at,
        last_edited: {
          connect: { id: operatorId }
        }
      }
    })
    if (!res.id) {
      throw new Error('DB Error')
    }
    revalidatePath('/admin/articles')
    return res
  })
}

export async function archiveArticle(id: number, operatorId: number) {
  const res = await prisma.article.update({
    where: {
      id: id
    },
    data: {
      archived_at: new Date(),
      last_edited: { connect: { id: operatorId } }
    }
  })
  if (!res) {
    throw new Error('DB Error')
  }
  revalidatePath('/admin/articles')
  return res
}

export async function restoreArticle(id: number, operatorId: number) {
  const res = await prisma.article.update({
    where: {
      id: id
    },
    data: {
      archived_at: null,
      last_edited: { connect: { id: operatorId } }
    }
  })
  if (!res) {
    throw new Error('DB Error')
  }
  revalidatePath('/admin/articles')
  return res
}