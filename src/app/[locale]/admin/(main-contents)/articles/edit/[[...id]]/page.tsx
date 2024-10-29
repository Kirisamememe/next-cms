
import { prisma } from "@/prisma";
import { Locale } from "@/i18n/config";
import { auth } from "@/auth";
import { NewArticle } from "../../components/new-article";
import { EditArticle } from "../../components/edit-article";

type Props = {
  params: Promise<{
    id: string
    locale: Locale
  }>
}

export default async function EditArticlePage({ params }: Props) {
  const { id } = await params

  if (!id) {
    const session = await auth()
    if (!session?.operatorId) {
      return null
    }

    return (
      <NewArticle operatorId={session.operatorId} />
    )
  }

  const article = await prisma.article.findUnique({
    where: {
      id: Number(id),
    },
    include: {
      article_atoms: {
        orderBy: {
          created_at: 'desc'
        },
        take: 1
      }
    }
  })

  if (!article) {
    throw new Error('DB Error')
  }

  return (
    <EditArticle article={article} />
  )
}