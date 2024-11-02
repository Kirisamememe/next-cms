
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/getSession";
import { notFound } from "next/navigation";
import { idSchema } from "@/types/id-schema";
import { NewArticle } from "../../components/new-article";
import { EditArticle } from "../../components/edit-article";

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
  const { operatorId } = await getSession()

  // 記事idあるか確認、なければ記事作成
  if (!slug[1]) {
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
      },
      author: true,
      last_edited: true
    }
  })

  if (!article) {
    notFound()
  }

  return (
    <EditArticle article={article} operatorId={operatorId} />
  )
}