
import { prisma } from "@/lib/prisma";
import { NewArticle } from "../components/new-article";
import { EditArticle } from "../components/edit-article";
import { getSession } from "@/lib/getSession";
import { notFound } from "next/navigation";
import { idSchema } from "@/types/id-schema";

type Props = {
  params: Promise<{
    slug: string[]
  }>
}

export default async function EditArticlePage({ params }: Props) {
  const { slug } = await params
  if (slug[0] !== 'edit' || slug.length > 2) {
    notFound()
  }

  // 記事idあるか確認、なければ記事作成
  if (!slug[1]) {
    const { operatorId } = await getSession()
    return <NewArticle operatorId={operatorId} />
  }

  // 記事idあれば、バリデーション
  const parseId = await idSchema.safeParseAsync(Number(slug[1]))
  if (parseId.error) {
    notFound()
  }

  const id = parseId.data
  const article = await prisma.article.findUnique({
    where: {
      id: id,
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
    notFound()
  }

  return (
    <EditArticle article={article} />
  )
}